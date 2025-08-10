import React, { useContext } from 'react'
import BidCard from '../components/BidCard'
import { GameContext } from '../context/game-context'

export default function BidSections() {
  const {myBid1, setMyBid1, myBid2, setMyBid2} = useContext(GameContext)
  return (
    <div className='flex gap-1 md:gap-4 w-full flex-col md:flex-row h-max'>
      <BidCard index={1} bid={myBid1} setBid={setMyBid1}/>
      <BidCard index={2} bid={myBid2} setBid={setMyBid2}/>
    </div>
  )
}
