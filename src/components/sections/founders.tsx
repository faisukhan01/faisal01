'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

const FOUNDERS = [
  {
    index: '01',
    initials: 'FK',
    name: 'Faisal Khan',
    role: 'Co-Founder · Software Engineer',
    photo: '/founders/faisal-khan.png',
    quote: 'Build the system you\u2019d want to inherit.',
    bio: 'Faisal architects FaQ Systems\u2019 platforms end-to-end — from the first schema to the live deploy. He leads product and full-stack engineering across Concordia and Staffist.',
    focus: ['Platform architecture', 'Product design', 'Full-stack engineering'],
    socials: [
      { label: 'GitHub', href: 'https://github.com', Icon: Github },
      { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: Linkedin },
      { label: 'X (Twitter)', href: 'https://twitter.com', Icon: Twitter },
      { label: 'Email', href: 'mailto:faisal@faq.systems', Icon: Mail },
    ],
  },
  {
    index: '02',
    initials: 'AQ',
    name: 'Abdul Qayyum',
    role: 'Co-Founder · Software Engineer',
    photo: '/founders/abdul-qayyum.png',
    quote: 'Boring reliability is a feature.',
    bio: 'Qayyum builds the engines under the surface — data models, integrations and automations that keep thousands of records consistent. He leads backend and systems engineering.',
    focus: ['Systems engineering', 'Data architecture', 'Automation'],
    socials: [
      { label: 'GitHub', href: 'https://github.com', Icon: Github },
      { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: Linkedin },
      { label: 'X (Twitter)', href: 'https://twitter.com', Icon: Twitter },
      { label: 'Email', href: 'mailto:qayyum@faq.systems', Icon: Mail },
    ],
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
            <h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-ink md:text-5xl">
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

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
          {FOUNDERS.map((person, i) => {
            const flipped = i % 2 === 1;
            return (
              <div key={person.name}>
                <Reveal>
                  <div
                    className={cn(
                      'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
                      flipped && 'lg:[&>*:first-child]:order-2'
                    )}
                  >
                    {/* — Photo: a clean floating image, no card chrome — */}
                    <motion.div
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                      className="group relative mx-auto w-full max-w-[440px]"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgb(0_122_255/0.08),transparent_75%)] blur-xl"
                      />
                      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_36px_90px_-30px_rgb(26_35_50/0.45)]">
                        <Image
                          src={person.photo}
                          alt={`Portrait of ${person.name}, ${person.role} at FaQ Systems`}
                          fill
                          sizes="(max-width: 1024px) 90vw, 460px"
                          className="object-cover grayscale contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.04]"
                          priority={i === 0}
                        />
                        {/* soft cobalt veil */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-crimson/[0.14] via-transparent to-transparent"
                        />
                      </div>
                    </motion.div>

                    {/* — Content column — */}
                    <div className={cn(flipped && 'lg:pr-4')}>
                      <div className="flex items-center gap-3.5">
                        <span className="tabular font-display text-[13px] font-extrabold tracking-[0.14em] text-crimson">
                          {person.index}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-crimson to-[#0057b8] font-display text-[11px] font-extrabold text-white">
                          {person.initials}
                        </span>
                        <span className="rounded-full border border-crimson/25 bg-crimson/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-crimson">
                          Co-Founder
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[42px] lg:text-[52px]">
                        {person.name}
                      </h3>
                      <p className="mt-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {person.role}
                      </p>

                      <blockquote className="mt-7 border-l-[3px] border-crimson pl-5">
                        <p className="font-display text-[19px] font-medium italic leading-[1.5] text-ink/85 md:text-[22px]">
                          &ldquo;{person.quote}&rdquo;
                        </p>
                      </blockquote>

                      <p className="mt-6 max-w-md text-[14px] leading-[1.8] text-muted-foreground">
                        {person.bio}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {person.focus.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[11.5px] font-medium text-ink/65"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex items-center gap-2.5">
                        {person.socials.map(({ label, href, Icon }) => (
                          <a
                            key={label}
                            href={href}
                            aria-label={`${person.name} on ${label}`}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white text-ink/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson/40 hover:text-crimson hover:shadow-[0_12px_30px_-12px_rgb(0_122_255/0.4)]"
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
                {i < FOUNDERS.length - 1 && (
                  <div className="mt-16 border-t border-hairline md:mt-24" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
