'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

const FOUNDERS = [
  {
    index: '01',
    name: 'Faisal Khan',
    role: 'Co-Founder · Software Engineer',
    photo: '/founders/faisal-khan.png',
    quote: 'Build the system you\u2019d want to inherit.',
    bio: 'Faisal architects FaQ Systems\u2019 platforms end-to-end — from the first schema to the live deploy. He leads product and full-stack engineering across Concordia and Staffist.',
    focus: ['Platform architecture', 'Product design', 'Full-stack engineering'],
    link: { label: 'faisal@faq.systems', href: 'mailto:faisal@faq.systems' },
  },
  {
    index: '02',
    name: 'Abdul Qayyum',
    role: 'Co-Founder · Software Engineer',
    photo: '/founders/abdul-qayyum-2.png',
    quote: 'Boring reliability is a feature.',
    bio: 'Qayyum builds the engines under the surface — data models, integrations and automations that keep thousands of records consistent. He leads backend and systems engineering.',
    focus: ['Systems engineering', 'Data architecture', 'Automation'],
    link: { label: 'qayyum@faq.systems', href: 'mailto:qayyum@faq.systems' },
  },
];

export function Founders() {
  return (
    <section id="founders" className="bg-background py-20 md:py-28" aria-label="Founders">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Founders
            </p>
            <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink md:text-[36px]">
              The{' '}
              <span className="font-serif font-normal italic">Fa</span> and
              the{' '}
              <span className="font-serif font-normal italic">Q</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.7] text-muted-foreground">
              FaQ stands for its founders — two engineers with an
              entrepreneurial mindset who design, build and operate everything
              themselves.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-[1060px] space-y-20 md:mt-20 md:space-y-24">
          {FOUNDERS.map((person, i) => {
            const flipped = i % 2 === 1;
            return (
              <div key={person.name}>
                <Reveal>
                  <div
                    className={cn(
                      'grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14',
                      flipped && 'md:[&>*:first-child]:order-2'
                    )}
                  >
                    {/* — Portrait: large, clean, no chrome — */}
                    <motion.div
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                      className="group relative mx-auto w-full max-w-[380px]"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-[0_32px_80px_-28px_rgb(26_35_50/0.4)]">
                        <Image
                          src={person.photo}
                          alt={`Portrait of ${person.name}, ${person.role} at FaQ Systems`}
                          fill
                          sizes="(max-width: 768px) 90vw, 380px"
                          className="object-cover grayscale contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.04]"
                          priority={i === 0}
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/[0.12] via-transparent to-transparent"
                        />
                      </div>
                    </motion.div>

                    {/* — Text column: no card, just type — */}
                    <div className={cn(flipped && 'md:pr-2')}>
                      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-crimson">
                        {person.index} — {person.role}
                      </p>

                      <h3 className="mt-4 font-display text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink md:text-[34px]">
                        {person.name}
                      </h3>

                      <blockquote className="mt-5">
                        <p className="font-serif text-[22px] italic leading-[1.45] text-ink/80 md:text-[24px]">
                          &ldquo;{person.quote}&rdquo;
                        </p>
                      </blockquote>

                      <p className="mt-5 max-w-[460px] text-[14px] leading-[1.8] text-muted-foreground">
                        {person.bio}
                      </p>

                      <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-ink/40">
                        {person.focus.join('  ·  ')}
                      </p>

                      <a
                        href={person.link.href}
                        className="group mt-7 inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink/70 transition-colors duration-300 hover:text-crimson"
                      >
                        <span className="link-underline">{person.link.label}</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </Reveal>
                {i < FOUNDERS.length - 1 && (
                  <div className="mt-20 border-t border-hairline md:mt-24" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
