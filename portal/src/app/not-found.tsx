import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section className="panel" style={{ width: "min(520px, 100%)", padding: 32, textAlign: "center" }}>
        <span className="kicker" style={{ color: "var(--blue-700)" }}>Not found</span>
        <h1 style={{ margin: "18px 0 8px" }}>This preview record does not exist.</h1>
        <p style={{ color: "var(--ink-500)", margin: "0 0 24px" }}>Return to the sample application queue and choose one of the available records.</p>
        <Link className="button button--secondary" href="/secretariat">Return to secretariat</Link>
      </section>
    </main>
  );
}
