import { useEffect, useMemo, useRef, useState } from 'react';

// const DEFAULT_CHARSET = '!<>-_/\\[]{}—=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export type UseScrambleConfig = {
  phrases: string[];
  speed?: number;
  delay?: number;
  charset?: string;
  loop?: boolean;
  prefersReducedMotion?: boolean;
  autoStart?: boolean;
  iteration?: number;
  scrambleInterval?: number;
};

export type UseScrambleResult = {
  text: string;
  index: number;
  isScrambling: boolean;
};

type QueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char: string;
};

export function useScramble({
  phrases,
  speed = 18,
  delay = 2500,
  charset = DEFAULT_CHARSET,
  loop = true,
  prefersReducedMotion = false,
  autoStart = true,
  iteration = 0,
  scrambleInterval,
}: UseScrambleConfig): UseScrambleResult {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => phrases[0] ?? '');
  const [isScrambling, setIsScrambling] = useState(false);

  const previousTextRef = useRef(text);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const queueRef = useRef<QueueItem[]>([]);

  const characters = useMemo(() => charset.split(''), [charset]);
  const total = phrases.length;
  const scrambleStep = useMemo(
    () => Math.max(1, scrambleInterval ?? Math.round(Math.max(speed, 4) / 6)),
    [scrambleInterval, speed],
  );

  useEffect(() => {
    previousTextRef.current = text;
  }, [text]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (total === 0) {
      return;
    }

    const target = phrases[index] ?? '';
    const shouldStart = autoStart || iteration > 0;

    const scheduleNext = () => {
      if (loop || index < total - 1) {
        timeoutRef.current = window.setTimeout(() => {
          setIndex((current) => {
            const next = current + 1;
            if (next >= total) {
              return loop ? 0 : current;
            }
            return next;
          });
        }, delay);
      }
    };

    if (prefersReducedMotion) {
      setText(target);
      setIsScrambling(false);
      scheduleNext();
      return;
    }

    if (!shouldStart) {
      setText(target);
      setIsScrambling(false);
      return;
    }

    const source = previousTextRef.current ?? '';
    const targetLength = target.length;

    if (targetLength === 0) {
      setText('');
      setIsScrambling(false);
      scheduleNext();
      return;
    }

    const startRange = Math.max(2, Math.round(speed * 0.45));
    const minDuration = Math.max(5, Math.round(speed * 0.75));
    const maxDuration = Math.max(minDuration + 4, Math.round(speed * 1.35));

    queueRef.current = Array.from({ length: targetLength }, (_, position) => {
      const from = source[position] ?? '';
      const to = target[position] ?? '';
      const start = Math.floor(Math.random() * startRange);
      const duration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
      const end = start + duration;
      return { from, to, start, end, char: '' } satisfies QueueItem;
    });

    let frame = 0;
    setIsScrambling(true);

    const update = () => {
      const queue = queueRef.current;
      let output = '';
      let complete = 0;

      for (const item of queue) {
        if (frame < item.start) {
          output += item.from;
        } else if (frame >= item.end) {
          complete += 1;
          output += item.to;
        } else {
          if (!item.char || (frame - item.start) % scrambleStep === 0 || Math.random() < 0.08) {
            item.char = characters[Math.floor(Math.random() * characters.length)] ?? '';
          }
          output += item.char;
        }
      }

      setText(output);
      frame += 1;

      if (complete === queue.length) {
        setText(target);
        setIsScrambling(false);
        scheduleNext();
        return;
      }

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [autoStart, characters, delay, index, iteration, loop, phrases, prefersReducedMotion, scrambleStep, speed, total]);

  return {
    text,
    index,
    isScrambling,
  };
}
