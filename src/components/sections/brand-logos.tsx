'use client';

import { Reveal } from '@/components/site/reveal';
import { BrandWordmark } from '@/components/site/logo';
import { BRAND_LOGOS } from '@/lib/site-data';

export function BrandLogos() {
  // Duplicate for seamless infinite loop
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section
      className="relative w-full bg-white py-16 lg:py-20 overflow-hidden"
      aria-label="Brand logos"
    >
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal>
          <h2 className="text-center text-[24px] sm:text-[30px] lg:text-[34px] font-semibold tracking-tight text-[#161616] leading-snug">
            The world's leading brands are powered by{' '}
            <span className="text-[#1d81f2]">NETSOL</span>
          </h2>
          <p className="mt-3 text-center text-[15px] text-[#6b7280] max-w-[640px] mx-auto">
            200+ customers across 30+ countries trust our platforms to originate,
            service, and manage over half a trillion dollars in assets.
          </p>
        </Reveal>
      </div>

      {/* Edge fade */}
      <div className="relative mt-12">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent" />

        {/* Marquee */}
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-12 sm:gap-16 animate-marquee-left pr-12 sm:pr-16">
            {logos.map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center min-w-[120px] sm:min-w-[150px] h-[40px]"
              >
                <BrandWordmark name={name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[
          { v: '30+', l: 'Countries served' },
          { v: '14', l: 'Languages supported' },
          { v: '6', l: 'Global delivery centers' },
          { v: 'ISO 27001', l: 'Certified operations' },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="border-l-2 border-[#1d81f2]/20 pl-4">
              <div className="text-[22px] sm:text-[26px] font-bold text-[#161616] leading-none">
                {s.v}
              </div>
              <div className="mt-1.5 text-[12px] text-[#6b7280]">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
