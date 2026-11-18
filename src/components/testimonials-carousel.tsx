/**
 * Testimonials Carousel
 * One large featured quote (pulled headline, name, role and company on the
 * left, the quote on the right), a counter with pause, previous and next
 * buttons, and a selector card for every testimonial. The active card's
 * progress bar fills over INTERVAL_SECONDS and then moves to the next one.
 * Colors, cards, fonts and radius all come from the theme tokens and `Card`.
 */

'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Card } from '@/components/card';
import { UI_TEXT } from '@/data/ui';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types/content';

/** Seconds each testimonial stays on screen */
const INTERVAL_SECONDS = 7;

const pad = (value: number) => String(value).padStart(2, '0');

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const count = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  // The progress bar only starts once the carousel is on screen and the page is
  // interactive (otherwise it could finish before anyone sees it), and it pauses
  // while the carousel is scrolled out of view.
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  const multiple = count > 1;
  const halted = paused || hovering || focused || !visible;
  const go = (index: number) => setActive(((index % count) + count) % count);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Keep the active selector card in view inside the strip (phones and tablets
  // scroll it sideways). Only the strip scrolls, never the page.
  useEffect(() => {
    const element = strip.current;
    const card = element?.children.item(active) as HTMLElement | null;
    if (!element || !card) return;
    const left = card.offsetLeft - (element.clientWidth - card.clientWidth) / 2;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollTo({ left: Math.max(0, left), behavior: reduced ? 'auto' : 'smooth' });
  }, [active]);

  if (count === 0) return;

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={UI_TEXT.testimonials.carouselLabel}
      style={{ '--carousel-duration': `${INTERVAL_SECONDS}s` } as CSSProperties}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {/* Featured testimonial. Every slide shares one grid cell, so the box
          keeps the height of the longest quote and nothing jumps. */}
      <Card accent className="p-6 sm:p-8 md:p-12">
        <div className="grid pl-2" aria-live={halted ? 'polite' : 'off'}>
          {testimonials.map((testimonial, index) => (
            <Slide key={index} testimonial={testimonial} visible={index === active} />
          ))}
        </div>

        {/* Counter and controls */}
        <div className="border-border-default mt-8 flex items-center justify-between gap-4 border-t pt-6 pl-2">
          <p className="text-text-muted font-mono text-sm tabular-nums">
            <span className="sr-only">
              {UI_TEXT.testimonials.counterLabel} {active + 1} {UI_TEXT.testimonials.of} {count}
            </span>
            <span aria-hidden="true">
              <span className="text-text-heading text-lg font-semibold">{pad(active + 1)}</span>
              {' / '}
              {pad(count)}
            </span>
          </p>

          {multiple && (
            <div className="flex items-center gap-2 sm:gap-3">
              <ControlButton
                label={paused ? UI_TEXT.testimonials.play : UI_TEXT.testimonials.pause}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </ControlButton>
              <ControlButton label={UI_TEXT.testimonials.previous} onClick={() => go(active - 1)}>
                <ChevronLeft className="h-5 w-5" />
              </ControlButton>
              <ControlButton label={UI_TEXT.testimonials.next} onClick={() => go(active + 1)}>
                <ChevronRight className="h-5 w-5" />
              </ControlButton>
            </div>
          )}
        </div>
      </Card>

      {/* Selector cards: a sideways strip on phones and tablets, a grid from lg */}
      <div
        ref={strip}
        className="relative -mx-1 mt-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-1 pt-1 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 lg:pt-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === active;
          return (
            <Card
              key={index}
              interactive
              highlighted={isActive}
              className="w-[72%] shrink-0 snap-center sm:w-[45%] md:w-[31%] lg:w-auto"
            >
              <button
                type="button"
                onClick={() => go(index)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${UI_TEXT.testimonials.selectorLabel} ${testimonial.clientName}`}
                className="flex w-full min-w-0 items-center gap-3 p-4 pb-5 text-left"
              >
                <Avatar name={testimonial.clientName} className="h-10 w-10 shrink-0" />
                <span className="min-w-0">
                  <span className="text-text-heading block truncate text-sm font-semibold">
                    {testimonial.clientName}
                  </span>
                  <span className="text-text-muted block truncate text-xs">
                    {testimonial.company}
                  </span>
                </span>
              </button>

              {/* Progress bar: fills on the active card, then moves on */}
              <span
                aria-hidden="true"
                className="bg-border-default absolute inset-x-0 bottom-0 block h-1"
              >
                {isActive && (
                  <span
                    key={active}
                    className={cn(
                      'bg-brand-accent block h-full w-full',
                      multiple && started ? 'animate-progress-fill' : multiple && 'scale-x-0'
                    )}
                    style={{ animationPlayState: halted ? 'paused' : 'running' }}
                    onAnimationEnd={() => go(active + 1)}
                  />
                )}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Slide({ testimonial, visible }: { testimonial: Testimonial; visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'col-start-1 row-start-1 grid grid-cols-1 gap-8 transition-[opacity,visibility] duration-500 motion-reduce:transition-none lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12',
        visible ? 'opacity-100' : 'pointer-events-none invisible opacity-0'
      )}
    >
      {/* Left: pulled headline and who said it */}
      <div className="flex min-w-0 flex-col justify-between gap-8">
        <div>
          <div aria-hidden="true" className="text-brand-accent/30 text-6xl leading-none font-bold">
            &ldquo;
          </div>
          {testimonial.headline && (
            <h3 className="text-text-heading mt-2 text-2xl font-bold text-balance wrap-break-word md:text-3xl">
              {testimonial.headline}
            </h3>
          )}
        </div>
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={testimonial.clientName} className="h-14 w-14 shrink-0 text-lg" />
          <div className="min-w-0">
            <p className="text-text-heading font-semibold wrap-break-word">
              {testimonial.clientName}
            </p>
            {testimonial.role && (
              <p className="text-text-muted text-sm wrap-break-word">{testimonial.role}</p>
            )}
            <p className="text-brand-accent-text text-sm font-semibold wrap-break-word">
              {testimonial.company}
            </p>
          </div>
        </div>
      </div>

      {/* Right: the quote */}
      <blockquote className="text-text-body min-w-0 self-center text-lg leading-relaxed wrap-break-word md:text-xl lg:text-2xl">
        {testimonial.quote}
      </blockquote>
    </div>
  );
}

function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'from-brand-primary to-brand-primary-light text-on-primary flex items-center justify-center rounded-full bg-gradient-to-br font-semibold',
        className
      )}
    >
      {(name || 'A').charAt(0)}
    </span>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-border-default text-text-heading hover:border-brand-accent/60 hover:text-brand-accent-text flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
    >
      {children}
    </button>
  );
}
