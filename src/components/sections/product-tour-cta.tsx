'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';
import { PRODUCT_TOUR } from '@/lib/site-data';
import { CTAButton } from '@/components/site/cta-button';
import { Magnetic } from '@/components/site/magnetic';
import { ProductTourModal } from '@/components/site/product-tour-modal';

/**
 * Premium in-page section that displays the product-tour CTA and
 * manages the ProductTourModal open state.
 *
 * Clicking the main CTA opens the tour at step 1.
 * Clicking any of the 5 step-preview chips opens the tour at that step.
 */
export function ProductTourCTA() {
  const [tourOpen, setTourOpen] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  // Session id — bumped on every openAt() call so the modal remounts with
  // fresh state (resets step to initialStep).
  const [sessionId, setSessionId] = useState(0);

  const openAt = (i: number) => {
    setInitialStep(i);
    setSessionId((s) => s + 1);
    setTourOpen(true);
  };

  return (
    <section
      id="tour"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-[#f5f7fa] to-white"
      aria-label="Interactive product tour"
    >
      {/* Soft spotlight background accents */}
      <div className="pointer-events-none absolute inset-0 spotlight-gradient" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[640px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            'radial-gradient(circle at center, rgba(29,129,242,0.22) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-heading-chip">
            <Sparkles className="h-3.5 w-3.5" />
            INTERACTIVE TOUR
          </span>

          <h2 className="mt-5 text-3xl lg:text-5xl font-bold text-[#161616] tracking-tight leading-tight">
            {PRODUCT_TOUR.title}
          </h2>

          <p className="mt-4 text-base lg:text-lg text-[#525252] leading-relaxed">
            {PRODUCT_TOUR.subtitle}
          </p>

          {/* CTA row */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Magnetic>
              <CTAButton onClick={() => openAt(0)} className="px-7 py-3.5">
                <Sparkles className="h-4 w-4" />
                {PRODUCT_TOUR.cta}
              </CTAButton>
            </Magnetic>

            <button
              type="button"
              onClick={() => openAt(0)}
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#e0e0e0] bg-white px-5 py-3 text-[14px] font-medium text-[#525252] hover:text-[#1d81f2] hover:border-[#1d81f2]/30 transition-all shadow-sm lift-on-hover"
            >
              <PlayCircle className="h-4 w-4" />
              <span>Watch 90-sec walkthrough</span>
            </button>
          </div>

          {/* Step preview chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
            {PRODUCT_TOUR.steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openAt(i)}
                  className="lift-on-hover inline-flex items-center gap-1.5 rounded-full bg-white border border-[#e0e0e0] px-3 py-1.5 text-[12px] font-medium text-[#525252] hover:text-[#161616] hover:border-[#1d81f2]/30 transition-all shadow-sm"
                  aria-label={`Open tour at step ${s.number}: ${s.label}`}
                >
                  <span className="font-mono text-[10px] text-[#9ca3af]">
                    {String(s.number).padStart(2, '0')}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: s.accent }}
                  />
                  {s.label}
                </button>
                {i < PRODUCT_TOUR.steps.length - 1 && (
                  <ArrowRight
                    className="h-3 w-3 text-[#9ca3af] shrink-0"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductTourModal
        key={sessionId}
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        initialStep={initialStep}
      />
    </section>
  );
}
