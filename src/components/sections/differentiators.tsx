'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { DIFFERENTIATORS } from '@/lib/site-data';

/** NETSOL "Why us" 4-column differentiators grid with animated gradient borders. */
export function Differentiators() {
  return (
    <section
      id="why-netsol"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Why NETSOL"
    >
      {/* Decorative top accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1d81f2]/30 to-transparent"
      />
      {/* Subtle barcode texture */}
      <div aria-hidden className="absolute inset-0 bg-barcode opacity-25 pointer-events-none" />
      {/* Premium mesh-gradient overlay on section background */}
      <div
        aria-hidden
        className="mesh-gradient pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="max-w-[820px]">
          {/* Premium heading chip */}
          <span className="section-heading-chip">
            <span aria-hidden className="category-dot text-[#1d81f2]" />
            WHAT SETS US APART
          </span>
          <h2 className="mt-4 text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            Four reasons the world&apos;s leading asset finance brands choose us
          </h2>
          {/* Premium gradient hairline under heading */}
          <div aria-hidden className="section-rule mt-5" />
          <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6] max-w-[640px]">
            We&apos;re not a feature vendor. We&apos;re the operating system
            beneath some of the largest asset finance books on the planet — and
            we have the receipts to prove it.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl bg-white border border-[#e0e0e0] p-6 lg:p-7 card-stack-3d lift-on-hover shadow-depth-lg"
            >
              {/* Top accent stripe — 3px gradient per-card accent → light-blue fade */}
              <span
                aria-hidden
                className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, ${d.accent}, #56ccf2)`,
                }}
              />

              {/* Hover glow blob (extends beyond card edges — premium bleed) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: d.accent }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: icon tile + evidence badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <span
                    className="gradient-border-animated glow-halo relative inline-flex items-center justify-center h-12 w-12 rounded-xl text-white shadow-soft"
                    style={{ backgroundColor: d.accent }}
                  >
                    <span className="relative z-10 inline-flex items-center justify-center">
                      <DifferentiatorIcon name={d.icon} />
                    </span>
                  </span>
                  <span className="evidence-badge">
                    <Check className="h-3 w-3" aria-hidden />
                    VERIFIED
                  </span>
                </div>

                <h3 className="nav-link-underline inline-block text-[18px] lg:text-[20px] font-semibold text-[#161616] leading-snug">
                  {d.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] lg:text-[14.5px] text-[#525252] leading-[1.65] flex-1">
                  {d.description}
                </p>

                {/* Metric — premium gradient + tabular numerics */}
                <div className="mt-6 pt-5 border-t border-[#f0f0f0]">
                  <div className="text-[22px] lg:text-[26px] font-semibold leading-none tracking-tight text-gradient-animated font-mono-numeric">
                    {d.metric}
                  </div>
                  <div className="mt-1 text-[12px] text-[#6b7280]">
                    {d.metricLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip: certifications / partners */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-widest text-[#6b7280]">
            <Cert label="ISO 27001" />
            <Cert label="SOC 2 Type II" />
            <Cert label="GDPR" />
            <Cert label="PCI-DSS" />
            <Cert label="NASDAQ: NTWK" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cert({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#24a148]" />
      {label}
    </span>
  );
}

function DifferentiatorIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none' } as const;
  switch (name) {
    case 'mesh':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="14" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="6" cy="20" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="20" r="2.4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 6L12 14L18 6M12 14L6 20M12 14L18 20" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" />
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
    case 'shield':
      return (
        <svg {...common}>
          <path
            d="M12 3L4 6V11C4 15.5 7.5 19.5 12 21C16.5 19.5 20 15.5 20 11V6L12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
