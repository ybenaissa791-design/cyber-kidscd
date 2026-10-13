"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  ShieldCheck, 
  Key, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Lock, 
  ShieldAlert,
  HelpCircle,
  RotateCcw
} from "lucide-react";

export default function Lesson1() {
  const router = useRouter();
  const { language, completeLevel } = useGame();
  const [activeRunes, setActiveRunes] = useState<number[]>([]);
  const [isVictorious, setIsVictorious] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 01 / 07",
      title: "La Clé Magique des Mots de Passe",
      concept: "Fondement : Créer un mot de passe blindé",
      story: "Alerte ! Le monstre 'Glouton-Virus' tente de dévorer tes fichiers personnels ! Pour verrouiller la porte du château, active les 4 runes magiques sur la clé dorée.",
      hint: "Clique sur chaque ingrédient secret pour forger un mot de passe invincible !",
      passwordLabel: "Mot de passe en cours de forge :",
      strengthLabels: ["Très Dangereux ❌", "Faible ⚠️", "Bon 🛡️", "Invincible ! ⚡"],
      runes: [
        { id: 1, label: "Au moins 8 caractères", sample: "AbcdEfgh", icon: "📏", desc: "Plus c'est long, plus c'est dur à deviner !" },
        { id: 2, label: "Mélange Majuscules & Minuscules", sample: "AaBbCc", icon: "🔤", desc: "Alterne les grandes et petites lettres." },
        { id: 3, label: "Chiffres Magiques", sample: "1 2 3 4", icon: "🔢", desc: "Glisse des nombres secrets (pas ta date de naissance !)." },
        { id: 4, label: "Symboles Boucliers (!, #, $, @)", sample: "@ # ! ?", icon: "⭐", desc: "Les pirates ne peuvent pas les deviner facilement !" },
      ],
      passwordsHistory: [
        "123456",
        "chatonbleu",
        "ChatonBleu2026",
        "Ch@ton!Bleu#2026"
      ],
      victoryTitle: "Bravo Cyber-Héros ! Le Virus est vaincu !",
      victoryText: "Ton mot de passe est désormais impénétrable. Le monstre n'a pas pu forcer la serrure et s'est enfui !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Ne partage JAMAIS ton mot de passe avec tes amis ou sur des jeux en ligne. Seuls tes parents ont le droit de le connaître !",
      btnNext: "Passer à la Mission 2 (Le Phishing) ➡️",
      btnReplay: "Rejouer la mission",
      backMap: "Retour à la Carte",
    },
    ar: {
      missionTag: "المهمة 01 / 07",
      title: "المفتاح السحري لكلمات السر",
      concept: "الأساس الأول: صناعة كلمة مرور منيعة",
      story: "تحذير! وحش 'الفيروس الشره' يحاول التهام ملفاتك وصورك! لغلق أبواب القلعة وحمايتها، فعّل الرقاقات السحرية الأربع على المفتاح الذهبي.",
      hint: "انقر على كل عنصر أمان لتقوية المفتاح وطرد الفيروس!",
      passwordLabel: "كلمة المرور الجاري تشكيلها:",
      strengthLabels: ["خطيرة وسهلة الاختراق ❌", "ضعيفة ⚠️", "جيدة 🛡️", "لا تقهر! ⚡"],
      runes: [
        { id: 1, label: "أكثر من 8 خانات وحروف", sample: "AbcdEfgh", icon: "📏", desc: "كلما كانت أطول، استحال تخمينها!" },
        { id: 2, label: "أحرف كبيرة وصغيرة (Aa)", sample: "AaBbCc", icon: "🔤", desc: "اخلط بين الأحرف الكبيرة والصغيرة." },
        { id: 3, label: "أرقام سرية متنوعة", sample: "1 2 3 4", icon: "🔢", desc: "أضف أرقاماً لا تمثل تاريخ ميلادك!" },
        { id: 4, label: "رموز الحماية الخاصة (!، @، #)", sample: "@ # ! ?", icon: "⭐", desc: "رموز تشوش برامج القراصنة تماماً!" },
      ],
      passwordsHistory: [
        "123456",
        "chatonbleu",
        "ChatonBleu2026",
        "Ch@ton!Bleu#2026"
      ],
      victoryTitle: "أحسنت يا بطل! تم طرد الفيروس بنجاح!",
      victoryText: "كلمة السر الآن منيعة كالحصن! لم يستطع الفيروس الشره اختراق الباب ولاذ بالفرار!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "لا تشارك كلمة مرورك أبداً مع أصدقائك أو داخل الألعاب الإلكترونية، والداك فقط هما من يحق لهما معرفتها!",
      btnNext: "المهمة 2: فخ الذئب الماكر ➡️",
      btnReplay: "إعادة المهمة",
      backMap: "العودة للخريطة",
    },
  }[language];

  const handleToggleRune = (id: number) => {
    if (activeRunes.includes(id)) return;
    
    const nextRunes = [...activeRunes, id];
    setActiveRunes(nextRunes);

    if (nextRunes.length === 4) {
      sounds.playSuccess();
      setIsVictorious(true);
      completeLevel(1);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      sounds.playClick();
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setActiveRunes([]);
    setIsVictorious(false);
  };

  const strengthIndex = activeRunes.length;
  const currentPassword = t.passwordsHistory[Math.min(3, Math.max(0, strengthIndex - 1))] || t.passwordsHistory[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full"></div>

      {/* Top Breadcrumb & Controls */}
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

        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-950/60 border border-cyan-800/60 rounded-full">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-cyan-300/80 font-bold uppercase tracking-wider mt-2">
          {t.concept}
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Interactive Arena */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left / Scene: Monster vs Key */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden min-h-[420px]">
          
          {/* Monster status */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              isVictorious 
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-red-500/20 text-red-300 border-red-500/40 animate-pulse"
            }`}>
              {isVictorious ? "Le Virus s'est enfui ! 🏃‍♂️" : "Le Virus attaque les fichiers ! 👾"}
            </span>
          </div>

          <div className="relative w-full h-72 flex items-center justify-center">
            
            {/* Green Virus Monster */}
            <motion.img
              src="/assestes/img3_virus.png"
              alt="Glouton Virus"
              className="absolute left-0 sm:left-4 w-28 sm:w-44 object-contain z-10 drop-shadow-[0_0_35px_rgba(239,68,68,0.5)]"
              animate={
                isVictorious
                  ? { x: -300, opacity: 0, rotate: -360, scale: 0.2 }
                  : { x: [0, 15, 0], y: [0, -10, 0], scale: 1 + (4 - strengthIndex) * 0.05 }
              }
              transition={{
                x: isVictorious ? { duration: 1 } : { repeat: Infinity, duration: 2, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
              }}
            />

            {/* Glowing Golden Password Key */}
            <motion.img
              src="/assestes/img4_cle.png"
              alt="Clé dorée"
              className="max-h-64 sm:max-h-72 w-auto object-contain z-20 cursor-pointer"
              animate={{
                scale: isVictorious ? [1, 1.15, 1.08] : 1 + strengthIndex * 0.04,
                rotate: isVictorious ? 360 : [0, -2, 2, 0],
                filter: isVictorious
                  ? "drop-shadow(0px 0px 40px rgba(16,185,129,0.9))"
                  : `drop-shadow(0px 0px ${strengthIndex * 12}px rgba(59,130,246,0.8))`
              }}
              transition={{
                rotate: isVictorious ? { duration: 0.8 } : { repeat: Infinity, duration: 4 },
                scale: { type: "spring", bounce: 0.5 }
              }}
              onClick={() => {
                if (strengthIndex < 4) {
                  const remaining = [1, 2, 3, 4].filter(id => !activeRunes.includes(id));
                  if (remaining.length > 0) handleToggleRune(remaining[0]);
                }
              }}
            />

            {/* Victory Sparkles blast */}
            {isVictorious && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 2, opacity: [0, 1, 0] }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"
              />
            )}
          </div>

          {/* Live Password Forge Terminal */}
          <div className="w-full mt-4 bg-black/60 rounded-2xl p-4 border border-cyan-500/30">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400">{t.passwordLabel}</span>
              <span className={`font-black ${
                strengthIndex === 4 ? "text-emerald-400" : strengthIndex >= 2 ? "text-amber-400" : "text-rose-400"
              }`}>
                {t.strengthLabels[strengthIndex > 0 ? strengthIndex - 1 : 0]}
              </span>
            </div>

            <div className="flex items-center justify-between font-mono text-base sm:text-xl font-black text-cyan-300 tracking-widest bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
              <span>{activeRunes.length === 0 ? "123456" : currentPassword}</span>
              <Lock className={`w-5 h-5 ${strengthIndex === 4 ? "text-emerald-400" : "text-slate-500"}`} />
            </div>

            {/* Strength Meter Bar */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full mt-3 overflow-hidden border border-slate-800">
              <motion.div
                className={`h-full ${
                  strengthIndex === 4 
                    ? "bg-gradient-to-r from-emerald-400 to-green-500" 
                    : strengthIndex >= 2 
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500" 
                    : "bg-gradient-to-r from-rose-500 to-red-600"
                }`}
                animate={{ width: `${(strengthIndex / 4) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

        </div>

        {/* Right: The 4 Runes Selector */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <p className="text-xs sm:text-sm font-bold text-amber-300 mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.hint}</span>
          </p>

          {t.runes.map((rune) => {
            const isChecked = activeRunes.includes(rune.id);

            return (
              <motion.button
                key={rune.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleToggleRune(rune.id)}
                className={`p-4 rounded-2xl border text-start flex items-start gap-3.5 transition-all cursor-pointer ${
                  isChecked
                    ? "bg-emerald-950/60 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-base font-bold ${
                  isChecked 
                    ? "bg-emerald-500 text-slate-950" 
                    : "bg-slate-800 text-slate-400"
                }`}>
                  {isChecked ? <Check className="w-5 h-5 stroke-[3]" /> : rune.icon}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-bold ${isChecked ? "text-emerald-300" : "text-white"}`}>
                      {rune.label}
                    </h3>
                    <span className="font-mono text-xs text-cyan-400/80 bg-slate-950 px-2 py-0.5 rounded">
                      {rune.sample}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {rune.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}

          {/* Reset button if needed */}
          {activeRunes.length > 0 && !isVictorious && (
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

      {/* Victory Dialogue & Next Level Button */}
      <AnimatePresence>
        {isVictorious && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="w-full max-w-3xl mt-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-6 rounded-3xl border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mb-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-emerald-300">
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

            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
              <button
                onClick={() => {
                  sounds.playClick();
                  router.push("/lesson2");
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-lg shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                {t.btnNext}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}