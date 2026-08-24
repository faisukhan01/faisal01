'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { INSIGHTS } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';
import { ArticleModal } from '@/components/site/article-modal';

export function Insights() {
  const [active, setActive] = useState<number | null>(null);
  const articles = INSIGHTS.slice(0, 3);

  return (
    <section
      id="insights"
      className="border-y border-hairline bg-white py-24 md:py-32"
      aria-label="Insights"
    >
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Insights
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              Thinking from the frontline of asset finance.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              Essays and field notes from the teams building Transcend —
              decisioning, residuals, and the death of nightly reconciliation.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col border-t-2 border-ink/10 pt-7 transition-colors duration-500 hover:border-ink/40">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-[10px] text-crimson">{article.tag}</span>
                  <span className="tabular text-[12px] text-muted-foreground">
                    {article.date} · {article.readTime}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-[21px] leading-[1.3] tracking-[-0.005em] text-ink">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="cursor-pointer bg-transparent text-left decoration-ink/25 underline-offset-4 transition-colors hover:underline"
                  >
                    {article.title}
                  </button>
                </h3>
                <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                  {article.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="mt-auto inline-flex cursor-pointer items-center gap-1.5 self-start bg-transparent pt-6 text-left text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  <span className="link-underline">Read article</span>
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

      <ArticleModal
        insight={active !== null ? INSIGHTS[active] : null}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
