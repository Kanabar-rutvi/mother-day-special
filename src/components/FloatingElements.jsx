// src/components/FloatingElements.jsx
import { useMemo } from "react";

const PETALS = ["🌸", "🌺", "🌹", "💮", "🪷"];
const SYMBOLS = ["❤️", "💕", "✨", "💫", "⭐", "🌟"];

const FloatingElements = () => {
  const petals = useMemo(
    () =>
      [...Array(18)].map((_, i) => ({
        id: i,
        symbol: i % 3 === 0 ? SYMBOLS[i % SYMBOLS.length] : PETALS[i % PETALS.length],
        left: Math.random() * 100,
        duration: Math.random() * 8 + 7,
        delay: Math.random() * 10,
        size: Math.random() * 16 + 12,
        drift: (Math.random() - 0.5) * 80,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            bottom: "-30px",
            fontSize: `${p.size}px`,
            opacity: 0.5,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
            animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`,
            filter: "drop-shadow(0 0 4px rgba(244,63,94,0.4))",
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
