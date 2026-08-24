'use client';

import { useEffect, useRef } from 'react';

/**
 * CodeBackdrop v3 — a full-bleed, living code atmosphere for the hero.
 *
 * Every line is written long enough to span the entire viewport width
 * (realistic dense code, dynamically padded with fluent-chain fragments
 * on ultrawide screens), so the ghost editor covers the whole header
 * and hero edge-to-edge at ANY screen size. Lines scroll upward like a
 * build log — line numbers, brand-palette syntax coloring (electric-blue
 * keywords, navy-ink whispers), blinking blue cursor on the current line.
 *
 * Performance: ~30fps cap, DPR ≤ 1.5, pauses off-screen and when the tab
 * is hidden, renders one static frame under prefers-reduced-motion.
 */

type Kind = 'kw' | 'reg' | 'str' | 'com' | 'num';

interface Token {
  text: string;
  kind: Kind;
}

const t = (text: string, kind: Kind): Token => ({ text, kind });
const kw = (s: string) => t(s, 'kw');
const rg = (s: string) => t(s, 'reg');
const st = (s: string) => t(s, 'str');
const cm = (s: string) => t(s, 'com');
const nm = (s: string) => t(s, 'num');

/** Natural fluent-code fragments used to top-up short lines to full width. */
const FILLERS: Token[][] = [
  [rg('.map((r) => r.value) ')],
  [rg('.filter((e) => e.ok) ')],
  [rg(' ?? '), nm('0'), rg(' ')],
  [rg('.slice('), nm('0'), rg(', '), nm('25'), rg(') ')],
  [rg(' + '), st("'next'"), rg(' ')],
  [cm('/* @faq */ ')],
  [rg('.then((r) => r.json()) ')],
  [rg('.catch(report) ')],
  [rg(' ?? '), st("'—'"), rg(' ')],
  [rg('.sort((a, b) => a.id - b.id) ')],
];

