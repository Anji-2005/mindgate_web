export default function FeatureCard({ label, title, text, button, reverse }) {
  return (
    <div style={{ ...row, gridTemplateColumns: reverse ? "1fr 1fr" : "1fr 1fr" }}>
      {/* Left visual block */}
      <div style={{ ...leftBlock, order: reverse ? 2 : 1 }}>
        <div style={labelPill}>{label}</div>
        <div style={illustration}>ILLUSTRATION</div>
      </div>

      {/* Right text block */}
      <div style={{ ...rightBlock, order: reverse ? 1 : 2 }}>
        <p style={rightText}>{text}</p>
        <button style={cta}>{button}</button>
      </div>
    </div>
  );
}

const row = {
  display: "grid",
  gap: 14,
  alignItems: "center",
  marginTop: 22,
};

const leftBlock = {
  position: "relative",
  padding: 12,
  borderRadius: 22,
  background: "#EAFBF0",
  minHeight: 170,
  overflow: "hidden",
};

const labelPill = {
  display: "inline-block",
  background: "#DFF7E8",
  color: "#1E7F43",
  fontWeight: 800,
  fontSize: 10,
  padding: "8px 10px",
  borderRadius: 14,
};

const illustration = {
  marginTop: 10,
  height: 120,
  borderRadius: 18,
  background: "#bfeecf",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#2b6d3f",
  fontWeight: 800,
  fontSize: 11,
};

const rightBlock = {
  padding: 6,
};

const rightText = {
  margin: 0,
  fontSize: 10,
  lineHeight: 1.55,
  opacity: 0.75,
};

const cta = {
  marginTop: 10,
  border: "none",
  borderRadius: 999,
  background: "#1E7F43",
  color: "white",
  padding: "8px 14px",
  fontSize: 10,
  fontWeight: 800,
  cursor: "pointer",
};