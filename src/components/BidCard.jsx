import React, { useContext } from 'react'
import Slider from "./slider/Slider";
import Button from './buttons/button';
import SlotButton from './buttons/slot-button';
import { bidSettings } from '../_mock/_bid';
import { GameContext } from '../context/game-context';

export default function BidCard({ index, bid, setBid }) {
  const { status } = useContext(GameContext)
  return (
    <div className="flex gap-2 md:gap-12 border-2 border-[#45f882] items-center bg-green-950/70 rounded-xl px-2 py-2 md:px-4 md:py-3 w-full max-w-3xl">
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex flex-1 w-full justify-between'>
          <div className="flex gap-2">
            <Button classNames={"hidden md:block"} onClick={() => setBid(bidSettings.minBid)}>Min</Button>
            <Button onClick={() => { bid && setBid(bid - 1) }}>–</Button>
          </div>
          <div className="flex flex-col items-center mx-1 md:mx-4">
            <span className="text-xs text-gray-400">Bet Amount</span>
            <input
              type="text"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              className="bg-transparent border-none text-white font-semibold text-lg text-center focus:outline-none w-20"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setBid(bid + 1)}>+</Button>
            <Button classNames={"hidden md:block"} onClick={() => setBid(bidSettings.maxBid)}>Max</Button>
          </div>
        </div>
        <Slider />
      </div>
      <div className="">
        <SlotButton className="w-full">
          {
            (status === "betting" && <span>Place Bet</span>) ||
            ((status === "in_play" || status === "crash") && <span>Bet Next Round</span>)
          }
        </SlotButton>
      </div>
    </div>
  );
}
