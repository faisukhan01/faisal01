'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  Newspaper,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { PRESS_CENTER } from '@/lib/site-data';
import { cn } from '@/lib/utils';

/**
 * Press & media center — premium archive section.
 *
 * Layout:
 *  - Centered header (section-heading-chip + h2 + subtitle + section-rule)
 *  - Filter row of category chips (each chip shows a count badge + accent dot)
 *  - 2-column featured grid (where any filtered release has featured:true)
 *  - 3-column archive grid for the remaining releases
 *  - Empty state with "Clear filter" CTA when no release matches
 *  - Decorative "Load more" button + press contact strip
 *
 * Interactions:
 *  - activeCategory state drives derived filtered list (split featured/archive)
 *  - AnimatePresence on filter change re-fades the whole content area
 *  - Each archive card is wrapped in Reveal with index-based stagger
 *  - Cards tilt/lift on hover via .archive-card + .lift-on-hover utilities
 */

// Derive the union of category ids from the source-of-truth data — no duplicate literals.
type CategoryId = (typeof PRESS_CENTER.categories)[number]['id'];
type PressRelease = (typeof PRESS_CENTER.releases)[number];

/**
 * Static per-category accent colour — used by category dots and chip accents
 * so the colour stays consistent for a given category across all releases
 * (and so the chip dot colour is independent of any one release's accent).
 */
const CATEGORY_ACCENT: Record<string, string> = {
  all: '#1d81f2',
  product: '#1d81f2',
  customer: '#24a148',
  investor: '#2d9cdb',
  award: '#0f62fe',
  esg: '#56ccf2',
};

function accentFor(category: string): string {
  return CATEGORY_ACCENT[category] ?? '#1d81f2';
}

