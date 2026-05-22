import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { 
  Building2, Users, FileText, CheckCircle2, AlertTriangle, 
  MapPin, Calendar, CreditCard, ChevronRight, Send, ArrowUpRight,
  ShieldCheck, ArrowLeft, ArrowRight, Sparkles, Receipt
} from 'lucide-react';
import { professionals } from '../data/mockData';

export const ClientDashboard: React.FC = () => {
  const { t, tObj, tSpec, direction } = useLanguage();
  const { 
    currentClient, contracts, tasks, 
    updateTaskStatus, addTask 
  } = useApp();

  // State to append a task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedContractId, setSelectedContractId] = useState('');

  // Filter lists for our current simulated client 
  const clientContracts = contracts.filter((c) => c.clientId === (currentClient?.id || 'c1'));
  const activeContractIds = clientContracts.map((c) => c.id);
  const clientTasks = tasks.filter((tk) => activeContractIds.includes(tk.contractId));

  // Counts
  const activeContractsCount = clientContracts.length;
  const pendingTasksCount = clientTasks.filter((tk) => tk.status !== 'done').length;
  const completedTasksCount = clientTasks.filter((tk) => tk.status === 'done').length;

  // New task submit
  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !selectedContractId) return;

    addTask({
      id: `tk_custom_cl_${Date.now()}`,
      contractId: selectedContractId,
      title: { ar: newTaskTitle, fr: newTaskTitle, en: newTaskTitle },
      deadline: new Date(Date.now() + 7 * 864 * 1000).toISOString().split('T')[0], // 7 Days from now
      status: 'todo',
      type: 'bookkeeping'
    });

    setNewTaskTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" id="client_dashboard_wrapper">
      
      {/* 1. WELCOME METADATA HEADER ROW */}
      <div className="glass border border-[#0F6E56]/40 p-6 sm:p-8 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-full bg-brand-primary/10 filter blur-2xl"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10 text-left rtl:text-right">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-brand-primary/30 border border-[#0F6E56] text-brand-primary text-[9px] font-mono uppercase tracking-widest">
                SME Business Console
              </span>
              <span className="text-[10px] font-mono text-slate-500">REGULATORY COMPATIBLE • ALGERIA</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-white leading-tight">
              {t('clientWelcome')} <span className="text-brand-accent italic font-normal underline decoration-brand-accent/25 underline-offset-4">{currentClient?.companyName || 'Dzair Tech Link'}</span>
            </h1>
            
            <p className="text-[11px] text-slate-400 font-sans flex items-center gap-2.5">
              <span>HQ: <strong className="text-white">{tObj(currentClient?.wilayaName)}</strong></span>
              <span className="text-slate-400">•</span>
              <span>NIF Certificate: <strong className="font-mono text-brand-accent">{currentClient?.NIF}</strong></span>
            </p>
          </div>

          <div className="px-4 py-2.5 glass/5 border border-white/10 flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 bg-emerald-400 animate-ping"></span>
            <span className="text-slate-400 font-mono text-[10px] tracking-wider uppercase">SCF Compliance Live Link</span>
          </div>
        </div>
      </div>

      {/* 2. HIGH DENSITY KPI MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="kpi_matrix_row">
        
        {/* Active contracts */}
        <div className="glass border border-white/5 p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{t('activeContractsLabel')}</p>
            <p className="text-2xl font-serif font-black text-brand-primary font-mono">{activeContractsCount}</p>
          </div>
          <Building2 className="w-8 h-8 text-brand-primary/30" />
        </div>

        {/* Pending tasks */}
        <div className="glass border border-white/5 p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{t('dashboardTasksActive')}</p>
            <p className="text-2xl font-serif font-black text-brand-accent font-mono">{pendingTasksCount}</p>
          </div>
          <FileText className="w-8 h-8 text-[#F59E0B]/30" />
        </div>

        {/* Done tasks */}
        <div className="glass border border-white/5 p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">COMPLETED LEDGERS</p>
            <p className="text-2xl font-serif font-black text-emerald-400 font-mono">{completedTasksCount}</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-400/30" />
        </div>

        {/* Unread messages */}
        <div className="glass border border-white/5 p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">ASSIGNED CABINETS</p>
            <p className="text-2xl font-serif font-black text-indigo-400 font-mono">
              {new Set(clientContracts.map((c) => c.professionalId)).size}
            </p>
          </div>
          <Users className="w-8 h-8 text-indigo-400/30" />
        </div>

      </div>

      {/* 3. BUSINESS MATRIX HUB - ASYMMETRIC PARTNER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Module (col-span-8) - Contract details & Direct Task Assignment */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Partnerships List */}
          <div className="glass border border-white/5 p-6 space-y-6">
            <div className="pb-4 border-b border-white/5 flex items-center justify-between text-left rtl:text-right">
              <div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Active Engagements</span>
                <h2 className="font-serif font-semibold text-white text-base flex items-center gap-2 mt-1">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                  {t('activeServiceContractsTitle')}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">Total volume: {clientContracts.length}</span>
            </div>

            {clientContracts.length > 0 ? (
              <div className="space-y-4">
                {clientContracts.map((con) => {
                  const proInfo = professionals.find((p) => p.id === con.professionalId);
                  return (
                    <div key={con.id} className="border border-white/5 p-5 hover:border-brand-primary transition duration-150 space-y-4 bg-[#0B1020]/40 text-left rtl:text-right">
                      
                      {/* Contract Name Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                        <div>
                          <h3 className="font-serif font-bold text-white text-sm leading-snug">{tObj(con.title)}</h3>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">CONTRACT REF: {con.id}</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-mono uppercase">
                          {con.status}
                        </span>
                      </div>

                      {/* Professional Info Block */}
                      {proInfo && (
                        <div className="flex items-center gap-3 text-xs text-slate-300 glass p-3 border border-white/5">
                          <div className={`w-8 h-8 font-bold flex items-center justify-center text-xs text-brand-primary glass ${proInfo.avatarBg}`}>
                            {proInfo.initials}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Accredited Partner Cabinet</span>
                            <span className="font-sans font-bold text-white">{tObj(proInfo.name)}</span>
                            <span className="text-slate-500 font-mono mx-1.5">|</span>
                            <span className="text-slate-300 font-sans">{tSpec(proInfo.specialty)}</span>
                          </div>
                        </div>
                      )}

                      {/* Precise Metric breakdown row using monospacing */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5 text-xs">
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase leading-none font-mono block mb-1">{t('contractValueLabel')}</span>
                          <span className="font-bold font-mono text-white">{con.value.toLocaleString()} DZD</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase leading-none font-mono block mb-1">EFFECTIVE DATE</span>
                          <span className="font-semibold text-white font-mono">{con.startDate}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase leading-none font-mono block mb-1">VALIDITY TERM</span>
                          <span className="font-semibold text-white font-mono">{con.endDate}</span>
                        </div>
                      </div>

                      {/* Task completion ratios */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-500 uppercase">Task Compliance ratio</span>
                          <span className="font-bold text-brand-primary">
                            {Math.round(
                              (clientTasks.filter((tk) => tk.contractId === con.id && tk.status === 'done').length / 
                              Math.max(1, clientTasks.filter((tk) => tk.contractId === con.id).length)) * 100
                            )}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-xl overflow-hidden">
                          <div 
                            className="bg-brand-primary h-full transition-all duration-350" 
                            style={{ 
                              width: `${
                                (clientTasks.filter((tk) => tk.contractId === con.id && tk.status === 'done').length / 
                                Math.max(1, clientTasks.filter((tk) => tk.contractId === con.id).length)) * 100
                              }%` 
                            }}
                          ></div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 font-mono">
                <p className="text-xs">No active accounting partnerships. Complete a search to hire an approved specialist.</p>
              </div>
            )}

          </div>

          {/* Direct Task Dispatcher Center */}
          <div className="glass border border-white/5 p-6 space-y-6">
            <div className="pb-3 border-b border-white/5">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">SME Action Dispatch</span>
              <h2 className="font-serif font-semibold text-white text-sm flex items-center gap-2 mt-0.5">
                <Send className="w-4.5 h-4.5 text-brand-primary" />
                Direct Task Dispatch Center (SCF Tools)
              </h2>
            </div>

            <form onSubmit={handleAddTaskSubmit} className="space-y-4 text-left rtl:text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Target Contract</label>
                  <select
                    required
                    value={selectedContractId}
                    onChange={(e) => setSelectedContractId(e.target.value)}
                    className="w-full text-xs border border-white/5 p-2.5 bg-[#0B1020] focus:outline-none focus:border-brand-primary text-slate-200 rounded-xl font-sans"
                  >
                    <option value="">Select accounting contract...</option>
                    {clientContracts.map((c) => (
                      <option key={c.id} value={c.id}>{tObj(c.title).substring(0, 40)}...</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Tax Filing / Task Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Audit G50 correction of May sales ledger"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full text-xs border border-white/5 p-2.5 bg-[#0B1020] focus:outline-none focus:border-brand-primary text-slate-200 rounded-xl"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-white font-mono text-[10px] uppercase tracking-widest transition duration-150 cursor-pointer"
              >
                Assign Filing Work to Cabinet
              </button>
            </form>
          </div>

        </div>

        {/* Right Column (col-span-4) - COLOR CODED DEADLINES BOX & HISTORY */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* DEADLINES COLUMN */}
          <div className="glass border border-white/5 p-6 space-y-5">
            <h2 className="font-serif font-semibold text-white text-sm flex items-center gap-2 pb-3 border-b border-white/5">
              <Calendar className="w-4.5 h-4.5 text-brand-primary shrink-0 text-brand-primary" />
              {t('upcomingDeadlinesTitle')}
            </h2>

            <div className="space-y-3">
              {clientTasks.map((tk) => {
                const isOverdue = new Date(tk.deadline) < new Date();
                const isFinished = tk.status === 'done';

                return (
                  <div 
                    key={tk.id} 
                    className={`p-4 border text-left rtl:text-right transition ${
                      isFinished 
                        ? 'bg-brand-primary/10/20 border-brand-primary/20 text-brand-primary' 
                        : isOverdue 
                          ? 'bg-red-900/20/20 border-red-500/20 text-red-400' 
                          : 'bg-amber-900/20/20 border-white/5 text-amber-400'
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2 mb-2">
                      <span className="text-[8px] uppercase font-bold tracking-wider px-1.5 py-0.5 glass border border-white/5 text-slate-400 font-mono">
                        {tk.type}
                      </span>
                      
                      {/* State checkbox */}
                      <button 
                        onClick={() => updateTaskStatus(tk.id, tk.status === 'done' ? 'todo' : 'done')}
                        className={`w-4 h-4 border flex items-center justify-center cursor-pointer rounded-xl transition-colors ${
                          isFinished 
                            ? 'bg-brand-primary border-[#0F6E56] text-white' 
                            : 'glass border-white/5 hover:border-brand-primary'
                        }`}
                        title="Click to simulate change of status"
                      >
                        {isFinished && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </button>
                    </div>

                    <p className="text-xs font-bold font-serif text-white">
                      {tObj(tk.title)}
                    </p>

                    <div className="flex justify-between items-center text-[10px] pt-2 border-t border-white/5/60 mt-2 text-slate-400">
                      <span>Due: <strong className="font-mono text-slate-300">{tk.deadline}</strong></span>
                      <span className="font-mono uppercase text-[9px] glass px-1.5 py-0.5 border border-white/5 text-slate-200">
                        {tk.status}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* SIMULATED ACTION FEED */}
          <div className="glass border border-white/5 p-6 space-y-4">
            <h2 className="font-serif font-semibold text-white text-sm flex items-center gap-2 pb-2 border-b border-white/5">
              <Receipt className="w-4 h-4 text-brand-primary" />
              {t('recentActionsLabel')}
            </h2>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 bg-brand-primary mt-1.5 shrink-0"></span>
                <div>
                  <p className="text-slate-300">Contract proposal simulated with <strong>Layla Yakoubi</strong></p>
                  <p className="text-[9px] text-slate-500 font-mono">2026-05-20 14:02</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 bg-brand-accent mt-1.5 shrink-0"></span>
                <div>
                  <p className="text-slate-300">G50 tax report loaded by <strong>Sofiane Benamara</strong></p>
                  <p className="text-[9px] text-slate-500 font-mono">2026-05-18 10:15</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 bg-indigo-900/200 mt-1.5 shrink-0"></span>
                <div>
                  <p className="text-slate-300">Consultation set with certified tax authority</p>
                  <p className="text-[9px] text-slate-500 font-mono">2026-05-10 11:30</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
