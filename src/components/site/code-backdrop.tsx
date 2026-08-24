'use client';

import { useEffect, useRef } from 'react';

/**
 * CodeBackdrop — a living, video-like code background for the header zone.
 *
 * Ghost lines of JavaScript, Python, and shell type themselves out
 * character-by-character in the brand palette — navy ink whispers with
 * electric-blue keywords and blinking cursors — then hold, fade, and
 * respawn elsewhere. Like watching a founder's editor through gauze.
 *
 * Performance: 30fps cap, DPR ≤ 1.5, pauses off-screen and when hidden,
 * renders one static frame under prefers-reduced-motion.
 */

type Kind = 'kw' | 'reg' | 'str' | 'com';

interface Token {
  text: string;
  kind: Kind;
}

interface Stream {
  tokens: Token[];
  x: number;
  y: number;
  typed: number;
  total: number;
  cps: number;
  hold: number;
  fade: number;
  age: number;
  alpha: number;
  phase: 'typing' | 'hold' | 'fading';
}

const COLORS: Record<Kind, string> = {
  kw: 'rgba(0, 122, 255, 0.38)',   // electric blue keywords
  reg: 'rgba(26, 35, 50, 0.17)',   // navy ink
  str: 'rgba(26, 35, 50, 0.14)',   // strings, slightly quieter
  com: 'rgba(26, 35, 50, 0.10)',   // comments, faintest
};

