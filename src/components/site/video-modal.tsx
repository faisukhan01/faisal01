'use client';

import { useEffect, useReducer, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, Maximize2, Captions } from 'lucide-react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  /** Optional thumbnail backdrop while video loads */
  backdropImage?: string;
  children?: ReactNode;
}

interface PlayerState {
  playing: boolean;
  progress: number; // 0..100
  muted: boolean;
  captionOn: boolean;
}

type PlayerAction =
  | { type: 'TOGGLE_PLAY' }
  | { type: 'TICK'; delta: number }
  | { type: 'SEEK'; progress: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'TOGGLE_CAPTIONS' }
  | { type: 'RESET' };

const DURATION = 47; // seconds — fake duration for the demo player

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return { ...state, playing: !state.playing };
    case 'TICK': {
      if (!state.playing) return state;
      const next = state.progress + (action.delta / DURATION) * 100;
      if (next >= 100) return { ...state, progress: 100, playing: false };
      return { ...state, progress: next };
    }
    case 'SEEK':
      return { ...state, progress: Math.max(0, Math.min(100, action.progress)) };
    case 'TOGGLE_MUTE':
      return { ...state, muted: !state.muted };
    case 'TOGGLE_CAPTIONS':
      return { ...state, captionOn: !state.captionOn };
    case 'RESET':
      return { playing: true, progress: 0, muted: false, captionOn: true };
    default:
      return state;
  }
}

const initialState: PlayerState = {
  playing: true,
  progress: 0,
  muted: false,
  captionOn: true,
};

/**
 * Premium video modal — accessible, escape-to-close, click-outside-to-close.
 * Includes a custom animated SVG "video" player (waveform + scrubber + progress)
 * that simulates a real testimonial video being played.
 */
export function VideoModal({
  open,
  onClose,
  title,
  subtitle,
  backdropImage,
  children,
}: VideoModalProps) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Reset player when modal opens
  useEffect(() => {
    if (open) dispatch({ type: 'RESET' });
  }, [open]);

  // Lock scroll + escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_PLAY' });
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // rAF tick — drive the fake progress while playing
  useEffect(() => {
    if (!open || !state.playing) return;
    let raf: number;
    let last = performance.now();
    const loop = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      dispatch({ type: 'TICK', delta });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, state.playing]);

  // Format seconds as m:ss
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss.toString().padStart(2, '0')}`;
  };
  const elapsed = (state.progress / 100) * DURATION;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title ?? 'Video modal'}
        >
          {/* Backdrop */}
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[860px] overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-12px_rgba(0,0,0,0.6)] border border-white/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video / media area (16:9) */}
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              {children ?? (
                <div className="absolute inset-0">
                  {/* Backdrop image */}
                  {backdropImage && (
                    <img
                      src={backdropImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-50"
                    />
                  )}
                  {/* Gradient overlays for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1d81f2]/10 via-transparent to-[#1d81f2]/10" />

                  {/* Caption overlay */}
                  {state.captionOn && title && (
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[88%] text-center">
                      <span className="inline-block bg-black/55 backdrop-blur px-3 py-1.5 rounded text-white text-[14px] lg:text-[16px] leading-snug">
                        &ldquo;{title}&rdquo;
                      </span>
                    </div>
                  )}

                  {/* Animated SVG waveform — looks like a real video playing */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      width="380"
                      height="84"
                      viewBox="0 0 380 84"
                      className="text-[#56ccf2]"
                      aria-hidden
                    >
                      {Array.from({ length: 60 }).map((_, i) => {
                        const phase = (state.progress * 0.06 + i * 0.4) % (Math.PI * 2);
                        const h = 6 + Math.abs(Math.sin(phase) * 32);
                        return (
                          <rect
                            key={i}
                            x={i * 6 + 2}
                            y={(84 - h) / 2}
                            width="3"
                            height={h}
                            rx="1.5"
                            fill="currentColor"
                            opacity={state.playing ? 0.75 : 0.35}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Center play/pause toggle (large) */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
                    className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/95 backdrop-blur shadow-[0_8px_30px_rgba(29,129,242,0.5)] flex items-center justify-center"
                    aria-label={state.playing ? 'Pause' : 'Play'}
                  >
                    {state.playing ? (
                      <Pause className="h-7 w-7 text-[#1d81f2]" fill="currentColor" />
                    ) : (
                      <Play className="ml-1 h-7 w-7 text-[#1d81f2]" fill="currentColor" />
                    )}
                  </motion.button>

                  {/* LIVE badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur px-2.5 py-1 text-[11px] text-white">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#e5484d] opacity-75 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e5484d]" />
                    </span>
                    NETSOL · CUSTOMER STORY
                  </div>
                </div>
              )}
            </div>

            {/* Custom video controls bar */}
            <div className="bg-[#0f172a] border-t border-white/10 px-4 py-3 text-white">
              {/* Scrubber */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-mono text-white/70 tabular-nums">
                  {fmt(elapsed)}
                </span>
                <div className="relative flex-1 group">
                  {/* Track */}
                  <div className="h-1 rounded-full bg-white/15 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#1d81f2] to-[#56ccf2]"
                      style={{ width: `${state.progress}%` }}
                    />
                  </div>
                  {/* Buffered (fake) */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 h-1 rounded-full bg-white/10"
                    style={{ width: `${Math.min(100, state.progress + 8)}%` }}
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${state.progress}% - 6px)` }}
                  />
                  {/* Click-to-seek */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={state.progress}
                    onChange={(e) => dispatch({ type: 'SEEK', progress: parseFloat(e.target.value) })}
                    aria-label="Seek video"
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-[11px] font-mono text-white/50 tabular-nums">
                  {fmt(DURATION)}
                </span>
              </div>

              {/* Buttons row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
                    aria-label={state.playing ? 'Pause' : 'Play'}
                    className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    {state.playing ? (
                      <Pause className="h-4 w-4" fill="currentColor" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                    )}
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_MUTE' })}
                    aria-label={state.muted ? 'Unmute' : 'Mute'}
                    className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_CAPTIONS' })}
                    aria-label={state.captionOn ? 'Hide captions' : 'Show captions'}
                    aria-pressed={state.captionOn}
                    className={`h-8 px-2 rounded-full flex items-center justify-center transition-colors ${
                      state.captionOn ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-white/60'
                    }`}
                  >
                    <Captions className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/60">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">Space</kbd>
                    <span>play / pause</span>
                  </div>
                  <button
                    aria-label="Fullscreen"
                    className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer caption */}
            {(title || subtitle) && (
              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#0f172a] px-5 py-3 text-white">
                <div>
                  {title && (
                    <div className="text-[14px] font-semibold leading-tight">{title}</div>
                  )}
                  {subtitle && (
                    <div className="text-[12px] text-white/60">{subtitle}</div>
                  )}
                </div>
                <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#24a148] animate-pulse" />
                  NETSOL customer story
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
