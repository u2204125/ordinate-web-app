"use client";

import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/components/theme/theme-provider';
import { useInViewAnimation } from '@/lib/useInViewAnimation';
import { aboutItems, getAccentCssVariables } from '@/lib/aboutItems';
import { aboutVisuals } from './about/visuals';
import AboutVisualDesktop from './about/about-visual-desktop';
import AboutVisualMobile from './about/about-visual-mobile';

const AUTO_ROTATE_MS = 6800;
const RESUME_DELAY_MS = 9000;

export function AboutSection() {
  const { prefersReducedMotion } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const rotateTimeoutRef = useRef<number | null>(null);
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const parallaxRafRef = useRef<number | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const { ref, inView } = useInViewAnimation<HTMLDivElement>({ rootMargin: '-20% 0px', threshold: 0.4 });
  const total = aboutItems.length;
  const activeItem = aboutItems[activeIndex];
  const Visual = aboutVisuals[activeItem.visual];
  const activeAccentVars = getAccentCssVariables(activeItem.accent);

  const setLayoutNode = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      layoutRef.current = node;
    },
    [ref],
  );

  const updateParallax = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const node = layoutRef.current;
    if (!node) {
      return;
    }

    const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
    if (!isLargeScreen) {
      setParallaxOffset((current) => (current !== 0 ? 0 : current));
      return;
    }

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    const distanceRatio = (sectionCenter - viewportCenter) / viewportHeight;
    const clamped = Math.max(-1, Math.min(1, distanceRatio));
    const next = clamped * 40;

    setParallaxOffset((current) => (Math.abs(current - next) > 0.5 ? next : current));
  }, []);


  const scheduleRotate = useCallback(
    (delay: number) => {
      if (prefersReducedMotion || userPaused) {
        return;
      }
      if (rotateTimeoutRef.current !== null) {
        window.clearTimeout(rotateTimeoutRef.current);
        rotateTimeoutRef.current = null;
      }
      rotateTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % total);
      }, delay);
    },
    [prefersReducedMotion, total, userPaused],
  );

  useEffect(() => {
    if (!inView) {
      if (rotateTimeoutRef.current !== null) {
        window.clearTimeout(rotateTimeoutRef.current);
        rotateTimeoutRef.current = null;
      }
      return () => undefined;
    }
    scheduleRotate(AUTO_ROTATE_MS);
    return () => {
      if (rotateTimeoutRef.current !== null) {
        window.clearTimeout(rotateTimeoutRef.current);
        rotateTimeoutRef.current = null;
      }
    };
  }, [inView, scheduleRotate]);

  const handleSelect = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setUserPaused(true);
      if (rotateTimeoutRef.current !== null) {
        window.clearTimeout(rotateTimeoutRef.current);
        rotateTimeoutRef.current = null;
      }
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
      resumeTimeoutRef.current = window.setTimeout(() => {
        setUserPaused(false);
      }, RESUME_DELAY_MS);
    },
    [],
  );

  useEffect(() => {
    if (!userPaused && inView) {
      scheduleRotate(AUTO_ROTATE_MS);
    }
  }, [activeIndex, inView, scheduleRotate, userPaused]);

  useEffect(() => {
    updateParallax();
  }, [activeIndex, updateParallax]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleScroll = () => {
      if (parallaxRafRef.current !== null) {
        return;
      }
      parallaxRafRef.current = window.requestAnimationFrame(() => {
        parallaxRafRef.current = null;
        updateParallax();
      });
    };

    const handleResize = () => updateParallax();

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (parallaxRafRef.current !== null) {
        window.cancelAnimationFrame(parallaxRafRef.current);
        parallaxRafRef.current = null;
      }
    };
  }, [updateParallax]);

  useEffect(() => () => {
    if (rotateTimeoutRef.current !== null) {
      window.clearTimeout(rotateTimeoutRef.current);
      rotateTimeoutRef.current = null;
    }
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = (index - 1 + total) % total;
        handleSelect(prev);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const next = (index + 1) % total;
        handleSelect(next);
      }
    },
    [handleSelect, total],
  );

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-[var(--header-height)] bg-ink"
      tabIndex={-1}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div
          ref={setLayoutNode}
          className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold uppercase tracking-[0.4em] text-cloud/60">Why Ordinate</h2>

            <nav role="tablist" aria-label="Why Ordinate" className="flex flex-col gap-3">
              {aboutItems.map((item, index) => {
                const isActive = index === activeIndex;
                const isHovered = hoveredIndex === index;
                const highlight = isActive || isHovered;
                const accentVars = getAccentCssVariables(item.accent);
                const ItemVisual = aboutVisuals[item.visual];

                return (
                  <div key={item.id} className="w-full">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`about-panel-${item.id}`}
                      id={`about-tab-${item.id}`}
                      tabIndex={isActive ? 0 : -1}
                      className="group relative flex items-start gap-4 w-full overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 backdrop-blur-xl sm:px-5 sm:py-5"
                      style={{
                        ...accentVars,
                        background: highlight ? 'var(--about-tab-bg)' : 'rgba(255, 255, 255, 0.03)',
                        borderColor: highlight ? 'var(--about-tab-border)' : 'rgba(255, 255, 255, 0.08)',
                        boxShadow: highlight && !prefersReducedMotion ? 'var(--about-tab-shadow)' : 'none',
                        outlineColor: 'var(--about-tab-border)',
                        opacity: inView || prefersReducedMotion ? 1 : 0,
                        transform: inView || prefersReducedMotion ? 'translateY(0)' : 'translateY(18px)',
                        transitionDelay: inView && !prefersReducedMotion ? `${index * 80}ms` : undefined,
                      }}
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        handleSelect(index);
                      }}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => {
                        setHoveredIndex(index);
                        handleSelect(index);
                      }}
                      onBlur={() => setHoveredIndex(null)}
                      onClick={() => handleSelect(index)}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                    >
                      <span className="flex flex-col gap-1">
                        <span className="text-sm font-semibold tracking-tight sm:text-base">{item.title}</span>
                        <span className="text-xs text-cloud/60 sm:text-sm">{item.summary}</span>
                      </span>
                      <span className="ml-auto hidden text-xs font-semibold uppercase tracking-[0.3em] text-cloud/50 sm:inline">
                        {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: 'var(--about-tab-bg-hover)' }}
                      />
                    </button>

                    {/* small-screen inline visual: CSS-controlled per-item panel (shown when the preceding button has aria-selected="true") */}
                    <AboutVisualMobile itemId={item.id} ItemVisual={ItemVisual} isActive={isActive} />
                  </div>
                );
              })}
            </nav>
          </div>
          <div
            role="tabpanel"
            id={`about-panel-desktop`}
            aria-labelledby={`about-tab-${activeItem.id}`}
            className="relative flex w-full justify-center transition-transform duration-500 ease-out lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:pl-4"
            style={{
              ...activeAccentVars,
              transform: `translateY(${parallaxOffset}px)`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                className="w-full max-w-xl"
                initial={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 32,
                        scale: 0.96,
                      }
                }
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }
                }
                exit={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -24,
                        scale: 0.96,
                      }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 0.54,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                {/* Desktop visual: visible only on lg+ via CSS classes */}
                <AboutVisualDesktop activeKey={activeItem.id} Visual={Visual} prefersReducedMotion={prefersReducedMotion} />
              </motion.div>
            </AnimatePresence>
            {/* small-screen visuals are rendered inline per item above */}
          </div>
        </div>
      </div>
    </section>
  );
}
