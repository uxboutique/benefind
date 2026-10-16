/*
 * Primary navigation + mega-menu content.
 * Figma designs only the Markets panel (117:3815 / hover state 122:4922). The other three panels
 * reuse the same layout with the link lists from the footer (flagged in docs/homepage/05-report.md).
 * Internal routes go through next/link (basePath-aware); "#" = destination not defined yet.
 */
import { asset } from "@/lib/asset";

export type MenuLink = { label: string; href: string };
export type MenuFeature = { title: string; href: string; image: string };
export type NavItem = {
  id: string;
  label: string;
  /** Section on the homepage the panel title points to. */
  href: string;
  links: MenuLink[];
  feature?: MenuFeature;
};

export const primaryNav: NavItem[] = [
  {
    id: "markets",
    label: "Markets",
    href: "/#mercati",
    links: [
      { label: "Manufacturing", href: "#" },
      { label: "Pharma", href: "/markets/pharma/" },
      { label: "Transportation", href: "#" },
      { label: "Fashion&Luxury", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "Public Administration", href: "#" },
      { label: "Financial Services", href: "#" },
    ],
    feature: { title: "Processi MES avanzati", href: "/markets/pharma/", image: asset("/assets/images/enabling-barn.jpg") },
  },
  {
    id: "enabling",
    label: "Enabling Technologies",
    href: "/#tecnologie",
    links: [
      { label: "Integration Platforms", href: "#" },
      { label: "Artificial Intelligence", href: "#" },
      { label: "BPM / Document Management", href: "#" },
      { label: "Blockchain / Tokenization", href: "#" },
      { label: "Collaboration", href: "#" },
      { label: "CyberSecurity", href: "#" },
    ],
  },
  {
    id: "services",
    label: "Services",
    href: "/#servizi",
    links: [
      { label: "Technology Consulting", href: "#" },
      { label: "Digital Consulting", href: "#" },
      { label: "Software Factory", href: "#" },
      { label: "Application Management / BPO", href: "#" },
    ],
  },
  {
    id: "products",
    label: "Products",
    href: "#",
    links: [
      { label: "Aeva", href: "#" },
      { label: "AllinApp", href: "#" },
      { label: "Comet", href: "#" },
      { label: "FAI - Fascicolatore AI", href: "#" },
      { label: "Gestione Documentale (Protocollo)", href: "#" },
      { label: "LegalHUB", href: "#" },
      { label: "REadvice", href: "#" },
      { label: "Spera", href: "#" },
      { label: "URP", href: "#" },
    ],
  },
];

export const contactHref = "/#contatti";
