// src/components/SecretPoem.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const poem = [
  "Before I knew what love was,",
  "I knew your face.",
  "Before I understood kindness,",
  "I felt your embrace.",
  "You are the morning I wake to,",
  "the lullaby at night,",
  "the reason I believe in warmth —",
  "you taught me how to shine. 🌟",
  "",
  "Happy Mother's Day. ❤️",
];

const SecretPoem = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [hint, setHint] = useState(false);

  // Show hint after 3s
  useEffect(() => {
    const t = setTimeout(() => setHint(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    if (lineIndex >= poem.length) return;
    const t = setTimeout(() => setLineIndex((p) => p + 1), 700);
    return () => clearTimeout(t);
  }, [unlocked, lineIndex]);

  return (
    <section className="relative py-20 px-4">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(147,51,234,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-purple-400/70 tracking-[0.3em] text-xs uppercase font-semibold">
            A hidden surprise
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-3">
            A Poem{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(90deg, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Just For You
            </span>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            /* Locked State */
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Envelope animation */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl select-none cursor-pointer"
                onClick={() => setUnlocked(true)}
                title="Open me!"
              >
                💌
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setUnlocked(true)}
                className="px-8 py-4 rounded-full font-semibold text-white tracking-wider transition-all"
                style={{
                  background: "linear-gradient(135deg, #9333ea, #ec4899)",
                  boxShadow: "0 0 30px rgba(147,51,234,0.4)",
                }}
              >
                💌 Open Your Secret Poem
              </motion.button>

              {/* Hint */}
              <AnimatePresence>
                {hint && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-purple-300/50 text-sm italic font-cormorant"
                  >
                    ✨ Written just for you, Mom. Tap to read...
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Poem Reveal */
            <motion.div
              key="poem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-3xl p-8 md:p-12 text-left"
              style={{ border: "1px solid rgba(147,51,234,0.25)" }}
            >
              {poem.slice(0, lineIndex).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`font-cormorant text-xl leading-relaxed ${
                    line === ""
                      ? "mb-4"
                      : "text-rose-100/85 italic mb-2"
                  }`}
                >
                  {line || "\u00A0"}
                </motion.p>
              ))}

              {/* Cursor blink */}
              {lineIndex < poem.length && (
                <span
                  className="inline-block w-0.5 h-5 bg-rose-400 ml-1"
                  style={{ animation: "blink 0.8s step-end infinite" }}
                />
              )}

              {/* Done state */}
              {lineIndex >= poem.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 text-center"
                >
                  <p className="font-cursive text-2xl text-rose-300">
                    — With all my love 💖
                  </p>
                  <div className="mt-4 flex justify-center gap-3 text-2xl">
                    {["🌸", "💕", "✨", "🌺", "💖"].map((e, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                      >
                        {e}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SecretPoem;
