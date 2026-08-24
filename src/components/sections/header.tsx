'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Globe, Search } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/site-data';
import { NetsolLogo } from '@/components/site/logo';
import { CTAButton } from '@/components/site/cta-button';
import { Magnetic } from '@/components/site/magnetic';
import { cn } from '@/lib/utils';

interface SiteHeaderProps {
  onSearchOpen?: () => void;
}

export function SiteHeader({ onSearchOpen }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-300',
          scrolled
            ? 'glass-on-scroll shadow-[0_4px_24px_-8px_rgba(15,98,254,0.18),0_1px_2px_rgba(0,0,0,0.04)]'
            : 'shadow-none'
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Magnetic as="a" href="#" strength={0.25} ariaLabel="NETSOL Technologies home" className="lift-on-hover">
            <span className="flex items-center" aria-hidden>
              <NetsolLogo />
            </span>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className="nav-link-underline flex items-center gap-1 text-[14px] font-normal text-[#525252] transition-colors duration-200 hover:text-[#1d81f2]"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-200',
                        openDropdown === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </a>

                {/* Underline indicator */}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-0 bg-[#1d81f2] transition-all duration-300 group-hover:w-full" />

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="gradient-border-animated absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-xl border border-[#e0e0e0] bg-white p-2 shadow-depth-lg min-w-[220px]"
                    >
                      {/* Premium accent line at top */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1d81f2] to-transparent pointer-events-none"
                        aria-hidden
                      />
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-[#e0e0e0] bg-white" />
                      {item.children.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="lift-on-hover flex items-center justify-between rounded-lg px-3 py-2 text-[14px] text-[#525252] transition-colors hover:bg-[#f5f7fa] hover:text-[#1d81f2] group/sub"
                        >
                          <span>{sub.label}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1d81f2]/0 group-hover/sub:bg-[#1d81f2] transition-all duration-200" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <button
              aria-label="Open search (Cmd+K)"
              onClick={onSearchOpen}
              className="lift-on-hover btn-shine hidden sm:flex items-center gap-2 h-9 pl-2.5 pr-2 rounded-full border border-black/15 text-[#525252] hover:border-[#1d81f2] hover:text-[#1d81f2] hover:bg-[#1d81f2]/5 transition-all"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-[12px]">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded bg-[#f5f7fa] border border-[#e0e0e0] text-[10px] font-mono text-[#6b7280]">
                ⌘K
              </kbd>
            </button>

            <button
              aria-label="Select language"
              className="lift-on-hover hidden lg:flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-[#525252] transition-colors hover:border-[#1d81f2] hover:text-[#1d81f2]"
            >
              <Globe className="h-4 w-4" />
            </button>

            <div className="hidden lg:block">
              <CTAButton href="#contact" className="btn-shine btn-glow text-[14px] px-5 py-2.5">
                Get in touch
              </CTAButton>
            </div>

            {/* Mobile hamburger — premium animated */}
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="group lg:hidden flex flex-col items-end gap-[5px] p-2"
            >
              <span className="block h-0.5 w-6 bg-[#161616] transition-all duration-300 group-hover:w-5 group-hover:bg-[#1d81f2]" />
              <span className="block h-0.5 w-5 bg-[#161616] transition-all duration-300 group-hover:w-6 group-hover:bg-[#1d81f2]" />
              <span className="block h-0.5 w-6 bg-[#161616] transition-all duration-300 group-hover:w-5 group-hover:bg-[#1d81f2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-white lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5 border-b border-[#e0e0e0]">
              <NetsolLogo />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2"
              >
                <X className="h-6 w-6 text-[#161616]" />
              </button>
            </div>
            <nav className="flex flex-col gap-3 px-5 py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 * i + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="lift-on-hover flex items-center gap-3 rounded-2xl border border-[#e8edf3] bg-white/80 backdrop-blur-sm px-4 py-4 text-[16px] font-medium text-[#161616] shadow-depth"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#1d81f2]/60"
                    aria-hidden
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.children && (
                    <ChevronDown className="h-4 w-4 text-[#6b7280]" />
                  )}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.05 * NAV_ITEMS.length + 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 space-y-3"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onSearchOpen?.();
                  }}
                  className="lift-on-hover w-full flex items-center justify-between rounded-2xl border border-[#e0e0e0] bg-white/80 backdrop-blur-sm px-4 py-3 text-[14px] text-[#525252] shadow-depth"
                >
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4" /> Search
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#f5f7fa] border border-[#e0e0e0] text-[10px] font-mono">
                    ⌘K
                  </kbd>
                </button>
                <CTAButton
                  href="#contact"
                  className="btn-shine btn-glow w-full justify-center"
                >
                  Get in touch
                </CTAButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
