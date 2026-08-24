'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  LineChart,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { INVESTOR_RELATIONS } from '@/lib/site-data';

// ============================================================================
// Types — derived from the data export so they stay in sync
// ============================================================================

type IRKpi = (typeof INVESTOR_RELATIONS.kpis)[number];
type IRQuarterly = (typeof INVESTOR_RELATIONS.quarterly)[number];
type IRRetention = (typeof INVESTOR_RELATIONS.retention)[number];
type IRStock = typeof INVESTOR_RELATIONS.stock;
type IREvent = (typeof INVESTOR_RELATIONS.events)[number];

// ============================================================================
// Decimal-safe animated counter — required because KPI values are like 248.6
// (the existing site `Counter` component Math.round()s its tick values, which
// would erase the .6/.2/.8 decimals we need to show). This variant uses the
// same IntersectionObserver + rAF + easeOutExpo pattern, but applies toFixed(1)
// on each tick so the decimal is preserved end-to-end.
// ============================================================================

interface DecimalCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

type DecState = { value: number; started: boolean; finished: boolean };
type DecAction =
  | { type: 'START' }
  | { type: 'TICK'; value: number }
  | { type: 'FINISH'; value: number };

function decReducer(state: DecState, action: DecAction): DecState {
  switch (action.type) {
    case 'START':
      if (state.started) return state;
      return { ...state, started: true };
    case 'TICK':
      return { ...state, value: action.value };
    case 'FINISH':
      return { value: action.value, started: true, finished: true };
    default:
      return state;
  }
}

function DecimalCounter({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 1,
}: DecimalCounterProps) {
  const [state, dispatch] = useReducer(decReducer, {
    value: end,
    started: false,
    finished: false,
  });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      dispatch({ type: 'FINISH', value: end });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.started) {
            dispatch({ type: 'START' });
            dispatch({ type: 'TICK', value: 0 });
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              dispatch({ type: 'TICK', value: eased * end });
              if (progress < 1) requestAnimationFrame(tick);
              else dispatch({ type: 'FINISH', value: end });
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, state.started]);

  const display = state.finished
    ? end.toFixed(decimals)
    : state.value.toFixed(decimals);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      aria-label={`${prefix}${end.toFixed(decimals)}${suffix}`}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ============================================================================
// Static chart geometry — computed once at module load
// ============================================================================

const QUARTERS: IRQuarterly[] = INVESTOR_RELATIONS.quarterly;

// Y-axis maxima — rounded up to clean tick values
const REV_MAX = 80; // covers 51..63 range, ticks at 0/20/40/60/80
const ARR_MAX = 200; // covers 121..184 range, ticks at 0/50/100/150/200

// Plot area inside the SVG viewBox
const PLOT = { x0: 56, x1: 584, y0: 20, y1: 220 };
const PLOT_W = PLOT.x1 - PLOT.x0;
const PLOT_H = PLOT.y1 - PLOT.y0;

function pointX(i: number, total: number): number {
  return total <= 1 ? PLOT.x0 : PLOT.x0 + (i * PLOT_W) / (total - 1);
}
function scaleYRev(v: number): number {
  return PLOT.y1 - (v / REV_MAX) * PLOT_H;
}
function scaleYArr(v: number): number {
  return PLOT.y1 - (v / ARR_MAX) * PLOT_H;
}

const revPoints = QUARTERS.map((q, i) => ({
  x: pointX(i, QUARTERS.length),
  y: scaleYRev(q.value),
}));
const arrPoints = QUARTERS.map((q, i) => ({
  x: pointX(i, QUARTERS.length),
  y: scaleYArr(q.arr),
}));

function toPath(pts: { x: number; y: number }[]): string {
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
}

const REV_PATH = toPath(revPoints);
const ARR_PATH = toPath(arrPoints);

// Area-fill closure paths (line down to baseline, then back to first point)
const REV_AREA = `${REV_PATH} L ${revPoints[revPoints.length - 1].x.toFixed(2)} ${PLOT.y1} L ${revPoints[0].x.toFixed(2)} ${PLOT.y1} Z`;
const ARR_AREA = `${ARR_PATH} L ${arrPoints[arrPoints.length - 1].x.toFixed(2)} ${PLOT.y1} L ${arrPoints[0].x.toFixed(2)} ${PLOT.y1} Z`;