const POOL: Token[][] = [
  [cm('// faq-core/src/http/server.ts — request pipeline, auth, workflow dispatch (v2.4.1)')],
  [kw('import '), rg('{ serve, json, errors, type Context, type Handler, type NextFn } '), kw('from '), st("'@faq/toolkit/dist/http'"), rg(';')],
  [kw('import '), rg('{ db, cache, queue, metrics, logger, audit } '), kw('from '), st("'./core'"), rg(';')],
  [kw('const '), rg('app = serve({ name: '), st("'faq-core'"), rg(', port: '), nm('3000'), rg(', trustProxy: '), kw('true'), rg(", bodyLimit: "), st("'2mb'"), rg(' });')],
  [rg('app.'), kw('use'), rg('(trace({ sample: '), nm('0.25'), rg(', slowThresholdMs: '), nm('80'), rg(', onSlow: (r) => logger.warn('), st("'slow'"), rg(', { route: r.path, ms: r.duration }) }));')],
  [rg('app.'), kw('get'), rg('('), st("'/health'"), rg(', '), kw('async '), rg('(ctx) => { '), kw('const '), rg('ms = +(performance.now() - ctx.t0).toFixed('), nm('2'), rg('); '), kw('return '), rg('json({ ok: '), kw('true'), rg(', ms, uptime: process.uptime() | '), nm('0'), rg(' }); });')],
  [rg('app.'), kw('post'), rg('('), st("'/v1/workflows'"), rg(', auth({ scope: '), st("'workflows:write'"), rg(' }), validate(schema.workflow), '), kw('async '), rg('(req) => {')],
  [rg('  '), kw('const '), rg('wf = '), kw('await '), rg('db.workflows.create({ ...req.body, tenant: req.tenant.id, state: '), st("'queued'"), rg(' });')],
  [rg('  '), kw('await '), rg('queue.push('), st("'run'"), rg(', { id: wf.id, attempts: '), nm('3'), rg(", backoff: "), st("'exponential'"), rg(' }); metrics.inc('), st("'workflow.queued'"), rg(');')],
  [rg('  '), kw('return '), rg('json(wf, '), nm('201'), rg(', { location: '), st('`/v1/workflows/${wf.id}`'), rg(' }); });')],
  [],
  [cm('# faq_core/ledger.py — double-entry ledger with Decimal precision and audit trail')],
  [kw('from '), rg('decimal '), kw('import '), rg('Decimal')],
  [rg('@dataclass(slots='), kw('True'), rg(', frozen='), kw('True'), rg(')')],
  [kw('class '), rg('Entry:  tenant: '), rg('str'), rg(';  delta: Decimal;  kind: Literal['), st("'debit'"), rg(', '), st("'credit'"), rg('];  ref: '), rg('str | '), kw('None'), rg(' = '), kw('None'), rg(' ')],
  [kw('def '), rg('balance(tenant: '), rg('str'), rg(', *, as_of: date | '), kw('None'), rg(' = '), kw('None'), rg(') -> Decimal:')],
  [rg('    rows = [e '), kw('for '), rg('e '), kw('in '), rg('BOOK '), kw('if '), rg('e.tenant == tenant '), kw('and '), rg('(as_of '), kw('is '), kw('None'), rg(' '), kw('or '), rg('e.at <= as_of)]')],
  [rg('    '), kw('return '), rg('sum((e.delta '), kw('for '), rg('e '), kw('in '), rg('rows '), kw('if '), rg('e.kind == '), st("'credit'"), rg('), Decimal('), nm('0'), rg('))')],
  [],
  [kw('SELECT '), rg('tenant, SUM(CASE '), kw('WHEN '), rg('kind = '), st("'credit'"), rg(' '), kw('THEN '), rg('delta '), kw('ELSE '), rg('-delta '), kw('END'), rg(') '), kw('AS '), rg('balance, COUNT(*) '), kw('AS '), rg('n')],
  [kw('FROM '), rg('ledger_entries '), kw('WHERE '), rg('created_at > now() - interval '), st("'30 days'"), rg(' '), kw('AND '), rg('status = '), st("'settled'")],
  [kw('GROUP BY '), rg('tenant '), kw('HAVING '), rg('SUM(delta) > '), nm('0'), rg(' '), kw('ORDER BY '), rg('balance '), kw('DESC'), rg(' '), kw('LIMIT'), rg(' '), nm('25'), rg(';')],
  [],
  [cm('$ bun test --coverage --reporter=dot    ✓ '), nm('47'), cm(' passed   ✗ '), nm('0'), cm(' failed  ('), nm('1.84s'), cm(')')],
  [cm('$ bun run deploy --product core    → built '), nm('42'), cm(' modules in '), nm('0.9s'), cm(' · types ✓ · lint ✓ · live')],
  [cm('$ git commit -m '), st('"release: v2.4.1 — ledger precision + workflow retries"'), cm('    1 file changed')],
  [],
  [rg('{ '), st('"name"'), rg(': '), st('"@faq/core"'), rg(', '), st('"version"'), rg(': '), st('"2.4.1"'), rg(', '), st('"engines"'), rg(': { '), st('"bun"'), rg(': '),st('">=1.1"'), rg(' }, '), st('"sideEffects"'), rg(': '), kw('false'), rg(' }')],
  [kw('type '), rg('Result<T, E = '), rg('Error'), rg('> = { ok: '), kw('true'), rg('; value: T } | { ok: '), kw('false'), rg('; error: E; retryable: '), kw('boolean'), rg(' };')],
  [kw('const '), rg('founders = ['), st("'Faisal'"), rg(', '), st("'Qayyum'"), rg('] '), rg('// engineer-built, founder-led')],
  [rg('app.'), kw('get'), rg('('), st("'/v1/entries/:tenant'"), rg(', '), kw('async '), rg('(req) => { '), kw('const '), rg('rows = '), kw('await '), rg('ledger.entries(req.params.tenant, { since: req.query.since }); ')],
  [rg('  '), kw('return '), rg('json({ count: rows.length, rows, cached: '), kw('false'), rg(' }); });')],
  [],
  [rg('watch('), st("'src/**/*.ts'"), rg(', { debounce: '), nm('120'), rg(' }, (file) => queue.push('), st("'rebuild'"), rg(', { file, hot: '), kw('true'), rg(' }))')],
  [rg('metrics.observe('), st("'http.duration'"), rg(', ms, { route: ctx.route, method: ctx.method, tenant: ctx.tenant.id })')],
];

const COLORS: Record<Kind, string> = {
  kw: 'rgba(0, 122, 255, 0.36)',   // electric-blue keywords
  reg: 'rgba(26, 35, 50, 0.16)',   // navy ink
  str: 'rgba(26, 35, 50, 0.13)',   // strings, quieter
  com: 'rgba(26, 35, 50, 0.10)',   // comments, faintest
  num: 'rgba(0, 122, 255, 0.28)',  // numerals, blue family
};

const NUMBER_COLOR = 'rgba(26, 35, 50, 0.13)';
const CURSOR_COLOR = 'rgba(0, 122, 255, 0.55)';
const SPEED = 26; // px per second — gentle log scroll

interface Line {
  no: number;
  tokens: Token[];
  padded: Token[];
}

