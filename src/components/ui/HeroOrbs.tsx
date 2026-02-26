"use client";

import { motion } from "framer-motion";

export default function HeroOrbs() {
  return (
    <div className="hero-orbs" aria-hidden>
      <motion.div
        className="orb orb-a"
        animate={{ x: [0, 26, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-b"
        animate={{ x: [0, -24, 0], y: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div
        className="orb orb-c"
        animate={{ x: [0, 16, 0], y: [0, -14, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  );
}
