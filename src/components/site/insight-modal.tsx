'use client';

import { useEffect, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ArrowUpRight, Calendar, Tag } from 'lucide-react';
import { INSIGHTS, INSIGHT_BODIES } from '@/lib/site-data';
import { CTAButton } from '@/components/site/cta-button';

interface InsightModalProps {
  /** insight id, or null when closed */
  id: number | null;
  onClose: () => void;
}

/**
 * Premium article reader modal — opens when an insights card is clicked.
 * Renders rich body content from INSIGHT_BODIES plus pull quotes + bullets.
 */
export function InsightModal({ id, onClose }: InsightModalProps) {
  const post = INSIGHTS.find((p) => p.id === id) ?? null;
  const body = id ? INSIGHT_BODIES[id] : null;

  // Lock body scroll + escape-to-close
  useEffect(() => {
    if (!post) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && body && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[180] flex items-start justify-center px-4 py-[4vh] lg:py-[8vh]"
        >
          {/* Backdrop */}
          <button
            aria-label="Close article"
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0d12]/65 backdrop-blur-md cursor-default"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[760px] rounded-2xl bg-white border border-[#e0e0e0] shadow-[0_32px_80px_-12px_rgba(15,98,254,0.35),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={post.title}
          >
            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1d81f2] via-[#56ccf2] to-[#0f62fe]" />

            {/* Hero image */}
            <div className="relative h-[220px] sm:h-[260px] shrink-0 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12]/85 via-[#0a0d12]/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1d81f2]">
                  <Tag className="h-3 w-3" />
                  {post.tag}
                </div>
                <div className="flex items-center gap-3 text-[12px] text-white/90">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#161616] hover:bg-white hover:scale-105 transition-all shadow-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 sm:px-10 py-8 sm:py-10">
              <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-[#161616] leading-tight">
                {post.title}
              </h2>
              <p className="mt-3 text-[15px] text-[#525252] leading-[1.65]">
                {post.excerpt}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-[#1d81f2]/40 to-transparent" />

              {body.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-6 text-[15px] text-[#161616] leading-[1.75]"
                >
                  {p}
                </p>
              ))}

              {/* Pull quote */}
              {body.pullQuote && (
                <blockquote className="mt-8 relative pl-6 sm:pl-8 py-2 border-l-[3px] border-[#1d81f2]">
                  <span
                    aria-hidden
                    className="absolute -top-2 -left-1 text-[40px] leading-none text-[#1d81f2]/25 font-serif"
                  >
                    &ldquo;
                  </span>
                  <p className="text-[18px] sm:text-[20px] font-medium text-[#161616] leading-snug italic">
                    {body.pullQuote}
                  </p>
                </blockquote>
              )}

              {/* Bullets */}
              {body.bullets && body.bullets.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {body.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-[#161616] leading-[1.65]"
                    >
                      <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1d81f2]/10 text-[#1d81f2] text-[11px] font-bold">
                        {i + 1}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Article footer */}
              <div className="mt-10 pt-6 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">
                    Published by NETSOL Insights
                  </div>
                  <div className="mt-1 text-[13px] text-[#6b7280]">
                    Editorial team · {post.date}
                  </div>
                </div>
                <CTAButton href="#contact" className="text-[14px] px-5 py-2.5">
                  Talk to the team
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
