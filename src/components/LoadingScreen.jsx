// src/components/LoadingScreen.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=text, 2=done

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase(1), 200);
          setTimeout(() => setPhase(2), 2200);
          setTimeout(() => onComplete(), 2800);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onComplete]);

  const letters = "Made With Love For Mom ❤️".split("");

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center, #1a0030 0%, #0d0010 60%, #000 100%)",
          }}
        >
          {/* Animated Stars */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="star absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                "--dur": Math.random() * 3 + 2 + "s",
                "--del": Math.random() * 3 + "s",
              }}
            />
          ))}

          {/* Floating Hearts */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute text-rose-400/30 select-none"
              style={{
                fontSize: Math.random() * 20 + 15 + "px",
                left: Math.random() * 100 + "%",
                bottom: "-20px",
                animation: `floatUp ${Math.random() * 5 + 6}s ${Math.random() * 4}s linear infinite`,
              }}
            >
              ❤️
            </div>
          ))}

          {/* Center Content */}
          <div className="relative z-10 text-center px-6">
            {/* Heart Icon */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-8 select-none"
            >
              💖
            </motion.div>

            {/* Loading Text */}
            {phase === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-rose-300/60 tracking-[0.3em] text-sm uppercase font-medium mb-8">
                  Preparing your gift
                </p>
                {/* Progress Bar */}
                <div className="w-64 mx-auto h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #f43f5e, #ec4899, #9333ea)",
                      width: `${Math.min(progress, 100)}%`,
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="loading-dot w-2 h-2 rounded-full bg-rose-400"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Final Text */}
            {phase === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-wrap justify-center gap-0">
                  {letters.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="text-2xl md:text-3xl font-cursive shimmer-text inline-block"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
