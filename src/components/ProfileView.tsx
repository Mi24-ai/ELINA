import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  FileText, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Upload, 
  CheckCircle2, 
  Save, 
  Building2, 
  Award,
  Bell,
  Globe
} from 'lucide-react';
import { ProfileSubTab } from '../types';

interface ProfileViewProps {
  initialSubTab?: ProfileSubTab;
  userRole: string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  initialSubTab = 'farmer',
  userRole
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ProfileSubTab>(initialSubTab);

  // Profile Form State
  const [farmerName, setFarmerName] = useState('Sukardi & Kelompok Tani Alga Mulia');
  const [farmName, setFarmName] = useState('Farm Alga Mulia Bantul (Greenhouse 01)');
  const [location, setLocation] = useState('Bantul, D.I. Yogyakarta');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [email, setEmail] = useState('sukardi.alga@gmail.com');
  const [nib, setNib] = useState('1902030018920');
  const [pondsCount, setPondsCount] = useState(4);
  const [uploadName, setUploadName] = useState('');
  const [capacity, setCapacity] = useState(180);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [waNotifEnabled, setWaNotifEnabled] = useState(true);
  const [sensorAlertEnabled, setSensorAlertEnabled] = useState(true);
  const [bulkOrderEmailEnabled, setBulkOrderEmailEnabled] = useState(true);

