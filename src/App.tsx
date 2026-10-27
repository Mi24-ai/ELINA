/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { MarketplaceView } from './components/MarketplaceView';
import { SmartFarmView } from './components/SmartFarmView';
import { AcademyView } from './components/AcademyView';
import { CooperativeView } from './components/CooperativeView';
import { ImpactView } from './components/ImpactView';
import { ProfileView } from './components/ProfileView';
import { CartDrawer } from './components/CartDrawer';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ChatDrawer } from './components/ChatDrawer';
import {
  INITIAL_PRODUCTS,
  INITIAL_QUALITY_PASSPORTS,
  INITIAL_BULK_ORDERS,
  INITIAL_PONDS,
  INITIAL_JOURNAL,
  INITIAL_HARVESTS,
  INITIAL_COURSES,
  INITIAL_MENTORS,
  INITIAL_COOP_MEMBERS,
  INITIAL_COLLECTIVE_CONTRACTS,
  INITIAL_PROCUREMENT_ITEMS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT
} from './data/mockData';
import {
  MainTab,
  MarketplaceSubTab,
  SmartFarmSubTab,
  AcademySubTab,
  CooperativeSubTab,
  ImpactSubTab,
  ProfileSubTab,
  CartItem,
  Product,
  BulkOrder,
  HarvestRecord,
  FarmJournalEntry,
  ChatMessage,
  PondData,
  QualityPassport,
  CollectiveContract
} from './types';
import { MessageSquare, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [marketplaceSubTab, setMarketplaceSubTab] = useState<MarketplaceSubTab>('products');
  const [smartfarmSubTab, setSmartfarmSubTab] = useState<SmartFarmSubTab>('dashboard');
  const [academySubTab, setAcademySubTab] = useState<AcademySubTab>('courses');
  const [cooperativeSubTab, setCooperativeSubTab] = useState<CooperativeSubTab>('members');
  const [impactSubTab, setImpactSubTab] = useState<ImpactSubTab>('economic');
  const [profileSubTab, setProfileSubTab] = useState<ProfileSubTab>('farmer');
  const [selectedBatchId, setSelectedBatchId] = useState<string>('ELN-2026-SP881');

  // User State
  const [userRole, setUserRole] = useState('Pembudidaya (Mitra Koperasi)');

  // Business Data State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [passports, setPassports] = useState<QualityPassport[]>(INITIAL_QUALITY_PASSPORTS);
  const [bulkOrders, setBulkOrders] = useState<BulkOrder[]>(INITIAL_BULK_ORDERS);
  const [ponds, setPonds] = useState<PondData[]>(INITIAL_PONDS);
  const [journals, setJournals] = useState<FarmJournalEntry[]>(INITIAL_JOURNAL);
  const [harvests, setHarvests] = useState<HarvestRecord[]>(INITIAL_HARVESTS);
  const [courses] = useState(INITIAL_COURSES);
  const [mentors] = useState(INITIAL_MENTORS);
  const [members] = useState(INITIAL_COOP_MEMBERS);
  const [contracts, setContracts] = useState<CollectiveContract[]>(INITIAL_COLLECTIVE_CONTRACTS);
  const [procurementItems, setProcurementItems] = useState(INITIAL_PROCUREMENT_ITEMS);

  // Cart & Drawers State
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRecipient, setChatRecipient] = useState('Pusat Layanan Koperasi ELINA');

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Bulk Order Handler
  const handleCreateBulkOrder = (newOrder: Omit<BulkOrder, 'id' | 'status' | 'allocatedFarmers' | 'createdAt'>) => {
    const fullOrder: BulkOrder = {
      ...newOrder,
      id: `BLK-2026-${String(bulkOrders.length + 81).padStart(3, '0')}`,
      status: 'Draft',
      allocatedFarmers: [],
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    setBulkOrders((prev) => [fullOrder, ...prev]);

    // Push notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Bulk Order Baru Diajukan',
      message: `${fullOrder.companyName} mengajukan pesanan ${fullOrder.targetQuantityKg} kg ${fullOrder.productType}.`,
      timestamp: 'Baru saja',
      isRead: false,
      type: 'order' as const
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // SmartFarm Handlers
  const handleAddHarvest = (newHarvest: Omit<HarvestRecord, 'id' | 'batchId'>) => {
    const batchNum = 895 + harvests.length + 1;
    const batchId = `ELN-2026-SP${batchNum}`;
    const record: HarvestRecord = {
      ...newHarvest,
      id: `hrv-${Date.now()}`,
      batchId
    };
    setHarvests((prev) => [record, ...prev]);

    // Automatically generate or update Quality Passport
    const newPassport: QualityPassport = {
      batchId: batchId,
      productName: 'Spirulina Organik Segar Panen Baru',
      farmerName: 'Sukardi',
      farmName: 'Farm Alga Mulia Bantul',
      location: 'Bantul, D.I. Yogyakarta',
      coordinates: '7.8753° S, 110.3276° E',
      harvestDate: newHarvest.harvestDate,
      dryingDate: newHarvest.harvestDate,
      dryingMethod: newHarvest.dryingMethod,
      proteinPercent: 68.4,
      phycocyaninPercent: 18.2,
      moisturePercent: 5.2,
      ashPercent: 6.8,
      heavyMetals: {
        leadPb: '< 0.02 mg/kg (Aman)',
        mercuryHg: '< 0.005 mg/kg (Aman)',
        arsenicAs: '< 0.01 mg/kg (Aman)',
        cadmiumCd: '< 0.005 mg/kg (Aman)'
      },
      microbiology: {
        totalPlateCount: '< 2.0 x 10² CFU/g',
        coliform: 'Negatif',
        salmonella: 'Negatif'
      },
      labCertNo: `LAB-KAN-2026-${batchNum}`,
      labName: 'Balai Besar Standardisasi Standard Agro Kemenperin',
      halalCert: 'ID3421000189204',
      bpomReg: 'P-IRT 2083402010892-28',
      blockchainHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      verifiedStatus: 'Verified Gold'
    };
    setPassports((prev) => [newPassport, ...prev]);

    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Batch Panen Baru Disimpan & Paspor Terbit',
        message: `${newHarvest.wetWeightKg} kg dari ${newHarvest.pondName} tercatat. Quality Passport ${batchId} siap dibagikan ke buyer.`,
        timestamp: 'Baru saja',
        isRead: false,
        type: 'pond-alert'
      },
      ...prev
    ]);
  };

  const handleAddJournal = (newEntry: Omit<FarmJournalEntry, 'id'>) => {
    const entry: FarmJournalEntry = {
      ...newEntry,
      id: `jnl-${Date.now()}`
    };
    setJournals((prev) => [entry, ...prev]);
  };

  const handleUpdatePond = (pondId: string, updates: Partial<PondData>) => {
    setPonds((prev) =>
      prev.map((p) => (p.id === pondId ? { ...p, ...updates } : p))
    );
  };

  // Cooperative Selling Participation Handler
  const handleParticipateSelling = (contractId: string, kg: number) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          const newFulfilled = Math.min(c.targetKg, c.fulfilledKg + kg);
          const status = newFulfilled >= c.targetKg 
            ? 'Siap Dikirim' 
            : newFulfilled >= c.targetKg * 0.8 
            ? 'Hampir Terpenuhi' 
            : 'Aktif Terbuka';
          return {
            ...c,
            fulfilledKg: newFulfilled,
            contributingFarmers: c.contributingFarmers + 1,
            status
          };
        }
        return c;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Kontribusi Penjualan Kolektif Diterima',
        message: `Setoran pasokan ${kg} kg Anda telah dicatat ke kontrak koperasi.`,
        timestamp: 'Baru saja',
        isRead: false,
        type: 'coop'
      },
      ...prev
    ]);
  };

  // Cooperative Procurement Participation Handler
  const handleJoinProcurement = (itemId: string, qty: number) => {
    setProcurementItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            currentOrdersCount: item.currentOrdersCount + qty
          };
        }
        return item;
      })
    );
  };

  // Chat Handlers
  const handleSendMessage = (text: string) => {
    const roleKey = userRole.includes('Pembudidaya') ? 'farmer' : userRole.includes('Retail') ? 'buyer' : 'coop-admin';
    const myMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: `Saya (${userRole.split(' ')[0]})`,
      senderRole: roleKey,
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      isMe: true
    };
    setMessages((prev) => [...prev, myMsg]);

    // Simulated Auto-Reply from ELINA Support / Mentor
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'Tim Koperasi & Lab ELINA',
        senderRole: 'coop-admin',
        text: 'Terima kasih atas pesan Anda. Dokumen spesifikasi dan tanggapan teknis kami telah disinkronkan ke sistem.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        isMe: false
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  const handleOpenChatWithMentor = (mentorName: string) => {
    setChatRecipient(`Konsultasi: ${mentorName}`);
    setIsChatOpen(true);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        unreadNotifsCount={unreadCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifs={() => setIsNotifOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        userRole={userRole}
        onChangeUserRole={setUserRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab, subTab) => {
              setActiveTab(tab);
              if (subTab) {
                if (tab === 'marketplace') setMarketplaceSubTab(subTab as MarketplaceSubTab);
                if (tab === 'smartfarm') setSmartfarmSubTab(subTab as SmartFarmSubTab);
                if (tab === 'academy') setAcademySubTab(subTab as AcademySubTab);
                if (tab === 'cooperative') setCooperativeSubTab(subTab as CooperativeSubTab);
                if (tab === 'impact') setImpactSubTab(subTab as ImpactSubTab);
                if (tab === 'profile') setProfileSubTab(subTab as ProfileSubTab);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            featuredProducts={products.slice(0, 4)}
            topMembers={members.slice(0, 3)}
            onSelectProduct={(product) => {
              handleAddToCart(product, 1);
            }}
            onOpenBatchPassport={(batchId) => {
              setSelectedBatchId(batchId);
              setMarketplaceSubTab('quality-passport');
              setActiveTab('marketplace');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            initialSubTab={marketplaceSubTab}
            products={products}
            qualityPassports={passports}
            bulkOrders={bulkOrders}
            selectedBatchId={selectedBatchId}
            onAddToCart={handleAddToCart}
            onSubmitBulkOrder={handleCreateBulkOrder}
            onOpenBatchPassport={(batchId) => {
              setSelectedBatchId(batchId);
              setMarketplaceSubTab('quality-passport');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'smartfarm' && (
          <SmartFarmView
            initialSubTab={smartfarmSubTab}
            ponds={ponds}
            journalEntries={journals}
            harvestRecords={harvests}
            onAddJournalEntry={handleAddJournal}
            onAddHarvestRecord={handleAddHarvest}
            onUpdatePond={handleUpdatePond}
          />
        )}

        {activeTab === 'academy' && (
          <AcademyView
            initialSubTab={academySubTab}
            courses={courses}
            mentors={mentors}
            onOpenChatWithMentor={handleOpenChatWithMentor}
          />
        )}

        {activeTab === 'cooperative' && (
          <CooperativeView
            initialSubTab={cooperativeSubTab}
            members={members}
            contracts={contracts}
            procurementItems={procurementItems}
            onParticipateSelling={handleParticipateSelling}
            onJoinProcurement={handleJoinProcurement}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactView initialSubTab={impactSubTab} />
        )}

        {activeTab === 'profile' && (
          <ProfileView initialSubTab={profileSubTab} userRole={userRole} />
        )}
      </main>

      {/* Persistent Footer */}
      <footer className="bg-slate-900 text-slate-400 mt-16 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center">
                  <img src="/logo-elina-mark.png" alt="" className="w-full h-full object-contain" />
                </span>
                <span className="font-extrabold text-base text-white tracking-wide">
                  ELINA
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Ekosistem Spirulina Nusantara. Platform agritech dan fintech syariah yang menghubungkan pembudidaya spirulina dengan pembeli lewat marketplace, pengadaan kolektif, verifikasi kualitas, dan pembiayaan syariah.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                <Leaf className="w-3.5 h-3.5" /> Transaksi sesuai prinsip syariah
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Fitur Ekosistem
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => { setActiveTab('marketplace'); setMarketplaceSubTab('products'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    ELINA Market & Bulk Order
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('marketplace'); setMarketplaceSubTab('quality-passport'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    Quality Passport
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('smartfarm'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    SmartFarm, Jurnal Budidaya
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('academy'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    ELINA Academy
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('cooperative'); window.scrollTo(0, 0); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    ELINA Koperasi & Collective
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Kualitas & Prinsip Syariah
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verifikasi mitra dan kurasi produk
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Uji laboratorium lembaga pengujian mitra
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Akad ditinjau Dewan Pengawas Syariah
                </li>
                <li className="flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" /> Kemitraan kelompok dan koperasi pembudidaya
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Kantor ELINA
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Jl. Kartika No.12, Jebres, Surakarta, Jawa Tengah
              </p>
              <p className="mt-2 text-slate-400">
                Telepon: 0813-2588-5673
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© 2026 ELINA (Ekosistem Spirulina Nusantara). Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex items-center gap-4">
              <span>Kemitraan dengan kelompok pembudidaya, lembaga pengujian, dan lembaga keuangan syariah</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Prototype 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Tombol bantuan: ringkas agar tidak menutupi data kolam */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          id="btn-floating-chat"
          onClick={() => setIsChatOpen(true)}
          aria-label="Tanya mentor atau admin"
          title="Tanya mentor atau admin"
          className="w-12 h-12 lg:w-auto lg:h-auto lg:px-4 lg:py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg shadow-emerald-900/30 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden lg:inline">Tanya mentor</span>
        </button>
      </div>

      {/* Interactive Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        userRole={userRole}
      />

      <NotificationDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        }}
      />

      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        defaultRecipient={chatRecipient}
      />
    </div>
  );
}
