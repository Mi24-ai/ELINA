export type MainTab = 
  | 'home' 
  | 'marketplace' 
  | 'smartfarm' 
  | 'academy' 
  | 'cooperative' 
  | 'impact' 
  | 'profile';

export type MarketplaceSubTab = 'products' | 'bulk-order' | 'quality-passport' | 'transactions';
export type SmartFarmSubTab = 'dashboard' | 'monitoring' | 'journal' | 'harvest';
export type AcademySubTab = 'courses' | 'progress' | 'mentors';
export type CooperativeSubTab = 'members' | 'collective-selling' | 'procurement' | 'finance';
export type ImpactSubTab = 'economic' | 'social' | 'environmental';
export type ProfileSubTab = 'farmer' | 'verification' | 'orders' | 'settings';

export interface Product {
  id: string;
  name: string;
  category: 'Powder' | 'Capsule' | 'Fresh Biomass' | 'Extract' | 'Cosmetic';
  price: number;
  unit: string;
  minOrder: number;
  stockKg: number;
  rating: number;
  reviewsCount: number;
  farmerName: string;
  farmLocation: string;
  batchId: string;
  certifications: string[];
  description: string;
  proteinContent: string;
  image: string;
  isOrganic: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BulkOrder {
  id: string;
  buyerName: string;
  companyName: string;
  productType: string;
  targetQuantityKg: number;
  targetDate: string;
  targetPricePerKg: number;
  notes: string;
  status: 'Draft' | 'Diverifikasi' | 'Alokasi Petani' | 'Pengiriman' | 'Selesai';
  allocatedFarmers: { farmerName: string; quotaKg: number }[];
  createdAt: string;
}

export interface QualityPassport {
  batchId: string;
  productName: string;
  farmerName: string;
  farmName: string;
  location: string;
  coordinates: string;
  harvestDate: string;
  dryingDate: string;
  dryingMethod: string;
  proteinPercent: number;
  phycocyaninPercent: number;
  moisturePercent: number;
  ashPercent: number;
  heavyMetals: {
    leadPb: string; // e.g. "< 0.02 mg/kg"
    mercuryHg: string;
    arsenicAs: string;
    cadmiumCd: string;
  };
  microbiology: {
    totalPlateCount: string;
    coliform: string;
    salmonella: string;
  };
  labCertNo: string;
  labName: string;
  halalCert: string;
  bpomReg: string;
  blockchainHash: string;
  verifiedStatus: 'Verified Gold' | 'Verified Silver' | 'Pending Audit';
}

export interface PondData {
  id: string;
  name: string;
  type: 'Raceway Open Pond' | 'Greenhouse Raceway' | 'Closed Photobioreactor';
  volumeLiters: number;
  status: 'Optimal' | 'Perlu Perhatian' | 'Siap Panen' | 'Inokulasi';
  ph: number;
  temperatureC: number;
  opticalDensity: number; // OD680
  secchiDepthCm: number; // turbiditas mikroalga
  salinityPpt: number;
  dissolvedOxygenMgL: number;
  paddleWheelRpm: number;
  lastFedDate: string;
  daysSinceInoculation: number;
  estHarvestDays: number;
  estimatedBiomassKg: number;
}

export interface FarmJournalEntry {
  id: string;
  pondId: string;
  pondName: string;
  date: string;
  time: string;
  activityType: 'Pemberian Nutrisi' | 'Pengukuran Air' | 'Pembersihan Kolam' | 'Aerasi / Paddlewheel' | 'Inokulasi Bibit' | 'Lainnya';
  nutrientsAdded: string;
  ph: number;
  temp: number;
  weather: 'Cerah Terik' | 'Cerah Berawan' | 'Mendung' | 'Hujan Ringan';
  notes: string;
  author: string;
}

export interface HarvestRecord {
  id: string;
  batchId: string;
  pondName: string;
  harvestDate: string;
  wetWeightKg: number;
  dryWeightKg: number;
  meshSizeUsed: string; // e.g. 300 mesh
  dryingMethod: string;
  qualityGrade: 'Grade A+' | 'Grade A' | 'Grade B';
  operator: string;
  status: 'Disimpan di Gudang' | 'Diuji Lab' | 'Masuk Marketplace';
}

export interface Course {
  id: string;
  title: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan' | 'Bisnis & Ekspor';
  durationHours: number;
  modulesCount: number;
  instructor: string;
  role: string;
  rating: number;
  enrolledStudents: number;
  description: string;
  isCompleted?: boolean;
  progressPercent: number;
  topics: string[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  institution: string;
  specialization: string[];
  experienceYears: number;
  rating: number;
  consultationsDone: number;
  availableDays: string;
  consultationFee: string;
  avatar: string;
  bio: string;
}

export interface CoopMember {
  id: string;
  name: string;
  farmName: string;
  location: string;
  pondCount: number;
  monthlyCapacityKg: number;
  joinDate: string;
  shareSavings: number; // Simpanan wajib & sukarela (IDR)
  verificationStatus: 'Terverifikasi SNI' | 'Dalam Peninjauan' | 'Koperasi Pratama';
  contact: string;
}

export interface CollectiveContract {
  id: string;
  buyer: string;
  industry: 'Farmasi' | 'Suplemen Makanan' | 'Kosmetik' | 'Ekspor Internasional';
  targetKg: number;
  fulfilledKg: number;
  pricePerKg: number;
  deadline: string;
  status: 'Aktif Terbuka' | 'Hampir Terpenuhi' | 'Siap Dikirim';
  contributingFarmers: number;
}

export interface ProcurementItem {
  id: string;
  name: string;
  category: 'Nutrisi & Garam' | 'Mesin & Aerator' | 'Filter & Jaring' | 'Kemasan Alumunium';
  normalPrice: number;
  groupPrice: number;
  unit: string;
  minGroupVolume: number;
  currentOrdersCount: number;
  daysRemaining: number;
  supplier: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'pond-alert' | 'order' | 'academy' | 'coop';
  timestamp: string;
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole: 'buyer' | 'farmer' | 'mentor' | 'coop-admin';
  text: string;
  timestamp: string;
  isMe: boolean;
}
