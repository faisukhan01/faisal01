'use client';

import { Reveal } from '@/components/site/reveal';
import { BrandWordmark } from '@/components/site/logo';
import { BRAND_LOGOS } from '@/lib/site-data';

export function BrandLogos() {
  // Duplicate for seamless infinite loop
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  // Edge mask: fades the marquee wrapper on left/right edges so the loop seam
  // is invisible — applied via inline style on the wrapper.
  const edgeMask = {
    maskImage:
      'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage:
      'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
  } as const;

  return (
    <section
      className="relative w-full bg-white py-16 lg:py-20 overflow-hidden"
      aria-label="Brand logos"
    >
      {/* Section background — premium spotlight overlay */}
      <div
        aria-hidden
        className="spotlight-gradient pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <Reveal className="flex flex-col items-center text-center">
          {/* Premium heading chip */}
          <span className="section-heading-chip">
            <span
              aria-hidden
              className="category-dot text-[#1d81f2]"
            />
            TRUSTED BY
          </span>
          <h2 className="mt-4 text-[24px] sm:text-[30px] lg:text-[34px] font-semibold tracking-tight text-[#161616] leading-snug">
            The world&apos;s leading brands are powered by{' '}
            <span className="text-[#1d81f2]">NETSOL</span>
          </h2>
          {/* Premium gradient hairline under heading */}
          <div aria-hidden className="section-rule mt-4" />
          <p className="mt-4 text-[15px] text-[#6b7280] max-w-[640px]">
            200+ customers across 30+ countries trust our platforms to
            originate, service, and manage over half a trillion dollars in
            assets.
          </p>
        </Reveal>
      </div>

      {/* Marquee row with edge gradient mask + decorative direction indicators */}
      <div className="relative mt-12">
        {/* Direction indicator — LEFT (decorative, with live pulse-dot accent) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-3 sm:left-6 top-1/2 z-20 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-[#e0e0e0] bg-white/85 px-2.5 py-1 shadow-depth backdrop-blur-sm"
        >
          <span className="live-pulse-dot h-1.5 w-1.5 rounded-full bg-[#1d81f2]" />
          <span className="text-[14px] leading-none font-semibold text-[#1d81f2]">
            ←
          </span>
        </div>
        {/* Direction indicator — RIGHT (decorative, with live pulse-dot accent) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-3 sm:right-6 top-1/2 z-20 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-[#e0e0e0] bg-white/85 px-2.5 py-1 shadow-depth backdrop-blur-sm"
        >
          <span className="text-[14px] leading-none font-semibold text-[#1d81f2]">
            →
          </span>
          <span className="live-pulse-dot h-1.5 w-1.5 rounded-full bg-[#1d81f2]" />
        </div>

        {/* Marquee wrapper — shadow + edge gradient mask */}
        <div
          className="relative rounded-2xl bg-[#f5f7fa]/60 shadow-depth"
          style={edgeMask}
        >
          <div className="flex overflow-hidden py-3">
            <div className="flex shrink-0 items-center gap-3 sm:gap-4 animate-marquee-left pr-3 sm:pr-4">
              {logos.map((name, i) => (
                <div
                  key={i}
                  className="lift-on-hover gradient-border-animated flex h-[40px] min-w-[120px] items-center justify-center gap-2 rounded-full bg-white px-4 sm:min-w-[150px] sm:px-5"
                >
                  {/* Subtle accent dot before brand name */}
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[#1d81f2]/70"
                  />
                  <BrandWordmark name={name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip — premium gradient-border cards */}
      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[
          { v: '30+', l: 'Countries served' },
          { v: '14', l: 'Languages supported' },
          { v: '6', l: 'Global delivery centers' },
          { v: 'ISO 27001', l: 'Certified operations' },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="gradient-border-card lift-on-hover flex h-full flex-col rounded-2xl bg-white p-5 shadow-depth">
              <div className="text-[22px] sm:text-[26px] font-bold leading-none text-gradient-animated font-mono-numeric">
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
