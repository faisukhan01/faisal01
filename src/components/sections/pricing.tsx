'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

/* ————————————————————————————————————————————————
   Pricing — productized SaaS plans.
   One price covers design, build AND operations.
   ———————————————————————————————————————————————— */

interface Plan {
  name: string;
  tagline: string;
  price: number | null; // null → custom
  cta: { label: string; href: string };
  featured?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'One workflow, fully handled.',
    price: 230,
    cta: { label: 'Start with Starter', href: '#contact' },
    features: [
      '1 product module — your pick',
      'Up to 250 users',
      'Standard integrations',
      'Email support · 48h response',
      '99.5% uptime SLA',
    ],
  },
  {
    name: 'Growth',
    tagline: 'Run the whole operation.',
    price: 500,
    cta: { label: 'Scale with Growth', href: '#contact' },
    featured: true,
    features: [
      'Up to 4 product modules',
      'Up to 5,000 users',
      'Biometric & device integrations',
      'Priority support · 12h response',
      '99.9% uptime SLA',
      'Quarterly roadmap review',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'Your infrastructure. Our engineers.',
    price: null,
    cta: { label: 'Talk to us', href: '#contact' },
    features: [
      'Unlimited modules & users',
      'Dedicated environment & SLA',
      'Custom integrations & compliance',
      'Direct line to the founders',
      'White-glove migration',
    ],
  },
];

const INCLUDED = [
  'Deployment & hosting',
  '24/7 monitoring',
  'Automated backups',
  'Continuous updates',
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-y border-hairline bg-cream/60 py-20 md:py-28"
      aria-label="Pricing"
    >
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Pricing
            </p>
            <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink md:text-[36px]">
              Productized. <span className="text-crimson">Predictable.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.7] text-muted-foreground">
              One price covers design, build and operations — no agencies, no
              handoffs, no surprise invoices.
            </p>
          </Reveal>
        </div>

        {/* cards */}
        <div className="mx-auto mt-12 grid max-w-[1080px] items-stretch gap-6 md:mt-14 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className={cn(
                  'relative flex h-full flex-col rounded-[1.6rem] border p-7 transition-shadow duration-500 md:p-8',
                  plan.featured
                    ? 'border-ink bg-ink shadow-[0_44px_110px_-32px_rgb(26_35_50/0.65)]'
                    : 'border-hairline bg-white shadow-[0_6px_30px_-14px_rgb(26_35_50/0.12)] hover:shadow-[0_28px_70px_-26px_rgb(26_35_50/0.25)]'
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-crimson px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_26px_-8px_rgb(0_122_255/0.7)]">
                    Most popular
                  </span>
                )}

                <div className="flex items-baseline justify-between">
                  <h3
                    className={cn(
                      'font-display text-[21px] font-extrabold tracking-tight',
                      plan.featured ? 'text-white' : 'text-ink'
                    )}
                  >
                    {plan.name}
                  </h3>
                  <span
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.18em]',
                      plan.featured ? 'text-white/40' : 'text-ink/35'
                    )}
                  >
                    0{i + 1}
                  </span>
                </div>
                <p
                  className={cn(
                    'mt-1.5 text-[13px]',
                    plan.featured ? 'text-white/60' : 'text-muted-foreground'
                  )}
                >
                  {plan.tagline}
                </p>

                <div className="mt-7 flex items-baseline gap-1.5">
                  {plan.price !== null ? (
                    <>
                      <span
                        className={cn(
                          'font-display text-[24px] font-extrabold leading-none tracking-tight',
                          plan.featured ? 'text-white/60' : 'text-ink/50'
                        )}
                      >
                        $
                      </span>
                      <span
                        className={cn(
                          'tabular font-display text-[46px] font-extrabold leading-none tracking-tight',
                          plan.featured ? 'text-white' : 'text-ink'
                        )}
                      >
                        {plan.price.toLocaleString('en-US')}
                      </span>
                    </>
                  ) : (
                    <span
                      className={cn(
                        'font-display text-[38px] font-extrabold leading-none tracking-tight',
                        plan.featured ? 'text-white' : 'text-ink'
                      )}
                    >
                      Custom
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-2 text-[11.5px]',
                    plan.featured ? 'text-white/50' : 'text-muted-foreground/80'
                  )}
                >
                  {plan.price !== null ? 'Flat rate · everything included' : 'Scoped to your infrastructure'}
                </p>

                <ul
                  className={cn(
                    'mt-7 flex flex-col gap-3 border-t pt-7',
                    plan.featured ? 'border-white/10' : 'border-hairline'
                  )}
                >
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full',
                          plan.featured ? 'bg-crimson/20 text-crimson' : 'bg-crimson/[0.09] text-crimson'
                        )}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span
                        className={cn(
                          'text-[13.5px] leading-snug',
                          plan.featured ? 'text-white/85' : 'text-ink/80'
                        )}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <a
                    href={plan.cta.href}
                    className={cn(
                      'group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[13.5px] font-semibold transition-all duration-300',
                      plan.featured
                        ? 'bg-crimson text-white hover:-translate-y-0.5 hover:bg-[#0069e0] hover:shadow-[0_18px_44px_-16px_rgb(0_122_255/0.65)]'
                        : 'border border-ink/15 bg-white text-ink hover:border-ink/30 hover:shadow-[0_18px_44px_-20px_rgb(26_35_50/0.35)]'
                    )}
                  >
                    {plan.cta.label}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* included strip */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 flex max-w-[1080px] flex-col items-center justify-between gap-4 rounded-2xl border border-hairline bg-white/70 px-6 py-5 sm:flex-row md:mt-12">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink/50">
              Every plan includes
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-ink/70">
                  <Check className="h-3.5 w-3.5 text-crimson" strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-center text-[12.5px] text-muted-foreground/80">
            14-day pilot — see your own data inside the system before you
            commit to anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
