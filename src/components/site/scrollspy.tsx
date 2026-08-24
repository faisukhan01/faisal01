'use client';

import { useEffect, useReducer, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Section list for scrollspy nav. Each entry maps to a section id on the page.
 * Limited to the main content sections to keep the dot rail clean.
 */
export const SCROLLSPY_SECTIONS = [
  { id: 'platform', label: 'Platform' },
  { id: 'tour', label: 'Tour' },
  { id: 'solutions', label: 'Who We Serve' },
  { id: 'industries', label: 'Industries' },
  { id: 'why-netsol', label: 'Why NETSOL' },
  { id: 'case-studies', label: 'Stories' },
  { id: 'pulse', label: 'Live Pulse' },
  { id: 'about', label: 'About' },
  { id: 'comparison', label: 'Compare' },
  { id: 'awards', label: 'Awards' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'esg', label: 'Sustainability' },
  { id: 'careers', label: 'Careers' },
  { id: 'testimonials', label: 'Quotes' },
  { id: 'roi', label: 'ROI' },
  { id: 'insights', label: 'Insights' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

interface State {
  activeId: string | null;
  hoveredId: string | null;
  visible: boolean;
}

type Action =
  | { type: 'SET_ACTIVE'; id: string | null }
  | { type: 'SET_HOVERED'; id: string | null }
  | { type: 'SET_VISIBLE'; visible: boolean };

const initialState: State = {
  activeId: SCROLLSPY_SECTIONS[0].id,
  hoveredId: null,
  visible: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ACTIVE':
      if (action.id === state.activeId) return state;
      return { ...state, activeId: action.id };
    case 'SET_HOVERED':
      return { ...state, hoveredId: action.id };
    case 'SET_VISIBLE':
      if (action.visible === state.visible) return state;
      return { ...state, visible: action.visible };
    default:
      return state;
  }
}

/**
 * Floating vertical ScrollSpy navigation rail — fixed on the right side of
 * the viewport. Shows a dot per major section; the active section's dot
 * expands and the label slides in on hover.
 *
 * Hidden on screens below `lg` to avoid clutter on mobile.
 */
export function ScrollSpy() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Scrollspy: track which section is currently most in-view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible (highest intersectionRatio among intersecting)
        let best: { id: string; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const ratio = entry.intersectionRatio;
          if (!best || ratio > best.ratio) {
            best = { id: entry.target.id, ratio };
          }
        }
        if (best) {
          dispatch({ type: 'SET_ACTIVE', id: best.id });
        }
      },
      {
        // Track visibility in the middle band of the viewport
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const els = SCROLLSPY_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Reveal after a small delay (after cookie banner etc.)
  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: 'SET_VISIBLE', visible: true }), 600);
    return () => clearTimeout(t);
  }, []);

  // Smooth scroll on click
  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update focus for accessibility
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  }, []);

  return (
    <div
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      aria-label="On-page navigation"
      role="navigation"
    >
      <AnimatePresence>
        {state.visible && (
          <motion.ul
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-end gap-2.5"
          >
            {SCROLLSPY_SECTIONS.map((s) => {
              const isActive = state.activeId === s.id;
              const isHovered = state.hoveredId === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => handleClick(s.id)}
                    onMouseEnter={() => dispatch({ type: 'SET_HOVERED', id: s.id })}
                    onMouseLeave={() => dispatch({ type: 'SET_HOVERED', id: null })}
                    aria-label={`Scroll to ${s.label}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex items-center gap-2.5"
                  >
                    {/* Label — appears on hover/active */}
                    <AnimatePresence>
                      {(isHovered || isActive) && (
                        <motion.span
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.2 }}
                          className={`text-[11px] font-medium uppercase tracking-wider rounded-full px-2.5 py-1 ${
                            isActive
                              ? 'bg-[#1d81f2] text-white shadow-soft'
                              : 'bg-white/85 backdrop-blur text-[#525252] border border-[#e0e0e0]'
                          }`}
                        >
                          {s.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {/* Dot */}
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? 'h-2.5 w-2.5 bg-[#1d81f2]'
                          : 'h-1.5 w-1.5 bg-[#9ca3af]/60 group-hover:bg-[#1d81f2]/70'
                      }`}
                    >
                      {isActive && (
                        <span className="block h-full w-full rounded-full bg-[#1d81f2] animate-ping opacity-60" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
