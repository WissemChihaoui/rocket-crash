import React, { useContext, useEffect, useRef } from 'react'
import { useBoolean } from '../hooks/use-boolean'
import RocketLottie from '../components/RocketLottie'
import gsap from 'gsap'
import { GameContext } from '../context/game-context'
import ExplosionLottie from '../components/ExplosionLottie'

export default function RocketInterface() {
    const { status } = useContext(GameContext)

    const tl = useRef(null)
    const rocketRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        if (!tl.current) return

        if (status === 'in_play') {
            tl.current.restart()
        }

        if (status === 'crash') {
            tl.current.pause() // stops mid-flight
        }

        if (status === 'betting') {
            tl.current.seek(0).pause() // reset to start
        }
    }, [status])


    useEffect(() => {
        if (!rocketRef.current || !containerRef.current) return
        const container = containerRef.current
        const width = container.offsetWidth
        const height = container.offsetHeight
        const rocketWidth = rocketRef.current.offsetWidth
        const rocketHeight = rocketRef.current.offsetHeight

        // Always set start position
        gsap.set(rocketRef.current, {
            x: 0,
            y: height - rocketHeight,
            rotation: 0,
        })

        // Build timeline but pause
        tl.current = gsap.timeline({ paused: true })
            .to(rocketRef.current, {
                duration: 5,
                motionPath: {
                    path: [
                        { x: width * 0.3, y: height * 0.7 },
                        { x: width * 0.7, y: height * 0.2 },
                        { x: width - rocketWidth, y: 0 }
                    ],
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5]
                },
                ease: "power1.inOut"
            })
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative flex-1 flex w-full h-full rounded overflow-hidden"
        >
            
            <div ref={rocketRef} className="absolute">
                {status === "crash" ? <ExplosionLottie /> : <RocketLottie />}
            </div>
        </div>
    )
}
