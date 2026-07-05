import { NextResponse } from "next/server";

// Project intake handler. Receives a Start-a-Project submission — contact
// details, full property info, uploaded photo/video URLs, and an optional
// media folder link — and forwards it to a webhook (CRM/Zapier/Slack/email)
// if one is configured, otherwise logs it.
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      projectType,
      propertyAddress,
      price,
      beds,
      baths,
      sqft,
      yearBuilt,
      highlights,
      neighborhood,
      timing,
      mls,
      photoLink,
      photoUrls,
      message,
    } = data ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Please add your name and email." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json(
        { ok: false, error: "That email doesn't look right." },
        { status: 400 }
      );
    }

    const urls: string[] = Array.isArray(photoUrls) ? photoUrls : [];

    const payload = {
      type: "project-intake",
      name,
      email,
      phone: phone ?? "",
      projectType: projectType ?? "",
      property: {
        address: propertyAddress ?? "",
        price: price ?? "",
        beds: beds ?? "",
        baths: baths ?? "",
        sqft: sqft ?? "",
        yearBuilt: yearBuilt ?? "",
        mls: mls ?? "",
        highlights: highlights ?? "",
        neighborhood: neighborhood ?? "",
        timing: timing ?? "",
      },
      media: {
        uploadedCount: urls.length,
        uploadedUrls: urls,
        folderLink: photoLink ?? "",
      },
      message: message ?? "",
      at: new Date().toISOString(),
    };

    // If a webhook is configured (Zapier/Make/Slack/CRM/email), forward it.
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
      console.log("[intake] new project intake", JSON.stringify(payload, null, 2));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
