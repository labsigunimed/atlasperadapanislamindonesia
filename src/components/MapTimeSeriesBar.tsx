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
} from 'lucide-react';
import { Kingdom, HeritageSite, TerritoryFeature, TimelineEvent } from '../types/atlas';

interface MapTimeSeriesBarProps {
  isTimeSeriesActive: boolean;
  setIsTimeSeriesActive: (active: boolean) => void;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playSpeed: 1 | 2 | 4;
  setPlaySpeed: React.Dispatch<React.SetStateAction<1 | 2 | 4>>;
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

const KEY_MOMENTS = [
  { year: 840, label: '840 M • Perlak' },
  { year: 1267, label: '1267 M • Samudera Pasai' },
  { year: 1297, label: '1297 M • Makam Malik as-Saleh' },
  { year: 1478, label: '1478 M • Demak' },
  { year: 1479, label: '1479 M • Cirebon & Masjid Demak' },
  { year: 1486, label: '1486 M • Ternate' },
  { year: 1496, label: '1496 M • Tidore & Aceh' },
  { year: 1526, label: '1526 M • Banten & Banjar' },
  { year: 1542, label: '1542 M • Buton' },
  { year: 1575, label: '1575 M • Kutai' },
  { year: 1584, label: '1584 M • Mataram Islam' },
  { year: 1605, label: '1605 M • Gowa-Tallo' },
  { year: 1611, label: '1611 M • Bone & Baiturrahman' },
  { year: 1621, label: '1621 M • Bima' },
  { year: 1659, label: '1659 M • Palembang' },
  { year: 1723, label: '1723 M • Siak' },
  { year: 1771, label: '1771 M • Pontianak' },
  { year: 1889, label: '1889 M • Istana Siak & Bola Soba' },
  { year: 1945, label: '1945 M • Integrasi NKRI' },
];

export const MapTimeSeriesBar: React.FC<MapTimeSeriesBarProps> = ({
  isTimeSeriesActive,
  setIsTimeSeriesActive,
  currentYear,
  setCurrentYear,
  isPlaying,
  setIsPlaying,
  playSpeed,
  setPlaySpeed,
  activeKingdoms,
  activeSites,
  activeTerritories,
  allKingdoms,
  allSites,
  events,
  yearRange,
  onActivateTimeSeriesYear,
  onShowAllEras,
  onSelectKingdom,
}) => {
  // Exact chronological milestone years (founding years of kingdoms + built years of sites)
  const milestoneYears = useMemo(() => {
    const years = new Set<number>();
    allKingdoms.forEach((k) => {
      years.add(k.founded_year);
      if (k.ended_year) years.add(k.ended_year);
    });
    allSites.forEach((s) => {
      years.add(s.built_year);
    });
    events.forEach((e) => {
      years.add(e.year);
    });
    return Array.from(years).sort((a, b) => a - b);
  }, [allKingdoms, allSites, events]);

  // Handle Auto-Play interval with exact milestone snapping
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = playSpeed === 4 ? 180 : playSpeed === 2 ? 320 : 520;

    const timer = window.setInterval(() => {
      setCurrentYear((prev) => {
        if (prev >= MAX_YEAR) {
          setIsPlaying(false);
          return MAX_YEAR;
        }
        // Fast-forward through the 870–1255 M gap where only Perlak is claimed before Samudera Pasai (1267 M)
        const baseStep =
          prev >= 868 && prev < 1260
            ? 45
            : playSpeed === 4
            ? 6
            : playSpeed === 2
            ? 3
            : 2;

        const targetYear = Math.min(MAX_YEAR, prev + baseStep);

        // Snap to exact founding/built milestone year if one falls within (prev, targetYear]
        const nextMilestone = milestoneYears.find((m) => m > prev && m <= targetYear);
        if (nextMilestone !== undefined) {
          return nextMilestone;
        }

        return targetYear;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, playSpeed, milestoneYears, setCurrentYear, setIsPlaying]);

  const handleTogglePlay = () => {
    if (!isTimeSeriesActive) {
      // When starting Auto-Play from 'Semua Era' mode, start from earliest founding year or currentYear
      const startYear = currentYear >= MAX_YEAR || currentYear === 1550 ? MIN_YEAR : currentYear;
      onActivateTimeSeriesYear(startYear);
      setIsPlaying(true);
      return;
    }
    if (currentYear >= MAX_YEAR) {
      onActivateTimeSeriesYear(MIN_YEAR);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleStep = (delta: number) => {
    setIsPlaying(false);
    const nextY = Math.max(MIN_YEAR, Math.min(MAX_YEAR, currentYear + delta));
    onActivateTimeSeriesYear(nextY);
  };

  // Golden age kingdoms in currentYear
  const goldenAgeKingdoms = activeKingdoms.filter(
    (k) => currentYear >= k.golden_age_start && currentYear <= k.golden_age_end
  );

  // Kingdoms or Sites that newly appeared at or within 2 years of currentYear
  const newlyAppearedItems = useMemo(() => {
    if (!isTimeSeriesActive) return [];
    const items: string[] = [];
    allKingdoms.forEach((k) => {
      if (Math.abs(k.founded_year - currentYear) <= 1) {
        items.push(`${k.name} (${k.founded_year} M)`);
      }
    });
    allSites.forEach((s) => {
      if (Math.abs(s.built_year - currentYear) <= 1) {
        items.push(`${s.name.split('&')[0].trim()} (${s.built_year} M)`);
      }
    });
    return items;
  }, [allKingdoms, allSites, currentYear, isTimeSeriesActive]);

  // Closest historical event within +/- 15 years
  const closestEvent = events
    .filter((e) => Math.abs(e.year - currentYear) <= 15)
    .sort((a, b) => Math.abs(a.year - currentYear) - Math.abs(b.year - currentYear))[0];

  const progressPct = Math.max(
    0,
    Math.min(100, ((currentYear - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100)
  );

  const rangeStartPct = Math.max(
    0,
    Math.min(100, ((yearRange[0] - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100)
  );
  const rangeEndPct = Math.max(
    0,
    Math.min(100, ((yearRange[1] - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100)
  );

  return (
    <div className="bg-[#172B36] text-[#F4F0E6] border-t-2 border-[#B58B4D] px-3 sm:px-6 py-2.5 shadow-2xl z-20 shrink-0 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Row: Playback Controls + Year Status + Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Play / Pause / Step Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-[#172B36] hover:bg-amber-400'
                  : 'bg-[#B58B4D] text-[#172B36] hover:bg-[#c99b56]'
              }`}
              title={
                isPlaying
                  ? 'Jeda animasi garis waktu'
                  : 'Putar otomatis kemunculan kerajaan & situs sesuai tahun berdirinya (840–1960 M)'
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
                  <span>Auto-Play Time Series</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleStep(-10)}
              className="p-1.5 rounded-md bg-[#12222b] hover:bg-[#1f3744] text-[#F4F0E6] border border-[#B58B4D]/30 transition-colors cursor-pointer"
              title="Mundur 10 tahun"
              aria-label="Mundur 10 tahun"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleStep(10)}
              className="p-1.5 rounded-md bg-[#12222b] hover:bg-[#1f3744] text-[#F4F0E6] border border-[#B58B4D]/30 transition-colors cursor-pointer"
              title="Maju 10 tahun"
              aria-label="Maju 10 tahun"
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
                onActivateTimeSeriesYear(1267);
              }}
              className="p-1.5 rounded-md bg-[#12222b] hover:bg-[#1f3744] text-[#B58B4D] border border-[#B58B4D]/30 transition-colors cursor-pointer"
              title="Mulai dari era Samudera Pasai (1267 M)"
              aria-label="Mulai dari tahun 1267 M"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center: Synchronized Year & Active Data Counts */}
          <div className="flex flex-wrap items-center gap-2.5 bg-[#12222b] px-3 py-1 rounded-lg border border-[#B58B4D]/40">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#B58B4D]" />
              <span className="text-[11px] text-[#F4F0E6]/70 uppercase tracking-wider">
                {isTimeSeriesActive ? 'Tahun Time-Series:' : 'Rentang Aktif:'}
              </span>
              <span className="font-serif font-bold text-base sm:text-lg text-[#B58B4D]">
                {isTimeSeriesActive
                  ? `${currentYear} M`
                  : `${yearRange[0]}–${yearRange[1]} M`}
              </span>
            </div>

            <span className="text-gray-600">|</span>

            <div className="flex items-center gap-2.5 text-xs">
              <span className="font-semibold text-emerald-300 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#B58B4D]" />
                {activeKingdoms.length} Kesultanan
              </span>
              <span className="font-semibold text-amber-200 flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-[#426B60]" />
                {activeSites.length} Situs
              </span>
              {isTimeSeriesActive && goldenAgeKingdoms.length > 0 && (
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40 text-[10px] font-semibold">
                  ★ {goldenAgeKingdoms.length} Masa Kejayaan ({activeTerritories.length} Wilayah)
                </span>
              )}
            </div>
          </div>

          {/* Right: Mode Switch (Time-Series Per Tahun vs Semua Era) */}
          <div className="flex items-center gap-1.5">
            {isTimeSeriesActive ? (
              <button
                type="button"
                onClick={onShowAllEras}
                className="px-3 py-1.5 rounded-lg bg-[#426B60] hover:bg-[#35594f] text-white text-xs font-semibold flex items-center gap-1.5 border border-emerald-400/30 transition-colors cursor-pointer shadow-sm"
                title="Tampilkan seluruh 17 kerajaan & 19 situs dari semua periode (840–1960 M)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tampilkan Semua Era (840–1960 M)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onActivateTimeSeriesYear(currentYear)}
                className="px-3 py-1.5 rounded-lg bg-[#B58B4D]/20 hover:bg-[#B58B4D]/30 text-[#B58B4D] text-xs font-semibold flex items-center gap-1.5 border border-[#B58B4D]/50 transition-colors cursor-pointer"
                title="Aktifkan filter sinkronisasi per tahun tunggal"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Mode Tahun Tunggal ({currentYear} M)</span>
              </button>
            )}
          </div>
        </div>

        {/* Middle Row: Scrubber Slider with Founding Year Ticks */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="text-[10px] font-bold text-[#B58B4D] w-12 shrink-0">
              {MIN_YEAR} M
            </span>
            <div className="relative flex-1 mx-2 flex items-center h-5">
              {/* Custom Progress Bar Background */}
              <div className="w-full h-2 bg-[#12222b] rounded-full overflow-hidden border border-[#B58B4D]/30 pointer-events-none relative">
                {isTimeSeriesActive ? (
                  <div
                    className="h-full bg-gradient-to-r from-[#426B60] via-[#B58B4D] to-amber-400 transition-all duration-100"
                    style={{ width: `${progressPct}%` }}
                  />
                ) : (
                  <div
                    className="h-full bg-[#426B60]/60 absolute top-0 bottom-0"
                    style={{
                      left: `${rangeStartPct}%`,
                      width: `${Math.max(2, rangeEndPct - rangeStartPct)}%`,
                    }}
                  />
                )}
              </div>

              {/* Founding Year Tick Marks along the track */}
              {allKingdoms.map((k) => {
                const tickPct = ((k.founded_year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
                return (
                  <div
                    key={k.id}
                    style={{ left: `${tickPct}%` }}
                    className="w-0.5 h-2.5 bg-[#B58B4D]/60 absolute top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                );
              })}

              <input
                type="range"
                min={MIN_YEAR}
                max={MAX_YEAR}
                step={1}
                value={Math.max(MIN_YEAR, Math.min(MAX_YEAR, currentYear))}
                onChange={(e) => {
                  setIsPlaying(false);
                  onActivateTimeSeriesYear(Number(e.target.value));
                }}
                aria-label="Penggeser tahun time-series"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {/* Thumb Indicator */}
              {isTimeSeriesActive && (
                <div
                  className="w-4 h-4 rounded-full bg-[#B58B4D] border-2 border-white shadow-md pointer-events-none absolute -translate-x-1/2 transition-all duration-75"
                  style={{ left: `${progressPct}%` }}
                />
              )}
            </div>
            <span className="text-[10px] font-bold text-[#B58B4D] w-12 text-right shrink-0">
              {MAX_YEAR} M
            </span>
          </div>

          {/* Quick Jump Founding Year Pills & Live Appearance Ticker */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1.5 pt-0.5">
            {/* Quick Moment Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
              {KEY_MOMENTS.map((m) => {
                const isSelected = isTimeSeriesActive && Math.abs(currentYear - m.year) <= 2;
                return (
                  <button
                    key={m.year}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      onActivateTimeSeriesYear(m.year);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap transition-colors border cursor-pointer ${
                      isSelected
                        ? 'bg-[#B58B4D] text-[#172B36] font-bold border-[#B58B4D]'
                        : 'bg-[#12222b]/90 text-[#F4F0E6]/75 border-[#B58B4D]/25 hover:border-[#B58B4D] hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Live Appearance / Event Ticker */}
            <div className="flex items-center gap-2 text-[11px] truncate shrink-0 max-w-full lg:max-w-md">
              {isTimeSeriesActive && newlyAppearedItems.length > 0 ? (
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold truncate bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#B58B4D] shrink-0" />
                  <span className="truncate">
                    Muncul: {newlyAppearedItems.join(' • ')}
                  </span>
                </div>
              ) : isTimeSeriesActive && closestEvent ? (
                <div className="flex items-center gap-1.5 text-amber-200 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-[#B58B4D] shrink-0" />
                  <span className="font-semibold text-[#B58B4D]">[{closestEvent.year} M]</span>
                  <span className="truncate">{closestEvent.title}</span>
                </div>
              ) : isTimeSeriesActive && activeKingdoms.length > 0 ? (
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] text-[#F4F0E6]/60 shrink-0">Aktif:</span>
                  {activeKingdoms.slice(0, 3).map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => onSelectKingdom && onSelectKingdom(k)}
                      className="px-1.5 py-0.5 rounded bg-[#12222b] hover:bg-[#B58B4D] hover:text-[#172B36] text-[#F4F0E6] text-[10px] border border-[#B58B4D]/30 whitespace-nowrap transition-colors cursor-pointer"
                    >
                      {k.name.replace('Kesultanan ', '')} ({k.founded_year}–{k.ended_year || 'kini'})
                    </button>
                  ))}
                  {activeKingdoms.length > 3 && (
                    <span className="text-[10px] text-[#B58B4D]">
                      +{activeKingdoms.length - 3} lainnya
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-[10px] text-[#F4F0E6]/75 italic truncate">
                  Geser slider atau klik tahun di kiri untuk melihat kemunculan kerajaan &amp; situs sesuai tahun berdirinya.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
