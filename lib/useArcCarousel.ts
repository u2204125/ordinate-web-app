import { useCallback, useMemo, useState } from 'react';

type ArcPosition = {
  index: number;
  isActive: boolean;
  isVisible: boolean;
  angle: number;
  x: number;
  y: number;
  scale: number;
  zIndex: number;
};

type UseArcCarouselOptions<T> = {
  items: readonly T[];
  radius?: number;
  visibleCount?: number;
  angles?: readonly number[];
  center?: { x: number; y: number };
  initialIndex?: number;
  reducedMotion?: boolean;
};

type UseArcCarouselResult = {
  activeIndex: number;
  select: (index: number) => void;
  move: (direction: 1 | -1) => void;
  positions: ArcPosition[];
};

export function useArcCarousel<T>(options: UseArcCarouselOptions<T>): UseArcCarouselResult {
  const {
    items,
    radius = 40,
    visibleCount = 3,
    angles = [-45, 0, 45],
    center = { x: 0, y: 0 },
    initialIndex = 0,
    reducedMotion = false,
  } = options;

  const centerX = center.x;
  const centerY = center.y;

  const itemCount = items.length;
  const clampedVisible = Math.min(Math.max(visibleCount, 1), itemCount);
  const half = Math.floor(clampedVisible / 2);

  const [activeIndex, setActiveIndex] = useState(() => {
    if (initialIndex < 0) {
      return 0;
    }
    if (initialIndex >= itemCount) {
      return itemCount - 1;
    }
    return initialIndex;
  });

  const select = useCallback(
    (index: number) => {
      setActiveIndex(((index % itemCount) + itemCount) % itemCount);
    },
    [itemCount],
  );

  const move = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) => {
        const next = current + direction;
        return ((next % itemCount) + itemCount) % itemCount;
      });
    },
    [itemCount],
  );

  const positions = useMemo<ArcPosition[]>(() => {
    if (reducedMotion) {
      return items.map((_, index) => ({
        index,
        isActive: index === activeIndex,
        isVisible: index === activeIndex,
        angle: 0,
        x: 0,
        y: 0,
        scale: 1,
        zIndex: index === activeIndex ? itemCount : 0,
      }));
    }

    return items.map((_, index) => {
      const rawOffset = index - activeIndex;
      let wrappedOffset = ((rawOffset % itemCount) + itemCount) % itemCount;
      if (wrappedOffset > itemCount / 2) {
        wrappedOffset -= itemCount;
      }

      const visible = Math.abs(wrappedOffset) <= half;
      const clampedOffset = Math.max(-half, Math.min(half, wrappedOffset));
      const angleIndex = clampedOffset + half;
      const resolvedAngle = angles[angleIndex] ?? angles[Math.max(Math.min(angleIndex, angles.length - 1), 0)];
      const radians = (resolvedAngle * Math.PI) / 180;
      const depth = 1 - Math.abs(clampedOffset) * 0.12;

      return {
        index,
        isActive: index === activeIndex,
        isVisible: visible,
        angle: resolvedAngle,
        x: centerX + radius * Math.cos(radians),
        y: centerY - radius * Math.sin(radians),
        scale: Number(Math.max(0, depth).toFixed(2)),
        zIndex: clampedOffset === 0 ? itemCount : itemCount - Math.abs(clampedOffset),
      } satisfies ArcPosition;
    });
  }, [activeIndex, angles, centerX, centerY, half, itemCount, items, radius, reducedMotion]);

  return {
    activeIndex,
    select,
    move,
    positions,
  };
}
