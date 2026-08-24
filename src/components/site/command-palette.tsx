'use client';

import { useEffect, useReducer, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Clock,
  X,
  FileText,
  Layout,
  Building2,
  Cpu,
  Sparkles,
} from 'lucide-react';
import {
  NAV_ITEMS,
  TRANSCEND_TABS,
  WHO_WE_SERVE,
  INSIGHTS,
  TESTIMONIALS,
} from '@/lib/site-data';

type SearchEntry = {
  id: string;
  title: string;
  category: string;
  href: string;
  icon: 'nav' | 'platform' | 'audience' | 'insight' | 'story' | 'ai';
};

const ENTRIES: SearchEntry[] = (() => {
  const out: SearchEntry[] = [];

  NAV_ITEMS.forEach((n) => {
    out.push({
      id: `nav-${n.label}`,
      title: n.label,
      category: 'Navigation',
      href: n.href,
      icon: 'nav',
    });
    n.children?.forEach((c) =>
      out.push({
        id: `nav-${n.label}-${c.label}`,
        title: `${c.label}`,
        category: `Navigation · ${n.label}`,
        href: c.href,
        icon: 'nav',
      })
    );
  });

  TRANSCEND_TABS.forEach((t) =>
    out.push({
      id: `tab-${t.id}`,
      title: t.title,
      category: 'Platform',
      href: `#platform`,
      icon: 'platform',
    })
  );

  WHO_WE_SERVE.forEach((w) =>
    out.push({
      id: `serve-${w.id}`,
      title: w.title,
      category: 'Who we serve',
      href: '#serve',
      icon: 'audience',
    })
  );

  INSIGHTS.forEach((p) =>
    out.push({
      id: `insight-${p.id}`,
      title: p.title,
      category: `${p.tag} · ${p.readTime}`,
      href: '#insights',
      icon: 'insight',
    })
  );

  TESTIMONIALS.forEach((t) =>
    out.push({
      id: `story-${t.id}`,
      title: `${t.person} — ${t.company}`,
      category: `Customer story`,
      href: '#insights',
      icon: 'story',
    })
  );

  return out;
})();

const ICONS: Record<SearchEntry['icon'], React.ReactNode> = {
  nav: <Layout className="h-4 w-4" />,
  platform: <Cpu className="h-4 w-4" />,
  audience: <Building2 className="h-4 w-4" />,
  insight: <FileText className="h-4 w-4" />,
  story: <Sparkles className="h-4 w-4" />,
  ai: <Sparkles className="h-4 w-4" />,
};

type State = {
  open: boolean;
  query: string;
  active: number;
  recent: string[];
};

type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'SET_QUERY'; value: string }
  | { type: 'MOVE'; dir: 1 | -1 }
  | { type: 'RESET_ACTIVE' }
  | { type: 'ADD_RECENT'; id: string };

const RECENT_KEY = 'netsol-cmdk-recent';

function loadRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string').slice(0, 4) : [];
  } catch {
    return [];
  }
}

function saveRecent(ids: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

const initial: State = {
  open: false,
  query: '',
  active: 0,
  recent: loadRecent(),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN':
      return { ...state, open: true };
    case 'CLOSE':
      return { ...state, open: false, query: '', active: 0 };
    case 'TOGGLE':
      return state.open
        ? { ...state, open: false, query: '', active: 0 }
        : { ...state, open: true };
    case 'SET_QUERY':
      return { ...state, query: action.value, active: 0 };
    case 'MOVE': {
      const next = (state.active + action.dir + 1000) % 1000; // bounded later
      return { ...state, active: next };
    }
    case 'RESET_ACTIVE':
      return { ...state, active: 0 };
    case 'ADD_RECENT': {
      const next = [action.id, ...state.recent.filter((r) => r !== action.id)].slice(0, 4);
      saveRecent(next);
      return { ...state, recent: next, open: false, query: '', active: 0 };
    }
    default:
      return state;
  }
}

/** Premium command palette (Cmd+K) with fuzzy search + recent items.
 *  Can be opened via Cmd/Ctrl+K globally OR controlled externally. */
