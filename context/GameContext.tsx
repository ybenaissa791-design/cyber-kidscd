"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { sounds } from "@/lib/audio";

export type Language = "ar" | "fr";

interface GameContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  completedLevels: number[];
  unlockedLevel: number;
  completeLevel: (lvl: number) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  totalStars: number;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [playerName, setPlayerNameState] = useState<string>("");
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("cyberkids_lang") as Language | null;
      if (savedLang === "ar" || savedLang === "fr") {
        setLanguageState(savedLang);
      }

      const savedSound = localStorage.getItem("cyberkids_sound");
      if (savedSound !== null) {
        const isMuted = savedSound === "false";
        setSoundEnabled(!isMuted);
        sounds.setMuted(isMuted);
      }

      const savedLevels = localStorage.getItem("cyberkids_completed");
      if (savedLevels) {
        const parsed = JSON.parse(savedLevels);
        if (Array.isArray(parsed)) {
          setCompletedLevels(parsed);
          const maxCompleted = Math.max(0, ...parsed);
          setUnlockedLevel(Math.min(8, maxCompleted + 1));
        }
      }

      const savedName = localStorage.getItem("cyberkids_name");
      if (savedName) {
        setPlayerNameState(savedName);
      }
    } catch {
      // Ignore localStorage errors
    }
    setHydrated(true);
  }, []);

  // Update HTML document dir and lang attributes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("cyberkids_lang", lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const next = language === "ar" ? "fr" : "ar";
    setLanguage(next);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setMuted(!next);
    try {
      localStorage.setItem("cyberkids_sound", String(next));
    } catch {}
    if (next) {
      sounds.playClick();
    }
  };

  const completeLevel = (lvl: number) => {
    setCompletedLevels((prev) => {
      const updated = Array.from(new Set([...prev, lvl]));
      try {
        localStorage.setItem("cyberkids_completed", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setUnlockedLevel((prev) => {
      const nextUnlock = Math.max(prev, Math.min(8, lvl + 1));
      return nextUnlock;
    });
  };

  const setPlayerName = (name: string) => {
    setPlayerNameState(name);
    try {
      localStorage.setItem("cyberkids_name", name);
    } catch {}
  };

  const resetProgress = () => {
    setCompletedLevels([]);
    setUnlockedLevel(1);
    try {
      localStorage.removeItem("cyberkids_completed");
    } catch {}
  };

  const totalStars = completedLevels.length * 3;

  return (
    <GameContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        soundEnabled,
        toggleSound,
        completedLevels,
        unlockedLevel,
        completeLevel,
        playerName,
        setPlayerName,
        totalStars,
        resetProgress,
      }}
    >
      <div dir={hydrated && language === "ar" ? "rtl" : "ltr"} className="w-full">
        {children}
      </div>
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
