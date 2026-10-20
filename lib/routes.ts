/** Pages that exist. Labels without a page link to "#" until their template is designed. */
export const routes = {
  home: "/",
  pharma: "/markets/pharma/",
  integrationPlatforms: "/enabling-technologies/integration-platforms/",
  spera: "/products/spera/",
  itConsulting: "/services/information-technology-consulting/",
  careers: "/careers/",
  gruppo: "/gruppo-benefind/",
  certificazioni: "/certificazioni/",
  codiceEtico: "/codice-etico/",
  privacy: "/privacy-policy/",
  cookie: "/cookie-policy/",
} as const;

const byLabel: Record<string, string> = {
  Pharma: routes.pharma,
  "Integration Platforms": routes.integrationPlatforms,
  Spera: routes.spera,
  "Technology Consulting": routes.itConsulting,
  "Information Technology Consulting": routes.itConsulting,
  Careers: routes.careers,
  "Gruppo Benefind": routes.gruppo,
  "Chi siamo": routes.gruppo,
  Certificazioni: routes.certificazioni,
  "Codice etico": routes.codiceEtico,
  "Privacy Policy": routes.privacy,
  "Cookie Policy": routes.cookie,
};

export const hrefFor = (label: string) => byLabel[label] ?? "#";
