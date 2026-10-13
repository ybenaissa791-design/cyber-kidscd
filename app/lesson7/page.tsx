"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  Lock, 
  Wifi, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  RotateCcw,
  KeyRound,
  EyeOff,
  Trophy
} from "lucide-react";

export default function Lesson7() {
  const router = useRouter();
  const { language, completeLevel } = useGame();

  const [activeRings, setActiveRings] = useState<number[]>([]);
  const [isVictorious, setIsVictorious] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 07 / 07 - Ultime Défi !",
      title: "Le Tunnel Mystique du Chiffrement",
      concept: "Fondement : Le Cadenas HTTPS & le Wi-Fi Public",
      story: "Sur Internet, tes messages voyagent à travers le monde. Si la route n'est pas protégée (sur un Wi-Fi public ouvert dans un café ou un site sans cadenas), des espions peuvent intercepter ce que tu tapes ! Allume les 3 anneaux d'énergie du Tunnel pour chiffrer tes données en code secret indéchiffrable !",
      instruction: "Allume les 3 anneaux de protection pour activer le blindage HTTPS !",
      clearTextLabel: "Données transmises :",
      encryptedText: "🔒 #9x!F7$@zK9 (Chiffré & Illisible par les espions !)",
      clearText: "⚠️ MonMotDePasseSecret123 (En clair, n'importe qui peut le lire !)",
      btnNextMission: "Accéder au Sommet des Champions & Obtenir ton Diplôme 🏆",
      btnReplay: "Rejouer le tunnel 🔄",
      backMap: "Retour à la Carte",
      victoryTitle: "Tunnel Chiffré Activé ! Données Protégées !",
      victoryText: "Bravo ! Grâce au protocole HTTPS et au chiffrement, tes messages sont enveloppés d'une armure d'invisibilité. Aucun espion ne peut désormais voir ce que tu envoies !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Vérifie toujours la présence du cadenas dans la barre d'adresse de ton navigateur (HTTPS). Évite de te connecter à des comptes personnels sur des Wi-Fi publics gratuits sans protection !",
      rings: [
        {
          id: 1,
          name: "Anneau 1 : Le Cadenas HTTPS",
          desc: "Garantit que le site est bien celui qu'il prétend être.",
          icon: "🔒",
        },
        {
          id: 2,
          name: "Anneau 2 : Le Chiffrement de Bout en Bout",
          desc: "Transforme tes textes en énigmes mathématiques impossibles à craquer.",
          icon: "🛡️",
        },
        {
          id: 3,
          name: "Anneau 3 : Le Bouclier Anti Wi-Fi Public",
          desc: "Empêche les personnes connectées au même réseau de lire tes paquets.",
          icon: "📶",
        },
      ],
    },
    ar: {
      missionTag: "المهمة 07 / 07 - التحدي الأخير!",
      title: "النفق السحري والتشفير الآمن",
      concept: "الأساس السابع: قفل الأمان (HTTPS) وشبكات الواي فاي العامة",
      story: "عند إرسال رسائلك عبر الإنترنت، تسافر البيانات عبر مسارات عالمية. إن لم يكن المسار مشفراً (مثل شبكات الواي فاي العامة المفتوحة أو المواقع بدون قفل)، يمكن للمتلصصين قراءة ما تكتبه! أشعل حلقات الطاقة الثلاث داخل النفق السحري لتشفير رسائلك إلى رموز مستحيلة الكسر!",
      instruction: "أشعل حلقات النفق الثلاث لتفعيل التشفير وحماية البيانات!",
      clearTextLabel: "البيانات المسافرة عبر الشبكة:",
      encryptedText: "🔒 #9x!F7$@zK9 (مشفرة ومستحيلة القراءة للغرباء!)",
      clearText: "⚠️ كلمتي_السرية_123 (مكشوفة وبإمكان أي شخص التجسس عليها!)",
      btnNextMission: "الصعود لمنصة التتويج واستلام وسام وشهادة البطل 🏆",
      btnReplay: "إعادة التحدي 🔄",
      backMap: "العودة للخريطة",
      victoryTitle: "اكتمل تشفير النفق بنجاح باهر!",
      victoryText: "أحسنت يا بطل! بفضل التشفير وبروتوكول HTTPS، أصبحت بياناتك محصنة تماماً ومحاطة بهالة من الخفاء التام عن أعين المتطفلين!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "تأكد دائماً من وجود علامة القفل (HTTPS) بجانب عنوان الموقع الإلكتروني، وتجنب إدخال كلمات سرك عبر شبكات الواي فاي العامة المفتوحة في الشوارع والمقاهي دون حماية!",
      rings: [
        {
          id: 1,
          name: "الحلقة 1: قفل الموقع الآمن (HTTPS)",
          desc: "يضمن أن الموقع موثوق ومشفر بالكامل.",
          icon: "🔒",
        },
        {
          id: 2,
          name: "الحلقة 2: التشفير الشامل",
          desc: "يحول رسائلك إلى لغة سرية لا يفهمها سوى المستلم.",
          icon: "🛡️",
        },
        {
          id: 3,
          name: "الحلقة 3: درع حماية شبكات الواي فاي",
          desc: "يمنع أي متلصص على نفس الشبكة من سرقة حساباتك.",
          icon: "📶",
        },
      ],
    },
  }[language];

  const handleActivateRing = (id: number) => {
    if (activeRings.includes(id)) return;

    sounds.playLaser();
    const nextRings = [...activeRings, id];
    setActiveRings(nextRings);

    if (nextRings.length === 3) {
      setTimeout(() => {
        sounds.playFanfare();
        setIsVictorious(true);
        completeLevel(7);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      }, 500);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setActiveRings([]);
    setIsVictorious(false);
  };

  const isFullEncryption = activeRings.length === 3;

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-600/10 blur-3xl pointer-events-none rounded-full"></div>

      {/* Header controls */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6 z-10">
        <button
          onClick={() => {
            sounds.playClick();
            router.push("/");
          }}
          className="text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1.5 transition"
        >
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t.backMap}</span>
        </button>

        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-950/60 border border-cyan-800/60 rounded-full animate-pulse">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-cyan-300/80 font-bold uppercase tracking-wider mt-2">
          {t.concept}
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Main Arena */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left: The Luminous Tunnel Visual */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden min-h-[400px]">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden flex items-center justify-center">
            <motion.img
              src="/assestes/img8_tunnel.png"
              alt="Tunnel Magique Lumineux"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              animate={{
                filter: isFullEncryption
                  ? "brightness(1.3) drop-shadow(0 0 35px rgba(6,182,212,0.9))"
                  : "brightness(0.9)"
              }}
            />

            {/* Glowing Rings overlay */}
            <div className="absolute inset-0 bg-cyan-950/20 flex items-center justify-center pointer-events-none">
              <div className={`w-32 h-32 rounded-full border-4 border-dashed border-cyan-400 transition-all duration-700 ${
                isFullEncryption ? "animate-spin scale-125 opacity-100" : "opacity-40"
              }`} />
            </div>
          </div>

          {/* Encryption status card */}
          <div className="w-full mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1 font-bold">
              {t.clearTextLabel}
            </span>
            <div className={`font-mono text-xs sm:text-sm p-2.5 rounded-xl border transition-all ${
              isFullEncryption
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : "bg-rose-950/60 border-rose-500/50 text-rose-300"
            }`}>
              {isFullEncryption ? t.encryptedText : t.clearText}
            </div>
          </div>
        </div>

        {/* Right: The 3 Tunnel Rings */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <p className="text-xs sm:text-sm font-bold text-cyan-300 mb-1 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-cyan-400" />
            <span>{t.instruction}</span>
          </p>

          {t.rings.map((ring) => {
            const isActive = activeRings.includes(ring.id);

            return (
              <motion.button
                key={ring.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleActivateRing(ring.id)}
                className={`p-4 rounded-2xl border text-start flex items-start gap-3.5 transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-950/60 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/40"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-base font-bold ${
                  isActive 
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                    : "bg-slate-800 text-slate-400"
                }`}>
                  {isActive ? <Check className="w-5 h-5 stroke-[3]" /> : ring.icon}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-bold ${isActive ? "text-cyan-300" : "text-white"}`}>
                      {ring.name}
                    </h3>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      isActive ? "bg-cyan-950 text-cyan-300 border border-cyan-800" : "bg-slate-950 text-slate-500"
                    }`}>
                      {isActive ? "ACTIF ⚡" : "DÉSACTIVÉ"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {ring.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}

          {activeRings.length > 0 && !isVictorious && (
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 justify-center mt-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.btnReplay}</span>
            </button>
          )}
        </div>

      </div>

      {/* Victory Dialogue */}
      <AnimatePresence>
        {isVictorious && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl mt-10 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 mb-3">
              <ShieldCheck className="w-10 h-10 text-cyan-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-cyan-300">
              {t.victoryTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl">
              {t.victoryText}
            </p>

            <div className="w-full bg-slate-950/80 p-4 rounded-2xl border border-amber-500/30 my-4 text-xs sm:text-sm text-amber-200 flex items-start gap-3 text-start">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-400 block mb-0.5">{t.goldenRuleTitle}</strong>
                <span>{t.goldenRuleText}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playFanfare();
                router.push("/victory");
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-lg sm:text-xl shadow-2xl shadow-amber-950/50 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-3"
            >
              <Trophy className="w-6 h-6 fill-slate-950" />
              <span>{t.btnNextMission}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
