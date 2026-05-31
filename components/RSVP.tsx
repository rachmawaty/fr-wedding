"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Event = "akad" | "syukuran";
type Status = "idle" | "loading" | "success" | "error" | "full";

interface Capacity {
  total: number;
  limit: number;
  remaining: number;
}

function RSVPForm({ event, title, subtitle, maxGuests }: {
  event: Event;
  title: string;
  subtitle: string;
  maxGuests: number;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [capacity, setCapacity] = useState<Capacity | null>(null);

  useEffect(() => {
    fetch(`/api/rsvp?event=${event}`)
      .then((r) => r.json())
      .then((d) => setCapacity(d))
      .catch(() => {});
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, name, email, guests, dietary, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 409) {
        setStatus("full");
        setErrorMsg(data.error);
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
      return;
    }

    setStatus("success");
    setCapacity((prev) => prev ? { ...prev, total: prev.total + guests, remaining: prev.remaining - guests } : null);
  };

  const isFull = capacity !== null && capacity.remaining <= 0;

  return (
    <div className="bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-2">
          {title}
        </p>
        <p className="font-[family-name:var(--font-serif)] text-xl text-[#F8F5F0]/70 italic">
          {subtitle}
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-6">
          <p className="font-[family-name:var(--font-serif)] text-2xl italic text-[#C6A664] mb-2">
            You're on the list.
          </p>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#F8F5F0]/50">
            We'll be in touch closer to the day. Thank you, {name.split(" ")[0]}.
          </p>
        </div>
      ) : isFull ? (
        <div className="text-center py-6">
          <p className="font-[family-name:var(--font-serif)] text-xl italic text-[#F8F5F0]/50">
            We've reached capacity for this event.
          </p>
          <p className="font-[family-name:var(--font-sans)] text-xs text-[#F8F5F0]/30 mt-2">
            Please reach out at{" "}
            <a href="mailto:rachesrach@gmail.com" className="text-[#C6A664] hover:underline">
              rachesrach@gmail.com
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#F8F5F0]/40 block mb-1.5">
                Full Name *
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 px-4 py-2.5 text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/20 focus:outline-none focus:border-[#C6A664]/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#F8F5F0]/40 block mb-1.5">
                Email *
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 px-4 py-2.5 text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/20 focus:outline-none focus:border-[#C6A664]/50 transition-colors"
              />
            </div>
          </div>

          {maxGuests > 1 && (
            <div>
              <label className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#F8F5F0]/40 block mb-1.5">
                Number Attending
              </label>
              <div className="flex gap-3">
                {[1, 2].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setGuests(n)}
                    className={`px-5 py-2 text-sm font-[family-name:var(--font-sans)] border transition-colors ${
                      guests === n
                        ? "border-[#C6A664] text-[#C6A664] bg-[#C6A664]/10"
                        : "border-[#F8F5F0]/10 text-[#F8F5F0]/50 hover:border-[#F8F5F0]/30"
                    }`}
                  >
                    {n === 1 ? "Just me" : "Me + 1"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#F8F5F0]/40 block mb-1.5">
              Dietary Restrictions
            </label>
            <input
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="Vegetarian, halal, allergies, etc."
              className="w-full bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 px-4 py-2.5 text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/20 focus:outline-none focus:border-[#C6A664]/50 transition-colors"
            />
          </div>

          <div>
            <label className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#F8F5F0]/40 block mb-1.5">
              Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A note for the couple..."
              className="w-full bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 px-4 py-2.5 text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/20 focus:outline-none focus:border-[#C6A664]/50 transition-colors resize-none"
            />
          </div>

          {(status === "error" || status === "full") && (
            <p className="font-[family-name:var(--font-sans)] text-xs text-red-400">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-[#C6A664] text-[#2E2E2E] font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase hover:bg-[#d4b87a] disabled:opacity-50 transition-colors duration-300"
          >
            {status === "loading" ? "Sending..." : "Confirm RSVP"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function RSVP() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="rsvp" className="py-24 md:py-32 px-6 bg-[#2E2E2E]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            RSVP
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#F8F5F0] mb-6">
            Will you join <span className="italic text-[#C6A664]">us?</span>
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-sm text-[#F8F5F0]/60 leading-relaxed max-w-md mx-auto">
            Please RSVP by June 1, 2026. Select the event you'll be attending below.
          </p>
          <div className="w-8 h-px bg-[#C6A664] mx-auto mt-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <RSVPForm
            event="syukuran"
            title="Syukuran"
            subtitle="June 6 · 345 Harrison Ave · 12:00–14:00"
            maxGuests={2}
          />
          <RSVPForm
            event="akad"
            title="Akad Nikah"
            subtitle="June 6 · ISBCC, Roxbury · 10:00–11:00"
            maxGuests={1}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-sans)] text-xs text-center text-[#F8F5F0]/30 mt-10"
        >
          Questions?{" "}
          <a href="mailto:rachesrach@gmail.com" className="text-[#C6A664] hover:underline">
            rachesrach@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
