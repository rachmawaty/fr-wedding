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
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[4/3] bg-[#DCCFC0]/30 border border-[#DCCFC0] flex items-center justify-center"
          >
            <div className="text-center px-8">
              <p className="font-[family-name:var(--font-serif)] text-2xl italic text-[#2E2E2E]/40 mb-2">
                Map coming soon
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#2E2E2E]/30">
                Venue details will be updated closer to the date
              </p>
            </div>
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
                To be announced
              </p>
              <p className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/60 mt-1">
                Details will be shared with confirmed guests.
              </p>
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
