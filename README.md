# AI Workflow Guy — website

Astro site built on the **same page system as Peak Mode**: a design system defined
once, a shared layout, and a library of reusable sections that each page assembles.
Deploys to Netlify at $0 on the free tier.

## The page system (how it maps to the Peak Mode / Shopify model)

| Peak Mode (Shopify)      | This site (Astro)                         |
|--------------------------|-------------------------------------------|
| `theme.liquid` (layout)  | `src/layouts/BaseLayout.astro`            |
| `theme.css` (tokens)     | `src/styles/design-system.css`            |
| `sections/*.liquid`      | `src/components/sections/*.astro`         |
| page templates           | `src/pages/*.astro`                       |
| `settings_data.json`     | `src/config/site.ts`                      |

To build or reorder a page, stack sections in a file under `src/pages/`.
To change pricing, the phone number, links, or the address — edit `src/config/site.ts` ONCE.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # outputs static site to /dist
```

## Deploy (Netlify — same domain you already use)

1. Push this folder to a GitHub repo.
2. In Netlify: New site → import the repo. `netlify.toml` sets build = `npm run build`, publish = `dist`.
3. Point `aiworkflowguy.com` at the new site (Netlify domain settings). Auto-builds on every push.

## Before it's client-ready

- **Confirm the 3 numbers** in `src/config/site.ts` → `pricing` (audit / setup / monthly).
- Set your real **Formspree** form ID in `site.formspreeEndpoint`.
- **Proof rule:** never fabricate testimonials, client logos, or stats. The Peak Mode
  angle is your own real business. Client results in `Proof.astro` are TODO placeholders.
- Drop a favicon into `public/` (`favicon.svg`).

## Sections available

Hero · DemoLine (in Header/Footer) · AuditCta · HowItWorks · PricingLadder ·
ServicesTiers · Proof · FaqAccordion · ContactForm
