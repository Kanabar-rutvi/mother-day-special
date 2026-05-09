// src/components/SurpriseModal.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

// ── Mini confetti burst on heart click ──
const popHeart = () => {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { x: 0.5, y: 0.4 },
    colors: ["#f43f5e", "#ec4899", "#fbbf24"],
    scalar: 0.8,
    disableForReducedMotion: true,
  });
};

// ── Floating hearts inside modal ──
const ModalHearts = () => {
  const items = useRef(
    [...Array(10)].map(() => ({
      symbol: ["❤️", "💕", "💖", "🌸"][Math.floor(Math.random() * 4)],
      left: Math.random() * 100,
      fontSize: Math.random() * 14 + 10,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 3,
    }))
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {items.current.map((h, i) => (
        <div
          key={i}
          className="absolute select-none"
          style={{
            fontSize: h.fontSize + "px",
            left: h.left + "%",
            bottom: "-20px",
            animation: `floatUp ${h.duration}s ${h.delay}s linear infinite`,
            opacity: 0.35,
          }}
        >
          {h.symbol}
        </div>
      ))}
    </div>
  );
};

// ── Typewriter ──
const TypewriterText = ({ text, speed = 28 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return <span>{displayed}</span>;
};

// ── Mini surprise pop-ups ──
const miniSurprises = [
  { icon: "🎵", text: "Your laughter is my favourite song in the world." },
  { icon: "🌙", text: "Even on my darkest nights, you were always my moon." },
  { icon: "🍵", text: "Tea tastes better when made by your hands." },
  { icon: "🦋", text: "You taught me that beauty exists in small moments." },
  { icon: "🌺", text: "Every flower reminds me of your grace and strength." },
  { icon: "🎀", text: "Thank you for tying my world together perfectly." },
];

// ── Star rating Easter egg ──
const StarRating = () => {
  const [rated, setRated] = useState(0);
  const [done, setDone] = useState(false);
  const handleRate = (n) => {
    setRated(n);
    if (n === 5) {
      setDone(true);
      popHeart();
    }
  };
  return (
    <div className="mt-3">
      <p className="text-rose-400/60 text-xs uppercase tracking-widest mb-2">Rate Mom's awesomeness</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button
            key={n}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRate(n)}
            className="text-2xl focus:outline-none"
          >
            {n <= rated ? "⭐" : "☆"}
          </motion.button>
        ))}
      </div>
      {done && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-300 text-sm font-cursive mt-2"
        >
          ∞ / 5 stars — obviously! 💖
        </motion.p>
      )}
    </div>
  );
};

