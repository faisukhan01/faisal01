# Task 7-c — Premium Careers detail modal + integration

**Agent:** full-stack-developer
**Task ID:** 7-c
**Scope:** Round 7 — add a premium career-detail modal to the NETSOL homepage and wire it into the existing Careers section.

## Files created / modified
1. **NEW** `/home/z/my-project/src/components/site/career-detail-modal.tsx` (~460 lines, `'use client'`, TypeScript strict, no `any`).
2. **EDIT** `/home/z/my-project/src/components/sections/careers.tsx` (5 surgical edits — import, state, helper, card onClick/onKeyDown/role/tabIndex, Apply link → button, modal mount).

## Inputs read
- `/home/z/my-project/worklog.md` (prior rounds 1–6)
- `/home/z/my-project/src/components/sections/careers.tsx` (existing role cards + team filter + culture cards)
- `/home/z/my-project/src/lib/site-data.ts` — verified `CAREERS_ROLES` (6 roles) and `CAREER_DETAILS.details` (map keyed by role id with `team` / `reportsTo` / `compensation` / `responsibilities[5]` / `requirements[4]` / `perks[4]`)
- `/home/z/my-project/src/app/globals.css` — verified premium utilities (`backdrop-premium`, `shadow-depth-lg`, `section-heading-chip`, `btn-shine`, `btn-glow`, `text-gradient-animated`, `chip-selected`, `career-aside`, `gradient-text-shimmer` keyframe reusable via inline `animation` style)
- `/home/z/my-project/src/components/site/case-study-modal.tsx` + `insight-modal.tsx` — pattern reference for `AnimatePresence` + backdrop click + Escape + scroll lock
- `/home/z/my-project/agent-ctx/6-c/6-d/6-e/6-f-*.md` — prior round work logs (premium styling conventions)

## Modal architecture
- Outer `AnimatePresence` controls modal enter/exit (opacity + scale + y).
- `motion.div` backdrop (`backdrop-premium fixed inset-0 z-[200]`) handles backdrop click → `onClose`.
- Inner `motion.div` container (`max-w-4xl max-h-[92vh] rounded-3xl bg-white shadow-depth-lg flex flex-col`), `onClick={e => e.stopPropagation()}` so clicks inside don't bubble to backdrop.
- 4px top accent bar with `role.accent` gradient, animated via `gradient-text-shimmer` keyframe (reused from globals.css without modifying it).
- Sticky header (`shrink-0 bg-white/95 backdrop-blur`): left = team chip with `role.accent`-tinted bg + `Building2` icon; center = "JOB DETAILS" mono indicator with live-pulse-dot-style accent dot; right = close `X` button.
- Body (`flex-1 overflow-y-auto`) wraps an `AnimatePresence mode="wait"` keyed on `animKey` — the body content swaps with `initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}` whenever the role changes (Prev/Next click OR parent prop update).
- Hero block: `section-heading-chip` (Sparkles + role.team), `h2` title, summary, tag pills with accent border, `btn-shine btn-glow` Apply button (primary blue) + Share role outline button.
- Two-column body (`lg:grid lg:grid-cols-[1.6fr_1fr]`): left = "What you'll do" (numbered accent circles) / "What you'll bring" (CheckCircle2 green) / "How you'll grow" (Sparkles in accent-tinted circles); right = `career-aside` (sticky on desktop via the class + inline `top: 16px` override) with 3 cards: About this role `<dl>` (Briefcase/MapPin/Clock/User icons + label/value pairs), Compensation card (DollarSign header + `text-gradient-animated` display + subtitle), Apply CTA card (accent-bg btn-shine button + Mail icon email line).
- Fallback block when `details` map miss: dashed-border card + Apply CTA — defensive but unreachable given current data.
- Sticky footer (`shrink-0 border-t bg-white/95 backdrop-blur`): left = "Job ref: {role.id}" mono label; right = Previous role ghost button (ArrowLeft) + Next role `chip-selected` gradient button (ArrowRight). Both cycle through `CAREERS_ROLES` with modulo wrap-around.

