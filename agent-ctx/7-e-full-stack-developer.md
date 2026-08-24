# Task 7-e — Premium Styling Polish Pass (brand-logos + differentiators)

**Agent:** full-stack-developer
**Task ID:** 7-e
**Files touched:** `src/components/sections/brand-logos.tsx`, `src/components/sections/differentiators.tsx`
**Files NOT touched:** `globals.css` (zero edits), every other file in the repo (except `worklog.md` for the appended task record)

## Summary

Round 7 premium styling polish on two existing homepage sections. Applied the established Round 6 + Round 7 premium CSS utilities (`section-heading-chip`, `section-rule`, `spotlight-gradient`, `mesh-gradient`, `gradient-border-animated`, `gradient-border-card`, `lift-on-hover`, `card-stack-3d`, `shadow-depth`, `shadow-depth-lg`, `nav-link-underline`, `live-pulse-dot`, `text-gradient-animated`, `font-mono-numeric`, `glow-halo`, `evidence-badge`, `category-dot`) to both files without breaking any existing functionality (infinite marquee, brand list, stat strip, differentiator cards, motion reveals, Certs footer).

## Inputs read
- `/home/z/my-project/worklog.md` — prior rounds 1–6 + parallel Round 7 agent records (esp. 7-a Investor Relations, 6-e transcend-platform/stats polish pattern).
- `/home/z/my-project/agent-ctx/6-e-full-stack-developer.md` — pattern for `gradient-border-animated` + `lift-on-hover` + `text-gradient-animated` + `spotlight-gradient` + `mesh-gradient` on existing sections (notably the discovery that wrapping `reveal-from-side` inside a `Reveal` causes a visible blink — N/A here but good context).
- `/home/z/my-project/src/components/sections/brand-logos.tsx` (70 lines) — original Reveal + BrandWordmark + infinite marquee + 4-stat strip.
- `/home/z/my-project/src/components/sections/differentiators.tsx` (187 lines) — original Reveal + DIFFERENTIATORS + 4 motion cards + Certs footer.
- `/home/z/my-project/src/components/sections/solutions.tsx` (lines 130–220) — pattern for `card-stack-3d lift-on-hover-strong shadow-depth-lg` cards WITHOUT `overflow-hidden`, with a per-card 3px top accent stripe and a hover glow blob that bleeds past card bounds.
- `/home/z/my-project/src/components/sections/press-center.tsx` (lines 100–120, 280–294) — pattern for `section-heading-chip` + `category-dot` + `section-rule` centered header, and `evidence-badge` with inline lucide icon.
- `/home/z/my-project/src/components/site/reveal.tsx` — Reveal component API (`delay`, `className`).
- `/home/z/my-project/src/components/site/logo.tsx` — BrandWordmark is a styled `<span>` so wrapping it inside a pill is safe (no layout conflicts).
- `/home/z/my-project/src/lib/site-data.ts` — `DIFFERENTIATORS` export (typed `{ id, title, short, description, metric, metricLabel, icon, accent: string }[]`) and `BRAND_LOGOS` (`string[]`).
- `/home/z/my-project/src/app/globals.css` — confirmed all 17 referenced premium utilities are present (Round 6 lines 640–830, Round 7 lines 928–1098). Zero CSS edits needed.

## Key design decisions

