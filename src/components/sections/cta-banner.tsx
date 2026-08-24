'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

const MARKETS = [
  'Automotive',
  'Equipment',
  'Fleet & Mobility',
  'Marine & Aviation',
  'Energy & Renewables',
  'Banking & Lessor',
];

type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'done' }
  | { state: 'error'; message: string };

function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [market, setMarket] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.state === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus({ state: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company'),
          market: market || undefined,
          message: data.get('message'),
          source: 'cta-banner',
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        setStatus({ state: 'done' });
        form.reset();
        setMarket('');
      } else {
        setStatus({
          state: 'error',
          message: json.error ?? 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setStatus({
        state: 'error',
        message: 'Network error — please try again.',
      });
    }
  };

  const inputCls =
    'h-12 w-full border-b border-cream/25 bg-transparent text-[14px] text-cream outline-none transition-colors duration-300 placeholder:text-cream/35 focus:border-cream/70';
  const labelCls = 'eyebrow block text-[9.5px] text-cream/45';

  if (status.state === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[420px] flex-col items-start justify-center border border-cream/15 bg-cream/[0.03] p-8 md:p-12"
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25">
          <Check className="h-5 w-5 text-cream" aria-hidden="true" />
        </span>
        <h3 className="mt-7 font-serif text-[26px] leading-tight text-cream md:text-[30px]">
          Thank you — request received.
        </h3>
        <p className="mt-4 max-w-sm text-[14px] leading-[1.75] text-cream/60">
          A NETSOL principal will respond within one business day. In the
          meantime, our Insights desk is a good place to start.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: 'idle' })}
          className="link-underline mt-8 bg-transparent text-[13px] font-medium text-cream/60 transition-colors hover:text-cream"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-cream/15 bg-cream/[0.03] p-8 md:p-10"
      aria-label="Request a demo"
    >
      <p className="eyebrow text-cream/45">Request a demo</p>

      <div className="mt-7 grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cta-name" className={labelCls}>
            Name *
          </label>
          <input
            id="cta-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Alexandra Reeve"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cta-email" className={labelCls}>
            Work email *
          </label>
          <input
            id="cta-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="a.reeve@captives.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cta-company" className={labelCls}>
            Company
          </label>
          <input
            id="cta-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Reeve Capital Finance"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cta-market" className={labelCls}>
            Market
          </label>
          <select
            id="cta-market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className={`${inputCls} cursor-pointer appearance-none ${
              market ? 'text-cream' : 'text-cream/35'
            } [&>option]:bg-night [&>option]:text-cream`}
          >
            <option value="">Select a market</option>
            {MARKETS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-7">
        <label htmlFor="cta-message" className={labelCls}>
          What are you building? *
        </label>
        <textarea
          id="cta-message"
          name="message"
          required
          rows={3}
          placeholder="Portfolio, markets, timeline…"
          className="w-full resize-none border-b border-cream/25 bg-transparent py-3 text-[14px] leading-[1.7] text-cream outline-none transition-colors duration-300 placeholder:text-cream/35 focus:border-cream/70"
        />
      </div>

      <div className="mt-9 flex items-center justify-between gap-6">
        <p className="text-[11px] leading-relaxed text-cream/35">
          One business day response. No mailing lists.
        </p>
        <button
          type="submit"
          disabled={status.state === 'sending'}
          className="btn-light h-12 shrink-0 px-7 text-[13.5px] disabled:cursor-wait disabled:opacity-60"
        >
          {status.state === 'sending' ? 'Sending…' : 'Send request'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {status.state === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-5 border-l-2 border-crimson/70 pl-3.5 text-[13px] text-cream/80"
          >
            {status.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

export function CTABanner() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-night py-24 text-cream md:py-32"
      aria-label="Contact NETSOL"
    >
      <div className="container-luxe relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-20">
          {/* Left — editorial statement */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow text-cream/45">Ready when you are</p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 font-serif text-[40px] leading-[1.08] tracking-[-0.015em] md:text-[52px]">
                Let&rsquo;s shape smarter finance —{' '}
                <em className="font-light italic">together</em>.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-cream/60">
                Tell us about your portfolio, your markets, and your roadmap. A
                NETSOL principal — not a call center — will respond within one
                business day.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 space-y-4 border-t border-cream/10 pt-8">
                <div>
                  <p className="eyebrow text-cream/40">Headquarters</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-cream/70">
                    16000 Ventura Blvd, Suite 770
                    <br />
                    Encino, CA 91436, USA
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-cream/40">Direct</p>
                  <a
                    href="tel:+18182229195"
                    className="link-underline mt-2 inline-block text-[13.5px] text-cream/70 transition-colors hover:text-cream"
                  >
                    +1 818 222 9195
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — the form */}
          <Reveal delay={0.14} y={32}>
            <ContactForm />
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="eyebrow mt-20 text-center text-cream/30">
            Los Angeles · London · Beijing · Bangkok · Lahore · Manila
          </p>
        </Reveal>
      </div>
    </section>
  );
}
