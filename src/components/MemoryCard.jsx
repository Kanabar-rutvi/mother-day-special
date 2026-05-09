// src/components/MemoryCard.jsx
import { useRef } from "react";
import { motion } from "framer-motion";

const MemoryCard = ({ item, index, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onClick={() => onClick(item)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer group relative"
        style={{
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Polaroid Frame */}
        <div
          className="polaroid relative"
          style={{
            borderRadius: "4px",
            transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
          }}
        >
          {/* Tape */}
          <div className="tape absolute" />

          {/* Image */}
          <div className="relative overflow-hidden" style={{ borderRadius: "2px", aspectRatio: "1" }}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-4">
              <span className="text-white text-sm font-medium tracking-wide">Open Me ❤️</span>
            </div>
            {/* Shimmer sweep on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s linear",
              }}
            />
          </div>

          {/* Polaroid Caption */}
          <div className="pt-3 pb-1 px-1 text-center">
            <span className="text-base" style={{ filter: "drop-shadow(0 0 4px rgba(244,63,94,0.5))" }}>
              {item.emoji}
            </span>
            <h3
              className="font-cursive text-rose-200 mt-1 text-lg leading-tight"
              style={{ textShadow: "0 0 10px rgba(244,63,94,0.3)" }}
            >
              {item.title}
            </h3>
            <p className="text-rose-400/60 text-xs mt-1 tracking-wider uppercase">{item.tag}</p>
          </div>
        </div>

        {/* Glow pulse on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm -z-10"
          style={{
            boxShadow: "0 0 40px rgba(244,63,94,0.3), 0 0 80px rgba(236,72,153,0.15)",
            filter: "blur(10px)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default MemoryCard;
