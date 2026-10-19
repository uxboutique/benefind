"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { markets } from "@/content/home";
import { useCarousel } from "@/hooks/useCarousel";
import { asset } from "@/lib/asset";
import styles from "./Markets.module.css";

export function Markets() {
  const { slides } = markets;
  const { trackRef, active, canPrev, canNext, prev, next, onKeyDown } = useCarousel(slides.length);

  return (
    <section id="mercati" className={styles.section} aria-labelledby="mercati-title">
      <div className={`container ${styles.intro}`}>
        <SectionHeading id="mercati-title" eyebrow={markets.eyebrow} title={markets.title} className={styles.heading} />
        <div className={styles.paragraphs} data-reveal="">
          {markets.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className={styles.slider} role="region" aria-roledescription="carousel" aria-label="Mercati">
        <div ref={trackRef} className={styles.track} role="group" tabIndex={0} onKeyDown={onKeyDown} aria-label="Slide dei mercati, usa le frecce per scorrere">
          {slides.map((s, i) => (
            <div
              key={i}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} di ${slides.length}: ${s.title}`}
              data-active={i === active ? "" : undefined}
              inert={i !== active ? true : undefined}
            >
              <div className={styles.bg} style={{ inset: s.bgInset }} aria-hidden="true">
                <Image src={s.bg} alt="" fill sizes="(min-width: 1280px) 1324px, 100vw" className={styles.bgImg} />
              </div>
              <div className={styles.left}>
                <p className={styles.eyebrow}>{s.eyebrow}</p>
                <h3 className={styles.title}>
                  {(s.titleLines ?? [s.title]).map((l, j) => (
                    <span key={j} className={styles.titleLine}>
                      {l}{" "}
                    </span>
                  ))}
                </h3>
                <ul className={styles.bullets}>
                  {s.bullets.map((b, j) => (
                    <li key={j}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- 20px Lucide icon from Figma */}
                      <img src={asset("/assets/icons/lucide/circle-check-white.svg")} width={20} height={20} alt="" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.cta}>
                  <Button href={s.cta.href} variant="white">
                    {s.cta.label}
                  </Button>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.photo} data-media="">
                  <div className={styles.photoInner} data-media-inner="">
                    {/* Image box copied from Figma (crop/offset inside the 738×346 frame). */}
                    <div className={styles.photoBox} style={s.photoBox}>
                      <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 1280px) 830px, (min-width: 1024px) 64vw, 100vw" className={styles.photoImg} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`container ${styles.controlsWrap}`}>
          <CarouselControls label="Navigazione mercati" canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} />
        </div>
      </div>
    </section>
  );
}
