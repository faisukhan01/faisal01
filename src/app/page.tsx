'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { BrandLogos } from '@/components/sections/brand-logos';
import { TranscendPlatform } from '@/components/sections/transcend-platform';
import { ProductTourCTA } from '@/components/sections/product-tour-cta';
import { WhoWeServe } from '@/components/sections/who-we-serve';
import { IndustriesWePower } from '@/components/sections/industries';
import { Differentiators } from '@/components/sections/differentiators';
import { Solutions } from '@/components/sections/solutions';
import { StatsSection } from '@/components/sections/stats';
import { LivePulse } from '@/components/sections/live-pulse';
import { Comparison } from '@/components/sections/comparison';
import { Leadership } from '@/components/sections/leadership';
import { Awards } from '@/components/sections/awards';
import { Sustainability } from '@/components/sections/sustainability';
import { Careers } from '@/components/sections/careers';
import { Testimonials } from '@/components/sections/testimonials';
import { ROICalculator } from '@/components/sections/roi-calculator';
import { Insights } from '@/components/sections/insights';
import { Glossary } from '@/components/sections/glossary';
import { FAQ } from '@/components/sections/faq';
import { InvestorRelations } from '@/components/sections/investor-relations';
import { PressCenter } from '@/components/sections/press-center';
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

        {/* NEW (Round 6): Interactive Product Tour — premium guided walkthrough */}
        <ProductTourCTA />

        <WhoWeServe />
        <IndustriesWePower />
        <Differentiators />

        {/* NEW (Round 5): Solutions / Customer Stories — case studies grid */}
        <Solutions />

        <StatsSection />

        {/* NEW (Round 6): Live Operations Pulse — animated real-time-feel metrics */}
        <LivePulse />

        {/* NEW (Round 5): Comparison table — Transcend vs Legacy / On-prem / Custom */}
        <Comparison />

        {/* Wave divider: comparison (white) → awards (dark bg) */}
        <WaveDivider variant="wave-down" fill="#0f172a" background="#ffffff" height={48} />

        <Awards />

        <Leadership />
        <Sustainability />
        <Careers />

        <Testimonials />

        {/* NEW (Round 5): Interactive ROI Calculator — premium dark widget */}
        <ROICalculator />

        {/* NEW (Round 7): Investor Relations — NTWK financial KPIs + share price snapshot */}
        <InvestorRelations />

        {/* NEW (Round 7): Press / Media Center archive */}
        <PressCenter />

        <Insights />

        {/* NEW (Round 6): Knowledge Hub — searchable glossary */}
        <Glossary />

        <FAQ />

        {/* Wave divider: FAQ (gradient bg) → CTA banner (white) */}
        <WaveDivider variant="wave-up" fill="#ffffff" background="#0f172a" height={48} className="-mt-12" />

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
