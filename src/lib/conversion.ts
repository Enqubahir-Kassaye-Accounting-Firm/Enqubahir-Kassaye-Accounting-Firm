/**
 * Conversion
 * Turns the actions in src/config/site.ts → conversion into links for the
 * hero's main button, the closing CTA section and the header button. Labels:
 * UI_TEXT.conversion.
 */

import { telegramUrl, whatsappUrl } from '@/components/social-links';
import { siteConfig, type ConversionAction } from '@/config/site';
import { UI_TEXT } from '@/data/ui';

export interface ActionLink {
  href: string;
  label: string;
  external: boolean;
}

const { phone } = siteConfig.contact;
const bookingUrl = siteConfig.booking.url;

const HREFS = new Map<ConversionAction, string>([
  ['message', '/#contact'],
  ['call', phone ? `tel:${phone}` : ''],
  ['booking', bookingUrl],
  ['whatsapp', whatsappUrl],
  ['telegram', telegramUrl],
]);

/** The link for an action, or undefined when it is 'none' or its detail is empty */
function actionLink(action: ConversionAction): ActionLink | undefined {
  const href = HREFS.get(action);
  if (action === 'none' || !href) return undefined;
  return {
    href,
    // eslint-disable-next-line security/detect-object-injection -- action is a typed union from site.ts
    label: UI_TEXT.conversion[action],
    external: action === 'booking' || action === 'whatsapp' || action === 'telegram',
  };
}

/** Primary action; falls back to 'message' when its detail is missing */
export const primaryAction: ActionLink =
  actionLink(siteConfig.conversion.primary) ?? (actionLink('message') as ActionLink);

/** Secondary action, or undefined (callers then show their own secondary link) */
export const secondaryAction: ActionLink | undefined =
  siteConfig.conversion.secondary === siteConfig.conversion.primary
    ? undefined
    : actionLink(siteConfig.conversion.secondary);

/** Analytics event for a clicked link, by its href (see conversion-tracker.tsx) */
export function conversionEvent(href: string): string | undefined {
  if (href.startsWith('tel:')) return 'call_click';
  if (bookingUrl && href === bookingUrl) return 'booking_click';
  if (href.startsWith('https://wa.me/') || href.startsWith('https://t.me/')) return 'chat_click';
  return undefined;
}
