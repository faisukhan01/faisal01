'use client';

import { useEffect, useMemo, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { STOCK_TICKER } from '@/lib/site-data';

interface State {
  price: number;
  change: number;
  visible: boolean;
}

type Action =
  | { type: 'TICK'; newPrice: number }
  | { type: 'TOGGLE_VISIBLE'; value: boolean };

const initialState: State = {
  price: STOCK_TICKER.price,
  change: STOCK_TICKER.change,
  visible: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TICK': {
      const prev = state.price;
      const next = action.newPrice;
      const changeFromBase = next - STOCK_TICKER.price + STOCK_TICKER.change;
      return { ...state, price: next, change: changeFromBase };
    }
    case 'TOGGLE_VISIBLE':
      if (action.value === state.visible) return state;
      return { ...state, visible: action.value };
    default:
      return state;
  }
}

/**
 * Premium floating NASDAQ:NTWK stock ticker widget — appears at bottom-left
 * after the user has scrolled past 60% of the viewport height. Simulates
 * live price ticks (jitter ±0.5%) on top of the seed price. Sparkline is
 * rendered as an SVG path from the seed data points.
 *
 * Hidden on mobile (lg:flex only). Can be dismissed via X button.
 */
export function StockTicker() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Reveal after scrolling past 60% of viewport height
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const revealAt = window.innerHeight * 0.6;
      dispatch({ type: 'TOGGLE_VISIBLE', value: scrolled > revealAt });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simulate live price ticks (every 4s) with small jitter
  useEffect(() => {
    if (!state.visible) return;
    const id = setInterval(() => {
      const jitter = (Math.random() - 0.5) * 0.012; // ±0.6 cents
      const next = Math.max(0.01, state.price + jitter);
      dispatch({ type: 'TICK', newPrice: parseFloat(next.toFixed(3)) });
    }, 4000);
    return () => clearInterval(id);
  }, [state.visible, state.price]);

  const isUp = state.change >= 0;
  const sparklinePath = useMemo(() => buildSparklinePath(STOCK_TICKER.sparkline, 110, 32), []);
  const sparklineAreaPath = `${sparklinePath} L 110 32 L 0 32 Z`;

  return (
    <AnimatePresence>
      {state.visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex fixed bottom-6 left-6 z-40 items-center gap-3 rounded-2xl bg-[#0f172a]/95 backdrop-blur-md border border-white/10 shadow-premium-lg p-3 pr-4 text-white"
          aria-label="NASDAQ:NTWK live stock ticker"
        >
          {/* Top accent gradient */}
          <span
            aria-hidden
            className="absolute -top-px left-4 right-4 h-px"
            style={{
              background: isUp
                ? 'linear-gradient(90deg, transparent, #24a148, transparent)'
                : 'linear-gradient(90deg, transparent, #e5484d, transparent)',
            }}
          />
          {/* Close */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_VISIBLE', value: false })}
            aria-label="Dismiss stock ticker"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white text-[#0f172a] flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Logo + symbol */}
          <div className="flex flex-col items-start gap-0.5 pl-1.5">
            <div className="text-[9px] font-mono uppercase tracking-widest text-white/50">
              Live · 15min delayed
            </div>
            <div className="text-[13px] font-bold tracking-tight leading-none">
              {STOCK_TICKER.symbol}
            </div>
          </div>

          {/* Price + change */}
          <div className="flex flex-col items-end">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={state.price.toFixed(3)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className={`text-[15px] font-semibold leading-none tabular-nums ${
                  isUp ? 'text-[#56ccf2]' : 'text-[#ff6b6b]'
                }`}
              >
                ${state.price.toFixed(2)}
              </motion.div>
            </AnimatePresence>
            <div
              className={`mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums ${
                isUp ? 'text-[#24a148]' : 'text-[#e5484d]'
              }`}
            >
              {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {isUp ? '+' : ''}
              {state.change.toFixed(2)} ({isUp ? '+' : ''}
              {(state.change / STOCK_TICKER.price * 100).toFixed(2)}%)
            </div>
          </div>

          {/* Sparkline */}
          <svg
            width="110"
            height="32"
            viewBox="0 0 110 32"
            className="text-[#56ccf2]"
            aria-hidden
          >
            <defs>
              <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#56ccf2" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#56ccf2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={sparklineAreaPath} fill="url(#spark-fill)" />
            <path
              d={sparklinePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Last point dot */}
            <circle
              cx={110}
              cy={32 - (STOCK_TICKER.sparkline[STOCK_TICKER.sparkline.length - 1] / 100) * 32}
              r="2.5"
              fill={isUp ? '#24a148' : '#e5484d'}
            >
              <animate
                attributeName="opacity"
                values="1;0.4;1"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Build an SVG path from sparkline data points (relative scale 0-100)
function buildSparklinePath(points: number[], width: number, height: number): string {
  if (points.length === 0) return '';
  const stepX = width / (points.length - 1);
  const maxY = Math.max(...points);
  const minY = Math.min(...points);
  const range = maxY - minY || 1;
  return points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - ((p - minY) / range) * height * 0.85 - height * 0.075;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}
