'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

/* ————————————————————————————————————————————————
   Hero — a light, editorial opening. Full-bleed natural
   scenes (shore → dunes → sky) drift slowly behind an
   airy cream veil, so the navy wordmark and ink type
   stay crisp while the page breathes.
   ———————————————————————————————————————————————— */

const SLIDES = [
  {
    src: '/hero/hero-shore.jpg',
    name: 'Coastline',
    line: 'Calm under load',
  },
  {
    src: '/hero/hero-dunes.jpg',
    name: 'Dunes',
    line: 'Order in motion',
  },
  {
    src: '/hero/hero-clouds.jpg',
    name: 'Skyward',
    line: 'Room to scale',
  },
];

const DURATION = 6400; // ms per scene

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);
  const reduced = useReducedMotion();

  /* Pause-aware auto-advance. The clock accrues in a ref so
     hovering (pause) freezes mid-scene and resumes exactly
     where it left off. Re-running on `index` also resets the
     countdown after a manual indicator click. */
  useEffect(() => {
    if (paused || reduced) return;
    const started = performance.now() - elapsedRef.current;
    const iv = setInterval(() => {
      const e = performance.now() - started;
      if (e >= DURATION) {
        elapsedRef.current = 0;
        setElapsed(0);
        setIndex((i) => (i + 1) % SLIDES.length);
      } else {
        elapsedRef.current = e;
        setElapsed(e);
      }
    }, 100);
    return () => clearInterval(iv);
  }, [index, paused, reduced]);

  const slide = SLIDES[index];

  return (
    <section
      className="hero-light relative flex min-h-[92svh] flex-col overflow-hidden bg-cream text-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* — drifting natural backdrops (all mounted → preloaded, opacity crossfade) — */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.src}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* slow ken-burns drift while this scene is on stage */}
            <motion.div
              initial={false}
              animate={{ scale: i === index && !reduced ? 1.09 : 1.02 }}
              transition={{ duration: 9.5, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Image
                src={s.src}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                loading="eager"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}

        {/* airy veil — the scene stays visible while ink type stays crisp */}
        <div className="absolute inset-0 bg-cream/[0.5]" />
        <div className="absolute inset-0 bg-[radial-gradient(105%_75%_at_50%_36%,rgb(247_249_252/0.55),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-cream/95 via-cream/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-cream via-cream/65 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(125%_90%_at_50%_8%,transparent_55%,rgb(26_35_50/0.07)_100%)]" />
        {/* fine print grain — editorial finish */}
        <div className="hero-grain absolute inset-0" />
      </div>

      {/* — content — */}
      <div className="container-luxe relative flex flex-1 flex-col justify-center py-36 md:py-40">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-4 text-ink/55">
              <span className="h-px w-10 bg-ink/20" aria-hidden="true" />
              Intelligent Software Systems
              <span className="h-px w-10 bg-ink/20" aria-hidden="true" />
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[50px] lg:text-[60px]">
              Build{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-[#007aff]">
                smarter
              </span>{' '}
              systems.
              <br />
              Scale{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-[#007aff]">
                better
              </span>{' '}
              businesses.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-[540px] text-[15px] leading-[1.75] text-ink/65">
              We design, build and operate intelligent software — from
              automation to full platforms — that help modern businesses run
              smarter, faster and leaner.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#products"
                className="btn-primary group h-12 px-7 text-[14px] shadow-[0_18px_44px_-16px_rgb(26_35_50/0.5)]"
              >
                See our work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-white/70 px-7 text-[14px] font-semibold text-ink backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white hover:shadow-[0_14px_36px_-16px_rgb(26_35_50/0.35)]"
              >
                Talk to us
              </a>
            </div>
          </Reveal>

          {/* scene indicator — quiet progress bars */}
          <Reveal delay={0.32}>
            <div className="mt-14 flex items-center justify-center gap-4">
              <span
                aria-live="polite"
                className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink/50"
              >
                {slide.name} · {slide.line}
              </span>
              <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Background scenes"
              >
                {SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show ${s.name} scene`}
                    onClick={() => {
                      elapsedRef.current = 0;
                      setElapsed(0);
                      setIndex(i);
                    }}
                    className={cn(
                      'relative h-[3px] overflow-hidden rounded-full transition-colors duration-500',
                      i === index ? 'w-10 bg-ink/[0.14]' : 'w-5 bg-ink/[0.14] hover:bg-ink/25'
                    )}
                  >
                    {i === index && (
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-ink"
                        style={{
                          width: reduced ? '100%' : `${(elapsed / DURATION) * 100}%`,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
