import { asset } from "@/lib/asset";
import styles from "./CarouselControls.module.css";

type Props = {
  label: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  /** "glass": 50px translucent circles with Lucide arrows (markets). "solid": navy pills with ←/→ (technologies). */
  variant: "glass" | "solid";
  className?: string;
};

export function CarouselControls({ label, canPrev, canNext, onPrev, onNext, variant, className }: Props) {
  return (
    <div className={[styles.controls, styles[variant], className].filter(Boolean).join(" ")} role="group" aria-label={label}>
      <button type="button" className={styles.btn} onClick={onPrev} disabled={!canPrev} aria-label="Precedente">
        {variant === "glass" ? (
          // eslint-disable-next-line @next/next/no-img-element -- 24px decorative SVG, no optimisation needed
          <img src={asset("/assets/icons/icon-arrow-left.svg")} width={24} height={24} alt="" />
        ) : (
          <span aria-hidden="true">←</span>
        )}
      </button>
      <button type="button" className={styles.btn} onClick={onNext} disabled={!canNext} aria-label="Successivo">
        {variant === "glass" ? (
          // eslint-disable-next-line @next/next/no-img-element -- same asset, rotated 180° as in Figma
          <img className={styles.flip} src={asset("/assets/icons/icon-arrow-left.svg")} width={24} height={24} alt="" />
        ) : (
          <span aria-hidden="true">→</span>
        )}
      </button>
    </div>
  );
}
