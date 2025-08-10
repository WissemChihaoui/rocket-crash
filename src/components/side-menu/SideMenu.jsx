// SideMenu.jsx
import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";

const menuItems = [
  { icon: "mdi:account-circle-outline", label: "Profile" },
  { icon: "mdi:cog-outline", label: "Settings" },
  { icon: "mdi:logout", label: "Logout" },
];

export default function SideMenu({ visible, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
    if (visible) {
      gsap.to(menuRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [visible]);

  return (
    <aside
      ref={menuRef}
      className="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-50 shadow-lg transform translate-x-full"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-white text-3xl hover:text-red-400"
        >
          &times;
        </button>
      </div>

      <nav className="p-4 space-y-4">
        {menuItems.map(({ icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition"
          >
            <Icon icon={icon} className="text-2xl" />
            <span className="text-lg">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
