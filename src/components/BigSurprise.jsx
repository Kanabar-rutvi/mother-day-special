// src/components/BigSurprise.jsx
import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  "/photos/her1.jpg",
  "/photos/family.jpg",
  "/photos/papa.jpg",
  "/photos/divu.jpg",
  "/photos/tilli.jpg",
  "/photos/tillu.jpg",
];

const floatingQuotes = [
  "You are my sunshine ☀️",
  "Forever grateful for you 🌸",
  "My hero, my heart ❤️",
  "Love you beyond words 💕",
  "Thank you for everything ✨",
];

const BigSurprise = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [phase, setPhase] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(0);

  const fireConfetti = () => {
    const duration = 6 * 1000;
    const animEnd = Date.now() + duration;
    const colors = ["#f43f5e", "#ec4899", "#9333ea", "#fbbf24", "#fff"];

    const fire = () => {
      const timeLeft = animEnd - Date.now();
      if (timeLeft <= 0) return;
      const count = 60 * (timeLeft / duration);

      confetti({
        particleCount: count,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      });
      confetti({
        particleCount: count,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        shapes: ["circle", "square"],
        scalar: 1.2,
      });
      setTimeout(fire, 250);
    };
    fire();

    // Heart-shaped confetti burst
    confetti({
      particleCount: 200,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#f43f5e", "#ec4899"],
      scalar: 1.5,
    });
  };

  const handleReveal = () => {
    setLetterOpen(true);
    setTimeout(() => {
      setIsRevealed(true);
      setPhase(1);
      fireConfetti();

      // Cycle through floating quotes
      let qi = 0;
      const quoteInterval = setInterval(() => {
        qi = (qi + 1) % floatingQuotes.length;
        setShowQuote(qi);
      }, 2500);
      setTimeout(() => clearInterval(quoteInterval), 15000);
    }, 800);
  };

  const text = "Happy Mother's Day, Mom! ❤️";

  return (
    <section className="relative py-24 px-4 min-h-screen flex flex-col items-center justify-center snap-section">
      {/* Section Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-rose-400/70 tracking-[0.3em] text-xs uppercase font-semibold">
            The grand finale
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-white mt-3">
            Your Big <span className="shimmer-text italic">Surprise</span> 🎁
          </h2>
          <div className="divider mt-6" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Letter Opening Button */
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Envelope */}
              <motion.div
                animate={letterOpen ? { rotateX: -30, y: -20 } : { rotateX: 0 }}
                style={{ perspective: "600px", transformStyle: "preserve-3d" }}
                className="relative"
              >
                <motion.button
                  onClick={handleReveal}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="magnetic-btn relative group overflow-hidden
                             text-white text-xl font-bold px-14 py-6 rounded-full
                             tracking-wider transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #9333ea 100%)",
                    boxShadow: "0 0 40px rgba(244,63,94,0.5), 0 20px 40px rgba(244,63,94,0.3)",
                  }}
                >
                  {/* Shine effect */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                    }}
                  />
                  <span className="relative z-10">🎁 Open Your Gift, Mom!</span>
                </motion.button>
              </motion.div>

              <p className="text-rose-300/50 text-sm italic font-cormorant text-lg">
                Click to reveal something special just for you ✨
              </p>
            </motion.div>
          ) : (
            /* Revealed Content */
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Main Message */}
              <motion.div className="mb-12">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  className="text-6xl mb-6"
                >
                  💖
                </motion.div>

                <div className="flex flex-wrap justify-center gap-0">
                  {text.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 30, rotate: -10 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{
                        delay: 0.05 * i,
                        duration: 0.5,
                        type: "spring",
                        damping: 12,
                      }}
                      className="text-4xl md:text-6xl font-cursive shimmer-text inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>

                {/* Floating Quote */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={showQuote}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 text-rose-200/70 text-xl font-cormorant italic"
                  >
                    {floatingQuotes[showQuote]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              {/* Photo Collage */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-12"
              >
                {photos.map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, rotate: (i % 2 === 0 ? -5 : 5) }}
                    animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring", damping: 15 }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                    className="relative overflow-hidden rounded-xl shadow-2xl cursor-pointer"
                    style={{
                      aspectRatio: "1",
                      boxShadow: "0 8px 32px rgba(244,63,94,0.3)",
                    }}
                  >
                    <img
                      src={photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(244,63,94,0.2), transparent)",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Final Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="glass-rose p-8 rounded-3xl max-w-2xl mx-auto"
                style={{
                  boxShadow: "0 0 40px rgba(244,63,94,0.15)",
                }}
              >
                <p className="text-rose-100/85 leading-relaxed font-cormorant text-xl italic">
                  "Thank you for being my rock, my teacher, and my best friend.
                  Thank you for every sacrifice, every hug, every whispered prayer.
                  This little digital gift will never be enough — but know that
                  my love for you is infinite. You are, and always will be,
                  the most important person in my life."
                </p>
                <div className="mt-6 flex justify-center gap-4 text-3xl">
                  <span>🌸</span>
                  <span className="heartbeat">💖</span>
                  <span>🎀</span>
                  <span>✨</span>
                  <span>🌺</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BigSurprise;
