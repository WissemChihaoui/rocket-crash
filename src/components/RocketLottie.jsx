import React from 'react'
import Lottie from 'lottie-react'
import rocketFly from '../assets/rocket-flying.json'

const RocketLottie = ({ style }) => {
  return (
    <div style={style} className='rotate-90'>
      <Lottie animationData={rocketFly} style={{ width: 120, height: 120 }} loop />
    </div>
  )
}

export default RocketLottie
