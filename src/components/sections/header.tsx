'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { FaqLogo } from '@/components/site/logo';
import { useActiveCaseSlug } from '@/components/case-study/case-study-router';
import { CASE_STUDIES } from '@/data/case-studies';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Founders', href: '#founders' },
  { label: 'Contact', href: '#contact' },
];

const CONTACT_MAILTO = 'mailto:hello@faq.systems?subject=Project%20inquiry';

/* — Open a case study from anywhere (the header lives outside the router
     provider, so we drive the URL-backed store directly). — */
function openCaseStudy(slug: string) {
  const url = new URL(window.location.href);
  if (url.searchParams.get('case') !== slug) {
    url.searchParams.set('case', slug);
    window.history.pushState({ case: slug }, '', url.toString());
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/* — Leave an open case study, then land on a landing anchor
     once the transition has finished. — */
function closeCaseAndGo(hash: string) {
  // Replace the case entry with the anchor URL — a pure replaceState means
  // no history traversal, so the browser's same-document scroll
  // restoration never fires and never fights our anchor scroll.
  const url = new URL(window.location.href);
  url.searchParams.delete('case');
  url.hash = hash;
  window.history.replaceState(null, '', url.toString());
  window.dispatchEvent(new PopStateEvent('popstate'));

  // The landing sections remount after the exit transition — poll
  // briefly, then smooth-scroll to the anchor.
  let attempts = 12;
  const timer = window.setInterval(() => {
    const el = document.getElementById(hash);
    attempts -= 1;
    if (el || attempts <= 0) {
      window.clearInterval(timer);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, 150);
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [dropOpen, setDropOpen] = useState(false); // products dropdown
  const [dismissed, setDismissed] = useState(false); // announcement bar
  const [active, setActive] = useState<string | null>(null);

  const caseSlug = useActiveCaseSlug();
  const caseOpen = caseSlug !== null;
  const solid = scrolled || caseOpen;

  const dropRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<number | null>(null);

  /* — Scroll state — */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* — Active-section indicator. Re-attaches after case studies close
       (landing sections remount after the exit transition). — */
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let retry: number | undefined;

    const attach = () => {
      const ids = ['products', ...NAV_LINKS.map((l) => l.href.slice(1))];
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (sections.length === 0) {
        retry = window.setTimeout(attach, 300);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(`#${entry.target.id}`);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      sections.forEach((s) => observer!.observe(s));
    };

    attach();
    return () => {
      observer?.disconnect();
      if (retry) window.clearTimeout(retry);
    };
  }, [caseSlug]);

  /* — Body scroll lock while the mobile menu is open — */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* — Escape closes the menu/dropdown first (capture-phase, so an open
       case study doesn't get closed by the same keypress). — */
  useEffect(() => {
    if (!open && !dropOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setDropOpen(false);
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, dropOpen]);

  /* — Click outside closes the dropdown — */
  useEffect(() => {
    if (!dropOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [dropOpen]);

  /* — Hover intent for the dropdown (desktop) — */
  useEffect(
    () => () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    },
    []
  );

  const clearLeave = () => {
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const selectProduct = (slug: string) => {
    setDropOpen(false);
    setOpen(false);
    openCaseStudy(slug);
  };

  const ctaHref = caseOpen ? CONTACT_MAILTO : '#contact';

  const onNavLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setDropOpen(false);
    setOpen(false);
    if (!caseOpen) return; // native anchor scroll is enough
    e.preventDefault();
    closeCaseAndGo(href.slice(1));
  };

  return (
    <>
      <header
        className={cn(
          'site-header fixed inset-x-0 top-0 z-50 transition-all duration-500',
          solid
            ? 'is-scrolled border-b border-hairline bg-cream/85 shadow-[0_10px_36px_-22px_rgb(26_35_50/0.35)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        {/* — Launch strip: the classic productized-SaaS announcement bar.
             Pure-CSS collapse (framer-motion height animations here were
             cancelling in-flight smooth scrolls on this page). — */}
        {!dismissed && !caseOpen && (
          <div
            className={cn(
              'bg-night ease-[cubic-bezier(0.22,1,0.36,1)]',
              'transition-[height,opacity,visibility] duration-300',
              scrolled
                ? 'pointer-events-none invisible h-0 overflow-hidden opacity-0'
                : 'visible h-10 opacity-100'
            )}
            role="region"
            aria-label="Announcement"
          >
            <div className="container-luxe relative flex h-10 items-center justify-center">
              <p className="flex items-center gap-2.5 text-center text-[11.5px] font-medium tracking-wide text-white/75">
                <span className="hidden sm:inline">
                  Concordia &amp; Staffist —
                </span>
                <span>two products live in production</span>
                <a
                  href="#products"
                  className="link-underline inline-flex items-center gap-1 font-semibold text-[#79b8ff] transition-colors hover:text-white"
                >
                  Explore
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </p>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss announcement"
                className="absolute right-5 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/80 sm:right-8 lg:right-12"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* — Main bar: logo · nav (+ products dropdown) · CTA — */}
        <div className="container-luxe grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 md:h-[76px]">
          <FaqLogo priority />

          <nav aria-label="Primary" className="hidden justify-center lg:flex">
            <div className="flex items-center gap-8 xl:gap-9">
              {/* Products — dropdown */}
              <div
                ref={dropRef}
                className="relative"
                onMouseEnter={() => {
                  clearLeave();
                  setDropOpen(true);
                }}
                onMouseLeave={() => {
                  clearLeave();
                  leaveTimer.current = window.setTimeout(() => {
                    setDropOpen(false);
                  }, 140);
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    // Click always opens (idempotent — safe against the
                    // hover-open/click race). Closing: mouse-leave, outside
                    // click, Escape, or selecting a product.
                    setDropOpen(true);
                  }}
                  aria-expanded={dropOpen}
                  aria-haspopup="true"
                  className={cn(
                    'nav-link flex items-center gap-1.5 text-[13.5px] font-medium transition-colors duration-300',
                    active === '#products' || dropOpen
                      ? 'text-ink'
                      : 'text-ink/65 hover:text-ink'
                  )}
                >
                  Products
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-300',
                      dropOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.985 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full z-50 mt-4 w-[560px] max-w-[calc(100vw-40px)] -translate-x-1/2 rounded-2xl border border-hairline bg-white/95 p-3 shadow-[0_36px_90px_-26px_rgb(26_35_50/0.4)] backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between px-3 pb-1.5 pt-1">
                        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
                          Live products
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                          2 in production
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {CASE_STUDIES.map((p) => (
                          <button
                            key={p.slug}
                            type="button"
                            onClick={() => selectProduct(p.slug)}
                            className="group rounded-xl border border-transparent p-4 text-left transition-all duration-300 hover:border-hairline hover:bg-cream/80"
                          >
                            <span className="flex h-9 items-center overflow-hidden">
                              <Image
                                src={p.logo}
                                alt={`${p.name} logo`}
                                width={160}
                                height={40}
                                className="h-9 w-auto object-contain"
                              />
                            </span>
                            <span className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="font-display text-[15px] font-bold text-ink">
                                {p.name}
                              </span>
                              <span
                                className="h-1 w-1 rounded-full bg-ink/20"
                                aria-hidden="true"
                              />
                              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                                {p.sector}
                              </span>
                            </span>
                            <span className="mt-2 block text-[12px] leading-snug text-muted-foreground line-clamp-2">
                              {p.tagline}
                            </span>
                            <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-crimson">
                              Case study
                              <ArrowRight
                                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-2 flex items-center justify-between rounded-xl bg-cream/90 px-4 py-2.5">
                        <p className="flex items-center gap-2 text-[11.5px] font-medium text-ink/60">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                            aria-hidden="true"
                          />
                          Both operational — monitored 24/7
                        </p>
                        <a
                          href="#pricing"
                          onClick={(e) => onNavLinkClick(e, '#pricing')}
                          className="link-underline text-[11.5px] font-semibold text-crimson"
                        >
                          See pricing
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => onNavLinkClick(e, link.href)}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={cn(
                    'nav-link link-underline text-[13.5px] font-medium transition-colors duration-300',
                    active === link.href ? 'text-ink' : 'text-ink/65 hover:text-ink'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* CTA cluster */}
          <div className="flex items-center justify-end gap-3">
            <a
              href="#products"
              onClick={(e) => onNavLinkClick(e, '#products')}
              className="hidden items-center gap-2 rounded-full border border-hairline bg-white/60 px-3.5 py-2 text-[11px] font-semibold text-ink/60 backdrop-blur-sm transition-all duration-300 hover:border-ink/25 hover:text-ink xl:inline-flex"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Systems operational
            </a>
            <a
              href={ctaHref}
              className="btn-primary hidden h-10 px-5 text-[13px] sm:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              className="nav-icon-btn flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* — Mobile menu — */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="container-luxe flex h-16 shrink-0 items-center justify-between md:h-[76px]">
              <FaqLogo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="container-luxe flex-1 overflow-y-auto">
              {/* products — the SaaS nav, even on mobile */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45"
              >
                Products — live
              </motion.p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {CASE_STUDIES.map((p, i) => (
                  <motion.button
                    key={p.slug}
                    type="button"
                    onClick={() => selectProduct(p.slug)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.06,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-hairline bg-white p-4 text-left shadow-[0_6px_30px_-16px_rgb(26_35_50/0.14)] transition-all duration-300 hover:border-crimson/25 active:scale-[0.99]"
                  >
                    <span className="flex h-10 w-[86px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream/70">
                      <Image
                        src={p.logo}
                        alt=""
                        width={120}
                        height={40}
                        className="h-6 w-auto object-contain"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-[16px] font-extrabold text-ink">
                          {p.name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-crimson/80">
                          <span
                            className="h-1 w-1 rounded-full bg-crimson"
                            aria-hidden="true"
                          />
                          Live
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-[11.5px] font-medium text-ink/50">
                        {p.sector}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-crimson"
                      aria-hidden="true"
                    />
                  </motion.button>
                ))}
              </div>

              {/* primary nav */}
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => onNavLinkClick(e, link.href)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.24 + i * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-baseline gap-5 border-b border-hairline py-5"
                  >
                    <span className="tabular font-mono text-[11px] tracking-[0.2em] text-ink/40">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[30px] font-extrabold leading-none text-ink">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-5 w-5 self-center text-ink/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-crimson"
                      aria-hidden="true"
                    />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="container-luxe shrink-0 pb-10 pt-6">
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="btn-primary h-12 w-full px-6 text-sm"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-5 flex items-center justify-center gap-2 text-[12px] font-medium text-ink/45">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                Remote-first · Two products live
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
