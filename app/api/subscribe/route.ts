import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Responder (graph.responder.live) ────────────────────────────────────────

const RESPONDER_CLIENT_ID     = process.env.RESPONDER_CLIENT_ID     || "";
const RESPONDER_CLIENT_SECRET = process.env.RESPONDER_CLIENT_SECRET || "";
const RESPONDER_USER_TOKEN    = process.env.RESPONDER_USER_TOKEN    || "";
const RESPONDER_LIST_ID       = process.env.RESPONDER_LIST_ID       || "";

async function getResponderToken(): Promise<string> {
  const res = await fetch("https://graph.responder.live/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      scope: "*",
      client_id: Number(RESPONDER_CLIENT_ID),
      client_secret: RESPONDER_CLIENT_SECRET,
      user_token: RESPONDER_USER_TOKEN,
    }),
  });
  if (!res.ok) throw new Error(`Responder token error: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

async function addToResponder(contact: {
  name: string; phone: string; email: string; packageName: string; price: string;
}) {
  const token = await getResponderToken();
  const res = await fetch(`https://graph.responder.live/v1/lists/${RESPONDER_LIST_ID}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: contact.email,
      first_name: contact.name,
      phone: contact.phone,
      custom_fields: {
        package: contact.packageName,
        price: contact.price,
      },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Responder subscribe error: ${res.status} — ${err}`);
  }
  return res.json();
}

// ─── Gmail backup email ───────────────────────────────────────────────────────

async function sendBackupEmail(contact: {
  name: string; phone: string; email: string; packageName: string; price: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER || "josephalon999@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD || "",
    },
  });

  await transporter.sendMail({
    from: `"Party Time לגברים" <${process.env.GMAIL_USER || "josephalon999@gmail.com"}>`,
    to: "josephalon999@gmail.com",
    subject: `🕺 ליד חדש — ${contact.packageName} (${contact.price}₪)`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #06060f; color: #f0f0f0; padding: 24px; border-radius: 12px;">
        <h2 style="color: #a855f7; margin-bottom: 16px;">🕺 ליד חדש — Party Time לגברים</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #9ca3af;">שם:</td><td style="padding: 8px 0; color: #f0f0f0; font-weight: bold;">${contact.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">טלפון:</td><td style="padding: 8px 0; color: #f0f0f0; font-weight: bold;">${contact.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">אימייל:</td><td style="padding: 8px 0; color: #f0f0f0; font-weight: bold;">${contact.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">מסלול:</td><td style="padding: 8px 0; color: #ec4899; font-weight: bold;">${contact.packageName}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">מחיר:</td><td style="padding: 8px 0; color: #a855f7; font-weight: bold;">${contact.price}₪</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">תאריך:</td><td style="padding: 8px 0; color: #f0f0f0;">${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}</td></tr>
        </table>
        <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">הודעה זו נשלחה אוטומטית מדף Party Time לגברים</p>
      </div>
    `,
  });
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, packageName, price } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const contact = { name, phone, email, packageName: packageName || "", price: price || "" };

    // שניהם רצים במקביל ברקע — לא חוסמים את התשובה
    const results = await Promise.allSettled([
      addToResponder(contact),
      sendBackupEmail(contact),
    ]);

    const responderOk = results[0].status === "fulfilled";
    const emailOk     = results[1].status === "fulfilled";

    if (!responderOk) console.error("[Responder]", (results[0] as PromiseRejectedResult).reason);
    if (!emailOk)     console.error("[Email]",     (results[1] as PromiseRejectedResult).reason);

    // תמיד מחזיר 200 — הלקוח עובר לתשלום בכל מקרה
    return NextResponse.json({ ok: true, responderOk, emailOk });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}
