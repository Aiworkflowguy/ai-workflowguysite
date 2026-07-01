// ============================================================================
//  INDUSTRIES CONFIG — the /industries hub and every per-vertical page are
//  generated from this one array (see src/pages/industries/[slug].astro).
//  Add a vertical here and its page builds itself. No hardcoded copy in pages.
//
//  RULE: no fabricated statistics. The "pain" is framed by logic every owner
//  already knows (a missed call is a booking a competitor gets), never invented
//  percentages or dollar figures.
// ============================================================================

export interface Vertical {
  slug: string;        // URL: /industries/<slug>
  short: string;       // nav / card label, e.g. "Dental"
  name: string;        // full name, e.g. "Dental practices"
  eyebrow: string;     // mono label at top of the page
  lostUnit: string;    // what a missed call costs them — "a new patient"
  headline: string;    // page H1
  intro: string;       // lead paragraph under the H1
  pains: string[];     // the specific ways calls leak revenue in this vertical
  handles: { title: string; body: string }[]; // what the receptionist does for them
  outcome: string;     // the one-line payoff
}

export const industries: Vertical[] = [
  {
    slug: 'dental',
    short: 'Dental',
    name: 'Dental practices',
    eyebrow: 'For dental & orthodontic practices',
    lostUnit: 'a new patient',
    headline: 'Every unanswered call is a new patient booking with someone else.',
    intro:
      'Your front desk is chairside, at lunch, or already on another line — and the new patient calling to book doesn’t leave a voicemail. They call the next practice. An AI receptionist answers all of it, so a full schedule doesn’t depend on perfect timing at the desk.',
    pains: [
      'New-patient calls hit voicemail while the team is with a patient in the chair.',
      'After-hours and lunchtime calls go unanswered — exactly when people book personal appointments.',
      'A no-show slot sits empty because the waitlist never got called back.',
    ],
    handles: [
      { title: 'Books new patients live', body: 'Answers, screens for the visit type, and puts the appointment on the calendar during the call — not a callback later.' },
      { title: 'Answers the routine questions', body: 'Hours, location, insurance-accepted, "do you take walk-ins" — handled instantly so the front desk isn’t interrupted.' },
      { title: 'Texts back missed calls', body: 'Any call the team genuinely can’t take gets an instant text so the patient books with you instead of searching again.' },
    ],
    outcome: 'A schedule that fills itself, without adding a second person to the front desk.',
  },
  {
    slug: 'hvac',
    short: 'HVAC & Home Services',
    name: 'HVAC & home services',
    eyebrow: 'For HVAC, plumbing & home-service pros',
    lostUnit: 'a booked job',
    headline: 'You’re on a roof or under a sink. The next job is calling right now.',
    intro:
      'When you’re on a job you can’t answer the phone, and a homeowner with a broken AC or a leak isn’t leaving a voicemail — they’re calling the next company on the list. An AI receptionist answers every call, qualifies it, and books the visit while you keep working.',
    pains: [
      'Calls come in while you’re hands-deep in a job and can’t pick up.',
      'Emergency calls at night and on weekends go straight to the competitor who answers.',
      'You spend evenings calling people back who already hired someone else.',
    ],
    handles: [
      { title: 'Captures the emergency call', body: 'Answers 24/7, gets the address and the problem, and books the service window — even at 11pm on a Sunday.' },
      { title: 'Qualifies before you drive', body: 'Asks the questions you’d ask — service area, job type, urgency — so you’re not quoting tire-kickers.' },
      { title: 'Texts back missed calls', body: 'Every call you can’t take gets an instant text so the lead stays yours instead of going cold.' },
    ],
    outcome: 'You stay on the tools, and the phone still turns into booked jobs.',
  },
  {
    slug: 'gyms',
    short: 'Gyms & Studios',
    name: 'Gyms & fitness studios',
    eyebrow: 'For gyms, studios & personal trainers',
    lostUnit: 'a new member',
    headline: 'The person ready to join today won’t call back tomorrow.',
    intro:
      'Fitness intent is a spike, not a plan — someone decides to join and wants to book a tour or a first class now. If the front desk is running a session and misses the call, that motivation is gone by the time you call back. An AI receptionist catches it while it’s hot.',
    pains: [
      'Calls come in mid-class when there’s no one at the desk to answer.',
      'Prospects want to book a tour or intro class immediately, and momentum fades fast.',
      'Membership and pricing questions go unanswered after hours.',
    ],
    handles: [
      { title: 'Books tours & intro classes', body: 'Answers, explains the intro offer, and schedules the first visit on the spot while the prospect is motivated.' },
      { title: 'Handles membership questions', body: 'Pricing, class schedule, what to bring — answered 24/7 without pulling a trainer off the floor.' },
      { title: 'Texts back missed calls', body: 'Any missed call gets an instant text so a hot prospect books with you, not the studio down the street.' },
    ],
    outcome: 'More tours booked, fewer leads lost to a busy front desk.',
  },
  {
    slug: 'med-spas',
    short: 'Med Spas',
    name: 'Med spas & aesthetics',
    eyebrow: 'For med spas & aesthetic clinics',
    lostUnit: 'a high-value client',
    headline: 'High-value bookings shouldn’t hinge on catching the phone.',
    intro:
      'Aesthetic clients research, then call ready to book a consultation for a treatment worth far more than a single visit. If that call lands in voicemail, it lands with a competitor instead. An AI receptionist answers with the right tone and books the consult live.',
    pains: [
      'Consultation calls for high-ticket treatments go to voicemail during appointments.',
      'Clients expect a polished, immediate response — silence reads as "not the right place."',
      'After-hours interest cools before anyone can follow up the next day.',
    ],
    handles: [
      { title: 'Books consultations live', body: 'Answers professionally, matches the inquiry to the right service, and schedules the consult during the call.' },
      { title: 'Answers treatment questions', body: 'What you offer, pricing ranges, prep and downtime basics — handled instantly and on-brand.' },
      { title: 'Texts back missed calls', body: 'Every missed call gets an instant, on-brand text so a high-value client doesn’t book elsewhere.' },
    ],
    outcome: 'A polished front door for high-ticket bookings, answering every time.',
  },
  {
    slug: 'salons',
    short: 'Salons & Barbershops',
    name: 'Salons & barbershops',
    eyebrow: 'For salons, barbershops & spas',
    lostUnit: 'a booked chair',
    headline: 'When your hands are busy, the phone is booking your competitor.',
    intro:
      'You can’t stop mid-cut to answer the phone, and the client calling to book won’t wait — they’ll book wherever picks up. An AI receptionist answers every call, books the chair, and fills cancellations, so a missed call never means an empty seat.',
    pains: [
      'Calls come in while every stylist is mid-service with no one free to answer.',
      'Booking and rescheduling calls pile up and go unanswered.',
      'A last-minute cancellation leaves a chair empty because the waitlist never got a call.',
    ],
    handles: [
      { title: 'Books & reschedules the chair', body: 'Answers, finds the right stylist and time, and books it live — no callback, no missed slot.' },
      { title: 'Answers the basics', body: 'Hours, services, pricing, walk-in availability — handled instantly so stylists stay with clients.' },
      { title: 'Texts back missed calls', body: 'Every missed call gets an instant text so the client books with you instead of the next shop.' },
    ],
    outcome: 'Full chairs, without anyone stepping away from a client to answer the phone.',
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return industries.find((v) => v.slug === slug);
}
