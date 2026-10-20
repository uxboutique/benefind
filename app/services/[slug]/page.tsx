import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/ServicePage";
import { servicePages } from "@/content/pages/services";

/** Services pages generated from the template; the template page itself has its own static route. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = servicePages[(await params).slug as keyof typeof servicePages];
  if (!page) return {};
  return {
    description: page.subtitle,
    title: `${page.title} — Services · Gruppo Benefind`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = servicePages[slug as keyof typeof servicePages];
  if (!page) notFound();
  return <ServicePage page={page} id={slug} />;
}
