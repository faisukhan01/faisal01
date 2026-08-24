'use client';

import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';

export function CTABanner() {
  return (
    <section
      id="contact"
      className="relative w-full bg-white py-20 lg:py-32 overflow-hidden"
      aria-label="Contact us"
    >
      {/* Decorative mesh + barcode */}
      <div aria-hidden className="absolute inset-0 mesh-gradient opacity-80" />
      <div aria-hidden className="absolute inset-0 bg-barcode opacity-30" />

      {/* Floating shapes */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-[#1d81f2]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[760px] px-5 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#1d81f2] animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              Let's talk
            </span>
          </div>
          <h2 className="text-[36px] sm:text-[44px] lg:text-[56px] font-semibold tracking-[-0.02em] text-[#161616] leading-[1.05]">
            Let's talk about what's next
          </h2>
          <p className="mt-5 text-[16px] lg:text-[18px] text-[#525252] leading-[1.6] max-w-[560px] mx-auto">
            Rethink what your company can do with the right partner by your side.
            Tell us where you're going — and we'll show you the platform that
            gets you there.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="#contact">Contact Us</CTAButton>
            <a
              href="#marketplace"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[#161616] hover:text-[#1d81f2] transition-colors"
            >
              Browse the marketplace
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
