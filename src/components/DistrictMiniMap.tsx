import React from 'react';
import { MapPin, ShieldCheck, Info } from 'lucide-react';

interface DistrictMiniMapProps {
  kecamatan: string;
  kota: string;
  meetingSpots: string[];
}

export const DistrictMiniMap: React.FC<DistrictMiniMapProps> = ({
  kecamatan,
  kota,
  meetingSpots,
}) => {
  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 leading-tight">
              Area {kecamatan}
            </h4>
            <p className="text-xs text-neutral-500">{kota}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          Zona COD Aman
        </span>
      </div>

      {/* Stylized District SVG Map */}
      <div className="relative w-full h-40 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Grid & Roads */}
          <rect width="400" height="200" fill="#f8fafc" />
          <path
            d="M -20,40 L 420,70 M -20,130 L 420,110 M 120,-20 L 140,220 M 280,-20 L 260,220"
            stroke="#e2e8f0"
            strokeWidth="12"
            fill="none"
          />
          <path
            d="M 40,0 Q 180,90 360,30 M 0,160 Q 200,120 400,180"
            stroke="#cbd5e1"
            strokeWidth="6"
            fill="none"
          />
          {/* Green Parks */}
          <path
            d="M 60,60 Q 100,50 110,80 Q 90,110 50,90 Z"
            fill="#dcfce7"
            stroke="#bbf7d0"
            strokeWidth="2"
          />
          <path
            d="M 290,120 Q 340,110 350,140 Q 320,170 270,150 Z"
            fill="#dcfce7"
            stroke="#bbf7d0"
            strokeWidth="2"
          />

          {/* Kecamatan Boundary Polygon (Soft Purple translucent zone) */}
          <polygon
            points="70,30 250,20 340,90 320,170 140,180 50,120"
            fill="rgba(139, 92, 246, 0.12)"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Central Pulsing Radius representing General Area */}
          <circle cx="200" cy="100" r="42" fill="rgba(124, 58, 237, 0.15)" />
          <circle cx="200" cy="100" r="18" fill="rgba(124, 58, 237, 0.3)" />
          <circle cx="200" cy="100" r="5" fill="#7c3aed" />

          {/* Recommended public spot indicators */}
          <g transform="translate(140, 75)">
            <circle cx="0" cy="0" r="4" fill="#0284c7" />
            <text x="7" y="3" fontSize="8" fill="#475569" fontWeight="600">
              Stasiun / Terminal
            </text>
          </g>
          <g transform="translate(240, 135)">
            <circle cx="0" cy="0" r="4" fill="#0284c7" />
            <text x="7" y="3" fontSize="8" fill="#475569" fontWeight="600">
              Taman Publik / Mall
            </text>
          </g>
        </svg>

        {/* Informative Privacy Floating Badge */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-neutral-200/80 shadow-xs flex items-center gap-1.5 text-[11px] text-neutral-600">
          <Info className="w-3.5 h-3.5 text-violet-600 shrink-0" />
          <span>
            Hanya estimasi area kecamatan demi melindungi privasi alamat rumah penjual.
          </span>
        </div>
      </div>

      {/* Recommended Public Meeting Spots */}
      {meetingSpots && meetingSpots.length > 0 && (
        <div className="mt-3 pt-3 border-t border-neutral-100">
          <p className="text-xs font-medium text-neutral-700 mb-1.5">
            Rekomendasi Titik Temu COD Ramai:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {meetingSpots.map((spot, index) => (
              <span
                key={index}
                className="text-[11px] bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md"
              >
                📍 {spot}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
