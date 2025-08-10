// utils/crashRandom.js

export const CRASH_MIN = 1.0;
export const CRASH_MAX = 500;

export function getRandomCrash() {
  const p = Math.random();

  if (p < 0.5) {
    // 50% chance: uniform between 1 and 2
    return parseFloat((1 + Math.random()).toFixed(2));
  } else {
    // 50% chance: skewed between 2 and 500, very heavy skew near 2
    const r = Math.random();
    const skew = 0.1; // smaller = heavier skew to low values here
    const crash = 2 + (CRASH_MAX - 2) * (1 - Math.pow(r, skew));
    return parseFloat(crash.toFixed(2));
  }
}
