'use client';

import { useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { FAQ_ITEMS } from '@/lib/site-data';

interface State {
  openId: string | null;
}

type Action = { type: 'TOGGLE'; id: string };

function reducer(state: State, action: Action): State {
  if (action.type === 'TOGGLE') {
    return { openId: state.openId === action.id ? null : action.id };
  }
  return state;
}

const initialState: State = { openId: FAQ_ITEMS[0].id };

/**
 * Premium FAQ accordion section — 8 question/answer pairs.
 * Premium interactions: animated chevron, smooth height auto animation
 * via Framer Motion AnimatePresence + initial state = first item open.
 *
 * Includes a CTA footer for "still have questions?" — links to contact.
 */
export function FAQ() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section
      id="faq"
      className="relative w-full bg-gradient-to-b from-white to-[#f5f7fa] py-20 lg:py-28 overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* Background hairline divider pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#0f62fe 1px, transparent 1px), linear-gradient(90deg, #0f62fe 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Soft accent */}
      <div
        aria-hidden
        className="absolute -top-24 right-[8%] h-[320px] w-[320px] rounded-full bg-[#1d81f2]/5 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — sticky header + CTA */}
          <Reveal className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-[#1d81f2]/10 text-[#1d81f2]">
                <HelpCircle className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                FAQ
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
              Questions buyers actually ask.
            </h2>
            <p className="mt-5 text-[15px] lg:text-[17px] text-[#525252] leading-[1.65]">
              Eight questions our customer team answers most often. Can't
              find what you need? We're a phone call away.
            </p>

            {/* Mini stats */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: '8', l: 'common Qs' },
                { v: '<2h', l: 'response time' },
                { v: '24/7', l: 'support' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl bg-white border border-[#e0e0e0] p-3 text-center"
                >
                  <div className="text-[18px] font-semibold text-[#1d81f2] leading-none">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-[#6b7280] leading-tight">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-6">
              <CTAButton href="#contact" variant="outline" className="text-[14px] px-5 py-2.5">
                <MessageCircle className="h-4 w-4" />
                Talk to a human
              </CTAButton>
            </div>
          </Reveal>

          {/* RIGHT — accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = state.openId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: Math.min(i, 7) * 0.05 }}
                    className={`group rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? 'border-[#1d81f2]/40 shadow-premium'
                        : 'border-[#e0e0e0] hover:border-[#1d81f2]/30'
                    }`}
                  >
                    {/* Question row (clickable) */}
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE', id: item.id })}
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-content`}
                      className="relative w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                    >
                      {/* Active accent bar */}
                      <span
                        aria-hidden
                        className={`absolute left-0 top-0 bottom-0 w-[3px] origin-top transition-transform duration-300 ${
                          isOpen ? 'scale-y-100' : 'scale-y-0'
                        }`}
                        style={{ background: 'linear-gradient(180deg, #1d81f2, #56ccf2)' }}
                      />
                      {/* Number badge */}
                      <span className="hidden sm:flex items-center justify-center h-7 w-7 rounded-md bg-[#f5f7fa] text-[11px] font-mono text-[#6b7280] shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-[15px] sm:text-[16px] font-semibold text-[#161616] leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`inline-flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300 shrink-0 ${
                          isOpen
                            ? 'bg-[#1d81f2] text-white rotate-180'
                            : 'bg-[#f5f7fa] text-[#525252] group-hover:bg-[#1d81f2]/10 group-hover:text-[#1d81f2]'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`${item.id}-content`}
                          id={`${item.id}-content`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 sm:px-6 pb-5 pl-12 sm:pl-14 text-[14px] lg:text-[15px] text-[#525252] leading-[1.7]">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA strip */}
            <div className="mt-6 rounded-2xl border border-[#e0e0e0] bg-gradient-to-r from-[#f5f7fa] to-white p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <div className="text-[14px] text-[#525252]">
                <span className="font-semibold text-[#161616]">Still have questions?</span>{' '}
                Our team typically responds within two business hours.
              </div>
              <CTAButton href="#contact" className="text-[14px] px-5 py-2.5 shrink-0">
                Get in touch
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
