import React from 'react';
import {
  Sprout, ShoppingBag, ShieldCheck, Users2, GraduationCap,
  ArrowRight, Leaf, Droplets, Thermometer, Activity, ChevronRight, Award,
  BadgeCheck, FlaskConical, Handshake, ScrollText, BarChart3, Landmark
} from 'lucide-react';
import { MainTab, Product, CoopMember } from '../types';

interface HomeViewProps {
  onNavigate: (tab: MainTab, subTab?: string) => void;
  featuredProducts: Product[];
  topMembers: CoopMember[];
  onSelectProduct: (product: Product) => void;
  onOpenBatchPassport: (batchId: string) => void;
}

/* Grafik kepadatan optik kolam, lengkap dengan garis target panen */
const OD_SERIES = [22, 26, 25, 31, 34, 33, 40, 44, 47, 52, 55, 61].map((v) => v / 100);
const OD_TARGET = 0.7;

const ODChart: React.FC = () => {
  const W = 320, H = 124, top = 8, bottom = 100, left = 6, right = 314, yMax = 0.8;
  const x = (i: number) => left + (i / (OD_SERIES.length - 1)) * (right - left);
  const y = (v: number) => bottom - (v / yMax) * (bottom - top);
  const line = OD_SERIES.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = OD_SERIES.length - 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Kepadatan optik naik dari 0,22 menjadi 0,61 dalam 12 hari, target panen 0,70">
      <defs>
        <linearGradient id="od-stroke" x1="0" x2="1">
          <stop offset="0" stopColor="#46b78a" />
          <stop offset="1" stopColor="#92aff9" />
        </linearGradient>
        <linearGradient id="od-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7bd0aa" stopOpacity="0.35" />
          <stop offset="1" stopColor="#7bd0aa" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.2, 0.4, 0.6].map((g) => (
        <g key={g}>
          <line x1={left} x2={right} y1={y(g)} y2={y(g)} stroke="#fff" strokeOpacity="0.08" />
          <text x={right} y={y(g) - 3} textAnchor="end" fontSize="8" fill="#fff" fillOpacity="0.4">{g.toFixed(1).replace('.', ',')}</text>
        </g>
      ))}
      <line x1={left} x2={right} y1={y(OD_TARGET)} y2={y(OD_TARGET)} stroke="#fbbf24" strokeOpacity="0.75" strokeDasharray="4 4" />
      <text x={left} y={y(OD_TARGET) - 4} fontSize="8.5" fill="#fcd34d" fontWeight="600">Target panen 0,70</text>
      <path d={`${line} L${right},${bottom} L${left},${bottom} Z`} fill="url(#od-area)" />
      <path d={line} fill="none" stroke="url(#od-stroke)" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x(last)} cy={y(OD_SERIES[last])} r="9" fill="#92aff9" fillOpacity="0.25" />
      <circle cx={x(last)} cy={y(OD_SERIES[last])} r="4" fill="#fff" />
      <text x={left} y={H - 4} fontSize="8.5" fill="#fff" fillOpacity="0.5">12 hari lalu</text>
      <text x={right} y={H - 4} textAnchor="end" fontSize="8.5" fill="#fff" fillOpacity="0.5">Hari ini</text>
    </svg>
  );
};

/* Pola filamen spirulina berbentuk heliks sebagai latar hero */
const Helix: React.FC<{ className?: string }> = ({ className }) => {
  const filament = (y0: number, amp: number, phase: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      pts.push(`${i === 0 ? 'M' : 'L'}${(t * 600).toFixed(1)},${(y0 + amp * Math.sin(t * Math.PI * 9 + phase)).toFixed(1)}`);
    }
    return pts.join(' ');
  };
  const rungs: React.ReactNode[] = [];
  for (let i = 0; i <= 45; i++) {
    const t = i / 45;
    const xx = t * 600;
    const yA = 140 + 34 * Math.sin(t * Math.PI * 9);
    const yB = 140 + 34 * Math.sin(t * Math.PI * 9 + Math.PI);
    rungs.push(<line key={i} x1={xx} y1={yA} x2={xx} y2={yB} />);
  }
  return (
    <svg viewBox="0 0 600 280" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d={filament(140, 34, 0)} />
      <path d={filament(140, 34, Math.PI)} />
      <g strokeWidth="1" strokeOpacity="0.5">{rungs}</g>
    </svg>
  );
};

