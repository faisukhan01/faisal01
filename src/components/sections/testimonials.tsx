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
  // Premium zero-padded counter indicator (e.g. "01 / 03")
  const counter = `${String(active + 1).padStart(2, '0')} / ${String(
    TESTIMONIALS.length,
  ).padStart(2, '0')}`;

  return (
    <section
      id="testimonials"
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

      {/* Premium spotlight gradient overlay (behind content) */}
      <div
        aria-hidden
        className="spotlight-gradient pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="max-w-[820px] mx-auto text-center">
          {/* Premium section heading chip */}
          <span className="section-heading-chip">
            <span
              className="category-dot"
              style={{ color: '#1d81f2' }}
              aria-hidden
            />
            VOICES
          </span>
          <h2 className="mt-5 text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            What our customers say
          </h2>
          {/* Premium gradient hairline under heading */}
          <div className="section-rule mx-auto mt-6" aria-hidden />
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
                className="absolute inset-0"
              >
                {/*
                  Premium stack wrapper (no overflow-hidden so the
                  card-stack-3d ::before/::after pseudo-elements can extend
                  past the card edge and render the layered "stack" effect).
                */}
                <div className="card-stack-3d h-full rounded-[24px]">
                  <div className="gradient-border-animated lift-on-hover shadow-depth-lg h-full grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[24px] bg-white overflow-hidden">
                    {/* Text side */}
                    <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between relative">
                      <div className="flex items-start gap-3">
                        {/* Premium gradient-animated opening quote mark */}
                        <span
                          className="text-gradient-animated text-[64px] leading-none font-bold select-none -mt-2"
                          aria-hidden
                        >
                          &ldquo;
                        </span>
                        <Quote
                          className="h-10 w-10 text-[#1d81f2]/15 mt-1"
                          fill="currentColor"
                        />
                      </div>
                      <div className="mt-2 flex-1 flex items-center">
                        <p className="text-[16px] lg:text-[20px] leading-[1.6] text-[#161616] font-normal">
                          {current.quote}
                        </p>
                      </div>
                      <div className="mt-6">
                        {/* Premium accent dot before the person name */}
                        <div className="flex items-center gap-2">
                          <span
                            className="h-1 w-1 rounded-full bg-[#1d81f2]"
                            aria-hidden
                          />
                          <div className="text-[20px] lg:text-[24px] font-semibold text-[#161616]">
                            {current.person}
                          </div>
                        </div>
                        {/* Premium tabular-numerics title */}
                        <div className="mt-1 text-[15px] text-[#6b7280] font-mono-numeric">
                          {current.title}
                        </div>
                        {/* Premium chip-selected company badge */}
                        <div className="mt-3">
                          <span className="chip-selected inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold text-white">
                            {current.company}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Portrait side */}
                    <div className="lg:col-span-5 relative h-[200px] lg:h-auto">
                      {/*
                        Premium gradient-border-animated ring around the
                        portrait. Inline style ensures position:absolute
                        wins over the gradient-border-animated class's
                        position:relative (class + utility conflict at the
                        cascade boundary).
                      */}
                      <div
                        className="gradient-border-animated shadow-depth rounded-[24px] overflow-hidden"
                        style={{ position: 'absolute', inset: 0 }}
                      >
                        <img
                          src={current.portrait}
                          alt={current.person}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f62fe]/30 to-transparent lg:bg-gradient-to-l" />
                      </div>

                      {current.hasVideo && (
                        <button
                          onClick={() => setVideoOpen(true)}
                          className="btn-shine btn-glow group absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-premium hover:scale-110 transition-transform"
                          aria-label={`Play video testimonial from ${current.person}`}
                        >
                          <span className="absolute inset-0 rounded-full bg-[#1d81f2]/30 animate-pulse-ring" />
                          <Play
                            className="relative h-6 w-6 text-[#1d81f2] ml-1"
                            fill="currentColor"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows — premium shine + lift on hover */}
          <button
            aria-label="Previous testimonial"
            onClick={() =>
              setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
            }
            className="btn-shine lift-on-hover absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-premium flex items-center justify-center text-[#161616] hover:bg-[#1d81f2] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
            className="btn-shine lift-on-hover absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-premium flex items-center justify-center text-[#161616] hover:bg-[#1d81f2] hover:text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot navigation + counter + keyboard hint */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {/* Premium tabular counter indicator (e.g. "01 / 03") */}
            <span className="font-mono-numeric text-[12px] text-[#6b7280] tabular-nums">
              {counter}
            </span>
            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={active === i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i
                      ? 'live-pulse-dot w-8 bg-gradient-to-r from-[#1d81f2] to-[#56ccf2]'
                      : 'lift-on-hover w-2 bg-[#1d81f2]/25'
                  }`}
                />
              ))}
            </div>
            {focused && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#6b7280]">
                <Keyboard className="h-3.5 w-3.5" />
                <kbd className="px-1.5 py-0.5 rounded bg-[#f5f7fa] border border-[#e0e0e0] text-[10px] font-mono">
                  ←
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[#f5f7fa] border border-[#e0e0e0] text-[10px] font-mono">
                  →
                </kbd>
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
