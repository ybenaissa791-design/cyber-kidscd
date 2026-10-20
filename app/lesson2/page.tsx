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
  HelpCircle,
  Trophy,
  Check
} from "lucide-react";

export default function Lesson2() {
  const router = useRouter();
  const { language, completeLevel } = useGame();

  const [currentRound, setCurrentRound] = useState(0);
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [roundStatus, setRoundStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [isVictorious, setIsVictorious] = useState(false);
  const [activeClueIdx, setActiveClueIdx] = useState<number | null>(null);

  const isAr = language === "ar";

  const t = {
    fr: {
      missionTag: "Mission 02 / 07",
      title: "Le Piège du Loup Déguisé",
      concept: "Fondement : Démasquer le Phishing (Hameçonnage)",
      story: "Sur Internet, des pirates se déguisent en gentils amis pour t'offrir des cadeaux miracles... Mais c'est un piège pour voler ton mot de passe et tes trésors ! Analyse chaque message et sépare les pièges des vrais messages sûrs.",
      detectiveTip: "Indice du Détective : Si c'est trop beau pour être vrai, ou si on te presse de donner un mot de passe, c'est un piège !",
      btnTrap: "C'est un Piège ! Refuser 🛡️",
      btnSafe: "C'est Sûr & Officiel ✅",
      btnNextRound: "Examiner le message suivant ➡️",
      btnNextMission: "Passer à la Mission suivante (Le Pare-feu) 🚀",
      btnCert: "Obtenir le Certificat 🏆",
      btnReplayMission: "Rejouer la mission 🔄",
      btnRetryRound: "Réessayer l'analyse 🔄",
      backMap: "Retour à la Carte",
      correctTitle: "Bien vu Cyber-Héros ! Décision parfaite !",
      wrongTitle: "Attention ! Analyse incorrecte !",
      victoryTitle: "Bravo ! Tu es désormais immunisé contre le Phishing !",
      victoryText: "Tu as démasqué les ruses du loup et validé les messages sûrs. Tu as le réflexe d'or : vérifier, douter et ne jamais divulguer tes identifiants !",
      goldenRuleTitle: "La Règle d'Or :",
      goldenRuleText: "Personne ne donne de vrais cadeaux ou d'argent magique sur internet sans raison. Ne clique jamais sur des liens bizarres !",
      clueHint: "Touche les indices pour enquêter :",
      scenarios: [
        {
          id: 1,
          type: "Message dans un jeu vidéo",
          sender: "Joueur_Mystere_99",
          message: "🎉 Félicitations ! Tu as été tiré au sort pour gagner 10 000 pièces d'or gratuites ! Clique sur ce lien magique et tape vite ton mot de passe pour les recevoir !",
          clues: ["Cadeau gratuit suspect", "Demande de mot de passe", "Lien non officiel"],
          isTrap: true,
          dangerDesc: "Le faux joueur voulait voler ton compte de jeu vidéo !",
          correctDesc: "Exact ! Les vrais jeux ne demandent jamais ton mot de passe par message.",
          img: "/assestes/img5_loup.png"
        },
        {
          id: 2,
          type: "Message de l'École Officielle",
          sender: "Professeur_Martin@ecole-primaire.ma",
          message: "📚 Bonjour les élèves ! Voici la liste des lectures conseillées pour le cours de sciences de demain sur l'espace. Bonne journée à tous !",
          clues: ["Adresse email officielle vérifiée", "Aucun mot de passe demandé", "Contenu scolaire légitime"],
          isTrap: false,
          dangerDesc: "Ce message était en réalité officiel et sans danger ! Tu peux lui faire confiance.",
          correctDesc: "Parfait ! Ce message scolaire officiel ne demandait aucun secret et provient de ton enseignant.",
          img: "/assestes/img2_heros.png"
        },
        {
          id: 3,
          type: "Email surprise de livraison",
          sender: "service-urgent-livraison@faux-site.net",
          message: "📦 Un colis mystère géant t'attend ! Remplis vite ton nom complet, ton adresse de maison et le numéro de téléphone de tes parents pour le recevoir !",
          clues: ["Expéditeur inconnu", "Demande d'adresse personnelle", "Colis jamais commandé"],
          isTrap: true,
          dangerDesc: "Le pirate voulait obtenir l'adresse de ta maison et tes infos privées !",
          correctDesc: "Parfait ! Ne donne jamais l'adresse de ta maison ou tes infos sur un coup de tête.",
          img: "/assestes/img9_piege.png"
        },
        {
          id: 4,
          type: "Fausse alerte de panique",
          sender: "Alerte_Panique_Securite",
          message: "⚠️ ATTENTION ! Ton compte va être supprimé dans 2 minutes chrono ! Clique immédiatement ici pour prouver que tu es vivant !",
          clues: ["Urgence artificielle (2 minutes)", "Ton qui fait peur", "Lien piégé"],
          isTrap: true,
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
      story: "في عالم الإنترنت، يتنكر القراصنة والذئاب بملابس حملان لطيفة ليقدموا هدايا وهمية... والهدف الحقيقي هو سرقة كلمات سرك وبياناتك! حلل كل رسالة وافرز الفخاخ عن الرسائل الآمنة الحقيقية.",
      detectiveTip: "تلميح المحقق الذكي: إذا كان العرض خيالياً ومجانياً لدرجة يصعب تصديقها، أو إذا أجبروك على الإسراع، فهو فخ مؤكد!",
      btnTrap: "هذا فخ احتيالي! ارفضه 🛡️",
      btnSafe: "رسالة آمنة وموثوقة ✅",
      btnNextRound: "فحص الرسالة التالية ➡️",
      btnNextMission: "الانتقال للمهمة التالية (الجدار الناري) 🚀",
      btnCert: "الحصول على الشهادة 🏆",
      btnReplayMission: "إعادة اللعب من جديد 🔄",
      btnRetryRound: "إعادة فحص الرسالة 🔄",
      backMap: "العودة للخريطة",
      correctTitle: "ممتاز يا بطل! قرارك صائب 100%!",
      wrongTitle: "انتبه! لقد أخطأت في التحليل!",
      victoryTitle: "رائع جداً! أصبحت خبيراً في كشف التصيد!",
      victoryText: "لقد كشفت ألاعيب الذئب بذكاء، وتعلمت أعظم درس: التشكيك، الفحص، وعدم إعطاء أسرارك لأحد مطلقاً!",
      goldenRuleTitle: "القاعدة الذهبية:",
      goldenRuleText: "لا توجد هدايا مجانية خيالية توزع بلا سبب على الإنترنت. لا تنقر أبداً على روابط مجهولة دون استشارة والديك!",
      clueHint: "المس أدلة المحقق لتكبيرها وفحصها:",
      scenarios: [
        {
          id: 1,
          type: "رسالة داخل لعبة إلكترونية",
          sender: "لاعب_مجهول_88",
          message: "🎉 مبروك! لقد فزت بـ 10,000 جوهرة مجانية! انقر على هذا الرابط السري واكتب كلمة سر حسابك فوراً لاستلامها!",
          clues: ["هدية خيالية مجانية", "طلب كلمة السر", "رابط خارجي غير رسمي"],
          isTrap: true,
          dangerDesc: "الذئب كان يحاول سرقة حساب لعبتك المفضلة وطردك منها!",
          correctDesc: "أحسنت! إدارة الألعاب لا تطلب كلمة سرك مطلقاً في رسائل خاصة.",
          img: "/assestes/img5_loup.png"
        },
        {
          id: 2,
          type: "رسالة رسمية من مدرسة الرياضيات",
          sender: "الاستاذ_العلمي@مدرستي-الرسمية.ma",
          message: "📚 تحية طيبة يا أبطال! إليكم قائمة الواجبات المدرسية لمادة العلوم والفضاء ليوم غد. نتمنى لكم يوماً دراسياً ممتعاً!",
          clues: ["عنوان بريد مدرسي رسمي وموثق", "لا يطلب كلمة سر أو أسراراً", "محتوى تعليمي آمن تماماً"],
          isTrap: false,
          dangerDesc: "هذه الرسالة رسمية وآمنة تماماً من معلمك ولا تمثل أي خطر!",
          correctDesc: "قرار حكيم! الرسائل الرسمية من الأسرة أو المدرسة موثوقة ولا تطلب بيانات خاصة.",
          img: "/assestes/img2_heros.png"
        },
        {
          id: 3,
          type: "بريد إلكتروني مفاجئ لطرد مزعوم",
          sender: "توصيل-سريع-عاجل@موقع-مزيف.com",
          message: "📦 طرد مفاجئ ضخم بانتظارك! اكتب اسمك الكامل وعنوان منزلك ورقم هاتف والديك فوراً لتوصيله إليك اليوم!",
          clues: ["مرسل غريب مجهول", "طلب عنوان المنزل وأرقام الهواتف", "طرد لم تطلبه أنت أصلاً"],
          isTrap: true,
          dangerDesc: "المخترق كان يحاول معرفة عنوان منزلك ومعلومات عائلتك الحساسة!",
          correctDesc: "تصرف بطولي! لا تفصح عن عنوان بيتك لأي جهة غير موثوقة.",
          img: "/assestes/img9_piege.png"
        },
        {
          id: 4,
          type: "إنذار وهمي لتخويف المستخدم",
          sender: "إنذار_أمني_عاجل",
          message: "⚠️ تحذير خطير! سيتم حذف حسابك خلال دقيقتين فقط إن لم تنقر على هذا الرابط وتثبت هويتك!",
          clues: ["استعجال مصطنع (دقيقتان)", "أسلوب تخويف وتهديد", "رابط مشبوه"],
          isTrap: true,
          dangerDesc: "القراصنة يزرعون الخوف لتنقر سريعاً قبل أن تفكر!",
          correctDesc: "رائع! عند مواجهة رسائل تخويف، احتفظ بهدوئك واطلب مساعدة والديك.",
          img: "/assestes/img5_loup.png"
        }
      ]
    }
  }[language];

  const currentScenario = t.scenarios[currentRound];

  const handleChoice = (choseTrap: boolean) => {
    if (roundStatus !== "idle") return;

    const isCorrect = (choseTrap && currentScenario.isTrap) || (!choseTrap && !currentScenario.isTrap);

    if (isCorrect) {
      sounds.playSuccess();
      setRoundStatus("correct");
      const updated = Array.from(new Set([...completedRounds, currentRound]));
      setCompletedRounds(updated);

      if (updated.length === t.scenarios.length) {
        setTimeout(() => {
          setIsVictorious(true);
          completeLevel(2);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 500);
      }
    } else {
      sounds.playFail();
      setRoundStatus("wrong");
    }
  };

  const handleNextRound = () => {
    sounds.playClick();
    setRoundStatus("idle");
    setActiveClueIdx(null);
    if (currentRound < t.scenarios.length - 1) {
      setCurrentRound(currentRound + 1);
    }
  };

  const handleRetryRound = () => {
    sounds.playClick();
    setRoundStatus("idle");
  };

  const handleReplayAll = () => {
    sounds.playClick();
    setCurrentRound(0);
    setCompletedRounds([]);
    setRoundStatus("idle");
    setActiveClueIdx(null);
    setIsVictorious(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-3 sm:p-6 py-6 sm:py-10">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-7xl h-96 bg-purple-600/10 blur-3xl pointer-events-none rounded-full"></div>

      {/* Top Header */}
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

        <span className="text-xs font-black text-pink-400 uppercase tracking-widest px-3 py-1.5 bg-pink-950/70 border border-pink-800/60 rounded-full shadow-sm">
          {t.missionTag}
        </span>
      </div>

      {/* Mission Title Header */}
      <motion.div 
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center max-w-3xl mb-6 z-10 px-2"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-pink-300/80 font-bold uppercase tracking-wider mt-1.5">
          {t.concept}
        </p>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-3 leading-relaxed bg-slate-900/70 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
          {t.story}
        </p>
      </motion.div>

      {/* Round Progress Tracker */}
      <div className="flex items-center gap-2 mb-6 z-10">
        {t.scenarios.map((sc, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (roundStatus === "idle") {
                sounds.playPop();
                setCurrentRound(idx);
                setActiveClueIdx(null);
              }
            }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              idx === currentRound
                ? "bg-pink-500 text-white ring-4 ring-pink-500/30 scale-105"
                : completedRounds.includes(idx)
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 text-slate-400 border border-slate-800"
            }`}
          >
            {completedRounds.includes(idx) ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start z-10">
        
        {/* Left: The Visual Suspicious or Legitimate Character */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 relative overflow-hidden min-h-[220px] sm:min-h-[320px]">
          <div className="relative w-full h-48 sm:h-64 flex items-center justify-center">
            <motion.img
              key={currentScenario.id}
              src={currentScenario.img}
              alt="Personnage"
              className="max-h-48 sm:max-h-60 w-auto object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              animate={
                roundStatus === "correct"
                  ? { scale: currentScenario.isTrap ? 0 : 1.1, rotate: currentScenario.isTrap ? 720 : 0, opacity: currentScenario.isTrap ? 0 : 1 }
                  : roundStatus === "wrong"
                  ? { scale: 1.15, filter: "drop-shadow(0 0 35px rgba(239,68,68,0.9))" }
                  : { scale: 1, rotate: 0, opacity: 1, y: [0, -8, 0] }
              }
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                scale: { duration: 0.35, ease: "easeOut" }
              }}
            />

            {roundStatus === "correct" && currentScenario.isTrap && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300">
                  <ShieldCheck className="w-12 h-12" />
                </div>
              </motion.div>
            )}
          </div>

          <div className="text-center mt-2">
            <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
              {currentScenario.type}
            </span>
          </div>
        </div>

        {/* Right: The Suspect Message & Choice Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          
          {/* Message Card */}
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-xl relative">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-bold text-rose-400 flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{currentScenario.sender}</span>
              </span>
              <span className="text-[11px] shrink-0">Reçu à l'instant</span>
            </div>

            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-100 leading-relaxed py-1.5">
              « {currentScenario.message} »
            </p>

            {/* Clues accordion / box */}
            <div className="mt-3.5 bg-slate-950/80 p-3 sm:p-3.5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.clueHint}</span>
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {currentScenario.clues.map((clue, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sounds.playPop();
                      setActiveClueIdx(activeClueIdx === idx ? null : idx);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer text-start ${
                      activeClueIdx === idx 
                        ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold" 
                        : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    🔍 {clue}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Choice Buttons */}
          {roundStatus === "idle" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <button
                onClick={() => handleChoice(true)}
                className="min-h-[50px] py-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm sm:text-base shadow-lg shadow-rose-950/50 border-b-4 border-rose-900 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnTrap}</span>
              </button>

              <button
                onClick={() => handleChoice(false)}
                className="min-h-[50px] py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-950/50 border-b-4 border-emerald-900 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnSafe}</span>
              </button>
            </div>
          )}

          {/* Feedback Card after choice */}
          {roundStatus === "correct" && !isVictorious && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">{t.correctTitle}</h4>
                  <p className="text-xs text-emerald-200/90 mt-0.5">{currentScenario.correctDesc}</p>
                </div>
              </div>

              <button
                onClick={handleNextRound}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap cursor-pointer transition w-full sm:w-auto"
              >
                {t.btnNextRound}
              </button>
            </motion.div>
          )}

          {roundStatus === "wrong" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <XCircle className="w-7 h-7 text-rose-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-rose-300">{t.wrongTitle}</h4>
                  <p className="text-xs text-rose-200/90 mt-0.5">{currentScenario.dangerDesc}</p>
                </div>
              </div>

              <button
                onClick={handleRetryRound}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs sm:text-sm whitespace-nowrap cursor-pointer transition flex items-center justify-center gap-1.5 w-full sm:w-auto"
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
            className="w-full max-w-3xl mt-8 sm:mt-10 bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 p-6 sm:p-8 rounded-3xl border-2 border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] z-20 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center text-pink-300 mb-3">
              <ShieldCheck className="w-9 h-9 text-pink-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-pink-300">
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
                  router.push("/lesson3");
                }}
                className="min-h-[48px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-950/50 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnNextMission}</span>
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
                onClick={handleReplayAll}
                className="min-h-[48px] px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
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