'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Share2,
  MapPin,
  Briefcase,
  DollarSign,
  User,
  Mail,
  Building2,
  Clock,
} from 'lucide-react';
import { CAREERS_ROLES, CAREER_DETAILS } from '@/lib/site-data';

interface CareerDetailModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Called when the user requests to close (Escape / backdrop / X). */
  onClose: () => void;
  /** Initial role id to display. The modal cycles through other roles via Prev/Next. */
  roleId: string | null;
}

type CareerDetail = {
  team: string;
  reportsTo: string;
  compensation: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  perks: readonly string[];
};

function getDetail(id: string): CareerDetail | null {
  const all = CAREER_DETAILS.details as Record<string, CareerDetail>;
  return all[id] ?? null;
}

/**
 * Premium career-detail modal — opens when a Careers role card or "Apply"
 * link is clicked. Renders the full job description (responsibilities,
 * requirements, perks) plus a sticky aside with team / location / type /
 * reports-to / compensation. Previous/Next buttons cycle through the
 * CAREERS_ROLES array; the body content re-runs an entrance animation on
 * each role change.
 */
export function CareerDetailModal({ open, onClose, roleId }: CareerDetailModalProps) {
  const [currentRoleId, setCurrentRoleId] = useState<string | null>(roleId);
  const [animKey, setAnimKey] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  const [lastSeenPropRoleId, setLastSeenPropRoleId] = useState<string | null>(
    roleId,
  );

  // Sync the internal role state when the modal opens / re-opens or when the
  // parent passes a new role id while the modal is already open. Done in the
  // render phase (conditional setState during render) — the recommended React
  // pattern for "storing information from previous renders" — to avoid the
  // cascading-render lint rule on setState-in-effect.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && roleId) {
      setLastSeenPropRoleId(roleId);
      setCurrentRoleId(roleId);
      setAnimKey((k) => k + 1);
    }
  } else if (open && roleId !== lastSeenPropRoleId) {
    setLastSeenPropRoleId(roleId);
    setCurrentRoleId(roleId);
    setAnimKey((k) => k + 1);
  }

  // Body scroll lock + Escape-to-close while the modal is visible.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const role = CAREERS_ROLES.find((r) => r.id === currentRoleId) ?? null;
  const details = currentRoleId ? getDetail(currentRoleId) : null;

  const currentIndex = CAREERS_ROLES.findIndex((r) => r.id === currentRoleId);
  const cycle = (delta: number) => {
    if (currentIndex < 0) return;
    const idx =
      (currentIndex + delta + CAREERS_ROLES.length) % CAREERS_ROLES.length;
    setCurrentRoleId(CAREERS_ROLES[idx].id);
    setAnimKey((k) => k + 1);
  };
  const handlePrev = () => cycle(-1);
  const handleNext = () => cycle(1);

  // "Apply" closes the modal and smooth-scrolls to the contact section.
  const handleApply = () => {
    onClose();
    requestAnimationFrame(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const data = {
      title: role ? role.title : 'Open role at NETSOL',
      text: role ? role.summary : '',
      url,
    };
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      navigator.share(data).catch(() => undefined);
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => undefined);
    }
  };

  return (
    <AnimatePresence>
      {open && role && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="backdrop-premium fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-depth-lg flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={role.title}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar — animated gradient (4px) */}
            <div
              aria-hidden
              className="h-1 w-full shrink-0"
              style={{
                background: `linear-gradient(90deg, ${role.accent}, #56ccf2, ${role.accent})`,
                backgroundSize: '200% 100%',
                animation: 'gradient-text-shimmer 6s linear infinite',
              }}
            />

            {/* Sticky header */}
            <div className="shrink-0 flex items-center justify-between gap-3 border-b border-[#f0f0f0] bg-white/95 backdrop-blur px-5 lg:px-7 py-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{ backgroundColor: `${role.accent}15`, color: role.accent }}
              >
                <Building2 className="h-3 w-3" />
                {role.team}
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[2px] text-[#9ca3af]">
                <span className="h-1 w-1 rounded-full bg-[#1d81f2]" />
                Job details
              </span>
              <button
                onClick={onClose}
                aria-label="Close role details"
                className="h-9 w-9 rounded-full bg-[#f5f7fa] text-[#525252] flex items-center justify-center hover:bg-[#1d81f2]/10 hover:text-[#1d81f2] hover:scale-105 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body — scrollable, content swaps on role change */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={animKey}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Hero block */}
                  <div className="p-6 lg:p-8 pb-4">
                    <span className="section-heading-chip">
                      <Sparkles className="h-3 w-3" />
                      {role.team}
                    </span>
                    <h2 className="mt-4 text-2xl lg:text-3xl font-bold text-[#161616] leading-tight tracking-tight">
                      {role.title}
                    </h2>
                    <p className="mt-3 text-sm text-[#525252] leading-relaxed max-w-[620px]">
                      {role.summary}
                    </p>

                    {/* Tags row */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-wider border"
                          style={{
                            borderColor: `${role.accent}40`,
                            color: role.accent,
                            backgroundColor: `${role.accent}0a`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Hero CTAs */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleApply}
                        className="btn-shine btn-glow group relative inline-flex items-center gap-2 rounded-[10px] bg-[#1d81f2] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0f62fe] transition-colors shadow-[0_8px_24px_-8px_rgba(15,98,254,0.55)]"
                      >
                        <span className="relative z-10">Apply now</span>
                        <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                      <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 rounded-[10px] border border-[#e0e0e0] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#525252] hover:border-[#1d81f2]/40 hover:text-[#1d81f2] transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        Share role
                      </button>
                    </div>
                  </div>

                  {/* Two-column body OR fallback */}
                  {details ? (
                    <div className="lg:grid lg:grid-cols-[1.6fr_1fr] gap-8 px-6 lg:px-8 pb-8">
                      {/* Left column — main content */}
                      <div className="space-y-8">
                        {/* What you'll do */}
                        <section>
                          <h3 className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#6b7280] mb-4">
                            What you&rsquo;ll do
                          </h3>
                          <ol className="space-y-3.5">
                            {details.responsibilities.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3.5 text-[14.5px] text-[#525252] leading-relaxed"
                              >
                                <span
                                  className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white"
                                  style={{ backgroundColor: role.accent }}
                                >
                                  {i + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ol>
                        </section>

                        {/* What you'll bring */}
                        <section>
                          <h3 className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#6b7280] mb-4">
                            What you&rsquo;ll bring
                          </h3>
                          <ul className="space-y-3.5">
                            {details.requirements.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3.5 text-[14.5px] text-[#525252] leading-relaxed"
                              >
                                <CheckCircle2 className="shrink-0 h-5 w-5 mt-0.5 text-[#24a148]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </section>

                        {/* How you'll grow */}
                        <section>
                          <h3 className="text-[13px] font-semibold uppercase tracking-[1.5px] text-[#6b7280] mb-4">
                            How you&rsquo;ll grow
                          </h3>
                          <ul className="space-y-3.5">
                            {details.perks.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3.5 text-[14.5px] text-[#525252] leading-relaxed"
                              >
                                <span
                                  className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full"
                                  style={{
                                    backgroundColor: `${role.accent}15`,
                                    color: role.accent,
                                  }}
                                >
                                  <Sparkles className="h-3.5 w-3.5" />
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>

                      {/* Right column — sticky aside */}
                      <aside
                        className="career-aside space-y-4 mt-8 lg:mt-0"
                        style={{ top: '16px' }}
                      >
                        {/* About this role */}
                        <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5 shadow-depth">
                          <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#9ca3af] mb-3">
                            About this role
                          </div>
                          <dl className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                              <dt className="flex items-center gap-2 text-[12.5px] text-[#6b7280]">
                                <Briefcase className="h-3.5 w-3.5" />
                                Team
                              </dt>
                              <dd className="text-[13px] font-semibold text-[#161616] text-right">
                                {details.team}
                              </dd>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <dt className="flex items-center gap-2 text-[12.5px] text-[#6b7280]">
                                <MapPin className="h-3.5 w-3.5" />
                                Location
                              </dt>
                              <dd className="text-[13px] font-semibold text-[#161616] text-right">
                                {role.location}
                              </dd>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <dt className="flex items-center gap-2 text-[12.5px] text-[#6b7280]">
                                <Clock className="h-3.5 w-3.5" />
                                Type
                              </dt>
                              <dd className="text-[13px] font-semibold text-[#161616] text-right">
                                {role.type}
                              </dd>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                              <dt className="flex items-center gap-2 text-[12.5px] text-[#6b7280]">
                                <User className="h-3.5 w-3.5" />
                                Reports to
                              </dt>
                              <dd className="text-[13px] font-semibold text-[#161616] text-right max-w-[60%]">
                                {details.reportsTo}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Compensation */}
                        <div className="rounded-2xl border border-[#1d81f2]/15 bg-gradient-to-br from-[#f0f8ff] to-[#f5f7fa] p-5">
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#1d81f2] mb-3">
                            <DollarSign className="h-3.5 w-3.5" />
                            Compensation
                          </div>
                          <div className="text-gradient-animated text-[20px] lg:text-[22px] font-bold tracking-tight leading-tight">
                            {details.compensation}
                          </div>
                          <p className="mt-2 text-[11.5px] text-[#6b7280] leading-snug">
                            Compensation details shared in initial screen.
                          </p>
                        </div>

                        {/* Apply CTA card */}
                        <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
                          <button
                            onClick={handleApply}
                            className="btn-shine group relative w-full inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[14px] font-semibold text-white transition-colors"
                            style={{
                              backgroundColor: role.accent,
                              boxShadow: `0 8px 24px -8px ${role.accent}88`,
                            }}
                          >
                            <span className="relative z-10">Apply now</span>
                            <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                          <div className="mt-3 flex items-start gap-2 text-[11.5px] text-[#6b7280] leading-snug">
                            <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#1d81f2]" />
                            <span>
                              Have questions? Email{' '}
                              <a
                                href="mailto:careers@netsol.com"
                                className="font-semibold text-[#1d81f2] hover:underline"
                              >
                                careers@netsol.com
                              </a>
                            </span>
                          </div>
                        </div>
                      </aside>
                    </div>
                  ) : (
                    /* Fallback — details map missing this role id */
                    <div className="px-6 lg:px-8 pb-10 pt-2">
                      <div className="rounded-2xl border border-dashed border-[#e0e0e0] bg-[#f5f7fa] p-8 text-center">
                        <p className="text-[15px] text-[#525252] leading-relaxed">
                          A full description for this role is being prepared.
                          In the meantime, apply via the form below and our team
                          will reach out.
                        </p>
                        <button
                          onClick={handleApply}
                          className="btn-shine btn-glow mt-5 inline-flex items-center gap-2 rounded-[10px] bg-[#1d81f2] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0f62fe] transition-colors"
                        >
                          <span className="relative z-10">Apply now</span>
                          <ArrowRight className="relative z-10 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sticky footer — prev/next cycle */}
            <div className="shrink-0 border-t border-[#e0e0e0] bg-white/95 backdrop-blur px-5 lg:px-7 py-3 flex items-center justify-between gap-3">
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#9ca3af]">
                Job ref: {role.id}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-[#525252] hover:bg-[#f5f7fa] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Previous role</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                <button
                  onClick={handleNext}
                  className="chip-selected inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  <span className="hidden sm:inline">Next role</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
