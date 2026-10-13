"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { Volume2, VolumeX, Globe, Map, Trophy, Shield, Sparkles, Menu, X } from "lucide-react";
import { sounds } from "@/lib/audio";

export default function Navbar() {
  const { language, toggleLanguage, soundEnabled, toggleSound, totalStars, unlockedLevel } = useGame();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      brand: "RED PHOENIX",
      subBrand: "Cyber Club • ENSA Oujda",
      home: "Accueil",
      map: "Missions",
      trophy: "Trophée",
      stars: "Étoiles",
      soundOn: "Son activé",
      soundOff: "Son coupé",
      switchLang: "عربي 🇲🇦",
    },
    ar: {
      brand: "RED PHOENIX",
      subBrand: "نادي السايبر • ENSA وجدة",
      home: "الرئيسية",
      map: "المهمات",
      trophy: "الكأس",
      stars: "النجوم",
      soundOn: "الصوت مفعّل",
      soundOff: "الصوت معطّل",
      switchLang: "Français 🇫🇷",
    },
  }[language];

  const handleNavClick = () => {
    sounds.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-rose-500/20 shadow-[0_4px_30px_rgba(225,29,72,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <Link 
          href="/" 
          onClick={handleNavClick}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
            <img 
              src="/assestes/logo.jpeg" 
              alt="RED PHOENIX" 
              className="relative w-12 h-12 rounded-full object-cover border-2 border-rose-500 shadow-md"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 group-hover:brightness-125 transition">
              {t.brand}
            </span>
            <span className="text-xs text-rose-300/80 font-medium tracking-wide flex items-center gap-1">
              <Shield className="w-3 h-3 text-rose-400 inline" /> {t.subBrand}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            onClick={handleNavClick}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              pathname === "/"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Map className="w-4 h-4 text-rose-400" />
            {t.map}
          </Link>

          <Link
            href="/victory"
            onClick={handleNavClick}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              pathname === "/victory"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            {t.trophy}
          </Link>
        </nav>

        {/* Quick controls: Stars, Sound, Language */}
        <div className="flex items-center gap-3">
          
          {/* Star counter badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/30 text-amber-300 text-sm font-black shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{totalStars}</span>
            <span className="text-xs text-amber-400/80 font-medium">★</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
            }}
            title={soundEnabled ? t.soundOn : t.soundOff}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border border-slate-700 hover:border-rose-500/60 text-slate-300 hover:text-white hover:bg-rose-500/10 transition shadow-sm cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-rose-400" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              sounds.playClick();
              toggleLanguage();
            }}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-600/30 to-purple-600/30 hover:from-rose-600/50 hover:to-purple-600/50 border border-rose-500/40 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-rose-300" />
            <span>{t.switchLang}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-rose-500/30 px-6 py-4 flex flex-col gap-3 animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold"
          >
            <Map className="w-5 h-5 text-rose-400" />
            {t.map}
          </Link>
          <Link
            href="/victory"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-bold"
          >
            <Trophy className="w-5 h-5 text-amber-400" />
            {t.trophy}
          </Link>
        </div>
      )}
    </header>
  );
}
