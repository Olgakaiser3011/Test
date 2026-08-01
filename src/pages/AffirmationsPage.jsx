import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import { affirmations } from "../data/affirmations";

export default function AffirmationsPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const current = affirmations[index];

  const go = (dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + affirmations.length) % affirmations.length);
  };

  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "calc(100vh - 72px)",
          background: "linear-gradient(160deg, #fdf4ff 0%, #fce7f3 100%)",
          padding: "32px 20px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 48 }}>💬</span>
        <h1
          style={{
            fontFamily: '"Fredoka One", cursive',
            fontSize: 28,
            color: "#86198f",
            margin: "8px 0 4px",
          }}
        >
          Affirmationen
        </h1>
        <p
          style={{
            fontFamily: '"Nunito", sans-serif',
            color: "#a21caf",
            fontWeight: 600,
            fontSize: 14,
            margin: "0 0 32px",
          }}
        >
          Tippe, um weiterzugehen!
        </p>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={{
              enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{
              background: `linear-gradient(135deg, ${current.bgFrom}, ${current.bgTo})`,
              borderRadius: 32,
              padding: "48px 32px",
              maxWidth: 380,
              width: "100%",
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              minHeight: 280,
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => go(1)}
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{ fontSize: 72 }}
            >
              {current.emoji}
            </motion.span>
            <p
              style={{
                fontFamily: '"Fredoka One", cursive',
                fontSize: 24,
                color: "#1e293b",
                textAlign: "center",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
            alignItems: "center",
          }}
        >
          <button
            onClick={() => go(-1)}
            style={{
              background: "white",
              border: "none",
              borderRadius: 16,
              width: 52,
              height: 52,
              fontSize: 22,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            ←
          </button>

          <div style={{ display: "flex", gap: 6 }}>
            {affirmations.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                style={{
                  width: i === index ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === index ? "#a855f7" : "#d8b4fe",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            style={{
              background: "white",
              border: "none",
              borderRadius: 16,
              width: 52,
              height: 52,
              fontSize: 22,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            →
          </button>
        </div>

        <p
          style={{
            fontFamily: '"Nunito", sans-serif',
            color: "#a21caf",
            fontWeight: 700,
            marginTop: 16,
            fontSize: 14,
          }}
        >
          {index + 1} von {affirmations.length}
        </p>
      </div>
    </PageWrapper>
  );
}
