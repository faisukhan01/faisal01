'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  TrendingUp,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Clock,
  Quote,
} from 'lucide-react';
import { SOLUTION_CASES } from '@/lib/site-data';
import { CTAButton } from '@/components/site/cta-button';

interface CaseStudyModalProps {
  /** case id, or null when closed */
  id: string | null;
  onClose: () => void;
}

/**
 * Premium case-study reader modal — opens when a Solutions card is clicked.
 * Renders the full Challenge / Solution / Results narrative plus metrics
 * and a customer quote. Mirrors the InsightModal premium aesthetic.
 */
export function CaseStudyModal({ id, onClose }: CaseStudyModalProps) {
  const story = SOLUTION_CASES.find((s) => s.id === id) ?? null;

  // Lock body scroll + escape-to-close
  useEffect(() => {
    if (!story) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [story, onClose]);

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[180] flex items-start justify-center px-4 py-[4vh] lg:py-[8vh]"
        >
          {/* Backdrop */}
          <button
            aria-label="Close case study"
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0d12]/65 backdrop-blur-md cursor-default"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[860px] rounded-2xl bg-white border border-[#e0e0e0] shadow-[0_32px_80px_-12px_rgba(15,98,254,0.35),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={story.headline}
          >
            {/* Top accent — colored per story */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${story.accent}, #56ccf2, #0f62fe)`,
              }}
            />

            {/* Hero header */}
            <div className="relative px-6 sm:px-10 pt-7 sm:pt-9 pb-6 shrink-0 border-b border-[#f0f0f0]">
              {/* Top meta row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Company logo placeholder */}
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white font-semibold text-[14px] tracking-tight shadow-soft"
                    style={{ backgroundColor: story.accent }}
                  >
                    {story.logo}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                      {story.industry}
                    </span>
                    <span className="text-[14px] font-semibold text-[#161616] leading-tight">
                      {story.company}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="h-9 w-9 rounded-full bg-[#f5f7fa] text-[#525252] flex items-center justify-center hover:bg-[#1d81f2]/10 hover:text-[#1d81f2] transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Headline */}
              <h2 className="mt-5 text-[24px] sm:text-[30px] font-semibold tracking-tight text-[#161616] leading-tight">
                {story.headline}
              </h2>

              {/* Meta badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1d81f2]/8 px-3 py-1 text-[12px] font-medium text-[#1d81f2]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {story.year}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#24a148]/10 px-3 py-1 text-[12px] font-medium text-[#1f8a3c]">
                  <Clock className="h-3.5 w-3.5" />
                  {story.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f7fa] px-3 py-1 text-[12px] font-medium text-[#525252] border border-[#e0e0e0]">
                  <Building2 className="h-3.5 w-3.5" />
                  Case study
                </span>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 sm:px-10 py-7 sm:py-9">
              {/* Metrics row — sticky premium callouts */}
              <div className="grid grid-cols-3 gap-3">
                {story.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#e0e0e0] bg-gradient-to-b from-white to-[#f5f7fa] p-4 text-center"
                  >
                    <div
                      className="text-[22px] sm:text-[26px] font-semibold tracking-tight leading-none"
                      style={{ color: story.accent }}
                    >
                      {m.value}
                    </div>
                    <div className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6b7280] leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#e5484d]/10 text-[#e5484d] text-[11px] font-bold">
                    !
                  </span>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                    The challenge
                  </h3>
                </div>
                <p className="text-[15px] text-[#161616] leading-[1.7]">{story.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white text-[11px] font-bold"
                    style={{ backgroundColor: story.accent }}
                  >
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                    The solution
                  </h3>
                </div>
                <p className="text-[15px] text-[#161616] leading-[1.7]">{story.solution}</p>
              </div>

              {/* Results */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#24a148]/10 text-[#24a148] text-[11px] font-bold">
                    ✓
                  </span>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                    The results
                  </h3>
                </div>
                <p className="text-[15px] text-[#161616] leading-[1.7]">{story.results}</p>
              </div>

              {/* Pull quote */}
              <blockquote className="mt-8 relative rounded-2xl bg-gradient-to-br from-[#f0f8ff] to-[#f5f7fa] border border-[#1d81f2]/15 p-6 sm:p-7">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-[#1d81f2]/20" />
                <p className="text-[18px] sm:text-[20px] font-medium text-[#161616] leading-snug italic pr-10">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="mt-3 text-[13px] text-[#6b7280]">
                  — {story.quoteBy}, {story.company}
                </div>
              </blockquote>

              {/* Footer CTA */}
              <div className="mt-8 pt-6 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">
                    NETSOL customer story
                  </div>
                  <div className="mt-1 text-[13px] text-[#6b7280]">
                    Reference verified · {story.year}
                  </div>
                </div>
                <CTAButton href="#contact" className="text-[14px] px-5 py-2.5 shrink-0">
                  Talk to a specialist
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
