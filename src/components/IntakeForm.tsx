"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { visibleTiers } from "@/config/site";

// ── Single-property, done-for-you media intake ──────────────────────────────
// Collects: agent contact, property address, a link to photos, and the
// selected tier. Posts to /api/contact (the property-media intake handler).
//
// The selected tier preloads from the ?tier= query param so the pricing CTAs
// (/get-started?tier=flagship) land on the right package.
//
// NOTE: agents who'd rather talk first are pointed to the Cal.com booking embed
// on the homepage (#contact) — that embed is intentionally kept.

type Status = "idle" | "submitting" | "success" | "error";

export default function IntakeForm() {
  const params = useSearchParams();
  const initialTier =
    visibleTiers.find((t) => t.id === params.get("tier"))?.id ??
    visibleTiers[0]?.id ??
    "";

  const [tier, setTier] = useState(initialTier);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      agentName: fd.get("agentName"),
      agentEmail: fd.get("agentEmail"),
      agentPhone: fd.get("agentPhone"),
      propertyAddress: fd.get("propertyAddress"),
      photosLink: fd.get("photosLink"),
      tier,
      notes: fd.get("notes"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl rounded-3xl border border-teal/25 bg-navy-800/60 p-10 text-center"
        >
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-xl text-navy-deep">
            ✓
          </div>
          <h2
            className="mb-3 text-2xl font-light text-cream"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Got it — we&apos;re on it.
          </h2>
          <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-cream-dim">
            Thanks for the details. We&apos;ll review your property and reply by
            email shortly to confirm next steps and where to send your full-res
            photos. Most listings are delivered within 48 hours.
          </p>
          <Link
            href="/"
            className="glass-btn mt-7 inline-block rounded-full px-7 py-3 text-xs font-medium uppercase tracking-[0.15em] text-cream"
          >
            Back home
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="px-5 pb-24 md:px-8 md:pb-32">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-3xl border border-teal/15 bg-navy-800/50 p-6 md:p-9"
      >
        {/* Tier selection */}
        <fieldset className="mb-8">
          <legend className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-teal">
            1 · Choose a package
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {visibleTiers.map((t) => {
              const selected = tier === t.id;
              return (
                <label
                  key={t.id}
                  className={`cursor-pointer rounded-2xl border p-4 transition-colors duration-200 ${
                    selected
                      ? "border-teal/60 bg-navy-600/50"
                      : "border-teal/10 bg-navy-900/40 hover:border-teal/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="tierRadio"
                    value={t.id}
                    checked={selected}
                    onChange={() => setTier(t.id)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-normal text-cream"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t.name}
                    </span>
                    <span className="text-sm font-light text-teal">{t.price}</span>
                  </div>
                  <p className="mt-1 text-xs font-light text-cream-faint">
                    {t.tagline}
                  </p>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Property */}
        <fieldset className="mb-8">
          <legend className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-teal">
            2 · The property
          </legend>
          <Field
            label="Property address"
            name="propertyAddress"
            placeholder="123 Ocean View Dr, San Diego, CA"
            required
          />
          <Field
            label="Link to photos"
            name="photosLink"
            type="url"
            placeholder="Google Drive / Dropbox link (optional — we'll confirm where to send them)"
          />
        </fieldset>

        {/* Agent contact */}
        <fieldset className="mb-8">
          <legend className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-teal">
            3 · Your details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="agentName" placeholder="Jane Agent" required />
            <Field
              label="Email"
              name="agentEmail"
              type="email"
              placeholder="jane@brokerage.com"
              required
            />
          </div>
          <Field
            label="Phone"
            name="agentPhone"
            type="tel"
            placeholder="(optional)"
          />
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-light text-cream-dim">
              Anything else?
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Vacant / fixer-upper? Deadlines? Special requests?"
              className="w-full rounded-xl border border-teal/15 bg-navy-900/60 px-4 py-3 text-sm font-light text-cream placeholder:text-cream-faint/60 focus:border-teal/50 focus:outline-none"
            />
          </div>
        </fieldset>

        {status === "error" && (
          <p className="mb-4 text-sm font-light text-red-300">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="cta-shine glass-btn-accent w-full rounded-full px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-navy-deep disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit listing →"}
        </button>

        <p className="mt-5 text-center text-xs font-light leading-relaxed text-cream-faint">
          Prefer to talk it through first?{" "}
          <Link
            href="/#contact"
            className="text-teal underline underline-offset-2 hover:text-teal-light"
          >
            Book a call
          </Link>{" "}
          — the booking calendar is on the homepage.
        </p>
      </form>
    </section>
  );
}

// Small labeled text input used throughout the intake.
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <label htmlFor={name} className="mb-1.5 block text-xs font-light text-cream-dim">
        {label}
        {required && <span className="ml-1 text-teal">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-teal/15 bg-navy-900/60 px-4 py-3 text-sm font-light text-cream placeholder:text-cream-faint/60 focus:border-teal/50 focus:outline-none"
      />
    </div>
  );
}
