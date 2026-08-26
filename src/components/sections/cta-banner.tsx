'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

export function CTABanner() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-hairline bg-[#f4f8ff] py-20 md:py-28"
      aria-label="Contact FaQ Systems"
    >
      {/* drifting cobalt halos */}
      <div
        aria-hidden="true"
        className="drift pointer-events-none absolute -left-24 top-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.14),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="drift-slow pointer-events-none absolute -right-24 bottom-[-140px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(0_122_255/0.1),transparent_70%)] blur-3xl"
      />
      {/* fine grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(26_35_50/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(26_35_50/0.035)_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      <div className="container-luxe relative">
        <Reveal>
          <div className="relative mx-auto max-w-3xl rounded-[2.5rem] border border-crimson/15 bg-white/70 px-6 py-14 text-center shadow-[0_30px_90px_-40px_rgb(0_122_255/0.3)] backdrop-blur-sm sm:px-12 md:py-16">
            {/* thin cobalt accent ring */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-[2rem] border border-crimson/10"
            />

            {/* email pill */}
            <a
              href="mailto:hello@faq.systems"
              className="relative inline-flex items-center gap-2.5 rounded-full border border-crimson/20 bg-white px-5 py-2.5 text-[13px] font-semibold text-ink/75 shadow-[0_8px_24px_-10px_rgb(0_122_255/0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson/40 hover:text-crimson"
            >
              <Mail className="h-3.5 w-3.5 text-crimson" aria-hidden="true" />
              hello@faq.systems
            </a>

            <h2 className="relative mt-8 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[38px] md:text-[44px]">
              Ready to build something{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em]">
                smarter?
              </span>
            </h2>

            <p className="relative mx-auto mt-6 max-w-xl text-[14.5px] leading-[1.8] text-muted-foreground">
              Let&rsquo;s turn your business challenge into a scalable digital
              system. Tell us what slows your team down — we&rsquo;ll show you
              what it looks like solved.
            </p>

            <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.a
                href="mailto:hello@faq.systems?subject=Project%20inquiry"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="btn-cobalt group h-12 px-8 text-[14px]"
              >
                Start a Project
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>
              <motion.a
                href="mailto:hello@faq.systems?subject=Just%20saying%20hello"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-white px-8 text-[14px] font-semibold text-ink transition-all duration-300 hover:border-ink/30 hover:shadow-[0_18px_44px_-20px_rgb(26_35_50/0.35)]"
              >
                Talk to Us
              </motion.a>
            </div>

            {/* reply-time micro-line */}
            <p className="relative mt-8 flex items-center justify-center gap-2 text-[12px] font-medium text-muted-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              A founder replies — usually within a day.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
