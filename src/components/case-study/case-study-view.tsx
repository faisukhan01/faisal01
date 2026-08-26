'use client';

import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Minus,
  Building2,
  KeyRound,
  ScrollText,
  Gauge,
  Webhook,
  ShieldCheck,
  Terminal,
  Workflow,
  Lock,
  Blocks,
  Plug,
  History,
  FlaskConical,
  Microscope,
  FileText,
  GitBranch,
  Scale,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import { Reveal, Stagger, staggerItem } from '@/components/site/reveal';
import { getCaseStudy, type Accent, type GalleryPanel } from '@/data/case-studies';

const ICONS: Record<string, LucideIcon> = {
  Building2, KeyRound, ScrollText, Gauge, Webhook, ShieldCheck,
  Terminal, Workflow, Lock, Blocks, Plug, History,
  FlaskConical, Microscope, FileText, GitBranch, Scale, Timer,
};

function accentClasses(accent: Accent) {
  switch (accent) {
    case 'cobalt':
      return { text: 'text-crimson', bg: 'bg-crimson', ring: 'ring-crimson/30', glow: 'group-hover:shadow-[0_30px_80px_-32px_rgb(0_122_255/0.45)]', dot: 'bg-crimson', bar: 'bg-crimson' };
    case 'violet':
      return { text: 'text-[#6d4aff]', bg: 'bg-[#6d4aff]', ring: 'ring-[#6d4aff]/30', glow: 'group-hover:shadow-[0_30px_80px_-32px_rgb(109_74_255/0.4)]', dot: 'bg-[#6d4aff]', bar: 'bg-[#6d4aff]' };
    default:
      return { text: 'text-ink', bg: 'bg-ink', ring: 'ring-ink/20', glow: 'group-hover:shadow-[0_30px_80px_-32px_rgb(26_35_50/0.4)]', dot: 'bg-ink', bar: 'bg-ink' };
  }
}

function toneBar(tone: Accent) {
  if (tone === 'cobalt') return 'bg-crimson';
  if (tone === 'violet') return 'bg-[#6d4aff]';
  return 'bg-ink';
}

/* — Product logo marks (inline SVG, one per slug) — */
function ProductMark({ slug, className }: { slug: string; className?: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {slug === 'faq-core' && (
        <g {...common}>
          <rect x="8" y="8" width="24" height="24" rx="6" />
          <rect x="14" y="14" width="12" height="12" rx="3" stroke="#007AFF" />
          <circle cx="20" cy="20" r="2.2" fill="#007AFF" stroke="none" />
        </g>
      )}
      {slug === 'faq-toolkit' && (
        <g {...common}>
          <path d="M14 10h12v6a6 6 0 0 1-12 0z" />
          <path d="M20 22v8M16 30h8" stroke="#007AFF" />
          <circle cx="20" cy="13" r="1.6" fill="#007AFF" stroke="none" />
        </g>
      )}
      {slug === 'faq-labs' && (
        <g {...common}>
          <path d="M20 6v6M20 28v6M6 20h6M28 20h6" />
          <circle cx="20" cy="20" r="5" stroke="#007AFF" />
          <circle cx="20" cy="20" r="1.6" fill="#007AFF" stroke="none" />
        </g>
      )}
    </svg>
  );
}

/* — Dashboard gallery panel renderer (the "screenshots") — */
function WindowChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-2.5 py-1 text-[10.5px] tabular text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" aria-hidden="true" />
          {title}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function TrendChip({ trend, delta }: { trend: 'up' | 'down' | 'flat'; delta: string }) {
  const Icon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const color = trend === 'flat' ? 'text-white/40' : trend === 'up' ? 'text-emerald-300/90' : 'text-rose-300/80';
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] tabular ${color}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {delta}
    </span>
  );
}

