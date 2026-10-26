/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { MapGIS } from './components/MapGIS';
import { FilterPanel } from './components/FilterPanel';
import {
   MapTimeSeriesBar,
  MIN_YEAR,
  MAX_YEAR,
  TimeSeriesDisplayMode,
} from './components/MapTimeSeriesBar';
import { KingdomSummaryDrawer } from './components/KingdomSummaryDrawer';
import { KingdomDetailModal } from './components/KingdomDetailModal';
import { SiteDetailModal } from './components/SiteDetailModal';
import { TimelineView } from './components/TimelineView';
import { SitesCatalogView } from './components/SitesCatalogView';
import { SourcesAndAboutView } from './components/SourcesAndAboutView';

import { kingdomsData } from './data/kingdomsData';
import { sitesData } from './data/sitesData';
import { territoriesData } from './data/territoriesData';
import { rulersData } from './data/rulersData';
import { eventsData } from './data/eventsData';
import { sourcesData } from './data/sourcesData';

import { Kingdom, HeritageSite, FilterState } from './types/atlas';
import {
  filterKingdoms,
  filterSites,
  filterTerritories,
  getAtlasStats,
  isKingdomPresentByYear,
  isKingdomFoundedInYear,
  KINGDOM_FOUNDING_YEARS,
} from './utils/historyLogic';
import { Compass, BookOpen, ShieldCheck } from 'lucide-react';

type TabView = 'map' | 'timeline' | 'sites' | 'sources';

const HASH_TO_TAB: Record<string, TabView> = {
  '#peta': 'map',
  '#map': 'map',
  '#timeline': 'timeline',
  '#situs': 'sites',
  '#sites': 'sites',
  '#sumber': 'sources',
  '#sources': 'sources',
};

const TAB_TO_HASH: Record<TabView, string> = {
  map: '#peta',
  timeline: '#timeline',
  sites: '#situs',
  sources: '#sumber',
};

