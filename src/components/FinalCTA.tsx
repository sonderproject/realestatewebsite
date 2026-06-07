"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PROJECT_TYPES = [
  "Agent Plan — $197/mo",
  "Apartment Plan — $497/mo",
  "Broker / Company Plan — $997/mo",
  "Not sure — help me choose",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const fieldClass =
    "w-full rounded-xl bg-white/[0.06] border border-white/15 px-4 py-3 text-sm text-warm-50 placeholder:text-warm-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors";

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

      {/* Top gradient: bleeds in from the section above */}
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

      <div className="relative z-10 max-w-2xl mx-auto text-center">
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
          className="text-4xl md:text-6xl font-light text-warm-50 leading-[0.95] mb-6 md:mb-8"
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
          className="text-warm-400 text-sm font-light max-w-lg mx-auto leading-relaxed mb-8 md:mb-10"
        >
          Tell us about your business and we&apos;ll get back to you within one
          business day. No pressure, no obligation.
        </motion.p>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          {status === "success" ? (
            <div className="rounded-2xl border border-gold/30 bg-white/[0.04] px-6 py-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white text-xl">
                ✓
              </div>
              <p
                className="text-warm-50 text-xl font-light mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Thanks — we&apos;ve got it.
              </p>
              <p className="text-warm-400 text-sm font-light">
                We&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input name="name" required placeholder="Your name" className={fieldClass} />
                <input name="email" type="email" required placeholder="Email address" className={fieldClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input name="company" placeholder="Company / brokerage" className={fieldClass} />
                <select name="projectType" defaultValue="" className={`${fieldClass} appearance-none`}>
                  <option value="" disabled className="bg-obsidian">
                    What do you need?
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-obsidian">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us a bit about your project…"
                className={`${fieldClass} mb-4 resize-none`}
              />

              {status === "error" && (
                <p className="text-red-300 text-xs mb-3 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="glass-btn-accent w-full text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-4 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Book a Free Consultation"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16"
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
    </section>
  );
}
