import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/templates/ProductPage";
import { productPages } from "@/content/pages/products";

/** Products pages generated from the template; the template page itself has its own static route. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(productPages).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = productPages[(await params).slug as keyof typeof productPages];
  if (!page) return {};
  return {
    description: page.subtitle,
    title: `${page.title} — Products · Gruppo Benefind`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = productPages[slug as keyof typeof productPages];
  if (!page) notFound();
  return <ProductPage page={page} id={slug} />;
}
