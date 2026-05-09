import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import LoadingScreen from "./components/LoadingScreen";
import CursorGlow from "./components/CursorGlow";
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingElements from "./components/FloatingElements";
import MusicPlayer from "./components/MusicPlayer";
import Hero from "./components/Hero";
import MemoryCard from "./components/MemoryCard";
import SurpriseModal from "./components/SurpriseModal";
import ReasonsSection from "./components/ReasonsSection";
import TimelineSection from "./components/TimelineSection";
import SecretPoem from "./components/SecretPoem";
import ScratchCard from "./components/ScratchCard";
import WishJar from "./components/WishJar";
import BigSurprise from "./components/BigSurprise";

// Data
import { memories, quotes } from "./data/memories";

// ── Floating random quote banner ──
const FloatingQuoteBanner = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show a random quote every 20s
    const show = () => {
      setCurrent(Math.floor(Math.random() * quotes.length));
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };
    const iv = setInterval(show, 22000);
    setTimeout(show, 8000);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          transition={{ duration: 0.6 }}
          className="fixed bottom-24 left-1/2 z-[150] max-w-sm w-[90%]"
        >
          <div
            className="glass-rose px-5 py-3 rounded-2xl text-center"
            style={{ boxShadow: "0 8px 32px rgba(244,63,94,0.2)" }}
          >
            <p className="text-rose-200/90 text-sm font-cormorant italic leading-relaxed">
              ✨ {quotes[current]}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Section Wrapper for scroll-reveal ──
const Section = ({ children, className = "" }) => (
  <div className={`relative z-10 ${className}`}>{children}</div>
);

// ── Section Divider ──
const SectionDivider = ({ emoji = "🌸" }) => (
  <div className="flex items-center justify-center py-4 relative z-10">
    <div className="divider flex-1" />
    <span className="mx-4 text-xl">{emoji}</span>
    <div className="divider flex-1" />
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Keep a ref so onNext always reads the latest selected
  const selectedRef = useRef(selected);
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  const handleCardClick = useCallback((item) => {
    setSelected(item);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    // Delay clear so exit animation completes
    setTimeout(() => setSelected(null), 500);
  }, []);

  // FIX: read from ref (never stale), switch card WITHOUT closing modal first
  const handleNextSurprise = useCallback(() => {
    const current = selectedRef.current;
    if (!current) return;
    const currentIndex = memories.findIndex((m) => m.id === current.id);
    const nextIndex = (currentIndex + 1) % memories.length;
    // Swap the item directly — modal stays open, just content changes
    setSelected(memories[nextIndex]);
    setModalOpen(true);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Global UI Layers */}
          <CursorGlow />
          <AnimatedBackground />
          <FloatingElements />
          <MusicPlayer />
          <FloatingQuoteBanner />

          {/* Main Content */}
          <div className="relative min-h-screen">
            {/* ── Hero ── */}
            <Section>
              <Hero />
            </Section>

            <SectionDivider emoji="💖" />

            {/* ── Memory Gallery ── */}
            <Section className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-14"
                >
                  <span className="text-rose-400/70 tracking-[0.3em] text-xs uppercase font-semibold">
                    Click each card, Mom 🎴
                  </span>
                  <h2 className="text-5xl md:text-6xl font-serif text-white mt-3">
                    Our{" "}
                    <span className="shimmer-text italic">Memories</span>
                  </h2>
                  <p className="mt-4 text-rose-200/60 font-cormorant text-lg italic max-w-xl mx-auto">
                    Each card holds a special message just for you. Tap to open!
                  </p>
                  <div className="divider mt-6" />
                </motion.div>

                {/* Polaroid Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
                  {memories.map((m, i) => (
                    <MemoryCard
                      key={m.id}
                      item={m}
                      index={i}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </div>
            </Section>

            <SectionDivider emoji="✨" />

            {/* ── Reasons Section ── */}
            <Section>
              <ReasonsSection />
            </Section>

            <SectionDivider emoji="🌸" />

            {/* ── Timeline Section ── */}
            <Section>
              <TimelineSection />
            </Section>

            <SectionDivider emoji="💕" />

            {/* ── Secret Poem ── */}
            <Section>
              <SecretPoem />
            </Section>

            <SectionDivider emoji="🪄" />

            {/* ── Scratch Card ── */}
            <Section>
              <ScratchCard />
            </Section>

            <SectionDivider emoji="🫙" />

            {/* ── Wishing Jar ── */}
            <Section>
              <WishJar />
            </Section>

            <SectionDivider emoji="🎁" />

            {/* ── Big Surprise ── */}
            <Section>
              <BigSurprise />
            </Section>

            {/* ── Footer ── */}
            <footer className="relative z-10 text-center py-12 px-4">
              <div className="divider mb-8" />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="font-cursive text-2xl text-rose-300/80 mb-2">
                  Made with infinite love 💖
                </p>
                <p className="text-rose-400/40 text-sm tracking-widest uppercase">
                  For the greatest mom in the universe • Mother's Day 2026
                </p>
                <div className="mt-6 flex justify-center gap-3 text-2xl">
                  {["🌸", "💖", "✨", "🌺", "💕", "⭐", "🎀"].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </footer>
          </div>

          {/* ── Surprise Modal ── */}
          <SurpriseModal
            isOpen={modalOpen}
            item={selected}
            onClose={handleModalClose}
            onNext={handleNextSurprise}
          />
        </>
      )}
    </>
  );
}
