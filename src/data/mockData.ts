import { MarketplaceItem, Seller, ChatSession } from '../types/marketplace';

// Verified Seller Profiles
export const mockSellers: Record<string, Seller> = {
  seller1: {
    id: 'seller1',
    name: 'Alvi Kebun Binatang',
    avatar: '/src/assets/images/avatar_penjual_wanita_1792359459582.jpg',
    rating: 4.9,
    totalDeals: 34,
    joinedDate: 'Bergabung Mei 2023',
    responseRate: 'Balas cepat (~10 menit)',
    verified: true,
    kecamatan: 'Kec. Tebet',
    kota: 'Jakarta Selatan',
  },
  seller2: {
    id: 'seller2',
    name: 'Bagus Pratama',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    totalDeals: 19,
    joinedDate: 'Bergabung Januari 2024',
    responseRate: 'Balas dalam 1 jam',
    verified: true,
    kecamatan: 'Kec. Coblong',
    kota: 'Bandung',
  },
  seller3: {
    id: 'seller3',
    name: 'Dimas Setiawan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    totalDeals: 42,
    joinedDate: 'Bergabung September 2022',
    responseRate: 'Balas sangat cepat (~5 menit)',
    verified: true,
    kecamatan: 'Kec. Kebayoran Baru',
    kota: 'Jakarta Selatan',
  },
  seller4: {
    id: 'seller4',
    name: 'Annisa Nurul',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    totalDeals: 15,
    joinedDate: 'Bergabung November 2023',
    responseRate: 'Balas dalam 30 menit',
    verified: true,
    kecamatan: 'Kec. Sukasari',
    kota: 'Bandung',
  },
};

