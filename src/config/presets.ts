/**
 * Style Presets — the look of the site in one choice.
 * Pick a preset with `brand.preset` in src/config/site.ts; any value set under
 * `brand.colors`, `brand.surfaces`, `brand.fonts` or `brand.shape` there
 * overrides the preset.
 *
 * Keep this file free of imports: scripts/check-contrast.mjs loads it directly.
 */

/** Fonts the template can load (see src/config/fonts.ts). Any can be body or heading. */
export const SUPPORTED_FONTS = [
  'Inter',
  'DM Sans',
  'Manrope',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Montserrat',
  'Poppins',
  'Playfair Display',
  'Fraunces',
  'Lora',
] as const;

export type FontName = (typeof SUPPORTED_FONTS)[number];

export interface BrandColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
  accentDark: string;
  /** Text and icons placed on the accent color (buttons). */
  onAccent: string;
  /**
   * Text and icons placed on the primary color (hero, navbar, page headers,
   * CTA, footer). White for a dark primary; set a dark color for a light one.
   */
  onPrimary: string;
}

/**
 * Page, card and text colors for one theme (light or dark). Cards sit on the
 * page and on the alternate section background, so both must differ from the
 * card (checked by `npm run check:contrast`).
 */
export interface SurfaceColors {
  /** Page background */
  page: string;
  /** Alternate section background */
  section: string;
  /** Card background (service, project, testimonial, About, detail, form) */
  card: string;
  /** Card border and dividers */
  border: string;
  heading: string;
  body: string;
  /** Secondary text: subtitles, labels, captions */
  muted: string;
}

/** Light headings default to the brand primary color, so presets leave them out. */
export interface PresetSurfaces {
  light: Omit<SurfaceColors, 'heading'>;
  dark: SurfaceColors;
}

export interface ThemeSurfaces {
  light: SurfaceColors;
  dark: SurfaceColors;
}

export interface BrandFonts {
  body: FontName;
  heading: FontName;
}

export interface BrandShape {
  /** Base corner radius for cards, inputs and rounded buttons, e.g. '0.5rem'. '0' = square. */
  radius: string;
  /** 'rounded' uses `radius`; 'pill' is fully round; 'square' has no rounding. */
  button: 'rounded' | 'pill' | 'square';
  buttonSize: 'sm' | 'md' | 'lg';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
}

export interface StylePreset {
  colors: BrandColors;
  surfaces: PresetSurfaces;
  fonts: BrandFonts;
  shape: BrandShape;
}

/** A preset after site.ts overrides are applied. */
export interface ResolvedBrand {
  colors: BrandColors;
  surfaces: ThemeSurfaces;
  fonts: BrandFonts;
  shape: BrandShape;
}

/**
 * Owner decision (2026-10-31): one white and one black across the whole site,
 * the same for every preset; the brand color lives in the hero, page headers,
 * CTA and footer. section = page, so alternate sections look the same unless a
 * client's brand guideline sets brand.surfaces.*.section.
 */
const NEUTRAL_SURFACES: PresetSurfaces = {
  light: {
    page: '#ffffff',
    section: '#ffffff',
    card: '#f7f7f7',
    border: '#e5e5e5',
    body: '#404040',
    muted: '#5f5f5f',
  },
  dark: {
    page: '#0a0a0a',
    section: '#0a0a0a',
    card: '#171717',
    border: '#262626',
    heading: '#ffffff',
    body: '#d4d4d4',
    muted: '#a3a3a3',
  },
};

export const STYLE_PRESETS = {
  corporate: {
    colors: {
      primary: '#0f2a44',
      primaryDark: '#0c2237',
      primaryLight: '#1a3a5c',
      accent: '#c9a227',
      accentDark: '#a18220',
      onAccent: '#121212',
      onPrimary: '#ffffff',
    },
    surfaces: NEUTRAL_SURFACES,
    fonts: { body: 'Inter', heading: 'Space Grotesk' },
    shape: { radius: '0.5rem', button: 'rounded', buttonSize: 'md', sectionSpacing: 'normal' },
  },
  warm: {
    colors: {
      primary: '#3b2418',
      primaryDark: '#2c1a11',
      primaryLight: '#523426',
      accent: '#e07a3f',
      accentDark: '#c0612a',
      onAccent: '#1a0f0a',
      onPrimary: '#ffffff',
    },
    surfaces: NEUTRAL_SURFACES,
    fonts: { body: 'DM Sans', heading: 'Fraunces' },
    shape: { radius: '0.75rem', button: 'pill', buttonSize: 'md', sectionSpacing: 'spacious' },
  },
  bold: {
    colors: {
      primary: '#111111',
      primaryDark: '#000000',
      primaryLight: '#262626',
      accent: '#e11d48',
      accentDark: '#be123c',
      onAccent: '#ffffff',
      onPrimary: '#ffffff',
    },
    surfaces: NEUTRAL_SURFACES,
    fonts: { body: 'Plus Jakarta Sans', heading: 'Montserrat' },
    shape: { radius: '0.25rem', button: 'rounded', buttonSize: 'lg', sectionSpacing: 'normal' },
  },
  minimal: {
    colors: {
      primary: '#1f2933',
      primaryDark: '#151c23',
      primaryLight: '#323f4b',
      accent: '#2bb3a3',
      accentDark: '#1f8f82',
      onAccent: '#0b1215',
      onPrimary: '#ffffff',
    },
    surfaces: NEUTRAL_SURFACES,
    fonts: { body: 'Manrope', heading: 'Manrope' },
    shape: { radius: '0', button: 'square', buttonSize: 'sm', sectionSpacing: 'compact' },
  },
} satisfies Record<string, StylePreset>;

