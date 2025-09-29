"use client";

import dynamic from 'next/dynamic';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';
import { useArcCarousel } from '@/lib/useArcCarousel';
import { useInViewAnimation } from '@/lib/useInViewAnimation';
import type { ServiceVisualId, ServicesVisualProps } from './servicesVisual';

const ServicesVisual = dynamic<ServicesVisualProps>(
  () => import('./servicesVisual').then((mod) => mod.ServicesVisual),
  {
  ssr: false,
  loading: () => <div className="h-[260px] w-full rounded-3xl border border-white/10 bg-white/5" aria-hidden />,
  },
);

type ServiceId = ServiceVisualId;

type ServiceItem = {
  id: ServiceId;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
  accent: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: 'web-apps',
    title: 'Web Applications',
    summary: 'Design and ship fast, reliable web platforms aligned with your velocity targets.',
    description:
      'We translate strategy into modular systems, build resilient frontends, and operationalize release cadences for product teams.',
    bullets: ['Atomic design systems mapped to your stack', 'Observability baked into every deploy', 'Rollout playbooks aligned to OKRs'],
    accent: 'from-cyan/40 via-cyan/15 to-transparent',
  },
  {
    id: 'app-dev',
    title: 'App Development',
    summary: 'Partner pods that deliver native-feel experiences, optimized for retention.',
    description:
      'Our squads cover cross-platform architectures, delivery pipelines, and telemetry that keeps iteration loops tight.',
    bullets: ['Shared component kits across platforms', 'Continuous delivery with release guards', 'Session replay and retention dashboards'],
    accent: 'from-violet-500/40 via-violet-500/15 to-transparent',
  },
  {
    id: 'marketing',
    title: 'Lifecycle Marketing',
    summary: 'Launch campaigns with clear attribution, automated insights, and creative velocity.',
    description:
      'We wire analytics, automate nurture journeys, and keep creative refresh cycles humming with contextual experimentation.',
    bullets: ['Multi-channel attribution dashboards', 'Creative ops templates with motion specs', 'Automated experiment orchestration'],
    accent: 'from-amber-400/50 via-amber-400/20 to-transparent',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    summary: 'Operationalize AI assistants and copilots that respect latency, privacy, and trust.',
    description:
      'We deliver guardrailed pipelines, evaluation harnesses, and service layers that keep human feedback in the loop.',
    bullets: ['Model evaluation dashboards with guardrails', 'Prompt ops toolkit with versioning', 'Secure data access layers + red-team drills'],
    accent: 'from-emerald-400/40 via-emerald-400/15 to-transparent',
  },
];

type ArcButtonState = {
  id: string;
  label: string;
  summary: string;
};

const ARC_BUTTONS: ArcButtonState[] = SERVICES.map((service) => ({
  id: service.id,
  label: service.title,
  summary: service.summary,
}));