export function PressCenter() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  // Pre-compute count-per-category once — used by the chip count badges.
  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {
      all: PRESS_CENTER.releases.length,
    };
    for (const release of PRESS_CENTER.releases) {
      const next = (counts[release.category] ?? 0) + 1;
      counts[release.category] = next;
    }
    return counts;
  }, []);

  // Filtered list based on the active category chip ('all' returns every release).
  const filtered = useMemo<readonly PressRelease[]>(() => {
    if (activeCategory === 'all') return PRESS_CENTER.releases;
    return PRESS_CENTER.releases.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  // Split into featured (top, large cards) + archive (lower grid).
  const featured = useMemo(
    () => filtered.filter((r) => r.featured),
    [filtered],
  );
  const archive = useMemo(
    () => filtered.filter((r) => !r.featured),
    [filtered],
  );

  const isEmpty = filtered.length === 0;

  return (
    <section
      id="press"
      className="section-pad relative w-full bg-white"
      aria-label="Press & media center"
    >
      {/* Soft premium spotlight backdrop */}
      <div
        aria-hidden
        className="spotlight-gradient pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* ─── Header block ─── */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-heading-chip">
            <span
              className="category-dot"
              style={{ color: '#1d81f2' }}
              aria-hidden
            />
            PRESS &amp; MEDIA
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-[#161616] lg:text-5xl">
            {PRESS_CENTER.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#525252] lg:text-lg">
            {PRESS_CENTER.subtitle}
          </p>
          <div className="section-rule mx-auto mt-6" aria-hidden />
        </Reveal>

        {/* ─── Filter row ─── */}
        <div className="mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2">
          {PRESS_CENTER.categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = countsByCategory[cat.id] ?? 0;
            const dotColor = accentFor(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={isActive}
                aria-label={`Filter press releases by ${cat.label}`}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'chip-selected border-transparent text-white'
                    : 'lift-on-hover border-[#e0e0e0] bg-white text-[#525252] hover:border-[#1d81f2] hover:text-[#1d81f2]',
                )}
              >
                <span
                  className="category-dot"
                  style={{ color: dotColor }}
                  aria-hidden
                />
                {cat.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#f5f7fa] text-[#6b7280]',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── AnimatePresence wrapper on filter change ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {isEmpty ? (
              <EmptyState onClear={() => setActiveCategory('all')} />
            ) : (
              <>
                {/* ─── Featured stories row ─── */}
                {featured.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {featured.map((release) => (
                      <FeaturedCard key={release.id} release={release} />
                    ))}
                  </div>
                )}

                {/* ─── Archive grid ─── */}
                {archive.length > 0 && (
                  <div className="mt-8">
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#6b7280]">
                      <Newspaper className="h-4 w-4" aria-hidden />
                      More from the newsroom
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {archive.map((release, i) => (
                        <Reveal
                          key={release.id}
                          delay={Math.min(i * 0.05, 0.4)}
                        >
                          <ArchiveCard release={release} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ─── Footer: decorative Load more + press contact strip ─── */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <button
            type="button"
            aria-label="Load more press releases (decorative)"
            className="load-more-shine btn-shine lift-on-hover rounded-full border border-[#1d81f2] bg-white px-6 py-2.5 font-medium text-[#1d81f2] transition-all hover:bg-[#1d81f2]/5"
          >
            Load more
          </button>

          <div className="flex items-center gap-2 rounded-full border border-[#e0e0e0] bg-[#f5f7fa] px-4 py-2 text-xs text-[#525252]">
            <Tag className="h-3.5 w-3.5 text-[#1d81f2]" aria-hidden />
            <span>
              Press contact:{' '}
              <span className="font-medium text-[#161616]">
                media@netsol.com
              </span>
              <span className="mx-2 text-[#6b7280]">·</span>
              <span className="font-medium text-[#161616]">
                +1 818 222 0200
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  onClear: () => void;
}

function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e0e0e0] bg-[#f5f7fa]/60 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0e0e0] bg-white shadow-depth">
        <Search className="h-6 w-6 text-[#6b7280]" aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#161616]">
        No press releases match this filter
      </h3>
      <p className="mt-2 text-sm text-[#6b7280]">
        Try a different category — there&rsquo;s plenty more from the newsroom.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="lift-on-hover mt-5 inline-flex items-center gap-2 rounded-full bg-[#1d81f2] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f62fe]"
      >
        Clear filter
      </button>
    </div>
  );
}

interface FeaturedCardProps {
  release: PressRelease;
}

function FeaturedCard({ release }: FeaturedCardProps) {
  const accent = release.accent || accentFor(release.category);
  return (
    <article className="press-featured archive-card lift-on-hover-strong shadow-depth-lg rounded-2xl border border-[#e0e0e0] bg-white p-6 lg:p-8">
      {/* Top row: category tag + Featured badge */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="press-category-tag"
          style={{ color: accent }}
        >
          <span
            className="category-dot"
            style={{ color: accent }}
            aria-hidden
          />
          {release.categoryLabel}
        </span>
        <span className="evidence-badge">
          <Sparkles className="h-3 w-3" aria-hidden />
          Featured
        </span>
      </div>

      {/* Title — 3-line clamp */}
      <h3 className="clamp-3 mt-5 text-xl font-bold leading-tight text-[#161616] lg:text-2xl">
        {release.title}
      </h3>

      {/* Excerpt — 3-line clamp */}
      <p className="clamp-3 mt-3 text-sm leading-relaxed text-[#525252]">
        {release.excerpt}
      </p>

      {/* Bottom row: date (mono uppercase) + Read press release link */}
      <div className="mt-6 flex items-center justify-between border-t border-[#f0f0f0] pt-4">
        <span className="font-mono-numeric text-xs uppercase tracking-wider text-[#6b7280]">
          <Calendar
            className="-mt-0.5 mr-1.5 inline h-3 w-3"
            aria-hidden
          />
          {release.displayDate}
        </span>
        <a
          href="#press"
          className="nav-link-underline inline-flex items-center gap-1 text-sm font-medium"
          style={{ color: accent }}
        >
          Read press release
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}

interface ArchiveCardProps {
  release: PressRelease;
}

function ArchiveCard({ release }: ArchiveCardProps) {
  const accent = release.accent || accentFor(release.category);
  return (
    <article className="archive-card lift-on-hover shadow-depth relative overflow-hidden rounded-2xl border border-[#e0e0e0] bg-white p-5">
      {/* Top accent bar — 3px gradient using release accent colour */}
      <div
        className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, ${accent}cc 55%, transparent 100%)`,
        }}
        aria-hidden
      />

      {/* Top row: category tag + date */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="press-category-tag"
          style={{ color: accent }}
        >
          <span
            className="category-dot"
            style={{ color: accent }}
            aria-hidden
          />
          {release.categoryLabel}
        </span>
        <span className="font-mono-numeric text-xs uppercase text-[#6b7280]">
          {release.displayDate}
        </span>
      </div>

      {/* Title — 3-line clamp */}
      <h3 className="clamp-3 mt-3 text-base font-semibold leading-tight text-[#161616]">
        {release.title}
      </h3>

      {/* Excerpt — 2-line clamp */}
      <p className="clamp-2 mt-2 text-sm leading-relaxed text-[#525252]">
        {release.excerpt}
      </p>

      {/* Bottom row: Read more link */}
      <div className="mt-4 border-t border-[#f5f5f5] pt-3">
        <a
          href="#press"
          className="nav-link-underline inline-flex items-center gap-1 text-sm font-medium"
          style={{ color: accent }}
        >
          Read more
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </article>
  );
}

export default PressCenter;
