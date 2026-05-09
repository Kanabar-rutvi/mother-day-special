// src/components/TimelineSection.jsx
import { motion } from "framer-motion";
import { timeline } from "../data/memories";

const TimelineSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(147,51,234,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400/70 tracking-[0.3em] text-xs uppercase font-semibold">
            Our journey together
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-white mt-3 mb-4">
            Memory{" "}
            <span className="shimmer-text italic">Timeline</span>
          </h2>
          <div className="divider mt-6" />
        </motion.div>

        {/* Timeline Items */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line"
            style={{ opacity: 0.5 }}
          />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"} gap-6`}
                >
                  {/* Content Card */}
                  <div className="flex-1">
                    <div
                      className={`glass-rose p-5 rounded-2xl ${isLeft ? "text-right" : "text-left"}`}
                    >
                      <p className="text-rose-400/60 text-xs uppercase tracking-widest mb-1 font-medium">
                        {item.year}
                      </p>
                      <p className="text-rose-100/80 font-cormorant text-lg italic">
                        {item.event}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 text-xl
                               border border-rose-500/30"
                    style={{
                      background: "rgba(244,63,94,0.15)",
                      boxShadow: "0 0 20px rgba(244,63,94,0.3)",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
