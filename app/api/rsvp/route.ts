import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { Resend } from "resend";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const LIMITS: Record<string, number> = {
  akad: 8,
  syukuran: 20,
};

export async function POST(req: NextRequest) {
  const { event, name, email, guests, dietary, message } = await req.json();

  if (!event || !["akad", "syukuran"].includes(event))
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  if (!name?.trim() || !email?.trim())
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT COALESCE(SUM(guests), 0) AS total FROM rsvp WHERE event = $1",
      [event]
    );
    const current = parseInt(rows[0].total, 10);
    const incoming = guests ?? 1;
    const limit = LIMITS[event];

    if (current + incoming > limit)
      return NextResponse.json(
        { error: `Sorry, we've reached capacity for the ${event === "akad" ? "Akad Nikah" : "Syukuran"}.` },
        { status: 409 }
      );

    await client.query(
      "INSERT INTO rsvp (event, name, email, guests, dietary, message) VALUES ($1, $2, $3, $4, $5, $6)",
      [event, name.trim(), email.trim().toLowerCase(), incoming, dietary ?? null, message ?? null]
    );

    const eventLabel = event === "akad" ? "Akad Nikah" : "Syukuran";
    const guestLabel = incoming === 1 ? "1 person" : `${incoming} people`;

    resend.emails.send({
      from: "wedding@fauzan.rach.es",
      to: "rachesrach@gmail.com",
      subject: `New RSVP — ${eventLabel}`,
      html: `
        <p><strong>${name}</strong> just RSVPed for <strong>${eventLabel}</strong>.</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Attending: ${guestLabel}</li>
          ${message ? `<li>Message: ${message}</li>` : ""}
        </ul>
        <p>Spots remaining: ${limit - current - incoming}</p>
      `,
    }).catch(() => {});

    return NextResponse.json({ ok: true, spots_remaining: limit - current - incoming });
  } finally {
    client.release();
  }
}

export async function GET(req: NextRequest) {
  const event = req.nextUrl.searchParams.get("event");
  if (!event || !["akad", "syukuran"].includes(event))
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT COALESCE(SUM(guests), 0) AS total FROM rsvp WHERE event = $1",
      [event]
    );
    const total = parseInt(rows[0].total, 10);
    return NextResponse.json({ total, limit: LIMITS[event], remaining: LIMITS[event] - total });
  } finally {
    client.release();
  }
}
