/** Motion tokens — mirror of the CSS custom properties in styles/tokens.css. */
export const motion = {
  ease: {
    out: "cubic-bezier(0.16, 1, 0.3, 1)",
    io: "cubic-bezier(0.65, 0, 0.35, 1)",
  },
  duration: { ui: 200, reveal: 700, lines: 800, media: 1200, hero: 1100 },
  revealDistance: 24,
  stagger: 80,
  staggerLines: 90,
  mediaScaleFrom: 1.06,
  /** One-shot reveal trigger (ICON values). */
  observer: { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
  /** Lenis smooth wheel (desktop only): duration in seconds; anchors land below the sticky header. */
  /** Header hides only after this scroll depth (px). */
  headerHideAfter: 400,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
