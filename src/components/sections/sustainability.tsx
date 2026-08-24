'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { ESG_PILLARS } from '@/lib/site-data';

/**
 * Premium "Sustainability & ESG" section — 4 ESG pillars in a 2x2 grid,
 * each with an animated progress bar, metric callout, and hover lift.
 * Backed by ESG_PILLARS data in lib/site-data.ts.
 */
export function Sustainability() {
  return (
    <section
      id="esg"
      className="relative w-full bg-gradient-to-b from-[#f5f7fa] to-white py-20 lg:py-28 overflow-hidden"
      aria-label="Sustainability & ESG"
    >
      {/* Subtle topographic grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#0f62fe 1px, transparent 1px), linear-gradient(90deg, #0f62fe 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Soft accent blobs */}
      <div
        aria-hidden
        className="absolute -top-32 left-[10%] h-[360px] w-[360px] rounded-full bg-[#24a148]/8 blur-3xl animate-float-slow pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 right-[6%] h-[300px] w-[300px] rounded-full bg-[#1d81f2]/6 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — section header */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#24a148]" />
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                Sustainability &amp; ESG
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
              Building a finance industry that is solvent, secure, and sustainable
            </h2>
            <p className="mt-5 text-[15px] lg:text-[17px] text-[#525252] leading-[1.65]">
              NETSOL's ESG framework runs through every line of code we ship —
              from the contracts our customers retire on paper, to the
              engineers we hire, to the audit committees that govern our
              public entity.
            </p>

            {/* Quick metric strip */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: '4.2M', l: 'sheets of paper saved' },
                { v: '1,900+', l: 'engineers globally' },
                { v: '18%', l: 'revenue → R&D' },
              ].map((m) => (
                <div
                  key={m.l}
                  className="rounded-xl bg-white border border-[#e0e0e0] p-3 text-center"
                >
                  <div className="text-[20px] font-semibold text-[#1d81f2] leading-none">
                    {m.v}
                  </div>
                  <div className="mt-1.5 text-[10.5px] uppercase tracking-wider text-[#6b7280] leading-tight">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <CTAButton href="#contact" className="text-[14px] px-5 py-2.5">
                Read the 2025 report
              </CTAButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#161616] hover:text-[#1d81f2] transition-colors"
              >
                ESG investor relations
              </a>
            </div>
          </Reveal>

          {/* RIGHT — pillars grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ESG_PILLARS.map((p, i) => (
              <PillarCard key={p.id} pillar={p} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom: certifications / pledge strip */}
        <Reveal delay={0.15}>
          <div className="mt-14 rounded-2xl border border-[#e0e0e0] bg-white/80 backdrop-blur p-6 lg:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                Our pledge
              </div>
              <p className="mt-2 text-[16px] lg:text-[18px] font-medium text-[#161616] leading-snug">
                Carbon-neutral operations across all six delivery centers by 2028 — independently audited and reported annually.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] uppercase tracking-widest text-[#6b7280]">
              {['TCFD', 'GRI', 'CDP', 'UN PRI'].map((c) => (
                <span key={c} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#24a148]" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof ESG_PILLARS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl bg-white border border-[#e0e0e0] p-6 lg:p-7 overflow-hidden hover:shadow-premium-lg transition-all duration-300"
    >
      {/* Top accent strip */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${pillar.accent}, transparent)` }}
      />
      {/* Hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl"
        style={{ backgroundColor: pillar.accent }}
      />

      <div className="relative z-10">
        {/* Header row: icon + tag */}
        <div className="flex items-start justify-between mb-5">
          <span
            className="inline-flex items-center justify-center h-12 w-12 rounded-xl text-white shadow-soft"
            style={{ backgroundColor: pillar.accent }}
          >
            <PillarIcon name={pillar.icon} />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#9ca3af]">
            0{index + 1}
          </span>
        </div>

        <div className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280]">
          {pillar.title}
        </div>
        <h3 className="mt-1.5 text-[18px] lg:text-[20px] font-semibold text-[#161616] leading-snug">
          {pillar.headline}
        </h3>
        <p className="mt-3 text-[13.5px] lg:text-[14.5px] text-[#525252] leading-[1.65]">
          {pillar.description}
        </p>

        {/* Animated progress bar */}
        <div className="mt-6">
          <div className="flex items-end justify-between mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#6b7280]">
              2025 progress
            </span>
            <span
              className="text-[15px] font-semibold"
              style={{ color: pillar.accent }}
            >
              {pillar.progress}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#f5f7fa] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${pillar.progress}%` } : {}}
              transition={{ duration: 1.1, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${pillar.accent}, ${pillar.accent}aa)`,
                boxShadow: `0 0 12px ${pillar.accent}55`,
              }}
            />
          </div>
        </div>

        {/* Metric footer */}
        <div className="mt-6 pt-5 border-t border-[#f0f0f0] flex items-end justify-between">
          <div>
            <div
              className="text-[24px] lg:text-[28px] font-semibold leading-none tracking-tight"
              style={{ color: pillar.accent }}
            >
              {pillar.metric}
            </div>
            <div className="mt-1.5 text-[12px] text-[#6b7280]">
              {pillar.metricLabel}
            </div>
          </div>
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
            style={{ color: pillar.accent }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: pillar.accent }} />
            On track
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PillarIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none' } as const;
  switch (name) {
    case 'leaf':
      return (
        <svg {...common}>
          <path
            d="M12 3C7 6 4 11 4 16c0 3 2 5 5 5 5 0 9-7 11-13 .5-2 1-4 2-5-3 0-7 1-10 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5 19c4-3 8-6 11-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'people':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 20c0-2 1-3.5 3-4.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'shield-check':
      return (
        <svg {...common}>
          <path
            d="M12 3L4 6V11C4 15.5 7.5 19.5 12 21C16.5 19.5 20 15.5 20 11V6L12 3Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path
            d="M12 3L13.5 9.5L20 11L13.5 12.5L12 19L10.5 12.5L4 11L10.5 9.5L12 3Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="19" cy="5" r="1.2" fill="currentColor" />
          <circle cx="5" cy="19" r="1.2" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
