import React, { useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Clock,
  Sparkles,
  Layers,
  Crown,
  Landmark,
  Compass,
} from 'lucide-react';
import { Kingdom, HeritageSite, TerritoryFeature, TimelineEvent } from '../types/atlas';
import { KINGDOM_FOUNDING_YEARS } from '../utils/historyLogic';

export type TimeSeriesDisplayMode = 'cumulative' | 'exact';

interface MapTimeSeriesBarProps {
  isTimeSeriesActive: boolean;
  setIsTimeSeriesActive: (active: boolean) => void;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playSpeed: 1 | 2 | 4;
  setPlaySpeed: React.Dispatch<React.SetStateAction<1 | 2 | 4>>;
  timeSeriesDisplayMode: TimeSeriesDisplayMode;
  setTimeSeriesDisplayMode: React.Dispatch<React.SetStateAction<TimeSeriesDisplayMode>>;
  autoFollowNewKingdom: boolean;
  setAutoFollowNewKingdom: React.Dispatch<React.SetStateAction<boolean>>;
  activeKingdoms: Kingdom[];
  activeSites: HeritageSite[];
  activeTerritories: TerritoryFeature[];
  allKingdoms: Kingdom[];
  allSites: HeritageSite[];
  events: TimelineEvent[];
  yearRange: [number, number];
  onActivateTimeSeriesYear: (year: number) => void;
  onShowAllEras: () => void;
  onSelectKingdom?: (kingdom: Kingdom) => void;
}

export const MIN_YEAR = 840;
export const MAX_YEAR = 1960;

export const FOUNDING_MILESTONES: ReadonlyArray<{
  year: number;
  shortLabel: string;
  fullLabel: string;
}> = [
  { year: 840, shortLabel: '840 • Perlak', fullLabel: '840 M • Kesultanan Perlak' },
  { year: 1267, shortLabel: '1267 • Pasai', fullLabel: '1267 M • Kesultanan Samudera Pasai' },
  { year: 1478, shortLabel: '1478 • Demak', fullLabel: '1478 M • Kesultanan Demak' },
  { year: 1479, shortLabel: '1479 • Cirebon', fullLabel: '1479 M • Kesultanan Cirebon' },
  { year: 1486, shortLabel: '1486 • Ternate', fullLabel: '1486 M • Kesultanan Ternate' },
  { year: 1495, shortLabel: '1495 • Tidore', fullLabel: '1495 M • Kesultanan Tidore' },
  { year: 1496, shortLabel: '1496 • Aceh', fullLabel: '1496 M • Kesultanan Aceh Darussalam' },
  {
    year: 1526,
    shortLabel: '1526 • Banten & Banjar',
    fullLabel: '1526 M • Kesultanan Banten & Kesultanan Banjar',
  },
  { year: 1542, shortLabel: '1542 • Buton', fullLabel: '1542 M • Kesultanan Buton (Wolio)' },
  { year: 1575, shortLabel: '1575 • Kutai', fullLabel: '1575 M • Kesultanan Kutai Kartanegara' },
  { year: 1584, shortLabel: '1584 • Mataram', fullLabel: '1584 M • Kesultanan Mataram Islam' },
  {
    year: 1605,
    shortLabel: '1605 • Gowa-Tallo',
    fullLabel: '1605 M • Kesultanan Gowa-Tallo (Makassar)',
  },
  { year: 1611, shortLabel: '1611 • Bone', fullLabel: '1611 M • Kesultanan Bone' },
  { year: 1621, shortLabel: '1621 • Bima', fullLabel: '1621 M • Kesultanan Bima' },
  {
    year: 1659,
    shortLabel: '1659 • Palembang',
    fullLabel: '1659 M • Kesultanan Palembang Darussalam',
  },
  { year: 1723, shortLabel: '1723 • Siak', fullLabel: '1723 M • Kesultanan Siak Sri Indrapura' },
  { year: 1771, shortLabel: '1771 • Pontianak', fullLabel: '1771 M • Kesultanan Pontianak' },
];

