// ============================================================================
//  SCHEMA (JSON-LD) — structured data builders for rich results in Google.
//  Everything is derived from src/config/site.ts so there is a single source of
//  truth. RULE (same as the rest of the site): never fabricate data — no
//  invented ratings, review counts, or claims. Only facts that are real.
// ============================================================================
import { site } from './site';

const ORIGIN = 'https://aiworkflowguy.com';
export const abs = (path = '/') => new URL(path, ORIGIN).href;

// Stable @id anchors so schemas can reference each other instead of repeating.
export const ORG_ID = `${ORIGIN}/#business`;
export const WEBSITE_ID = `${ORIGIN}/#website`;

// Parse the legal address string once: "9990 Fairfax Blvd, Ste 560, Fairfax, VA 22030"
const [street1, street2, city, stateZip] = site.address.split(',').map((s) => s.trim());
const [regionCode, postalCode] = (stateZip ?? '').split(/\s+/);

/**
 * The business itself. ProfessionalService is a LocalBusiness subtype, which is
 * the correct type for a local AI consultant with a service area + address.
 * Rendered once on every page (in BaseLayout) as the identity anchor.
 */
export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: site.brand,
  description: `AI consulting for local businesses in ${site.region}. Start with an AI audit, then a 24/7 AI receptionist that answers every call and books appointments.`,
  url: ORIGIN,
  logo: abs('/icon-512.png'),
  image: abs('/og.png'),
  telephone: site.demoPhoneHref.replace('tel:', ''),
  email: site.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: [street1, street2].filter(Boolean).join(', '),
    addressLocality: city,
    addressRegion: regionCode,
    postalCode,
    addressCountry: 'US',
  },
  areaServed: { '@type': 'AdministrativeArea', name: site.region },
  knowsAbout: [
    'AI receptionist',
    'business process automation',
    'appointment booking automation',
    'AI phone answering',
    'workflow automation',
  ],
  sameAs: [] as string[], // add real social/profile URLs here as they exist
};

/** The website, so Google can attribute pages and (later) show a sitelinks box. */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: site.brand,
  url: ORIGIN,
  publisher: { '@id': ORG_ID },
};

/** FAQPage from a list of {q,a}. Strips nothing — text must match the visible page. */
export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/** A specific Service the business offers, provided by the business anchor. */
export const serviceSchema = (opts: {
  name: string;
  description: string;
  serviceType?: string;
  url?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  serviceType: opts.serviceType ?? opts.name,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'AdministrativeArea', name: site.region },
  ...(opts.url ? { url: abs(opts.url) } : {}),
});

/** BreadcrumbList from ordered [name, path] pairs. */
export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});
