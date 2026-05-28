"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[4/3] border border-[#DCCFC0] overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.1!2d-71.0648!3d42.3467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a8b8b8b8b8b%3A0x0!2s345+Harrison+Ave%2C+Boston%2C+MA!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="345 Harrison Ave, Boston"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-2">
                Location
              </p>
              <p className="font-[family-name:var(--font-serif)] text-2xl text-[#2E2E2E]">
                345 Harrison Ave, Boston
              </p>
              <a
                href="https://maps.app.goo.gl/YfcKd4byp5M4Sava7"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-sans)] text-xs text-[#C6A664] mt-1 inline-block hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>

            <div className="w-8 h-px bg-[#DCCFC0]" />

            <div>
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-3">
                Parking
              </p>
              <p className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/70 leading-relaxed">
                Parking information will be included in your invitation details. Please arrive 15 minutes early to allow for parking.
              </p>
            </div>

            <div>
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-3">
                Transit
              </p>
              <p className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/70 leading-relaxed">
                Public transit directions will be shared along with venue confirmation.
              </p>
            </div>

            <div>
              <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664] mb-3">
                Nearby Accommodations
              </p>
              <p className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/70 leading-relaxed">
                For out-of-town guests, we will suggest nearby hotels once the venue is confirmed. Feel free to reach out for recommendations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
