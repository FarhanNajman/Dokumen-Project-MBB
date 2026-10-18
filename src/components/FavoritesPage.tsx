import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { MarketplaceItem } from '../types/marketplace';
import { formatIDR } from '../utils/designTokens';

interface FavoritesPageProps {
  favoriteItems: MarketplaceItem[];
  onSelectItem: (item: MarketplaceItem) => void;
  onRemoveFavorite: (itemId: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favoriteItems,
  onSelectItem,
  onRemoveFavorite,
}) => {
  return (
    <div className="min-h-full pb-24 bg-[#F9FAFB] text-neutral-900">
      <header className="px-5 pt-6 pb-4 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-neutral-100">
        <h1 className="text-xl font-bold text-neutral-900">Barang Favorit</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          {favoriteItems.length} barang disimpan untuk dipantau
        </p>
      </header>

      <main className="px-5 pt-4">
        {favoriteItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-neutral-200/80 mt-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-3">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-800">
              Belum ada barang favorit
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              Simpan barang yang kamu minati dengan menekan ikon hati di Beranda atau halaman Detail.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-4/5 w-full bg-neutral-100 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(item.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-rose-500 shadow-xs"
                    aria-label="Hapus dari favorit"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  </button>
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1 text-[11px] text-white/90">
                    <MapPin className="w-3 h-3 text-violet-300 shrink-0" />
                    <span className="truncate drop-shadow-xs">{item.kecamatan}</span>
                  </div>
                </div>

                <div className="p-3 flex flex-col justify-between flex-1">
                  <h3 className="text-xs font-semibold text-neutral-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-2 pt-1 border-t border-neutral-100 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-violet-700 font-mono">
                      {formatIDR(item.price)}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
