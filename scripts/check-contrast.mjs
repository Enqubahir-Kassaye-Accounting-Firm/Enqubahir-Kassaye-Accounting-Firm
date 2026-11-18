#!/usr/bin/env node
/**
 * Brand contrast check (WCAG 2.x ratios).
 * Checks every style preset and the active brand from src/config/site.ts:
 *   - button text (onAccent) on accent        ≥ 4.5 (normal text)
 *   - text (onPrimary) on primary, also on
 *     primaryDark and primaryLight            ≥ 4.5 (hero, navbar, headers, footer)
 *   - accent on primary (headings, hover)     ≥ 3   (large text / UI)
 *   - accent on the dark page background      ≥ 3   (accent text in dark mode)
 *   - onPrimary on the hero photo overlay     ≥ 4.5 (hero.overlay and the caption,
 *     over a white and a black pixel; site.ts only with a photo hero)
 * and, for the light and the dark surfaces (site.ts: only the theme(s) its
 * `theme` setting shows):
 *   - card on page and on section background  ≥ 1.05 (the card must stand out)
 *   - heading, body and muted text on card,
 *     page and section background             ≥ 4.5
 * Usage: npm run check:contrast   — exits 1 if any pair fails.
 * Needs Node ≥ 22.18 (loads the .ts config files directly).
 */

import { STYLE_PRESETS, resolveBrand } from '../src/config/presets.ts';
import { siteConfig } from '../src/config/site.ts';

const BRAND_RULES = [
  { fg: 'onAccent', bg: 'accent', min: 4.5 },
  { fg: 'onPrimary', bg: 'primary', min: 4.5 },
  { fg: 'onPrimary', bg: 'primaryDark', min: 4.5 },
  { fg: 'onPrimary', bg: 'primaryLight', min: 4.5 },
  { fg: 'accent', bg: 'primary', min: 3 },
];

/**
 * Text on a hero photo ('image' layout, and the caption in 'image' / 'split'):
 * the primary color at `alpha` over the photo, checked over a white and a
 * black pixel — the two worst cases for any photo (CSS blends in sRGB).
 */
const CAPTION_ALPHA = 0.9; // bg-brand-primary/90 in hero.tsx
function overPhoto(primary, alpha, pixel) {
  const channels = [0, 2, 4].map((i) => {
    const value = parseInt(primary.replace('#', '').slice(i, i + 2), 16);
    return Math.round(alpha * value + (1 - alpha) * pixel)
      .toString(16)
      .padStart(2, '0');
  });
  return `#${channels.join('')}`;
}
function heroPhotoColors(colors, alpha) {
  const primary = /^#[0-9a-f]{3}$/i.test(colors.primary)
    ? `#${[...colors.primary.slice(1)].map((c) => c + c).join('')}`
    : colors.primary;
  return {
    onPrimary: colors.onPrimary,
    overlayOnWhite: overPhoto(primary, alpha, 255),
    overlayOnBlack: overPhoto(primary, alpha, 0),
  };
}
const HERO_PHOTO_RULES = [
  { fg: 'onPrimary', bg: 'overlayOnWhite', min: 4.5 },
  { fg: 'onPrimary', bg: 'overlayOnBlack', min: 4.5 },
];
const { hero } = siteConfig;
const photoHero = hero.layout !== 'gradient' && Boolean(hero.image.url);

/** Accent used as text on the dark page (dark mode) */
const DARK_ACCENT_RULES = [{ fg: 'accent', bg: 'page', min: 3 }];

const SURFACE_RULES = [
  { fg: 'card', bg: 'page', min: 1.05 },
  { fg: 'card', bg: 'section', min: 1.05 },
  ...['heading', 'body', 'muted'].flatMap((fg) =>
    ['card', 'page', 'section'].map((bg) => ({ fg, bg, min: 4.5 }))
  ),
];

function luminance(hex) {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(full.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const noOverrides = { colors: {}, surfaces: { light: {}, dark: {} }, fonts: {}, shape: {} };
// Presets are checked in both themes; site.ts only in the theme(s) it shows
const BOTH = { light: true, dark: true };
const themes = [
  ...Object.keys(STYLE_PRESETS).map((name) => [
    `preset ${name}`,
    resolveBrand({ ...noOverrides, preset: name }),
    BOTH,
  ]),
  [
    `site.ts (${siteConfig.brand.preset} + overrides)`,
    resolveBrand(siteConfig.brand),
    { light: siteConfig.theme !== 'dark', dark: siteConfig.theme !== 'light' },
  ],
];

let failures = 0;
function check(label, colors, rules) {
  for (const { fg, bg, min } of rules) {
    const value = ratio(colors[fg], colors[bg]);
    const ok = value >= min;
    if (!ok) failures++;
    console.log(
      `${ok ? 'ok  ' : 'FAIL'} ${label}: ${fg} ${colors[fg]} on ${bg} ${colors[bg]} = ${value.toFixed(2)} (min ${min})`
    );
  }
}

for (const [label, brand, shown] of themes) {
  check(label, brand.colors, BRAND_RULES);
  // Hero photo: presets always (with the site's overlay, so switching preset
  // keeps the hero readable); site.ts only when its hero shows a photo
  if (!label.startsWith('site.ts') || photoHero) {
    check(
      `${label} hero overlay ${hero.overlay}`,
      heroPhotoColors(brand.colors, hero.overlay),
      HERO_PHOTO_RULES
    );
    check(`${label} hero caption`, heroPhotoColors(brand.colors, CAPTION_ALPHA), HERO_PHOTO_RULES);
  }
  if (shown.light) check(`${label} light`, brand.surfaces.light, SURFACE_RULES);
  if (shown.dark) {
    check(`${label} dark`, brand.surfaces.dark, SURFACE_RULES);
    check(
      `${label} dark`,
      { accent: brand.colors.accent, page: brand.surfaces.dark.page },
      DARK_ACCENT_RULES
    );
  }
}

if (failures > 0) {
  console.error(`\n${failures} contrast pair(s) below the minimum.`);
  process.exit(1);
}
