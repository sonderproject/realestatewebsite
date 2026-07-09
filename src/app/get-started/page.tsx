"use client";

import { useCallback, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MediaUploader from "@/components/MediaUploader";

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
  "Cinematic property film",
  "Premium digital property experience",
  "Interactive 3D floor plan",
  "Luxury property story & curated gallery",
  "Mobile-first design & lead capture",
  "Shareable property link + QR code",
];

export default function GetStartedPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Stable callback so MediaUploader's effect doesn't re-fire each render.
  const handleUrls = useCallback((urls: string[]) => setPhotoUrls(urls), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          projectType: get("projectType"),
          propertyAddress: get("propertyAddress"),
          price: get("price"),
          beds: get("beds"),
          baths: get("baths"),
          sqft: get("sqft"),
          yearBuilt: get("yearBuilt"),
          mls: get("mls"),
          highlights: get("highlights"),
          neighborhood: get("neighborhood"),
          timing: get("timing"),
          photoLink: get("photoLink"),
          photoUrls,
          message: get("details"),
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-warm-50 placeholder:text-warm-500 transition-colors focus:border-gold/50 focus:outline-none";
  const label =
    "mb-1.5 block text-xs tracking-[0.15em] uppercase text-warm-400";
  const groupTitle =
    "text-gold text-[10px] tracking-[0.4em] uppercase font-medium";

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
            Tell us everything.
          </h1>
          <p className="text-warm-300 text-base md:text-lg font-normal leading-relaxed max-w-xl">
            The more you share, the more we can build without ever needing a
            call. Send the property details and upload as many photos and videos
            as you have — we take it from there. Starting at $2,497 per property.{" "}
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
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 items-start">
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
                <p className="text-warm-300 text-sm font-normal leading-relaxed max-w-md mx-auto">
                  We have everything we need to get started and will reach out
                  within one business day. Thanks for the detail — it&apos;s
                  exactly what makes a great experience.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
              >
                {/* Your details */}
                <div>
                  <p className={`${groupTitle} mb-4`}>Your details</p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className={label}>Your name *</span>
                      <input name="name" required autoComplete="name" className={field} placeholder="Jordan Ellis" />
                    </label>
                    <label className="block">
                      <span className={label}>Email *</span>
                      <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@email.com" />
                    </label>
                    <label className="block">
                      <span className={label}>Phone</span>
                      <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="(555) 000-0000" />
                    </label>
                    <label className="block">
                      <span className={label}>Project type</span>
                      <select name="projectType" defaultValue={PROJECT_TYPES[0]} className={field}>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-obsidian">
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                {/* The property */}
                <div className="border-t border-white/10 pt-8">
                  <p className={`${groupTitle} mb-4`}>The property</p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block md:col-span-2">
                      <span className={label}>Property address</span>
                      <input name="propertyAddress" className={field} placeholder="3792 Vista Point, La Jolla, CA" />
                    </label>
                    <label className="block">
                      <span className={label}>List price</span>
                      <input name="price" className={field} placeholder="$4,850,000" />
                    </label>
                    <label className="block">
                      <span className={label}>MLS # (if listed)</span>
                      <input name="mls" className={field} placeholder="Optional" />
                    </label>
                    <label className="block">
                      <span className={label}>Beds</span>
                      <input name="beds" inputMode="numeric" className={field} placeholder="5" />
                    </label>
                    <label className="block">
                      <span className={label}>Baths</span>
                      <input name="baths" inputMode="decimal" className={field} placeholder="6" />
                    </label>
                    <label className="block">
                      <span className={label}>Square footage</span>
                      <input name="sqft" inputMode="numeric" className={field} placeholder="7,200" />
                    </label>
                    <label className="block">
                      <span className={label}>Year built</span>
                      <input name="yearBuilt" inputMode="numeric" className={field} placeholder="2022" />
                    </label>
                    <label className="block md:col-span-2">
                      <span className={label}>Standout features</span>
                      <textarea name="highlights" rows={3} className={field} placeholder="Infinity pool, chef's kitchen, primary suite & spa, home theater, smart-home system…" />
                    </label>
                    <label className="block md:col-span-2">
                      <span className={label}>Neighborhood &amp; lifestyle</span>
                      <textarea name="neighborhood" rows={2} className={field} placeholder="What's nearby, the setting, the lifestyle a buyer is really buying into." />
                    </label>
                    <label className="block md:col-span-2">
                      <span className={label}>Launch timing / deadline</span>
                      <input name="timing" className={field} placeholder="Going live in 3 weeks, coming-soon, flexible…" />
                    </label>
                  </div>
                </div>

                {/* Photos & media */}
                <div className="border-t border-white/10 pt-8">
                  <p className={`${groupTitle} mb-1.5`}>Photos &amp; media</p>
                  <p className="text-warm-400 text-sm font-light leading-relaxed mb-4">
                    Upload everything you have — photos, phone videos, drone
                    footage, floor plans. There&apos;s no limit, and more is
                    always better.
                  </p>

                  <MediaUploader onChange={handleUrls} />

                  <label className="mt-5 block">
                    <span className={label}>Or paste a folder link</span>
                    <input name="photoLink" type="url" className={field} placeholder="Dropbox, Google Drive, or WeTransfer link" />
                  </label>

                  <label className="mt-5 block">
                    <span className={label}>Anything else we should know?</span>
                    <textarea name="details" rows={3} className={field} placeholder="The story of the home, who it's for, or anything that would help us." />
                  </label>
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glass-btn-accent flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-white disabled:opacity-60"
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
            className="lg:sticky lg:top-28 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
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
