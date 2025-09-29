import { useEffect, useRef, useState } from 'react';

export type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export function useInViewAnimation<T extends HTMLElement = HTMLElement>({
  once = true,
  rootMargin = '0px',
  threshold = 0.25,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView } as const;
}
