"use client";

import { useMemo } from 'react';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { SunIcon } from '@/icons/sun';
import { MoonIcon } from '@/icons/moon';

export function ThemeToggle() {
  const { theme, toggleTheme, hydrated, prefersReducedMotion } = useTheme();
  const showSun = hydrated ? theme === 'dark' : true;

  const iconWrapperClass = useMemo(
    () =>
      prefersReducedMotion
        ? 'flex h-full w-full items-center justify-center'
        : 'absolute inset-0 flex h-full w-full items-center justify-center transition-all duration-300 ease-out-expo',
    [prefersReducedMotion],
  );

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggleTheme}
      aria-label={`Activate ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-current/20 p-0 text-base"
    >
      <span className="relative flex h-full w-full items-center justify-center">
        <span
          className={`${iconWrapperClass} ${
            prefersReducedMotion ? '' : showSun ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
          }`}
        >
          <SunIcon className="h-5 w-5" />
        </span>
        <span
          className={`${iconWrapperClass} ${
            prefersReducedMotion ? '' : showSun ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`}
          aria-hidden={showSun}
        >
          <MoonIcon className="h-5 w-5" />
        </span>
      </span>
    </Button>
  );
}