// Marketplace Items
export const mockItems: MarketplaceItem[] = [
  {
    id: 'item-1',
    title: 'Velg Sixtar v2 pnp vario 125/150',
    price: 1250000,
    category: 'Koleksi & Hobi',
    condition: 'Seperti Baru (Mulus)',
    status: 'Tersedia',
    kecamatan: 'Kec. Tebet',
    kota: 'Jakarta Selatan',
    images: [
      '/src/assets/images/thrift_rajut_sweater_1792359458935.jpg',
      '/src/assets/images/thrift_rajut_sweater_1792359458935.jpg',
    ],
    description:
      'Sweater rajut warna beige netral bahan wool lembut tebal, cocok untuk cuaca sejuk atau ruangan ber-AC. Ukuran all size fit to L. Baru dipakai 2 kali untuk photoshoot, tidak ada benang robek atau melar. Bersih dan sudah dicuci wangi.',
    postedDate: '2 jam yang lalu',
    seller: mockSellers.seller1,
    recommendedMeetingSpots: [
      'Stasiun KRL Tebet (Pintu Barat)',
      'Tebet Eco Park Plaza',
      'Indomaret Point Tebet Raya',
    ],
  },
  {
    id: 'item-2',
    title: 'Vario 150 old',
    price: 18500000,
    category: 'Koleksi & Hobi',
    condition: 'Sangat Baik',
    status: 'Tersedia',
    kecamatan: 'Kec. Coblong',
    kota: 'Bandung',
    images: [
      '/src/assets/images/thrift_jaket_denim_1792359458877.jpg',
      '/src/assets/images/thrift_jaket_denim_1792359458877.jpg',
    ],
    description:
      'Jaket denim vintage warna washed blue klasik. Bahan denim tebal 14oz berkualitas tinggi, kancing kuningan masih lengkap dan kokoh. Ukuran XL regular fit. Fading alami sangat estetis, tidak ada sobek jahitan.',
    postedDate: '5 jam yang lalu',
    seller: mockSellers.seller2,
    recommendedMeetingSpots: [
      'Taman Cikapundung Coblong',
      'Area Parkir McDonald’s Simpang Dago',
      'Circle K Dipati Ukur',
    ],
  },
  {
    id: 'item-3',
    title: 'Sage Denim Artikel Greatmire 20oz',
    price: 950000,
    category: 'Koleksi & Hobi',
    condition: 'Vintage / Antik',
    status: 'Tersedia',
    kecamatan: 'Kec. Kebayoran Baru',
    kota: 'Jakarta Selatan',
    images: [
      '/src/assets/images/thrift_kamera_analog_1792359459419.jpg',
      '/src/assets/images/thrift_kamera_analog_1792359459419.jpg',
    ],
    description:
      'Sage Denim Artikel Greatmire 20oz. pemakaian efektif selama 1 semester/6bulan',
    postedDate: 'Kemarin',
    seller: mockSellers.seller3,
    recommendedMeetingSpots: [
      'Blok M Square (Pintu Timur)',
      'Taman Barito Kebayoran',
      'MRT Blok M BCA Station',
    ],
  },
  {
    id: 'item-4',
    title: 'Sneakers Kanvas Retro Navy Classic 42',
    price: 140000,
    category: 'Sepatu & Tas',
    condition: 'Baik (Pemakaian Wajar)',
    status: 'Tersedia',
    kecamatan: 'Kec. Sukasari',
    kota: 'Bandung',
    images: [
      '/src/assets/images/thrift_sepatu_sneakers_1792359459235.jpg',
      '/src/assets/images/thrift_sepatu_sneakers_1792359459235.jpg',
    ],
    description:
      'Sepatu sneakers kanvas warna navy strip putih original ukuran 42 (insole 27cm). Outsole karet masih tebal dan anti-slip. Pemakaian sekitar 4 bulan, selalu dirawat dengan shoe cleaner. Box pengganti rapi.',
    postedDate: '1 hari yang lalu',
    seller: mockSellers.seller4,
    recommendedMeetingSpots: [
      'Setiabudhi Supermarket Sukasari',
      'SPBU Gegerkalong Hilir',
      'Depan Kampus UPI Bandung',
    ],
  },
  {
    id: 'item-5',
    title: 'Kemeja Flannel Tartan Earth Tone',
    price: 95000,
    category: 'Pakaian Pria',
    condition: 'Sangat Baik',
    status: 'Terjual',
    kecamatan: 'Kec. Tebet',
    kota: 'Jakarta Selatan',
    images: [
      '/src/assets/images/thrift_jaket_denim_1792359458877.jpg',
    ],
    description:
      'Kemeja flannel motif kotak earth tone bahan katun halus tidak gatal. Sudah laku terjual kemarin melalui kesepakatan COD di Stasiun Tebet.',
    postedDate: '3 hari yang lalu',
    seller: mockSellers.seller1,
    recommendedMeetingSpots: [
      'Stasiun Tebet',
    ],
  },
];

// Initial Seed Chat Sessions
export const initialChatSessions: ChatSession[] = [
  {
    id: 'chat-1',
    itemId: 'item-1',
    sellerId: 'seller1',
    lastMessage: 'Halo kak, barangnya masih ready? Boleh COD di Tebet?',
    lastUpdated: '14:20',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: 'buyer',
        text: 'Masih Gan?',
        timestamp: '14:15',
      },
      {
        id: 'm2',
        sender: 'seller',
        text: 'Masih',
        timestamp: '14:18',
      },
      {
        id: 'm3',
        sender: 'buyer',
        text: 'Bisa Nego Gan?',
        timestamp: '14:20',
      },
      {
        id: 'm3',
        sender: 'seller',
        text: 'nego tipis bg',
        timestamp: '14:20',
      },
      {
        id: 'm4',
        sender: 'buyer',
        text: 'dima lok gan?',
        timestamp: '14:20',
      },
      {
        id: 'm4',
        sender: 'seller',
        text: 'emang nyo abang lok dima?',
        timestamp: '14:20',
      },
      {
        id: 'm4',
        sender: 'buyer',
        text: 'wak di limau manih gan',
        timestamp: '14:22',
        isCodOffer: true,
        codDetails: {
          location: 'gerbang balakang unand',
          date: 'Besok (Sabtu)',
          time: '16:00 WIB',
          agreedPrice: 125000,
          status: 'pending',
        },
      },
    ],
  },
];
