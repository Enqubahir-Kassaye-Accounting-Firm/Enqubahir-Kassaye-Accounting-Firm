/**
 * Conversion Tracker
 * One click listener that sends call_click, booking_click and chat_click to
 * Google Analytics for any matching link on the page (see src/lib/conversion.ts).
 * Mounted in layout.tsx only when NEXT_PUBLIC_GA_ID is set.
 */

'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { conversionEvent } from '@/lib/conversion';

export function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const href = event.target.closest('a')?.getAttribute('href');
      const name = href ? conversionEvent(href) : undefined;
      if (name) trackEvent(name);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // eslint-disable-next-line unicorn/no-null -- React components should return null for no-render
  return null;
}
