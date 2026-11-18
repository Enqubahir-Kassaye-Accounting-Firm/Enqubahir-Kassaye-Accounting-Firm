/**
 * Reveal Observer
 * Adds .is-revealed to [data-reveal] elements once they scroll into view.
 * Mounted once in layout.tsx; rescans after each client-side navigation.
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        }
      },
      // Start as soon as an element is just inside the screen, so content is
      // never blank while scrolling at a normal speed
      { rootMargin: '0px 0px -5% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return undefined;
}
