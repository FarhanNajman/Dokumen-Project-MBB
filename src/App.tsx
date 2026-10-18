import React, { useState } from 'react';
import {
  MarketplaceItem,
  ChatSession,
  ChatMessage,
  ActiveTab,
} from './types/marketplace';
import { mockItems, mockSellers, initialChatSessions } from './data/mockData';
import { ExplorePage } from './components/ExplorePage';
import { DetailPage } from './components/DetailPage';
import { ChatPage } from './components/ChatPage';
import { ChatInboxView } from './components/ChatInboxView';
import { FavoritesPage } from './components/FavoritesPage';
import { ProfilePage } from './components/ProfilePage';
import { BottomNav } from './components/BottomNav';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<MarketplaceItem[]>(mockItems);
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['item-1']);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(initialChatSessions);
  const [activeChatSessionId, setActiveChatSessionId] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Quick lookup map for items
  const itemsMap: Record<string, MarketplaceItem> = items.reduce(
    (acc, it) => ({ ...acc, [it.id]: it }),
    {}
  );

  // Toggle favorite
  const handleToggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Open item detail
  const handleSelectItem = (item: MarketplaceItem) => {
    setSelectedItem(item);
  };

  // Back from detail
  const handleBackFromDetail = () => {
    setSelectedItem(null);
  };

  // Start or open chat with seller for this item
  const handleOpenChatWithSeller = (item: MarketplaceItem) => {
    let session = chatSessions.find(
      (s) => s.itemId === item.id && s.sellerId === item.seller.id
    );

    if (!session) {
      const newSession: ChatSession = {
        id: `chat-${Date.now()}`,
        itemId: item.id,
        sellerId: item.seller.id,
        lastMessage: `Halo kak ${item.seller.name}, barang "${item.title}" masih ada?`,
        lastUpdated: 'Baru saja',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'buyer',
            text: `Halo kak ${item.seller.name}, saya tertarik dengan barang "${item.title}". Apakah masih tersedia dan bisa COD di ${item.kecamatan}?`,
            timestamp: new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ],
      };
      setChatSessions((prev) => [newSession, ...prev]);
      session = newSession;
    }

    setActiveChatSessionId(session.id);
    setActiveTab('chat');
    setSelectedItem(null);
  };

  // Send a message in a chat session
  const handleSendMessage = (sessionId: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      text,
      timestamp: timeStr,
    };

    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            lastMessage: text,
            lastUpdated: timeStr,
            messages: [...s.messages, newMsg],
          };
        }
        return s;
      })
    );

    // Realistic automated seller response after 1.5 seconds
    setTimeout(() => {
      const sellerReplies = [
        'Halo kak! Barangnya masih sangat terawat. Siap COD di tempat umum terdekat.',
        'Boleh banget kak, nanti kita ketemu di lokasi yang disepakati ya!',
        'Aman kak, silakan dicek sepuasnya pas ketemuan nanti sebelum bayar.',
      ];
      const randomReply =
        sellerReplies[Math.floor(Math.random() * sellerReplies.length)];

      const sellerMsg: ChatMessage = {
        id: `msg-seller-${Date.now()}`,
        sender: 'seller',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setChatSessions((prev) =>
        prev.map((s) => {
          if (s.id === sessionId) {
            return {
              ...s,
              lastMessage: randomReply,
              lastUpdated: sellerMsg.timestamp,
              messages: [...s.messages, sellerMsg],
            };
          }
          return s;
        })
      );
    }, 1200);
  };

  // Create COD agreement
  const handleCreateCodAgreement = (
    sessionId: string,
    location: string,
    date: string,
    time: string,
    agreedPrice: number
  ) => {
    const timeStr = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const codMsg: ChatMessage = {
      id: `cod-${Date.now()}`,
      sender: 'buyer',
      text: `Mengajukan Kesepakatan COD:\n📍 Titik: ${location}\n📅 Jadwal: ${date}, ${time}\n💰 Harga: Rp ${agreedPrice.toLocaleString('id-ID')}`,
      timestamp: timeStr,
      isCodOffer: true,
      codDetails: {
        location,
        date,
        time,
        agreedPrice,
        status: 'pending',
      },
    };

    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            lastMessage: `Mengajukan Kesepakatan COD di ${location}`,
            lastUpdated: timeStr,
            messages: [...s.messages, codMsg],
          };
        }
        return s;
      })
    );
  };

  // Accept COD agreement
  const handleAcceptCodAgreement = (sessionId: string, messageId: string) => {
    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const updatedMessages = s.messages.map((m) => {
            if (m.id === messageId && m.codDetails) {
              return {
                ...m,
                codDetails: {
                  ...m.codDetails,
                  status: 'accepted' as const,
                },
              };
            }
            return m;
          });
          return {
            ...s,
            messages: updatedMessages,
          };
        }
        return s;
      })
    );
  };

  // Filter favorite item objects
  const favoriteItems = items.filter((it) => favorites.includes(it.id));

  // Determine active chat session if any
  const currentChatSession = chatSessions.find((s) => s.id === activeChatSessionId);
  const currentChatItem = currentChatSession
    ? itemsMap[currentChatSession.itemId]
    : null;
  const currentChatSeller = currentChatItem ? currentChatItem.seller : null;

  return (
    <div className="min-h-screen bg-neutral-200/60 flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Top Device Switcher for Reviewing on Desktop & Mobile */}
      <header className="w-full max-w-md hidden sm:flex items-center justify-between px-3 py-2 mb-3 bg-white/90 backdrop-blur-md rounded-2xl border border-neutral-300/80 shadow-xs text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
          <span className="font-semibold text-neutral-800">PasarKembali UI/UX</span>
        </div>
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
          <button
            onClick={() => setIsMobileFrame(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              isMobileFrame
                ? 'bg-white text-violet-700 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setIsMobileFrame(false)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              !isMobileFrame
                ? 'bg-white text-violet-700 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Layar Penuh</span>
          </button>
        </div>
      </header>

      {/* Main App Container */}
      <div
        className={`w-full transition-all duration-300 relative bg-white shadow-2xl overflow-hidden flex flex-col ${
          isMobileFrame
            ? 'max-w-md sm:rounded-[36px] sm:border-[8px] sm:border-neutral-800 sm:ring-1 sm:ring-black/10 min-h-[844px] h-[844px]'
            : 'max-w-3xl rounded-3xl min-h-[90vh]'
        }`}
      >
        {/* Mobile Speaker / Camera Notch Simulator (only in framed mode) */}
        {isMobileFrame && (
          <div className="hidden sm:flex justify-center pt-2 pb-1 bg-white relative z-40">
            <div className="w-24 h-4 bg-neutral-800 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-neutral-950 ml-auto mr-3 border border-neutral-700" />
            </div>
          </div>
        )}

        {/* Dynamic Screen Renderer */}
        <div className="flex-1 overflow-y-auto relative">
          {selectedItem ? (
            /* Screen 2: Detail Barang */
            <DetailPage
              item={selectedItem}
              onBack={handleBackFromDetail}
              onOpenChatWithSeller={handleOpenChatWithSeller}
              isFavorite={favorites.includes(selectedItem.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : activeTab === 'chat' && currentChatSession && currentChatItem && currentChatSeller ? (
            /* Screen 3: Chat Session with Seller */
            <ChatPage
              chatSession={currentChatSession}
              item={currentChatItem}
              seller={currentChatSeller}
              onBack={() => setActiveChatSessionId(null)}
              onSendMessage={handleSendMessage}
              onCreateCodAgreement={handleCreateCodAgreement}
              onAcceptCodAgreement={handleAcceptCodAgreement}
              onViewItemDetail={handleSelectItem}
            />
          ) : activeTab === 'chat' ? (
            /* Screen 3: Chat Inbox List */
            <ChatInboxView
              chatSessions={chatSessions}
              itemsMap={itemsMap}
              onSelectChat={(session) => setActiveChatSessionId(session.id)}
            />
          ) : activeTab === 'favorites' ? (
            /* Screen: Favorites */
            <FavoritesPage
              favoriteItems={favoriteItems}
              onSelectItem={handleSelectItem}
              onRemoveFavorite={handleToggleFavorite}
            />
          ) : activeTab === 'profile' ? (
            /* Screen: Profile & Safety Guidelines */
            <ProfilePage />
          ) : (
            /* Screen 1: Beranda / Jelajahi */
            <ExplorePage
              items={items}
              onSelectItem={handleSelectItem}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>

        {/* Bottom Navigation Bar (Shown on top-level tabs when not in detail view or active chat session) */}
        {!selectedItem && !activeChatSessionId && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedItem(null);
            }}
            favoritesCount={favorites.length}
            unreadChatCount={chatSessions.reduce((acc, s) => acc + s.unreadCount, 0)}
          />
        )}
      </div>
    </div>
  );
}
