import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useSound } from "../../context/SoundContext";
import { useTranslation } from "../../locals/TranslationContext";



const BETS = [
  { time: "12:01", amount: "50.00", multiplier: "2.5x", payout: "+75.00", win: true },
  { time: "12:03", amount: "20.00", multiplier: "1.8x", payout: "-20.00", win: false },
  { time: "12:05", amount: "35.50", multiplier: "3.0x", payout: "+71.00", win: true },
  { time: "12:08", amount: "15.00", multiplier: "2.2x", payout: "-15.00", win: false },
  { time: "12:12", amount: "40.00", multiplier: "1.5x", payout: "+20.00", win: true },
  { time: "12:15", amount: "60.00", multiplier: "4.0x", payout: "+180.00", win: true },
  { time: "12:18", amount: "25.00", multiplier: "2.0x", payout: "-25.00", win: false },
  { time: "12:21", amount: "10.00", multiplier: "5.0x", payout: "+40.00", win: true },
  { time: "12:25", amount: "30.00", multiplier: "1.6x", payout: "-30.00", win: false },
  { time: "12:29", amount: "45.00", multiplier: "2.8x", payout: "+81.00", win: true },
];

export default function FullScreenSideMenu({ visible, onClose, playingTime }) {
  const menuRef = useRef(null);
  const { t } = useTranslation();

  const { volume, setVolume } = useSound();
  const [activeTab, setActiveTab] = useState("myBets");
  const TABS = [
    { id: "myBets", label: t('header.menu.myBets.title'), icon: "mdi:cards-outline" },
    { id: "rules", label: t('header.menu.rules.title'), icon: "mdi:file-document-outline" },
    { id: "exit", label: t('header.menu.exit.title'), icon: "mdi:exit-to-app" },
  ];
  // Slide in/out animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (visible) {
      gsap.to(menuRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [visible]);

  const renderContent = () => {
    switch (activeTab) {
      case "myBets":
        return (
          <div className="p-4 text-white overflow-auto" style={{ maxHeight: "70vh" }}>
            <h2 className="text-2xl font-bold mb-4">{t('header.menu.myBets.title')}</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2">{t('header.menu.myBets.time')}</th>
                  <th className="p-2">{t('header.menu.myBets.betAmount')}</th>
                  <th className="p-2">{t('header.menu.myBets.multiplier')}</th>
                  <th className="p-2">{t('header.menu.myBets.payout')}</th>
                </tr>
              </thead>
              <tbody>
                {BETS.map((bet, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-gray-700 even:bg-gray-600 hover:bg-gray-500 transition"
                  >
                    <td className="p-2">{bet.time}</td>
                    <td className="p-2">${bet.amount}</td>
                    <td className="p-2">{bet.multiplier}</td>
                    <td
                      className={`p-2 font-bold ${bet.win ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {bet.payout}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "rules":
        return (
          <div className="p-4 text-white overflow-auto" style={{ maxHeight: "70vh" }}>
            <h2 className="text-2xl font-bold mb-4">{t('header.menu.rules.title')}</h2>
            <p>
              <p>{t('header.menu.rules.content.1')}</p>
              <p>{t('header.menu.rules.content.2')}</p>
              <p>{t('header.menu.rules.content.3')}</p>
            </p>
          </div>
        );
      case "exit":
        return (
          <div className="p-4 text-white">
            <h2 className="text-2xl font-bold mb-4">{t('header.menu.exit.title')}</h2>
            <p>{t('header.menu.exit.confirmation')}</p>
            <button
              onClick={() => {
                // Your exit logic here
                alert("Exiting game...");
                onClose();
              }}
              className="mt-4 px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition"
            >
              {t('header.menu.exit.confirmBtn')}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside
      ref={menuRef}
      className="fixed top-0 right-0 w-full h-full bg-gray-900 z-[9999] transform translate-x-full flex flex-col"
    >
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">{t('header.menu.title')}</h1>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-white text-4xl hover:text-red-500"
        >
          &times;
        </button>
      </header>

      {/* Tabs */}
      <nav className="flex justify-around bg-gray-800 text-white">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`flex flex-col items-center py-3 px-4 flex-1 ${activeTab === id ? "bg-gray-700" : "hover:bg-gray-700"
              } transition`}
            onClick={() => setActiveTab(id)}
          >
            <Icon icon={icon} className="text-3xl mb-1" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-grow overflow-y-auto">{renderContent()}</main>

      {/* Footer with volume and playing time */}
      <footer className="p-4 border-t border-gray-700 bg-gray-800 text-white flex flex-col gap-4">
        <div>
          <label htmlFor="volume" className="block mb-1 font-semibold">
            {t('header.menu.volume')}: {(volume * 100).toFixed(0)}%
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="text-center tracking-wide">
          {t('header.menu.playingTime')} {playingTime}
        </div>
      </footer>
    </aside>
  );
}
