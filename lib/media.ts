/*
 * Decorative "luminous field" backgrounds from Figma: one AI-generated gradient image, oversized and
 * rotated inside a clipped box. Boxes are the Figma geometry converted to % of the box they sit in,
 * so they scale with the responsive card. rotate = CSS degrees (Figma rotation with inverted sign).
 */
import { asset } from "@/lib/asset";

export type LayerBox = { left: string; top: string; width: string; height: string };
export type MediaLayer = { src: string; box?: LayerBox; rotate?: number };

export const luminous = {
  blue: asset("/assets/images/markets-slide1-bg.png"),
  sunset: asset("/assets/images/markets-slide2-bg.png"),
  green: asset("/assets/images/luminous-green.jpg"),
  red: asset("/assets/images/luminous-red.jpg"),
  cocoa: asset("/assets/images/services-cocoa-satin.png"),
};

const ROT = -167.96;

/** 360 × 360 card (Enabling "Altre Technologies"). */
export const squareCard = {
  blue: [{ src: luminous.blue, rotate: ROT, box: { left: "-83.97%", top: "-7.69%", width: "414.43%", height: "184.06%" } }],
  green: [{ src: luminous.green }],
  sunset: [{ src: luminous.sunset, box: { left: "0%", top: "0%", width: "400%", height: "177.78%" } }],
} satisfies Record<string, MediaLayer[]>;

/** 410.67 × 360 card (Services 3-up). */
export const wideCard = {
  blue: [{ src: luminous.blue, rotate: ROT, box: { left: "-73.61%", top: "-7.69%", width: "363.28%", height: "184.06%" } }],
  green: [{ src: luminous.green }],
  sunset: [{ src: luminous.sunset, box: { left: "0%", top: "0%", width: "350.65%", height: "177.78%" } }],
} satisfies Record<string, MediaLayer[]>;

/** 240 × 200 thumbnail (Products "Le funzionalità"). */
const rowBox: LayerBox = { left: "-84.33%", top: "-9.27%", width: "416.17%", height: "221.8%" };
export const rowThumb = {
  blue: [{ src: luminous.blue, rotate: ROT, box: rowBox }],
  blueTilted: [{ src: luminous.blue, rotate: 45, box: rowBox }],
  green: [{ src: luminous.green, rotate: ROT, box: rowBox }],
  sunset: [{ src: luminous.sunset, rotate: -ROT, box: { left: "-176.27%", top: "-58.4%", width: "600%", height: "320%" } }],
} satisfies Record<string, MediaLayer[]>;

/** 580 × 580 feature media (Enabling rows). */
export const featureSquare = {
  red: [{ src: luminous.red }],
  cocoa: [{ src: luminous.cocoa, rotate: ROT, box: { left: "-20.89%", top: "1.85%", width: "292.24%", height: "129.79%" } }],
} satisfies Record<string, MediaLayer[]>;

/** 1280 × 624 product showcase background (Products 143:4710). */
export const showcaseBg: MediaLayer[] = [{ src: luminous.blue, rotate: ROT, box: { left: "-36.24%", top: "-35.74%", width: "172.53%", height: "157.17%" } }];
