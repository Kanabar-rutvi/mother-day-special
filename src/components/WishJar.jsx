// src/components/WishJar.jsx
// Click the jar to draw a random loving wish from it
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const wishes = [
  "🌸 May every morning bring you peace and joy.",
  "☀️ May you always be surrounded by people who love you deeply.",
  "🌟 May your dreams come true, one by one.",
  "💐 May your days be as beautiful as your smile.",
  "🍀 May luck always find its way to you.",
  "🌙 May you sleep soundly knowing you are so deeply loved.",
  "🎵 May life sing its sweetest songs just for you.",
  "🦋 May every moment be as magical as you are.",
  "🌺 May you feel as cherished as you truly deserve.",
  "💖 May this year be the best one yet — you deserve it all!",
];

const WishJar = () => {
  const [drawn, setDrawn] = useState([]);
  const [current, setCurrent] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [allUsed, setAllUsed] = useState(false);

  const drawWish = () => {
    if (allUsed) return;

    setShaking(true);
    setTimeout(() => setShaking(false), 600);

    const remaining = wishes.filter((_, i) => !drawn.includes(i));
    if (remaining.length === 0) { setAllUsed(true); return; }

    const pool = wishes.map((_, i) => i).filter((i) => !drawn.includes(i));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setDrawn((prev) => [...prev, pick]);
    setCurrent(pick);

    if (drawn.length + 1 >= wishes.length) setAllUsed(true);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.55 },
      colors: ["#f43f5e", "#fbbf24", "#a855f7"],
      scalar: 0.7,
    });
  };

  return (
    <section className="relative py-20 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(251,191,36,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-lg mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-amber-400/70 tracking-[0.3em] text-xs uppercase font-semibold">
            Shake the jar
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-3">
            Wishing{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(90deg, #fbbf24, #f43f5e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Jar
            </span>{" "}
            🫙
          </h2>
          <p className="mt-3 text-amber-200/50 font-cormorant text-lg italic">
            Each click draws a loving wish just for you
          </p>
        </motion.div>

        {/* Jar */}
        <motion.button
          onClick={drawWish}
          animate={shaking ? { rotate: [-5, 5, -5, 5, 0] } : { rotate: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          disabled={allUsed}
          className="text-8xl select-none focus:outline-none block mx-auto mb-8 cursor-pointer"
          title="Click to draw a wish!"
        >
          🫙
        </motion.button>

        {/* Count */}
        <p className="text-amber-400/50 text-sm mb-6">
          {drawn.length} / {wishes.length} wishes drawn
        </p>

        {/* Current Wish */}
        <AnimatePresence mode="wait">
          {current !== null && (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: "spring", damping: 18 }}
              className="glass-rose p-7 rounded-3xl"
              style={{ boxShadow: "0 0 40px rgba(251,191,36,0.1)" }}
            >
              <p className="font-cormorant text-xl italic text-rose-100/90 leading-relaxed">
                {wishes[current]}
              </p>
            </motion.div>
          )}

          {allUsed && (
            <motion.div
              key="allused"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <p className="font-cursive text-2xl text-amber-300">
                All wishes sent! You deserve every single one. 💛
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!current && !allUsed && (
          <p className="text-amber-300/40 text-sm italic font-cormorant mt-4">
            Click the jar to draw your first wish ✨
          </p>
        )}
      </div>
    </section>
  );
};

export default WishJar;
