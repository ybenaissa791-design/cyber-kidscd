"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  Lock, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  RotateCcw,
  UserCheck
} from "lucide-react";

export default function Lesson4() {
  const router = useRouter();
  const { language, completeLevel } = useGame();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [secretVaultItems, setSecretVaultItems] = useState<string[]>([]);
  const [publicGardenItems, setPublicGardenItems] = useState<string[]>([]);
  const [isVictorious, setIsVictorious] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 04 / 07",
      title: "Le Coffre aux Trésors de la Vie Privée",
      concept: "Fondement : Protéger ses Données Personnelles",
      story: "Sur Internet, tes informations personnelles sont plus précieuses que de l'or ! Un Cyber-Héros sait exactement ce qu'il peut partager en public et ce qu'il doit impérativement enfermer dans le Coffre Secret.",
      instruction: "Trie chaque élément : Doit-il rester dans le Coffre Secret 🔒 ou peut-il aller dans le Jardin Public 🌐 ?",
      btnSecret: "Garder dans le Coffre Secret 🔒",
      btnPublic: "Partager dans le Jardin Public 🌐",
      btnNextItem: "Trésor suivant ➡️",
      btnNextMission: "Passer à la Mission 5 (Le Robot Forgeron) 🚀",
      btnRetry: "Recommencer le tri 🔄",
      backMap: "Retour à la Carte",
      correctTitle: "Bien joué Cyber-Héros !",
      wrongTitle: "Attention à ta vie privée !",
      victoryTitle: "Tes Trésors sont sous Haute Protection !",
      victoryText: "Félicitations ! Tu as su séparer tes secrets privés de ce qui peut être partagé. Grâce à toi, aucun inconnu ne pourra utiliser tes informations contre toi !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Ton vrai nom, ton adresse, ton école et tes mots de passe sont privés. Ne les donne JAMAIS à des inconnus sur Internet !",
      vaultTitle: "Dans le Coffre Secret (Privé)",
      gardenTitle: "Dans le Jardin Public (Public)",
      items: [
        {
          id: 1,
          label: "L'adresse exacte de ta maison 🏠",
          isSecret: true,
          explanation: "Un inconnu ne doit jamais savoir où tu habites !",
        },
        {
          id: 2,
          label: "Ton pseudo de joueur (ex: CyberNinja_99) 🎮",
          isSecret: false,
          explanation: "Un pseudo inventé ne révèle rien sur ta vraie identité !",
        },
        {
          id: 3,
          label: "Le nom et l'adresse de ton école 🏫",
          isSecret: true,
          explanation: "Garde le nom de ton école secret pour ta sécurité.",
        },
        {
          id: 4,
          label: "Ta couleur ou ton animal préféré 🎨",
          isSecret: false,
          explanation: "C'est sans danger et amusant à partager avec des amis !",
        },
        {
          id: 5,
          label: "Une photo de toi devant ta maison ou avec ton uniforme 📸",
          isSecret: true,
          explanation: "Les photos peuvent donner des indices sur l'endroit où tu vis.",
        },
        {
          id: 6,
          label: "Ton jeu vidéo préféré 🕹️",
          isSecret: false,
          explanation: "Partager tes goûts de jeu ne présente aucun risque !",
        },
        {
          id: 7,
          label: "Le mot de passe de ton compte ou de ta tablette 🔑",
          isSecret: true,
          explanation: "Le trésor absolu ! Ne le donne à personne en dehors de tes parents.",
        },
      ],
    },
    ar: {
      missionTag: "المهمة 04 / 07",
      title: "صندوق أسرار الخصوصية والكنوز",
      concept: "الأساس الرابع: حماية البيانات الشخصية",
      story: "بياناتك ومعلوماتك الشخصية على الإنترنت أغلى من الذهب والمجوهرات! البطل السيبراني الحقيقي يميز بذكاء بين ما يجب كتمانه داخل الصندوق السري، وما يمكن مشاركته بأمان في الحديقة العامة.",
      instruction: "صنّف كل بطاقة: هل مكانها الصندوق السري 🔒 أم الحديقة العامة 🌐؟",
      btnSecret: "حفظ في الصندوق السري 🔒",
      btnPublic: "مشاركة في الحديقة العامة 🌐",
      btnNextItem: "فرز البطاقة التالية ➡️",
      btnNextMission: "الانتقال للمهمة 5 (الروبوت الحداد) 🚀",
      btnRetry: "إعادة التصنيف 🔄",
      backMap: "العودة للخريطة",
      correctTitle: "تصنيف ممتاز يا بطل!",
      wrongTitle: "احذر على خصوصيتك!",
      victoryTitle: "أسرارك وكنوزك في أمان تام!",
      victoryText: "أحسنت صنعاً! لقد أتقنت أعظم مهارات الحماية الرقمية: حماية الهوية الشخصية ومنع المتطفلين من معرفة تفاصيل حياتك اليومية!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "اسمك الحقيقي، عنوان بيتك، مدرستك، وصورك الشخصية أسرار خاصة. لا تمنحها للغرباء في الألعاب أو المحادثات!",
      vaultTitle: "داخل الصندوق السري (خاص)",
      gardenTitle: "في الحديقة العامة (متاح)",
      items: [
        {
          id: 1,
          label: "عنوان منزلك ورقم الشارع 🏠",
          isSecret: true,
          explanation: "لا يجوز لأي شخص غريب معرفة مكان سكنك أبداً!",
        },
        {
          id: 2,
          label: "اسمك المستعار في اللعبة (مثل: البطل_الخارق) 🎮",
          isSecret: false,
          explanation: "الاسم المستعار خيالي ولا يكشف هويتك الحقيقية للغرباء!",
        },
        {
          id: 3,
          label: "اسم مدرستك وفصلك الدراسي 🏫",
          isSecret: true,
          explanation: "احتفظ باسم مدرستك سراً لحمايتك الشخصية من المجهولين.",
        },
        {
          id: 4,
          label: "لونك المفضل أو طعامك المحبوب 🎨",
          isSecret: false,
          explanation: "معلومة مرحة وغير خطيرة يمكن مشاركتها مع الرفاق!",
        },
        {
          id: 5,
          label: "صورة لك بملابس المدرسة أمام باب بيتك 📸",
          isSecret: true,
          explanation: "الصور الشخصية قد تفصح عن مكان سكنك وتفاصيل حياتك الخاصة.",
        },
        {
          id: 6,
          label: "لعبتك الإلكترونية المفضلة 🕹️",
          isSecret: false,
          explanation: "إبداء رأيك في الألعاب أمر آمن وممتع تماماً!",
        },
        {
          id: 7,
          label: "كلمة مرور جهازك أو بريدك الإلكتروني 🔑",
          isSecret: true,
          explanation: "السر الأعظم! لا تعطه لأحد أبداً سوى والديك.",
        },
      ],
    },
  }[language];

  const currentItem = t.items[currentIdx];

  const handleClassify = (choseSecret: boolean) => {
    if (feedback !== null) return;

    const isCorrect = (choseSecret && currentItem.isSecret) || (!choseSecret && !currentItem.isSecret);

    if (isCorrect) {
      sounds.playSuccess();
      setFeedback("correct");

      if (choseSecret) {
        setSecretVaultItems((prev) => [...prev, currentItem.label]);
      } else {
        setPublicGardenItems((prev) => [...prev, currentItem.label]);
      }

      if (currentIdx === t.items.length - 1) {
        setTimeout(() => {
          setIsVictorious(true);
          completeLevel(4);
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
    if (currentIdx < t.items.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIdx(0);
    setFeedback(null);
    setSecretVaultItems([]);
    setPublicGardenItems([]);
    setIsVictorious(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-600/10 blur-3xl pointer-events-none rounded-full"></div>

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

        <span className="text-xs font-black text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-950/60 border border-amber-800/60 rounded-full">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-amber-300/80 font-bold uppercase tracking-wider mt-2">
          {t.concept}
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Main Arena */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left: Treasure Chest Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden min-h-[380px]">
          <div className="relative w-full h-72 flex items-center justify-center">
            <motion.img
              src="/assestes/img7_tresor.png"
              alt="Coffre au Trésor"
              className="max-h-72 w-auto object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              animate={{
                y: [0, -8, 0],
                filter: feedback === "correct" 
                  ? "drop-shadow(0 0 35px rgba(245,158,11,0.9))" 
                  : "drop-shadow(0 0 15px rgba(245,158,11,0.4))"
              }}
              transition={{
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
              }}
            />
          </div>

          <div className="w-full flex items-center justify-between text-xs text-slate-400 mt-2">
            <span>{t.instruction}</span>
            <span className="text-amber-400 font-bold">
              {currentIdx + 1} / {t.items.length}
            </span>
          </div>
        </div>

        {/* Right: Card Sorting Challenge */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-xl relative"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-wider">
                Information #{currentItem.id}
              </span>
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono text-xs">
                Donnée à classer
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white py-3 leading-relaxed">
              {currentItem.label}
            </h3>

            {/* Classification Buttons */}
            {feedback === null && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                
                {/* Secret button */}
                <button
                  onClick={() => handleClassify(true)}
                  className="py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-950/40 border-b-4 border-amber-800 transition hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5 text-slate-950" />
                  <span>{t.btnSecret}</span>
                </button>

                {/* Public button */}
                <button
                  onClick={() => handleClassify(false)}
                  className="py-4 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm sm:text-base shadow-lg shadow-cyan-950/40 border-b-4 border-cyan-800 transition hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Globe className="w-5 h-5 text-white" />
                  <span>{t.btnPublic}</span>
                </button>

              </div>
            )}

            {/* Feedback alert */}
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
                      {feedback === "correct" ? t.correctTitle : t.wrongTitle}
                    </h4>
                    <p className="text-xs mt-0.5 opacity-90">{currentItem.explanation}</p>
                  </div>
                </div>

                {currentIdx < t.items.length - 1 && (
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

          {/* Sorted items drawer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-amber-500/20">
              <span className="font-bold text-amber-400 flex items-center gap-1 mb-1.5">
                <Lock className="w-3.5 h-3.5" />
                {t.vaultTitle} ({secretVaultItems.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {secretVaultItems.map((item, idx) => (
                  <span key={idx} className="bg-amber-950/60 text-amber-200 px-2 py-0.5 rounded text-[11px] border border-amber-800/40">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-2xl border border-cyan-500/20">
              <span className="font-bold text-cyan-400 flex items-center gap-1 mb-1.5">
                <Globe className="w-3.5 h-3.5" />
                {t.gardenTitle} ({publicGardenItems.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {publicGardenItems.map((item, idx) => (
                  <span key={idx} className="bg-cyan-950/60 text-cyan-200 px-2 py-0.5 rounded text-[11px] border border-cyan-800/40">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Victory Dialogue */}
      <AnimatePresence>
        {isVictorious && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl mt-10 bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 mb-3">
              <ShieldCheck className="w-10 h-10 text-amber-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-amber-300">
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
                router.push("/lesson5");
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-lg shadow-xl shadow-amber-950/50 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {t.btnNextMission}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
