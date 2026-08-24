'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

const AUTO_ADVANCE_MS = 7500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    },
    []
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, go]);

  // Keyboard navigation — Arrow keys while the section holds focus
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPaused(true);
        go(-1);
      } else if (e.key === 'ArrowRight') {
        setPaused(true);
        go(1);
      }
    };
    section.addEventListener('keydown', onKeyDown);
    return () => section.removeEventListener('keydown', onKeyDown);
  }, [go]);

  const t = TESTIMONIALS[index];
  const initials = t.person
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <section
      id="stories"
      ref={sectionRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer testimonials — use arrow keys to browse"
      className="border-y border-hairline bg-white py-24 outline-none transition-shadow duration-300 focus-visible:shadow-[inset_0_0_0_2px_rgb(166_25_46/0.35)] md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-luxe">
        <Reveal className="text-center">
          <p className="eyebrow text-muted-foreground">Customer voices</p>
        </Reveal>

        <div
          className="relative mx-auto mt-10 max-w-3xl text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none font-serif text-[110px] leading-none text-crimson/15"
          >
            &ldquo;
          </span>

          <div className="min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="font-serif text-[21px] leading-[1.5] tracking-[-0.005em] text-ink md:text-[27px]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-9 flex items-center justify-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline font-serif text-[15px] text-ink/60"
                  >
                    {initials}
                  </span>
                  <span className="text-left">
                    <span className="block text-[14px] font-medium text-ink">
                      {t.person}
                    </span>
                    <span className="block text-[12.5px] text-muted-foreground">
                      {t.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-1 hidden h-8 w-px bg-hairline sm:block"
                  />
                  <span className="eyebrow ml-1 hidden text-crimson sm:block">
                    {t.company}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Minimal controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink/60 transition-all duration-300 hover:border-ink/35 hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial selector">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${item.person}, ${item.company}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-[2px] rounded-full transition-all duration-500',
                    i === index ? 'w-10 bg-ink' : 'w-5 bg-ink/20 hover:bg-ink/40'
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink/60 transition-all duration-300 hover:border-ink/35 hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
