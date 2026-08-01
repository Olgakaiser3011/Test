import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";

const features = [
  {
    to: "/yoga",
    emoji: "🧘",
    title: "Yoga-Übungen",
    desc: "9 tolle Posen für dich",
    bgFrom: "#bbf7d0",
    bgTo: "#4ade80",
  },
  {
    to: "/affirmationen",
    emoji: "💬",
    title: "Affirmationen",
    desc: "Schöne Gedanken für jeden Tag",
    bgFrom: "#e9d5ff",
    bgTo: "#c084fc",
  },
  {
    to: "/atmen",
    emoji: "🌬️",
    title: "Atemübungen",
    desc: "Atme dich in Ruhe",
    bgFrom: "#bae6fd",
    bgTo: "#38bdf8",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "calc(100vh - 72px)",
          background: "linear-gradient(160deg, #6d28d9 0%, #3b82f6 50%, #06b6d4 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 20px 24px",
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
          style={{ fontSize: 72, marginBottom: 8 }}
        >
          🌟
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: '"Fredoka One", cursive',
            fontSize: 32,
            color: "white",
            textAlign: "center",
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}
        >
          Mein kleines Yoga-Studio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: '"Nunito", sans-serif',
            color: "rgba(255,255,255,0.85)",
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Was möchtest du heute tun?
        </motion.p>

        <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 }}>
          {features.map(({ to, emoji, title, desc, bgFrom, bgTo }, i) => (
            <motion.button
              key={to}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 180 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(to)}
              style={{
                background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})`,
                border: "none",
                borderRadius: 24,
                padding: "20px 24px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                width: "100%",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 48 }}>{emoji}</span>
              <div>
                <div
                  style={{
                    fontFamily: '"Fredoka One", cursive',
                    fontSize: 22,
                    color: "#1e293b",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: 14,
                    color: "#475569",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {desc}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
          style={{
            color: "white",
            fontFamily: '"Nunito", sans-serif',
            fontSize: 14,
            marginTop: 32,
            textAlign: "center",
          }}
        >
          Du bist wunderbar! ✨
        </motion.p>
      </div>
    </PageWrapper>
  );
}
