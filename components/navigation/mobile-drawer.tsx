"use client";

import { useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CloseIcon } from '@/icons/close';
import { useScrollLock } from '@/lib/useScrollLock';

export type NavItem = {
  href: string;
  label: string;
};

type MobileDrawerProps = {
  items: NavItem[];
  open: boolean;
  onNavigate: (href: string) => void;
  onClose: () => void;
};

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input[type="text"]:not([disabled])',
  'input[type="radio"]:not([disabled])',
  'input[type="checkbox"]:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function MobileDrawer({ items, open, onNavigate, onClose }: MobileDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusables = useRef<HTMLElement[]>([]);

  useScrollLock(open);

  useEffect(() => {
    if (!open) {
      focusables.current = [];
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    focusables.current = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusables.current[0]?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || focusables.current.length === 0) {
        return;
      }

      const { activeElement } = document;
      const currentIndex = focusables.current.indexOf(activeElement as HTMLElement);
      const lastIndex = focusables.current.length - 1;

      if (event.shiftKey) {
        if (currentIndex <= 0) {
          event.preventDefault();
          focusables.current[lastIndex]?.focus();
        }
      } else if (currentIndex === lastIndex) {
        event.preventDefault();
        focusables.current[0]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleNavigate = useMemo(
    () =>
      (href: string) => {
        onNavigate(href);
        onClose();
      },
    [onNavigate, onClose],
  );

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close navigation"
        className="absolute inset-0 h-full w-full"
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        ref={containerRef}
        className="absolute right-4 top-[5.25rem] flex w-[min(20rem,85vw)] flex-col gap-6 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,var(--cloud)/10,rgba(15,17,21,0.95))] p-6 text-left text-lg shadow-2xl shadow-black/40"
        aria-labelledby="mobile-drawer-heading"
      >
        <div className="flex items-center justify-between">
          <h2 id="mobile-drawer-heading" className="text-sm uppercase tracking-[0.2em] text-cloud/70">
            Navigate
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cloud/10 text-base"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col gap-3 text-base font-medium text-cloud/90">
            {items.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className="w-full rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-left transition hover:border-white/40 focus-visible:outline focus-visible:outline-cyan"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          type="button"
          variant="primary"
          className="w-full"
          onClick={() => handleNavigate('#contact')}
        >
          Build with Ordinate
        </Button>
      </div>
    </div>
  );
}
