"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function Wishes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((d) => setWishes(d))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    const wish = await res.json();
    setWishes((prev) => [wish, ...prev]);
    setStatus("success");
    setName("");
    setMessage("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="wishes" className="py-24 md:py-32 px-6 bg-[#F8F5F0]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.3em] uppercase text-[#C6A664] mb-4">
            Wishes
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light text-[#2E2E2E] mb-6">
            Leave us a <span className="italic text-[#C6A664]">message</span>
          </h2>
          <div className="w-8 h-px bg-[#C6A664] mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white border border-[#DCCFC0] p-8 mb-12"
        >
          {status === "success" ? (
            <div className="text-center py-4">
              <p className="font-[family-name:var(--font-serif)] text-2xl italic text-[#C6A664]">
                Thank you, {name || "friend"}!
              </p>
              <p className="font-[family-name:var(--font-sans)] text-xs text-[#2E2E2E]/50 mt-2">
                Your message means a lot to us.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#2E2E2E]/40 block mb-1.5">
                  Your Name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#F8F5F0] border border-[#DCCFC0] px-4 py-2.5 text-sm text-[#2E2E2E] placeholder-[#2E2E2E]/30 focus:outline-none focus:border-[#C6A664]/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.15em] uppercase text-[#2E2E2E]/40 block mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your congratulations or a warm message for the couple..."
                  className="w-full bg-[#F8F5F0] border border-[#DCCFC0] px-4 py-2.5 text-sm text-[#2E2E2E] placeholder-[#2E2E2E]/30 focus:outline-none focus:border-[#C6A664]/60 transition-colors resize-none"
                />
              </div>
              {status === "error" && (
                <p className="font-[family-name:var(--font-sans)] text-xs text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-[#C6A664] text-white font-[family-name:var(--font-sans)] text-xs tracking-[0.15em] uppercase hover:bg-[#b8955a] disabled:opacity-50 transition-colors duration-300"
              >
                {status === "loading" ? "Sending..." : "Send Wishes"}
              </button>
            </form>
          )}
        </motion.div>

        {wishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {wishes.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#DCCFC0] px-6 py-5"
              >
                <p className="font-[family-name:var(--font-sans)] text-xs tracking-wider text-[#C6A664] mb-2">
                  {w.name}
                </p>
                <p className="font-[family-name:var(--font-serif)] text-base text-[#2E2E2E]/80 italic leading-relaxed">
                  "{w.message}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
