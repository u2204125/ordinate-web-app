"use client";

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  prefersReducedMotion: boolean;
  hydrated: boolean;
};

const THEME_STORAGE_KEY = 'ordinate-theme';
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  document.body.dataset.theme = theme;
}

function applyMotionPreference(prefersReducedMotion: boolean) {
  const root = document.documentElement;
  root.setAttribute('data-motion', prefersReducedMotion ? 'reduced' : 'allowed');
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<Theme>(() => getInitialTheme());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    applyTheme(themeState);
    window.localStorage.setItem(THEME_STORAGE_KEY, themeState);
  }, [themeState]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setPrefersReducedMotion(media.matches);
    };
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    applyMotionPreference(prefersReducedMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        setThemeState(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    setHydrated(true);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (!stored) {
        setThemeState(event.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => setThemeState(nextTheme), []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: themeState,
      setTheme,
      toggleTheme: () => setThemeState((current: Theme) => (current === 'dark' ? 'light' : 'dark')),
      prefersReducedMotion,
      hydrated,
    }),
    [themeState, setTheme, prefersReducedMotion, hydrated],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
