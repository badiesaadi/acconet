import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, FileText, Database, ShieldAlert, Cpu, Eye, 
  ChevronDown, ChevronUp, Play, Info, RefreshCw 
} from 'lucide-react';

export const Tools: React.FC = () => {
  const { t, tObj } = useLanguage();

  // Selected tool index state
  const [expandedTool, setExpandedTool] = useState<number | null>(0);

  // Simulation outputs
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  // Inputs
  const [rawEntryText, setRawEntryText] = useState('Paid 45,000 DZD cash for stationery including 19% VAT to office supplies supplier in Alger.');
  const [selectedMockPdf, setSelectedMockPdf] = useState('invoice_or_0982.pdf');
  const [monthlySales, setMonthlySales] = useState('4,500,000');
  const [monthlyStaffPayroll, setMonthlyStaffPayroll] = useState('1,200,000');
  const [rawBalanceState, setRawBalanceState] = useState('Debit Ledger: 14,800,000 DZD | Credit Ledger: 14,850,000 DZD');
  const [smeForecastText, setSmeForecastText] = useState('Improve cash flow margins for a food production factory in Blida.');

  const toolsList = [
    {
      id: 0,
      title: { ar: "مولد القيود المحاسبية التلقائي", fr: "Auto Journal Entry Generator", en: "Auto Journal Entry Generator" },
      desc: { ar: "حول نصوص المعاملات النثرية إلى قيود محاسبية ثنائية متوافقة مباشرة مع النطام المحاسبي المالي الجزائري.", fr: "Convertit vos notes de frais en écritures de double-partie réglementaires conformes au SCF algérien.", en: "Converts plain text business expenditures into dual-ledger journal entries compliant with the Algerian SCF." },
      icon: Sparkles,
      color: "bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
    },
    {
      id: 1,
      title: { ar: "محلل الفواتير الذكي وعلامات المدفوعات", fr: "OCR Invoice Receipt Parser", en: "OCR Invoice Receipt Parser" },
      desc: { ar: "التقاط أرقام النيف NIF والتصاريح الجبائية وعجز الحساب وقيمة الضرائب من الصور والملفات تلقائياً.", fr: "Extraction automatisée des NIF, TVA, ICE et montants TTC à partir des scans PDF d'achats locaux.", en: "Automated extraction of local Algerian Supplier NIF, VAT brackets, and final cash sums from PDF scans." },
      icon: FileText,
      color: "bg-[#12182B] border-white/5 text-teal-400"
    },
    {
      id: 2,
      title: { ar: "محاكي احتساب معدلات ضرائب G50", fr: "Algerian G50 Tax Formula Simulator", en: "Algerian G50 Tax Formula Simulator" },
      desc: { ar: "توليد تلقائي لتقديرات TAP ورسوم الطوابع واقتطاعات الأجور عير خوارزمية ذكية مطابقة لقانون المالية.", fr: "Modélisation des taxes TAP (1.5%/1%), de l'IRG sur salaires et droits de douanes en temps réel.", en: "Live estimation of G50 monthly Turn-over tax (TAP), wage withholdings (IRG), and VAT rates under modern Finance Acts." },
      icon: Database,
      color: "bg-[#12182B] border-white/5 text-amber-400"
    },
    {
      id: 3,
      title: { ar: "مكشاف ثغرات موازين المراجعة والأخطاء", fr: "Trial Balance Audit Scan", en: "Trial Balance Audit Scan" },
      desc: { ar: "مراجعة كشوف الأرباح والمخازن والتحقق من التناسق الحسابي للوقاية من تعديل الضرائب المفاجئ.", fr: "Révélateur automatisé d'écarts de débit/crédit et de comptes d'attente anormaux.", en: "Schedules automated checking of client trial balance ledgers for unbacked debits, suspicious suspense flows, or miscoded credits." },
      icon: ShieldAlert,
      color: "bg-[#12182B] border-white/5 text-rose-400"
    },
    {
      id: 4,
      title: { ar: "محلل مالي للشركات الصاعدة", fr: "AI Executive Strategic Analyst", en: "AI Executive Strategic Analyst" },
      desc: { ar: "استشارات مالية مخصصة لتحسين التكاليف وتحقيق الاستقرار تتماشى مع طبيعة النشاط التجاري والمقر.", fr: "Génération de diagnostics de trésorerie sur-mesure et d'opportunités d'optimisation d'impôts.", en: "Tailored strategic reports mapping operating cash flow optimization and active tax credit schemes for SME sectors." },
      icon: Cpu,
      color: "bg-[#12182B] border-white/5 text-sky-400"
    },
    {
      id: 5,
      title: { ar: "صندوق تبادل الملفات الآمن المشفر", fr: "Secure Encrypted Document Locker", en: "Secure Encrypted Document Locker" },
      desc: { ar: "آلية لتبادل الوثائق المحاسبية مع الخبراء والشركاء بتشفير كامل يضمن سرية الأرقام والمكاسب.", fr: "Coffre-fort d'échange de liasses de clôture chiffrées à destination directe de votre expert.", en: "Encrypted upload locker to dispatch sensitive PDF balance sheets to your assigned accounting cabinet." },
      icon: Eye,
      color: "bg-[#12182B] border-white/5 text-purple-400"
    }
  ];

  const handleRunSimulation = (toolId: number) => {
    setIsProcessing(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      
      if (toolId === 0) {
        setSimulationResult(`[COMPLIANT DOUBLE-ENTRY LEDGER GENERATED (SCF ALGERIA)]
Date: 2026-05-22 | Status: Audited-Draft

DEBIT LINES:
- Class 6 (Compte 607 - Achats de fournitures stockables): 37,815 DZD
- Class 4 (Compte 4456 - TVA récupérable sur autres biens & services): 7,185 DZD (19% VAT Bracket)

CREDIT LINES:
- Class 5 (Compte 53 - Caisse nationale liquidités): 45,000 DZD

[Narrative]: Registration of office suppliers receipts under SCF rules. Matching tax offset voucher generated.`);
      } else if (toolId === 1) {
        setSimulationResult(`[AI OCR SCAN DIAGNOSTIC REPORT: ${selectedMockPdf}]
- Document Type: Standard Supplier Expense Invoice
- Vendor Name: Sarl Mitidja Carton Algerie (HQ: Blida)
- Supplier NIF Detected: 001209043224190 (VERIFIED ON DGI REGISTER)
- Date: 2026-04-10
- Base Amount (HT): 500,000 DZD
- VAT rate: 19% (Compte 445) -> 95,000 DZD
- Total Amount (TTC): 595,000 DZD
- Match Confidence: 99.4% (AccoNet OCR Anchor V2)`);
      } else if (toolId === 2) {
        const sales = Number(monthlySales.replace(/,/g, '')) || 4500000;
        const payroll = Number(monthlyStaffPayroll.replace(/,/g, '')) || 1200000;
        const tap = Math.round(sales * 0.015);
        const irgSim = Math.round(payroll * 0.18);
        const totalTaxOutflow = tap + irgSim;

        setSimulationResult(`[G50 MONTHLY RETURN CALCULATION PREVIEW]
Turnover Range (Sales HT): ${sales.toLocaleString()} DZD
Staff Salary Register: ${payroll.toLocaleString()} DZD

ESTIMATED FISCAL LEVY CODES (Algeria Finance Act):
- Code Impôt 101 (TAP - Taxe sur l'Activité Professionnelle @ 1.5%): ${tap.toLocaleString()} DZD
- Code Impôt 110 (IRG Salaires avec barème forfaitaire): ${irgSim.toLocaleString()} DZD
- Tax Timbre (Stamp Duty / Cash payments CAP): 2,500 DZD
-----------------------------------------------------------
PROJECTED G50 OUTFLOW: ${totalTaxOutflow.toLocaleString()} DZD

*Note: For companies holding the "Startup Label", the TAP levy (Code 101) code drops to 0 DZD.`);
      } else if (toolId === 3) {
        setSimulationResult(`[SCF TRIAL BALANCE VERIFICATION SCAN]
Status: CRITICAL EXCESS DETECTED

DIAGNOSIS MATCH FAIL:
Total Debit Sum: 14,800,000 DZD
Total Credit Sum: 14,850,000 DZD
Variance detected: -50,000 DZD (Unmatched Balance Account)

CORRECTION VOUCHER RECOMMENDED:
"Suspense Balance Account (Compte 47100)" registered an outstanding credit of 50,000 DZD. Check for unrecorded banking deposits or uncleared G50 vouchers at Algerian Treasury.`);
      } else if (toolId === 4) {
        setSimulationResult(`[AI FINANCIAL STRATEGIC ACTION MEMO]
Core Directive: "${smeForecastText}"

LOCAL RECOMMENDATIONS:
1. Agriculture Tax Shield: Agriculture and transformation facilities in Blida benefit from a 10-year IBS/IRG tax holiday. Validate exemption files under Code IBS 54.
2. VAT Cash Exemption: Apply for local VAT buy-back exemptions (fardeau fiscal) for capital machinery to preserve immediate liquidity reserves.
3. Payroll CNAS Relief: Benefit from the national employment active premium (ANEM) which reduces employer CNAS wage cost contribution by up to 30% for newly contracted local graduates.`);
      } else if (toolId === 5) {
        setSimulationResult(`[SHA-256 DOCUMENT DECK ENVELOPE SEALED]
- File name: financial_statement_draft_2026.pdf
- Content Hash: f736ac2913fbcde09a82bbef7eefb3a2a61c
- Encryption Cipher: AES-256 Symmetric Locker
- Target recipient: Cabinet Partner Sofiane Benamara (AccorNet Verified Pro)

[Status]: Sealed. Dispatching encrypted relay envelope. Ready for cabinet assessment.`);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100" id="tools_page_wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-10">
        
        {/* Title Header */}
        <div className="glass p-6 sm:p-8 rounded-2xl text-center space-y-4 border border-white/5 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-spin text-brand-primary" />
            <span>{t('interactiveSandboxEngine')}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight leading-none mt-1">
            {t('aiToolsHeroTitle')}
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('aiToolsHeroSub')}
          </p>
        </div>

        {/* Grid Layout containing tools & live simulator outputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (col-span-5) - The Tool Cards */}
          <div className="lg:col-span-5 space-y-3.5 text-left rtl:text-right">
            {toolsList.map((tool) => {
              const Icon = tool.icon;
              const isExpanded = expandedTool === tool.id;

              return (
                <div 
                  key={tool.id}
                  onClick={() => {
                    setExpandedTool(tool.id);
                    setSimulationResult(null);
                  }}
                  className={`border rounded-xl p-5 cursor-pointer transition-all duration-200 ${isExpanded ? 'bg-[#12182B] border-brand-primary/50 shadow-glow ring-1 ring-brand-primary/10' : 'bg-[#12182B]/60 border-white/5 hover:bg-[#12182B] hover:border-white/10'}`}
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center shrink-0 ${tool.color}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="font-serif font-bold text-white text-xs sm:text-sm">{tObj(tool.title)}</h3>
                    </div>
                    
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>

                  <p className="text-slate-400 text-[11px] sm:text-xs leading-normal">
                    {tObj(tool.desc)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column (col-span-7) - Live Simulation Interactive Control Window */}
          <div className="lg:col-span-7 bg-[#12182B] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-classic space-y-6 sticky top-24 text-left rtl:text-right">
            
            {expandedTool !== null ? (
              <>
                {/* Dynamic Action Header depending on tool */}
                <div className="pb-4 border-b border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif font-black text-brand-primary text-sm sm:text-base leading-none">
                      ⚙️ {t('activeSimulator')}: {tObj(toolsList[expandedTool].title)}
                    </h2>
                    <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-1 uppercase">{t('complianceSandboxEngineSub')}</p>
                  </div>
                  <span className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-2.5 py-1 rounded font-mono tracking-wider">{t('scfVersionLabel')}</span>
                </div>

                {/* Dynamic input widgets depending on selected tool */}
                <div className="space-y-4 font-sans text-xs">
                  
                  {/* TOOL 0 INPUT */}
                  {expandedTool === 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('businessExpNarrative')}</label>
                      <textarea
                        rows={3}
                        value={rawEntryText}
                        onChange={(e) => setRawEntryText(e.target.value)}
                        className="w-full border border-white/10 p-3 rounded-lg text-xs text-white bg-slate-900/40 focus:outline-none focus:border-brand-primary resize-none"
                      />
                    </div>
                  )}

                  {/* TOOL 1 INPUT */}
                  {expandedTool === 1 && (
                    <div className="space-y-3">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('chooseVoucherScan')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {['invoice_or_0982.pdf', 'gas_sonelgaz_9918.pdf', 'anem_employ_charges.pdf'].map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setSelectedMockPdf(f)}
                            className={`p-2.5 text-[10px] border rounded-lg font-mono text-center cursor-pointer transition ${selectedMockPdf === f ? 'bg-brand-primary/10 border-brand-primary text-brand-primary font-bold' : 'border-white/5 hover:glass/5 text-slate-400'}`}
                          >
                            📄 {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TOOL 2 INPUT */}
                  {expandedTool === 2 && (
                    <div className="space-y-3">
                      <p className="text-[11px] text-brand-primary bg-brand-primary/10 p-2.5 border border-brand-primary/20 font-mono rounded-lg">{t('inputTurnoverStats')}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('monthlySalesHt')}</label>
                          <input 
                            type="text" 
                            value={monthlySales}
                            onChange={(e) => setMonthlySales(e.target.value)}
                            className="w-full border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono bg-slate-900/40 focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('staffPayrollDzd')}</label>
                          <input 
                            type="text" 
                            value={monthlyStaffPayroll}
                            onChange={(e) => setMonthlyStaffPayroll(e.target.value)}
                            className="w-full border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono bg-slate-900/40 focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TOOL 3 INPUT */}
                  {expandedTool === 3 && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest text-left">{t('currentTrialBalanceValues')}</label>
                      <input 
                        type="text" 
                        value={rawBalanceState}
                        onChange={(e) => setRawBalanceState(e.target.value)}
                        className="w-full border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono bg-slate-900/40 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  )}

                  {/* TOOL 4 INPUT */}
                  {expandedTool === 4 && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block text-left">{t('smeStrategicImperative')}</label>
                      <input 
                        type="text" 
                        value={smeForecastText}
                        onChange={(e) => setSmeForecastText(e.target.value)}
                        className="w-full border border-white/10 rounded-lg px-3 py-2 text-xs text-white bg-slate-900/40 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  )}

                  {/* TOOL 5 INPUT */}
                  {expandedTool === 5 && (
                    <div className="bg-slate-900/45 border border-white/5 rounded-lg p-6 text-center space-y-2">
                      <span className="text-xl">🔒</span>
                      <p className="text-xs font-bold text-white">financial_statement_draft_2026.pdf</p>
                      <p className="text-[10px] text-slate-500 font-mono">{t('fileSizeLockerCapsule')}</p>
                    </div>
                  )}

                  {/* Simulator Trigger Button */}
                  <button
                    onClick={() => handleRunSimulation(expandedTool)}
                    disabled={isProcessing}
                    className="w-full py-3 bg-brand-primary hover:bg-brand-dark disabled:bg-slate-800 text-slate-950 font-mono font-bold uppercase tracking-widest rounded-lg text-xs cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>{t('processingLedgerParams')}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-slate-950 text-slate-950 shrink-0" />
                        <span>{t('executeSimulation')}</span>
                      </>
                    )}
                  </button>

                </div>

                {/* OUTPUT WINDOW CONTAINER */}
                <div className="pt-6 border-t border-white/5 space-y-2.5">
                  <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">{t('simulatedOutput')}</h3>
                  
                  {simulationResult ? (
                    <div className="bg-slate-950 text-brand-primary font-mono p-4 rounded-xl text-xs overflow-x-auto border border-white/5 leading-relaxed whitespace-pre-wrap min-h-[160px] text-left">
                      {simulationResult}
                    </div>
                  ) : (
                    <div className="bg-slate-900/20 border border-dashed border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center text-slate-500 min-h-[160px]">
                      <Info className="w-5 h-5 text-brand-primary/30 mb-1 shrink-0" />
                      <p className="text-xs font-sans">{t('provideTransactionInstructions')}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-slate-500 space-y-3 font-mono">
                <span className="text-3xl">💻</span>
                <p className="text-xs leading-relaxed">{t('selectScfTerminalModule')}</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
