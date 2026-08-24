'use client';

import dynamic from 'next/dynamic';
import { Reveal } from '@/components/site/reveal';
import { Counter } from '@/components/site/counter';
import { STATS } from '@/lib/site-data';

const StatsScene3D = dynamic(
  () => import('@/components/three/scenes').then((m) => m.StatsScene3D),
  { ssr: false }
);

export function StatsSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#f5f7fa] py-20 lg:py-28 overflow-hidden"
      aria-label="Technology partner"
    >
      {/* Faint background image */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1492144534245-b3aa4f9b9e9b?auto=format&fit=crop&w=2000&q=60)',
        }}
      />
      <div className="absolute inset-0 bg-barcode opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: text + 3D globe */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-7 w-[2px] bg-[#1d81f2]" />
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                Technology Partner
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight max-w-[640px]">
              Technology partner to the world's leading brands
            </h2>
            <p className="mt-5 text-[15px] lg:text-[17px] text-[#525252] leading-[1.65] max-w-[620px]">
              For more than two decades, NETSOL has been the quiet infrastructure
              behind the world's most recognised captives, banks, OEMs and
              dealers. We originate, service and remarket assets across
              automotive, equipment, and fleet — on six continents, in fourteen
              languages.
            </p>
            <p className="mt-4 text-[15px] lg:text-[17px] text-[#525252] leading-[1.65] max-w-[620px]">
              From our delivery centers in Los Angeles, London, Bangkok, Beijing,
              Lahore and Sydney, we operate 24/7 — so your contracts never sleep,
              and your customers never wait.
            </p>
          </Reveal>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border-l-2 border-[#1d81f2]/30 pl-4">
                  <div className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-none text-[#1d81f2] tracking-tight">
                    {s.prefix}
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[13px] sm:text-[14px] text-[#525252] leading-snug">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: 3D globe */}
        <div className="lg:col-span-5 h-[320px] sm:h-[420px] lg:h-[500px]">
          <StatsScene3D />
        </div>
      </div>
    </section>
  );
}
