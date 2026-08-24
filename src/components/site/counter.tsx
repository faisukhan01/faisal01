'use client';

import { useEffect, useReducer, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

type State = { value: number; started: boolean; finished: boolean };
type Action =
  | { type: 'START' }
  | { type: 'TICK'; value: number }
  | { type: 'FINISH' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      if (state.started) return state;
      return { ...state, started: true };
    case 'TICK':
      return { ...state, value: action.value };
    case 'FINISH':
      return { value: state.end, started: true, finished: true };
    default:
      return state;
  }
}

/**
 * Animated counter that runs when in view.
 * SSR-safe: initial render shows the end value (good for SEO + no layout shift),
 * then animates from 0 -> end when scrolled into view on the client.
 */
export function Counter({ end, duration = 2000, prefix = '', suffix = '' }: CounterProps) {
  const [state, dispatch] = useReducer(reducer, {
    value: end,
    started: false,
    finished: false,
  });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion preference, snap to end.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      dispatch({ type: 'FINISH' });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.started) {
            dispatch({ type: 'START' });
            // Reset to 0 so the animation is visible
            dispatch({ type: 'TICK', value: 0 });
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              dispatch({ type: 'TICK', value: Math.round(eased * end) });
              if (progress < 1) requestAnimationFrame(tick);
              else dispatch({ type: 'FINISH' });
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, state.started]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${prefix}${end}${suffix}`}>
      {prefix}
      {state.value}
      {suffix}
    </span>
  );
}
