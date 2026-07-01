import { motion, useReducedMotion, type Variants } from "motion/react";
import { site } from "../../config/site";

// Homepage hero as a Framer Motion island. Entrance uses nested variants:
// the column and the demo card stagger in, and the column's own lines stagger.
// Fully reduced-motion safe (opacity-only, no offset/stagger when the user asks).
export default function AnimatedHero() {
  const reduce = useReducedMotion();

  const page: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.05 } },
  };
  const column: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

  return (
    <section className="hero section">
      <motion.div className="container hero__grid" variants={page} initial="hidden" animate="show">
        <motion.div variants={column}>
          <motion.span className="eyebrow" variants={item}>AI Consultant · {site.region}</motion.span>
          <motion.h1 className="h1" style={{ marginTop: "1.1rem" }} variants={item}>
            AI consulting for local businesses — no hype, just systems that pay for themselves.
          </motion.h1>
          <motion.p className="lead" style={{ marginTop: "1.35rem" }} variants={item}>
            Most AI advice is vague. Mine ends with a working system. We start with an audit of your
            operations, pinpoint where automation pays back fastest — usually the calls and bookings
            you're losing — and I build it for you.
          </motion.p>
          <motion.div className="hero__actions" variants={item}>
            <motion.a
              href="/pricing"
              className="btn btn--primary btn--lg"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              Book your AI Audit · ${site.pricing.audit}
            </motion.a>
            <motion.a
              href={site.demoPhoneHref}
              className="btn btn--ghost btn--lg"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <span className="hero__dot" aria-hidden="true" /> Or hear one system live: {site.demoPhone}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.aside
          className="hero__demo card card--accent"
          aria-label="Live demo"
          variants={item}
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <span className="badge">Live · One example</span>
          <p className="h3" style={{ marginTop: "1rem" }}>An AI receptionist I built — call it.</p>
          <p className="muted" style={{ marginTop: ".6rem" }}>
            It answers, holds a real conversation, and books the slot. Just one of the systems I build for local businesses.
          </p>
          <a href={site.demoPhoneHref} className="hero__bignum demo-number">{site.demoPhone}</a>
          <p className="faint mono" style={{ fontSize: ".72rem", letterSpacing: ".1em" }}>30 seconds · no signup</p>
        </motion.aside>
      </motion.div>
    </section>
  );
}
