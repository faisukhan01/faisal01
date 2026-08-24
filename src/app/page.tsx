import { SiteHeader } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { BrandLogos } from '@/components/sections/brand-logos';
import { TranscendPlatform } from '@/components/sections/transcend-platform';
import { WhoWeServe } from '@/components/sections/who-we-serve';
import { StatsSection } from '@/components/sections/stats';
import { Solutions } from '@/components/sections/solutions';
import { Testimonials } from '@/components/sections/testimonials';
import { Leadership } from '@/components/sections/leadership';
import { Insights } from '@/components/sections/insights';
import { FAQ } from '@/components/sections/faq';
import { CTABanner } from '@/components/sections/cta-banner';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <BrandLogos />
        <TranscendPlatform />
        <WhoWeServe />
        <StatsSection />
        <Solutions />
        <Testimonials />
        <Leadership />
        <Insights />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
