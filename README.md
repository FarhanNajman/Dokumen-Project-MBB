# PasarKembali - UI/UX Marketplace Barang Bekas

Aplikasi marketplace barang bekas (*thrift shop* & barang preloved) dengan konsep Cash on Delivery (COD) aman berbasis area kecamatan di Indonesia. Terinspirasi dari gaya desain modern: latar cerah, kartu bersudut membulat (*rounded-2xl*), foto barang menonjol, dan aksen ungu lembut (*soft violet*).

---

## 🚀 Cara Menjalankan di VS Code (Laptop / Komputer)

### 1. Prasyarat
Pastikan laptop Anda sudah terinstal:
* [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)
* [Visual Studio Code](https://code.visualstudio.com/)

### 2. Buka Folder di VS Code
1. Ekstrak file zip ke folder yang Anda inginkan (misalnya: `C:\Projects\pasarkembali` atau `~/Projects/pasarkembali`).
2. Buka VS Code.
3. Pilih menu **File** > **Open Folder...** lalu pilih folder `pasarkembali`.

### 3. Install Dependensi
Buka Terminal terintegrasi di VS Code (`Ctrl + \`` atau **Terminal** > **New Terminal**), lalu jalankan:

```bash
npm install
```

### 4. Jalankan Aplikasi di Mode Pengembangan
Setelah instalasi selesai, jalankan perintah:

```bash
npm run dev
```

Buka browser dan akses URL lokal yang muncul (biasanya `http://localhost:5173` atau `http://localhost:3000`).

---

## 📁 Struktur Folder

```text
├── src/
│   ├── assets/images/      # Aset foto barang & profil penjual
│   ├── components/         # Komponen UI utama
│   │   ├── ExplorePage.tsx     # Halaman 1: Beranda / Jelajahi & Filter
│   │   ├── DetailPage.tsx      # Halaman 2: Detail Barang & Peta Privasi
│   │   ├── ChatPage.tsx        # Halaman 3: Obrolan & Pengatur Jadwal COD
│   │   ├── DistrictMiniMap.tsx # Peta area kecamatan aman (tanpa alamat privat)
│   │   ├── BottomNav.tsx       # Navigasi bawah mobile
│   │   ├── FavoritesPage.tsx   # Halaman Barang Favorit
│   │   ├── ProfilePage.tsx     # Profil & Panduan Aman COD
│   │   └── ChatInboxView.tsx   # Daftar percakapan masuk
│   ├── data/
│   │   └── mockData.ts     # Data dummy barang & penjual Indonesia
│   ├── types/
│   │   └── marketplace.ts  # Tipe data TypeScript
│   ├── utils/
│   │   └── designTokens.ts # Utility perhitungan warna, token & format Rupiah
│   ├── App.tsx             # Komponen utama & router state
│   ├── main.tsx            # Entry point React
│   └── index.css           # Konfigurasi Tailwind CSS v4 & font
├── index.html              # HTML template & import font
├── package.json            # Daftar package dan dependencies
├── tsconfig.json           # Konfigurasi TypeScript
└── vite.config.ts          # Konfigurasi Vite & Tailwind
```

---

## 🛠️ Teknologi yang Digunakan
* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4
* **Ikon**: Lucide React
* **Font**: Plus Jakarta Sans & JetBrains Mono (Google Fonts)
