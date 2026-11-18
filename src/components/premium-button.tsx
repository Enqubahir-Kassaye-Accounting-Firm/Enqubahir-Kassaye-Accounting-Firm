/**
 * Premium Button Component
 * Architectural, precise button with subtle gold glow on hover
 * Inspired by Stripe's interaction design
 */

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PremiumButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  external?: boolean;
}

export function PremiumButton({
  href,
  children,
  variant = 'primary',
  className,
  external = false,
}: PremiumButtonProps) {
  const baseStyles = cn(
    'group relative inline-flex items-center justify-center',
    'overflow-hidden rounded-button px-btn-x py-btn-y',
    'text-btn font-semibold',
    'transition-all duration-300',
    variant === 'primary' && [
      'border border-transparent bg-brand-accent text-text-on-accent',
      'hover:border-brand-accent hover:bg-brand-primary hover:text-brand-accent-text',
      'hover:shadow-[0_0_30px_color-mix(in_srgb,var(--brand-accent)_30%,transparent)]',
      'hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100',
    ],
    variant === 'secondary' && [
      'border border-on-primary/30 bg-on-primary/5 text-on-primary',
      'hover:border-brand-accent/70 hover:text-brand-accent-text hover:bg-brand-accent/10',
      'hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100',
    ],
    className
  );

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div>
      <Link href={href} className={baseStyles} {...externalProps}>
        {/* Glow effect for primary */}
        {variant === 'primary' && (
          <span className="rounded-button absolute inset-0 bg-white/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        )}

        {/* Shine sweep animation */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* Content */}
        <span className="relative flex items-center gap-2">
          {children}
          {variant === 'primary' && (
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </Link>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
