import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } finally {
    client.release();
  }
}

export async function POST(req: NextRequest) {
  const { name, message } = await req.json();

  if (!name?.trim() || !message?.trim())
    return NextResponse.json({ error: "Name and message are required" }, { status: 400 });

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "INSERT INTO wishes (name, message) VALUES ($1, $2) RETURNING id, name, message, created_at",
      [name.trim(), message.trim()]
    );
    return NextResponse.json(rows[0]);
  } finally {
    client.release();
  }
}
