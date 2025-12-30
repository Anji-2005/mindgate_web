import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  const logoStyle = {
    fontWeight: 900,
    letterSpacing: "0.8px",
    fontSize: "18px",
    color: "#0d3a25",
    cursor: "pointer",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  };

  return (
    <div style={logoStyle} onClick={() => navigate("/")}>
      MIND<span style={{ color: "#0fb478" }}>GATE</span>
    </div>
  );
}