//! Framer Motion only use in Client component

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Reusable scroll-aware animation block
export const AnimatedBlock = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};
