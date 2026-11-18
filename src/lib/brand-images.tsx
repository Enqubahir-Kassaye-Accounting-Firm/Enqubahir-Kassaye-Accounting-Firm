/**
 * Favicon, Apple icon and default share image, drawn at build time from the
 * logo (site.logo, PNG / JPG / SVG under public/) and the brand colors. With no
 * logo: the icon shows the name's first letter, the share image the name alone.
 * Used by src/app/icon.tsx, src/app/apple-icon.tsx and the /og-default.png route.
 */

import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { resolveBrand } from '@/config/presets';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const colors = resolveBrand(siteConfig.brand).colors;

async function logoDataUrl(): Promise<string | undefined> {
  if (!siteConfig.logo) return undefined;
  const file = await readFile(join(process.cwd(), 'public', siteConfig.logo));
  const type = MIME_TYPES[extname(siteConfig.logo).toLowerCase()] ?? 'image/png';
  return `data:${type};base64,${file.toString('base64')}`;
}

/** The default image font has no Amharic letters, so an Amharic name needs this one. */
async function imageOptions() {
  if (!/\p{Script=Ethiopic}/u.test(`${siteConfig.name} ${siteConfig.tagline}`)) return {};
  const data = await readFile(join(process.cwd(), 'src/lib/fonts/NotoSansEthiopic-Bold.ttf'));
  return {
    fonts: [{ name: 'Noto Sans Ethiopic', data, weight: 700 as const, style: 'normal' as const }],
  };
}

/** Square icon: the logo centered on the primary color. */
export async function iconResponse(size: number, radius: number): Promise<ImageResponse> {
  const logo = await logoDataUrl();
  const options = await imageOptions();
  const logoSize = Math.round(size * 0.72);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.primary,
        borderRadius: radius,
      }}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not HTML
        <img
          src={logo}
          width={logoSize}
          height={logoSize}
          alt=""
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            fontSize: Math.round(size * 0.6),
            fontWeight: 700,
            color: colors.onPrimary,
          }}
        >
          {Array.from(siteConfig.name.trim())[0] ?? ''}
        </div>
      )}
    </div>,
    { width: size, height: size, ...options }
  );
}

/** 1200×630 share image: logo, name, tagline and an accent bar on the primary color. */
export async function ogImageResponse(): Promise<ImageResponse> {
  const logo = await logoDataUrl();
  const options = await imageOptions();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
        background: colors.primary,
        color: '#ffffff',
      }}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not HTML
        <img src={logo} width={120} height={120} alt="" style={{ objectFit: 'contain' }} />
      )}
      <div
        style={{ display: 'flex', marginTop: 48, fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}
      >
        {siteConfig.name}
      </div>
      {siteConfig.tagline && (
        <div style={{ display: 'flex', marginTop: 24, fontSize: 36, opacity: 0.8 }}>
          {siteConfig.tagline}
        </div>
      )}
      <div
        style={{ display: 'flex', marginTop: 48, width: 120, height: 8, background: colors.accent }}
      />
    </div>,
    { width: 1200, height: 630, ...options }
  );
}
