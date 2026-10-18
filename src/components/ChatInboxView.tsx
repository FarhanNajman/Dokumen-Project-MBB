import React from 'react';
import { MessageSquare, Clock, MapPin } from 'lucide-react';
import { ChatSession, MarketplaceItem } from '../types/marketplace';
import { formatIDR } from '../utils/designTokens';

interface ChatInboxViewProps {
  chatSessions: ChatSession[];
  itemsMap: Record<string, MarketplaceItem>;
  onSelectChat: (session: ChatSession) => void;
}

export const ChatInboxView: React.FC<ChatInboxViewProps> = ({
  chatSessions,
  itemsMap,
  onSelectChat,
}) => {
  return (
    <div className="min-h-full pb-24 bg-[#F9FAFB] text-neutral-900">
      <header className="px-5 pt-6 pb-4 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-neutral-100">
        <h1 className="text-xl font-bold text-neutral-900">Pesan & COD</h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Percakapan langsung dengan penjual untuk kesepakatan COD
        </p>
      </header>

      <main className="px-4 py-3 divide-y divide-neutral-100">
        {chatSessions.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-neutral-200/80 mt-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-800">
              Belum ada percakapan
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              Pilih salah satu barang di Beranda lalu klik tombol "Chat Penjual untuk COD" untuk mulai bertanya.
            </p>
          </div>
        ) : (
          chatSessions.map((session) => {
            const item = itemsMap[session.itemId];
            if (!item) return null;

            return (
              <div
                key={session.id}
                onClick={() => onSelectChat(session)}
                className="py-3 px-3 rounded-2xl hover:bg-white bg-white/50 border border-transparent hover:border-neutral-200/60 transition-all cursor-pointer flex items-center gap-3 mb-2 shadow-2xs"
              >
                {/* Seller Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={item.seller.avatar}
                    alt={item.seller.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-violet-100"
                  />
                  {session.unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-violet-600 rounded-full ring-2 ring-white" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-neutral-900 truncate">
                      {item.seller.name}
                    </h3>
                    <span className="text-[10px] text-neutral-400">
                      {session.lastUpdated}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-violet-700 truncate mt-0.5">
                    {item.title} ({formatIDR(item.price)})
                  </p>

                  <p className="text-xs text-neutral-500 truncate mt-0.5">
                    {session.messages[session.messages.length - 1]?.text ||
                      session.lastMessage}
                  </p>
                </div>

                {/* Item Thumbnail */}
                <img
                  src={item.images[0]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-100"
                />
              </div>
            );
          })
        )}
      </main>
    </div>
  );
};
