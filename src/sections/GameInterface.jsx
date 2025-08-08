import React, { useRef, useEffect } from 'react'
import RocketLottie from '../components/RocketLottie'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useBoolean } from '../hooks/use-boolean'

// Register plugin
gsap.registerPlugin(MotionPathPlugin)

export default function GameInterface() {
    const rocketRef = useRef(null)
    const containerRef = useRef(null)
    const startGame = useBoolean()
    
    useEffect(() => {
        if (!rocketRef.current || !containerRef.current) return
        
        const container = containerRef.current
        const width = container.offsetWidth
        const height = container.offsetHeight
        const rocketWidth = rocketRef.current.offsetWidth
        const rocketHeight = rocketRef.current.offsetHeight

        // Set initial position at bottom-left (accounting for rocket height)
        gsap.set(rocketRef.current, {
            x: 0,
            y: height - rocketHeight,
            rotation: 0
        })

        // Define the flight path (bottom-left to top-right)
        const path = [
            { x: width * 0.3, y: height * 0.7 },        // First control point
            { x: width * 0.7, y: height * 0.2 },        // Second control point
            { x: width - rocketWidth, y: 0 }            // End at top-right
        ]
        
        // Animate along the path
        if(startGame.value){
        gsap.to(rocketRef.current, {
            duration: 3,
            motionPath: {
                path: path,
                autoRotate: true,      // Rocket will rotate to follow the path
                alignOrigin: [0.5, 0.5] // Rotate around center
            },
            ease: "power1.inOut"
        })}
    }, [startGame])
    
    return (
        <div 
            ref={containerRef}
            className="relative flex-1 flex w-full rounded overflow-hidden"
        >
            <div ref={rocketRef} className="absolute">
                <RocketLottie />
                <button onClick={startGame.onTrue}>START</button>
            </div>
        </div>
    )
}