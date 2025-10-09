import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import '../globals.css';
import '@/styles/tokens.css';
import { ThemeProvider } from '@/components/theme/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Maintenance | Ordinate',
  description: 'We\'ll be right back. Ordinate is currently undergoing maintenance.',
  robots: {
    index: false,
    follow: false,
  },
};

const themeScript = `(() => {
  const storageKey = 'ordinate-theme';
  const root = document.documentElement;
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') {
      root.setAttribute('data-theme', stored);
      document.body.dataset.theme = stored;
      return;
    }
  } catch (error) {
    console.warn('Theme storage unavailable', error);
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  document.body.dataset.theme = theme;
})();`;

export default function MaintenanceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} relative bg-ink text-cloud antialiased transition-colors selection:bg-cyan/40 selection:text-ink`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}