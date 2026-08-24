'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock, X } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { InsightModal } from '@/components/site/insight-modal';
import { INSIGHTS } from '@/lib/site-data';

const ALL_TAG = 'All';
const TAGS = [ALL_TAG, 'Blog', 'Guide', 'Case Study', 'Event'] as const;
type Tag = (typeof TAGS)[number];

export function Insights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<Tag>(ALL_TAG);

  // Filter posts by active tag (memoised to avoid recompute on each render)
  const filteredPosts = useMemo(() => {
    if (activeTag === ALL_TAG) return INSIGHTS;
    return INSIGHTS.filter((p) => p.tag === activeTag);
  }, [activeTag]);

  // Count per tag for the chip badges
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { All: INSIGHTS.length };
    for (const t of TAGS) {
      if (t === ALL_TAG) continue;
      counts[t] = INSIGHTS.filter((p) => p.tag === t).length;
    }
    return counts;
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  };

  return (
    <section
      id="insights"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Featured reads"
    >
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

        {/* Tag filter chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {TAGS.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={`group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#1d81f2] text-white border-[#1d81f2] shadow-soft'
                    : 'bg-white text-[#525252] border-[#e0e0e0] hover:border-[#1d81f2]/40 hover:text-[#1d81f2]'
                }`}
              >
                {tag}
                <span
                  className={`text-[10.5px] rounded-full px-1.5 py-0.5 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#f5f7fa] text-[#6b7280] group-hover:bg-[#1d81f2]/10 group-hover:text-[#1d81f2]'
                  }`}
                >
                  {tagCounts[tag]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="mt-8 flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                data-card
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveId(post.id)}
                className="group relative snap-start shrink-0 w-[280px] sm:w-[340px] rounded-2xl bg-white border border-[#e0e0e0] overflow-hidden hover:shadow-premium-lg transition-all duration-300 cursor-pointer"
              >
                {/* Animated gradient border on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(135deg, #1d81f2, transparent 35%, transparent 65%, #56ccf2)',
                    padding: '1px',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-sweep 8s ease infinite',
                  }}
                />

                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1d81f2]">
                    {post.tag}
                  </div>
                  {/* Read-time badge top right (visible on hover) */}
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#0a0d12]/55 backdrop-blur text-white px-2.5 py-1 text-[11px] translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                <div className="relative p-5">
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
                    Read article
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {/* Edge spacer card */}
          <div className="shrink-0 w-[20px]" aria-hidden />

          {/* Empty state — extremely unlikely but defensive */}
          {filteredPosts.length === 0 && (
            <div className="w-full text-center text-[14px] text-[#6b7280] py-12">
              No articles under this tag yet.
            </div>
          )}
        </div>

        {/* View-all bar */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={() => setActiveId(1)}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#161616] hover:text-[#1d81f2] transition-colors"
          >
            Browse all insights
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <InsightModal id={activeId} onClose={() => setActiveId(null)} />
    </section>
  );
}