export const MapTimeSeriesBar: React.FC<MapTimeSeriesBarProps> = ({
  isTimeSeriesActive,
  currentYear,
  isPlaying,
  setIsPlaying,
  playSpeed,
  setPlaySpeed,
  timeSeriesDisplayMode,
  setTimeSeriesDisplayMode,
  autoFollowNewKingdom,
  setAutoFollowNewKingdom,
  activeKingdoms,
  activeSites,
  activeTerritories,
  allKingdoms,
  onActivateTimeSeriesYear,
  onShowAllEras,
  onSelectKingdom,
}) => {
  // Find the current step index (0..16) in KINGDOM_FOUNDING_YEARS closest to currentYear
  const currentStepIndex = useMemo(() => {
    let bestIdx = 0;
    for (let i = 0; i < KINGDOM_FOUNDING_YEARS.length; i++) {
      if (KINGDOM_FOUNDING_YEARS[i] <= currentYear) {
        bestIdx = i;
      }
    }
    return bestIdx;
  }, [currentYear]);

  // Handle Auto-Play: steps directly through each Kingdom Founding Year (Tahun Hadirnya Kerajaan)
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = playSpeed === 4 ? 700 : playSpeed === 2 ? 1200 : 1900;

    const timer = window.setInterval(() => {
      const nextIdx = currentStepIndex + 1;
      if (nextIdx >= KINGDOM_FOUNDING_YEARS.length) {
        setIsPlaying(false);
        return;
      }
      onActivateTimeSeriesYear(KINGDOM_FOUNDING_YEARS[nextIdx]);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, playSpeed, currentStepIndex, onActivateTimeSeriesYear, setIsPlaying]);

  const handleTogglePlay = () => {
    if (!isTimeSeriesActive) {
      onActivateTimeSeriesYear(KINGDOM_FOUNDING_YEARS[0]);
      setIsPlaying(true);
      return;
    }
    if (currentStepIndex >= KINGDOM_FOUNDING_YEARS.length - 1) {
      onActivateTimeSeriesYear(KINGDOM_FOUNDING_YEARS[0]);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleStepMilestone = (deltaSteps: number) => {
    setIsPlaying(false);
    const nextIdx = Math.max(
      0,
      Math.min(KINGDOM_FOUNDING_YEARS.length - 1, currentStepIndex + deltaSteps)
    );
    onActivateTimeSeriesYear(KINGDOM_FOUNDING_YEARS[nextIdx]);
  };

  // Kingdoms that newly appeared in currentYear
  const newlyFoundedKingdoms = useMemo(() => {
    return allKingdoms.filter((k) => k.founded_year === currentYear);
  }, [allKingdoms, currentYear]);

  const progressPct =
    KINGDOM_FOUNDING_YEARS.length > 1
      ? (currentStepIndex / (KINGDOM_FOUNDING_YEARS.length - 1)) * 100
      : 100;

  return (
    <div className="bg-[#172B36] text-[#F4F0E6] border-t-2 border-[#B58B4D] px-3 sm:px-6 py-2.5 shadow-2xl z-20 shrink-0 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Row: Playback Controls + Year Hadir Status + Display Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Play / Pause / Next-Prev Founding Year Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isPlaying
                  ? 'bg-amber-400 text-[#172B36] hover:bg-amber-300'
                  : 'bg-[#B58B4D] text-[#172B36] hover:bg-[#c99b56]'
              }`}
              title={
                isPlaying
                  ? 'Jeda animasi urutan tahun hadirnya kerajaan'
                  : 'Putar otomatis urutan tahun hadirnya 17 kerajaan Islam di Nusantara (840–1771 M)'
              }
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Jeda Auto-Play</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Auto-Play Tahun Hadir</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleStepMilestone(-1)}
              disabled={isTimeSeriesActive && currentStepIndex <= 0}
              className="p-1.5 rounded-md bg-[#12222b] hover:bg-[#1f3744] disabled:opacity-40 text-[#F4F0E6] border border-[#B58B4D]/30 transition-colors cursor-pointer"
              title="Tahun hadir kerajaan sebelumnya"
              aria-label="Tahun hadir kerajaan sebelumnya"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleStepMilestone(1)}
              disabled={isTimeSeriesActive && currentStepIndex >= KINGDOM_FOUNDING_YEARS.length - 1}
              className="p-1.5 rounded-md bg-[#12222b] hover:bg-[#1f3744] disabled:opacity-40 text-[#F4F0E6] border border-[#B58B4D]/30 transition-colors cursor-pointer"
              title="Tahun hadir kerajaan berikutnya"
              aria-label="Tahun hadir kerajaan berikutnya"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Speed Selector */}
            <div className="hidden sm:flex items-center bg-[#12222b] rounded-md p-0.5 border border-[#B58B4D]/30 text-[10px]">
              {([1, 2, 4] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaySpeed(spd)}
                  className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                    playSpeed === spd
                      ? 'bg-[#B58B4D] text-[#172B36]'
                      : 'text-[#F4F0E6]/70 hover:text-white'
                  }`}
                  title={`Kecepatan animasi ${spd}x`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                onActivateTimeSeriesYear(KINGDOM_FOUNDING_YEARS[0]);
              }}
              className="p-1.5 rounded-md bg-[#12222b] hover:bg-[#1f3744] text-[#B58B4D] border border-[#B58B4D]/30 transition-colors cursor-pointer"
              title="Ulangi dari kerajaan pertama (840 M • Kesultanan Perlak)"
              aria-label="Ulangi dari 840 M"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Auto-Follow Camera Toggle */}
            <button
              type="button"
              onClick={() => setAutoFollowNewKingdom((prev) => !prev)}
              className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold border transition-colors cursor-pointer ${
                autoFollowNewKingdom
                  ? 'bg-emerald-900/80 text-emerald-200 border-emerald-400/50'
                  : 'bg-[#12222b] text-[#F4F0E6]/70 border-[#B58B4D]/25 hover:text-white'
              }`}
              title="Arahkan kamera peta otomatis ke kerajaan yang baru hadir"
            >
              <Compass className="w-3 h-3 text-[#B58B4D]" />
              <span>Fokus Peta: {autoFollowNewKingdom ? 'Aktif' : 'Mati'}</span>
            </button>
          </div>

          {/* Center: Synchronized Founding Year & Active Data Counts */}
          <div className="flex flex-wrap items-center gap-2.5 bg-[#12222b] px-3 py-1 rounded-lg border border-[#B58B4D]/40">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#B58B4D]" />
              <span className="text-[11px] text-[#F4F0E6]/75 uppercase tracking-wider">
                {isTimeSeriesActive ? 'Tahun Hadir:' : 'Mode Peta:'}
              </span>
              <span className="font-serif font-bold text-base sm:text-lg text-[#fbbf24]">
                {isTimeSeriesActive ? `${currentYear} M` : 'Semua Kerajaan (840–1771 M)'}
              </span>
              {isTimeSeriesActive && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#B58B4D]/20 text-[#B58B4D] font-bold">
                  Tahap {currentStepIndex + 1}/{KINGDOM_FOUNDING_YEARS.length}
                </span>
              )}
            </div>

            <span className="text-gray-600">|</span>

            <div className="flex items-center gap-2.5 text-xs">
              <span className="font-semibold text-emerald-300 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#B58B4D]" />
                {activeKingdoms.length}/{allKingdoms.length} Kesultanan
              </span>
              <span className="font-semibold text-amber-200 flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-[#426B60]" />
                {activeSites.length} Situs
              </span>
              <span className="hidden xl:inline text-[11px] text-[#B58B4D] font-medium">
                &bull; {activeTerritories.length} Wilayah
              </span>
            </div>
          </div>

          {/* Right: Visualization Mode Selector (Kumulatif vs Hanya Tahun Ini vs Semua) */}
          <div className="flex items-center gap-1 bg-[#12222b] p-1 rounded-lg border border-[#B58B4D]/35 text-[11px]">
            <button
              type="button"
              onClick={() => {
                setTimeSeriesDisplayMode('cumulative');
                if (!isTimeSeriesActive) {
                  onActivateTimeSeriesYear(currentYear);
                }
              }}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                isTimeSeriesActive && timeSeriesDisplayMode === 'cumulative'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/75 hover:text-white'
              }`}
              title="Tampilkan akumulasi kerajaan yang telah hadir dari 840 M hingga tahun terpilih"
            >
              Kumulatif (&le; {currentYear} M)
            </button>
            <button
              type="button"
              onClick={() => {
                setTimeSeriesDisplayMode('exact');
                if (!isTimeSeriesActive) {
                  onActivateTimeSeriesYear(currentYear);
                }
              }}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                isTimeSeriesActive && timeSeriesDisplayMode === 'exact'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/75 hover:text-white'
              }`}
              title="Hanya tampilkan kerajaan yang berdiri tepat pada tahun terpilih"
            >
              Hanya Tahun {currentYear} M
            </button>
            <button
              type="button"
              onClick={onShowAllEras}
              className={`px-2.5 py-1 rounded font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                !isTimeSeriesActive
                  ? 'bg-[#426B60] text-white font-bold'
                  : 'text-[#F4F0E6]/75 hover:text-white'
              }`}
              title="Tampilkan seluruh 17 kerajaan dari semua tahun hadir (840–1771 M)"
            >
              <Layers className="w-3 h-3" />
              <span>Semua (17)</span>
            </button>
          </div>
        </div>

        {/* Middle Row: Stepped Founding-Year Scrubber (16 Exact Milestones: 840 M .. 1771 M) */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="text-[10px] font-bold text-[#B58B4D] w-14 shrink-0">
              840 M
            </span>
            <div className="relative flex-1 mx-2 flex items-center h-6">
              {/* Track Line */}
              <div className="w-full h-2 bg-[#12222b] rounded-full overflow-hidden border border-[#B58B4D]/35 pointer-events-none relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-emerald-500 to-[#B58B4D] transition-all duration-200"
                  style={{ width: `${isTimeSeriesActive ? progressPct : 100}%` }}
                />
              </div>

              {/* 16 Evenly Spaced Founding Year Node Dots */}
              {FOUNDING_MILESTONES.map((m, idx) => {
                const pct =
                  FOUNDING_MILESTONES.length > 1
                    ? (idx / (FOUNDING_MILESTONES.length - 1)) * 100
                    : 0;
                const isPassed = isTimeSeriesActive
                  ? idx <= currentStepIndex
                  : true;
                const isCurrent = isTimeSeriesActive && idx === currentStepIndex;
                return (
                  <div
                    key={m.year}
                    style={{ left: `${pct}%` }}
                    className={` -translate-x-1/2 pointer-events-none absolute rounded-full transition-all ${
                      isCurrent
                        ? 'w-4 h-4 bg-[#fbbf24] border-2 border-white shadow-lg z-10'
                        : isPassed
                        ? 'w-2 h-2 bg-[#B58B4D] border border-[#172B36]'
                        : 'w-2 h-2 bg-gray-600 border border-[#172B36]'
                    }`}
                  />
                );
              })}

              {/* Stepped Range Input (0..16 mapped 1:1 to KINGDOM_FOUNDING_YEARS) */}
              <input
                type="range"
                min={0}
                max={KINGDOM_FOUNDING_YEARS.length - 1}
                step={1}
                value={currentStepIndex}
                onChange={(e) => {
                  setIsPlaying(false);
                  const idx = Number(e.target.value);
                  onActivateTimeSeriesYear(KINGDOM_FOUNDING_YEARS[idx]);
                }}
                aria-label="Penggeser tahapan tahun hadirnya kerajaan"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
            </div>
            <span className="text-[10px] font-bold text-[#B58B4D] w-14 text-right shrink-0">
              1771 M
            </span>
          </div>

          {/* Bottom Row: 16 Founding Year Quick-Jump Pills + Newly Founded Kingdom Badge */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1.5 pt-0.5">
            {/* All 16 Kingdom Founding Years */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
              {FOUNDING_MILESTONES.map((m) => {
                const isSelected = isTimeSeriesActive && currentYear === m.year;
                const isAppeared =
                  isTimeSeriesActive &&
                  timeSeriesDisplayMode === 'cumulative' &&
                  m.year < currentYear;
                return (
                  <button
                    key={m.year}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      onActivateTimeSeriesYear(m.year);
                    }}
                    title={m.fullLabel}
                    className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#fbbf24] text-[#172B36] font-extrabold border-white shadow-sm scale-105'
                        : isAppeared
                        ? 'bg-[#B58B4D]/25 text-[#fde68a] border-[#B58B4D]/50 hover:bg-[#B58B4D]/40'
                        : 'bg-[#12222b]/90 text-[#F4F0E6]/70 border-[#B58B4D]/20 hover:border-[#B58B4D] hover:text-white'
                    }`}
                  >
                    {m.shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Newly Founded Kingdom Callout Button */}
            <div className="flex items-center gap-2 text-[11px] truncate shrink-0">
              {isTimeSeriesActive && newlyFoundedKingdoms.length > 0 ? (
                <div className="flex items-center gap-1.5 bg-emerald-950/90 text-emerald-200 px-2.5 py-0.5 rounded-md border border-emerald-500/50">
                  <Sparkles className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" />
                  <span className="font-bold text-[#fbbf24]">Hadir {currentYear} M:</span>
                  <div className="flex items-center gap-1">
                    {newlyFoundedKingdoms.map((kd) => (
                      <button
                        key={kd.id}
                        type="button"
                        onClick={() => onSelectKingdom && onSelectKingdom(kd)}
                        className="underline hover:text-white font-semibold cursor-pointer"
                      >
                        {kd.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-[#F4F0E6]/80 italic truncate">
                  Menampilkan seluruh 17 kesultanan berdasarkan warna fase tahun hadirnya (840–1771 M).
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
