import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSound } from "../context/SoundContext";
import { bidSettings } from "../_mock/_bid";
import BidHistoryBull from '../components/bid-history-bull/BidHistoryBull';
import Overlay from "../components/Overlay";
import SideMenu from "../components/side-menu/SideMenu";
import { useBoolean } from "../hooks/use-boolean";
import FullScreenSideMenu from "../components/side-menu/FullSideMenu";
import { usePlayingTime } from "../hooks/use-playing-time";

export default function Header() {
  const { muted, toggleMute } = useSound();
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useBoolean()
  const playingTime = usePlayingTime();

  // Example timer simulation (increment every second while in_play)
  

  return (
    <>
      <div className="text-white">
        <div className="w-full flex justify-between items-center px-2 py-1">
          <span className="font-bold">Balance :1200 $</span>
          <div className="flex items-center text-3xl gap-2">
            <button
              className="cursor-pointer"
              onClick={toggleMute}
              aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            >
              <Icon icon={muted ? "mdi-light:music-off" : "mdi-light:music"} />
            </button>
            <button
              className="cursor-pointer"
              onClick={menu.onToggle}
              aria-label={menu.value ? "Close menu" : "Open menu"}
            >
              <Icon icon="gg:menu-right" />
            </button>
          </div>
        </div>
        <div className='w-full items-center flex gap-1 overflow-hidden'>
          {bidSettings.autoCashOut.map((b, index) => (
            <BidHistoryBull key={index} bid={b} />
          ))}
        </div>
      </div>

      <FullScreenSideMenu visible={menu.value} onClose={() => menu.onFalse()} playingTime={playingTime}/>
    </>
  );
}
