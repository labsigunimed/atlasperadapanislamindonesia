# Atlas Islam Nusantara — WebGIS Persebaran Kerajaan dan Kesultanan Islam di Indonesia

Aplikasi peta sejarah interaktif (*Modern Historical Digital Atlas*) untuk menelusuri persebaran geografis, kronologi berdirinya, masa kejayaan, akhir kekuasaan politik, daftar sultan, konteks maritim-ekonomi, perkiraan wilayah pengaruh, serta situs cagar budaya kerajaan dan kesultanan Islam di Nusantara.

---

## 1. Nama Proyek
**Atlas Islam Nusantara — WebGIS Persebaran Kerajaan Islam di Indonesia**

- **URL Publikasi GitHub Pages:** [https://labsigunimed.github.io/atlasperadapanislamindonesia/](https://labsigunimed.github.io/atlasperadapanislamindonesia/)
- **Repository GitHub:** [https://github.com/labsigunimed/atlasperadapanislamindonesia](https://github.com/labsigunimed/atlasperadapanislamindonesia)

## 2. Deskripsi Singkat
**Atlas Islam Nusantara** adalah aplikasi WebGIS berbasis web statis yang memadukan estetika atlas kartografi arsip Nusantara dengan teknologi Sistem Informasi Geografis (SIG/GIS) modern. Setiap informasi sejarah dilengkapi dengan rujukan akademik, bukti epigrafi, atau nomor registrasi Cagar Budaya Nasional serta indikator tingkat verifikasi sumber secara transparan.

## 3. Tujuan Aplikasi
1. Memetakan persebaran kerajaan dan kesultanan Islam yang pernah berdiri di kepulauan Indonesia (Sumatera, Jawa, Kalimantan, Sulawesi, Maluku, dan Nusa Tenggara).
2. Menyajikan informasi berdirinya kerajaan, masa kejayaan, dinamika pemerintahan, dan akhir kekuasaan politik atau integrasinya ke dalam Negara Kesatuan Republik Indonesia (NKRI).
3. Menampilkan daftar sultan dan penguasa beserta masa pemerintahan, gelar, dan capaian utamanya.
4. Menjelaskan wilayah kekuasaan secara jujur secara metodologis (membedakan antara mandala pengaruh maritim dan ketiadaan batas garis modern).
5. Memetakan masjid kuno, kompleks makam sultan, istana/keraton, dan benteng pertahanan bersejarah.
6. Menyediakan alat bantu pembelajaran sejarah interaktif bagi pelajar, mahasiswa, guru, dosen, peneliti, dan masyarakat umum.

## 4. Fitur Utama
- **Peta Interaktif WebGIS (Leaflet):**
  - Penanda (*marker*) pusat pemerintahan kerajaan/kesultanan (`👑`) dan situs peninggalan sejarah (`🕌`, `🏛️`, `⚱️`, `🏰`).
  - Lapisan poligon perkiraan zona pengaruh historis (dengan atribusi kartografer dan catatan ketidakpastian).
  - **Kompas Orientasi Mata Angin (*Wind Rose*):** Menampilkan 8 arah mata angin berbahasa Indonesia (`U`, `TL`, `T`, `TG`, `S`, `BD`, `B`, `BL`) yang juga berfungsi mereset sudut pandang peta ke seluruh kepulauan Indonesia.
  - Pilihan peta dasar (*Basemap*): Tema Arsip Kartografi, Topografi OpenStreetMap, dan Citra Satelit.
  - Kontrol lapisan (*layer toggle*), legenda interaktif, skala jarak metrik, dan tombol reset pandangan.
- **Pencarian & Penyaringan Multi-Kriteria:**
  - Pencarian *real-time* berdasarkan **nama kerajaan**, **nama sultan/penguasa**, **nama situs**, **wilayah/provinsi**, atau **kata kunci sejarah**.
  - Filter berdasarkan **Wilayah Kepulauan**, **Rentang Tahun (800–1950 M)**, **Jenis Objek** (Semua Objek, Hanya Kerajaan, Hanya Situs), **Kategori Situs**, dan **Status Verifikasi Data** (`Terverifikasi`, `Perkiraan`, `Belum terverifikasi`).
- **Panel Ringkasan & Modal Detail Kerajaan:**
  - Menampilkan 4 pilar konteks sejarah (**Politik & Diplomasi**, **Ekonomi & Komoditas**, **Jalur Maritim**, **Budaya & Keagamaan**).
  - Menampilkan kotak khusus **Catatan Historiografi: Perbedaan Pendapat Sumber** (*Disputed Claims*) apabila terdapat perbedaan antara tradisi naskah lokal (babad/hikayat) dan kajian epigrafi/akademik modern.
- **Garis Waktu (*Timeline*) Interaktif:**
  - Penggeser tahun (*year scrubber*) dan diagram batang rentang hidup kesultanan untuk mengamati kerajaan mana saja yang berdaulat sezaman pada tahun tertentu.
- **Katalog Situs Peninggalan (Grid & Daftar):**
  - Inventaris masjid kuno, keraton, makam, dan benteng dengan fitur salin koordinat GPS dan tombol **Lihat di Peta**.
- **Halaman Sumber & Metodologi:**
  - Rubrik verifikasi 3 tingkat, penjelasan konsep mandala, dan daftar pustaka lengkap.

## 5. Teknologi yang Digunakan
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8 (dikonfigurasi dengan `base: './'` untuk kompatibilitas penuh GitHub Pages)
- **Peta & Geospasial:** Leaflet 1.9 + GeoJSON (RFC 7946)
- **Styling & Tipografi:** Tailwind CSS v4 + Google Fonts (*Cormorant Garamond*, *Cinzel*, *Plus Jakarta Sans*)
- **Ikonografi:** Lucide React + SVG Kartografi Kustom
- **Pengujian Otomatis:** Node/Bun Test Runner (`node:test` & `node:assert`)

## 6. Struktur Folder
```text
Atlas-Islam-Nusantara/
├── .github/workflows/
│   └── deploy.yml                 # Workflow otomatis GitHub Actions ke GitHub Pages
├── public/
│   └── data/                      # Dataset statis JSON & GeoJSON siap konsumsi publik
│       ├── kingdoms.json
│       ├── rulers.json
│       ├── sites.json
│       ├── sources.json
│       ├── events.json
│       └── territories.geojson
├── src/
│   ├── components/                # Komponen antarmuka pengguna (UI)
│   │   ├── CompassRose.tsx        # Kompas Orientasi Mata Angin
│   │   ├── FilterPanel.tsx        # Panel filter wilayah, periode, jenis objek & verifikasi
│   │   ├── Header.tsx             # Navigasi utama & pencarian global
│   │   ├── KingdomDetailModal.tsx # Modal detail lengkap kerajaan & 6 tab informasi
│   │   ├── KingdomSummaryDrawer.tsx # Panel ringkasan cepat saat marker diklik
│   │   ├── MapGIS.tsx             # Peta interaktif Leaflet, layer, dan legenda
│   │   ├── SiteDetailModal.tsx    # Modal rincian situs cagar budaya
│   │   ├── SitesCatalogView.tsx   # Katalog situs mode Grid & Daftar
│   │   ├── SourcesAndAboutView.tsx # Halaman metodologi & bibliografi
│   │   └── TimelineView.tsx       # Halaman garis waktu kronologis
│   ├── data/                      # Sumber data utama bertipe TypeScript
│   │   ├── kingdomsData.ts
│   │   ├── rulersData.ts
│   │   ├── sitesData.ts
│   │   ├── sourcesData.ts
│   │   ├── territoriesData.ts
│   │   └── eventsData.ts
│   ├── types/
│   │   └── atlas.ts               # Definisi interface TypeScript & skema data
│   ├── utils/
│   │   ├── historyLogic.ts        # Logika pencarian, penyaringan, dan statistik
│   │   └── historyLogic.test.ts   # Unit test & validasi integritas dataset
│   ├── App.tsx                    # Komponen induk & sinkronisasi navigasi hash
│   ├── index.css                  # Gaya tema kertas arsip & kustomisasi Leaflet
│   └── main.tsx                   # Titik masuk aplikasi React
├── DATA_SOURCES.md                # Dokumentasi lengkap sumber sejarah & historiografi
├── README.md                      # Panduan penggunaan, pengembangan, dan deployment
├── index.html                     # Dokumen HTML utama
├── package.json                   # Konfigurasi paket & skrip perintah
├── tsconfig.json                  # Konfigurasi TypeScript
└── vite.config.ts                 # Konfigurasi bundel Vite
```

## 7. Prasyarat Instalasi
Pastikan komputer Anda telah terpasang salah satu *runtime* JavaScript berikut:
- **Node.js** (versi 18, 20, atau 22 ke atas) beserta `npm`, **atau**
- **Bun** (versi 1.1 ke atas)
- **Git** untuk pengelolaan versi dan publikasi ke GitHub.

## 8. Cara Menjalankan Secara Lokal
1. Buka terminal (PowerShell / Command Prompt / Terminal) di folder proyek.
2. Instal seluruh dependensi:
   ```bash
   npm install
   # atau jika menggunakan Bun:
   bun install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   # atau:
   bun run dev
   ```
4. Buka browser dan kunjungi alamat lokal yang muncul di terminal (umumnya `http://localhost:3000`).

## 9. Cara Melakukan Build Produksi
Untuk menghasilkan berkas statis siap publikasi di dalam folder `dist/`:
```bash
npm run build
# atau:
bun run build
```
Untuk melihat pratinjau hasil *build* secara lokal:
```bash
npm run preview
```

## 10. Cara Menjalankan Pengujian
Proyek ini dilengkapi dengan pengujian otomatis yang memeriksa logika pencarian/filter sekaligus memvalidasi keutuhan seluruh ID referensi dan batas koordinat Indonesia:
```bash
npm test
# atau:
bun test
```
Untuk memeriksa kecocokan tipe data TypeScript:
```bash
npm run lint
```

## 11. Cara Menambah Data Kerajaan Baru
Buka berkas `src/data/kingdomsData.ts` dan tambahkan objek baru ke dalam array `rawKingdoms`:
1. Gunakan `id` unik dengan awalan `kgd_` (contoh: `kgd_palembang`).
2. Isi `name`, `alternate_names`, `region` (`'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Maluku & Nusa Tenggara'`), `capital`, serta koordinat `latitude` dan `longitude` yang valid.
3. Isi `founded_year`, `founded_display`, `founded_certainty` (`'verified' | 'estimated' | 'unverified'`), `golden_age_display`, dan `ended_display`.
4. Lengkapi objek `historicalContext` (`politics`, `economy`, `maritime`, `cultureAndReligion`).
5. Hubungkan `source_ids` dengan ID sumber yang sudah terdaftar di `src/data/sourcesData.ts`.

## 12. Cara Menambah Data Sultan Baru
Buka berkas `src/data/rulersData.ts` dan tambahkan entri pada `rawRulers`:
1. Berikan `id` unik (contoh: `rul_bima_4`) dan pastikan `kingdom_id` merujuk pada `id` kerajaan yang valid di `kingdomsData.ts`.
2. Cantumkan `name`, `title`, `reign_start`, `reign_end` (atau `null` jika tidak diketahui pasti), dan `reign_display`.
3. Tetapkan `certainty` (`'verified' | 'estimated' | 'unverified'`) dan cantumkan `source_ids` pendukungnya.

## 13. Cara Menambah Situs Peninggalan Baru
Buka berkas `src/data/sitesData.ts` dan tambahkan objek baru ke dalam `rawSites`:
1. Berikan `id` unik dengan awalan `site_`.
2. Pilih `type`: `'mosque'` (Masjid Kuno), `'palace'` (Keraton/Istana), `'tomb'` (Makam), atau `'fortress'` (Benteng).
3. Masukkan `kingdom_ids` (array ID kerajaan terkait), `latitude`, `longitude`, `modern_location`, `built_year_display`, `description`, dan `architectural_features`.
4. Jangan menggunakan foto palsu atau foto tanpa lisensi yang jelas.

## 14. Cara Menambah Sumber Sejarah Baru
Buka berkas `src/data/sourcesData.ts` dan tambahkan objek `HistoricalSource`:
1. Gunakan `id` deskriptif (contoh: `src_azra_2004`).
2. Isi `title`, `authorOrInstitution`, `publicationYear`, `sourceType`, `url`, `accessDate`, daftar klaim pada array `supports`, serta `reliabilityNotes`.

## 15. Cara Memberi Label Status Verifikasi Data
Setiap data sejarah wajib diklasifikasikan ke dalam salah satu dari tiga tingkat kepastian:
- `'verified'` (**Terverifikasi**): Memiliki bukti epigrafi primer (batu nisan, mata uang, prasasti), SK Cagar Budaya Nasional, atau arsip sezaman yang disepakati sejarawan akademik.
- `'estimated'` (**Perkiraan**): Berasal dari rekonsiliasi naskah babad/hikayat dengan sumber sekunder atau rekonstruksi peta sejarah akademik.
- `'unverified'` (**Belum terverifikasi**): Klaim tradisi lokal yang belum memiliki bukti arkeologis/epigrafis sezaman. Jika ada perdebatan antar sumber, tambahkan penjelasannya pada array `disputedClaims` di `kingdomsData.ts`.

## 16. Cara Menangani Batas Wilayah Historis
- **Prinsip Utama:** Jangan pernah menggambar poligon wilayah secara spekulatif atau menyamakan wilayah kesultanan tradisional dengan batas provinsi/negara modern.
- Jika suatu kesultanan tidak memiliki peta rekonstruksi akademik yang jelas, biarkan tanpa poligon di `territoriesData.ts` — sistem secara otomatis akan menetapkan `territoryGeometry: null` dan menampilkan catatan integritas kartografi pada modal detail kerajaan.
- Jika menambahkan poligon di `src/data/territoriesData.ts`, wajib mencantumkan `historicalMapSource`, `cartographer`, `mapYear`, `reconstruction_method`, dan `uncertaintyNote`.

## 17. Cara Deployment ke GitHub Pages
Proyek ini dikonfigurasi dengan `base: './'` di `vite.config.ts` dan dipublikasikan melalui branch **`gh-pages`** ke alamat:
**https://labsigunimed.github.io/atlasperadapanislamindonesia/**

Langkah-langkah memperbarui halaman GitHub Pages setelah Anda mengubah kode atau menambah data:
1. Simpan dan *commit* perubahan Anda ke branch `main`:
   ```bash
   git add .
   git commit -m "Memperbarui data sejarah"
   git push origin main
   ```
2. Bangun ulang folder `dist/` dan kirimkan ke branch `gh-pages`:
   ```bash
   bun run build
   # Lalu publikasikan isi folder dist/ ke branch gh-pages:
   cd dist
   git init
   git checkout -b gh-pages
   git add -A
   git commit -m "deploy: perbarui GitHub Pages"
   git remote add origin https://github.com/labsigunimed/atlasperadapanislamindonesia.git
   git push -f origin gh-pages
   cd ..
   ```
3. Pada menu **Settings > Pages** di GitHub, pastikan **Source** diatur ke **Deploy from a branch** dan pilih branch **`gh-pages` / `(root)`**.

## 18. Pemecahan Masalah Umum (Troubleshooting)
- **Peta terlihat abu-abu atau terpotong saat pertama kali dibuka:** Pastikan koneksi internet aktif agar ubin peta (*tiles*) OpenStreetMap dapat dimuat. Klik tombol **Reset Pandangan** atau ikon **Mata Angin** untuk memicu perhitungan ulang ukuran kontainer peta (`invalidateSize`).
- **Halaman 404 saat di-refresh di GitHub Pages:** Aplikasi ini telah menggunakan navigasi berbasis *hash* (`#peta`, `#timeline`, `#situs`, `#sumber`) dan path relatif (`./`), sehingga aman di-refresh pada subdirektori GitHub Pages.
- **Gagal menjalankan `npm test`:** Pastikan versi Node.js minimal v18+ atau gunakan `bun test`.

## 19. Lisensi dan Atribusi Peta/Data
- **Kode Sumber Aplikasi:** Lisensi Apache-2.0 / MIT untuk tujuan pendidikan dan riset.
- **Atribusi Peta Dasar:** &copy; [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors & Esri World Imagery.
- **Atribusi Data Sejarah:** Merujuk pada publikasi akademik (M.C. Ricklefs, Th.G.Th. Pigeaud & H.J. de Graaf, Anthony Reid, Leonard Y. Andaya, Denys Lombard, Claude Guillot, Robert Cribb), Arsip Nasional Republik Indonesia (ANRI), dan Sistem Registrasi Nasional Cagar Budaya Kementerian Kebudayaan / Kemendikbudristek RI. Lihat rincian lengkap di [DATA_SOURCES.md](./DATA_SOURCES.md).
