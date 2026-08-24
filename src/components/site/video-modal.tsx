'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  /** Optional thumbnail backdrop while video loads */
  backdropImage?: string;
  children?: ReactNode;
}

/**
 * Premium video modal — accessible, escape-to-close, click-outside-to-close.
 * Used for testimonial videos and any other media popovers.
 */
export function VideoModal({
  open,
  onClose,
  title,
  subtitle,
  backdropImage,
  children,
}: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

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
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video / media area (16:9) */}
            <div className="relative aspect-video w-full bg-black">
              {children ?? (
                <div className="absolute inset-0 flex items-center justify-center">
                  {backdropImage && (
                    <img
                      src={backdropImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  <div className="relative z-10 text-center">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_30px_rgba(29,129,242,0.5)]"
                      aria-label="Play"
                    >
                      <Play className="ml-1 h-7 w-7 text-[#1d81f2]" fill="currentColor" />
                    </motion.button>
                    {title && (
                      <div className="mt-4 text-white">
                        <div className="text-[18px] font-semibold">{title}</div>
                        {subtitle && (
                          <div className="mt-1 text-[13px] text-white/70">{subtitle}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
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
