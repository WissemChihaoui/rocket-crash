import React, { useState } from "react";
import { useTranslation } from "../../locals/TranslationContext";

export default function Slider() {
  const [value, setValue] = useState(0); // 0 means "OFF"
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center w-full gap-2">
      {/* Label */}
      <div className="flex justify-between w-full text-sm md:text-base text-gray-400">
        <span>{t('bids.amount.autoCashout')}:</span>
        <span className="text-white font-semibold">
          {value === 0 ? t('bids.amount.off') : `${value}x`}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="20"
        step="0.1"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="w-full h-2 bg-[#1a2333] rounded-lg appearance-none cursor-pointer accent-[#00b87c]"
      />

      {/* Min/Max labels */}
      <div className="flex justify-between w-full text-xs text-gray-500">
        <span>{t('bids.amount.off')}</span>
        <span>{t('bids.amount.max')}</span>
      </div>
    </div>
  );
}
