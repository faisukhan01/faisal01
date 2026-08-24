import { ArrowRight } from 'lucide-react';
import { TRANSCEND_TABS } from '@/lib/site-data';
import { Reveal } from '@/components/site/reveal';

/* — Abstract line-art motifs, one per module ——————————————— */
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
      {id === 'digital-retail' && (
        <g {...common}>
          <rect x="30" y="20" width="100" height="76" rx="6" />
          <path d="M30 36h100" />
          <circle cx="38" cy="28" r="1.6" fill="currentColor" />
          <circle cx="45" cy="28" r="1.6" fill="currentColor" />
          <path {...accent} d="M54 82c16-26 40-32 58-18" />
          <circle cx="54" cy="82" r="3" fill="currentColor" stroke="none" />
          <circle cx="112" cy="64" r="3" fill="currentColor" stroke="none" />
        </g>
      )}
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
      {id === 'consultancy' && (
        <g {...common}>
          <circle cx="80" cy="60" r="34" strokeDasharray="3 5" />
          <circle cx="80" cy="60" r="22" />
          <path {...accent} d="M80 60l16-16" />
          <circle cx="80" cy="60" r="2.5" fill="currentColor" stroke="none" />
          <path d="M80 18v-6M80 102v6M38 60h-6M128 60h6" />
        </g>
      )}
    </svg>
  );
}

/* — Section: five modules in a calm static grid ——————————————————— */
export function TranscendPlatform() {
  return (
    <section
      id="platform"
      className="border-y border-hairline bg-white py-24 md:py-32"
      aria-label="The Transcend Platform"
    >
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-muted-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-crimson" />
              The Transcend Platform
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-ink md:text-5xl">
              One platform, every stage of the asset lifecycle.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:ml-auto">
              Five modules, one data model. Transcend composes digital retail,
              finance, applied AI, marketplace, and consultancy into a single
              system of record.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {TRANSCEND_TABS.map((module, i) => (
              <article
                key={module.id}
                className="group flex min-h-[300px] flex-col bg-white p-8 transition-colors duration-500 hover:bg-cream md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="tabular text-[11px] tracking-[0.2em] text-ink/30">
                    0{i + 1}
                  </span>
                  <Motif id={module.id} className="h-16 w-24 text-ink/40" />
                </div>

                <h3 className="mt-7 font-serif text-[22px] leading-tight text-ink">
                  {module.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-muted-foreground">
                  {module.description}
                </p>

                <ul className="mt-auto grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-hairline pt-5">
                  {module.categories.slice(0, 4).map((cat) => (
                    <li
                      key={cat}
                      className="flex items-center gap-2.5 text-[12.5px] text-ink/70"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 rounded-full bg-crimson"
                      />
                      {cat}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            {/* Quiet filler cell — completes the grid */}
            <a
              href="#contact"
              className="group flex min-h-[300px] flex-col justify-between bg-cream p-8 transition-colors duration-500 hover:bg-[#f0eee6] md:p-9"
            >
              <span className="eyebrow text-muted-foreground">One mesh</span>
              <div>
                <p className="font-serif text-[22px] leading-snug text-ink">
                  Plus 40+ Marketplace modules, ready when you are.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/70 transition-colors group-hover:text-ink">
                  <span className="link-underline">Extend the platform</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
