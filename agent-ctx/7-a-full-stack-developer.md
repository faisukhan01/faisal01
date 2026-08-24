# Task 7-a — Build new premium "Investor Relations" section (Round 7)

**Agent:** full-stack-developer
**Task ID:** 7-a
**Scope:** Create one new premium section component for the NETSOL Technologies homepage: a complete financial Investor Relations showcase with animated KPI cards, dual-axis revenue+ARR chart, dark premium share-price snapshot, retention metrics, IR events calendar, and investor-kit CTA.

## Inputs read
- `/home/z/my-project/worklog.md` — prior rounds 1-6 + parallel Round 7 agents (esp. 7-b PR Center which uses the same data-driven + Reveal + section-heading-chip pattern)
- `/home/z/my-project/src/lib/site-data.ts` lines 1351-1434 — `INVESTOR_RELATIONS` export (kpis/quarterly/retention/stock/events shape verified)
- `/home/z/my-project/src/app/globals.css` — verified all Round 6 + Round 7 premium utilities are present (`section-pad`, `section-heading-chip`, `gradient-border-animated`, `gradient-border-card`, `lift-on-hover`, `shadow-depth`, `shadow-depth-lg`, `spotlight-gradient`, `font-mono-numeric`, `nav-link-underline`, `live-pulse-dot`, `digit-flip-in`, `ticker-digit`, `ticker-flash`, `sparkline-draw`, `sparkline-glow`, `price-chip`, `chart-axis-line`, `event-date-chip`, `investor-spotlight`, `btn-shine`)
- `/home/z/my-project/src/components/site/reveal.tsx` (Reveal + delay API)
- `/home/z/my-project/src/components/site/counter.tsx` (existing integer-only Counter — Math.round()s on tick, would erase the .6/.2/.8 decimals in KPIs)
- `/home/z/my-project/src/components/site/cta-button.tsx` (variants: primary/light/outline — `light` = white bg + dark text; override to blue text via className through cn/tailwind-merge)
- `/home/z/my-project/src/components/sections/live-pulse.tsx` (premium dark-card pattern reference: `bg-[#0b0f1a]` + spotlight overlay + soft accent glows + setTimeout-driven jitter for live-feel metrics)
- `/home/z/my-project/src/components/sections/glossary.tsx` + `stats.tsx` + `roi-calculator.tsx` (established KPI card pattern: `gradient-border-card` + small accent bar + `lift-on-hover` + `font-mono-numeric`)

