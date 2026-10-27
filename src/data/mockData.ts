import { 
  Product, 
  QualityPassport, 
  PondData, 
  FarmJournalEntry, 
  HarvestRecord, 
  Course, 
  Mentor, 
  CoopMember, 
  CollectiveContract, 
  ProcurementItem, 
  BulkOrder,
  NotificationItem,
  ChatMessage
} from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Spirulina Platensis Powder Grade A+ (Food & Pharma)',
    category: 'Powder',
    price: 385000,
    unit: '1 kg Foil Pack',
    minOrder: 1,
    stockKg: 420,
    rating: 4.9,
    reviewsCount: 128,
    farmerName: 'Kelompok Tani Alga Mulia (Mitra Bantul)',
    farmLocation: 'Bantul, D.I. Yogyakarta',
    batchId: 'ELN-2026-SP881',
    certifications: ['Halal MUI', 'BPOM RI MD', 'HACCP Grade', 'ISO 22000'],
    description: 'Bubuk spirulina murni 100% dikeringkan dengan low-temperature solar dome dryer untuk menjaga keutuhan fikosianin dan protein hingga 68.4%. Sangat cocok untuk industri pangan dan suplemen.',
    proteinContent: '68.4%',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    isOrganic: true
  },
  {
    id: 'prod-2',
    name: 'Kapsul Spirulina Organik 500mg (Isi 100)',
    category: 'Capsule',
    price: 145000,
    unit: 'Botol (100 kapsul)',
    minOrder: 2,
    stockKg: 180,
    rating: 4.8,
    reviewsCount: 94,
    farmerName: 'CV Tirta Hijau Organik',
    farmLocation: 'Sukabumi, Jawa Barat',
    batchId: 'ELN-2026-SP892',
    certifications: ['BPOM TR', 'Halal Indonesia', 'Organik Indonesia'],
    description: 'Kapsul gelatin nabati halal berisi spirulina murni tanpa bahan pengawet ataupun pewarna sintetis. Kaya antioksidan, vitamin B kompleks, dan klorofil aktif.',
    proteinContent: '67.1%',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    isOrganic: true
  },
  {
    id: 'prod-3',
    name: 'Fresh Frozen Spirulina Biomass Paste (Grade Premium)',
    category: 'Fresh Biomass',
    price: 240000,
    unit: '1 kg Vacuum Frozen Block',
    minOrder: 5,
    stockKg: 250,
    rating: 4.9,
    reviewsCount: 46,
    farmerName: 'Agro Alga Mandiri',
    farmLocation: 'Pasuruan, Jawa Timur',
    batchId: 'ELN-2026-SP895',
    certifications: ['Uji Lab Sukofindo Bebas Patogen', 'Halal Indonesia'],
    description: 'Biomassa spirulina segar yang langsung dibekukan segera setelah penyaringan kain mesh 300. Rasa netral tidak berbau amis menyengat, ideal untuk cold-pressed juice dan smoothie bowl kafe modern.',
    proteinContent: '71.2% (Basis Kering)',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    isOrganic: true
  },
  {
    id: 'prod-4',
    name: 'Ekstrak Fikosianin Biru Alami (Phycocyanin E18 Liquid)',
    category: 'Extract',
    price: 1250000,
    unit: '500 ml Botol Amber',
    minOrder: 1,
    stockKg: 45,
    rating: 5.0,
    reviewsCount: 32,
    farmerName: 'Laboratorium Ekstraksi Spirulina Center',
    farmLocation: 'Sleman, D.I. Yogyakarta',
    batchId: 'ELN-2026-PC104',
    certifications: ['Food Grade Analysis', 'Sertifikat Bebas Logam Berat'],
    description: 'Pewarna alami biru cemerlang berkhasiat antioksidan tinggi diekstraksi menggunakan teknologi sentrifugasi dingin ramah lingkungan. Stabil untuk makanan minuman sehat dan kosmetik premium.',
    proteinContent: 'Konsentrat Fikosianin Murni (A620/A280 > 2.5)',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    isOrganic: true
  },
  {
    id: 'prod-5',
    name: 'Masker Wajah Spirulina & Kaolin Clay Skincare Grade',
    category: 'Cosmetic',
    price: 89000,
    unit: 'Jar 100 gram',
    minOrder: 3,
    stockKg: 120,
    rating: 4.7,
    reviewsCount: 78,
    farmerName: 'Koperasi Alga Lestari',
    farmLocation: 'Tabanan, Bali',
    batchId: 'ELN-2026-SK042',
    certifications: ['BPOM Notifikasi Kosmetik', 'Cruelty Free'],
    description: 'Formula masker detox wajah berbasis spirulina kaya seng, zat besi, dan vitamin E untuk peremajaan kulit, pembersih pori, serta mencerahkan wajah secara alami.',
    proteinContent: '64.5%',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    isOrganic: true
  }
];

