import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnablingPage } from "@/components/templates/EnablingPage";
import { enablingPages } from "@/content/pages/enabling";

/** Enabling Technologies pages generated from the template; the template page itself has its own static route. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(enablingPages).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = enablingPages[(await params).slug as keyof typeof enablingPages];
  if (!page) return {};
  return {
    description: page.subtitle,
    title: `${page.title} — Enabling Technologies · Gruppo Benefind`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = enablingPages[slug as keyof typeof enablingPages];
  if (!page) notFound();
  return <EnablingPage page={page} id={slug} />;
}
