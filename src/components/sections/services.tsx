'use client';

import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Globe,
  LayoutDashboard,
  Code2,
  RefreshCcw,
  Cloud,
  ArrowUpRight,
} from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom software systems built around real business requirements.',
    dark: false,
  },
  {
    icon: BrainCircuit,
    title: 'AI & Automation',
    description: 'Intelligent workflows that reduce repetitive work and improve efficiency.',
    dark: true,
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Modern, scalable and high-performance web applications.',
    dark: false,
  },
  {
    icon: LayoutDashboard,
    title: 'Business Systems',
    description: 'Custom dashboards, portals and internal business platforms.',
    dark: false,
  },
  {
    icon: RefreshCcw,
    title: 'Digital Transformation',
    description: 'Modernize outdated workflows with intelligent digital infrastructure.',
    dark: false,
  },
  {
    icon: Cloud,
    title: 'SaaS Development',
    description: 'Scalable SaaS products designed for modern businesses.',
    dark: false,
  },
];

export function Services() {
  return (
    <section id="services" className="bg-background py-20 md:py-28" aria-label="Services">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Services</p>
            <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink md:text-[36px]">
              Everything your business needs to operate smarter.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.7] text-muted-foreground">
              From a single automation to a full platform — scoped honestly,
              built end-to-end, and operated by the people who built it.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1080px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-shadow duration-500',
                  service.dark
                    ? 'border-night bg-night text-white shadow-[0_30px_70px_-30px_rgb(19_28_46/0.6)] hover:shadow-[0_36px_90px_-30px_rgb(0_122_255/0.45)]'
                    : 'border-hairline bg-white text-ink shadow-[0_6px_30px_-14px_rgb(26_35_50/0.1)] hover:border-crimson/25 hover:shadow-[0_26px_60px_-24px_rgb(0_122_255/0.3)]'
                )}
              >
                {service.dark && (
                  <>
                    <div
                      aria-hidden="true"
                      className="breathe pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-crimson/25 blur-3xl"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-[size:24px_24px]"
                    />
                  </>
                )}
                <div className="relative flex items-start justify-between">
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-500',
                      service.dark
                        ? 'bg-crimson/20 text-[#66b2ff] group-hover:bg-crimson group-hover:text-white'
                        : 'bg-crimson/10 text-crimson group-hover:bg-crimson group-hover:text-white'
                    )}
                  >
                    <service.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className={cn(
                      'h-4.5 w-4.5 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                      service.dark ? 'text-white/30 group-hover:text-white/80' : 'text-ink/20 group-hover:text-crimson'
                    )}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className={cn(
                    'relative mt-6 font-display text-[19px] font-bold tracking-tight',
                    service.dark ? 'text-white' : 'text-ink'
                  )}
                >
                  {service.title}
                </h3>
                <p
                  className={cn(
                    'relative mt-2.5 text-[13.5px] leading-[1.7]',
                    service.dark ? 'text-white/60' : 'text-muted-foreground'
                  )}
                >
                  {service.description}
                </p>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100',
                    service.dark ? 'bg-gradient-to-r from-crimson to-[#4da3ff]' : 'bg-gradient-to-r from-crimson to-[#0057b8]'
                  )}
                />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
