"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Eye,
  HelpCircle
} from "lucide-react";

export default function Lesson2() {
  const router = useRouter();
  const { language, completeLevel } = useGame();

  const [currentRound, setCurrentRound] = useState(0);
  const [roundStatus, setRoundStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [isVictorious, setIsVictorious] = useState(false);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 02 / 07",
      title: "Le Piège du Loup Déguisé",
      concept: "Fondement : Démasquer le Phishing (Hameçonnage)",
      story: "Sur Internet, des pirates se déguisent en gentils amis pour t'offrir des cadeaux miracles... Mais c'est un piège pour voler ton mot de passe et tes trésors ! Examine chaque message suspect.",
      detectiveTip: "Indice du Cyber-Détective : Si c'est trop beau pour être vrai, ou si on te presse de cliquer, c'est presque toujours un piège !",
      btnIgnore: "Refuser & Signaler 🛡️",
      btnAccept: "Ouvrir & Cliquer 🎁",
      btnNextRound: "Message suivant ➡️",
      btnNextMission: "Passer à la Mission 3 (Le Pare-feu) 🚀",
      btnRetryRound: "Réessayer l'analyse 🔄",
      backMap: "Retour à la Carte",
      correctTitle: "Bien vu Cyber-Héros ! Piège déjoué !",
      wrongTitle: "Attention ! C'était un piège !",
      victoryTitle: "Bravo ! Tu es désormais immunisé contre le Phishing !",
      victoryText: "Tu as démasqué les 3 ruses du loup. Tu as le réflexe d'or : vérifier, douter et ne jamais donner tes identifiants !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Personne ne donne de vrais cadeaux ou d'argent magique sur internet sans raison. Ne clique jamais sur des liens bizarres !",
      scenarios: [
        {
          id: 1,
          type: "Message dans un jeu vidéo",
          sender: "Joueur_Mystere_99",
          message: "🎉 Félicitations ! Tu as été tiré au sort pour gagner 10 000 pièces d'or gratuites ! Clique sur ce lien magique et tape vite ton mot de passe pour les recevoir !",
          clues: ["Cadeau gratuit suspect", "Demande de mot de passe", "Lien non officiel"],
          dangerDesc: "Le faux joueur voulait voler ton compte de jeu vidéo !",
          correctDesc: "Exact ! Les vrais jeux ne demandent jamais ton mot de passe par message.",
          img: "/assestes/img5_loup.png"
        },
        {
          id: 2,
          type: "Email surprise",
          sender: "service-urgent-livraison@faux-site.net",
          message: "📦 Un colis mystère géant t'attend ! Remplis vite ton nom complet, ton adresse de maison et le numéro de téléphone de tes parents pour le recevoir !",
          clues: ["Expéditeur inconnu", "Demande d'adresse personnelle", "Colis que tu n'as pas commandé"],
          dangerDesc: "Le pirate voulait obtenir l'adresse de ta maison et tes infos privées !",
          correctDesc: "Parfait ! Ne donne jamais l'adresse de ta maison ou tes infos sur un coup de tête.",
          img: "/assestes/img9_piege.png"
        },
        {
          id: 3,
          type: "Fausse alerte d'urgence",
          sender: "Alerte_Panique_Securite",
          message: "⚠️ ATTENTION ! Ton compte va être supprimé dans 2 minutes chrono ! Clique immédiatement ici pour prouver que tu es vivant !",
          clues: ["Urgence artificielle (2 minutes)", "Ton qui fait peur", "Lien de panique"],
          dangerDesc: "Les pirates utilisent la panique pour te forcer à cliquer sans réfléchir !",
          correctDesc: "Super réflexe ! Quand un message te fait peur ou te presse, garde ton calme et parles-en à un adulte.",
          img: "/assestes/img5_loup.png"
        }
      ]
    },
    ar: {
      missionTag: "المهمة 02 / 07",
      title: "فخ الذئب المتنكر",
      concept: "الأساس الثاني: كشف التصيد الاحتيالي (Phishing)",
      story: "في عالم الإنترنت، يتنكر القراصنة والذئاب بملابس حملان لطيفة ليقدموا هدايا وهمية... والهدف الحقيقي هو سرقة كلمات سرك وبياناتك! حلل الرسائل بحذر.",
      detectiveTip: "تلميح المحقق الذكي: إذا كان العرض خيالياً ومجانياً لدرجة يصعب تصديقها، أو إذا أجبروك على الإسراع، فهو فخ مؤكد!",
      btnIgnore: "رفض الفخ وتجاهله 🛡️",
      btnAccept: "فتح الرابط والهدية 🎁",
      btnNextRound: "فحص الرسالة التالية ➡️",
      btnNextMission: "الانتقال للمهمة 3 (الجدار الناري) 🚀",
      btnRetryRound: "إعادة المحاولة 🔄",
      backMap: "العودة للخريطة",
      correctTitle: "ممتاز يا بطل! كشفت الحيلة بنجاح!",
      wrongTitle: "انتبه! لقد وقعت في الفخ!",
      victoryTitle: "رائع جداً! أصبحت خبيراً في كشف التصيد!",
      victoryText: "لقد كشفت ألاعيب الذئب الثلاثة بذكاء، وتعلمت أعظم درس: التشكيك، الفحص، وعدم إعطاء أسرارك لأحد!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "لا توجد هدايا مجانية حقيقية توزع مجاناً دون سبب على الإنترنت. لا تنقر أبداً على روابط مجهولة!",
      scenarios: [
        {
          id: 1,
          type: "رسالة داخل لعبة إلكترونية",
          sender: "لاعب_مجهول_88",
          message: "🎉 مبروك! لقد فزت بـ 10,000 جوهرة مجانية! انقر على هذا الرابط السري واكتب كلمة سر حسابك فوراً لاستلامها!",
          clues: ["هدية خيالية مجانية", "طلب كلمة السر", "رابط خارجي غير رسمي"],
          dangerDesc: "الذئب كان يحاول سرقة حساب لعبتك المفضلة وطرودك منها!",
          correctDesc: "أحسنت! إدارة الألعاب لا تطلب كلمة سرك مطلقاً في رسائل خاصة.",
          img: "/assestes/img5_loup.png"
        },
        {
          id: 2,
          type: "بريد إلكتروني مفاجئ",
          sender: "توصيل-سريع-عاجل@موقع-مزيف.com",
          message: "📦 طرد مفاجئ ضخم بانتظارك! اكتب اسمك الكامل وعنوان منزلك ورقم هاتف والديك فوراً لتوصيله إليك اليوم!",
          clues: ["مرسل غريب", "طلب عنوان المنزل والأسرار", "طرد لم تطلبه أنت أصلاً"],
          dangerDesc: "المخترق كان يحاول معرفة عنوان منزلك ومعلومات عائلتك الحساسة!",
          correctDesc: "تصرف بطولي! لا تفصح عن عنوان بيتك لأي جهة غير موثوقة.",
          img: "/assestes/img9_piege.png"
        },
        {
          id: 3,
          type: "إنذار وهمي مخيف",
          sender: "إنذار_أمني_عاجل",
          message: "⚠️ تحذير خطير! سيتم حذف حسابك خلال دقيقتين فقط إن لم تنقر على هذا الرابط وتثبت هويتك!",
          clues: ["استعجال مصطنع (دقيقتان)", "أسلوب تخويف وتهديد", "رابط مشبوه"],
          dangerDesc: "القراصنة يزرعون الخوف لتنقر سريعاً قبل أن تفكر!",
          correctDesc: "رائع! عند مواجهة رسائل تخويف، احتفظ بهدوئك واطلب مساعدة والديك.",
          img: "/assestes/img5_loup.png"
        }
      ]
    }
  }[language];

  const currentScenario = t.scenarios[currentRound];

  const handleChoice = (isAccept: boolean) => {
    if (roundStatus !== "idle") return;

    if (isAccept) {
      // Wrong choice
      sounds.playFail();
      setRoundStatus("wrong");
    } else {
      // Correct choice
      sounds.playSuccess();
      setRoundStatus("correct");
      const updated = Array.from(new Set([...completedRounds, currentRound]));
      setCompletedRounds(updated);

      if (updated.length === t.scenarios.length) {
        setIsVictorious(true);
        completeLevel(2);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleNextRound = () => {
    sounds.playClick();
    setRoundStatus("idle");
    if (currentRound < t.scenarios.length - 1) {
      setCurrentRound(currentRound + 1);
    }
  };

  const handleRetryRound = () => {
    sounds.playClick();
    setRoundStatus("idle");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-7xl h-96 bg-purple-600/10 blur-3xl pointer-events-none rounded-full"></div>

      {/* Top Header */}
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

        <span className="text-xs font-black text-pink-400 uppercase tracking-widest px-3 py-1 bg-pink-950/60 border border-pink-800/60 rounded-full">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-pink-300/80 font-bold uppercase tracking-wider mt-2">
          {t.concept}
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Round Progress Tracker */}
      <div className="flex items-center gap-2 mb-8 z-10">
        {t.scenarios.map((sc, idx) => (
          <div
            key={idx}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
              idx === currentRound
                ? "bg-pink-500 text-white ring-4 ring-pink-500/30 scale-110"
                : completedRounds.includes(idx)
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-slate-500"
            }`}
          >
            {completedRounds.includes(idx) ? "✓" : idx + 1}
          </div>
        ))}
      </div>

      {/* Main Challenge Board */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left: The Suspicious Visual (Wolf or Trap Present) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative overflow-hidden min-h-[380px]">
          <div className="relative w-full h-72 flex items-center justify-center">
            <motion.img
              src={currentScenario.img}
              alt="Piège suspect"
              className="max-h-72 w-auto object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              animate={
                roundStatus === "correct"
                  ? { scale: [1, 0.9, 0], rotate: 720, opacity: 0 }
                  : roundStatus === "wrong"
                  ? { scale: 1.25, rotate: [-5, 5, -5, 0], filter: "drop-shadow(0 0 35px rgba(239,68,68,0.9))" }
                  : { y: [0, -10, 0] }
              }
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                scale: { type: "spring", bounce: 0.4 }
              }}
            />

            {roundStatus === "correct" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300">
                  <ShieldCheck className="w-14 h-14" />
                </div>
              </motion.div>
            )}
          </div>

          <div className="text-center mt-2">
            <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
              {currentScenario.type}
            </span>
          </div>
        </div>

        {/* Right: The Suspect Message & Choice Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Fake Message Card */}
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-xl relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                De : {currentScenario.sender}
              </span>
              <span>Reçu à l'instant</span>
            </div>

            <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed py-2">
              « {currentScenario.message} »
            </p>

            {/* Clues accordion / box */}
            <div className="mt-4 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                Indices suspects à repérer :
              </span>
              <div className="flex flex-wrap gap-2">
                {currentScenario.clues.map((clue, idx) => (
                  <span key={idx} className="text-xs bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                    ⚠️ {clue}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Choice Buttons */}
          {roundStatus === "idle" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {/* Bad choice */}
              <button
                onClick={() => handleChoice(true)}
                className="py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold text-base transition-all hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnAccept}</span>
              </button>

              {/* Good choice */}
              <button
                onClick={() => handleChoice(false)}
                className="py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-lg shadow-indigo-950/50 border-b-4 border-indigo-900 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnIgnore}</span>
              </button>
            </div>
          )}

          {/* Feedback Card after choice */}
          {roundStatus === "correct" && !isVictorious && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">{t.correctTitle}</h4>
                  <p className="text-xs text-emerald-200/90 mt-0.5">{currentScenario.correctDesc}</p>
                </div>
              </div>

              <button
                onClick={handleNextRound}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap cursor-pointer transition"
              >
                {t.btnNextRound}
              </button>
            </motion.div>
          )}

          {roundStatus === "wrong" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-rose-300">{t.wrongTitle}</h4>
                  <p className="text-xs text-rose-200/90 mt-0.5">{currentScenario.dangerDesc}</p>
                </div>
              </div>

              <button
                onClick={handleRetryRound}
                className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs sm:text-sm whitespace-nowrap cursor-pointer transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.btnRetryRound}</span>
              </button>
            </motion.div>
          )}

        </div>

      </div>

      {/* Global Victory Modal / Card */}
      <AnimatePresence>
        {isVictorious && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl mt-10 bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 p-6 sm:p-8 rounded-3xl border-2 border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center text-pink-300 mb-3">
              <ShieldCheck className="w-10 h-10 text-pink-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-pink-300">
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
                router.push("/lesson3");
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-black text-lg shadow-xl shadow-pink-950/50 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {t.btnNextMission}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}