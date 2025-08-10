import React, { useContext } from 'react'

import BidSections from '../BidSections'
import Header from '../Header'
import RocketInterface from '../RocketInterface'
import { GameContext } from '../../context/game-context'
import LayoutGame from '../../layout/layout-game'
import GameModals from '../../components/GameModals'

// Register plugin


export default function GameInterface() {
    const { status } = useContext(GameContext)
    return (
        <LayoutGame>
            <GameModals />
            <div className="flex flex-col h-screen p-1 max-w-screen-2xl mx-auto">
                <Header />
                <RocketInterface />
                <BidSections />
            </div>
        </LayoutGame>
    )
}