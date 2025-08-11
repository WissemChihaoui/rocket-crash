import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useTranslation } from "../../locals/TranslationContext";

export default function LanguagePopover() {
  const { t, locale, setLocale } = useTranslation()
  const LANGUAGES = [
  { code: "ar", label: t('header.language.ar'), flag: "twemoji:flag-tunisia" },
  { code: "en", label: t('header.language.en'), flag: "twemoji:flag-united-kingdom" },
  { code: "fr", label: t('header.language.fr'), flag: "twemoji:flag-france" },
];
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(locale);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const currentLang = LANGUAGES.find((lang) => lang.code === selected);

  useEffect(() => {
  setSelected(locale);
}, [locale]);

  // Animate open/close
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setVisible(false),
      });
    }
  }, [open]);

  useEffect(() => {
    if (visible && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [visible]);

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      {/* Flag button with overlay */}
      <div className="relative inline-block" ref={buttonRef}>
        <Icon icon={currentLang.flag} className="text-2xl" />
        <div
          onClick={() => setOpen((v) => !v)}
          className="absolute inset-0 cursor-pointer"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Select language"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
        />
      </div>

      {/* Popover menu */}
      {visible && (
        <div
          ref={menuRef}
          className="absolute left-0 mt-2 w-40 bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          {LANGUAGES.map((lang) => (
            <div key={lang.code} className="relative w-full">
              <div
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-white rounded-md transition ${lang.code === selected ? "bg-gray-700 font-semibold" : ""
                  } hover:bg-gray-700 cursor-pointer select-none`}
              >
                <Icon icon={lang.flag} className="text-xl" />
                {lang.label}
              </div>
              <div
                role="menuitem"
                tabIndex={0}
                aria-checked={lang.code === selected}
                onClick={() => {
                  setSelected(lang.code);
                  setLocale(lang.code)
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(lang.code);
                    setLocale(lang.code)

                    setOpen(false);
                  }
                }}
                className="absolute inset-0 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