export const INITIAL_QUALITY_PASSPORTS: QualityPassport[] = [
  {
    batchId: 'ELN-2026-SP881',
    productName: 'Spirulina Platensis Powder Grade A+',
    farmerName: 'Pak Sukardi & Kelompok Tani Alga Mulia',
    farmName: 'Fasilitas Greenhouse Raceway Bantul 01',
    location: 'Bantul, D.I. Yogyakarta, Indonesia',
    coordinates: '-7.8924, 110.3298',
    harvestDate: '12 September 2026',
    dryingDate: '13 September 2026',
    dryingMethod: 'Solar Dome Hygienic Dehydrator (Temp: 41°C, 18 Jam)',
    proteinPercent: 68.4,
    phycocyaninPercent: 15.2,
    moisturePercent: 5.1,
    ashPercent: 6.8,
    heavyMetals: {
      leadPb: '< 0.02 mg/kg (Batas Max: 1.0 mg/kg)',
      mercuryHg: '< 0.005 mg/kg (Batas Max: 0.1 mg/kg)',
      arsenicAs: '< 0.05 mg/kg (Batas Max: 0.5 mg/kg)',
      cadmiumCd: '< 0.01 mg/kg (Batas Max: 0.2 mg/kg)',
    },
    microbiology: {
      totalPlateCount: '< 1.0 x 10³ CFU/g (Aman)',
      coliform: 'Negatif / gram',
      salmonella: 'Negatif dalam 25 gram',
    },
    labCertNo: 'COA-BBSPJIA-2026/09/8812',
    labName: 'Balai Besar Standardisasi Industri Agro (Kemenperin RI)',
    halalCert: 'ID34210001892040824',
    bpomReg: 'BPOM RI MD 20381200192',
    blockchainHash: '0x8f2d91c7a10294b05537482910fa8c3b991823ab49e018',
    verifiedStatus: 'Verified Gold'
  },
  {
    batchId: 'ELN-2026-SP892',
    productName: 'Kapsul Spirulina Organik 500mg',
    farmerName: 'Ibu Ratna Dewi',
    farmName: 'Kebun Alga Pegunungan Salak',
    location: 'Sukabumi, Jawa Barat',
    coordinates: '-6.9277, 106.9300',
    harvestDate: '08 September 2026',
    dryingDate: '09 September 2026',
    dryingMethod: 'Food-Grade Stainless Vacuum Dryer (Temp: 38°C)',
    proteinPercent: 67.1,
    phycocyaninPercent: 14.6,
    moisturePercent: 4.8,
    ashPercent: 7.1,
    heavyMetals: {
      leadPb: '< 0.015 mg/kg',
      mercuryHg: '< 0.003 mg/kg',
      arsenicAs: '< 0.03 mg/kg',
      cadmiumCd: '< 0.008 mg/kg',
    },
    microbiology: {
      totalPlateCount: '< 5.0 x 10² CFU/g',
      coliform: 'Negatif / gram',
      salmonella: 'Negatif dalam 25 gram',
    },
    labCertNo: 'SUCOFINDO-QA-99210-2026',
    labName: 'PT SUCOFINDO Laboratorium Penguji Cibitung',
    halalCert: 'ID32110000492810323',
    bpomReg: 'BPOM TR 193330191',
    blockchainHash: '0x5c4a30e7192f8019bdae0192938472918b9c2837f1982',
    verifiedStatus: 'Verified Gold'
  },
  {
    batchId: 'ELN-2026-SP895',
    productName: 'Fresh Frozen Spirulina Biomass Paste',
    farmerName: 'Pak Bambang Hermanto',
    farmName: 'Sentra Alga Bromo Lestari',
    location: 'Pasuruan, Jawa Timur',
    coordinates: '-7.6453, 112.9075',
    harvestDate: '18 September 2026',
    dryingDate: 'N/A (Sistem Fast Flash Freezing -20°C)',
    dryingMethod: 'Cold Preservation (< -18°C Sealed Vacuum)',
    proteinPercent: 71.2,
    phycocyaninPercent: 17.8,
    moisturePercent: 78.5,
    ashPercent: 2.2,
    heavyMetals: {
      leadPb: '< 0.01 mg/kg',
      mercuryHg: '< 0.002 mg/kg',
      arsenicAs: '< 0.02 mg/kg',
      cadmiumCd: '< 0.005 mg/kg',
    },
    microbiology: {
      totalPlateCount: '< 2.0 x 10² CFU/g',
      coliform: 'Negatif',
      salmonella: 'Negatif',
    },
    labCertNo: 'LAB-UNAIR-BIO-2026-441',
    labName: 'Pusat Riset Bioteknologi Kelautan Universitas Airlangga',
    halalCert: 'ID35110000918230225',
    bpomReg: 'P-IRT 2083514010892-27',
    blockchainHash: '0x17b3f940192a83c761029f848201a049182b8192a09',
    verifiedStatus: 'Verified Silver'
  }
];

