/*
 * Careers — copy verbatim from Figma "Desktop - Careers" (165:8240).
 * Placeholders as designed: "[Nome], [Ruolo]" story, 4 identical job rows, "Candidatura spontanea form qui",
 * "Primary CTA", the jobs heading reusing "Insieme. Crescere uniti è la nostra forza".
 */
import { asset } from "@/lib/asset";
import { careers as homeCareers } from "@/content/home";

export const careersPage = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Careers" }],
  title: "Careers",
  subtitle: "Collaboriamo per creare soluzioni innovative, in un ambiente giovane e dinamico, dove fiducia ed esperienza sono la chiave del successo.",
  banner: { image: asset("/assets/images/careers-team.jpg"), alt: "Un team Benefind unisce le mani sopra un tavolo di lavoro" },
  values: {
    eyebrow: "Cosa offriamo",
    title: "Insieme. Crescere uniti è la nostra forza",
    items: [
      { title: "Leadership", text: "Promuoviamo una guida responsabile, aiutando le persone a sviluppare il loro potenziale e a contribuire ai successi del team." },
      { title: "Crescita e sviluppo", text: "Offriamo opportunità per la crescita professionale, con percorsi che favoriscono lo sviluppo delle competenze e il raggiungimento degli obiettivi." },
      { title: "Inclusività", text: "Ogni persona conta. Costruiamo un ambiente in cui le tue unicità sono un valore aggiunto." },
      { title: "Collaborazione", text: "Incoraggiamo la collaborazione tra le persone, unendo idee e talenti per ottenere risultati concreti e significativi." },
      { title: "Innovazione", text: "Promuoviamo la sperimentazione e diamo spazio alle idee che trasformano il futuro e creano valore." },
      { title: "Formazione", text: "Offriamo risorse e programmi di formazione per supportare lo sviluppo delle competenze e affrontare con successo le sfide future." },
    ],
  },
  people: {
    ...homeCareers,
    cta: { label: "Lavora con noi", href: "#posizioni" },
    story: { ...homeCareers.story, photo: { src: asset("/assets/images/careers-story.jpg"), alt: "Ritratto di [Nome], [Ruolo]" } },
  },
  workplace: {
    id: "careers-workplace",
    title: "Un ambiente di lavoro stimolante e flessibile",
    text: "Sosteniamo il benessere, la crescita e la soddisfazione professionale attraverso benefit e opportunità di sviluppo.",
    bullets: ["Ambiente di lavoro accogliente", "Company Welfare", "Buoni pasto", "Smart working", "Formazione e sviluppo professionale"],
    media: { photo: asset("/assets/images/careers-office.jpg"), alt: "Colleghi al lavoro in un ufficio luminoso" },
  },
  jobs: {
    // Figma: same heading as the values block (placeholder) — kept as designed.
    eyebrow: "Posizioni aperte",
    title: "Insieme. Crescere uniti è la nostra forza",
    items: Array.from({ length: 4 }, () => ({ title: "Senior Strategic Engagement Manager", location: "Firenze, Italia", href: "#" })),
  },
  application: {
    titleLines: ["Candidatura spontanea", "form qui"],
    image: asset("/assets/images/enabling-barn.jpg"),
    cta: { label: "Primary CTA", href: "#" },
  },
};
