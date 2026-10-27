import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Package, 
  ShieldCheck, 
  Receipt, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  Plus, 
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Truck,
  Building2,
  Leaf
} from 'lucide-react';
import { MarketplaceSubTab, Product, QualityPassport, BulkOrder } from '../types';

interface MarketplaceViewProps {
  initialSubTab?: MarketplaceSubTab;
  products: Product[];
  qualityPassports: QualityPassport[];
  bulkOrders: BulkOrder[];
  selectedBatchId?: string;
  onAddToCart: (product: Product, quantity: number) => void;
  onSubmitBulkOrder: (newOrder: Omit<BulkOrder, 'id' | 'status' | 'allocatedFarmers' | 'createdAt'>) => void;
  onOpenBatchPassport: (batchId: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  initialSubTab = 'products',
  products,
  qualityPassports,
  bulkOrders,
  selectedBatchId,
  onAddToCart,
  onSubmitBulkOrder,
  onOpenBatchPassport
}) => {
  const [activeSubTab, setActiveSubTab] = useState<MarketplaceSubTab>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  // Passport selection state
  const [currentPassportId, setCurrentPassportId] = useState<string>(
    selectedBatchId || qualityPassports[0]?.batchId || ''
  );

  // Bulk Order Form State
  const [bulkBuyerName, setBulkBuyerName] = useState('');
  const [bulkCompany, setBulkCompany] = useState('');
  const [bulkProductType, setBulkProductType] = useState('Spirulina Platensis Powder Grade A+');
  const [bulkQuantityKg, setBulkQuantityKg] = useState(500);
  const [bulkTargetDate, setBulkTargetDate] = useState('2026-11-01');
  const [bulkTargetPrice, setBulkTargetPrice] = useState(375000);
  const [bulkNotes, setBulkNotes] = useState('');
  const [bulkSubmittedSuccess, setBulkSubmittedSuccess] = useState(false);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activePassport = qualityPassports.find(qp => qp.batchId === currentPassportId) || qualityPassports[0];

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkBuyerName || !bulkCompany || bulkQuantityKg <= 0) return;

    onSubmitBulkOrder({
      buyerName: bulkBuyerName,
      companyName: bulkCompany,
      productType: bulkProductType,
      targetQuantityKg: Number(bulkQuantityKg),
      targetDate: bulkTargetDate,
      targetPricePerKg: Number(bulkTargetPrice),
      notes: bulkNotes
    });

    setBulkSubmittedSuccess(true);
    setTimeout(() => setBulkSubmittedSuccess(false), 5000);
    setBulkBuyerName('');
    setBulkCompany('');
    setBulkNotes('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Sub-Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">ELINA Market</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Marketplace tempat pembudidaya terverifikasi menjual produk spirulina kepada konsumen (B2C) dan pembeli bisnis (B2B)
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto no-scrollbar">
            <button
              id="subtab-products"
              onClick={() => setActiveSubTab('products')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'products'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Etalase Produk
            </button>

            <button
              id="subtab-bulk-order"
              onClick={() => setActiveSubTab('bulk-order')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'bulk-order'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-teal-600" />
              Bulk Order (B2B)
            </button>

            <button
              id="subtab-quality-passport"
              onClick={() => setActiveSubTab('quality-passport')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'quality-passport'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Quality Passport
            </button>

            <button
              id="subtab-transactions"
              onClick={() => setActiveSubTab('transactions')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === 'transactions'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              Riwayat Transaksi
            </button>
          </div>
        </div>
      </div>

      {/* ======================= TAB 1: PRODUCTS ======================= */}
      {activeSubTab === 'products' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-product-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari bubuk, kapsul, fikosianin, lokasi..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-emerald-600 focus:bg-white"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
              {['Semua', 'Powder', 'Capsule', 'Fresh Biomass', 'Extract', 'Cosmetic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'Semua' ? 'Semua Produk' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className="bg-emerald-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                      {prod.category}
                    </span>
                    {prod.isOrganic && (
                      <span className="bg-teal-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur">
                        <Leaf className="w-2.5 h-2.5" /> Organik
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPassportId(prod.batchId);
                      setActiveSubTab('quality-passport');
                    }}
                    className="absolute bottom-2.5 right-2.5 bg-white/95 hover:bg-white text-emerald-900 text-[10px] font-bold px-2 py-1 rounded shadow-xs flex items-center gap-1 border border-emerald-200 cursor-pointer"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Batch: {prod.batchId}
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium mb-1">
                      {prod.farmerName} • <span className="text-slate-600">{prod.farmLocation}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {prod.certifications.slice(0, 3).map((cert, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Harga</span>
                      <span className="text-lg font-extrabold text-slate-900">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-slate-500"> / {prod.unit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProductModal(prod);
                          setModalQuantity(prod.minOrder || 1);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Detail
                      </button>
                      <button
                        id={`btn-cart-${prod.id}`}
                        onClick={() => onAddToCart(prod, prod.minOrder || 1)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Beli
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= TAB 2: BULK ORDER ======================= */}
      {activeSubTab === 'bulk-order' && (
        <div className="space-y-8">
          {/* Hero Banner for Bulk Order */}
          <div className="bg-linear-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-teal-700/50 shadow-md">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5" /> B2B & Industrial Sourcing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Pemesanan Jumlah Besar Terintegrasi Multi-Pembudidaya
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/85 leading-relaxed">
                Memungkinkan industri farmasi, kosmetik, pakan fungsional, dan eksportir memesan spirulina dalam volume 50 kg hingga puluhan ton. 
                Sistem koperasi ELINA mengagregasikan pasokan dari beberapa pembudidaya dengan standar mutu yang terstandarisasi.
              </p>
            </div>

            {/* Wholesale tiers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-teal-800">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[11px] text-teal-300 block">Tier 1: 10 - 50 kg</span>
                <span className="text-sm font-bold text-white">Diskon 10%</span>
                <span className="text-[10px] text-teal-200 block">Cocok utk UMKM herbal</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[11px] text-teal-300 block">Tier 2: 51 - 250 kg</span>
                <span className="text-sm font-bold text-white">Diskon 18%</span>
                <span className="text-[10px] text-teal-200 block">Sertifikat COA per drum</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[11px] text-teal-300 block">Tier 3: 251 - 1000 kg</span>
                <span className="text-sm font-bold text-white">Diskon 25%</span>
                <span className="text-[10px] text-teal-200 block">Alokasi panen 3-5 mitra</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[11px] text-teal-300 block">Tier 4: &gt; 1 Ton</span>
                <span className="text-sm font-bold text-white">Kontrak Khusus</span>
                <span className="text-[10px] text-teal-200 block">Jaminan pasokan bulanan</span>
              </div>
            </div>
          </div>

          {/* Form and Active Orders Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Request */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                Formulir Pengajuan Bulk Order B2B
              </h3>
              <p className="text-xs text-slate-500">
                Isi kebutuhan spesifikasi Anda. Tim koperasi ELINA akan mencocokkan kuota kolam pembudidaya dalam 1x24 jam.
              </p>

              {bulkSubmittedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Permintaan Bulk Order Anda berhasil didaftarkan! Kode permohonan sedang diverifikasi pengurus koperasi.</span>
                </div>
              )}

              <form onSubmit={handleBulkSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nama Pemesan / PIC</label>
                    <input
                      type="text"
                      required
                      value={bulkBuyerName}
                      onChange={(e) => setBulkBuyerName(e.target.value)}
                      placeholder="Contoh: Hendra Gunawan"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Perusahaan / Institusi</label>
                    <input
                      type="text"
                      required
                      value={bulkCompany}
                      onChange={(e) => setBulkCompany(e.target.value)}
                      placeholder="PT Nutrisi Bio Prima"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jenis Produk Spirulina</label>
                  <select
                    value={bulkProductType}
                    onChange={(e) => setBulkProductType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                  >
                    <option value="Spirulina Platensis Powder Grade A+ (Food/Pharma)">Spirulina Platensis Powder Grade A+ (Food/Pharma)</option>
                    <option value="Fresh Frozen Spirulina Biomass Paste">Fresh Frozen Spirulina Biomass Paste (Cold Chain)</option>
                    <option value="Kapsul Spirulina Organik 500mg">Kapsul Spirulina Organik 500mg (OEM Bulk Drum)</option>
                    <option value="Ekstrak Fikosianin Biru Cair E18">Ekstrak Fikosianin Biru Cair E18</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Volume (kg)</label>
                    <input
                      type="number"
                      required
                      min={50}
                      step={10}
                      value={bulkQuantityKg}
                      onChange={(e) => setBulkQuantityKg(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Tanggal Kirim</label>
                    <input
                      type="date"
                      required
                      value={bulkTargetDate}
                      onChange={(e) => setBulkTargetDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Harga / kg (Rp)</label>
                    <input
                      type="number"
                      value={bulkTargetPrice}
                      onChange={(e) => setBulkTargetPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Catatan Spesifikasi & Standar Mutu</label>
                  <textarea
                    rows={3}
                    value={bulkNotes}
                    onChange={(e) => setBulkNotes(e.target.value)}
                    placeholder="Contoh: Kadar fikosianin minimal 15%, kadar air maksimal 6%, drum tertutup ganda dengan desiccant food-grade..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] space-y-1">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>Estimasi Nilai Kontrak:</span>
                    <span>Rp {(bulkQuantityKg * bulkTargetPrice).toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-slate-500">
                    Sistem akan membagi kuota pemenuhan pesanan ke kelompok pembudidaya terdekat untuk menjaga kesegaran dan efisiensi ongkir.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Kirim Pengajuan Bulk Order
                </button>
              </form>
            </div>

            {/* Active Bulk Orders & Multi-Farmer Allocation Display */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-teal-600" />
                    Status Pemesanan Bulk & Alokasi Klaster
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {bulkOrders.length} Pesanan Aktif
                  </span>
                </div>

                <div className="space-y-4">
                  {bulkOrders.map((bo) => (
                    <div key={bo.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{bo.companyName}</span>
                            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                              {bo.id}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            PIC: {bo.buyerName} • Tanggal Pengajuan: {bo.createdAt}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          bo.status === 'Alokasi Petani'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {bo.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Produk</span>
                          <span className="font-semibold text-slate-800">{bo.productType}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Volume Total</span>
                          <span className="font-bold text-emerald-700">{bo.targetQuantityKg} kg</span>
                        </div>
                      </div>

                      {/* Multi-farmer allocation list */}
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                          Alokasi Pasokan Petani Mitra:
                        </span>
                        <div className="space-y-1.5">
                          {bo.allocatedFarmers.map((alloc, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded border border-slate-100">
                              <span className="text-slate-700 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                {alloc.farmerName}
                              </span>
                              <span className="font-bold text-slate-900">{alloc.quotaKg} kg</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= TAB 3: QUALITY PASSPORT ======================= */}
      {activeSubTab === 'quality-passport' && (
        <div className="space-y-8">
          {/* Header Quality Passport */}
          <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-2xl border border-emerald-800 shadow-md">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Transparansi Tanpa Kompromi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Quality Passport
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                Setiap gram spirulina yang diproduksi terdaftar dengan identitas batch digital yang memuat koordinat kolam budidaya, 
                kondisi pengeringan, hasil uji laboratorium terakreditasi Kemenperin/Sukofindo, dan verifikasi sertifikat Halal/BPOM.
              </p>
            </div>

            {/* Batch Selector pills */}
            <div className="mt-6 pt-4 border-t border-emerald-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs text-emerald-300 font-semibold shrink-0">Pilih Batch ID:</span>
              {qualityPassports.map((qp) => (
                <button
                  key={qp.batchId}
                  onClick={() => setCurrentPassportId(qp.batchId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                    currentPassportId === qp.batchId
                      ? 'bg-emerald-500 text-emerald-950 shadow-md'
                      : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
                  }`}
                >
                  {qp.batchId} ({qp.verifiedStatus})
                </button>
              ))}
            </div>
          </div>

          {/* Digital Passport Card */}
          {activePassport && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Card top banner */}
              <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase font-mono tracking-widest text-emerald-300">
                      PASPOR DIGITAL MUTU
                    </span>
                    <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {activePassport.verifiedStatus}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">{activePassport.productName}</h3>
                  <p className="text-xs text-emerald-200 mt-1 font-mono">
                    Batch Code: <strong className="text-white font-bold">{activePassport.batchId}</strong> • Hash: {activePassport.blockchainHash.slice(0, 16)}...
                  </p>
                </div>

                <button 
                  onClick={() => alert(`Mengunduh Dokumen Resmi Certificate of Analysis (COA) #${activePassport.labCertNo} dari ${activePassport.labName}...`)}
                  className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  Unduh COA Lab (PDF)
                </button>
              </div>

              {/* Passport Details Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* 1. Origin Farm Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 block mb-1">Asal Kebun & Pembudidaya</span>
                    <h4 className="font-bold text-slate-900 text-sm">{activePassport.farmerName}</h4>
                    <p className="text-xs text-emerald-700 font-medium">{activePassport.farmName}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {activePassport.location}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">GPS: {activePassport.coordinates}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 block mb-1">Waktu Panen & Dehidrasi</span>
                    <p className="text-xs text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Panen: <strong>{activePassport.harvestDate}</strong>
                    </p>
                    <p className="text-xs text-slate-700 flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Pengeringan: <strong>{activePassport.dryingDate}</strong>
                    </p>
                    <p className="text-xs text-slate-500 mt-2 bg-white p-2 rounded border border-slate-100">
                      Metode: {activePassport.dryingMethod}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 block mb-1">Legalitas & Laboratorium</span>
                    <p className="text-xs text-slate-800">
                      Lab Penguji: <strong>{activePassport.labName}</strong>
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">No. COA: {activePassport.labCertNo}</p>
                    <div className="mt-2 pt-2 border-t border-slate-200 flex flex-col gap-1 text-[11px]">
                      <span className="text-emerald-800 font-semibold">✓ Halal: {activePassport.halalCert}</span>
                      <span className="text-slate-700 font-semibold">✓ Reg BPOM: {activePassport.bpomReg}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Key Nutritional & Bioactive Parameters */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Kandungan Bioaktif & Nutrisi Utama (Hasil Uji Lab)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <span className="text-[11px] text-emerald-800 font-semibold block">Total Protein (Kjeldahl)</span>
                      <span className="text-2xl font-black text-emerald-950 mt-1 block">{activePassport.proteinPercent}%</span>
                      <span className="text-[10px] text-emerald-700">Standar SNI: Min. 55%</span>
                    </div>

                    <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                      <span className="text-[11px] text-teal-800 font-semibold block">Fikosianin Murni (C-PC)</span>
                      <span className="text-2xl font-black text-teal-950 mt-1 block">{activePassport.phycocyaninPercent}%</span>
                      <span className="text-[10px] text-teal-700">Pigmen Antioksidan Biru</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[11px] text-slate-600 font-semibold block">Kadar Air (Moisture)</span>
                      <span className="text-2xl font-black text-slate-900 mt-1 block">{activePassport.moisturePercent}%</span>
                      <span className="text-[10px] text-slate-500">Standar Keamanan: &lt; 7.0%</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[11px] text-slate-600 font-semibold block">Kadar Abu Total</span>
                      <span className="text-2xl font-black text-slate-900 mt-1 block">{activePassport.ashPercent}%</span>
                      <span className="text-[10px] text-slate-500">Mineral Alami Murni</span>
                    </div>
                  </div>
                </div>

                {/* 3. Heavy Metals & Microbiology Safety Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Heavy metals */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                    <h5 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Uji Cemaran Logam Berat (ICP-MS)
                    </h5>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Timbal (Lead / Pb):</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {activePassport.heavyMetals.leadPb}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Merkuri (Mercury / Hg):</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {activePassport.heavyMetals.mercuryHg}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Arsenik (Arsenic / As):</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {activePassport.heavyMetals.arsenicAs}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-slate-600">Kadmium (Cadmium / Cd):</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {activePassport.heavyMetals.cadmiumCd}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Microbiology */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                    <h5 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Uji Mikrobiologi (Bakteri & Patogen)
                    </h5>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Angka Lempeng Total (TPC):</span>
                        <span className="font-mono font-bold text-slate-800">
                          {activePassport.microbiology.totalPlateCount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Coliform Bakteri:</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {activePassport.microbiology.coliform}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-slate-600">Salmonella sp:</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {activePassport.microbiology.salmonella}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================= TAB 4: TRANSACTIONS ======================= */}
      {activeSubTab === 'transactions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Riwayat Transaksi Pembelian & Pemesanan</h3>
              <p className="text-xs text-slate-500">Semua transaksi tercatat di database koperasi dengan invoice digital otomatis</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700">TRX-2026-09142</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Selesai & Diterima
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-1">
                  2x Spirulina Platensis Powder Grade A+ (1 kg Foil Pack)
                </h4>
                <p className="text-xs text-slate-500">Batch Terkait: ELN-2026-SP881 • Kurir: J&T Cargo Dingin</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Transaksi</span>
                  <span className="text-base font-extrabold text-slate-900">Rp 770.000</span>
                </div>
                <button 
                  onClick={() => alert('Mengunduh Invoice PDF TRX-2026-09142...')}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-white flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Invoice
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700">TRX-2026-09158</span>
                  <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Dalam Pengiriman
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-1">
                  5x Fresh Frozen Spirulina Biomass Paste (1 kg Vacuum)
                </h4>
                <p className="text-xs text-slate-500">Batch Terkait: ELN-2026-SP895 • Ekspedisi: Cold Chain Express (Resi: CCE98210384)</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Transaksi</span>
                  <span className="text-base font-extrabold text-slate-900">Rp 1.200.000</span>
                </div>
                <button 
                  onClick={() => alert('Mengunduh Invoice PDF TRX-2026-09158...')}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-white flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider">
                  {selectedProductModal.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedProductModal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedProductModal.image}
                alt={selectedProductModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedProductModal.description}
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Asal Pembudidaya:</span>
                <span className="font-semibold text-slate-800">{selectedProductModal.farmerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lokasi Kolam:</span>
                <span className="font-semibold text-slate-800">{selectedProductModal.farmLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kadar Protein:</span>
                <span className="font-bold text-emerald-700">{selectedProductModal.proteinContent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Batch Terverifikasi:</span>
                <span className="font-mono font-bold text-slate-900">{selectedProductModal.batchId}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block">Harga</span>
                <span className="text-xl font-black text-slate-900">
                  Rp {selectedProductModal.price.toLocaleString('id-ID')}
                </span>
                <span className="text-xs text-slate-500"> / {selectedProductModal.unit}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <button
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-bold text-slate-800">{modalQuantity}</span>
                  <button
                    onClick={() => setModalQuantity(modalQuantity + 1)}
                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(selectedProductModal, modalQuantity);
                    setSelectedProductModal(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