## State management
- `useState<string | null>(roleId)` for `currentRoleId` (initial = prop).
- `useState(0)` for `animKey` (retriggers `AnimatePresence` content-swap entrance).
- `useState(open)` for `prevOpen` and `useState(roleId)` for `lastSeenPropRoleId` — used in render-phase conditional `setState` blocks to sync the internal role from the prop on (a) open-transition (`open !== prevOpen`) and (b) prop-`roleId` change while open. This is the React-recommended "store previous prop" pattern (see https://react.dev/reference/react/useState#storing-information-from-previous-renders) and avoids the `react-hooks/set-state-in-effect` lint error.
- `useEffect([open, onClose])` handles body scroll lock + Escape key — **no setState inside the effect**, only DOM manipulation (`document.body.style.overflow`) and `addEventListener` / `removeEventListener`.
- Prev/Next click handlers update `currentRoleId` and `animKey` directly (no prop sync needed).

## careers.tsx integration
- Imported `CareerDetailModal` from `@/components/site/career-detail-modal`.
- Added `useState<string | null>(null)` for `openRoleId` and `useState(false)` for `modalOpen`.
- Added `openRoleDetails(id: string)` helper that sets both.
- Added `onClick={() => openRoleDetails(role.id)}` to `motion.article` (whole card clickable) + `onKeyDown` for Enter/Space + `role="button"` + `tabIndex={0}` + `cursor-pointer` + `focus-visible:ring-2 focus-visible:ring-[#1d81f2]/40`.
- Converted the per-card Apply from `<a href="#contact">` to `<button type="button">` with `e.stopPropagation()` + `openRoleDetails(role.id)` — same accent color, same ArrowUpRight icon, same `group-hover:gap-1.5` animation.
- Appended `<CareerDetailModal open={modalOpen} onClose={() => setModalOpen(false)} roleId={openRoleId} />` as the last child of `<section>`.

## Icon usage (13/13 used; no unused imports → lint-clean)
- `X` close button (header).
- `CheckCircle2` requirements list bullets (`text-[#24a148]`).
- `Sparkles` hero section-heading-chip + perks list circles (`role.accent`).
- `ArrowRight` hero Apply, aside Apply CTA, Next role footer button (×3).
- `ArrowLeft` Previous role footer button.
- `Share2` Share role button.
- `MapPin` About this role → Location.
- `Briefcase` About this role → Team.
- `Clock` About this role → Type.
- `User` About this role → Reports to.
- `DollarSign` Compensation card header.
- `Mail` Apply CTA card email line.
- `Building2` sticky header team chip.

## Constraints honored
- `'use client'` on both files (modal is interactive; careers section already `'use client'`).
- TypeScript strict — typed `CareerDetail` with `readonly string[]` arrays; cast `CAREER_DETAILS.details as Record<string, CareerDetail>` for safe indexing; no `any` anywhere.
- All existing careers.tsx functionality preserved: TEAMS filter chips with `activeTeam` state, culture intro bar + 3 perks cards (Briefcase/Users/Heart icons), roles grid with `AnimatePresence mode="popLayout"` + `lift-on-hover` cards, bottom CTA strip with `CTAButton`.
- Existing CSS utilities used only; `globals.css` NOT modified.
- Responsive: modal goes single-column on mobile (aside becomes inline block below main content via `lg:grid lg:grid-cols-[1.6fr_1fr] gap-8`); footer Prev/Next buttons collapse to "Prev"/"Next" labels on small screens via `hidden sm:inline` / `sm:hidden`.
- Accessibility: `role="dialog"`, `aria-modal="true"`, `aria-label={role.title}`, `aria-label` on close button, `role="button"` + `tabIndex={0}` + keyboard handler on role cards.

## Verification
- `bun run lint` → 0 errors, 0 warnings (clean on first pass after the render-phase refactor).
- Initial lint run flagged `react-hooks/set-state-in-effect` on the in-`useEffect` setState sync; resolved by switching to render-phase conditional setState (React-recommended pattern).
- Dev server log: clean Next.js 16.1.3 (Turbopack) compile, `GET / 200 in 8.6s` on initial load; HMR handles subsequent edits.

## Stage Summary
- 1 new premium modal component + 1 existing section updated in-place; 0 other files touched; globals.css untouched.
- Click-anywhere-on-card OR Apply-button OR keyboard Enter/Space opens the modal; Escape / backdrop click / X button all close it.
- Body scroll lock engages on open, releases on close (via `useEffect` cleanup).
- Prev/Next cycle through all 6 roles with smooth slide-x + opacity content swap; role.accent drives the top bar gradient, tag borders, hero chip, numbered circles, perk circles, and Apply CTA button bg.
- Compensation rendered with `text-gradient-animated`; aside uses `career-aside` class with inline `top: '16px'` override for proper sticky behavior inside the modal's scroll container.
- All 13 required lucide icons used; TypeScript compiles; lint clean; production-ready.
