import { Link, Outlet } from "@tanstack/react-router";

// The app shell. Every page under /app renders inside this layout.
export function AppLayout() {
  return (
    <div style={{ maxWidth: "40rem", margin: "4rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/app">Home</Link>
        <Link to="/app/about">About</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
