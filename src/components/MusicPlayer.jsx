// src/components/MusicPlayer.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// We'll use a gentle royalty-free ambient piano piece from a CDN
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const hideTooltip = setTimeout(() => setShowTooltip(false), 4000);
    return () => {
      audio.pause();
      audio.src = "";
      clearTimeout(hideTooltip);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div className="fixed bottom-6 left-6 z-[200] flex flex-col items-start gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-rose px-3 py-2 rounded-xl text-xs text-rose-200 whitespace-nowrap mb-1"
          >
            🎵 Play background music
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-rose rounded-2xl px-4 py-3 flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={toggle}
          className="magnetic-btn w-10 h-10 rounded-full flex items-center justify-center
                     bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500
                     shadow-lg shadow-rose-500/30 transition-all duration-200"
        >
          {playing ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Bars animation */}
        {playing && (
          <div className="flex items-end gap-0.5 h-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-rose-400 rounded-full"
                style={{
                  animation: `loadingPulse ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                  height: `${40 + i * 15}%`,
                }}
              />
            ))}
          </div>
        )}

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolume}
          className="w-16 accent-rose-500 cursor-pointer"
        />

        <span className="text-xs text-rose-300/70">
          {playing ? "♪" : "♩"}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;
