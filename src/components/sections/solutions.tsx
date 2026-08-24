'use client';

import { useReducer, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Quote, Building2, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { SOLUTION_CASES, ROI_CALCULATOR } from '@/lib/site-data';
import { CaseStudyModal } from '@/components/site/case-study-modal';

interface State {
  filter: string; // 'all' | industry id
}

type Action = { type: 'SET_FILTER'; filter: string };

function reducer(state: State, action: Action): State {
  if (action.type === 'SET_FILTER') {
    return { ...state, filter: action.filter };
  }
  return state;
}

const initialState: State = { filter: 'all' };

/**
 * Solutions / Customer Stories section — 6 case study cards in a responsive
 * grid. Click any card to open a CaseStudyModal with the full challenge /
 * solution / results narrative. Filter chips let visitors narrow by industry.
 *
 * Premium aesthetics: per-story accent color, gradient hover border, lift on
 * hover, sticky "Browse all" CTA bar at bottom.
 */
export function Solutions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    state.filter === 'all'
      ? SOLUTION_CASES
      : SOLUTION_CASES.filter((c) => c.industryId === state.filter);

  const chips = [{ id: 'all', label: 'All stories', count: SOLUTION_CASES.length }].concat(
    ROI_CALCULATOR.industries.map((ind) => ({
      id: ind.id,
      label: ind.label,
      count: SOLUTION_CASES.filter((c) => c.industryId === ind.id).length,
    }))
  );

  return (
    <section
      id="case-studies"
      className="relative w-full bg-gradient-to-b from-white via-[#f5f7fa] to-white py-20 lg:py-28 overflow-hidden"
      aria-label="Customer stories"
    >
      {/* Decorative barcode + hairline pattern */}
      <div aria-hidden className="absolute inset-0 bg-barcode opacity-25 pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1d81f2]/30 to-transparent"
      />
      {/* Soft accent blobs */}
      <div
        aria-hidden
        className="absolute -top-20 left-[5%] h-[280px] w-[280px] rounded-full bg-[#1d81f2]/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-[8%] h-[320px] w-[320px] rounded-full bg-[#24a148]/5 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* Header */}
        <Reveal className="max-w-[820px]">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#1d81f2]" />
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              Customer stories
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            Outcomes our customers can put a number on.
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6] max-w-[640px]">
            Six reference stories across automotive, equipment, fleet, marine,
            energy, and banking — each with audited metrics on cost, cycle
            time, and conversion. Click any card to read the full story.
          </p>
        </Reveal>

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          {chips.map((chip) => {
            const isActive = state.filter === chip.id;
            const count = chip.count ?? 0;
            return (
              <button
                key={chip.id}
                onClick={() => dispatch({ type: 'SET_FILTER', filter: chip.id })}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'chip-selected text-white'
                    : 'bg-white border border-[#e0e0e0] text-[#525252] hover:border-[#1d81f2]/40 hover:text-[#1d81f2]'
                }`}
              >
                <span>{chip.label}</span>
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#f5f7fa] text-[#6b7280]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <motion.div layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((story, i) => (
              <motion.button
                key={story.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpenId(story.id)}
                className="group relative text-left rounded-2xl bg-white border border-[#e0e0e0] p-6 lg:p-7 overflow-hidden lift-on-hover-strong hover:shadow-premium-lg transition-all duration-300"
                aria-label={`Read case study: ${story.headline}`}
              >
                {/* Top accent strip — colored per story */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${story.accent}, transparent)` }}
                />
                {/* Hover glow blob */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                  style={{ backgroundColor: story.accent }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: logo + industry */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white font-semibold text-[14px] tracking-tight shadow-soft"
                      style={{ backgroundColor: story.accent }}
                    >
                      {story.logo}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f7fa] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] border border-[#e0e0e0]">
                      <Building2 className="h-3 w-3" />
                      {story.industry}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="mt-5 text-[18px] sm:text-[19px] font-semibold text-[#161616] leading-snug">
                    {story.headline}
                  </h3>

                  {/* Company */}
                  <p className="mt-2 text-[13px] text-[#6b7280] leading-snug">
                    {story.company} · {story.year}
                  </p>

                  {/* Metrics strip */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {story.metrics.map((m, j) => (
                      <div
                        key={j}
                        className="rounded-lg bg-[#f5f7fa] border border-[#e0e0e0]/60 p-2.5 text-center"
                      >
                        <div
                          className="text-[14px] sm:text-[15px] font-semibold tracking-tight leading-none"
                          style={{ color: story.accent }}
                        >
                          {m.value}
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-wider text-[#6b7280] leading-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="mt-6 pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-[13px] font-semibold text-[#1d81f2]">
                    <span>Read full story</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-[#e0e0e0] p-10 text-center text-[14px] text-[#6b7280]">
            No case studies under this industry yet.{' '}
            <button
              onClick={() => dispatch({ type: 'SET_FILTER', filter: 'all' })}
              className="text-[#1d81f2] font-semibold hover:underline"
            >
              View all stories
            </button>
          </div>
        )}

        {/* Bottom CTA strip — browse all / talk to specialist */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#1f2124] to-[#0f172a] p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:justify-between relative overflow-hidden">
          {/* Soft accent */}
          <div
            aria-hidden
            className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#1d81f2]/20 blur-3xl pointer-events-none"
          />
          <div className="relative z-10 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
              <Quote className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[15px] sm:text-[16px] font-semibold text-white leading-snug">
                200+ enterprise customers across 30+ countries
              </div>
              <div className="mt-1 text-[13px] text-white/65">
                Talk to a specialist about a comparable reference in your industry.
              </div>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <CTAButton href="#contact" variant="outline" className="text-[14px] px-5 py-2.5 border-white/30 text-white hover:bg-white/10">
              Talk to a specialist
              <ChevronRight className="h-4 w-4" />
            </CTAButton>
            <CTAButton href="#roi" className="text-[14px] px-5 py-2.5">
              Estimate your ROI
              <ArrowUpRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </div>
      </div>

      <CaseStudyModal id={openId} onClose={() => setOpenId(null)} />
    </section>
  );
}
