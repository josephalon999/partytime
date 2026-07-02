import { NextRequest, NextResponse } from "next/server";

const RAVPAGE_CLIENT_ID     = process.env.RAVPAGE_CLIENT_ID     || "";
const RAVPAGE_CLIENT_SECRET = process.env.RAVPAGE_CLIENT_SECRET || "";
const RAVPAGE_USER_TOKEN    = process.env.RAVPAGE_USER_TOKEN    || "";
const RAVPAGE_GROUP_ID      = process.env.RAVPAGE_GROUP_ID      || "";

async function getRavPageToken(): Promise<string> {
  const res = await fetch("https://api.ravpage.co.il/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      scope: "*",
      client_id: Number(RAVPAGE_CLIENT_ID),
      client_secret: RAVPAGE_CLIENT_SECRET,
      user_token: RAVPAGE_USER_TOKEN,
    }),
  });
  if (!res.ok) throw new Error(`Token error: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

async function subscribeToGroup(token: string, groupId: string, contact: {
  name: string; phone: string; email: string; package: string; price: string;
}) {
  const res = await fetch(`https://api.ravpage.co.il/v1/groups/${groupId}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      first_name: contact.name,
      email: contact.email,
      phone: contact.phone,
      custom_fields: {
        package: contact.package,
        price: contact.price,
      },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Subscribe error: ${res.status} — ${err}`);
  }
  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, packageName, price } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const token = await getRavPageToken();
    await subscribeToGroup(token, RAVPAGE_GROUP_ID, {
      name, phone, email,
      package: packageName || "",
      price: price || "",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}
