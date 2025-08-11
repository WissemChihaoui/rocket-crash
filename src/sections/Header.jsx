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
import TopBiddersList from "./TopBiddersList";
import LanguagePopover from "../components/language-popover/LanguagePopover";
import { useTranslation } from "../locals/TranslationContext";

export default function Header() {
  const { muted, toggleMute } = useSound();
  const { t } = useTranslation();
  const menu = useBoolean()
  const topBidders = useBoolean()
  const playingTime = usePlayingTime();

  // Example timer simulation (increment every second while in_play)


  return (
    <>
      <div className="text-white">
        <div className="w-full flex justify-between items-center px-2 py-1">
          <span className="font-bold"><span>{t('balance')}</span> <span>:1200$</span></span>
          <div className="flex items-center text-3xl gap-2">
            <LanguagePopover />
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
        <div className="relative inline-block mt-2">
          <button
            onClick={topBidders.onToggle}
            className="flex items-center p-1 text-xl bg-[#45f882] text-black rounded"
          >
            <Icon icon="mdi:users-outline" />
            <span className="text-base">12/199</span>
          </button>
          <TopBiddersList onClose={topBidders.onFalse} visible={topBidders.value} />
        </div>
      </div>
      <FullScreenSideMenu visible={menu.value} onClose={() => menu.onFalse()} playingTime={playingTime} />
    </>
  );
}