// Y-axis grid lines (4 interior + top/bottom edges → 5 ticks)
const GRID_TICKS = [
  { y: PLOT.y0, rev: REV_MAX, arr: ARR_MAX },
  { y: PLOT.y0 + PLOT_H * 0.25, rev: REV_MAX * 0.75, arr: ARR_MAX * 0.75 },
  { y: PLOT.y0 + PLOT_H * 0.5, rev: REV_MAX * 0.5, arr: ARR_MAX * 0.5 },
  { y: PLOT.y0 + PLOT_H * 0.75, rev: REV_MAX * 0.25, arr: ARR_MAX * 0.25 },
  { y: PLOT.y1, rev: 0, arr: 0 },
];

// QoQ growth series for the 6 mini-stats below the chart
const QOQ: ({ pct: number | null; label: string })[] = QUARTERS.map((q, i) => {
  if (i === 0) return { pct: null, label: q.quarter };
  const prev = QUARTERS[i - 1].value;
  const pct = prev === 0 ? null : ((q.value - prev) / prev) * 100;
  return { pct, label: q.quarter };
});

// ============================================================================
// Stock sparkline — simulated last 10 trading days (≈ $8.42 close)
// ============================================================================

const SPARK = [8.18, 8.22, 8.15, 8.28, 8.34, 8.3, 8.41, 8.45, 8.38, 8.42];
const SPARK_W = 240;
const SPARK_H = 40;
const SPARK_PAD = 4;
const sMin = Math.min(...SPARK);
const sMax = Math.max(...SPARK);
const sRange = Math.max(sMax - sMin, 0.01);

