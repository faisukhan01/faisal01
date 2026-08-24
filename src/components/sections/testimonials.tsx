'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Play, ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { VideoModal } from '@/components/site/video-modal';
import { TESTIMONIALS } from '@/lib/site-data';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  // track section focus to enable keyboard nav
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(t);
  }, [paused]);

  // Keyboard navigation (left/right) when carousel region is focused
  useEffect(() => {
    if (!focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActive((a) => (a + 1) % TESTIMONIALS.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused]);

  const current = TESTIMONIALS[active];

  return (
    <section
      id="insights"
      className="relative w-full bg-[#f0f8ff] py-20 lg:py-28 overflow-hidden"
      aria-label="Customer testimonials"
    >
      {/* Vertical stripe pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(29,129,242,0.04) 14px, rgba(29,129,242,0.04) 16px)',
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="max-w-[820px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#1d81f2]" />
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              Customer Stories
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            What our customers say
          </h2>
        </Reveal>

        {/* Carousel */}
        <div
          className="relative mt-12 outline-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials carousel — use arrow keys to navigate"
        >
          <div className="relative h-[440px] sm:h-[360px] lg:h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[24px] bg-white shadow-premium-lg overflow-hidden border border-white relative"
              >
                {/* Animated gradient border overlay */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-[1px] rounded-[24px] opacity-30"
                  style={{
                    background:
                      'linear-gradient(135deg, #1d81f2, transparent 35%, transparent 65%, #56ccf2)',
                    padding: '1px',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-sweep 12s ease infinite',
                  }}
                />
                {/* Text side */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between relative">
                  <Quote className="h-10 w-10 text-[#1d81f2]/15" fill="currentColor" />
                  <div className="mt-2 flex-1 flex items-center">
                    <p className="text-[16px] lg:text-[20px] leading-[1.6] text-[#161616] font-normal">
                      "{current.quote}"
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="text-[20px] lg:text-[24px] font-semibold text-[#161616]">
                      {current.person}
                    </div>
                    <div className="mt-1 text-[15px] text-[#6b7280]">{current.title}</div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#1d81f2]/8 px-3 py-1 text-[12px] font-semibold text-[#1d81f2]">
                      {current.company}
                    </div>
                  </div>
                </div>

                {/* Portrait side */}
                <div className="lg:col-span-5 relative h-[200px] lg:h-auto">
                  <img
                    src={current.portrait}
                    alt={current.person}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f62fe]/30 to-transparent lg:bg-gradient-to-l" />

                  {current.hasVideo && (
                    <button
                      onClick={() => setVideoOpen(true)}
                      className="group absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-premium hover:scale-110 transition-transform"
                      aria-label={`Play video testimonial from ${current.person}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-[#1d81f2]/30 animate-pulse-ring" />
                      <Play className="relative h-6 w-6 text-[#1d81f2] ml-1" fill="currentColor" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <button
            aria-label="Previous testimonial"
            onClick={() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-premium flex items-center justify-center text-[#161616] hover:bg-[#1d81f2] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-premium flex items-center justify-center text-[#161616] hover:bg-[#1d81f2] hover:text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot navigation + keyboard hint */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={active === i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i ? 'w-8 bg-[#1d81f2]' : 'w-2 bg-[#1d81f2]/25'
                  }`}
                />
              ))}
            </div>
            {focused && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#6b7280]">
                <Keyboard className="h-3.5 w-3.5" />
                <kbd className="px-1.5 py-0.5 rounded bg-[#f5f7fa] border border-[#e0e0e0] text-[10px] font-mono">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[#f5f7fa] border border-[#e0e0e0] text-[10px] font-mono">→</kbd>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Video modal */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={`${current.person} — ${current.title}`}
        subtitle={`${current.company} · NETSOL customer story`}
        backdropImage={current.portrait}
      />
    </section>
  );
}
