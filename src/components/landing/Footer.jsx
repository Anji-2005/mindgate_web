export default function Footer() {
  return (
    <footer style={{ padding: "22px 0 34px" }}>
      <div className="lp-container" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div style={{ color: "rgba(11, 43, 32, 0.7)", fontSize: 13 }}>
          © {new Date().getFullYear()} MindGate. All rights reserved.
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
          <a className="lp-nav-link" href="#" onClick={(e) => e.preventDefault()}>
            Privacy
          </a>
          <a className="lp-nav-link" href="#" onClick={(e) => e.preventDefault()}>
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
