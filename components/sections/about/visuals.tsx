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
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 p-3 shadow-[0_16px_48px_rgba(8,16,32,0.38)] backdrop-blur-xl transition-all duration-500 sm:rounded-3xl sm:p-4 lg:p-6 lg:shadow-[0_24px_80px_rgba(8,16,32,0.42)]"
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
  const totalCells = 36;
  const cells = Array.from({ length: totalCells }, (_, index) => {
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
        className="grid h-full w-full grid-cols-[repeat(4,1fr)] grid-rows-[repeat(4,1fr)] gap-1.5 text-[10px] font-medium text-cloud/80 sm:grid-cols-[repeat(6,1fr)] sm:grid-rows-[repeat(6,1fr)] sm:gap-2 sm:text-xs"
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
              (row >= 4 || col >= 4) && 'hidden sm:flex',
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
      <div className="flex h-full flex-col gap-2 sm:gap-3 lg:gap-4">
        <motion.div
          className="flex items-center justify-between rounded-xl bg-white/10 p-2 text-left text-xs sm:rounded-2xl sm:p-3 sm:text-sm lg:p-4"
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
          className="grid flex-1 grid-cols-3 gap-2 sm:gap-3"
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
          variants={reduceMotion ? undefined : gridVariants}
        >
          {cards.map((_, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-2 text-left text-[10px] sm:gap-2 sm:rounded-2xl sm:p-3 sm:text-xs"
              initial={reduceMotion ? undefined : { opacity: 0, y: 28, rotate: 6 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
              transition={reduceMotion ? undefined : { type: 'spring', stiffness: 180, damping: 20 }}
            >
              <motion.div
                className="h-12 rounded-lg bg-gradient-to-br from-white/40 to-white/10 sm:h-14 sm:rounded-xl lg:h-16"
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={reduceMotion ? undefined : { delay: 0.1, duration: 0.35, ease: 'easeOut' }}
              />
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-[10px] font-medium tracking-tight sm:text-xs">Component</p>
                <p className="text-[9px] text-cloud/60 sm:text-[10px] lg:text-[11px]">Tokens / Motion / Docs</p>
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
  const totalColumns = 5;

  return (
    <IllustrationFrame>
      <div className="grid h-full grid-cols-3 gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-cloud/70 sm:grid-cols-5 sm:gap-2 sm:text-[10px]">
        {Array.from({ length: totalColumns }).map((_, column) => (
          <motion.span
            key={column}
            className={cn(
              'flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-2 sm:gap-2 sm:rounded-2xl sm:p-3',
              column >= 3 && 'hidden sm:flex',
            )}
            initial={reduceMotion ? undefined : { opacity: 0, y: 28, skewY: 6 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, skewY: 0 }}
            transition={reduceMotion ? undefined : { delay: 0.1 + column * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
          >
            <motion.span
              className="flex h-6 items-center justify-between rounded-lg bg-black/40 px-2 text-[8px] sm:h-7 sm:rounded-xl sm:px-2.5 sm:text-[9px] lg:h-8 lg:px-3 lg:text-[10px]"
              initial={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.85 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={reduceMotion ? undefined : { delay: 0.1 + column * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
            >
              <span>Svc-{column + 1}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan sm:h-2 sm:w-2" aria-hidden />
            </motion.span>
            <motion.span
              className="flex flex-1 flex-col gap-0.5 text-[8px] text-cloud/60 sm:gap-1 sm:text-[9px]"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { delay: 0.18 + column * 0.05, duration: 0.35, ease: 'easeOut' }}
            >
              <span>Latency ≤ {120 + column * 10}ms</span>
              <span>Error &lt; 0.{column + 1}%</span>
              <span>Load x{column + 3}</span>
            </motion.span>
            <motion.span
              className="rounded-lg bg-gradient-to-br from-cyan/20 to-transparent p-1.5 text-center text-[8px] text-cloud/80 sm:rounded-xl sm:p-2 sm:text-[9px]"
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
  const totalBars = 7;
  const bars = Array.from({ length: totalBars }, (_, index) => 28 + index * 10);

  return (
    <IllustrationFrame>
      <div className="relative flex h-full w-full flex-col">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(180deg, rgba(92,64,51,0.32) 0%, rgba(54,37,28,0.6) 50%, rgba(22,12,8,0.6) 100%)',
            boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.02), inset 0 40px 80px rgba(0,0,0,0.35)',
          }}
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col justify-between gap-2 sm:gap-3 lg:gap-4">
          <motion.div
            className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.03)] px-2 py-2 text-xs font-medium sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-3"
            initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="rounded-full bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[13px] font-semibold">Iteration 12</span>
            <motion.span
              className="flex items-center gap-3 text-xs text-cloud/60"
              initial={reduceMotion ? undefined : { opacity: 0, x: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={reduceMotion ? undefined : { delay: 0.08, duration: 0.32, ease: 'easeOut' }}
            >
              <span className="text-[11px]">Burn-up</span>
              <span className="inline-flex h-2 w-16 items-center overflow-hidden rounded-full bg-[rgba(0,0,0,0.25)]">
                <motion.span
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
                  style={{ width: '60%' }}
                  initial={reduceMotion ? undefined : { scaleX: 0, originX: 0 }}
                  animate={reduceMotion ? undefined : { scaleX: 1 }}
                  transition={reduceMotion ? undefined : { delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden
                />
              </span>
            </motion.span>
          </motion.div>

          <div className="relative flex-1">
            <div className="absolute left-3 right-3 bottom-3 top-8 rounded-xl bg-[linear-gradient(180deg,rgba(0,0,0,0.06),transparent)] sm:left-4 sm:right-4 sm:bottom-4 sm:top-12 sm:rounded-2xl lg:left-6 lg:right-6 lg:bottom-6 lg:top-16" />
            <div className="absolute left-4 right-4 bottom-4 top-10 rounded-lg border border-[rgba(255,255,255,0.02)] sm:left-6 sm:right-6 sm:bottom-6 sm:top-14 sm:rounded-xl lg:left-8 lg:right-8 lg:bottom-8 lg:top-20" />

            <div className="relative z-20 mx-3 mt-3 grid h-[calc(100%-1.5rem)] grid-cols-[repeat(5,1fr)] items-end gap-1.5 sm:mx-4 sm:mt-4 sm:h-[calc(100%-2rem)] sm:grid-cols-[repeat(7,1fr)] sm:gap-2 lg:mx-6 lg:mt-6 lg:h-[calc(100%-2.5rem)] lg:gap-3">
              {bars.map((height, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    'flex flex-col items-center justify-end rounded-md bg-gradient-to-t from-[rgba(255,230,200,0.06)] to-[rgba(255,255,255,0.02)] sm:rounded-lg',
                    index >= 5 && 'hidden sm:flex',
                  )}
                  style={{ height: `${height}%`, transformOrigin: 'center bottom' }}
                  initial={reduceMotion ? undefined : { opacity: 0, scaleY: 0.2 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scaleY: 1 }}
                  transition={reduceMotion ? undefined : { delay: 0.14 + index * 0.05, type: 'spring', stiffness: 160, damping: 18 }}
                >
                  <motion.span
                    className="mb-1 rounded-b-md bg-amber-300/80 px-1 py-1 text-center text-[9px] font-semibold text-ink sm:mb-2 sm:rounded-b-lg sm:px-2 sm:py-2 sm:text-[11px]"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={reduceMotion ? undefined : { delay: 0.16 + index * 0.05, duration: 0.32, ease: 'easeOut' }}
                  >
                    {12 + index}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
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
      <div className="flex h-full flex-col gap-2 sm:gap-3">
        <motion.div
          className="flex items-center justify-between rounded-xl bg-black/40 px-3 py-2 text-[10px] sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs"
          initial={reduceMotion ? undefined : { opacity: 0, y: -16, rotateX: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.42, ease: [0.26, 0.8, 0.22, 1] }}
        >
          <span className="font-semibold text-cloud">Runbook</span>
          <span className="text-cloud/60">Last drill · 4 days ago</span>
        </motion.div>
        <div className="grid flex-1 grid-cols-2 gap-2 text-[10px] text-cloud/70 sm:gap-3 sm:text-[11px]">
          {rows.map((label, index) => (
            <motion.span
              key={label}
              className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-2 sm:gap-2 sm:rounded-2xl sm:p-3"
              initial={reduceMotion ? undefined : { opacity: 0, y: 24, rotateZ: index % 2 === 0 ? -4 : 4 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotateZ: 0 }}
              transition={reduceMotion ? undefined : { delay: 0.18 + index * 0.08, duration: 0.45, ease: [0.2, 0.9, 0.22, 1] }}
            >
              <motion.span
                className="flex items-center justify-between text-[10px] font-semibold sm:text-xs"
                initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { delay: 0.26 + index * 0.08, duration: 0.28, ease: 'easeOut' }}
              >
                {label}
                <span className="flex items-center gap-0.5 text-[9px] text-cloud/50 sm:gap-1 sm:text-[10px]">
                  SL{index + 1}
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 sm:h-2 sm:w-2" aria-hidden />
                </span>
              </motion.span>
              <motion.span
                className="flex flex-col gap-0.5 text-[9px] text-cloud/60 sm:gap-1 sm:text-[10px]"
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
                <Button type="button" variant="ghost" className="h-6 w-full px-1.5 text-[9px] sm:h-7 sm:px-2 sm:text-[10px] lg:h-8">
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