function sparkPath(values: number[]): string {
  return values
    .map((v, i) => {
      const x = SPARK_PAD + (i * (SPARK_W - 2 * SPARK_PAD)) / (values.length - 1);
      const y = SPARK_PAD + (1 - (v - sMin) / sRange) * (SPARK_H - 2 * SPARK_PAD);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}
const SPARK_PATH = sparkPath(SPARK);
const SPARK_AREA = `${SPARK_PATH} L ${(SPARK_W - SPARK_PAD).toFixed(2)} ${(SPARK_H - SPARK_PAD).toFixed(2)} L ${SPARK_PAD.toFixed(2)} ${(SPARK_H - SPARK_PAD).toFixed(2)} Z`;

// ============================================================================
// Event date parsing — "Aug 14, 2026" → { day: "14", month: "AUG" }
// ============================================================================

function parseEventDate(date: string): { day: string; month: string } {
  const parts = date.split(/[\s,]+/).filter(Boolean);
  const monthRaw = parts[0] ?? '';
  const dayRaw = parts[1] ?? '';
  return {
    month: monthRaw.slice(0, 3).toUpperCase(),
    day: dayRaw.replace(/[^0-9]/g, ''),
  };
}

// ============================================================================
// KPI card
// ============================================================================

function KpiCard({ kpi, delay }: { kpi: IRKpi; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="gradient-border-animated lift-on-hover shadow-depth rounded-2xl bg-white p-6 h-full flex flex-col">
        {/* Top accent bar */}
        <div
          aria-hidden
          className="h-[3px] w-8 rounded-full"
          style={{ background: kpi.accent }}
        />
        {/* Big number */}
        <div className="mt-5 text-3xl lg:text-4xl font-bold font-mono-numeric text-[#161616] leading-none">
          <DecimalCounter
            end={kpi.value}
            prefix={kpi.prefix}
            suffix={kpi.suffix}
          />
        </div>
        {/* Trend chip */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span className="font-mono-numeric">
              +{kpi.trend.toFixed(1)}%
            </span>
            <span className="text-emerald-600/70 font-medium">
              {kpi.trendLabel}
            </span>
          </span>
        </div>
        {/* Label */}
        <div className="mt-auto pt-5 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
          {kpi.label}
        </div>
      </div>
    </Reveal>
  );
}

// ============================================================================
// Retention card
// ============================================================================

function RetentionCard({ item, delay }: { item: IRRetention; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="gradient-border-card lift-on-hover p-5 bg-white rounded-2xl h-full flex flex-col">
        {/* Top accent bar */}
        <div
          aria-hidden
          className="h-[3px] w-8 rounded-full"
          style={{ background: item.accent }}
        />
        {/* Big value */}
        <div className="mt-4 text-2xl font-bold font-mono-numeric text-[#161616]">
          {item.value}
        </div>
        {/* Trend chip (all positive) */}
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
            {item.trend}
          </span>
        </div>
        {/* Label */}
        <div className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
          {item.label}
        </div>
      </div>
    </Reveal>
  );
}

// ============================================================================
// Event card
// ============================================================================

function EventCard({ event }: { event: IREvent }) {
  const { day, month } = parseEventDate(event.date);
  return (
    <article className="relative min-w-[280px] rounded-2xl border border-[#e0e0e0] bg-white p-5 lift-on-hover overflow-hidden">
      {/* Top accent stripe */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: event.accent }}
      />
      <div className="flex items-start gap-4">
        {/* Date chip */}
        <div className="event-date-chip shrink-0">
          <span className="text-[20px] font-bold leading-none font-mono-numeric text-[#161616]">
            {day}
          </span>
          <span className="mt-0.5 text-[9px] font-semibold tracking-wider text-[#1d81f2]">
            {month}
          </span>
        </div>
        {/* Content */}
        <div className="min-w-0 flex-1">
          <div
            className="text-[9.5px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: event.accent }}
          >
            {event.type}
          </div>
          <h4 className="mt-1 text-[14px] font-semibold leading-snug text-[#161616]">
            {event.title}
          </h4>
          <div className="mt-1.5 flex items-center gap-1 text-[11.5px] text-[#6b7280]">
            <Calendar className="h-3 w-3" strokeWidth={2.25} />
            {event.location}
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// Stock snapshot card (right column, dark premium)
// ============================================================================

function StockCard({ stock }: { stock: IRStock }) {
  // Live "ticker-flash" simulation — bumps the displayed price +0.03 at 3s
  // to feel alive, then settles. The ticker-flash CSS class triggers a
  // green-background pulse; the key remount re-triggers the digit-flip-in
  // CSS animation on the price span.
  const [bumped, setBumped] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const t1 = window.setTimeout(() => setBumped(true), 3000);
    const t2 = window.setTimeout(() => setBumped(false), 4500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const displayPrice = bumped ? +(stock.price + 0.03).toFixed(2) : stock.price;
  const displayChange = bumped ? +(stock.change + 0.03).toFixed(2) : stock.change;
  const displayPct = bumped
    ? +((displayChange / (displayPrice - displayChange)) * 100).toFixed(2)
    : stock.changePercent;
  const isUp = displayChange >= 0;

  const stats: { label: string; value: string }[] = [
    { label: 'Volume', value: stock.volume },
    { label: "Day's range", value: stock.dayRange },
    { label: '52-week range', value: stock.yearRange },
    { label: 'Market cap', value: stock.marketCap },
  ];

  return (
    <div className="relative rounded-3xl bg-[#0b0f1a] text-white p-6 lg:p-8 shadow-depth-lg overflow-hidden">
      {/* Spotlight overlay behind content */}
      <div
        aria-hidden
        className="absolute inset-0 spotlight-gradient pointer-events-none"
      />
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#1d81f2]/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-[#24a148]/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10">
        {/* Top row — chip + live indicator */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="inline-flex items-center border border-white/20 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/80">
            {stock.exchange}: {stock.ticker}
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-pulse-dot" />
            Live
          </span>
        </div>

        {/* "Last trade" + price */}
        <div className="mt-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
            Last trade
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span
              key={bumped ? 'bumped' : 'idle'}
              className={`ticker-digit text-4xl font-bold leading-none ${bumped ? 'ticker-flash rounded px-1 -mx-1' : ''}`}
            >
              ${displayPrice.toFixed(2)}
            </span>
          </div>
          <div className="mt-3">
            <span
              className={`price-chip inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${bumped ? 'ticker-flash' : ''}`}
            >
              {isUp ? (
                <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
              ) : (
                <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
              )}
              <span className="font-mono-numeric">
                ${displayChange.toFixed(2)}
              </span>
              <span className="font-mono-numeric">
                (+{displayPct.toFixed(2)}%)
              </span>
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-white/[0.04] border border-white/10 p-3"
            >
              <div className="text-[9.5px] font-semibold uppercase tracking-wider text-white/55">
                {s.label}
              </div>
              <div className="mt-1 text-[13px] font-mono-numeric text-white">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Mini sparkline */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/55">
              <LineChart className="h-3 w-3" strokeWidth={2.5} />
              Last 10 sessions
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] font-mono-numeric text-white/45">
              <Clock className="h-3 w-3" strokeWidth={2.25} />
              {stock.volume} vol
            </div>
          </div>
          <svg
            viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
            className="w-full h-10"
            preserveAspectRatio="none"
            role="img"
            aria-label={`Simulated ${stock.ticker} 10-session sparkline`}
          >
            <defs>
              <linearGradient id="spark-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d81f2" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1d81f2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={SPARK_AREA} fill="url(#spark-area)" />
            <path
              d={SPARK_PATH}
              className="sparkline-draw"
              stroke="#1d81f2"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Final point marker */}
            <circle
              cx={SPARK_PAD + ((SPARK.length - 1) * (SPARK_W - 2 * SPARK_PAD)) / (SPARK.length - 1)}
              cy={SPARK_PAD + (1 - (SPARK[SPARK.length - 1] - sMin) / sRange) * (SPARK_H - 2 * SPARK_PAD)}
              r="2.5"
              fill="#56ccf2"
              className="sparkline-glow"
            />
          </svg>
        </div>

        {/* Disclaimer */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-white/40">
            <Activity className="h-3 w-3" strokeWidth={2.25} />
            Indicative — simulated. Real-time feed requires IR subscription.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Quarterly revenue + ARR chart card (left column)
// ============================================================================

function QuarterlyChartCard() {
  return (
    <div className="rounded-3xl border border-[#e0e0e0] bg-white p-6 lg:p-8 shadow-depth">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-[#1d81f2]">
            <BarChart3 className="h-4 w-4" strokeWidth={2.5} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
              Quarterly performance
            </span>
          </div>
          <h3 className="mt-2 text-[20px] lg:text-[22px] font-semibold text-[#161616] leading-tight">
            Quarterly revenue &amp; ARR ($M)
          </h3>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <span className="inline-flex items-center gap-1.5 text-[#525252]">
            <span className="h-2 w-2 rounded-full bg-[#1d81f2]" />
            Revenue
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#525252]">
            <span className="h-2 w-2 rounded-full bg-[#24a148]" />
            ARR
          </span>
        </div>
      </div>

      {/* SVG line chart */}
      <div className="mt-6">
        <svg
          viewBox="0 0 640 260"
          className="w-full h-64 lg:h-72"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="6-quarter revenue and ARR line chart"
        >
          <defs>
            <linearGradient id="rev-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d81f2" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1d81f2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arr-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#24a148" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#24a148" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis grid lines + tick labels */}
          {GRID_TICKS.map((t, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={PLOT.x0}
                y1={t.y}
                x2={PLOT.x1}
                y2={t.y}
                className="chart-axis-line"
              />
              {/* Left tick (revenue) */}
              <text
                x={PLOT.x0 - 8}
                y={t.y + 3}
                textAnchor="end"
                className="font-mono-numeric"
                fill="#6b7280"
                fontSize="9"
              >
                ${t.rev.toFixed(0)}M
              </text>
              {/* Right tick (ARR) */}
              <text
                x={PLOT.x1 + 8}
                y={t.y + 3}
                textAnchor="start"
                className="font-mono-numeric"
                fill="#6b7280"
                fontSize="9"
              >
                ${t.arr.toFixed(0)}M
              </text>
            </g>
          ))}

          {/* Axis titles */}
          <text
            x={PLOT.x0 - 8}
            y={PLOT.y0 - 6}
            textAnchor="end"
            fill="#1d81f2"
            fontSize="9"
            fontWeight="600"
          >
            REV
          </text>
          <text
            x={PLOT.x1 + 8}
            y={PLOT.y0 - 6}
            textAnchor="start"
            fill="#24a148"
            fontSize="9"
            fontWeight="600"
          >
            ARR
          </text>

          {/* Area fills (behind lines) */}
          <path d={REV_AREA} fill="url(#rev-area-grad)" />
          <path d={ARR_AREA} fill="url(#arr-area-grad)" />

          {/* ARR line (drawn first so revenue line overlays on top) */}
          <path
            d={ARR_PATH}
            className="sparkline-draw"
            stroke="#24a148"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* ARR markers */}
          {arrPoints.map((p, i) => (
            <circle
              key={`arr-m-${i}`}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="white"
              stroke="#24a148"
              strokeWidth="2"
            />
          ))}

          {/* Revenue line (with glow) */}
          <path
            d={REV_PATH}
            className="sparkline-draw sparkline-glow"
            stroke="#1d81f2"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Revenue markers */}
          {revPoints.map((p, i) => (
            <circle
              key={`rev-m-${i}`}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="white"
              stroke="#1d81f2"
              strokeWidth="2"
            />
          ))}

          {/* X-axis labels */}
          {QUARTERS.map((q, i) => {
            const x = pointX(i, QUARTERS.length);
            return (
              <text
                key={`x-${i}`}
                x={x}
                y={PLOT.y1 + 18}
                textAnchor="middle"
                className="font-mono-numeric"
                fill="#6b7280"
                fontSize="10"
                letterSpacing="0.06em"
              >
                {q.quarter.toUpperCase()}
              </text>
            );
          })}
        </svg>
      </div>

      {/* QoQ growth mini-stats */}
      <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
        {QOQ.map((q, i) => {
          const isNeg = q.pct !== null && q.pct < 0;
          const isPos = q.pct !== null && q.pct > 0;
          return (
            <div
              key={`qoq-${i}`}
              className="rounded-lg bg-[#f5f7fa] px-2 py-2 text-center"
            >
              <div className="text-[9px] font-semibold uppercase tracking-wider text-[#6b7280]">
                {q.label}
              </div>
              <div
                className={`mt-0.5 text-[12px] font-mono-numeric font-semibold ${
                  q.pct === null
                    ? 'text-[#9ca3af]'
                    : isNeg
                      ? 'text-rose-600'
                      : isPos
                        ? 'text-emerald-600'
                        : 'text-slate-500'
                }`}
              >
                {q.pct === null ? (
                  'baseline'
                ) : (
                  <>
                    {isNeg ? '' : '+'}
                    {q.pct.toFixed(1)}%
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Section
// ============================================================================

export function InvestorRelations() {
  const stock = INVESTOR_RELATIONS.stock;
  const kpis = INVESTOR_RELATIONS.kpis;
  const retention = INVESTOR_RELATIONS.retention;
  const events = INVESTOR_RELATIONS.events;

  return (
    <section
      id="investors"
      className="section-pad relative w-full bg-gradient-to-b from-[#f5f7fa] to-white overflow-hidden"
      aria-labelledby="investors-title"
    >
      {/* Investor spotlight overlay */}
      <div
        aria-hidden
        className="investor-spotlight absolute inset-0 pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* ============ Header row ============ */}
        <div className="flex items-start justify-between gap-6">
          <Reveal className="max-w-3xl">
            <span className="section-heading-chip">
              <DollarSign className="h-3 w-3" strokeWidth={2.5} />
              Investor Relations
            </span>
            <h2
              id="investors-title"
              className="mt-5 text-3xl lg:text-5xl font-bold text-[#161616] tracking-tight leading-[1.1]"
            >
              {INVESTOR_RELATIONS.title}
            </h2>
            <p className="mt-4 text-base lg:text-lg text-[#525252] leading-[1.6]">
              {INVESTOR_RELATIONS.subtitle}
            </p>
          </Reveal>
          <a
            href="#investors"
            className="nav-link-underline hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d81f2] hover:text-[#0f62fe] transition-colors mt-2"
          >
            View investor kit
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </div>

        {/* ============ KPI row ============ */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.id} kpi={kpi} delay={0.08 * i} />
          ))}
        </div>

        {/* ============ Middle row — chart + stock ============ */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
          <Reveal className="h-full">
            <QuarterlyChartCard />
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <StockCard stock={stock} />
          </Reveal>
        </div>

        {/* ============ Retention row ============ */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {retention.map((item, i) => (
            <RetentionCard key={item.label} item={item} delay={0.08 * i} />
          ))}
        </div>

        {/* ============ Events row ============ */}
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#1d81f2]">
                <Calendar className="h-4 w-4" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  IR Calendar
                </span>
              </div>
              <h3 className="mt-2 text-xl lg:text-2xl font-semibold text-[#161616] tracking-tight">
                Upcoming investor events
              </h3>
            </div>
            <a
              href="#investors"
              className="nav-link-underline hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d81f2] hover:text-[#0f62fe] transition-colors"
            >
              View IR calendar
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </a>
          </div>

          {/* Horizontal scroll strip */}
          <div className="mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* ============ Footer CTA strip ============ */}
        <Reveal delay={0.05}>
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#1d81f2] to-[#0f62fe] p-8 text-center text-white shadow-depth-lg overflow-hidden relative">
            {/* Soft glow halo */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Get the full investor kit
              </h3>
              <p className="mt-3 text-sm lg:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
                10-K, 10-Q, investor presentations, and analyst reports —
                delivered to your inbox.
              </p>
              <div className="mt-7 flex justify-center">
                <CTAButton
                  variant="light"
                  href="#contact"
                  className="btn-shine lift-on-hover text-[#1d81f2]"
                >
                  Request investor kit
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Footer attribution row */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#6b7280]">
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
          {stock.exchange}: {stock.ticker} · FY25 audited results
        </div>
      </div>
    </section>
  );
}

export default InvestorRelations;
