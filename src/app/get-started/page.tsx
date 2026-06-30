import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntakeForm from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Send us your property and we'll produce the media. Pick a package, share the address and photos, and we deliver — done for you in 48 hours.",
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />

      {/* ── Hero heading ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pt-32 pb-10 md:px-8 md:pt-40 md:pb-14">
        <div className="aurora opacity-40" />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-teal md:text-xs">
            Done-for-you intake
          </p>
          <h1
            className="mb-5 text-4xl font-light leading-[1.0] text-cream md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Send us the property.
          </h1>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-cream-dim md:text-base">
            Tell us about one listing, share your photos, and pick a package. We
            produce the media and deliver it to you — typically within 48 hours.
            No platform to learn, no software to set up.
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
