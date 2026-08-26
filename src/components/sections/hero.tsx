'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { ProductShowcase } from '@/components/site/product-showcase';

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
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.08),transparent_72%)] blur-2xl"
      />

      <div className="container-luxe relative pb-24 pt-36 md:pt-44">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Intelligent Software Systems
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[48px] lg:text-[56px]">
              Build{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-crimson">
                smarter
              </span>{' '}
              systems.
              <br />
              Scale{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-crimson">
                better
              </span>{' '}
              businesses.
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
                See our work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="link-underline inline-flex h-12 items-center px-4 text-[14px] font-semibold text-ink/70 transition-colors duration-300 hover:text-ink"
              >
                Talk to us
                <ArrowRight
                  className="ml-1.5 h-3.5 w-3.5 opacity-50 transition-all duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </div>

        {/* — product showcase: auto-rotating live console views — */}
        <Reveal delay={0.3}>
          <div className="mt-14 md:mt-16">
            <ProductShowcase />
          </div>
        </Reveal>

        {/* — quiet stat strip: plain numbers, hairline dividers, no boxes — */}
        <Reveal delay={0.1}>
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-16 grid max-w-[860px] grid-cols-2 divide-x divide-hairline border-y border-hairline md:grid-cols-4 md:mt-20"
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-7 text-center md:py-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="tabular font-display text-[26px] font-extrabold leading-none tracking-tight text-ink md:text-[28px]">
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
