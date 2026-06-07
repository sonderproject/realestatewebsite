"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Site-wide footer. Extracted so every page (home, photography, ai-assistant)
// shares the exact same closing bar without duplicating markup.
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <footer ref={ref} className="bg-obsidian px-5 md:px-16 pb-10 md:pb-14">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-6xl pt-7 md:pt-10 border-t border-warm-700/20 flex flex-col md:flex-row items-center justify-between gap-3"
      >
        <p className="text-warm-600 text-xs font-light tracking-wider">
          © 2025 Sonder Studio. All rights reserved.
        </p>
        <p className="text-warm-700 text-[10px] tracking-[0.2em] uppercase">
          <a
            href="https://sonderproject.com"
            className="text-warm-500 hover:text-gold transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            sonderproject.com
          </a>
        </p>
      </motion.div>
    </footer>
  );
}
