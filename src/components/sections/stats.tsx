'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { STATS } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';

const WHY_NETSOL = [
  {
    title: 'One connected platform',
    metric: '1',
    line: 'unified data layer — originations to analytics, no nightly batch reconciliation.',
  },
  {
    title: 'Proven at enterprise scale',
    metric: '$500B+',
    line: 'assets managed across 30+ country deployments for captives, banks, and OEMs.',
  },
  {
    title: 'Applied AI, in production',
    metric: '9',
    line: 'production models — underwriting, document intelligence, conversational servicing.',
  },
  {
    title: 'Built for regulated finance',
    metric: 'ISO 27001',
    line: 'certified, SOC 2 aligned, with regional data residency in six delivery centers.',
  },
];

function CountUp({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      className="relative overflow-hidden bg-night py-24 text-cream md:py-32"
      aria-label="NETSOL at a glance"
    >
      <div className="container-luxe relative">
        <Reveal className="text-center">
          <p className="eyebrow text-cream/45">NETSOL at a glance</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] md:text-5xl">
            The numbers behind the trust.
          </h2>
        </Reveal>

        {/* Big serif stats */}
        <div className="mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-cream/10">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="px-2 text-center md:px-8">
                <div className="font-serif text-[44px] leading-none tracking-[-0.01em] md:text-[56px]">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="eyebrow mt-4 text-cream/50">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Why NETSOL — folded editorial strip */}
        <div className="mt-20 border-t border-cream/10 pt-14">
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_NETSOL.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div>
                  <span className="tabular text-[11px] tracking-[0.2em] text-cream/35">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-[15px] font-medium text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.7] text-cream/50">
                    <span className="font-serif text-[14px] text-cream/80">
                      {item.metric}
                    </span>{' '}
                    {item.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 text-center text-[11.5px] tracking-[0.08em] text-cream/35">
            Figures as of FY2025 · NASDAQ: NTWK · ISO 27001 · SOC 2 Type II
          </p>
        </Reveal>
      </div>
    </section>
  );
}
