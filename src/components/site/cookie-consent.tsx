'use client';

import { useEffect, useReducer, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';

const STORAGE_KEY = 'netsol_cookie_consent_v1';

type Consent = 'accepted' | 'rejected' | null;

type State = { consent: Consent; visible: boolean; hydrated: boolean };
type Action =
  | { type: 'HYDRATE'; consent: Consent }
  | { type: 'SHOW' }
  | { type: 'CHOOSE'; consent: 'accepted' | 'rejected' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, hydrated: true, consent: action.consent };
    case 'SHOW':
      return { ...state, visible: true };
    case 'CHOOSE':
      return { consent: action.consent, visible: false, hydrated: true };
    default:
      return state;
  }
}

function readStoredConsent(): Consent {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'accepted' || v === 'rejected') return v;
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Premium FinTech cookie consent banner.
 * Persists choice in localStorage; slides up from bottom on first visit.
 * SSR-safe: hydrates consent on mount, shows banner after a delay only if no choice.
 */
export function CookieConsent() {
  const [state, dispatch] = useReducer(reducer, {
    consent: null,
    visible: false,
    hydrated: false,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    const stored = readStoredConsent();
    dispatch({ type: 'HYDRATE', consent: stored });
    if (stored === null) {
      timeoutRef.current = setTimeout(() => dispatch({ type: 'SHOW' }), 1400);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const choose = (choice: 'accepted' | 'rejected') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    dispatch({ type: 'CHOOSE', consent: choice });
  };

  const shouldRender = state.hydrated && state.visible && state.consent === null;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-[920px] -translate-x-1/2"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#e0e0e0] bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_-12px_rgba(15,98,254,0.25)]">
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1d81f2] via-[#56ccf2] to-[#24a148]" />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 sm:p-5">
              {/* Icon */}
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1d81f2]/8 text-[#1d81f2]">
                <Cookie className="h-6 w-6" />
              </div>

              {/* Copy */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-[#161616]">
                    We value your privacy
                  </span>
                  <span className="rounded-full bg-[#24a148]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#24a148]">
                    GDPR
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-[1.55] text-[#525252]">
                  We use cookies to enhance your browsing experience, serve
                  personalised insights, and analyse our traffic. By clicking
                  &quot;Accept all&quot;, you consent to our use of cookies. Read our{' '}
                  <a href="#" className="font-medium text-[#1d81f2] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch sm:gap-2">
                <button
                  onClick={() => choose('rejected')}
                  className="rounded-[8px] border border-[#e0e0e0] bg-white px-4 py-2 text-[13px] font-medium text-[#525252] transition-colors hover:border-[#1d81f2] hover:text-[#1d81f2]"
                >
                  Reject all
                </button>
                <button
                  onClick={() => choose('accepted')}
                  className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#1d81f2] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f62fe] shadow-[0_4px_12px_-2px_rgba(15,98,254,0.45)]"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  Accept all
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => choose('rejected')}
                aria-label="Dismiss"
                className="absolute right-2 top-2 hidden h-7 w-7 items-center justify-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f5f7fa] hover:text-[#161616] sm:flex"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
