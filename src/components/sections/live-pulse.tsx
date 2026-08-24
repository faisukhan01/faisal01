'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Banknote,
  FileText,
  Globe,
  Sparkles,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { LIVE_PULSE } from '@/lib/site-data';

// ============================================================================
// Types
// ============================================================================

type TrendDir = 'up' | 'down' | 'flat';
type ActivityType = 'originated' | 'decisioned' | 'funded';

interface MetricSource {
  id: string;
  label: string;
  baseValue: number;
  jitterMin: number;
  jitterMax: number;
  prefix?: string;
  suffix: string;
  trend: string;
  trendDir: TrendDir;
  accent: string;
}

interface LiveMetric extends MetricSource {
  value: number;
}

interface Region {
  id: string;
  label: string;
  volume: number;
  color: string;
}

interface StreamItem {
  type: ActivityType;
  text: string;
  amount: string;
}

interface ActivityRow extends StreamItem {
  uid: string;
}

// ============================================================================
// Format helpers
// ============================================================================

function randJitter(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function fmtHeadlineNumber(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

function fmtMetricValue(m: LiveMetric, v: number): string {
  const prefix = m.prefix ?? '';
  const suffix = m.suffix;
  if (v >= 1_000_000_000) {
    const b = (v / 1_000_000_000).toFixed(2).replace(/\.?0+$/, '');
    return `${prefix}${b}B${suffix}`;
  }
  if (v >= 1_000_000) {
    const mm = (v / 1_000_000).toFixed(2).replace(/\.?0+$/, '');
    return `${prefix}${mm}M${suffix}`;
  }
  if (!Number.isInteger(v)) {
    return `${prefix}${v.toFixed(2)}${suffix}`;
  }
  return `${prefix}${v.toLocaleString('en-US')}${suffix}`;
}

function fmtUtcTimestamp(d: Date): string {
  const hh = d.getUTCHours().toString().padStart(2, '0');
  const mm = d.getUTCMinutes().toString().padStart(2, '0');
  return `AS OF ${hh}:${mm} UTC`;
}

const ACTIVITY_META: Record<ActivityType, { color: string; Icon: LucideIcon }> = {
  originated: { color: '#1d81f2', Icon: FileText },
  decisioned: { color: '#2d9cdb', Icon: Sparkles },
  funded: { color: '#24a148', Icon: Banknote },
};

// ============================================================================
// Trend chip — green ↑ for good, red ↓ for bad, → for flat
// ============================================================================

function TrendChip({ dir, trend }: { dir: TrendDir; trend: string }) {
  if (dir === 'flat') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
        <span aria-hidden className="text-[12px] leading-none">
          →
        </span>
        {trend}
      </span>
    );
  }
  // For "up": positive trend → green ↑, negative → red ↓
  // For "down" (e.g. SLA going down = good): green ↑
  const isGood = dir === 'down' || trend.trim().startsWith('+');
  const Icon = isGood ? TrendingUp : TrendingDown;
  const color = isGood ? 'text-emerald-400' : 'text-rose-400';
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${color}`}>
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {trend}
    </span>
  );
}

// ============================================================================
// Section
// ============================================================================

export function LivePulse() {
  const headline = LIVE_PULSE.headline;
  const regions = LIVE_PULSE.regions as Region[];
  const sourceMetrics = LIVE_PULSE.metrics as unknown as MetricSource[];

  // ----- Live state -----
  const [headlineValue, setHeadlineValue] = useState<number>(headline.baseValue);

  const [metrics, setMetrics] = useState<LiveMetric[]>(() =>
    sourceMetrics.map((m) => ({ ...m, value: m.baseValue }))
  );

  // SSR-safe initial timestamp; updated on client mount.
  const [timestamp, setTimestamp] = useState<string>('AS OF 14:32 UTC');

  // Activity feed (cap 5 visible) — uidRef only mutated inside effects, never during render
  const uidRef = useRef(0);
  const [activity, setActivity] = useState<ActivityRow[]>(() =>
    LIVE_PULSE.activityStream.slice(0, 5).map((item, i) => ({
      ...item,
      uid: `init-${i}`,
    }))
  );

  const [activityCount, setActivityCount] = useState<number>(12847);

  const streamPool = useMemo<StreamItem[]>(
    () => LIVE_PULSE.activityStream as StreamItem[],
    []
  );

  // ----- Headline + satellite metrics jitter every 1.6s -----
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineValue(
        (prev) => prev + Math.round(randJitter(headline.jitterMin, headline.jitterMax))
      );
      setMetrics((prev) =>
        prev.map((m) => {
          const jit = randJitter(m.jitterMin, m.jitterMax);
          let next = m.value + jit;
          const lower = m.baseValue - Math.abs(m.jitterMin) * 6;
          const upper = m.baseValue + Math.abs(m.jitterMax) * 6;
          next = Math.max(lower, Math.min(upper, next));
          if (m.id === 'uptime') next = Math.min(100, next);
          return { ...m, value: next };
        })
      );
      setActivityCount((prev) => prev + Math.floor(randJitter(8, 32)));
    }, 1600);
    return () => clearInterval(interval);
  }, [headline.jitterMin, headline.jitterMax]);

  // ----- UTC timestamp tick every 30s -----
  useEffect(() => {
    // Defer the initial setState to avoid a synchronous cascading render in the effect body
    const raf = requestAnimationFrame(() =>
      setTimestamp(fmtUtcTimestamp(new Date()))
    );
    const interval = setInterval(() => {
      setTimestamp(fmtUtcTimestamp(new Date()));
    }, 30000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  // ----- Activity feed: prepend a new random item every 2s -----
  useEffect(() => {
    const interval = setInterval(() => {
      const next = streamPool[Math.floor(Math.random() * streamPool.length)];
      uidRef.current += 1;
      const uid = `act-${uidRef.current}`;
      setActivity((prev) => [{ ...next, uid }, ...prev].slice(0, 5));
    }, 2000);
    return () => clearInterval(interval);
  }, [streamPool]);

  return (
    <section
      id="pulse"
      className="section-pad w-full bg-[#f5f7fa]"
      aria-labelledby="pulse-title"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        {/* Top header row: chip + right "How we measure" link */}
        <div className="flex items-start justify-between gap-4">
          <Reveal>
            <span className="section-heading-chip">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 live-pulse-dot" />
              Live Operations Pulse
            </span>
          </Reveal>
          <a
            href="#why-netsol"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d81f2] hover:text-[#0f62fe] transition-colors"
          >
            How we measure
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </div>

        {/* Heading + rule + subheading */}
        <Reveal delay={0.05} className="mt-6">
          <h2
            id="pulse-title"
            className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight leading-tight text-[#161616]"
          >
            Live operations, in real time.
          </h2>
          <div className="section-rule mt-4" />
          <p className="mt-5 text-[15px] lg:text-[17px] text-[#525252] leading-[1.65] max-w-[760px]">
            Watch NETSOL&apos;s global asset-finance mesh process applications, decisions, and
            funding events as they happen. Every metric on this dashboard ticks against real
            customer activity across seven markets.
          </p>
        </Reveal>

        {/* Dashboard grid */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* ===================== LEFT: command center ===================== */}
          <div className="relative bg-[#0b0f1a] text-white rounded-3xl p-6 lg:p-8 shadow-depth-lg overflow-hidden">
            <div aria-hidden className="absolute inset-0 spotlight-gradient pointer-events-none" />
            {/* Soft accent glows */}
            <div
              aria-hidden
              className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#1d81f2]/15 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-[#24a148]/10 blur-3xl pointer-events-none"
            />

            <div className="relative z-10">
              {/* Top row: badge + timestamp + LIVE */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-pulse-dot" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300">
                    Live Operations Pulse
                  </span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono-numeric text-[11px] text-white/60 uppercase tracking-wider">
                    {timestamp}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-pulse-dot" />
                    Live
                  </span>
                </div>
              </div>

              {/* Headline metric */}
              <div className="mt-6 lg:mt-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                  {headline.label.toUpperCase()}
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span
                    key={headlineValue}
                    className="digit-flip-in text-5xl sm:text-6xl lg:text-7xl font-bold tabular-nums font-mono-numeric leading-none text-white"
                  >
                    {fmtHeadlineNumber(headlineValue)}
                  </span>
                </div>
              </div>

              {/* Satellite metric cards */}
              <div className="mt-6 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {metrics.map((m) => (
                  <div
                    key={m.id}
                    className="scan-beam relative rounded-2xl bg-white/[0.04] border border-white/10 p-4 overflow-hidden"
                  >
                    {/* Gradient accent stripe (top-left) */}
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 h-[3px] w-12 rounded-br-[6px]"
                      style={{ background: m.accent }}
                    />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
                      {m.label}
                    </div>
                    <div className="mt-1.5">
                      <span
                        key={`${m.id}-${m.value}`}
                        className="digit-flip-in block text-[20px] lg:text-[22px] font-bold tabular-nums font-mono-numeric"
                        style={{ color: m.accent }}
                      >
                        {fmtMetricValue(m, m.value)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <TrendChip dir={m.trendDir} trend={m.trend} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Region activity bar */}
              <div className="mt-6 lg:mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
                    Activity by region (last 1h)
                  </div>
                  <div className="text-[10px] text-white/40">Volume share</div>
                </div>
                {/* Legend — two columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
                  {regions.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between gap-2 text-[11px]"
                    >
                      <span className="flex items-center gap-2 text-white/70">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: r.color }}
                        />
                        {r.label}
                      </span>
                      <span className="font-mono-numeric text-white/55">{r.volume}%</span>
                    </div>
                  ))}
                </div>
                {/* Stacked bar */}
                <div className="flex h-3 w-full rounded-full overflow-hidden bg-white/10">
                  {regions.map((r) => (
                    <div
                      key={r.id}
                      style={{ width: `${r.volume}%`, background: r.color }}
                      className="h-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===================== RIGHT: activity feed ===================== */}
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-6 shadow-depth flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1d81f2]/10 px-3 py-1.5">
                  <Activity className="h-3.5 w-3.5 text-[#1d81f2]" strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1d81f2]">
                    Live Activity
                  </span>
                </div>
                <div className="mt-2 text-[12px] text-[#6b7280]">Last 60 seconds</div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 text-[11px] font-semibold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 live-pulse-dot" />
                Streaming
              </span>
            </div>

            {/* Activity list */}
            <div className="mt-5 flex-1 min-h-[260px]">
              <AnimatePresence initial={false}>
                {activity.map((item) => {
                  const meta = ACTIVITY_META[item.type];
                  const Icon = meta.Icon;
                  return (
                    <motion.div
                      key={item.uid}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="activity-slide flex items-center gap-3 py-2.5 border-b border-[#f0f0f0] overflow-hidden"
                    >
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                        style={{ background: `${meta.color}1a`, color: meta.color }}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] text-[#161616] truncate">
                          {item.text}
                        </div>
                      </div>
                      <div
                        className="text-[13px] font-semibold tabular-nums font-mono-numeric shrink-0"
                        style={{ color: meta.color }}
                      >
                        {item.amount}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Footer mini-stats */}
            <div className="mt-4 pt-4 border-t border-[#f0f0f0] grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#6b7280]">
                  Activity (1h)
                </div>
                <div className="mt-1 text-[16px] font-bold tabular-nums font-mono-numeric text-[#161616]">
                  {fmtHeadlineNumber(activityCount)} events
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#6b7280]">
                  Active markets
                </div>
                <div className="mt-1 text-[16px] font-bold tabular-nums font-mono-numeric text-[#161616] flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#1d81f2]" strokeWidth={2.5} />
                  7 markets
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
