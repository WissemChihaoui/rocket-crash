import React, { useContext, useEffect, useRef } from "react";
import { Howl } from "howler";
import { GameContext } from "../context/game-context";
import { useSound } from "../context/SoundContext";

export default function GameSoundManager() {
  const { status } = useContext(GameContext);
  const { muted, registerSound, volume } = useSound();

  const rocketSoundRef = useRef(null);
  const crashSoundRef = useRef(null);

  useEffect(() => {
    if (!rocketSoundRef.current) {
      rocketSoundRef.current = new Howl({
        src: ["/assets/sounds/music.wav"],
        loop: true,
        volume: volume,
      });
      registerSound(rocketSoundRef.current);
    }
    if (!crashSoundRef.current) {
      crashSoundRef.current = new Howl({
        src: ["/assets/sounds/crash.mp3"],
        loop: false,
        volume: volume,
      });
      registerSound(crashSoundRef.current);
    }
  }, [registerSound, volume]);

  useEffect(() => {
    if (muted) {
      rocketSoundRef.current?.stop();
      crashSoundRef.current?.stop();
      return;
    }

    if (status === "in_play") {
      rocketSoundRef.current?.play();
    } else {
      rocketSoundRef.current?.stop();
    }

    if (status === "crash") {
      crashSoundRef.current?.play();
    } else {
      crashSoundRef.current?.stop();
    }
  }, [status, muted]);

  return null;
}
