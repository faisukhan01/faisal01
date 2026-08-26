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
    <section id="founders" className="bg-background py-20 md:py-24" aria-label="Founders">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Founders</p>
            <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink md:text-[36px]">
              The Fa and the Q.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.7] text-muted-foreground">
              FaQ stands for its founders — Faisal and Qayyum, two engineers
              who design, build and operate everything themselves.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1080px] gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {FOUNDERS.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.12}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-white p-7 shadow-[0_6px_30px_-16px_rgb(26_35_50/0.12)] transition-shadow duration-500 hover:border-crimson/25 hover:shadow-[0_28px_64px_-28px_rgb(0_122_255/0.28)] sm:p-8"
              >
                {/* photo + header row */}
                <div className="flex items-center gap-5">
                  <div className="relative h-[104px] w-[84px] shrink-0 overflow-hidden rounded-2xl shadow-[0_14px_36px_-14px_rgb(26_35_50/0.4)]">
                    <Image
                      src={person.photo}
                      alt={`Portrait of ${person.name}`}
                      fill
                      sizes="84px"
                      className="object-cover grayscale contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.05]"
                      priority={i === 0}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-crimson/[0.15] via-transparent to-transparent"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="tabular font-display text-[11px] font-extrabold tracking-[0.14em] text-crimson">
                        {person.index}
                      </span>
                      <span className="rounded-full bg-crimson/[0.08] px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-crimson">
                        Co-Founder
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-[24px] font-extrabold leading-none tracking-tight text-ink sm:text-[26px]">
                      {person.name}
                    </h3>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                      {person.role}
                    </p>
                  </div>
                </div>

                {/* quote */}
                <blockquote className="mt-6 border-l-2 border-crimson/60 pl-4">
                  <p className="font-display text-[16px] font-medium italic leading-[1.5] text-ink/80">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                </blockquote>

                {/* bio */}
                <p className="mt-4 text-[13px] leading-[1.7] text-muted-foreground">
                  {person.bio}
                </p>

                {/* focus */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {person.focus.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream px-3 py-1 text-[11px] font-medium text-ink/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* socials + baseline */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between border-t border-hairline pt-5">
                    <div className="flex items-center gap-2">
                      {person.socials.map(({ label, href, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={`${person.name} on ${label}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson/[0.08] hover:text-crimson"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                    <span
                      aria-hidden="true"
                      className="h-[3px] w-10 origin-left rounded-full bg-gradient-to-r from-crimson to-[#0057b8] transition-transform duration-500 group-hover:scale-x-[1.6]"
                    />
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
