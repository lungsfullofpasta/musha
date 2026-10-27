import { Link } from "@tanstack/react-router";

export function Landing() {
  return (
    <main style={{ maxWidth: "40rem", margin: "4rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Musha</h1>
      <p>Welcome. This is the landing page.</p>
      <p>
        <Link to="/app">Open the app</Link>
      </p>
    </main>
  );
}
