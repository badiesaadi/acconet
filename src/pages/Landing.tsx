import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { algerianWilayas } from '../data/algerianWilayas';
import { OrderBadge } from '../components/OrderBadge';
import { 
  Building2, Users, Search, HelpCircle, ArrowLeft, ArrowRight, 
  MapPin, ClipboardCheck, ArrowUpRight, Check, Quote, Star, 
  Sparkles, FileText, Calendar, CloudLightning, ShieldCheck, Cpu,
  BookmarkCheck, Activity, GraduationCap, FileCheck
} from 'lucide-react';

export const Landing: React.FC = () => {
  const { t, tSpec, tObj, direction, language } = useLanguage();
  const { allProfessionals, triggerNotification } = useApp();
  const navigate = useNavigate();

  // Search form state
  const [keyword, setKeyword] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('0');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(keyword)}&wilaya=${selectedWilaya}&specialty=${selectedSpecialty}`);
  };

  const featuredPros = allProfessionals.slice(0, 4);

  const specialtiesList = [
    { key: "certified-accountant", icon: "💎" },
    { key: "chartered-accountant", icon: "🏛️" },
    { key: "statutory-auditor", icon: "📑" },
    { key: "tax-consultant", icon: "⚖️" },
    { key: "judicial-expert", icon: "🔎" }
  ];

  // Specific Testimonial with real Algerian company types
  interface LocalTestimonial {
    type: string;
    location: string;
    needed: string;
    quoteFR: string;
    quoteAR: string;
    author: string;
    stars: number;
  }

  const algerianEditorialTestimonials: LocalTestimonial[] = [
    {
      type: "SARL de BTP",
      location: "Tizi Ouzou",
      needed: "Quarterly G50 & CNAS",
      quoteFR: "Grâce à notre comptable agréé trouvé sur AccoNet, l'établissement trimestriel de nos G50 et déclarations de chantiers CNAS est devenu un processus fluide. Zéro retard de cotisation.",
      quoteAR: "بفضل المحاسب المعتمد الذي وجدناه في أكونيت، أصبح إعداد تصريحات G50 والاشتراكات السنوية للضمان الاجتماعي للعمال والورشات مستقراً وخالياً من أي غرامات تأطير.",
      author: "Mr. Omar Ait-Ali",
      stars: 5
    },
    {
      type: "Startup labellisée (Alger Tech Hub)",
      location: "Alger",
      needed: "Exonération & Comptabilité SCF",
      quoteFR: "Titulaire du label Startup DZ, nous cherchions un expert connaissant parfaitement la loi de finances 2026. L'accompagnement sur notre liasse fiscale a été au-delà de nos attentes.",
      quoteAR: "بصفتنا شركة ناشئة حاصلة على العلامة، وجدنا خبيراً متمكناً من قانون المالية الجزائري ومزايا الإعفاء للشركات الناشئة مما سهل دمج حساباتنا المالية بنجاح.",
      author: "Yasmine K.",
      stars: 5
    },
    {
      type: "Association sportive",
      location: "Oran",
      needed: "Commissariat aux comptes obligatoire",
      quoteFR: "Conformément à la Loi 12-06, la désignation d'un commissaire aux comptes était requise pour certifier nos subventions. Nous avons trouvé un auditeur rigoureux sous 48h.",
      quoteAR: "وفقاً لمقتضيات قانون الجمعيات 12-06، كان من الضروري تعيين محافظ حسابات للمصادقة على ميزانيتنا والمساعدات. وجدنا مدققاً معتمداً في وهران بكل سلاسة.",
      author: "Brahim S.",
      stars: 5
    },
    {
      type: "Auto-entrepreneur (Constantine)",
      location: "Constantine",
      needed: "IFU régime simple - 5% CA",
      quoteFR: "Avec ma carte d'auto-entrepreneur, j'avais des doutes sur l'impôt forfaitaire unique. Un conseiller m'a éclairé sur place pour déclarer mon impôt annuel de façon optimale.",
      quoteAR: "مع حصولي على بطاقة المقاول الذاتي، واجهتني تساؤلات بخصوص الضريبة الجزافية الوحيدة (IFU) المقدرة بـ 5٪. وجهني مستشار جبائي هنا وصحح خطة التصريح السنوي.",
      author: "Halim G.",
      stars: 5
    },
    {
      type: "Importateur de machines",
      location: "Annaba",
      needed: "TVA + TAP + Droits de douane",
      quoteFR: "La gestion d'importation implique des déclarations douanières et l'établissement des fiches d'activité professionnelle (TAP) complexes. Cabinet d'une rigueur absolue.",
      quoteAR: "الاستيراد يسلتزم فحصاً معقداً للرسوم الجمركية ورسم النشاط المهني وتعديلات القيمة المضافة. المكتب الذي تعاقدنا معه قدم مستوى عالياً من الدقة القانونية.",
      author: "Mourad S.",
      stars: 5
    },
    {
      type: "EPIC Municipale",
      location: "Blida",
      needed: "Certification annuelle obligatoire",
      quoteFR: "Notre établissement public industriel et commercial requiert un audit pluriannuel pour soumissionner aux appels d'offres d'État. Collaboration irréprochable.",
      quoteAR: "كمؤسسة عمومية ذات طابع صناعي وتجاري، نحتاج مصادقة سنوية صارمة على ميزانياتنا للمشاركة في المناقصات الحكومية. المتابعة كانت مثالية مع مكتب محافظة الحسابات.",
      author: "Me. Sofiane Benamara",
      stars: 5
    }
  ];

  const handleContactSofi = () => {
    triggerNotification("Prise de Contact", "Votre demande d'information a été transmise à Me. Sofiane Benamara. Il vous répondra sous 24h ouvrables.");
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-24 bg-[#0B1020] text-slate-100" id="landing_page_viewport">
      
      {/* 1. LUXURIOUS ASYMMETRIC FINTECH HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        {/* Subtle Neon Glow effect */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-900/205/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* LEFT COLUMN (55%): EDITORIAL TYPOGRAPHY */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left rtl:text-right">
              
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/25 rounded-md text-brand-primary text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-brand-primary animate-pulse" />
                  {t('heroBadgeText')}
                </span>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.15] tracking-tight">
                  {t('heroTitle')}
                </h1>

                <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed rtl:leading-loose">
                  {t('heroSubtitle')}
                </p>
              </div>

              {/* Action buttons side-by-side */}
              <div className="flex flex-wrap gap-4 select-none">
                <button 
                  onClick={() => navigate('/search')}
                  className="px-5 py-3.5 bg-brand-primary hover:bg-brand-dark hover:shadow-glow text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 rounded-lg"
                >
                  <span>{t('findProButton')}</span>
                  {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-5 py-3.5 glass/5 border border-white/10 hover:glass/10 hover:border-white/20 text-slate-200 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-lg"
                >
                  <span>{t('joinAsProButton')}</span>
                </button>
              </div>

              {/* Verified Trust stats with linear decoration */}
              <div className="pt-8 border-t border-white/5 flex flex-wrap gap-6 items-center text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  <strong>{t('statPros')}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  <strong>{t('statWilayas')}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  <strong>{t('statBusinesses')}</strong>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (45%): PREMIUM COMPTABLE CARD HIGHLIGHT */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              <div className="w-full max-w-sm glass border border-white/10 rounded-2xl p-6 shadow-glow relative text-left rtl:text-right space-y-6 hover:border-brand-primary/20 transition-all duration-300">
                
                {/* Header state */}
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{t('heroConsultantCard')}</span>
                  <span className="px-2.5 py-0.5 bg-teal-900/200/10 text-brand-primary border border-brand-primary/20 text-[9px] font-mono uppercase font-black rounded-md">
                    ONEC VERIFIED
                  </span>
                </div>

                {/* Profile Snapshot */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 glass text-brand-primary font-bold shrink-0 flex items-center justify-center font-serif text-lg border border-white/10 rounded-xl">
                    SB
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif font-black text-white text-sm sm:text-base">Sofiane Benamara</h3>
                      <span className="text-brand-primary font-bold text-xs" title="Inscrit National Verified">✓</span>
                    </div>
                    
                    <p className="text-[10px] font-mono text-brand-primary font-bold uppercase tracking-wider">{tSpec('certified-accountant')} — ONEC</p>
                    <p className="text-[10px] text-slate-400 font-sans">{t('fieldWilaya').split(' ')[0]} : Alger, Wilaya 16</p>
                  </div>
                </div>

                {/* Stars and statistics */}
                <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4 text-xs text-slate-300 font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-500 block uppercase">{t('rating')}</span>
                    <span className="flex items-center gap-1 font-bold text-white leading-none">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 4.9 / 5.0
                    </span>
                  </div>
                  <div className="space-y-0.5 border-l rtl:border-l-0 rtl:border-r border-white/5 pl-3 rtl:pl-0 rtl:pr-3">
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">{t('seniority')}</span>
                    <span className="font-bold text-white">{t('seniorityYears')}</span>
                  </div>
                </div>

                {/* Pricing and Availability */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                    <span>{t('availableImmediately')}</span>
                  </div>
                  <span className="text-xs font-mono font-black text-white">{t('fortyFiveThousand')}</span>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={handleContactSofi}
                  className="w-full py-2.5 bg-brand-primary hover:bg-brand-dark hover:shadow-glow text-white font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-200 rounded-lg cursor-pointer text-center"
                >
                  {t('contactTheExpert')}
                </button>

              </div>

              {/* Trust labels below hero card */}
              <div className="flex flex-wrap justify-center items-center gap-4 mt-5 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">✓ {t('verifiedOnec')}</span>
                <span className="flex items-center gap-1">✓ {t('certifiedDocs')}</span>
                <span className="flex items-center gap-1">✓ {t('securedContract')}</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. RESEARCH STATISTICS BOARD - NO BEIGE - DEEP FINTECH SURFACES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 glass border border-white/5 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-6 text-center shadow-classic">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold tracking-wider">{t('nationalCoverage')}</span>
            <p className="text-2xl sm:text-3xl font-serif font-black text-brand-primary">{t('nationalCoverageTitle')}</p>
            <p className="text-[10px] text-slate-500 font-sans">{t('fromNorthToSouth')}</p>
          </div>
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-white/5 pt-4 md:pt-0">
            <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold tracking-wider">{t('nationalBoards')}</span>
            <p className="text-2xl sm:text-3xl font-serif font-black text-white">ONEC & ONCC</p>
            <p className="text-[10px] text-slate-500 font-sans">{t('automaticCheckRequired')}</p>
          </div>
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-white/5 pt-4 md:pt-0">
            <span className="text-[9px] font-mono uppercase text-brand-primary block font-bold tracking-wider">{t('scfG50Compliance')}</span>
            <p className="text-2xl sm:text-3xl font-serif font-black text-white">SCF & G50</p>
            <p className="text-[10px] text-slate-500 font-sans">{t('scfG50ComplianceSub')}</p>
          </div>
          <div className="space-y-1.5 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
            <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold tracking-wider">{t('certifiedAdmission')}</span>
            <p className="text-2xl sm:text-3xl font-serif font-black text-white">Article 222 CP</p>
            <p className="text-[10px] text-slate-500 font-sans">{t('certifiedAdmissionSub')}</p>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM MINIMAL SEARCH TERMINAL BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass border border-white/10 p-5 sm:p-6 rounded-2xl shadow-glow relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-10 w-48 h-48 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <form 
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10"
            id="hero_search_form"
          >
            {/* Keyword Search Input */}
            <div className="md:col-span-4 flex items-center gap-2 px-3 py-2 border border-white/10 rounded-xl bg-slate-900/40">
              <Search className="w-4 h-4 text-brand-primary shrink-0" />
              <input 
                type="text" 
                placeholder={t('searchPlaceholderInput')}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full text-xs text-white bg-transparent focus:outline-none placeholder-slate-500"
              />
            </div>

            {/* Wilaya Picker */}
            <div className="md:col-span-3 flex items-center gap-1.5 px-3 py-2 border border-white/10 rounded-xl bg-slate-900/40">
              <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <select
                value={selectedWilaya}
                onChange={(e) => setSelectedWilaya(e.target.value)}
                className="w-full text-xs text-slate-350 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="0" className="glass text-white">{t('allWilayasLabel')}</option>
                {algerianWilayas.map((w) => (
                  <option key={w.id} value={w.id} className="glass text-white">{w.code} - {w.name.fr} ({w.name.ar})</option>
                ))}
              </select>
            </div>

            {/* Specialty Dropdown */}
            <div className="md:col-span-3 flex items-center gap-1.5 px-3 py-2 border border-white/10 rounded-xl bg-slate-900/40">
              <span className="text-xs shrink-0 select-none">💼</span>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full text-xs text-slate-350 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="" className="glass text-white">{t('allSpecialties')}</option>
                {specialtiesList.map((s) => (
                  <option key={s.key} value={s.key} className="glass text-white">{tSpec(s.key)}</option>
                ))}
              </select>
            </div>

            {/* Direct Action */}
            <button 
              type="submit"
              className="md:col-span-2 w-full py-2 bg-brand-primary hover:bg-brand-dark text-white text-[10px] font-mono uppercase tracking-widest transition duration-205 cursor-pointer flex items-center justify-center gap-1.5 font-bold rounded-xl"
            >
              <span>{t('searchBtnText')}</span>
              {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>
      </section>

      {/* 4. FEATURED COMPTABLES AND AUDITORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-left rtl:text-right">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-primary">AccoNet Directory</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight mt-1">
              {t('featuredProsHeading')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
            {t('featuredProsSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPros.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL ALGERIAN TESTIMONIALS SECTION - PREMIUM DARK SURFACE */}
      <section className="glass border-y border-white/5 py-16 md:py-24" id="testimonials_editorial_block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono text-brand-primary uppercase tracking-widest block font-bold">{t('feedbackLocalEntities')}</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
              {t('testimonialsEditoHeading')}
            </h2>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {t('testimonialsEditoSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {algerianEditorialTestimonials.map((test, index) => (
              <div 
                key={index}
                className="glass border border-white/5 hover:border-brand-primary/20 rounded-xl p-6 space-y-5 text-left rtl:text-right flex flex-col justify-between shadow-classic hover:shadow-glow transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                      {test.type}
                    </span>
                    <span className="px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[8px] font-mono rounded">
                      {test.location}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed italic">
                    "{language === 'ar' ? test.quoteAR : test.quoteFR}"
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-primary font-serif font-black flex items-center justify-center text-xs border border-brand-primary/25">
                    {test.author[0]}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-200 text-xs">{test.author}</h4>
                    <p className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">{test.needed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. IMMERSIVE SANDBOX DECORATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass text-white p-8 sm:p-12 border border-white/5 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 -translate-y-1/2 w-64 h-64 bg-brand-primary/10 rounded-full blur-[90px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-6 space-y-5 text-left rtl:text-right">
              <span className="inline-block px-2.5 py-0.5 bg-amber-900/200/10 border border-amber-500/25 text-amber-400 text-[9px] font-mono uppercase tracking-wider rounded">
                {t('sandboxHeading')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
                {t('sandboxMainHeading')}
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                {t('sandboxSubHeading')}
              </p>
              <button 
                onClick={() => navigate('/tools')}
                className="px-5 py-3.5 bg-brand-primary text-white hover:bg-brand-dark hover:shadow-glow text-[10px] uppercase font-mono font-bold tracking-widest transition duration-150 cursor-pointer rounded-lg"
              >
                {t('sandboxButton')}
              </button>
            </div>

            <div className="lg:col-span-6 glass-dark p-6 rounded-xl space-y-4 border border-white/5">
              <div className="flex items-center justify-between text-xs text-brand-primary border-b border-white/5 pb-2">
                <span className="font-mono tracking-wider">{t('widgetSmeHeading')}</span>
                <span className="text-[9px] bg-brand-primary/10 border border-brand-primary/20 px-1.5 text-brand-primary rounded font-mono uppercase">{t('sandboxActiveLabel')}</span>
              </div>
              
              <div className="font-mono text-[11px] text-slate-350 space-y-2 leading-normal">
                <p>💡 <span className="font-bold text-white">{t('baseTapText').split(' : ')[0]} :</span> {t('baseTapText').split(' : ')[1] || t('baseTapText')}</p>
                <p>📊 <span className="font-bold text-white">{t('vtaStandardText').split(' : ')[0]} :</span> {t('vtaStandardText').split(' : ')[1] || t('vtaStandardText')}</p>
                <p>📉 <span className="font-bold text-white">{t('penaltyText').split(' : ')[0]} :</span> {t('penaltyText').split(' : ')[1] || t('penaltyText')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
