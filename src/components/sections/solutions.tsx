'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SOLUTION_CASES } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';
import { CaseStudyModal } from '@/components/site/case-study-modal';

export function Solutions() {
  const [active, setActive] = useState<number | null>(null);
  const cases = SOLUTION_CASES.slice(0, 3);

  return (
    <section id="solutions" className="bg-background py-24 md:py-32" aria-label="Solutions and case studies">
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Proof, not promises
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              Outcomes our customers measure.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              Every engagement is measured in cycle time, conversion, and cost —
              not in slideware. Three recent examples.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cases.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className="group flex min-h-[360px] flex-col rounded-2xl border border-hairline bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_32px_64px_-36px_rgb(26 35 50/0.35)]">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-muted-foreground">{item.industry}</span>
                  <span className="tabular text-[11px] text-ink/30">{item.year}</span>
                </div>

                <div className="mt-8 font-serif text-[52px] leading-none tracking-[-0.01em] text-ink">
                  {item.metrics[0].value}
                </div>
                <p className="mt-2 text-[12.5px] font-medium uppercase tracking-[0.14em] text-crimson">
                  {item.metrics[0].label}
                </p>

                <h3 className="mt-6 font-serif text-[19px] leading-snug text-ink">
                  {item.headline}
                </h3>
                <p className="mt-2 text-[13px] text-muted-foreground">
                  {item.company} · {item.duration}
                </p>

                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="mt-auto inline-flex cursor-pointer items-center gap-1.5 self-start bg-transparent pt-8 text-left text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
                  aria-label={`Read the story: ${item.headline}`}
                >
                  <span className="link-underline">Read the story</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <CaseStudyModal
        study={active !== null ? SOLUTION_CASES[active] : null}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