function PanelBody({ panel }: { panel: GalleryPanel }) {
  if (panel.kind === 'kpi') {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {panel.data.map((d) => (
          <div key={d.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-3.5">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-white/45">{d.label}</p>
            <p className="mt-2 font-serif text-2xl text-white tabular">{d.value}</p>
            <div className="mt-1.5"><TrendChip trend={d.trend} delta={d.delta} /></div>
          </div>
        ))}
      </div>
    );
  }
  if (panel.kind === 'bars') {
    const max = Math.max(...panel.data.map((d) => d.value));
    return (
      <div>
        <div className="flex h-36 items-end gap-1.5 md:gap-2">
          {panel.data.map((d) => (
            <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-2">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${Math.max(6, (d.value / max) * 100)}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-t-[3px] bg-crimson/80"
                aria-label={`${d.label}: ${d.value}${panel.unit}`}
              />
              <span className="text-[9.5px] tabular text-white/35">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] tabular text-white/40">
          <span>{panel.unit}</span>
          <span>last 12 weeks</span>
        </div>
      </div>
    );
  }
  if (panel.kind === 'funnel') {
    return (
      <div className="space-y-2.5">
        {panel.data.map((d) => (
          <div key={d.stage}>
            <div className="mb-1 flex items-center justify-between text-[11px] tabular text-white/60">
              <span>{d.stage}</span>
              <span>{d.value.toLocaleString()} <span className="text-white/35">· {d.pct}%</span></span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${d.pct}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-crimson/80"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (panel.kind === 'gantt') {
    return (
      <div>
        <div className="mb-2 flex justify-between text-[9.5px] tabular text-white/30">
          {Array.from({ length: panel.weeks + 1 }).map((_, i) => (
            <span key={i}>W{i + 1}</span>
          ))}
        </div>
        <div className="space-y-2.5">
          {panel.data.map((g) => (
            <div key={g.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-[11px] text-white/60">{g.label}</span>
              <div className="relative h-6 flex-1 rounded bg-white/[0.04]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(g.len / panel.weeks) * 100}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute top-0 h-full rounded-[3px] ${toneBar(g.tone)}`}
                  style={{ left: `${(g.start / panel.weeks) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // list
  return (
    <ul className="divide-y divide-white/[0.06]">
      {panel.data.map((d, i) => (
        <li key={i} className="flex items-center gap-3 py-2.5">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${toneBar(d.tone)}`} aria-hidden="true" />
          <span className="flex-1 font-mono text-[12px] text-white/85">{d.title}</span>
          <span className="hidden text-[11px] text-white/45 sm:inline">{d.meta}</span>
          <span className="text-[10.5px] tabular text-white/35">{d.ts}</span>
        </li>
      ))}
    </ul>
  );
}

/* — Section heading helper — */
function SectionHead({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <div className="flex items-end gap-6">
      <span className="tabular text-[11px] tracking-[0.2em] text-ink/30">{index}</span>
      <div>
        <p className="eyebrow text-crimson">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-[-0.015em] text-ink md:text-4xl">{title}</h2>
      </div>
    </div>
  );
}

export function CaseStudyView({ slug, onBack }: { slug: string; onBack: () => void }) {
  const data = getCaseStudy(slug);

  // Scroll to top on mount / slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  // Keyboard: Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  if (!data) {
    return (
      <main className="flex-1">
        <div className="container-luxe py-40 text-center">
          <p className="font-serif text-2xl text-ink">Case study not found.</p>
          <button onClick={onBack} className="btn-primary mt-6 h-11 px-6 text-sm">Back to all products</button>
        </div>
      </main>
    );
  }

  const a = accentClasses(data.accent);

  return (
    <main className="flex-1">
      {/* Sticky sub-top-bar (sits below the fixed site header) */}
      <div className="sticky top-16 z-40 border-b border-hairline bg-cream/85 backdrop-blur-xl md:top-[76px]">
        <div className="container-luxe flex h-14 items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
            aria-label="Back to all products"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            All products
          </button>
          <div className="flex items-center gap-2.5">
            <ProductMark slug={data.slug} className={`h-6 w-6 ${a.text}`} />
            <span className="font-serif text-[15px] text-ink">{data.name}</span>
            <span className="hidden h-4 w-px bg-hairline sm:block" />
            <span className="hidden text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:inline">{data.sector}</span>
          </div>
        </div>
      </div>

      {/* HERO BAND */}
      <section className="relative overflow-hidden bg-night py-16 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-crimson/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-[#6d4aff]/15 blur-[100px]" />
        </div>
        <div className="container-luxe relative">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
                </span>
                {data.status}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">{data.sector}</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-7 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.02em] text-white md:text-6xl">
              {data.name}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-white/70">{data.tagline}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <p className="font-serif text-5xl tabular text-white md:text-6xl">{data.heroMetric.value}</p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-white/50">{data.heroMetric.label}</p>
              </div>
              <a href="#contact" className="btn-light h-11 px-6 text-[13px]">
                {data.nextStep.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="bg-white py-16 md:py-28">
        <div className="container-luxe">
          <Reveal><SectionHead index="01" eyebrow="Challenge" title={data.challenge.title} /></Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal delay={0.06}>
              <p className="text-[16px] leading-[1.8] text-ink/75">{data.challenge.body}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="space-y-4">
                {data.challenge.painPoints.map((p, i) => (
                  <li key={i} className="flex gap-4 border-t border-hairline pt-4">
                    <span className="tabular text-[11px] tracking-[0.2em] text-crimson">0{i + 1}</span>
                    <span className="text-[14.5px] leading-[1.7] text-ink/75">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-cream py-16 md:py-28">
        <div className="container-luxe">
          <Reveal><SectionHead index="02" eyebrow="Solution" title={data.solution.title} /></Reveal>
          <Reveal delay={0.06}>
            <p className="mt-8 max-w-3xl text-[16px] leading-[1.8] text-ink/75">{data.solution.body}</p>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.solution.approach.map((s, i) => (
              <motion.div key={i} variants={staggerItem} className="rounded-xl border border-hairline bg-white p-6">
                <p className="tabular text-[11px] tracking-[0.2em] text-ink/30">0{i + 1}</p>
                <h3 className="mt-3 font-serif text-[18px] leading-tight text-ink">{s.step}</h3>
                <p className="mt-2.5 text-[13px] leading-[1.7] text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="bg-white py-16 md:py-28">
        <div className="container-luxe">
          <Reveal><SectionHead index="03" eyebrow="Architecture" title="The stack" /></Reveal>
          <Reveal delay={0.06}>
            <div className="mt-10 space-y-3">
              {data.stack.map((layer, i) => (
                <div key={layer.layer} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                  <div className="w-full md:w-40 shrink-0">
                    <p className="tabular text-[11px] tracking-[0.2em] text-ink/40">L{data.stack.length - i}</p>
                    <p className="font-serif text-[17px] text-ink">{layer.layer}</p>
                  </div>
                  <div className="flex flex-1 flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span key={item} className="rounded-full border border-hairline bg-cream px-3.5 py-1.5 text-[12px] text-ink/70">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          {/* Layered flow diagram */}
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-hairline bg-cream p-6 md:p-8">
              <div className="space-y-2.5">
                {['Client', 'Edge', 'Services', 'Data'].map((label, i) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="w-20 shrink-0 text-right text-[11px] uppercase tracking-[0.16em] text-ink/40">{label}</span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative h-12 flex-1 origin-left rounded-lg ${i % 2 === 0 ? 'bg-ink' : 'bg-crimson'} text-white`}
                    >
                      <div className="flex h-full items-center justify-between px-4">
                        <span className="text-[12px] font-medium">{['Devices & web app', 'Caddy + edge cache', 'Bun services + policy', 'Postgres + event log'][i]}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="bg-cream py-16 md:py-28">
        <div className="container-luxe">
          <Reveal><SectionHead index="04" eyebrow="Capabilities" title="What it does" /></Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f) => {
              const Icon = ICONS[f.icon] ?? Blocks;
              return (
                <motion.article key={f.title} variants={staggerItem} className="group bg-white p-7 transition-colors duration-500 hover:bg-cream">
                  <Icon className="h-6 w-6 text-crimson" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-[19px] leading-tight text-ink">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.7] text-muted-foreground">{f.body}</p>
                </motion.article>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* LIVE METRICS */}
      <section className="bg-white py-16 md:py-28">
        <div className="container-luxe">
          <Reveal><SectionHead index="05" eyebrow="In production" title="Live numbers" /></Reveal>
          <Reveal delay={0.06}>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-4">
              {data.metrics.map((m) => (
                <div key={m.label} className="bg-white p-7 md:p-8">
                  <p className="font-serif text-4xl tabular text-ink md:text-5xl">{m.value}</p>
                  <div className="mt-3 h-px w-10 bg-crimson" />
                  <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-ink/70">{m.label}</p>
                  {m.sub && <p className="mt-1 text-[11px] text-muted-foreground">{m.sub}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DASHBOARD GALLERY */}
      <section className="bg-night py-16 text-white md:py-28">
        <div className="container-luxe">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <SectionHead index="06" eyebrow="Gallery" title="Inside the product" />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-md text-[14px] leading-[1.7] text-white/55">
              Live screenshots from the production console — rendered, not mocked from a screenshot.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {data.gallery.map((panel) => (
              <Reveal key={panel.title} delay={0.04}>
                <WindowChrome title={panel.title}>
                  <PanelBody panel={panel} />
                </WindowChrome>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      {data.testimonial && (
        <section className="bg-white py-16 md:py-28">
          <div className="container-luxe">
            <Reveal>
              <blockquote className="mx-auto max-w-3xl text-center">
                <p className="font-serif text-3xl leading-[1.25] tracking-[-0.01em] text-ink md:text-[34px]">
                  &ldquo;{data.testimonial.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <p className="text-[14px] font-medium text-ink">{data.testimonial.author}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{data.testimonial.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>
      )}

      {/* NEXT STEP CTA */}
      <section className="bg-crimson py-14 text-white md:py-20">
        <div className="container-luxe">
          <Reveal>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow text-white/70">Next step</p>
                <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-[-0.015em] text-white md:text-4xl">{data.nextStep.title}</h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-white/80">{data.nextStep.body}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-light h-12 px-7 text-sm">
                  {data.nextStep.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <button onClick={onBack} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  All products
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
