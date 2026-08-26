'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

/* — One clean operations console (single, strictly aligned visual) — */
function OpsConsole() {
  const feed = [
    { time: '09:41', label: 'attendance.sync — 4,212 records', state: 'done' },
    { time: '09:37', label: 'shifts.optimize — 128 staff routed', state: 'done' },
    { time: '09:32', label: 'fees.reconcile — ledger balanced', state: 'live' },
  ] as const;

  return (
    <div className="float-soft relative w-full max-w-[460px]">
      {/* soft ambient wash behind the console */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.1),transparent_72%)] blur-2xl"
      />

      {/* window */}
      <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/85 shadow-[0_36px_90px_-30px_rgb(26_35_50/0.3),0_4px_14px_-6px_rgb(26_35_50/0.1)] backdrop-blur-xl">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-ink/[0.06] px-5 py-3.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <p className="truncate font-mono text-[11px] font-medium text-ink/50">
            faq.systems — operations
          </p>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-crimson/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-crimson">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
            </span>
            Live
          </span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 divide-x divide-ink/[0.06] border-b border-ink/[0.06]">
          {[
            { v: '99.9%', k: 'uptime' },
            { v: '128', k: 'automations' },
            { v: '+42%', k: 'efficiency' },
          ].map((m) => (
            <div key={m.k} className="px-4 py-4 text-center sm:px-5">
              <p className="font-display text-[17px] font-extrabold leading-none text-ink">
                {m.v}
              </p>
              <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                {m.k}
              </p>
            </div>
          ))}
        </div>

        {/* activity feed */}
        <div className="space-y-2.5 px-5 py-4">
          {feed.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="tabular w-9 shrink-0 font-mono text-[10.5px] font-medium text-ink/45">
                {row.time}
              </span>
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  row.state === 'live'
                    ? 'bg-crimson shadow-[0_0_8px_rgb(0_122_255/0.7)]'
                    : 'bg-[#28c840]'
                }`}
              />
              <span className="truncate font-mono text-[11.5px] text-ink/70">
                {row.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* throughput bar */}
        <div className="border-t border-ink/[0.06] px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
              system.load
            </p>
            <p className="font-mono text-[10px] font-semibold text-ink/55">
              nominal
            </p>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
            <motion.div
              initial={{ scaleX: 0.15 }}
              animate={{ scaleX: [0.15, 0.72, 0.4, 0.88, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-crimson to-[#0057b8]"
            />
          </div>
        </div>
      </div>

      {/* single floating accent chip */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="float-soft-delayed absolute -bottom-7 -left-6 z-10 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-[0_20px_50px_-20px_rgb(0_122_255/0.4)] backdrop-blur-xl sm:-left-10"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-crimson/10 text-crimson">
          <TrendingUp className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>
          <span className="block font-display text-[14px] font-extrabold leading-none text-ink">
            +42% efficiency
          </span>
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.1em] text-ink/40">
            this quarter
          </span>
        </span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* — single ambient cobalt wash — */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[6%] h-[520px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.1),transparent_70%)] blur-2xl"
      />

      <div className="container-luxe relative grid items-center gap-16 pb-24 pt-32 md:pt-36 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-12 lg:pb-28">
        {/* — Left: copy — */}
        <div className="relative z-10 text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-crimson/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
              </span>
              Intelligent Software Systems
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-7 max-w-[560px] font-display text-[38px] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[46px] lg:mx-0 lg:text-[54px]">
              Build smarter systems.
              <br />
              <span className="bg-gradient-to-r from-crimson to-[#0057b8] bg-clip-text text-transparent">
                Scale better businesses.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-[520px] text-[14.5px] leading-[1.75] text-muted-foreground lg:mx-0">
              FaQ Systems builds intelligent software, automation and digital
              systems that help modern businesses operate smarter, faster and
              more efficiently.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#products"
                className="btn-cobalt group h-12 px-7 text-[14px]"
              >
                Explore Solutions
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-white px-7 text-[14px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_18px_44px_-20px_rgb(26_35_50/0.35)]"
              >
                Talk to Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-9 text-[12.5px] font-medium tracking-wide text-muted-foreground/80">
              Remote-first · Shipping worldwide ·{' '}
              <span className="text-ink/70">
                Concordia &amp; Staffist in production
              </span>
            </p>
          </Reveal>
        </div>

        {/* — Right: the operations console — */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto flex justify-center lg:justify-end"
          aria-hidden="true"
        >
          <OpsConsole />
        </motion.div>
      </div>
    </section>
  );
}
