'use client';

import { useEffect, useReducer } from 'react';
import { TYPEWRITER_WORDS } from '@/lib/site-data';

type State = { wordIndex: number; text: string; phase: 'typing' | 'holding' | 'deleting' | 'pause' };
type Action = { type: 'TICK' } | { type: 'INC_CHAR' } | { type: 'DEC_CHAR' } | { type: 'HOLD' } | { type: 'DELETE' } | { type: 'PAUSE' } | { type: 'TYPE' };

function reducer(state: State, action: Action): State {
  const current = TYPEWRITER_WORDS[state.wordIndex] ?? '';
  switch (action.type) {
    case 'INC_CHAR':
      return { ...state, text: current.slice(0, state.text.length + 1) };
    case 'DEC_CHAR':
      return { ...state, text: current.slice(0, state.text.length - 1) };
    case 'HOLD':
      return { ...state, phase: 'holding' };
    case 'DELETE':
      return { ...state, phase: 'deleting' };
    case 'PAUSE':
      return { wordIndex: (state.wordIndex + 1) % TYPEWRITER_WORDS.length, text: '', phase: 'pause' };
    case 'TYPE':
      return { ...state, phase: 'typing' };
    default:
      return state;
  }
}

/** Typewriter effect cycling through hero keywords. */
export function Typewriter() {
  const [state, dispatch] = useReducer(reducer, {
    wordIndex: 0,
    text: '',
    phase: 'typing',
  });

  useEffect(() => {
    const current = TYPEWRITER_WORDS[state.wordIndex] ?? '';
    let t: ReturnType<typeof setTimeout>;

    if (state.phase === 'typing') {
      if (state.text.length < current.length) {
        t = setTimeout(() => dispatch({ type: 'INC_CHAR' }), 90);
      } else {
        t = setTimeout(() => dispatch({ type: 'HOLD' }), 900);
      }
    } else if (state.phase === 'holding') {
      t = setTimeout(() => dispatch({ type: 'DELETE' }), 600);
    } else if (state.phase === 'deleting') {
      if (state.text.length > 0) {
        t = setTimeout(() => dispatch({ type: 'DEC_CHAR' }), 45);
      } else {
        t = setTimeout(() => dispatch({ type: 'PAUSE' }), 60);
      }
    } else {
      t = setTimeout(() => dispatch({ type: 'TYPE' }), 180);
    }
    return () => clearTimeout(t);
  }, [state]);

  return (
    <span className="relative inline-block text-[#1d81f2]">
      <span>{state.text}</span>
      <span className="cursor-blink ml-0.5 font-light text-[#1d81f2]">|</span>
    </span>
  );
}