export const INITIAL_PONDS: PondData[] = [
  {
    id: 'pond-a',
    name: 'Kolam Raceway Alfa (Greenhouse 1)',
    type: 'Greenhouse Raceway',
    volumeLiters: 25000,
    status: 'Optimal',
    ph: 9.8,
    temperatureC: 32.4,
    opticalDensity: 0.85,
    secchiDepthCm: 2.4,
    salinityPpt: 13.5,
    dissolvedOxygenMgL: 8.2,
    paddleWheelRpm: 18,
    lastFedDate: 'Kemarin, 16:00 WIB',
    daysSinceInoculation: 9,
    estHarvestDays: 2,
    estimatedBiomassKg: 48
  },
  {
    id: 'pond-b',
    name: 'Kolam Raceway Beta (Greenhouse 1)',
    type: 'Greenhouse Raceway',
    volumeLiters: 25000,
    status: 'Perlu Perhatian',
    ph: 10.85,
    temperatureC: 34.6,
    opticalDensity: 0.98,
    secchiDepthCm: 1.8,
    salinityPpt: 15.2,
    dissolvedOxygenMgL: 9.4,
    paddleWheelRpm: 18,
    lastFedDate: 'Hari ini, 07:30 WIB',
    daysSinceInoculation: 12,
    estHarvestDays: 0, // Siap panen hari ini
    estimatedBiomassKg: 62
  },
  {
    id: 'pond-c',
    name: 'Kolam Raceway Gamma (Kultur Baru)',
    type: 'Raceway Open Pond',
    volumeLiters: 30000,
    status: 'Inokulasi',
    ph: 9.2,
    temperatureC: 31.0,
    opticalDensity: 0.32,
    secchiDepthCm: 5.8,
    salinityPpt: 12.8,
    dissolvedOxygenMgL: 7.1,
    paddleWheelRpm: 14,
    lastFedDate: 'Hari ini, 09:15 WIB',
    daysSinceInoculation: 3,
    estHarvestDays: 7,
    estimatedBiomassKg: 18
  },
  {
    id: 'pond-d',
    name: 'Bioreaktor Tubular Delta (Bibit Induk Murni)',
    type: 'Closed Photobioreactor',
    volumeLiters: 5000,
    status: 'Optimal',
    ph: 9.6,
    temperatureC: 29.8,
    opticalDensity: 1.15,
    secchiDepthCm: 1.2,
    salinityPpt: 14.0,
    dissolvedOxygenMgL: 10.1,
    paddleWheelRpm: 24,
    lastFedDate: 'Kemarin, 18:00 WIB',
    daysSinceInoculation: 14,
    estHarvestDays: 1,
    estimatedBiomassKg: 22
  }
];

