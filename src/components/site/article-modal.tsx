'use client';

import { EditorialModal } from '@/components/site/editorial-modal';
import { INSIGHT_BODIES, type INSIGHTS } from '@/lib/site-data';

type Insight = (typeof INSIGHTS)[number];

/**
 * ArticleModal — editorial long-form reader for Insights.
 * Serif headline, drop-cap opener, crimson pull-quotes,
 * em-dash bullet ledger.
 */
export function ArticleModal({
  insight,
  onClose,
}: {
  insight: Insight | null;
  onClose: () => void;
}) {
  const body = insight ? INSIGHT_BODIES[insight.id] : undefined;

  return (
    <EditorialModal
      open={insight !== null}
      onClose={onClose}
      label={insight ? `Article: ${insight.title}` : 'Article'}
    >
      {insight && body && (
        <article className="relative">
          {/* Masthead */}
          <header className="relative border-b border-hairline px-7 pb-9 pt-12 sm:px-12 md:px-16">
            <p className="eyebrow flex items-center gap-2.5 text-crimson">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              {insight.tag}
            </p>
            <h3 className="mt-4 max-w-xl font-serif text-[28px] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[36px]">
              {insight.title}
            </h3>
            <p className="tabular mt-5 text-[12px] tracking-[0.14em] text-muted-foreground">
              {insight.date} · {insight.readTime} read · NETSOL Insights
            </p>
          </header>

          {/* Body */}
          <div className="relative px-7 py-10 sm:px-12 md:px-16 md:py-12">
            <div className="mx-auto max-w-[62ch] space-y-6">
              {body.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-[15px] leading-[1.9] text-ink/80 first-letter:float-left first-letter:mr-2.5 first-letter:font-serif first-letter:text-[52px] first-letter:leading-[0.85] first-letter:text-crimson'
                      : 'text-[15px] leading-[1.9] text-ink/80'
                  }
                >
                  {para}
                </p>
              ))}

              {body.pullQuote && (
                <figure className="!mt-10 border-l-2 border-crimson/60 pl-6 sm:pl-8">
                  <blockquote className="font-serif text-[19px] italic leading-[1.55] text-ink sm:text-[22px]">
                    {body.pullQuote}
                  </blockquote>
                </figure>
              )}

              {body.bullets && (
                <ul className="!mt-10 space-y-3.5 border-t border-hairline pt-8">
                  {body.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-baseline gap-3.5 text-[14px] leading-[1.7] text-ink/75"
                    >
                      <span aria-hidden="true" className="font-serif text-crimson">
                        —
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              <p className="!mt-12 border-t border-hairline pt-7 text-[12px] tracking-[0.1em] text-muted-foreground">
                Written by the NETSOL Insights desk · Shaping smarter finance
                since 1997
              </p>
            </div>
          </div>
        </article>
      )}
    </EditorialModal>
  );
}