### brand-logos.tsx
1. **Centered heading column** — the original had a left-aligned `<Reveal>` wrapping an h2 + p. Refactored to `flex flex-col items-center text-center` so the new `section-heading-chip` chip + h2 + section-rule + subtitle stack vertically and center on the white section. NETSOL span stays blue.
2. **Replaced edge-fade divs with mask-image** — the original had two `bg-gradient-to-r from-white to-transparent` overlays. Per spec, replaced with a single `mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent)` (+ `-webkit-mask-image`) on the marquee wrapper itself. The wrapper also gets `shadow-depth rounded-2xl bg-[#f5f7fa]/60` so the strip is faintly visible against the white section bg — the box-shadow needs a bg to be meaningful.
3. **Pills, not bare wordmarks** — each brand is now wrapped in a `lift-on-hover gradient-border-animated rounded-full bg-white h-[40px] min-w-[120px] sm:min-w-[150px] px-4 sm:px-5` pill with a subtle 6px `bg-[#1d81f2]/70` accent dot before the existing `BrandWordmark`. Marquee gap shrunk from `gap-12 sm:gap-16` to `gap-3 sm:gap-4` (pills carry their own padding). The `pr-3 sm:pr-4` on the inner marquee div preserved (needed for seamless infinite loop continuity — the marquee animation translates by 50% so per-item padding is irrelevant).
4. **Direction indicators** — two `←` and `→` chips at `absolute left-3 sm:left-6 top-1/2 z-20 -translate-y-1/2` (and right equivalent). Each is a `bg-white/85 backdrop-blur-sm shadow-depth border border-[#e0e0e0]` pill containing a small `live-pulse-dot` accent dot — purely decorative (`pointer-events-none`, `aria-hidden`). z-20 keeps them above the masked marquee content.
5. **Stats strip** — replaced the old `border-l-2 border-[#1d81f2]/20 pl-4` left-rule look with `gradient-border-card lift-on-hover shadow-depth rounded-2xl bg-white p-5` (gradient hairline border via the `::before` pseudo). Stat value gets `text-gradient-animated font-mono-numeric` (animated blue/cyan shimmer + tabular numerics). `ISO 27001` value (a label, not a number) also gets the gradient+mono treatment per the spec's literal wording — renders cleanly because `background-clip: text` clips to all text inside.
6. **No bottom CTA** — the original BrandLogos had no CTA strip, so the "Bottom CTA strip (if present)" spec block was skipped.