export const INITIAL_JOURNAL: FarmJournalEntry[] = [
  {
    id: 'jrn-1',
    pondId: 'pond-a',
    pondName: 'Kolam Raceway Alfa',
    date: '2026-09-19',
    time: '08:00 WIB',
    activityType: 'Pemberian Nutrisi',
    nutrientsAdded: 'Media Zarrouk Modifikasi: NaHCO3 4.5kg, Urea 120g, FeSO4 15g',
    ph: 9.8,
    temp: 31.5,
    weather: 'Cerah Terik',
    notes: 'Kepadatan spirulina sangat merata, warna hijau zamrud pekat tanpa ada busa berlebih pada paddle wheel.',
    author: 'Ahmad Fauzi (Operator Kolam)'
  },
  {
    id: 'jrn-2',
    pondId: 'pond-b',
    pondName: 'Kolam Raceway Beta',
    date: '2026-09-19',
    time: '14:30 WIB',
    activityType: 'Pengukuran Air',
    nutrientsAdded: 'Penambahan air tawar RO 1.500 liter untuk antisipasi evaporasi cuaca panas',
    ph: 10.85,
    temp: 34.6,
    weather: 'Cerah Terik',
    notes: 'pH mendekati ambang batas atas 11.0. Secchi disk terbaca 1.8 cm, kolam siap dipanen sore ini atau besok pagi.',
    author: 'Ahmad Fauzi (Operator Kolam)'
  },
  {
    id: 'jrn-3',
    pondId: 'pond-c',
    pondName: 'Kolam Raceway Gamma',
    date: '2026-09-18',
    time: '10:00 WIB',
    activityType: 'Inokulasi Bibit',
    nutrientsAdded: 'Inokulum bibit murni Spirulina platensis 400 liter dari PBR Delta',
    ph: 9.2,
    temp: 30.2,
    weather: 'Cerah Berawan',
    notes: 'Proses adaptasi bibit baru berjalan stabil, aerasi paddlewheel disetel pada kecepatan rendah 14 RPM.',
    author: 'Dr. Ir. Budi Rahardjo'
  }
];

