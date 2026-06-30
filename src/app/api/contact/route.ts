import { NextResponse } from "next/server";

// Property-media intake handler. Receives a single-property, done-for-you
// request from /get-started: agent contact, property address, photos link,
// and the selected tier. Forwards to a webhook (CRM/Zapier/Slack) if one is
// configured, otherwise logs it.
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      agentName,
      agentEmail,
      agentPhone,
      propertyAddress,
      photosLink,
      tier,
      notes,
    } = data ?? {};

    if (!agentName || !agentEmail || !propertyAddress) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please add your name, email, and the property address.",
        },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(agentEmail))) {
      return NextResponse.json(
        { ok: false, error: "That email doesn't look right." },
        { status: 400 }
      );
    }

    const payload = {
      type: "property-media-intake",
      agentName,
      agentEmail,
      agentPhone: agentPhone ?? "",
      propertyAddress,
      photosLink: photosLink ?? "",
      tier: tier ?? "",
      notes: notes ?? "",
      at: new Date().toISOString(),
    };

    // If a webhook is configured (Zapier/Make/Slack/CRM), forward the intake.
    // Otherwise log it so it shows in server logs.
    // TODO: wire up email (e.g. Resend) or your CRM to actually receive intakes.
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } else {
      console.log("[intake] new property media request", payload);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
