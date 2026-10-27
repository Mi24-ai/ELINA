import { useEffect } from 'react';

/** Tutup dengan tombol Esc dan kunci scroll halaman selama drawer terbuka. */
export function useDrawer(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);
}