export const INITIAL_HARVESTS: HarvestRecord[] = [
  {
    id: 'hrv-101',
    batchId: 'ELN-2026-SP881',
    pondName: 'Kolam Raceway Alfa',
    harvestDate: '12 September 2026',
    wetWeightKg: 280,
    dryWeightKg: 28.5,
    meshSizeUsed: 'Filter Cloth Nilon 300 Mesh',
    dryingMethod: 'Solar Dome Dehydrator (40°C)',
    qualityGrade: 'Grade A+',
    operator: 'Supriyanto',
    status: 'Masuk Marketplace'
  },
  {
    id: 'hrv-102',
    batchId: 'ELN-2026-SP878',
    pondName: 'Kolam Raceway Beta',
    harvestDate: '04 September 2026',
    wetWeightKg: 310,
    dryWeightKg: 30.2,
    meshSizeUsed: 'Filter Cloth Nilon 300 Mesh',
    dryingMethod: 'Solar Dome Dehydrator (40°C)',
    qualityGrade: 'Grade A+',
    operator: 'Ahmad Fauzi',
    status: 'Masuk Marketplace'
  },
  {
    id: 'hrv-103',
    batchId: 'ELN-2026-SP895',
    pondName: 'Kolam Raceway Alfa',
    harvestDate: '18 September 2026',
    wetWeightKg: 240,
    dryWeightKg: 23.8,
    meshSizeUsed: 'Filter Bag 300 Mesh Food Grade',
    dryingMethod: 'Vacuum Flash Freezing (-20°C)',
    qualityGrade: 'Grade A',
    operator: 'Supriyanto',
    status: 'Diuji Lab'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-1',
    title: 'Dasar Budidaya Spirulina Skala Rumah Tangga & Kolam Terpal',
    level: 'Pemula',
    durationHours: 6.5,
    modulesCount: 7,
    instructor: 'Ir. Hendra Kusuma',
    role: 'Praktisi Bioteknologi Mikroalga UGM',
    rating: 4.9,
    enrolledStudents: 614,
    description: 'Panduan lengkap langkah demi langkah memulai budidaya spirulina mikroalga bernilai tinggi, dari pemilihan bibit murni, pembuatan media air alkali, hingga teknik pemeliharaan mandiri.',
    progressPercent: 100,
    isCompleted: true,
    topics: [
      'Pengenalan morfologi Spirulina platensis',
      'Formula air alkali & media kultur murah',
      'Desain kolam sederhana dengan aerasi pompa hemat daya',
      'Pencegahan hama protozoa dan alga liar Chlorella'
    ]
  },
  {
    id: 'crs-2',
    title: 'Manajemen Kolam Raceway Komersial & Nutrisi Zarrouk Presisi',
    level: 'Menengah',
    durationHours: 8.0,
    modulesCount: 9,
    instructor: 'Dr. Ir. Budi Rahardjo, M.Sc',
    role: 'Peneliti Utama Mikroalga BRIN',
    rating: 4.9,
    enrolledStudents: 382,
    description: 'Optimalisasi hasil panen harian per meter persegi, pengendalian parameter pH, salinitas, CO2 enrichment, serta efisiensi biaya bahan media Zarrouk skala industri.',
    progressPercent: 45,
    isCompleted: false,
    topics: [
      'Keseimbangan bikarbonat-karbonat pada pH 9.5 - 10.5',
      'Perhitungan densitas optik OD680 & Secchi depth',
      'Rancang bangun sistem kincir paddle wheel hemat listrik',
      'Kombinasi nutrisi organik vs pupuk teknis'
    ]
  },
  {
    id: 'crs-3',
    title: 'Teknik Panen Mesh 300 & Pengeringan Solar Dome Higienis',
    level: 'Lanjutan',
    durationHours: 5.5,
    modulesCount: 6,
    instructor: 'Siti Nurhaliza, S.Pi',
    role: 'Ketua Koperasi Alga Mitra Mandiri',
    rating: 4.8,
    enrolledStudents: 290,
    description: 'Menjaga kemurnian fikosianin dan protein spirulina selama pascapanen agar bebas kontaminasi debu, serangga, serta memenuhi standar uji mikrobiologi BPOM dan ekspor.',
    progressPercent: 15,
    isCompleted: false,
    topics: [
      'Pemanenan dengan kain saring monofilamen nilon 300 mesh',
      'Metode pencucian biomassa untuk mengurangi sisa garam',
      'Pengeringan suhu rendah (< 42°C) mempertahankan zat gizi',
      'Uji organoleptik: aroma, warna hijau emerald, dan kelembutan'
    ]
  },
  {
    id: 'crs-4',
    title: 'Standarisasi Mutu Laboratorium, BPOM, & Akses Pasar B2B Ekspor',
    level: 'Bisnis & Ekspor',
    durationHours: 7.0,
    modulesCount: 8,
    instructor: 'Aji Pramono, S.TP, MBA',
    role: 'Konsultan Ekspor Produk Pangan & Halal Assurance',
    rating: 5.0,
    enrolledStudents: 215,
    description: 'Kupas tuntas persiapan dokumen Quality Passport, sertifikasi Halal, izin edar P-IRT/BPOM MD, uji residu logam berat di laboratorium terakreditasi KAN, dan negosiasi kontrak ekspor.',
    progressPercent: 0,
    isCompleted: false,
    topics: [
      'Pemahaman parameter Certificate of Analysis (COA)',
      'Regulasi batas aman cemaran logam berat dan mikroba',
      'Strategi pengemasan multi-layer aluminium foil nitrogen flush',
      'Memenuhi spesifikasi pembeli industri kosmetik & suplemen'
    ]
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'mnt-1',
    name: 'Dr. Ir. Budi Rahardjo, M.Sc',
    title: 'Pakar Budidaya & Mikrobiologi Mikroalga',
    institution: 'Pusat Riset Bioindustri BRIN / Dosen Bioteknologi',
    specialization: ['Kultur Media Zarrouk', 'Troubleshooting Kolam Crash', 'Kloning Bibit Unggul'],
    experienceYears: 18,
    rating: 4.9,
    consultationsDone: 142,
    availableDays: 'Selasa & Kamis (13:00 - 17:00 WIB)',
    consultationFee: 'Gratis (Subsidi Koperasi ELINA)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Telah mendampingi lebih dari 45 klaster pembudidaya mikroalga di seluruh Indonesia. Fokus pada efisiensi biaya kultur dan pencegahan kontaminasi alga liar.'
  },
  {
    id: 'mnt-2',
    name: 'Siti Nurhaliza, S.Pi',
    title: 'Praktisi Lapangan 12 Kolam Raceway',
    institution: 'Ketua Koperasi Spirulina Pasundan',
    specialization: ['Desain Kolam Hemat Biaya', 'Panen Efisien', 'Pemberdayaan Wanita Tani'],
    experienceYears: 9,
    rating: 4.9,
    consultationsDone: 98,
    availableDays: 'Senin, Rabu, Jumat (09:00 - 12:00 WIB)',
    consultationFee: 'Gratis (Subsidi Koperasi ELINA)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Membangun farm spirulina dari 1 kolam terpal sederhana hingga kini mengelola 12 kolam greenhouse dengan omset puluhan juta per bulan.'
  },
  {
    id: 'mnt-3',
    name: 'Aji Pramono, S.TP, MBA',
    title: 'Konsultan Mutu Pangan & Ekspor B2B',
    institution: 'Spirulina Supply Chain Consultant',
    specialization: ['Sertifikasi Halal & BPOM', 'Kontrak B2B Bulk Order', 'Standar Mutu Farmasi'],
    experienceYears: 12,
    rating: 4.8,
    consultationsDone: 74,
    availableDays: 'Sabtu (10:00 - 15:00 WIB)',
    consultationFee: 'Gratis (Subsidi Koperasi ELINA)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Menghubungkan koperasi pembudidaya lokal dengan buyers industri farmasi, produsen minuman kesehatan, serta importir di Jepang dan Jerman.'
  }
];

