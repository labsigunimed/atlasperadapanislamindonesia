import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Crown,
  Landmark,
  BookOpen,
  Map,
  ShieldCheck,
  History,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Anchor,
  Coins,
  ScrollText,
} from 'lucide-react';
import {
  Kingdom,
  Ruler,
  HeritageSite,
  TerritoryFeature,
  TimelineEvent,
  HistoricalSource,
} from '../types/atlas';
import { SITE_TYPE_LABELS } from '../utils/historyLogic';

interface KingdomDetailModalProps {
  kingdom: Kingdom | null;
  onClose: () => void;
  rulers: Ruler[];
  sites: HeritageSite[];
  territories: TerritoryFeature[];
  events: TimelineEvent[];
  sources: HistoricalSource[];
  onSelectSiteOnMap: (site: HeritageSite) => void;
}

type TabKey = 'overview' | 'rulers' | 'events' | 'territory' | 'sites' | 'sources';

export const KingdomDetailModal: React.FC<KingdomDetailModalProps> = ({
  kingdom,
  onClose,
  rulers,
  sites,
  territories,
  events,
  sources,
  onSelectSiteOnMap,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  if (!kingdom) return null;

  const kingdomRulers = rulers.filter((r) => r.kingdom_id === kingdom.id);
  const kingdomSites = sites.filter((s) => s.kingdom_ids.includes(kingdom.id));
  const kingdomTerritories = territories.filter((t) => t.properties.kingdom_id === kingdom.id);
  const kingdomEvents = events.filter((e) => e.kingdom_ids.includes(kingdom.id));
  const kingdomSources = sources.filter((s) => kingdom.source_ids.includes(s.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-kingdom-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-[#F4F0E6] text-[#172B36] w-full max-w-4xl rounded-2xl shadow-2xl border-2 border-[#B58B4D] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* HERO SECTION */}
        <div className="relative bg-[#172B36] text-[#F4F0E6] p-6 sm:p-8 border-b-2 border-[#B58B4D]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B58B4D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F4F0E6]/70 hover:text-white bg-[#12222b] hover:bg-black/40 p-2 rounded-full transition-colors"
            aria-label="Tutup halaman detail"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-2xl">👑</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B58B4D]/30 text-[#B58B4D] border border-[#B58B4D]/50 uppercase tracking-wider">
                  {kingdom.region} &bull; {kingdom.polity_type}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${
                    kingdom.founded_certainty === 'verified'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600/40'
                      : kingdom.founded_certainty === 'estimated'
                      ? 'bg-amber-950 text-amber-300 border-amber-600/40'
                      : 'bg-slate-800 text-slate-200 border-slate-500/40'
                  }`}
                >
                  {kingdom.founded_certainty === 'unverified' ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  )}
                  Status: {kingdom.verificationStatus}
                </span>
              </div>

              <h1
                id="modal-kingdom-title"
                className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F0E6]"
              >
                {kingdom.name}
              </h1>

              {kingdom.alternate_names.length > 0 && (
                <p className="text-sm text-[#B58B4D] italic mt-1">
                  Nama alternatif & kronik: {kingdom.alternate_names.join(', ')}
                </p>
              )}
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-row md:flex-col gap-2 shrink-0 text-xs">
              <div className="bg-[#12222b] px-3 py-2 rounded-lg border border-[#B58B4D]/30">
                <span className="text-[10px] text-[#B58B4D] block uppercase">Periode Kedaulatan</span>
                <span className="font-bold text-xs sm:text-sm text-[#F4F0E6]">
                  {kingdom.founded_display} &mdash; {kingdom.ended_year || 'Masa kini'}
                </span>
              </div>
              <div className="bg-[#12222b] px-3 py-2 rounded-lg border border-[#B58B4D]/30">
                <span className="text-[10px] text-[#B58B4D] block uppercase">Pusat Pemerintahan</span>
                <span className="font-semibold text-[#F4F0E6] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#426B60] shrink-0" />
                  <span>{kingdom.capital}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-[#eae3d2] px-4 sm:px-6 border-b border-[#B58B4D]/30 flex space-x-1 sm:space-x-3 overflow-x-auto no-scrollbar text-xs sm:text-sm font-medium shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Ikhtisar & Konteks Sejarah</span>
          </button>

          <button
            onClick={() => setActiveTab('rulers')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'rulers'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Crown className="w-4 h-4 text-[#B58B4D]" />
            <span>Daftar Sultan ({kingdomRulers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('territory')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'territory'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Wilayah Kekuasaan</span>
          </button>

          <button
            onClick={() => setActiveTab('sites')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sites'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Landmark className="w-4 h-4 text-[#426B60]" />
            <span>Situs Terkait ({kingdomSites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#426B60]" />
            <span>Kronologi ({kingdomEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#B58B4D]" />
            <span>Sumber Referensi ({kingdomSources.length})</span>
          </button>
        </div>

        {/* TAB CONTENTS (Scrollable) */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-220px)] text-sm space-y-6">
          {/* TAB 1: OVERVIEW & HISTORICAL CONTEXT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary & Political History */}
              <div className="bg-white/90 p-5 rounded-xl border border-[#B58B4D]/30 space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#172B36]">
                  Ringkasan & Perkembangan Politik
                </h3>
                <p className="text-gray-800 leading-relaxed text-sm">{kingdom.summary}</p>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm border-t border-gray-100 pt-3">
                  {kingdom.political_history}
                </p>
              </div>

              {/* Chronological Milestones Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-4 rounded-xl border border-emerald-600/30">
                  <div className="text-[10px] uppercase font-bold text-emerald-800 mb-1">
                    1. Periode Berdirinya
                  </div>
                  <div className="font-bold text-sm text-[#172B36]">{kingdom.founded_display}</div>
                  <div className="text-[11px] text-gray-600 mt-1">
                    Status Bukti: <strong>{kingdom.verificationStatus}</strong>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#B58B4D]/40">
                  <div className="text-[10px] uppercase font-bold text-[#8e6d38] mb-1">
                    2. Masa Kejayaan
                  </div>
                  <div className="font-bold text-sm text-[#172B36]">
                    {kingdom.golden_age_display}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-600/30">
                  <div className="text-[10px] uppercase font-bold text-amber-800 mb-1">
                    3. Akhir Kekuasaan Politik
                  </div>
                  <div className="font-bold text-sm text-[#172B36]">{kingdom.ended_display}</div>
                </div>
              </div>

              {/* 4 Pillars of Historical Context: Politics, Economy, Maritime, Culture & Religion */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#172B36]">
                  Konteks Politik, Ekonomi, Maritim & Budaya-Keagamaan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white/85 p-4 rounded-xl border border-[#B58B4D]/30 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-[#172B36] text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#B58B4D]" />
                      <span>Tatanan Politik & Diplomasi</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {kingdom.historicalContext.politics}
                    </p>
                  </div>

                  <div className="bg-white/85 p-4 rounded-xl border border-[#B58B4D]/30 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-[#172B36] text-sm">
                      <Coins className="w-4 h-4 text-[#B58B4D]" />
                      <span>Jaringan Ekonomi & Komoditas</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {kingdom.historicalContext.economy}
                    </p>
                  </div>

                  <div className="bg-white/85 p-4 rounded-xl border border-[#B58B4D]/30 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-[#172B36] text-sm">
                      <Anchor className="w-4 h-4 text-[#426B60]" />
                      <span>Jalur Pelayaran & Maritim</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {kingdom.historicalContext.maritime}
                    </p>
                  </div>

                  <div className="bg-white/85 p-4 rounded-xl border border-[#B58B4D]/30 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-[#172B36] text-sm">
                      <ScrollText className="w-4 h-4 text-[#426B60]" />
                      <span>Warisan Budaya & Keagamaan</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {kingdom.historicalContext.cultureAndReligion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Disputed Claims / Historiographical Notes (if any) */}
              {kingdom.disputedClaims && kingdom.disputedClaims.length > 0 && (
                <div className="bg-amber-50/90 p-5 rounded-xl border-2 border-amber-300 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Catatan Historiografi: Perbedaan Pendapat Sumber</span>
                  </div>
                  {kingdom.disputedClaims.map((dc, idx) => (
                    <div
                      key={idx}
                      className="bg-white/90 p-3.5 rounded-lg border border-amber-200 space-y-2 text-xs"
                    >
                      <div className="font-bold text-[#172B36]">{dc.claimTopic}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-2.5 rounded bg-amber-50/70 border border-amber-200/60">
                          <span className="font-bold text-amber-900 block mb-0.5">
                            Versi Tradisi / Naskah Lokal:
                          </span>
                          <span className="text-gray-700">{dc.versionA}</span>
                        </div>
                        <div className="p-2.5 rounded bg-emerald-50/70 border border-emerald-200/60">
                          <span className="font-bold text-emerald-900 block mb-0.5">
                            Kajian Epigrafi & Akademik Modern:
                          </span>
                          <span className="text-gray-700">{dc.versionB}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Decline & Current Status */}
              <div className="bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/40 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-[#172B36]">Faktor Kemunduran / Transisi Politik: </span>
                  <span className="text-gray-800">{kingdom.decline_factors}</span>
                </div>
                <div>
                  <span className="font-bold text-[#172B36]">Status Kedaulatan & Pelestarian: </span>
                  <span className="text-gray-800">{kingdom.status_summary}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RULERS / SULTANS */}
          {activeTab === 'rulers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-[#172B36]">
                  Daftar Sultan & Penguasa ({kingdomRulers.length})
                </h3>
                <span className="text-xs text-gray-500">
                  Disusun berdasarkan bukti epigrafi, arsip, dan naskah sejarah
                </span>
              </div>

              {kingdomRulers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kingdomRulers.map((ruler) => (
                    <div
                      key={ruler.id}
                      className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-2.5 hover:border-[#B58B4D] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#172B36] text-[#B58B4D]">
                              #{ruler.order_index}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                ruler.certainty === 'verified'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ruler.certainty === 'estimated'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-200 text-slate-800'
                              }`}
                            >
                              {ruler.verificationStatus}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-[#172B36] mt-1">
                            {ruler.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#8e6d38] block mt-0.5">
                            Masa Pemerintahan: {ruler.reign_display}
                          </span>
                        </div>
                        <Crown className="w-5 h-5 text-[#B58B4D] shrink-0" />
                      </div>

                      <div className="text-xs text-gray-700 bg-[#F4F0E6] p-2 rounded">
                        <span className="font-semibold text-[#172B36]">Gelar: </span>
                        {ruler.title}
                      </div>

                      <p className="text-xs text-gray-700 leading-relaxed">
                        {ruler.highlight_achievement}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40">
                  <Crown className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Daftar sultan sedang dalam tahap verifikasi transliterasi naskah lokal.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TERRITORY */}
          {activeTab === 'territory' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#172B36]">
                Wilayah Kekuasaan & Rekonstruksi Kartografi
              </h3>

              <div className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 space-y-2">
                <h4 className="font-semibold text-sm text-[#172B36]">
                  Deskripsi Cakupan Wilayah & Jaringan Mandala
                </h4>
                <p className="text-xs text-gray-800 leading-relaxed">
                  {kingdom.territoryDescription}
                </p>
              </div>

              {kingdomTerritories.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#172B36]">
                    Lapisan Poligon Zona Pengaruh ({kingdomTerritories.length} Tersedia)
                  </h4>
                  {kingdomTerritories.map((t) => (
                    <div
                      key={t.properties.id}
                      className="bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/40 space-y-2 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-sm text-[#172B36]">
                          {t.properties.period_label}
                        </span>
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-amber-900 text-amber-100">
                          Status: {t.properties.verificationStatus || 'Perkiraan'}
                        </span>
                      </div>
                      <div className="text-gray-700">
                        <span className="font-semibold">Peta Referensi Akademik: </span>
                        {t.properties.historicalMapSource} ({t.properties.cartographer})
                      </div>
                      <div className="text-gray-700 bg-white/80 p-2.5 rounded border border-[#B58B4D]/20">
                        <span className="font-semibold text-[#172B36]">Metode Rekonstruksi: </span>
                        {t.properties.reconstruction_method}
                      </div>
                      {t.properties.uncertaintyNote && (
                        <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                          <strong>Catatan Ketidakpastian Spasial:</strong>{' '}
                          {t.properties.uncertaintyNote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1.5">
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Poligon Wilayah Tidak Ditampilkan (territoryGeometry: null)</span>
                  </div>
                  <p className="leading-relaxed">
                    Untuk menjaga kejujuran ilmiah dan integritas kartografi, aplikasi ini{' '}
                    <strong>tidak menggambar poligon batas wilayah sembarangan</strong> untuk{' '}
                    {kingdom.name} karena belum tersedianya peta batas historis primer yang dapat
                    direferensikan secara presisi. Cakupan wilayah dijelaskan secara naratif di atas
                    serta direpresentasikan melalui titik pusat pemerintahan dan situs cagar budaya
                    terkait.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: HERITAGE SITES */}
          {activeTab === 'sites' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#172B36]">
                  Situs Peninggalan Sejarah Terkait ({kingdomSites.length})
                </h3>
                <span className="text-xs text-gray-500">
                  Masjid kuno, keraton, makam, dan benteng pertahanan
                </span>
              </div>

              {kingdomSites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kingdomSites.map((site) => (
                    <div
                      key={site.id}
                      className="bg-white rounded-xl border border-[#B58B4D]/30 p-4 shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6]">
                            {SITE_TYPE_LABELS[site.type] || site.type}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {site.verificationStatus}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#172B36]">
                          {site.name}
                        </h4>
                        <p className="text-[11px] text-[#426B60] font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{site.modern_location}</span>
                        </p>
                        <p className="text-[11px] text-[#8e6d38] font-medium">
                          Era Pembangunan: {site.built_year_display}
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed pt-1">
                          {site.description}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 truncate max-w-[60%]">
                          {site.condition_status}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectSiteOnMap(site);
                          }}
                          className="text-xs font-semibold text-[#B58B4D] hover:underline flex items-center gap-1"
                        >
                          <span>Fokus di Peta</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40">
                  <Landmark className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Belum ada rekaman situs fisik terverifikasi untuk entitas ini.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#172B36]">
                Kronologi Peristiwa Penting ({kingdomEvents.length})
              </h3>

              {kingdomEvents.length > 0 ? (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#B58B4D]/40">
                  {kingdomEvents.map((event) => (
                    <div key={event.id} className="relative">
                      <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#B58B4D] border-2 border-white shadow" />
                      <div className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6]">
                            {event.year_display}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#eae3d2] text-[#172B36]">
                            {event.verificationStatus}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#172B36]">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40">
                  <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Belum ada peristiwa khusus yang diindeks secara kronologis dalam dataset ini.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SOURCES */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#172B36]">
                Rujukan & Sumber Sejarah Terverifikasi
              </h3>
              <p className="text-xs text-gray-600">
                Setiap klaim kronologi, urutan sultan, dan lokasi situs pada {kingdom.name} merujuk
                pada sumber akademik, epigrafi, dan basis data resmi berikut:
              </p>

              {kingdomSources.length > 0 ? (
                <div className="space-y-3">
                  {kingdomSources.map((source) => (
                    <div
                      key={source.id}
                      className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-[#172B36]">{source.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6] shrink-0">
                          {source.sourceType}
                        </span>
                      </div>
                      <p className="text-gray-700">
                        <strong>Penulis / Institusi:</strong> {source.authorOrInstitution} (
                        {source.publicationYear})
                      </p>
                      <div className="text-[#172B36] bg-[#eae3d2] p-2.5 rounded border border-[#B58B4D]/20 space-y-1">
                        <div className="font-semibold">Klaim Sejarah yang Didukung:</div>
                        <ul className="list-disc list-inside space-y-0.5 text-gray-800">
                          {source.supports.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-gray-600">
                        <span>
                          <strong>Reliabilitas:</strong> {source.reliabilityNotes}
                        </span>
                        {source.url && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#426B60] font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Tautan Referensi</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">
                  Rujukan tersimpan pada indeks bibliografi utama.
                </p>
              )}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex justify-between items-center text-xs shrink-0">
          <span className="text-gray-600 text-[11px]">
            Data Arsip Atlas Islam Nusantara &bull; Koordinat: {kingdom.latitude.toFixed(4)},{' '}
            {kingdom.longitude.toFixed(4)}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#172B36] text-[#F4F0E6] rounded-lg font-medium hover:bg-[#12222b] transition-colors"
          >
            Tutup Halaman
          </button>
        </div>
      </div>
    </div>
  );
};
