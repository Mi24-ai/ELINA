import React, { useState } from 'react';
import { 
  Users2, 
  Truck, 
  ShoppingBag, 
  Wallet, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  Percent, 
  Layers, 
  DollarSign, 
  TrendingUp,
  Building
} from 'lucide-react';
import { CooperativeSubTab, CoopMember, CollectiveContract, ProcurementItem } from '../types';

interface CooperativeViewProps {
  initialSubTab?: CooperativeSubTab;
  members: CoopMember[];
  contracts: CollectiveContract[];
  procurementItems: ProcurementItem[];
  onParticipateSelling: (contractId: string, kg: number) => void;
  onJoinProcurement: (itemId: string, qty: number) => void;
}

export const CooperativeView: React.FC<CooperativeViewProps> = ({
  initialSubTab = 'members',
  members,
  contracts,
  procurementItems,
  onParticipateSelling,
  onJoinProcurement
}) => {
  const [activeSubTab, setActiveSubTab] = useState<CooperativeSubTab>(initialSubTab);

  // Contribute Selling Modal State
  const [selectedContract, setSelectedContract] = useState<CollectiveContract | null>(null);
  const [contributeKg, setContributeKg] = useState(50);
  const [contributeSuccess, setContributeSuccess] = useState(false);

  // Procurement Join State
  const [selectedProcItem, setSelectedProcItem] = useState<ProcurementItem | null>(null);
  const [procQty, setProcQty] = useState(1);
  const [procSuccess, setProcSuccess] = useState(false);

  const handleSellingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContract || contributeKg <= 0) return;
    onParticipateSelling(selectedContract.id, contributeKg);
    setContributeSuccess(true);
    setTimeout(() => {
      setContributeSuccess(false);
      setSelectedContract(null);
    }, 2500);
  };

  const handleProcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProcItem || procQty <= 0) return;
    onJoinProcurement(selectedProcItem.id, procQty);
    setProcSuccess(true);
    setTimeout(() => {
      setProcSuccess(false);
      setSelectedProcItem(null);
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Sub-Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Users2 className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">ELINA Koperasi</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Komunitas koperasi digital yang memperkuat posisi tawar pembudidaya lewat penjualan dan pengadaan kolektif ELINA Collective
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
            <button
              id="subtab-coop-members"
              onClick={() => setActiveSubTab('members')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'members'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users2 className="w-3.5 h-3.5" />
              Anggota ({members.length})
            </button>

            <button
              id="subtab-coop-collective-selling"
              onClick={() => setActiveSubTab('collective-selling')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'collective-selling'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-teal-600" />
              Collective: Penjualan ({contracts.length})
            </button>

            <button
              id="subtab-coop-procurement"
              onClick={() => setActiveSubTab('procurement')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'procurement'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              Pengadaan Bersama ({procurementItems.length})
            </button>

            <button
              id="subtab-coop-finance"
              onClick={() => setActiveSubTab('finance')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'finance'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-amber-600" />
              Keuangan & SHU
            </button>
          </div>
        </div>
      </div>

      {/* ======================= SUBTAB 1: MEMBERS DIRECTORY ======================= */}
      {activeSubTab === 'members' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Direktori Pembudidaya Terverifikasi</h3>
              <p className="text-xs text-slate-500">
                Data anggota terdaftar dengan verifikasi kolam budidaya, kapasitas produksi bulanan, dan status simpanan
              </p>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              Total Kapasitas Terhimpun: <strong>~790 kg / bulan</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{member.name}</h4>
                      <p className="text-xs text-emerald-700 font-semibold">{member.farmName}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {member.location}
                      </p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {member.verificationStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block font-semibold">Jumlah Kolam</span>
                      <span className="font-bold text-slate-800">{member.pondCount} Kolam Raceway</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block font-semibold">Kapasitas Panen</span>
                      <span className="font-bold text-emerald-700">{member.monthlyCapacityKg} kg / bln</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 flex justify-between items-center">
                    <span>Simpanan Koperasi:</span>
                    <span className="font-mono font-bold text-slate-900">
                      Rp {member.shareSavings.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Bergabung: {member.joinDate}</span>
                  <span className="text-emerald-700 font-medium">{member.contact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 2: COLLECTIVE SELLING ======================= */}
      {activeSubTab === 'collective-selling' && (
        <div className="space-y-6">
          <div className="bg-linear-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-teal-700/50 shadow-md">
            <div className="max-w-2xl space-y-2">
              <span className="bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Agregasi stok pembudidaya
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">ELINA Collective: Penjualan Kolektif</h2>
              <p className="text-xs sm:text-sm text-teal-100/85 leading-relaxed">
                Beberapa pembudidaya memenuhi satu pesanan besar lewat satu pintu. Stok diagregasi dengan akad wakalah bil ujrah,
                ujrah disepakati di awal, dan hasil penjualan dibagikan secara transparan kepada setiap pembudidaya.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {contracts.map((cntr) => {
              const progressPct = Math.min(100, Math.round((cntr.fulfilledKg / cntr.targetKg) * 100));
              return (
                <div 
                  key={cntr.id} 
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {cntr.id}
                        </span>
                        <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {cntr.industry}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cntr.status === 'Siap Dikirim' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {cntr.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{cntr.buyer}</h3>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Harga Kontrak / kg</span>
                        <span className="text-base font-extrabold text-emerald-700">
                          Rp {cntr.pricePerKg.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Batas Waktu</span>
                        <span className="font-bold text-slate-800">{cntr.deadline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                      <span>Progres Pemenuhan Kuota Kontrak</span>
                      <span>{cntr.fulfilledKg} / {cntr.targetKg} kg ({progressPct}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      Didukung oleh <strong>{cntr.contributingFarmers} pembudidaya mitra</strong>
                    </span>

                    {cntr.fulfilledKg < cntr.targetKg && (
                      <button
                        onClick={() => {
                          setSelectedContract(cntr);
                          setContributeKg(50);
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Ikut Setor Pasokan Panen
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 3: COLLECTIVE PROCUREMENT ======================= */}
      {activeSubTab === 'procurement' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Pengadaan Bersama Sarana & Bahan Budidaya</h3>
            <p className="text-xs text-slate-500">
              Menggabungkan pesanan pupuk NaHCO3, filter mesh 300, dan kincir paddlewheel untuk mendapatkan diskon pabrik 20% - 35%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {procurementItems.map((item) => {
              const discountPercent = Math.round(((item.normalPrice - item.groupPrice) / item.normalPrice) * 100);
              const progressPct = Math.min(100, Math.round((item.currentOrdersCount / item.minGroupVolume) * 100));

              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Percent className="w-3 h-3" /> Hemat {discountPercent}%
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mt-2">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Supplier: {item.supplier}</p>

                    <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-50 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Harga Ecer Toko</span>
                        <span className="text-slate-500 line-through">
                          Rp {item.normalPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div>
                        <span className="text-emerald-700 block text-[10px] font-bold">Harga Grup Koperasi</span>
                        <span className="text-base font-black text-emerald-700">
                          Rp {item.groupPrice.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-500"> / {item.unit}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Target Kuota Grup:</span>
                        <span className="font-bold">{item.currentOrdersCount} / {item.minGroupVolume} {item.unit} ({progressPct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${progressPct}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Sisa {item.daysRemaining} hari lagi
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProcItem(item);
                        setProcQty(1);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Ikut Pengadaan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 4: COOPERATIVE FINANCE ======================= */}
      {activeSubTab === 'finance' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Total Kas Aset Koperasi</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">Rp 842.500.000</span>
              <span className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Likuiditas Sehat & Diaudit
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Simpanan Wajib Anggota</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 block">Rp 512.000.000</span>
              <span className="text-xs text-slate-500 mt-1 block">248 Pembudidaya Aktif</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block uppercase">Alokasi Sisa Hasil Usaha (SHU)</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-700 mt-1 block">Rp 128.400.000</span>
              <span className="text-xs text-amber-800 font-medium mt-1 block">
                Siap didistribusikan akhir tahun buku
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Transparansi Pembagian SHU & Alokasi Dana</h3>
            <p className="text-xs text-slate-500">
              Sesuai AD/ART Koperasi Spirulina Indonesia, keuntungan penjualan kolektif dan pengadaan dialokasikan secara demokratis:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Jasa Usaha Anggota (40%)</span>
                <span className="text-xl font-extrabold text-emerald-700 mt-1 block">Rp 51.360.000</span>
                <p className="text-[11px] text-slate-500 mt-1">Berdasarkan volume panen yang disetorkan</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Jasa Modal Simpanan (25%)</span>
                <span className="text-xl font-extrabold text-teal-700 mt-1 block">Rp 32.100.000</span>
                <p className="text-[11px] text-slate-500 mt-1">Berdasarkan proporsi simpanan pokok & wajib</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Dana Cadangan & Riset (20%)</span>
                <span className="text-xl font-extrabold text-slate-900 mt-1 block">Rp 25.680.000</span>
                <p className="text-[11px] text-slate-500 mt-1">Uji lab gratis & pengembangan bibit</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Dana Sosial & Pendidikan (15%)</span>
                <span className="text-xl font-extrabold text-amber-700 mt-1 block">Rp 19.260.000</span>
                <p className="text-[11px] text-slate-500 mt-1">Subsidi kelas ELINA Academy & beasiswa tani</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selling Participation Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Ikut Setor Pasokan Panen</h3>
              <button onClick={() => setSelectedContract(null)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                ✕
              </button>
            </div>

            {contributeSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Alokasi Pasokan Berhasil Didaftarkan!</h4>
                <p className="text-emerald-800">
                  {contributeKg} kg spirulina Anda telah tercatat dalam kontrak {selectedContract.buyer}. Jadwal penjemputan logistik cold chain akan dikirimkan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSellingSubmit} className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Kontrak Pembeli</span>
                  <span className="font-bold text-slate-900 block">{selectedContract.buyer}</span>
                  <span className="text-emerald-700 font-bold mt-1 block">
                    Harga Beli Koperasi: Rp {selectedContract.pricePerKg.toLocaleString('id-ID')} / kg
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Volume yang Disetorkan (kg)</label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={selectedContract.targetKg - selectedContract.fulfilledKg}
                    value={contributeKg}
                    onChange={(e) => setContributeKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Maksimal kuota sisa yang bisa diambil: {selectedContract.targetKg - selectedContract.fulfilledKg} kg
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-900 text-[11px] flex justify-between font-bold">
                  <span>Estimasi Pendapatan Anda:</span>
                  <span>Rp {(contributeKg * selectedContract.pricePerKg).toLocaleString('id-ID')}</span>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedContract(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    Konfirmasi Setor
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Procurement Join Modal */}
      {selectedProcItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Ikut Pengadaan Bersama</h3>
              <button onClick={() => setSelectedProcItem(null)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                ✕
              </button>
            </div>

            {procSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Pesanan Pengadaan Diterima!</h4>
                <p className="text-emerald-800">
                  {procQty} {selectedProcItem.unit} {selectedProcItem.name} berhasil ditambahkan ke agregasi pesanan koperasi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProcSubmit} className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="font-bold text-slate-900 block">{selectedProcItem.name}</span>
                  <div className="flex justify-between mt-1 text-slate-600">
                    <span>Harga Diskon Grup:</span>
                    <span className="font-bold text-emerald-700">
                      Rp {selectedProcItem.groupPrice.toLocaleString('id-ID')} / {selectedProcItem.unit}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Pesanan ({selectedProcItem.unit})</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={procQty}
                    onChange={(e) => setProcQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                  />
                </div>

                <div className="p-3 bg-slate-100 rounded-xl flex justify-between font-bold text-slate-800 text-[11px]">
                  <span>Total Bayar:</span>
                  <span>Rp {(procQty * selectedProcItem.groupPrice).toLocaleString('id-ID')}</span>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProcItem(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    Gabung Pesanan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
