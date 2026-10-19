import Image from "next/image";
import type { MediaLayer } from "@/lib/media";
import styles from "./MediaLayers.module.css";

/** Stack of decorative image layers (last on top) clipped by the parent — see lib/media.ts. */
export function MediaLayers({ layers, sizes }: { layers: MediaLayer[]; sizes: string }) {
  return (
    <div className={styles.stack} aria-hidden="true">
      {layers.map((l, i) => (
        <div key={i} className={styles.layer} style={l.box ? { ...l.box, transform: l.rotate ? `rotate(${l.rotate}deg)` : undefined } : undefined}>
          <Image src={l.src} alt="" fill sizes={sizes} className={styles.img} />
        </div>
      ))}
    </div>
  );
}

/**
 * Figma "Screen da inserire": white card waiting for a product screenshot (flagged placeholder).
 * The label is drawn by CSS (decorative, not announced).
 */
export function ScreenPlaceholder({ variant = "large" }: { variant?: "large" | "small" }) {
  return <div className={`${styles.screen} ${styles[variant]}`} aria-hidden="true" />;
}
