'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Globe } from 'lucide-react';
import { Typewriter } from '@/components/site/typewriter';
import { CTAButton } from '@/components/site/cta-button';
import { Magnetic } from '@/components/site/magnetic';
import { Parallax } from '@/components/site/parallax';
import { HERO_SLIDES } from '@/lib/site-data';

const HeroScene3D = dynamic(
  () => import('@/components/three/scenes').then((m) => m.HeroScene3D),
  { ssr: false }
);

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-white pt-14 pb-16 lg:pt-20 lg:pb-24 mesh-gradient"
      aria-label="Hero"
    >
      {/* Background vertical line pattern */}
      <div
        aria-hidden
        className="absolute inset-0 bg-barcode opacity-60 pointer-events-none"
      />
      {/* Soft green shape accent — parallax on scroll */}
      <Parallax speed={0.08} max={40} className="absolute -top-24 right-[12%] pointer-events-none">
        <div className="h-[420px] w-[420px] rounded-full bg-[#24a148]/8 blur-3xl animate-float-slow" />
      </Parallax>
      {/* Secondary accent — blue glow top-left */}
      <Parallax speed={0.12} max={60} className="absolute -top-32 -left-32 pointer-events-none">
        <div className="h-[480px] w-[480px] rounded-full bg-[#1d81f2]/6 blur-3xl" />
      </Parallax>

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* LEFT: text content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {/* Tag — premium chip badge */}
          <div className="mb-6">
            <span className="section-heading-chip">Shaping Smarter Finance</span>
          </div>

          <h1 className="font-semibold leading-[1.05] tracking-[-0.02em] text-[#161616] text-[42px] sm:text-[52px] lg:text-[58px] xl:text-[64px]">
            AI-enabled ecosystems that make commerce{' '}
            <span className="text-gradient-animated drop-shadow-sm">
              <Typewriter />
            </span>
          </h1>

          <p className="mt-6 max-w-[520px] border-l-2 border-[#1d81f2]/40 pl-4 text-[16px] lg:text-[18px] leading-[1.6] text-[#525252]">
            We remove complexity from the asset lifecycle — from originations and
            servicing to remarketing. One connected platform for lenders, OEMs,
            dealers and fleets, powered by AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* CTA with glow halo + shine wrapper */}
            <div className="relative inline-block">
              <div className="glow-halo absolute inset-0 -z-10" aria-hidden />
              <Magnetic as="div" strength={0.25} className="btn-shine inline-block rounded-[10px]">
                <CTAButton href="#contact">Get in touch</CTAButton>
              </Magnetic>
            </div>
            <a
              href="#platform"
              className="nav-link-underline inline-flex items-center gap-2 text-[15px] font-medium text-[#161616] hover:text-[#1d81f2] transition-colors"
            >
              Explore the platform
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Trust strip — premium glass pill */}
          <div className="mt-10 inline-flex items-center gap-6 bg-white/60 backdrop-blur-sm border border-[#e0e0e0] rounded-full px-4 py-2 shadow-depth">
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-[#1d81f2]" />
              <span className="h-2 w-2 rounded-full bg-[#24a148] animate-pulse" />
              <span className="text-[12px] text-[#6b7280] font-medium">
                NASDAQ: NTWK · 25+ years listed
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-[#e0e0e0]" />
            <span className="hidden sm:inline text-[12px] text-[#6b7280] font-medium">
              $500B+ assets managed globally
            </span>
          </div>
        </motion.div>

        {/* RIGHT: 3D scene + auto-rotating image carousel */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-[600px]">
          {/* Spotlight gradient — soft radial highlight behind 3D scene */}
          <div className="spotlight-gradient absolute inset-0 pointer-events-none" aria-hidden />

          {/* 3D canvas background */}
          <div className="absolute inset-0 z-0">
            <HeroScene3D />
          </div>

          {/* Floating image carousel */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto relative h-[260px] w-[260px] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px] gradient-border-animated"
              >
                <div className="absolute inset-0 rounded-[28px] glass-card-premium overflow-hidden">
                  <img
                    src={HERO_SLIDES[activeSlide].image}
                    alt={HERO_SLIDES[activeSlide].alt}
                    className="h-full w-full object-cover mix-blend-multiply opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f62fe]/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[1.5px] text-white/80">
                      {HERO_SLIDES[activeSlide].label}
                    </div>
                    <div className="text-[15px] font-semibold text-white mt-0.5">
                      {HERO_SLIDES[activeSlide].title}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicators + counter — premium glass pill */}
          <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2">
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/60 rounded-full px-3 py-2 shadow-depth">
              <span className="text-[11px] font-mono tracking-widest text-[#6b7280] hidden sm:inline">
                {String(activeSlide + 1).padStart(2, '0')}
                <span className="mx-1 text-[#9ca3af]">/</span>
                {String(HERO_SLIDES.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeSlide === i ? 'w-8 bg-[#1d81f2]' : 'w-1.5 bg-[#1d81f2]/30 hover:bg-[#1d81f2]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="absolute top-4 right-2 sm:right-6 z-20 rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 shadow-depth shadow-premium p-3 pr-4 flex items-center gap-2.5"
          >
            <span className="live-pulse-dot h-8 w-8 rounded-lg bg-[#1d81f2]/10 flex items-center justify-center text-[#1d81f2]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12L9 18L21 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <div className="text-[11px] text-[#6b7280] leading-none">Live origination</div>
              <div className="text-[14px] font-semibold text-[#161616] leading-tight">1,284 today</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="absolute bottom-20 left-0 sm:left-2 z-20 rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 shadow-depth shadow-premium p-3 pr-4 flex items-center gap-2.5"
          >
            {/* Live status dot */}
            <span className="live-pulse-dot absolute top-2 right-2 h-2 w-2 rounded-full bg-[#24a148] shadow-[0_0_0_3px_rgba(36,161,72,0.18)]" aria-hidden />
            <span className="h-8 w-8 rounded-lg bg-[#24a148]/10 flex items-center justify-center text-[#24a148]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <div className="text-[11px] text-[#6b7280] leading-none">Servicing</div>
              <div className="text-[14px] font-semibold text-[#161616] leading-tight">99.98% uptime</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1d81f2]/20 to-transparent" />
    </section>
  );
}
