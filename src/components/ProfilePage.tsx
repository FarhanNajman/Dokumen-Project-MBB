import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Handshake,
  MapPin,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-full pb-24 bg-[#F9FAFB] text-neutral-900">
      <header className="px-5 pt-6 pb-4 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-neutral-100">
        <h1 className="text-xl font-bold text-neutral-900">Profil Saya</h1>
      </header>

      <main className="px-5 pt-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-violet-100 text-violet-700 font-bold text-lg flex items-center justify-center border-2 border-violet-200">
            FN
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-neutral-900">
                Farhan Najman
              </h2>
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <p className="text-xs text-neutral-500">
              farhannajman220107@gmail.com
            </p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-neutral-500">
              <MapPin className="w-3 h-3 text-violet-600" />
              <span>Kec. Tebet, Jakarta Selatan</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white p-3 rounded-xl border border-neutral-200/70 text-center">
            <span className="text-base font-extrabold text-neutral-900 font-mono">
              3
            </span>
            <p className="text-[10px] text-neutral-500 mt-0.5">Barang Dijual</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-neutral-200/70 text-center">
            <span className="text-base font-extrabold text-violet-600 font-mono">
              8
            </span>
            <p className="text-[10px] text-neutral-500 mt-0.5">COD Selesai</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-neutral-200/70 text-center">
            <span className="text-base font-extrabold text-amber-600 font-mono">
              5.0
            </span>
            <p className="text-[10px] text-neutral-500 mt-0.5">Rating Penjual</p>
          </div>
        </div>

        {/* COD Safety Guidelines - Essential for this marketplace */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-violet-600" />
            <h3 className="text-sm font-bold text-neutral-900">
              Panduan Aman Transaksi COD
            </h3>
          </div>

          <div className="space-y-2.5 text-xs text-neutral-600">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-violet-50 text-violet-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong>Pilih Tempat Publik:</strong> Selalu sepakati titik temu di lokasi yang ramai seperti stasiun, minimarket, atau mall di area kecamatan yang dituju.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-violet-50 text-violet-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong>Periksa Fisik Barang:</strong> Cek kondisi barang secara teliti di hadapan penjual sebelum melakukan pembayaran.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-violet-50 text-violet-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong>Tanpa Uang Muka (DP):</strong> PasarKembali tidak menyarankan transfer DP sebelum Anda melihat barang secara langsung.
              </p>
            </div>
          </div>
        </div>

        {/* Menu list */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden shadow-xs">
          <div className="p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800">
              <Handshake className="w-4 h-4 text-violet-600" />
              <span>Riwayat Kesepakatan COD</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800">
              <HelpCircle className="w-4 h-4 text-violet-600" />
              <span>Pusat Bantuan & Kebijakan Privasi</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </main>
    </div>
  );
};
