import { BRAND_LOGOS } from '@/lib/site-data';
import { BrandWordmark } from '@/components/site/logo';
import { Reveal } from '@/components/site/reveal';

export function BrandLogos() {
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section className="bg-background py-16 md:py-20" aria-label="Customer logos">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow text-center text-muted-foreground">
            Trusted by the world&rsquo;s leading asset finance companies
          </p>
        </Reveal>
      </div>

      <div className="marquee-hover-pause mask-fade-x mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {logos.map((name, i) => (
            <div key={`${name}-${i}`} className="shrink-0 px-8 md:px-10">
              <BrandWordmark name={name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
