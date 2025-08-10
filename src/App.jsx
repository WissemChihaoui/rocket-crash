import React from 'react'
import GameInterface from './sections/view/GameInterface'
import GameProvider, { GameContext } from "./context/game-context";
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { SoundProvider } from './context/SoundContext';
import GameSoundManager from './components/GameSoundManager';
gsap.registerPlugin(MotionPathPlugin)
export default function App() {
  return (
    <SoundProvider>
      <GameProvider>
        <GameInterface />
        <GameSoundManager />
      </GameProvider>
    </SoundProvider>
  );
}

