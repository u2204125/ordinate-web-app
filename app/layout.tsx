import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/tokens.css';
import { ThemeProvider } from '@/components/theme/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const metadataBase = new URL('https://ordinate.studio');

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Ordinate — Your Trust, Our Motivation',
    template: '%s · Ordinate',
  },
  description: 'Ordinate helps teams build reliable, high-performance products with confidence.',
  keywords: [
    'Ordinate',
    'web app studio',
    'product design',
    'technical consultancy',
    'digital transformation',
  ],
  openGraph: {
    title: 'Ordinate — Your Trust, Our Motivation',
    description: 'Ordinate helps teams build reliable, high-performance products with confidence.',
    url: metadataBase,
    siteName: 'Ordinate',
    images: [
      {
        url: '/og-ordinate.png',
        width: 1200,
        height: 630,
        alt: 'Ordinate — Your Trust, Our Motivation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ordinate — Your Trust, Our Motivation',
    description: 'Ordinate helps teams build reliable, high-performance products with confidence.',
    images: ['/og-ordinate.png'],
  },
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Ordinate Studio' }],
  applicationName: 'Ordinate',
  generator: 'Next.js 14',
  creator: 'Ordinate Studio',
  publisher: 'Ordinate Studio',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ordinate',
  url: metadataBase.href,
  logo: `${metadataBase.origin}/logo-ordinate.svg`,
  slogan: 'Your Trust, Our Motivation',
  sameAs: [
    'https://www.linkedin.com/company/ordinate',
    'https://github.com/ordinate',
  ],
  description: 'Ordinate is a web-app studio crafting reliable, high-performance digital products.',
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

export default function RootLayout({
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
