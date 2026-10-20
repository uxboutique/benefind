/*
 * Gruppo Benefind — Figma "Desktop - Gruppo Benefind" (169:3328). Copy in Figma is Lorem ipsum
 * (placeholder) except the stats band; reproduced as designed and flagged in the report.
 */
import { asset } from "@/lib/asset";

const lorem = "Lorem ipsum dolor sit amet consectetur. Sollicitudin habitasse iaculis ultrices ornare dolor vitae amet.";
const loremLong = [
  "Lorem ipsum dolor sit amet consectetur. Sollicitudin habitasse iaculis ultrices ornare dolor vitae amet.",
  "Scelerisque ultrices at vitae sed mauris sapien tincidunt. Odio non massa sed et accumsan aenean et lectus neque. Pulvinar duis turpis quis nisl iaculis odio. Massa enim morbi arcu at mauris arcu mauris platea gravida.",
  "Dolor massa et augue nisl ac enim. Tincidunt morbi mattis hendrerit gravida eget aenean vulputate amet. In sodales velit non praesent eget porttitor faucibus imperdiet. Non id massa vestibulum enim ornare purus donec sapien.",
];

export const gruppo = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Gruppo Benefind" }],
  title: "Gruppo Benefind",
  text: "Lorem ipsum dolor sit amet consectetur. Tincidunt nulla nulla ornare id et morbi convallis. Dignissim id scelerisque aliquam in. Quis mauris consequat orci habitasse.",
  banner: { image: asset("/assets/images/gruppo-city.jpg"), alt: "Skyline di una grande città al tramonto" },
  statement: { title: "Lorem ipsum dolor sit amet consectetur. Est quisque sit aliquam", paragraphs: loremLong },
  stats: {
    eyebrow: "Servizi per le aziende",
    titleLines: ["Servizi su misura", "per la trasformazione", "digitale"],
    stats: [
      { value: "70%", label: "faster time to resolution" },
      { value: "3X", label: "faster time to resolution" },
      { value: "127+", label: "faster time to resolution" },
      { value: "24/7", label: "coverage with zero wait times" },
    ],
  },
  values: {
    eyebrow: "Lorem ipsum",
    title: "Lorem ipsum dolor sit amet consectetur. Sollicitudin habitasse iaculis ultrices",
    items: Array.from({ length: 6 }, () => ({ title: "Lorem ipsum", text: lorem })),
  },
  row: {
    id: "gruppo-row",
    title: "Lorem ipsum dolor sit amet consectetur",
    text: loremLong,
    media: { photo: asset("/assets/images/gruppo-team-walk.jpg"), alt: "Tre colleghi camminano in un ufficio" },
  },
  application: {
    titleLines: ["Candidatura spontanea", "form qui"],
    image: asset("/assets/images/gruppo-candidature.jpg"),
    cta: { label: "Primary CTA", href: "/careers/" },
  },
};
