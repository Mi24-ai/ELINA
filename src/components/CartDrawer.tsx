import React, { useState } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { useDrawer } from './useDrawer';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  userRole: string;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, userRole
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [trxId, setTrxId] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'Standard' | 'ColdChain'>('Standard');

  useDrawer(isOpen, onClose);
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((a, i) => a + i.product.price * i.quantity, 0);
  const isMember = userRole.includes('Mitra') || userRole.includes('Koperasi');
  const discount = isMember ? Math.round(subtotal * 0.05) : 0;
  const shippingFee = cartItems.length === 0 ? 0 : deliveryMethod === 'ColdChain' ? 45000 : 25000;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleCheckout = () => {
    // ID dibuat sekali saat checkout, bukan di setiap render
    setTrxId(`TRX-${Date.now().toString().slice(-6)}`);
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 3500);
  };

  const deliveryOptions = [
    { id: 'Standard' as const, label: 'Reguler cargo', note: 'Suhu ruang, 3 sampai 5 hari', fee: 25000 },
    { id: 'ColdChain' as const, label: 'Cold-chain beku', note: 'Untuk biomassa segar', fee: 45000 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-fade-in" onClick={onClose}>
      <aside
        role="dialog" aria-modal="true" aria-label="Keranjang belanja"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-drawer-in"
      >
        <header className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-700" />
            <h3 className="font-display font-bold text-slate-900">Keranjang</h3>
            <span className="text-sm text-slate-400">{cartItems.length} produk</span>
          </div>
          <button onClick={onClose} aria-label="Tutup keranjang" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
          {checkoutSuccess ? (
            <div role="status" className="h-full flex flex-col items-center justify-center text-center gap-3 px-6">
              <span className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </span>
              <h4 className="font-display text-xl font-bold text-slate-900">Pesanan dibuat</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nomor transaksi <span className="font-mono font-semibold">{trxId}</span>. Petani mitra mulai menyiapkan panen dan kemasan bersertifikat.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-6">
              <ShoppingCart className="w-12 h-12 text-slate-300" />
              <h4 className="font-display font-bold text-slate-800">Keranjang masih kosong</h4>
              <p className="text-sm text-slate-500">Pilih bubuk, kapsul, atau biomassa segar di ELINA Market.</p>
              <button onClick={onClose} className="mt-1 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold cursor-pointer">
                Lanjut belanja
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <ul className="space-y-3">
                {cartItems.map((item) => (
                  <li key={item.product.id} className="p-3 rounded-xl border border-slate-200 flex gap-3">
                    <img src={item.product.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-slate-500 tabular">{rp(item.product.price)} / {item.product.unit}</p>
                      <p className="text-[11px] text-emerald-700 font-mono mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {item.product.batchId}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button aria-label="Kurangi jumlah" onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-slate-100 cursor-pointer">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-sm font-semibold tabular" aria-live="polite">{item.quantity}</span>
                          <button aria-label="Tambah jumlah" onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-slate-100 cursor-pointer">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button aria-label={`Hapus ${item.product.name}`} onClick={() => onRemoveItem(item.product.id)} className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <fieldset>
                <legend className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Truck className="w-4 h-4 text-emerald-600" /> Pengiriman
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {deliveryOptions.map((o) => (
                    <label
                      key={o.id}
                      className={`p-3 rounded-xl border cursor-pointer transition-colors has-focus-visible:outline-2 has-focus-visible:outline-teal-500 ${
                        deliveryMethod === o.id ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input type="radio" name="delivery" className="sr-only" checked={deliveryMethod === o.id} onChange={() => setDeliveryMethod(o.id)} />
                      <span className="block text-sm font-semibold text-slate-900">{o.label}</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">{o.note}</span>
                      <span className="block text-xs font-semibold text-emerald-800 mt-1 tabular">{rp(o.fee)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          )}
        </div>

        {cartItems.length > 0 && !checkoutSuccess && (
          <footer className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <dl className="space-y-1.5 text-sm tabular">
              <div className="flex justify-between text-slate-600"><dt>Subtotal</dt><dd>{rp(subtotal)}</dd></div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium"><dt>Diskon anggota koperasi (5%)</dt><dd>- {rp(discount)}</dd></div>
              )}
              <div className="flex justify-between text-slate-600"><dt>Ongkos kirim</dt><dd>{rp(shippingFee)}</dd></div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                <dt className="font-semibold text-slate-900">Total</dt>
                <dd className="font-display text-xl font-extrabold text-emerald-800">{rp(total)}</dd>
              </div>
            </dl>
            <button onClick={handleCheckout} className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors cursor-pointer">
              Bayar {rp(total)}
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
};