// ── Main Modal ──
const SurpriseModal = ({ isOpen, item, onClose, onNext }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [heartClicks, setHeartClicks] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);
  const [miniSurprise, setMiniSurprise] = useState(null);
  const [miniVisible, setMiniVisible] = useState(false);
  const miniTimerRef = useRef(null);

  // Reset state when card changes
  useEffect(() => {
    if (isOpen) {
      setGalleryIndex(0);
      setEasterEgg(false);
      setHeartClicks(0);
      setMiniSurprise(null);
      setMiniVisible(false);

      // Pop a mini surprise after 3.5s
      clearTimeout(miniTimerRef.current);
      miniTimerRef.current = setTimeout(() => {
        const pick = miniSurprises[Math.floor(Math.random() * miniSurprises.length)];
        setMiniSurprise(pick);
        setMiniVisible(true);
      }, 3500);
    }
    return () => clearTimeout(miniTimerRef.current);
  }, [item, isOpen]);

  if (!item) return null;

  const gallery = item.gallery || [item.image];

  const nextImage = () => setGalleryIndex((p) => (p + 1) % gallery.length);
  const prevImage = () => setGalleryIndex((p) => (p - 1 + gallery.length) % gallery.length);

  const handleHeartClick = () => {
    const next = heartClicks + 1;
    setHeartClicks(next);
    popHeart();
    if (next >= 5) setEasterEgg(true);
  };

  // ── "Next Surprise" — directly passes next item index to parent ──
  const handleNext = () => {
    onNext(); // App.jsx will handle the item switch
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{
              background: "rgba(5, 0, 15, 0.88)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.78, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden"
            style={{
              borderRadius: "2rem",
              background: "linear-gradient(145deg, rgba(32,5,45,0.97) 0%, rgba(18,0,28,0.99) 100%)",
              border: "1px solid rgba(244,63,94,0.22)",
              boxShadow: "0 0 80px rgba(244,63,94,0.18), 0 40px 80px rgba(0,0,0,0.7)",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <ModalHearts />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-rose
                         flex items-center justify-center hover:bg-rose-500/30 transition-all
                         border border-rose-500/30"
            >
              <X size={18} className="text-rose-300" />
            </button>

            {/* Card Number badge */}
            <div className="absolute top-4 left-16 z-20 glass-rose px-3 py-1 rounded-full text-xs text-rose-300/80 font-medium">
              {item.emoji} {item.tag}
            </div>

            <div className="grid md:grid-cols-2" style={{ minHeight: "480px" }}>
              {/* ── Left: Gallery ── */}
              <div className="relative overflow-hidden" style={{ minHeight: "280px" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryIndex}
                    src={gallery[galleryIndex]}
                    alt={item.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45 }}
                    className="w-full h-full object-cover absolute inset-0"
                    style={{ minHeight: "280px" }}
                  />
                </AnimatePresence>

                {/* Right-edge fade into modal bg */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 55%, rgba(18,0,28,0.9) 100%)",
                  }}
                />
                {/* Bottom fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 60%, rgba(18,0,28,0.7) 100%)",
                  }}
                />

                {/* Prev / Next arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                                 bg-black/50 backdrop-blur flex items-center justify-center z-10
                                 hover:bg-rose-500/50 transition-all border border-white/10"
                    >
                      <ChevronLeft size={16} className="text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                                 bg-black/50 backdrop-blur flex items-center justify-center z-10
                                 hover:bg-rose-500/50 transition-all border border-white/10"
                    >
                      <ChevronRight size={16} className="text-white" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === galleryIndex
                              ? "bg-rose-400 w-6"
                              : "bg-white/30 w-2 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* ── Right: Content ── */}
              <div className="p-7 flex flex-col justify-between">
                <div>
                  {/* Heart tap */}
                  <button onClick={handleHeartClick} className="mb-3 focus:outline-none group">
                    <motion.div whileTap={{ scale: 1.6 }} className="flex items-center gap-2">
                      <Heart
                        size={28}
                        className={`transition-all duration-200 ${
                          heartClicks > 0 ? "fill-rose-500 text-rose-500" : "text-rose-400/60"
                        }`}
                        style={{
                          filter: heartClicks > 0 ? "drop-shadow(0 0 8px rgba(244,63,94,0.9))" : "none",
                        }}
                      />
                      {heartClicks > 0 && (
                        <span className="text-rose-400/70 text-xs font-medium">
                          {heartClicks < 5 ? `${5 - heartClicks} more taps for a secret...` : "💖"}
                        </span>
                      )}
                    </motion.div>
                  </button>

                  {/* Date */}
                  <p className="text-rose-500/60 text-xs uppercase tracking-widest mb-1.5 font-medium">
                    {item.date}
                  </p>

                  {/* Title */}
                  <h2 className="text-3xl font-serif text-white mb-4 leading-tight">
                    {item.title}
                  </h2>

                  {/* Message */}
                  <p className="text-rose-100/75 leading-relaxed font-cormorant text-lg italic mb-5">
                    "<TypewriterText text={item.message} />"
                  </p>

                  {/* Quote block */}
                  <div
                    className="p-4 rounded-xl mb-4"
                    style={{
                      background: "rgba(244,63,94,0.06)",
                      borderLeft: "2px solid rgba(244,63,94,0.4)",
                    }}
                  >
                    <p className="text-rose-300/80 text-sm italic leading-relaxed">{item.quote}</p>
                  </div>

                  {/* Star rating */}
                  <StarRating />
                </div>

                {/* Easter egg */}
                <AnimatePresence>
                  {easterEgg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 p-3 rounded-xl text-center"
                      style={{
                        background: "rgba(244,63,94,0.12)",
                        border: "1px solid rgba(244,63,94,0.35)",
                      }}
                    >
                      <p className="text-rose-300 font-cursive text-xl">
                        🎉 You found a secret! I love you to the moon and back! 🌙
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mini surprise pop */}
                <AnimatePresence>
                  {miniVisible && miniSurprise && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ type: "spring", damping: 18 }}
                      className="mt-3 p-3 rounded-xl flex items-start gap-3 cursor-pointer"
                      style={{
                        background: "rgba(147,51,234,0.1)",
                        border: "1px solid rgba(147,51,234,0.25)",
                      }}
                      onClick={() => setMiniVisible(false)}
                    >
                      <span className="text-2xl flex-shrink-0">{miniSurprise.icon}</span>
                      <p className="text-purple-200/80 text-sm italic font-cormorant text-base leading-snug">
                        {miniSurprise.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Surprise Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNext}
                  className="mt-5 w-full py-3.5 rounded-xl font-semibold text-sm tracking-wider
                             text-white flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 60%, #9333ea 100%)",
                    boxShadow: "0 8px 28px rgba(244,63,94,0.4)",
                  }}
                >
                  <Sparkles size={15} />
                  <span>Next Surprise</span>
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SurpriseModal;
