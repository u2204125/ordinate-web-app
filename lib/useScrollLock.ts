import { useEffect } from 'react';

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    const body = document.body;
    if (!body) {
      return;
    }

    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    if (locked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