const SNIPPETS: Token[][] = [
  [
    { text: 'const ', kind: 'kw' },
    { text: 'founders = ', kind: 'reg' },
    { text: '["Faisal", "Qayyum"]', kind: 'str' },
    { text: ';', kind: 'reg' },
  ],
  [
    { text: 'await ', kind: 'kw' },
    { text: 'ship({ product: ', kind: 'reg' },
    { text: '"faq-core"', kind: 'str' },
    { text: ' });', kind: 'reg' },
  ],
  [
    { text: 'export function ', kind: 'kw' },
    { text: 'build() { ', kind: 'reg' },
    { text: 'return ', kind: 'kw' },
    { text: 'craft; }', kind: 'reg' },
  ],
  [
    { text: 'if ', kind: 'kw' },
    { text: '(broken) fix(bug); ', kind: 'reg' },
    { text: '// today', kind: 'com' },
  ],
  [
    { text: 'import ', kind: 'kw' },
    { text: '{ small } ', kind: 'reg' },
    { text: 'from ', kind: 'kw' },
    { text: '"@faq/toolkit"', kind: 'str' },
    { text: ';', kind: 'reg' },
  ],
  [
    { text: 'def ', kind: 'kw' },
    { text: 'ship(feature, care=', kind: 'reg' },
    { text: 'True', kind: 'kw' },
    { text: '):', kind: 'reg' },
  ],
  [
    { text: 'return ', kind: 'kw' },
    { text: 'product  ', kind: 'reg' },
    { text: '# no lock-in', kind: 'com' },
  ],
  [
    { text: 'class ', kind: 'kw' },
    { text: 'Founder(Engineer): ', kind: 'reg' },
    { text: 'pass', kind: 'kw' },
  ],
  [
    { text: '$ ', kind: 'com' },
    { text: 'bun run dev ', kind: 'kw' },
    { text: '--watch', kind: 'reg' },
  ],
  [
    { text: 'git ', kind: 'kw' },
    { text: 'commit -m ', kind: 'reg' },
    { text: '"polish > features"', kind: 'str' },
  ],
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

function snippetLength(tokens: Token[]): number {
  return tokens.reduce((n, t) => n + t.text.length, 0);
}

function makeStream(width: number, rowH: number, fontPx: number, row: number): Stream {
  const tokens = SNIPPETS[randInt(0, SNIPPETS.length - 1)];
  const total = snippetLength(tokens);
  const charW = fontPx * 0.6;
  const maxX = Math.max(16, width - total * charW - 24);
  return {
    tokens,
    x: rand(20, maxX),
    y: 40 + row * rowH,
    typed: 0,
    total,
    cps: rand(16, 30),
    hold: rand(1.6, 2.8),
    fade: rand(0.8, 1.2),
    age: 0,
    alpha: rand(0.7, 1),
    phase: 'typing',
  };
}

export function CodeBackdrop({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let visible = true;
    let streams: Stream[] = [];
    let width = 0;
    let height = 0;
    let fontPx = 12.5;
    let rowH = 46;
    let charW = 7.5;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const layout = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth || 1;
      height = parent.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontPx = width < 640 ? 11 : width < 1100 ? 12 : 13;
      rowH = width < 640 ? 34 : 44;
      charW = ctx.measureText('0').width || fontPx * 0.6;
      ctx.font = `500 ${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      charW = ctx.measureText('0').width || fontPx * 0.6;

      // One stream per visual row, staggered so they don't type in unison
      const rows = Math.max(2, Math.min(9, Math.floor((height - 60) / rowH)));
      streams = Array.from({ length: rows }, (_, row) => {
        const s = makeStream(width, rowH, fontPx, row);
        if (reduced) {
          s.typed = s.total;
          s.phase = 'hold';
        } else {
          // stagger: some mid-typing, some already fading
          const roll = Math.random();
          if (roll < 0.35) {
            s.typed = randInt(0, s.total);
          } else if (roll < 0.65) {
            s.typed = s.total;
            s.phase = 'hold';
            s.age = rand(0, s.hold);
          } else {
            s.typed = s.total;
            s.phase = 'fading';
            s.age = rand(0, s.fade);
          }
        }
        return s;
      });
    };

    const drawCursor = (x: number, y: number, alpha: number, blinkOn: boolean) => {
      if (!blinkOn) return;
      ctx.fillStyle = `rgba(0, 122, 255, ${0.55 * alpha})`;
      ctx.fillRect(x + 1, y - fontPx * 0.95, Math.max(2, fontPx * 0.42), fontPx * 1.15);
    };

    const drawStream = (s: Stream, now: number) => {
      let alpha = s.alpha;
      if (s.phase === 'fading') alpha *= Math.max(0, 1 - s.age / s.fade);

      let drawn = 0;
      let cursorX = s.x;
      for (const token of s.tokens) {
        const remain = s.typed - drawn;
        if (remain <= 0) break;
        const part = token.text.slice(0, Math.min(token.text.length, remain));
        ctx.fillStyle = COLORS[token.kind];
        ctx.globalAlpha = alpha;
        ctx.fillText(part, s.x + drawn * charW, s.y);
        drawn += part.length;
        cursorX = s.x + drawn * charW;
      }
      ctx.globalAlpha = 1;

      if (s.phase === 'typing' || (s.phase === 'hold' && s.typed === s.total)) {
        const blinkOn = Math.floor(now / 530) % 2 === 0;
        drawCursor(cursorX, s.y, alpha, blinkOn);
      }
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!visible || document.hidden) return;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 ${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = 'alphabetic';

      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];
        if (s.phase === 'typing') {
          s.typed = Math.min(s.total, s.typed + (s.cps / 30));
          if (s.typed >= s.total) {
            s.phase = 'hold';
            s.age = 0;
          }
        } else if (s.phase === 'hold') {
          s.age += 1 / 30;
          if (s.age >= s.hold) {
            s.phase = 'fading';
            s.age = 0;
          }
        } else {
          s.age += 1 / 30;
          if (s.age >= s.fade) {
            streams[i] = makeStream(width, rowH, fontPx, Math.round((s.y - 40) / rowH));
            continue;
          }
        }
        drawStream(s, now);
      }
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
      // Static frame — all lines typed, cursors drawn once
      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 ${fontPx}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = 'alphabetic';
      streams.forEach((s) => drawStream(s, 0));
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
