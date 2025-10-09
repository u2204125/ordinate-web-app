import type { JSXElement } from 'react';
import { WhatsAppIcon } from '@/icons/whatsapp';

export default function MaintenancePage(): JSXElement {
  return (
  <div className="flex min-h-screen flex-col items-center justify-center bg-ink text-cloud relative overflow-hidden px-2">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-cyan/20 to-transparent rounded-full animate-pulse" />
        </div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-tl from-cyan/20 to-transparent rounded-full animate-pulse animation-delay-1000" />
        </div>
      </div>

  <div className="relative z-10 text-center px-4 sm:px-6 max-w-full sm:max-w-2xl mx-auto">
        {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img
                src="/logo-dark-transparent.png"
                alt="Ordinate Logo"
                className="object-contain block mx-auto w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Ordinate</h1>
          </div>

        {/* Main content */}
  <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              We'll Be Right Back
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-cyan mx-auto rounded-full" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-cloud/80 leading-relaxed">
            We're making some exciting improvements to bring you an even better experience.<br className="block sm:hidden" />
            Our team is working hard to get everything ready.
          </p>

          {/* Progress indicator */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-cyan rounded-full animate-bounce animation-delay-200" />
              <div className="w-2 h-2 bg-cyan rounded-full animate-bounce animation-delay-400" />
            </div>
            <p className="text-xs sm:text-sm text-cloud/60">
              Expected to be back online soon
            </p>
          </div>

          {/* Contact info */}
          <div className="pt-8 border-t border-graphite/50">
            <p className="text-xs sm:text-sm text-cloud/60 mb-4">
              Need immediate assistance?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="mailto:ordinate.bd70@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-graphite hover:bg-graphite/80 rounded-lg transition-colors text-xs sm:text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
              <a
                href="https://wa.me/8801817118765"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-graphite hover:bg-graphite/80 rounded-lg transition-colors text-xs sm:text-sm font-medium"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, var(--cyan) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
}