export default function App() {
  const [activeTab, setActiveTabState] = useState<TabView>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return HASH_TO_TAB[window.location.hash.toLowerCase()] || 'map';
    }
    return 'map';
  });

  const setActiveTab = (tab: TabView) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', TAB_TO_HASH[tab]);
    }
  };

  useEffect(() => {
    const onHashChange = () => {
      const mapped = HASH_TO_TAB[window.location.hash.toLowerCase()];
      if (mapped) {
        setActiveTabState(mapped);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    regions: [],
    yearRange: [MIN_YEAR, MAX_YEAR],
    siteTypes: [],
    certaintyLevels: [],
    searchQuery: '',
    activeKingdomId: null,
    entityType: 'all',
  });

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Interactive Time-Series & Auto-Play State on Map (synchronized with Kingdom Founding Years)
  const [isTimeSeriesActive, setIsTimeSeriesActive] = useState<boolean>(true);
  const [currentYear, setCurrentYear] = useState<number>(KINGDOM_FOUNDING_YEARS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<1 | 2 | 4>(1);
  const [timeSeriesDisplayMode, setTimeSeriesDisplayMode] =
    useState<TimeSeriesDisplayMode>('cumulative');
  const [autoFollowNewKingdom, setAutoFollowNewKingdom] = useState<boolean>(false);

  // Selected Entities
  const [selectedKingdom, setSelectedKingdom] = useState<Kingdom | null>(null);
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [deepDiveKingdom, setDeepDiveKingdom] = useState<Kingdom | null>(null);

  // Map Navigation Focus
  const [focusLocation, setFocusLocation] = useState<{
    lat: number;
    lng: number;
    zoom?: number;
  } | null>(null);

  // Base Filtered Kingdoms (filtered by region, certainty, search, and yearRange)
  const baseFilteredKingdoms = useMemo(() => {
    return filterKingdoms(kingdomsData, filter);
  }, [filter]);

  // Final Kingdoms shown on Map (synchronized with Kingdom Founding Year / Tahun Hadirnya Kerajaan)
  const filteredKingdoms = useMemo(() => {
    if (!isTimeSeriesActive) return baseFilteredKingdoms;
    return baseFilteredKingdoms.filter((k) =>
      timeSeriesDisplayMode === 'exact'
        ? isKingdomFoundedInYear(k, currentYear)
        : isKingdomPresentByYear(k, currentYear)
    );
  }, [baseFilteredKingdoms, isTimeSeriesActive, currentYear, timeSeriesDisplayMode]);

  // Active Kingdom IDs for synchronizing sites and territories with the kingdoms that have appeared
  const activeKingdomIdsForTime = useMemo(() => {
    const kds = filterKingdoms(kingdomsData, { ...filter, entityType: 'all' });
    const timeFiltered = isTimeSeriesActive
      ? kds.filter((k) =>
          timeSeriesDisplayMode === 'exact'
            ? isKingdomFoundedInYear(k, currentYear)
            : isKingdomPresentByYear(k, currentYear)
        )
      : kds;
    return new Set(timeFiltered.map((k) => k.id));
  }, [filter, isTimeSeriesActive, currentYear, timeSeriesDisplayMode]);

  // Final Heritage Sites shown on Map (appear together with their parent kingdom's founding year)
  const filteredSites = useMemo(() => {
    return filterSites(sitesData, filter, activeKingdomIdsForTime, null);
  }, [filter, activeKingdomIdsForTime]);

  // Final Territory Polygons shown on Map (appear together with their parent kingdom's founding year)
  const filteredTerritories = useMemo(() => {
    return filterTerritories(territoriesData, activeKingdomIdsForTime, filter, null);
  }, [activeKingdomIdsForTime, filter]);

  // Automatically close selectedKingdom drawer if Time-Series moves to a year before that kingdom's founding year
  useEffect(() => {
    if (isTimeSeriesActive && selectedKingdom) {
      const stillVisible =
        timeSeriesDisplayMode === 'exact'
          ? isKingdomFoundedInYear(selectedKingdom, currentYear)
          : isKingdomPresentByYear(selectedKingdom, currentYear);
      if (!stillVisible) {
        setSelectedKingdom(null);
      }
    }
  }, [isTimeSeriesActive, currentYear, selectedKingdom, timeSeriesDisplayMode]);

  // Overall Statistics from authentic database
  const stats = useMemo(() => {
    return getAtlasStats(kingdomsData, sitesData, territoriesData);
  }, []);

  // Activate a specific founding year on the Time-Series bar and synchronize filters
  const handleActivateTimeSeriesYear = (year: number) => {
    setIsTimeSeriesActive(true);
    setCurrentYear(year);
    setFilter((prev) => ({
      ...prev,
      yearRange: [MIN_YEAR, MAX_YEAR],
      activeKingdomId: null,
    }));
    if (autoFollowNewKingdom) {
      const newlyFounded = kingdomsData.find((k) => k.founded_year === year);
      if (newlyFounded) {
        setFocusLocation({ lat: newlyFounded.latitude, lng: newlyFounded.longitude, zoom: 6 });
      }
    }
  };

  // Switch back to showing all 17 kingdoms across all eras (840–1771 M)
  const handleShowAllEras = () => {
    setIsPlaying(false);
    setIsTimeSeriesActive(false);
    setFilter((prev) => ({
      ...prev,
      yearRange: [MIN_YEAR, MAX_YEAR],
      activeKingdomId: null,
    }));
  };

  // Handlers
  const handleSelectKingdom = (kingdom: Kingdom) => {
    setSelectedKingdom(kingdom);
    // If Time-Series mode is active and the clicked kingdom hasn't appeared yet, jump to its founded_year
    if (isTimeSeriesActive) {
      const isVisible =
        timeSeriesDisplayMode === 'exact'
          ? isKingdomFoundedInYear(kingdom, currentYear)
          : isKingdomPresentByYear(kingdom, currentYear);
      if (!isVisible) {
        setCurrentYear(kingdom.founded_year);
      }
    }
    setFocusLocation({ lat: kingdom.latitude, lng: kingdom.longitude, zoom: 7 });
  };

  const handleSelectSite = (site: HeritageSite) => {
    setSelectedSite(site);
  };

  const handleViewSiteOnMap = (site: HeritageSite) => {
    setActiveTab('map');
    setSelectedSite(site);
    const parentKd = kingdomsData.find((k) => site.kingdom_ids.includes(k.id));
    if (isTimeSeriesActive && parentKd) {
      const isVisible =
        timeSeriesDisplayMode === 'exact'
          ? isKingdomFoundedInYear(parentKd, currentYear)
          : isKingdomPresentByYear(parentKd, currentYear);
      if (!isVisible) {
        setCurrentYear(parentKd.founded_year);
      }
    }
    setFocusLocation({ lat: site.latitude, lng: site.longitude, zoom: 11 });
  };

  const handleFocusKingdomSites = (kingdom: Kingdom) => {
    const kingdomSites = sitesData.filter((s) => s.kingdom_ids.includes(kingdom.id));
    if (kingdomSites.length > 0) {
      setFocusLocation({
        lat: kingdomSites[0].latitude,
        lng: kingdomSites[0].longitude,
        zoom: 10,
      });
    }
  };

  const handleResetMap = () => {
    setIsPlaying(false);
    setIsTimeSeriesActive(true);
    setTimeSeriesDisplayMode('cumulative');
    setCurrentYear(KINGDOM_FOUNDING_YEARS[0]);
    setSelectedKingdom(null);
    setSelectedSite(null);
    setFilter({
      regions: [],
      yearRange: [MIN_YEAR, MAX_YEAR],
      siteTypes: [],
      certaintyLevels: [],
      searchQuery: '',
      activeKingdomId: null,
      entityType: 'all',
    });
    setFocusLocation({ lat: -2.2, lng: 117.5, zoom: 5 });
  };

  return (
    <div
      className={`${
        activeTab === 'map' ? 'h-screen overflow-hidden' : 'min-h-screen'
      } bg-[#F4F0E6] text-[#172B36] flex flex-col font-sans`}
    >
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filter={filter}
        setFilter={setFilter}
        onResetMap={handleResetMap}
        totalKingdoms={filteredKingdoms.length}
        totalSites={filteredSites.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1 flex flex-col relative min-h-0 overflow-hidden">
        {/* VIEW 1: EXPLORE ATLAS MAP */}
        {activeTab === 'map' && (
          <div className="flex-1 flex flex-col relative w-full h-full min-h-0">
            {/* Context Sub-header Banner */}
            <div className="bg-[#172B36]/95 text-[#F4F0E6] px-4 py-1.5 border-b border-[#B58B4D]/30 z-10 hidden sm:flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-2 truncate">
                <Compass className="w-3.5 h-3.5 text-[#B58B4D] shrink-0" />
                <h1 className="font-serif font-bold text-sm tracking-wide text-[#F4F0E6]">
                  Menelusuri Jejak Kerajaan Islam di Nusantara
                </h1>
                <span className="text-gray-400 hidden lg:inline">&bull;</span>
                <span className="text-gray-300 hidden lg:inline truncate">
                  Menghubungkan lokasi spasial, kronologi tarikh, daftar sultan, dan peninggalan
                  cagar budaya.
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] font-medium text-[#B58B4D] shrink-0">
                <span>
                  Tampil di Peta: {filteredKingdoms.length}/{stats.totalKingdoms} Kesultanan
                </span>
                <span>&bull;</span>
                <span>
                  {filteredSites.length}/{stats.totalSites} Situs Peninggalan
                </span>
                <span>&bull;</span>
                <span>{sourcesData.length} Korpus Referensi</span>
              </div>
            </div>

            {/* Map Canvas Area (Fills 100% height between Sub-header and Bottom Time-Series Bar) */}
            <div className="relative flex-1 flex flex-col w-full min-h-0 overflow-hidden">
              {/* Filter Panel Drawer */}
              <FilterPanel
                filter={filter}
                setFilter={setFilter}
                isOpen={isFilterPanelOpen}
                setIsOpen={setIsFilterPanelOpen}
                filteredKingdomsCount={filteredKingdoms.length}
                filteredSitesCount={filteredSites.length}
                onYearRangeSelect={() => {
                  setIsPlaying(false);
                  setIsTimeSeriesActive(false);
                }}
              />

              {/* Leaflet WebGIS Map Component */}
              <MapGIS
                kingdoms={filteredKingdoms}
                sites={filteredSites}
                territories={filteredTerritories}
                selectedKingdom={selectedKingdom}
                onSelectKingdom={handleSelectKingdom}
                onSelectSite={handleSelectSite}
                focusLocation={focusLocation}
                onResetFocus={() => setFocusLocation(null)}
                activeTimeSeriesYear={isTimeSeriesActive ? currentYear : null}
                timeSeriesDisplayMode={timeSeriesDisplayMode}
              />

              {/* Kingdom Summary Floating Drawer */}
              {selectedKingdom && (
                <KingdomSummaryDrawer
                  kingdom={selectedKingdom}
                  onClose={() => setSelectedKingdom(null)}
                  onOpenFullDetail={(kd) => setDeepDiveKingdom(kd)}
                  onFocusSites={handleFocusKingdomSites}
                  rulers={rulersData}
                  sites={sitesData}
                  activeTimeSeriesYear={isTimeSeriesActive ? currentYear : null}
                />
              )}
            </div>

            {/* Docked Bottom Time-Series & Auto-Play Control Bar */}
            <MapTimeSeriesBar
              isTimeSeriesActive={isTimeSeriesActive}
              setIsTimeSeriesActive={setIsTimeSeriesActive}
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              playSpeed={playSpeed}
              setPlaySpeed={setPlaySpeed}
              timeSeriesDisplayMode={timeSeriesDisplayMode}
              setTimeSeriesDisplayMode={setTimeSeriesDisplayMode}
              autoFollowNewKingdom={autoFollowNewKingdom}
              setAutoFollowNewKingdom={setAutoFollowNewKingdom}
              activeKingdoms={filteredKingdoms}
              activeSites={filteredSites}
              activeTerritories={filteredTerritories}
              allKingdoms={baseFilteredKingdoms}
              allSites={sitesData}
              events={eventsData}
              yearRange={filter.yearRange}
              onActivateTimeSeriesYear={handleActivateTimeSeriesYear}
              onShowAllEras={handleShowAllEras}
              onSelectKingdom={handleSelectKingdom}
            />
          </div>
        )}

        {/* VIEW 2: TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="flex-1 overflow-y-auto">
            <TimelineView
              kingdoms={kingdomsData}
              events={eventsData}
              onSelectKingdomOnMap={(kd) => {
                setActiveTab('map');
                handleSelectKingdom(kd);
              }}
              onOpenKingdomDetail={(kd) => setDeepDiveKingdom(kd)}
            />
          </div>
        )}

        {/* VIEW 3: HERITAGE SITES CATALOG */}
        {activeTab === 'sites' && (
          <div className="flex-1 overflow-y-auto">
            <SitesCatalogView
              sites={sitesData}
              kingdoms={kingdomsData}
              onSelectSiteOnMap={handleViewSiteOnMap}
              onOpenSiteDetail={(site) => setSelectedSite(site)}
            />
          </div>
        )}

        {/* VIEW 4: SOURCES & ABOUT */}
        {activeTab === 'sources' && (
          <div className="flex-1 overflow-y-auto">
            <SourcesAndAboutView />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-[#12222b] text-[#F4F0E6]/80 border-t border-[#B58B4D]/25 px-4 sm:px-6 lg:px-8 py-2 text-[11px] shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#B58B4D] shrink-0" />
            <span className="font-serif font-bold text-[#F4F0E6]">Atlas Islam Nusantara</span>
            <span className="text-gray-500">&mdash;</span>
            <span className="text-[#F4F0E6]/70">
              WebGIS Sejarah Kerajaan &amp; Kesultanan Indonesia ({stats.totalKingdoms} Kerajaan,{' '}
              {rulersData.length} Sultan, {stats.totalSites} Situs)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('sources')}
              className="text-[#B58B4D] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3 h-3" />
              <span>Metodologi &amp; Daftar Pustaka</span>
            </button>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3 h-3" />
              <span>Peta Dasar &copy; OpenStreetMap contributors</span>
            </span>
          </div>
        </div>
      </footer>

      {/* FULL MODALS */}
      {deepDiveKingdom && (
        <KingdomDetailModal
          kingdom={deepDiveKingdom}
          onClose={() => setDeepDiveKingdom(null)}
          rulers={rulersData}
          sites={sitesData}
          territories={territoriesData}
          events={eventsData}
          sources={sourcesData}
          onSelectSiteOnMap={handleViewSiteOnMap}
        />
      )}

      {selectedSite && (
        <SiteDetailModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
          kingdoms={kingdomsData}
          sources={sourcesData}
          onViewOnMap={handleViewSiteOnMap}
          onSelectKingdom={(k) => {
            setSelectedSite(null);
            handleSelectKingdom(k);
          }}
        />
      )}
    </div>
  );
}
