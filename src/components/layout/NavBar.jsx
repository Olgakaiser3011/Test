import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/yoga", label: "Yoga", emoji: "🧘" },
  { to: "/affirmationen", label: "Affirmationen", emoji: "💬" },
  { to: "/atmen", label: "Atmen", emoji: "🌬️" },
];

export default function NavBar() {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0 12px",
        zIndex: 100,
      }}
    >
      {navItems.map(({ to, label, emoji }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            textDecoration: "none",
            color: isActive ? "#a855f7" : "#94a3b8",
            fontFamily: '"Nunito", sans-serif',
            fontWeight: 700,
            fontSize: 11,
            minWidth: 60,
            transition: "color 0.2s",
          })}
        >
          {({ isActive }) => (
            <>
              <span style={{ fontSize: isActive ? 28 : 24, transition: "font-size 0.2s" }}>
                {emoji}
              </span>
              <span>{label}</span>
              {isActive && (
                <span
                  style={{
                    width: 24,
                    height: 4,
                    borderRadius: 2,
                    background: "#a855f7",
                    marginTop: 2,
                  }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
