/**
 * CTA Section
 * Impactful call-to-action with animated gradient background
 * Premium, architectural presentation
 */

import { Container } from '@/components/container';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PremiumButton } from '@/components/premium-button';
import { primaryAction, secondaryAction } from '@/lib/conversion';
import type { HomePage } from '@/types/content';

interface CTASectionProps {
  homePage: Pick<
    HomePage,
    'ctaTitle' | 'ctaSubtitle' | 'ctaSecondaryButtonText' | 'ctaSecondaryButtonUrl'
  >;
}

export function CTASection({ homePage }: CTASectionProps) {
  const resolvedTitle = homePage.ctaTitle;
  const resolvedSubtitle = homePage.ctaSubtitle;
  // Buttons follow site.ts → conversion; the page's own secondary link fills in
  // when there is no secondary action
  const secondary = secondaryAction ?? {
    label: homePage.ctaSecondaryButtonText,
    href: homePage.ctaSecondaryButtonUrl,
    external: false,
  };

  return (
    <section className="bg-brand-primary relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        {/* Subtle animated glow */}
        <div className="glow-accent animate-glow-pulse absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 opacity-40 sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--color-brand-accent) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--color-brand-accent) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gold Accent Lines */}
      <div className="via-brand-accent/50 absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent to-transparent" />
      <div className="via-brand-accent/50 absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent to-transparent" />

      <Container className="relative z-10">
        <div className="section-y text-center">
          <ScrollReveal>
            <h2 className="text-on-primary text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {resolvedTitle}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-text-inverse/80 mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl">
              {resolvedSubtitle}
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PremiumButton
                href={primaryAction.href}
                external={primaryAction.external}
                variant="primary"
              >
                {primaryAction.label}
              </PremiumButton>

              {secondary.href && (
                <PremiumButton
                  href={secondary.href}
                  external={secondary.external}
                  variant="secondary"
                >
                  {secondary.label}
                </PremiumButton>
              )}
            </div>
          </ScrollReveal>

          {/* Bottom decorative line */}
          <div className="via-brand-accent/50 absolute bottom-0 left-1/2 h-[1px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />
        </div>
      </Container>
    </section>
  );
}
