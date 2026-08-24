'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight, Briefcase, Sparkles, Users, Heart } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { CTAButton } from '@/components/site/cta-button';
import { CareerDetailModal } from '@/components/site/career-detail-modal';
import { CAREERS_ROLES } from '@/lib/site-data';

const TEAMS = ['All', 'Engineering', 'AI Labs', 'Design', 'Sales', 'Consultancy'] as const;
type Team = (typeof TEAMS)[number];

/**
 * Premium "Careers" section — open positions grid with team filter chips.
 * Includes a culture intro bar above the roles grid (engineering culture,
 * benefits strip, perks) plus per-role cards with team / location / tags.
 */
export function Careers() {
  const [activeTeam, setActiveTeam] = useState<Team>('All');
  const [openRoleId, setOpenRoleId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredRoles = useMemo(() => {
    if (activeTeam === 'All') return CAREERS_ROLES;
    return CAREERS_ROLES.filter((r) => r.team === activeTeam);
  }, [activeTeam]);

  const openRoleDetails = (id: string) => {
    setOpenRoleId(id);
    setModalOpen(true);
  };

  return (
    <section
      id="careers"
      className="relative w-full bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Careers at NETSOL"
    >
      {/* Topographic grid pattern background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#1d81f2 1px, transparent 1px), linear-gradient(90deg, #1d81f2 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Soft accent blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-[#1d81f2]/6 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-20 h-[360px] w-[360px] rounded-full bg-[#24a148]/6 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        {/* Top: culture intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#1d81f2]" />
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                Careers at NETSOL
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold tracking-tight text-[#161616] leading-tight">
              Build the operating system for global asset finance.
            </h2>
            <p className="mt-5 text-[15px] lg:text-[17px] text-[#525252] leading-[1.65] max-w-[600px]">
              We're hiring across engineering, AI Labs, design, and sales — for
              mission-critical roles that ship into production for the world's
              largest captives, banks, and OEMs. Six delivery centers. One
              team. Zero politics.
            </p>
          </Reveal>

          {/* Culture perks cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Briefcase, title: 'Real production', body: 'Every engineer ships to 200+ enterprise customers', accent: '#1d81f2' },
              { icon: Users, title: 'Global team', body: 'Six centers, twelve nationalities', accent: '#24a148' },
              { icon: Heart, title: 'Above market', body: 'Comp, learning budget, wellness stipend', accent: '#0f62fe' },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-[#e0e0e0] bg-white p-4 hover:shadow-premium transition-all duration-300"
              >
                <span
                  className="inline-flex items-center justify-center h-9 w-9 rounded-lg mb-3"
                  style={{ backgroundColor: `${p.accent}15`, color: p.accent }}
                >
                  <p.icon className="h-4 w-4" />
                </span>
                <div className="text-[13px] font-semibold text-[#161616]">{p.title}</div>
                <div className="mt-1 text-[11.5px] text-[#6b7280] leading-snug">{p.body}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team filter chips */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {TEAMS.map((t) => {
            const isActive = activeTeam === t;
            return (
              <button
                key={t}
                onClick={() => setActiveTeam(t)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#1d81f2] text-white border-[#1d81f2] shadow-soft'
                    : 'bg-white text-[#525252] border-[#e0e0e0] hover:border-[#1d81f2]/40 hover:text-[#1d81f2]'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Roles grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredRoles.map((role, i) => (
              <motion.article
                key={role.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openRoleDetails(role.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openRoleDetails(role.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className="group relative rounded-2xl bg-white border border-[#e0e0e0] p-6 overflow-hidden hover:shadow-premium-lg lift-on-hover cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d81f2]/40"
              >
                {/* Top accent strip */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: `linear-gradient(90deg, ${role.accent}, transparent)` }}
                />
                {/* Hover glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl"
                  style={{ backgroundColor: role.accent }}
                />

                <div className="relative z-10">
                  {/* Team + location */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: `${role.accent}15`, color: role.accent }}
                    >
                      <Sparkles className="h-3 w-3" />
                      {role.team}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#9ca3af]">
                      {role.type}
                    </span>
                  </div>

                  <h3 className="text-[17px] lg:text-[18px] font-semibold text-[#161616] leading-snug group-hover:text-[#1d81f2] transition-colors">
                    {role.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] text-[#525252] leading-[1.6]">
                    {role.summary}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-[#f5f7fa] border border-[#e0e0e0] px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-wider text-[#6b7280]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer: location + apply */}
                  <div className="mt-5 pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#6b7280]">
                      <MapPin className="h-3.5 w-3.5" />
                      {role.location}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openRoleDetails(role.id);
                      }}
                      className="inline-flex items-center gap-1 text-[13px] font-semibold group-hover:gap-1.5 transition-all"
                      style={{ color: role.accent }}
                    >
                      Apply
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA strip */}
        <Reveal delay={0.15}>
          <div className="mt-12 rounded-2xl border border-[#e0e0e0] bg-gradient-to-r from-[#f5f7fa] to-white p-6 lg:p-8 flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#6b7280]">
                Don't see your role?
              </div>
              <p className="mt-1 text-[16px] lg:text-[18px] font-medium text-[#161616]">
                Send us your profile — we hire for trajectory, not just job posts.
              </p>
            </div>
            <CTAButton href="#contact" className="text-[14px] px-5 py-2.5">
              Send your profile
              <ArrowUpRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </Reveal>
      </div>

      <CareerDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        roleId={openRoleId}
      />
    </section>
  );
}
