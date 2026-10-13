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
  Share2, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Star
} from "lucide-react";

export default function Victory() {
  const router = useRouter();
  const { language, playerName, setPlayerName, completedLevels, totalStars } = useGame();
  const [localName, setLocalName] = useState(playerName || "");

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

  const t = {
    fr: {
      congrats: "FÉLICITATIONS GRAND CYBER-HÉROS !",
      subtitle: "Tu as bravé tous les pièges du monde numérique et complété l'entraînement officiel de l'Académie RED PHOENIX !",
      enterNameLabel: "Inscris ton prénom pour personnaliser ton diplôme :",
      namePlaceholder: "Ton prénom de Cyber-Héros (ex: Rayan, Sofia...)",
      certHeader: "CLUB DE CYBERSÉCURITÉ RED PHOENIX • ENSA OUJDA",
      certTitle: "DIPLÔME OFFICIEL DU CYBER-GARDIEN",
      certAwardedTo: "Ce certificat d'excellence est décerné avec les honneurs à :",
      defaultName: "LE VAILLANT CYBER-HÉROS",
      certBody: "Pour avoir brillamment déjoué les virus, repoussé le phishing, maîtrisé les mots de passe blindés, sauvegardé ses souvenirs et sécurisé ses données privées sous l'égide des élèves-ingénieurs de l'ENSA Oujda.",
      skillsTitle: "Compétences Maîtrisées & Validées :",
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
      signatureTitle: "Bureau du Club RED PHOENIX",
      signatureSub: "ENSA Oujda • Université Mohammed Premier",
      btnPrint: "Imprimer mon Diplôme 🖨️",
      btnBackHome: "Retourner à l'Accueil 🏰",
      goldenRulesSum: "Rappel des 7 Lois d'Or pour toute ta vie en ligne :",
    },
    ar: {
      congrats: "مبارك يا بطل السايبر العظيم!",
      subtitle: "لقد اجتزت جميع فخاخ الإنترنت وأتممت تدريب النخبة بنجاح تحت إشراف مهندسي نادي RED PHOENIX للأمن السيبراني بـ ENSA وجدة!",
      enterNameLabel: "اكتب اسمك لتتويج شهادتك الرسمية المعتمدة:",
      namePlaceholder: "اسمك الكريم يا بطل (مثال: ريان، سلمى...)",
      certHeader: "نادي الأمن السيبراني RED PHOENIX • المدرسة الوطنية للعلوم التطبيقية بوجدة",
      certTitle: "شهادة بطل الحماية الرقمية المعتمدة",
      certAwardedTo: "تُمنح هذه الشهادة المرموقة بمرتبة الشرف إلى البطل:",
      defaultName: "البطل الرقمي الشجاع",
      certBody: "تقديراً لنجاحه الباهر في قهر الفيروسات، كشف حيل التصيد، صناعة كلمات المرور المنيعة، حماية أسرار الخصوصية وتأمين بياناته الشخصية بوعي وشجاعة.",
      skillsTitle: "المهارات المجتازة بنجاح معتمد:",
      skills: [
        "كلمات المرور المنيعة",
        "كشف التصيد والاحتيال",
        "الجدار الناري ومكافح الفيروسات",
        "حماية الخصوصية والأسرار",
        "تحديثات الأمان وسد الثغرات",
        "النسخ الاحتياطي في السحابة",
        "التشفير وقفل HTTPS",
      ],
      sealText: "الختم الرسمي المعتمد",
      academyPledge: "نادي RED PHOENIX • ENSA وجدة • 2026",
      signatureTitle: "مكتب نادي RED PHOENIX",
      signatureSub: "ENSA وجدة • جامعة محمد الأول",
      btnPrint: "طباعة وتحميل الشهادة 🖨️",
      btnBackHome: "العودة للرئيسية 🏰",
      goldenRulesSum: "تذكير بقوانين البطل الذهبية لحياتك الرقمية:",
    },
  }[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white relative font-sans flex flex-col items-center justify-start p-4 py-8 sm:py-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full"></div>

      {/* Header Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold mb-4 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        <span>Académie Officielle RED PHOENIX</span>
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 z-10">
        <motion.img
          src="/assestes/mg10_trophee.png"
          alt="Trophée d'or"
          className="w-48 sm:w-60 object-contain drop-shadow-[0_10px_35px_rgba(245,158,11,0.6)]"
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <motion.img
          src="/assestes/img2_heros.png"
          alt="Cyber Héros"
          className="w-40 sm:w-52 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Name Input Bar */}
      <div className="w-full max-w-xl bg-slate-900/90 border border-amber-500/40 p-4 sm:p-6 rounded-3xl shadow-xl mb-10 z-10">
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
              className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-md object-cover"
            />
            <div>
              <h3 className="text-base sm:text-lg font-black text-amber-400 tracking-wider">
                {t.certHeader}
              </h3>
              <p className="text-xs text-slate-400">
                Official Cyber Security Youth Certification Program
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>Niveau : Maître Cyber-Gardien</span>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center py-8">
          <span className="text-xs uppercase font-extrabold text-rose-400 tracking-widest block mb-1">
            Certificat d'Excellence Numérique
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 print:text-amber-800">
            {t.certTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-6">
            {t.certAwardedTo}
          </p>

          <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white mt-2 pb-2 inline-block border-b-2 border-amber-400 px-6 tracking-wide font-serif print:text-black">
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
              <span className="text-xs font-bold text-white block">Sceau de l'Académie</span>
              <span className="text-[11px] text-slate-400 font-mono">ID: RP-CYBER-2026-OK</span>
            </div>
          </div>

          {/* Signature */}
          <div className="text-center sm:text-end">
            <div className="font-serif italic text-lg sm:text-xl text-amber-300 font-bold mb-1">
              Red Phoenix Council
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

      {/* Action Buttons: Print, Share, Home */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 z-10 print:hidden">
        <button
          onClick={handlePrint}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-950/50 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="w-5 h-5 text-slate-950" />
          <span>{t.btnPrint}</span>
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

    </main>
  );
}
