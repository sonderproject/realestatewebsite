"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Project types buyers can pick — maps to the blueprint's ideal clients.
const PROJECT_TYPES = [
  "Luxury home / estate",
  "Residential listing",
  "New development / community",
  "Boutique hotel / hospitality",
  "Something else",
];

// What every experience includes — shown alongside the form for reassurance.
const INCLUDED = [
  "Cinematic AI property film",
  "Interactive property walkthrough",
  "Premium property microsite",
  "Full gallery, features & floor plans",
  "Neighborhood, maps & lead capture",
  "Shareable link & QR code",
];

export default function GetStartedPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const propertyAddress = String(fd.get("propertyAddress") ?? "");
    const projectType = String(fd.get("projectType") ?? "");
    const details = String(fd.get("details") ?? "");

    // Compose a single message the existing /api/contact endpoint forwards.
    const message = [
      propertyAddress && `Property: ${propertyAddress}`,
      phone && `Phone: ${phone}`,
      details && `\n${details}`,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          projectType,
          message: message || "(no details provided)",
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-warm-50 placeholder:text-warm-500 transition-colors focus:border-gold/50 focus:outline-none";

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />

      {/* ── Hero heading ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-8 px-5 md:pt-36 md:pb-10 md:px-16">
        <div className="aurora opacity-40" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Start a Project
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light text-warm-50 leading-[1.0] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tell us about the property.
          </h1>
          <p className="text-warm-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
            Share the property and a few details, and we&apos;ll come back with next
            steps and a quote. Projects start at $1,500+.{" "}
            <Link
              href="/#contact"
              className="text-gold-light hover:text-gold underline underline-offset-2 transition-colors duration-200"
            >
              Prefer to talk? Book a call.
            </Link>
          </p>
        </motion.div>
      </section>

      {/* ── Form + included ──────────────────────────────────────────── */}
      <section className="px-5 pb-20 md:px-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {status === "sent" ? (
              <div className="rounded-3xl border border-gold/25 bg-white/[0.03] p-8 md:p-10 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold text-xl">
                  ✓
                </div>
                <h2
                  className="text-2xl font-light text-warm-50 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Got it — we&apos;re on it.
                </h2>
                <p className="text-warm-400 text-sm font-light leading-relaxed max-w-md mx-auto">
                  We&apos;ll review the property and get back to you within one
                  business day. Want to talk sooner?{" "}
                  <Link
                    href="/#contact"
                    className="text-gold-light hover:text-gold underline underline-offset-2"
                  >
                    Book a call.
                  </Link>
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs tracking-[0.15em] uppercase text-warm-400">
                      Your name *
                    </span>
                    <input name="name" required autoComplete="name" className={field} placeholder="Jordan Ellis" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs tracking-[0.15em] uppercase text-warm-400">
                      Email *
                    </span>
                    <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@email.com" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs tracking-[0.15em] uppercase text-warm-400">
                      Phone
                    </span>
                    <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="(555) 000-0000" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs tracking-[0.15em] uppercase text-warm-400">
                      Project type
                    </span>
                    <select name="projectType" defaultValue={PROJECT_TYPES[0]} className={field}>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-obsidian">
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-xs tracking-[0.15em] uppercase text-warm-400">
                      Property address
                    </span>
                    <input name="propertyAddress" className={field} placeholder="3792 Vista Point" />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-1.5 block text-xs tracking-[0.15em] uppercase text-warm-400">
                      Anything we should know?
                    </span>
                    <textarea name="details" rows={4} className={field} placeholder="Launch timing, standout features, links to photos or video…" />
                  </label>
                </div>

                {status === "error" && (
                  <p role="alert" className="mt-4 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glass-btn-accent mt-6 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-white disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send project details →"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Included sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-5 font-medium">
              Every experience includes
            </p>
            <ul className="flex flex-col gap-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gold-light text-sm mt-0.5 shrink-0">✓</span>
                  <span className="text-warm-200 text-sm font-light leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-warm-500 text-xs font-light leading-relaxed mt-6 border-t border-white/10 pt-6">
              One property, one experience, produced end to end. When the property
              sells, the project is complete — no subscriptions, no revenue share.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
