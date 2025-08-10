import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Howl } from "howler";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(true);
  const [volume, setVolumeState] = useState(0.5);

  // Store Howl instances here to control volume dynamically
  const soundRefs = useRef([]);

  // Add Howl instance to refs so we can control volume later
  const registerSound = (howlInstance) => {
    soundRefs.current.push(howlInstance);
    // Set initial volume & mute for this sound
    howlInstance.volume(muted ? 0 : volume);
  };

  // Toggle mute flag
  const toggleMute = () => {
    setMuted((m) => !m);
  };

  // Update volume state and Howler sounds volume immediately
  const setVolume = (val) => {
    if (val < 0) val = 0;
    if (val > 1) val = 1;
    setVolumeState(val);

    soundRefs.current.forEach((sound) => {
      if (!muted) sound.volume(val);
    });
  };

  // When muted changes, update all sounds volume accordingly
  useEffect(() => {
    soundRefs.current.forEach((sound) => {
      sound.volume(muted ? 0 : volume);
    });
  }, [muted, volume]);

  return (
    <SoundContext.Provider
      value={{
        muted,
        toggleMute,
        volume,
        setVolume,
        registerSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
