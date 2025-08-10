import React from 'react';

const colorRanges = [
  { min: 20, max: Infinity, bg: '#f59e0b', text: '#fff' },   // orange (like #f59e0b)
  { min: 2.4, max: 19.99, bg: '#22c55e', text: '#fff' },    // green (#22c55e)
  { min: 1.3, max: 2.39, bg: '#2563eb', text: '#fff' },     // medium blue (#2563eb)
  { min: 0, max: 1.29, bg: '#1e40af', text: '#fff' },       // dark blue (#1e40af)
];

export default function BidHistoryBull({ bid }) {
  const range = colorRanges.find(({ min, max }) => bid >= min && bid <= max);

  // fallback if no range found (negative or zero values)
  const bgColor = range ? range.bg : '#6b7280';  // gray-500
  const textColor = range ? range.text : '#fff';

  return (
    <span
      style={{ backgroundColor: bgColor, color: textColor }}
      className="px-4 py-[1px] rounded-lg text-sm font-semibold"
    >
      {bid}
    </span>
  );
}
