"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useActiveSection from '@/lib/useActiveSection';
import { Button } from '@/components/ui/button';
import { MenuIcon } from '@/icons/menu';
import { MobileDrawer, type NavItem } from '@/components/navigation/mobile-drawer';
import { useTheme } from '@/components/theme/theme-provider';
import { useSmoothScrollTo } from '@/lib/useSmoothScrollTo';

const NAV_ITEMS: NavItem[] = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.href);

export function Navbar() {
  const { prefersReducedMotion } = useTheme();
  const smoothScrollTo = useSmoothScrollTo(prefersReducedMotion, 80);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useActiveSection(NAV_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onNavigate = useCallback(
    (href: string) => {
      if (href.startsWith('#')) {
        smoothScrollTo(href);
      } else {
        window.location.href = href;
      }
    },
    [smoothScrollTo],
  );

  const headerClasses = useMemo(
    () =>
      [
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        isScrolled ? 'border-b border-white/10 bg-ink/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]' : 'bg-transparent',
      ].join(' '),
    [isScrolled],
  );

  const handleLinkClick = useCallback(
    (href: string) => {
      onNavigate(href);
      setDrawerOpen(false);
      // update active state immediately when navigating via the nav
      setActiveHref(href);
    },
    [onNavigate, setActiveHref],
  );

  return (
    <>
      <header className={headerClasses}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="#hero"
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-3 text-base font-medium tracking-tight text-cloud"
          >
            <Image src="/logo-dark-transparent.png" alt="Ordinate logo" width={42} height={42} priority className="text-cloud" />
            <span className="hidden sm:inline">Ordinate</span>
          </Link>
          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2 py-1 text-sm font-medium text-cloud/80 backdrop-blur-xl lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === activeHref;
              const base = 'rounded-full px-3 py-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-cyan';
              const active = isActive ? 'bg-white/10 text-cyan ring-1 ring-cyan/30' : '';
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleLinkClick(item.href)}
                  className={[base, active].filter(Boolean).join(' ')}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="hidden items-center lg:flex">
            <Button type="button" variant="primary" onClick={() => handleLinkClick('#contact')}>
              Start Your Project
            </Button>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-base"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer
        items={NAV_ITEMS}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={handleLinkClick}
        activeHref={activeHref}
      />
    </>
  );
}
