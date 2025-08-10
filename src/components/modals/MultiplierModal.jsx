import React from "react";

export default function MultiplierModal({ visible, multiplier }) {
  if (!visible) return null;

  return (
    <div
      className="text-5xl md:text-7xl font-extrabold leading-tight select-none"
      style={{
        fontWeight: "900",
        textShadow: "0 0 12px #4ADE80",
        color: "#FFF",
        userSelect: "none",
      }}
    >
      {multiplier.toFixed(2)}
      <span style={{ color: "#4ADE80" }}>x</span>
    </div>
  );
}
