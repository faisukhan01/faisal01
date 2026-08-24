# Task 6-f — Premium styling polish pass on Solutions + ROI Calculator

**Agent:** full-stack-developer
**Task ID:** 6-f
**Scope:** Round 6 premium styling polish on two existing NETSOL homepage sections:
1. `src/components/sections/solutions.tsx` (Customer Stories / case studies)
2. `src/components/sections/roi-calculator.tsx` (interactive ROI calculator)

## Inputs read
- `/home/z/my-project/worklog.md` (prior rounds 1-5 + parallel Round 6 agents 6-a/b/c/d/e)
- `/home/z/my-project/src/components/sections/solutions.tsx` (existing file — case-study grid w/ industry filter chips + modal opener)
- `/home/z/my-project/src/components/sections/roi-calculator.tsx` (existing file — 3 sliders + industry multi-select + 5-year bar chart + 3 stat callouts + 4-card trust strip)
- `/home/z/my-project/src/app/globals.css` (verified premium utilities available: `section-heading-chip`, `section-rule`, `chip-selected`, `lift-on-hover`, `lift-on-hover-strong`, `card-stack-3d`, `gradient-border-animated`, `gradient-border-card`, `text-gradient-animated`, `font-mono-numeric`, `mesh-gradient`, `spotlight-gradient`, `glow-halo`, `scan-beam`, `live-pulse-dot`, `pulse-ring-soft`, `btn-shine`, `nav-link-underline`, `shadow-depth`, `shadow-depth-lg`, `roi-slider`)

## Constraints honored
- `'use client'` preserved on both files
- All existing functionality preserved: case-study modal opening, ROI slider math, industry multi-select, 5-year ramp calc, Calculate/Reset button behaviour, cumulative-savings callouts
- `globals.css` NOT modified
- No other files modified
- TypeScript strict-safe — no `any` used anywhere; stat callout array cast inline via the literal shape
- Mobile-first responsive preserved (grids, paddings, breakpoints unchanged)
- Inline `style` props used to override base `background: white` from `gradient-border-animated` / `gradient-border-card` on the dark ROI calculator surfaces — keeps Tailwind class-based bg consistent with the class definition without modifying globals.css

