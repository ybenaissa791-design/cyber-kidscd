"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  Cloud, 
  HardDrive, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  RotateCcw,
  UploadCloud,
  FileCheck2
} from "lucide-react";

export default function Lesson6() {
  const router = useRouter();
  const { language, completeLevel } = useGame();

  const [backedUpIds, setBackedUpIds] = useState<number[]>([]);
  const [isVictorious, setIsVictorious] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 06 / 07",
      title: "La Sauvegarde Céleste du Cloud",
      concept: "Fondement : Les Sauvegardes & Backups",
      story: "Imagine qu'une tasse d'eau tombe sur ton ordinateur, ou qu'un virus bloque l'écran... Si tu n'as pas de copie de secours, tes photos et devoirs sont perdus ! Heureusement, la Sauvegarde Céleste aspire et protège tes souvenirs dans un coffre-fort volant.",
      instruction: "Transfère chaque trésor numérique dans le coffre-fort céleste pour le mettre à l'abri !",
      vaultLabel: "Coffre Céleste Sécurisé",
      vaultCounter: "Fichiers synchronisés :",
      btnBackup: "Sauvegarder ☁️",
      btnNextMission: "Passer à la Mission 7 (Le Tunnel Sécurisé) 🚀",
      btnReplay: "Recommencer la sauvegarde 🔄",
      backMap: "Retour à la Carte",
      victoryTitle: "Sauvegarde Réussie ! Souvenirs Invulnérables !",
      victoryText: "Tous tes trésors sont maintenant à l'abri dans le cloud sécurisé. Même si la tablette tombe en panne, tes précieux fichiers ne disparaîtront jamais !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Fais des sauvegardes régulières avec tes parents (sur une clé USB, un disque dur ou le cloud). Une copie de secours sauve toujours la mise !",
      treasures: [
        {
          id: 1,
          name: "L'Album Photos de Famille",
          desc: "Tous les souvenirs de vacances et d'anniversaires 📸",
          type: "Photos & Vidéos",
        },
        {
          id: 2,
          name: "L'Exposé d'École sur l'Espace",
          desc: "Des heures de travail pour ton devoir de sciences 🪐",
          type: "Document Scolaire",
        },
        {
          id: 3,
          name: "La Sauvegarde de ton Jeu Vidéo",
          desc: "Le niveau 99 et tous tes trophées débloqués 🎮",
          type: "Données de Jeu",
        },
        {
          id: 4,
          name: "Tes Dessins & Projets Créatifs",
          desc: "Tes chefs-d'œuvre artistiques numériques 🎨",
          type: "Créations Privées",
        },
      ],
    },
    ar: {
      missionTag: "المهمة 06 / 07",
      title: "الخزنة السحابية الطائرة",
      concept: "الأساس السادس: النسخ الاحتياطي وحفظ الملفات (Backups)",
      story: "تخيل أن كأساً من الماء انسكب على جهازك، أو أصابه عطل مفاجئ... إن لم تكن لديك نسخة احتياطية، فستفقد صورك وواجباتك للأبد! لحسن الحظ، الخزنة السحابية الذكية تحلق في السماء لحفظ نسخة آمنة من كنوزك.",
      instruction: "انقل كل كنز رقمي إلى الخزنة السحابية لحمايته من أي ضياع مفاجئ!",
      vaultLabel: "الخزنة السحابية المشفرة",
      vaultCounter: "الملفات المحفوظة بأمان:",
      btnBackup: "حفظ ورفع ☁️",
      btnNextMission: "الانتقال للمهمة 7 (النفق المشفر) 🚀",
      btnReplay: "إعادة النسخ الاحتياطي 🔄",
      backMap: "العودة للخريطة",
      victoryTitle: "اكتمل النسخ الاحتياطي بنجاح مذهل!",
      victoryText: "جميع ملفاتك وذكرياتك محفوظة بأمان داخل الغيوم المشفرة! حتى لو تلف الجهاز، يمكنك استعادتها فوراً بلمسة زر واحدة!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "قم بعمل نسخ احتياطي دوري بمساعدة والديك على قرص خارجي أو سحابة آمنة. النسخة الاحتياطية تنقذك دوماً من الصدمات!",
      treasures: [
        {
          id: 1,
          name: "ألبوم صور العائلة والرحلات",
          desc: "ذكريات الإجازات الجميلة وأعياد الميلاد 📸",
          type: "صور وفيديوهات عائلية",
        },
        {
          id: 2,
          name: "بحث المدرسة عن الفضاء",
          desc: "ساعات من الجهد لتحضير واجب العلوم 🪐",
          type: "مستند دراسي هام",
        },
        {
          id: 3,
          name: "ملف تقدم لعبتك المفضلة",
          desc: "المستوى 99 وجميع الأوسمة المكتسبة 🎮",
          type: "بيانات ألعاب إلكترونية",
        },
        {
          id: 4,
          name: "رسوماتك وتصاميمك الرقمية",
          desc: "إبداعاتك الفنية التي لا تعوض 🎨",
          type: "مشاريع فنية خاصة",
        },
      ],
    },
  }[language];

  const handleBackup = (id: number) => {
    if (backedUpIds.includes(id)) return;

    sounds.playSuccess();
    const nextIds = [...backedUpIds, id];
    setBackedUpIds(nextIds);

    if (nextIds.length === 4) {
      setTimeout(() => {
        sounds.playFanfare();
        setIsVictorious(true);
        completeLevel(6);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 500);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setBackedUpIds([]);
    setIsVictorious(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full"></div>

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

        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-950/60 border border-indigo-800/60 rounded-full">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-blue-400">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-indigo-300/80 font-bold uppercase tracking-wider mt-2">
          {t.concept}
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Main Arena */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left: The Smiling Cloud Vault Visual */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden min-h-[400px]">
          <div className="relative w-full h-72 flex items-center justify-center">
            <motion.img
              src="/assestes/img7_sauvegarde.png"
              alt="Coffre-Fort du Cloud"
              className="max-h-72 w-auto object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              animate={{
                y: [0, -8, 0],
                filter: isVictorious
                  ? "drop-shadow(0 0 40px rgba(59,130,246,0.9))"
                  : "drop-shadow(0 0 15px rgba(59,130,246,0.4))"
              }}
              transition={{
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
            />
          </div>

          {/* Sync status */}
          <div className="w-full mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-bold">
              <Cloud className="w-4 h-4 text-sky-400" />
              {t.vaultCounter}
            </span>
            <span className="text-sm font-black font-mono text-sky-400">
              {backedUpIds.length} / 4 {backedUpIds.length === 4 ? "✅ SÉCURISÉ" : "☁️ EN ATTENTE"}
            </span>
          </div>
        </div>

        {/* Right: The 4 Treasures to Backup */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <p className="text-xs sm:text-sm font-bold text-sky-300 mb-1 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-sky-400" />
            <span>{t.instruction}</span>
          </p>

          {t.treasures.map((item) => {
            const isBackedUp = backedUpIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={!isBackedUp ? { scale: 1.02 } : {}}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3.5 transition-all ${
                  isBackedUp
                    ? "bg-sky-950/60 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                    : "bg-slate-900/70 border-slate-800"
                }`}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold ${isBackedUp ? "text-sky-300" : "text-white"}`}>
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>

                <button
                  disabled={isBackedUp}
                  onClick={() => handleBackup(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isBackedUp
                      ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 cursor-default"
                      : "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md active:scale-95"
                  }`}
                >
                  {isBackedUp ? (
                    <>
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Sauvegardé ✓</span>
                    </>
                  ) : (
                    <span>{t.btnBackup}</span>
                  )}
                </button>
              </motion.div>
            );
          })}

          {backedUpIds.length > 0 && !isVictorious && (
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
            className="w-full max-w-3xl mt-10 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border-2 border-sky-500/50 shadow-[0_0_50px_rgba(14,165,233,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 mb-3">
              <ShieldCheck className="w-10 h-10 text-sky-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-sky-300">
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
                sounds.playClick();
                router.push("/lesson7");
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-black text-lg shadow-xl shadow-sky-950/50 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {t.btnNextMission}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
