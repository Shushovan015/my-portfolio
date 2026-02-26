"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "portfolio-loader-seen";

export default function PageLoader() {
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem(STORAGE_KEY);
  });

  const letters = useMemo(() => "SHUSHOVAN SHAKYA".split(""), []);

  useEffect(() => {
    if (!show) return;

    window.sessionStorage.setItem(STORAGE_KEY, "1");
    const timer = window.setTimeout(() => {
      setShow(false);
    }, 1850);

    return () => window.clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
        >
          <motion.div
            className="loader-box"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="loader-dots">
              <span className="dot bg-[var(--accent-2)]" />
              <span className="dot bg-[var(--accent)]" />
              <span className="dot bg-[var(--ok)]" />
            </div>

            <p className="loader-name">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.22 }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </p>

            <motion.div
              className="loader-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />

            <p className="loader-sub">Initializing frontend portfolio runtime...</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
