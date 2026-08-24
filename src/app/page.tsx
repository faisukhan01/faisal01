'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { BrandLogos } from '@/components/sections/brand-logos';
import { TranscendPlatform } from '@/components/sections/transcend-platform';
import { WhoWeServe } from '@/components/sections/who-we-serve';
import { IndustriesWePower } from '@/components/sections/industries';
import { Differentiators } from '@/components/sections/differentiators';
import { StatsSection } from '@/components/sections/stats';
import { Leadership } from '@/components/sections/leadership';
import { Awards } from '@/components/sections/awards';
import { Sustainability } from '@/components/sections/sustainability';
import { Careers } from '@/components/sections/careers';
import { Testimonials } from '@/components/sections/testimonials';
import { Insights } from '@/components/sections/insights';
import { FAQ } from '@/components/sections/faq';
import { CTABanner } from '@/components/sections/cta-banner';
import { Newsletter } from '@/components/sections/newsletter';
import { Footer } from '@/components/sections/footer';
import { ScrollToTop } from '@/components/site/scroll-to-top';
import { CookieConsent } from '@/components/site/cookie-consent';
import { CommandPalette } from '@/components/site/command-palette';
import { ReadingProgress } from '@/components/site/reading-progress';
import { ScrollSpy } from '@/components/site/scrollspy';
import { PressTicker } from '@/components/site/press-ticker';
import { StockTicker } from '@/components/site/stock-ticker';
import { WaveDivider } from '@/components/site/wave-divider';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ReadingProgress />
      <PressTicker />
      <SiteHeader onSearchOpen={() => setSearchOpen(true)} />
      <main className="flex-1">
        <Hero />

        {/* Wave divider: hero (white) → brand-logos (white) */}
        <WaveDivider variant="wave-down" fill="#ffffff" background="#ffffff" height={48} className="-mt-12 lg:-mt-16" />

        <BrandLogos />
        <TranscendPlatform />
        <WhoWeServe />
        <IndustriesWePower />
        <Differentiators />
        <StatsSection />

        {/* Wave divider: stats (light bg) → awards (dark bg) */}
        <WaveDivider variant="wave-down" fill="#0f172a" background="#f5f7fa" height={64} />

        <Awards />

        <Leadership />
        <Sustainability />
        <Careers />

        {/* Wave divider: testimonials (light-blue bg) → insights (white) */}
        <Testimonials />
        <Insights />
        <FAQ />

        {/* Wave divider: FAQ (gradient bg) → CTA banner (white) */}
        <WaveDivider variant="wave-up" fill="#ffffff" background="#f5f7fa" height={48} className="-mt-12" />

        <CTABanner />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop />
      <ScrollSpy />
      <StockTicker />
      <CookieConsent />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
