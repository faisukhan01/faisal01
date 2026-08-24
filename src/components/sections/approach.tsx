import { Code2, Package, MessagesSquare } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

const APPROACH = [
  {
    id: 1,
    icon: Package,
    title: 'Product mindset',
    description:
      'Every release is a product decision — scoped small, shipped complete, and measured honestly. No feature graveyards.',
  },
  {
    id: 2,
    icon: Code2,
    title: 'Engineering craft',
    description:
      'Type-safe end to end, tested where it matters, and deliberately boring technology chosen for how it fails, not how it demos.',
  },
  {
    id: 3,
    icon: MessagesSquare,
    title: 'Founders on support',
    description:
      'No ticket black holes and no account managers. The people who build the product are the people who answer for it.',
  },
];

export function Approach() {
  return (
    <section id="approach" className="bg-background py-24 md:py-28" aria-label="How we work">
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Approach
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              How two engineers run a software company.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              Small surface, short feedback loops, and a bias for shipping.
              Everything else is overhead we chose not to have.
            </p>
          </Reveal>
        </div>

        {/* Hairline editorial grid */}
        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
            {APPROACH.map((item, i) => (
              <article
                key={item.id}
                className="group relative bg-background p-8 transition-colors duration-500 hover:bg-white md:p-10"
              >
                <div className="flex items-start justify-between">
                  <item.icon
                    className="h-5 w-5 text-ink/45 transition-colors duration-500 group-hover:text-crimson"
                    aria-hidden="true"
                  />
                  <span className="tabular text-[11px] tracking-[0.2em] text-ink/25">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-[22px] leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
