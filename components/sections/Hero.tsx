import { Button } from "@/components/ui/Button";
import { LightField } from "@/components/ui/LightField";
import { hero } from "@/content/home";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-theme="dark">
      {/* Figma: "AI visual · hero.jpg — sostituire il fill con l'immagine" → CSS stand-in until final art */}
      <div className={styles.visual} data-hero-visual="">
        <LightField variant="hero" />
      </div>
      <div className={styles.veil} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <h1 id="hero-title" className={styles.title}>
          {hero.lines.map((line, i) => (
            <span key={i} className={styles.line} style={{ "--i": i } as React.CSSProperties}>
              <span data-hero-line="">{line}</span>
              {i < hero.lines.length - 1 && " "}
            </span>
          ))}
        </h1>
        <div className={styles.cta} data-hero-cta="">
          <Button href={hero.cta.href} variant="light">
            {hero.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
