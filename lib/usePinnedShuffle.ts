import { useCallback, useMemo, useRef, useState } from 'react';

export type PinnedShuffleState = {
  activeIndex: number;
  direction: 1 | -1;
  order: number[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function computeOrder(activeIndex: number, direction: 1 | -1, count: number) {
  if (count <= 0) {
    return [];
  }

  return Array.from({ length: count }, (_, offset) => {
    if (direction === 1) {
      return (activeIndex + offset) % count;
    }
    return (activeIndex - offset + count * 3) % count;
  });
}

export function usePinnedShuffle(count: number) {
  const previousProgress = useRef(0);
  const [state, setState] = useState<PinnedShuffleState>(() => ({
    activeIndex: 0,
    direction: 1,
    order: computeOrder(0, 1, count),
  }));

  const setIndex = useCallback(
    (nextIndex: number, direction: 1 | -1 = 1) => {
      if (count <= 0) {
        return;
      }
      const normalized = ((nextIndex % count) + count) % count;
      previousProgress.current = normalized / count;
      setState({
        activeIndex: normalized,
        direction,
        order: computeOrder(normalized, direction, count),
      });
    },
    [count],
  );

  const update = useCallback(
    (progress: number) => {
      if (count <= 0) {
        return;
      }
      const clamped = clamp(progress, 0, 0.999999);
      const nextIndex = Math.min(count - 1, Math.floor(clamped * count));
      const direction: 1 | -1 = clamped >= previousProgress.current ? 1 : -1;
      previousProgress.current = clamped;

      setState((current) => {
        if (current.activeIndex === nextIndex && current.direction === direction) {
          return current;
        }
        return {
          activeIndex: nextIndex,
          direction,
          order: computeOrder(nextIndex, direction, count),
        };
      });
    },
    [count],
  );

  const reset = useCallback(() => {
    previousProgress.current = 0;
    setState({ activeIndex: 0, direction: 1, order: computeOrder(0, 1, count) });
  }, [count]);

  const value = useMemo(
    () => ({
      state,
      update,
      reset,
      setIndex,
    }),
    [reset, setIndex, state, update],
  );

  return value;
}