const lineLength = (tokens: Token[]) => tokens.reduce((n, tk) => n + tk.text.length, 0);

const randInt = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1));

export function CodeBackdrop({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let fontPx = 12;
    let rowH = 28;
    let charW = 7.2;
    let gutter = 46;

    let buffer: Line[] = [];
    let poolIdx = 0;
    let lineNo = 1;
    let scroll = 0;
    let lastDraw = performance.now();

    const font = () => `500 ${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

    /** Pad a line with fluent-code fragments until it spans the full width. */
    const padLine = (tokens: Token[]): Token[] => {
      const target = Math.ceil((width - gutter - 8) / charW) + 2;
      let len = lineLength(tokens);
      if (len >= target) return tokens;
      const out = [...tokens];
      let i = randInt(0, FILLERS.length - 1);
      while (len < target) {
        const chunk = FILLERS[i % FILLERS.length];
        out.push(...chunk);
        len += lineLength(chunk);
        i += 1;
      }
      return out;
    };

    const reflow = () => {
      // Re-pad every buffered line (screen resized)
      for (const line of buffer) line.padded = padLine(line.tokens);
    };

    const pushLine = () => {
      const tokens = POOL[poolIdx % POOL.length];
      poolIdx += 1;
      const line: Line = { no: lineNo++, tokens, padded: [] };
      line.padded = padLine(tokens);
      buffer.push(line);
    };

    const layout = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth || 1;
      height = parent.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = width < 640;
      fontPx = mobile ? 11 : width < 1100 ? 12 : 12.5;
      rowH = mobile ? 24 : 28;
      gutter = mobile ? 30 : 46;

      ctx.font = font();
      charW = ctx.measureText('0').width || fontPx * 0.6;

      reflow();

      // Fill the screen with code immediately — dense from frame one
      const need = Math.ceil(height / rowH) + 8;
      while (buffer.length < need) pushLine();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = font();
      ctx.textBaseline = 'alphabetic';

      const firstIdx = Math.max(0, Math.floor(scroll / rowH));
      const visibleRows = Math.ceil(height / rowH) + 1;
      const lastIdx = firstIdx + visibleRows + 1;

      // Keep spare lines below the fold
      while (buffer.length < lastIdx + 3) pushLine();

      let cursorLine = -1;

      for (let i = firstIdx; i <= lastIdx; i++) {
        const line = buffer[i];
        if (!line) continue;
        const y = i * rowH - scroll + rowH; // baseline
        if (y < -6 || y > height + rowH * 2) continue;

        // Soft entry at the bottom edge; solid to the very top
        const alpha = Math.max(0, Math.min(1, (height + rowH - y) / (rowH * 2)));

        // Line number, right-aligned in the gutter
        ctx.globalAlpha = alpha;
        ctx.fillStyle = NUMBER_COLOR;
        ctx.textAlign = 'right';
        ctx.fillText(String(line.no), gutter - 10, y);
        ctx.textAlign = 'left';

        // Tokens — padded line spans the full viewport width
        let col = 0;
        for (const token of line.padded) {
          const x = gutter + 8 + col * charW;
          if (x > width) break; // off the right edge — stop drawing
          ctx.fillStyle = COLORS[token.kind];
          ctx.fillText(token.text, x, y);
          col += token.text.length;
        }
        ctx.globalAlpha = 1;

        if (y <= height && (cursorLine === -1 || i > cursorLine)) cursorLine = i;
      }

      // Blinking cursor rides the last visible line, clamped inside the canvas
      if (cursorLine >= 0 && Math.floor(now / 530) % 2 === 0) {
        const line = buffer[cursorLine];
        const y = cursorLine * rowH - scroll + rowH;
        const lineLen = lineLength(line.padded);
        const cx = Math.min(gutter + 8 + lineLen * charW + 2, width - 6);
        ctx.fillStyle = CURSOR_COLOR;
        ctx.fillRect(cx, y - fontPx * 0.95, Math.max(2, fontPx * 0.45), fontPx * 1.15);
      }

      // Bound memory — trim the head once we're deep into the buffer
      if (firstIdx > 80) {
        const drop = 60;
        buffer.splice(0, drop);
        scroll -= drop * rowH;
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (now - lastDraw < 32) return; // ~30fps cap
      const dt = Math.min(0.1, (now - lastDraw) / 1000);
      lastDraw = now;
      scroll += SPEED * dt;
      draw(now);
    };

    layout();

    const ro = new ResizeObserver(layout);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    if (reduced) {
      draw(performance.now()); // one static, fully-typed frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
