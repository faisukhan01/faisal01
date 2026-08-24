'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Subtle parallax — translates Y based on scroll position.
 * Use sparingly for premium feel (background blobs, decorative shapes).
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
  max = 60,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  max?: number;
}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * speed;
        // Clamp to [-max, max]
        setOffset(Math.max(-max, Math.min(max, y)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, max]);

  return (
    <div className={className} style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' }}>
      {children}
    </div>
  );
}

/**
 * Mouse-tracked parallax for premium hero effects.
 * Returns x/y offsets based on mouse position relative to viewport center.
 */
export function useMouseParallax(strength = 20) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * strength;
        const y = (e.clientY / window.innerHeight - 0.5) * strength;
        setPos({ x, y });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return pos;
}
