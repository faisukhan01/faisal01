'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { ComponentType, ReactNode, RefObject } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Lock,
  Search,
  UserPlus,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ————————————————————————————————————————————————
   Product showcase — an auto-rotating carousel of REAL
   HTML dashboards (not images), so every label is crisp.
   Each slide is a fixed 1024×640 artboard scaled to the
   container, like a screenshot that never blurs.
   ———————————————————————————————————————————————— */

const ARTBOARD_W = 1024;
const ARTBOARD_H = 640;

const SLIDES = [
  {
    id: 'concordia',
    name: 'Concordia',
    tagline: 'College management system — 12 modules, one platform',
    url: 'app.concordia.edu',
    accent: '#007aff',
  },
  {
    id: 'staffist',
    name: 'Staffist',
    tagline: 'UK staffing — matching, scheduling and compliance',
    url: 'app.staffist.co.uk',
    accent: '#1a2332',
  },
  {
    id: 'ops',
    name: 'FaQ Ops',
    tagline: 'We operate what we ship — monitored, deployed, backed up',
    url: 'status.faq.systems',
    accent: '#24a148',
  },
] as const;

/* ————— artboard stage: scales a fixed-size child to container width ————— */

/* Track an element's width via ResizeObserver without setState-in-effect. */
function useElementWidth(ref: RefObject<HTMLDivElement | null>) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const el = ref.current;
      if (!el) return () => {};
      const ro = new ResizeObserver(onStoreChange);
      ro.observe(el);
      return () => ro.disconnect();
    },
    [ref]
  );
  const getSnapshot = useCallback(() => ref.current?.clientWidth ?? 0, [ref]);
  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
}

