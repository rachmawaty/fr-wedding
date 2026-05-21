"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const addToCalendar = () => {
    const url = [
      "https://calendar.google.com/calendar/render?action=TEMPLATE",
      "&text=Fauzan+%26+Rachma+Wedding",
      "&dates=20260606T080000Z/20260606T160000Z",
      "&details=Join+us+to+celebrate+the+wedding+of+Fauzan+%26+Rachma",
      "&location=TBD",
    ].join("");
    window.open(url, "_blank");
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#F8F5F0] overflow-hidden"
    >
      {/* Soft decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#DCCFC0]/30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#A8B2A1]/20 blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Bismillah */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-serif)] text-[#C6A664] text-lg italic mb-8 tracking-wide"
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-[family-name:var(--font-serif)] text-6xl md:text-8xl font-light text-[#2E2E2E] tracking-wide leading-tight"
        >
          Fauzan
          <span className="block font-[family-name:var(--font-serif)] italic text-[#C6A664] text-4xl md:text-5xl my-3 font-light">
            &amp;
          </span>
          Rachma
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-[family-name:var(--font-sans)] text-xs tracking-[0.3em] uppercase text-[#2E2E2E]/60 mt-6 mb-4"
        >
          June 6, 2026
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-16 h-px bg-[#C6A664] mx-auto mb-6"
        />

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-[family-name:var(--font-serif)] text-xl md:text-2xl italic text-[#2E2E2E]/70 leading-relaxed max-w-lg mx-auto"
        >
          "We met during undergrad — never realizing the story would lead us here."
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#event"
            className="px-8 py-3 bg-[#2E2E2E] text-[#F8F5F0] font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase hover:bg-[#C6A664] transition-colors duration-300 w-44 text-center"
          >
            View Details
          </a>
          <a
            href="#rsvp"
            className="px-8 py-3 border border-[#2E2E2E] text-[#2E2E2E] font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase hover:border-[#C6A664] hover:text-[#C6A664] transition-colors duration-300 w-44 text-center"
          >
            RSVP
          </a>
          <button
            onClick={addToCalendar}
            className="px-8 py-3 border border-[#A8B2A1] text-[#2E2E2E]/70 font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase hover:border-[#C6A664] hover:text-[#C6A664] transition-colors duration-300 w-44"
          >
            Add to Calendar
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#2E2E2E]/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-[#2E2E2E]/30"
        />
      </motion.div>
    </section>
  );
}
