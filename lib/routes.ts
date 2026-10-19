/** Pages that exist. Labels without a page link to "#" until their template is designed. */
export const routes = {
  home: "/",
  pharma: "/markets/pharma/",
  integrationPlatforms: "/enabling-technologies/integration-platforms/",
  spera: "/products/spera/",
  itConsulting: "/services/information-technology-consulting/",
} as const;

const byLabel: Record<string, string> = {
  Pharma: routes.pharma,
  "Integration Platforms": routes.integrationPlatforms,
  Spera: routes.spera,
  "Technology Consulting": routes.itConsulting,
  "Information Technology Consulting": routes.itConsulting,
};

export const hrefFor = (label: string) => byLabel[label] ?? "#";
