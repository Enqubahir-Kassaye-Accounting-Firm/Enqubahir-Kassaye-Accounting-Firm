/**
 * ScrollReveal / StaggerContainer / StaggerItem
 * Fade-up reveals as elements enter the viewport. Pure markup: the animation is
 * CSS in globals.css ("Scroll reveal") and the trigger is <RevealObserver>.
 */

import type { CSSProperties, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the reveal starts */
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <div
      data-reveal
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between consecutive items */
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <div
      data-stagger
      className={className}
      style={{ '--stagger': `${staggerDelay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
