import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink text-cloud flex flex-col">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-base font-medium tracking-tight text-cloud">
            <Image src="/logo-dark-transparent.png" alt="Ordinate logo" width={42} height={42} className="text-cloud" />
            <span>Ordinate</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Display */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-cyan/5 blur-3xl" aria-hidden />
            </div>
            <div className="relative">
              <h1 className="text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-tighter">
                <span className="bg-gradient-to-br from-cloud via-cyan to-cloud/60 bg-clip-text text-transparent">
                  404
                </span>
              </h1>
              <div className="absolute inset-x-0 -bottom-2 h-1 bg-gradient-to-r from-transparent via-cyan/40 to-transparent rounded-full" aria-hidden />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
              Page Not Found
            </h2>
            <p className="text-lg text-cloud/60 max-w-md mx-auto">
              The page you&apos;re looking for has been moved or deleted. Let&apos;s get you back on track.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-cyan px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-cyan/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Back to Home
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-cloud transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Contact Us
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cloud/50">
              Quick Links
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <Link href="/#about" className="text-cloud/70 transition hover:text-cyan">
                About
              </Link>
              <span className="text-cloud/20">•</span>
              <Link href="/#services" className="text-cloud/70 transition hover:text-cyan">
                Services
              </Link>
              <span className="text-cloud/20">•</span>
              <Link href="/#reviews" className="text-cloud/70 transition hover:text-cyan">
                Reviews
              </Link>
              <span className="text-cloud/20">•</span>
              <Link href="/terms-and-privacy" className="text-cloud/70 transition hover:text-cyan">
                Terms & Privacy
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-ink/95 text-cloud">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" aria-hidden />
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-cloud/50">
          <p>© {new Date().getFullYear()} Ordinate Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
