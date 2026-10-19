"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { asset } from "@/lib/asset";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./CaseStudyCarousel.module.css";

type Slide = {
  logo: { src: string; alt: string; width: number; height: number };
  title: string;
  cta: { label: string; href: string };
  photo: { src: string; alt: string };
  stats: { value: string; label: string }[];
};

/** Case-study slider (Figma Pharma 120:4488): 1280 × 520 slides, logo + title + CTA left, photo + stats right. */
export function CaseStudyCarousel({ label, slides }: { label: string; slides: Slide[] }) {
  const { trackRef, active, canPrev, canNext, prev, next, onKeyDown } = useCarousel(slides.length);
  return (
    <div className={styles.slider} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} className={styles.track} role="group" tabIndex={0} onKeyDown={onKeyDown} aria-label={`${label}, usa le frecce per scorrere`}>
        {slides.map((s, i) => (
          <div
            key={i}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} di ${slides.length}`}
            data-active={i === active ? "" : undefined}
          >
            {/* Figma: the luminous-field image rotated −167.96° and oversized behind the slide */}
            <div className={styles.bg} aria-hidden="true">
              <Image src={asset("/assets/images/markets-slide1-bg.png")} alt="" fill sizes="2416px" className={styles.bgImg} />
            </div>
            <div className={styles.left}>
              <Image src={s.logo.src} alt={s.logo.alt} width={s.logo.width} height={s.logo.height} className={styles.logo} />
              <h3 className={styles.title}>{s.title}</h3>
              <div>
                <Button href={s.cta.href} variant="white">
                  {s.cta.label}
                </Button>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.photo} data-media="">
                <div className={styles.photoInner} data-media-inner="">
                  <div className={styles.photoBox}>
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 1280px) 731px, 90vw" className={styles.photoImg} />
                  </div>
                </div>
              </div>
              <dl className={styles.stats}>
                {s.stats.map((st, j) => (
                  <div key={j} className={styles.stat}>
                    <dt className={styles.statLabel}>{st.label}</dt>
                    <dd className={styles.statValue}>{st.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </div>
      <div className={`container ${styles.controlsWrap}`}>
        <CarouselControls label={`Navigazione ${label.toLowerCase()}`} canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} />
      </div>
    </div>
  );
}
