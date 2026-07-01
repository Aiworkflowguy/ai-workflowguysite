// ============================================================================
//  FAQ CONFIG — single source of truth for the FAQ content. Both the visible
//  accordion (FaqAccordion.astro) and the FAQPage JSON-LD read from this, so the
//  structured data ALWAYS matches what's on the page (a Google requirement).
// ============================================================================
import { site } from './site';

export interface Faq { q: string; a: string; }

export const faqs: Faq[] = [
  {
    q: 'What does the AI receptionist actually do?',
    a: `It answers your phone 24/7, holds a natural conversation, books appointments during the call, and texts back any call it can't take. Call ${site.demoPhone} and try it yourself.`,
  },
  {
    q: 'Why start with a paid audit instead of just building?',
    a: `The audit makes sure you spend money on the automation with the fastest payback, not a guess. It's low-commitment, and the fee credits toward your build — so it's effectively risk-free once you move forward.`,
  },
  {
    q: 'How much does it cost?',
    a: `The audit is $${site.pricing.audit}. The AI Front Office is $${site.pricing.setup} setup + $${site.pricing.monthly}/mo on a 6- or 12-month agreement, with the audit fee credited. Larger or custom builds are quoted after the audit.`,
  },
  {
    q: 'Do you only do phone systems?',
    a: `That's the front door because it has the clearest ROI. Once it's working, I automate the rest of your operations — websites with booking built in, back-office workflows, lead follow-up, and more.`,
  },
  {
    q: 'Do you work with businesses outside Northern Virginia?',
    a: `The systems run remotely, so yes. Local NoVA businesses get the option of in-person setup.`,
  },
];
