// src/components/CursorGlow.jsx
import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const handleEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "50px";
        cursorRef.current.style.height = "50px";
      }
    };
    const handleLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "20px";
        cursorRef.current.style.height = "20px";
      }
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("button, a, [role='button'], .cursor-pointer").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    let raf;
    const animateFollower = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.1;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.1;
      if (followerRef.current) {
        followerRef.current.style.left = followerPos.current.x + "px";
        followerRef.current.style.top = followerPos.current.y + "px";
      }
      raf = requestAnimationFrame(animateFollower);
    };
    raf = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        id="cursor-glow"
        style={{
          width: "20px",
          height: "20px",
          background: "radial-gradient(circle, rgba(244,63,94,0.9) 0%, rgba(236,72,153,0.6) 50%, transparent 70%)",
          borderRadius: "50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      {/* Follower Glow */}
      <div
        ref={followerRef}
        style={{
          width: "60px",
          height: "60px",
          background: "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(244,63,94,0.15)",
        }}
      />
    </>
  );
};

export default CursorGlow;
