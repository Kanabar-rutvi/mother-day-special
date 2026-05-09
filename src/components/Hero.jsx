// src/components/Hero.jsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const quotes = [
  "To the world, you are one person. But to me, you are the world. 🌍",
  "You are my first love and my forever hero. ❤️",
  "Every good thing in me, I learned from you. 🌸",
];

const Hero = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const textRef = useRef("");

  useEffect(() => {
    const current = quotes[quoteIndex];
    textRef.current = "";
    setDisplayedText("");
    setIsTyping(true);

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < current.length) {
        textRef.current += current[i];
        setDisplayedText(textRef.current);
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        setTimeout(() => {
          setQuoteIndex((prev) => (prev + 1) % quotes.length);
        }, 3500);
      }
    }, 55);

    return () => clearInterval(typeInterval);
  }, [quoteIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center snap-section overflow-hidden">
      {/* Subtle radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(244,63,94,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-rose px-5 py-2 rounded-full mb-8"
        >
          <span className="heartbeat text-lg">💖</span>
          <span className="text-rose-300 tracking-[0.25em] text-xs font-semibold uppercase">
            Happy Mother's Day • 2026
          </span>
          <span className="heartbeat text-lg">💖</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif leading-[0.9] mb-6"
        >
          <span className="block text-white/90">To The</span>
          <span
            className="block shimmer-text"
            style={{ fontStyle: "italic" }}
          >
            Best Mom
          </span>
          <span className="block text-white/90">In The World</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="divider my-8"
        />

        {/* Typewriter Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="min-h-[60px] flex items-center justify-center px-6"
        >
          <p
            className={`text-lg md:text-xl text-rose-200/80 font-cormorant italic max-w-2xl leading-relaxed ${
              isTyping ? "typewriter-text" : ""
            }`}
          >
            {displayedText}
          </p>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-rose-300/50 text-sm tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-rose-400/60 text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
