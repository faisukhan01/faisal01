'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, staggerItem } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { Magnetic } from '@/components/site/magnetic';
import { WHO_WE_SERVE } from '@/lib/site-data';
import { cn } from '@/lib/utils';

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
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="max-w-[820px]">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-7 w-[2px] bg-[#1d81f2]" />
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              Who We Serve
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            Built for every actor in the asset finance value chain
          </h2>
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
                'relative p-7 lg:p-8 rounded-2xl border border-[#f0f0f0] bg-white hover:bg-[#f5f7fa]/40 transition-colors duration-300 group',
                i < 2 && 'md:border-r-0'
              )}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-7 right-7 h-[3px] bg-gradient-to-r from-[#1d81f2] to-transparent rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-center h-16 w-16 rounded-xl border border-[#e0e0e0] bg-white text-[#1d81f2] group-hover:bg-[#1d81f2] group-hover:text-white transition-colors duration-300">
                <ServeIcon icon={col.icon} />
              </div>

              <h3 className="mt-6 text-[20px] lg:text-[22px] font-semibold tracking-tight text-[#161616]">
                {col.title}
              </h3>
              <p className="mt-3 text-[14px] lg:text-[15px] text-[#525252] leading-[1.65]">
                {col.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-[14px] font-medium text-[#1d81f2] opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Decorative number */}
              <span className="absolute top-4 right-5 text-[64px] font-bold leading-none text-[#1d81f2]/5 select-none">
                0{i + 1}
              </span>
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
