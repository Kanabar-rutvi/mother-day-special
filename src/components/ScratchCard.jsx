// src/components/ScratchCard.jsx
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const MESSAGE = "You are the most beautiful person — inside and out. I am so proud to call you my Mom. 💖";
const LABEL = "Scratch to reveal your surprise!";

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const [scratched, setScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Draw scratch overlay
    const drawOverlay = () => {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#7c3aed");
      grad.addColorStop(0.5, "#db2777");
      grad.addColorStop(1, "#f43f5e");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scratch text hint
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "bold 15px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✨ " + LABEL, canvas.width / 2, canvas.height / 2 - 8);
      ctx.font = "13px Inter, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillText("Use your mouse or finger", canvas.width / 2, canvas.height / 2 + 14);
    };
    drawOverlay();
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const pct = Math.round((transparent / (pixels.length / 4)) * 100);
    setScratchPercent(pct);

    if (pct > 60 && !revealed) {
      setRevealed(true);
      setScratched(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#ec4899", "#fbbf24", "#9333ea"],
      });
    }
  };

  return (
    <section className="relative py-20 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(244,63,94,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-rose-400/70 tracking-[0.3em] text-xs uppercase font-semibold">
            A little secret
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-3">
            Scratch{" "}
            <span className="shimmer-text italic">& Reveal</span>
          </h2>
          <p className="mt-3 text-rose-200/50 font-cormorant text-lg italic">
            Scratch away to find your hidden message 🪄
          </p>
        </motion.div>

        {/* Scratch Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto rounded-3xl overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "420px",
            aspectRatio: "2 / 1",
            boxShadow: "0 0 40px rgba(244,63,94,0.25)",
          }}
        >
          {/* Hidden message underneath */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6 text-center"
            style={{
              background: "linear-gradient(135deg, #1a0020, #0d0010)",
              borderRadius: "1.5rem",
            }}
          >
            <p className="font-cormorant text-xl italic text-rose-200/90 leading-relaxed">
              "{MESSAGE}"
            </p>
          </div>

          {/* Scratch overlay canvas */}
          {!scratched && (
            <canvas
              ref={canvasRef}
              width={420}
              height={210}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              style={{ borderRadius: "1.5rem" }}
              onMouseDown={() => (isDrawing.current = true)}
              onMouseUp={() => (isDrawing.current = false)}
              onMouseLeave={() => (isDrawing.current = false)}
              onMouseMove={scratch}
              onTouchStart={() => (isDrawing.current = true)}
              onTouchEnd={() => (isDrawing.current = false)}
              onTouchMove={scratch}
            />
          )}
        </motion.div>

        {/* Progress */}
        {!scratched && scratchPercent > 5 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-rose-400/60 text-sm"
          >
            {scratchPercent < 60 ? `Keep going… ${scratchPercent}% revealed` : "Almost there!"}
          </motion.p>
        )}

        {/* Revealed message */}
        <AnimatePresence>
          {scratched && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <p className="font-cursive text-2xl text-rose-300">
                🎉 You revealed it! Love you Mom! 💖
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ScratchCard;
