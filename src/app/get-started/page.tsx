import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntakeForm from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Send us your property and we'll produce the experience. Share the address and photos, and we build the premium property website, cinematic walkthrough, and interactive virtual tour.",
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />

      {/* ── Hero heading ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pt-32 pb-10 md:px-8 md:pt-40 md:pb-14">
        <div className="aurora opacity-40" />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="mb-5 flex justify-center">
            <span className="rounded-full border border-cream/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-teal md:text-sm">
              Property intake
            </span>
          </p>
          <h1
            className="mb-5 text-4xl font-semibold leading-[1.05] tracking-tight text-cream md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Send us the property.
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-cream-dim">
            Tell us about one listing and share your photos. We produce the
            complete property experience — website, cinematic walkthrough, and
            virtual tour — and hand you a single shareable link. No platform to
            learn, no software to set up.
          </p>
        </div>
      </section>

      {/* ── Intake form (reads ?tier= to preselect) ───────────────────── */}
      <Suspense fallback={null}>
        <IntakeForm />
      </Suspense>

      <Footer />
    </div>
  );
}
