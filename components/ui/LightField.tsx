import type { CSSProperties } from "react";
import styles from "./LightField.module.css";

/*
 * Rebuilds the Figma "AI visual — sostituire il fill" placeholders (hero, careers, area cards):
 * a vertical gradient crossed by rotated, blurred "light bands" and 2px "light edges".
 * Geometry is copied from Figma (design px) and converted to container-query units so the
 * composition scales with its box. Decorative only (aria-hidden).
 */

type Band = { cx: number; cy: number; w: number; h: number; deg: number; bg: string; blur: number };
type Field = { width: number; height: number; base: string; bands: Band[] };

const edge = "rgba(255,255,255,0.75)";

const hero: Field = {
  width: 1440,
  height: 720,
  base: "linear-gradient(to bottom, #07063f 0%, #0c0a68 55%, #1b1890 100%)",
  bands: [
    { cx: 65.64, cy: 47.44, w: 2304, h: 360, deg: -14.04, blur: 10.8, bg: "linear-gradient(to bottom, rgba(233,232,243,0.9) 0%, rgba(127,123,240,0.68) 25%, rgba(58,63,217,0) 100%)" },
    { cx: 62.63, cy: 23.33, w: 2304, h: 2, deg: -14.04, blur: 0.75, bg: edge },
    { cx: 64.43, cy: 70.75, w: 2304, h: 216, deg: -14.04, blur: 10.8, bg: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(169,166,240,0.45) 25%, rgba(46,42,184,0) 100%)" },
    { cx: 62.63, cy: 56.33, w: 2304, h: 2, deg: -14.04, blur: 0.75, bg: edge },
  ],
};

const card = (base: string, bands: Band[]): Field => ({ width: 305, height: 265, base, bands });
const cardEdge = (cy: number): Band => ({ cx: 58.5, cy, w: 488, h: 2, deg: -23.48, blur: 0.75, bg: edge });

const fields = {
  hero,
  careers: hero, // Figma: same composition scaled ×1.31 (box 1886 wide)
  markets: card("linear-gradient(to bottom, #ffffff 0%, #f4f3f8 55%, #e9e8f3 100%)", [
    { cx: 66.17, cy: 45.95, w: 488, h: 119.25, deg: -23.48, blur: 4, bg: "linear-gradient(to bottom, rgba(127,123,240,0.85) 0%, rgba(169,166,240,0.64) 25%, rgba(233,232,243,0) 100%)" },
    cardEdge(25.66),
    { cx: 61.84, cy: 62.49, w: 488, h: 53, deg: -23.48, blur: 4, bg: "linear-gradient(to bottom, rgba(58,63,217,0.5) 0%, rgba(201,199,247,0.38) 25%, rgba(255,255,255,0) 100%)" },
    cardEdge(53.66),
  ]),
  enabling: card("linear-gradient(to bottom, #3a3fd9 0%, #2e2ab8 55%, #0c0a68 100%)", [
    { cx: 67.03, cy: 31.25, w: 488, h: 132.5, deg: -23.48, blur: 4, bg: "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(169,166,240,0.6) 25%, rgba(75,71,214,0) 100%)" },
    cardEdge(8.66),
  ]),
  services: card("linear-gradient(to bottom, #ffffff 0%, #e9e8f3 55%, #d3e0f5 100%)", [
    { cx: 65.3, cy: 36.66, w: 488, h: 106, deg: -23.48, blur: 4, bg: "linear-gradient(to bottom, rgba(93,141,203,0.85) 0%, rgba(127,123,240,0.64) 25%, rgba(211,224,245,0) 100%)" },
    cardEdge(18.66),
  ]),
  products: card("linear-gradient(to bottom, #07063f 0%, #0c0a68 55%, #2e2ab8 100%)", [
    { cx: 66.17, cy: 53.95, w: 488, h: 119.25, deg: -23.48, blur: 4, bg: "linear-gradient(to bottom, rgba(211,224,245,0.85) 0%, rgba(93,141,203,0.64) 25%, rgba(127,123,240,0) 100%)" },
    cardEdge(33.66),
  ]),
} satisfies Record<string, Field>;

export type LightFieldVariant = keyof typeof fields;

/** Minimum rendered width: big fields never shrink below their design width (they crop instead). */
const minWidth: Partial<Record<LightFieldVariant, string>> = { hero: "1440px", careers: "1886px" };

export function LightField({ variant, className }: { variant: LightFieldVariant; className?: string }) {
  const f = fields[variant];
  const u = (px: number) => `${((px / f.width) * 100).toFixed(4)}cqw`;
  const boxStyle = {
    "--lf-min": minWidth[variant] ?? "0px",
    aspectRatio: `${f.width} / ${f.height}`,
    background: f.base,
  } as CSSProperties;

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")} style={boxStyle} aria-hidden="true">
      {f.bands.map((b, i) => (
        <span
          key={i}
          className={styles.band}
          style={{
            left: `${b.cx}%`,
            top: `${b.cy}%`,
            width: u(b.w),
            height: u(b.h),
            background: b.bg,
            filter: `blur(${u(b.blur)})`,
            transform: `translate(-50%, -50%) rotate(${b.deg}deg)`,
          }}
        />
      ))}
    </div>
  );
}
