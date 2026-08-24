'use client';

import { motion } from 'framer-motion';
import { Trophy, ArrowUpRight, Quote } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CursorSpotlight } from '@/components/site/cursor-spotlight';
import { AWARDS } from '@/lib/site-data';

/**
 * Premium "Awards & Recognition" section — 8 awards in a horizontal scroll
 * rail with year tag, awarding body, and award title. Each card has a
 * trophy icon, accent color, and hover lift effect.
 *
 * Above the rail: a stats strip summarising total awards / years of
 * recognition / certifying bodies.
 */
export function Awards() {
  return (
    <section
      id="awards"
      className="relative w-full bg-[#0f172a] text-white py-20 lg:py-28 overflow-hidden grain-overlay"
      aria-label="Awards & Recognition"
    >
      {/* Topographic pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Soft accent blobs */}
      <div
        aria-hidden
        className="absolute -top-32 right-[8%] h-[400px] w-[400px] rounded-full bg-[#1d81f2]/15 blur-3xl animate-float-slow pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-[#24a148]/10 blur-3xl pointer-events-none"
      />

      <CursorSpotlight color="#1d81f2" size={520} intensity={0.16} className="mx-auto max-w-[1320px] px-5 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
          <Reveal className="lg:col-span-8">
            <span
              className="section-heading-chip backdrop-blur-sm mb-4"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#56ccf2] live-pulse-dot" aria-hidden />
              Awards &amp; Recognition
            </span>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight leading-tight">
              Recognition from the bodies that
              <span className="text-gradient-blue"> define the industry.</span>
            </h2>
            <div className="section-rule mt-6" aria-hidden />
            <p className="mt-5 text-[15px] lg:text-[17px] text-white/70 leading-[1.65] max-w-[640px]">
              Frost &amp; Sullivan, Stevie, AFSA, Globee, Brandon Hall, Forbes Asia —
              the institutions that set the bar for asset-finance excellence
              have set that bar around NETSOL.
            </p>
          </Reveal>

          {/* Quick stats */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3">
            {[
              { v: '8+', l: 'recent awards' },
              { v: '4', l: 'years listed' },
              { v: '6', l: 'certifying bodies' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-3 text-center"
              >
                <div className="text-gradient-animated font-mono-numeric text-[20px] font-semibold leading-none">
                  {s.v}
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-wider text-white/60 leading-tight">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards grid (2 rows of 4) with spotlight overlay behind */}
        <div className="relative">
          <div
            aria-hidden
            className="spotlight-gradient pointer-events-none absolute inset-0"
          />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AWARDS.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-border-animated lift-on-hover shadow-depth-lg group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20"
                style={{ background: 'rgba(255, 255, 255, 0.04)' }}
              >
                {/* Top accent strip (always visible) */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${a.accent} 0%, ${a.accent}99 60%, transparent 100%)` }}
                />
                {/* Hover glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 blur-2xl group-hover:opacity-30"
                  style={{ backgroundColor: a.accent }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  {/* Top row: trophy + year + badge */}
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className="glow-halo relative inline-flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${a.accent}25`,
                        color: a.accent,
                      }}
                    >
                      <Trophy className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-gradient-animated font-mono-numeric text-[14px] font-semibold tracking-widest">
                        {a.year}
                      </span>
                      <span className="evidence-badge">
                        <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
                        {a.id % 2 === 0 ? 'WINNER' : 'CERTIFIED'}
                      </span>
                    </div>
                  </div>

                  <div className="nav-link-underline inline-block text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    {a.body}
                  </div>
                  <h3 className="mt-1.5 flex-1 text-[16px] lg:text-[17px] font-semibold leading-snug text-white">
                    <span className="nav-link-underline inline-block">
                      {a.title}
                    </span>
                  </h3>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[11px] uppercase tracking-wider text-white/50">
                      Industry recognition
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom quote strip */}
        <Reveal delay={0.15}>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 lg:p-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div className="flex items-start gap-4 flex-1">
              <Quote className="h-8 w-8 text-[#56ccf2]/40 shrink-0" fill="currentColor" />
              <p className="text-[15px] lg:text-[17px] font-medium leading-snug text-white/90 max-w-[680px]">
                "NETSOL's Transcend Platform represents the industry's most
                complete evolution of asset-finance technology — unifying
                origination, servicing, AI, and marketplace into a single,
                audited mesh."
              </p>
            </div>
            <div className="text-[12px] uppercase tracking-widest text-white/50 md:text-right shrink-0">
              Frost &amp; Sullivan<br />
              <span className="text-white/40">2025 Award Citation</span>
            </div>
          </div>
        </Reveal>
      </CursorSpotlight>
    </section>
  );
}
