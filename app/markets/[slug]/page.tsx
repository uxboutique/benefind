import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketPage } from "@/components/templates/MarketPage";
import { marketPages } from "@/content/pages/markets";

/** Markets pages generated from the template; the template page itself has its own static route. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(marketPages).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = marketPages[(await params).slug as keyof typeof marketPages];
  if (!page) return {};
  return {
    description: page.subtitle,
    title: `${page.title} — Markets · Gruppo Benefind`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = marketPages[slug as keyof typeof marketPages];
  if (!page) notFound();
  return <MarketPage page={page} id={slug} />;
}
