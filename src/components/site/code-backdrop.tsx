'use client';

import { useEffect, useRef } from 'react';

/**
 * CodeBackdrop v2 — a dense, living code atmosphere for the hero.
 *
 * A continuously scrolling ghost editor: full-width lines of JavaScript,
 * Python, SQL, JSON and shell type past like a build log — line numbers,
 * syntax coloring in the brand palette (electric-blue keywords, navy-ink
 * whispers), lines fading in at the bottom edge and out at the top, with
 * a blinking blue cursor riding the current line.
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

const POOL: Token[][] = [
  [cm('// faq-core/src/server.ts')],
  [kw('import '), rg('{ serve, json } '), kw('from '), st("'@faq/toolkit'"), rg(';')],
  [kw('import '), rg('{ db, auth, queue } '), kw('from '), st("'./core'"), rg(';')],
  [],
  [kw('const '), rg('app = serve({ port: '), nm('3000'), rg(', name: '), st("'faq-core'"), rg(' });')],
  [],
  [rg('app.'), kw('get'), rg('('), st("'/health'"), rg(', '), kw('async '), rg('() => {')],
  [rg('  '), kw('const '), rg('ms = +(performance.now() - t0).toFixed('), nm('2'), rg(')')],
  [rg('  '), kw('return '), rg('json({ ok: '), kw('true'), rg(', ms })')],
  [rg('})')],
  [],
  [rg('app.'), kw('post'), rg('('), st("'/v1/workflows'"), rg(', auth(), '), kw('async '), rg('(req) => {')],
  [rg('  '), kw('const '), rg('wf = '), kw('await '), rg('db.workflows.create(req.body)')],
  [rg('  '), kw('await '), rg('queue.push('), st("'run'"), rg(', wf.id)')],
  [rg('  '), kw('return '), rg('json(wf, '), nm('201'), rg(')')],
  [rg('})')],
  [],
  [cm('# faq_core/ledger.py')],
  [kw('from '), rg('decimal '), kw('import '), rg('Decimal')],
  [],
  [rg('@dataclass(slots='), kw('True'), rg(')')],
  [kw('class '), rg('Entry:')],
  [rg('    tenant: '), rg('str')],
  [rg('    delta:  '), rg('Decimal')],
  [],
  [kw('def '), rg('balance(tenant: '), rg('str'), rg(') -> Decimal:')],
  [rg('    rows = [e '), kw('for '), rg('e '), kw('in '), rg('book '), kw('if '), rg('e.tenant == tenant]')],
  [rg('    '), kw('return '), rg('sum((e.delta '), kw('for '), rg('e '), kw('in '), rg('rows), Decimal('), nm('0'), rg('))')],
  [],
  [cm('$ bun test --coverage')],
  [cm('  ✓ ledger.test.ts ('), nm('14'), cm(' passed)')],
  [cm('  ✓ auth.test.ts ('), nm('9'), cm(' passed)')],
  [cm('  coverage '), nm('96.4%'), cm(' statements')],
  [],
  [kw('SELECT '), rg('tenant, SUM(delta) '), kw('AS '), rg('balance')],
  [kw('FROM '), rg('ledger_entries')],
  [kw('WHERE '), rg('created_at > now() - interval '), st("'30 days'")],
  [kw('GROUP BY '), rg('tenant '), kw('ORDER BY '), rg('balance '), kw('DESC'), rg(';')],
  [],
  [rg('{ '), st('"name"'), rg(': '), st('"@faq/core"'), rg(', '), st('"version"'), rg(': '), st('"2.4.1"'), rg(' }')],
  [rg('{ '), st('"engines"'), rg(': { '), st('"bun"'), rg(': '), st('">=1.1"'), rg(' } }')],
  [],
  [kw('type '), rg('Result<T> = '), rg('{ ok: '), kw('true'), rg('; value: T } | { ok: '), kw('false'), rg(' }')],
  [],
  [kw('const '), rg('founders = ['), st("'Faisal'"), rg(', '), st("'Qayyum'"), rg(']')],
  [],
  [cm('$ git commit -m '), st('"release: v2.4.1"')],
  [cm('$ bun run deploy --product core')],
  [cm('  → built '), nm('42'), cm(' modules in '), nm('0.9s'), cm(' · live ✓')],
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
}

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

    const pushLine = () => {
      buffer.push({ no: lineNo++, tokens: POOL[poolIdx % POOL.length] });
      poolIdx += 1;
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

        // Soft entry at the bottom edge; lines stay solid to the very top
        // so the code fills the whole header zone
        const alpha = Math.max(0, Math.min(1, (height + rowH - y) / (rowH * 2)));

        // Line number, right-aligned in the gutter
        ctx.globalAlpha = alpha;
        ctx.fillStyle = NUMBER_COLOR;
        ctx.textAlign = 'right';
        ctx.fillText(String(line.no), gutter - 10, y);
        ctx.textAlign = 'left';

        // Tokens
        let col = 0;
        for (const token of line.tokens) {
          ctx.fillStyle = COLORS[token.kind];
          ctx.fillText(token.text, gutter + 8 + col * charW, y);
          col += token.text.length;
        }
        ctx.globalAlpha = 1;

        if (y <= height && (cursorLine === -1 || i > cursorLine)) cursorLine = i;
      }

      // Blinking cursor rides the last visible line
      if (cursorLine >= 0 && Math.floor(now / 530) % 2 === 0) {
        const line = buffer[cursorLine];
        const y = cursorLine * rowH - scroll + rowH;
        const lineLen = line.tokens.reduce((n, tok) => n + tok.text.length, 0);
        ctx.fillStyle = CURSOR_COLOR;
        ctx.fillRect(
          gutter + 8 + lineLen * charW + 2,
          y - fontPx * 0.95,
          Math.max(2, fontPx * 0.45),
          fontPx * 1.15
        );
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
