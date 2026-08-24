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
import { Testimonials } from '@/components/sections/testimonials';
import { Insights } from '@/components/sections/insights';
import { CTABanner } from '@/components/sections/cta-banner';
import { Newsletter } from '@/components/sections/newsletter';
import { Footer } from '@/components/sections/footer';
import { ScrollToTop } from '@/components/site/scroll-to-top';
import { CookieConsent } from '@/components/site/cookie-consent';
import { CommandPalette } from '@/components/site/command-palette';
import { ReadingProgress } from '@/components/site/reading-progress';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ReadingProgress />
      <SiteHeader onSearchOpen={() => setSearchOpen(true)} />
      <main className="flex-1">
        <Hero />
        <BrandLogos />
        <TranscendPlatform />
        <WhoWeServe />
        <IndustriesWePower />
        <Differentiators />
        <StatsSection />
        <Leadership />
        <Testimonials />
        <Insights />
        <CTABanner />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
