"use client";

import { memo, type ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type ServiceVisualId = 'web-apps' | 'app-dev' | 'marketing' | 'ai-integration';

export type ServicesVisualProps = {
  serviceId: ServiceVisualId;
  reducedMotion: boolean;
};

type VisualRenderer = (props: { reducedMotion: boolean }) => ReactElement;

const BASE_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const;

const fadeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const WebAppVisual: VisualRenderer = ({ reducedMotion }) => (
  <div className="flex h-full w-full items-center justify-center">
    <motion.div
      className="relative flex h-40 w-60 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-cyan/30 to-cyan/10 p-6 shadow-[0_20px_60px_rgba(0,209,255,0.25)]"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      transition={BASE_TRANSITION}
    >
      <motion.div
        className="relative flex h-24 w-full flex-col gap-1 rounded-2xl bg-ink/80 p-3 text-left"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.1 }}
      >
        {[0, 1, 2].map((row) => (
          <motion.span
            key={row}
            className="flex h-4 w-full items-center gap-1"
            initial={reducedMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.12 + row * 0.05 }}
          >
            <span className="h-3 w-3 rounded-full bg-cyan/70" />
            <span className="h-2 w-full rounded bg-white/10" />
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="mt-3 h-2 w-48 rounded-full bg-white/20"
        initial={reducedMotion ? false : { opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '12rem' }}
        exit={{ opacity: 0, width: '10rem' }}
        transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.2 }}
      />
    </motion.div>
  </div>
);

const AppDevVisual: VisualRenderer = ({ reducedMotion }) => (
  <div className="flex h-full w-full items-end justify-center">
    <motion.div
      className="relative h-48 w-24 rounded-[2rem] border border-white/10 bg-gradient-to-b from-ink/60 to-black/80 p-4 shadow-[0_20px_50px_rgba(105,88,255,0.25)]"
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={BASE_TRANSITION}
    >
      <div className="absolute inset-x-6 top-4 h-2 rounded-full bg-white/15" />
      <motion.div
        className="mt-6 flex h-full flex-col gap-3"
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.1 }}
      >
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="flex flex-1 flex-col rounded-2xl bg-white/8"
            initial={reducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? 16 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
            transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.12 + index * 0.04 }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-x-12 bottom-3 h-1 rounded-full bg-white/20" />
    </motion.div>
  </div>
);

const MarketingVisual: VisualRenderer = ({ reducedMotion }) => (
  <div className="flex h-full w-full flex-col justify-end">
    <motion.div
      className="mb-4 flex items-end gap-2 text-cloud"
      initial={reducedMotion ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={BASE_TRANSITION}
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="flex h-24 w-16 items-end justify-center rounded-2xl bg-gradient-to-t from-amber-400/30 to-amber-300/5"
          initial={reducedMotion ? false : { scaleY: 0.6, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0.7, opacity: 0 }}
          transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.08 + index * 0.05 }}
        >
          <span className="mb-3 h-6 w-6 rounded-full bg-amber-300/80" />
        </motion.span>
      ))}
    </motion.div>
    <motion.div
      className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/8 px-6 py-4 text-sm text-cloud/80"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.12 }}
    >
      <span>Campaign health</span>
      <span className="flex items-center gap-2 text-xs">
        <span className="h-2 w-2 rounded-full bg-emerald-400" /> +18%
      </span>
    </motion.div>
  </div>
);

const AiVisual: VisualRenderer = ({ reducedMotion }) => (
  <div className="relative flex h-full w-full items-center justify-center">
    <motion.div
      className="absolute h-40 w-40 rounded-full border border-emerald-400/40"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={BASE_TRANSITION}
    />
    <motion.div
      className="absolute h-14 w-14 rounded-full border border-cyan/60"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.08 }}
    />
    <motion.div
      className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan/40 to-emerald/30 blur-md"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.04 }}
    />
    <motion.div
      className="relative flex h-28 w-28 items-center justify-center"
      initial={reducedMotion ? false : { opacity: 0, rotate: -8 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 6 }}
      transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.1 }}
    >
      <motion.span
        className="absolute -left-6 h-16 w-3 rounded-full bg-gradient-to-b from-white/60 to-white/10"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.14 }}
      />
      <motion.span
        className="absolute -right-6 h-16 w-3 rounded-full bg-gradient-to-b from-white/60 to-white/10"
        initial={reducedMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.16 }}
      />
      <motion.div
        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan/60 bg-black/40"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.1 }}
      >
        <motion.span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/70 text-[10px] font-semibold tracking-wide text-ink"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ ...BASE_TRANSITION, delay: reducedMotion ? 0 : 0.18 }}
        >
          AI
        </motion.span>
      </motion.div>
    </motion.div>
  </div>
);

const VISUALS: Record<ServiceVisualId, VisualRenderer> = {
  'web-apps': WebAppVisual,
  'app-dev': AppDevVisual,
  marketing: MarketingVisual,
  'ai-integration': AiVisual,
};

export const ServicesVisual = memo(function ServicesVisual({ serviceId, reducedMotion }: ServicesVisualProps) {
  const Visual = VISUALS[serviceId];

  return (
    <div className="relative mt-4 flex h-[260px] w-full items-center justify-center rounded-3xl border border-white/8 bg-white/5 p-6">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,#00d1ff20,transparent_70%)]" aria-hidden />
      <AnimatePresence mode="wait">
        <motion.div
          key={serviceId}
          className="relative h-full w-full"
          initial={reducedMotion ? false : fadeVariants.initial}
          animate={fadeVariants.animate}
          exit={fadeVariants.exit}
          transition={BASE_TRANSITION}
        >
          <Visual reducedMotion={reducedMotion} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
