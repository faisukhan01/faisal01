'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { useCaseStudy } from '@/components/case-study/case-study-router';
import { CASE_STUDIES, type Accent } from '@/data/case-studies';

function accentFor(accent: Accent) {
  switch (accent) {
    case 'cobalt':
      return { text: 'text-crimson', ring: 'group-hover:ring-1 group-hover:ring-crimson/30', glow: 'group-hover:shadow-[0_30px_70px_-28px_rgb(0_122_255/0.40)]', baseline: 'bg-crimson', dot: 'bg-crimson' };
    case 'violet':
      return { text: 'text-[#6d4aff]', ring: 'group-hover:ring-1 group-hover:ring-[#6d4aff]/25', glow: 'group-hover:shadow-[0_30px_70px_-28px_rgb(109_74_255/0.35)]', baseline: 'bg-[#6d4aff]', dot: 'bg-[#6d4aff]' };
    default:
      return { text: 'text-ink', ring: 'group-hover:ring-1 group-hover:ring-ink/15', glow: 'group-hover:shadow-[0_30px_70px_-28px_rgb(26_35_50/0.35)]', baseline: 'bg-ink', dot: 'bg-ink' };
  }
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

export function Products() {
  const { openCase } = useCaseStudy();

  return (
    <section
      id="products"
      className="border-y border-hairline bg-white py-24 md:py-32"
      aria-label="Products"
    >
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Products
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              Three products. One standard.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              A flagship platform, a productized toolkit, and a lab for what
              comes next. Open any card to read the full case study.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES.map((product, i) => {
              const a = accentFor(product.accent);
              return (
                <motion.button
                  key={product.slug}
                  type="button"
                  onClick={() => openCase(product.slug)}
                  aria-label={`Open the ${product.name} case study`}
                  whileHover={undefined}
                  whileTap={{ y: 0 }}
                  className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-hairline bg-white p-8 text-left transition-all duration-500 will-change-transform hover:-translate-y-1.5 ${a.ring} ${a.glow} focus-visible:outline-2 focus-visible:outline-offset-4`}
                >
                  {/* Top row: index + product mark */}
                  <div className="flex items-start justify-between">
                    <span className="tabular text-[11px] tracking-[0.2em] text-ink/30">
                      0{i + 1}
                    </span>
                    <ProductMark
                      slug={product.slug}
                      className={`h-12 w-12 text-ink/55 transition-colors duration-500 group-hover:${a.text}`}
                    />
                  </div>

                  {/* Sector tag */}
                  <p className="mt-8 eyebrow text-[9.5px] text-crimson">{product.tag}</p>
                  <h3 className="mt-2 font-serif text-[26px] leading-tight text-ink">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                    {product.summary}
                  </p>

                  {/* Card tags */}
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {product.cardTags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-cream px-3 py-1 text-[11px] text-ink/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Footer: hero metric + view case study affordance */}
                  <div className="mt-auto pt-7">
                    <div className="flex items-end justify-between border-t border-hairline pt-5">
                      <div>
                        <p className="font-serif text-2xl tabular text-ink">{product.heroMetric.value}</p>
                        <p className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                          {product.heroMetric.label}
                        </p>
                      </div>
                      <span className="link-underline inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink/80 transition-colors group-hover:text-ink">
                        View case study
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  {/* Baseline accent that scales in on hover */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 ${a.baseline} transition-transform duration-500 group-hover:scale-x-100`}
                  />
                </motion.button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