export const INITIAL_COOP_MEMBERS: CoopMember[] = [
  {
    id: 'mbr-01',
    name: 'Sukardi (Kelompok Tani Alga Mulia)',
    farmName: 'Farm Alga Mulia Bantul',
    location: 'Bantul, D.I. Yogyakarta',
    pondCount: 6,
    monthlyCapacityKg: 180,
    joinDate: 'Januari 2024',
    shareSavings: 8500000,
    verificationStatus: 'Terverifikasi SNI',
    contact: '+62 812-3456-7890'
  },
  {
    id: 'mbr-02',
    name: 'Ibu Ratna Dewi',
    farmName: 'Tirta Hijau Organik Sukabumi',
    location: 'Sukabumi, Jawa Barat',
    pondCount: 4,
    monthlyCapacityKg: 120,
    joinDate: 'Maret 2024',
    shareSavings: 6200000,
    verificationStatus: 'Terverifikasi SNI',
    contact: '+62 857-9812-3344'
  },
  {
    id: 'mbr-03',
    name: 'Bambang Hermanto',
    farmName: 'Bromo Alga Lestari',
    location: 'Pasuruan, Jawa Timur',
    pondCount: 8,
    monthlyCapacityKg: 250,
    joinDate: 'Juni 2024',
    shareSavings: 11000000,
    verificationStatus: 'Terverifikasi SNI',
    contact: '+62 821-4455-6677'
  },
  {
    id: 'mbr-04',
    name: 'Wayan Suardana',
    farmName: 'Bali Spirulina Green Valley',
    location: 'Tabanan, Bali',
    pondCount: 5,
    monthlyCapacityKg: 150,
    joinDate: 'Oktober 2024',
    shareSavings: 7400000,
    verificationStatus: 'Terverifikasi SNI',
    contact: '+62 813-8877-2211'
  },
  {
    id: 'mbr-05',
    name: 'Nanang Qosim',
    farmName: 'Alga Mina Mandiri Subang',
    location: 'Subang, Jawa Barat',
    pondCount: 3,
    monthlyCapacityKg: 90,
    joinDate: 'Februari 2025',
    shareSavings: 4500000,
    verificationStatus: 'Koperasi Pratama',
    contact: '+62 878-1122-3399'
  }
];

