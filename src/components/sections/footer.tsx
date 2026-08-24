'use client';

import { Reveal } from '@/components/site/reveal';
import { NetsolLogo } from '@/components/site/logo';
import { FOOTER_LINKS, CONTACT_INFO } from '@/lib/site-data';

function SocialIcon({ name }: { name: string }) {
  if (name === 'linkedin')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5C3.895 3 3 3.895 3 5v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zM8.5 18H6V10h2.5v8zM7.25 8.5c-.69 0-1.25-.56-1.25-1.25S6.56 6 7.25 6s1.25.56 1.25 1.25S7.94 8.5 7.25 8.5zM18 18h-2.5v-4.5c0-1.5-2-1.4-2 0V18H11v-8h2.5v1.2c.7-1.3 4-1.4 4 1.3V18z" />
      </svg>
    );
  if (name === 'twitter')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.03l4.713 6.231L18.244 2.25zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );
  if (name === 'facebook')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-[14px] font-semibold text-white mb-4 tracking-wide">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors duration-200"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-[#1f2124] text-white">
      {/* Top accent gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1d81f2]/60 to-transparent" />

      <div className="mx-auto max-w-[1320px] px-5 lg:px-8 pt-16 lg:pt-20 pb-10">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {/* Brand + about */}
            <div className="col-span-2 lg:col-span-2">
              <NetsolLogo variant="light" />
              <p className="mt-5 text-[14px] text-[#b0b3b8] leading-[1.7] max-w-[320px]">
                Global leader in asset finance and leasing software. AI-enabled
                ecosystems that make commerce seamless, intelligent, and
                connected.
              </p>

              <div className="mt-6">
                <div className="text-[12px] uppercase tracking-[1.5px] text-[#6b7280] font-semibold mb-2">
                  {CONTACT_INFO.label}
                </div>
                <p className="text-[13px] text-[#b0b3b8] leading-[1.6] max-w-[280px]">
                  {CONTACT_INFO.address}
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, '')}`}
                  className="mt-2 inline-block text-[14px] font-semibold text-white hover:text-[#1d81f2] transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {['linkedin', 'twitter', 'facebook', 'youtube'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    aria-label={s}
                    className="h-9 w-9 rounded-full border border-[#3a3c3f] flex items-center justify-center text-[#b0b3b8] hover:text-[#1d81f2] hover:border-[#1d81f2] transition-colors"
                  >
                    <SocialIcon name={s} />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn title="Products" links={FOOTER_LINKS.products} />
            <FooterColumn title="Consultancy" links={FOOTER_LINKS.consultancy} />
            <FooterColumn title="Solutions" links={FOOTER_LINKS.solutions} />
            <FooterColumn title="Investors" links={FOOTER_LINKS.investors} />
          </div>
        </Reveal>

        {/* Bottom row: Marketplace, Insights, Contact */}
        <Reveal delay={0.1}>
          <div className="mt-12 pt-10 border-t border-[#2c2e31] grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[14px] font-semibold text-white mb-4 tracking-wide">
                Marketplace
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {FOOTER_LINKS.marketplace.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-white mb-4 tracking-wide">
                Insights
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.insights.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-white mb-4 tracking-wide">
                Contact Us
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                    Contact form
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                    Sales enquiries
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                    Partner program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#2c2e31] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#b0b3b8]">
            © 2026 NETSOL Technologies. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[13px]">
            {['Terms of Use', 'Privacy Policy', 'Human Rights Policy', 'Modern Slavery Act'].map(
              (l) => (
                <a key={l} href="#" className="text-[#b0b3b8] hover:text-[#1d81f2] transition-colors">
                  {l}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
