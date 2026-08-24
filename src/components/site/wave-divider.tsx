'use client';

import { type CSSProperties } from 'react';

interface WaveDividerProps {
  /** Direction of the wave — "down" means top section is lighter, bottom section is darker (wave dips into next) */
  variant?: 'wave-down' | 'wave-up' | 'curve-down' | 'curve-up' | 'triangle' | 'double-wave';
  /** Fill color for the wave (matches the lower section's bg) */
  fill?: string;
  /** Optional className */
  className?: string;
  /** Background color behind the wave (matches the upper section's bg) */
  background?: string;
  /** Height of the divider in px (default 64) */
  height?: number;
}

/**
 * WaveDivider — premium SVG section divider that creates a smooth visual
 * transition between two sections of different background colors.
 *
 * Useful for: hero → brand-logos, testimonials → insights, etc.
 * Renders full-bleed SVG that scales to 100% width.
 *
 * The divider sits in its own div with a transparent bg by default — the
 * `background` prop sets the upper section's bg color so the wave's top
 * edge blends seamlessly.
 */
export function WaveDivider({
  variant = 'wave-down',
  fill = '#ffffff',
  background = 'transparent',
  className,
  height = 64,
}: WaveDividerProps) {
  const containerStyle: CSSProperties = {
    background,
    height: `${height}px`,
    lineHeight: 0,
  };

  const viewBoxHeight = 64;
  const paths: Record<NonNullable<WaveDividerProps['variant']>, string> = {
    'wave-down': 'M0,32 C360,64 720,0 1440,32 L1440,64 L0,64 Z',
    'wave-up': 'M0,32 C360,0 720,64 1440,32 L1440,0 L0,0 Z',
    'curve-down': 'M0,0 C480,64 960,64 1440,0 L1440,64 L0,64 Z',
    'curve-up': 'M0,64 C480,0 960,0 1440,64 L1440,0 L0,0 Z',
    triangle: 'M0,0 L720,64 L1440,0 L1440,64 L0,64 Z',
    'double-wave': 'M0,16 C240,48 480,0 720,16 C960,32 1200,64 1440,16 L1440,64 L0,64 Z',
  };

  // For "up" variants, the fill needs to cover the top half (so the lower section's
  // color shows through the top). For "down" variants, the fill covers the bottom half.
  const isUpVariant = variant.endsWith('-up');

  return (
    <div
      aria-hidden
      className={`w-full overflow-hidden ${className ?? ''}`}
      style={containerStyle}
    >
      <svg
        viewBox={`0 0 1440 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: '100%' }}
      >
        {isUpVariant && (
          <path d={paths[variant]} fill={fill} />
        )}
        {!isUpVariant && (
          <path d={paths[variant]} fill={fill} />
        )}
      </svg>
    </div>
  );
}
