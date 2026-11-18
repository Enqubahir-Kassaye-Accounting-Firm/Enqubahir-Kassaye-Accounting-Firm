/**
 * Testimonials Section
 * Display client testimonials with elegant styling and animations
 */

import { Container } from '@/components/container';
import { StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { Card } from '@/components/card';
import { SectionHeading } from '@/components/section-heading';
import { cn } from '@/lib/utils';
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

        {/* Testimonials Grid */}
        <StaggerContainer
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card interactive className="p-8">
      {/* Quote Icon */}
      <div className="text-brand-accent/20 mb-4 text-4xl">&ldquo;</div>

      {/* Content */}
      <p className={cn('mb-6 text-[15px] leading-relaxed break-words', 'text-text-body')}>
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="from-brand-primary to-brand-primary-light relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br">
          <div className="text-on-primary flex h-full w-full items-center justify-center font-semibold">
            {(testimonial.clientName || 'A').charAt(0)}
          </div>
        </div>
        <div>
          <div className="text-text-heading font-semibold">{testimonial.clientName}</div>
          <div className="text-text-muted text-sm">{testimonial.company}</div>
        </div>
      </div>

      {/* Subtle accent */}
      <div className="via-brand-accent/30 absolute top-0 right-8 left-8 h-[2px] bg-gradient-to-r from-transparent to-transparent" />
    </Card>
  );
}
