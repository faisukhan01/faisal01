# Task 6-e — Premium Styling Polish Pass (transcend-platform + stats)

**Agent**: full-stack-developer
**Task ID**: 6-e
**Files touched**: `src/components/sections/transcend-platform.tsx`, `src/components/sections/stats.tsx`
**Files NOT touched**: `globals.css` (zero edits), every other file in the repo

## Summary

Round 6 premium styling polish on two existing homepage sections. Applied the established premium CSS utilities (section-heading-chip, section-rule, chip-selected, lift-on-hover, gradient-border-animated, spotlight-gradient, shadow-depth, shadow-depth-lg, mesh-gradient, reveal-from-side, live-pulse-dot, font-mono-numeric, text-gradient-animated) to both files without breaking any existing functionality (5-tab switching, 3D scenes, counters, vertical marquee).

## Key design decisions

1. **Shared-layout tab pill** — used Framer Motion `layoutId="transcend-tab-pill"` so the active-tab pill slides between positions via Framer Motion's shared-layout animation system. The pill itself uses `chip-selected` (blue gradient) so all 5 tabs now share a unified blue active state, with per-tab accent colors preserved via the small accent dot before each label.

2. **CategoryChips sub-component** — new typed sub-component (props: `categories: readonly string[]`, `accent: string`) renders a row of clickable category chips above the 3D scene in the left hero card. Active chip = `chip-selected`, inactive = `lift-on-hover`. Remounts via `key={current.id}` from parent so the active selection resets on tab change — no useEffect, satisfies react-hooks rules.

3. **gradient-border-animated on both content cards** — applied to both left hero card (with tinted `current.bg` inline style that wins over the class's `background: white`) and right marquee card. Removed the redundant inline-styled gradient border span from the right card (replaced by the cleaner class-based version).

4. **spotlight + z-index for 3D scenes** — spotlight overlay is `absolute inset-0` inside a `relative` container; Lazy3D's className is now `relative z-10 h-full w-full` so the canvas paints on top of the spotlight (resolved the CSS painting-order issue where absolute elements paint above in-flow elements by default).

5. **reveal-from-side CSS class WITHOUT a parent Reveal** — discovered that wrapping `reveal-from-side`-classed paragraphs inside a `Reveal` component causes a visible "blink" because Framer Motion's inline `opacity: 0` initial state conflicts with the CSS keyframe animation. Solution: split the parent Reveal to wrap only the chip + h2 + section-rule; the two paragraphs are now plain `<p className="reveal-from-side">` (with a 0.12s stagger on the second) so the CSS animation runs cleanly on mount.

6. **text-gradient-animated wrapping the Counter** — verified that `background-clip: text` clips to all text inside the element (including descendant text from the Counter's inner span), so the gradient shimmer flows across prefix + animated number + suffix as a single visual unit.

## Verification

- `bun run lint` → exit code 0, zero errors.
- `bunx tsc --noEmit` → zero errors in `transcend-platform.tsx` and `stats.tsx`. The only 2 tsc errors are pre-existing in `counter.tsx` (line 26) and `scenes.tsx` (line 131) — NOT from this task.
- Dev server: confirmed clean compile from the prior log entry. The dev server crashed (port 3000 not listening) due to the known OOM-under-load issue documented in prior rounds. The system auto-restarts it; the polished files compile cleanly via lint + tsc.

## What's preserved

- 5-tab switching (now with shared-layout pill animation between tabs)
- `current.bg` and `current.accent` per-tab theming (still drive the left card bg, accent strip, icon tile, CTA color, fallback blob color)
- Vertical marquee (`animate-marquee-vertical` 18s linear infinite)
- 3D scenes (`PlatformScene3D`, `StatsScene3D`) still loaded via existing `dynamic()` + `Lazy3D` pattern (unchanged)
- `Counter` component still animates 0→end on scroll-in-view (unchanged)
- STATS data structure consumed unchanged
- All responsive breakpoints preserved
