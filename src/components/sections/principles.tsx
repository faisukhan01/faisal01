import { Reveal } from '@/components/site/reveal';

const PRINCIPLES = [
  {
    title: 'Small, on purpose',
    metric: '2',
    line: 'founders who design, build, and support every product themselves.',
  },
  {
    title: 'Ship weekly',
    metric: '52+',
    line: 'releases a year — small scopes, shipped complete, measured honestly.',
  },
  {
    title: 'Own the whole stack',
    metric: 'E2E',
    line: 'from design to deployment — no handoffs, no outsourcing, no black boxes.',
  },
  {
    title: 'No lock-in',
    metric: '0',
    line: 'exit clauses buried in contracts. Your data exports in one click.',
  },
];

export function Principles() {
  return (
    <section
      className="relative overflow-hidden bg-night py-24 text-cream md:py-32"
      aria-label="Principles"
    >
      <div className="container-luxe relative">
        <Reveal className="text-center">
          <p className="eyebrow text-cream/45">Principles</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] md:text-5xl">
            Small, on purpose.
          </h2>
        </Reveal>

        {/* Big serif numbers */}
        <div className="mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-cream/10">
          {PRINCIPLES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="px-2 text-center md:px-8">
                <div className="font-serif text-[44px] leading-none tracking-[-0.01em] md:text-[56px]">
                  {item.metric}
                </div>
                <p className="eyebrow mt-4 text-cream/50">{item.title}</p>
                <p className="mx-auto mt-3 max-w-[220px] text-[12.5px] leading-[1.65] text-cream/45">
                  {item.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 text-center text-[11.5px] tracking-[0.08em] text-cream/35">
            Remote-first · Self-funded · Engineer-led
          </p>
        </Reveal>
      </div>
    </section>
  );
}
