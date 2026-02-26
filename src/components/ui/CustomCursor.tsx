"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const ringX = useSpring(rawX, { stiffness: 280, damping: 26, mass: 0.35 });
  const ringY = useSpring(rawY, { stiffness: 280, damping: 26, mass: 0.35 });

  const dotX = useSpring(rawX, { stiffness: 550, damping: 34, mass: 0.2 });
  const dotY = useSpring(rawY, { stiffness: 550, damping: 34, mass: 0.2 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches && window.innerWidth >= 1024);

    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("cursor-enhanced");
      return;
    }

    document.body.classList.add("cursor-enhanced");
    return () => document.body.classList.remove("cursor-enhanced");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor],a,button,[role='button']");

      if (!interactive) {
        setLabel("");
        return;
      }

      if (interactive.dataset.cursor) {
        setLabel(interactive.dataset.cursor);
        return;
      }

      setLabel("Open");
    };

    const handleLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <div className="cursor-layer" aria-hidden>
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: label ? 1.45 : 1,
        }}
      />
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: label ? 0.78 : 1,
        }}
      />

      <AnimatePresence>
        {visible && label ? (
          <motion.div
            key={label}
            className="cursor-label"
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
          >
            {label}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
