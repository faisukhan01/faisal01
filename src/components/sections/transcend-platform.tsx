'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Check } from 'lucide-react';
import { TRANSCEND_TABS } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';
import { Lazy3D } from '@/components/site/lazy-3d';
import { cn } from '@/lib/utils';

const PlatformScene3D = dynamic(
  () => import('@/components/three/scenes').then((m) => m.PlatformScene3D),
  { ssr: false }
);

export function TranscendPlatform() {
  const [active, setActive] = useState('finance');
  const current = TRANSCEND_TABS.find((t) => t.id === active) ?? TRANSCEND_TABS[1];

  return (
    <section
      id="platform"
      className="relative w-full bg-[#f5f7fa] py-20 lg:py-28 overflow-hidden"
      aria-label="Transcend Platform"
    >
      {/* Decorative barcode */}
      <div aria-hidden className="absolute inset-0 bg-barcode opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* Heading */}
        <Reveal className="max-w-[820px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#1d81f2]" />
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
              The Transcend Platform
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
            One platform for the entire asset lifecycle
          </h2>
          <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.6]">
            Transcend unifies digital retail, finance, AI, marketplace and
            consultancy into a single connected mesh — so every contract, every
            customer, and every decision lives in one place.
          </p>
        </Reveal>

        {/* Tab bar */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <div className="flex flex-wrap justify-center gap-2.5 p-1.5 rounded-full bg-white/70 backdrop-blur border border-[#e0e0e0] shadow-soft">
              {TRANSCEND_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    'rounded-full px-5 sm:px-7 py-2.5 text-[14px] font-medium transition-all duration-300',
                    active === tab.id
                      ? 'text-white shadow-[0_4px_16px_-4px_rgba(36,161,72,0.4)]'
                      : 'text-[#525252] hover:text-[#161616]'
                  )}
                  style={
                    active === tab.id
                      ? { backgroundColor: tab.id === 'finance' ? '#24a148' : tab.accent }
                      : undefined
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5"
          >
            {/* Left hero card */}
            <div
              className="lg:col-span-7 relative rounded-2xl border border-[#e0e0e0] p-8 lg:p-10 overflow-hidden"
              style={{ background: current.bg }}
            >
              {/* Vertical line pattern */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.04) 8px, rgba(0,0,0,0.04) 10px)',
                }}
              />
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div>
                  <span
                    className="inline-flex items-center justify-center h-12 w-12 rounded-xl text-white"
                    style={{ backgroundColor: current.accent }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4H10L20 14V20L14 20L4 10V4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path d="M4 20L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <h3 className="mt-5 text-[24px] lg:text-[28px] font-semibold tracking-tight text-[#161616] leading-tight">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-[#525252] leading-[1.65]">
                    {current.description}
                  </p>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#161616] hover:gap-3 transition-all"
                    style={{ color: current.accent }}
                  >
                    Get in touch
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ backgroundColor: current.accent }}>
                      <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                  </a>
                </div>

                {/* 3D scene */}
                <div className="h-[200px] sm:h-[260px] hidden sm:block">
                  <Lazy3D
                    className="h-full w-full"
                    fallback={
                      <div
                        aria-hidden
                        className="h-full w-full rounded-full blur-2xl"
                        style={{
                          background: `radial-gradient(circle, ${current.accent}33, transparent 60%)`,
                        }}
                      />
                    }
                  >
                    <PlatformScene3D color={current.accent} />
                  </Lazy3D>
                </div>
              </div>
            </div>

            {/* Right marquee of categories */}
            <div className="lg:col-span-5 relative rounded-2xl bg-white border border-[#e0e0e0] p-8 lg:p-10 flex flex-col justify-between overflow-hidden">
              {/* Animated gradient border on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${current.accent}, transparent 35%, transparent 65%, ${current.accent})`,
                  padding: '1px',
                  WebkitMask:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-sweep 8s ease infinite',
                }}
              />
              {/* Top accent strip */}
              <span
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, ${current.accent}, transparent)`,
                }}
              />
              <div className="relative z-10">
                <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                  What's inside
                </div>
                <h4 className="mt-3 text-[20px] font-semibold text-[#161616]">
                  Modules & capabilities
                </h4>
              </div>

              {/* Vertical infinite marquee */}
              <div className="relative h-[220px] overflow-hidden mt-6 z-10">
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-10" />
                <div className="flex flex-col gap-3 animate-marquee-vertical">
                  {[...current.categories, ...current.categories, ...current.categories].map(
                    (cat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-[#f0f0f0] bg-[#f5f7fa]/50 px-4 py-3 hover:bg-[#f5f7fa] hover:border-[#e0e0e0] transition-colors"
                      >
                        <span
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: current.accent }}
                        >
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        <span className="text-[14px] font-medium text-[#161616]">{cat}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[12px] text-[#6b7280] z-10 relative">
                <span>{current.categories.length} modules</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#24a148] animate-pulse" />
                  Live in production
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
