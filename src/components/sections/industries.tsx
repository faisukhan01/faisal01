'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, staggerItem } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

interface Industry {
  id: string;
  name: string;
  blurb: string;
  accent: string;
  bg: string;
  metrics: { label: string; value: string }[];
  icon: 'car' | 'truck' | 'tractor' | 'ship' | 'plug' | 'bank';
}

const INDUSTRIES: Industry[] = [
  {
    id: 'automotive',
    name: 'Automotive Finance',
    blurb:
      'From captives to dealer floor-plan and remarketing — the full auto finance stack, including EV residual intelligence.',
    accent: '#1d81f2',
    bg: '#eaf3ff',
    metrics: [
      { label: 'Vehicles under contract', value: '4.2M+' },
      { label: 'Dealer networks', value: '38' },
    ],
    icon: 'car',
  },
  {
    id: 'equipment',
    name: 'Equipment Finance',
    blurb:
      'Yellow goods, construction, manufacturing — usage-based billing, meter integration, and asset condition monitoring.',
    accent: '#24a148',
    bg: '#f0f9f4',
    metrics: [
      { label: 'Asset classes', value: '120+' },
      { label: 'Avg. contract', value: '47 mo' },
    ],
    icon: 'tractor',
  },
  {
    id: 'fleet',
    name: 'Fleet & Mobility',
    blurb:
      'Subscription, mobility-as-a-service, fleet leasing — flexible tenure, mileage pooling, and remarketing automation.',
    accent: '#2d9cdb',
    bg: '#e8f6fc',
    metrics: [
      { label: 'Active fleets', value: '560+' },
      { label: 'Subscribers', value: '1.8M' },
    ],
    icon: 'truck',
  },
  {
    id: 'marine',
    name: 'Marine & Aviation',
    blurb:
      'High-value asset finance for yachts, commercial vessels, and aircraft — multi-jurisdiction, multi-currency, multi-asset.',
    accent: '#0f62fe',
    bg: '#eef4ff',
    metrics: [
      { label: 'Avg. ticket', value: '$2.4M' },
      { label: 'Jurisdictions', value: '14' },
    ],
    icon: 'ship',
  },
  {
    id: 'energy',
    name: 'Energy & Renewables',
    blurb:
      'Solar PPAs, battery leasing, EV charging infrastructure — metered contracts and green residual modelling.',
    accent: '#16a34a',
    bg: '#f0fdf4',
    metrics: [
      { label: 'MW under contract', value: '8.7 GW' },
      { label: 'PPAs managed', value: '210+' },
    ],
    icon: 'plug',
  },
  {
    id: 'banking',
    name: 'Banking & Lessor',
    blurb:
      'For independent lessors and banks entering asset finance — full origination, servicing, and portfolio analytics out of the box.',
    accent: '#1d4ed8',
    bg: '#eff6ff',
    metrics: [
      { label: 'Live lenders', value: '90+' },
      { label: 'Countries', value: '30+' },
    ],
    icon: 'bank',
  },
];

function IndustryIcon({ icon, color }: { icon: Industry['icon']; color: string }) {
  const common = { stroke: color, strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (icon === 'car') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
        <path d="M3 13L5 8C5.4 7 6 6.5 7 6.5H17C18 6.5 18.6 7 19 8L21 13V18H19V17H5V18H3V13Z" />
        <circle cx="7.5" cy="14.5" r="1.2" fill={color} />
        <circle cx="16.5" cy="14.5" r="1.2" fill={color} />
      </svg>
    );
  }
  if (icon === 'tractor') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
        <circle cx="6" cy="17" r="3.2" />
        <circle cx="17" cy="17" r="2.4" />
        <path d="M9 17V12H14L16 8H19V14.5" />
        <path d="M9 12L8 9H6" />
      </svg>
    );
  }
  if (icon === 'truck') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
        <path d="M2 7H13V15H2V7Z" />
        <path d="M13 9H17L21 13V15H13V9Z" />
        <circle cx="6" cy="17" r="1.6" />
        <circle cx="17" cy="17" r="1.6" />
      </svg>
    );
  }
  if (icon === 'ship') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
        <path d="M3 18L5 14H19L21 18C20 19.5 16 20.5 12 20.5C8 20.5 4 19.5 3 18Z" />
        <path d="M12 4L8 14H16L12 4Z" />
      </svg>
    );
  }
  if (icon === 'plug') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
        <path d="M9 2V7M15 2V7M7 7H17V11C17 13.5 14.5 16 12 16C9.5 16 7 13.5 7 11V7ZM12 16V22" />
      </svg>
    );
  }
  // bank
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...common}>
      <path d="M3 21H21M5 21V10H19V21M9 21V14H15V21" />
      <path d="M3 10L12 4L21 10" />
      <path d="M5 7V10M19 7V10M9 7V10M15 7V10" />
    </svg>
  );
}

export function IndustriesWePower() {
  return (
    <section
      id="industries"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Industries we power"
    >
      {/* Decorative grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,98,254,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,98,254,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="max-w-[820px]">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-7 w-[2px] bg-[#1d81f2]" />
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              Industries We Power
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            One platform. Every asset class.
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6] max-w-[680px]">
            Transcend's data model adapts to the asset class you finance — from
            a $3,000 consumer lease to a $40M syndicated aviation portfolio.
            Same primitives, different policies.
          </p>
        </Reveal>

        <Stagger
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={0.08}
        >
          {INDUSTRIES.map((ind) => (
            <motion.article
              key={ind.id}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-[#f0f0f0] bg-white p-6 hover:border-[#e0e0e0] hover:shadow-premium-lg transition-shadow"
            >
              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: ind.accent }}
              />

              {/* Decorative icon tile */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                style={{ backgroundColor: ind.bg, color: ind.accent }}
              >
                <IndustryIcon icon={ind.icon} color={ind.accent} />
              </div>

              <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-[#161616]">
                {ind.name}
              </h3>
              <p className="mt-2.5 text-[14px] text-[#525252] leading-[1.6] clamp-3">
                {ind.blurb}
              </p>

              {/* Metrics row */}
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#f0f0f0] pt-4">
                {ind.metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      className="text-[18px] font-bold leading-none tracking-tight"
                      style={{ color: ind.accent }}
                    >
                      {m.value}
                    </div>
                    <div className="mt-1 text-[11px] text-[#6b7280] leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hover arrow */}
              <div
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
                style={{ backgroundColor: ind.bg, color: ind.accent }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke={ind.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Decorative gradient blob */}
              <div
                aria-hidden
                className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: ind.accent }}
              />
            </motion.article>
          ))}
        </Stagger>

        {/* Bottom bar */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#e0e0e0] bg-gradient-to-r from-[#f5f7fa] to-white p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d81f2]/10 text-[#1d81f2]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-[#161616]">
                  Don't see your asset class?
                </div>
                <div className="text-[13px] text-[#525252]">
                  We've deployed Transcend on assets we can't even list here.
                  Talk to us.
                </div>
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#1d81f2] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0f62fe] transition-colors shadow-[0_4px_12px_-2px_rgba(15,98,254,0.45)]"
            >
              Talk to a domain expert
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
