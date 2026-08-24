'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { INSIGHTS } from '@/lib/site-data';

export function Insights() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden" aria-label="Featured reads">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#1d81f2]" />
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                Featured Reads
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
              Featured reads &amp; insights
            </h2>
            <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6]">
              Case studies, guides, and field notes from the people building
              the future of asset finance — across captives, lenders, and
              marketplaces.
            </p>
          </Reveal>

          {/* Nav buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="h-11 w-11 rounded-full border border-[#e0e0e0] bg-white flex items-center justify-center text-[#161616] hover:bg-[#1d81f2] hover:text-white hover:border-[#1d81f2] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="h-11 w-11 rounded-full border border-[#e0e0e0] bg-white flex items-center justify-center text-[#161616] hover:bg-[#1d81f2] hover:text-white hover:border-[#1d81f2] transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="mt-10 flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {INSIGHTS.map((post, i) => (
            <motion.article
              key={post.id}
              data-card
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              className="group snap-start shrink-0 w-[280px] sm:w-[340px] rounded-2xl bg-white border border-[#e0e0e0] overflow-hidden hover:shadow-premium-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1d81f2]">
                  {post.tag}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-[12px] text-[#6b7280]">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-[#6b7280]/40" />
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mt-3 text-[17px] lg:text-[18px] font-semibold leading-snug text-[#161616] clamp-2 group-hover:text-[#1d81f2] transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-[13px] lg:text-[14px] text-[#525252] leading-[1.6] clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1d81f2]">
                  Read more
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}

          {/* Edge spacer card */}
          <div className="shrink-0 w-[20px]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
