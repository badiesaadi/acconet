import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { 
  Menu, X, Languages, Search, Cpu, 
  LayoutDashboard, User, LogOut, CheckSquare 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, direction } = useLanguage();
  const { userRole, setUserRole, currentClient, currentProfessional } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (lang: 'ar' | 'fr' | 'en') => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const handleLogout = () => {
    setUserRole('guest');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const activeLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "text-brand-primary font-bold border-b-2 border-brand-primary pb-1 transition duration-150"
      : "text-slate-400 hover:text-brand-primary transition-colors duration-150";
  };

  const userDisplayName = () => {
    if (userRole === 'client' && currentClient) {
      return currentClient.companyName;
    }
    if (userRole === 'professional' && currentProfessional) {
      // Just take the name of the active language
      return currentProfessional.name[language] || currentProfessional.name.en;
    }
    if (userRole === 'admin') {
      return 'DGI General Auditor / Admin';
    }
    return '';
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5 shadow-classic" id="main_navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Link to="/" className="flex items-center space-x-2.5 rtl:space-x-reverse" id="logo_link">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary font-black text-lg border border-brand-primary/20 hover:scale-105 transition-transform duration-250">
                أ
              </span>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white font-sans leading-none">
                  {t('brandName')}
                </span>
                <span className="text-[9px] text-brand-primary font-mono tracking-widest uppercase mt-0.5">
                  Fintech d'Algérie
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 rtl:space-x-reverse text-xs font-semibold uppercase tracking-wider">
            <Link to="/search" className={activeLinkClass('/search')} id="nav_search">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                {t('findProButton')}
              </span>
            </Link>
            
            <Link to="/tools" className={activeLinkClass('/tools')} id="nav_tools">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                {t('toolsLink')}
              </span>
            </Link>

            {userRole === 'client' && (
              <Link to="/dashboard/client" className={activeLinkClass('/dashboard/client')} id="nav_client_dash">
                <span className="flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  {t('dashboardSidebarTitle')} ({t('isClientLabel').split(' ')[0]})
                </span>
              </Link>
            )}

            {userRole === 'professional' && (
              <Link to="/dashboard/professional" className={activeLinkClass('/dashboard/professional')} id="nav_pro_dash">
                <span className="flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5" />
                  {t('dashboardSidebarTitle')} ({t('isProLabel').split(' ')[0]})
                </span>
              </Link>
            )}

            {userRole === 'admin' && (
              <Link to="/dashboard/admin" className={activeLinkClass('/dashboard/admin')} id="nav_admin_dash">
                <span className="flex items-center gap-1.5 text-amber-500">
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
                  Admin Panel
                </span>
              </Link>
            )}
          </div>

          {/* Desktop Actions & Languages Switcher */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            
            {/* Custom Interactive Multi-language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/10 rounded-lg text-xs font-semibold text-slate-300 hover:text-white glass/5 hover:glass/10 transition duration-150 cursor-pointer"
                id="language_picker_button"
              >
                <Languages className="w-3.5 h-3.5 text-brand-primary" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div 
                  className={`absolute mt-2 w-32 glass rounded-xl shadow-classic py-1 z-50 overflow-hidden ${direction === 'rtl' ? 'left-0' : 'right-0'}`}
                  id="lang_dropdown"
                >
                  <button 
                    onClick={() => handleLanguageChange('ar')}
                    className={`flex w-full items-center px-3 py-1.5 text-xs text-right rtl:text-right hover:bg-brand-light hover:text-brand-primary justify-between cursor-pointer ${language === 'ar' ? 'font-bold text-brand-primary glass/5' : 'text-slate-300'}`}
                  >
                    <span>العربية</span>
                    <span>🇩🇿</span>
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('fr')}
                    className={`flex w-full items-center px-3 py-1.5 text-xs text-left hover:bg-brand-light hover:text-brand-primary justify-between cursor-pointer ${language === 'fr' ? 'font-bold text-brand-primary glass/5' : 'text-slate-300'}`}
                  >
                    <span>Français</span>
                    <span>🇫🇷</span>
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('en')}
                    className={`flex w-full items-center px-3 py-1.5 text-xs text-left hover:bg-brand-light hover:text-brand-primary justify-between cursor-pointer ${language === 'en' ? 'font-bold text-brand-primary glass/5' : 'text-slate-300'}`}
                  >
                    <span>English</span>
                    <span>🇬🇧</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth section */}
            {userRole === 'guest' ? (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link 
                  to="/login" 
                  className="px-3.5 py-1.5 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold hover:border-brand-primary hover:text-brand-primary hover:glass/5 transition duration-150"
                  id="navbar_login_btn"
                >
                  {t('loginLink')}
                </Link>
                <Link 
                  to="/register" 
                  className="px-3.5 py-1.5 bg-brand-primary text-slate-950 hover:bg-brand-dark rounded-lg text-xs font-bold transition duration-150 shadow-xs hover:shadow-glow"
                  id="navbar_register_btn"
                >
                  {t('registerLink')}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse border-l rtl:border-l-0 rtl:border-r pl-3 rtl:pl-0 rtl:pr-3 border-white/10">
                <div className="flex flex-col items-end rtl:items-start text-xs">
                  <span className="font-semibold text-slate-200 max-w-[120px] truncate animate-pulse" title={userDisplayName()}>
                    {userDisplayName()}
                  </span>
                  <span className="text-slate-400 font-mono text-[9px] tracking-wider uppercase">
                    {userRole === 'client' ? 'Business Suite' : userRole === 'admin' ? 'Platform Control' : 'Cabinet Pro'}
                  </span>
                </div>
                
                {/* Visual Avatar */}
                <div className="w-7 h-7 rounded-lg bg-brand-primary/25 border border-brand-primary/40 flex items-center justify-center font-bold text-brand-primary text-[10px]">
                  {userRole === 'client' ? 'DT' : userRole === 'admin' ? 'AD' : 'SB'}
                </div>

                <button 
                  onClick={handleLogout}
                  className="p-1 px-2 border border-rose-500/20 hover:bg-rose-500/10 text-rose-400 rounded-lg text-xs cursor-pointer transition flex items-center gap-1"
                  title={t('logout')}
                  id="navbar_logout_btn"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden lg:inline text-[10px] uppercase font-semibold">{t('logout')}</span>
                </button>
              </div>
            )}

          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center md:hidden space-x-2 rtl:space-x-reverse">
            
            {/* Quick Lang swap for Mobile */}
            <button 
              onClick={() => setLanguage(language === 'ar' ? 'fr' : language === 'fr' ? 'en' : 'ar')}
              className="px-2 py-1 glass/5 text-slate-300 rounded-lg text-xs border border-white/10"
              title="Change Language"
            >
              <span className="uppercase font-semibold">{language}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-primary hover:glass/5 focus:outline-none"
              id="mobile_hamburger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-secondary border-t border-white/5 px-4 pt-2 pb-4 space-y-3 shadow-2xl" id="mobile_menu">
          <Link 
            to="/search" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:glass/5 hover:text-white"
            id="mobile_search_link"
          >
            {t('findProButton')}
          </Link>
          <Link 
            to="/tools" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:glass/5 hover:text-white"
            id="mobile_tools_link"
          >
            {t('toolsLink')}
          </Link>

          {userRole === 'client' && (
            <Link 
              to="/dashboard/client" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:glass/5 hover:text-white"
            >
              {t('dashboardSidebarTitle')} (Client)
            </Link>
          )}

          {userRole === 'professional' && (
            <Link 
              to="/dashboard/professional" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:glass/5 hover:text-white"
            >
              {t('dashboardSidebarTitle')} (Pro)
            </Link>
          )}

          {userRole === 'admin' && (
            <Link 
              to="/dashboard/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-amber-500 hover:bg-amber-950/25"
            >
              Admin Dashboard Panel
            </Link>
          )}

          {/* Languages selection inside mobile drawer */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('about')}</p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleLanguageChange('ar')}
                className={`py-1.5 text-xs rounded-xl border text-center cursor-pointer ${language === 'ar' ? 'bg-brand-primary text-slate-950 border-brand-primary' : 'glass/5 text-slate-300 border-white/10'}`}
              >
                العربية
              </button>
              <button 
                onClick={() => handleLanguageChange('fr')}
                className={`py-1.5 text-xs rounded-xl border text-center cursor-pointer ${language === 'fr' ? 'bg-brand-primary text-slate-950 border-brand-primary' : 'glass/5 text-slate-300 border-white/10'}`}
              >
                Français
              </button>
              <button 
                onClick={() => handleLanguageChange('en')}
                className={`py-1.5 text-xs rounded-xl border text-center cursor-pointer ${language === 'en' ? 'bg-brand-primary text-slate-950 border-brand-primary' : 'glass/5 text-slate-300 border-white/10'}`}
              >
                English
              </button>
            </div>
          </div>

          {/* Authenticated user vs Guest inside mobile drawer */}
          <div className="pt-4 border-t border-white/5">
            {userRole === 'guest' ? (
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-center border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  {t('loginLink')}
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-center bg-brand-primary text-slate-950 rounded-xl text-xs font-semibold"
                >
                  {t('registerLink')}
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 rtl:space-x-reverse p-2 glass/5 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center font-bold text-brand-primary text-xs">
                    {userRole === 'client' ? 'DT' : userRole === 'admin' ? 'AD' : 'SB'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{userDisplayName()}</p>
                    <p className="text-[9px] text-slate-400 uppercase font-mono">{userRole}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full py-1.5 flex items-center justify-center gap-2 border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
