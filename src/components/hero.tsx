/**
 * Premium Hero Section
 * Three layouts from site.ts → hero.layout:
 *   'gradient' — animated gradient on the primary color, no photo
 *   'image'    — full-width photo under a primary-color overlay, text centred
 *   'split'    — text on the primary color, photo on the right fading into it
 *                (under the text on phones)
 * 'image' and 'split' fall back to 'gradient' while hero.image.url is empty.
 * `settings` defaults to site.ts → hero; a preview page can pass its own.
 */

import type { CSSProperties } from 'react';
import { preload } from 'react-dom';
import { AnimatedGradientBackground } from '@/components/animated-gradient-background';
import { PremiumButton } from '@/components/premium-button';
import { Container } from '@/components/container';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { primaryAction } from '@/lib/conversion';
import type { HomePage } from '@/types/content';

interface HeroProps {
  homePage: HomePage;
}

/** Entrance sequence: each element fades up slightly after the previous one */
function fadeDelay(step: number): CSSProperties {
  return { '--fade-delay': `${0.1 + step * 0.15}s` } as CSSProperties;
}

/** Short screens (laptops) get a smaller title and tighter spacing */
const SHORT_SCREEN_TITLE = '[@media(min-width:768px)_and_(max-height:850px)]:text-[6rem]';

/** site.ts → hero */
export type HeroSettings = typeof siteConfig.hero;

interface PhotoHeroProps extends HeroProps {
  settings: HeroSettings;
}

export function Hero({
  homePage,
  settings = siteConfig.hero,
}: HeroProps & { settings?: HeroSettings }) {
  const layout = settings.image.url ? settings.layout : 'gradient';

  if (layout === 'image') return <ImageHero homePage={homePage} settings={settings} />;
  if (layout === 'split') return <SplitHero homePage={homePage} settings={settings} />;
  return <GradientHero homePage={homePage} />;
}

