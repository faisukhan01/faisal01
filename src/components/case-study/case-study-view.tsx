'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Fingerprint,
  FileBadge,
  Filter,
  GraduationCap,
  Radio,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { useCaseStudy } from '@/components/case-study/case-study-router';
import { getCaseStudy, type Panel } from '@/data/case-studies';
import { cn } from '@/lib/utils';

/* — Feature icons per product — */
const FEATURE_ICONS: Record<string, typeof Fingerprint[]> = {
  concordia: [Fingerprint, ClipboardList, Wallet, FileBadge, Users, GraduationCap],
  staffist: [CalendarClock, ShieldCheck, Sparkles, Radio, Filter, ScrollText],
};

/* ——————————————— Dashboard panels ——————————————— */

function KpiPanel({ panel }: { panel: Extract<Panel, { kind: 'kpis' }> }) {
  return (
    <div className="col-span-full rounded-xl border border-ink/[0.06] bg-white p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
        {panel.title}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {panel.kpis.map((k) => (
          <div key={k.label} className="rounded-lg bg-cream/70 p-3">
            <p className="font-display text-[20px] font-extrabold leading-none text-ink sm:text-[24px]">
              {k.value}
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/45">
              {k.label}
            </p>
            <p className="mt-1 text-[10px] font-medium text-crimson">{k.trend}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarsPanel({ panel }: { panel: Extract<Panel, { kind: 'bars' }> }) {
  return (
    <div className="rounded-xl border border-ink/[0.06] bg-white p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
        {panel.title}
      </p>
      <div className="mt-4 flex h-28 items-end gap-1.5 sm:h-32">
        {panel.bars.map((b, i) => (
          <div key={b.label} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              initial={{ height: '8%' }}
              whileInView={{ height: `${b.value}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'w-full rounded-t-[3px]',
                i >= panel.bars.length - 3 ? 'bg-gradient-to-t from-crimson to-[#3395ff]' : 'bg-ink/15'
              )}
            />
            <p className="mt-1.5 text-center text-[8.5px] font-medium text-ink/35">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModulesPanel({ panel }: { panel: Extract<Panel, { kind: 'modules' }> }) {
  return (
    <div className="rounded-xl border border-ink/[0.06] bg-white p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
        {panel.title}
      </p>
      <div className="mt-4 space-y-3.5">
        {panel.modules.map((m, i) => (
          <div key={m.name}>
            <div className="flex items-baseline justify-between">
              <p className="text-[11.5px] font-medium text-ink/70">{m.name}</p>
              <p className="tabular text-[10.5px] font-semibold text-crimson">{m.pct}%</p>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.pct}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-crimson to-[#0057b8]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedPanel({ panel }: { panel: Extract<Panel, { kind: 'feed' }> }) {
  return (
    <div className="rounded-xl border border-ink/[0.06] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
          {panel.title}
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
      </div>
      <ul className="mt-3.5 space-y-3">
        {panel.items.map((item) => (
          <li key={item.text} className="flex items-start justify-between gap-3">
            <span className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/60" />
              <span className="text-[11.5px] leading-snug text-ink/70">{item.text}</span>
            </span>
            <span className="shrink-0 text-[9.5px] font-medium uppercase tracking-wide text-ink/30">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GanttPanel({ panel }: { panel: Extract<Panel, { kind: 'gantt' }> }) {
  return (
    <div className="col-span-full rounded-xl border border-ink/[0.06] bg-white p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
        {panel.title}
      </p>
      <div className="mt-4 space-y-2.5">
        {panel.rows.map((row, i) => (
          <div key={row.name} className="flex items-center gap-3">
            <p className="w-20 shrink-0 truncate text-[10.5px] font-medium text-ink/55 sm:w-24 sm:text-[11.5px]">
              {row.name}
            </p>
            <div className="relative h-6 flex-1 rounded-md bg-ink/[0.05]">
              {row.blocks.map((b, j) => (
                <motion.div
                  key={j}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.1 + j * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ left: `${b.start}%`, width: `${b.width}%` }}
                  className={cn(
                    'absolute inset-y-0.5 origin-left rounded-[5px]',
                    b.solid ? 'bg-gradient-to-r from-crimson to-[#0057b8]' : 'bg-crimson/35'
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between pl-23 text-[8.5px] font-medium uppercase tracking-wide text-ink/25 sm:pl-27">
        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
      </div>
    </div>
  );
}

function AvailabilityPanel({ panel }: { panel: Extract<Panel, { kind: 'availability' }> }) {
  const tone = { on: 'bg-crimson', soon: 'bg-amber-400', off: 'bg-ink/20' } as const;
  const label = { on: 'On shift', soon: 'Soon', off: 'Off' } as const;
  return (
    <div className="rounded-xl border border-ink/[0.06] bg-white p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
        {panel.title}
      </p>
      <ul className="mt-3.5 space-y-2.5">
        {panel.staff.map((s) => (
          <li key={s.name} className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <span className={cn('h-1.5 w-1.5 rounded-full', tone[s.status])} />
              <span className="text-[11.5px] font-medium text-ink/70">{s.name}</span>
            </span>
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink/35">
              {label[s.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FunnelPanel({ panel }: { panel: Extract<Panel, { kind: 'funnel' }> }) {
  const max = panel.stages[0]?.value ?? 1;
  return (
    <div className="rounded-xl border border-ink/[0.06] bg-white p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
        {panel.title}
      </p>
      <div className="mt-4 space-y-3">
        {panel.stages.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-baseline justify-between">
              <p className="text-[11.5px] font-medium text-ink/70">{s.label}</p>
              <p className="tabular text-[12px] font-bold text-ink">
                {s.value.toLocaleString()}
              </p>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max((s.value / max) * 100, 6)}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'h-full rounded-full',
                  i === panel.stages.length - 1
                    ? 'bg-gradient-to-r from-crimson to-[#0057b8]'
                    : 'bg-crimson/30'
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* — The app-window frame that hosts the panels — */
function DashboardWindow({ dashboard }: { dashboard: { url: string; title: string; panels: Panel[] } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_40px_100px_-30px_rgb(26_35_50/0.3)]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-ink/[0.06] bg-cream/80 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="flex items-center gap-2 rounded-full border border-ink/[0.06] bg-white px-4 py-1.5 text-[10.5px] font-medium text-ink/50">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson/70" />
            {dashboard.url}
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-ink/45 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
          Live
        </span>
      </div>
      {/* panels */}
      <div className="grid gap-3 bg-cream/40 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4">
        {dashboard.panels.map((panel, i) => {
          const key = `${panel.kind}-${i}`;
          switch (panel.kind) {
            case 'kpis':
              return <KpiPanel key={key} panel={panel} />;
            case 'bars':
              return <BarsPanel key={key} panel={panel} />;
            case 'modules':
              return <ModulesPanel key={key} panel={panel} />;
            case 'feed':
              return <FeedPanel key={key} panel={panel} />;
            case 'gantt':
              return <GanttPanel key={key} panel={panel} />;
            case 'availability':
              return <AvailabilityPanel key={key} panel={panel} />;
            case 'funnel':
              return <FunnelPanel key={key} panel={panel} />;
          }
        })}
      </div>
    </motion.div>
  );
}

/* ——————————————— Section scaffolding ——————————————— */

function NumberedHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-crimson">
        {n}
      </span>
      <h2 className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-ink md:text-[28px]">
        {title}
      </h2>
    </div>
  );
}

/* ——————————————— The case study page ——————————————— */

export function CaseStudyView({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const { closeCase } = useCaseStudy();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCase();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slug, closeCase]);

  if (!study) return null;
  const featureIcons = FEATURE_ICONS[study.slug] ?? FEATURE_ICONS.concordia;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-background"
      aria-label={`${study.name} case study`}
    >
      {/* — Sticky sub-header — */}
      <div className="sticky top-16 z-40 border-b border-hairline bg-white/90 backdrop-blur-xl md:top-[76px]">
        <div className="container-luxe flex h-14 items-center justify-between gap-4">
          <button
            type="button"
            onClick={closeCase}
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-ink/60 transition-colors hover:text-ink"
            aria-label="Back to all products"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">All products</span>
          </button>
          <div className="flex items-center gap-3">
            <Image
              src={study.logo}
              alt=""
              width={96}
              height={40}
              className="h-6 w-auto object-contain sm:h-7"
            />
            <span className="hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              Live
            </span>
          </div>
          <button
            type="button"
            onClick={closeCase}
            aria-label="Close case study"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink md:hidden"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* — Hero — */}
      <header className="relative overflow-hidden border-b border-hairline bg-cream/40">
        <div className="container-luxe relative py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Case study · {study.sector}
            </p>
            <h1 className="mt-5 font-display text-[36px] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[44px]">
              {study.name}
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif text-[19px] italic leading-[1.55] text-ink/70 md:text-[21px]">
              {study.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-ink/50">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                {study.status}
              </span>
              <span className="hidden h-3 w-px bg-ink/15 sm:block" aria-hidden="true" />
              <span>{study.badge}</span>
            </div>
          </motion.div>

          {/* key metrics — quiet stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 grid max-w-4xl grid-cols-2 divide-x divide-hairline border-y border-hairline bg-white md:grid-cols-4"
          >
            {study.keyMetrics.map((m) => (
              <div key={m.label} className="px-4 py-6 text-center">
                <p className="tabular font-display text-[24px] font-extrabold leading-none text-ink md:text-[27px]">
                  {m.value}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-crimson">
                  {m.label}
                </p>
                <p className="mx-auto mt-1.5 max-w-[180px] text-[10.5px] leading-snug text-muted-foreground">
                  {m.note}
                </p>
              </div>
            ))}
          </motion.div>

          {/* the live dashboard */}
          <div className="mx-auto mt-12 max-w-4xl">
            <DashboardWindow dashboard={study.dashboard} />
          </div>
        </div>
      </header>

      {/* — 01 Overview — */}
      <section className="border-b border-hairline py-16 md:py-24" aria-label="Overview">
        <div className="container-luxe grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <NumberedHeading n="01" title="Overview" />
          </div>
          <div>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">{study.overview}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[11.5px] font-medium text-ink/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* — 02 The Challenge — */}
      <section className="border-b border-hairline bg-cream/50 py-16 md:py-24" aria-label="The challenge">
        <div className="container-luxe grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <NumberedHeading n="02" title={study.challenge.title} />
          </div>
          <div>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              {study.challenge.body}
            </p>
            <ul className="mt-7 divide-y divide-hairline border-t border-hairline">
              {study.challenge.painPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex items-start gap-4 py-4"
                >
                  <span className="tabular mt-0.5 font-mono text-[11px] font-medium text-crimson">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[13.5px] leading-[1.7] text-ink/75">{point}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* — 03 The Solution — */}
      <section className="border-b border-hairline py-16 md:py-24" aria-label="The solution">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
            <div>
              <NumberedHeading n="03" title={study.solution.title} />
            </div>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              {study.solution.body}
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {study.solution.approach.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="border-t-2 border-ink/10 pt-5 transition-colors duration-500 hover:border-crimson/60"
              >
                <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-crimson">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-muted-foreground">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* — 04 Key Features — */}
      <section className="border-b border-hairline bg-cream/50 py-16 md:py-24" aria-label="Key features">
        <div className="container-luxe">
          <NumberedHeading n="04" title="Key features" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {study.features.map((feature, i) => {
              const Icon = featureIcons[i] ?? featureIcons[0];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                  className="group rounded-2xl border border-hairline bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-crimson/25 hover:shadow-[0_20px_50px_-24px_rgb(0_122_255/0.22)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/10 text-crimson transition-colors duration-500 group-hover:bg-crimson group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[16.5px] font-bold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-[1.7] text-muted-foreground">
                    {feature.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* — 05 Tech & Architecture — */}
      <section className="border-b border-hairline py-16 md:py-24" aria-label="Technology and architecture">
        <div className="container-luxe grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <NumberedHeading n="05" title="Tech & architecture" />
          </div>
          <div className="space-y-0 divide-y divide-hairline border-y border-hairline">
            {study.tech.map((layer, i) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="w-32 shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink/50">
                  {layer.layer}
                </span>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {layer.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[13px] font-medium text-ink/75"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* — 06 Outcomes — */}
      <section className="border-b border-hairline bg-night py-16 text-white md:py-24" aria-label="Outcomes">
        <div className="container-luxe">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#4da3ff]">
              06
            </span>
            <h2 className="font-display text-[24px] font-extrabold tracking-[-0.02em] md:text-[28px]">
              Outcomes
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {study.outcomes.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="tabular font-display text-[30px] font-extrabold leading-none text-white md:text-[36px]">
                  {o.value}
                </p>
                <p className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#4da3ff]">
                  {o.label}
                </p>
                <p className="mt-2 text-[12px] leading-snug text-white/55">{o.note}</p>
              </motion.div>
            ))}
          </div>

          {/* pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-16 max-w-3xl text-center"
          >
            <p className="font-serif text-[24px] italic leading-[1.5] text-white/90 md:text-[28px]">
              &ldquo;{study.quote.text}&rdquo;
            </p>
            <footer className="mt-5">
              <p className="text-[13px] font-bold text-white">{study.quote.author}</p>
              <p className="mt-0.5 text-[12px] text-white/50">{study.quote.role}</p>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* — Final CTA — */}
      <section className="relative overflow-hidden py-20 md:py-28" aria-label="Case study call to action">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.12),transparent_70%)] blur-2xl"
        />
        <div className="container-luxe relative text-center">
          <h2 className="mx-auto max-w-xl font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink md:text-[36px]">
            {study.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.75] text-muted-foreground">
            {study.cta.body}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              onClick={closeCase}
              className="btn-cobalt group h-12 px-8 text-[14px]"
            >
              Discuss a similar build
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <button
              type="button"
              onClick={closeCase}
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-white px-8 text-[14px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_18px_44px_-20px_rgb(26_35_50/0.35)]"
            >
              Back to products
            </button>
          </div>
        </div>
      </section>
    </motion.article>
  );
}
