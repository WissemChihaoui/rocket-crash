// ModalContainer.jsx
import React from "react";

export default function ModalContainer({ children, visible }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        display: visible ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        userSelect: "none",
        pointerEvents: visible ? "auto" : "none",
        flexDirection: "column",
        textAlign: "center",
        zIndex: 50,
        padding: "1rem",
        boxSizing: "border-box",
        background: "transparent",
      }}
    >
      {children}
    </div>
  );
}
