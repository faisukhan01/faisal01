'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

const NewsletterScene3D = dynamic(
  () => import('@/components/three/scenes').then((m) => m.NewsletterScene3D),
  { ssr: false }
);

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3200);
  };

  return (
    <section
      id="marketplace"
      className="relative w-full py-16 lg:py-24 overflow-hidden"
      aria-label="Newsletter subscription"
    >
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 rounded-[36px] overflow-hidden shadow-premium-lg">
          {/* Left zone: light bg with 3D mesh + barcode */}
          <div className="lg:col-span-5 relative bg-white p-8 lg:p-12 border-r border-[#e0e0e0] min-h-[420px] lg:min-h-[460px] flex flex-col justify-between">
            <div aria-hidden className="absolute inset-0 bg-barcode opacity-50" />
            <div
              className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-[#24a148]/8 blur-3xl"
              aria-hidden
            />

            <Reveal className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1d81f2]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#1d81f2]">
                <Mail className="h-3.5 w-3.5" />
                Newsletter
              </div>
              <h3 className="mt-5 text-[24px] lg:text-[28px] font-semibold tracking-tight text-[#161616] leading-tight max-w-[280px]">
                Stay ahead of what's shaping asset finance.
              </h3>
              <p className="mt-3 text-[14px] text-[#525252] leading-[1.6] max-w-[300px]">
                Curated insights, product releases and field notes — once a
                month, no fluff.
              </p>
            </Reveal>

            {/* 3D mesh car positioned to overlap boundary */}
            <div className="relative z-20 h-[180px] lg:h-[220px] lg:-mr-12 lg:translate-x-12 mt-6 lg:absolute lg:bottom-0 lg:right-0 lg:left-0">
              <NewsletterScene3D />
            </div>
          </div>

          {/* Right zone: blue gradient with form */}
          <div className="lg:col-span-7 relative bg-gradient-to-br from-[#2d9cdb] to-[#56ccf2] gradient-sweep p-8 lg:p-12 flex flex-col justify-center">
            {/* Barcode overlay */}
            <div
              aria-hidden
              className="absolute inset-0 bg-barcode-light opacity-30 pointer-events-none"
            />
            {/* Floating dots */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -14, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 right-12 h-3 w-3 rounded-full bg-white/60"
            />
            <motion.div
              aria-hidden
              animate={{ y: [0, 12, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute bottom-10 right-24 h-2 w-2 rounded-full bg-white/60"
            />

            <Reveal className="relative z-10">
              <h3 className="text-[26px] lg:text-[34px] font-semibold tracking-tight text-white leading-tight max-w-[460px]">
                Subscribe to our newsletter to get the latest news in your inbox.
              </h3>

              <form onSubmit={onSubmit} className="mt-8 max-w-[520px]">
                <div className="flex items-stretch gap-0 rounded-[10px] bg-white p-1.5 shadow-lg">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent px-4 text-[14px] lg:text-[15px] text-[#161616] placeholder:text-[#6b7280] outline-none"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={submitted}
                    className="rounded-[8px] bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#24a148] px-5 lg:px-7 py-2.5 text-[14px] lg:text-[15px] font-semibold text-white transition-colors flex items-center gap-2"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Subscribed
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                <p className="mt-3 text-[12px] text-white/80">
                  We respect your inbox. Unsubscribe in one click, anytime.
                </p>
              </form>

              {/* Trust indicators */}
              <div className="mt-8 flex items-center gap-6 text-[12px] text-white/85">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  18,000+ subscribers
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  GDPR compliant
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Monthly digest
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
