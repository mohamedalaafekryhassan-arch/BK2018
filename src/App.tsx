import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Activity, 
  MapPin, 
  Wallet, 
  Settings, 
  TrendingUp, 
  Globe, 
  Download, 
  LogOut,
  ChefHat,
  Users,
  Cpu,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { TabType, Language, Role } from './types';
import { TRANSLATIONS, BRANCHES, PAYROLL_DATA } from './constants';
import { useLiveOps } from './hooks/useLiveOps';
import { cn } from './lib/utils';

// --- Components ---

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={cn("flex items-center text-xs font-bold", trend > 0 ? "text-green-600" : "text-red-600")}>
          {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
    </div>
  </motion.div>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [lang, setLang] = useState<Language>('ar');
  const [wasteLevel, setWasteLevel] = useState(5);
  const [aiRole, setAiRole] = useState<Role>(Role.CHEF);
  const [aiMonths, setAiMonths] = useState(1);
  const [syncLogs, setSyncLogs] = useState<string[]>(['> [SYSTEM] Dashboard Ready for 2026 Sync.']);
  const [isSyncing, setIsSyncing] = useState(false);

  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlertData, setNewAlertData] = useState({
    type: 'Warning' as any,
    message: '',
    messageEn: '',
    branch: BRANCHES[0].nameEn
  });

  const { orders, alerts, counts, addAlert } = useLiveOps();
  const t = TRANSLATIONS[lang];

  const handleAddAlert = () => {
    addAlert(newAlertData);
    setShowAddAlert(false);
    setNewAlertData({
      type: 'Warning',
      message: '',
      messageEn: '',
      branch: BRANCHES[0].nameEn
    });
  };

  const handleLogin = () => {
    if (pin === '3130') {
      setIsLoggedIn(true);
    } else {
      alert(t.invalidPin);
    }
  };

  const runSync = async () => {
    setIsSyncing(true);
    const logs = [
      "> [PIPELINE] Auth with Foodics API Success.",
      "> [SYNC] Fetching Branch #001 (Nasr City) Sales...",
      "> [SYNC] Fetching Branch #004 (Zahraa) Inventory...",
      "> [TRANSFORM] Mapping SKU to G-Sheets format...",
      "> [PUSH] Uploading to Google Sheets ID: BK-MASTER-2026",
      "> [OK] Sync Completed. P&L updated."
    ];

    for (const log of logs) {
      await new Promise(r => setTimeout(r, 1000));
      setSyncLogs(prev => [...prev, log]);
    }
    setIsSyncing(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-sm w-full border border-amber-100"
        >
          <div className="flex flex-col items-center mb-8">
            <span className="text-6xl mb-4">🥐</span>
            <div className="flex items-center gap-1 text-black font-black tracking-tighter">
              <span className="text-xl font-bold mt-4">20</span>
              <span className="text-8xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-3px' }}>Bk</span>
              <span className="text-xl font-bold mt-4">18</span>
            </div>
            <p className="text-[10px] text-amber-600 font-bold mt-2 tracking-[0.2em] uppercase">{t.roleTitle}</p>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.loginTitle}</h2>
          
          <div className="space-y-4">
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••" 
              className="w-full text-center p-4 bg-slate-100 border-0 rounded-2xl focus:ring-2 focus:ring-amber-500 text-2xl tracking-[1em] outline-none"
            />
            <button 
              onClick={handleLogin}
              className="w-full bg-bakery-amber text-white font-bold py-4 rounded-2xl hover:bg-amber-700 transition-all shadow-lg active:scale-95"
            >
              {t.btnLogin}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm h-[10vh] min-h-[70px] flex items-center">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center gap-2">
          <div className="flex flex-col items-center leading-none shrink-0">
            <div className="flex items-center gap-1 text-black font-black tracking-tighter">
              <span className="text-[8px] font-bold mt-1">20</span>
              <span className="text-xl" style={{ fontFamily: 'Georgia, serif' }}>Bk</span>
              <span className="text-[8px] font-bold mt-1">18</span>
            </div>
            <div className="w-6 h-0.5 bg-bakery-amber rounded-full mt-0.5"></div>
          </div>

          <nav className="flex bg-slate-100 p-1 rounded-xl gap-0.5 overflow-x-auto no-scrollbar max-w-[60%] sm:max-w-none">
            {[
              { id: 'overview', icon: LayoutDashboard, label: t.navOverview },
              { id: 'live', icon: Activity, label: t.navLive, pulse: true },
              { id: 'branches', icon: MapPin, label: t.navBranches },
              { id: 'financials', icon: Wallet, label: t.navFinancials },
              { id: 'operations', icon: Settings, label: t.navOperations },
              { id: 'market', icon: TrendingUp, label: t.navMarket },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-all flex items-center gap-1.5 whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-bakery-amber text-white shadow-sm" 
                    : "text-slate-500 hover:text-bakery-amber"
                )}
              >
                {tab.pulse && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                <tab.icon className="w-3 h-3" />
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="bg-slate-800 text-white p-2 rounded-lg text-[9px] font-bold flex items-center justify-center"
            >
              <Globe className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-slate-100 text-slate-600 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border-r-8 border-bakery-amber flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-slate-900 mb-3">{t.welcomeMsg}</h2>
                  <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">{t.overviewText}</p>
                </div>
                <div className="flex gap-6">
                  <div className="bg-amber-50 p-6 rounded-3xl text-center border border-amber-100 min-w-[120px]">
                    <span className="text-4xl font-black text-bakery-amber">6</span>
                    <p className="text-xs text-amber-600 font-bold uppercase mt-1">{t.lblBranches}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-3xl text-center border border-green-100 min-w-[120px]">
                    <span className="text-4xl font-black text-green-700">92%</span>
                    <p className="text-xs text-green-600 font-bold uppercase mt-1">{t.lblEfficiency}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard 
                  title={t.cardSupply} 
                  value="80%" 
                  icon={ChefHat} 
                  trend={+12} 
                  color="bg-amber-100 text-amber-700" 
                />
                <StatCard 
                  title={t.cardLabor} 
                  value="91%" 
                  icon={Users} 
                  trend={-2} 
                  color="bg-green-100 text-green-700" 
                />
                <StatCard 
                  title={t.cardTech} 
                  value="100%" 
                  icon={Cpu} 
                  color="bg-blue-100 text-blue-700" 
                />
              </div>

              <div className="bg-white border border-red-100 rounded-[2rem] p-8 h-[450px] flex flex-col shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-red-700 text-sm font-bold flex items-center gap-3">
                      <AlertCircle className="w-5 h-5" />
                      {t.liveAlerts}
                    </h4>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAddAlert(true)}
                      className="bg-red-600 text-white p-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center gap-2"
                    >
                      <Activity className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Report</span>
                    </motion.button>
                  </div>
                  
                  <div className="overflow-y-auto flex-grow space-y-4 custom-scrollbar pr-1">
                    {alerts.map((alert) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={alert.id} 
                        onClick={() => setSelectedAlert(alert)}
                        className={cn(
                          "p-4 rounded-2xl border-r-4 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors",
                          alert.type === 'Error' ? "bg-red-50/50 border-red-500 text-red-800" : "bg-amber-50/50 border-amber-500 text-amber-800"
                        )}
                      >
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">[{alert.branch}]</p>
                          <p className="text-sm font-medium line-clamp-1">{lang === 'ar' ? alert.message : alert.messageEn}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Alert Details Modal Backdrop */}
                  <AnimatePresence>
                    {(selectedAlert || showAddAlert) && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { setSelectedAlert(null); setShowAddAlert(false); }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
                      />
                    )}
                  </AnimatePresence>

                  {/* Alert Details Modal */}
                  <AnimatePresence>
                    {selectedAlert && (
                      <motion.div 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="ios-bottom-sheet h-[80vh] p-8 flex flex-col"
                      >
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
                        <div className="flex justify-between items-center mb-6">
                          <h5 className="text-xl font-black text-slate-900">Incident Details</h5>
                          <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-slate-600">
                            <LogOut className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
                          <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Branch</p>
                            <p className="font-bold text-slate-800">{selectedAlert.branch}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Severity</p>
                            <span className={cn(
                              "text-xs font-black px-2 py-1 rounded-lg",
                              selectedAlert.type === 'Error' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                            )}>{selectedAlert.type}</span>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Message</p>
                            <p className="font-medium text-slate-800">{lang === 'ar' ? selectedAlert.message : selectedAlert.messageEn}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Timestamp</p>
                            <p className="font-mono text-xs text-slate-600">{selectedAlert.timestamp.toLocaleString()}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedAlert(null)}
                          className="mt-6 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold"
                        >
                          Close Report
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Add Alert Modal */}
                  <AnimatePresence>
                    {showAddAlert && (
                      <motion.div 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="ios-bottom-sheet h-[85vh] p-8 flex flex-col"
                      >
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />
                        <div className="flex justify-between items-center mb-6">
                          <h5 className="text-xl font-black text-slate-900">Report Incident</h5>
                          <button onClick={() => setShowAddAlert(false)} className="text-slate-400 hover:text-slate-600">
                            <LogOut className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Severity</label>
                            <div className="flex gap-2">
                              {['Error', 'Warning', 'Info'].map(type => (
                                <button 
                                  key={type}
                                  onClick={() => setNewAlertData({...newAlertData, type: type as any})}
                                  className={cn(
                                    "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                                    newAlertData.type === type ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-slate-100 text-slate-500"
                                  )}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Branch</label>
                            <select 
                              value={newAlertData.branch}
                              onChange={(e) => setNewAlertData({...newAlertData, branch: e.target.value})}
                              className="w-full p-4 bg-slate-100 rounded-xl text-xs font-bold outline-none appearance-none"
                            >
                              {BRANCHES.map(b => <option key={b.id} value={b.nameEn}>{b.nameEn}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Message (AR)</label>
                            <input 
                              type="text"
                              value={newAlertData.message}
                              onChange={(e) => setNewAlertData({...newAlertData, message: e.target.value})}
                              className="w-full p-4 bg-slate-100 rounded-xl text-xs font-bold outline-none"
                              placeholder="وصف المشكلة بالعربية"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Message (EN)</label>
                            <input 
                              type="text"
                              value={newAlertData.messageEn}
                              onChange={(e) => setNewAlertData({...newAlertData, messageEn: e.target.value})}
                              className="w-full p-4 bg-slate-100 rounded-xl text-xs font-bold outline-none"
                              placeholder="Incident description in English"
                            />
                          </div>
                        </div>
                        <button 
                          onClick={handleAddAlert}
                          className="mt-6 w-full bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 shadow-lg shadow-red-200"
                        >
                          Submit Alert
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </motion.div>
          )}

          {activeTab === 'live' && (
            <motion.div 
              key="live"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Foodics Online', value: counts.foodics, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Talabat', value: counts.talabat, color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'Breadfast', value: counts.breadfast, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                  { label: 'Social DM', value: counts.insta, color: 'text-pink-600', bg: 'bg-pink-50' },
                ].map((stat) => (
                  <div key={stat.label} className={cn("p-6 rounded-3xl text-center border border-slate-100", stat.bg)}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <span className={cn("text-4xl font-black", stat.color)}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-slate-900 rounded-[2rem] p-8 h-[500px] flex flex-col shadow-xl">
                  <h4 className="text-white text-sm font-bold mb-6 flex items-center gap-3">
                    <Activity className="w-5 h-5 text-bakery-amber" />
                    {t.liveOrders}
                  </h4>
                  <div className="overflow-y-auto flex-grow space-y-3 custom-scrollbar">
                    {orders.map((order) => (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={order.id} 
                        className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-mono">#{order.id}</span>
                          <span className="text-xs text-white font-bold">{order.platform}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-bakery-amber font-black block">{order.branch}</span>
                          <span className="text-[10px] text-slate-500">{order.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'branches' && (
            <motion.div 
              key="branches"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {BRANCHES.map((branch) => (
                <motion.div 
                  whileHover={{ y: -5 }}
                  key={branch.id} 
                  className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:border-bakery-amber transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className={cn(
                      "text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest",
                      branch.type === 'Resi-Com' ? "bg-amber-100 text-amber-800" : 
                      branch.type === 'Chillout' ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                    )}>
                      {branch.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">#{branch.id}</span>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">{lang === 'ar' ? branch.name : branch.nameEn}</h4>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{lang === 'ar' ? branch.address : branch.addressEn}</p>
                  
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Settings className="w-4 h-4 text-slate-400" />
                      {branch.hours}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-black text-green-600 uppercase tracking-widest">{t.active}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'financials' && (
            <motion.div 
              key="financials"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <Wallet className="w-6 h-6 text-bakery-amber" />
                      {t.titlePayroll}
                    </h3>
                    <div className="overflow-x-auto mb-10 rounded-2xl border border-slate-100">
                      <table className="w-full text-sm text-right">
                        <thead className="bg-slate-50 text-slate-400">
                          <tr>
                            <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Role</th>
                            <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Training (3 Mo)</th>
                            <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Standard Salary</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {Object.entries(PAYROLL_DATA).map(([role, data]) => (
                            <tr key={role} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 font-bold text-slate-700">{role}</td>
                              <td className="p-4 text-bakery-amber font-mono font-bold">{data.training.toLocaleString()} ج.م</td>
                              <td className="p-4 font-mono font-bold">{data.standard.toLocaleString()} ج.م</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
                      <h4 className="text-xs font-bold mb-6 text-bakery-amber flex items-center gap-3 uppercase tracking-[0.2em]">
                        <Cpu className="w-5 h-5" />
                        {t.sunkCost}
                      </h4>
                      <div className="flex gap-4 mb-6">
                        <select 
                          value={aiRole}
                          onChange={(e) => setAiRole(e.target.value as Role)}
                          className="bg-slate-800 text-xs p-4 rounded-2xl flex-1 border-0 focus:ring-2 focus:ring-bakery-amber outline-none"
                        >
                          {Object.keys(PAYROLL_DATA).map(role => <option key={role} value={role}>{role}</option>)}
                        </select>
                        <select 
                          value={aiMonths}
                          onChange={(e) => setAiMonths(Number(e.target.value))}
                          className="bg-slate-800 text-xs p-4 rounded-2xl flex-1 border-0 focus:ring-2 focus:ring-bakery-amber outline-none"
                        >
                          <option value="1">Resigned @ Month 1</option>
                          <option value="2">Resigned @ Month 2</option>
                          <option value="3">Resigned @ Month 3</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => {}} // Logic handled by derived state
                        className="w-full bg-bakery-amber py-4 rounded-2xl font-black text-xs hover:bg-amber-600 transition-all shadow-lg active:scale-95"
                      >
                        {t.calculate}
                      </button>
                      <div className="flex justify-between items-center border-t border-slate-700 mt-6 pt-6">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.impact}:</span>
                        <span className="text-3xl font-black text-red-500">
                          {((PAYROLL_DATA[aiRole].training * aiMonths) + (3000 * aiMonths)).toLocaleString()} ج.م
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 shadow-inner">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-black text-amber-900 text-lg">{t.wasteTitle}</h4>
                        <span className="text-2xl font-black text-red-600">{wasteLevel}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={wasteLevel}
                        onChange={(e) => setWasteLevel(Number(e.target.value))}
                        className="w-full accent-bakery-amber h-2.5 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="mt-8 flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest mb-1">Est. Monthly Profit Delta</p>
                          <p className={cn(
                            "text-4xl font-black",
                            (5 - wasteLevel) * 12000 >= 0 ? "text-green-700" : "text-red-700"
                          )}>
                            {((5 - wasteLevel) * 12000).toLocaleString()} ج.م
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'COGS', value: 35 },
                              { name: 'Labor', value: 20 },
                              { name: 'OpEx', value: 25 },
                              { name: 'Profit', value: 20 },
                            ]}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {['#d97706', '#3b82f6', '#94a3b8', '#10b981'].map((color, index) => (
                              <Cell key={`cell-${index}`} fill={color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                          <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'market' && (
            <motion.div 
              key="market"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100"
            >
              <h3 className="text-3xl font-black text-slate-900 mb-10">Market Competitive Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                      { subject: 'Price', A: 80, B: 70, fullMark: 100 },
                      { subject: 'Quality', A: 90, B: 80, fullMark: 100 },
                      { subject: 'Variety', A: 85, B: 90, fullMark: 100 },
                      { subject: 'Digital', A: 70, B: 100, fullMark: 100 },
                      { subject: 'Delivery', A: 90, B: 80, fullMark: 100 },
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Bakery Khan" dataKey="A" stroke="#d97706" fill="#d97706" fillOpacity={0.6} />
                      <Radar name="Competitors" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-8">
                  <div className="bg-purple-50 p-8 rounded-[2rem] border border-purple-100 shadow-sm">
                    <h5 className="font-black text-purple-900 text-xl mb-4 flex items-center gap-3">
                      <TrendingUp className="w-6 h-6" />
                      {t.seyamiTitle}
                    </h5>
                    <p className="text-purple-700 leading-relaxed text-lg">{t.seyamiText}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">TOP SELLER</p>
                      <p className="text-lg font-black text-slate-800">سماش برجر كرواسون</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">CATERING</p>
                      <p className="text-lg font-black text-slate-800">بوكس ميني ساندوتش</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'operations' && (
            <motion.div 
              key="operations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100"
            >
              <h3 className="text-3xl font-black text-slate-900 mb-10">{t.syncTitle}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-blue-50 border border-blue-100 rounded-[2rem] flex justify-between items-center group cursor-pointer"
                  >
                    <div>
                      <h5 className="font-black text-xl text-blue-900">Foodics Menu Bulk Upload</h5>
                      <p className="text-sm text-blue-600 mt-1">Full SKU mapping with localized names (Ar/En).</p>
                    </div>
                    <Download className="w-8 h-8 text-blue-400 group-hover:translate-y-1 transition-transform" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-green-50 border border-green-100 rounded-[2rem] flex justify-between items-center group cursor-pointer"
                  >
                    <div>
                      <h5 className="font-black text-xl text-green-900">Inventory Sync Template</h5>
                      <p className="text-sm text-green-600 mt-1">Ready for Foodics raw materials updates.</p>
                    </div>
                    <Download className="w-8 h-8 text-green-400 group-hover:translate-y-1 transition-transform" />
                  </motion.div>
                </div>
                
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl border border-amber-900/20">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs font-bold tracking-[0.3em] text-bakery-amber uppercase">G-Sheets Pipeline</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] text-slate-500 font-mono tracking-widest">API STATUS: ONLINE</span>
                    </div>
                  </div>
                  <div className="bg-black/50 p-6 rounded-2xl terminal-text h-48 overflow-y-auto mb-8 border border-slate-800 custom-scrollbar">
                    {syncLogs.map((log, i) => (
                      <div key={i} className="text-emerald-400 mb-1">{log}</div>
                    ))}
                  </div>
                  <button 
                    onClick={runSync}
                    disabled={isSyncing}
                    className={cn(
                      "w-full py-5 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3",
                      isSyncing ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-bakery-amber text-white hover:bg-amber-500"
                    )}
                  >
                    {isSyncing ? <Activity className="w-5 h-5 animate-spin" /> : <Settings className="w-5 h-5" />}
                    {isSyncing ? "SYNCING..." : t.startSync}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-100 py-6 px-6">
        <div className="container mx-auto flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <span>Bakery Khan © 2026</span>
          <div className="flex gap-6">
            <span>Powered by F&B Master Engine</span>
            <span>v3.1.3</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
