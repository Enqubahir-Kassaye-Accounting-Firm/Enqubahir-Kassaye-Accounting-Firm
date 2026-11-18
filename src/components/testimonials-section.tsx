/**
 * Testimonials Section
 * Heading and the testimonials carousel (see testimonials-carousel.tsx).
 */

import { Container } from '@/components/container';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionHeading } from '@/components/section-heading';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import type { Testimonial } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface TestimonialsSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({ title, subtitle, testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    // eslint-disable-next-line unicorn/no-null -- React components should return null for no-render
    return null;
  }

  return (
    <section id="testimonials" className="section-y bg-surface-section">
      <Container>
        <SectionHeading
          reveal
          eyebrow={UI_TEXT.eyebrows.testimonials}
          title={title}
          text={subtitle}
          className="mb-12 md:mb-16"
        />

        <ScrollReveal>
          <TestimonialsCarousel testimonials={testimonials} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
