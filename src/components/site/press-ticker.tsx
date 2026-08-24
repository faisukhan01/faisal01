'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { PRESS_ITEMS } from '@/lib/site-data';

/**
 * Premium scrolling press / news ticker — sits at the top of the page
 * (just below the header). Items scroll horizontally on a CSS marquee,
 * pauses on hover, and can be paused via the Pause button.
 *
 * Each item has a colored category label + clickable text.
 */
export function PressTicker() {
  const [paused, setPaused] = useState(false);

  // Duplicate items so the marquee can loop seamlessly
  const items = [...PRESS_ITEMS, ...PRESS_ITEMS];

  return (
    <div
      className="relative z-30 w-full bg-[#0f172a] text-white border-b border-white/5"
      aria-label="Latest news and announcements"
    >
      {/* Top gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1d81f2]/60 to-transparent" />

      <div className="mx-auto flex max-w-[1320px] items-stretch">
        {/* Left rail — label */}
        <div className="hidden sm:flex shrink-0 items-center gap-2 px-4 lg:px-6 py-2 border-r border-white/10 bg-gradient-to-r from-[#1d81f2]/15 to-transparent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#24a148] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#24a148]" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-white/85">
            NETSOL News
          </span>
        </div>

        {/* Marquee area */}
        <div className="relative flex-1 overflow-hidden">
          {/* Edge fade gradients */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-12 sm:w-16 z-10 bg-gradient-to-r from-[#0f172a] to-transparent pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-12 sm:w-16 z-10 bg-gradient-to-l from-[#0f172a] to-transparent pointer-events-none"
          />

          <motion.div
            className="flex items-center gap-8 py-2 whitespace-nowrap"
            style={{
              animation: 'press-marquee 40s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {items.map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.href}
                className="group inline-flex items-center gap-2.5 text-[13px] text-white/85 hover:text-white transition-colors"
              >
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: item.accent,
                    backgroundColor: `${item.accent}22`,
                  }}
                >
                  {item.label}
                </span>
                <span className="group-hover:underline underline-offset-2">
                  {item.text}
                </span>
                <ArrowUpRight className="h-3 w-3 text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right rail — pause button */}
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume news ticker' : 'Pause news ticker'}
          aria-pressed={paused}
          className="hidden sm:flex shrink-0 items-center justify-center w-10 border-l border-white/10 hover:bg-white/5 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {paused ? (
              <motion.span
                key="play"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <Play className="h-3 w-3 text-white/70" fill="currentColor" />
              </motion.span>
            ) : (
              <motion.span
                key="pause"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <Pause className="h-3 w-3 text-white/70" fill="currentColor" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Inline style block for the marquee keyframes */}
      <style>{`
        @keyframes press-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