function ScaledStage({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(wrapRef);
  const scale = width > 0 ? width / ARTBOARD_W : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${ARTBOARD_W} / ${ARTBOARD_H}` }}
    >
      <div
        style={{
          width: ARTBOARD_W,
          height: ARTBOARD_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          opacity: scale > 0 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        className="absolute left-0 top-0"
      >
        {children}
      </div>
    </div>
  );
}

/* ————— tiny shared pieces ————— */
function SideItem({
  icon: Icon,
  label,
  active,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[12.5px] font-medium',
        active ? 'bg-[#007aff]/[0.09] text-[#007aff]' : 'text-[#4a5568]'
      )}
    >
      <Icon className={cn('h-[14px] w-[14px]', active ? 'text-[#007aff]' : 'text-[#98a2b3]')} />
      {label}
    </div>
  );
}

function Kpi({
  value,
  label,
  delta,
  positive = true,
  accent,
}: {
  value: string;
  label: string;
  delta: string;
  positive?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex-1 rounded-xl border border-[#e8ecf2] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgb(16_24_40/0.04)]">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">{label}</p>
      <div className="mt-1.5 flex items-baseline gap-2">
        <p
          className={cn(
            'text-[24px] font-bold leading-none tracking-tight',
            accent ? 'text-[#007aff]' : 'text-[#101828]'
          )}
        >
          {value}
        </p>
        <span
          className={cn(
            'text-[10.5px] font-semibold',
            positive ? 'text-[#12b76a]' : 'text-[#f79009]'
          )}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

/* ————— Slide 1 · Concordia campus console ————— */
function ConcordiaSlide() {
  const admissions = [
    { name: 'Ayesha Raza', meta: 'ICS Part I · Morning', status: 'Enrolled', tone: 'blue' },
    { name: 'Hamza Tariq', meta: 'FSc Pre-Eng · A', status: 'Enrolled', tone: 'blue' },
    { name: 'Zainab Ali', meta: 'ICom Part I', status: 'Pending', tone: 'amber' },
    { name: 'Bilal Ahmed', meta: 'FSc Pre-Med · B', status: 'Review', tone: 'ink' },
  ] as const;

  return (
    <div className="flex h-full w-full bg-[#f7f9fc] text-left">
      {/* sidebar */}
      <aside className="flex w-[208px] shrink-0 flex-col border-r border-[#e8ecf2] bg-white px-3.5 py-4">
        <div className="flex items-center gap-2.5 px-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#007aff] text-[13px] font-bold text-white">
            C
          </span>
          <div>
            <p className="text-[13.5px] font-bold leading-tight text-[#101828]">Concordia</p>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#98a2b3]">
              College OS
            </p>
          </div>
        </div>
        <nav className="mt-5 flex flex-col gap-0.5">
          <SideItem icon={LayoutDashboard} label="Dashboard" active />
          <SideItem icon={UserPlus} label="Admissions" />
          <SideItem icon={CalendarCheck} label="Attendance" />
          <SideItem icon={CreditCard} label="Fees" />
          <SideItem icon={ClipboardList} label="Examinations" />
          <SideItem icon={Users} label="HR & Payroll" />
        </nav>
        <div className="mt-auto rounded-xl bg-[#f7f9fc] px-3.5 py-3">
          <p className="text-[10.5px] font-semibold text-[#4a5568]">Fall term · Week 11</p>
          <p className="mt-1 text-[9.5px] text-[#98a2b3]">Biometric sync · 06:00</p>
        </div>
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col px-6 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold tracking-tight text-[#101828]">Campus overview</h3>
            <p className="mt-0.5 text-[11px] text-[#98a2b3]">All blocks · live from biometric gates</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-44 items-center gap-2 rounded-lg border border-[#e8ecf2] bg-white px-3 text-[11.5px] text-[#98a2b3]">
              <Search className="h-3.5 w-3.5" />
              Search students…
            </div>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8ecf2] bg-white">
              <Bell className="h-3.5 w-3.5 text-[#4a5568]" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#007aff]" />
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a2332] text-[10.5px] font-bold text-white">
              FK
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-3.5">
          <Kpi value="4,214" label="Students" delta="+38" />
          <Kpi value="96.4%" label="Attendance" delta="+1.2%" accent />
          <Kpi value="87%" label="Fee collection" delta="+3.1%" />
          <Kpi value="12" label="Modules live" delta="100%" />
        </div>

        <div className="mt-4 flex gap-4">
          {/* attendance chart */}
          <div className="flex-[1.9] rounded-xl border border-[#e8ecf2] bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12.5px] font-semibold text-[#101828]">Daily attendance — this week</p>
              <span className="rounded-md bg-[#007aff]/[0.08] px-2 py-0.5 text-[10px] font-bold text-[#007aff]">
                Biometric
              </span>
            </div>
            <svg viewBox="0 0 520 168" className="mt-2 h-[168px] w-full" role="img" aria-label="Attendance trend chart">
              <defs>
                <linearGradient id="att-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007aff" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#007aff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[28, 74, 120].map((y) => (
                <line key={y} x1="0" x2="520" y1={y} y2={y} stroke="#eef1f6" strokeWidth="1" />
              ))}
              <path
                d="M0,132 C38,126 58,104 96,100 S150,112 186,90 S252,54 292,62 S352,92 388,66 S452,26 520,20 L520,168 L0,168 Z"
                fill="url(#att-fill)"
              />
              <path
                d="M0,132 C38,126 58,104 96,100 S150,112 186,90 S252,54 292,62 S352,92 388,66 S452,26 520,20"
                fill="none"
                stroke="#007aff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="520" cy="20" r="4" fill="#007aff" stroke="#fff" strokeWidth="2" />
            </svg>
            <div className="flex justify-between px-0.5 text-[9.5px] font-medium text-[#98a2b3]">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>

          {/* fee bars */}
          <div className="flex-1 rounded-xl border border-[#e8ecf2] bg-white p-4">
            <p className="text-[12.5px] font-semibold text-[#101828]">Fee collection</p>
            <p className="mt-0.5 text-[10px] text-[#98a2b3]">Installments · this month</p>
            <div className="mt-4 flex h-[128px] items-end gap-2.5">
              {[42, 58, 50, 72, 64, 88, 78].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-[4px]" style={{ height: h }}>
                  <div
                    className={cn(
                      'h-full w-full rounded-t-[4px]',
                      i === 5 ? 'bg-[#007aff]' : 'bg-[#007aff]/20'
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <p className="text-[19px] font-bold leading-none text-[#101828]">87%</p>
              <p className="text-[10px] font-medium text-[#12b76a]">on plan</p>
            </div>
          </div>
        </div>

        {/* admissions */}
        <div className="mt-4 rounded-xl border border-[#e8ecf2] bg-white">
          <div className="flex items-center justify-between border-b border-[#eef1f6] px-4 py-2.5">
            <p className="text-[12.5px] font-semibold text-[#101828]">Recent admissions</p>
            <p className="text-[10.5px] font-medium text-[#007aff]">View all</p>
          </div>
          {admissions.map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between border-b border-[#eef1f6] px-4 py-[9px] last:border-0"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0f4fa] text-[9px] font-bold text-[#4a5568]">
                  {a.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <div>
                  <p className="text-[12px] font-semibold leading-tight text-[#101828]">{a.name}</p>
                  <p className="text-[10px] text-[#98a2b3]">{a.meta}</p>
                </div>
              </div>
              <span
                className={cn(
                  'rounded-md px-2 py-0.5 text-[9.5px] font-bold',
                  a.tone === 'blue' && 'bg-[#007aff]/[0.09] text-[#007aff]',
                  a.tone === 'amber' && 'bg-[#f79009]/[0.12] text-[#b54708]',
                  a.tone === 'ink' && 'bg-[#eef1f6] text-[#4a5568]'
                )}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ————— Slide 2 · Staffist shift console ————— */
function StaffistSlide() {
  const rows = [
    { name: 'James H.', role: 'SIA · Day', blocks: [{ s: 4, w: 20, t: 'blue' }, { s: 38, w: 22, t: 'navy' }] },
    { name: 'Priya S.', role: 'Care · Night', blocks: [{ s: 62, w: 26, t: 'navy' }] },
    { name: 'Tom W.', role: 'Hospitality', blocks: [{ s: 12, w: 18, t: 'tint' }, { s: 46, w: 24, t: 'blue' }] },
    { name: 'Aisha K.', role: 'SIA · Door', blocks: [{ s: 0, w: 16, t: 'navy' }, { s: 70, w: 22, t: 'blue' }] },
    { name: 'Daniel M.', role: 'Logistics', blocks: [{ s: 26, w: 14, t: 'tint' }] },
    { name: 'Elena R.', role: 'Care · Day', blocks: [{ s: 8, w: 24, t: 'blue' }, { s: 56, w: 12, t: 'tint' }] },
  ] as const;

  const availability = [
    { name: 'James H.', status: 'On shift', tone: 'on' },
    { name: 'Priya S.', status: 'On shift', tone: 'on' },
    { name: 'Tom W.', status: 'Break', tone: 'soon' },
    { name: 'Aisha K.', status: 'On shift', tone: 'on' },
    { name: 'Daniel M.', status: 'Off duty', tone: 'off' },
  ] as const;

  return (
    <div className="flex h-full w-full bg-[#f7f9fc] text-left">
      {/* sidebar */}
      <aside className="flex w-[208px] shrink-0 flex-col border-r border-[#e8ecf2] bg-white px-3.5 py-4">
        <div className="flex items-center gap-2.5 px-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#1a2332] text-[13px] font-bold text-white">
            S
          </span>
          <div>
            <p className="text-[13.5px] font-bold leading-tight text-[#101828]">Staffist</p>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#98a2b3]">
              Staffing OS
            </p>
          </div>
        </div>
        <nav className="mt-5 flex flex-col gap-0.5">
          <SideItem icon={LayoutDashboard} label="Overview" />
          <SideItem icon={CalendarCheck} label="Shifts" active />
          <SideItem icon={Users} label="Staff pool" />
          <SideItem icon={Lock} label="Compliance" />
          <SideItem icon={ClipboardList} label="Placements" />
        </nav>
        <div className="mt-auto rounded-xl bg-[#f7f9fc] px-3.5 py-3">
          <p className="text-[10.5px] font-semibold text-[#4a5568]">UK · GMT</p>
          <p className="mt-1 text-[9.5px] text-[#98a2b3]">Next sync in 12 min</p>
        </div>
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col px-6 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold tracking-tight text-[#101828]">Shift coverage — today</h3>
            <p className="mt-0.5 text-[11px] text-[#98a2b3]">Real-time matching · London region</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#007aff]/[0.09] px-2.5 py-1 text-[10.5px] font-bold text-[#007aff]">
              128 shifts
            </span>
            <span className="rounded-md bg-[#f79009]/[0.12] px-2.5 py-1 text-[10.5px] font-bold text-[#b54708]">
              2 gaps
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          {/* timeline board */}
          <div className="flex-[1.85] rounded-xl border border-[#e8ecf2] bg-white p-4">
            <div className="flex">
              <div className="w-[104px] shrink-0" />
              <div className="relative flex-1">
                <div className="flex justify-between text-[9.5px] font-semibold text-[#98a2b3]">
                  {['00', '04', '08', '12', '16', '20', '24'].map((h) => (
                    <span key={h}>{h}:00</span>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="relative mt-2"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, transparent 0, transparent calc(100%/6 - 1px), #eef1f6 calc(100%/6 - 1px), #eef1f6 calc(100%/6))',
              }}
            >
              {rows.map((r, ri) => (
                <div
                  key={r.name}
                  className={cn('relative flex items-center h-[44px]', ri > 0 && 'border-t border-[#eef1f6]')}
                >
                  <div className="w-[104px] shrink-0 pr-3">
                    <p className="text-[11.5px] font-semibold leading-tight text-[#101828]">{r.name}</p>
                    <p className="text-[9.5px] text-[#98a2b3]">{r.role}</p>
                  </div>
                  <div className="relative h-[22px] flex-1">
                    {r.blocks.map((b, bi) => (
                      <div
                        key={bi}
                        className={cn(
                          'absolute top-0 flex h-full items-center rounded-md px-2 text-[9px] font-bold text-white',
                          b.t === 'blue' && 'bg-[#007aff]',
                          b.t === 'navy' && 'bg-[#1a2332]/85',
                          b.t === 'tint' && 'border border-[#007aff]/40 bg-[#007aff]/[0.12] !text-[#007aff]'
                        )}
                        style={{ left: `${b.s}%`, width: `${b.w}%` }}
                      >
                        Shift
                      </div>
                    ))}
                    {r.name === 'Daniel M.' && (
                      <div
                        className="absolute top-0 flex h-full items-center justify-center rounded-md border border-dashed border-[#f79009] bg-[#f79009]/[0.07] text-[9px] font-bold text-[#b54708]"
                        style={{ left: '44%', width: '22%' }}
                      >
                        + fill
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right rail */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="rounded-xl border border-[#e8ecf2] bg-white p-4">
              <p className="text-[12.5px] font-semibold text-[#101828]">Availability now</p>
              <div className="mt-2.5 flex flex-col gap-2">
                {availability.map((a) => (
                  <div key={a.name} className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0f4fa] text-[9px] font-bold text-[#4a5568]">
                      {a.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <p className="flex-1 text-[11.5px] font-medium text-[#101828]">{a.name}</p>
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#98a2b3]">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          a.tone === 'on' && 'bg-[#12b76a]',
                          a.tone === 'soon' && 'bg-[#f79009]',
                          a.tone === 'off' && 'bg-[#d0d5dd]'
                        )}
                      />
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#e8ecf2] bg-white p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-[12.5px] font-semibold text-[#101828]">Compliance</p>
                <p className="text-[16px] font-bold leading-none text-[#12b76a]">99.1%</p>
              </div>
              <div className="mt-2.5 h-[6px] overflow-hidden rounded-full bg-[#eef1f6]">
                <div className="h-full w-[99%] rounded-full bg-[#12b76a]" />
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-[#98a2b3]">
                Right-to-work · Training · Certificates — all current
              </p>
            </div>

            <div className="rounded-xl border border-[#e8ecf2] bg-white p-4">
              <p className="text-[12.5px] font-semibold text-[#101828]">Placements</p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-[22px] font-bold leading-none text-[#101828]">42</p>
                <p className="text-[10px] font-medium text-[#12b76a]">+9 vs last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ————— Slide 3 · FaQ Ops — reliability view ————— */
function OpsSlide() {
  const deploys = [
    { name: 'concordia-api', version: 'v2.14.0', time: '2h ago', ok: true },
    { name: 'staffist-web', version: 'v1.9.2', time: '9h ago', ok: true },
    { name: 'biometric-sync', version: 'v0.8.4', time: '1d ago', ok: true },
  ] as const;

  const modules = [
    'Admissions', 'Attendance', 'Fees', 'Examinations', 'HR', 'Payroll',
    'Timetable', 'Records', 'Reports', 'Messaging', 'Transport', 'Portal',
  ] as const;

  return (
    <div className="flex h-full w-full bg-[#f7f9fc] text-left">
      {/* sidebar */}
      <aside className="flex w-[208px] shrink-0 flex-col border-r border-[#e8ecf2] bg-white px-3.5 py-4">
        <div className="flex items-center gap-2.5 px-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#101828] text-[11px] font-bold text-white">
            FaQ
          </span>
          <div>
            <p className="text-[13.5px] font-bold leading-tight text-[#101828]">FaQ Ops</p>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#98a2b3]">
              Runtime
            </p>
          </div>
        </div>
        <nav className="mt-5 flex flex-col gap-0.5">
          <SideItem icon={LayoutDashboard} label="Status" active />
          <SideItem icon={ClipboardList} label="Deploys" />
          <SideItem icon={Lock} label="Modules" />
          <SideItem icon={Bell} label="Alerts" />
        </nav>
        <div className="mt-auto rounded-xl border border-[#12b76a]/25 bg-[#12b76a]/[0.07] px-3.5 py-3">
          <p className="text-[10.5px] font-semibold text-[#027948]">All systems operational</p>
          <p className="mt-1 text-[9.5px] text-[#12b76a]">Auto-checked · every 60s</p>
        </div>
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col px-6 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold tracking-tight text-[#101828]">System health — 30 days</h3>
            <p className="mt-0.5 text-[11px] text-[#98a2b3]">Concordia · Staffist · shared services</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-md bg-[#12b76a]/[0.1] px-2.5 py-1 text-[10.5px] font-bold text-[#027948]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" />
            Operational
          </span>
        </div>

        {/* uptime chart */}
        <div className="mt-4 rounded-xl border border-[#e8ecf2] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[12.5px] font-semibold text-[#101828]">Uptime</p>
            <p className="text-[10.5px] font-medium text-[#98a2b3]">99.9% SLA-backed</p>
          </div>
          <svg viewBox="0 0 764 140" className="mt-2 h-[140px] w-full" role="img" aria-label="Uptime chart, last 30 days">
            <defs>
              <linearGradient id="ops-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12b76a" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#12b76a" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 70, 110].map((y) => (
              <line key={y} x1="0" x2="764" y1={y} y2={y} stroke="#eef1f6" strokeWidth="1" />
            ))}
            <path
              d="M0,34 H92 l7,22 h9 l7,-22 H240 l7,16 h8 l7,-16 H505 l7,30 h11 l7,-30 H764 L764,140 L0,140 Z"
              fill="url(#ops-fill)"
            />
            <path
              d="M0,34 H92 l7,22 h9 l7,-22 H240 l7,16 h8 l7,-16 H505 l7,30 h11 l7,-30 H764"
              fill="none"
              stroke="#12b76a"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle cx="514" cy="79" r="4" fill="#f79009" stroke="#fff" strokeWidth="2" />
          </svg>
          <div className="flex justify-between text-[9.5px] font-medium text-[#98a2b3]">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          {/* big stat */}
          <div className="flex-[0.8] rounded-xl border border-[#e8ecf2] bg-white p-4">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">
              Uptime · 30d
            </p>
            <p className="mt-2 text-[42px] font-bold leading-none tracking-tight text-[#101828]">
              99.9<span className="text-[24px]">%</span>
            </p>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className={cn('h-[14px] flex-1 rounded-[3px]', i === 17 ? 'bg-[#f79009]' : 'bg-[#12b76a]')}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] text-[#98a2b3]">Daily availability · 1 partial degradation</p>
          </div>

          {/* deploy feed */}
          <div className="flex-1 rounded-xl border border-[#e8ecf2] bg-white p-4">
            <p className="text-[12.5px] font-semibold text-[#101828]">Recent deploys</p>
            <div className="mt-2.5 flex flex-col">
              {deploys.map((d, i) => (
                <div
                  key={d.name}
                  className={cn(
                    'flex items-center gap-3 py-2.5',
                    i > 0 && 'border-t border-[#eef1f6]'
                  )}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#12b76a]/[0.1] text-[11px] font-bold text-[#027948]">
                    ✓
                  </span>
                  <div className="flex-1">
                    <p className="text-[11.5px] font-semibold leading-tight text-[#101828]">
                      {d.name} <span className="font-normal text-[#007aff]">{d.version}</span>
                    </p>
                    <p className="text-[9.5px] text-[#98a2b3]">Zero-downtime roll-out</p>
                  </div>
                  <span className="text-[10px] font-medium text-[#98a2b3]">{d.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* module grid */}
        <div className="mt-4 rounded-xl border border-[#e8ecf2] bg-white px-4 py-3.5">
          <p className="text-[12.5px] font-semibold text-[#101828]">Modules — all operational</p>
          <div className="mt-2.5 grid grid-cols-6 gap-2">
            {modules.map((m) => (
              <span
                key={m}
                className="flex items-center gap-1.5 rounded-md bg-[#f7f9fc] px-2 py-1.5 text-[10px] font-medium text-[#4a5568]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" />
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SLIDE_VIEWS = [ConcordiaSlide, StaffistSlide, OpsSlide];

/* ————— the carousel ————— */
export function ProductShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [paused, reduced]);

  const slide = SLIDES[index];
  const SlideView = SLIDE_VIEWS[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="FaQ Systems product showcase"
      className="relative mx-auto w-full max-w-[960px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ambient wash behind the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -top-10 bottom-[-30px] rounded-[3rem] bg-[radial-gradient(closest-side,rgb(0_122_255/0.07),transparent_75%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[1.4rem] border border-ink/[0.08] bg-white shadow-[0_48px_120px_-36px_rgb(26_35_50/0.4),0_12px_40px_-16px_rgb(26_35_50/0.18)]">
        {/* browser chrome */}
        <div className="flex h-11 items-center gap-3 border-b border-ink/[0.06] bg-[#fbfcfe] px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#febc2e]" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#28c840]" />
          </div>
          <div className="relative mx-auto flex h-[26px] w-full max-w-[300px] items-center justify-center gap-1.5 overflow-hidden rounded-md border border-ink/[0.06] bg-white text-[10.5px] font-medium text-ink/50">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={slide.url}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="flex items-center gap-1.5"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: slide.accent }}
                  aria-hidden="true"
                />
                {slide.url}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-[#12b76a]/[0.1] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#027948] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" />
            Live
          </span>
        </div>

        {/* slides */}
        <div className="relative bg-[#f7f9fc]">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.012 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <ScaledStage>
                <SlideView />
              </ScaledStage>
            </motion.div>
          </AnimatePresence>
          {/* keep an always-mounted layer for correct height before first transition */}
          <div aria-hidden="true" className="invisible">
            <ScaledStage>
              <ConcordiaSlide />
            </ScaledStage>
          </div>
        </div>

        {/* screen glare */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.4rem] bg-[linear-gradient(180deg,rgb(255_255_255/0.35),transparent_18%)]"
        />
      </div>

      {/* caption + controls */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="min-w-0"
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
              0{index + 1} / 0{SLIDES.length} — In production
            </p>
            <p className="mt-1 truncate text-[13.5px] font-semibold text-ink">
              {slide.name}
              <span className="font-normal text-muted-foreground"> · {slide.tagline}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose slide">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${s.name}`}
                onClick={() => go(i)}
                className={cn(
                  'h-[7px] rounded-full transition-all duration-400',
                  i === index ? 'w-6 bg-ink' : 'w-[7px] bg-ink/20 hover:bg-ink/40'
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous product"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white text-ink/70 transition-all duration-300 hover:border-ink/25 hover:text-ink active:scale-95"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next product"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white text-ink/70 transition-all duration-300 hover:border-ink/25 hover:text-ink active:scale-95"
            >
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
