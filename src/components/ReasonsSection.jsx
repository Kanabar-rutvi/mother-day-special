// src/components/ReasonsSection.jsx
import { motion } from "framer-motion";
import { lovingReasons } from "../data/memories";

const ReasonsSection = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(236,72,153,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-rose-400/70 tracking-[0.3em] text-xs uppercase font-semibold">
            From the heart
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-white mt-3 mb-4">
            Reasons I{" "}
            <span className="shimmer-text italic">Love You</span>
          </h2>
          <div className="divider mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {lovingReasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="reason-card rounded-2xl p-5 text-center cursor-default"
            >
              <div className="text-3xl mb-3">{reason.emoji}</div>
              <p className="text-rose-100/80 text-sm leading-relaxed font-cormorant text-base">
                {reason.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
