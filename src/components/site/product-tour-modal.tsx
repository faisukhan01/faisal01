'use client';

import { useCallback, useEffect, useSyncExternalStore, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  LayoutDashboard,
  FileText,
  Brain,
  Server,
  Boxes,
} from 'lucide-react';
import { PRODUCT_TOUR } from '@/lib/site-data';
import { cn } from '@/lib/utils';

interface ProductTourModalProps {
  open: boolean;
  onClose: () => void;
  /** Optional starting step (0..4). Defaults to 0. */
  initialStep?: number;
}

type TourStep = (typeof PRODUCT_TOUR)['steps'][number];

const TOTAL = PRODUCT_TOUR.steps.length;
const AUTO_ADVANCE_MS = 8000;

/** Media-query hook for applying isometric 3D tilt on lg+ only. */
const LG_QUERY = '(min-width: 1024px)';
function subscribeLg(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia(LG_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
function getLgSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(LG_QUERY).matches;
}
function getLgServerSnapshot(): boolean {
  return false;
}
function useIsLg(): boolean {
  return useSyncExternalStore(subscribeLg, getLgSnapshot, getLgServerSnapshot);
}

/* ===========================================================================
   MOCKUPS — pure CSS / SVG "fake UI" for each tour step
   =========================================================================== */

function MockupShell({
  accent,
  moduleCode,
  icon: Icon,
  title,
  children,
}: {
  accent: string;
  moduleCode: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  children: React.ReactNode;
}) {
  const isLg = useIsLg();
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-white border border-[#e0e0e0] shadow-depth p-5 overflow-hidden',
        isLg && 'isometric-stack'
      )}
    >
      {/* Decorative top-left accent blob */}
      <div
        className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full opacity-30 blur-2xl"
        style={{ background: accent }}
        aria-hidden
      />

      {/* Module code chip — top right */}
      <span
        className="absolute top-3 right-3 z-10 font-mono text-[10px] font-semibold uppercase tracking-wider rounded-md px-2 py-0.5"
        style={{
          color: accent,
          background: `${accent}14`,
          border: `1px solid ${accent}33`,
        }}
      >
        {moduleCode}
      </span>

      {/* Header */}
      <div className="relative flex items-center gap-2 mb-4">
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white"
          style={{ background: accent }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280]">
          {title}
        </span>
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}

function DashboardMockup({ accent, moduleCode }: { accent: string; moduleCode: string }) {
  const cards = [
    { label: 'Originations', value: '1,284' },
    { label: 'Decisions/min', value: '312' },
    { label: 'Funded 24h', value: '$412M' },
    { label: 'Decision SLA', value: '4.2h' },
  ];
  return (
    <MockupShell accent={accent} moduleCode={moduleCode} icon={LayoutDashboard} title="Command Center">
      {/* Live indicator bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="live-pulse-dot h-1.5 w-1.5 rounded-full bg-[#24a148]" />
          <span className="text-[10px] font-medium text-[#6b7280]">Live · 14:02 UTC</span>
        </div>
        <span className="text-[9px] text-[#9ca3af] font-mono">REGION · EMEA</span>
      </div>

      {/* 2x2 stat grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {cards.map((c, i) => (
          <div key={i} className="rounded-lg bg-[#f5f7fa] border border-[#eef1f5] p-2.5">
            <div className="text-[9px] uppercase tracking-wider text-[#6b7280]">{c.label}</div>
            <div className="mt-0.5 text-[15px] font-bold text-[#161616] font-mono-numeric leading-none">
              {c.value}
            </div>
            <div
              className="mt-1 h-0.5 w-8 rounded-full"
              style={{ background: accent }}
              aria-hidden
            />
          </div>
        ))}
      </div>

      {/* Activity ticker */}
      <div className="rounded-md bg-[#0a0d12] px-2.5 py-1.5 mb-3 overflow-hidden">
        <div className="flex items-center gap-2 text-[10px] text-white/80 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 live-pulse-dot shrink-0" />
          <span className="truncate">
            14:02 · Contract #N-48201 funded · $48,200 · Tesla Model Y
          </span>
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="rounded-md bg-[#f5f7fa] p-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] uppercase tracking-wider text-[#6b7280]">
            Funded volume · 24h
          </span>
          <span className="text-[10px] font-mono-numeric font-semibold" style={{ color: accent }}>
            +6.4%
          </span>
        </div>
        <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full h-12">
          <defs>
            <linearGradient id="ds-spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.32" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,35 L20,28 L40,32 L60,18 L80,22 L100,14 L120,16 L140,8 L160,12 L180,4 L200,6 L200,50 L0,50 Z"
            fill="url(#ds-spark)"
          />
          <path
            d="M0,35 L20,28 L40,32 L60,18 L80,22 L100,14 L120,16 L140,8 L160,12 L180,4 L200,6"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </MockupShell>
  );
}

