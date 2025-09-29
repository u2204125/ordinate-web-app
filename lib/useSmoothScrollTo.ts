import { useCallback } from 'react';

export function useSmoothScrollTo(prefersReducedMotion: boolean, headerOffset = 72) {
  return useCallback(
    (target: string) => {
      if (!target.startsWith('#')) {
        window.location.hash = target;
        return;
      }
      const element = document.querySelector<HTMLElement>(target);
      if (!element) {
        return;
      }
      const prefersAuto = prefersReducedMotion || typeof window === 'undefined';
      const rect = element.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY - headerOffset;

      window.history.replaceState(null, '', target);

      window.scrollTo({
        top: offsetTop,
        behavior: prefersAuto ? 'auto' : 'smooth',
      });

      const focusTarget = element.querySelector<HTMLElement>('[tabindex="-1"], a, button, input, textarea, select');
      const nodeToFocus = focusTarget ?? element;

      if (!prefersAuto) {
        window.setTimeout(() => {
          nodeToFocus.focus({ preventScroll: true });
        }, 350);
      } else {
        nodeToFocus.focus({ preventScroll: true });
      }
    },
    [prefersReducedMotion, headerOffset],
  );
}
