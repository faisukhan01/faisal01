import { SiteHeader } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { Products } from '@/components/sections/products';
import { Approach } from '@/components/sections/approach';
import { Principles } from '@/components/sections/principles';
import { Founders } from '@/components/sections/founders';
import { FAQ } from '@/components/sections/faq';
import { CTABanner } from '@/components/sections/cta-banner';
import { Footer } from '@/components/sections/footer';
import { CaseStudyRouter } from '@/components/case-study/case-study-router';

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <CaseStudyRouter>
        <main className="flex-1">
          <Hero />
          <Products />
          <Approach />
          <Principles />
          <Founders />
          <FAQ />
          <CTABanner />
        </main>
      </CaseStudyRouter>
      <Footer />
    </div>
  );
}
