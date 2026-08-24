'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, BookOpen, X, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { GLOSSARY } from '@/lib/site-data';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface GlossaryCategory {
  id: string;
  label: string;
}

interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  short: string;
  long: string;
  accent: string;
}

interface GlossaryData {
  title: string;
  subtitle: string;
  categories: GlossaryCategory[];
  terms: GlossaryTerm[];
}

const DATA = GLOSSARY as unknown as GlossaryData;

/* ------------------------------------------------------------------ */
/* Sub-component: GlossaryCard                                         */
/* ------------------------------------------------------------------ */

interface GlossaryCardProps {
  term: GlossaryTerm;
  categoryLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function GlossaryCard({
  term,
  categoryLabel,
  isExpanded,
  onToggle,
}: GlossaryCardProps) {
  return (
    <article
      className={cn(
        'gradient-border-card lift-on-hover relative flex h-full flex-col p-5',
        'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]',
      )}
    >
      {/* Top row — accent bar + category chip */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          aria-hidden
          className="block h-[3px] w-8 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${term.accent}, ${term.accent}55)`,
          }}
        />
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: term.accent,
            backgroundColor: `${term.accent}14`,
          }}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Term name */}
      <h3 className="text-[17px] font-bold leading-snug text-[#161616]">
        {term.term}
      </h3>

      {/* Short description */}
      <p className="clamp-2 mt-2 text-sm leading-relaxed text-[#525252]">
        {term.short}
      </p>

      {/* Read more toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`${term.id}-long`}
        className="mt-3 inline-flex items-center gap-1 self-start text-[13px] font-semibold text-[#1d81f2] transition-colors hover:text-[#0f62fe]"
      >
        {isExpanded ? 'Show less' : 'Read more'}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-300',
            isExpanded && 'rotate-180',
          )}
          strokeWidth={2.5}
        />
      </button>

      {/* Long description — animated expand */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key={`${term.id}-long-wrap`}
            id={`${term.id}-long`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 border-t border-[#e0e0e0]/60 pt-3 text-sm leading-relaxed text-[#525252]">
              {term.long}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer pushes the bottom row down so cards in a row align */}
      <div className="flex-1" />

      {/* Bottom row — View source (decorative) */}
      <div className="mt-4 flex items-center justify-between border-t border-[#e0e0e0]/60 pt-3">
        <span className="text-[11px] uppercase tracking-wider text-[#6b7280]">
          Reference
        </span>
        <span className="inline-flex cursor-pointer items-center gap-1 text-[12px] font-medium text-[#6b7280] transition-colors hover:text-[#1d81f2]">
          View source
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

/**
 * Knowledge Hub — a premium, searchable, category-filterable glossary of
 * asset finance terms. Real-time search, animated chip selection, smooth
 * expand/collapse per card, and a graceful empty state.
 */
export function Glossary() {
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* Category id → label map */
  const categoryLabelMap = useMemo<Record<string, string>>(() => {
    const m: Record<string, string> = {};
    for (const c of DATA.categories) m[c.id] = c.label;
    return m;
  }, []);

  /* Filtered terms — by active category AND by query (case-insensitive) */
  const filteredTerms = useMemo<GlossaryTerm[]>(() => {
    const q = query.trim().toLowerCase();
    return DATA.terms.filter((t) => {
      const matchesCategory = category === 'all' || t.category === category;
      if (!q) return matchesCategory;
      const matchesQuery =
        t.term.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.long.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  /* Per-chip counts — respects the search query but NOT the active category,
   * so users see how the query distributes across categories. */
  const chipCounts = useMemo<Record<string, number>>(() => {
    const q = query.trim().toLowerCase();
    const counts: Record<string, number> = {};
    for (const cat of DATA.categories) {
      counts[cat.id] = DATA.terms.filter((t) => {
        const matchesCategory = cat.id === 'all' || t.category === cat.id;
        const matchesQuery =
          !q ||
          t.term.toLowerCase().includes(q) ||
          t.short.toLowerCase().includes(q) ||
          t.long.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      }).length;
    }
    return counts;
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const isEmpty = filteredTerms.length === 0;

  const handleClearFilters = () => {
    setQuery('');
    setCategory('all');
    setExpandedId(null);
  };

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="glossary"
      className="section-pad relative w-full overflow-hidden bg-[#f5f7fa]"
      aria-label="Asset finance glossary"
    >
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[10%] h-[300px] w-[300px] rounded-full bg-[#1d81f2]/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-[8%] h-[280px] w-[280px] rounded-full bg-[#56ccf2]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* ---------------------------------------------------------- */}
        {/* Header                                                      */}
        {/* ---------------------------------------------------------- */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="section-heading-chip">
            <BookOpen className="h-3 w-3" />
            Knowledge Hub
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#161616] lg:text-5xl">
            {DATA.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#525252] lg:text-lg">
            {DATA.subtitle}
          </p>
          <div className="section-rule mx-auto mt-6" aria-hidden />
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* Controls — search + chips                                   */}
        {/* ---------------------------------------------------------- */}
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-4xl">
          {/* Search input */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]"
              strokeWidth={2}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search glossary terms"
              placeholder="Search 15+ asset finance terms…"
              className={cn(
                'w-full rounded-full border border-[#e0e0e0] bg-white py-3.5 pl-14 pr-12 text-[15px] text-[#161616] shadow-[0_2px_8px_-4px_rgba(15,23,42,0.06)] transition-all duration-300 placeholder:text-[#9ca3af]',
                'focus:border-[#1d81f2] focus:outline-none focus:ring-4 focus:ring-[#1d81f2]/10',
              )}
            />
            {hasQuery && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#f5f7fa] text-[#6b7280] transition-colors hover:bg-[#e0e0e0] hover:text-[#161616]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {DATA.categories.map((cat) => {
              const isActive = category === cat.id;
              const count = chipCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300',
                    isActive
                      ? 'chip-selected text-white'
                      : 'border border-[#e0e0e0] bg-white text-[#525252] hover:border-[#1d81f2] hover:text-[#1d81f2]',
                  )}
                >
                  {cat.label}
                  <span
                    className={cn(
                      'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums',
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
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* Results grid (or empty state)                              */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            {isEmpty ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-[#e0e0e0] bg-white/70 px-6 py-12 text-center"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1d81f2]/10 text-[#1d81f2]">
                  <Search className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#161616]">
                  No matching terms
                </h3>
                <p className="mt-2 text-sm text-[#525252]">
                  Try a different search or clear filters to see all{' '}
                  {DATA.terms.length} terms in the glossary.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1d81f2] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(15,98,254,0.55)] transition-all duration-300 hover:bg-[#0f62fe]"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredTerms.map((term, i) => (
                  <Reveal
                    key={term.id}
                    delay={Math.min(i, 8) * 0.05}
                    className="h-full"
                  >
                    <GlossaryCard
                      term={term}
                      categoryLabel={
                        categoryLabelMap[term.category] ?? term.category
                      }
                      isExpanded={expandedId === term.id}
                      onToggle={() => handleToggle(term.id)}
                    />
                  </Reveal>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Footer CTA                                                  */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <a
            href="#insights"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#525252] underline-offset-4 transition-colors hover:text-[#1d81f2] hover:underline"
          >
            Looking for more? Read our insights
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
          <CTAButton href="#contact">Get the full glossary</CTAButton>
        </div>
      </div>
    </section>
  );
}

export default Glossary;
