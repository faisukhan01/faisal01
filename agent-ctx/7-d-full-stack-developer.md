# Task ID: 7-d — full-stack-developer

## Task
Premium Round 7 styling polish pass on TWO existing sections of the NETSOL Technologies homepage:
1. `src/components/sections/testimonials.tsx` (12 enhancements)
2. `src/components/sections/insights.tsx` (12 enhancements)

## Work Log
- Read `/home/z/my-project/worklog.md` (Round 6 polish conventions + Round 7 PR Center 7-b + IR 7-a + Careers 7-c work records) for consistent premium-styling patterns.
- Read both target files in full (`testimonials.tsx` ~206 lines, `insights.tsx` ~221 lines) to understand existing functionality: testimonials has carousel (active state + 6.5s auto-advance interval), AnimatePresence mode="wait" keyed on `current.id`, dot nav, prev/next arrows, keyboard nav (left/right when focused), VideoModal trigger; insights has horizontal-scroll carousel with `data-card` width measurement, tag-filter chips with counts via useMemo, AnimatePresence mode="popLayout" with layout animations, InsightModal trigger via `setActiveId(post.id)`.
- Read `/home/z/my-project/src/app/globals.css` lines 380-1119 to verify every premium utility I planned to use exists and inspect its CSS: `section-heading-chip`, `category-dot`, `section-rule`, `spotlight-gradient`, `mesh-gradient`, `text-gradient-animated`, `card-stack-3d`, `gradient-border-animated`, `lift-on-hover`, `lift-on-hover-strong`, `shadow-depth`, `shadow-depth-lg`, `font-mono-numeric`, `chip-selected`, `btn-shine`, `btn-glow`, `live-pulse-dot`, `nav-link-underline`, `archive-card`, `press-category-tag`, `press-featured`, `evidence-badge`, `load-more-shine`. Also studied the `gradient-border-animated` ::before mask trick (uses `padding: 1px` + `linear-gradient(#fff 0 0) content-box` xor composite) to confirm it does not require overflow-visible on the element.
- Read `/home/z/my-project/src/lib/site-data.ts` lines 206-265 to confirm data shapes: `TESTIMONIALS` has 3 entries (id, company, person, title, quote, portrait, hasVideo); only entry 3 (Mike Boyes / Haydock) has `hasVideo: true`. `INSIGHTS` has id/tag/title/excerpt/image/date (e.g. "Apr 14, 2026")/readTime (e.g. "6 min").
- Read `/home/z/my-project/src/components/sections/press-center.tsx` lines 1-300 as the design reference for the established premium pattern: `<span className="section-heading-chip"><span className="category-dot" style={{color}} />TEXT</span>` → h2 → `section-rule` hairline; filter chips with `chip-selected` (active) + `lift-on-hover` (inactive) + `category-dot` + count badge; archive cards with `archive-card lift-on-hover shadow-depth-lg` + `press-category-tag`.
- Identified cascade conflict: `.gradient-border-animated { position: relative }` and `.card-stack-3d { position: relative }` in globals.css would override Tailwind's `.absolute { position: absolute }` (custom CSS comes after Tailwind's `@import "tailwindcss"` in globals.css, so custom wins on equal-specificity ties). Resolved by:
  - **Testimonials card**: restructured into a 3-layer model — `<motion.div className="absolute inset-0">` (animation wrapper, keeps the absolute positioning) → `<div className="card-stack-3d h-full rounded-[24px]">` (stack wrapper, gets position:relative from the class — no Tailwind `absolute` to conflict, so no overflow-hidden so the ::before/::after pseudo-elements translate(4px,4px) and translate(8px,8px) past the card edge render the visible layered "stack" effect) → inner card `<div className="gradient-border-animated lift-on-hover shadow-depth-lg h-full grid ... rounded-[24px] bg-white overflow-hidden">` (gets position:relative from class, holds the actual content + clips the portrait img to rounded corners via overflow-hidden; lift-on-hover on this layer lifts the card off its stacked pseudo-element base on hover).
  - **Testimonials portrait**: same conflict on the inner portrait ring. Resolved with inline `style={{ position: 'absolute', inset: 0 }}` to beat the class's `position: relative` (inline styles win on specificity). The `gradient-border-animated` ::before pseudo (mask trick at `inset: 0` with `padding: 1px`) is painted on the element's surface inside its content box, so overflow-hidden on the same element does NOT clip it.
  - **Insights article image container**: applied `gradient-border-animated` directly to the aspect-[16/9] div (the existing `relative` Tailwind class matches the class's `position: relative` — no conflict, no `absolute` to override).
- Rewrote `/home/z/my-project/src/components/sections/testimonials.tsx` (~232 lines) with all 12 enhancements:
  1. Section heading chip `section-heading-chip` with `category-dot` "VOICES" + `section-rule` hairline under h2.
  2. `spotlight-gradient` overlay div absolute inset-0 pointer-events-none behind content.
  3. Testimonial card gets `gradient-border-animated lift-on-hover shadow-depth-lg` + 3-layer `card-stack-3d` wrapper for the stacked effect on the active card (the motion.div key change on `current.id` re-mounts the stack each transition).
  4. Opening `"` quote mark uses `text-gradient-animated` (64px bold, -mt-2 select-none aria-hidden) for the blue→cyan shimmer.
  5. Person name prefixed with a 4px accent dot (`h-1 w-1 rounded-full bg-[#1d81f2]` — h-1 = 4px in Tailwind).
  6. Person title uses `font-mono-numeric` for tabular look.
  7. Company name rendered as a `chip-selected` chip (gradient blue→deep-blue bg + text-white) instead of the old flat tinted bg.
  8. Play button gets `btn-shine btn-glow` classes for premium shine + glow (only shown for the Mike Boyes/Haydock entry which has hasVideo:true).
  9. Active dot uses `live-pulse-dot` (1.6s scale+opacity pulse) + `bg-gradient-to-r from-[#1d81f2] to-[#56ccf2]` (premium gradient pill). Inactive dots use `lift-on-hover` for subtle hover scale.
  10. Prev/Next arrows get `btn-shine` + `lift-on-hover` for premium feel.
  11. Portrait image wrapped in `gradient-border-animated` ring + `shadow-depth` for premium depth (inline style for the position:absolute override).
  12. Added new "01 / 03" counter indicator using `font-mono-numeric` + `tabular-nums` (zero-padded via `String(active+1).padStart(2,'0')`), placed at the left of the dot-nav row.
- Rewrote `/home/z/my-project/src/components/sections/insights.tsx` (~219 lines) with all 12 enhancements:
  1. Section heading chip `section-heading-chip` with `category-dot` "FEATURED READS" + `section-rule` hairline under h2.
  2. `mesh-gradient` overlay div absolute inset-0 pointer-events-none opacity-60 behind content.
  3. Filter chips: inactive chips get `lift-on-hover`, active chips use `chip-selected` (replaces the old `bg-[#1d81f2] text-white border-[#1d81f2] shadow-soft` triple — chip-selected provides the gradient + glow in one utility). Each chip gets a `category-dot` (accent per-tag via the new `TAG_ACCENT` map: All=#1d81f2, Blog=#1d81f2, Guide=#24a148 green, Case Study=#0f62fe deep, Event=#2d9cdb mid-blue — mirrors the press-center CATEGORY_ACCENT pattern).
  4. Article cards get `archive-card lift-on-hover shadow-depth` (the existing inline-style animated gradient border overlay span is preserved as a secondary hover effect).
  5. Article category tag uses `press-category-tag` class with inline `color: #1d81f2` + `background: rgba(255,255,255,0.92)` + `backdropFilter: blur(4px)` for premium tag styling with image legibility.
  6. Article title (`<h3>`) gets `nav-link-underline` class — the ::after grows a blue→cyan gradient underline on hover (combined with the existing `group-hover:text-[#1d81f2]` color shift).
  7. Excerpt preserved verbatim `text-[13px] lg:text-[14px] text-[#525252] leading-[1.6]`.
  8. Date + read-time div gets `font-mono-numeric` for premium tabular numerics; the floating read-time badge also gets `font-mono-numeric`.
  9. "Read article" link gets `nav-link-underline` for premium underline grow on hover.
  10. Prev/Next scroll arrows get `btn-shine` + `lift-on-hover`.
  11. Article image container (the `aspect-[16/9]` div) gets `gradient-border-animated` + `shadow-depth`. The inner `<img>` already had `group-hover:scale-105` so the hover-scale effect is preserved; overflow-hidden on the container clips the scaled image to the rounded corners.
  12. Pagination dots: the insights section has no pagination dots — only the filter-chip count badges serve that role. Per spec ("if any"), no change required. The filter chips themselves function as the per-category "dot" with the count badge as the indicator.
- TypeScript strict-safety: added new `TAG_ACCENT: Record<Tag, string>` typed map (no `any`). Counter indicator uses `String(...).padStart(...)` (both well-typed). All inline styles use string/number literals only. No new imports needed beyond what already existed; `X` icon was removed from insights.tsx imports because it was unused (lint rule `@typescript-eslint/no-unused-vars`).
- Verified: ran `bun run lint` → exit 0, **0 errors, 0 warnings** on the entire project. Ran `bunx tsc --noEmit --skipLibCheck` → 0 errors in `src/components/sections/testimonials.tsx` and `src/components/sections/insights.tsx` (5 pre-existing errors in OTHER files — `who-we-serve.tsx`, `counter.tsx`, `scenes.tsx`, `live-pulse.tsx` — are unrelated to this task and left untouched per the "do NOT modify any other file" constraint).
- Verified: dev server `dev.log` shows clean Next.js 16.1.3 Turbopack compile (`✓ Ready in 644ms`, `GET / 200 in 8.3s`).

## Stage Summary
- 2 files modified in-place: `/home/z/my-project/src/components/sections/testimonials.tsx` (~232 lines) and `/home/z/my-project/src/components/sections/insights.tsx` (~219 lines).
- 0 new files created. `globals.css` NOT modified. No other files touched.
- All existing functionality preserved verbatim:
  - Testimonials: 6.5s auto-advance interval (cleared on pause), AnimatePresence mode="wait" keyed on `current.id`, dot nav with `aria-current`, prev/next arrows with `aria-label`, keyboard nav (left/right) when carousel region focused, keyboard hint chip shown only when `focused`, VideoModal trigger on play button (only for the Mike Boyes/Haydock entry which has `hasVideo: true`).
  - Insights: horizontal-scroll carousel with `data-card` measurement-based `scrollBy`, tag-filter chips with `tagCounts` memo, AnimatePresence mode="popLayout" with layout animations, InsightModal trigger via `setActiveId(post.id)` on whole-card click, edge spacer card, defensive empty-state fallback, "Browse all insights" button (opens insight id=1).
- All 24 requested premium enhancements delivered (12 per file). Used only pre-existing Round 6 + Round 7 utility classes — zero new CSS.
- Cascade conflict between custom CSS classes (`gradient-border-animated` and `card-stack-3d` both set `position: relative`) and Tailwind's `.absolute` utility resolved via 3-layer wrapper structure (testimonials card) and inline `style={{position:'absolute'}}` override (testimonials portrait ring).
- Lint clean (exit 0, 0 errors, 0 warnings). TypeScript clean for both target files. Dev server compiles cleanly and serves `/` 200.
- Color tokens used (all from the established palette): #1d81f2 (primary blue), #0f62fe (deep blue), #56ccf2 (light blue), #2d9cdb (mid blue for Event tag accent), #24a148 (green for Guide tag accent), #161616 (headings), #525252 (body), #6b7280 (labels), #f0f8ff (testimonials bg), #f5f7fa (chip count badge bg), #0a0d12 (image overlay gradient + read-time badge bg), #e0e0e0 (hairlines).
