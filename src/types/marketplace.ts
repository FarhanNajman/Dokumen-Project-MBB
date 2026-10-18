export type ItemCategory =
  | 'Semua'
  | 'Pakaian Pria'
  | 'Pakaian Wanita'
  | 'Elektronik & Gadget'
  | 'Sepatu & Tas'
  | 'Koleksi & Hobi';

export type ItemCondition =
  | 'Seperti Baru (Mulus)'
  | 'Sangat Baik'
  | 'Baik (Pemakaian Wajar)'
  | 'Vintage / Antik';

export type ItemStatus = 'Tersedia' | 'Terjual';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalDeals: number;
  joinedDate: string;
  responseRate: string;
  verified: boolean;
  kecamatan: string;
  kota: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  category: ItemCategory;
  condition: ItemCondition;
  status: ItemStatus;
  kecamatan: string;
  kota: string;
  images: string[];
  description: string;
  postedDate: string;
  seller: Seller;
  recommendedMeetingSpots: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller';
  text: string;
  timestamp: string;
  isCodOffer?: boolean;
  codDetails?: {
    location: string;
    date: string;
    time: string;
    agreedPrice: number;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface ChatSession {
  id: string;
  itemId: string;
  sellerId: string;
  lastMessage: string;
  lastUpdated: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export type ActiveTab = 'explore' | 'favorites' | 'chat' | 'profile';

export interface FilterState {
  category: ItemCategory;
  searchQuery: string;
  selectedKecamatan: string;
  maxPrice: number;
  condition: string;
  statusOnlyAvailable: boolean;
}
