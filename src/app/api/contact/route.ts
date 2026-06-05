import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, projectType, message } = data ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in your name, email, and a message." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json(
        { ok: false, error: "That email doesn't look right." },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      company: company ?? "",
      projectType: projectType ?? "",
      message,
      at: new Date().toISOString(),
    };

    // If a webhook is configured (Zapier/Make/Slack/CRM), forward the lead there.
    // Otherwise log it so it shows in server logs.
    // TODO: wire up email (e.g. Resend) or your CRM to actually receive leads.
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } else {
      console.log("[contact] new lead", payload);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
