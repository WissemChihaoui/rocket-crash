import React from "react";
import { useTranslation } from "../../locals/TranslationContext";

export default function CrashModal({ visible, multiplier }) {
  const { t } = useTranslation()
  if (!visible) return null;

  return (
    <>
      <div
        className="text-6xl md:text-8xl font-extrabold leading-none select-none"
        style={{
          fontWeight: "900",
          textShadow: "0 0 12px #EF4444",
          color: "#EF4444",
          userSelect: "none",
        }}
      >
        {multiplier.toFixed(2)}x
      </div>
      <div
        className="text-3xl md:text-4xl font-bold select-none"
        style={{
          color: "#EF4444",
          textShadow: "0 0 6px #EF4444",
        }}
      >
        {t('game.crash')}
      </div>
    </>
  );
}