export function ServicesSection() {
  const { prefersReducedMotion } = useTheme();
  const { ref, inView } = useInViewAnimation<HTMLDivElement>({ rootMargin: '-15% 0px', threshold: 0.35 });
  const [userNavigated, setUserNavigated] = useState(false);

  const { activeIndex, select, move, positions } = useArcCarousel({
    items: ARC_BUTTONS,
    visibleCount: 3,
    radius: prefersReducedMotion ? 0 : 140,
    center: { x: 0, y: prefersReducedMotion ? 0 : 10 },
    reducedMotion: prefersReducedMotion,
  });

  useEffect(() => {
    if (prefersReducedMotion || userNavigated) {
      return undefined;
    }
    const interval = window.setInterval(() => {
      move(1);
    }, 7800);
    return () => window.clearInterval(interval);
  }, [move, prefersReducedMotion, userNavigated]);

  const activeService = SERVICES[activeIndex];

  const handleSelect = useCallback(
    (index: number) => {
      setUserNavigated(true);
      select(index);
    },
    [select],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setUserNavigated(true);
        move(-1);
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        setUserNavigated(true);
        move(1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        setUserNavigated(true);
        select(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setUserNavigated(true);
        select(SERVICES.length - 1);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setUserNavigated(true);
        handleSelect(index);
      }
    },
    [handleSelect, move, select],
  );

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-[var(--header-height)] bg-gradient-to-b from-ink via-[#0f1218] to-ink"
      tabIndex={-1}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-24 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div ref={ref} className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cloud/60">Services</p>
          <h2 id="services-heading" className="text-balance text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">
            Every lane ships with its own engine room.
          </h2>
          <p className="max-w-xl text-balance text-base text-cloud/70">
            Curated pods for each specialty keep pace with ambitious roadmaps. Select a lane to see how Ordinate deploys talent,
            tooling, and rituals tuned to your outcomes.
          </p>
          <div
            id={`services-panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`services-tab-${activeService.id}`}
            className={cn(
              'relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br p-8 transition-all md:p-10',
              activeService.accent,
              prefersReducedMotion ? 'opacity-100' : 'shadow-[0_0_40px_rgba(0,209,255,0.16)]',
              inView && !prefersReducedMotion ? 'animate-in fade-in slide-in-from-left-4' : '',
            )}
          >
            <div className="relative space-y-4 text-cloud">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{activeService.title}</h3>
              <p className="text-base text-cloud/75 sm:text-lg">{activeService.summary}</p>
              <p className="text-sm text-cloud/70 sm:text-base">{activeService.description}</p>
              <ul className="grid gap-2 text-sm text-cloud/75 sm:text-base">
                {activeService.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="button" variant="primary" className="px-5">
                  View case studies
                </Button>
                <Button type="button" variant="ghost" className="border border-white/20 px-5 text-cloud/80">
                  Schedule a scope call
                </Button>
              </div>
            </div>
          </div>
          <ServicesVisual serviceId={activeService.id} reducedMotion={prefersReducedMotion} />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-6 lg:items-stretch">
          <div className="relative h-[360px] w-full max-w-md self-center rounded-[2.5rem] border border-white/8 bg-black/20 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] lg:max-w-none">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,#00d1ff26,transparent_65%)]" aria-hidden />
            <div
              role="tablist"
              aria-label="Select a service"
              className="relative h-full w-full"
            >
              {!prefersReducedMotion && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              )}
              {positions.map((position, index) => {
                const service = SERVICES[index];
                const isActive = position.isActive;
                const isVisible = prefersReducedMotion ? true : position.isVisible;

                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    id={`services-tab-${service.id}`}
                    aria-controls={`services-panel-${service.id}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onFocus={() => handleSelect(index)}
                    onMouseEnter={() => handleSelect(index)}
                    onClick={() => handleSelect(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={cn(
                      'absolute flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-3xl border border-white/12 bg-white/10 px-4 text-center text-sm font-semibold text-cloud transition will-change-transform focus-visible:outline focus-visible:outline-cyan/70',
                      isActive
                        ? 'border-cyan/40 bg-cyan/20 text-ink shadow-[0_0_40px_rgba(0,209,255,0.35)]'
                        : 'text-cloud/75 hover:border-white/25 hover:bg-white/15',
                      prefersReducedMotion ? 'relative static mx-auto mb-3 w-full max-w-xs translate-x-0 translate-y-0' : '',
                    )}
                    style={
                      prefersReducedMotion
                        ? undefined
                        : {
                            transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, 0) rotate(${-position.angle}deg) scale(${position.scale})`,
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? 'auto' : 'none',
                            zIndex: position.zIndex,
                          }
                    }
                  >
                    <span className="text-xs uppercase tracking-[0.28em] text-cloud/50">{index + 1}</span>
                    <span className="text-sm font-semibold leading-snug">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/5 p-6 text-balance text-center text-sm text-cloud/70">
            Use ← → to rotate lanes. Press Enter to select. Reduced motion toggles a simplified list view.
          </div>
        </div>
      </div>
    </section>
  );
}
