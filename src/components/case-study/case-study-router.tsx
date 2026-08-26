'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CaseStudyView } from './case-study-view';
import { getCaseStudy } from '@/data/case-studies';

interface CaseStudyContextValue {
  openCase: (slug: string) => void;
  closeCase: () => void;
}

const CaseStudyContext = createContext<CaseStudyContextValue | null>(null);

export function useCaseStudy(): CaseStudyContextValue {
  const ctx = useContext(CaseStudyContext);
  if (!ctx) throw new Error('useCaseStudy must be used inside <CaseStudyRouter>');
  return ctx;
}

/* Read the active case slug from anywhere — even outside the provider
   (the store is module-level and URL-backed). */
export function useActiveCaseSlug(): string | null {
  const slug = useSyncExternalStore(subscribeCase, getCaseSnapshot, getCaseServerSnapshot);
  return slug || null;
}

/* — External store for the current case slug, backed by the URL — */
const listeners = new Set<() => void>();

function notifyCaseChange() {
  listeners.forEach((l) => l());
}

function subscribeCase(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener('popstate', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('popstate', cb);
  };
}

function getCaseSnapshot(): string {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('case');
  return slug && getCaseStudy(slug) ? slug : '';
}

function getCaseServerSnapshot(): string {
  return '';
}

export function CaseStudyRouter({ children }: { children: ReactNode }) {
  const activeSlug = useSyncExternalStore(subscribeCase, getCaseSnapshot, getCaseServerSnapshot) || null;

  const openCase = useCallback((slug: string) => {
    if (!getCaseStudy(slug)) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get('case') !== slug) {
      url.searchParams.set('case', slug);
      window.history.pushState({ case: slug }, '', url.toString());
    }
    notifyCaseChange();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const closeCase = useCallback(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.get('case')) {
      notifyCaseChange();
      return;
    }
    if (window.history.state?.case) {
      window.history.back();
      // popstate will fire and notify; also notify in case back is a no-op
      setTimeout(notifyCaseChange, 0);
      return;
    }
    url.searchParams.delete('case');
    window.history.pushState({}, '', url.toString());
    notifyCaseChange();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <CaseStudyContext.Provider value={{ openCase, closeCase }}>
      <AnimatePresence mode="wait">
        {activeSlug ? (
          <motion.div
            key={`case-${activeSlug}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <CaseStudyView slug={activeSlug} onBack={closeCase} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </CaseStudyContext.Provider>
  );
}
