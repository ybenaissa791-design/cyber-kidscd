"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  Shield, 
  Key, 
  Flame, 
  Lock, 
  Wrench, 
  Cloud, 
  Compass, 
  Trophy, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  RotateCcw
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { language, unlockedLevel, completedLevels, totalStars, resetProgress } = useGame();

  const isAr = language === "ar";

  const t = {
    fr: {
      badge: "🛡️ Académie Officielle pour Jeunes Cyber-Gardien(ne)s",
      title: "Le Château Numérique",
      subtitle: "Le royaume d'Internet est menacé par les virus et les pièges ! Deviens un Cyber-Héros légendaire, déjoue les attaques et protège tes trésors numériques.",
      btnStart: "Commencer l'Aventure 🚀",
      btnContinue: "Continuer la Mission",
      mapTitle: "La Carte des Missions du Royaume",
      mapSubtitle: "Complète chaque défi pour débloquer les secrets de la cybersécurité et remporter ton Diplôme Officiel !",
      levelLocked: "Mission verrouillée",
      levelCompleted: "Accomplie !",
      levelReady: "Prêt à jouer !",
      progressLabel: "Progression de l'Aventure",
      missionsDone: "Missions réussies",
      resetBtn: "Recommencer l'aventure",
      resetConfirm: "Es-tu sûr(e) de vouloir recommencer l'aventure à zéro ?",
      parentSectionTitle: "Pourquoi apprendre la cybersécurité dès le plus jeune âge ?",
      parentPillars: [
        {
          title: "Réflexes de Prévention",
          desc: "Savoir reconnaître un lien piège, un faux cadeau ou un téléchargement suspect avant de cliquer.",
        },
        {
          title: "Protection de la Vie Privée",
          desc: "Comprendre que les données personnelles (nom, école, adresse) sont de véritables trésors à ne pas divulguer.",
        },
        {
          title: "Confiance & Autonomie",
          desc: "Naviguer sur le web en toute sécurité avec des mots de passe robustes et les bons outils de défense.",
        },
      ],
      levels: [
        {
          id: 1,
          slug: "/lesson1",
          title: "La Clé Magique",
          concept: "Mots de Passe Forts",
          desc: "Forge un mot de passe invincible pour repousser le virus glouton !",
          img: "/assestes/img4_cle.png",
          color: "from-blue-600 to-cyan-500",
        },
        {
          id: 2,
          slug: "/lesson2",
          title: "Le Piège du Loup",
          concept: "Hameçonnage (Phishing)",
          desc: "Démasque le faux loup qui propose des cadeaux piégés !",
          img: "/assestes/img5_loup.png",
          color: "from-purple-600 to-pink-500",
        },
        {
          id: 3,
          slug: "/lesson3",
          title: "Le Mur de Flammes",
          concept: "Pare-feu & Antivirus",
          desc: "Élève le grand bouclier pour arrêter les insectes robots malveillants !",
          img: "/assestes/img6_parefeu (2).png",
          color: "from-orange-600 to-red-500",
        },
        {
          id: 4,
          slug: "/lesson4",
          title: "Le Coffre aux Trésors",
          concept: "Données Personnelles",
          desc: "Trie ce qui doit rester secret et ce qui peut être partagé sans danger.",
          img: "/assestes/img7_tresor.png",
          color: "from-amber-600 to-yellow-500",
        },
        {
          id: 5,
          slug: "/lesson5",
          title: "Le Robot Forgeron",
          concept: "Mises à Jour de Sécurité",
          desc: "Répare les fissures de l'armure avec des patchs magiques avant qu'il ne soit trop tard !",
          img: "/assestes/img8_maj.png",
          color: "from-emerald-600 to-teal-500",
        },
        {
          id: 6,
          slug: "/lesson6",
          title: "La Sauvegarde Céleste",
          concept: "Sauvegardes & Backups",
          desc: "Mets tes photos et jeux à l'abri dans le coffre-fort des nuages.",
          img: "/assestes/img7_sauvegarde.png",
          color: "from-indigo-600 to-blue-500",
        },
        {
          id: 7,
          slug: "/lesson7",
          title: "Le Tunnel Mystique",
          concept: "Navigation Sécurisée & Wi-Fi",
          desc: "Active le chiffrement secret pour voyager sans être espionné.",
          img: "/assestes/img8_tunnel.png",
          color: "from-cyan-600 to-indigo-600",
        },
        {
          id: 8,
          slug: "/victory",
          title: "Le Sommet des Champions",
          concept: "Grand Diplôme & Trophée",
          desc: "Reçois ta médaille d'or officielle de l'Académie RED PHOENIX !",
          img: "/assestes/mg10_trophee.png",
          color: "from-yellow-500 via-amber-500 to-rose-500",
        },
      ],
    },
    ar: {
      badge: "🛡️ الأكاديمية الرسمية لحماة الفضاء الرقمي الصغار",
      title: "القلعة الرقمية",
      subtitle: "مملكة الإنترنت مهددة بالفيروسات والخدع الماكرة! كن بطلاً سيبرانياً شجاعاً، أحبط الهجمات وتعلّم حماية كنوزك الرقمية بذكاء ومرح.",
      btnStart: "ابدأ المغامرة الآن 🚀",
      btnContinue: "واصل المهمة",
      mapTitle: "خريطة مهمات المملكة الرقمية",
      mapSubtitle: "أكمل كل تحدٍ تفاعلي لتكتشف أسرار الأمان الرقمي وتحصل على وسام وشهادة البطل الرسمي!",
      levelLocked: "مهمة مغلقة",
      levelCompleted: "مكتملة بنجاح!",
      levelReady: "جاهزة للبدء!",
      progressLabel: "تقدم المغامرة",
      missionsDone: "مهمات منجزة",
      resetBtn: "إعادة تعيين المغامرة",
      resetConfirm: "هل أنت متأكد من رغبتك في إعادة المغامرة من البداية؟",
      parentSectionTitle: "لماذا نعلم الأطفال الأمن السيبراني مبكراً؟",
      parentPillars: [
        {
          title: "سرعة البديهة والوقاية",
          desc: "القدرة الفورية على تمييز الروابط المشبوهة، الهدايا الخادعة، والتنزيلات الملغومة قبل النقر عليها.",
        },
        {
          title: "حماية الخصوصية والأسرار",
          desc: "إدراك أن البيانات الشخصية (الاسم الكامل، المدرسة، المنزل) كنوز غالية يجب عدم منحها للغرباء.",
        },
        {
          title: "الثقة والاستقلالية الإيجابية",
          desc: "الإبحار في عالم الإنترنت بثقة وبكلمات مرور منيعة تحمي الأجهزة والحسابات المدرسية والترفيهية.",
        },
      ],
      levels: [
        {
          id: 1,
          slug: "/lesson1",
          title: "المفتاح السحري",
          concept: "كلمات السر القوية",
          desc: "اصنع كلمة مرور لا تقهر واطرد الفيروس الشره بعيداً!",
          img: "/assestes/img4_cle.png",
          color: "from-blue-600 to-cyan-500",
        },
        {
          id: 2,
          slug: "/lesson2",
          title: "فخ الذئب الماكر",
          concept: "التصيد الاحتيالي (Phishing)",
          desc: "اكشف قناع الذئب المتنكر بهدية مفخخة لسرقة حسابك!",
          img: "/assestes/img5_loup.png",
          color: "from-purple-600 to-pink-500",
        },
        {
          id: 3,
          slug: "/lesson3",
          title: "جدار اللهب الحارس",
          concept: "الجدار الناري ومكافح الفيروسات",
          desc: "فعل الدرع الناري لصد هجمات الحشرات الرقمية الضارة!",
          img: "/assestes/img6_parefeu (2).png",
          color: "from-orange-600 to-red-500",
        },
        {
          id: 4,
          slug: "/lesson4",
          title: "صندوق الأسرار والكنوز",
          concept: "حماية البيانات الشخصية",
          desc: "فرّق بين ما يجب كتمانه وما يمكن مشاركته بأمان.",
          img: "/assestes/img7_tresor.png",
          color: "from-amber-600 to-yellow-500",
        },
        {
          id: 5,
          slug: "/lesson5",
          title: "الروبوت الحداد الماهر",
          concept: "تحديثات الأمان وسد الثغرات",
          desc: "أصلح شقوق درع القلعة بالمطرقة السحرية قبل تسلل الأشرار!",
          img: "/assestes/img8_maj.png",
          color: "from-emerald-600 to-teal-500",
        },
        {
          id: 6,
          slug: "/lesson6",
          title: "الخزنة السحابية الطائرة",
          concept: "النسخ الاحتياطي (Backup)",
          desc: "احفظ ذكرياتك وألعابك في أمان تام داخل الغيوم السحرية.",
          img: "/assestes/img7_sauvegarde.png",
          color: "from-indigo-600 to-blue-500",
        },
        {
          id: 7,
          slug: "/lesson7",
          title: "النفق الرقمي المشفر",
          concept: "الإنترنت الآمن وشبكات الواي فاي",
          desc: "سافر عبر نفق سري مشفر لا يستطيع المتلصصون اختراقه.",
          img: "/assestes/img8_tunnel.png",
          color: "from-cyan-600 to-indigo-600",
        },
        {
          id: 8,
          slug: "/victory",
          title: "قمة الأبطال والكأس الذهبي",
          concept: "الوسام والشهادة الرسمية",
          desc: "استلم وسام التخرج الرسمي من نادي وأكاديمية RED PHOENIX!",
          img: "/assestes/mg10_trophee.png",
          color: "from-yellow-500 via-amber-500 to-rose-500",
        },
      ],
    },
  }[language];

  const handleStartAdventure = () => {
    sounds.playClick();
    const nextTarget = unlockedLevel <= 7 ? `/lesson${unlockedLevel}` : "/victory";
    router.push(nextTarget);
  };

  const handleReset = () => {
    if (confirm(t.resetConfirm)) {
      sounds.playClick();
      resetProgress();
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-start overflow-hidden relative">
      
      {/* HERO SECTION */}
      <section className="w-full relative py-12 md:py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 border-b border-rose-500/20">
        
        {/* Ambient neon orbs */}
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold mb-6 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{t.badge}</span>
        </motion.div>

        {/* Big Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] tracking-tight max-w-4xl"
        >
          {t.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-xl md:text-2xl text-center max-w-3xl mt-5 text-slate-300 leading-relaxed px-4"
        >
          {t.subtitle}
        </motion.p>

        {/* Visual Hero Showcase: Castle + Cyber Kid Hero */}
        <div className="relative w-full max-w-5xl flex flex-col md:flex-row justify-center items-center mt-10 md:mt-14 gap-8">
          
          {/* Cyber Castle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl overflow-hidden border-4 border-indigo-500/40 shadow-[0_0_50px_rgba(79,70,229,0.4)]"
          >
            <img
              src="/assestes/img1_chateau.png"
              alt="Château Fort Numérique"
              className="w-full max-w-[420px] md:max-w-[500px] h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-sm font-bold text-indigo-200 bg-indigo-950/80 px-3 py-1.5 rounded-lg border border-indigo-500/40">
                🏰 Forteresse RED PHOENIX
              </span>
            </div>
          </motion.div>

          {/* Floating Cyber Hero */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, y: [0, -12, 0] }}
            transition={{
              x: { duration: 0.8 },
              y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.08 }}
            className="md:relative -mt-10 md:mt-0 flex flex-col items-center cursor-pointer"
            onClick={() => sounds.playShield()}
          >
            <div className="relative">
              <img
                src="/assestes/img2_heros.png"
                alt="Cyber Héros"
                className="w-52 sm:w-64 md:w-80 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter drop-shadow(0 0 25px rgba(56,189,248,0.5))"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-200 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                🛡️ Prêt pour la mission !
              </div>
            </div>
          </motion.div>
        </div>

        {/* Big Action Call Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 z-10"
        >
          <button
            onClick={handleStartAdventure}
            className="group px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 text-white font-black text-xl sm:text-2xl shadow-[0_10px_35px_rgba(225,29,72,0.5)] border-b-4 border-rose-800 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
            <span>
              {completedLevels.length > 0 ? `${t.btnContinue} ${unlockedLevel}` : t.btnStart}
            </span>
          </button>
        </motion.div>

        {/* Adventure Progress Bar */}
        <div className="w-full max-w-xl mt-10 px-4">
          <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-300 mb-2">
            <span>{t.progressLabel}</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" />
              {completedLevels.length} / 7 {t.missionsDone}
            </span>
          </div>
          <div className="w-full h-4 bg-slate-900 rounded-full border border-slate-800 overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(completedLevels.length / 7) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

      </section>

      {/* ADVENTURE WORLD MAP */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white flex items-center justify-center gap-3">
            <Compass className="w-8 h-8 text-rose-500" />
            <span>{t.mapTitle}</span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto mt-3">
            {t.mapSubtitle}
          </p>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.levels.map((lvl) => {
            const isCompleted = completedLevels.includes(lvl.id);
            const isUnlocked = lvl.id <= unlockedLevel;
            const isNext = lvl.id === unlockedLevel;

            return (
              <motion.div
                key={lvl.id}
                whileHover={isUnlocked ? { y: -8, scale: 1.02 } : {}}
                className={`relative rounded-3xl p-5 flex flex-col justify-between border transition-all overflow-hidden ${
                  isCompleted
                    ? "bg-slate-900/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    : isNext
                    ? "bg-slate-900 border-rose-500/60 shadow-[0_0_30px_rgba(225,29,72,0.3)] ring-2 ring-rose-500/40"
                    : isUnlocked
                    ? "bg-slate-900/80 border-slate-800"
                    : "bg-slate-950/60 border-slate-900 opacity-60 grayscale-[70%]"
                }`}
              >
                {/* Level number badge */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isCompleted 
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : isNext
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {lvl.id === 8 ? "🏆 Finale" : `Mission ${lvl.id}`}
                  </span>

                  <div className="flex items-center gap-1">
                    {isCompleted ? (
                      <span className="flex items-center text-emerald-400 text-xs font-bold gap-1">
                        <CheckCircle className="w-4 h-4 fill-emerald-500/20" />
                        {t.levelCompleted}
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-amber-400 text-xs font-bold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        {t.levelLocked}
                      </span>
                    )}
                  </div>
                </div>

                {/* Level Image */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-950 mb-4 flex items-center justify-center p-2 group">
                  <img
                    src={lvl.img}
                    alt={lvl.title}
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
                      isUnlocked ? "group-hover:scale-105" : ""
                    }`}
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                        <Lock className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Level Title & Details */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {lvl.title}
                    </h3>
                    <p className="text-xs font-semibold text-rose-400 mb-2">
                      {lvl.concept}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {lvl.desc}
                    </p>
                  </div>

                  {/* Play Button */}
                  <button
                    disabled={!isUnlocked}
                    onClick={() => {
                      sounds.playClick();
                      router.push(lvl.slug);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      !isUnlocked
                        ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                        : isCompleted
                        ? "bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40"
                        : "bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white shadow-md shadow-rose-900/30"
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Rejouer la mission</span>
                      </>
                    ) : isUnlocked ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{t.levelReady}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t.levelLocked}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reset progress button */}
        {completedLevels.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1.5 transition underline decoration-dotted"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetBtn}</span>
            </button>
          </div>
        )}
      </section>

      {/* PARENTS & EDUCATORS SECTION */}
      <section className="w-full bg-slate-900/50 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              Parents & Éducateurs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              {t.parentSectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.parentPillars.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 font-black">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}