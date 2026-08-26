'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { useCaseStudy } from '@/components/case-study/case-study-router';
import { CASE_STUDIES } from '@/data/case-studies';

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
            <h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-ink md:text-5xl">
              Built, shipped and running.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              Two systems in production today — one flagship of our own, one
              built for a client. Open a card to read the full case study.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {CASE_STUDIES.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.1}>
              <motion.button
                type="button"
                onClick={() => openCase(product.slug)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                aria-label={`Open the ${product.name} case study`}
                className="group sheen relative flex w-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white text-left shadow-[0_6px_30px_-12px_rgb(26_35_50/0.12)] transition-shadow duration-500 hover:border-crimson/30 hover:shadow-[0_32px_80px_-28px_rgb(0_122_255/0.35)]"
              >
                {/* — Visual header: cobalt wash + faint grid + breathing glow — */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-crimson/[0.07] via-white to-crimson/[0.04] sm:h-52">
                  {/* faint grid */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(rgb(26_35_50/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(26_35_50/0.04)_1px,transparent_1px)] bg-[size:28px_28px]"
                  />
                  {/* breathing glow */}
                  <div
                    aria-hidden="true"
                    className="breathe absolute h-40 w-40 rounded-full bg-crimson/[0.14] blur-3xl sm:h-48 sm:w-48"
                  />
                  {/* badges */}
                  <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-[10.5px] font-semibold tracking-wide text-white backdrop-blur">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
                    </span>
                    {product.status}
                  </span>
                  <span className="absolute right-5 top-5 z-10 rounded-full border border-crimson/25 bg-white/80 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-crimson backdrop-blur">
                    {product.badge}
                  </span>
                  {/* logo */}
                  <div className="relative z-10 flex h-24 items-center justify-center transition-transform duration-500 group-hover:scale-[1.06]">
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={220}
                      height={220}
                      className={`${product.logoHeightClass} object-contain drop-shadow-[0_10px_24px_rgb(26_35_50/0.16)]`}
                      priority={i === 0}
                    />
                  </div>
                </div>

                {/* — Body — */}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[24px] font-extrabold tracking-tight text-ink">
                      {product.name}
                    </h3>
                    <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                      {product.sector}
                    </p>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                    {product.summary}
                  </p>

                  {/* metrics strip */}
                  <div className="mt-6 grid grid-cols-3 divide-x divide-hairline rounded-2xl border border-hairline bg-cream/60">
                    {product.cardMetrics.map((m) => (
                      <div key={m.label} className="px-3 py-3.5 text-center sm:px-4">
                        <p className="font-display text-[19px] font-extrabold leading-none text-ink">
                          {m.value}
                        </p>
                        <p className="mt-1.5 text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground/75">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline bg-white px-3 py-1.5 text-[11px] font-medium text-ink/60 transition-colors duration-300 group-hover:border-crimson/20 group-hover:text-ink/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {product.tags.length > 4 && (
                      <span className="rounded-full border border-hairline bg-white px-3 py-1.5 text-[11px] font-medium text-muted-foreground/70">
                        +{product.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-7">
                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-300 group-hover:bg-crimson">
                      View case study
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
