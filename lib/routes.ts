/** Pages that exist. Labels without a page link to "#" until their template is designed. */
export const markets = {
  manufacturing: "Manufacturing",
  pharma: "Pharma",
  transportation: "Transportation",
  "fashion-luxury": "Fashion & Luxury",
  healthcare: "Healthcare",
  "public-administration": "Public Administration",
  "financial-services": "Financial Services",
} as const;

export const enabling = {
  "integration-platforms": "Integration Platforms",
  "artificial-intelligence": "Artificial Intelligence",
  bpm: "BPM (Business Process Management)",
  "blockchain-tokenization": "Blockchain & Tokenization",
  collaboration: "Collaboration",
  cybersecurity: "Cybersecurity",
} as const;

export const services = {
  "information-technology-consulting": "Information Technology Consulting",
  "digital-consulting": "Digital Consulting",
  "software-factory": "Software Factory",
  "application-management-bpo": "Application Management/BPO",
} as const;

export const products = {
  spera: "Spera",
  urp: "URP",
  "gestione-documentale": "Gestione Documentale",
  comet: "Comet",
  aeva: "Aeva",
  allinapp: "AllinApp",
  legalhub: "LegalHUB",
  readvice: "REadvice",
  fai: "FAI",
} as const;

export type MarketSlug = keyof typeof markets;
export type EnablingSlug = keyof typeof enabling;
export type ServiceSlug = keyof typeof services;
export type ProductSlug = keyof typeof products;

export const marketHref = (s: MarketSlug) => `/markets/${s}/`;
export const enablingHref = (s: EnablingSlug) => `/enabling-technologies/${s}/`;
export const serviceHref = (s: ServiceSlug) => `/services/${s}/`;
export const productHref = (s: ProductSlug) => `/products/${s}/`;

export const routes = {
  home: "/",
  pharma: marketHref("pharma"),
  integrationPlatforms: enablingHref("integration-platforms"),
  spera: productHref("spera"),
  itConsulting: serviceHref("information-technology-consulting"),
  careers: "/careers/",
  gruppo: "/gruppo-benefind/",
  certificazioni: "/certificazioni/",
  codiceEtico: "/codice-etico/",
  privacy: "/privacy-policy/",
  cookie: "/cookie-policy/",
} as const;

/** Every spelling used by menus, footer and cards (Figma is not consistent). */
const byLabel: Record<string, string> = {
  ...Object.fromEntries(Object.entries(markets).map(([s, l]) => [l, marketHref(s as MarketSlug)])),
  ...Object.fromEntries(Object.entries(enabling).map(([s, l]) => [l, enablingHref(s as EnablingSlug)])),
  ...Object.fromEntries(Object.entries(services).map(([s, l]) => [l, serviceHref(s as ServiceSlug)])),
  ...Object.fromEntries(Object.entries(products).map(([s, l]) => [l, productHref(s as ProductSlug)])),
  "Fashion&Luxury": marketHref("fashion-luxury"),
  BPM: enablingHref("bpm"),
  "BPM / Document Management": enablingHref("bpm"),
  "Blockchain / Tokenization": enablingHref("blockchain-tokenization"),
  CyberSecurity: enablingHref("cybersecurity"),
  "Technology Consulting": serviceHref("information-technology-consulting"),
  "Application Management / BPO": serviceHref("application-management-bpo"),
  "FAI - Fascicolatore AI": productHref("fai"),
  "Gestione Documentale (Protocollo)": productHref("gestione-documentale"),
  Careers: routes.careers,
  "Gruppo Benefind": routes.gruppo,
  "Chi siamo": routes.gruppo,
  Certificazioni: routes.certificazioni,
  "Codice etico": routes.codiceEtico,
  "Privacy Policy": routes.privacy,
  "Cookie Policy": routes.cookie,
};

export const hrefFor = (label: string) => byLabel[label] ?? "#";
