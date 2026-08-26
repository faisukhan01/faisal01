'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

const STATS = [
  { value: '99.9%', label: 'Platform uptime' },
  { value: '2', label: 'Systems in production' },
  { value: '12', label: 'Modules shipped' },
  { value: '4,200+', label: 'Daily users' },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* — one quiet ambient wash, centered behind the headline — */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.09),transparent_72%)] blur-2xl"
      />

      <div className="container-luxe relative pb-24 pt-36 md:pt-44">
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              Intelligent Software Systems
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-8 font-display text-[40px] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[48px] lg:text-[56px]">
              Build smarter systems.
              <br />
              <span className="bg-gradient-to-r from-crimson to-[#0057b8] bg-clip-text text-transparent">
                Scale better businesses.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.75] text-muted-foreground">
              We design, build and operate intelligent software — from
              automation to full platforms — that help modern businesses run
              smarter, faster and leaner.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#products" className="btn-cobalt group h-12 px-7 text-[14px]">
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
        </div>

        {/* — quiet stat strip: plain numbers, hairline dividers, no boxes — */}
        <Reveal delay={0.34}>
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-20 grid max-w-[860px] grid-cols-2 divide-x divide-hairline border-y border-hairline md:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-7 text-center md:py-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[26px] font-extrabold leading-none tracking-tight text-ink md:text-[28px]">
                  {s.value}
                </dd>
                <dd className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.13em] text-ink/45">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </Reveal>
      </div>
    </section>
  );
}
