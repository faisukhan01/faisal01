import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CodeBackdrop } from '@/components/site/code-backdrop';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Living code atmosphere — a scrolling ghost editor filling the whole
          hero (header zone included), with a soft clearing around the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_45%_30%_at_50%_50%,transparent_0%,transparent_42%,black_80%)]"
      >
        <CodeBackdrop className="h-full w-full" />
      </div>

      <div className="container-luxe relative z-10 flex min-h-[70svh] flex-col items-center justify-center pb-16 pt-28 text-center md:pb-20 md:pt-32">
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
      </div>
    </section>
  );
}
