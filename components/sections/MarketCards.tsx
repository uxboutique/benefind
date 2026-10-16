"use client";

import Image from "next/image";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { TextLink } from "@/components/ui/TextLink";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./MarketCards.module.css";

type Card = {
  title: string;
  text: string;
  href: string;
  photo: string | null;
  photoBox: { left: string; top: string; width: string; height: string } | null;
};

/** "Altri markets" card carousel (Figma Pharma 117:4317): 360 × 520 cards, dark glass panel, Link "Scopri". */
export function MarketCards({ label, cards, fallbackImage }: { label: string; cards: Card[]; fallbackImage: string }) {
  const { trackRef, canPrev, canNext, prev, next, onKeyDown } = useCarousel(cards.length);
  return (
    <div className={styles.slider} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} className={styles.track} role="group" tabIndex={0} onKeyDown={onKeyDown} aria-label={`${label}, usa le frecce per scorrere`}>
        {cards.map((c, i) => (
          <div
            key={i}
            className={styles.card}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} di ${cards.length}: ${c.title}`}
            data-reveal=""
            style={{ "--d": `${Math.min(i, 3) * 80}ms` } as React.CSSProperties}
          >
            <div className={styles.media}>
              <Image src={fallbackImage} alt="" fill sizes="360px" className={styles.img} />
              {c.photo && c.photoBox && (
                <div className={styles.photoBox} style={c.photoBox}>
                  <Image src={c.photo} alt="" fill sizes="600px" className={styles.img} />
                </div>
              )}
            </div>
            <div className={styles.panel}>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.text}>{c.text}</p>
              <TextLink href={c.href} tone="on-dark" size="m">
                Scopri
              </TextLink>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <CarouselControls variant="solid" label={`Navigazione ${label.toLowerCase()}`} className={styles.controls} canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} />
      </div>
    </div>
  );
}
