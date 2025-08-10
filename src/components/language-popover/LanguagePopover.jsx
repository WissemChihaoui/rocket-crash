import React, { useState } from "react";
import { Icon } from "@iconify/react";

const LANGUAGES = [
  { code: "ar", label: "Arabic", flag: "twemoji:flag-tunisia" },
  { code: "en", label: "English", flag: "twemoji:flag-united-kingdom" },
  { code: "fr", label: "French", flag: "twemoji:flag-france" },
];

export default function LanguagePopover() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("en");

  const currentLang = LANGUAGES.find((lang) => lang.code === selected);

  return (
    <div className="relative inline-block">
      {/* Current language button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
      >
        <Icon icon={currentLang.flag} className="text-2xl" />
      </button>

      {/* Popover menu */}
      {open && (
        <div
          className="absolute left-[-3.5rem] top-1/2 -translate-y-1/2 flex flex-col 
                     bg-gray-900 rounded-lg shadow-lg p-1 animate-fadeIn z-50"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang.code);
                setOpen(false);
              }}
              className={`p-1 rounded hover:bg-gray-700 transition ${
                lang.code === selected ? "bg-gray-700" : ""
              }`}
            >
              <Icon icon={lang.flag} className="text-2xl" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
