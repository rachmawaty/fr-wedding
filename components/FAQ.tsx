"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "What is the dress code?",
    a: "Modest and appropriate — the Akad Nikah will be held in a mosque so please dress modestly.",
  },
  {
    q: "Where is parking available?",
    a: "Parking details will be shared alongside the venue confirmation. We recommend carpooling if possible.",
  },
  {
    q: "What are the ceremony timings?",
    a: "The Akad Nikah begins at 10:00 and the Syukuran opens at 12:00. Please plan to arrive 15 minutes early.",
  },
  {
    q: "Are children welcome?",
    a: "Children are welcome at the Reception. For the Akad Nikah, we kindly ask that only family and close friends attend.",
  },
  {
    q: "Who can I contact for questions?",
    a: "Please reach out to us at rachesrach@gmail.com for any questions or special arrangements.",
  },
  {
    q: "Can I share photos on social media?",
    a: "Yes! We'd love for you to share the joy. Use our wedding tag (to be announced) so we can find your photos.",
  },
];

function FAQItem({ item, index }: { item: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="border-b border-[#DCCFC0]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-[family-name:var(--font-serif)] text-lg text-[#2E2E2E]">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#C6A664] text-xl flex-shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-[family-name:var(--font-sans)] text-sm text-[#2E2E2E]/60 leading-relaxed pb-5">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-[#F8F5F0]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            FAQ
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#2E2E2E]">
            Common <span className="italic text-[#C6A664]">questions</span>
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
