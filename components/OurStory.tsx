"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2019",
    title: "Met During Undergrad",
    body: "Two students, same campus, different paths — until they weren't. What started as a chance encounter turned into something neither expected.",
  },
  {
    year: "2020",
    title: "Became Close Friends",
    body: "Through late nights, shared ideas, and honest conversations, a friendship deepened into something rare — the kind you don't take for granted.",
  },
  {
    year: "2022",
    title: "Built Life Together",
    body: "Across cities, time zones, and seasons, they kept showing up for each other. The distance only made the connection clearer.",
  },
  {
    year: "2025",
    title: "Engagement",
    body: "A quiet moment, a question, a yes. The kind of yes that doesn't need elaborate planning — just two people and absolute certainty.",
  },
  {
    year: "2026",
    title: "Nikah — June 6",
    body: "Now they invite the people they love to witness what has been, all along, inevitable.",
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative flex gap-8 md:gap-12"
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-[#C6A664] mt-1 flex-shrink-0" />
        {index < timeline.length - 1 && (
          <div className="w-px flex-1 bg-[#DCCFC0] mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em] uppercase text-[#C6A664]">
          {item.year}
        </span>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl text-[#2E2E2E] mt-1 mb-3">
          {item.title}
        </h3>
        <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[#2E2E2E]/60 max-w-md">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function OurStory() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section id="story" className="py-24 md:py-32 px-6 bg-[#F8F5F0]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            Our Story
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#2E2E2E] leading-tight">
            A friendship that became{" "}
            <span className="italic text-[#C6A664]">a life</span>
          </h2>
        </motion.div>

        <div>
          {timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
