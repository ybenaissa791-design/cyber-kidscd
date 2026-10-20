"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { Volume2, VolumeX, Globe, Map, Trophy, Shield, Sparkles, Menu, X, Star } from "lucide-react";
import { sounds } from "@/lib/audio";

export default function Navbar() {
  const { language, toggleLanguage, soundEnabled, toggleSound, totalStars, unlockedLevel, completedLevels } = useGame();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      brand: "RED PHOENIX",
      subBrand: "Club des Élèves-Ingénieurs en Cybersécurité • ENSA Oujda",
      home: "Accueil",
      map: "Missions",
      trophy: "Certificat",
      stars: "Étoiles",
      soundOn: "Son activé",
      soundOff: "Son coupé",
      switchLang: "عربي 🇲🇦",
      currentProgress: "Progression :",
      missionsLabel: "Missions",
      closeMenu: "Fermer le menu",
    },
    ar: {
      brand: "RED PHOENIX",
      subBrand: "نادي الطلبة المهندسين في الأمن السيبراني • ENSA وجدة",
      home: "الرئيسية",
      map: "المهمات",
      trophy: "الشهادة التقديرية",
      stars: "النجوم",
      soundOn: "الصوت مفعّل",
      soundOff: "الصوت معطّل",
      switchLang: "Français 🇫🇷",
      currentProgress: "التقدم الحالي:",
      missionsLabel: "مهمات",
      closeMenu: "إغلاق القائمة",
    },
  }[language];

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    sounds.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-rose-500/20 shadow-[0_4px_30px_rgba(225,29,72,0.12)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2">
          
          {/* Brand & Logo */}
          <Link 
            href="/" 
            onClick={handleNavClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-h-[44px] min-w-0"
            aria-label="RED PHOENIX Home"
          >
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <img 
                src="/assestes/logo.jpeg" 
                alt="RED PHOENIX" 
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-rose-500 shadow-md"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 group-hover:brightness-125 transition truncate">
                {t.brand}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-300/80 font-medium tracking-wide hidden sm:flex items-center gap-1 truncate max-w-[240px] md:max-w-none">
                <Shield className="w-3 h-3 text-rose-400 shrink-0 inline" /> {t.subBrand}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              onClick={handleNavClick}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 min-h-[44px] ${
                pathname === "/"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Map className="w-4 h-4 text-rose-400" />
              <span>{t.map}</span>
            </Link>

            <Link
              href="/victory"
              onClick={handleNavClick}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 min-h-[44px] ${
                pathname === "/victory"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{t.trophy}</span>
            </Link>
          </nav>

          {/* Quick controls: Stars, Sound, Language, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Star counter badge */}
            <div 
              title={`${totalStars} ${t.stars}`}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 h-10 sm:h-11 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-black shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-pulse shrink-0" />
              <span>{totalStars}</span>
              <span className="text-[11px] text-amber-400/80 font-medium">★</span>
            </div>

            {/* Sound Toggle (44px min touch target) */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? t.soundOn : t.soundOff}
              aria-label={soundEnabled ? t.soundOn : t.soundOff}
              className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-full flex items-center justify-center bg-slate-900 border border-slate-700/80 hover:border-rose-500/60 text-slate-300 hover:text-white hover:bg-rose-500/10 active:scale-95 transition shadow-sm cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
              )}
            </button>

            {/* Language Switcher (44px min touch target) */}
            <button
              onClick={() => {
                sounds.playClick();
                toggleLanguage();
              }}
              title={t.switchLang}
              aria-label={t.switchLang}
              className="h-10 sm:h-11 px-2.5 sm:px-3.5 rounded-full bg-gradient-to-r from-rose-600/30 to-purple-600/30 hover:from-rose-600/50 hover:to-purple-600/50 border border-rose-500/40 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 backdrop-blur-md shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-rose-300 shrink-0" />
              <span className="whitespace-nowrap">{t.switchLang}</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? t.closeMenu : "Open navigation menu"}
              className="md:hidden w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-start">
          {/* Backdrop blur click to close */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative bg-slate-950 border-b-2 border-rose-500/40 px-5 pt-4 pb-6 shadow-2xl flex flex-col gap-3.5 animate-in slide-in-from-top-4 duration-200 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <img 
                  src="/assestes/logo.jpeg" 
                  alt="RED PHOENIX" 
                  className="w-8 h-8 rounded-full border border-rose-500 object-cover" 
                />
                <span className="font-black text-sm text-rose-400">RED PHOENIX</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              {t.subBrand}
            </p>

            {/* Quick mission summary */}
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">{t.currentProgress}</span>
              <span className="text-amber-400 font-black flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {completedLevels.length} / 7 {t.missionsLabel}
              </span>
            </div>

            <nav className="flex flex-col gap-2 pt-1">
              <Link
                href="/"
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm min-h-[48px] transition ${
                  pathname === "/"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "bg-slate-900/80 border border-slate-800 text-slate-200"
                }`}
              >
                <Map className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{t.map}</span>
              </Link>
              <Link
                href="/victory"
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm min-h-[48px] transition ${
                  pathname === "/victory"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-slate-900/80 border border-slate-800 text-amber-300"
                }`}
              >
                <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t.trophy}</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
