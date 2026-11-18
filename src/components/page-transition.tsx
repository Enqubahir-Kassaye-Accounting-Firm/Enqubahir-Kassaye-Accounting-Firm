/**
 * Page transition
 * Keyed by the path, so each new page remounts and fades in
 * (animate-page-enter in globals.css). Not on the first load: the first paint
 * stays instant, and the server always renders without the class, so
 * hydration matches.
 *
 * Used from the root layout instead of src/app/template.tsx: Next.js 16 dev
 * logs a false "unique key" warning (OuterLayoutRouter) whenever a
 * template.tsx exists.
 */

'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Browser only: set after the first page has mounted
let hasNavigated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <PageEnter key={pathname}>{children}</PageEnter>;
}

function PageEnter({ children }: { children: ReactNode }) {
  const animate = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? 'animate-page-enter' : undefined}>{children}</div>;
}
