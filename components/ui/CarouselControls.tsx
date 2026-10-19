import { asset } from "@/lib/asset";
import styles from "./CarouselControls.module.css";

type Props = {
  label: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

/**
 * Prev/Next for every carousel (Figma "Controlli carousel", Homepage 142:259): two 50px circles,
 * gap 8, navy Lucide arrow; enabled = surface/cyan-light, disabled = surface/lilac-100.
 * Always placed 24px below the slider, aligned to the container.
 */
export function CarouselControls({ label, canPrev, canNext, onPrev, onNext, className }: Props) {
  const icon = asset("/assets/icons/arrow-left-navy.svg");
  return (
    <div className={[styles.controls, className].filter(Boolean).join(" ")} role="group" aria-label={label}>
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