export function CommandPalette({ open: externalOpen, onClose }: { open?: boolean; onClose?: () => void }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Sync external open state — when parent sets open=true, open the palette
  useEffect(() => {
    if (externalOpen) dispatch({ type: 'OPEN' });
  }, [externalOpen]);

  // Global key listener: Cmd/Ctrl + K to toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE' });
      } else if (e.key === 'Escape' && state.open) {
        dispatch({ type: 'CLOSE' });
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.open, onClose]);

  // Lock body scroll + focus input on open
  useEffect(() => {
    if (state.open) {
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
  }, [state.open]);

  // Close handler — informs parent too
  const handleClose = () => {
    dispatch({ type: 'CLOSE' });
    onClose?.();
  };

  // Compute results
  const results = useMemo(() => {
    const q = state.query.trim().toLowerCase();
    if (!q) {
      // Show recent items first, then a few platform defaults
      const recents = state.recent
        .map((id) => ENTRIES.find((e) => e.id === id))
        .filter(Boolean) as SearchEntry[];
      const fallback = ENTRIES.filter((e) => e.icon === 'platform').slice(0, 5);
      return { recents, list: recents.length ? recents : fallback };
    }
    const filtered = ENTRIES.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
    // Lightweight fuzzy scoring by position
    return {
      recents: [],
      list: filtered
        .map((e) => {
          const idx = e.title.toLowerCase().indexOf(q);
          return { e, score: idx === -1 ? 100 : idx };
        })
        .sort((a, b) => a.score - b.score)
        .slice(0, 8)
        .map((x) => x.e),
    };
  }, [state.query, state.recent]);

  // Clamp active index to results length
  const safeActive = Math.min(state.active, Math.max(0, results.list.length - 1));

  // Keyboard nav when open
  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dispatch({ type: 'MOVE', dir: 1 });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch({ type: 'MOVE', dir: -1 });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const chosen = results.list[safeActive];
        if (chosen) {
          dispatch({ type: 'ADD_RECENT', id: chosen.id });
          if (chosen.href.startsWith('#')) {
            const el = document.querySelector(chosen.href);
            el?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = chosen.href;
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.open, safeActive, results.list]);

  // Scroll active into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${safeActive}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [safeActive]);

  return (
    <AnimatePresence>
      {state.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
        >
          {/* Backdrop */}
          <button
            aria-label="Close search"
            onClick={handleClose}
            className="absolute inset-0 bg-[#0a0d12]/55 backdrop-blur-sm cursor-default"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[640px] rounded-2xl bg-white border border-[#e0e0e0] shadow-[0_32px_80px_-12px_rgba(15,98,254,0.35),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
          >
            {/* Top accent gradient */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1d81f2] via-[#56ccf2] to-[#0f62fe]" />

            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#f0f0f0]">
              <Search className="h-5 w-5 text-[#6b7280] shrink-0" />
              <input
                ref={inputRef}
                value={state.query}
                onChange={(e) => dispatch({ type: 'SET_QUERY', value: e.target.value })}
                placeholder="Search pages, products, insights, customers…"
                className="flex-1 bg-transparent text-[15px] text-[#161616] placeholder:text-[#9ca3af] outline-none"
              />
              <button
                onClick={handleClose}
                className="h-7 w-7 rounded-md flex items-center justify-center text-[#6b7280] hover:bg-[#f5f7fa] hover:text-[#161616] transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2">
              {results.recents.length > 0 && (
                <div className="px-4 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af] flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Recent
                </div>
              )}

              {results.list.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <div className="text-[14px] text-[#525252] font-medium">
                    No matches for &ldquo;{state.query}&rdquo;
                  </div>
                  <div className="mt-1 text-[13px] text-[#9ca3af]">
                    Try a different keyword, or press{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-[#f5f7fa] border border-[#e0e0e0] text-[11px]">
                      Esc
                    </kbd>{' '}
                    to close.
                  </div>
                </div>
              ) : (
                results.list.map((entry, idx) => {
                  const isRecent = idx < results.recents.length;
                  return (
                    <button
                      key={entry.id}
                      data-idx={idx}
                      onMouseEnter={() => dispatch({ type: 'RESET_ACTIVE' })}
                      onClick={() => {
                        dispatch({ type: 'ADD_RECENT', id: entry.id });
                        if (entry.href.startsWith('#')) {
                          document.querySelector(entry.href)?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.href = entry.href;
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        safeActive === idx
                          ? 'bg-[#1d81f2]/8'
                          : 'hover:bg-[#f5f7fa]'
                      }`}
                    >
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                          safeActive === idx
                            ? 'bg-[#1d81f2] text-white'
                            : 'bg-[#f5f7fa] text-[#525252]'
                        }`}
                      >
                        {ICONS[entry.icon]}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[14px] font-medium text-[#161616] truncate">
                          {entry.title}
                        </span>
                        <span className="block text-[12px] text-[#6b7280] truncate">
                          {entry.category}
                          {isRecent && ' · recent'}
                        </span>
                      </span>
                      {safeActive === idx && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#1d81f2] font-medium">
                          <CornerDownLeft className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#f0f0f0] px-4 py-2.5 bg-[#fafbfc] text-[12px] text-[#6b7280]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#e0e0e0] text-[10px] flex items-center">
                    <ArrowUp className="h-2.5 w-2.5" />
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#e0e0e0] text-[10px] flex items-center">
                    <ArrowDown className="h-2.5 w-2.5" />
                  </kbd>
                  <span className="ml-1">to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#e0e0e0] text-[10px]">
                    Enter
                  </kbd>
                  <span>to open</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#e0e0e0] text-[10px]">
                  Esc
                </kbd>
                <span>to close</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
