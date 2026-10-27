import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Leaf, 
  DollarSign, 
  Heart, 
  Globe2, 
  Droplets, 
  Sparkles, 
  Scale, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { ImpactSubTab } from '../types';

interface ImpactViewProps {
  initialSubTab?: ImpactSubTab;
}

export const ImpactView: React.FC<ImpactViewProps> = ({
  initialSubTab = 'economic'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ImpactSubTab>(initialSubTab);

  // CO2 Interactive Calculator State
  const [calcSpirulinaKg, setCalcSpirulinaKg] = useState(1000);
  const co2AbsorbedKg = (calcSpirulinaKg * 1.82).toFixed(1);
  const waterSavedLiters = (calcSpirulinaKg * 2500).toLocaleString('id-ID');

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Sub-Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">Impact Dashboard</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Visualisasi dampak ekonomi dan sosial dari aktivitas ELINA bagi pembudidaya, mitra, donatur, dan investor
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
            <button
              id="subtab-impact-economic"
              onClick={() => setActiveSubTab('economic')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'economic'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Dampak Ekonomi
            </button>

            <button
              id="subtab-impact-social"
              onClick={() => setActiveSubTab('social')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'social'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-teal-600" />
              Dampak Sosial
            </button>

            <button
              id="subtab-impact-environmental"
              onClick={() => setActiveSubTab('environmental')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'environmental'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Dampak Lingkungan (CO₂)
            </button>
          </div>
        </div>
      </div>

      {/* ======================= SUBTAB 1: ECONOMIC IMPACT ======================= */}
      {activeSubTab === 'economic' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Total Perputaran Transaksi</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">Rp 4.280.000.000</span>
              <span className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 18.4 Ton Biomassa Terjual
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Rata-rata Kenaikan Omset Petani</span>
              <span className="text-3xl font-black text-emerald-700 mt-1 block">+42.8%</span>
              <span className="text-xs text-slate-500 mt-1 block">
                Dibanding komoditas kolam air tawar biasa
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Nilai Kontrak Ekspor Terbuka</span>
              <span className="text-3xl font-black text-teal-700 mt-1 block">Rp 1.487.500.000</span>
              <span className="text-xs text-teal-800 font-medium mt-1 block">
                Pasar Jepang & Kawasan ASEAN
              </span>
            </div>
          </div>

          {/* Comparative analysis */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Perbandingan Profitabilitas Budidaya per 100 m²</h3>
            <p className="text-xs text-slate-500">
              Spirulina memiliki rasio konversi pakan dan produktivitas biomassa protein tertinggi per meter persegi dibandingkan pertanian konvensional:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 relative overflow-hidden">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Spirulina Mikroalga (ELINA)
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-2">Rp 18.500.000 / bln</h4>
                <p className="text-xs text-emerald-900 mt-1">
                  Panen harian semi-kontinu, siklus 7-10 hari. Harga jual stabil Rp 350.000 - Rp 400.000 / kg kering.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Budidaya Ikan Lele
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-2">Rp 4.200.000 / bln</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Siklus 90 hari, margin tipis tergerus harga pakan pelet pabrik yang terus naik.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Pertanian Padi Konvensional
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-2">Rp 2.800.000 / bln</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Siklus panen 110 hari, rentan gagal panen akibat cuaca ekstrem dan hama wereng.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 2: SOCIAL IMPACT ======================= */}
      {activeSubTab === 'social' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Pembudidaya Binaan</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">348 Orang</span>
              <span className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> 24 Kelompok Tani Mandiri
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Keterlibatan Wanita Tani</span>
              <span className="text-3xl font-black text-teal-700 mt-1 block">62.4%</span>
              <span className="text-xs text-teal-800 font-medium mt-1 block">
                Ibu rumah tangga berdaya mandiri di pedesaan
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Total Jam Pelatihan Academy</span>
              <span className="text-3xl font-black text-amber-700 mt-1 block">1.840 Jam</span>
              <span className="text-xs text-amber-800 font-medium mt-1 block">
                Edukasi bioteknologi & higienitas pangan
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Pemberdayaan Wanita Tani Mikroalga</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Budidaya spirulina di kolam raceway pekarangan greenhouse sangat ergonomis, tidak membutuhkan tenaga fisik berat seperti mencangkul sawah, 
              sehingga memungkinkan para ibu rumah tangga di pedesaan Bantul, Pasuruan, dan Sukabumi memiliki sumber penghasilan mandiri tanpa meninggalkan pengasuhan keluarga.
            </p>
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 3: ENVIRONMENTAL IMPACT ======================= */}
      {activeSubTab === 'environmental' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Total CO₂ Terserap</span>
              <span className="text-3xl font-black text-emerald-700 mt-1 block">33.488 kg</span>
              <span className="text-xs text-slate-500 mt-1 block">
                Oleh fotosintesis mikroalga spirulina
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Air Dihemat vs Protein Daging</span>
              <span className="text-3xl font-black text-teal-700 mt-1 block">46.000.000 L</span>
              <span className="text-xs text-teal-800 font-medium mt-1 block">
                Sistem resirkulasi tertutup tanpa run-off
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Limbah Kimia Sintetis</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">0% Zero Waste</span>
              <span className="text-xs text-emerald-700 font-medium mt-1 block">
                Air saring dipakai kembali untuk kultur
              </span>
            </div>
          </div>

          {/* Interactive Carbon Calculator */}
          <div className="bg-linear-to-r from-emerald-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-700/40 shadow-md space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" /> Kalkulator Net-Zero Carbon
              </span>
              <h3 className="text-2xl font-black">Simulasi Serapan Karbon Spirulina</h3>
              <p className="text-xs text-emerald-200/85 leading-relaxed">
                Mikroalga Spirulina platensis menyerap karbon dioksida (CO₂) melalui fotosintesis dengan efisiensi 3-5x lipat dibanding pohon daratan: 
                <strong> 1 ton biomassa spirulina menyerap sekitar 1.82 ton gas CO₂ dari atmosfer</strong>.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur p-5 rounded-2xl border border-white/20 space-y-4">
              <div>
                <label className="text-xs font-semibold text-emerald-200 block mb-2">
                  Masukkan Volume Produksi Spirulina: <strong>{calcSpirulinaKg} kg</strong>
                </label>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={calcSpirulinaKg}
                  onChange={(e) => setCalcSpirulinaKg(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30">
                  <span className="text-xs text-emerald-300 block">Gas Karbon Dioksida Terserap:</span>
                  <span className="text-3xl font-black text-white mt-1 block">{co2AbsorbedKg} kg CO₂</span>
                  <span className="text-[11px] text-emerald-400 mt-1 block">Setara menanam ~85 pohon selama setahun</span>
                </div>

                <div className="p-3 bg-teal-950/60 rounded-xl border border-teal-500/30">
                  <span className="text-xs text-teal-300 block">Air Bersih Terhemat vs Kedelai:</span>
                  <span className="text-3xl font-black text-white mt-1 block">{waterSavedLiters} Liter</span>
                  <span className="text-[11px] text-teal-400 mt-1 block">Spirulina menggunakan air 90% lebih efisien</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
