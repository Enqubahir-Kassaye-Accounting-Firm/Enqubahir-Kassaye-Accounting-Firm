/**
 * Animated Gradient Background
 * Subtle, slow-moving mesh gradient for premium hero sections
 * Inspired by Stripe's atmospheric backgrounds
 */

export function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient orbs (CSS keyframes in globals.css; still for reduced motion) */}
      <div className="from-brand-accent/20 animate-drift-a absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br via-transparent to-transparent" />
      <div className="from-brand-primary-light/40 animate-drift-b absolute -right-1/2 -bottom-1/2 h-full w-full rounded-full bg-gradient-to-tl via-transparent to-transparent" />

      {/* Secondary subtle glow (a radial gradient, not a blur: cheap to animate) */}
      <div className="glow-accent animate-glow-pulse absolute top-1/3 left-1/3 h-96 w-96 opacity-40" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--brand-accent) 30%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--brand-accent) 30%, transparent) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
