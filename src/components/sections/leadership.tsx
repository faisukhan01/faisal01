'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Plane } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';

const LEADERS = [
  {
    name: 'Najeeb Ghauri',
    role: 'Founder & Chief Executive Officer',
    accent: '#1d81f2',
    initials: 'NG',
  },
  {
    name: 'Aamir Khan',
    role: 'Chief Technology Officer',
    accent: '#24a148',
    initials: 'AK',
  },
  {
    name: 'Roger A. Bentley',
    role: 'Chief Financial Officer',
    accent: '#0f62fe',
    initials: 'RB',
  },
  {
    name: 'Salim Ghauri',
    role: 'Chairman, NETSOL Asia Pacific',
    accent: '#2d9cdb',
    initials: 'SG',
  },
];

const OFFICES = [
  { city: 'Los Angeles', country: 'USA', kind: 'HQ', accent: '#1d81f2' },
  { city: 'London', country: 'United Kingdom', kind: 'EMEA', accent: '#0f62fe' },
  { city: 'Beijing', country: 'China', kind: 'APAC', accent: '#24a148' },
  { city: 'Bangkok', country: 'Thailand', kind: 'APAC', accent: '#2d9cdb' },
  { city: 'Lahore', country: 'Pakistan', kind: 'Delivery', accent: '#56ccf2' },
  { city: 'Manila', country: 'Philippines', kind: 'Delivery', accent: '#1d81f2' },
];

/** Premium "Leadership & Global Presence" section — two-row layout:
 *  - Top: 4 leadership cards with gradient blob backgrounds
 *  - Bottom: 6 global office dots connected by a dashed plane route */
export function Leadership() {
  return (
    <section
      id="leadership"
      className="relative w-full bg-[#f5f7fa] py-20 lg:py-28 overflow-hidden"
      aria-label="Leadership & Global Presence"
    >
      {/* Decorative barcode */}
      <div aria-hidden className="absolute inset-0 bg-barcode opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="max-w-[820px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#1d81f2]" />
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              Leadership & Global Presence
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            The people and places behind NETSOL
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6]">
            Four decades of asset-finance leadership, anchored across six
            global delivery centers — supporting customers in 30+ countries.
          </p>
        </Reveal>

        {/* Leadership cards */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {LEADERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl bg-white border border-[#e0e0e0] p-6 overflow-hidden hover:shadow-premium-lg transition-all duration-300"
            >
              {/* Top accent strip */}
              <span
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
              />

              {/* Hover glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: p.accent }}
              />

              {/* Avatar */}
              <div
                className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white text-[18px] font-semibold shadow-soft"
                style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)` }}
              >
                {p.initials}
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#24a148] ring-2 ring-white" />
              </div>

              <h3 className="mt-5 text-[16px] lg:text-[17px] font-semibold text-[#161616] leading-tight">
                {p.name}
              </h3>
              <p className="mt-1 text-[13px] text-[#6b7280] leading-[1.5]">
                {p.role}
              </p>

              <div className="mt-5 pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider"
                  style={{ color: p.accent }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
                  Verified
                </span>
                <a
                  href="#contact"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#6b7280] hover:text-white hover:bg-[#1d81f2] transition-colors"
                  aria-label={`Connect with ${p.name}`}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global presence — dotted plane route */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl bg-white border border-[#e0e0e0] p-8 lg:p-10 overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                  Global presence
                </div>
                <h3 className="mt-1 text-[22px] lg:text-[26px] font-semibold text-[#161616]">
                  Six delivery centers across three continents
                </h3>
              </div>
              <CTAButton href="#contact" variant="outline" className="text-[14px] px-5 py-2.5">
                Visit an office
              </CTAButton>
            </div>

            {/* Plane route strip */}
            <div className="relative">
              {/* Dashed route line */}
              <svg
                aria-hidden
                viewBox="0 0 1000 60"
                className="absolute inset-x-0 top-[18px] h-[24px] w-full hidden sm:block pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 60 30 Q 220 -10, 360 30 T 660 30 T 940 30"
                  fill="none"
                  stroke="#1d81f2"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
              </svg>
              <Plane
                aria-hidden
                className="absolute top-[14px] h-4 w-4 text-[#1d81f2] hidden sm:block animate-float-slow"
                style={{ left: 'calc(50% - 8px)' }}
              />

              {/* Office dots */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
                {OFFICES.map((o, i) => (
                  <motion.div
                    key={o.city}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="group flex flex-col items-center text-center"
                  >
                    <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f7fa] border border-[#e0e0e0] mb-2 group-hover:scale-110 transition-transform">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: o.accent }}
                      />
                      <span
                        className="absolute inset-0 rounded-full animate-pulse-ring"
                        style={{ boxShadow: `0 0 0 4px ${o.accent}22` }}
                      />
                    </span>
                    <span className="flex items-center gap-1 text-[14px] font-semibold text-[#161616]">
                      <MapPin className="h-3 w-3 text-[#6b7280]" />
                      {o.city}
                    </span>
                    <span className="text-[12px] text-[#6b7280]">{o.country}</span>
                    <span
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest"
                      style={{ color: o.accent }}
                    >
                      {o.kind}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
