import { SiteHeader } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { Products } from '@/components/sections/products';
import { Services } from '@/components/sections/services';
import { Founders } from '@/components/sections/founders';
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
          <Services />
          <Founders />
          <CTABanner />
        </main>
      </CaseStudyRouter>
      <Footer />
    </div>
  );
}
