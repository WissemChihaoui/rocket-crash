import RocketLottie from './components/RocketLottie'
import React from 'react'
import LayoutGame from './layout/layout-game'
import BidSections from './sections/BidSections'
import Header from './sections/Header'
import GameInterface from './sections/GameInterface'


export default function App() {
  return (
    <LayoutGame>
      <div className="flex flex-col h-full p-6">
        <Header />
        <GameInterface />
        <BidSections />
      </div>
    </LayoutGame>
  )
}
