import { LightField } from "@/components/ui/LightField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { areas } from "@/content/home";
import styles from "./Areas.module.css";

export function Areas() {
  return (
    <section className={styles.section} aria-labelledby="aree-title">
      <div className="container">
        <SectionHeading id="aree-title" eyebrow={areas.eyebrow} title={areas.title} />
        <ul className={styles.grid}>
          {areas.items.map((item, i) => (
            <li key={item.title} data-reveal="" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <a href={item.href} className={styles.card}>
                {/* Figma: "AI visual · <area>.jpg — sostituire il fill" → CSS stand-in */}
                <div className={styles.visual}>
                  <div className={styles.visualInner}>
                    <LightField variant={item.visual} />
                  </div>
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </a>
            </li>
          ))}
        </ul>
        <hr className={styles.rule} />
      </div>
    </section>
  );
}
