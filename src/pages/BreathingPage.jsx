import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import BreathingCircle from "../components/breathing/BreathingCircle";
import ConfettiEffect from "../components/ui/ConfettiEffect";
import { breathingExercises } from "../data/breathing";

export default function BreathingPage() {
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDone = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <PageWrapper>
      <ConfettiEffect show={showConfetti} />
      <div
        style={{
          minHeight: "calc(100vh - 72px)",
          background: selected
            ? `linear-gradient(160deg, ${selected.bgFrom}, ${selected.bgTo})`
            : "linear-gradient(160deg, #dbeafe 0%, #e0f2fe 100%)",
          padding: "32px 20px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "background 0.6s ease",
        }}
      >
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ width: "100%", maxWidth: 420 }}
            >
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ fontSize: 48 }}>🌬️</span>
                <h1
                  style={{
                    fontFamily: '"Fredoka One", cursive',
                    fontSize: 28,
                    color: "#1e40af",
                    margin: "8px 0 4px",
                  }}
                >
                  Atemübungen
                </h1>
                <p
                  style={{
                    fontFamily: '"Nunito", sans-serif',
                    color: "#3b82f6",
                    fontWeight: 600,
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  Welche Übung möchtest du machen?
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {breathingExercises.map((ex, i) => (
                  <motion.button
                    key={ex.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 180 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(ex)}
                    style={{
                      background: `linear-gradient(135deg, ${ex.bgFrom}, ${ex.bgTo})`,
                      border: "none",
                      borderRadius: 24,
                      padding: "20px 24px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 44 }}>{ex.emoji}</span>
                    <div>
                      <div
                        style={{
                          fontFamily: '"Fredoka One", cursive',
                          fontSize: 20,
                          color: "#1e293b",
                        }}
                      >
                        {ex.name}
                      </div>
                      <div
                        style={{
                          fontFamily: '"Nunito", sans-serif',
                          fontSize: 13,
                          color: "#475569",
                          fontWeight: 600,
                          marginTop: 2,
                        }}
                      >
                        {ex.description}
                      </div>
                      <div
                        style={{
                          fontFamily: '"Nunito", sans-serif',
                          fontSize: 12,
                          color: "#64748b",
                          fontWeight: 700,
                          marginTop: 4,
                        }}
                      >
                        {ex.rounds} Runden · {ex.phases.map((p) => p.duration).reduce((a, b) => a + b, 0)}s pro Runde
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: 24 }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  alignSelf: "flex-start",
                  background: "rgba(255,255,255,0.5)",
                  border: "none",
                  borderRadius: 14,
                  padding: "8px 16px",
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  color: "#1e293b",
                }}
              >
                ← Zurück
              </button>

              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 48 }}>{selected.emoji}</span>
                <h2
                  style={{
                    fontFamily: '"Fredoka One", cursive',
                    fontSize: 26,
                    color: "#1e293b",
                    margin: "8px 0 4px",
                  }}
                >
                  {selected.name}
                </h2>
                <p
                  style={{
                    fontFamily: '"Nunito", sans-serif',
                    color: "#374151",
                    fontWeight: 600,
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  {selected.description}
                </p>
              </div>

              <BreathingCircle key={selected.id} exercise={selected} onDone={handleDone} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