  const initials = farmerName.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  const isFarmerRole = userRole.includes('Pembudidaya');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Sub-Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <User className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">Profil & Verifikasi Usaha</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Kelola informasi legalitas usaha pembudidaya, status verifikasi mitra, riwayat pesanan, dan pengaturan akun
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
            <button
              id="subtab-profile-farmer"
              onClick={() => setActiveSubTab('farmer')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'farmer'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Profil Usaha
            </button>

            <button
              id="subtab-profile-verification"
              onClick={() => setActiveSubTab('verification')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'verification'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verifikasi & Audit
            </button>

            <button
              id="subtab-profile-orders"
              onClick={() => setActiveSubTab('orders')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'orders'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Pesanan
            </button>

            <button
              id="subtab-profile-settings"
              onClick={() => setActiveSubTab('settings')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'settings'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Pengaturan
            </button>
          </div>
        </div>
      </div>

      {/* ======================= SUBTAB 1: FARMER PROFILE ======================= */}
      {activeSubTab === 'farmer' && !isFarmerRole && (
        <div role="note" className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-sm text-teal-900">
          Anda masuk sebagai <strong>{userRole}</strong>. Profil di bawah adalah contoh akun pembudidaya mitra. Ganti peran di bagian atas halaman untuk melihat profil sesuai peran Anda.
        </div>
      )}

      {activeSubTab === 'farmer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl mx-auto ring-4 ring-emerald-50">
                {initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{farmerName}</h3>
                <p className="text-xs text-emerald-700 font-semibold">{farmName}</p>
                <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Status: Mitra Terverifikasi ELINA
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-left space-y-2 text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" /> {location}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> {phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> {email}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-xs space-y-3">
              <h4 className="font-bold text-slate-900">Keanggotaan Koperasi ELINA</h4>
              <div className="flex justify-between text-slate-600">
                <span>No. Anggota:</span>
                <span className="font-mono font-bold text-slate-900">ELN-MBR-0012</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Simpanan Pokok:</span>
                <span className="font-bold text-slate-900">Rp 2.000.000</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Simpanan Wajib Terkumpul:</span>
                <span className="font-bold text-emerald-700">Rp 6.500.000</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Perbarui Informasi Usaha Budidaya</h3>

            {savedSuccess && (
              <div role="status" className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Perubahan profil usaha Anda berhasil disimpan ke sistem koperasi!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-owner" className="font-semibold text-slate-700 block mb-1.5">Nama Pemilik / Kelompok Tani</label>
                  <input id="f-owner"
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label htmlFor="f-farm" className="font-semibold text-slate-700 block mb-1.5">Nama Fasilitas Farm</label>
                  <input id="f-farm"
                    type="text"
                    required
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-nib" className="font-semibold text-slate-700 block mb-1.5">Nomor Induk Berusaha (NIB)</label>
                  <input id="f-nib"
                    type="text" inputMode="numeric"
                    value={nib}
                    onChange={(e) => setNib(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label htmlFor="f-city" className="font-semibold text-slate-700 block mb-1.5">Kabupaten / Kota</label>
                  <input id="f-city"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-ponds" className="font-semibold text-slate-700 block mb-1.5">Jumlah Kolam Aktif</label>
                  <input id="f-ponds"
                    type="number" inputMode="numeric" min={0}
                    value={pondsCount}
                    onChange={(e) => setPondsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label htmlFor="f-capacity" className="font-semibold text-slate-700 block mb-1.5">Estimasi Kapasitas Panen (kg / bulan)</label>
                  <input id="f-capacity"
                    type="number" inputMode="numeric" min={0}
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-phone" className="font-semibold text-slate-700 block mb-1.5">Nomor WhatsApp</label>
                  <input id="f-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20" />
                </div>
                <div>
                  <label htmlFor="f-email" className="font-semibold text-slate-700 block mb-1.5">Email</label>
                  <input id="f-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Perubahan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 2: VERIFICATION & AUDIT ======================= */}
      {activeSubTab === 'verification' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Status Verifikasi & Audit Fasilitas</h3>
                <p className="text-xs text-slate-500">
                  Untuk dapat menerbitkan Quality Passport Batch Gold dan mengakses kuota penjualan ekspor, dokumen berikut harus lolos verifikasi:
                </p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                Terverifikasi Penuh
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Sertifikasi Standar Nasional Indonesia (SNI Mikroalga)</h4>
                    <p className="text-slate-500">Audit lapangan kolam raceway telah disetujui tim BBSPJIA Kemenperin</p>
                  </div>
                </div>
                <span className="font-mono text-emerald-700 font-bold">SNI-2024-8841-A</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Sertifikat Halal Indonesia (BPJPH)</h4>
                    <p className="text-slate-500">Media kultur air alkali Zarrouk bebas dari unsur najis dan hewani</p>
                  </div>
                </div>
                <span className="font-mono text-emerald-700 font-bold">ID3421000189204</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Izin Sarana Higienis Pengeringan Solar Dome</h4>
                    <p className="text-slate-500">Lolos uji sirkulasi udara bebas debu dan serangga</p>
                  </div>
                </div>
                <span className="font-mono text-emerald-700 font-bold">DISHUB-PIRT-2025</span>
              </div>
            </div>

            <label className="block p-5 rounded-2xl border-2 border-dashed border-slate-300 text-center space-y-2 cursor-pointer hover:border-emerald-500 has-focus-visible:outline-2 has-focus-visible:outline-teal-500 transition-colors">
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(e) => setUploadName(e.target.files?.[0]?.name ?? '')} />
              <Upload className="w-6 h-6 text-slate-400 mx-auto" />
              <span className="block text-sm text-slate-800 font-semibold">
                {uploadName ? `Dipilih: ${uploadName}` : 'Unggah berkas baru atau hasil uji lab'}
              </span>
              <span className="block text-xs text-slate-500">Format PDF, JPG, atau PNG, maksimal 10 MB</span>
            </label>
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 3: ORDERS ======================= */}
      {activeSubTab === 'orders' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Daftar Pesanan Masuk & Pengiriman</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-emerald-700 font-bold">BLK-2026-081</span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">Alokasi Pasokan Bulk: PT Suplemen Nutrisi Nusantara</h4>
                <p className="text-slate-500">Kuota Farm Bantul: 250 kg • Status: Dalam Pengeringan & Pengemasan</p>
              </div>
              <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                Dalam Pengerjaan
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-emerald-700 font-bold">RETAIL-9812</span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">Pesanan 5 kg Spirulina Powder Grade A+</h4>
                <p className="text-slate-500">Pembeli: dr. Maya (Klinik Estetika Surabaya) • Resi: JNE-991203</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                Terkirim
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================= SUBTAB 4: SETTINGS ======================= */}
      {activeSubTab === 'settings' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 max-w-2xl">
          <h3 className="text-lg font-bold text-slate-900">Pengaturan Notifikasi & Akun</h3>

          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Notifikasi Peringatan Parameter Kolam</span>
                <span className="text-slate-500">Kirim peringatan ke WhatsApp jika pH kolam di atas 10,5 atau suhu di atas 35 °C</span>
              </div>
              <input
                type="checkbox"
                checked={sensorAlertEnabled}
                onChange={(e) => setSensorAlertEnabled(e.target.checked)}
                className="w-5 h-5 shrink-0 accent-emerald-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Info Peluang Penjualan Kolektif / Bulk Order</span>
                <span className="text-slate-500">Dapatkan notifikasi segera saat kuota kontrak ekspor baru dibuka</span>
              </div>
              <input
                type="checkbox"
                checked={bulkOrderEmailEnabled}
                onChange={(e) => setBulkOrderEmailEnabled(e.target.checked)}
                className="w-5 h-5 shrink-0 accent-emerald-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Notifikasi WhatsApp Koperasi</span>
                <span className="text-slate-500">Kirim pengingat rapat anggota tahunan dan bagi hasil SHU</span>
              </div>
              <input
                type="checkbox"
                checked={waNotifEnabled}
                onChange={(e) => setWaNotifEnabled(e.target.checked)}
                className="w-5 h-5 shrink-0 accent-emerald-600 cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
