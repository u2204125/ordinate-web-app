"use client";

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactElement } from 'react';

type Props = {
  activeKey: string | number;
  Visual: () => ReactElement;
  prefersReducedMotion: boolean;
};

export default function AboutVisualDesktop({ activeKey, Visual, prefersReducedMotion }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={String(activeKey)}
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
        <div className="hidden lg:block">
          <Visual />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
