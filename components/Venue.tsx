"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const venues = [
  {
    label: "Akad Nikah",
    name: "ISBCC, Roxbury",
    address: "100 Malcolm X Blvd, Boston, MA 02119",
    time: "10:00 — 11:00",
    mapsUrl: "https://maps.app.goo.gl/isbcc",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.5!2d-71.0875!3d42.3290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37960d44cde25%3A0x9d9cde48da3b7b1f!2sISBCC!5e0!3m2!1sen!2sus!4v1",
  },
  {
    label: "Syukuran",
    name: "345 Harrison Ave",
    address: "345 Harrison Ave, Boston, MA",
    time: "12:00 — 14:00",
    mapsUrl: "https://maps.app.goo.gl/YfcKd4byp5M4Sava7",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.1!2d-71.0648!3d42.3467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a8b8b8b8b8b%3A0x0!2s345+Harrison+Ave%2C+Boston%2C+MA!5e0!3m2!1sen!2sus!4v1",
  },
];

export default function Venue() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="venue" className="py-24 md:py-32 px-6 bg-[#F8F5F0]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            Venue &amp; Logistics
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#2E2E2E]">
            Getting <span className="italic text-[#C6A664]">there</span>
          </h2>
        </motion.div>

        {/* Venue maps */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {venues.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
            >
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-2">
                {v.label}
              </p>
              <p className="font-[family-name:var(--font-serif)] text-xl text-[#2E2E2E] mb-0.5">
                {v.name}
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#2E2E2E]/50 mb-1">
                {v.time}
              </p>
              <a
                href={v.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-sans)] text-xs text-[#C6A664] inline-block hover:underline mb-4"
              >
                Open in Google Maps →
              </a>
              <div className="aspect-[4/3] border border-[#DCCFC0] overflow-hidden">
                <iframe
                  src={v.embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={v.name}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Parking & transit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 border-t border-[#DCCFC0] pt-12"
        >
          <div>
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-3">
              Parking
            </p>
            <p className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/70 leading-relaxed">
              No on-site guest parking. Metered street parking is available nearby, as well as public garages and lots in the area. We highly recommend carpooling or using rideshare services.
            </p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-3">
              Transit
            </p>
            <p className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/70 leading-relaxed">
              Both venues are accessible via the MBTA. Please plan to arrive 10–15 minutes early.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
