import React from 'react';
import { Compass, BookOpen, Layers, Clock, Landmark, Search, X, RotateCcw } from 'lucide-react';
import { FilterState } from '../types/atlas';

interface HeaderProps {
  activeTab: 'map' | 'timeline' | 'sites' | 'sources';
  setActiveTab: (tab: 'map' | 'timeline' | 'sites' | 'sources') => void;
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetMap: () => void;
  totalKingdoms: number;
  totalSites: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  filter,
  setFilter,
  onResetMap,
  totalKingdoms,
  totalSites,
}) => {
  return (
    <header className="bg-[#172B36] text-[#F4F0E6] border-b border-[#B58B4D]/30 sticky top-0 z-30 shadow-md">
      {/* Top Banner with Project Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setActiveTab('map')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#B58B4D] to-[#8e6d38] flex items-center justify-center shadow-lg border border-[#F4F0E6]/20">
              <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-[#172B36]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-regal text-base sm:text-xl font-bold tracking-wider text-[#F4F0E6]">
                  ATLAS ISLAM NUSANTARA
                </span>
                <span className="hidden md:inline-block text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[#426B60] text-emerald-100 font-semibold border border-emerald-500/30">
                  WebGIS Sejarah
                </span>
              </div>
              <p className="text-xs text-[#B58B4D] tracking-wide font-medium hidden sm:block">
                Rekonstruksi Spasial Kerajaan, Kesultanan & Peninggalan Peradaban Indonesia
              </p>
            </div>
          </div>

          {/* Global Search Input */}
          <div className="flex-1 max-w-md hidden md:block relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#B58B4D]">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Cari kerajaan, sultan, situs kuno, daerah..."
                value={filter.searchQuery}
                onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-[#12222b] text-[#F4F0E6] placeholder-[#F4F0E6]/40 rounded-md border border-[#B58B4D]/30 focus:outline-none focus:border-[#B58B4D] transition-colors"
                aria-label="Cari kerajaan atau situs"
              />
              {filter.searchQuery && (
                <button
                  onClick={() => setFilter((prev) => ({ ...prev, searchQuery: '' }))}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#F4F0E6]/50 hover:text-[#F4F0E6]"
                  title="Bersihkan pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats & Reset CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 text-xs border-r border-[#B58B4D]/20 pr-4">
              <div className="text-right">
                <div className="text-[10px] text-[#B58B4D] uppercase tracking-wider font-semibold">Tersaring</div>
                <div className="font-semibold text-sm text-[#F4F0E6]">
                  {totalKingdoms} <span className="text-[11px] font-normal text-[#F4F0E6]/60">Kerajaan</span> &bull; {totalSites} <span className="text-[11px] font-normal text-[#F4F0E6]/60">Situs</span>
                </div>
              </div>
            </div>

            <button
              onClick={onResetMap}
              className="px-3 py-1.5 rounded text-xs font-medium bg-[#B58B4D]/15 hover:bg-[#B58B4D]/30 text-[#B58B4D] border border-[#B58B4D]/40 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Kembalikan sudut pandang ke seluruh Indonesia"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Peta Nusantara</span>
            </button>
          </div>
        </div>

        {/* Search on mobile */}
        <div className="pb-2.5 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#B58B4D]" />
            <input
              type="text"
              placeholder="Cari kerajaan, sultan, situs..."
              value={filter.searchQuery}
              onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#12222b] text-[#F4F0E6] placeholder-[#F4F0E6]/40 rounded-md border border-[#B58B4D]/30 focus:outline-none focus:border-[#B58B4D]"
            />
            {filter.searchQuery && (
              <button
                onClick={() => setFilter((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute right-2.5 top-2 text-[#F4F0E6]/50"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar border-t border-[#B58B4D]/20 pt-1 pb-1 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'map'
                ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold'
                : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Eksplorasi Peta WebGIS</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'timeline'
                ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold'
                : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Garis Waktu (Timeline)</span>
          </button>

          <button
            onClick={() => setActiveTab('sites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'sites'
                ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold'
                : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Katalog Situs Peninggalan</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'sources'
                ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold'
                : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Sumber & Metodologi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
