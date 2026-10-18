import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Send,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Handshake,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import {
  MarketplaceItem,
  ChatSession,
  ChatMessage,
  Seller,
} from '../types/marketplace';
import { formatIDR } from '../utils/designTokens';

interface ChatPageProps {
  chatSession: ChatSession;
  item: MarketplaceItem;
  seller: Seller;
  onBack: () => void;
  onSendMessage: (sessionId: string, text: string) => void;
  onCreateCodAgreement: (
    sessionId: string,
    location: string,
    date: string,
    time: string,
    agreedPrice: number
  ) => void;
  onAcceptCodAgreement: (sessionId: string, messageId: string) => void;
  onViewItemDetail: (item: MarketplaceItem) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  chatSession,
  item,
  seller,
  onBack,
  onSendMessage,
  onCreateCodAgreement,
  onAcceptCodAgreement,
  onViewItemDetail,
}) => {
  const [inputText, setInputText] = useState('');
  const [isCodModalOpen, setIsCodModalOpen] = useState(false);

  // COD Agreement form state
  const [codLocation, setCodLocation] = useState(
    item.recommendedMeetingSpots[0] || `Area ${item.kecamatan}`
  );
  const [codDate, setCodDate] = useState('Besok (Sabtu)');
  const [codTime, setCodTime] = useState('16:00 WIB');
  const [codPrice, setCodPrice] = useState(item.price);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatSession.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(chatSession.id, inputText.trim());
    setInputText('');
  };

  const handleCreateAgreement = () => {
    onCreateCodAgreement(
      chatSession.id,
      codLocation,
      codDate,
      codTime,
      Number(codPrice)
    );
    setIsCodModalOpen(false);
  };

  const quickChips = [
    `Bisa COD di ${item.kecamatan}?`,
    'Bisa ketemuan besok jam 4 sore?',
    'Kondisi fisik barang masih aman?',
    `Boleh nego tipis ${formatIDR(Math.max(10000, item.price - 15000))}?`,
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] text-neutral-900">
      {/* Top Header - Seller Profile */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 px-4 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={seller.avatar}
                alt={seller.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-violet-100"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-neutral-900 leading-none">
                  {seller.name}
                </h2>
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Aktif sekarang · {seller.kecamatan}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCodModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-xl text-xs font-semibold transition-colors"
          aria-label="Atur Kesepakatan COD"
        >
          <Handshake className="w-4 h-4" />
          <span>Atur COD</span>
        </button>
      </header>

      {/* Item Context Card (Sticky top info about the specific item being discussed) */}
      <div
        onClick={() => onViewItemDetail(item)}
        className="bg-white border-b border-neutral-200/60 px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-100"
          />
          <div className="truncate">
            <h3 className="text-xs font-semibold text-neutral-900 truncate">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-violet-700 font-mono">
                {formatIDR(item.price)}
              </span>
              <span className="text-[10px] text-neutral-400">· {item.status}</span>
            </div>
          </div>
        </div>

        <span className="text-[11px] font-medium text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md shrink-0 ml-2">
          Lihat Detail
        </span>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
        <div className="text-center my-1">
          <span className="text-[10px] bg-neutral-200/70 text-neutral-600 px-3 py-1 rounded-full">
            Percakapan dilindungi · Hindari transfer sebelum cek barang
          </span>
        </div>

        {chatSession.messages.map((msg) => {
          const isBuyer = msg.sender === 'buyer';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl p-3 shadow-2xs ${
                  isBuyer
                    ? 'bg-violet-600 text-white rounded-br-xs'
                    : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-bl-xs'
                }`}
              >
                <p className="text-xs leading-relaxed whitespace-pre-line">
                  {msg.text}
                </p>

                {/* Structured COD Agreement Card inside chat bubble */}
                {msg.isCodOffer && msg.codDetails && (
                  <div className="mt-3 pt-3 border-t border-neutral-100 bg-violet-50/80 text-neutral-900 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-800">
                        <Handshake className="w-4 h-4 text-violet-700" />
                        Kesepakatan COD
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          msg.codDetails.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {msg.codDetails.status === 'accepted'
                          ? '✅ Disepakati'
                          : '⏳ Menunggu Konfirmasi'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-neutral-700">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                        <span className="font-medium truncate">
                          {msg.codDetails.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                        <span>{msg.codDetails.date}</span>
                        <span>·</span>
                        <Clock className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                        <span>{msg.codDetails.time}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 font-semibold text-neutral-900">
                        <span>Harga Kesepakatan:</span>
                        <span className="text-violet-700 font-mono">
                          {formatIDR(msg.codDetails.agreedPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons on COD Agreement */}
                    {msg.codDetails.status === 'pending' && (
                      <div className="mt-3 pt-2 border-t border-neutral-200/50 flex gap-2">
                        <button
                          onClick={() => onAcceptCodAgreement(chatSession.id, msg.id)}
                          className="flex-1 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Setujui Jadwal COD
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-neutral-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-2 bg-neutral-100/70 border-t border-neutral-200/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0 ml-1" />
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(chatSession.id, chip)}
            className="text-[11px] bg-white border border-neutral-200 text-neutral-700 hover:border-violet-300 hover:text-violet-700 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Message Footer */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik pesan untuk penjual..."
            className="flex-1 bg-neutral-100 hover:bg-neutral-150 focus:bg-white text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-transparent focus:border-violet-500 focus:outline-hidden transition-all text-neutral-800 placeholder:text-neutral-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`p-2.5 rounded-xl transition-all ${
              inputText.trim()
                ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-xs'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
            aria-label="Kirim Pesan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Modal: Atur Kesepakatan COD */}
      {isCodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center">
                  <Handshake className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  Sepakati Jadwal & Titik COD
                </h3>
              </div>
              <button
                onClick={() => setIsCodModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {/* Titik Lokasi COD */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Titik Temu Publik:
                </label>
                <select
                  value={codLocation}
                  onChange={(e) => setCodLocation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 focus:bg-white focus:border-violet-500 focus:outline-hidden text-neutral-800"
                >
                  {item.recommendedMeetingSpots.map((spot, i) => (
                    <option key={i} value={spot}>
                      📍 {spot}
                    </option>
                  ))}
                  <option value={`Area ${item.kecamatan} (Tempat Umum)`}>
                    📍 Tempat umum lain di {item.kecamatan}
                  </option>
                </select>
              </div>

              {/* Tanggal & Waktu */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    Hari / Tanggal:
                  </label>
                  <input
                    type="text"
                    value={codDate}
                    onChange={(e) => setCodDate(e.target.value)}
                    placeholder="Contoh: Besok (Sabtu)"
                    className="w-full text-xs p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 focus:bg-white focus:border-violet-500 focus:outline-hidden text-neutral-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    Waktu / Jam:
                  </label>
                  <input
                    type="text"
                    value={codTime}
                    onChange={(e) => setCodTime(e.target.value)}
                    placeholder="Contoh: 16:00 WIB"
                    className="w-full text-xs p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 focus:bg-white focus:border-violet-500 focus:outline-hidden text-neutral-800"
                  />
                </div>
              </div>

              {/* Harga Kesepakatan */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Harga Kesepakatan Akhir (Rp):
                </label>
                <input
                  type="number"
                  value={codPrice}
                  onChange={(e) => setCodPrice(Number(e.target.value))}
                  step="5000"
                  className="w-full text-xs p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 focus:bg-white focus:border-violet-500 focus:outline-hidden text-neutral-800 font-mono font-bold"
                />
              </div>

              <div className="bg-amber-50 p-2.5 rounded-xl text-[11px] text-amber-800">
                💡 Kesepakatan ini akan dikirimkan ke ruang obrolan untuk dikonfirmasi oleh penjual.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-3">
              <button
                onClick={() => setIsCodModalOpen(false)}
                className="w-1/3 py-2.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleCreateAgreement}
                className="w-2/3 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors shadow-xs"
              >
                Kirim Kesepakatan COD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
