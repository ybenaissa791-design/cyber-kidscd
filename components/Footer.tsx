"use client";

import React from "react";
import Link from "next/link";
import { useGame } from "@/context/GameContext";
import { ShieldCheck, Heart, Sparkles, MessageCircle, Send, CheckCircle2, Award, ExternalLink, Lock, HelpCircle } from "lucide-react";
import { sounds } from "@/lib/audio";

export default function Footer() {
  const { language } = useGame();

  const isAr = language === "ar";

  const content = {
    fr: {
      brandTitle: "RED PHOENIX",
      brandSub: "Club des Élèves-Ingénieurs en Cybersécurité • ENSA Oujda",
      brandDesc: "Le Club officiel des Élèves-Ingénieurs en Cybersécurité de l'École Nationale des Sciences Appliquées d'Oujda (ENSAO - Université Mohammed Premier). Nous formons les futurs ingénieurs en sécurité informatique, réalisons des projets technologiques avancés et menons des campagnes de sensibilisation pour la société.",
      engineered: "Conçu et développé par les élèves-ingénieurs en cybersécurité de l'ENSA Oujda",
      missionTitle: "Missions du Cyber-Jeu",
      missions: [
        { label: "1. Mots de passe blindés", href: "/lesson1" },
        { label: "2. Détecter l'Hameçonnage (Phishing)", href: "/lesson2" },
        { label: "3. Le Pare-feu & Antivirus", href: "/lesson3" },
        { label: "4. Données Personnelles & Trésors", href: "/lesson4" },
        { label: "5. Mises à Jour & Correctifs", href: "/lesson5" },
        { label: "6. Sauvegardes & Cloud", href: "/lesson6" },
        { label: "7. Le Tunnel Sécurisé (HTTPS / Wi-Fi)", href: "/lesson7" },
        { label: "🏆 Certificat d'Appréciation (Admin)", href: "/victory" },
      ],
      clubActivitiesTitle: "Les 3 Piliers du Club à l'ENSA Oujda",
      clubActivities: [
        { title: "🎯 Sensibilisation & Vulgarisation", desc: "Organisation d'ateliers et d'initiatives éducatives pour diffuser les bons réflexes numériques." },
        { title: "🎓 Apprentissage & Formation", desc: "Formations techniques en sécurité offensive/défensive, cryptographie et compétitions CTF." },
        { title: "💻 Projets Cyber & R&D", desc: "Développement d'outils de sécurité, veille technologique et projets innovants en ingénierie." },
      ],
      contactTitle: "Communauté & Réseaux Sociaux",
      contactDesc: "Suivez nos événements, ateliers et conférences à l'ENSA Oujda :",
      onlineStatus: "Club Actif • ENSA Oujda",
      copyright: "© 2026 RED PHOENIX - Club des Élèves-Ingénieurs en Cybersécurité, ENSA Oujda. Tous droits réservés.",
      privacyBadge: "100% Respectueux de la vie privée (Aucune donnée personnelle collectée)",
    },
    ar: {
      brandTitle: "RED PHOENIX",
      brandSub: "نادي طلبة سلك المهندسين في الأمن السيبراني • ENSA وجدة",
      brandDesc: "النادي الرسمي لطلبة سلك المهندسين في تخصص الأمن السيبراني بالمدرسة الوطنية للعلوم التطبيقية بوجدة (ENSAO - جامعة محمد الأول). نهدف إلى تأهيل مهندسي المستقبل، وتطوير المشاريع البرمجية المبتكرة، وتنظيم حملات التحسيس الرقمي للمجتمع.",
      engineered: "ابتكار وتنفيذ طلبة سلك المهندسين في تخصص الأمن السيبراني - ENSA وجدة",
      missionTitle: "مهمات اللعبة التفاعلية",
      missions: [
        { label: "1. كلمات السر القوية", href: "/lesson1" },
        { label: "2. كشف التصيد والاحتيال", href: "/lesson2" },
        { label: "3. الجدار الناري ومكافح الفيروسات", href: "/lesson3" },
        { label: "4. حماية البيانات والكنوز الشخصية", href: "/lesson4" },
        { label: "5. تحديثات الأمان وحماية الدرع", href: "/lesson5" },
        { label: "6. النسخ الاحتياطي وحفظ الذكريات", href: "/lesson6" },
        { label: "7. النفق المشفر والإنترنت الآمن", href: "/lesson7" },
        { label: "🏆 شهادة تقديرية (خاص بالإدارة)", href: "/victory" },
      ],
      clubActivitiesTitle: "محاور أنشطة النادي بـ ENSA وجدة",
      clubActivities: [
        { title: "🎯 التحسيس والتوعية الميدانية", desc: "تنظيم ورشات ومبادرات لترسيخ عادات الحماية الرقمية لدى المدارس ومختلف فئات المجتمع." },
        { title: "🎓 التعلم والتدريب التخصصي", desc: "دورات تقنية في الحماية، اختبار الاختراق الأخلاقي، ومسابقات التقاط العلم (CTF)." },
        { title: "💻 المشاريع والابتكار السيبراني", desc: "تطوير أدوات وحلول برمجية ذكية، وأبحاث تطبيقية رائدة لحماية الأنظمة الإلكترونية." },
      ],
      contactTitle: "التواصل والمجتمع",
      contactDesc: "تابعوا فعاليات وورش عمل نادي RED PHOENIX بوجدة:",
      onlineStatus: "النادي نشط • ENSA وجدة",
      copyright: "© 2026 نادي طلبة سلك المهندسين في الأمن السيبراني RED PHOENIX - ENSA وجدة. جميع الحقوق محفوظة.",
      privacyBadge: "حماية 100% للخصوصية (لا نقوم بجمع أو تخزين أي بيانات شخصية)",
    },
  }[language];

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-black to-black text-slate-300 border-t-2 border-rose-600/40 pt-16 pb-12 overflow-hidden z-20">
      
      {/* Decorative ambient glowing lights */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand presentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-rose-500/40 blur-sm"></div>
                <img 
                  src="/assestes/logo.jpeg" 
                  alt="RED PHOENIX Logo" 
                  className="relative w-14 h-14 rounded-full object-cover border-2 border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.6)]"
                />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
                  {content.brandTitle}
                </h3>
                <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider">
                  {content.brandSub}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {content.brandDesc}
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
              <span>{content.engineered}</span>
            </div>
          </div>

          {/* Column 2: Missions links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              {content.missionTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {content.missions.map((m, idx) => (
                <li key={idx}>
                  <Link 
                    href={m.href}
                    onClick={() => sounds.playClick()}
                    className="text-slate-400 hover:text-rose-300 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block py-0.5"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 3 Piliers du Club ENSA Oujda */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {content.clubActivitiesTitle}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              {content.clubActivities.map((act, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <h5 className="font-bold text-emerald-300 text-xs mb-0.5">{act.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-snug">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Social & Community */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              {content.contactTitle}
            </h4>
            <p className="text-xs text-slate-400">
              {content.contactDesc}
            </p>

            {/* Social Buttons */}
            <div className="flex flex-col gap-2.5">
              
              {/* WhatsApp */}
              <a 
                href="https://wa.me/212762902954" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all hover:scale-[1.02] shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span className="text-xs font-bold text-white">WhatsApp Direct</span>
                </div>
                <span className="text-xs text-emerald-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition font-mono">+212 762-902954</span>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/r3d.phoenix" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 transition-all hover:scale-[1.02] shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="text-xs font-bold text-white">Instagram</span>
                </div>
                <span className="text-xs text-pink-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition">@r3d.phoenix</span>
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@redphoenixclub" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-white transition-all hover:scale-[1.02] shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.91a8.31 8.31 0 0 1-2.43 5.86c-3.26 3.2-8.63 2.92-11.53-.61-2.61-3.17-2.09-7.92 1.15-10.51 1.76-1.41 4.09-1.95 6.31-1.45v4.11c-1.14-.38-2.45-.16-3.38.58-.94.75-1.37 1.99-1.07 3.16.31 1.17 1.39 2.04 2.6 2.08 1.48.06 2.74-1.05 2.82-2.53V.02h2.24z"/>
                  </svg>
                  <span className="text-xs font-bold text-white">TikTok Club</span>
                </div>
                <span className="text-xs text-slate-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition">@redphoenixclub</span>
              </a>

            </div>

            {/* Live status badge */}
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{content.onlineStatus}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Privacy & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{content.privacyBadge}</span>
          </div>
          <p className="text-center md:text-end">
            {content.copyright}
          </p>
        </div>

      </div>
    </footer>
  );
}
