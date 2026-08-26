'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

/* ————————————————————————————————————————————————
   Hero — full-bleed product backgrounds sliding behind
   the headline (Concordia → Staffist → FaQ Ops), with a
   deep navy veil so the type stays crisp on top.
   ———————————————————————————————————————————————— */

const SLIDES = [
  {
    src: '/slider/concordia-console.png',
    name: 'Concordia',
    label: 'College management system',
  },
  {
    src: '/slider/staffist-console.png',
    name: 'Staffist',
    label: 'UK staffing platform',
  },
  {
    src: '/slider/ops-console.png',
    name: 'FaQ Ops',
    label: 'Runtime & monitoring',
  },
];

const STATS = [
  { value: '99.9%', label: 'Platform uptime' },
  { value: '2', label: 'Systems in production' },
  { value: '12', label: 'Modules shipped' },
  { value: '4,200+', label: 'Daily users' },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused, reduced]);

  const slide = SLIDES[index];

  return (
    <section
      id="top"
      className="hero-dark relative flex min-h-[92svh] flex-col overflow-hidden bg-night text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* — sliding product backgrounds — */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, x: reduced ? 0 : '5%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.04 }}
              animate={{ scale: 1.11 }}
              transition={{ duration: 7.5, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover blur-[2px]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* navy veil + directional gradients for text legibility */}
        <div className="absolute inset-0 bg-night/[0.72]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-night/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-night via-night/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_12%,transparent_45%,rgb(9_14_24/0.5)_100%)]" />
      </div>

      {/* — content — */}
      <div className="container-luxe relative flex flex-1 flex-col justify-center py-36 md:py-40">
        <div className="mx-auto max-w-[780px] text-center">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
              Intelligent Software Systems
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[58px]">
              Build{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-[#3d9dff]">
                smarter
              </span>{' '}
              systems.
              <br />
              Scale{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-[#3d9dff]">
                better
              </span>{' '}
              businesses.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.75] text-white/70">
              We design, build and operate intelligent software — from
              automation to full platforms — that help modern businesses run
              smarter, faster and leaner.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#products"
                className="btn-cobalt group h-12 px-7 text-[14px] shadow-[0_18px_44px_-16px_rgb(0_122_255/0.7)]"
              >
                See our work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-7 text-[14px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-white/10"
              >
                Talk to us
              </a>
            </div>
          </Reveal>

          {/* slide indicator + current system */}
          <Reveal delay={0.32}>
            <div className="mt-12 flex items-center justify-center gap-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={slide.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/45"
                >
                  {slide.name} · {slide.label}
                </motion.span>
              </AnimatePresence>
              <span className="h-3 w-px bg-white/20" aria-hidden="true" />
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Background slides">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show ${s.name} background`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      'h-[6px] rounded-full transition-all duration-500',
                      i === index
                        ? 'w-7 bg-white'
                        : 'w-[6px] bg-white/30 hover:bg-white/55'
                    )}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* — stat strip on the dark floor — */}
      <div className="container-luxe relative pb-10 md:pb-12">
        <Reveal delay={0.4}>
          <dl className="mx-auto grid max-w-[860px] grid-cols-2 divide-x divide-white/[0.14] border-y border-white/[0.14] md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-6 text-center md:py-7">
                <dt className="sr-only">{s.label}</dt>
                <dd className="tabular font-display text-[26px] font-extrabold leading-none tracking-tight text-white md:text-[28px]">
                  {s.value}
                </dd>
                <dd className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.13em] text-white/45">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
