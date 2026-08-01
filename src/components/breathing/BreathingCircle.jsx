import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BreathingCircle({ exercise, onDone }) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(exercise.phases[0].duration);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  const phases = exercise.phases;
  const currentPhase = phases[phaseIdx];
  const totalRounds = exercise.rounds;

  useEffect(() => {
    setPhaseIdx(0);
    setRound(1);
    setTimeLeft(exercise.phases[0].duration);
    setDone(false);
  }, [exercise.id]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          const nextPhase = phaseIdx + 1;
          if (nextPhase < phases.length) {
            setPhaseIdx(nextPhase);
            setTimeLeft(phases[nextPhase].duration);
          } else {
            if (round >= totalRounds) {
              setDone(true);
              onDone && onDone();
            } else {
              setRound((r) => r + 1);
              setPhaseIdx(0);
              setTimeLeft(phases[0].duration);
            }
          }
          return phases[nextPhase < phases.length ? nextPhase : 0]?.duration ?? 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phaseIdx, round]);

  const isExpand = currentPhase.label.toLowerCase().includes("einatmen") ||
    currentPhase.label.toLowerCase().includes("hoch");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <div style={{ position: "relative", width: 220, height: 220 }}>
        <motion.div
          animate={{ scale: done ? 1 : isExpand ? 1.35 : 0.85 }}
          transition={{
            duration: currentPhase.duration * 0.9,
            ease: "easeInOut",
          }}
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${currentPhase.color}cc, ${currentPhase.color})`,
            boxShadow: `0 0 40px ${currentPhase.color}88`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 36, fontFamily: '"Fredoka One", cursive', color: "white" }}>
            {done ? "🎉" : timeLeft}
          </span>
          <span style={{ fontSize: 13, color: "white", fontWeight: 700, fontFamily: '"Nunito", sans-serif', textAlign: "center", padding: "0 16px" }}>
            {done ? "Super gemacht!" : currentPhase.label}
          </span>
        </div>
      </div>

      <div style={{ fontFamily: '"Nunito", sans-serif', color: "#64748b", fontWeight: 700 }}>
        Runde {Math.min(round, totalRounds)} von {totalRounds}
      </div>
    </div>
  );
}