export type StylePresetName = keyof typeof STYLE_PRESETS;

export interface BrandSettings {
  preset: StylePresetName;
  colors: Partial<BrandColors>;
  /** Optional, so a v1.0 site.ts still fits */
  surfaces?: { light?: Partial<SurfaceColors>; dark?: Partial<SurfaceColors> };
  fonts: Partial<BrandFonts>;
  shape: Partial<BrandShape>;
}

export function resolveBrand(brand: BrandSettings): ResolvedBrand {
  const preset: StylePreset = STYLE_PRESETS[brand.preset];
  const colors = { ...preset.colors, ...brand.colors };
  const light = { ...preset.surfaces.light, ...brand.surfaces?.light };
  // Light headings use the primary color when it is readable on the page and
  // on cards; a light primary (yellow, pastel) falls back to onPrimary.
  const primaryReadable = [light.page, light.card].every(
    (background) => contrast(hexToRgb(colors.primary), hexToRgb(background)) >= 4.5
  );
  return {
    colors,
    surfaces: {
      light: { heading: primaryReadable ? colors.primary : colors.onPrimary, ...light },
      dark: { ...preset.surfaces.dark, ...brand.surfaces?.dark },
    },
    fonts: { ...preset.fonts, ...brand.fonts },
    shape: { ...preset.shape, ...brand.shape },
  };
}

const BUTTON_SIZES = {
  sm: { x: '1.5rem', y: '0.75rem', text: '0.875rem' },
  md: { x: '2rem', y: '1rem', text: '1rem' },
  lg: { x: '2.5rem', y: '1.25rem', text: '1.125rem' },
} as const;

const SECTION_SCALE = { compact: 0.75, normal: 1, spacious: 1.25 } as const;

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb;
}

function contrast(a: Rgb, b: Rgb): number {
  const luminance = (rgb: Rgb) => {
    const [r, g, b] = rgb.map((c) => {
      const channel = c / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Accent for text on light surfaces: the accent darkened until it reaches 4.5:1
 * on white and on the light accent tint used by badges. Dark mode and
 * brand-primary sections use the accent itself (see globals.css).
 */
function accentTextColor(accent: string): string {
  const base = hexToRgb(accent);
  const tint = base.map((c) => Math.round(255 * 0.85 + c * 0.15)) as Rgb;
  let color = base;
  for (let darken = 0; darken <= 1 && contrast(color, tint) < 4.5; darken += 0.02) {
    color = base.map((c) => Math.round(c * (1 - darken))) as Rgb;
  }
  return `#${color.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** Surface and text variables for one theme; layout.tsx sets light on :root, dark on html.dark. */
export function surfaceCssVariables(surfaces: SurfaceColors): string {
  return [
    `--surface-page: ${surfaces.page};`,
    `--surface-section: ${surfaces.section};`,
    `--surface-card: ${surfaces.card};`,
    `--surface-border: ${surfaces.border};`,
    `--text-heading: ${surfaces.heading};`,
    `--text-body: ${surfaces.body};`,
    `--text-muted: ${surfaces.muted};`,
  ].join('\n');
}

/** CSS custom properties consumed by src/app/globals.css (fonts are set in layout.tsx). */
export function brandCssVariables({ colors, shape }: ResolvedBrand): string {
  const buttonRadius =
    shape.button === 'pill' ? '9999px' : shape.button === 'square' ? '0' : shape.radius;
  const size = BUTTON_SIZES[shape.buttonSize];

  return [
    `--brand-primary: ${colors.primary};`,
    `--brand-primary-dark: ${colors.primaryDark};`,
    `--brand-primary-light: ${colors.primaryLight};`,
    `--brand-accent: ${colors.accent};`,
    `--brand-accent-dark: ${colors.accentDark};`,
    `--brand-accent-text: ${accentTextColor(colors.accent)};`,
    `--brand-on-accent: ${colors.onAccent};`,
    `--brand-on-primary: ${colors.onPrimary};`,
    `--brand-radius: ${shape.radius};`,
    `--btn-radius: ${buttonRadius};`,
    `--btn-px: ${size.x};`,
    `--btn-py: ${size.y};`,
    `--btn-text: ${size.text};`,
    `--section-scale: ${SECTION_SCALE[shape.sectionSpacing]};`,
  ].join('\n');
}
