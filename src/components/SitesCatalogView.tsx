import React, { useState } from 'react';
import { Landmark, MapPin, LayoutGrid, List, Search, ShieldCheck, Calendar } from 'lucide-react';
import { HeritageSite, Kingdom, SiteType } from '../types/atlas';
import { SITE_TYPE_LABELS } from '../utils/historyLogic';

interface SitesCatalogViewProps {
  sites: HeritageSite[];
  kingdoms: Kingdom[];
  onSelectSiteOnMap: (site: HeritageSite) => void;
  onOpenSiteDetail: (site: HeritageSite) => void;
}

const ALL_SITE_TYPES: SiteType[] = ['mosque', 'palace', 'tomb', 'fortress'];

const SITE_TYPE_EMOJIS: Record<string, string> = {
  mosque: '🕌',
  palace: '🏛️',
  tomb: '⚱️',
  fortress: '🏰',
  complex: '🏛️',
};

export const SitesCatalogView: React.FC<SitesCatalogViewProps> = ({
  sites,
  kingdoms,
  onSelectSiteOnMap,
  onOpenSiteDetail,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [query, setQuery] = useState('');

  // Unique regions
  const regions = Array.from(new Set(sites.map((s) => s.region))).sort();

  // Filtered sites
  const filteredSites = sites.filter((site) => {
    if (selectedCategory !== 'all' && site.type !== selectedCategory) return false;
    if (selectedRegion !== 'all' && site.region !== selectedRegion) return false;
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      const matchName = site.name.toLowerCase().includes(q);
      const matchLoc = site.modern_location.toLowerCase().includes(q);
      const matchDesc = site.description.toLowerCase().includes(q);
      const matchArch = site.architectural_features.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchDesc && !matchArch) return false;
    }
    return true;
  });

  const getKingdomNames = (kingdomIds: string[]) => {
    return kingdoms
      .filter((k) => kingdomIds.includes(k.id))
      .map((k) => k.name)
      .join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B58B4D]/30 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#426B60]/20 text-[#426B60] border border-[#426B60]/30">
            Inventaris Warisan Fisik & Cagar Budaya
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B36] mt-2">
            Katalog Situs Peninggalan Islam Nusantara
          </h2>
          <p className="text-sm text-gray-700 mt-1 max-w-2xl">
            Menelusuri peninggalan arsitektur bernilai sejarah tinggi seperti masjid kuno beratap
            tumpang, keraton kesultanan, kompleks makam pendiri dinasti, dan benteng pertahanan
            maritim.
          </p>
        </div>

        {/* View Switcher (Grid vs List) */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white p-1 rounded-lg border border-[#B58B4D]/30 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors flex items-center gap-1.5 text-xs font-medium ${
              viewMode === 'grid'
                ? 'bg-[#172B36] text-[#F4F0E6]'
                : 'text-gray-600 hover:text-black'
            }`}
            title="Tampilan Kartu (Grid)"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors flex items-center gap-1.5 text-xs font-medium ${
              viewMode === 'list'
                ? 'bg-[#172B36] text-[#F4F0E6]'
                : 'text-gray-600 hover:text-black'
            }`}
            title="Tampilan Daftar (List)"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Daftar</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
              selectedCategory === 'all'
                ? 'bg-[#172B36] text-[#F4F0E6]'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Semua Kategori ({sites.length})
          </button>
          {ALL_SITE_TYPES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-[#426B60] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {SITE_TYPE_EMOJIS[cat]} {SITE_TYPE_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Search & Region Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            aria-label="Filter wilayah situs"
            className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none"
          >
            <option value="all">Semua Wilayah Kepulauan</option>
            {regions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>

          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Cari situs, kota, arsitektur..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-gray-800 focus:outline-none focus:border-[#B58B4D]"
            />
          </div>
        </div>
      </div>

      {/* SITES DISPLAY */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-2xl border border-[#B58B4D]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              {/* Archival Architectural Card Banner */}
              <div className="relative p-4 bg-gradient-to-br from-[#172B36] to-[#233f4d] text-[#F4F0E6] border-b border-[#B58B4D]/40">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#426B60] text-white border border-emerald-400/30 flex items-center gap-1">
                    <span>{SITE_TYPE_EMOJIS[site.type] || '🕌'}</span>
                    <span>{SITE_TYPE_LABELS[site.type] || site.type}</span>
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {site.verificationStatus}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#F4F0E6] group-hover:text-[#B58B4D] transition-colors leading-snug">
                  {site.name}
                </h3>
                <div className="text-[11px] text-[#B58B4D] font-medium flex items-center gap-1 mt-1.5">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>{site.built_year_display}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-xs text-[#426B60] font-medium flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{site.modern_location}</span>
                  </div>
                  {site.kingdom_ids.length > 0 && (
                    <div className="text-[11px] text-gray-600 bg-[#F4F0E6] px-2.5 py-1 rounded border border-[#B58B4D]/20">
                      Kesultanan: <strong>{getKingdomNames(site.kingdom_ids)}</strong>
                    </div>
                  )}
                  <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed">
                    {site.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectSiteOnMap(site)}
                    className="text-xs font-semibold text-[#426B60] hover:underline flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Lihat di Peta</span>
                  </button>

                  <button
                    onClick={() => onOpenSiteDetail(site)}
                    className="px-3 py-1.5 rounded-lg bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] text-xs font-medium transition-colors"
                  >
                    Rincian Situs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-[#B58B4D]/30 shadow-sm overflow-hidden divide-y divide-gray-100">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F4F0E6]/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#172B36] text-[#B58B4D] flex items-center justify-center text-2xl shrink-0 border border-[#B58B4D]/40">
                  {SITE_TYPE_EMOJIS[site.type] || '🕌'}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#426B60] text-white">
                      {SITE_TYPE_LABELS[site.type] || site.type}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {site.verificationStatus}
                    </span>
                    <span className="text-[10px] text-gray-500">{site.condition_status}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#172B36]">
                    {site.name}
                  </h3>
                  <div className="text-xs text-gray-600 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#426B60]" />
                      {site.modern_location}
                    </span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-[#8e6d38] font-medium">
                      Era: {site.built_year_display}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onSelectSiteOnMap(site)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#426B60] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Lihat di Peta</span>
                </button>
                <button
                  onClick={() => onOpenSiteDetail(site)}
                  className="px-3.5 py-1.5 text-xs font-medium bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] rounded-lg transition-colors"
                >
                  Rincian
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredSites.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-[#B58B4D]/40 space-y-2">
          <Landmark className="w-10 h-10 text-gray-400 mx-auto" />
          <h4 className="font-serif text-lg font-semibold text-gray-800">
            Tidak Ada Situs yang Sesuai dengan Kriteria
          </h4>
          <p className="text-xs text-gray-500">
            Coba pilih kategori &ldquo;Semua Kategori&rdquo; atau bersihkan kolom pencarian.
          </p>
        </div>
      )}
    </div>
  );
};
