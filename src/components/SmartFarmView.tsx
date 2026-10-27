import React, { useState } from 'react';
import { 
  Sprout, 
  Activity, 
  BookOpen, 
  Scissors, 
  Droplets, 
  Thermometer, 
  Wind, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Calendar, 
  Clock, 
  Sun, 
  Layers, 
  RefreshCw,
  Sparkles,
  TrendingUp,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { SmartFarmSubTab, PondData, FarmJournalEntry, HarvestRecord } from '../types';

interface SmartFarmViewProps {
  initialSubTab?: SmartFarmSubTab;
  ponds: PondData[];
  journalEntries: FarmJournalEntry[];
  harvestRecords: HarvestRecord[];
  onAddJournalEntry: (entry: Omit<FarmJournalEntry, 'id'>) => void;
  onAddHarvestRecord: (record: Omit<HarvestRecord, 'id' | 'batchId'>) => void;
  onUpdatePond: (pondId: string, updates: Partial<PondData>) => void;
}

/* ---------- Penilaian status sensor dengan bahasa sederhana ---------- */
type Level = 'ok' | 'warn' | 'bad';
interface Reading { level: Level; text: string }

const phReading = (v: number): Reading => {
  if (v > 10.5) return { level: 'bad', text: 'Terlalu tinggi' };
  if (v < 9.0) return { level: 'bad', text: 'Terlalu rendah' };
  if (v > 10.2 || v < 9.3) return { level: 'warn', text: 'Mendekati batas' };
  return { level: 'ok', text: 'Aman' };
};
const tempReading = (v: number): Reading => {
  if (v > 35 || v < 30) return { level: 'bad', text: 'Di luar kisaran' };
  if (v > 34 || v < 31) return { level: 'warn', text: 'Mendekati batas' };
  return { level: 'ok', text: 'Aman' };
};

const LEVEL_STYLE: Record<Level, { box: string; value: string; badge: string }> = {
  ok:   { box: 'bg-slate-50',  value: 'text-slate-900',  badge: 'text-emerald-700' },
  warn: { box: 'bg-amber-50',  value: 'text-amber-800',  badge: 'text-amber-800' },
  bad:  { box: 'bg-rose-50',   value: 'text-rose-700',   badge: 'text-rose-700' },
};

const MetricCell: React.FC<{ label: string; value: string; hint: string; level?: Level }> = ({ label, value, hint, level = 'ok' }) => {
  const s = LEVEL_STYLE[level];
  return (
    <div className={`p-2.5 rounded-xl ${s.box} text-center`}>
      <p className="text-xs text-slate-500 font-medium leading-tight">{label}</p>
      <p className={`text-lg font-extrabold tabular ${s.value}`}>{value}</p>
      <p className={`text-[11px] font-semibold ${level === 'ok' ? 'text-slate-500' : s.badge}`}>{hint}</p>
    </div>
  );
};

interface TodoItem {
  id: string;
  level: Level;
  title: string;
  detail: string;
  actionLabel: string;
  run: () => void;
}

export const SmartFarmView: React.FC<SmartFarmViewProps> = ({
  initialSubTab = 'dashboard',
  ponds,
  journalEntries,
  harvestRecords,
  onAddJournalEntry,
  onAddHarvestRecord,
  onUpdatePond
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SmartFarmSubTab>(initialSubTab);
  const [selectedPondId, setSelectedPondId] = useState<string>(ponds[0]?.id || 'pond-a');

  // New Journal Entry Modal State
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [jPondId, setJPondId] = useState(ponds[0]?.id || 'pond-a');
  const [jActivity, setJActivity] = useState<FarmJournalEntry['activityType']>('Pemberian Nutrisi');
  const [jNutrients, setJNutrients] = useState('');
  const [jPh, setJPh] = useState(9.8);
  const [jTemp, setJTemp] = useState(31.5);
  const [jWeather, setJWeather] = useState<FarmJournalEntry['weather']>('Cerah Terik');
  const [jNotes, setJNotes] = useState('');
  const [jAuthor, setJAuthor] = useState('Ahmad Fauzi (Operator)');

  // New Harvest Modal State
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [hPondName, setHPondName] = useState(ponds[0]?.name || 'Kolam Raceway Alfa');
  const [hDate, setHDate] = useState('2026-09-20');
  const [hWetWeight, setHWetWeight] = useState(260);
  const [hDryWeight, setHDryWeight] = useState(26.0);
  const [hMeshSize, setHMeshSize] = useState('Filter Cloth Nilon 300 Mesh');
  const [hDryingMethod, setHDryingMethod] = useState('Solar Dome Hygienic Dehydrator (Temp: 40°C)');
  const [hGrade, setHGrade] = useState<HarvestRecord['qualityGrade']>('Grade A+');
  const [hOperator, setHOperator] = useState('Supriyanto');
  const [hStatus, setHStatus] = useState<HarvestRecord['status']>('Diuji Lab');

  const activePond = ponds.find((p) => p.id === selectedPondId) || ponds[0];

  // Quick Action Simulation for Pond Monitoring
  const handleAeratePond = (pondId: string) => {
    const current = ponds.find((p) => p.id === pondId);
    if (!current) return;
    const newRpm = current.paddleWheelRpm === 18 ? 24 : 18;
    const newDo = Math.min(12, Number((current.dissolvedOxygenMgL + 0.6).toFixed(1)));
    onUpdatePond(pondId, { paddleWheelRpm: newRpm, dissolvedOxygenMgL: newDo });
  };

  const handleAdjustPh = (pondId: string) => {
    const current = ponds.find((p) => p.id === pondId);
    if (!current) return;
    // Lower pH safely with bicarbonate / fresh Zarrouk balance
    const newPh = Number((Math.max(9.4, current.ph - 0.4)).toFixed(2));
    const newStatus = newPh <= 10.2 ? 'Optimal' : 'Perlu Perhatian';
    onUpdatePond(pondId, { ph: newPh, status: newStatus });
  };

  const handleSubmitJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPond = ponds.find(p => p.id === jPondId);
    onAddJournalEntry({
      pondId: jPondId,
      pondName: targetPond ? targetPond.name : 'Kolam Budidaya',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      activityType: jActivity,
      nutrientsAdded: jNutrients || 'Nutrisi standar Zarrouk harian',
      ph: Number(jPh),
      temp: Number(jTemp),
      weather: jWeather,
      notes: jNotes,
      author: jAuthor
    });
    setShowJournalModal(false);
    setJNotes('');
    setJNutrients('');
  };

  const handleSubmitHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    onAddHarvestRecord({
      pondName: hPondName,
      harvestDate: hDate,
      wetWeightKg: Number(hWetWeight),
      dryWeightKg: Number(hDryWeight),
      meshSizeUsed: hMeshSize,
      dryingMethod: hDryingMethod,
      qualityGrade: hGrade,
      operator: hOperator,
      status: hStatus
    });
    setShowHarvestModal(false);
  };

  // Calculate dashboard totals
  const totalBiomassEstimate = ponds.reduce((acc, p) => acc + p.estimatedBiomassKg, 0);
  const totalLiters = ponds.reduce((acc, p) => acc + p.volumeLiters, 0);
  const pondsReadyToHarvest = ponds.filter(p => p.estHarvestDays === 0).length;

  // Daftar tindakan yang perlu dilakukan petani sekarang
  const todos: TodoItem[] = ponds.flatMap((p): TodoItem[] => {
    const items: TodoItem[] = [];
    const goSensor = () => { setSelectedPondId(p.id); setActiveSubTab('monitoring'); };
    const ph = phReading(p.ph);
    const temp = tempReading(p.temperatureC);

    if (p.ph > 10.5) {
      items.push({
        id: `${p.id}-ph`, level: 'bad',
        title: `pH ${p.name} terlalu tinggi (${p.ph})`,
        detail: 'Batas aman 9,0 sampai 10,5. Tambahkan bikarbonat atau panen sebagian agar alga tidak stres.',
        actionLabel: 'Koreksi pH sekarang',
        run: () => handleAdjustPh(p.id)
      });
    } else if (p.ph < 9.0) {
      items.push({
        id: `${p.id}-ph`, level: 'bad',
        title: `pH ${p.name} terlalu rendah (${p.ph})`,
        detail: 'Batas aman 9,0 sampai 10,5. Periksa nutrisi dan aerasi, lalu ukur ulang.',
        actionLabel: 'Lihat sensor', run: goSensor
      });
    } else if (ph.level === 'warn') {
      items.push({
        id: `${p.id}-ph`, level: 'warn',
        title: `pH ${p.name} mendekati batas (${p.ph})`,
        detail: 'Masih aman, tetapi pantau lagi beberapa jam ke depan.',
        actionLabel: 'Lihat sensor', run: goSensor
      });
    }

    if (temp.level === 'bad') {
      items.push({
        id: `${p.id}-temp`, level: 'bad',
        title: `Suhu ${p.name} di luar kisaran (${p.temperatureC} °C)`,
        detail: 'Kisaran ideal 30 sampai 35 °C. Atur naungan dan aerasi.',
        actionLabel: 'Atur kincir', run: () => handleAeratePond(p.id)
      });
    } else if (temp.level === 'warn') {
      items.push({
        id: `${p.id}-temp`, level: 'warn',
        title: `Suhu ${p.name} mendekati batas atas (${p.temperatureC} °C)`,
        detail: 'Masih dalam kisaran ideal 30 sampai 35 °C. Siang hari bisa naik lagi, pertimbangkan naungan.',
        actionLabel: 'Lihat sensor', run: goSensor
      });
    }

    if (p.estHarvestDays === 0) {
      items.push({
        id: `${p.id}-harvest`, level: 'ok',
        title: `${p.name} siap dipanen`,
        detail: `Perkiraan biomassa ${p.estimatedBiomassKg} kg basah.`,
        actionLabel: 'Catat panen',
        run: () => { setHPondName(p.name); setActiveSubTab('harvest'); setShowHarvestModal(true); }
      });
    }
    return items;
  }).sort((a, b) => {
    const order: Record<Level, number> = { bad: 0, warn: 1, ok: 2 };
    return order[a.level] - order[b.level];
  });

  const badCount = todos.filter(t => t.level === 'bad').length;
  const warnCount = todos.filter(t => t.level === 'warn').length;
  const health = badCount > 0
    ? { label: 'Perlu tindakan', dot: 'bg-rose-500', note: `${badCount} masalah harus ditangani` }
    : warnCount > 0
    ? { label: 'Waspada', dot: 'bg-amber-500', note: `${warnCount} kolam mendekati batas` }
    : { label: 'Aman', dot: 'bg-emerald-500', note: 'Semua parameter dalam batas' };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Sub-Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Sprout className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">SmartFarm Spirulina</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Jurnal budidaya digital untuk mencatat panen, biaya, dan kualitas, sekaligus rekam jejak usaha untuk pengajuan pembiayaan syariah
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
            <button
              id="subtab-smartfarm-dashboard"
              onClick={() => setActiveSubTab('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'dashboard'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Ringkasan
            </button>

            <button
              id="subtab-smartfarm-monitoring"
              onClick={() => setActiveSubTab('monitoring')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'monitoring'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-teal-600" />
              Sensor Kolam
            </button>

            <button
              id="subtab-smartfarm-journal"
              onClick={() => setActiveSubTab('journal')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'journal'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Jurnal ({journalEntries.length})
            </button>

            <button
              id="subtab-smartfarm-harvest"
              onClick={() => setActiveSubTab('harvest')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'harvest'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              Catatan Panen ({harvestRecords.length})
            </button>
          </div>
        </div>
      </div>

      {/* ======================= SUBTAB 1: FARM DASHBOARD ======================= */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Pusat tindakan: hal yang perlu dilakukan sekarang */}
          <section aria-labelledby="todo-title" className="space-y-3">
            <h3 id="todo-title" className="font-display text-xl font-bold text-slate-900">
              {todos.length === 0 ? 'Tidak ada yang perlu ditangani' : 'Perlu Anda tangani sekarang'}
            </h3>
            {todos.length === 0 ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> Semua kolam dalam kondisi aman. Lanjutkan jadwal nutrisi seperti biasa.
              </div>
            ) : (
              <ul className="space-y-2.5">
                {todos.map((t) => (
                  <li key={t.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center gap-3 ${
                    t.level === 'bad' ? 'bg-rose-50 border-rose-200'
                    : t.level === 'warn' ? 'bg-amber-50 border-amber-200'
                    : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <span className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${
                      t.level === 'bad' ? 'bg-rose-100 text-rose-700' : t.level === 'warn' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {t.level === 'ok' ? <Scissors className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{t.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{t.detail}</p>
                    </div>
                    <button onClick={t.run} className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5">
                      {t.actionLabel} <ChevronRight className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Top Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Total Kolam Aktif</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">{ponds.length} Kolam</span>
              <span className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Kapasitas {totalLiters.toLocaleString('id-ID')} Liter Air
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Estimasi Biomassa Siap Panen</span>
              <span className="text-3xl font-black text-emerald-700 mt-1 block">{totalBiomassEstimate} kg</span>
              <span className="text-xs text-slate-500 mt-1 block">
                {pondsReadyToHarvest > 0 ? `${pondsReadyToHarvest} kolam siap panen hari ini` : 'Dalam masa inkubasi'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Rata-rata Produktivitas</span>
              <span className="text-3xl font-black text-teal-700 mt-1 block">12.4 g/m²/hr</span>
              <span className="text-xs text-teal-800 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +15% di atas rata-rata nasional
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Kondisi kolam</span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-3.5 h-3.5 rounded-full ${health.dot}`}></span>
                <span className="text-2xl font-black text-slate-900">{health.label}</span>
              </div>
              <span className="text-xs text-slate-500 mt-1 block">{health.note}</span>
            </div>
          </div>

          {/* Kolam Summary Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-emerald-600" />
                Status Kolam Raceway Saat Ini
              </h3>
              <button
                onClick={() => setActiveSubTab('monitoring')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Buka Monitor Sensor Lengkap →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ponds.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                        <span className="text-xs text-slate-500">{p.type} • {(p.volumeLiters / 1000).toFixed(0)} m³</span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        p.status === 'Optimal' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : p.status === 'Perlu Perhatian'
                          ? 'bg-amber-100 text-amber-900 font-extrabold'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100">
                      <MetricCell label="Keasaman (pH)" value={String(p.ph)} hint={phReading(p.ph).text} level={phReading(p.ph).level} />
                      <MetricCell label="Suhu air" value={`${p.temperatureC}°C`} hint={tempReading(p.temperatureC).text} level={tempReading(p.temperatureC).level} />
                      <MetricCell label="Kekeruhan (Secchi)" value={`${p.secchiDepthCm} cm`} hint={p.secchiDepthCm < 2.5 ? 'Sangat pekat' : 'Cukup pekat'} />
                      <MetricCell label="Kepadatan (OD680)" value={String(p.opticalDensity)} hint="Makin tinggi, makin padat" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                    <span className="text-slate-500">
                      Inokulasi: Hari ke-{p.daysSinceInoculation}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedPondId(p.id);
                        setActiveSubTab('monitoring');
                      }}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Pantau Sensor Kolam Ini →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 2: POND MONITORING ======================= */}
      {activeSubTab === 'monitoring' && (
        <div className="space-y-6">
          {/* Pond Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 shrink-0">Pilih Kolam:</span>
            {ponds.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPondId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedPondId === p.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {p.name} ({p.status})
              </button>
            ))}
          </div>

          {/* Active Pond Live Sensor Terminal */}
          {activePond && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-slate-900">{activePond.name}</h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                      {activePond.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Volume: {activePond.volumeLiters.toLocaleString('id-ID')} Liter • Pemberian Nutrisi Terakhir: {activePond.lastFedDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjustPh(activePond.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                    Koreksi Bikarbonat (pH)
                  </button>
                  <button
                    onClick={() => handleAeratePond(activePond.id)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Wind className="w-3.5 h-3.5" />
                    Atur Paddlewheel ({activePond.paddleWheelRpm} RPM)
                  </button>
                </div>
              </div>

              {/* 4 Big Sensor Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. pH Sensor */}
                <div className={`p-5 rounded-2xl border ${
                  activePond.ph > 10.5 
                    ? 'bg-amber-50/70 border-amber-300' 
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Derajat Keasaman (pH)</span>
                    <Droplets className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">{activePond.ph}</span>
                    <span className="text-xs text-slate-500 font-medium">/ 14.0</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600">
                    Batas Aman: <strong>9.0 - 10.5</strong>
                  </div>
                  {activePond.ph > 10.5 && (
                    <span className="text-[10px] text-amber-800 font-bold block mt-1">
                      pH tinggi: segera panen sebagian atau tambah NaHCO3
                    </span>
                  )}
                </div>

                {/* 2. Temperature Sensor */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Suhu Kolam</span>
                    <Thermometer className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">{activePond.temperatureC}</span>
                    <span className="text-xs text-slate-500 font-medium">°Celsius</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600">
                    Kisaran Ideal: <strong>30.0°C - 35.0°C</strong>
                  </div>
                </div>

                {/* 3. Secchi Disk Turbidity */}
                <div className="p-5 rounded-2xl border border-teal-200 bg-teal-50/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Kedalaman Secchi (Kepadatan)</span>
                    <Activity className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-teal-950">{activePond.secchiDepthCm}</span>
                    <span className="text-xs text-slate-500 font-medium">cm</span>
                  </div>
                  <div className="mt-2 text-[11px] text-teal-800 font-medium">
                    &lt; 2.5 cm menandakan biomassa sangat pekat
                  </div>
                </div>

                {/* 4. Optical Density OD680 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Densitas Optik (OD680)</span>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">{activePond.opticalDensity}</span>
                    <span className="text-xs text-slate-500 font-medium">Absorbansi</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600">
                    Est. Biomassa: <strong>~{activePond.estimatedBiomassKg} kg basah</strong>
                  </div>
                </div>
              </div>

              {/* Auxiliary telemetry: Salinity, DO, Paddlewheel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Salinitas / Konduktivitas</span>
                  <span className="font-bold text-slate-900 text-sm">{activePond.salinityPpt} ppt (Air Alkali Seimbang)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Oksigen Terlarut (DO)</span>
                  <span className="font-bold text-slate-900 text-sm">{activePond.dissolvedOxygenMgL} mg/L (Aerasi Baik)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Kecepatan Kincir Paddlewheel</span>
                  <span className="font-bold text-slate-900 text-sm">{activePond.paddleWheelRpm} RPM (Stainless 316)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================= SUBTAB 3: FARM JOURNAL ======================= */}
      {activeSubTab === 'journal' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Jurnal Operasional & Pemeliharaan Kolam</h3>
              <p className="text-xs text-slate-500">
                Pencatatan harian nutrisi Zarrouk, penambahan air tawar, penyesuaian aerasi, dan inspeksi visual
              </p>
            </div>
            <button
              id="btn-open-journal-modal"
              onClick={() => setShowJournalModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Catat Aktivitas Baru
            </button>
          </div>

          {/* Journal Entries List */}
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {entry.pondName}
                    </span>
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {entry.activityType}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {entry.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {entry.time}</span>
                    <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-amber-500" /> {entry.weather}</span>
                  </div>
                </div>

                <div className="text-xs space-y-2">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {entry.notes}
                  </p>
                  {entry.nutrientsAdded && (
                    <div className="p-2.5 bg-emerald-50/60 rounded-lg text-emerald-900 border border-emerald-100 text-[11px]">
                      <strong>Bahan / Nutrisi Ditambahkan:</strong> {entry.nutrientsAdded}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                    <span>Parameter saat input: <strong>pH {entry.ph}</strong> • <strong>Suhu {entry.temp}°C</strong></span>
                    <span>Operator: <strong>{entry.author}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 4: HARVEST RECORDS ======================= */}
      {activeSubTab === 'harvest' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pencatatan Panen & Konversi Biomassa Kering</h3>
              <p className="text-xs text-slate-500">
                Pencatatan hasil saring kain mesh 300, bobot basah, bobot kering solar dome, dan penerbitan Batch ID resmi
              </p>
            </div>
            <button
              id="btn-open-harvest-modal"
              onClick={() => setShowHarvestModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Input Panen Baru
            </button>
          </div>

          <div className="space-y-4">
            {harvestRecords.map((hrv) => (
              <div key={hrv.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {hrv.batchId}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {hrv.qualityGrade}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {hrv.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{hrv.pondName} • Tanggal: {hrv.harvestDate}</h4>
                  <p className="text-xs text-slate-500">
                    Penyaringan: {hrv.meshSizeUsed} • Pengeringan: {hrv.dryingMethod} • Operator: {hrv.operator}
                  </p>
                </div>

                <div className="flex items-center gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">Bobot Basah</span>
                    <span className="text-sm font-bold text-slate-700">{hrv.wetWeightKg} kg</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-700 block font-semibold">Hasil Kering</span>
                    <span className="text-lg font-black text-emerald-700">{hrv.dryWeightKg} kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Journal Entry Form */}
      {showJournalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Catat Aktivitas Harian Kolam</h3>
              <button onClick={() => setShowJournalModal(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitJournal} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pilih Kolam</label>
                  <select
                    value={jPondId}
                    onChange={(e) => setJPondId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    {ponds.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jenis Aktivitas</label>
                  <select
                    value={jActivity}
                    onChange={(e) => setJActivity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Pemberian Nutrisi">Pemberian Nutrisi</option>
                    <option value="Pengukuran Air">Pengukuran Air</option>
                    <option value="Pembersihan Kolam">Pembersihan Kolam</option>
                    <option value="Aerasi / Paddlewheel">Aerasi / Paddlewheel</option>
                    <option value="Inokulasi Bibit">Inokulasi Bibit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bahan / Nutrisi yang Digunakan</label>
                <input
                  type="text"
                  value={jNutrients}
                  onChange={(e) => setJNutrients(e.target.value)}
                  placeholder="Contoh: NaHCO3 3kg, Urea 80g, FeSO4 10g"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">pH Terukur</label>
                  <input
                    type="number"
                    step="0.05"
                    value={jPh}
                    onChange={(e) => setJPh(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Suhu (°C)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={jTemp}
                    onChange={(e) => setJTemp(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kondisi Cuaca</label>
                  <select
                    value={jWeather}
                    onChange={(e) => setJWeather(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Cerah Terik">Cerah Terik</option>
                    <option value="Cerah Berawan">Cerah Berawan</option>
                    <option value="Mendung">Mendung</option>
                    <option value="Hujan Ringan">Hujan Ringan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Catatan Pengamatan Visual</label>
                <textarea
                  rows={3}
                  required
                  value={jNotes}
                  onChange={(e) => setJNotes(e.target.value)}
                  placeholder="Warna kultur hijau zamrud merata, pergerakan arus kincir lancar..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowJournalModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Simpan ke Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Harvest Record Form */}
      {showHarvestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Input Data Panen Spirulina</h3>
              <button onClick={() => setShowHarvestModal(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitHarvest} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pilih Kolam</label>
                  <select
                    value={hPondName}
                    onChange={(e) => setHPondName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    {ponds.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tanggal Panen</label>
                  <input
                    type="date"
                    required
                    value={hDate}
                    onChange={(e) => setHDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Bobot Basah (kg)</label>
                  <input
                    type="number"
                    required
                    value={hWetWeight}
                    onChange={(e) => {
                      const wet = Number(e.target.value);
                      setHWetWeight(wet);
                      setHDryWeight(Number((wet * 0.1).toFixed(1))); // auto 10:1 ratio
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimasi Kering (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={hDryWeight}
                    onChange={(e) => setHDryWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Grade Mutu</label>
                  <select
                    value={hGrade}
                    onChange={(e) => setHGrade(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Grade A+">Grade A+ (Food/Pharma)</option>
                    <option value="Grade A">Grade A (Suplemen Umum)</option>
                    <option value="Grade B">Grade B (Pakan & Pupuk)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Lanjutan</label>
                  <select
                    value={hStatus}
                    onChange={(e) => setHStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Diuji Lab">Kirim ke Uji Lab</option>
                    <option value="Disimpan di Gudang">Simpan di Gudang Koperasi</option>
                    <option value="Masuk Marketplace">Terbitkan ke ELINA Market</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHarvestModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Terbitkan Batch Panen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
