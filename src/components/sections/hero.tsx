import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

const TRUST_STATS = [
  { value: '2', label: 'Founders' },
  { value: '3', label: 'Products' },
  { value: '100%', label: 'Engineer-built' },
];

/**
 * Static orbital line-art — thin concentric rings, two orbital ellipses,
 * one dashed crimson arc, quiet nodes. Zero JavaScript, zero animation.
 */
function OrbitalArt() {
  return (
    <svg
      viewBox="0 0 720 480"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Axes */}
      <line x1="360" y1="28" x2="360" y2="452" stroke="#1A2332" strokeOpacity="0.06" strokeWidth="1" />
      <line x1="52" y1="240" x2="668" y2="240" stroke="#1A2332" strokeOpacity="0.06" strokeWidth="1" />

      {/* Concentric rings */}
      <circle cx="360" cy="240" r="70" fill="none" stroke="#1A2332" strokeOpacity="0.13" strokeWidth="1" />
      <circle cx="360" cy="240" r="130" fill="none" stroke="#1A2332" strokeOpacity="0.10" strokeWidth="1" />
      <circle cx="360" cy="240" r="190" fill="none" stroke="#1A2332" strokeOpacity="0.08" strokeWidth="1" />

      {/* Orbital ellipses */}
      <ellipse
        cx="360" cy="240" rx="238" ry="86"
        fill="none" stroke="#1A2332" strokeOpacity="0.12" strokeWidth="1"
        transform="rotate(-16 360 240)"
      />
      <ellipse
        cx="360" cy="240" rx="238" ry="86"
        fill="none" stroke="#1A2332" strokeOpacity="0.12" strokeWidth="1"
        transform="rotate(16 360 240)"
      />

      {/* Single crimson arc segment */}
      <circle
        cx="360" cy="240" r="160"
        fill="none" stroke="#007AFF" strokeOpacity="0.42" strokeWidth="1.25"
        strokeDasharray="185 820" strokeLinecap="round"
        transform="rotate(-32 360 240)"
      />

      {/* Center */}
      <circle cx="360" cy="240" r="5" fill="#1A2332" />

      {/* Nodes */}
      <circle cx="430" cy="240" r="3.5" fill="#1A2332" fillOpacity="0.55" />
      <circle cx="360" cy="110" r="3.5" fill="#1A2332" fillOpacity="0.55" />
      <circle cx="170" cy="240" r="3.5" fill="#1A2332" fillOpacity="0.55" />
      <circle cx="502" cy="196" r="3" fill="#1A2332" fillOpacity="0.4" />
      <circle cx="236" cy="296" r="3" fill="#1A2332" fillOpacity="0.4" />
      <circle cx="268" cy="148" r="3" fill="#1A2332" fillOpacity="0.4" />
      <circle cx="360" cy="400" r="4.5" fill="#007AFF" fillOpacity="0.75" />

      {/* Corner registration ticks */}
      <g stroke="#1A2332" strokeOpacity="0.22" strokeWidth="1">
        <path d="M44 40h12M50 34v12" />
        <path d="M664 40h12M670 34v12" />
        <path d="M44 440h12M50 434v12" />
        <path d="M664 440h12M670 434v12" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <div className="container-luxe relative pb-16 pt-32 text-center md:pb-24 md:pt-44">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-hairline" />
            <p className="eyebrow text-muted-foreground">
              A productized software company
            </p>
            <span aria-hidden="true" className="h-px w-10 bg-hairline" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-7 max-w-4xl font-serif text-[46px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl md:text-7xl lg:text-[84px]">
            Shaping <em className="font-light italic text-crimson">smarter</em>
            <br className="hidden sm:block" /> software.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.75] text-muted-foreground md:text-base">
            FaQ Systems builds focused SaaS products — designed, engineered,
            and operated end-to-end by its two founders. Small surface,
            polished detail, honest pricing.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <a href="#contact" className="btn-primary h-12 px-7 text-sm">
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#products"
              className="link-underline text-[14px] font-medium text-ink/75 transition-colors hover:text-ink"
            >
              See what we&rsquo;re building
            </a>
          </div>
        </Reveal>

        {/* — The framed showpiece: static orbital line art — */}
        <Reveal delay={0.18} y={36} className="mt-14 md:mt-20">
          <figure className="relative overflow-hidden rounded-2xl border border-hairline bg-gradient-to-b from-white to-[#EDF2FA] shadow-[0_48px_100px_-44px_rgb(26 35 50/0.3)]">
            {/* Blueprint micro-labels */}
            <span className="eyebrow absolute left-5 top-5 z-10 text-ink/35">
              FaQ Systems
            </span>
            <span className="eyebrow absolute right-5 top-5 z-10 hidden text-ink/35 sm:block">
              Engineer-built · SaaS
            </span>

            <OrbitalArt />

            {/* Trust strip */}
            <figcaption className="relative z-10 grid grid-cols-3 divide-x divide-hairline border-t border-hairline bg-cream/70 backdrop-blur-sm">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="px-4 py-4 text-center md:py-5">
                  <div className="tabular font-serif text-lg text-ink md:text-[22px]">
                    {stat.value}
                  </div>
                  <div className="eyebrow mt-1 text-[9.5px] text-muted-foreground/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
