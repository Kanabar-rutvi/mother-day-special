// src/components/AnimatedBackground.jsx
import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Particles
    const particles = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() * 60 + 320, // rose/pink/purple range
    }));

    // Stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((star) => {
        star.twinkle += star.speed;
        const alpha = (Math.sin(star.twinkle) + 1) / 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 240, ${alpha * 0.8})`;
        ctx.fill();
      });

      // Mouse glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      grad.addColorStop(0, "rgba(244,63,94,0.05)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.forEach((p) => {
        // Pull toward mouse
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += dx * 0.001;
          p.y += dy * 0.001;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity * 0.1})`;
        ctx.fill();
      });

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Deep night sky gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, #2d0040 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 80%, #1a0030 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 100%, #200025 0%, transparent 60%), " +
            "#0d0010",
        }}
      />

      {/* Animated nebula blobs */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.35 }}
      >
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            top: "-100px",
            left: "-100px",
            background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)",
            animation: "drift 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            bottom: "0",
            right: "-100px",
            background: "radial-gradient(circle, rgba(244,63,94,0.25) 0%, transparent 70%)",
            animation: "drift 25s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            top: "40%",
            left: "40%",
            background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)",
            animation: "drift 18s ease-in-out infinite 5s",
          }}
        />
      </div>

      {/* Canvas for particles & stars */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />
    </>
  );
};

export default AnimatedBackground;
