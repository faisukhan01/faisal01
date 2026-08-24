import Image from 'next/image';
import { Reveal } from '@/components/site/reveal';

const LEADERS = [
  {
    name: 'Najeeb Ghauri',
    role: 'Founder & Chief Executive Officer',
    portrait: '/leadership/najeeb-ghauri.png',
  },
  {
    name: 'Aamir Khan',
    role: 'Chief Technology Officer',
    portrait: '/leadership/aamir-khan.png',
  },
  {
    name: 'Roger A. Bentley',
    role: 'Chief Financial Officer',
    portrait: '/leadership/roger-bentley.png',
  },
  {
    name: 'Salim Ghauri',
    role: 'Chairman, NETSOL Asia Pacific',
    portrait: '/leadership/salim-ghauri.png',
  },
];

const OFFICES = ['Los Angeles', 'London', 'Beijing', 'Bangkok', 'Lahore', 'Manila'];

export function Leadership() {
  return (
    <section id="company" className="bg-background py-24 md:py-32" aria-label="Leadership">
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Leadership
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              The people behind the platform.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              Four decades of combined asset-finance leadership, anchored across
              six global delivery centers supporting customers in 30+ countries.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {LEADERS.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.07}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-hairline bg-white">
                  <Image
                    src={person.portrait}
                    alt={`Portrait of ${person.name}, ${person.role}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale contrast-[1.04] transition-all duration-700 group-hover:scale-[1.025]"
                  />
                  {/* Quiet crimson baseline on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-crimson/70 transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
                <h3 className="mt-5 font-serif text-[19px] leading-tight text-ink">
                  {person.name}
                </h3>
                <p className="mt-1.5 text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  {person.role}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col items-center gap-3 border-t border-hairline pt-10 text-center">
            <p className="eyebrow text-muted-foreground">Global presence</p>
            <p className="mt-1 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13.5px] text-ink/70">
              {OFFICES.map((city, i) => (
                <span key={city} className="inline-flex items-center gap-2.5">
                  {i > 0 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-crimson/60" />
                  )}
                  {city}
                </span>
              ))}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
