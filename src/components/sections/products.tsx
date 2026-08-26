'use client';

import Image from 'next/image';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { useCaseStudy } from '@/components/case-study/case-study-router';
import { CASE_STUDIES } from '@/data/case-studies';

/* Per-product brand tint for the quiet logo area */
const BAND_TINT: Record<string, string> = {
  concordia: 'bg-[#fdf6ee]',
  staffist: 'bg-[#eef5fd]',
};

/* — Animated metric number: parses "96.4%" / "4,200" and counts up — */
function MetricNumber({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const match = value.match(/^([\d,.]+)(.*)$/);
  const num = match ? parseFloat(match[1].replace(/,/g, '')) : null;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 24 });

  useEffect(() => {
    if (inView && num !== null) {
      const t = setTimeout(() => mv.set(num), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, num, mv, delay]);

  useEffect(() => {
    if (num === null) return;
    const unsub = spring.on('change', (v) => {
      if (ref.current) {
        const formatted = v.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        ref.current.textContent = formatted + suffix;
      }
    });
    return unsub;
  }, [spring, num, decimals, suffix]);

  return (
    <p ref={ref} className="font-display text-[20px] font-extrabold leading-none text-ink">
      {value}
    </p>
  );
}

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
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Products
            </p>
            <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink md:text-[36px]">
              Built, shipped and running.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.7] text-muted-foreground">
              Two systems in production today — one flagship of our own, one
              built for a client. Open a card to read the full case study.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-[980px] gap-6 md:grid-cols-2 md:gap-7">
          {CASE_STUDIES.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.1}>
              <motion.article
                role="button"
                tabIndex={0}
                onClick={() => openCase(product.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCase(product.slug);
                  }
                }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                aria-label={`Open the ${product.name} case study`}
                className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-white text-left shadow-[0_6px_30px_-14px_rgb(26_35_50/0.12)] transition-all duration-500 hover:border-crimson/30 hover:shadow-[0_32px_80px_-28px_rgb(0_122_255/0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson/50"
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

                  {/* logo — spring entrance + hover scale */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.86, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 210, damping: 20, delay: 0.25 + i * 0.12 }}
                    className="relative z-10 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0"
                  >
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={280}
                      height={200}
                      className={`${product.logoHeightClass} object-contain drop-shadow-[0_10px_24px_rgb(26_35_50/0.12)]`}
                      priority={i === 0}
                    />
                  </motion.div>

                  {/* real product — screenshot revealed on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-[5] translate-y-[6%] scale-[1.03] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
                  >
                    <Image
                      src={product.dashboard.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 470px, 92vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-ink/60 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                      Live product
                    </span>
                  </div>
                </div>

                {/* — Body — */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-display text-[22px] font-extrabold tracking-tight text-ink">
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
                  <p className="mt-3 text-[13px] leading-[1.7] text-muted-foreground">
                    {product.summary}
                  </p>

                  {/* metrics — animated count-up on scroll into view */}
                  <div className="mt-6 grid grid-cols-3">
                    {product.cardMetrics.map((m, mi) => (
                      <div
                        key={m.label}
                        className={
                          mi === 0
                            ? 'pr-4'
                            : `border-l border-hairline px-4 ${mi === 2 ? 'pl-4' : ''}`
                        }
                      >
                        <MetricNumber value={m.value} delay={0.15 + mi * 0.12} />
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
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-hairline pt-6">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <span className="link-underline text-[13.5px] font-semibold text-ink transition-colors duration-300 group-hover:text-crimson">
                        View case study
                      </span>
                      <a
                        href={product.dashboard.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink/45 transition-colors duration-300 hover:text-crimson"
                        aria-label={`Visit the live ${product.name} site (opens in a new tab)`}
                      >
                        Live site
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] text-ink transition-all duration-300 group-hover:bg-crimson group-hover:text-white">
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
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
