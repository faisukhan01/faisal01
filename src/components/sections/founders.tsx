import Image from 'next/image';
import { Reveal } from '@/components/site/reveal';

const FOUNDERS = [
  {
    name: 'Faisal Khan',
    role: 'Co-Founder · Software Engineer',
    portrait: '/founders/faisal-khan.png',
  },
  {
    name: 'Abdul Qayyum',
    role: 'Co-Founder · Software Engineer',
    portrait: '/founders/abdul-qayyum.png',
  },
];

export function Founders() {
  return (
    <section id="founders" className="bg-background py-24 md:py-32" aria-label="Founders">
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Founders
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              The Fa and the Q.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              FaQ stands for its founders — Faisal and Qayyum, two software
              engineers who design, build, and operate everything themselves.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {FOUNDERS.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.08}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-hairline bg-white">
                  <Image
                    src={person.portrait}
                    alt={`Portrait of ${person.name}, ${person.role} at FaQ Systems`}
                    fill
                    sizes="(max-width: 640px) 100vw, 380px"
                    className="object-cover grayscale contrast-[1.04] transition-all duration-700 group-hover:scale-[1.025]"
                  />
                  {/* Quiet blue baseline on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-crimson/70 transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
                <h3 className="mt-5 font-serif text-[21px] leading-tight text-ink">
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
            <p className="eyebrow text-muted-foreground">Where we work</p>
            <p className="mt-1 text-[13.5px] text-ink/70">
              Remote-first · Shipping worldwide
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
