/**
 * Section Divider
 * Thin line between page sections. Uses the neutral border color of the
 * current theme (brand.surfaces.*.border), never the brand colors, so it
 * fits every client in light and dark mode without changes.
 */

export function SectionDivider() {
  return <div className="border-border-default border-t" />;
}
