"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2011",
    title: "Mentor & Mentee at ITB",
    body: "They first met at an informatics event at ITB — Rachma was Fauzan's mentor. Neither of them knew it was the beginning of something that would take over a decade to fully unfold.",
  },
  {
    year: "2011–2022",
    title: "Ten Years Apart",
    body: "Life took them in different directions. But Fauzan never quite stopped being curious about where Rachma's path was going. He kept tabs — quietly, persistently.",
  },
  {
    year: "2022",
    title: "Reunited — Boston",
    body: "When Rachma got accepted to MIT and moved to Boston, they found each other again. The years apart hadn't changed much — except that this time, Fauzan had a plan.",
  },
  {
    year: "2023",
    title: "Acadia, Almost Romantic",
    body: "Fauzan had it all figured out: a sunset at Acadia National Park, the perfect moment to ask her out. What he didn't account for was the cold — it was so freezing he could barely think, let alone be romantic. She said yes anyway.",
  },
  {
    year: "2023–2024",
    title: "Three Months to Be Sure",
    body: "They gave themselves three months — an honest window to see if they were truly right for each other. They were. A year of dating later, the answer was clear.",
  },
  {
    year: "2024",
    title: "Engagement Over Zoom",
    body: "His family traveled from Lampung. Her family waited in Bandung. And over a Zoom call that bridged two cities, he formally asked for her hand. Old tradition, new world — it worked.",
  },
  {
    year: "2026",
    title: "Nikah — June 6",
    body: "Now they invite everyone they love to witness what 15 years of crossed paths, one very cold national park, and a Zoom call were quietly leading to.",
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
            Fifteen years in the{" "}
            <span className="italic text-[#C6A664]">making</span>
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
