"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-obsidian py-40 px-8 md:px-20 overflow-hidden"
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 80px,
            rgba(200,169,110,0.5) 80px,
            rgba(200,169,110,0.5) 81px
          )`,
        }}
      />

      {/* Large background word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[20vw] font-light text-warm-800/10 whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Meridian
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-gold text-xs tracking-[0.4em] uppercase mb-8 font-light"
        >
          Begin Your Search
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-5xl md:text-7xl font-light text-warm-50 leading-[0.95] mb-10"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your next chapter
          <br />
          <em className="text-warm-200">starts with one call.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-warm-400 text-sm font-light max-w-lg mx-auto leading-relaxed mb-14"
        >
          We work with a limited number of clients each quarter to ensure every
          transaction receives the attention it deserves. Reserve your consultation today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@meridianproperties.com"
            className="bg-gold text-obsidian text-xs tracking-[0.3em] uppercase px-12 py-5 font-medium hover:bg-gold-light transition-all duration-300 w-full sm:w-auto text-center"
          >
            Schedule Consultation
          </a>
          <a
            href="#listings"
            className="border border-warm-600 text-warm-300 text-xs tracking-[0.3em] uppercase px-10 py-5 hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto text-center"
          >
            Browse Listings
          </a>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { label: "Phone", value: "+1 (619) 555-0100" },
            { label: "Email", value: "hello@meridianproperties.com" },
            { label: "Office", value: "La Jolla, San Diego CA" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-warm-600 text-[10px] tracking-[0.3em] uppercase mb-1">
                {label}
              </p>
              <p className="text-warm-300 text-sm font-light">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="relative z-10 mt-32 pt-10 border-t border-warm-700/20 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <p className="text-warm-600 text-xs font-light tracking-wider">
          © 2025 Meridian Properties. All rights reserved.
        </p>
        <p className="text-warm-700 text-[10px] tracking-[0.2em] uppercase">
          Designed by{" "}
          <a
            href="https://sonderproject.com"
            className="text-warm-500 hover:text-gold transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sonder Project
          </a>
        </p>
      </motion.div>
    </section>
  );
}
