import { Pool } from "pg";

const LIMITS: Record<string, number> = {
  akad: 8,
  syukuran: 20,
};

interface RSVPRow {
  id: number;
  event: string;
  name: string;
  email: string;
  guests: number;
  dietary: string | null;
  message: string | null;
  created_at: string | null;
}

async function fetchAttendance(): Promise<RSVPRow[]> {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });
  const client = await pool.connect();
  try {
    const { rows } = await client.query<RSVPRow>(
      "SELECT * FROM rsvp ORDER BY event, created_at ASC"
    );
    return rows;
  } finally {
    client.release();
    await pool.end();
  }
}

function EventTable({ rows, event }: { rows: RSVPRow[]; event: string }) {
  const limit = LIMITS[event] ?? "?";
  const totalGuests = rows.reduce((sum, r) => sum + r.guests, 0);
  const label = event === "akad" ? "Akad Nikah" : "Syukuran";

  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{label}</h2>
        <span className="text-sm text-gray-500">
          {totalGuests} / {limit} guests · {rows.length} RSVPs
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No RSVPs yet.</p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Guests</th>
                <th className="px-4 py-2 text-left">Dietary</th>
                <th className="px-4 py-2 text-left">Message</th>
                {rows.some((r) => r.created_at) && (
                  <th className="px-4 py-2 text-left">Submitted</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, i) => (
                <tr key={row.id ?? i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-2 text-gray-600">{row.email}</td>
                  <td className="px-4 py-2 text-center">{row.guests}</td>
                  <td className="px-4 py-2 text-gray-500">{row.dietary ?? "—"}</td>
                  <td className="px-4 py-2 text-gray-500 max-w-xs truncate">
                    {row.message ?? "—"}
                  </td>
                  {rows.some((r) => r.created_at) && (
                    <td className="px-4 py-2 text-gray-400 whitespace-nowrap">
                      {row.created_at
                        ? new Date(row.created_at).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default async function AttendancePage() {
  let rows: RSVPRow[] = [];
  let error: string | null = null;

  try {
    rows = await fetchAttendance();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  const byEvent: Record<string, RSVPRow[]> = { akad: [], syukuran: [] };
  for (const row of rows) {
    if (byEvent[row.event]) byEvent[row.event].push(row);
  }

  const totalAll = rows.reduce((sum, r) => sum + r.guests, 0);

  return (
    <main className="min-h-screen bg-white px-6 py-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-sm text-gray-400 mt-1">Fauzan &amp; Rachma · June 6, 2026</p>
      </div>

      {error ? (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>Database error:</strong> {error}
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded border border-gray-200 px-4 py-5">
              <div className="text-2xl font-bold text-gray-900">{rows.length}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Total RSVPs</div>
            </div>
            <div className="rounded border border-gray-200 px-4 py-5">
              <div className="text-2xl font-bold text-gray-900">{totalAll}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Total Guests</div>
            </div>
            <div className="rounded border border-gray-200 px-4 py-5">
              <div className="text-2xl font-bold text-gray-900">
                {LIMITS.akad + LIMITS.syukuran - totalAll}
              </div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Spots Left</div>
            </div>
          </div>

          <EventTable rows={byEvent.syukuran} event="syukuran" />
          <EventTable rows={byEvent.akad} event="akad" />
        </>
      )}
    </main>
  );
}