## solutions.tsx changes
1. Added `mesh-gradient` overlay div to the section background (premium blue/cyan radial accents over the existing white→#f5f7fa→white gradient + barcode pattern).
2. Replaced the inline `inline-flex items-center gap-2` header chip (gray dot + "Customer stories" label) with a `section-heading-chip` containing a `live-pulse-dot` blue dot + "Customer stories" (auto-uppercased by the class).
3. Wrapped the header in a `flex flex-col lg:flex-row lg:items-end lg:justify-between` row and right-aligned a `nav-link-underline` "View all stories →" link (lucide `ArrowUpRight`) wrapped in a delayed `Reveal`.
4. Added a `section-rule` hairline directly under the H2.
5. Filter chips: added `lift-on-hover` to all chips. Active chip now renders a `live-pulse-dot` white accent dot before the label (already had `chip-selected text-white` styling). Count pill now uses `font-mono-numeric` for tabular numerics.
6. Case study cards: replaced `overflow-hidden hover:shadow-premium-lg` with `card-stack-3d lift-on-hover-strong shadow-depth-lg` so the premium stack-pseudos at z-index -1 are visible peeking out from the bottom-right.
7. Top accent stripe: kept 3px height (per spec), extended gradient to `linear-gradient(90deg, ${accent}, ${accent}99 60%, transparent)` and added a `box-shadow: 0 4px 12px -4px ${accent}66` for the vertical fade / soft glow at the bottom of the stripe.
8. Logo placeholder chip: added `gradient-border-animated` (kept inline `backgroundColor: story.accent` which beats the class's white bg; the ::before pseudo provides a shimmering accent border on hover). Changed `rounded-xl` → `rounded-2xl` to match the class's 16px radius.
9. Industry tag: replaced `bg-[#f5f7fa] text-[#6b7280] border border-[#e0e0e0]` styling with `chip-selected text-white border border-transparent` for the premium filled-chip look.
10. Metric values inside cards: removed inline `style={{ color: story.accent }}`; added `text-gradient-animated font-mono-numeric` for the animated blue→cyan gradient + tabular numerics.
11. "Read full story" CTA row: added `btn-shine lift-on-hover` so the bottom strip gets a premium shine sweep + lift on hover.

## roi-calculator.tsx changes
1. Imports: removed `TrendingDown`, added `Clock3` (for "Hours saved / yr" callout per spec).
2. Header chip: replaced the inline-flex `h-9 w-9 rounded-lg bg-[#1d81f2]/15` chip block with a `section-heading-chip backdrop-blur-sm` chip + inline-style override (`background: rgba(255,255,255,0.1)`, `borderColor: rgba(255,255,255,0.2)`, `color: #ffffff`) per the dark-bg adaptation requirement. Contains a Calculator icon + "ROI calculator" label.
3. Added `section-rule` directly under the H2.
4. Calculator panel (left side): added `gradient-border-animated` class to the panel container. Removed `bg-white/[0.04]` (which the class would override with `background: white`) and replaced with `style={{ background: 'rgba(255,255,255,0.04)' }}` so the inline style wins over the class's white bg while still benefiting from the shimmer-border ::before pseudo.
5. All 3 slider value displays: wrapped the value in a `inline-flex items-center gap-2` container that prepends a `h-1.5 w-1.5 rounded-full bg-[#56ccf2] live-pulse-dot` indicator. Added `font-mono-numeric` to the value `<span>` for tabular numerics.
6. Industry multi-select grid container: added `rounded-xl p-1.5 bg-white/[0.02] shadow-depth` for premium container depth.
7. Industry chips: added `lift-on-hover` to each. Active chip replaced its `bg-gradient-to-br from-[#1d81f2] to-[#0f62fe] text-white border-transparent shadow-[0_4px_16px_-4px_rgba(15,98,254,0.5)]` with `chip-selected text-white border-transparent` (chip-selected provides the gradient bg + shadow).
8. Results panel (right side): added `shadow-depth-lg` to the container; inserted a `spotlight-gradient` overlay div (`absolute inset-0 pointer-events-none`) behind the content; tagged all subsequent content blocks with `relative` so they sit above the overlay.
9. Live indicator: replaced `animate-pulse` plain Tailwind class with `live-pulse-dot pulse-ring-soft` for premium animated ping ring.
10. Headline savings number: replaced inline `style={{ backgroundImage: 'linear-gradient(90deg, #56ccf2, #1d81f2, #0f62fe)' }}` + `bg-clip-text text-transparent` classes with `text-gradient-animated font-mono-numeric` (animated shimmer + tabular numerics).
11. Cumulative savings callout (in the "Per year, at run-rate" sentence): wrapped the number in `relative inline-block glow-halo text-gradient-animated font-mono-numeric font-semibold` for premium glow halo + animated gradient + tabular numerics. (Also added `font-mono-numeric` to the cumulative number in the bar chart header for consistency.)
12. Stat callouts: Payback icon `TrendingDown` → `Clock`; Hours saved icon `Clock` → `Clock3`; FTE freed icon `Users` (already). Added `gradient-border-card` class to each callout container + inline `style={{ background: 'rgba(255,255,255,0.04)' }}` to override the class's `background: white` on the dark surface. Added `font-mono-numeric` to each value.
13. 5-year ramp bar chart: container gained `rounded-lg p-1.5 bg-white/[0.02] shadow-depth`. Each bar's parent `<div>` now toggles `scan-beam` class only for the active year bar (last year, `i === results.bars.length - 1`). The active bar's gradient now sweeps blue→green: `linear-gradient(180deg, #56ccf2 0%, #1d81f2 50%, #24a148 100%)`. Added `overflow-hidden rounded-t-md` to the bar parent so the scan-beam sweep is clipped to the bar shape.
14. Trust strip cards: added `gradient-border-card lift-on-hover shadow-depth` to each card + inline `style={{ background: 'rgba(255,255,255,0.02)' }}` to override the class's white bg. Added `font-mono-numeric` to each value.
15. "Calculate my ROI" button already had `btn-shine` (preserved). "Reset" button added `lift-on-hover` per spec.

## Verification
- `bun run lint` → exit 0, 0 errors, 0 warnings (both files lint-clean)
- Dev server is auto-managed by the system; lint is the primary success criterion per task instructions. The user's preview panel will trigger the recompile on next visit.
- Verified both files compile-safe via inspection: all imports used (no unused), all classnames are valid Tailwind or existing premium utilities from globals.css, no `any` types, all inline-style overrides correctly target `background` to defeat the class's `background: white` shorthand on dark surfaces.

Stage Summary:
- 2 existing section files polished in-place; 0 new files created; globals.css NOT modified; no other files touched
- solutions.tsx: mesh-gradient bg + section-heading-chip + section-rule + View-all-stories nav-link-underline + lift-on-hover filter chips w/ live-pulse-dot accent dot + card-stack-3d lift-on-hover-strong shadow-depth-lg cards + thicker gradient-fade accent stripe + gradient-border-animated logo chip + chip-selected industry tag + text-gradient-animated font-mono-numeric metric values + btn-shine lift-on-hover Read-story row
- roi-calculator.tsx: section-heading-chip (dark-bg adapted via inline style override) + section-rule + gradient-border-animated calculator panel + live-pulse-dot indicators next to each slider value + font-mono-numeric value displays + lift-on-hover industry chips with chip-selected for active + shadow-depth grid container + spotlight-gradient overlay + shadow-depth-lg results panel + live-pulse-dot pulse-ring-soft Live indicator + text-gradient-animated font-mono-numeric headline savings + gradient-border-card stat callouts (Clock / Clock3 / Users icons) + shadow-depth bar chart with blue→green active gradient + scan-beam overlay on active year bar + glow-halo + text-gradient-animated cumulative savings callout + gradient-border-card lift-on-hover shadow-depth trust strip cards + btn-shine Calculate (preserved) + lift-on-hover Reset
- All existing functionality preserved: case-study modal opener, ROI reducer (SET_VOLUME / SET_CURRENT / SET_TARGET / SET_INDUSTRY / CALCULATE / RESET), 5-year ramp math, all slider aria-describedby/aria-pressed attributes
- Lint clean