function OriginationMockup({ accent, moduleCode }: { accent: string; moduleCode: string }) {
  const stages = [
    { label: 'Application', width: '100%', count: '1,284' },
    { label: 'KYC', width: '92%', count: '1,181' },
    { label: 'Credit', width: '78%', count: '1,001' },
    { label: 'Docs', width: '64%', count: '822' },
    { label: 'Funded', width: '52%', count: '668' },
  ];
  return (
    <MockupShell accent={accent} moduleCode={moduleCode} icon={FileText} title="Origination Funnel">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-medium text-[#525252]">5-stage flow</span>
        <span className="text-[10px] text-[#9ca3af] font-mono">36h avg cycle</span>
      </div>
      <div className="flex flex-col gap-2">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="text-[10px] font-medium text-[#525252] w-16 shrink-0">{s.label}</div>
            <div className="flex-1 h-7 rounded-md bg-[#f5f7fa] border border-[#eef1f5] overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: s.width }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-md flex items-center justify-end pr-2"
                style={{
                  background: `linear-gradient(90deg, ${accent}cc, ${accent})`,
                }}
              >
                <span className="text-[10px] font-semibold text-white font-mono-numeric">
                  {s.count}
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-md bg-[#f5f7fa] px-3 py-2">
        <span className="text-[10px] uppercase tracking-wider text-[#6b7280]">
          End-to-end conversion
        </span>
        <span className="text-[13px] font-bold font-mono-numeric" style={{ color: accent }}>
          52.0%
        </span>
      </div>
    </MockupShell>
  );
}

function DecisioningMockup({ accent, moduleCode }: { accent: string; moduleCode: string }) {
  // Circular score gauge — 96% arc fill
  const r = 32;
  const c = 2 * Math.PI * r;
  const pct = 0.96;
  const dash = c * pct;

  const features = [
    { label: 'Credit score', value: 0.92 },
    { label: 'Income stability', value: 0.85 },
    { label: 'Debt-to-income', value: 0.78 },
  ];

  return (
    <MockupShell accent={accent} moduleCode={moduleCode} icon={Brain} title="AI Decision Engine">
      <div className="flex items-center gap-4 mb-4">
        {/* Score gauge */}
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" stroke="#f0f0f0" strokeWidth="6" />
            <motion.circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke={accent}
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${c}` }}
              animate={{ strokeDasharray: `${dash} ${c - dash}` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[16px] font-bold text-[#161616] leading-none font-mono-numeric">
              96
            </div>
            <div className="text-[8px] uppercase tracking-wider text-[#6b7280] mt-0.5">score</div>
          </div>
        </div>

        {/* Applicant + decision */}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-[#6b7280]">Applicant</div>
          <div className="text-[14px] font-semibold text-[#161616] truncate">
            J. Rivera · #A-22841
          </div>
          <div className="mt-0.5 text-[10px] text-[#9ca3af]">Mid-ticket auto · $32,400</div>
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#24a148]/12 px-2 py-0.5 text-[10px] font-semibold text-[#1f8a3c]">
            <Check className="h-3 w-3" /> APPROVED · 4.2h SLA
          </div>
        </div>
      </div>

      {/* Top features list */}
      <div className="space-y-2.5">
        {features.map((f, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="font-medium text-[#525252]">{f.label}</span>
              <span className="font-mono-numeric text-[#6b7280]">{f.value.toFixed(2)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#f5f7fa] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${f.value * 100}%` }}
                transition={{ duration: 0.6, delay: 0.1 + 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: accent }}
              />
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

function ServicingMockup({ accent, moduleCode }: { accent: string; moduleCode: string }) {
  const rows = [
    { id: 'NSL-48201', balance: '$24,820', next: '$612', status: 'Current' },
    { id: 'NSL-48202', balance: '$18,401', next: '$445', status: 'Current' },
    { id: 'NSL-48203', balance: '$31,228', next: '$781', status: 'Late' },
    { id: 'NSL-48204', balance: '$0', next: '—', status: 'Closed' },
  ];
  const statusColor = (s: string): string => {
    if (s === 'Current') return '#24a148';
    if (s === 'Late') return '#f59e0b';
    return '#9ca3af';
  };

  return (
    <MockupShell accent={accent} moduleCode={moduleCode} icon={Server} title="Active Ledger">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-medium text-[#525252]">4 of 38,214 contracts</span>
        <span className="text-[10px] text-[#9ca3af] font-mono">7 markets · USD</span>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-[1fr_0.8fr_0.7fr_0.7fr] gap-2 px-2 pb-1.5 border-b border-[#e8eaed] text-[9px] uppercase tracking-wider text-[#9ca3af]">
        <div>Contract</div>
        <div className="text-right">Balance</div>
        <div className="text-right">Next pmt</div>
        <div className="text-center">Status</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#f5f7fa]">
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_0.8fr_0.7fr_0.7fr] gap-2 px-2 py-2 items-center text-[10.5px]"
          >
            <div className="font-mono text-[#161616] font-semibold">{r.id}</div>
            <div className="text-right font-mono-numeric text-[#161616]">{r.balance}</div>
            <div className="text-right font-mono-numeric text-[#525252]">{r.next}</div>
            <div className="flex justify-center">
              <span
                className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                style={{
                  color: statusColor(r.status),
                  background: `${statusColor(r.status)}14`,
                }}
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: statusColor(r.status) }}
                />
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-md bg-[#f5f7fa] px-3 py-2">
        <span className="text-[10px] uppercase tracking-wider text-[#6b7280]">
          Servicing uptime · 90d
        </span>
        <span className="text-[13px] font-bold font-mono-numeric" style={{ color: accent }}>
          99.98%
        </span>
      </div>
    </MockupShell>
  );
}

function MarketplaceMockup({ accent, moduleCode }: { accent: string; moduleCode: string }) {
  const modules = [
    { name: 'Calc Engine', code: 'FX' },
    { name: 'Doc Pack', code: 'DC' },
    { name: 'KYC Adapter', code: 'KY' },
    { name: 'Telematics', code: 'TM' },
    { name: 'Compliance', code: 'CP' },
    { name: 'Residuals', code: 'RV' },
    { name: 'E-Signature', code: 'ES' },
    { name: 'Payoff API', code: 'PY' },
    { name: 'Credit Pull', code: 'CR' },
  ];

  return (
    <MockupShell accent={accent} moduleCode={moduleCode} icon={Boxes} title="Module Catalog">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-medium text-[#525252]">9 of 42 modules shown</span>
        <span className="text-[10px] text-[#9ca3af] font-mono">~8h activation</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {modules.map((m, i) => (
          <div
            key={i}
            className="rounded-md border border-[#f0f0f0] bg-white p-2 flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <div
                className="h-6 w-6 rounded-md flex items-center justify-center text-[8px] font-bold text-white"
                style={{ background: accent }}
              >
                {m.code}
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-[#24a148] live-pulse-dot" />
            </div>
            <div className="text-[9.5px] font-semibold text-[#161616] leading-tight">{m.name}</div>
            <div className="inline-flex items-center gap-0.5 rounded-full px-1 py-0 text-[8px] font-semibold text-[#1f8a3c] bg-[#24a148]/12 w-fit">
              ACTIVE
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-md bg-[#f5f7fa] px-3 py-2">
        <span className="text-[10px] uppercase tracking-wider text-[#6b7280]">
          API calls · today
        </span>
        <span className="text-[13px] font-bold font-mono-numeric" style={{ color: accent }}>
          14M
        </span>
      </div>
    </MockupShell>
  );
}

function StepMockup({ step }: { step: TourStep }) {
  switch (step.id) {
    case 'dashboard':
      return <DashboardMockup accent={step.accent} moduleCode={step.moduleCode} />;
    case 'origination':
      return <OriginationMockup accent={step.accent} moduleCode={step.moduleCode} />;
    case 'decisioning':
      return <DecisioningMockup accent={step.accent} moduleCode={step.moduleCode} />;
    case 'servicing':
      return <ServicingMockup accent={step.accent} moduleCode={step.moduleCode} />;
    case 'marketplace':
      return <MarketplaceMockup accent={step.accent} moduleCode={step.moduleCode} />;
    default:
      return null;
  }
}

/* ===========================================================================
   MODAL — controlled by parent. open + onClose + optional initialStep.
   =========================================================================== */

export function ProductTourModal({ open, onClose, initialStep = 0 }: ProductTourModalProps) {
  const [step, setStep] = useState(() =>
    Math.min(Math.max(initialStep ?? 0, 0), TOTAL - 1)
  );
  const [direction, setDirection] = useState<1 | -1>(1);
  const hoverRef = useRef(false);

  // Reset step when the modal opens (so a chip click starts at that step).
  // Done via key-remount in the parent (ProductTourCTA), so the lazy useState
  // init above handles it without an effect.
  // No effect needed here — keeps react-hooks/set-state-in-effect happy.

  // Body scroll lock while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape + arrow-key navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        setDirection(1);
        setStep((prev) => {
          if (prev >= TOTAL - 1) {
            window.setTimeout(onClose, 200);
            return prev;
          }
          return prev + 1;
        });
      } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
        setStep((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Auto-advance every 8s, paused on hover
  useEffect(() => {
    if (!open) return;
    const id = window.setInterval(() => {
      if (hoverRef.current) return;
      setDirection(1);
      setStep((prev) => {
        if (prev >= TOTAL - 1) {
          window.setTimeout(onClose, 200);
          return prev;
        }
        return prev + 1;
      });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [open, onClose]);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((prev) => {
      if (prev >= TOTAL - 1) {
        window.setTimeout(onClose, 200);
        return prev;
      }
      return prev + 1;
    });
  }, [onClose]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const jumpTo = useCallback(
    (i: number) => {
      const clamped = Math.min(Math.max(i, 0), TOTAL - 1);
      setDirection(clamped >= step ? 1 : -1);
      setStep(clamped);
    },
    [step]
  );

  const current = PRODUCT_TOUR.steps[step];
  const isLast = step === TOTAL - 1;

  const variants = {
    enter: (dir: 1 | -1) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir > 0 ? -28 : 28, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="backdrop-premium fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              hoverRef.current = true;
            }}
            onMouseLeave={() => {
              hoverRef.current = false;
            }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-depth-lg gradient-border-animated flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`Product tour — Step ${current.number}: ${current.label}`}
          >
            {/* Top accent bar (animated width on step change) */}
            <div className="h-[6px] w-full shrink-0 overflow-hidden">
              <motion.div
                className="h-full"
                key={`${current.id}-${step}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: `linear-gradient(90deg, ${current.accent}, #56ccf2 60%, ${current.accent})`,
                }}
              />
            </div>

            {/* Header */}
            <div className="shrink-0 sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-[#f0f0f0] px-5 lg:px-8 py-3.5">
              <div className="flex items-center justify-between gap-3">
                {/* Left: step indicator + label */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[11px] tracking-wider text-[#6b7280] shrink-0">
                    STEP {String(current.number).padStart(2, '0')} /{' '}
                    {String(TOTAL).padStart(2, '0')}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#f5f7fa] border border-[#e0e0e0] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#525252]">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: current.accent }}
                    />
                    {current.label}
                  </span>
                </div>

                {/* Center: module label chip with accent tint */}
                <div className="hidden md:flex items-center justify-center flex-1 min-w-0">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider truncate"
                    style={{
                      color: current.accent,
                      background: `${current.accent}14`,
                      border: `1px solid ${current.accent}33`,
                    }}
                  >
                    {current.moduleLabel}
                  </span>
                </div>

                {/* Right: close */}
                <button
                  onClick={onClose}
                  aria-label="Close tour"
                  className="h-9 w-9 shrink-0 rounded-full bg-[#f5f7fa] text-[#525252] flex items-center justify-center hover:bg-[#1d81f2]/10 hover:text-[#1d81f2] transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-[1.1fr_1fr] gap-0">
                {/* Left: visual mockup */}
                <div className="relative p-5 lg:p-7 bg-gradient-to-br from-[#f5f7fa] to-white border-b lg:border-b-0 lg:border-r border-[#e8eaed]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`mockup-${current.id}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <StepMockup step={current} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right: content panel */}
                <div className="p-5 lg:p-7 flex flex-col min-h-[420px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current.id}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col h-full"
                    >
                      {/* Big mono step number */}
                      <div
                        className="font-mono text-[56px] lg:text-[64px] leading-none font-bold tracking-tight mb-1"
                        style={{ color: `${current.accent}22` }}
                      >
                        {String(current.number).padStart(2, '0')}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#161616] leading-tight tracking-tight">
                        {current.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-[15px] leading-relaxed text-[#525252]">
                        {current.description}
                      </p>

                      {/* KPI cards 2x2 */}
                      <div className="mt-5 grid grid-cols-2 gap-2.5">
                        {current.kpis.map((kpi, i) => {
                          const positive =
                            kpi.trend.startsWith('+') ||
                            kpi.trend.startsWith('-') ||
                            kpi.trend.toLowerCase() === 'stable';
                          const trendColor = kpi.trend.startsWith('-')
                            ? '#24a148'
                            : kpi.trend.toLowerCase() === 'stable'
                              ? '#9ca3af'
                              : current.accent;
                          return (
                            <div
                              key={i}
                              className="rounded-xl border border-[#e8eaed] bg-white p-3 flex flex-col gap-1.5"
                            >
                              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] leading-tight">
                                {kpi.label}
                              </div>
                              <div className="text-[22px] font-bold text-[#161616] leading-none font-mono-numeric">
                                {kpi.value}
                              </div>
                              <div
                                className="inline-flex self-start items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                                style={{
                                  color: trendColor,
                                  background: `${trendColor}14`,
                                }}
                                aria-label={`Trend ${positive ? 'positive' : 'neutral'}: ${kpi.trend}`}
                              >
                                {kpi.trend}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Spacer */}
                      <div className="flex-1 min-h-4" />

                      {/* Footer actions */}
                      <div className="mt-5 pt-4 border-t border-[#f0f0f0] flex items-center justify-between gap-3">
                        {/* Previous — hidden on step 1 */}
                        {step === 0 ? (
                          <div className="w-[88px] shrink-0" aria-hidden />
                        ) : (
                          <button
                            onClick={goPrev}
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#525252] hover:text-[#161616] transition-colors px-3 py-2 rounded-lg hover:bg-[#f5f7fa]"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Previous
                          </button>
                        )}

                        {/* Step dots */}
                        <div className="flex items-center gap-2">
                          {PRODUCT_TOUR.steps.map((s, i) => (
                            <button
                              key={s.id}
                              onClick={() => jumpTo(i)}
                              aria-label={`Jump to step ${s.number}: ${s.label}`}
                              className={cn(
                                'tour-step-dot h-2 rounded-full transition-all',
                                i === step
                                  ? 'w-8'
                                  : 'w-2 bg-[#e0e0e0] hover:bg-[#9ca3af]'
                              )}
                              style={
                                i === step
                                  ? { background: current.accent, color: current.accent }
                                  : undefined
                              }
                            />
                          ))}
                        </div>

                        {/* Next / Finish */}
                        <button
                          onClick={goNext}
                          className="btn-shine lift-on-hover inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[13px] font-semibold text-white transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${current.accent}, ${current.accent}cc)`,
                            boxShadow: `0 8px 24px -8px ${current.accent}99`,
                          }}
                        >
                          {isLast ? (
                            <>
                              <Check className="h-4 w-4" />
                              Finish
                            </>
                          ) : (
                            <>
                              Next
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
