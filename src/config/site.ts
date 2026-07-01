// ============================================================================
//  SITE CONFIG — edit numbers and links here ONCE. Every page reads from this.
//  This is the equivalent of Peak Mode's settings_data.json: one place to
//  change pricing, phone, links, and address across the whole site.
// ============================================================================

export const site = {
  brand: 'AI Workflow Guy',
  tagline: 'AI consulting for local businesses',
  region: 'Northern Virginia',

  // ---- Highest-priority element on the site: the live demo line ----
  demoPhone: '571-686-7669',
  demoPhoneHref: 'tel:+15716867669',

  // ---- Booking + contact ----
  calendly: 'https://calendly.com/peter-aiworkflowguy/30min',
  email: 'peter@aiworkflowguy.com',
  // Contact form uses Netlify Forms (built in, no third-party endpoint needed).
  // The form name Netlify registers submissions under; also change it in
  // ContactForm.astro if you rename it.
  netlifyFormName: 'contact',

  // ---- CAN-SPAM / legal footer address (required on outbound + site) ----
  address: '9990 Fairfax Blvd, Ste 560, Fairfax, VA 22030',

  // ========================================================================
  //  PRICING — PROPOSED DEFAULTS. Confirm or adjust these three numbers.
  //  audit credits toward setup, so the audit feels risk-free.
  // ========================================================================
  pricing: {
    audit: 497,          // paid AI Audit — the entry offer
    setup: 997,          // AI Front Office build (under $1k on purpose)
    monthly: 697,        // monthly, on a 6- or 12-month agreement
    // Optional low-end wedge. Set enabled:false to hide it everywhere.
    textback: { enabled: true, setup: 0, monthly: 197 },
  },
} as const;

// ---- Navigation (drives the header + footer menus) --------------------------
export const nav = [
  { label: 'AI Receptionist', href: '/ai-receptionist' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Proof', href: '/proof' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
] as const;
