// ============================================================================
//  INTEGRATIONS CONFIG — powers /integrations.
//  HONESTY RULE: only list categories/tools the system genuinely connects to.
//  If a tool isn't a confirmed integration, it doesn't go here — the page tells
//  people to confirm their specific stack on the audit call instead of implying
//  a logo wall of everything.
// ============================================================================

export interface IntegrationGroup {
  category: string;
  blurb: string;
  tools: string[];       // named tools we genuinely connect to in this category
  note?: string;         // honest caveat, shown small under the group
}

export const integrationGroups: IntegrationGroup[] = [
  {
    category: 'Scheduling & calendars',
    blurb:
      'The receptionist books into the calendar you already run, live during the call — so an appointment is on the books before the caller hangs up.',
    tools: ['Google Calendar', 'Calendly'],
    note: 'On another booking system? We confirm the connection on your audit call before you commit.',
  },
  {
    category: 'Phone & messaging',
    blurb:
      'It answers your business line and sends the missed-call text-backs, so callers reach the same number they always have.',
    tools: ['Your existing business number (forwarded)', 'SMS text-back'],
    note: 'We keep your current number — no new number to advertise.',
  },
  {
    category: 'CRM & follow-up',
    blurb:
      'New callers and booked appointments can flow into your CRM so nothing lives only in someone’s memory or a sticky note.',
    tools: ['CRM hand-off (confirmed per client)'],
    note: 'CRM connections depend on your specific system — we scope and confirm yours during the audit, not before.',
  },
];