## Constraints honored
- `'use client'` directive on the new file
- `globals.css` NOT modified
- No other files modified except worklog.md (this task's record) + this agent-ctx record
- TypeScript strict-safe — derived all data types via `typeof INVESTOR_RELATIONS.x` indexer pattern; zero `any` casts; the DecimalCounter reducer's FINISH action carries `value: number` explicitly (avoided TS2339 by not referencing `action.value` on a payload-less action type)
- Only existing CSS utilities used (Round 6 + Round 7 layer already in globals.css) — zero new CSS added
- All 10 requested lucide-react icons used (TrendingUp, TrendingDown, ArrowRight, ArrowUpRight, Calendar, BarChart3, LineChart, DollarSign, Activity, Clock)
- Color tokens used (all from the project palette): #1d81f2, #0f62fe, #24a148, #2d9cdb, #56ccf2, #161616, #525252, #6b7280, #f5f7fa, #0b0f1a, #e0e0e0/#f0f0f0, emerald-600, rose-600

## Architecture (5 composable sub-components + main export)
1. `DecimalCounter` — decimal-safe variant of the existing site `Counter`. Uses `useReducer` + IntersectionObserver + rAF + easeOutExpo, applies `toFixed(1)` on every tick so the .6/.2/.8 KPI decimals survive end-to-end. The existing `Counter` would have rounded 248.6 → 249, 184.2 → 184, 42.8 → 43, 28.4 → 28 — unusable for this section.
2. `KpiCard` — `gradient-border-animated lift-on-hover shadow-depth rounded-2xl bg-white p-6` + top accent bar (h-[3px] w-8) + big mono number + emerald trend chip + bottom label.
3. `RetentionCard` — `gradient-border-card lift-on-hover p-5 bg-white rounded-2xl` + small accent bar (matching glossary.tsx pattern — avoids the overflow-hidden-vs-gradient-border-card conflict) + value + trend + label.
4. `EventCard` — `min-w-[280px] rounded-2xl border border-[#e0e0e0] bg-white p-5 lift-on-hover overflow-hidden` + top accent stripe + `event-date-chip` (parsed from "Aug 14, 2026" → { day:"14", month:"AUG" }) + content block.
5. `StockCard` — `rounded-3xl bg-[#0b0f1a] text-white p-6 lg:p-8 shadow-depth-lg relative overflow-hidden` + spotlight overlay + soft accent glows + NASDAQ chip + live indicator + `ticker-digit` price with simulated 3s `ticker-flash` bump + `price-chip` change chip + 4-stat grid + 10-session sparkline + disclaimer.
6. `QuarterlyChartCard` — `rounded-3xl border border-[#e0e0e0] bg-white p-6 lg:p-8 shadow-depth` + header (BarChart3 + legend) + dual-axis SVG line chart (revenue + ARR) + 6 QoQ mini-stats.
7. `InvestorRelations` (main export) — section wrapper + header + KPI row + middle row (chart+stock) + retention row + events row + CTA strip + footer attribution.

## Stock ticker-flash simulation
- `useState(false)` for `bumped` flag.
- `useEffect` schedules two `window.setTimeout` calls (3000ms → setBumped(true), 4500ms → setBumped(false)) with proper cleanup via `clearTimeout`.
- This pattern matches `live-pulse.tsx` — async setTimeout callbacks are NOT flagged by the `react-hooks/set-state-in-effect` rule (only synchronous `setState` during effect body is).
- When `bumped` flips, the price span's `key` changes from "idle" → "bumped" (forces React remount → CSS `ticker-flash` animation replays) and the `ticker-flash` class is conditionally applied.
- The displayed price bumps +0.03, change +0.03, changePercent recomputed from the new base.

## Chart geometry (computed once at module scope — no per-render allocations)
- `REV_MAX=80` (covers 51..63 range, ticks at 0/20/40/60/80), `ARR_MAX=200` (covers 121..184 range, ticks at 0/50/100/150/200).
- `PLOT` bounds: x0=56, x1=584, y0=20, y1=220 → plot area 528×200 inside viewBox 640×260 (room for left/right tick labels + bottom x-axis labels).
- 5 gridlines using `chart-axis-line` class with paired left (revenue $0M..$80M) + right (ARR $0M..$200M) tick labels — standard dual-axis financial chart layout.
- 6 x-axis labels (`Q1'24`..`Q2'25` uppercased, mono, gray, centered) below the plot.
- Two pre-built SVG path strings: `REV_PATH` (revenue line) + `ARR_PATH` (ARR line) + `REV_AREA`/`ARR_AREA` (area-fill closures).
- 12 data-point markers (white-fill + accent-stroke circles) at each (x, y) on both lines.
- Revenue line drawn last (on top) with `sparkline-draw sparkline-glow` classes — stroke #1d81f2 width 2.5 fill none round caps/joins.
- ARR line drawn before revenue with `sparkline-draw` only — stroke #24a148 width 2.5 fill none round caps/joins.
- Sparkline mini in stock card: 10 simulated trading-day prices around $8.42 (`SPARK = [8.18, 8.22, 8.15, 8.28, 8.34, 8.3, 8.41, 8.45, 8.38, 8.42]`), `viewBox="0 0 240 40"`, area fill + `sparkline-draw` stroke + final-point marker with `sparkline-glow`.

## QoQ growth mini-stats (below the chart)
- 6 entries derived from `QUARTERS` array at module scope.
- Q1'24 has no prior → `pct: null` → displays "baseline" in gray.
- Q2'24..Q2'25: pct = (curr - prev) / prev * 100 → +10.94%, +2.82%, +4.45%, **-0.98%** (Q1'25 — red), +4.64%.
- Each mini-stat in `rounded-lg bg-[#f5f7fa] px-2 py-2 text-center` — quarter label uppercase mono gray + value `font-mono-numeric font-semibold` (emerald if positive, rose if negative, slate if zero, gray if null/baseline).

## Verification
- `bunx eslint src/components/sections/investor-relations.tsx` → exit 0, 0 errors, 0 warnings on my file.
- `bunx tsc -p tsconfig.7a.json` (project-relative, includes new file + its import-deps reveal/cta-button/site-data/utils/next-env) → exit 0, no type errors.
- One pre-existing lint error remains in `src/components/site/career-detail-modal.tsx:61` (`react-hooks/set-state-in-effect`) — NOT from this task; the "do NOT modify any other file" constraint forbids touching it.
- Dev server (system-managed, not started by me): the live `dev.log` shows the project still compiles and serves `/` 200 (8.6s compile). The new file is not yet imported into page.tsx per the "do NOT modify page.tsx" constraint — the section file is ready to be wired in by the integrator agent.

## Stage Summary
- 1 new file created: `/home/z/my-project/src/components/sections/investor-relations.tsx` (~900 lines, `'use client'`, exports `InvestorRelations` + default).
- 0 files modified except `worklog.md` (this task's appended entry).
- All 6 spec blocks implemented verbatim: 4 KPI cards (with decimal-safe `DecimalCounter`), 6-quarter dual-axis revenue+ARR SVG line chart, dark premium stock snapshot card with simulated `ticker-flash` tick, 4 retention cards, 4 horizontal-scroll event cards with `event-date-chip` parsed from "Aug 14, 2026" → { day: "14", month: "AUG" }, and a centered investor-kit CTA strip.
- Lint clean on my file. TypeScript clean on my file. Zero new CSS. Zero `any` casts.
