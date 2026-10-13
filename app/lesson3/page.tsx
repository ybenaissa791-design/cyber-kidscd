"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  Shield, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

export default function Lesson3() {
  const router = useRouter();
  const { language, completeLevel } = useGame();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shieldActive, setShieldActive] = useState(false);
  const [isVictorious, setIsVictorious] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 03 / 07",
      title: "Le Mur de Feu et le Grand Bouclier",
      concept: "Fondement : Le Pare-feu (Firewall) et l'Antivirus",
      story: "Tu es le Capitaine de la garde ! Devant les portes du château, un flot de données arrive. Le Pare-feu doit laisser passer les amis et dresser le bouclier de flammes contre les robots espions et les virus !",
      gateLabel: "Porte Principale de la Forteresse",
      btnAllow: "Autoriser l'ami ✅",
      btnBlock: "Bloquer au Bouclier 🛡️",
      btnNextItem: "Donnée suivante ➡️",
      btnNextMission: "Passer à la Mission 4 (Les Trésors Privés) 🚀",
      btnRetry: "Recommencer le défi 🔄",
      backMap: "Retour à la Carte",
      correctFeedback: "Excellente décision, Capitaine !",
      wrongFeedback: "Oups ! Mauvais filtrage !",
      victoryTitle: "Forteresse Imprenable ! Le Pare-feu veille !",
      victoryText: "Grâce à ta vigilance, aucune menace n'a pu franchir les remparts. Tu sais maintenant comment un pare-feu et un antivirus protègent tes ordinateurs et tablettes !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Garde toujours ton pare-feu et ton antivirus activés sur tes appareils. Ce sont tes gardes du corps numériques invisibles !",
      packets: [
        {
          id: 1,
          name: "Email de Grand-Mère",
          desc: "Un message avec des photos de famille et une recette de crêpes 🥞",
          isSafe: true,
          explanation: "C'est un contenu sain venant d'une personne de confiance !",
        },
        {
          id: 2,
          name: "Cheval de Troie Masqué",
          desc: "Un fichier suspect nommé 'Robux_Gratuits_Cheat.exe' 👾",
          isSafe: false,
          explanation: "Ce faux programme cache un virus pour pirater tes jeux !",
        },
        {
          id: 3,
          name: "Lien de la Classe d'École",
          desc: "Le devoir de sciences envoyé par ton enseignant sur l'espace officiel 📚",
          isSafe: true,
          explanation: "Le site officiel de l'école est vérifié et sécurisé !",
        },
        {
          id: 4,
          name: "Robot-Espion Publicitaire",
          desc: "Une fenêtre clignotante 'Bravo vous êtes le 1000e visiteur' avec un virus espion 🐛",
          isSafe: false,
          explanation: "C'est un adware espion qui veut ralentir ton ordinateur !",
        },
        {
          id: 5,
          name: "Vidéo d'anniversaire d'un ami",
          desc: "Un dessin animé partagé par ton meilleur copain de classe 🎨",
          isSafe: true,
          explanation: "Partage légitime entre amis vérifiés !",
        },
      ],
    },
    ar: {
      missionTag: "المهمة 03 / 07",
      title: "جدار اللهب والدرع الحارس",
      concept: "الأساس الثالث: الجدار الناري ومكافح الفيروسات",
      story: "أنت قائد حرس القلعة الرقمية! على بوابات المملكة، تتدفق حزم البيانات يومياً. مهمتك تشغيل الجدار الناري للسماح بمرور الأصدقاء، ورفع الدرع في وجه الحشرات والفيروسات الغازية!",
      gateLabel: "البوابة الرئيسية للقلعة الحصينة",
      btnAllow: "السماح بالمرور ✅",
      btnBlock: "الصد بالدرع الناري 🛡️",
      btnNextItem: "فحص الحزمة التالية ➡️",
      btnNextMission: "الانتقال للمهمة 4 (الكنوز والخصوصية) 🚀",
      btnRetry: "إعادة التحدي 🔄",
      backMap: "العودة للخريطة",
      correctFeedback: "قرار حكيم وبطولي يا قائد!",
      wrongFeedback: "انتبه! قرار غير صحيح!",
      victoryTitle: "القلعة بأمان تام! الجدار الناري صامد!",
      victoryText: "بفضل يقظتك لم يستطع أي فيروس عبور البوابات! الآن فهمت تماماً كيف يعمل الجدار الناري ومكافح الفيروسات لحماية حاسوبك وهاتفك!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "اترك الجدار الناري ومضاد الفيروسات قيد العمل دائماً في أجهزتك. إنهما حراسك السريون على مدار الساعة!",
      packets: [
        {
          id: 1,
          name: "رسالة الجدة اللطيفة",
          desc: "رسالة بريد تضم صور العائلة ووصفة كعكة لذيذة 🥞",
          isSafe: true,
          explanation: "بيانات سليمة وصادقة من شخص موثوق ومحبوب!",
        },
        {
          id: 2,
          name: "حصان طروادة المخادع",
          desc: "ملف مشبوه يزعم منح 'جواهر مجانية وسريعة' 👾",
          isSafe: false,
          explanation: "برنامج ملغوم يهدف لاختراق جهازك وسرقة ألعابك!",
        },
        {
          id: 3,
          name: "موقع المدرسة والواجبات",
          desc: "واجب الرياضيات والعلوم مرسل من معلمك عبر منصة المدرسة الرسمية 📚",
          isSafe: true,
          explanation: "منصة تعليمية رسمية ومحمية وموثوقة تماماً!",
        },
        {
          id: 4,
          name: "حشرة التجسس والإعلانات",
          desc: "نافذة تصرخ 'مبروك أنت الفائز رقم 1000' حاملة برمجية تجسس 🐛",
          isSafe: false,
          explanation: "برمجية خبيثة تهدف لإبطاء جهازك وعرض إعلانات مزعجة!",
        },
        {
          id: 5,
          name: "مقطع رسم ومرح من صديقك",
          desc: "رسمة كرتونية صنعها زميلك في الفصل وأرسلها لك 🎨",
          isSafe: true,
          explanation: "ملف آمن بين أصدقاء حقيقيين معروفين!",
        },
      ],
    },
  }[language];

  const currentPacket = t.packets[currentIdx];

  const handleDecision = (allowed: boolean) => {
    if (feedback !== null) return;

    const isCorrect = (allowed && currentPacket.isSafe) || (!allowed && !currentPacket.isSafe);

    if (isCorrect) {
      if (!currentPacket.isSafe) {
        sounds.playShield();
        setShieldActive(true);
      } else {
        sounds.playSuccess();
      }
      setFeedback("correct");
      setScore(score + 1);

      // Check if finished all packets
      if (currentIdx === t.packets.length - 1) {
        setTimeout(() => {
          setIsVictorious(true);
          completeLevel(3);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 800);
      }
    } else {
      sounds.playFail();
      setFeedback("wrong");
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setFeedback(null);
    setShieldActive(false);
    if (currentIdx < t.packets.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setScore(0);
    setFeedback(null);
    setShieldActive(false);
    setIsVictorious(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-orange-600/10 blur-3xl pointer-events-none rounded-full"></div>

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

        <span className="text-xs font-black text-orange-400 uppercase tracking-widest px-3 py-1 bg-orange-950/60 border border-orange-800/60 rounded-full">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-orange-300/80 font-bold uppercase tracking-wider mt-2">
          {t.concept}
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Main Interactive Arena */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left: The Fiery Firewall Visual */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden min-h-[400px]">
          
          <div className="relative w-full h-72 rounded-2xl overflow-hidden flex items-center justify-center">
            {/* The fiery brick wall */}
            <motion.img
              src="/assestes/img6_parefeu (2).png"
              alt="Mur Pare-feu"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              animate={{
                filter: shieldActive 
                  ? "brightness(1.3) drop-shadow(0 0 30px rgba(249,115,22,0.8))" 
                  : "brightness(1)"
              }}
            />

            {/* Glowing Shield flare when blocking */}
            {shieldActive && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 bg-orange-500/30 backdrop-blur-[2px] flex items-center justify-center z-20"
              >
                <div className="px-4 py-2 rounded-xl bg-orange-600 text-white font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl animate-bounce">
                  <Flame className="w-5 h-5" />
                  <span>BLOCAGE PARE-FEU ! 🛡️</span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="w-full mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>{t.gateLabel}</span>
            <span className="text-amber-400 font-bold">
              Paquet {currentIdx + 1} / {t.packets.length}
            </span>
          </div>

        </div>

        {/* Right: Incoming Packet Card & Action Buttons */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Incoming Packet Card */}
          <motion.div
            key={currentPacket.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-xl relative"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-orange-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Shield className="w-4 h-4 text-orange-400" />
                Donnée entrante #{currentPacket.id}
              </span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
                TCP / Port 443
              </span>
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              {currentPacket.name}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              {currentPacket.desc}
            </p>

            {/* Decision Buttons */}
            {feedback === null && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => handleDecision(true)}
                  className="py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-950/40 border-b-4 border-emerald-800 transition hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.btnAllow}</span>
                </button>

                <button
                  onClick={() => handleDecision(false)}
                  className="py-4 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-sm sm:text-base shadow-lg shadow-rose-950/40 border-b-4 border-rose-800 transition hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.btnBlock}</span>
                </button>
              </div>
            )}

            {/* Feedback notification */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  feedback === "correct"
                    ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-200"
                    : "bg-rose-950/80 border-rose-500/50 text-rose-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {feedback === "correct" ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold">
                      {feedback === "correct" ? t.correctFeedback : t.wrongFeedback}
                    </h4>
                    <p className="text-xs mt-0.5 opacity-90">{currentPacket.explanation}</p>
                  </div>
                </div>

                {currentIdx < t.packets.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-slate-200 transition"
                  >
                    {t.btnNextItem}
                  </button>
                )}
              </motion.div>
            )}

          </motion.div>

        </div>

      </div>

      {/* Victory Dialogue */}
      <AnimatePresence>
        {isVictorious && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl mt-10 bg-gradient-to-r from-orange-950 via-slate-900 to-red-950 p-6 sm:p-8 rounded-3xl border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-400 flex items-center justify-center text-orange-300 mb-3">
              <ShieldCheck className="w-10 h-10 text-orange-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-orange-300">
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
                router.push("/lesson4");
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-black text-lg shadow-xl shadow-orange-950/50 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {t.btnNextMission}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
