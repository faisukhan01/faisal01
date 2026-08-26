'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { FaqLogo } from '@/components/site/logo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "Services", href: "#services" },
  { label: "Founders", href: "#founders" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active-section indicator — quiet IntersectionObserver, one link at a time
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-hairline bg-cream/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        {/* 3-zone layout: logo left · nav CENTER · CTA right */}
        <div className="container-luxe grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 md:h-[76px]">
          <FaqLogo priority />

          <nav
            aria-label="Primary"
            className="hidden justify-center lg:flex"
          >
            <div className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={cn(
                    'link-underline text-[13.5px] font-medium transition-colors duration-300',
                    active === link.href ? 'text-ink' : 'text-ink/65 hover:text-ink'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex items-center justify-end gap-3">
            <a
              href="#contact"
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
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

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
            <div className="container-luxe flex h-16 items-center justify-between md:h-[76px]">
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

            <nav aria-label="Mobile" className="container-luxe mt-8 flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-5 border-b border-hairline py-5"
                >
                  <span className="tabular text-[11px] tracking-[0.2em] text-muted-foreground/70">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[30px] font-extrabold leading-none text-ink">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="container-luxe mt-auto pb-10">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary h-12 w-full px-6 text-sm"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-5 text-center text-[12px] text-muted-foreground">
                Remote-first · Productized SaaS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
