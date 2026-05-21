"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer className="bg-[#2E2E2E] py-20 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto text-center"
      >
        {/* Names */}
        <p className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-light text-[#F8F5F0] mb-2">
          Fauzan &amp; Rachma
        </p>

        {/* Date */}
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-8">
          June 6, 2026
        </p>

        {/* Divider */}
        <div className="w-8 h-px bg-[#C6A664] mx-auto mb-8" />

        {/* Du'a */}
        <p className="font-[family-name:var(--font-serif)] text-xl italic text-[#F8F5F0]/50 mb-2">
          بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
        <p className="font-[family-name:var(--font-sans)] text-xs text-[#F8F5F0]/30 mb-10">
          May Allah bless you both and join you together in goodness.
        </p>

        {/* Contact */}
        <p className="font-[family-name:var(--font-sans)] text-xs text-[#F8F5F0]/30">
          Questions?{" "}
          <a
            href="mailto:rachmawatyy@gmail.com"
            className="text-[#C6A664] hover:underline"
          >
            rachmawatyy@gmail.com
          </a>
        </p>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#F8F5F0]/10">
          <p className="font-[family-name:var(--font-sans)] text-[10px] text-[#F8F5F0]/20 tracking-widest uppercase">
            fauzan.rach.es
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
