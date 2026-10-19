import Image from "next/image";
import { MediaLayers } from "@/components/ui/MediaLayers";
import { showcaseBg } from "@/lib/media";
import styles from "./ProductShowcase.module.css";

type Props = { screenshot: string; logo: { src: string; alt: string }; alt: string };

/**
 * Product dashboard on the luminous field (Figma Products 143:4710): 1280 × 624, white frame
 * (1098 wide, radius 24, 9px translucent outline) bleeding off the bottom; the product logo covers
 * the screenshot's own brand corner exactly as in the design.
 */
export function ProductShowcase({ screenshot, logo, alt }: Props) {
  return (
    <div className={`container ${styles.wrap}`}>
      <figure className={styles.card} data-media="">
        <MediaLayers layers={showcaseBg} sizes="(min-width: 1280px) 2210px, 170vw" />
        <div className={styles.frame} data-media-inner="">
          <div className={styles.shot}>
            <Image src={screenshot} alt={alt} fill sizes="(min-width: 1280px) 1225px, 96vw" className={styles.img} />
          </div>
          <div className={styles.mask} aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element -- product logo SVG from Figma */}
          <img className={styles.logo} src={logo.src} alt={logo.alt} width={129} height={37} />
        </div>
      </figure>
    </div>
  );
}
