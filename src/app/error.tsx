'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { UI_TEXT } from '@/data/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="bg-brand-primary flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Error Code */}
        <div className="relative mb-8">
          <h1
            className={cn(
              'text-[100px] leading-none font-bold tracking-tighter',
              'text-red-400',
              'md:text-[150px]'
            )}
          >
            500
          </h1>
          <div className="absolute inset-0 opacity-20 blur-3xl">
            <span className="text-[100px] leading-none font-bold tracking-tighter text-red-400 md:text-[150px]">
              500
            </span>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-on-primary mb-4 text-2xl font-semibold md:text-3xl">
          {UI_TEXT.error.title}
        </h2>
        <p className="text-text-inverse/70 mx-auto mb-8 max-w-md text-lg">
          {UI_TEXT.error.description}
        </p>

        {/* Error ID for support */}
        {error.digest && (
          <p className="text-text-inverse/40 mb-8 font-mono text-sm">
            {UI_TEXT.error.errorIdLabel} {error.digest}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className={cn(
              'group rounded-button px-btn-x py-btn-y text-btn relative font-semibold',
              'bg-brand-accent text-text-on-accent',
              'transition-all duration-300',
              'hover:scale-105 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--brand-accent)_40%,transparent)]'
            )}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5 transition-transform group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {UI_TEXT.error.retryButton}
            </span>
          </button>

          <button
            onClick={() => router.push('/')}
            className={cn(
              'rounded-button px-btn-x py-btn-y text-btn font-semibold',
              'border-brand-accent/50 text-brand-accent-text border-2',
              'transition-all duration-300',
              'hover:border-brand-accent hover:bg-brand-accent/10'
            )}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {UI_TEXT.error.homeButton}
            </span>
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="text-text-inverse/50 flex items-center gap-2 text-sm">
            <div className="to-text-inverse/30 h-px w-16 bg-gradient-to-r from-transparent" />
            <span>{siteConfig.name}</span>
            <div className="to-text-inverse/30 h-px w-16 bg-gradient-to-l from-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
