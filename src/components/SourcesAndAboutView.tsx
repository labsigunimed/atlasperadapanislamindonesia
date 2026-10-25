import React from 'react';
import {
  BookOpen,
  ShieldCheck,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Code2,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { sourcesData } from '../data/sourcesData';

export const SourcesAndAboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40">
          Metodologi Digital Humanities & Historiografi
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B36]">
          Sumber Referensi, Metodologi & Keterbatasan Data
        </h2>
        <p className="text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Atlas Islam Nusantara dirancang untuk memadukan ketelitian ilmiah kajian sejarah dengan
          visualisasi geospasial modern (WebGIS), mengedepankan keterbukaan sumber serta kejujuran
          akademik atas ketidakpastian data masa lampau.
        </p>
      </div>

      {/* Section 1: Certainty Rubric & Methodology */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#B58B4D]/40 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <ShieldCheck className="w-6 h-6 text-[#426B60]" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#172B36]">
            1. Kriteria Status Verifikasi Data (Tiga Tingkatan)
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Historiografi kerajaan dan kesultanan Islam di Nusantara memiliki tantangan metodologis:
          perbedaan tarikh antara naskah kronik lokal (babad, hikayat, lontara), inskripsi batu
          nisan berangka tahun Hijriah, serta catatan musafir dan arsip Eropa. Oleh sebab itu,
          setiap entitas pada aplikasi ini diberi penanda status verifikasi yang tegas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Terverifikasi</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Didukung oleh bukti epigrafi primer (misalnya batu nisan Sultan Malik as-Saleh 696 H /
              1297 M), penetapan resmi Cagar Budaya Nasional Kemendikbudristek, arsip diplomatik
              sezaman (ANRI), atau konsensus kuat literatur akademik utama.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Perkiraan</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Disimpulkan melalui rekonsiliasi naskah historiografi lokal (seperti Babad Tanah Jawi
              atau Salasilah Kutai) dan laporan pengelana asing, atau merupakan rekonstruksi zona
              pengaruh kartografis yang batas pastinya bersifat dinamis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <HelpCircle className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Belum terverifikasi</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Klaim tradisi lisan atau naskah belakangan (seperti klaim berdirinya Kesultanan Perlak
              pada tahun 840 M / abad ke-9 M) yang belum didukung oleh temuan bukti arkeologis,
              numismatik, maupun epigrafi sezaman.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Batasan Rekonstruksi Wilayah Historis */}
      <div className="bg-[#172B36] text-[#F4F0E6] p-6 sm:p-8 rounded-2xl border-2 border-[#B58B4D] shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#B58B4D]" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F4F0E6]">
            2. Keterbatasan Peta Sejarah & Prinsip Anti-Spekulasi Wilayah
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#F4F0E6]/90 leading-relaxed">
          Negara dan kesultanan tradisional di Asia Tenggara pra-modern tidak menggunakan konsep
          perbatasan garis kaku ala negara bangsa modern (<em>Westphalian border</em>), melainkan
          berpola <strong>Mandala</strong> — kekuasaan memancar dari pusat keraton atau bandar
          pelabuhan utama melalui jaringan kesetiaan, upeti, dan aliansi maritim.
        </p>
        <p className="text-xs sm:text-sm text-[#F4F0E6]/85 leading-relaxed">
          Sesuai prinsip integritas kartografi: <strong>kami tidak menggambar poligon wilayah fiktif</strong>.
          Poligon zona pengaruh hanya ditampilkan pada kesultanan yang memiliki rujukan peta sejarah
          akademik (seperti <em>Historical Atlas of Indonesia</em> karya Robert Cribb, 2000) dengan
          label tegas <strong>Perkiraan</strong>. Untuk kesultanan lainnya, properti{' '}
          <code>territoryGeometry</code> dikosongkan (<code>null</code>) dan wilayah dijelaskan
          secara naratif berdasarkan sumber tertulis.
        </p>
      </div>

      {/* Section 3: How Students Can Add Data */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#B58B4D]/40 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Code2 className="w-6 h-6 text-[#172B36]" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#172B36]">
            3. Panduan Kontribusi & Penambahan Data Baru (Untuk Mahasiswa & Peneliti)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Aplikasi ini menggunakan arsitektur statis berbasis TypeScript dan JSON/GeoJSON sehingga
          mudah dikembangkan oleh mahasiswa tanpa memerlukan server database berbayar:
        </p>
        <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-gray-800">
          <li>
            <strong>Tambahkan Sumber Terlebih Dahulu:</strong> Daftarkan buku akademik, SK Cagar
            Budaya, atau prasasti di <code>src/data/sourcesData.ts</code>.
          </li>
          <li>
            <strong>Tambahkan Data Sultan & Situs:</strong> Masukkan tokoh penguasa di{' '}
            <code>src/data/rulersData.ts</code> dan koordinat situs di{' '}
            <code>src/data/sitesData.ts</code> dengan menyertakan <code>source_ids</code> dan
            tingkat kepastian (<code>verified</code>, <code>estimated</code>, atau{' '}
            <code>unverified</code>).
          </li>
          <li>
            <strong>Tambahkan Entitas Kerajaan:</strong> Masukkan data kesultanan di{' '}
            <code>src/data/kingdomsData.ts</code>. Jika tidak ada peta historis resmi, biarkan
            poligon wilayah bernilai <code>null</code>.
          </li>
          <li>
            <strong>Jalankan Pengujian Validasi:</strong> Eksekusi perintah <code>bun test</code>{' '}
            di terminal untuk memastikan tidak ada ID duplikat, koordinat di luar Indonesia, atau
            referensi sumber yang terputus.
          </li>
        </ol>
      </div>

      {/* Section 4: Full Academic Bibliography */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#B58B4D]" />
          <h3 className="font-serif text-2xl font-bold text-[#172B36]">
            4. Daftar Pustaka & Sumber Referensi Utama ({sourcesData.length} Korpus)
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sourcesData.map((src, index) => (
            <div
              key={src.id}
              className="bg-white p-5 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="font-bold text-sm text-[#172B36]">
                  [{index + 1}] {src.title}
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-[#172B36] text-[#F4F0E6] shrink-0">
                  {src.sourceType}
                </span>
              </div>
              <p className="text-gray-700">
                <strong>Penulis / Lembaga:</strong> {src.authorOrInstitution} &bull;{' '}
                <strong>Tahun:</strong> {src.publicationYear} &bull;{' '}
                <strong>Tanggal Akses:</strong> {src.accessDate}
              </p>
              <div className="text-[#172B36] bg-[#F4F0E6] p-3 rounded-lg border border-[#B58B4D]/20 space-y-1">
                <div className="font-semibold">Klaim & Data Sejarah yang Didukung:</div>
                <ul className="list-disc list-inside space-y-0.5 text-gray-800">
                  {src.supports.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-gray-600">
                <span>
                  <strong>Catatan Reliabilitas:</strong> {src.reliabilityNotes}
                </span>
                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#426B60] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Periksa Sumber</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
