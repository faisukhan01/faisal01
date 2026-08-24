'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Globe } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/site-data';
import { NetsolLogo } from '@/components/site/logo';
import { CTAButton } from '@/components/site/cta-button';
import { cn } from '@/lib/utils';

export function SiteHeader() {
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
            ? 'shadow-[0_4px_24px_-8px_rgba(15,98,254,0.18),0_1px_2px_rgba(0,0,0,0.04)]'
            : 'shadow-none'
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center" aria-label="NETSOL Technologies home">
            <NetsolLogo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-[14px] font-normal text-[#525252] transition-colors duration-200 hover:text-[#1d81f2]"
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

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-xl border border-[#e0e0e0] bg-white p-2 shadow-[0_12px_40px_-8px_rgba(15,98,254,0.2)] min-w-[220px]"
                    >
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-[#e0e0e0] bg-white" />
                      {item.children.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block rounded-lg px-3 py-2 text-[14px] text-[#525252] transition-colors hover:bg-[#f5f7fa] hover:text-[#1d81f2]"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Select language"
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-[#525252] transition-colors hover:border-[#1d81f2] hover:text-[#1d81f2]"
            >
              <Globe className="h-4 w-4" />
            </button>

            <div className="hidden lg:block">
              <CTAButton href="#contact" className="text-[14px] px-5 py-2.5">
                Get in touch
              </CTAButton>
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col items-end gap-[5px] p-2"
            >
              <span className="block h-0.5 w-6 bg-[#161616]" />
              <span className="block h-0.5 w-5 bg-[#161616]" />
              <span className="block h-0.5 w-6 bg-[#161616]" />
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
            <nav className="flex flex-col px-5 py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-[#f0f0f0] py-4 text-[16px] font-medium text-[#161616]"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4 text-[#6b7280]" />}
                </a>
              ))}
              <div className="mt-6">
                <CTAButton href="#contact" className="w-full justify-center">
                  Get in touch
                </CTAButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
