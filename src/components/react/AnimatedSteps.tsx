import { motion, useReducedMotion, type Variants } from "motion/react";

// The How-It-Works steps as a Framer Motion island: reveal-on-scroll with a
// stagger, plus a spring hover-lift per card. Reduced-motion safe.
export interface Step { n: string; title: string; body: string; }

export default function AnimatedSteps({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion();

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

  return (
    <motion.ol
      className="how__grid"
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {steps.map((s) => (
        <motion.li
          key={s.n}
          className="how__step card card--interactive"
          variants={item}
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <span className="how__n mono">{s.n}</span>
          <h3 className="h3" style={{ marginTop: ".6rem" }}>{s.title}</h3>
          <p className="muted" style={{ marginTop: ".5rem" }}>{s.body}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
