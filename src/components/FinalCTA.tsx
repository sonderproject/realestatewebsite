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
      className="relative bg-gradient-to-b from-ocean-deep via-obsidian to-obsidian py-16 px-5 md:py-28 md:px-16 overflow-hidden"
    >
      {/* Subtle ocean-diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 60px,
            rgba(74,143,168,0.6) 60px,
            rgba(74,143,168,0.6) 61px
          )`,
        }}
      />

      {/* Top gradient: bleeds in from the ocean section above */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ocean-dark/40 to-transparent" />

      {/* Large background word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[22vw] font-light text-ocean/5 whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sonder
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light"
        >
          Start Your Project
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-warm-50 leading-[0.95] mb-6 md:mb-10"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your market deserves
          <br />
          <em className="text-gold-light font-normal">better than a template.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-warm-400 text-sm font-light max-w-lg mx-auto leading-relaxed mb-8 md:mb-12"
        >
          We work with a limited number of clients each quarter to make sure every
          project gets the attention it deserves. Book your free consultation today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="mailto:hello@sonderstudio.com"
            className="bg-gold text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium hover:bg-gold-light transition-all duration-300 shadow-xl shadow-gold/25 w-full sm:w-auto text-center"
          >
            Book a Free Consultation
          </a>
          <a
            href="#work"
            className="border border-white/25 text-warm-200 text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto text-center"
          >
            See Our Work
          </a>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16"
        >
          {[
            { label: "Phone", value: "+1 (619) 555-0100" },
            { label: "Email", value: "hello@sonderstudio.com" },
            { label: "Office", value: "La Jolla, San Diego CA" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-ocean-light/50 text-[10px] tracking-[0.3em] uppercase mb-1">
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
        className="relative z-10 mt-14 md:mt-20 pt-7 md:pt-10 border-t border-warm-700/20 flex flex-col md:flex-row items-center justify-between gap-3"
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
    </section>
  );
}
