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
import { HOME_PAGE } from '@/data/home';

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

/**
 * Square icon. The logo file has empty margin around the mark, so it is drawn
 * larger than the icon and cropped, on white, so the mark fills the tab icon.
 * With no logo: the first letter on the primary color.
 */
export async function iconResponse(size: number, radius: number): Promise<ImageResponse> {
  const logo = await logoDataUrl();
  const options = await imageOptions();
  const logoSize = Math.round(size * 1.22);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: logo ? '#ffffff' : colors.primary,
        borderRadius: radius,
        overflow: 'hidden',
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

/** Splits "Your books *before* the tax office" into words; starred words are accented. */
function headlineWords(lines: string[]): { text: string; accent: boolean }[] {
  const words: { text: string; accent: boolean }[] = [];
  for (const part of lines.join(' ').split(/(\*[^*]+\*)/)) {
    const accent = part.startsWith('*') && part.endsWith('*');
    for (const w of (accent ? part.slice(1, -1) : part).split(/\s+/)) {
      if (w) words.push({ text: w, accent });
    }
  }
  return words;
}

/**
 * 1200×630 share image (Telegram, WhatsApp, search results): logo and name,
 * the home headline with its accent word, and the hero card, on the primary
 * color. Everything comes from site.ts and src/data/home.ts; without a hero
 * card the headline takes the full width.
 */
export async function ogImageResponse(): Promise<ImageResponse> {
  const logo = await logoDataUrl();
  const options = await imageOptions();
  const home = HOME_PAGE;
  const card = home.heroCard;
  const headline = headlineWords(home.heroTitleLines);
  const nameMain = siteConfig.nameShort || siteConfig.name;
  const nameSub = siteConfig.nameShort ? siteConfig.nameSub : '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 45%, ${colors.primaryDark} 100%)`,
        color: '#ffffff',
        padding: '56px 72px 0 72px',
      }}
    >
      {/* Brand row */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {logo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 84,
              height: 84,
              borderRadius: 18,
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not HTML */}
            <img src={logo} width={104} height={104} alt="" style={{ objectFit: 'contain' }} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: logo ? 22 : 0 }}>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 700, lineHeight: 1.1 }}>
            {nameMain}
          </div>
          {nameSub && (
            <div
              style={{
                display: 'flex',
                marginTop: 6,
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: colors.accent,
              }}
            >
              {nameSub}
            </div>
          )}
        </div>
      </div>

      {/* Headline and card */}
      <div
        style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: card ? 600 : 960 }}>
          {home.heroEyebrow && (
            <div
              style={{
                display: 'flex',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: colors.accent,
                marginBottom: 18,
              }}
            >
              {home.heroEyebrow}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: card ? 68 : 80,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {headline.map((word, index) => (
              <span
                key={index}
                style={{
                  display: 'flex',
                  marginRight: card ? 17 : 20,
                  color: word.accent ? colors.accent : '#ffffff',
                }}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>

        {card && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 380,
              padding: '28px 32px',
              borderRadius: 24,
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                paddingBottom: 18,
                gap: 16,
                borderBottom: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div style={{ display: 'flex', color: 'rgba(255,255,255,0.7)' }}>{card.title}</div>
              <div style={{ display: 'flex', color: colors.accent }}>{card.status}</div>
            </div>
            {card.items.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                  fontSize: 21,
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                <div style={{ display: 'flex' }}>{item.label}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    fontSize: 17,
                    fontWeight: 700,
                    color: colors.accent,
                    background: item.done ? colors.primary : 'transparent',
                    border: item.done ? 'none' : '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  {item.done && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12.5l4.5 4.5L19 7"
                        stroke={colors.accent}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 78,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          fontSize: 22,
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        <div style={{ display: 'flex' }}>{siteConfig.tagline}</div>
        <div style={{ display: 'flex', width: 120, height: 6, background: colors.accent }} />
      </div>
    </div>,
    { width: 1200, height: 630, ...options }
  );
}
