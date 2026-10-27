import React from 'react';
import {
  Home, ShoppingBag, Sprout, GraduationCap, Users2, BarChart3, User,
  MessageSquare, Bell, ShoppingCart
} from 'lucide-react';
import { MainTab } from '../types';

interface NavbarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  cartCount: number;
  unreadNotifsCount: number;
  onOpenCart: () => void;
  onOpenNotifs: () => void;
  onOpenChat: () => void;
  userRole: string;
  onChangeUserRole: (role: string) => void;
}

const ROLES = [
  'Pembudidaya Mitra',
  'Pembeli B2B / Industri',
  'Konsumen Retail',
  'Pengurus Koperasi'
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab, onSelectTab, cartCount, unreadNotifsCount,
  onOpenCart, onOpenNotifs, onOpenChat, userRole, onChangeUserRole
}) => {
  const navItems: { id: MainTab; label: string; short?: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { id: 'marketplace', label: 'ELINA Market', short: 'Market', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'smartfarm', label: 'SmartFarm', icon: <Sprout className="w-4 h-4" /> },
    { id: 'academy', label: 'ELINA Academy', short: 'Academy', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'cooperative', label: 'ELINA Koperasi', short: 'Koperasi', icon: <Users2 className="w-4 h-4" /> },
    { id: 'impact', label: 'Impact Dashboard', short: 'Impact', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'profile', label: 'Profil', icon: <User className="w-4 h-4" /> },
  ];

  const iconBtn =
    'relative p-2.5 rounded-xl text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      {/* Info strip */}
      <div className="bg-linear-to-r from-emerald-900 to-teal-900 text-emerald-50 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
          <p className="truncate">
            ELINA Collective: pesanan kolektif batch Q3 sedang dibuka,
            <span className="font-semibold tabular"> 2.150 dari 3.500 kg</span> terkumpul
          </p>
          <label className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-emerald-200">Masuk sebagai</span>
            <select
              id="role-selector"
              aria-label="Pilih peran akun"
              value={userRole}
              onChange={(e) => onChangeUserRole(e.target.value)}
              className="bg-white/10 hover:bg-white/15 text-white rounded-md px-2 py-0.5 border border-white/25 cursor-pointer"
            >
              {/* nilai tetap dipertahankan agar peran aktif dari App.tsx tetap terpilih */}
              {!ROLES.includes(userRole) && <option value={userRole} className="text-slate-900">{userRole}</option>}
              {ROLES.map((r) => (
                <option key={r} value={r} className="text-slate-900">{r}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => onSelectTab('home')}
            aria-label="ELINA, ke beranda"
            className="flex items-center gap-3 cursor-pointer shrink-0 text-left"
          >
            <img src="/logo-elina-mark.png" alt="" className="h-11 w-auto shrink-0" />
            <span className="leading-none">
              <span className="block font-display text-2xl font-extrabold tracking-tight text-emerald-900">ELINA</span>
              <span className="hidden sm:block text-[11px] text-slate-500 mt-1">
                Ekosistem Spirulina Nusantara
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav aria-label="Navigasi utama" className="hidden xl:flex items-center gap-0.5 min-w-0">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center gap-1.5 px-2.5 2xl:px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'text-emerald-900 bg-emerald-50'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-100'
                  }`}
                >
                  <span className={`hidden 2xl:inline-flex ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>{item.icon}</span>
                  <span className="2xl:hidden">{item.short ?? item.label}</span>
                  <span className="hidden 2xl:inline">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-[13px] left-3 right-3 h-0.5 rounded-full bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button id="btn-open-chat" onClick={onOpenChat} aria-label="Buka pesan" className={iconBtn}>
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              id="btn-open-notifs"
              onClick={onOpenNotifs}
              aria-label={`Notifikasi${unreadNotifsCount > 0 ? `, ${unreadNotifsCount} belum dibaca` : ''}`}
              className={iconBtn}
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white tabular">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            <button
              id="btn-open-cart"
              onClick={onOpenCart}
              aria-label={`Keranjang, ${cartCount} item`}
              className="ml-1 flex items-center gap-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden 2xl:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="bg-white text-emerald-800 text-xs min-w-5 h-5 px-1 rounded-full font-bold flex items-center justify-center tabular">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav aria-label="Navigasi utama (ponsel)" className="xl:hidden flex items-center gap-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-100">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                  isActive ? 'bg-emerald-700 text-white' : 'text-slate-600 bg-slate-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
