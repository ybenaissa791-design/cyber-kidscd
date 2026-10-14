"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  Wrench, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw,
  Zap,
  Hammer,
  Trophy
} from "lucide-react";

export default function Lesson5() {
  const router = useRouter();
  const { language, completeLevel } = useGame();

  const [fixedCracks, setFixedCracks] = useState<number[]>([]);
  const [isVictorious, setIsVictorious] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 05 / 07",
      title: "L'Atelier du Robot Forgeron",
      concept: "Fondement : Les Mises à Jour de Sécurité (Updates & Patchs)",
      story: "L'armure magique du Cyber-Gardien a subi des chocs. Des micro-fissures (des failles de sécurité) sont apparues ! Si on ne les répare pas, les virus peuvent s'y glisser. Aide le petit robot forgeron à appliquer les 4 patchs protecteurs avec son marteau magique !",
      instruction: "Clique sur chaque fissure pour la souder et restaurer l'armure à 100% !",
      armorStatus: "État de l'Armure :",
      btnNextMission: "Passer à la Mission 6 (La Sauvegarde Céleste) 🚀",
      btnCert: "Obtenir le Certificat 🏆",
      btnReplayMission: "Rejouer la mission 🔄",
      btnReplay: "Rejouer l'atelier 🔄",
      backMap: "Retour à la Carte",
      victoryTitle: "Armure Restaurée ! Défense Totale !",
      victoryText: "Grâce à tes réparations, l'armure est plus solide que jamais. Les virus ne trouvent plus la moindre faille pour s'infiltrer !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Quand ton téléphone, ta console ou ton ordinateur te propose une mise à jour, fais-la avec l'aide de tes parents ! Les mises à jour colmatent les failles secrètes.",
      cracks: [
        {
          id: 1,
          name: "Mise à Jour du Système (OS)",
          desc: "Colmate la faille critique du système d'exploitation.",
          icon: "⚙️",
          repaired: "Patch Système Appliqué !",
        },
        {
          id: 2,
          name: "Mise à Jour du Navigateur Web",
          desc: "Bloque les attaques venant des sites web malveillants.",
          icon: "🌐",
          repaired: "Navigateur Sécurisé !",
        },
        {
          id: 3,
          name: "Mise à Jour des Jeux & Applis",
          desc: "Corrige les bugs et empêche le vol de tes comptes de jeu.",
          icon: "🎮",
          repaired: "Jeux Protégés !",
        },
        {
          id: 4,
          name: "Correctif de l'Antivirus",
          desc: "Apprend à l'antivirus à reconnaître les tout derniers virus.",
          icon: "🛡️",
          repaired: "Base Antivirus Actualisée !",
        },
      ],
    },
    ar: {
      missionTag: "المهمة 05 / 07",
      title: "ورشة الروبوت الحداد الماهر",
      concept: "الأساس الخامس: تحديثات الأمان وسد الثغرات (Updates)",
      story: "تعرض درع الحامي السيبراني لضربات قوية وظهرت فيه شقوق مجهرية (ثغرات أمنية)! إن لم نصلحها فوراً، ستتسلل الفيروسات عبرها. ساعد الروبوت الحداد الذكي في لحام الشقوق الأربعة بمطرقته السحرية!",
      instruction: "انقر على كل شق ولحامه بالكامل لإعادة الدرع إلى كفاءة 100%!",
      armorStatus: "حالة صلابة الدرع:",
      btnNextMission: "الانتقال للمهمة التالية (الخزنة السحابية) 🚀",
      btnCert: "الحصول على الشهادة 🏆",
      btnReplayMission: "إعادة اللعب من جديد 🔄",
      btnReplay: "إعادة الورشة 🔄",
      backMap: "العودة للخريطة",
      victoryTitle: "تم إصلاح الدرع بنجاح خارق!",
      victoryText: "بفضل مطرقتك السحرية، أصبح الدرع منيعاً كالفولاذ! لم يعد بإمكان أي برمجية خبيثة استغلال أي ثغرة!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "عندما يطلب منك جهازك أو ألعابك إجراء تحديث (Update)، وافق فوراً واستعن بوالديك! فالتحديثات تسد الثغرات وتحميك من الاختراق.",
      cracks: [
        {
          id: 1,
          name: "تحديث نظام التشغيل الأساسي",
          desc: "سد الثغرات الخطيرة في قلب نظام الجهاز.",
          icon: "⚙️",
          repaired: "تم تحديث النظام بالكامل!",
        },
        {
          id: 2,
          name: "تحديث متصفح الإنترنت",
          desc: "منع الهجمات الخبيثة أثناء تصفح المواقع.",
          icon: "🌐",
          repaired: "المتصفح الآن في أعلى درجات الأمان!",
        },
        {
          id: 3,
          name: "تحديث الألعاب والتطبيقات",
          desc: "إصلاح الأخطاء وحماية حسابات ألعابك من السرقة.",
          icon: "🎮",
          repaired: "ألعابك محصنة ضد القراصنة!",
        },
        {
          id: 4,
          name: "تحديث قاعدة بيانات مكافح الفيروسات",
          desc: "تعليم الدرع كيفية التعرف على الفيروسات الحديثة.",
          icon: "🛡️",
          repaired: "مكافح الفيروسات جاهز لأحدث التهديدات!",
        },
      ],
    },
  }[language];

  const handleFixCrack = (id: number) => {
    if (fixedCracks.includes(id)) return;

    sounds.playHammer();
    const nextFixed = [...fixedCracks, id];
    setFixedCracks(nextFixed);

    if (nextFixed.length === 4) {
      setTimeout(() => {
        sounds.playSuccess();
        setIsVictorious(true);
        completeLevel(5);
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
    setFixedCracks([]);
    setIsVictorious(false);
  };

  const percentage = (fixedCracks.length / 4) * 100;

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-teal-600/10 blur-3xl pointer-events-none rounded-full"></div>

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

        <span className="text-xs font-black text-teal-400 uppercase tracking-widest px-3 py-1 bg-teal-950/60 border border-teal-800/60 rounded-full">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-teal-300/80 font-bold uppercase tracking-wider mt-2">
          {t.concept}
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Main Arena */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left: The Robot Engineer Visual */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden min-h-[400px]">
          <div className="relative w-full h-72 flex items-center justify-center">
            <motion.img
              src="/assestes/img8_maj.png"
              alt="Robot Forgeron de mise à jour"
              className="max-h-72 w-auto object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              animate={{
                y: [0, -6, 0],
                filter: isVictorious
                  ? "drop-shadow(0 0 35px rgba(20,184,166,0.9))"
                  : "drop-shadow(0 0 15px rgba(20,184,166,0.4))"
              }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }}
            />
          </div>

          {/* Armor Defense Meter */}
          <div className="w-full mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
              <span className="text-slate-400">{t.armorStatus}</span>
              <span className={`font-mono ${percentage === 100 ? "text-emerald-400" : "text-amber-400"}`}>
                {percentage}% {percentage === 100 ? "🛡️ BLINDÉ !" : "⚠️ EN COURS DE PATCH"}
              </span>
            </div>

            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-teal-400 to-emerald-400 rounded-full"
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Right: The 4 Patch Repair Buttons */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <p className="text-xs sm:text-sm font-bold text-teal-300 mb-1 flex items-center gap-2">
            <Hammer className="w-4 h-4 text-teal-400" />
            <span>{t.instruction}</span>
          </p>

          {t.cracks.map((crack) => {
            const isFixed = fixedCracks.includes(crack.id);

            return (
              <motion.button
                key={crack.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFixCrack(crack.id)}
                className={`p-4 rounded-2xl border text-start flex items-start gap-3.5 transition-all cursor-pointer ${
                  isFixed
                    ? "bg-teal-950/60 border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.2)]"
                    : "bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-teal-500/40"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-base font-bold ${
                  isFixed 
                    ? "bg-teal-500 text-slate-950" 
                    : "bg-slate-800 text-slate-400"
                }`}>
                  {isFixed ? <Check className="w-5 h-5 stroke-[3]" /> : crack.icon}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-bold ${isFixed ? "text-teal-300" : "text-white"}`}>
                      {crack.name}
                    </h3>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      isFixed ? "bg-teal-950 text-teal-300 border border-teal-800" : "bg-slate-950 text-amber-400"
                    }`}>
                      {isFixed ? "PATCHÉ ✓" : "FAILLE ⚠️"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {isFixed ? crack.repaired : crack.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}

          {fixedCracks.length > 0 && !isVictorious && (
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
            className="w-full max-w-3xl mt-10 bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border-2 border-teal-500/50 shadow-[0_0_50px_rgba(20,184,166,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center text-teal-300 mb-3">
              <ShieldCheck className="w-10 h-10 text-teal-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-teal-300">
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

            <div className="flex flex-wrap gap-3 mt-4 w-full justify-center">
              <button
                onClick={() => {
                  sounds.playClick();
                  router.push("/lesson6");
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-teal-950/50 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnNextMission}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  router.push("/victory");
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-950/50 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>{t.btnCert}</span>
              </button>

              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.btnReplayMission}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
