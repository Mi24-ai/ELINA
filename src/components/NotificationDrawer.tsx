import React from 'react';
import { Bell, X, AlertTriangle, Package, GraduationCap, Users, CheckCheck } from 'lucide-react';
import { NotificationItem } from '../types';
import { useDrawer } from './useDrawer';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

const TYPE_STYLE: Record<NotificationItem['type'], { icon: React.ReactNode; tone: string }> = {
  'pond-alert': { icon: <AlertTriangle className="w-4 h-4" />, tone: 'bg-amber-100 text-amber-700' },
  order: { icon: <Package className="w-4 h-4" />, tone: 'bg-teal-100 text-teal-700' },
  coop: { icon: <Users className="w-4 h-4" />, tone: 'bg-emerald-100 text-emerald-700' },
  academy: { icon: <GraduationCap className="w-4 h-4" />, tone: 'bg-sky-100 text-sky-700' },
};

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen, onClose, notifications, onMarkAllRead
}) => {
  useDrawer(isOpen, onClose);
  if (!isOpen) return null;

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-fade-in" onClick={onClose}>
      <aside
        role="dialog" aria-modal="true" aria-label="Pusat notifikasi"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-drawer-in"
      >
        <header className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-700" />
            <h3 className="font-display font-bold text-slate-900">Notifikasi</h3>
            {unread > 0 && <span className="text-xs bg-rose-100 text-rose-700 font-semibold px-2 py-0.5 rounded-full">{unread} baru</span>}
          </div>
          <button onClick={onClose} aria-label="Tutup notifikasi" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </header>

        {unread > 0 && (
          <button onClick={onMarkAllRead} className="mx-4 mt-3 self-start text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5 cursor-pointer">
            <CheckCheck className="w-4 h-4" /> Tandai semua sudah dibaca
          </button>
        )}

        <ul className="flex-1 p-4 overflow-y-auto space-y-2.5">
          {notifications.length === 0 && (
            <li className="text-center text-sm text-slate-500 py-16">
              Belum ada notifikasi. Peringatan kolam dan status pesanan akan muncul di sini.
            </li>
          )}
          {notifications.map((n) => {
            const s = TYPE_STYLE[n.type];
            return (
              <li
                key={n.id}
                className={`p-3.5 rounded-xl border flex gap-3 ${n.isRead ? 'bg-white border-slate-200' : 'bg-emerald-50/60 border-emerald-200'}`}
              >
                <span className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${s.tone}`}>{s.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{n.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{n.message}</p>
                  <p className="text-[11px] text-slate-400 mt-1.5">{n.timestamp}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="p-3 border-t border-slate-200 text-center text-xs text-slate-400">
          Terhubung ke sensor SmartFarm dan gateway koperasi
        </footer>
      </aside>
    </div>
  );
};
