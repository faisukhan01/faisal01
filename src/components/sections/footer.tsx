'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/site-data';
import { NetsolLogo } from '@/components/site/logo';

const FOOTER_COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Transcend Platform', href: '#platform' },
      { label: 'Digital Retail', href: '#platform' },
      { label: 'Originations', href: '#platform' },
      { label: 'Servicing', href: '#platform' },
      { label: 'Marketplace', href: '#platform' },
      { label: 'AI Labs', href: '#platform' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About NETSOL', href: '#company' },
      { label: 'Leadership', href: '#company' },
      { label: 'Who we serve', href: '#who' },
      { label: 'Investor Relations', href: '#contact' },
      { label: 'Newsroom', href: '#insights' },
      { label: 'Careers', href: '#contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Insights', href: '#insights' },
      { label: 'Case Studies', href: '#solutions' },
      { label: 'Customer Stories', href: '#stories' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/netsol-technologies', Icon: Linkedin },
  { label: 'X (Twitter)', href: 'https://twitter.com/NETSOLTech', Icon: Twitter },
  { label: 'YouTube', href: 'https://www.youtube.com/@NETSOLTechnologies', Icon: Youtube },
  { label: 'Facebook', href: 'https://www.facebook.com/NETSOLTechnologies', Icon: Facebook },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
  };

  if (done) {
    return (
      <p className="mt-3 flex items-center gap-2 text-[13px] text-ink/70">
        <Check className="h-3.5 w-3.5 text-crimson" aria-hidden="true" />
        Thank you — check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex max-w-xs items-center gap-2">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="h-10 w-full border-b border-hairline bg-transparent text-[13.5px] text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ink/50"
      />
      <button
        type="submit"
        aria-label="Subscribe to NETSOL insights"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-ink/70 transition-all duration-300 hover:border-ink/40 hover:text-ink"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          {/* Brand */}
          <div>
            <NetsolLogo />
            <p className="mt-5 max-w-xs text-[13.5px] leading-[1.75] text-muted-foreground">
              Global leader in asset finance and leasing software. Shaping
              smarter finance since 1997.
            </p>
            <p className="eyebrow mt-8 text-muted-foreground/70">NETSOL Monthly</p>
            <NewsletterForm />
            <div className="mt-8 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink/55 transition-all duration-300 hover:border-ink/40 hover:text-ink"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="eyebrow text-ink/45">{col.heading}</h3>
              <ul className="mt-5 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block py-1.5 text-[13.5px] text-muted-foreground transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* HQ line */}
        <p className="mt-14 border-t border-hairline pt-8 text-[12.5px] leading-relaxed text-muted-foreground">
          {CONTACT_INFO.label} — {CONTACT_INFO.address} · {CONTACT_INFO.phone}
        </p>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[12px] text-muted-foreground">
            © 2026 NETSOL Technologies, Inc. All rights reserved.
          </p>
          <p className="tabular text-[12px] text-muted-foreground/70">
            NASDAQ: NTWK · ISO 27001 · SOC 2 Type II
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((label) => (
              <a
                key={label}
                href="#top"
                className="text-[12px] text-muted-foreground transition-colors hover:text-ink"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
