/** Content shapes of the four inner-page templates (derived from the section components' props). */
import type { ComponentProps } from "react";
import type { CaseStudyCarousel } from "@/components/sections/CaseStudyCarousel";
import type { MarketCards } from "@/components/sections/MarketCards";
import type { FeatureRow } from "@/components/sections/FeatureRows";
import type { InfoCard } from "@/components/sections/InfoCards";
import type { ImageBanner } from "@/components/sections/ImageBanner";
import type { Benefits } from "@/components/sections/Benefits";
import type { FeatureList } from "@/components/sections/FeatureList";
import type { ProductShowcase } from "@/components/sections/ProductShowcase";

type Crumb = { label: string; href?: string };
type Link = { label: string; href: string };
type CaseSlide = ComponentProps<typeof CaseStudyCarousel>["slides"][number];
type Card = ComponentProps<typeof MarketCards>["cards"][number];
type Intro = { eyebrow: string; title: string; text: string };
type Cases = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  slides: CaseSlide[];
};

export type MarketContent = {
  breadcrumb: Crumb[];
  eyebrow: string;
  title: string;
  subtitle: string;
  text: string;
  cta: Link;
  banner: { titleLines: string[]; image: string; cta: Link };
  cases: Cases;
  otherMarkets: Intro & { cards: Card[]; fallbackImage: string };
};

export type EnablingContent = {
  breadcrumb: Crumb[];
  eyebrow: string;
  title: string;
  subtitle: string;
  text: string;
  cta: Link;
  banner: { image: string };
  rows: FeatureRow[];
  other: Intro & { cards: InfoCard[] };
};

export type ProductContent = {
  breadcrumb: Crumb[];
  title: string;
  logo?: { src: string; width: number; height: number };
  subtitle: string;
  text: string[];
  cta: Link;
  showcase: ComponentProps<typeof ProductShowcase>;
  benefits: Omit<ComponentProps<typeof Benefits>, "id">;
  compliance?: Pick<ComponentProps<typeof ImageBanner>, "text" | "overlay"> & {
    titleLines: string[];
    image: string;
  };
  features: Omit<ComponentProps<typeof FeatureList>, "id">;
  other: Intro & { cards: Card[]; fallbackImage: string };
};

export type ServiceContent = {
  breadcrumb: Crumb[];
  eyebrow: string;
  title: string;
  subtitle: string;
  banner: { image: string };
  offer: { title: string; cards: InfoCard[] };
  cases: Cases;
  other: Intro & { cards: Card[]; fallbackImage: string };
};
