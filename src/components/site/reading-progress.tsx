'use client';

import { useEffect, useReducer } from 'react';
import { motion } from 'framer-motion';

type State = { progress: number; visible: boolean };
type Action = { type: 'UPDATE'; progress: number } | { type: 'HIDE' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE':
      return { progress: action.progress, visible: action.progress > 0.01 };
    case 'HIDE':
      return { ...state, visible: false };
    default:
      return state;
  }
}

/** Slim gradient progress bar pinned to the very top of the viewport,
 *  showing reading progress through the page. Premium SaaS pattern. */
export function ReadingProgress() {
  const [state, dispatch] = useReducer(reducer, { progress: 0, visible: false });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
        dispatch({ type: 'UPDATE', progress: p });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: state.visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-[#1d81f2] via-[#56ccf2] to-[#0f62fe] transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(29,129,242,0.6)]"
        style={{ width: `${state.progress * 100}%` }}
      />
    </motion.div>
  );
}
