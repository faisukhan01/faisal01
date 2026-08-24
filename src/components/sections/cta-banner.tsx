'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { Magnetic } from '@/components/site/magnetic';

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
      {/* Animated rotating ring */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border border-dashed border-[#1d81f2]/20 pointer-events-none hidden sm:block"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full border border-[#1d81f2]/10 pointer-events-none hidden sm:block"
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
            <Magnetic as="div" strength={0.25} className="inline-block">
              <CTAButton href="#contact">Contact Us</CTAButton>
            </Magnetic>
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

          {/* Trust indicators */}
          <div className="mt-12 pt-10 border-t border-[#e0e0e0] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-[#6b7280]">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#24a148]" />
              25+ years on NASDAQ: NTWK
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#24a148]" />
              200+ enterprise customers
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#24a148]" />
              ISO 27001 certified
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
