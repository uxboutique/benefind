"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologies } from "@/content/home";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./Technologies.module.css";

export function Technologies() {
  const { cards } = technologies;
  const { trackRef, canPrev, canNext, prev, next, onKeyDown } = useCarousel(cards.length);

  return (
    <section id="tecnologie" className={styles.section} aria-labelledby="tecnologie-title">
      <div className={`container ${styles.intro}`}>
        <SectionHeading id="tecnologie-title" eyebrow={technologies.eyebrow} title={technologies.title} />
        <p className={styles.text} data-reveal="">
          {technologies.text}
        </p>
      </div>

      <div className={styles.slider} role="region" aria-roledescription="carousel" aria-label="Tecnologie">
        <div ref={trackRef} className={styles.track} role="group" tabIndex={0} onKeyDown={onKeyDown} aria-label="Schede tecnologie, usa le frecce per scorrere">
          {cards.map((card, i) => (
            <div
              key={i}
              className={styles.card}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} di ${cards.length}: ${card.title}`}
              data-reveal=""
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className={styles.media}>
                <Image src={card.image} alt="" fill sizes="(min-width: 768px) 628px, 86vw" className={styles.img} />
              </div>
              <div className={[styles.panel, card.theme === "light" ? styles.panelLight : styles.panelDark].join(" ")} data-theme={card.theme}>
                <p className={styles.tag}>{card.tag}</p>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.body}>{card.text}</p>
                <div>
                  <Button href={card.cta.href} variant={card.theme === "light" ? "accent" : "white"}>
                    {card.cta.label}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container">
          <CarouselControls variant="solid" label="Navigazione tecnologie" className={styles.controls} canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} />
        </div>
      </div>
    </section>
  );
}
