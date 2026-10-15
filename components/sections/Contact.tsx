import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { contact } from "@/content/home";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contatti" className={`container ${styles.section}`} aria-labelledby="contatti-title">
      <SplitLines as="h2" id="contatti-title" className={styles.title} lines={contact.titleLines}>
        {contact.titleLines.join(" ")}
      </SplitLines>
      <p className={styles.text} data-reveal="">
        {contact.text}
      </p>
      <div data-reveal="" style={{ "--d": "80ms" } as React.CSSProperties}>
        <Button href={contact.cta.href} variant="primary" arrow>
          {contact.cta.label}
        </Button>
      </div>
    </section>
  );
}
