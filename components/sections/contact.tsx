"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';

const CONTACT_EMAIL = 'softnetsolutionsbd@gmail.com';
const MAILTO_SUBJECT = encodeURIComponent('Project collaboration with Ordinate');
const MAILTO_BODY = encodeURIComponent('Hi Ordinate team,\n\nWe would love to collaborate on...\n');

const WEBMAIL_LINKS = [
  {
    id: 'gmail',
    label: 'Gmail',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${MAILTO_SUBJECT.replace(/%20/g, '+')}`,
  },
  {
    id: 'outlook',
    label: 'Outlook',
    href: `https://outlook.live.com/owa/?path=/mail/action/compose&to=${CONTACT_EMAIL}`,
  },
  {
    id: 'yahoo',
    label: 'Yahoo Mail',
    href: `https://compose.mail.yahoo.com/?to=${CONTACT_EMAIL}`,
  },
];

export function ContactSection() {
  const { prefersReducedMotion } = useTheme();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy email', error);
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-[var(--header-height)] bg-gradient-to-b from-ink via-[#0f1118] to-ink"
      tabIndex={-1}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-24 text-center text-cloud">
        <div className={cn('flex w-full max-w-3xl flex-col gap-6', prefersReducedMotion ? '' : 'animate-in fade-in slide-in-from-bottom-4')}>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cloud/60">Contact</p>
          <h2 id="contact-heading" className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Ship certainty with a single email.
          </h2>
          <p className="text-balance text-base text-cloud/70 sm:text-lg">
            Tell us what you&apos;re building, and we&apos;ll map the playbook, the pods, and the launch rituals to get you there.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button
            type="button"
            className="px-6 py-3 text-base"
            onClick={() => {
              const href = `mailto:${CONTACT_EMAIL}?subject=${MAILTO_SUBJECT}&body=${MAILTO_BODY}`;
              window.location.href = href;
            }}
          >
            Open {CONTACT_EMAIL}
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-cloud/70">
            {WEBMAIL_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="rounded-full border border-white/15 px-3 py-1 transition hover:border-white/30 hover:text-cloud"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="border border-white/25 px-4 text-cloud/80"
            onClick={handleCopy}
            aria-describedby="contact-copy-status"
          >
            Copy email address
          </Button>
          <div
            id="contact-copy-status"
            role="status"
            aria-live="polite"
            className={cn(
              'min-h-[1.5rem] text-sm text-cloud/60 transition-opacity duration-300',
              copied ? 'opacity-100' : 'opacity-0'
            )}
          >
            {copied ? 'Email copied to clipboard.' : ''}
          </div>
        </div>
      </div>
    </section>
  );
}
