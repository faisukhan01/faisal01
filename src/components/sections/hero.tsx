'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

/* ————————————————————————————————————————————————
   Hero — a light, editorial opening. A single natural
   scene (calm coastline) sits behind an airy cream
   veil, so the navy wordmark and ink type stay crisp
   while the page breathes.
   ———————————————————————————————————————————————— */

const SCENE = '/hero/hero-shore.jpg';

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="hero-light relative flex min-h-[92svh] flex-col overflow-hidden bg-cream text-ink">
      {/* — single natural backdrop, slow ken-burns drift — */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          initial={false}
          animate={{ scale: reduced ? 1 : 1.07 }}
          transition={{ duration: 14, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src={SCENE}
            alt=""
            fill
            sizes="100vw"
            priority
            loading="eager"
            className="object-cover"
          />
        </motion.div>

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
        </div>
      </div>
    </section>
  );
}
