"use client";

import type { ReactElement, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AboutVisualId } from '@/lib/aboutItems';

type VisualComponent = () => ReactElement;

type IllustrationFrameProps = {
  children: ReactNode;
};

function IllustrationFrame({ children }: IllustrationFrameProps) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_24px_80px_rgba(8,16,32,0.42)] backdrop-blur-xl transition-all duration-500"
      style={{
        background: 'var(--about-panel-gradient, rgba(15, 23, 42, 0.68))',
        boxShadow: 'var(--about-tab-shadow, 0 32px 80px rgba(8, 16, 32, 0.55))',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at top, var(--about-tab-border, rgba(255,255,255,0.18)) 0%, transparent 65%)',
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

const StrategyVisual: VisualComponent = () => {
  const reduceMotion = useReducedMotion();
  const cells = Array.from({ length: 36 }, (_, index) => {
    const row = Math.floor(index / 6);
    const col = index % 6;
    return { row, col, highlighted: (row + col) % 5 === 0, label: (row + col) % 3 === 0 ? 'OKR' : '' };
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.1,
      },
    },
  } as const;

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.65, rotateX: -35 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.4, ease: [0.26, 0.78, 0.16, 0.98] },
    },
  } as const;

  return (
    <IllustrationFrame>
      <motion.div
        className="grid h-full w-full grid-cols-[repeat(6,1fr)] grid-rows-[repeat(6,1fr)] gap-2 text-xs font-medium text-cloud/80"
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'visible'}
        variants={reduceMotion ? undefined : containerVariants}
      >
        {cells.map(({ row, col, highlighted, label }) => (
          <motion.span
            key={`${row}-${col}`}
            className={cn(
              'flex items-center justify-center rounded-md border border-white/10 bg-white/5/50 backdrop-blur-sm transition',
              highlighted && 'bg-cyan/40 text-ink shadow-[0_0_16px_rgba(0,209,255,0.35)]',
            )}
            variants={reduceMotion ? undefined : cellVariants}
            initial={reduceMotion ? { opacity: 1 } : undefined}
            animate={reduceMotion ? { opacity: 1 } : undefined}
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </IllustrationFrame>
  );
};

const DesignVisual: VisualComponent = () => {
  const reduceMotion = useReducedMotion();
  const cards = Array.from({ length: 6 });

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.18,
        staggerChildren: 0.06,
      },
    },
  } as const;

  return (
    <IllustrationFrame>
      <div className="flex h-full flex-col gap-4">
        <motion.div
          className="flex items-center justify-between rounded-2xl bg-white/10 p-4 text-left text-sm"
          initial={reduceMotion ? undefined : { opacity: 0, y: -24, filter: 'blur(6px)' }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={reduceMotion ? undefined : { duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <div>
            <p className="font-semibold tracking-tight">Orbit UI</p>
            <p className="text-xs text-cloud/60">v3.4.0 · Stable</p>
          </div>
          <motion.div
            className="flex items-center gap-2 text-xs"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.6, rotate: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
            transition={reduceMotion ? undefined : { delay: 0.12, type: 'spring', stiffness: 220, damping: 18 }}
          >
            <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
            Synced
          </motion.div>
        </motion.div>
        <motion.div
          className="grid flex-1 grid-cols-3 gap-3"
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
          variants={reduceMotion ? undefined : gridVariants}
        >
          {cards.map((_, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-left text-xs"
              initial={reduceMotion ? undefined : { opacity: 0, y: 28, rotate: 6 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
              transition={reduceMotion ? undefined : { type: 'spring', stiffness: 180, damping: 20 }}
            >
              <motion.div
                className="h-16 rounded-xl bg-gradient-to-br from-white/40 to-white/10"
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={reduceMotion ? undefined : { delay: 0.1, duration: 0.35, ease: 'easeOut' }}
              />
              <div className="space-y-1">
                <p className="font-medium tracking-tight">Component</p>
                <p className="text-[11px] text-cloud/60">Tokens / Motion / Docs</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </IllustrationFrame>
  );
};

const ArchitectureVisual: VisualComponent = () => {
  const reduceMotion = useReducedMotion();
  const columns = Array.from({ length: 5 });

  return (
    <IllustrationFrame>
      <div className="grid h-full grid-cols-5 gap-2 text-[10px] font-semibold uppercase tracking-wide text-cloud/70">
        {columns.map((_, column) => (
          <motion.span
            key={column}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3"
            initial={reduceMotion ? undefined : { opacity: 0, y: 28, skewY: 6 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, skewY: 0 }}
            transition={reduceMotion ? undefined : { delay: column * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="flex h-8 items-center justify-between rounded-xl bg-black/40 px-3"
              initial={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.85 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={reduceMotion ? undefined : { delay: 0.1 + column * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
            >
              <span>Svc-{column + 1}</span>
              <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden />
            </motion.span>
            <motion.span
              className="flex flex-1 flex-col gap-1 text-[9px] text-cloud/60"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { delay: 0.18 + column * 0.05, duration: 0.35, ease: 'easeOut' }}
            >
              <span>Latency ≤ {120 + column * 10}ms</span>
              <span>Error &lt; 0.{column + 1}%</span>
              <span>Load x{column + 3}</span>
            </motion.span>
            <motion.span
              className="rounded-xl bg-gradient-to-br from-cyan/20 to-transparent p-2 text-center text-[9px] text-cloud/80"
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.7, rotateX: 15 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotateX: 0 }}
              transition={reduceMotion ? undefined : { delay: 0.25 + column * 0.05, duration: 0.4, ease: [0.17, 0.67, 0.3, 1.18] }}
            >
              Health: {(96 + column).toFixed(1)}%
            </motion.span>
          </motion.span>
        ))}
      </div>
    </IllustrationFrame>
  );
};

const DeliveryVisual: VisualComponent = () => {
  const reduceMotion = useReducedMotion();
  const bars = Array.from({ length: 7 }, (_, index) => 40 + index * 8);

  return (
    <IllustrationFrame>
      <div className="flex h-full flex-col justify-between gap-4">
        <motion.div
          className="flex items-center justify-between rounded-2xl bg-white/5 p-4 text-sm font-medium"
          initial={reduceMotion ? undefined : { opacity: 0, y: -18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Iteration 12</span>
          <motion.span
            className="flex items-center gap-2 text-xs text-cloud/60"
            initial={reduceMotion ? undefined : { opacity: 0, x: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={reduceMotion ? undefined : { delay: 0.12, duration: 0.32, ease: 'easeOut' }}
          >
            Burn-up
            <span className="inline-flex h-2 w-10 items-center overflow-hidden rounded-full bg-black/40">
              <motion.span
                className="h-full w-3/4 bg-cyan"
                initial={reduceMotion ? undefined : { scaleX: 0, originX: 0 }}
                animate={reduceMotion ? undefined : { scaleX: 1 }}
                transition={reduceMotion ? undefined : { delay: 0.16, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
            </span>
          </motion.span>
        </motion.div>
        <div className="grid flex-1 grid-cols-[repeat(7,1fr)] items-end gap-2">
          {bars.map((height, index) => (
            <motion.span
              key={index}
              className="flex h-full flex-col justify-end rounded-2xl bg-gradient-to-t from-cyan/10 via-cyan/30 to-cyan/0"
              style={{ height: `${height}%`, transformOrigin: 'center bottom' }}
              initial={reduceMotion ? undefined : { opacity: 0, scaleY: 0.2 }}
              animate={reduceMotion ? undefined : { opacity: 1, scaleY: 1 }}
              transition={reduceMotion ? undefined : { delay: 0.18 + index * 0.05, type: 'spring', stiffness: 140, damping: 18 }}
            >
              <motion.span
                className="rounded-b-2xl bg-cyan/70 py-3 text-center text-[10px] text-ink"
                initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { delay: 0.2 + index * 0.05, duration: 0.3, ease: 'easeOut' }}
              >
                {12 + index}
              </motion.span>
            </motion.span>
          ))}
        </div>
      </div>
    </IllustrationFrame>
  );
};

const WarrantyVisual: VisualComponent = () => {
  const reduceMotion = useReducedMotion();
  const rows = ['Observability', 'Recovery', 'Access', 'Comms'];

  return (
    <IllustrationFrame>
      <div className="flex h-full flex-col gap-3">
        <motion.div
          className="flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3 text-xs"
          initial={reduceMotion ? undefined : { opacity: 0, y: -16, rotateX: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.42, ease: [0.26, 0.8, 0.22, 1] }}
        >
          <span className="font-semibold text-cloud">Runbook</span>
          <span className="text-cloud/60">Last drill · 4 days ago</span>
        </motion.div>
        <div className="grid flex-1 grid-cols-2 gap-3 text-[11px] text-cloud/70">
          {rows.map((label, index) => (
            <motion.span
              key={label}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3"
              initial={reduceMotion ? undefined : { opacity: 0, y: 24, rotateZ: index % 2 === 0 ? -4 : 4 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateZ: 0 }}
              transition={reduceMotion ? undefined : { delay: 0.18 + index * 0.08, duration: 0.45, ease: [0.2, 0.9, 0.22, 1] }}
            >
              <motion.span
                className="flex items-center justify-between text-xs font-semibold"
                initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { delay: 0.26 + index * 0.08, duration: 0.28, ease: 'easeOut' }}
              >
                {label}
                <span className="flex items-center gap-1 text-[10px] text-cloud/50">
                  SL{index + 1}
                  <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
                </span>
              </motion.span>
              <motion.span
                className="flex flex-col gap-1 text-[10px] text-cloud/60"
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { delay: 0.32 + index * 0.08, duration: 0.28, ease: 'easeOut' }}
              >
                <span>Checklist · v{index + 2}.1</span>
                <span>Escalation · 15 min</span>
              </motion.span>
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={reduceMotion ? undefined : { delay: 0.36 + index * 0.08, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <Button type="button" variant="ghost" className="h-8 w-full px-2 text-[10px]">
                  Open
                </Button>
              </motion.div>
            </motion.span>
          ))}
        </div>
      </div>
    </IllustrationFrame>
  );
};

export const aboutVisuals: Record<AboutVisualId, VisualComponent> = {
  strategy: StrategyVisual,
  design: DesignVisual,
  architecture: ArchitectureVisual,
  delivery: DeliveryVisual,
  warranty: WarrantyVisual,
};
