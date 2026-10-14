"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useGame } from "@/context/GameContext";
import { sounds } from "@/lib/audio";
import { 
  Trophy, 
  Award, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Star,
  Lock,
  Key,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";

export default function Victory() {
  const router = useRouter();
  const { 
    language, 
    playerName, 
    setPlayerName, 
    completedLevels, 
    totalStars,
    adminUnlocked,
    unlockAdmin,
    resetProgress 
  } = useGame();

  const [localName, setLocalName] = useState(playerName || "");
  const [adminCodeInput, setAdminCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAr = language === "ar";

  useEffect(() => {
    sounds.playFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
    setPlayerName(e.target.value);
  };

  const handlePrint = () => {
    sounds.playClick();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleVerifyAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminCodeInput.trim()) return;

    const success = unlockAdmin(adminCodeInput);
    if (success) {
      setCodeError(false);
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.4 },
      });
    } else {
      setCodeError(true);
    }
  };

  const handleReplayGame = () => {
    sounds.playClick();
    resetProgress();
    router.push("/lesson1");
  };

  const t = {
    fr: {
      congrats: "FÉLICITATIONS GRAND CYBER-HÉROS !",
      subtitle: "Tu as bravé tous les pièges du monde numérique et complété avec succès les missions sous l'égide du Club des Élèves-Ingénieurs en Cybersécurité de l'ENSA Oujda !",
      adminGateTitle: "Espace Administration — Délivrance du Certificat",
      adminGateSubtitle: "Certificat d'Appréciation officiel du Club des Élèves-Ingénieurs en Cybersécurité • ENSA Oujda",
      adminGateDesc: "La remise et l'impression de ce certificat officiel sont réservées exclusivement à l'administration et aux encadrants du Club RED PHOENIX. Veuillez saisir le code d'authentification pour débloquer le certificat :",
      codePlaceholder: "Saisir le code d'administration...",
      btnUnlock: "Valider & Débloquer le Certificat 🔓",
      codeErrorMsg: "Code d'accès incorrect ! L'attribution des certificats d'appréciation est strictement réservée à l'administration du Club.",
      enterNameLabel: "Inscris le prénom et nom pour personnaliser le Certificat d'Appréciation :",
      namePlaceholder: "Prénom & Nom du Lauréat (ex: Rayan Alami...)",
      certHeader: "CLUB DES ÉLÈVES-INGÉNIEURS EN CYBERSÉCURITÉ • ENSA OUJDA",
      certSubHeader: "École Nationale des Sciences Appliquées d'Oujda • Université Mohammed Premier",
      certTitle: "CERTIFICAT D'APPRÉCIATION",
      certAwardedTo: "Ce certificat d'appréciation et d'honneur est décerné à :",
      defaultName: "LE VAILLANT CYBER-HÉROS",
      certBody: "En reconnaissance de sa brillante réussite aux modules d'initiation et de perfectionnement à la sécurité numérique, et pour avoir maîtrisé les fondamentaux : mots de passe robustes, détection du phishing, pare-feu, protection des données personnelles, mises à jour, sauvegardes et navigation chiffrée, sous la supervision des élèves-ingénieurs en cybersécurité de l'ENSA Oujda.",
      skillsTitle: "Compétences d'Élite Validées :",
      skills: [
        "Mots de Passe Blindés",
        "Détection du Phishing",
        "Pare-feu & Antivirus",
        "Protection de la Vie Privée",
        "Mises à Jour Systèmes",
        "Sauvegardes dans le Cloud",
        "Navigation Sécurisée HTTPS",
      ],
      sealText: "SCEAU OFFICIEL",
      academyPledge: "RED PHOENIX • ENSA OUJDA • 2026",
      signatureTitle: "Bureau du Club des Élèves-Ingénieurs en Cybersécurité",
      signatureSub: "ENSA Oujda • Université Mohammed Premier",
      btnPrint: "Imprimer & Télécharger le Certificat 🖨️",
      btnReplayGame: "Rejouer depuis le début 🔄",
      btnBackHome: "Retourner à l'Accueil 🏰",
      adminBadge: "Zone Réservée à l'Administration du Club",
      adminUnlockedBadge: "Accès Administrateur Déverrouillé ✅",
    },
    ar: {
      congrats: "مبارك يا بطل السايبر العظيم!",
      subtitle: "لقد اجتزت جميع فخاخ الإنترنت وأتممت التدريب بنجاح باهر تحت إشراف وتأطير نادي طلبة سلك المهندسين في تخصص الأمن السيبراني بـ ENSA وجدة!",
      adminGateTitle: "بوابة الإدارة — تسليم الشهادة التقديرية",
      adminGateSubtitle: "شهادة تقديرية معتمدة من نادي طلبة سلك المهندسين في الأمن السيبراني • ENSA وجدة",
      adminGateDesc: "يقتصر اعتماد وطباعة هذه الشهادة التقديرية الرسمية حصرياً على مؤطري وإدارة نادي RED PHOENIX. يرجى إدخال الرمز السري للإدارة لفتح واعتماد الشهادة:",
      codePlaceholder: "أدخل الرمز الإداري السري...",
      btnUnlock: "تحقق واعتماد الشهادة التقديرية 🔓",
      codeErrorMsg: "رمز المرور غير صحيح! إصدار الشهادات التقديرية مقتصر حصراً على إدارة نادي طلبة سلك المهندسين في الأمن السيبراني.",
      enterNameLabel: "اكتب الاسم الكامل لتتويج الشهادة التقديرية الرسمية:",
      namePlaceholder: "اسم المستفيد (مثال: ريان العلمي، سلمى بناني...)",
      certHeader: "نادي طلبة سلك المهندسين في تخصص الأمن السيبراني • ENSA وجدة",
      certSubHeader: "المدرسة الوطنية للعلوم التطبيقية بوجدة • جامعة محمد الأول",
      certTitle: "شــهــادة تــقــديــريــة",
      certAwardedTo: "تُمنح هذه الشهادة التقديرية بمرتبة الشرف والاعتزاز إلى:",
      defaultName: "البطل الرقمي الشجاع",
      certBody: "تقديراً لنجاحه وتفوقه الباهر في اجتياز دورة التوعية بأساسيات الأمن السيبراني، وإتقانه مهارات: صناعة كلمات المرور المنيعة، كشف التصيد والاحتيال، الجدار الناري ومكافح الفيروسات، حماية البيانات والخصوصية، تحديثات الأمان، النسخ الاحتياطي، والتصفح الآمن والمشفر، بإشراف وتأطير طلبة سلك المهندسين في تخصص الأمن السيبراني بـ ENSA وجدة.",
      skillsTitle: "المهارات المجتازة والمعتمدة بنجاح:",
      skills: [
        "كلمات المرور المنيعة",
        "كشف التصيد والاحتيال",
        "الجدار الناري ومكافح الفيروسات",
        "حماية الخصوصية والأسرار",
        "تحديثات الأمان وسد الثغرات",
        "النسخ الاحتياطي السحابي",
        "التشفير وقفل HTTPS",
      ],
      sealText: "الختم الرسمي المعتمد",
      academyPledge: "نادي RED PHOENIX • ENSA وجدة • 2026",
      signatureTitle: "مكتب نادي طلبة سلك المهندسين في الأمن السيبراني",
      signatureSub: "ENSA وجدة • جامعة محمد الأول",
      btnPrint: "طباعة وتحميل الشهادة التقديرية 🖨️",
      btnReplayGame: "إعادة اللعب من جديد 🔄",
      btnBackHome: "العودة للرئيسية 🏰",
      adminBadge: "منطقة خاصة بإدارة النادي والمؤطرين",
      adminUnlockedBadge: "تم التحقق الإداري بنجاح • الشهادة معتمدة ومفتوحة ✅",
    },
  }[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full"></div>

      {/* Header Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold mb-4 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>{adminUnlocked ? t.adminUnlockedBadge : t.adminBadge}</span>
      </div>

      {/* Hero Congratulations */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mb-8 z-10"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-rose-500">
          {t.congrats}
        </h1>
        <p className="text-sm sm:text-lg text-slate-300 mt-3 leading-relaxed">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Interactive Trophy & Hero Showcase */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 z-10 print:hidden">
        <motion.img
          src="/assestes/mg10_trophee.png"
          alt="Trophée d'or"
          className="w-44 sm:w-56 object-contain drop-shadow-[0_10px_35px_rgba(245,158,11,0.6)]"
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <motion.img
          src="/assestes/img2_heros.png"
          alt="Cyber Héros"
          className="w-36 sm:w-48 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* ADMIN CODE GATE (Shown when !adminUnlocked) */}
      {!adminUnlocked ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] z-10 mb-8"
        >
          <div className="flex items-center gap-3 mb-4 text-amber-400">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-amber-300">
                {t.adminGateTitle}
              </h2>
              <p className="text-xs text-amber-400/80 font-medium">
                {t.adminGateSubtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {t.adminGateDesc}
          </p>

          <form onSubmit={handleVerifyAdmin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={adminCodeInput}
                onChange={(e) => {
                  setAdminCodeInput(e.target.value);
                  setCodeError(false);
                }}
                placeholder={t.codePlaceholder}
                className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950 border font-mono text-base font-bold text-white focus:outline-none transition ${
                  codeError 
                    ? "border-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                    : "border-slate-700 focus:border-amber-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 end-3 text-slate-400 hover:text-white p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {codeError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-rose-950/80 border border-rose-500/60 rounded-xl text-xs sm:text-sm text-rose-300 flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{t.codeErrorMsg}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-950/50 hover:scale-[1.02] active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-5 h-5 text-slate-950" />
              <span>{t.btnUnlock}</span>
            </button>
          </form>

          {/* Action buttons inside the gate for normal players */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-slate-800">
            <button
              onClick={handleReplayGame}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.btnReplayGame}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                router.push("/");
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-sm border border-slate-800 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.btnBackHome}</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* OFFICIAL CERTIFICATE (Shown when adminUnlocked is true) */
        <>
          {/* Name Input Bar */}
          <div className="w-full max-w-xl bg-slate-900/90 border border-amber-500/40 p-4 sm:p-6 rounded-3xl shadow-xl mb-10 z-10 print:hidden">
            <label className="text-xs sm:text-sm font-bold text-amber-300 block mb-2">
              {t.enterNameLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={localName}
                onChange={handleNameChange}
                placeholder={t.namePlaceholder}
                className="flex-grow px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-base focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          {/* OFFICIAL PRINTABLE CERTIFICATE */}
          <div className="w-full max-w-4xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 sm:p-12 rounded-3xl border-4 border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.3)] relative overflow-hidden z-10 print:bg-white print:text-black print:border-black print:shadow-none print:m-0 print:p-8">
            
            {/* Subtle decorative watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <img src="/assestes/logo.jpeg" alt="watermark" className="w-96 h-96 object-contain" />
            </div>

            {/* Certificate Border accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400"></div>

            {/* Certificate Header with Logo */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-500/30 text-center sm:text-start">
              <div className="flex items-center gap-4">
                <img 
                  src="/assestes/logo.jpeg" 
                  alt="RED PHOENIX Seal" 
                  className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-md object-cover shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-amber-400 tracking-wider">
                    {t.certHeader}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.certSubHeader}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>شهادة تقديرية معتمدة • 2026</span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center py-8">
              <span className="text-xs uppercase font-extrabold text-rose-400 tracking-widest block mb-2">
                ACADÉMIE DE CYBERSÉCURITÉ RED PHOENIX
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 print:text-amber-800 tracking-wide">
                {t.certTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-6 font-medium">
                {t.certAwardedTo}
              </p>

              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white mt-3 pb-2 inline-block border-b-2 border-amber-400 px-8 tracking-wide font-serif print:text-black">
                {localName.trim() ? localName.trim().toUpperCase() : t.defaultName}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed">
                {t.certBody}
              </p>
            </div>

            {/* 7 Validated Badges Grid */}
            <div className="pt-4 pb-8 border-t border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider text-center mb-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.skillsTitle}</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {t.skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Footer / Signature & Stamp */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
              
              {/* Official Golden Stamp */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-amber-400 flex flex-col items-center justify-center text-amber-400 p-1 text-center bg-amber-500/10 shadow-inner">
                  <span className="text-[9px] font-black uppercase leading-tight">{t.sealText}</span>
                  <span className="text-xs font-black">2026</span>
                  <span className="text-[8px] font-bold">VERIFIED</span>
                </div>
                <div className="text-start">
                  <span className="text-xs font-bold text-white block">ختم النادي الرسمي</span>
                  <span className="text-[11px] text-slate-400 font-mono">ENSAO-CYBER-2026-VAL</span>
                </div>
              </div>

              {/* Signature */}
              <div className="text-center sm:text-end">
                <div className="font-serif italic text-lg sm:text-xl text-amber-300 font-bold mb-1">
                  Red Phoenix Executive Board
                </div>
                <span className="text-xs font-bold text-white block">
                  {t.signatureTitle}
                </span>
                <span className="text-[11px] text-slate-400">
                  {t.signatureSub}
                </span>
              </div>

            </div>

          </div>

          {/* Action Buttons: Print, Replay, Home */}
          <div className="flex flex-wrap gap-4 mt-8 z-10 print:hidden justify-center">
            <button
              onClick={handlePrint}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-950/50 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-5 h-5 text-slate-950" />
              <span>{t.btnPrint}</span>
            </button>

            <button
              onClick={handleReplayGame}
              className="px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border border-slate-700 transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.btnReplayGame}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                router.push("/");
              }}
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.btnBackHome}</span>
            </button>
          </div>
        </>
      )}

    </main>
  );
}
