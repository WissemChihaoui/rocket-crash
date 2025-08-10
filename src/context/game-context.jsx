// GameContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { getRandomCrash } from "../utils/crashRandom";

export const GameContext = createContext(null);

const BETTING_TIME = 1;
const CRASH_DELAY = 1000;

const getSpeed = (multiplier) => {
  if (multiplier > 50) return 100;  // was 3
  if (multiplier > 30) return 10;    // was 2
  if (multiplier > 10) return 1; // was 1.5
  return 0.5;                       // was 1
};

const GameProvider = ({ children }) => {
  const [myBid1, setMyBid1] = useState(1);
  const [myBid2, setMyBid2] = useState(1);
  const [timer, setTimer] = useState(BETTING_TIME);
  const [status, setStatus] = useState("betting"); // betting, in_play, crash
  const [crashValue, setCrashValue] = useState(null);
  const [multiplier, setMultiplier] = useState(1.0);

  const multiplierRef = useRef(1.0);
  const crashValueRef = useRef(null);
  const animationFrameId = useRef(null);

  // Betting countdown
  useEffect(() => {
    if (status !== "betting" || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [status, timer]);

  // Start round on betting end
  useEffect(() => {
    if (status === "betting" && timer === 0) {
      const crash = getRandomCrash();
      console.log(crash)
      setCrashValue(crash);
      crashValueRef.current = crash;

      multiplierRef.current = 1.0;
      setMultiplier(1.0);

      setStatus("in_play");
    }
  }, [status, timer]);

  // Multiplier animation
  useEffect(() => {
    if (status !== "in_play") return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const speed = getSpeed(multiplierRef.current);
      multiplierRef.current += 0.008 * speed;
      setMultiplier(parseFloat(multiplierRef.current.toFixed(2)));

      if (multiplierRef.current >= crashValueRef.current) {
        setStatus("crash");
        return;
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [status]);

  // After crash, reset to betting
  useEffect(() => {
    if (status !== "crash") return;

    const timeout = setTimeout(() => {
      setTimer(BETTING_TIME);
      setStatus("betting");
    }, CRASH_DELAY);

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <GameContext.Provider
      value={{
        myBid1,
        setMyBid1,
        myBid2,
        setMyBid2,
        timer,
        setTimer,
        status,
        setStatus,
        crashValue,
        multiplier,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export const useGame = () => useContext(GameContext);

