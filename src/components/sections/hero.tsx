'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Activity, Cpu, Workflow } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

/* — Floating glass card (frosted, bobbing, per-card delay) — */
function GlassCard({
  className,
  floatClass,
  label,
  icon: Icon,
  children,
}: {
  className: string;
  floatClass: string;
  label: string;
  icon: typeof Activity;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute z-20 ${className} ${floatClass} rounded-2xl border border-white/70 bg-white/75 p-4 shadow-[0_24px_60px_-24px_rgb(26_35_50/0.28),0_2px_6px_-2px_rgb(26_35_50/0.08)] backdrop-blur-xl`}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-crimson/10 text-crimson">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
          {label}
        </p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/* — The FaQ emblem: navy "Fa" + cobalt "Q" on a white chip — */
function FaqEmblem() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-white shadow-[0_10px_30px_-10px_rgb(26_35_50/0.25)]">
      <span className="font-display text-[26px] font-extrabold leading-none tracking-tight">
        <span className="text-[#1B2631]">Fa</span>
        <span className="text-crimson">Q</span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* — Ambient cobalt wash (diffuse ellipse, not a ring) — */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-[8%] h-[560px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.13),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-14%] bottom-[-18%] h-[480px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.07),transparent_70%)] blur-2xl"
      />

      <div className="container-luxe relative grid min-h-[88svh] items-center gap-14 pb-20 pt-32 md:pt-36 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 lg:pb-24">
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
            <h1 className="mx-auto mt-7 max-w-xl font-display text-[42px] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink sm:text-6xl lg:mx-0 lg:text-[64px]">
              Build smarter systems.
              <br />
              <span className="bg-gradient-to-r from-crimson to-[#0057b8] bg-clip-text text-transparent">
                Scale better businesses.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-[1.8] text-muted-foreground lg:mx-0">
              FaQ Systems builds intelligent software, automation and digital
              systems that help modern businesses operate smarter, faster and
              more efficiently.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
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
              <span className="text-ink/70">Concordia &amp; Staffist in production</span>
            </p>
          </Reveal>
        </div>

        {/* — Right: the FaQ orb ecosystem — */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-[480px] lg:max-w-none"
          aria-hidden="true"
        >
          {/* Central glass orb */}
          <div className="absolute inset-[13%] rounded-full border border-white/70 bg-gradient-to-br from-white/90 via-white/60 to-crimson/[0.09] shadow-[0_40px_100px_-30px_rgb(0_122_255/0.35),inset_0_2px_14px_rgb(255_255_255/0.9)] backdrop-blur-xl breathe">
            {/* Specular highlight */}
            <div className="absolute left-[18%] top-[12%] h-[26%] w-[38%] rounded-full bg-gradient-to-br from-white/95 to-white/20 blur-[6px]" />
            {/* FaQ emblem chip */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FaqEmblem />
            </div>
            {/* Soft under-glow */}
            <div className="absolute -bottom-8 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-crimson/25 blur-2xl" />
          </div>

          {/* Floating card — code (top-left) */}
          <GlassCard
            className="left-[-2%] top-[6%] w-[172px] sm:w-[196px]"
            floatClass="float-soft"
            label="core.ts"
            icon={Activity}
          >
            <pre className="overflow-hidden rounded-lg bg-[#101828] p-3 font-mono text-[9.5px] leading-[1.65] text-[#7ee787]">
              <code>{`const system = FaQ.build({
  core,
  automation,
  intelligence,
}).ship().scale();`}</code>
            </pre>
          </GlassCard>

          {/* Floating card — automation flow (top-right) */}
          <GlassCard
            className="right-[-2%] top-[22%] w-[168px] sm:w-[188px]"
            floatClass="float-soft-delayed"
            label="automation"
            icon={Workflow}
          >
            <div className="space-y-2">
              {['trigger → check', 'route → notify', 'sync → ledger'].map(
                (row) => (
                  <div key={row} className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-50" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
                    </span>
                    <span className="font-mono text-[10px] text-ink/65">
                      {row}
                    </span>
                  </div>
                )
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <motion.div
                  initial={{ scaleX: 0.2 }}
                  animate={{ scaleX: [0.2, 0.85, 0.45, 0.95, 0.2] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-crimson to-[#0057b8]"
                />
              </div>
            </div>
          </GlassCard>

          {/* Floating card — intelligence metrics (bottom-right) */}
          <GlassCard
            className="bottom-[10%] right-[2%] w-[164px] sm:w-[184px]"
            floatClass="float-soft-late"
            label="intelligence"
            icon={Cpu}
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: '42%', k: 'efficiency' },
                { v: '68%', k: 'automation' },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-lg border border-ink/[0.05] bg-white/80 p-2"
                >
                  <p className="font-display text-[16px] font-extrabold leading-none text-crimson">
                    +{m.v}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-ink/45">
                    {m.k}
                  </p>
                </div>
              ))}
            </div>
            {/* Mini bars */}
            <div className="mt-2.5 flex h-9 items-end gap-1">
              {[35, 55, 42, 70, 58, 82, 66, 90].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: '20%' }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    duration: 1.1,
                    delay: 0.4 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`w-full rounded-sm ${
                    i > 5 ? 'bg-crimson/80' : 'bg-ink/15'
                  }`}
                />
              ))}
            </div>
          </GlassCard>

          {/* Connector dots */}
          <span className="absolute left-[24%] top-[30%] h-2 w-2 rounded-full bg-crimson/50 shadow-[0_0_12px_rgb(0_122_255/0.6)]" />
          <span className="absolute right-[22%] bottom-[34%] h-1.5 w-1.5 rounded-full bg-crimson/40 shadow-[0_0_10px_rgb(0_122_255/0.5)]" />
        </motion.div>
      </div>
    </section>
  );
}
