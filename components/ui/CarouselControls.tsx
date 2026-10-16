import { asset } from "@/lib/asset";
import styles from "./CarouselControls.module.css";

type Props = {
  label: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  /** Both are 50px circles with the Lucide arrow (Figma): "glass" = white 30% on imagery, "solid" = navy. */
  variant: "glass" | "solid";
  className?: string;
};

export function CarouselControls({ label, canPrev, canNext, onPrev, onNext, variant, className }: Props) {
  const icon = asset("/assets/icons/icon-arrow-left.svg");
  return (
    <div className={[styles.controls, styles[variant], className].filter(Boolean).join(" ")} role="group" aria-label={label}>
      <button type="button" className={styles.btn} onClick={onPrev} disabled={!canPrev} aria-label="Precedente">
        {/* eslint-disable-next-line @next/next/no-img-element -- 24px Lucide icon from Figma */}
        <img src={icon} width={24} height={24} alt="" />
      </button>
      <button type="button" className={styles.btn} onClick={onNext} disabled={!canNext} aria-label="Successivo">
        {/* eslint-disable-next-line @next/next/no-img-element -- same asset, rotated 180° as in Figma */}
        <img className={styles.flip} src={icon} width={24} height={24} alt="" />
      </button>
    </div>
  );
}
