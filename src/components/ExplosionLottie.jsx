import React from 'react'
import Lottie from 'lottie-react'
import explosion from '../assets/red-explosion.json'

const ExplosionLottie = ({ style }) => {
  return (
    <div style={style} className='rotate-90'>
      <Lottie animationData={explosion} style={{ width: 120, height: 120 }} loop />
    </div>
  )
}

export default ExplosionLottie
