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

## Before it's client-ready

- **Confirm the pricing** in `src/config/site.ts` → `pricing` (audit / setup / monthly /
  text-back). Currently 497 / 997 / 697 / 197.
- Set up the **Forms email notification** in Netlify (see above).
- **Proof rule (hard):** never fabricate testimonials, client logos, or stats. The Peak
  Mode angle is Peter's own real business. Client results in
  `src/components/sections/PeakModeProof.astro` (and the shorter `Proof.astro` on the home
  page) are clearly-marked TODO placeholders — fill only with real, permissioned results.
- Drop a favicon into `public/` (`favicon.svg`).

## Sections available

Hero · Header/Footer demo line · AuditCta · HowItWorks · PricingLadder · ServicesTiers ·
ReceptionistCapabilities · CallerExperience · Proof · PeakModeProof · FaqAccordion ·
ContactForm

## Pages

`/` · `/ai-receptionist` · `/how-it-works` · `/services` · `/industries` (+ one page per
vertical) · `/integrations` · `/pricing` · `/proof` · `/about` · `/faq` · `/contact` ·
`/thank-you`
