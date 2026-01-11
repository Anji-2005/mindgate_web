export default function Page({ children }) {
  return (
    <div style={outer}>
      <div style={container}>{children}</div>
    </div>
  );
}

const outer = {
  minHeight: "100vh",
  background: "#ffffff",
};

const container = {
  width: "min(620px, 92vw)",   // narrow like Figma
  margin: "0 auto",
  padding: "14px 12px 40px",
};