function GradientHero({ homePage }: HeroProps) {
  return (
    <section className="bg-brand-primary relative min-h-screen">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground />

      {/* Content */}
      <Container className="relative z-10">
        <div className="flex min-h-[100svh] flex-col pt-16 md:pt-12 lg:pt-16 [@media(min-width:768px)_and_(max-height:850px)]:h-auto [@media(min-width:768px)_and_(max-height:850px)]:min-h-0">
          <div className="mt-3 flex flex-1 items-start md:mt-0 md:items-center">
            <div className="grid w-full grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-5">
              <HeroText homePage={homePage} className="lg:pt-1" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ImageHero({ homePage, settings }: PhotoHeroProps) {
  return (
    <section className="bg-brand-primary relative overflow-hidden">
      <HeroImage settings={settings} sizes="100vw" />
      {/* Overlay: the primary color at hero.overlay over the whole photo (the
          strength check:contrast checks), a little deeper at the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundColor: `color-mix(in srgb, var(--brand-primary) ${Math.round(settings.overlay * 100)}%, transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="from-brand-primary/60 absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent"
      />

      <Container className="relative z-10">
        <div className="flex min-h-[100svh] items-center justify-center pt-24 pb-20 md:pt-28 md:pb-24">
          <HeroText homePage={homePage} centered onPhoto className="max-w-5xl" />
        </div>
      </Container>

      <HeroCaption
        caption={settings.caption}
        className="absolute right-4 bottom-4 z-10 md:right-6 md:bottom-6"
      />
    </section>
  );
}

/**
 * Primary color fading out along an ease-out curve. A straight two-stop
 * gradient leaves a visible band where it ends; these stops do not.
 */
const FADE_STOPS: Array<[number, number]> = [
  [100, 0],
  [97, 10],
  [89, 20],
  [76, 30],
  [59, 41],
  [41, 53],
  [25, 65],
  [12, 77],
  [4, 89],
  [0, 100],
];
function easedFade(direction: string): string {
  const stops = FADE_STOPS.map(
    ([alpha, at]) => `color-mix(in srgb, var(--brand-primary) ${alpha}%, transparent) ${at}%`
  );
  return `linear-gradient(${direction}, ${stops.join(', ')})`;
}

function SplitHero({ homePage, settings }: PhotoHeroProps) {
  return (
    <section className="bg-brand-primary relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center pt-24 pb-10 md:pt-28 md:pb-14 lg:min-h-[100svh] lg:grid-cols-2 lg:gap-12 lg:py-24">
          <HeroText homePage={homePage} />
        </div>
      </Container>

      {/* Photo: under the text on phones and tablets; from lg the right side,
          wider as the screen grows (the text column stays clear of it) */}
      <div className="relative h-80 sm:h-[26rem] md:h-[30rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2 xl:w-[56%] 2xl:w-[60%]">
        <HeroImage
          settings={settings}
          sizes="(min-width: 1536px) 60vw, (min-width: 1280px) 56vw, (min-width: 1024px) 50vw, 100vw"
        />
        {/* Fade into the primary color (eased, so there is no visible edge):
            from the top on phones and tablets, from the left from lg */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-2/5 lg:hidden"
          style={{ backgroundImage: easedFade('to bottom') }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-3/5 lg:block"
          style={{ backgroundImage: easedFade('to right') }}
        />
        {/* From lg the navbar links sit on the photo: keep them on the primary color */}
        <div
          aria-hidden="true"
          className="from-brand-primary/85 absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-45% to-transparent lg:block"
        />
        <HeroCaption
          caption={settings.caption}
          className="absolute right-4 bottom-4 md:right-6 md:bottom-6"
        />
      </div>
    </section>
  );
}

/** Title, subtitle and buttons; centred, or centred on phones and left from lg */
function HeroText({
  homePage,
  centered = false,
  onPhoto = false,
  className,
}: HeroProps & { centered?: boolean; onPhoto?: boolean; className?: string }) {
  // Main button: site.ts → conversion.primary, with the hero's own label when
  // set. Second button: always the hero's own link (e.g. Our Services).
  const primaryLabel = homePage.heroPrimaryButtonText || primaryAction.label;
  const secondary = {
    href: homePage.heroSecondaryButtonUrl,
    label: homePage.heroSecondaryButtonText,
    external: false,
  };

  return (
    <div
      className={cn(
        'flex min-w-0 flex-col items-center pt-0 text-center [@media(min-width:768px)_and_(max-height:850px)]:pb-3',
        !centered && 'lg:items-start lg:text-left',
        className
      )}
    >
      {/* Title - 1 to 3 lines: editable via heroTitleLines */}
      <h1 className="w-full">
        {homePage.heroTitleLines.map((line, index) => (
          <span
            key={index}
            className={cn(
              'animate-fade-up text-on-primary block text-[clamp(2.75rem,13vw,4rem)] leading-[1.01] font-bold tracking-tight text-balance wrap-break-word hyphens-auto sm:text-[4.5rem] sm:leading-[1.05] md:text-[5.5rem] lg:text-[5.75rem] xl:text-[6.25rem] 2xl:text-[6.75rem]',
              SHORT_SCREEN_TITLE,
              index > 0 && 'mt-1.5'
            )}
            style={
              {
                ...fadeDelay(index),
                '--fade-distance': '40px',
                '--fade-from': 1,
              } as CSSProperties
            }
          >
            {line}
          </span>
        ))}
      </h1>

      {/* Subtitle - stepped back to let title dominate; full onPrimary on a
          photo, where the overlay is checked for that color */}
      <p
        style={fadeDelay(homePage.heroTitleLines.length)}
        className={cn(
          'animate-fade-up mt-2 max-w-xl text-sm leading-relaxed sm:mt-3 sm:text-base md:text-lg lg:text-xl',
          onPhoto ? 'text-on-primary' : 'text-text-inverse/65',
          centered && 'mx-auto'
        )}
      >
        {homePage.heroSubtitle}
      </p>

      {/* CTA Buttons */}
      <div
        style={fadeDelay(homePage.heroTitleLines.length + 1)}
        className={cn(
          'animate-fade-up mt-4 flex w-full flex-col gap-3 sm:mt-5 sm:w-auto sm:flex-row sm:items-center md:mt-7 lg:mt-6 [@media(min-width:768px)_and_(max-height:850px)]:mt-4',
          centered && 'sm:justify-center'
        )}
      >
        <PremiumButton
          href={primaryAction.href}
          external={primaryAction.external}
          variant="primary"
          className="min-w-[160px] text-sm md:px-8 md:py-4 md:text-base"
        >
          {primaryLabel}
        </PremiumButton>

        {secondary.href && (
          <PremiumButton
            href={secondary.href}
            external={secondary.external}
            variant="secondary"
            className="min-w-[160px] text-sm md:px-8 md:py-4 md:text-base"
          >
            {secondary.label}
          </PremiumButton>
        )}
      </div>
    </div>
  );
}

/**
 * The hero photo, loaded first: it is the page's main content. Static hosts
 * have no image optimizer, so a local .webp also offers the 960 px copy that
 * `npm run images:optimize` writes (`<name>-960.webp`) to phones and tablets.
 */
function HeroImage({ settings, sizes }: { settings: HeroSettings; sizes: string }) {
  const { url, alt } = settings.image;
  const smallUrl = /^\/.+\.webp$/.test(url) ? url.replace(/\.webp$/, '-960.webp') : '';
  const srcSet = smallUrl ? `${smallUrl} 960w, ${url} 1920w` : undefined;

  preload(url, {
    as: 'image',
    fetchPriority: 'high',
    imageSrcSet: srcSet,
    imageSizes: srcSet && sizes,
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image adds no srcset on a static export; this one is hand-made
    <img
      src={url}
      srcSet={srcSet}
      sizes={srcSet && sizes}
      alt={alt}
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: settings.imagePosition }}
    />
  );
}

function HeroCaption({ caption, className }: { caption: string; className?: string }) {
  if (!caption) return;

  return (
    <p
      className={cn(
        'bg-brand-primary/90 text-on-primary rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm md:text-sm',
        className
      )}
    >
      {caption}
    </p>
  );
}
