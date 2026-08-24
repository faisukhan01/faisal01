'use client';

import { useReducer, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Sparkles,
  Clock,
  Clock3,
  Users,
  ArrowUpRight,
  RotateCcw,
  Info,
} from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { ROI_CALCULATOR } from '@/lib/site-data';

interface State {
  volume: number;
  current: number;
  target: number;
  industry: string;
  calculated: boolean;
}

type Action =
  | { type: 'SET_VOLUME'; v: number }
  | { type: 'SET_CURRENT'; v: number }
  | { type: 'SET_TARGET'; v: number }
  | { type: 'SET_INDUSTRY'; v: string }
  | { type: 'CALCULATE' }
  | { type: 'RESET' };

const initialState: State = {
  volume: ROI_CALCULATOR.volumeDefault,
  current: ROI_CALCULATOR.automationDefault,
  target: ROI_CALCULATOR.targetDefault,
  industry: ROI_CALCULATOR.industries[0].id,
  calculated: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_VOLUME':
      return { ...state, volume: action.v, calculated: false };
    case 'SET_CURRENT':
      return { ...state, current: action.v, calculated: false };
    case 'SET_TARGET':
      return { ...state, target: action.v, calculated: false };
    case 'SET_INDUSTRY':
      return { ...state, industry: action.v, calculated: false };
    case 'CALCULATE':
      return { ...state, calculated: true };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

/** Compact USD formatter — $1.2B / $48M / $5.4K */
function formatUsd(v: number): string {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`;
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

/** Number-with-commas formatter for FTE */
function formatFte(v: number): string {
  if (v >= 100) return Math.round(v).toString();
  if (v >= 10) return v.toFixed(0);
  return v.toFixed(1);
}

/** Build an SVG sparkline bar chart of annual savings across 5 years (assuming flat curve). */
function buildBars(annual: number): { year: string; value: number; pct: number }[] {
  // Conservative ramp: 35%, 65%, 85%, 100%, 100% of annual run-rate
  const ramp = [0.35, 0.65, 0.85, 1.0, 1.0];
  const max = annual * 1.0;
  return ramp.map((p, i) => ({
    year: `Y${i + 1}`,
    value: annual * p,
    pct: (annual * p) / max,
  }));
}

/**
 * Interactive ROI Calculator — three sliders + industry select. Live preview
 * of "potential savings" before the explicit "Calculate" reveal, which then
 * triggers a premium results card with animated counters and a 5-year bar chart.
 */
export function ROICalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const industry = ROI_CALCULATOR.industries.find((i) => i.id === state.industry)!;
  const multiplier = industry.multiplier;

  // Compute results (memoised — only recompute when inputs change)
  const results = useMemo(() => {
    const delta = (state.target - state.current) / 100; // % point increase (e.g. 0.57)
    const automatedVolume = state.volume * delta; // $ newly automated
    const hardSavings = automatedVolume * ROI_CALCULATOR.savingsRate * multiplier;

    // Time saved: based on contracts/year and hours per contract delta
    const contractsPerYear = state.volume / ROI_CALCULATOR.avgContractValue;
    const hoursSavedPerContract =
      ROI_CALCULATOR.baselineHoursPerContract -
      ROI_CALCULATOR.transcendHoursPerContract;
    // Only the newly-automated contracts save time
    const newAutomatedContracts = contractsPerYear * delta;
    const hoursSaved = newAutomatedContracts * hoursSavedPerContract;
    const fteFreed = hoursSaved / 2080; // 2080 work-hours per FTE per year

    // Payback: assume 1-year NETSOL license cost = 0.8% of automated volume, capped
    const licenseCost = Math.max(450_000, Math.min(automatedVolume * 0.008, 12_000_000));
    const paybackMonths = hardSavings > 0 ? (licenseCost / hardSavings) * 12 : 0;

    const bars = buildBars(hardSavings);
    const fiveYearSavings = hardSavings * 4.85; // sum of ramp
    return {
      hardSavings,
      hoursSaved,
      fteFreed,
      paybackMonths,
      licenseCost,
      bars,
      fiveYearSavings,
    };
  }, [state.volume, state.current, state.target, multiplier]);

  return (
    <section
      id="roi"
      className="relative w-full bg-gradient-to-b from-[#0f172a] via-[#0f172a] to-[#1a2233] py-20 lg:py-28 overflow-hidden"
      aria-label="ROI calculator"
    >
      {/* Premium dark surface decoration */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#56ccf2 1px, transparent 1px), linear-gradient(90deg, #56ccf2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-20 h-[440px] w-[440px] rounded-full bg-[#1d81f2]/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-[6%] h-[320px] w-[320px] rounded-full bg-[#24a148]/8 blur-3xl pointer-events-none"
      />
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#56ccf2]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* Header */}
        <Reveal className="max-w-[820px]">
          <div className="mb-4">
            <span
              className="section-heading-chip backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
              }}
            >
              <Calculator className="h-3.5 w-3.5" />
              ROI calculator
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-white leading-tight">
            What's a Transcend migration worth to your book?
          </h2>
          <div className="section-rule mt-5" />
          <p className="mt-4 text-[15px] lg:text-[17px] text-white/70 leading-[1.6] max-w-[640px]">
            Set your annual asset finance volume, current automation level,
            target with Transcend, and your industry. The calculator uses
            customer-validated savings rates and a 5-year ramp curve.
          </p>
        </Reveal>

        {/* Calculator body — 2-col on desktop */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT — Inputs */}
          <Reveal className="lg:col-span-5">
            <div
              className="gradient-border-animated rounded-2xl backdrop-blur border border-white/10 p-6 lg:p-8"
              style={{ background: 'rgba(255, 255, 255, 0.04)' }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold uppercase tracking-wider text-white">
                  Your inputs
                </h3>
                <button
                  onClick={() => dispatch({ type: 'RESET' })}
                  className="lift-on-hover inline-flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>

              {/* 1. Annual volume slider */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="roi-volume" className="text-[13px] font-medium text-white/80">
                    Annual asset finance volume
                  </label>
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[#56ccf2] live-pulse-dot"
                    />
                    <span className="text-[16px] font-semibold text-white font-mono-numeric">
                      {formatUsd(state.volume)}
                    </span>
                  </span>
                </div>
                <input
                  id="roi-volume"
                  type="range"
                  min={ROI_CALCULATOR.volumeMin}
                  max={ROI_CALCULATOR.volumeMax}
                  step={ROI_CALCULATOR.volumeStep}
                  value={state.volume}
                  onChange={(e) =>
                    dispatch({ type: 'SET_VOLUME', v: Number(e.target.value) })
                  }
                  className="roi-slider mt-3 w-full"
                  aria-describedby="roi-volume-help"
                />
                <div id="roi-volume-help" className="mt-1 flex justify-between text-[11px] text-white/40">
                  <span>{formatUsd(ROI_CALCULATOR.volumeMin)}</span>
                  <span>{formatUsd(ROI_CALCULATOR.volumeMax)}</span>
                </div>
              </div>

              {/* 2. Current automation slider */}
              <div className="mt-7">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="roi-current" className="text-[13px] font-medium text-white/80">
                    Current automation level
                  </label>
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[#56ccf2] live-pulse-dot"
                    />
                    <span className="text-[16px] font-semibold text-white font-mono-numeric">
                      {state.current}%
                    </span>
                  </span>
                </div>
                <input
                  id="roi-current"
                  type="range"
                  min={ROI_CALCULATOR.automationMin}
                  max={ROI_CALCULATOR.automationMax}
                  step={1}
                  value={state.current}
                  onChange={(e) =>
                    dispatch({ type: 'SET_CURRENT', v: Number(e.target.value) })
                  }
                  className="roi-slider mt-3 w-full"
                />
                <div className="mt-1 flex justify-between text-[11px] text-white/40">
                  <span>Manual</span>
                  <span>{ROI_CALCULATOR.automationMax}% automated</span>
                </div>
              </div>

              {/* 3. Target automation slider */}
              <div className="mt-7">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="roi-target" className="text-[13px] font-medium text-white/80">
                    Target with Transcend
                  </label>
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[#56ccf2] live-pulse-dot"
                    />
                    <span className="text-[16px] font-semibold text-[#56ccf2] font-mono-numeric">
                      {state.target}%
                    </span>
                  </span>
                </div>
                <input
                  id="roi-target"
                  type="range"
                  min={Math.max(state.current + 5, ROI_CALCULATOR.targetMin)}
                  max={ROI_CALCULATOR.targetMax}
                  step={1}
                  value={state.target}
                  onChange={(e) =>
                    dispatch({ type: 'SET_TARGET', v: Number(e.target.value) })
                  }
                  className="roi-slider mt-3 w-full"
                />
                <div className="mt-1 flex justify-between text-[11px] text-white/40">
                  <span>50% automated</span>
                  <span>95% automated</span>
                </div>
              </div>

              {/* 4. Industry select */}
              <div className="mt-7">
                <label className="text-[13px] font-medium text-white/80 block mb-2.5">
                  Asset class / industry
                </label>
                <div className="grid grid-cols-2 gap-2 rounded-xl p-1.5 bg-white/[0.02] shadow-depth">
                  {ROI_CALCULATOR.industries.map((ind) => {
                    const isActive = state.industry === ind.id;
                    return (
                      <button
                        key={ind.id}
                        onClick={() => dispatch({ type: 'SET_INDUSTRY', v: ind.id })}
                        aria-pressed={isActive}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-left lift-on-hover transition-all duration-200 ${
                          isActive
                            ? 'chip-selected text-white border-transparent'
                            : 'bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-semibold tracking-tight ${
                            isActive ? 'bg-white/15 text-white' : 'bg-white/[0.06] text-white/70'
                          }`}
                        >
                          {ind.emoji}
                        </span>
                        <span className="text-[12px] font-medium leading-tight">
                          {ind.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculate CTA */}
              <button
                onClick={() => dispatch({ type: 'CALCULATE' })}
                className="btn-shine relative mt-7 w-full inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-gradient-to-r from-[#1d81f2] to-[#0f62fe] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(15,98,254,0.55)] transition-all hover:shadow-[0_12px_32px_-8px_rgba(15,98,254,0.7)]"
              >
                <Sparkles className="h-4 w-4" />
                Calculate my ROI
              </button>

              {/* Footnote */}
              <div className="mt-4 flex items-start gap-2 text-[11px] text-white/50">
                <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>
                  Estimates use customer-validated savings rates
                  ({(ROI_CALCULATOR.savingsRate * 100).toFixed(1)}% of newly-automated volume),
                  a {ROI_CALCULATOR.baselineHoursPerContract.toFixed(1)}h → {ROI_CALCULATOR.transcendHoursPerContract.toFixed(1)}h per-contract time delta,
                  and a 5-year ramp curve. Not a quote.
                </span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — Results card */}
          <Reveal className="lg:col-span-7" delay={0.15}>
            <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/10 p-6 lg:p-8 overflow-hidden h-full shadow-depth-lg">
              {/* Spotlight gradient overlay */}
              <div aria-hidden className="absolute inset-0 spotlight-gradient pointer-events-none" />
              {/* Top accent */}
              <div className="absolute left-0 top-0 right-0 h-px bg-gradient-to-r from-transparent via-[#56ccf2]/60 to-transparent" />

              <div className="relative flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#9ca3af]">
                    Estimated impact
                  </div>
                  <div className="mt-1 text-[15px] text-white/80">
                    {industry.label} · {state.target - state.current}% point automation lift
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#24a148]/15 px-3 py-1 text-[11px] font-semibold text-[#4ade80]">
                  <span className="live-pulse-dot pulse-ring-soft h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                  Live
                </span>
              </div>

              {/* Headline savings number */}
              <div className="relative mt-6">
                <div className="text-[12px] uppercase tracking-wider text-white/50 mb-1">
                  Annual hard savings
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={results.hardSavings.toFixed(0)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-[44px] sm:text-[56px] font-semibold tracking-tight text-gradient-animated font-mono-numeric"
                  >
                    {formatUsd(results.hardSavings)}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-1.5 text-[13px] text-white/60">
                  Per year, at run-rate. 5-year cumulative:{' '}
                  <span className="relative inline-block glow-halo text-gradient-animated font-mono-numeric font-semibold">
                    {formatUsd(results.fiveYearSavings)}
                  </span>
                </div>
              </div>

              {/* Stat row — 3 mini callouts */}
              <div className="relative mt-7 grid grid-cols-3 gap-3">
                {[
                  {
                    icon: Clock,
                    label: 'Payback',
                    value:
                      results.paybackMonths > 0
                        ? `${results.paybackMonths.toFixed(1)} mo`
                        : '—',
                    color: '#56ccf2',
                  },
                  {
                    icon: Clock3,
                    label: 'Hours saved / yr',
                    value:
                      results.hoursSaved >= 1000
                        ? `${(results.hoursSaved / 1000).toFixed(1)}K`
                        : results.hoursSaved.toFixed(0),
                    color: '#24a148',
                  },
                  {
                    icon: Users,
                    label: 'FTE freed',
                    value: formatFte(results.fteFreed),
                    color: '#1d81f2',
                  },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="gradient-border-card rounded-xl border border-white/10 p-4"
                      style={{ background: 'rgba(255, 255, 255, 0.04)' }}
                    >
                      <span
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md mb-2"
                        style={{ backgroundColor: `${s.color}22`, color: s.color }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="text-[18px] sm:text-[20px] font-semibold text-white leading-none font-mono-numeric">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 5-year ramp bar chart */}
              <div className="relative mt-7">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[12px] uppercase tracking-wider text-white/60">
                    5-year savings ramp
                  </div>
                  <div className="text-[11px] text-white/40">
                    Cumulative:{' '}
                    <span className="text-white font-semibold font-mono-numeric">
                      {formatUsd(results.fiveYearSavings)}
                    </span>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-24 rounded-lg p-1.5 bg-white/[0.02] shadow-depth">
                  {results.bars.map((b, i) => {
                    const isActiveBar = i === results.bars.length - 1;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className={`relative w-full h-full flex items-end overflow-hidden rounded-t-md ${
                            isActiveBar ? 'scan-beam' : ''
                          }`}
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(8, b.pct * 100)}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full rounded-t-md"
                            style={{
                              background: isActiveBar
                                ? 'linear-gradient(180deg, #56ccf2 0%, #1d81f2 50%, #24a148 100%)'
                                : 'linear-gradient(180deg, rgba(86, 204, 242, 0.45), rgba(29, 129, 242, 0.25))',
                            }}
                          />
                        </div>
                        <div className="text-[10px] text-white/40 font-mono">{b.year}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="relative mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-[14px] font-semibold text-white leading-snug">
                    Want a customer-validated quote?
                  </div>
                  <div className="mt-0.5 text-[12px] text-white/60">
                    A specialist will model your book in under two hours.
                  </div>
                </div>
                <CTAButton href="#contact" className="shrink-0 text-[14px] px-5 py-2.5">
                  Talk to a specialist
                  <ArrowUpRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Trust strip */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: '200+', l: 'Enterprise migrations delivered' },
            { v: '$500B+', l: 'Asset finance under management' },
            { v: '2.2%', l: 'Avg hard-savings rate' },
            { v: '7 mo', l: 'Avg payback period' },
          ].map((s) => (
            <div
              key={s.l}
              className="gradient-border-card lift-on-hover rounded-xl border border-white/10 px-4 py-4 text-center shadow-depth"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <div className="text-[20px] sm:text-[22px] font-semibold text-white leading-none font-mono-numeric">
                {s.v}
              </div>
              <div className="mt-1.5 text-[11px] uppercase tracking-wider text-white/50 leading-tight">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
