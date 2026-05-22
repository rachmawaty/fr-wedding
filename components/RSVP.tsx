"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function RSVP() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="rsvp" className="py-24 md:py-32 px-6 bg-[#2E2E2E]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            RSVP
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#F8F5F0] mb-6">
            Will you join <span className="italic text-[#C6A664]">us?</span>
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-sm text-[#F8F5F0]/60 leading-relaxed mb-10 max-w-md mx-auto">
            Please RSVP by May 20, 2026 so we can ensure a wonderful experience for every guest. We would be honoured to have you with us.
          </p>

          <div className="w-8 h-px bg-[#C6A664] mx-auto mb-10" />

          {/* RSVP form embed placeholder */}
          <div className="bg-[#F8F5F0]/5 border border-[#F8F5F0]/10 p-10 mb-8">
            <p className="font-[family-name:var(--font-serif)] text-xl italic text-[#F8F5F0]/50 mb-4">
              RSVP form coming soon
            </p>
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#F8F5F0]/30">
              A Tally.so form will be embedded here. In the meantime, reach out via email.
            </p>
          </div>

          <p className="font-[family-name:var(--font-sans)] text-xs text-[#F8F5F0]/40">
            Questions? Email us at{" "}
            <a
              href="mailto:rachesrach@gmail.com"
              className="text-[#C6A664] hover:underline"
            >
              rachesrach@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
