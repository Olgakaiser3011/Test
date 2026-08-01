import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { yogaPoses } from "../data/yoga";
import PageWrapper from "../components/layout/PageWrapper";
import ConfettiEffect from "../components/ui/ConfettiEffect";

export default function YogaDetailPage() {
  const { poseId } = useParams();
  const navigate = useNavigate();
  const pose = yogaPoses.find((p) => p.id === poseId);

  const [timeLeft, setTimeLeft] = useState(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (pose) setTimeLeft(pose.duration);
    setRunning(false);
    setDone(false);
    return () => clearInterval(timerRef.current);
  }, [poseId]);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRunning(false);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  if (!pose) return <div style={{ padding: 32, textAlign: "center" }}>Pose nicht gefunden.</div>;

  const progress = done ? 1 : running ? (pose.duration - timeLeft) / pose.duration : 0;

  return (
    <PageWrapper>
      <ConfettiEffect show={done} />
      <div
        style={{
          minHeight: "calc(100vh - 72px)",
          background: `linear-gradient(160deg, ${pose.bgFrom}, ${pose.bgTo})`,
          padding: "24px 20px",
        }}
      >
        <button
          onClick={() => navigate("/yoga")}
          style={{
            background: "rgba(255,255,255,0.5)",
            border: "none",
            borderRadius: 14,
            padding: "8px 16px",
            fontFamily: '"Nunito", sans-serif',
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            marginBottom: 16,
            color: "#1e293b",
          }}
        >
          ← Zurück
        </button>

        <div style={{ textAlign: "center" }}>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            style={{ fontSize: 88, lineHeight: 1 }}
          >
            {pose.emoji}
          </motion.div>

          <h1
            style={{
              fontFamily: '"Fredoka One", cursive',
              fontSize: 32,
              color: "#1e293b",
              margin: "12px 0 4px",
            }}
          >
            {pose.name}
          </h1>
          <p
            style={{
              fontFamily: '"Nunito", sans-serif',
              color: "#374151",
              fontWeight: 600,
              fontSize: 15,
              margin: "0 0 24px",
            }}
          >
            {pose.description}
          </p>

          <div
            style={{
              background: "rgba(255,255,255,0.7)",
              borderRadius: 24,
              padding: "20px 20px",
              maxWidth: 420,
              margin: "0 auto 24px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: '"Fredoka One", cursive',
                fontSize: 18,
                color: "#1e293b",
                marginBottom: 12,
              }}
            >
              So geht's:
            </div>
            {pose.instructions.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 10,
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                <span
                  style={{
                    background: pose.accent,
                    color: "white",
                    borderRadius: "50%",
                    width: 26,
                    height: 26,
                    minWidth: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </span>
                {step}
              </motion.div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.6)",
              borderRadius: 20,
              padding: "12px 20px",
              maxWidth: 420,
              margin: "0 auto 20px",
            }}
          >
            <div
              style={{
                fontFamily: '"Fredoka One", cursive',
                fontSize: 36,
                color: done ? "#16a34a" : "#1e293b",
              }}
            >
              {done ? "🎉 Geschafft!" : `${timeLeft}s`}
            </div>
            <div
              style={{
                background: "#e2e8f0",
                borderRadius: 8,
                height: 10,
                margin: "8px 0 0",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress * 100}%` }}
                transition={{ ease: "linear", duration: 0.5 }}
                style={{
                  height: "100%",
                  background: pose.accent,
                  borderRadius: 8,
                }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.button
                key="start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!running && timeLeft === 0) setTimeLeft(pose.duration);
                  setRunning((r) => !r);
                }}
                style={{
                  background: running ? "#f87171" : pose.accent,
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  padding: "16px 40px",
                  fontFamily: '"Fredoka One", cursive',
                  fontSize: 22,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                }}
              >
                {running ? "⏸ Pause" : "▶ Timer starten"}
              </motion.button>
            ) : (
              <motion.div
                key="done"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}
              >
                <p
                  style={{
                    fontFamily: '"Fredoka One", cursive',
                    fontSize: 20,
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Du bist ein Yoga-Star! ⭐
                </p>
                <button
                  onClick={() => {
                    setDone(false);
                    setTimeLeft(pose.duration);
                  }}
                  style={{
                    background: pose.accent,
                    color: "white",
                    border: "none",
                    borderRadius: 20,
                    padding: "14px 32px",
                    fontFamily: '"Fredoka One", cursive',
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  🔄 Nochmal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
