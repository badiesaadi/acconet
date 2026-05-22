import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { FileCode2, ShieldAlert, Heart, RefreshCw } from 'lucide-react';
import { clients, professionals } from '../data/mockData';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { userRole, setUserRole, setCurrentClient, setCurrentProfessional } = useApp();

  const handleSimulateSelect = (role: 'guest' | 'client' | 'professional') => {
    setUserRole(role);
    if (role === 'client') {
      setCurrentClient(clients[0]); // Dzair Tech Link
    } else if (role === 'professional') {
      setCurrentProfessional(professionals[0]); // Sofiane Benamara
    }
  };

  return (
    <footer className="bg-[#083A2F] text-white border-t border-[#0F6E56]/35 pt-16 pb-8" id="main_footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="flex items-center justify-center w-8 h-8 rounded-none glass text-brand-primary font-black text-lg shadow-sm">
                أ
              </span>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                {t('brandName')} <span className="text-brand-accent italic font-normal">أكونيت</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t('brandSlogan')}
            </p>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-brand-light font-medium glass/5 px-3 py-2 rounded-none border border-white/10 inline-block">
              <ShieldAlert className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Algerian SCF 2026 Compatible • 48 Wilayas</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-brand-accent font-mono text-xs tracking-widest uppercase mb-4">
              {t('brandName')} Platform
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/search" className="hover:text-brand-accent transition">{t('findProButton')}</Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-accent transition">{t('toolsLink')}</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-accent transition">{t('loginLink')}</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-brand-accent transition">{t('registerLink')}</Link>
              </li>
            </ul>
          </div>

          {/* About Algerie accounting info */}
          <div>
            <h3 className="text-brand-accent font-mono text-xs tracking-widest uppercase mb-4">
              Algeria Compliance
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>• Système Comptable Financier (SCF)</li>
              <li>• Déclaration Mensuelle G50 & G50 bis</li>
              <li>• Impôts sur le Revenu Global (IRG)</li>
              <li>• Bureau National de l'Ordre (ONEC)</li>
              <li>• Chambre Nationale des Commissaires (CNCC)</li>
            </ul>
          </div>

        </div>

        {/* DEMO SWITCHER CONTROL DECK - EDITORIAL AESTHETIC */}
        <div className="my-8 p-5 bg-black/25 rounded-none border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-brand-accent pulse-accent shrink-0" />
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2">
                <span>AccoNet Simulation Control Deck</span>
                <span className="px-1.5 py-0.5 bg-[#0F6E56] text-[9px] uppercase tracking-widest font-mono text-white">Prototype Mode</span>
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Switch profiles to immediately view the corresponding interactive workspaces, mock contracts, and tax tasks.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSimulateSelect('guest')}
              className={`px-3 py-2 text-xs font-mono uppercase tracking-wider cursor-pointer transition rounded-none ${userRole === 'guest' ? 'glass text-brand-dark' : 'glass/5 text-white border border-white/10 hover:glass/10'}`}
            >
              Guest View
            </button>
            <button
              onClick={() => handleSimulateSelect('client')}
              className={`px-3 py-2 text-xs font-mono uppercase tracking-wider cursor-pointer transition rounded-none ${userRole === 'client' ? 'bg-brand-primary text-white border border-brand-accent' : 'glass/5 text-white border border-white/10 hover:glass/10'}`}
            >
              SME Client (Dzair Tech)
            </button>
            <button
              onClick={() => handleSimulateSelect('professional')}
              className={`px-3 py-2 text-xs font-mono uppercase tracking-wider cursor-pointer transition rounded-none ${userRole === 'professional' ? 'bg-brand-primary text-white border border-brand-accent' : 'glass/5 text-white border border-white/10 hover:glass/10'}`}
            >
              Pro Accountant (Benamara)
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-slate-400">
          <p>© 2026 {t('brandName')} Algeria. {t('allRightsReserved')}</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Algerian Businesses & Accountants</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