### differentiators.tsx
1. **Replaced the "Why NETSOL" badge with section-heading-chip** — the old `inline-flex items-center gap-2` + h2 w-2 dot + label was a stand-in. Now using the proper `section-heading-chip` class (chip with `category-dot` accent + "WHAT SETS US APART" text). Followed by the existing H2 (verbatim copy), then a new `section-rule` gradient hairline, then the existing description paragraph. Reveal wrapper + max-w preserved.
2. **Three section-bg layers coexist** — kept the existing top accent hairline + `bg-barcode` overlay, ADDED a third `mesh-gradient` overlay div. Three pointer-events-none absolute layers, no conflicts (different blend modes / opacities).
3. **Removed overflow-hidden from cards** — the original cards had `overflow-hidden` to clip the hover glow blob. The solutions.tsx precedent establishes that `card-stack-3d lift-on-hover-strong shadow-depth-lg` works best WITHOUT `overflow-hidden` so the stacked `::before/::after` pseudo-elements (translate 4–8px) are visible past card bounds. Kept the existing hover glow blob — it now bleeds past card edges for a premium glow effect. Also removed the redundant `hover:shadow-premium-lg` (superseded by `shadow-depth-lg`).
4. **Removed the old inline-styled gradient-border-on-hover span** — the original had a `<span>` with `WebkitMask` + `maskComposite: exclude` to draw a hover gradient border. Replaced by the class-based `card-stack-3d` stacked-card effect + the `gradient-border-animated` on the icon tile.
5. **Per-card top accent stripe** — new 3px `absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl` with inline-style `linear-gradient(90deg, ${d.accent}, #56ccf2)`. Colors vary per card (blue→cyan, green→cyan, deep-blue→cyan, light-blue→cyan) — picks up the per-card accent color, fading to a complementary light blue per the spec's "(or use accent color if available per-card)" guidance. Always visible (not hover-grow) so the cards have visible top accents at rest.
6. **Icon tile glow layering fix** — applied `gradient-border-animated glow-halo relative` to the icon tile. The `glow-halo::after` has `z-index: 0` and would otherwise paint OVER the icon SVG. Wrapped the SVG in `<span className="relative z-10 inline-flex items-center justify-center">` so the icon paints above the halo. Per-card `backgroundColor` style preserved on the tile itself.
7. **evidence-badge replaces 0X counter** — the original had a `text-[11px] font-mono uppercase tracking-widest text-[#9ca3af]` `0{i+1}` counter on the right of the header row. Replaced with a green `evidence-badge` chip carrying a `Check` lucide icon + "VERIFIED" text. Added `import { Check } from 'lucide-react';` (verified the icon exists in the installed package — `node_modules/lucide-react/dist/esm/icons/check.js`).
8. **nav-link-underline + inline-block on title** — added the `nav-link-underline` class to the h3 and changed display from block to `inline-block` so the gradient underline-grow on hover matches the title text width (not the full card content width — block-level would have made it a full-width divider).
9. **Metric — traded per-card color for gradient shimmer** — the original metric had inline `style={{ color: d.accent }}` for per-card color variation. Adding `text-gradient-animated` requires removing that inline style (inline `color: #24a148` would override the class's `color: transparent` and break the `background-clip: text` shimmer). Per-card color variation on the metric is sacrificed for the premium animated gradient treatment per the spec's explicit instruction. `font-mono-numeric` adds tabular numerics.
10. **Description preserved** — `text-[#525252] leading-[1.65] flex-1` kept exactly as before per spec.
11. **No bottom CTA** — the original Differentiators had a Certs text strip (no CTA button), so the "CTA at bottom (if present)" spec block was skipped.

## Verification
- `bun run lint` → exit 0, zero errors, zero warnings on both files.
- `bunx tsc --noEmit` filtered for `brand-logos|differentiators` → zero type errors in either file.
- TypeScript strict-safe — zero `any` casts. The `edgeMask` const is typed `as const` for the React `style` prop (string-valued maskImage). All data flows from the typed `DIFFERENTIATORS` and `BRAND_LOGOS` exports in `site-data.ts`.
- Dev server (system-managed, NOT started by me): `dev.log` shows clean prior compile (Ready in 644ms, GET / 200 in 8.3s). HMR will pick up the two edited files on next page render; lint + tsc confirm zero compile issues.

## What's preserved
- `'use client'` directive on both files.
- Marquee animation: `animate-marquee-left` keyframes class still on the inner flex div; `[...BRAND_LOGOS, ...BRAND_LOGOS]` duplication still in place; `flex overflow-hidden` > `flex shrink-0 ... animate-marquee-left` structure unchanged; the wrapper-level mask-image is independent of the inner marquee animation (only clips visual rendering, doesn't affect the translateX loop).
- Brand list: all 22 BRAND_LOGOS still rendered via `<BrandWordmark>` (unchanged import path).
- Stats strip: same 4 stats with same values and labels.
- Differentiator content: all 4 `DIFFERENTIATORS` items still rendered with the same `d.id`/`d.title`/`d.description`/`d.metric`/`d.metricLabel`/`d.icon`/`d.accent` data binding.
- Motion reveals: `motion.div` with `initial`/`whileInView`/`viewport`/`transition` preserved verbatim on each differentiator card. `Reveal` wrappers preserved on both section headers + Certs footer + each stat card.
- Icon SVGs: the `DifferentiatorIcon` helper + its 4 cases (`mesh`/`globe`/`spark`/`shield`) preserved verbatim.
- Certs footer: unchanged `Cert` helper + 5 cert labels.
- All responsive breakpoints preserved (`sm:`/`lg:` prefixes match the originals).
- `globals.css` NOT modified. No other files modified.

## Stage Summary
- 2 files polished: `src/components/sections/brand-logos.tsx` (still 1 export `BrandLogos`, `'use client'`) and `src/components/sections/differentiators.tsx` (still 1 export `Differentiators` + private `Cert`/`DifferentiatorIcon` helpers, `'use client'`).
- All 7 brand-logos spec blocks implemented: (1) section-heading-chip + section-rule, (2) spotlight-gradient overlay, (3) shadow-depth + mask-image edge fade on marquee wrapper, (4) gradient-border-animated + lift-on-hover brand pills with accent dot, (5) gradient-border-card + text-gradient-animated + font-mono-numeric stat cards, (6) decorative ←/→ indicators with live-pulse-dot accents. (Block 7 — bottom CTA — not present in original, skipped per spec.)
- All 10 differentiators spec blocks implemented: (1) section-heading-chip + section-rule, (2) card-stack-3d + lift-on-hover + shadow-depth-lg cards, (3) gradient-border-animated + glow-halo icon tile, (4) nav-link-underline title, (5) preserved text-525252 description, (6) text-gradient-animated + font-mono-numeric metric, (7) mesh-gradient section bg overlay, (9) evidence-badge VERIFIED chips (green) per card, (10) 3px per-card gradient top stripe. (Block 8 — CTA — not present in original, skipped per spec.)
- Zero new CSS. Zero `any` casts. Mobile-first responsive preserved. Marquee animation NOT broken. Lint clean. TypeScript clean.
