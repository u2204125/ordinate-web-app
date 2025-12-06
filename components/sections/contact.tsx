"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';
import { GmailIcon } from '@/icons/gmail';
import { OutlookIcon } from '@/icons/outlook';
import { YahooIcon } from '@/icons/yahoo';
import { WhatsAppIcon } from '@/icons/whatsapp';

const CONTACT_EMAIL = 'ordinate.bd70@gmail.com';
const WHATSAPP_NUMBER = '+8801817118765';
const WHATSAPP_MESSAGE = encodeURIComponent('Hi Ordinate team, I would love to collaborate on a project.');
const MAILTO_SUBJECT = encodeURIComponent('Project collaboration with Ordinate');
const MAILTO_BODY = encodeURIComponent('Hi Ordinate team,\n\nWe would love to collaborate on...\n');

const WEBMAIL_LINKS = [
  {
    id: 'gmail',
    label: 'Gmail',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${MAILTO_SUBJECT.replace(/%20/g, '+')}`,
    icon: GmailIcon,
  },
  {
    id: 'outlook',
    label: 'Outlook',
    href: `https://outlook.live.com/owa/?path=/mail/action/compose&to=${CONTACT_EMAIL}`,
    icon: OutlookIcon,
  },
  {
    id: 'yahoo',
    label: 'Yahoo Mail',
    href: `https://compose.mail.yahoo.com/?to=${CONTACT_EMAIL}`,
    icon: YahooIcon,
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

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-[var(--header-height)] bg-gradient-to-b from-ink via-[#0f1118] to-ink"
      tabIndex={-1}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-24 text-center text-cloud">
        <div className={cn('flex w-full max-w-3xl flex-col gap-6', prefersReducedMotion ? '' : 'animate-in fade-in slide-in-from-bottom-4')}>
          <p className="text-lg font-semibold uppercase tracking-[0.4em] text-cloud/60">Contact</p>
          <h2 id="contact-heading" className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Start your success journey today.
          </h2>
          <p className="text-balance text-base text-cloud/70 sm:text-lg">
            Share your vision with us. We&apos;ll build a complete roadmap with customized solutions, expert teams, and proven methods that take you to guaranteed success.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 max-w-md">
          {/* Email */}
          <div className="flex flex-col items-center gap-4 w-full">
            <Button
              type="button"
              className="px-6 py-3 text-base w-full"
              onClick={() => {
                const href = `mailto:${CONTACT_EMAIL}?subject=${MAILTO_SUBJECT}&body=${MAILTO_BODY}`;
                window.location.href = href;
              }}
            >
              Send Email Now
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-cloud/70">
              {WEBMAIL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 transition hover:border-white/30 hover:text-cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-sm text-cloud/50">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center gap-4 w-full">
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2 border border-white/25 px-6 py-3 text-base w-full text-cloud"
              onClick={() => {
                window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${WHATSAPP_MESSAGE}`, '_blank');
              }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
