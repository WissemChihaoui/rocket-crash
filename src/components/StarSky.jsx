import React, { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { GameContext } from "../context/game-context";

const StarrySkyCanvas = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarTl = useRef(null);
  const shootingStarTimeout = useRef(null);
  const animationFrameId = useRef(null);

  const { status } = useContext(GameContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create stars data with initial random positions and speed
    const starsCount = 200;
    starsRef.current = [];
    for (let i = 0; i < starsCount; i++) {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        speed: 0.3 + Math.random() * 0.7, // speed per frame downward
      });
    }

    // Shooting star data
    const shootingStar = {
      x: 0,
      y: 0,
      length: 300,
      speed: 0,
      active: false,
      opacity: 0,
      angle: Math.PI / 4, // 45 degrees
    };

    function drawStar(star) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    }

    function drawShootingStar() {
      if (!shootingStar.active) return;
      ctx.save();
      ctx.translate(shootingStar.x, shootingStar.y);
      ctx.rotate(shootingStar.angle);
      const gradient = ctx.createLinearGradient(0, 0, shootingStar.length, 0);
      gradient.addColorStop(0, `rgba(255,255,255,${shootingStar.opacity})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, -1, shootingStar.length, 2);
      ctx.restore();
    }

    function updateStars() {
      starsRef.current.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) star.y = 0;

        star.opacity += 0.005 * star.opacityDir;
        if (star.opacity <= 0.1) star.opacityDir = 1;
        else if (star.opacity >= 1) star.opacityDir = -1;
      });
    }

    function animateShootingStar() {
      shootingStar.active = true;
      shootingStar.opacity = 1;
      shootingStar.speed = 15;
      shootingStar.x = Math.random() * width * 0.7 + width * 0.15;
      shootingStar.y = Math.random() * height * 0.5 + height * 0.1;

      shootingStarTl.current = gsap.to(shootingStar, {
        duration: 1,
        x: shootingStar.x + shootingStar.length * Math.cos(shootingStar.angle),
        y: shootingStar.y + shootingStar.length * Math.sin(shootingStar.angle),
        opacity: 0,
        ease: "power1.out",
        onComplete: () => {
          shootingStar.active = false;
          shootingStar.opacity = 0;
          scheduleNextShootingStar();
        },
      });
    }

    function scheduleNextShootingStar() {
      // Only schedule if status is "in_play"
      if (status === "in_play") {
        shootingStarTimeout.current = setTimeout(() => {
          animateShootingStar();
        }, Math.random() * 5000 + 2000);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      starsRef.current.forEach(drawStar);
      drawShootingStar();
    }

    function loop() {
      // Only update star positions when "in_play"
      if (status === "in_play") {
        updateStars();
      }
      draw();
      animationFrameId.current = requestAnimationFrame(loop);
    }

    loop();

    // Start shooting stars only if in_play
    if (status === "in_play") {
      scheduleNextShootingStar();
    }

    function onResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);

      clearTimeout(shootingStarTimeout.current);
      shootingStarTl.current && shootingStarTl.current.kill();
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [status]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(to right, #000 0%, #0F0F0F 100%)",
      }}
    />
  );
};

export default StarrySkyCanvas;
