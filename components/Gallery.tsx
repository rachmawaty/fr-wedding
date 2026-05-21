"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const placeholders = [
  { id: 1, aspect: "aspect-[3/4]" },
  { id: 2, aspect: "aspect-square" },
  { id: 3, aspect: "aspect-[4/3]" },
  { id: 4, aspect: "aspect-[3/4]" },
  { id: 5, aspect: "aspect-[4/3]" },
  { id: 6, aspect: "aspect-square" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 bg-[#DCCFC0]/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            Gallery
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#2E2E2E]">
            Moments <span className="italic text-[#C6A664]">together</span>
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {placeholders.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${p.aspect} break-inside-avoid relative overflow-hidden cursor-pointer bg-[#DCCFC0]/40 border border-[#DCCFC0]`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.div
                animate={{ opacity: hovered === p.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#2E2E2E]/20 flex items-center justify-center z-10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#2E2E2E]/30">
                  Photo coming soon
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-[family-name:var(--font-sans)] text-xs text-center text-[#2E2E2E]/40 mt-10 italic"
        >
          Photos will be added as we count down to the day.
        </motion.p>
      </div>
    </section>
  );
}
