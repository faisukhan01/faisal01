'use client';

import { useReducer } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus, TrendingDown, Trophy, Info } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { COMPARISON_MATRIX } from '@/lib/site-data';

interface State {
  hoverRow: number | null;
}

type Action = { type: 'SET_HOVER'; row: number | null };

function reducer(state: State, action: Action): State {
  if (action.type === 'SET_HOVER') {
    if (action.row === state.hoverRow) return state;
    return { ...state, hoverRow: action.row };
  }
  return state;
}

const initialState: State = { hoverRow: null };

/**
 * Comparison table — NETSOL Transcend vs generic competitors.
 * Premium sticky-column table with row hover highlight, per-competitor
 * accent strip, "Best value" badge on NETSOL column, and check / X / partial
 * icons rendered per-cell.
 *
 * Mobile: collapses to stacked cards (one per competitor) for legibility.
 */
export function Comparison() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { competitors, rows } = COMPARISON_MATRIX;
  const netsolCompetitor = competitors.find((c) => c.id === 'netsol')!;

  /** Render the per-cell icon — check / partial / X — or a string label. */
  const renderCell = (value: string, accent: string) => {
    if (value === 'full') {
      return (
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: accent }}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="text-[13px] font-medium text-[#161616]">Included</span>
        </span>
      );
    }
    if (value === 'partial') {
      return (
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]">
            <Minus className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="text-[13px] font-medium text-[#525252]">Partial</span>
        </span>
      );
    }
    if (value === 'none') {
      return (
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fee2e2] text-[#dc2626]">
            <X className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="text-[13px] font-medium text-[#9ca3af]">Not included</span>
        </span>
      );
    }
    // Numeric or text label
    return (
      <span
        className="text-[14px] font-semibold tracking-tight"
        style={{ color: accent }}
      >
        {value}
      </span>
    );
  };

  return (
    <section
      id="comparison"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Transcend vs Legacy comparison"
    >
      {/* Decorative hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1d81f2]/30 to-transparent"
      />
      {/* Soft accent blob */}
      <div
        aria-hidden
        className="absolute top-0 right-[6%] h-[300px] w-[300px] rounded-full bg-[#1d81f2]/4 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* Header */}
        <Reveal className="max-w-[820px]">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-[#1d81f2]/10 text-[#1d81f2]">
              <Trophy className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              Transcend vs the alternatives
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            The honest comparison no vendor wants to publish.
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6] max-w-[640px]">
            We mapped NETSOL Transcend against the three paths buyers typically
            evaluate — generic SaaS, on-prem suites, and in-house builds. The
            numbers are customer-validated, not marketing projections.
          </p>
        </Reveal>

        {/* Desktop table — sticky first column */}
        <Reveal className="mt-12 hidden lg:block">
          <div className="rounded-2xl border border-[#e0e0e0] overflow-hidden shadow-premium">
            {/* Header row */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] bg-gradient-to-r from-[#f5f7fa] to-white">
              {/* Sticky first column header */}
              <div className="px-6 py-6 border-r border-[#e0e0e0] flex items-center gap-2">
                <Info className="h-4 w-4 text-[#9ca3af]" />
                <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                  Capability
                </span>
              </div>
              {competitors.map((c) => (
                <div
                  key={c.id}
                  className={`relative px-4 py-6 text-center ${
                    c.highlight ? 'bg-gradient-to-b from-[#1d81f2]/8 to-[#1d81f2]/2' : ''
                  }`}
                >
                  {/* Top accent strip on highlighted column */}
                  {c.highlight && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 right-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${c.accent}, #56ccf2)` }}
                    />
                  )}
                  {/* Best-value badge */}
                  {c.badge && (
                    <span className="absolute -top-px left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-gradient-to-r from-[#1d81f2] to-[#0f62fe] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-soft">
                      <Trophy className="h-3 w-3 mr-1" />
                      {c.badge}
                    </span>
                  )}
                  <div
                    className={`text-[15px] font-semibold leading-tight ${
                      c.highlight ? 'text-[#1d81f2]' : 'text-[#161616]'
                    }`}
                  >
                    {c.name}
                  </div>
                  <div className="mt-1.5 text-[12px] text-[#6b7280] leading-tight">
                    {c.tagline}
                  </div>
                </div>
              ))}
            </div>

            {/* Body rows */}
            {rows.map((row, i) => {
              const isHovered = state.hoverRow === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => dispatch({ type: 'SET_HOVER', row: i })}
                  onMouseLeave={() => dispatch({ type: 'SET_HOVER', row: null })}
                  className={`grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] border-t border-[#f0f0f0] transition-colors duration-200 ${
                    isHovered ? 'bg-[#f0f8ff]/50' : 'bg-white'
                  }`}
                >
                  {/* Sticky first column — capability */}
                  <div className="px-6 py-5 border-r border-[#e0e0e0]">
                    <div className="text-[14px] font-semibold text-[#161616] leading-snug">
                      {row.label}
                    </div>
                    <div className="mt-1 text-[12px] text-[#6b7280] leading-snug">
                      {row.detail}
                    </div>
                  </div>
                  {/* Cell values */}
                  {competitors.map((c) => {
                    const v = (row.values as Record<string, string>)[c.id];
                    return (
                      <div
                        key={c.id}
                        className={`flex items-center justify-center px-4 py-5 text-center ${
                          c.highlight ? 'bg-[#1d81f2]/3' : ''
                        }`}
                      >
                        {renderCell(v, c.accent)}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Footer row — CTA per column */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] border-t border-[#e0e0e0] bg-gradient-to-r from-white to-[#f5f7fa]">
              <div className="px-6 py-5 border-r border-[#e0e0e0] flex items-center">
                <span className="text-[12px] text-[#6b7280]">
                  Talk to a specialist about your path.
                </span>
              </div>
              <div className="px-4 py-4 flex justify-center bg-[#1d81f2]/5">
                <CTAButton href="#contact" className="text-[13px] px-4 py-2">
                  Get a demo
                </CTAButton>
              </div>
              {competitors.filter((c) => !c.highlight).map((c) => (
                <div key={c.id} className="px-4 py-4 flex justify-center text-center">
                  <span className="text-[12px] text-[#9ca3af]">Contact vendor</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mobile: stacked cards per competitor */}
        <div className="mt-10 lg:hidden space-y-5">
          {competitors.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl border overflow-hidden ${
                c.highlight ? 'border-[#1d81f2]/40 shadow-premium' : 'border-[#e0e0e0]'
              }`}
            >
              {c.highlight && (
                <span
                  aria-hidden
                  className="absolute left-0 top-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, ${c.accent}, #56ccf2)` }}
                />
              )}
              <div className={`px-5 py-4 ${c.highlight ? 'bg-[#1d81f2]/5' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div
                    className={`text-[16px] font-semibold ${
                      c.highlight ? 'text-[#1d81f2]' : 'text-[#161616]'
                    }`}
                  >
                    {c.name}
                  </div>
                  {c.badge && (
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1d81f2] to-[#0f62fe] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                      {c.badge}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[12px] text-[#6b7280]">{c.tagline}</div>
              </div>
              <div className="divide-y divide-[#f0f0f0]">
                {rows.map((row, i) => {
                  const v = (row.values as Record<string, string>)[c.id];
                  return (
                    <div key={i} className="px-5 py-3.5">
                      <div className="text-[12px] font-semibold text-[#161616] leading-snug">
                        {row.label}
                      </div>
                      <div className="mt-1.5">{renderCell(v, c.accent)}</div>
                    </div>
                  );
                })}
              </div>
              {c.highlight && (
                <div className="px-5 py-4 bg-[#1d81f2]/5 border-t border-[#1d81f2]/15">
                  <CTAButton href="#contact" className="w-full justify-center text-[13px] px-4 py-2.5">
                    Get a demo
                  </CTAButton>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-6 flex items-center gap-2 text-[12px] text-[#6b7280]">
          <TrendingDown className="h-4 w-4 text-[#24a148]" />
          <span>
            TCO figures indexed to NETSOL = 1× across 200+ customer migrations. Lower is better.
          </span>
        </div>
      </div>
    </section>
  );
}
