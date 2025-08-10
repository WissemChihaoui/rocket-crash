import React from 'react';

export default function Button({ children, classNames, ...props }) {
  return (
    <button
      {...props}
      className={`border-[#45f882] border bg-[#45f882] text-[#201f2a] p-1 md:p-2 rounded hover:bg-white hover:text-[#201f2a] min-w-8 md:min-w-10 font-semibold ${classNames}`}
    >
      {children}
    </button>
  );
}
