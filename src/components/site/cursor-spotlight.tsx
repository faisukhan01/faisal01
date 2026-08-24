'use client';

import { useEffect, useRef, useReducer, type CSSProperties, type ReactNode } from 'react';

interface State {
  x: number;
  y: number;
  active: boolean;
}

type Action =
  | { type: 'MOVE'; x: number; y: number; active: boolean }
  | { type: 'SET_ACTIVE'; active: boolean };

const initialState: State = { x: 0, y: 0, active: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MOVE':
      // Avoid re-render if position barely moved (perf)
      if (
        Math.abs(action.x - state.x) < 1 &&
        Math.abs(action.y - state.y) < 1 &&
        action.active === state.active
      ) {
        return state;
      }
      return { x: action.x, y: action.y, active: action.active };
    case 'SET_ACTIVE':
      if (action.active === state.active) return state;
      return { ...state, active: action.active };
    default:
      return state;
  }
}

interface CursorSpotlightProps {
  /** Color of the spotlight — default brand blue */
  color?: string;
  /** Size of the spotlight in px — default 480 */
  size?: number;
  /** Opacity (0-1) — default 0.18 */
  intensity?: number;
  /** Optional className on the wrapper */
  className?: string;
  /** Children to render inside the spotlighted region */
  children?: ReactNode;
}

/**
 * CursorSpotlight — wraps content and renders a soft radial spotlight
 * that follows the cursor across the wrapper. Used on dark surfaces
 * for a premium "interactive glow" effect.
 *
 * Uses a ref to the wrapper + rAF-throttled mousemove + useReducer
 * (avoids setState-in-effect lint error).
 */
export function CursorSpotlight({
  color = '#1d81f2',
  size = 480,
  intensity = 0.18,
  className,
  children,
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pending = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (pending) {
            dispatch({ type: 'MOVE', x: pending.x, y: pending.y, active: true });
          }
        });
      }
    };
    const onEnter = () => dispatch({ type: 'SET_ACTIVE', active: true });
    const onLeave = () => dispatch({ type: 'SET_ACTIVE', active: false });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const style: CSSProperties = {
    left: `${state.x - size / 2}px`,
    top: `${state.y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    background: `radial-gradient(circle, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
    opacity: state.active ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  };

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute" style={style} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
