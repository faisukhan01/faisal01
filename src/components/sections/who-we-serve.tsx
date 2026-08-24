import { Building2, CarFront, Network } from 'lucide-react';
import { WHO_WE_SERVE } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';

const ICONS = {
  building: Building2,
  car: CarFront,
  network: Network,
} as const;

const ASSET_CLASSES = [
  'Automotive',
  'Equipment',
  'Fleet & Mobility',
  'Marine & Aviation',
  'Energy & Renewables',
  'Banking & Lessor',
];

export function WhoWeServe() {
  return (
    <section id="who" className="bg-background py-24 md:py-28" aria-label="Who we serve">
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Who we serve
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              Built for every side of the ecosystem.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              From the captive that finances the asset, to the OEM that builds
              it, to the broker that distributes it — one platform keeps every
              party in agreement.
            </p>
          </Reveal>
        </div>

        {/* Hairline editorial grid */}
        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
            {WHO_WE_SERVE.map((audience, i) => {
              const Icon = ICONS[audience.icon as keyof typeof ICONS] ?? Building2;
              return (
                <article
                  key={audience.id}
                  className="group relative bg-background p-8 transition-colors duration-500 hover:bg-white md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      className="h-5 w-5 text-ink/45 transition-colors duration-500 group-hover:text-crimson"
                      aria-hidden="true"
                    />
                    <span className="tabular text-[11px] tracking-[0.2em] text-ink/25">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-[22px] leading-tight text-ink">
                    {audience.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                    {audience.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>

        {/* Asset-class line — quiet footnote of industries */}
        <Reveal delay={0.12}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-center text-[13px] text-muted-foreground">
            <span className="eyebrow mr-1 text-ink/40">Every asset class</span>
            {ASSET_CLASSES.map((asset) => (
              <span key={asset} className="inline-flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-crimson/60" />
                {asset}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
