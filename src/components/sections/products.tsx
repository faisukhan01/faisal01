import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

const PRODUCTS = [
  {
    id: 'core',
    motif: 'finance',
    title: 'FaQ Core',
    tag: 'Flagship',
    description:
      'Our flagship SaaS platform — a focused system that turns repetitive team workflows into one calm, reliable product. Multi-tenant from day one.',
    points: ['Multi-tenant', 'REST API', 'Role-based access', 'Audit trail'],
  },
  {
    id: 'toolkit',
    motif: 'marketplace',
    title: 'FaQ Toolkit',
    tag: 'Productized',
    description:
      'The internal tools we built for ourselves — hardened, documented, and offered as subscriptions. CLI, automations, and integrations included.',
    points: ['CLI', 'Automations', 'Integrations', 'Templates'],
  },
  {
    id: 'labs',
    motif: 'ai-labs',
    title: 'FaQ Labs',
    tag: 'Incubating',
    description:
      'Early-stage experiments and small bets on uncomfortable problems. Some will graduate into products — most will teach us something first.',
    points: ['Prototypes', 'AI tooling', 'Research', 'Open source'],
  },
];

/* — Abstract line-art motifs, one per product ————————————— */
function Motif({ id, className }: { id: string; className?: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const accent = { fill: 'none', stroke: '#007AFF', strokeWidth: 1.5, strokeLinecap: 'round' as const };

  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      {id === 'finance' && (
        <g {...common}>
          <path d="M32 92h96" />
          <rect x="42" y="70" width="13" height="22" rx="2" />
          <rect x="64" y="56" width="13" height="36" rx="2" />
          <rect x="86" y="62" width="13" height="30" rx="2" />
          <rect x="108" y="40" width="13" height="52" rx="2" />
          <path {...accent} d="M40 52l26-14 24 10 34-20" />
        </g>
      )}
      {id === 'marketplace' && (
        <g {...common}>
          <rect x="40" y="24" width="24" height="24" rx="3" />
          <rect x="68" y="24" width="24" height="24" rx="3" stroke="#007AFF" />
          <rect x="96" y="24" width="24" height="24" rx="3" />
          <rect x="40" y="52" width="24" height="24" rx="3" stroke="#007AFF" />
          <rect x="68" y="52" width="24" height="24" rx="3" />
          <rect x="96" y="52" width="24" height="24" rx="3" />
          <rect x="40" y="80" width="24" height="18" rx="3" />
          <rect x="68" y="80" width="24" height="18" rx="3" stroke="#007AFF" />
          <rect x="96" y="80" width="24" height="18" rx="3" />
        </g>
      )}
      {id === 'ai-labs' && (
        <g {...common}>
          <path d="M58 44L44 30M80 44V26M102 44l14-14M58 76L44 90M80 76V94M102 76l14 14M58 44h44M58 44v32M102 44v32M58 76h44" />
          <circle cx="80" cy="60" r="6" stroke="#007AFF" />
          <circle cx="44" cy="30" r="3.5" />
          <circle cx="116" cy="30" r="3.5" />
          <circle cx="44" cy="90" r="3.5" />
          <circle cx="116" cy="90" r="3.5" />
          <circle cx="80" cy="26" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="80" cy="94" r="2.5" fill="currentColor" stroke="none" />
        </g>
      )}
    </svg>
  );
}

/* — Section: three products, one standard ——————————————————— */
export function Products() {
  return (
    <section
      id="products"
      className="border-y border-hairline bg-white py-24 md:py-32"
      aria-label="Products"
    >
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              Products
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              Three products. One standard.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              A flagship platform, a productized toolkit, and a lab for what
              comes next — each built, shipped, and supported by the founders.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <article
                key={product.id}
                className="group flex min-h-[300px] flex-col bg-white p-8 transition-colors duration-500 hover:bg-cream md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="tabular text-[11px] tracking-[0.2em] text-ink/30">
                    0{i + 1}
                  </span>
                  <Motif id={product.motif} className="h-16 w-24 text-ink/40" />
                </div>

                <p className="mt-7 eyebrow text-[9.5px] text-crimson">{product.tag}</p>
                <h3 className="mt-2 font-serif text-[22px] leading-tight text-ink">
                  {product.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                  {product.description}
                </p>

                <ul className="mt-auto grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-hairline pt-5">
                  {product.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-[12.5px] text-ink/70"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 rounded-full bg-crimson"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
