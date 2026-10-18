import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle2,
  Star,
  MessageCircle,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { MarketplaceItem } from '../types/marketplace';
import { DistrictMiniMap } from './DistrictMiniMap';
import { formatIDR } from '../utils/designTokens';

interface DetailPageProps {
  item: MarketplaceItem;
  onBack: () => void;
  onOpenChatWithSeller: (item: MarketplaceItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (itemId: string) => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  item,
  onBack,
  onOpenChatWithSeller,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const isSold = item.status === 'Terjual';

  return (
    <div className="min-h-full pb-28 bg-[#F9FAFB] text-neutral-900">
      {/* Top Floating Action Bar */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          aria-label="Kembali ke Jelajahi"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
            aria-label="Bagikan link barang"
          >
            {copiedShare ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => onToggleFavorite(item.id)}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Hero Image Showcase - Large prominent visual */}
      <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden">
        <img
          src={item.images[activePhotoIndex] || item.images[0]}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Status Pill on top of photo */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full shadow-xs ${
              isSold
                ? 'bg-neutral-900/90 text-neutral-200 backdrop-blur-xs'
                : 'bg-violet-600 text-white'
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* Multiple Photo Dots / Indicator */}
        {item.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {item.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activePhotoIndex === idx
                    ? 'w-6 bg-white shadow-xs'
                    : 'bg-white/60'
                }`}
                aria-label={`Lihat foto ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Details Panel - Styled with soft rounded container like reference image */}
      <div className="px-5 pt-5 pb-4 -mt-4 bg-white rounded-t-3xl relative z-10 border-t border-neutral-100 shadow-xs">
        {/* Title & Price */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-bold text-neutral-900 leading-snug">
              {item.title}
            </h1>
            <span className="text-xl font-extrabold text-violet-700 font-mono shrink-0">
              {formatIDR(item.price)}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
            <span>Diposting {item.postedDate}</span>
            <span>·</span>
            <span>1 listing = 1 barang asli</span>
          </div>
        </div>

        {/* Condition & Category Badges */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-neutral-100">
          <div className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-lg text-xs font-medium">
            Kondisi: <span className="font-semibold text-neutral-900">{item.condition}</span>
          </div>
          <div className="bg-violet-50 text-violet-700 px-3 py-1 rounded-lg text-xs font-medium">
            Kategori: {item.category}
          </div>
        </div>

        {/* Description Section */}
        <div className="py-4 border-b border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900 mb-2">
            Deskripsi Barang
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>

        {/* Seller Profile Information */}
        <div className="py-4 border-b border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900 mb-3">
            Profil Penjual
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-violet-100"
                />
                {item.seller.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 bg-violet-600 text-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-neutral-900">
                    {item.seller.name}
                  </h3>
                  <span className="text-[10px] text-violet-700 bg-violet-50 font-medium px-1.5 py-0.5 rounded">
                    Terverifikasi
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-500">
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {item.seller.rating}
                  </span>
                  <span>·</span>
                  <span>{item.seller.totalDeals} deal sukses</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-neutral-400">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  <span>{item.seller.responseRate}</span>
                </div>
              </div>
            </div>

            <span className="text-xs text-neutral-400">
              {item.seller.joinedDate}
            </span>
          </div>
        </div>

        {/* District Privacy Map - Required: Shows district area only, not home address */}
        <div className="py-4">
          <div className="mb-2">
            <h2 className="text-sm font-bold text-neutral-900">
              Lokasi COD Penjual
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              COD dilakukan di area publik yang ramai dan nyaman
            </p>
          </div>
          <DistrictMiniMap
            kecamatan={item.kecamatan}
            kota={item.kota}
            meetingSpots={item.recommendedMeetingSpots}
          />
        </div>

        {/* Safety COD Reminder */}
        <div className="mt-2 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 leading-normal">
            <strong>Tips Aman PasarKembali:</strong> Ketemuan di tempat umum yang ramai, cek kondisi fisik barang secara teliti, dan bayar tunai / transfer langsung setelah barang sesuai.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action: "Chat Penjual" - STRICTLY NO CART OR CHECKOUT */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-neutral-200 px-5 py-3 z-40 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="shrink-0">
            <p className="text-[10px] text-neutral-400 uppercase font-semibold">
              Harga Barang
            </p>
            <p className="text-base font-extrabold text-neutral-900 font-mono">
              {formatIDR(item.price)}
            </p>
          </div>

          <button
            onClick={() => onOpenChatWithSeller(item)}
            disabled={isSold}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-sm font-semibold transition-all shadow-md ${
              isSold
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                : 'bg-violet-600 hover:bg-violet-700 text-white active:scale-98'
            }`}
            aria-label={`Chat ${item.seller.name} untuk mengatur COD`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isSold ? 'Barang Sudah Terjual' : 'Chat Penjual untuk COD'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
