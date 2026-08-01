import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#f472b6", "#facc15", "#34d399", "#60a5fa", "#c084fc", "#fb923c"];

export default function ConfettiEffect({ show }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      setParticles(
        Array.from({ length: 30 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          color: COLORS[i % COLORS.length],
          size: 8 + Math.random() * 12,
          drift: (Math.random() - 0.5) * 200,
          delay: Math.random() * 0.4,
        }))
      );
    } else {
      setParticles([]);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: "100vh", x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "-20vh", x: `calc(${p.x}vw + ${p.drift}px)`, opacity: 0, rotate: 360 }}
              transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: 2,
                background: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
