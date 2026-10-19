/*
 * Primary navigation + mega-menu content (Figma: Desktop - Menu - Markets 117:3815,
 * Enabling Technologies 145:6257, Services 147:7792, Products 144:5332, Hamburger 147:7973).
 * Internal routes go through next/link (basePath-aware); "#" = destination not designed yet.
 */
import { asset } from "@/lib/asset";
import { hrefFor, routes } from "@/lib/routes";

export type MenuLink = { label: string; href: string };
export type MenuFeature = {
  title: string;
  href: string;
  image: string;
  /** Image box inside the 334px card (Figma crop), CSS lengths. */
  imageBox?: { left: string; top: string; width: string; height: string };
  /** Overlay gradient from Figma. */
  overlay: string;
};
export type ProductTile = {
  name: string;
  /** null = "LOGO DA INSERIRE" in Figma (the product name is shown instead). */
  logo: { src: string; width: number; height: number } | null;
  text: string;
  href: string;
};
type BaseItem = { id: string; label: string; href: string };
export type ListItem = BaseItem & {
  kind: "list";
  links: MenuLink[];
  /** 2 = Markets (two columns), 1 = Enabling / Services. */
  columns: 1 | 2;
  /** Width of the first column in px (Figma). */
  columnWidth: number;
  feature: MenuFeature;
  /** Panel width (Figma) and horizontal offset of its centre from the page centre. */
  width: number;
  shift: number;
};
export type GridItem = BaseItem & { kind: "products"; products: ProductTile[]; width: number; shift: number };
export type NavItem = ListItem | GridItem;

const linksFrom = (labels: string[]): MenuLink[] => labels.map((label) => ({ label, href: hrefFor(label) }));

export const primaryNav: NavItem[] = [
  {
    kind: "list",
    id: "markets",
    label: "Markets",
    href: "/#mercati",
    columns: 2,
    columnWidth: 253,
    width: 874,
    shift: 0,
    links: linksFrom(["Manufacturing", "Pharma", "Transportation", "Fashion&Luxury", "Healthcare", "Public Administration", "Financial Services"]),
    feature: {
      title: "Processi MES avanzati",
      href: routes.pharma,
      image: asset("/assets/images/enabling-barn.jpg"),
      imageBox: { left: "-22px", top: "-12px", width: "calc(100% + 44px)", height: "calc(100% + 24px)" },
      overlay: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))",
    },
  },
  {
    kind: "list",
    id: "enabling",
    label: "Enabling Technologies",
    href: "/#tecnologie",
    columns: 1,
    columnWidth: 253,
    width: 677,
    shift: 62,
    links: linksFrom(["Integration Platforms", "Artificial Intelligence", "BPM", "Blockchain & Tokenization", "XR"]),
    feature: {
      title: "No code Platforms",
      href: routes.integrationPlatforms,
      image: asset("/assets/images/menu-enabling.jpg"),
      // Figma 145:6469: 517.92 × 582.66 at −123.66/−36.72 inside a 422 × 243 box centred in the card
      imageBox: { left: "-167.8px", top: "-46.2px", width: "517.9px", height: "582.7px" },
      overlay: "linear-gradient(54.44deg, rgba(0, 0, 0, 0.65) 44.06%, rgba(0, 0, 0, 0) 96.38%)",
    },
  },
  {
    kind: "list",
    id: "services",
    label: "Services",
    href: "/#servizi",
    columns: 1,
    columnWidth: 284,
    width: 708,
    shift: 62,
    links: linksFrom(["Information Technology Consulting", "Digital Consulting", "Software Factory", "Application Management/BPO"]),
    feature: {
      title: "Analisi e supporto IT",
      href: routes.itConsulting,
      image: asset("/assets/images/case-pharma-photo.jpg"),
      imageBox: { left: "0", top: "-17px", width: "100%", height: "217px" },
      overlay: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.77))",
    },
  },
  {
    kind: "products",
    id: "products",
    label: "Products",
    href: routes.spera,
    width: 1086,
    shift: 0,
    products: [
      { name: "Spera", logo: { src: asset("/assets/logos/products/spera.svg"), width: 116, height: 33 }, text: "Gestione delle sperimentazioni", href: routes.spera },
      { name: "URP", logo: { src: asset("/assets/logos/products/urp.svg"), width: 94, height: 38 }, text: "Gestione delle segnalazioni dei cittadini", href: "#" },
      { name: "Gestione Documentale", logo: { src: asset("/assets/logos/products/gestione-documentale.svg"), width: 145, height: 39 }, text: "Gestione workflow management aziendale", href: "#" },
      { name: "Comet", logo: { src: asset("/assets/logos/products/comet.svg"), width: 160, height: 40 }, text: "Fascicolatore AI ottimizza la gestione documentale", href: "#" },
      // Figma: "LOGO DA INSERIRE" + duplicated copy (placeholder) — remaining products from the footer list.
      ...["Aeva", "AllinApp", "LegalHUB", "REadvice"].map((name) => ({ name, logo: null, text: "Fascicolatore AI ottimizza la gestione documentale", href: "#" })),
    ],
  },
];

/** Desktop hamburger dropdown (Figma 147:8031). */
export const utilityMenu = {
  title: "Menu",
  links: [
    { label: "Gruppo Benefind", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Innovation", href: "#" },
  ],
  language: { label: "English", href: "#", lang: "en" },
};

export const contactHref = "/#contatti";
