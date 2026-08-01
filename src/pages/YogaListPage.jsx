import PageWrapper from "../components/layout/PageWrapper";
import YogaCard from "../components/yoga/YogaCard";
import { yogaPoses } from "../data/yoga";

export default function YogaListPage() {
  return (
    <PageWrapper>
      <div
        style={{
          background: "linear-gradient(160deg, #d1fae5 0%, #f0fdf4 100%)",
          minHeight: "calc(100vh - 72px)",
          padding: "32px 20px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 48 }}>🧘</span>
          <h1
            style={{
              fontFamily: '"Fredoka One", cursive',
              fontSize: 30,
              margin: "8px 0 4px",
              color: "#166534",
            }}
          >
            Yoga-Übungen
          </h1>
          <p
            style={{
              fontFamily: '"Nunito", sans-serif',
              color: "#4b7c59",
              fontWeight: 600,
              fontSize: 15,
              margin: 0,
            }}
          >
            Wähle eine Pose und leg los!
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          {yogaPoses.map((pose, i) => (
            <YogaCard key={pose.id} pose={pose} index={i} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
