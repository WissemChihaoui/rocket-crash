// CountdownModal.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CountdownModal({ visible, timer }) {
  const countdownRef = useRef(null);

  useEffect(() => {
    if (visible && countdownRef.current) {
      gsap.fromTo(
        countdownRef.current,
        { scale: 1 },
        { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
  }, [timer, visible]);

  return (
    <div style={{ color: "#FFD700" }}>
      <div className="text-base md:text-lg mb-1">Next Round In</div>
      <div
        ref={countdownRef}
        className="text-6xl md:text-8xl font-bold leading-none select-none"
        style={{ userSelect: "none" }}
      >
        {timer}
      </div>
    </div>
  );
}
