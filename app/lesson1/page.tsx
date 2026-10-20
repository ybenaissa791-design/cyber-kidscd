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
  RotateCcw,
  Trophy,
  FlaskConical,
  Eye,
  EyeOff
} from "lucide-react";

export default function Lesson1() {
  const router = useRouter();
  const { language, completeLevel } = useGame();
  const [activeRunes, setActiveRunes] = useState<number[]>([]);
  const [isVictorious, setIsVictorious] = useState(false);
  const [activeTab, setActiveTab] = useState<"forge" | "tester">("forge");
  const [customPassword, setCustomPassword] = useState("");
  const [showTesterPassword, setShowTesterPassword] = useState(false);

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
      tabForge: "1. Forger la Clé Magique 🔑",
      tabTester: "2. Laboratoire de Test 🧪",
      testerTitle: "Teste tes propres mots de passe secrets :",
      testerDesc: "Tape n'importe quel mot pour voir si le Glouton-Virus peut le dévorer ou s'il est repoussé !",
      testerPlaceholder: "Tape un mot de passe ici (ex: Ch@ton!2026)",
      testerTips: [
        { label: "Au moins 8 caractères", test: (p: string) => p.length >= 8 },
        { label: "Majuscules & Minuscules", test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
        { label: "Chiffres magiques (0-9)", test: (p: string) => /\d/.test(p) },
        { label: "Symboles spéciaux (!@#$...)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
      ],
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
      btnNext: "Passer à la Mission suivante ➡️",
      btnCert: "Obtenir le Certificat 🏆",
      btnReplay: "Rejouer la mission 🔄",
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
      tabForge: "1. صناعة المفتاح بالرقاقات 🔑",
      tabTester: "2. مختبر فحص كلمات المرور 🧪",
      testerTitle: "جرّب بنفسك فحص قوة كلمات المرور:",
      testerDesc: "اكتب أي كلمة لتكتشف هل يستطيع الفيروس الشره التهامها أم سينكسر أمام درعك!",
      testerPlaceholder: "اكتب كلمة مرور لتجربتها (مثال: Asad@2026#)",
      testerTips: [
        { label: "8 خانات وأحرف على الأقل", test: (p: string) => p.length >= 8 },
        { label: "حروف كبيرة وصغيرة (Aa)", test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
        { label: "أرقام سرية متنوعة (0-9)", test: (p: string) => /\d/.test(p) },
        { label: "رموز حماية خاصة (!@#$...)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
      ],
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
      btnNext: "الانتقال للمهمة التالية ➡️",
      btnCert: "الحصول على الشهادة 🏆",
      btnReplay: "إعادة اللعب من جديد 🔄",
      backMap: "العودة للخريطة",
    },
  }[language];

  const handleToggleRune = (id: number) => {
    let nextRunes: number[];
    if (activeRunes.includes(id)) {
      nextRunes = activeRunes.filter((r) => r !== id);
      sounds.playClick();
      setIsVictorious(false);
    } else {
      nextRunes = [...activeRunes, id];
      sounds.playRune();
      if (nextRunes.length === 4) {
        sounds.playSuccess();
        setIsVictorious(true);
        completeLevel(1);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
    setActiveRunes(nextRunes);
  };

  const handleReset = () => {
    sounds.playClick();
    setActiveRunes([]);
    setIsVictorious(false);
  };

  const strengthIndex = activeRunes.length;
  const currentPassword = t.passwordsHistory[Math.min(3, Math.max(0, strengthIndex - 1))] || t.passwordsHistory[0];

  // Custom password evaluation
  const customTestsPassed = t.testerTips.filter((tip) => tip.test(customPassword)).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-3 sm:p-6 py-6 sm:py-10">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full"></div>

      {/* Top Breadcrumb & Controls */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-4 sm:mb-6 z-10">
        <button
          onClick={() => {
            sounds.playClick();
            router.push("/");
          }}
          className="min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
        >
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t.backMap}</span>
        </button>

        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest px-3 py-1.5 bg-cyan-950/70 border border-cyan-800/60 rounded-full shadow-sm">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title Header */}
      <motion.div 
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-6 z-10 px-2"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-cyan-300/80 font-bold uppercase tracking-wider mt-1.5">
          {t.concept}
        </p>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-3 leading-relaxed bg-slate-900/70 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Mode Switcher Tabs */}
      <div className="w-full max-w-xl flex items-center justify-center p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl mb-6 z-10 gap-1.5">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab("forge");
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
            activeTab === "forge"
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Key className="w-4 h-4" />
          <span>{t.tabForge}</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab("tester");
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
            activeTab === "tester"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>{t.tabTester}</span>
        </button>
      </div>

      {/* Main Interactive Arena */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start z-10">
        
        {/* Left: The Visual Arena Showdown (Monster vs Key) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 relative overflow-hidden">
          
          {/* Status Badge */}
          <div className="w-full flex items-center justify-between mb-3 z-20">
            <span className={`text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              (activeTab === "forge" ? isVictorious : customTestsPassed === 4)
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-red-500/20 text-red-300 border-red-500/40 animate-pulse"
            }`}>
              {(activeTab === "forge" ? isVictorious : customTestsPassed === 4)
                ? (isAr ? "فرّ الفيروس واختفى! 🏃‍♂️" : "Le Virus s'est enfui ! 🏃‍♂️")
                : (isAr ? "الفيروس يترصد الملفات! 👾" : "Le Virus attaque les fichiers ! 👾")}
            </span>

            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
              {activeTab === "forge" ? `${strengthIndex} / 4 Runes` : `${customTestsPassed} / 4 Validé`}
            </span>
          </div>

          {/* Dueling Arena: Non-overlapping stations */}
          <div className="w-full min-h-[200px] sm:min-h-[250px] flex flex-row items-center justify-between sm:justify-around px-2 sm:px-4 py-3 relative bg-slate-950/70 rounded-2xl border border-slate-800/80">
            
            {/* Station 1: Virus Monster (Left) */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-1 sm:p-2">
              <div className="relative flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
                  (activeTab === "forge" ? isVictorious : customTestsPassed === 4) ? "bg-transparent" : "bg-red-500/20 scale-110"
                }`} />
                <motion.img
                  src="/assestes/img3_virus.png"
                  alt="Glouton Virus"
                  className="w-20 sm:w-32 md:w-36 max-h-40 sm:max-h-48 object-contain z-10 drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]"
                  animate={
                    (activeTab === "forge" ? isVictorious : customTestsPassed === 4)
                      ? { x: -180, opacity: 0, rotate: -360, scale: 0.2 }
                      : { y: [0, -6, 0], scale: 1 + (4 - (activeTab === "forge" ? strengthIndex : customTestsPassed)) * 0.03 }
                  }
                  transition={{
                    x: (activeTab === "forge" ? isVictorious : customTestsPassed === 4) ? { duration: 0.8, ease: "easeOut" } : undefined,
                    y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
                  }}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-rose-400 mt-1.5 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800/60 text-center">
                {(activeTab === "forge" ? isVictorious : customTestsPassed === 4)
                  ? (isAr ? "فرّ الفيروس! 🏃‍♂️" : "Virus vaincu ! 🏃‍♂️")
                  : (isAr ? "وحش الفيروس 👾" : "Virus Glouton 👾")}
              </span>
            </div>

            {/* Center: Clash / Protective Energy Barrier */}
            <div className="shrink-0 flex flex-col items-center justify-center px-1 sm:px-2 z-10">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-black border transition-all duration-300 ${
                (activeTab === "forge" ? strengthIndex : customTestsPassed) === 4
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  : (activeTab === "forge" ? strengthIndex : customTestsPassed) >= 2
                  ? "bg-amber-500/20 border-amber-400 text-amber-300"
                  : "bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse"
              }`}>
                {(activeTab === "forge" ? strengthIndex : customTestsPassed) === 4 ? "🛡️" : "⚡"}
              </div>
              <div className="h-12 sm:h-16 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent my-1"></div>
              <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400/80">
                {(activeTab === "forge" ? strengthIndex : customTestsPassed) === 4 ? (isAr ? "درع منيع" : "Blindé") : (isAr ? "مواجهة" : "Duel")}
              </span>
            </div>

            {/* Station 2: Golden Password Key (Right) */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-1 sm:p-2">
              <div className="relative flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
                  (activeTab === "forge" ? strengthIndex : customTestsPassed) === 4
                    ? "bg-emerald-500/30 scale-125"
                    : "bg-cyan-500/20 scale-100"
                }`} />
                <motion.img
                  src="/assestes/img4_cle.png"
                  alt="Clé dorée"
                  className="w-20 sm:w-32 md:w-40 max-h-40 sm:max-h-48 object-contain z-10 cursor-pointer drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                  animate={{
                    scale: (activeTab === "forge" ? isVictorious : customTestsPassed === 4) ? 1.08 : 1 + (activeTab === "forge" ? strengthIndex : customTestsPassed) * 0.03,
                    rotate: (activeTab === "forge" ? isVictorious : customTestsPassed === 4) ? 360 : 0,
                  }}
                  transition={{
                    rotate: { duration: 0.8, ease: "easeOut" },
                    scale: { duration: 0.3, ease: "easeOut" }
                  }}
                  onClick={() => {
                    if (activeTab === "forge" && strengthIndex < 4) {
                      const remaining = [1, 2, 3, 4].filter((id) => !activeRunes.includes(id));
                      if (remaining.length > 0) handleToggleRune(remaining[0]);
                    }
                  }}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 mt-1.5 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60 text-center">
                {isAr ? "المفتاح السحري 🔑" : "Clé Blindée 🔑"}
              </span>
            </div>

            {/* Victory Sparkles blast */}
            {((activeTab === "forge" && isVictorious) || (activeTab === "tester" && customTestsPassed === 4)) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 2, opacity: [0, 1, 0] }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"
              />
            )}
          </div>

          {/* Password Forge Display Terminal */}
          <div className="w-full mt-4 bg-black/70 rounded-2xl p-3.5 sm:p-4 border border-cyan-500/30">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
              <span className="text-slate-400">{t.passwordLabel}</span>
              <span className={`font-black ${
                (activeTab === "forge" ? strengthIndex : customTestsPassed) === 4
                  ? "text-emerald-400"
                  : (activeTab === "forge" ? strengthIndex : customTestsPassed) >= 2
                  ? "text-amber-400"
                  : "text-rose-400"
              }`}>
                {t.strengthLabels[Math.max(0, (activeTab === "forge" ? strengthIndex : customTestsPassed) - 1)]}
              </span>
            </div>

            <div className="flex items-center justify-between font-mono text-sm sm:text-lg font-black text-cyan-300 tracking-wider bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 break-all">
              <span>
                {activeTab === "forge" 
                  ? (activeRunes.length === 0 ? "123456" : currentPassword)
                  : (customPassword || "______")}
              </span>
              <Lock className={`w-4 h-4 shrink-0 ${
                (activeTab === "forge" ? strengthIndex : customTestsPassed) === 4 ? "text-emerald-400" : "text-slate-500"
              }`} />
            </div>

            {/* Strength Meter Bar */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full mt-3 overflow-hidden border border-slate-800">
              <motion.div
                className={`h-full ${
                  (activeTab === "forge" ? strengthIndex : customTestsPassed) === 4 
                    ? "bg-gradient-to-r from-emerald-400 to-green-500" 
                    : (activeTab === "forge" ? strengthIndex : customTestsPassed) >= 2 
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500" 
                    : "bg-gradient-to-r from-rose-500 to-red-600"
                }`}
                animate={{ width: `${((activeTab === "forge" ? strengthIndex : customTestsPassed) / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

        </div>

        {/* Right: Controls Tab 1 (Forge Runes) OR Tab 2 (Tester Lab) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          
          {activeTab === "forge" ? (
            <>
              <p className="text-xs sm:text-sm font-bold text-amber-300 mb-0.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.hint}</span>
              </p>

              {t.runes.map((rune) => {
                const isChecked = activeRunes.includes(rune.id);

                return (
                  <button
                    key={rune.id}
                    onClick={() => handleToggleRune(rune.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-start flex items-start gap-3 transition-all cursor-pointer min-h-[52px] active:scale-[0.98] ${
                      isChecked
                        ? "bg-emerald-950/70 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                        : "bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/40"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-base font-bold ${
                      isChecked 
                        ? "bg-emerald-500 text-slate-950" 
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {isChecked ? <Check className="w-5 h-5 stroke-[3]" /> : rune.icon}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className={`text-xs sm:text-sm font-bold truncate ${isChecked ? "text-emerald-300" : "text-white"}`}>
                          {rune.label}
                        </h3>
                        <span className="font-mono text-[11px] text-cyan-400/80 bg-slate-950 px-2 py-0.5 rounded shrink-0">
                          {rune.sample}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-normal">
                        {rune.desc}
                      </p>
                    </div>
                  </button>
                );
              })}

              {activeRunes.length > 0 && !isVictorious && (
                <button
                  onClick={handleReset}
                  className="min-h-[44px] text-xs text-slate-400 hover:text-white flex items-center gap-1.5 justify-center mt-1 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.btnReplay}</span>
                </button>
              )}
            </>
          ) : (
            /* TAB 2: LIVE TESTER LAB */
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-pink-400" />
                  <span>{t.testerTitle}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {t.testerDesc}
                </p>
              </div>

              {/* Password Input */}
              <div className="relative mt-2">
                <input
                  type={showTesterPassword ? "text" : "password"}
                  value={customPassword}
                  onChange={(e) => {
                    sounds.playPop();
                    setCustomPassword(e.target.value);
                  }}
                  placeholder={t.testerPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-pink-500 transition pr-10 rtl:pr-4 rtl:pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowTesterPassword(!showTesterPassword)}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-slate-400 hover:text-white p-1"
                >
                  {showTesterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Real-time Checklist */}
              <div className="space-y-2 mt-2">
                {t.testerTips.map((tip, idx) => {
                  const passed = tip.test(customPassword);
                  return (
                    <div 
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs transition ${
                        passed
                          ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                          : "bg-slate-950/60 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        passed ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-500"
                      }`}>
                        {passed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "•"}
                      </div>
                      <span className="font-medium">{tip.label}</span>
                    </div>
                  );
                })}
              </div>

              {customTestsPassed === 4 && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-bounce mt-1">
                  ⚡ {isAr ? "كلمة مرور أسطورية منيعة!" : "Mot de passe invincible félicitations !"} ⚡
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Victory Dialogue & Action Buttons */}
      <AnimatePresence>
        {isVictorious && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="w-full max-w-3xl mt-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mb-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-emerald-300">
              {t.victoryTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2 max-w-xl">
              {t.victoryText}
            </p>

            <div className="w-full bg-slate-950/80 p-4 rounded-2xl border border-amber-500/30 my-4 text-xs sm:text-sm text-amber-200 flex items-start gap-3 text-start">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-400 block mb-0.5">{t.goldenRuleTitle}</strong>
                <span>{t.goldenRuleText}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 w-full justify-center">
              <button
                onClick={() => {
                  sounds.playClick();
                  router.push("/lesson2");
                }}
                className="min-h-[48px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnNext}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  router.push("/victory");
                }}
                className="min-h-[48px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-950/50 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>{t.btnCert}</span>
              </button>

              <button
                onClick={handleReset}
                className="min-h-[48px] px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.btnReplay}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}