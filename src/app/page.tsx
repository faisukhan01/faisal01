'use client';

import { SiteHeader } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { BrandLogos } from '@/components/sections/brand-logos';
import { TranscendPlatform } from '@/components/sections/transcend-platform';
import { WhoWeServe } from '@/components/sections/who-we-serve';
import { StatsSection } from '@/components/sections/stats';
import { Testimonials } from '@/components/sections/testimonials';
import { Insights } from '@/components/sections/insights';
import { CTABanner } from '@/components/sections/cta-banner';
import { Newsletter } from '@/components/sections/newsletter';
import { Footer } from '@/components/sections/footer';
import { ScrollToTop } from '@/components/site/scroll-to-top';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <BrandLogos />
        <TranscendPlatform />
        <WhoWeServe />
        <StatsSection />
        <Testimonials />
        <Insights />
        <CTABanner />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
