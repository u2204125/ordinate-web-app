"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/theme-provider';
import { useScramble } from '@/lib/useScramble';
import { useSmoothScrollTo } from '@/lib/useSmoothScrollTo';

const HEADLINES = [
  'Build Fast. Launch Right.',
  'Reliability by Design.',
  'Vision to Victory.',
];

const SUBTITLES = [
  'Full control. Zero surprises.',
  'Data-driven. Real-time insights.',
  'Proven systems. Guaranteed results.',
];

function usePrefersReducedData() {
  const [reducedData, setReducedData] = useState(false);

  useEffect(() => {
    type NavigatorWithConnection = Navigator & {
      connection?: {
        saveData?: boolean;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    };

    const connection = (navigator as NavigatorWithConnection)?.connection;
    if (!connection) {
      return;
    }

    const update = () => {
      setReducedData(Boolean(connection.saveData));
    };

    update();
    connection.addEventListener?.('change', update);
    return () => connection.removeEventListener?.('change', update);
  }, []);

  return reducedData;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const subtitleTimerRef = useRef<number | null>(null);
  const previousHeadlineScrambling = useRef(false);
  const { prefersReducedMotion } = useTheme();
  const prefersReducedData = usePrefersReducedData();
  const shouldPauseVideo = prefersReducedMotion || prefersReducedData;
  const scrollTo = useSmoothScrollTo(prefersReducedMotion, 80);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [subtitleIteration, setSubtitleIteration] = useState(0);
  const currentSubtitle = useMemo(() => SUBTITLES[subtitleIndex] ?? '', [subtitleIndex]);
  const subtitlePhrase = useMemo(() => [currentSubtitle], [currentSubtitle]);

  const headline = useScramble({
    phrases: HEADLINES,
    delay: 5200,
    prefersReducedMotion,
    speed: 24,
    scrambleInterval: 5,
  });

  const subtitle = useScramble({
    phrases: subtitlePhrase,
    delay: 0,
    prefersReducedMotion,
    loop: false,
    speed: 20,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    autoStart: subtitleIteration > 0,
    iteration: subtitleIteration,
    scrambleInterval: 6,
  });

  useEffect(() => {
    return () => {
      if (subtitleTimerRef.current !== null) {
        window.clearTimeout(subtitleTimerRef.current);
        subtitleTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setSubtitleIndex(headline.index % SUBTITLES.length);
      setSubtitleIteration(0);
      return;
    }

    if (previousHeadlineScrambling.current && !headline.isScrambling && !subtitle.isScrambling) {
      if (subtitleTimerRef.current !== null) {
        window.clearTimeout(subtitleTimerRef.current);
        subtitleTimerRef.current = null;
      }
      subtitleTimerRef.current = window.setTimeout(() => {
        const nextIndex = headline.index % SUBTITLES.length;
        setSubtitleIndex(nextIndex);
        setSubtitleIteration((iteration) => iteration + 1);
      }, 180);
    }

    previousHeadlineScrambling.current = headline.isScrambling;
  }, [headline.index, headline.isScrambling, prefersReducedMotion, subtitle.isScrambling]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (shouldPauseVideo) {
      video.pause();
    } else if (video.paused) {
      void video.play().catch(() => {
        /* noop */
      });
    }
  }, [shouldPauseVideo]);

  const arrow = useMemo(
    () => (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 5v14m0 0-5-5m5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    [],
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100vh] flex-col justify-center overflow-hidden pt-32 text-cloud scroll-mt-[var(--header-height)]"
      tabIndex={-1}
    >
      <div className="absolute inset-0 -z-20">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster="/hero-bg.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/hero-bg.webm" type="video/webm" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--cyan)/18%,transparent_55%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/55 to-ink" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 text-center mt-[-170px] sm:mt-[-120px] md:mt-[-80px]">
        <div className="space-y-6 text-balance">
          <h1
            id="hero-title"
            className="font-semibold tracking-tight text-cloud"
            style={{ fontSize: 'clamp(2.75rem, 4vw + 1rem, 4.5rem)' }}
          >
            {headline.text}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-cloud/80" aria-live="polite">
            {subtitle.text}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            type="button"
            variant="primary"
            className="min-w-[10rem]"
            onClick={() => scrollTo('#contact')}
          >
            Start Your Project
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="min-w-[10rem] border border-white/20 text-cloud hover:border-white/40"
            onClick={() => scrollTo('#services')}
          >
            Explore Services
          </Button>
        </div>
      </div>

      {!prefersReducedMotion && (
        <div className="absolute bottom-5 flex w-full justify-center">
          <button
            type="button"
            aria-label="Go to about section"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-cloud shadow-[0_0_25px_rgba(0,209,255,0.25)] transition hover:border-white/40 focus-visible:outline focus-visible:outline-cyan"
            onClick={() => scrollTo('#about')}
          >
            <span className="animate-bounce drop-shadow-[0_0_16px_rgba(0,209,255,0.25)]">{arrow}</span>
          </button>
        </div>
      )}
    </section>
  );
}
