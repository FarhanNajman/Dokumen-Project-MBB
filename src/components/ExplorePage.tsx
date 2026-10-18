import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Heart,
  X,
  Check,
  Tag,
} from 'lucide-react';
import { MarketplaceItem, ItemCategory, FilterState } from '../types/marketplace';
import { formatIDR } from '../utils/designTokens';

interface ExplorePageProps {
  items: MarketplaceItem[];
  onSelectItem: (item: MarketplaceItem) => void;
  favorites: string[];
  onToggleFavorite: (itemId: string) => void;
}

const CATEGORIES: ItemCategory[] = [
  'Semua',
  'Pakaian Wanita',
  'Pakaian Pria',
  'Sepatu & Tas',
  'Koleksi & Hobi',
  'Elektronik & Gadget',
];

export const ExplorePage: React.FC<ExplorePageProps> = ({
  items,
  onSelectItem,
  favorites,
  onToggleFavorite,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'Semua',
    searchQuery: '',
    selectedKecamatan: '',
    maxPrice: 2000000,
    condition: '',
    statusOnlyAvailable: false,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique kecamatan
  const uniqueKecamatan = useMemo(() => {
    const list = items.map((i) => i.kecamatan);
    return Array.from(new Set(list));
  }, [items]);

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (filterState.category !== 'Semua' && item.category !== filterState.category) {
        return false;
      }
      // Search query filter (title or description or kecamatan)
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchKecamatan = item.kecamatan.toLowerCase().includes(query);
        const matchKota = item.kota.toLowerCase().includes(query);
        if (!matchTitle && !matchKecamatan && !matchKota) return false;
      }
      // Kecamatan filter
      if (
        filterState.selectedKecamatan &&
        item.kecamatan !== filterState.selectedKecamatan
      ) {
        return false;
      }
      // Price filter
      if (item.price > filterState.maxPrice) {
        return false;
      }
      // Status filter
      if (filterState.statusOnlyAvailable && item.status !== 'Tersedia') {
        return false;
      }
      return true;
    });
  }, [items, filterState]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterState.selectedKecamatan) count++;
    if (filterState.statusOnlyAvailable) count++;
    if (filterState.maxPrice < 2000000) count++;
    return count;
  }, [filterState]);

  return (
    <div className="min-h-full pb-24 bg-[#F9FAFB] text-neutral-900">
      {/* Top Header - In line with reference image style */}
      <header className="px-5 pt-6 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-neutral-100">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              Barang Rantau
            </h1>
            <p className="text-xs text-neutral-500 font-normal">
              Temukan barang bekas terawat & COD aman di sekitarmu
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-violet-50 text-violet-700 font-bold text-xs flex items-center justify-center border border-violet-100">
            PK
          </div>
        </div>

        {/* Search Bar & Filter Button */}
        <div className="mt-4 flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) =>
                setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              placeholder="Cari sweater, jaket, kamera..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100/90 hover:bg-neutral-100 focus:bg-white text-sm rounded-xl border border-transparent focus:border-violet-500 focus:outline-hidden transition-all placeholder:text-neutral-400 text-neutral-800"
            />
            {filterState.searchQuery && (
              <button
                onClick={() =>
                  setFilterState((prev) => ({ ...prev, searchQuery: '' }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label="Hapus kata kunci pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className={`relative p-2.5 rounded-xl border transition-all ${
              activeFiltersCount > 0
                ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200/90 hover:bg-neutral-50'
            }`}
            aria-label="Buka Filter Barang"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Horizontal Category Chips */}
        <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = filterState.category === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  setFilterState((prev) => ({ ...prev, category: cat }))
                }
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-5 pt-4">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-bold tracking-tight text-neutral-800">
            Daftar Barang Terbaru
          </h2>
          <span className="text-xs text-neutral-400">
            {filteredItems.length} barang tersedia
          </span>
        </div>

        {/* Item Cards Grid - 2 Column layout inspired by reference image */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-neutral-200/80 mt-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-neutral-800">
              Barang tidak ditemukan
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              Coba gunakan kata kunci lain atau sesuaikan filter kategori dan lokasi kecamatan.
            </p>
            <button
              onClick={() =>
                setFilterState({
                  category: 'Semua',
                  searchQuery: '',
                  selectedKecamatan: '',
                  maxPrice: 2000000,
                  condition: '',
                  statusOnlyAvailable: false,
                })
              }
              className="mt-4 px-4 py-2 text-xs font-semibold text-violet-700 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              const isSold = item.status === 'Terjual';

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  {/* Image Container with high visual prominence */}
                  <div className="relative aspect-4/5 w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Gradient scrim for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Status Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          isSold
                            ? 'bg-neutral-800/90 text-neutral-200 backdrop-blur-xs'
                            : 'bg-violet-600/95 text-white shadow-xs backdrop-blur-xs'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs flex items-center justify-center text-neutral-700 transition-colors shadow-xs"
                      aria-label={`Simpan ${item.title} ke favorit`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'
                        }`}
                      />
                    </button>

                    {/* Bottom overlay inside image: Kecamatan info */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1 text-[11px] text-white/90">
                      <MapPin className="w-3 h-3 text-violet-300 shrink-0" />
                      <span className="truncate drop-shadow-xs">{item.kecamatan}</span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xs font-semibold text-neutral-800 line-clamp-2 leading-snug group-hover:text-violet-700 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-2 pt-1 border-t border-neutral-100 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-violet-700 font-mono">
                        {formatIDR(item.price)}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {item.postedDate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Filter Modal / Bottom Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Filter Pencarian
              </h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                aria-label="Tutup filter"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter by Kecamatan */}
            <div className="mt-4">
              <label className="text-xs font-bold text-neutral-700 mb-2 block">
                Pilih Area Kecamatan (COD Terdekat):
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() =>
                    setFilterState((prev) => ({ ...prev, selectedKecamatan: '' }))
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    !filterState.selectedKecamatan
                      ? 'bg-violet-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Semua Area
                </button>
                {uniqueKecamatan.map((kec) => (
                  <button
                    key={kec}
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        selectedKecamatan:
                          prev.selectedKecamatan === kec ? '' : kec,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filterState.selectedKecamatan === kec
                        ? 'bg-violet-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {kec}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Max Price */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-700 mb-2">
                <span>Harga Maksimum:</span>
                <span className="text-violet-700 font-mono">
                  {formatIDR(filterState.maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="25000"
                value={filterState.maxPrice}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                className="w-full accent-violet-600"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>Rp 50.000</span>
                <span>Rp 2.000.000</span>
              </div>
            </div>

            {/* Filter Status: Only Available */}
            <div className="mt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterState.statusOnlyAvailable}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      statusOnlyAvailable: e.target.checked,
                    }))
                  }
                  className="rounded text-violet-600 focus:ring-violet-500 w-4 h-4"
                />
                <span className="text-xs font-medium text-neutral-800">
                  Hanya tampilkan barang yang masih <strong>Tersedia</strong>
                </span>
              </label>
            </div>

            {/* Filter Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
              <button
                onClick={() => {
                  setFilterState({
                    category: 'Semua',
                    searchQuery: '',
                    selectedKecamatan: '',
                    maxPrice: 2000000,
                    condition: '',
                    statusOnlyAvailable: false,
                  });
                }}
                className="w-1/3 py-2.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-2/3 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors shadow-xs"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
