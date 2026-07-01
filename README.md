# AI Workflow Guy — website

Astro static site built on the **same page system as Peak Mode**: a design system
defined once, a shared layout, and a library of reusable sections that each page
assembles. Deploys to Netlify at $0 on the free tier.

## The page system (how it maps to the Peak Mode / Shopify model)

| Peak Mode (Shopify)      | This site (Astro)                         |
|--------------------------|-------------------------------------------|
| `theme.liquid` (layout)  | `src/layouts/BaseLayout.astro`            |
| `theme.css` (tokens)     | `src/styles/design-system.css`            |
| `sections/*.liquid`      | `src/components/sections/*.astro`         |
| page templates           | `src/pages/*.astro`                        |
| `settings_data.json`     | `src/config/site.ts`                       |

To build or reorder a page, stack sections in a file under `src/pages/`.
To change pricing, the phone number, links, or the address — edit
`src/config/site.ts` ONCE and it updates everywhere.

### Config-driven content

- **`src/config/site.ts`** — pricing, demo phone, Calendly, email, address, and the
  nav (drives both header and footer).
- **`src/config/industries.ts`** — the vertical list. Each entry generates one page at
  `/industries/<slug>` from the single template `src/pages/industries/[slug].astro`.
  Add a vertical here and its page builds itself.
- **`src/config/integrations.ts`** — the grouped tool list rendered on `/integrations`.
- **`src/config/faqs.ts`** — the FAQ content, read by both the visible accordion AND the FAQ
  structured data, so they can never drift apart.
- **`src/config/schema.ts`** — JSON-LD builders (business, website, FAQ, service,
  breadcrumbs). All derived from `site.ts` — never hand-write schema.
- **`src/config/site.ts` → `clientResults`** — real, permissioned client outcomes. Empty by
  default; the proof blocks stay hidden until you add one (no fabricated proof, no visible
  placeholders).

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # outputs the static site to /dist
```

## Deploy (Netlify — same domain, no DNS changes)

The repo is linked to the **existing** Netlify project that already serves
`aiworkflowguy.com`, so pushes auto-build and the domain is untouched.

1. `git push` to the GitHub repo.
2. Netlify runs the build from `netlify.toml`: **build = `npm run build`, publish = `dist`,
   Node 20**. (Base directory is blank — the repo root is the project root.)
3. Every push to `main` rebuilds and redeploys automatically.

To (re)link the repo: Netlify → the aiworkflowguy.com site → **Site configuration →
Build & deploy → Continuous deployment → Link repository → Link to an existing
repository** → GitHub → this repo → branch `main`.

## Contact form — Netlify Forms

The contact form uses **Netlify Forms** (no third-party service):

- Form name `contact`, with a hidden `form-name` field and a `bot-field` honeypot.
- On submit it redirects to `/thank-you`.
- Netlify detects the form from the built HTML on deploy — nothing to configure in code.
- **After the first deploy:** Netlify → site → **Forms** → the `contact` form appears →
  add an email notification so submissions reach you.
- Note: Netlify Forms only work on the deployed site, **not** on `localhost`.

## SEO / structured data

- **Sitemap:** `@astrojs/sitemap` builds `/sitemap-index.xml` (referenced by
  `public/robots.txt`). Post-conversion pages (`/thank-you`, `/thank-you-intake`, `/intake`)
  are excluded and marked `noindex`.
- **JSON-LD:** every page carries `ProfessionalService` + `WebSite` schema (from
  `BaseLayout`), and pages add their own — `FAQPage`, `Service`, `BreadcrumbList`, an
  industries `ItemList` — via the `schema` prop. Test with Google's Rich Results Test.
- **Meta:** every indexable page has a unique title + description; `BaseLayout` also takes an
  `image` prop for per-page social/OG images.
- Pin note: `@astrojs/sitemap` is held at **3.2.x** because 3.3+ requires Astro 5. Upgrade
  it only when the site moves to Astro 5.

## AI-generated imagery (`npm run images`)

Branded imagery is generated with Google's Gemini image model ("Nano Banana"), driven by
`scripts/generate-images.mjs`.

1. Copy `.env.example` → `.env` and set `GEMINI_API_KEY` (free key:
   https://aistudio.google.com/apikey). `.env` is gitignored.
2. `npm run images` — generates only missing images into `public/images/`.
   `npm run images -- --force` regenerates; `npm run images -- dental` filters by name.
3. Wiring is automatic and safe: the industry pages and home hero show a generated image
   **only if the file exists** (`src/lib/asset.ts`), so the build never ships a broken
   `<img>`. Generate, then rebuild and the images appear.

Prompts (dark + neon-lime brand aesthetic) live in the manifest inside the script. Google
bills per image, separately from Claude.

## Before it's client-ready

- **Confirm the pricing** in `src/config/site.ts` → `pricing` (audit / setup / monthly /
  text-back). Currently 497 / 997 / 697 / 197.
- Set up the **Forms email notification** in Netlify (see above).
- **Proof rule (hard):** never fabricate testimonials, client logos, or stats. The Peak
  Mode angle is Peter's own real business. Client results are now **config-driven** — add
  real, permissioned outcomes to `clientResults` in `src/config/site.ts` and they render on
  the home page + `/proof`; leave it empty and those blocks stay hidden (no placeholders).
- **(Optional) generate imagery:** set a Gemini key and run `npm run images` (see above).
- Drop a favicon into `public/` (`favicon.svg`).

## Sections available

Hero · Header/Footer demo line · AuditCta · HowItWorks · PricingLadder · ServicesTiers ·
ReceptionistCapabilities · CallerExperience · Proof · PeakModeProof · FaqAccordion ·
ContactForm

## Pages

`/` · `/ai-receptionist` · `/how-it-works` · `/services` · `/industries` (+ one page per
vertical) · `/integrations` · `/pricing` · `/proof` · `/about` · `/faq` · `/contact` ·
`/thank-you`
