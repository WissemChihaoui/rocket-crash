// Overlay.jsx
import React from "react";

export default function Overlay({ visible, onClick }) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClick}
    />
  );
}
