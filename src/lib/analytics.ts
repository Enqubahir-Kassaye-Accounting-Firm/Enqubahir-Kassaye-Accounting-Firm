/**
 * Analytics events (Google Analytics, only when NEXT_PUBLIC_GA_ID is set).
 * Conversion events: form_sent, call_click, booking_click, chat_click — the
 * numbers shown to the client at handoff (docs/handoff.md).
 */

type Gtag = (command: 'event', name: string) => void;

export function trackEvent(name: string): void {
  const { gtag } = window as Window & { gtag?: Gtag };
  gtag?.('event', name);
}
