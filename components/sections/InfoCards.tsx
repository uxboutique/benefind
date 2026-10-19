"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { MediaLayers } from "@/components/ui/MediaLayers";
import { TextLink } from "@/components/ui/TextLink";
import { useCarousel } from "@/hooks/useCarousel";
import type { MediaLayer } from "@/lib/media";
import styles from "./InfoCards.module.css";

export type InfoCard = { title: string; text: string; href: string; media: MediaLayer[] };

function Card({ card, index, sizes }: { card: InfoCard; index: number; sizes: string }) {
  const body = (
    <>
      <div className={styles.media} data-media="">
        <div className={styles.mediaInner} data-media-inner="">
          <MediaLayers layers={card.media} sizes={sizes} />
        </div>
      </div>
      <div className={styles.copy}>
        <h3 className={styles.title}>{card.title}</h3>
        <p className={styles.text}>{card.text}</p>
        <TextLink tone="on-light" size="m" className={styles.more}>
          Scopri
        </TextLink>
      </div>
    </>
  );
  return (
    <article className={styles.card} data-reveal="" style={{ "--d": `${Math.min(index, 3) * 80}ms` } as CSSProperties}>
      {card.href.startsWith("/") ? (
        <Link href={card.href} className={styles.link}>
          {body}
        </Link>
      ) : (
        <a href={card.href} className={styles.link}>
          {body}
        </a>
      )}
    </article>
  );
}

/**
 * Image card + title / text / "Scopri" (Figma Enabling 142:4073, Services 147:7303).
 * "carousel": 360-wide cards in a swipe track (Enabling "Altre Technologies"); "grid": 3-up (Services).
 */
export function InfoCards({ label, cards, layout }: { label: string; cards: InfoCard[]; layout: "carousel" | "grid" }) {
  if (layout === "grid")
    return (
      <div className={`container ${styles.grid}`}>
        {cards.map((c, i) => (
          <Card key={c.title + i} card={c} index={i} sizes="(min-width: 1280px) 411px, (min-width: 768px) 33vw, 100vw" />
        ))}
      </div>
    );
  return <InfoCarousel label={label} cards={cards} />;
}

function InfoCarousel({ label, cards }: { label: string; cards: InfoCard[] }) {
  const { trackRef, canPrev, canNext, prev, next, onKeyDown } = useCarousel(cards.length);
  return (
    <div className={styles.slider} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} className={styles.track} role="group" tabIndex={0} onKeyDown={onKeyDown} aria-label={`${label}, usa le frecce per scorrere`}>
        {cards.map((c, i) => (
          <div key={c.title + i} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${i + 1} di ${cards.length}: ${c.title}`}>
            <Card card={c} index={i} sizes="360px" />
          </div>
        ))}
      </div>
      <div className="container">
        <CarouselControls label={`Navigazione ${label.toLowerCase()}`} className={styles.controls} canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} />
      </div>
    </div>
  );
}
