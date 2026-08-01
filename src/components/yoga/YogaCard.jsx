import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function YogaCard({ pose, index }) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 200 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/yoga/${pose.id}`)}
      style={{
        background: `linear-gradient(135deg, ${pose.bgFrom}, ${pose.bgTo})`,
        border: "none",
        borderRadius: 24,
        padding: 20,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        minHeight: 140,
        width: "100%",
      }}
    >
      <span style={{ fontSize: 48 }}>{pose.emoji}</span>
      <span
        style={{
          fontFamily: '"Fredoka One", cursive',
          fontSize: 18,
          color: "#1e293b",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {pose.name}
      </span>
      <span
        style={{
          background: "rgba(255,255,255,0.6)",
          borderRadius: 20,
          padding: "2px 10px",
          fontSize: 12,
          fontWeight: 700,
          color: "#475569",
          fontFamily: '"Nunito", sans-serif',
        }}
      >
        {pose.difficulty} · {pose.duration}s
      </span>
    </motion.button>
  );
}
