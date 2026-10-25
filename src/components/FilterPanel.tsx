import React from 'react';
import { Filter, X, Calendar, MapPin, Landmark, ShieldCheck, RotateCcw, Layers } from 'lucide-react';
import { FilterState, Region, SiteType, CertaintyLevel } from '../types/atlas';
import { SITE_TYPE_LABELS } from '../utils/historyLogic';

interface FilterPanelProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filteredKingdomsCount: number;
  filteredSitesCount: number;
  onYearRangeSelect?: () => void;
}

const ALL_REGIONS: Region[] = [
  'Sumatera',
  'Jawa',
  'Kalimantan',
  'Sulawesi',
  'Maluku & Nusa Tenggara',
];

const ALL_SITE_TYPES: SiteType[] = ['mosque', 'palace', 'tomb', 'fortress'];

const ERA_PRESETS: { label: string; range: [number, number] }[] = [
  { label: 'Semua Periode (840 – 1960 M)', range: [840, 1960] },
  { label: 'Abad XIII–XV (Pondasi Awal & Samudera Pasai)', range: [1200, 1500] },
  { label: 'Abad XVI (Kebangkitan Demak, Banten & Ternate)', range: [1500, 1600] },
  { label: 'Abad XVII (Puncak Kejayaan Mataram, Aceh & Gowa)', range: [1600, 1700] },
  { label: 'Abad XVIII–XX (Ketahanan & Integrasi NKRI)', range: [1700, 1960] },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filter,
  setFilter,
  isOpen,
  setIsOpen,
  filteredKingdomsCount,
  filteredSitesCount,
  onYearRangeSelect,
}) => {
  const toggleRegion = (region: Region) => {
    setFilter((prev) => {
      const exists = prev.regions.includes(region);
      return {
        ...prev,
        regions: exists ? prev.regions.filter((r) => r !== region) : [...prev.regions, region],
      };
    });
  };

  const toggleSiteType = (type: SiteType) => {
    setFilter((prev) => {
      const exists = prev.siteTypes.includes(type);
      return {
        ...prev,
        siteTypes: exists ? prev.siteTypes.filter((t) => t !== type) : [...prev.siteTypes, type],
      };
    });
  };

  const toggleCertainty = (certainty: CertaintyLevel) => {
    setFilter((prev) => {
      const exists = prev.certaintyLevels.includes(certainty);
      return {
        ...prev,
        certaintyLevels: exists
          ? prev.certaintyLevels.filter((c) => c !== certainty)
          : [...prev.certaintyLevels, certainty],
      };
    });
  };

  const resetAllFilters = () => {
    if (onYearRangeSelect) onYearRangeSelect();
    setFilter({
      regions: [],
      yearRange: [840, 1960],
      siteTypes: [],
      certaintyLevels: [],
      searchQuery: '',
      activeKingdomId: null,
      entityType: 'all',
    });
  };

  const activeFiltersCount =
    filter.regions.length +
    filter.siteTypes.length +
    filter.certaintyLevels.length +
    (filter.yearRange[0] !== 840 || filter.yearRange[1] !== 1960 ? 1 : 0) +
    (filter.entityType && filter.entityType !== 'all' ? 1 : 0) +
    (filter.searchQuery ? 1 : 0);

  return (
    <div className="relative">
      {/* Trigger Toggle Button (Floating when collapsed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#172B36] text-[#F4F0E6] shadow-xl border border-[#B58B4D]/40 hover:bg-[#1f3744] transition-all text-xs font-medium"
        >
          <Filter className="w-4 h-4 text-[#B58B4D]" />
          <span>Filter & Periode Sejarah</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#B58B4D] text-[#172B36] font-bold text-[10px] flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      )}

      {/* Main Filter Drawer */}
      {isOpen && (
        <div className="absolute top-4 left-4 z-20 w-[calc(100vw-32px)] sm:w-96 max-h-[85vh] bg-[#F4F0E6] text-[#172B36] rounded-xl shadow-2xl border-2 border-[#B58B4D]/60 flex flex-col overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="p-4 bg-[#172B36] text-[#F4F0E6] flex items-center justify-between border-b border-[#B58B4D]/30">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#B58B4D]" />
              <h3 className="font-serif text-sm font-semibold tracking-wide text-[#F4F0E6]">
                Filter Arsip Sejarah
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#B58B4D] hover:underline flex items-center gap-1"
                  title="Reset semua filter"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#F4F0E6]/60 hover:text-[#F4F0E6] p-1 rounded hover:bg-[#12222b]"
                aria-label="Tutup panel filter"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="px-4 py-2 bg-[#eae3d2] border-b border-[#B58B4D]/20 text-[11px] text-[#172B36]/80 flex justify-between items-center">
            <span>
              Ditemukan: <strong>{filteredKingdomsCount}</strong> Kerajaan,{' '}
              <strong>{filteredSitesCount}</strong> Situs
            </span>
            {activeFiltersCount > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-[#B58B4D]/20 text-[#172B36] font-medium text-[10px]">
                {activeFiltersCount} filter aktif
              </span>
            )}
          </div>

          {/* Scrollable Filter Options */}
          <div className="p-4 space-y-5 overflow-y-auto max-h-[calc(85vh-120px)] text-xs">
            {/* 0. Jenis Objek Peta */}
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#172B36] mb-2">
                <Layers className="w-3.5 h-3.5 text-[#B58B4D]" />
                <span>Jenis Objek Peta</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'all', label: 'Semua Objek' },
                  { id: 'kingdom', label: 'Kerajaan' },
                  { id: 'site', label: 'Situs Saja' },
                ].map((opt) => {
                  const currentType = filter.entityType || 'all';
                  const isSelected = currentType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        setFilter((prev) => ({
                          ...prev,
                          entityType: opt.id as 'all' | 'kingdom' | 'site',
                        }))
                      }
                      className={`px-2 py-1.5 rounded text-[11px] font-medium border transition-colors ${
                        isSelected
                          ? 'bg-[#172B36] text-[#F4F0E6] border-[#172B36]'
                          : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1. Era / Rentang Waktu */}
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#172B36] mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#B58B4D]" />
                <span>Rentang Tarikh (Periode Waktu)</span>
              </div>
              <div className="space-y-1.5 mb-3">
                {ERA_PRESETS.map((era) => {
                  const isSelected =
                    filter.yearRange[0] === era.range[0] && filter.yearRange[1] === era.range[1];
                  return (
                    <button
                      key={era.label}
                      onClick={() => {
                        if (onYearRangeSelect) onYearRangeSelect();
                        setFilter((prev) => ({ ...prev, yearRange: era.range }));
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] transition-colors border ${
                        isSelected
                          ? 'bg-[#172B36] text-[#F4F0E6] border-[#172B36] font-medium'
                          : 'bg-white/80 hover:bg-white text-[#172B36] border-[#B58B4D]/30'
                      }`}
                    >
                      {era.label}
                    </button>
                  );
                })}
              </div>

              {/* Year Slider */}
              <div className="bg-white/90 p-2.5 rounded-lg border border-[#B58B4D]/30">
                <div className="flex justify-between items-center text-[11px] font-semibold text-[#172B36] mb-2">
                  <span>Tahun {filter.yearRange[0]} M</span>
                  <span className="text-[#B58B4D]">s.d.</span>
                  <span>Tahun {filter.yearRange[1]} M</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1">Mulai Tahun</label>
                    <input
                      type="range"
                      min="840"
                      max="1900"
                      step="10"
                      value={filter.yearRange[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= filter.yearRange[1]) {
                          if (onYearRangeSelect) onYearRangeSelect();
                          setFilter((prev) => ({ ...prev, yearRange: [val, prev.yearRange[1]] }));
                        }
                      }}
                      className="w-full accent-[#B58B4D] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1">Hingga Tahun</label>
                    <input
                      type="range"
                      min="1200"
                      max="1960"
                      step="10"
                      value={filter.yearRange[1]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= filter.yearRange[0]) {
                          if (onYearRangeSelect) onYearRangeSelect();
                          setFilter((prev) => ({ ...prev, yearRange: [prev.yearRange[0], val] }));
                        }
                      }}
                      className="w-full accent-[#B58B4D] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Wilayah Kepulauan */}
            <div>
              <div className="flex items-center justify-between font-semibold text-[#172B36] mb-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#426B60]" />
                  <span>Wilayah Kepulauan Nusantara</span>
                </div>
                {filter.regions.length > 0 && (
                  <button
                    onClick={() => setFilter((prev) => ({ ...prev, regions: [] }))}
                    className="text-[10px] text-[#B58B4D] hover:underline"
                  >
                    Pilih Semua
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_REGIONS.map((region) => {
                  const isChecked = filter.regions.includes(region);
                  return (
                    <button
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                        isChecked
                          ? 'bg-[#426B60] text-white border-[#426B60]'
                          : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'
                      }`}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Jenis Situs Peninggalan */}
            <div>
              <div className="flex items-center justify-between font-semibold text-[#172B36] mb-2">
                <div className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-[#B58B4D]" />
                  <span>Jenis Situs Peninggalan</span>
                </div>
                {filter.siteTypes.length > 0 && (
                  <button
                    onClick={() => setFilter((prev) => ({ ...prev, siteTypes: [] }))}
                    className="text-[10px] text-[#B58B4D] hover:underline"
                  >
                    Pilih Semua
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {ALL_SITE_TYPES.map((type) => {
                  const isChecked = filter.siteTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleSiteType(type)}
                      className={`text-left px-2 py-1.5 rounded text-[11px] border transition-colors flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#B58B4D] text-[#172B36] font-semibold border-[#B58B4D]'
                          : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'
                      }`}
                    >
                      <span className="truncate">{SITE_TYPE_LABELS[type]}</span>
                      {isChecked && <span className="text-[10px] ml-1">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Status Verifikasi Historiografi (3 Tingkatan) */}
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#172B36] mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#172B36]" />
                <span>Status Verifikasi Sumber Sejarah</span>
              </div>
              <div className="space-y-1.5">
                <button
                  onClick={() => toggleCertainty('verified')}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] border flex items-center justify-between ${
                    filter.certaintyLevels.includes('verified')
                      ? 'bg-emerald-900 text-emerald-100 border-emerald-700 font-medium'
                      : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Terverifikasi (Epigrafi / Sumber Primer)</span>
                  </div>
                  {filter.certaintyLevels.includes('verified') && <span>✓</span>}
                </button>

                <button
                  onClick={() => toggleCertainty('estimated')}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] border flex items-center justify-between ${
                    filter.certaintyLevels.includes('estimated')
                      ? 'bg-amber-900 text-amber-100 border-amber-700 font-medium'
                      : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Perkiraan (Rekonstruksi Naskah & Kronik)</span>
                  </div>
                  {filter.certaintyLevels.includes('estimated') && <span>✓</span>}
                </button>

                <button
                  onClick={() => toggleCertainty('unverified')}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] border flex items-center justify-between ${
                    filter.certaintyLevels.includes('unverified')
                      ? 'bg-slate-800 text-slate-100 border-slate-600 font-medium'
                      : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Belum terverifikasi (Klaim Tradisi Lokal)</span>
                  </div>
                  {filter.certaintyLevels.includes('unverified') && <span>✓</span>}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-3 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex justify-between items-center text-xs">
            <button
              onClick={resetAllFilters}
              className="text-[#172B36]/80 hover:text-[#172B36] underline text-[11px]"
            >
              Hapus Semua Filter
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 bg-[#172B36] text-[#F4F0E6] rounded font-medium hover:bg-[#12222b] transition-colors"
            >
              Tutup & Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
