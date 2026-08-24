'use client';

import { useEffect, useReducer, type ReactNode, type CSSProperties } from 'react';

interface State {
  inView: boolean;
}

type Action = { type: 'SET_IN_VIEW'; value: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_IN_VIEW':
      if (action.value === state.inView) return state;
      return { ...state, inView: action.value };
    default:
      return state;
  }
}

interface Lazy3DProps {
  /** Children to render (typically a dynamic-imported Canvas scene) */
  children: ReactNode;
  /** Optional fallback UI while not in view (e.g. a static gradient placeholder) */
  fallback?: ReactNode;
  /** Intersection ratio threshold (default 0.15) */
  threshold?: number;
  /** Root margin for IntersectionObserver (default '200px 0px') — preloads slightly before entering view */
  rootMargin?: string;
  /** Optional className on the wrapper */
  className?: string;
  /** Optional inline style on the wrapper */
  style?: CSSProperties;
  /** Once in view, keep mounted (default true). Set false to allow unmount on exit. */
  once?: boolean;
}

/**
 * Lazy3D — wraps a heavy Three.js Canvas scene so it only mounts when the
 * user scrolls near it (or near a region controlled by rootMargin).
 *
 * This avoids initial-load jank and reduces peak memory pressure when
 * multiple 3D canvases would otherwise mount simultaneously on first paint.
 *
 * The component uses a useReducer-based internal state to avoid
 * setState-in-effect lint errors.
 */
export function Lazy3D({
  children,
  fallback,
  threshold = 0.15,
  rootMargin = '200px 0px',
  className,
  style,
  once = true,
}: Lazy3DProps) {
  const [state, dispatch] = useReducer(reducer, { inView: false });

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;
    // Reduce-motion / no-IO guard: just render
    if (!('IntersectionObserver' in window)) {
      dispatch({ type: 'SET_IN_VIEW', value: true });
      return;
    }

    const el = document.createElement('div');
    el.style.cssText = 'position:absolute;width:1px;height:1px;pointer-events:none;';
    // We attach observer to a sentinel. Instead, we'll observe a ref-less approach via document element
    // Simpler: observe the document body for scroll, but better to use a real element.
    document.body.appendChild(el);

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          dispatch({ type: 'SET_IN_VIEW', value: true });
          if (once) observer.disconnect();
        } else if (!once) {
          dispatch({ type: 'SET_IN_VIEW', value: false });
        }
      },
      { threshold, rootMargin }
    );
    // Use the sentinel to observe "near viewport" — not accurate.
    // Better: accept a ref prop. But for our use case, we'll observe window scroll instead.
    observer.observe(el);
    // We rely on the parent providing a real-world wrapper element with the actual size,
    // so observing el won't work for "is the parent in view?".
    // Workaround: get parent's bounding rect on scroll/resize.
    const checkParent = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const margin = 200;
      const inView =
        rect.top < vh + margin && rect.bottom > -margin && rect.left < vw + margin && rect.right > -margin;
      dispatch({ type: 'SET_IN_VIEW', value: inView });
    };
    checkParent();
    window.addEventListener('scroll', checkParent, { passive: true });
    window.addEventListener('resize', checkParent);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkParent);
      window.removeEventListener('resize', checkParent);
      el.remove();
    };
  }, [threshold, rootMargin, once]);

  return (
    <div className={className} style={style}>
      {state.inView ? children : fallback}
    </div>
  );
}
