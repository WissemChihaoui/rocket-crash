import React from "react";
import { Icon } from "@iconify/react";

const USERS = [
  { name: "RocketKing", bid: 350 },
  { name: "BetMaster", bid: 280 },
  { name: "CashQueen", bid: 260 },
  { name: "LuckyLuke", bid: 200 },
  { name: "AceGambler", bid: 180 },
  { name: "SpeedyBet", bid: 150 },
  { name: "HighRoller", bid: 140 },
  { name: "RiskyRick", bid: 120 },
  { name: "FastCash", bid: 110 },
  { name: "CryptoBet", bid: 100 },
  { name: "LastOne", bid: 90 },
];

export default function TopBiddersList({ onClose, visible }) {
  if (!visible) return null;

  const sorted = [...USERS].sort((a, b) => b.bid - a.bid).slice(0, 10);

  return (
    <div
      className="
        absolute top-full left-0 mt-2
        bg-black/80 rounded-xl z-50 w-56 sm:w-64 
        max-h-[60vh] overflow-y-auto
        backdrop-blur-md shadow-lg
        animate-fadeIn
      "
    >
      {/* Close Button */}
     

      {/* List */}
      <ul className="space-y-1 text-xs px-2 pb-2">
        {sorted.map((user, index) => {
          let base = "flex justify-between items-center px-3 py-1 rounded text-white";
          let style = "bg-gray-800/40";

          if (index === 0) style = "bg-yellow-400/30 text-yellow-200 font-bold";
          if (index === 1) style = "bg-gray-300/20 text-gray-200 font-bold";
          if (index === 2) style = "bg-amber-600/30 text-amber-200 font-bold";

          return (
            <li key={index} className={`${base} ${style}`}>
              <span className="truncate">{index + 1}. {user.name}</span>
              <span>${user.bid}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
