'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { useCaseStudy } from '@/components/case-study/case-study-router';
import { CASE_STUDIES } from '@/data/case-studies';

/* Per-product brand tint for the quiet logo area */
const BAND_TINT: Record<string, string> = {
  concordia: 'bg-[#fdf6ee]',
  staffist: 'bg-[#eef5fd]',
};

export function Products() {
  const { openCase } = useCaseStudy();

  return (
    <section
      id="products"
      className="border-y border-hairline bg-white py-20 md:py-28"
      aria-label="Products"
    >
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Products</p>
            <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink md:text-[36px]">
              Built, shipped and running.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.7] text-muted-foreground">
              Two systems in production today — one flagship of our own, one
              built for a client. Open a card to read the full case study.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1080px] gap-7 md:grid-cols-2 md:gap-9">
          {CASE_STUDIES.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.1}>
              <motion.button
                type="button"
                onClick={() => openCase(product.slug)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                aria-label={`Open the ${product.name} case study`}
                className="group relative flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-white text-left shadow-[0_6px_30px_-14px_rgb(26_35_50/0.12)] transition-all duration-500 hover:border-crimson/30 hover:shadow-[0_32px_80px_-28px_rgb(0_122_255/0.3)]"
              >
                {/* — quiet inset logo area — */}
                <div
                  className={`relative flex h-44 items-center justify-center overflow-hidden border-b border-hairline sm:h-48 ${
                    BAND_TINT[product.slug] ?? 'bg-cream'
                  }`}
                >
                  {/* status — quiet text, no pill */}
                  <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-wide text-ink/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                    {product.status}
                  </span>

                  {/* logo */}
                  <div className="relative z-10 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={260}
                      height={180}
                      className={`${product.logoHeightClass} object-contain drop-shadow-[0_10px_24px_rgb(26_35_50/0.12)]`}
                      priority={i === 0}
                    />
                  </div>
                </div>

                {/* — Body — */}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-display text-[24px] font-extrabold tracking-tight text-ink">
                      {product.name}
                    </h3>
                    <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                      {product.sector}
                    </p>
                    <span className="rounded-full bg-crimson/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-crimson">
                      {product.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                    {product.summary}
                  </p>

                  {/* metrics — clean inline row, no boxes */}
                  <div className="mt-7 grid grid-cols-3">
                    {product.cardMetrics.map((m, mi) => (
                      <div
                        key={m.label}
                        className={
                          mi === 0
                            ? 'pr-4'
                            : `border-l border-hairline px-4 ${mi === 2 ? 'pl-4' : ''}`
                        }
                      >
                        <p className="font-display text-[20px] font-extrabold leading-none text-ink">
                          {m.value}
                        </p>
                        <p className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.11em] text-ink/40">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cream px-3 py-1.5 text-[11px] font-medium text-ink/55 transition-colors duration-300 group-hover:text-ink/75"
                      >
                        {tag}
                      </span>
                    ))}
                    {product.tags.length > 3 && (
                      <span className="rounded-full px-2 py-1.5 text-[11px] font-medium text-muted-foreground/70">
                        +{product.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA — editorial link row */}
                  <div className="mt-auto flex items-center justify-between border-t border-hairline pt-7">
                    <span className="link-underline text-[13.5px] font-semibold text-ink transition-colors duration-300 group-hover:text-crimson">
                      View case study
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.05] text-ink transition-all duration-300 group-hover:bg-crimson group-hover:text-white">
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>

                {/* baseline accent */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-crimson to-[#0057b8] transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
