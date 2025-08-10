import React, { useState } from "react";

export default function Slider() {
  const [value, setValue] = useState(0); // 0 means "OFF"

  return (
    <div className="flex flex-col items-center w-full gap-2">
      {/* Label */}
      <div className="flex justify-between w-full text-sm md:text-base text-gray-400">
        <span>Auto Cash Out:</span>
        <span className="text-white font-semibold">
          {value === 0 ? "Off" : `${value}x`}
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
        <span>OFF</span>
        <span>MAX</span>
      </div>
    </div>
  );
}
