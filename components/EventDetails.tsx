"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    type: "Akad Nikah",
    emoji: "☽",
    date: "Saturday, June 6, 2026",
    time: "10:00 — 11:00",
    location: "ISBCC, Roxbury, Boston",
    note: "Intimate ceremony. Family and close friends.",
  },
  {
    type: "Syukuran",
    emoji: "◈",
    date: "Saturday, June 6, 2026",
    time: "12:00 — 14:00",
    location: "345 Harrison Ave, Boston",
    note: "A small, warm gathering with family and friends.",
  },
];

const schedule = [
  { time: "10:00", label: "Akad Nikah ceremony begins" },
  { time: "10:30", label: "Signing & prayers" },
  { time: "11:00", label: "Wedding photoshoot" },
  { time: "12:00", label: "Syukuran at 345 Harrison Ave begins" },
  { time: "14:00", label: "Syukuran closes" },
];

export default function EventDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="event" className="py-24 md:py-32 px-6 bg-[#DCCFC0]/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            Event Details
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#2E2E2E]">
            Mark your <span className="italic text-[#C6A664]">calendar</span>
          </h2>
        </motion.div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {events.map((e, i) => (
            <motion.div
              key={e.type}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="bg-[#F8F5F0] p-8 border border-[#DCCFC0]"
            >
              <span className="text-2xl text-[#C6A664] mb-4 block">{e.emoji}</span>
              <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[#2E2E2E] mb-4">
                {e.type}
              </h3>
              <div className="space-y-2">
                <p className="font-[family-name:var(--font-sans)] text-xs text-[#2E2E2E]/70">
                  {e.date}
                </p>
                <p className="font-[family-name:var(--font-sans)] text-sm font-medium text-[#2E2E2E]">
                  {e.time}
                </p>
                <p className="font-[family-name:var(--font-sans)] text-xs text-[#2E2E2E]/70">
                  {e.location}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-[#DCCFC0]">
                <p className="font-[family-name:var(--font-sans)] text-xs italic text-[#2E2E2E]/50">
                  {e.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[#2E2E2E] mb-8 italic">
            Day Schedule
          </h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {schedule.map((s) => (
              <div key={s.time} className="flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-sans)] text-xs tracking-wider text-[#C6A664] w-12 flex-shrink-0">
                  {s.time}
                </span>
                <span className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dress code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 p-6 bg-[#F8F5F0] border border-[#DCCFC0] flex flex-col md:flex-row md:items-center gap-4"
        >
          <div className="w-8 h-px bg-[#C6A664] flex-shrink-0 hidden md:block" />
          <div>
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-1">
              Dress Code
            </p>
            <p className="font-[family-name:var(--font-serif)] text-xl text-[#2E2E2E]">
              Modest and appropriate — the Akad will be held in a mosque.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