export const INITIAL_COLLECTIVE_CONTRACTS: CollectiveContract[] = [
  {
    id: 'cntr-01',
    buyer: 'PT Bio Nutri Sehat Farmasi (Bandung)',
    industry: 'Farmasi',
    targetKg: 1200,
    fulfilledKg: 960,
    pricePerKg: 390000,
    deadline: '05 Oktober 2026',
    status: 'Hampir Terpenuhi',
    contributingFarmers: 7
  },
  {
    id: 'cntr-02',
    buyer: 'Nippon Algae & Wellness Corp (Osaka Export)',
    industry: 'Ekspor Internasional',
    targetKg: 3500,
    fulfilledKg: 2150,
    pricePerKg: 425000,
    deadline: '20 November 2026',
    status: 'Aktif Terbuka',
    contributingFarmers: 14
  },
  {
    id: 'cntr-03',
    buyer: 'CV Aura Cantik Alami Herbal (Yogyakarta)',
    industry: 'Kosmetik',
    targetKg: 500,
    fulfilledKg: 500,
    pricePerKg: 380000,
    deadline: '28 September 2026',
    status: 'Siap Dikirim',
    contributingFarmers: 4
  }
];

export const INITIAL_PROCUREMENT_ITEMS: ProcurementItem[] = [
  {
    id: 'proc-1',
    name: 'Natrium Bikarbonat (NaHCO3) Food Grade 99% Murni',
    category: 'Nutrisi & Garam',
    normalPrice: 16500,
    groupPrice: 11800,
    unit: 'Zak 25 kg',
    minGroupVolume: 2000, // 2 ton
    currentOrdersCount: 1650,
    daysRemaining: 4,
    supplier: 'PT Sari Nutrisi Kimia Industri'
  },
  {
    id: 'proc-2',
    name: 'Kain Saring Monofilamen Nilon Mesh 300 (Lebar 1.5m)',
    category: 'Filter & Jaring',
    normalPrice: 85000,
    groupPrice: 59000,
    unit: 'Meter Lari',
    minGroupVolume: 300,
    currentOrdersCount: 280,
    daysRemaining: 2,
    supplier: 'Sinar Filter Presisi Surabaya'
  },
  {
    id: 'proc-3',
    name: 'Motor Kincir Paddle Wheel 0.5 HP Low-Watt Stainless 316',
    category: 'Mesin & Aerator',
    normalPrice: 2800000,
    groupPrice: 2150000,
    unit: 'Unit Set Lengkap',
    minGroupVolume: 20,
    currentOrdersCount: 17,
    daysRemaining: 6,
    supplier: 'Aquatech Prima Engineering'
  },
  {
    id: 'proc-4',
    name: 'Kantong Aluminium Foil Matte Multi-Layer Zip-Lock 1kg',
    category: 'Kemasan Alumunium',
    normalPrice: 6500,
    groupPrice: 4200,
    unit: 'Pcs Pouch Food-Grade',
    minGroupVolume: 5000,
    currentOrdersCount: 4300,
    daysRemaining: 5,
    supplier: 'Flexo Packindo Jaya'
  }
];

