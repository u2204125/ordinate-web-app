import { useCallback, useEffect, useRef, useState } from 'react';

type UseActiveSection = (ids: string[]) => [string, (href: string) => void];

export const useActiveSection: UseActiveSection = (ids) => {
  const [active, setActive] = useState<string>('');
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to find the current section
  const getActiveSection = useCallback(() => {
    if (typeof window === 'undefined') return '';

    // 1. If at the very top, return the first section
    if (window.scrollY === 0) {
      return ids[0] || '';
    }

    // 2. If at the very bottom, return the last section
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
      return ids[ids.length - 1] || '';
    }

    // 3. Scan line approach: Find the section that intersects with a line 40% down the viewport
    const viewportHeight = window.innerHeight;
    const targetLine = viewportHeight * 0.4;
    
    let bestId = '';
    let minDistance = Infinity;

    for (const id of ids) {
      const element = document.querySelector(id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      
      // Check if the target line is within this section
      if (rect.top <= targetLine && rect.bottom >= targetLine) {
        return id;
      }

      // Fallback: find the section closest to the target line
      // We measure distance from the section's "center" to the target line?
      // Or distance from the section's top/bottom to the target line?
      // Let's use distance from the section's vertical center to the target line.
      const center = (rect.top + rect.bottom) / 2;
      const distance = Math.abs(center - targetLine);

      if (distance < minDistance) {
        minDistance = distance;
        bestId = id;
      }
    }

    return bestId;
  }, [ids]);

  useEffect(() => {
    // Initial check
    const initial = getActiveSection();
    if (initial) setActive(initial);

    const onScroll = () => {
      if (isScrollingRef.current) return;
      
      const newActive = getActiveSection();
      if (newActive && newActive !== active) {
        setActive(newActive);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, getActiveSection, active]);

  const setActiveHref = useCallback((href: string) => {
    setActive(href);
    isScrollingRef.current = true;
    
    // Re-enable scroll spy after the smooth scroll animation finishes
    // A safe bet is ~1000ms, or we could listen for scrollend (not supported everywhere yet)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      // Do a final check in case we landed somewhere else
      const final = getActiveSection();
      if (final) setActive(final);
    }, 1000);
  }, [getActiveSection]);

  return [active, setActiveHref];
};

export default useActiveSection;