const SectionHead: React.FC<{ title: string; desc?: string; action?: React.ReactNode }> = ({ title, desc, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
    <div className="max-w-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h2>
      {desc && <p className="text-sm text-slate-500 mt-1.5">{desc}</p>}
    </div>
    {action}
  </div>
);

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate, featuredProducts, topMembers, onSelectProduct, onOpenBatchPassport
}) => {
  const features: { title: string; desc: string; icon: React.ReactNode; tab?: MainTab; sub?: string; cta: string }[] = [
    { title: 'ELINA Market', icon: <ShoppingBag className="w-5 h-5" />, tab: 'marketplace', sub: 'products', cta: 'Buka etalase',
      desc: 'Etalase produk pembudidaya terverifikasi untuk pembeli individu dan bisnis, dengan harga transparan dan pembayaran escrow.' },
    { title: 'ELINA Collective', icon: <Handshake className="w-5 h-5" />, tab: 'cooperative', sub: 'collective-selling', cta: 'Lihat pesanan kolektif',
      desc: 'Beberapa pembudidaya memenuhi satu pesanan besar lewat satu pintu, dengan akad wakalah bil ujrah dan bagi hasil transparan.' },
    { title: 'SmartFarm', icon: <Sprout className="w-5 h-5" />, tab: 'smartfarm', cta: 'Buka jurnal budidaya',
      desc: 'Jurnal budidaya digital untuk mencatat panen, biaya, dan kualitas, sekaligus membangun rekam jejak usaha.' },
    { title: 'Quality Passport', icon: <ShieldCheck className="w-5 h-5" />, tab: 'marketplace', sub: 'quality-passport', cta: 'Cek batch',
      desc: 'Asal dan kualitas tiap batch dapat ditelusuri pembeli, didukung verifikasi mitra dan uji laboratorium.' },
    { title: 'ELINA Academy', icon: <GraduationCap className="w-5 h-5" />, tab: 'academy', cta: 'Mulai belajar',
      desc: 'Pelatihan budidaya dan manajemen usaha digital, konsultasi mentor, serta onboarding pembudidaya baru.' },
    { title: 'ELINA Koperasi', icon: <Users2 className="w-5 h-5" />, tab: 'cooperative', sub: 'members', cta: 'Lihat komunitas',
      desc: 'Komunitas koperasi digital dengan forum, program referral, customer support, dan jalur ke buyer B2B.' },
    { title: 'Impact Dashboard', icon: <BarChart3 className="w-5 h-5" />, tab: 'impact', cta: 'Lihat dampak',
      desc: 'Dampak ekonomi dan sosial: pembudidaya terdampak, volume transaksi, dan produk yang tertelusuri.' },
    { title: 'ELINA Syariah', icon: <Landmark className="w-5 h-5" />, cta: 'Tahap pengembangan lanjutan',
      desc: 'Pembiayaan modal usaha dari lembaga keuangan syariah mitra, berbasis rekam jejak usaha di SmartFarm.' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white">
        <Helix className="absolute -right-24 -top-6 w-[720px] text-emerald-300 opacity-[0.12] -rotate-6 pointer-events-none -z-10" />
        <Helix className="absolute -left-40 bottom-10 w-[560px] text-teal-300 opacity-[0.08] rotate-12 pointer-events-none -z-10" />
        <div className="absolute -right-32 top-1/3 w-[26rem] h-[26rem] rounded-full bg-teal-500/20 blur-3xl pointer-events-none -z-10" />
        <div className="absolute -left-24 -top-24 w-[22rem] h-[22rem] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none -z-10" />

        <div className="grid lg:grid-cols-[1.02fr_1fr] gap-12 lg:gap-8 px-6 sm:px-10 lg:px-14 pt-12 lg:pt-16 pb-12 items-center">
          {/* Kiri: pesan utama */}
          <div className="space-y-7 animate-rise">
            <span className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-medium text-emerald-100">
              <span className="w-5 h-5 rounded-full bg-emerald-400/25 flex items-center justify-center"><Leaf className="w-3 h-3 text-emerald-300" /></span>
              Ekosistem Spirulina Nusantara
            </span>

            <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.4rem] font-extrabold leading-[1.08]">
              Spirulina berkualitas,{' '}
              <span className="bg-linear-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                langsung dari kolam petani
              </span>{' '}
              ke pembeli.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/85 leading-relaxed max-w-xl">
              ELINA menghubungkan pembudidaya spirulina dengan pembeli lewat harga transparan tanpa tengkulak, mutu batch yang bisa ditelusuri, dan penjualan kolektif untuk pesanan besar.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-btn-marketplace"
                onClick={() => onNavigate('marketplace')}
                className="px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-950/30"
              >
                <ShoppingBag className="w-4 h-4" /> Belanja di ELINA Market
              </button>
              <button
                id="hero-btn-smartfarm"
                onClick={() => onNavigate('smartfarm')}
                className="px-6 py-3.5 rounded-xl border border-white/25 bg-white/5 hover:bg-white/12 text-white font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Sprout className="w-4 h-4 text-emerald-300" /> Pantau kolam saya
              </button>
              <button
                id="hero-btn-bulk-order"
                onClick={() => onNavigate('marketplace', 'bulk-order')}
                className="px-1 py-3 text-sm font-semibold text-teal-200 hover:text-white underline underline-offset-4 decoration-teal-400/50 cursor-pointer"
              >
                Pesan partai besar
              </button>
            </div>
          </div>

          {/* Kanan: kartu data langsung */}
          <div className="relative sm:pt-10 sm:pb-12 sm:px-2 animate-rise" style={{ animationDelay: '140ms' }}>
            <aside
              aria-label="Contoh pembacaan sensor kolam"
              className="relative rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl shadow-black/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">Kolam Raceway A1</p>
                  <p className="text-xs text-emerald-200/80">Bantul, D.I. Yogyakarta</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-100 bg-emerald-400/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> Optimal
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-end justify-between mb-1">
                  <p className="text-xs text-emerald-100/75">Kepadatan alga (OD680)</p>
                  <p className="font-display text-2xl font-bold tabular leading-none">0,61</p>
                </div>
                <ODChart />
              </div>

              <dl className="grid grid-cols-3 gap-2.5 mt-4">
                {[
                  { icon: <Droplets className="w-3.5 h-3.5" />, label: 'pH', value: '9,6', note: 'Aman' },
                  { icon: <Thermometer className="w-3.5 h-3.5" />, label: 'Suhu', value: '31 °C', note: 'Aman' },
                  { icon: <Activity className="w-3.5 h-3.5" />, label: 'Siap panen', value: '3 hari', note: 'Estimasi' },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl bg-black/25 py-3 text-center">
                    <dt className="flex items-center justify-center gap-1 text-[11px] text-emerald-200/80">{m.icon}{m.label}</dt>
                    <dd className="font-display text-lg font-bold mt-0.5 tabular">{m.value}</dd>
                    <p className="text-[11px] text-emerald-300/90">{m.note}</p>
                  </div>
                ))}
              </dl>
              <p className="text-[11px] text-emerald-200/55 mt-3">Contoh tampilan. Data kolam Anda muncul di SmartFarm.</p>
            </aside>

            {/* Kartu melayang: kuota ekspor */}
            <button
              onClick={() => onNavigate('cooperative', 'collective-selling')}
              className="mt-3 sm:mt-0 sm:absolute sm:top-0 sm:right-0 w-full sm:w-60 text-left rounded-2xl bg-white text-slate-900 p-4 shadow-xl shadow-black/25 sm:animate-float cursor-pointer hover:shadow-2xl transition-shadow"
            >
              <span className="flex items-center gap-2 text-xs font-semibold text-teal-700">
                <Handshake className="w-4 h-4" /> ELINA Collective, batch Q3
              </span>
              <span className="block mt-1.5 font-display text-xl font-bold tabular">
                2.150 <span className="text-sm font-medium text-slate-500">/ 3.500 kg</span>
              </span>
              <span className="block mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                <span className="block h-full w-[61%] rounded-full bg-linear-to-r from-emerald-500 to-teal-500" />
              </span>
              <span className="block mt-1.5 text-[11px] text-slate-500">61% terkumpul, kuota masih terbuka</span>
            </button>

            {/* Kartu melayang: paspor mutu */}
            <button
              onClick={() => onOpenBatchPassport(featuredProducts[0]?.batchId ?? 'ELN-2026-SP881')}
              className="mt-3 sm:mt-0 sm:absolute sm:bottom-0 sm:left-0 w-full sm:w-64 text-left rounded-2xl bg-white text-slate-900 p-4 shadow-xl shadow-black/25 sm:animate-float cursor-pointer hover:shadow-2xl transition-shadow"
              style={{ animationDelay: '1.6s' }}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" /> Paspor mutu batch
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <BadgeCheck className="w-3 h-3" /> Terverifikasi
                </span>
              </span>
              <span className="block mt-1.5 font-mono text-sm font-bold">{featuredProducts[0]?.batchId ?? 'ELN-2026-SP881'}</span>
              <span className="block mt-1 text-[11px] text-slate-500">
                Protein {featuredProducts[0]?.proteinContent ?? '62%'} | Uji lab lolos | Asal batch tertelusuri
              </span>
            </button>
          </div>
        </div>

        {/* Bukti kepercayaan */}
        <ul className="relative grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 px-6 sm:px-10 lg:px-14 py-5 border-t border-white/10 bg-black/15 text-sm text-emerald-100/90">
          {[
            { icon: <BadgeCheck className="w-4 h-4" />, text: 'Harga transparan tanpa tengkulak' },
            { icon: <ScrollText className="w-4 h-4" />, text: 'Akad syariah, bebas riba, gharar, dan maysir' },
            { icon: <FlaskConical className="w-4 h-4" />, text: 'Verifikasi mitra dan uji lab per batch' },
            { icon: <ShieldCheck className="w-4 h-4" />, text: 'Pembayaran aman dengan rekening escrow' },
          ].map((t) => (
            <li key={t.text} className="flex items-center gap-2.5">
              <span className="w-7 h-7 shrink-0 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center">{t.icon}</span>
              {t.text}
            </li>
          ))}
        </ul>
      </section>

      {/* ============ IMPACT STRIP ============ */}
      <section aria-label="Ringkasan dampak">
        <dl className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl border border-slate-200 divide-x divide-y lg:divide-y-0 divide-slate-200 overflow-hidden">
          {[
            { v: '348', l: 'pembudidaya binaan', n: '+32 bulan ini, di 6 provinsi' },
            { v: '18,4 ton', l: 'biomassa terjual', n: 'Mutu Grade A+ untuk pangan dan farmasi' },
            { v: '33,1 ton', l: 'CO₂ terserap', n: '1 kg spirulina menyerap sekitar 1,8 kg CO₂' },
            { v: 'Rp 4,2 M', l: 'nilai transaksi', n: 'Pendapatan mitra naik 42%' },
          ].map((s) => (
            <div key={s.l} className="p-5 sm:p-6">
              <dd className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-900 tabular">{s.v}</dd>
              <dt className="text-sm font-semibold text-slate-700 mt-0.5">{s.l}</dt>
              <p className="text-xs text-slate-500 mt-1.5">{s.n}</p>
            </div>
          ))}
        </dl>
        <div className="mt-3 text-right">
          <button
            id="home-btn-detail-impact"
            onClick={() => onNavigate('impact')}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
          >
            Buka Impact Dashboard <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section className="space-y-6">
        <SectionHead
          title="Produk unggulan"
          desc="Dijual pembudidaya terverifikasi di ELINA Market, dengan paspor mutu di setiap batch."
          action={
            <button
              id="home-btn-all-products"
              onClick={() => onNavigate('marketplace', 'products')}
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              Lihat semua produk <ArrowRight className="w-4 h-4" />
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 3).map((prod) => (
            <article key={prod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col group hover:border-emerald-300 transition-colors">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img src={prod.image} alt={prod.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-white/95 text-emerald-900 text-xs font-semibold px-2.5 py-1 rounded-full">{prod.category}</span>
                  {prod.isOrganic && (
                    <span className="bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Organik
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="flex-1">
                  <p className="text-xs text-slate-500">{prod.farmerName}, {prod.farmLocation}</p>
                  <h3 className="font-display font-bold text-lg text-slate-900 mt-1 line-clamp-2">{prod.name}</h3>
                  <p className="text-sm text-slate-600 mt-2">
                    Protein {prod.proteinContent} <span className="text-slate-300 mx-1">|</span> Stok {prod.stockKg} kg
                  </p>
                  <button
                    onClick={() => onOpenBatchPassport(prod.batchId)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Lihat paspor mutu {prod.batchId}
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <p className="leading-tight">
                    <span className="font-display text-xl font-extrabold text-slate-900 tabular">
                      Rp {prod.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-slate-500"> / {prod.unit}</span>
                  </p>
                  <button
                    id={`btn-product-detail-${prod.id}`}
                    onClick={() => onSelectProduct(prod)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Tambah ke keranjang
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="space-y-6">
        <SectionHead title="Satu ekosistem, delapan fitur unggulan" desc="Dari penjualan dan pengadaan, pencatatan budidaya, hingga pembiayaan syariah dan dampak, semuanya terhubung dalam satu aplikasi." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((p) => {
            const body = (
              <>
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                  p.tab ? 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {p.icon}
                </span>
                <span className="block font-display font-bold text-lg text-slate-900 mt-4">{p.title}</span>
                <span className="block text-sm text-slate-600 leading-relaxed mt-1.5 flex-1">{p.desc}</span>
                <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${p.tab ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {p.cta} {p.tab && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                </span>
              </>
            );
            return p.tab ? (
              <button key={p.title} onClick={() => onNavigate(p.tab!, p.sub)}
                className="text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition-colors cursor-pointer group flex flex-col">
                {body}
              </button>
            ) : (
              <div key={p.title} className="p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex flex-col">
                {body}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ MEMBERS ============ */}
      <section className="space-y-6">
        <SectionHead
          title="Mitra pembudidaya terverifikasi"
          desc="Pembudidaya yang sudah melewati verifikasi mitra dan kurasi ELINA."
          action={
            <button
              id="home-btn-all-members"
              onClick={() => onNavigate('cooperative', 'members')}
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              Lihat anggota koperasi <ChevronRight className="w-4 h-4" />
            </button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topMembers.slice(0, 3).map((m) => (
            <article key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">{m.name}</h3>
                  <p className="text-sm text-emerald-700 font-semibold">{m.farmName}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{m.location}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Award className="w-3 h-3" /> {m.verificationStatus}
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100 text-sm">
                <div><dt className="text-xs text-slate-500">Kolam</dt><dd className="font-semibold text-slate-800">{m.pondCount} raceway</dd></div>
                <div><dt className="text-xs text-slate-500">Kapasitas</dt><dd className="font-semibold text-slate-800 tabular">{m.monthlyCapacityKg} kg/bulan</dd></div>
              </dl>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Bergabung {m.joinDate}</span>
                <button onClick={() => onNavigate('marketplace', 'quality-passport')} className="text-emerald-700 font-semibold hover:underline cursor-pointer">
                  Cek mutu batch
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