export const INITIAL_BULK_ORDERS: BulkOrder[] = [
  {
    id: 'BLK-2026-081',
    buyerName: 'Hendra Gunawan',
    companyName: 'PT Suplemen Nutrisi Nusantara',
    productType: 'Spirulina Powder Grade A+',
    targetQuantityKg: 500,
    targetDate: '2026-10-15',
    targetPricePerKg: 375000,
    notes: 'Kadar fikosianin minimal 14%, sertifikat COA dan Halal wajib disertakan dalam setiap karung drum.',
    status: 'Alokasi Petani',
    allocatedFarmers: [
      { farmerName: 'Farm Alga Mulia Bantul', quotaKg: 250 },
      { farmerName: 'Tirta Hijau Sukabumi', quotaKg: 150 },
      { farmerName: 'Bromo Alga Lestari', quotaKg: 100 }
    ],
    createdAt: '16 September 2026'
  },
  {
    id: 'BLK-2026-082',
    buyerName: 'Dewi Anggraini',
    companyName: 'Bona Organics Drink Jakarta',
    productType: 'Fresh Frozen Spirulina Biomass Paste',
    targetQuantityKg: 200,
    targetDate: '2026-10-02',
    targetPricePerKg: 220000,
    notes: 'Pengiriman cold chain frozen truk reefer ke gudang Cengkareng Jakarta Barat.',
    status: 'Diverifikasi',
    allocatedFarmers: [
      { farmerName: 'Bromo Alga Lestari', quotaKg: 200 }
    ],
    createdAt: '18 September 2026'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '⚠️ Peringatan Kolam Raceway Beta',
    message: 'pH air mencapai 10.85 (ambang batas atas 11.0). Disarankan segera panen biomassa hari ini.',
    type: 'pond-alert',
    timestamp: '15 menit yang lalu',
    isRead: false
  },
  {
    id: 'notif-2',
    title: '📦 Pesanan Bulk Order Baru Masuk',
    message: 'PT Suplemen Nutrisi Nusantara mengajukan 500 kg Spirulina Powder Grade A+.',
    type: 'order',
    timestamp: '2 jam yang lalu',
    isRead: false
  },
  {
    id: 'notif-3',
    title: '🤝 Kuota Pengadaan Bersama NaHCO3',
    message: 'Tersisa 350 kg lagi untuk mencapai target diskon grup 28% dari supplier pabrik.',
    type: 'coop',
    timestamp: '5 jam yang lalu',
    isRead: true
  },
  {
    id: 'notif-4',
    title: '🎓 Sesi Mentoring Online Besok',
    message: 'Dr. Ir. Budi Rahardjo membuka sesi tanya jawab interaktif pukul 14:00 WIB.',
    type: 'academy',
    timestamp: 'Kemarin',
    isRead: true
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'Hendra Gunawan (PT Suplemen Nutrisi)',
    senderRole: 'buyer',
    text: 'Halo tim ELINA, kami tertarik dengan Batch ELN-2026-SP881. Apakah bisa minta konfirmasi uji logam berat terbarunya?',
    timestamp: '10:14 WIB',
    isMe: false
  },
  {
    id: 'msg-2',
    sender: 'Admin Koperasi ELINA',
    senderRole: 'coop-admin',
    text: 'Halo Pak Hendra, tentu saja! Batch tersebut sudah terdaftar di Quality Passport kami dengan sertifikasi resmi Balai Besar Agro (Kemenperin). Kadar Pb < 0.02 mg/kg, sangat jauh di bawah ambang batas BPOM.',
    timestamp: '10:16 WIB',
    isMe: true
  },
  {
    id: 'msg-3',
    sender: 'Hendra Gunawan (PT Suplemen Nutrisi)',
    senderRole: 'buyer',
    text: 'Bagus sekali transparansinya. Kami submit Bulk Order untuk 500 kg ya. Mohon alokasi petani diatur.',
    timestamp: '10:20 WIB',
    isMe: false
  }
];
