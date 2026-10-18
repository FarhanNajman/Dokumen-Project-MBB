import React from 'react';
import { Home, Heart, MessageSquare, User } from 'lucide-react';
import { ActiveTab } from '../types/marketplace';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
  unreadChatCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  unreadChatCount,
}) => {
  return (
    <nav
      aria-label="Navigasi Utama"
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-4 py-2 z-40 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {/* Beranda */}
        <button
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'explore'
              ? 'text-violet-600 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 font-normal'
          }`}
          aria-label="Buka Beranda"
        >
          <Home
            className={`w-5 h-5 transition-transform ${
              activeTab === 'explore' ? 'scale-110 fill-violet-600/20' : ''
            }`}
          />
          <span className="text-[11px] mt-1">Beranda</span>
        </button>

        {/* Favorit */}
        <button
          onClick={() => onTabChange('favorites')}
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'favorites'
              ? 'text-violet-600 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 font-normal'
          }`}
          aria-label="Buka Favorit"
        >
          <Heart
            className={`w-5 h-5 transition-transform ${
              activeTab === 'favorites' ? 'scale-110 fill-violet-600/20' : ''
            }`}
          />
          <span className="text-[11px] mt-1">Favorit</span>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 text-[9px] font-bold bg-violet-600 text-white rounded-full flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Chat */}
        <button
          onClick={() => onTabChange('chat')}
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'chat'
              ? 'text-violet-600 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 font-normal'
          }`}
          aria-label="Buka Pesan Chat"
        >
          <MessageSquare
            className={`w-5 h-5 transition-transform ${
              activeTab === 'chat' ? 'scale-110 fill-violet-600/20' : ''
            }`}
          />
          <span className="text-[11px] mt-1">Chat</span>
          {unreadChatCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 text-[9px] font-bold bg-violet-600 text-white rounded-full flex items-center justify-center">
              {unreadChatCount}
            </span>
          )}
        </button>

        {/* Profil */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'text-violet-600 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 font-normal'
          }`}
          aria-label="Buka Profil Pengguna"
        >
          <User
            className={`w-5 h-5 transition-transform ${
              activeTab === 'profile' ? 'scale-110 fill-violet-600/20' : ''
            }`}
          />
          <span className="text-[11px] mt-1">Profil</span>
        </button>
      </div>
    </nav>
  );
};
