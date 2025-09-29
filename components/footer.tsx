"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useSmoothScrollTo } from '@/lib/useSmoothScrollTo';
import { GitHubIcon } from '@/icons/github';
import { LinkedInIcon } from '@/icons/linkedin';
import { useTheme } from '@/components/theme/theme-provider';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ordinate-studio',
    icon: LinkedInIcon,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/ordinate-studio',
    icon: GitHubIcon,
  },
];

export function Footer() {
  const { prefersReducedMotion } = useTheme();
  const scrollTo = useSmoothScrollTo(prefersReducedMotion, 80);

  const handleBackToTop = useCallback(() => {
    scrollTo('#hero');
  }, [scrollTo]);

  return (
    <footer className="relative border-t border-white/8 bg-ink/95 text-cloud">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" aria-hidden />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          <div className="flex flex-col gap-6">
            <Link href="#hero" className="flex items-center gap-4" onClick={(event) => {
              event.preventDefault();
              scrollTo('#hero');
            }}>
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                <Image src="/logo-ordinate.svg" alt="Ordinate logo" fill sizes="48px" className="object-contain p-2" />
              </div>
              <div className="text-left">
                <p className="text-base font-semibold tracking-tight text-cloud">Ordinate</p>
                <p className="text-sm text-cloud/60">The Framework for Certainity</p>
              </div>
            </Link>
            <p className="max-w-md text-sm text-cloud/65">
              We partner with product orgs to remove ambiguity from delivery, bringing neon precision to every launch.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
                <Link
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cloud transition hover:border-white/40 hover:text-cyan"
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <nav className="flex flex-col gap-3 text-sm text-cloud/70">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cloud/50">Navigate</p>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(`#${link.id}`)}
                  className="text-left transition hover:text-cloud"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-4 text-sm text-cloud/70">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cloud/50">Resources</p>
              <Link href="/privacy" prefetch={false} className="transition hover:text-cloud">
                Privacy
              </Link>
              <Link href="/terms" prefetch={false} className="transition hover:text-cloud">
                Terms
              </Link>
              <Link href="mailto:softnetsolutionsbd@gmail.com" className="transition hover:text-cloud">
                Email us
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-cloud/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ordinate Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="ghost" className="border border-white/20 px-4 text-xs text-cloud/70" onClick={handleBackToTop}>
              Back to top
            </Button>
            <span className="text-cloud/45">Crafted with precision in Next.js 14</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
