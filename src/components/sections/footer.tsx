'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { FaqLogo } from '@/components/site/logo';

const FOOTER_COLUMNS = [
  {
    heading: 'Products',
    links: [
      { label: 'Concordia', href: '#products' },
      { label: 'Staffist', href: '#products' },
      { label: 'Case studies', href: '#products' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Founders', href: '#founders' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '#top' },
      { label: 'Terms', href: '#top' },
      { label: 'Cookies', href: '#top' },
    ],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: Linkedin },
  { label: 'X (Twitter)', href: 'https://twitter.com', Icon: Twitter },
  { label: 'GitHub', href: 'https://github.com', Icon: Github },
  { label: 'Email', href: 'mailto:hello@faq.systems', Icon: Mail },
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
        aria-label="Subscribe to FaQ Systems product updates"
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
            <FaqLogo />
            <p className="mt-5 max-w-xs text-[13.5px] leading-[1.75] text-muted-foreground">
              Intelligent software, automation and digital systems — built
              end-to-end by two founders.
            </p>
            <p className="eyebrow mt-8 text-muted-foreground/70">Product updates</p>
            <NewsletterForm />
            <div className="mt-8 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
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

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center">
          <p className="text-[12px] text-muted-foreground">
            © 2026 FaQ Systems. All rights reserved.
          </p>
          <p className="text-[12px] text-muted-foreground/70">
            Remote-first · Self-funded · Engineer-led
          </p>
        </div>
      </div>
    </footer>
  );
}
