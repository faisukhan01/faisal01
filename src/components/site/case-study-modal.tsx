'use client';

import { EditorialModal } from '@/components/site/editorial-modal';
import type { SOLUTION_CASES } from '@/lib/site-data';

type CaseStudy = (typeof SOLUTION_CASES)[number];

/**
 * CaseStudyModal — editorial deep-dive for a customer story.
 * Serif headline, metric ledger, Challenge → Solution → Results
 * narrative, closing pull-quote.
 */
export function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy | null;
  onClose: () => void;
}) {
  return (
    <EditorialModal
      open={study !== null}
      onClose={onClose}
      label={study ? `Case study: ${study.company}` : 'Case study'}
    >
      {study && (
        <article className="relative">
          {/* Document header */}
          <header className="relative border-b border-hairline px-7 pb-8 pt-12 sm:px-12 md:px-16">
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              {study.industry} — Case study {study.year}
            </p>
            <h3 className="mt-4 max-w-xl font-serif text-[30px] leading-[1.12] tracking-[-0.015em] text-ink sm:text-[38px]">
              {study.headline}
            </h3>
            <p className="mt-4 text-[13.5px] text-muted-foreground">
              {study.company} · {study.duration} engagement
            </p>
          </header>

          {/* Metric ledger */}
          <div className="relative grid grid-cols-3 divide-x divide-hairline border-b border-hairline">
            {study.metrics.map((m) => (
              <div key={m.label} className="px-4 py-6 text-center sm:py-7">
                <div className="tabular font-serif text-[24px] leading-none text-ink sm:text-[30px]">
                  {m.value}
                </div>
                <div className="eyebrow mt-2.5 text-[9.5px] text-muted-foreground/80">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Narrative */}
          <div className="relative space-y-9 px-7 py-10 sm:px-12 md:px-16 md:py-12">
            <section>
              <h4 className="eyebrow text-crimson">The challenge</h4>
              <p className="mt-3.5 text-[14.5px] leading-[1.85] text-ink/75">
                {study.challenge}
              </p>
            </section>
            <section>
              <h4 className="eyebrow text-crimson">The solution</h4>
              <p className="mt-3.5 text-[14.5px] leading-[1.85] text-ink/75">
                {study.solution}
              </p>
            </section>
            <section>
              <h4 className="eyebrow text-crimson">The results</h4>
              <p className="mt-3.5 text-[14.5px] leading-[1.85] text-ink/75">
                {study.results}
              </p>
            </section>

            {/* Pull quote */}
            <figure className="border-l-2 border-crimson/60 pl-6 sm:pl-8">
              <blockquote className="font-serif text-[19px] italic leading-[1.55] text-ink sm:text-[22px]">
                &ldquo;{study.quote}&rdquo;
              </blockquote>
              <figcaption className="eyebrow mt-3.5 text-muted-foreground">
                {study.quoteBy}
              </figcaption>
            </figure>
          </div>

          {/* Document footer */}
          <footer className="relative flex items-center justify-between gap-4 border-t border-hairline px-7 py-5 sm:px-12 md:px-16">
            <span className="eyebrow text-ink/35">Transcend&reg; Platform</span>
            <span className="tabular text-[11px] tracking-[0.16em] text-ink/35">
              NETSOL — {study.industryId.toUpperCase()}
            </span>
          </footer>
        </article>
      )}
    </EditorialModal>
  );
}
