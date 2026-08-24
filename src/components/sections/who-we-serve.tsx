'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, staggerItem } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { Magnetic } from '@/components/site/magnetic';
import { WHO_WE_SERVE } from '@/lib/site-data';
import { cn } from '@/lib/utils';

const AUDIENCE_LABELS = ['Captives', 'OEMs', 'Brokers'] as const;

function ServeIcon({ icon }: { icon: string }) {
  if (icon === 'building') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 21H21M5 21V5L13 3V21M19 21V11L13 9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M9 9H9.01M9 13H9.01M9 17H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === 'car') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 13L5 8C5.4 7 6 6.5 7 6.5H17C18 6.5 18.6 7 19 8L21 13V18H19V17H5V18H3V13Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="7.5" cy="14.5" r="1.2" fill="currentColor" />
        <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 6L9 9M18 6L15 9M6 18L9 15M18 18L15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <circle cx="12" cy="21" r="1.5" fill="currentColor" />
      <circle cx="3" cy="12" r="1.5" fill="currentColor" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function WhoWeServe() {
  return (
    <section
      id="solutions"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Who We Serve"
    >
      {/* Premium mesh-gradient overlay */}
      <div aria-hidden className="mesh-gradient absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="max-w-[820px]">
          <span className="section-heading-chip">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d81f2] live-pulse-dot" aria-hidden />
            Who We Serve
          </span>
          <h2 className="mt-5 text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            Built for every actor in the asset finance value chain
          </h2>
          <div className="section-rule mt-6" aria-hidden />
          <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6] max-w-[680px]">
            From captives and OEMs to brokers and aggregators — Transcend adapts
            to your operating model, your channels, and your regulatory perimeter.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8" stagger={0.12}>
          {WHO_WE_SERVE.map((col, i) => (
            <motion.div
              key={col.id}
              variants={staggerItem}
              className={cn(
                'card-stack-3d lift-on-hover-strong shadow-depth-lg group relative rounded-2xl border border-[#f0f0f0] bg-white p-7 lg:p-8 hover:bg-[#f5f7fa]/40',
                i < 2 && 'md:border-r-0'
              )}
            >
              {/* Top accent stripe (premium gradient) */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{
                  background:
                    'linear-gradient(90deg, #1d81f2 0%, #56ccf2 60%, transparent 100%)',
                }}
              />

              {/* Editorial faded number behind card content */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-2 right-3 select-none font-mono-numeric text-[80px] font-bold leading-none"
                style={{ color: 'rgba(29, 129, 242, 0.08)' }}
              >
                0{i + 1}
              </span>

              {/* Audience badge (top-right corner) */}
              <span className="absolute top-4 right-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#1d81f2]/20 bg-[#1d81f2]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1d81f2]">
                <span className="h-1 w-1 rounded-full bg-[#1d81f2]" aria-hidden />
                {AUDIENCE_LABELS[i]}
              </span>

              {/* Icon tile with gradient border + glow halo */}
              <div className="gradient-border-animated glow-halo relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#1d81f2] transition-colors duration-300 group-hover:bg-[#1d81f2] group-hover:text-white">
                <ServeIcon icon={col.icon} />
              </div>

              <h3 className="nav-link-underline mt-6 inline-block text-[20px] lg:text-[22px] font-semibold tracking-tight text-[#161616]">
                {col.title}
              </h3>
              <p className="mt-3 text-[14px] lg:text-[15px] text-[#525252] leading-[1.65]">
                {col.description}
              </p>

              {/* CTA link inside card */}
              <div className="nav-link-underline mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[#1d81f2] opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Magnetic as="div" strength={0.25} className="inline-block">
            <CTAButton href="#contact">Connect with us</CTAButton>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
