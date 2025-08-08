import React from 'react'
import BidCard from '../components/BidCard'

export default function BidSections() {
  return (
    <div className='flex gap-4 w-full'>
      <BidCard index={1} />
      <BidCard index={2} />
    </div>
  )
}
