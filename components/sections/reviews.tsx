"use client";

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';
import { REVIEWS } from '@/lib/reviewsData';
import { usePinnedShuffle } from '@/lib/usePinnedShuffle';
import { useInViewAnimation } from '@/lib/useInViewAnimation';

const ROTATIONS = [1.5, -2.25, 0.75, -1.4, 2.1, -0.6];
const STACK_OFFSET = 28;

export function ReviewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const manualRef = useRef(false);
  const manualTimeout = useRef<number | null>(null);
  const { prefersReducedMotion } = useTheme();
  const { ref: introRef, inView: introInView } = useInViewAnimation<HTMLDivElement>({ rootMargin: '-20% 0px', threshold: 0.4 });

  const { state, update, reset, setIndex } = usePinnedShuffle(REVIEWS.length);
  const { activeIndex, direction, order } = state;
  const topReview = REVIEWS[order[0] ?? 0] ?? REVIEWS[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (prefersReducedMotion || manualRef.current) {
      return;
    }
    update(value);
  });

  useEffect(() => {
    return () => {
      if (manualTimeout.current !== null) {
        window.clearTimeout(manualTimeout.current);
        manualTimeout.current = null;
      }
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (manualTimeout.current !== null) {
        window.clearTimeout(manualTimeout.current);
        manualTimeout.current = null;
      }
      manualRef.current = false;
      reset();
    }
  }, [prefersReducedMotion, reset]);

  const setManualStep = useCallback(
    (step: 1 | -1) => {
      if (prefersReducedMotion) {
        setIndex(activeIndex + step, step);
        return;
      }
      manualRef.current = true;
      setIndex(activeIndex + step, step);
      if (manualTimeout.current !== null) {
        window.clearTimeout(manualTimeout.current);
        manualTimeout.current = null;
      }
      manualTimeout.current = window.setTimeout(() => {
        manualRef.current = false;
      }, 1200);
    },
    [activeIndex, prefersReducedMotion, setIndex],
  );

  const backgroundStyle = useMemo(
    () =>
      ({
        '--review-accent': topReview?.color ?? '#00D1FF',
      }) as CSSProperties & { '--review-accent'?: string },
    [topReview?.color],
  );

  const renderRating = (rating: number) => (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'h-2.5 w-2.5 rounded-full border border-white/30 transition',
            index < rating ? 'bg-white' : 'bg-white/10',
          )}
        />
      ))}
    </div>
  );

  const instructionsId = 'reviews-instructions';

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative scroll-mt-[var(--header-height)] bg-ink"
      tabIndex={-1}
    >
      <div ref={sectionRef} className="mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
        <div
          className={cn(
            'relative rounded-[3rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,209,255,0.18),transparent_65%)] p-1',
            prefersReducedMotion ? '' : 'min-h-[320vh]'
          )}
        >
          <div
            ref={stickyRef}
            className={cn(
              'relative flex flex-col gap-12 rounded-[2.5rem] border border-white/10 bg-[#11141b]/95 px-8 py-16 backdrop-blur-xl sm:px-10 lg:flex-row lg:items-start lg:gap-16',
              prefersReducedMotion ? '' : 'sticky'
            )}
            style={prefersReducedMotion ? undefined : ({ top: 'calc(var(--header-height) + 1.5rem)' } satisfies CSSProperties)}
          >
            <div ref={introRef} className="flex max-w-xl flex-col gap-6 text-cloud">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cloud/60">Reviews</p>
              <h2
                id="reviews-heading"
                className={cn(
                  'text-balance text-3xl font-semibold tracking-tight sm:text-4xl',
                  introInView && !prefersReducedMotion ? 'animate-in fade-in slide-in-from-right-6 duration-700' : '',
                )}
              >
                Teams stay live, aligned, and calm.
              </h2>
              <p className="text-base text-cloud/70">
                Ordinate is the safety net and multiplier for leaders who need disciplined delivery. Scroll through the lane to
                see why squads keep us on speed dial after their first launch.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-cloud/60" id={instructionsId}>
                {prefersReducedMotion ? (
                  <span>No complex motion — use the buttons to browse feedback.</span>
                ) : (
                  <>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cloud/50">
                      Scroll to cycle reviews
                    </span>
                    <span>or use the buttons to move manually.</span>
                  </>
                )}
              </div>
              <div className="flex gap-3 pt-2" role="group" aria-describedby={instructionsId}>
                <Button type="button" variant="ghost" onClick={() => setManualStep(-1)} className="border border-white/20 px-4 text-cloud/80">
                  Previous review
                </Button>
                <Button type="button" variant="ghost" onClick={() => setManualStep(1)} className="border border-white/20 px-4 text-cloud/80">
                  Next review
                </Button>
              </div>
            </div>
            <div className={cn('relative w-full flex-1 overflow-visible transition', prefersReducedMotion ? '' : 'pb-12')} style={backgroundStyle}>
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,var(--review-accent)_0%,transparent_60%)] opacity-60" aria-hidden />
              {prefersReducedMotion ? (
                <div className="grid gap-6 text-cloud">
                  {REVIEWS.map((review) => (
                    <article
                      key={review.id}
                      className="flex flex-col gap-6 rounded-3xl border border-white/12 bg-[#141922]/95 p-8 shadow-[0_20px_50px_rgba(2,12,22,0.35)]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span
                            className={cn(
                              'flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold uppercase text-ink',
                              review.avatar.gradient,
                            )}
                          >
                            {review.avatar.initials}
                          </span>
                          <div>
                            <p className="text-base font-semibold tracking-tight text-cloud">{review.name}</p>
                            <p className="text-sm text-cloud/60">
                              {review.role} · {review.company}
                            </p>
                          </div>
                        </div>
                        {renderRating(review.rating)}
                      </div>
                      <blockquote className="text-balance text-lg font-medium italic text-cloud/90 sm:text-xl">
                        “{review.quote}”
                      </blockquote>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="relative h-[520px] w-full max-w-lg">
                  {order.map((reviewIndex, stackIndex) => {
                    const review = REVIEWS[reviewIndex];
                    const offset = Math.min(stackIndex, 4);
                    const rotationSeed = ROTATIONS[reviewIndex % ROTATIONS.length];

                    return (
                      <motion.article
                        key={review.id}
                        className="absolute inset-0 flex h-full w-full flex-col justify-between rounded-3xl border border-white/12 bg-[#141922]/95 p-8 shadow-[0_30px_80px_rgba(2,12,22,0.45)] text-left text-cloud will-change-transform"
                        initial={false}
                        animate={{
                          y: offset * STACK_OFFSET,
                          scale: 1 - offset * 0.04,
                          rotate: rotationSeed * (direction === 1 ? 1 : -1) * (stackIndex === 0 ? 1 : 0.6),
                          opacity: offset > 3 ? 0 : 1,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ zIndex: REVIEWS.length - stackIndex }}
                        aria-hidden={stackIndex !== 0}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <span
                              className={cn(
                                'flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold uppercase text-ink',
                                review.avatar.gradient,
                              )}
                              aria-hidden
                            >
                              {review.avatar.initials}
                            </span>
                            <div>
                              <p className="text-base font-semibold tracking-tight text-cloud">{review.name}</p>
                              <p className="text-sm text-cloud/60">
                                {review.role} · {review.company}
                              </p>
                            </div>
                          </div>
                          {renderRating(review.rating)}
                        </div>
                        <blockquote className="text-balance text-lg font-medium italic text-cloud/90 sm:text-xl">
                          “{review.quote}”
                        </blockquote>
                      </motion.article>
                    );
                  })}
                  <div className="sr-only" aria-live="polite">
                    Showing feedback from {topReview?.name}, {topReview?.role} at {topReview?.company}.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
