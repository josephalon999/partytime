import { NextResponse } from "next/server";

const RAVPAGE_CLIENT_ID     = process.env.RAVPAGE_CLIENT_ID     || "";
const RAVPAGE_CLIENT_SECRET = process.env.RAVPAGE_CLIENT_SECRET || "";
const RAVPAGE_USER_TOKEN    = process.env.RAVPAGE_USER_TOKEN    || "";

export async function GET() {
  try {
    const tokenRes = await fetch("https://api.ravpage.co.il/oauth/token", {
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
    const tokenText = await tokenRes.text();
    if (!tokenRes.ok) return NextResponse.json({ step: "token", status: tokenRes.status, body: tokenText });

    const { access_token } = JSON.parse(tokenText);

    const groupsRes = await fetch("https://api.ravpage.co.il/v1/groups", {
      headers: { "Authorization": `Bearer ${access_token}`, "Accept": "application/json" },
    });
    const groupsText = await groupsRes.text();
    return NextResponse.json({ step: "groups", status: groupsRes.status, body: groupsText });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
