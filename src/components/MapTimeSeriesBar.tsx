import React, { useEffect } from 'react';
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
} from 'lucide-react';
import { Kingdom, TimelineEvent } from '../types/atlas';
import { isKingdomActiveInYear } from '../utils/historyLogic';

interface MapTimeSeriesBarProps {
  isTimeSeriesActive: boolean;
  setIsTimeSeriesActive: (active: boolean) => void;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playSpeed: 1 | 2 | 4;
  setPlaySpeed: React.Dispatch<React.SetStateAction<1 | 2 | 4>>;
  kingdoms: Kingdom[];
  events: TimelineEvent[];
  onSelectKingdom?: (kingdom: Kingdom) => void;
}

const MIN_YEAR = 1250;
const MAX_YEAR = 1950;

const KEY_MOMENTS = [
  { year: 1297, label: '1297 M • Pasai' },
  { year: 1486, label: '1486 M • Demak & Ternate' },
  { year: 1542, label: '1542 M • Banten, Banjar & Buton' },
  { year: 1628, label: '1628 M • Puncak Aceh & Mataram' },
  { year: 1660, label: '1660 M • Kejayaan Gowa-Tallo' },
  { year: 1771, label: '1771 M • Siak, Palembang & Pontianak' },
  { year: 1797, label: '1797 M • Sultan Nuku Tidore' },
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
  kingdoms,
  events,
  onSelectKingdom,
}) => {
  // Handle Auto-Play interval
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = playSpeed === 4 ? 140 : playSpeed === 2 ? 280 : 500;
    const yearStep = playSpeed === 4 ? 5 : 2;

    const timer = window.setInterval(() => {
      setCurrentYear((prev) => {
        if (prev >= MAX_YEAR) {
          setIsPlaying(false);
          return MAX_YEAR;
        }
        return Math.min(MAX_YEAR, prev + yearStep);
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, playSpeed, setCurrentYear, setIsPlaying]);

  const handleTogglePlay = () => {
    if (!isTimeSeriesActive) {
      setIsTimeSeriesActive(true);
    }
    if (currentYear >= MAX_YEAR) {
      setCurrentYear(MIN_YEAR);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleStep = (delta: number) => {
    if (!isTimeSeriesActive) {
      setIsTimeSeriesActive(true);
    }
    setIsPlaying(false);
    setCurrentYear((prev) => Math.max(840, Math.min(MAX_YEAR, prev + delta)));
  };

  const handleShowAllEras = () => {
    setIsPlaying(false);
    setIsTimeSeriesActive(false);
  };

  // Compute active kingdoms and golden-age kingdoms for the currentYear
  const activeKingdoms = kingdoms.filter((k) => isKingdomActiveInYear(k, currentYear));
  const goldenAgeKingdoms = activeKingdoms.filter(
    (k) => currentYear >= k.golden_age_start && currentYear <= k.golden_age_end
  );

  // Closest historical event within +/- 25 years
  const closestEvent = events
    .filter((e) => Math.abs(e.year - currentYear) <= 25)
    .sort((a, b) => Math.abs(a.year - currentYear) - Math.abs(b.year - currentYear))[0];

  const progressPct = Math.max(
    0,
    Math.min(100, ((currentYear - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100)
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
              title={isPlaying ? 'Jeda animasi garis waktu' : 'Putar otomatis persebaran kesultanan dari abad ke-13 hingga 1950 M'}
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
                setIsTimeSeriesActive(true);
                setCurrentYear(MIN_YEAR);
              }}
              className="p-1.5 rounded-md bg-[#12222b] hover:bg-[#1f3744] text-[#B58B4D] border border-[#B58B4D]/30 transition-colors cursor-pointer"
              title="Ulangi dari tahun 1250 M"
              aria-label="Ulangi dari tahun 1250 M"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center: Current Year & Active Kingdoms Indicator */}
          <div className="flex items-center gap-3 bg-[#12222b] px-3 py-1 rounded-lg border border-[#B58B4D]/40">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#B58B4D]" />
              <span className="text-[11px] text-[#F4F0E6]/70 uppercase tracking-wider">
                {isTimeSeriesActive ? 'Tahun Aktif:' : 'Mode Peta:'}
              </span>
              <span className="font-serif font-bold text-base sm:text-lg text-[#B58B4D]">
                {isTimeSeriesActive ? `${currentYear} M` : 'Semua Era (840–1950 M)'}
              </span>
            </div>

            <span className="text-gray-600">|</span>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-emerald-300">
                {isTimeSeriesActive ? activeKingdoms.length : kingdoms.length} Kesultanan
              </span>
              {isTimeSeriesActive && goldenAgeKingdoms.length > 0 && (
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40 text-[10px] font-semibold">
                  <Crown className="w-3 h-3" />
                  {goldenAgeKingdoms.length} di Masa Kejayaan
                </span>
              )}
            </div>
          </div>

          {/* Right: Mode Switch (Time-Series Per Tahun vs Semua Era) */}
          <div className="flex items-center gap-1.5">
            {isTimeSeriesActive ? (
              <button
                type="button"
                onClick={handleShowAllEras}
                className="px-3 py-1.5 rounded-lg bg-[#426B60] hover:bg-[#35594f] text-white text-xs font-semibold flex items-center gap-1.5 border border-emerald-400/30 transition-colors cursor-pointer shadow-sm"
                title="Tampilkan kembali seluruh kerajaan dari semua periode"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tampilkan Semua Era</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsTimeSeriesActive(true)}
                className="px-3 py-1.5 rounded-lg bg-[#12222b] hover:bg-[#1f3744] text-[#B58B4D] text-xs font-semibold flex items-center gap-1.5 border border-[#B58B4D]/40 transition-colors cursor-pointer"
                title="Filter peta berdasarkan tahun tunggal pada slider di bawah"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Filter Tahun Tunggal ({currentYear} M)</span>
              </button>
            )}
          </div>
        </div>

        {/* Middle Row: Scrubber Slider & Era Ticks */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <span className="text-[10px] font-bold text-[#B58B4D] w-12 shrink-0">1250 M</span>
            <div className="relative flex-1 mx-2 flex items-center">
              {/* Custom Progress Bar Background */}
              <div className="w-full h-2 bg-[#12222b] rounded-full overflow-hidden border border-[#B58B4D]/30 pointer-events-none">
                <div
                  className="h-full bg-gradient-to-r from-[#426B60] via-[#B58B4D] to-amber-400 transition-all duration-150"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <input
                type="range"
                min={MIN_YEAR}
                max={MAX_YEAR}
                step={1}
                value={Math.max(MIN_YEAR, currentYear)}
                onChange={(e) => {
                  setIsPlaying(false);
                  if (!isTimeSeriesActive) setIsTimeSeriesActive(true);
                  setCurrentYear(Number(e.target.value));
                }}
                aria-label="Penggeser tahun time-series"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {/* Thumb Indicator */}
              <div
                className="w-4 h-4 rounded-full bg-[#B58B4D] border-2 border-white shadow-md pointer-events-none absolute -translate-x-1/2 transition-all duration-75"
                style={{ left: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-[#B58B4D] w-12 text-right shrink-0">
              1950 M
            </span>
          </div>

          {/* Quick Jump Era Pills & Historical Event Ticker */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1.5 pt-0.5">
            {/* Quick Moment Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
              {KEY_MOMENTS.map((m) => {
                const isSelected = isTimeSeriesActive && Math.abs(currentYear - m.year) <= 5;
                return (
                  <button
                    key={m.year}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setIsTimeSeriesActive(true);
                      setCurrentYear(m.year);
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

            {/* Active Kingdoms / Closest Event Ticker */}
            <div className="flex items-center gap-2 text-[11px] truncate">
              {isTimeSeriesActive && closestEvent ? (
                <div className="flex items-center gap-1.5 text-amber-200 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-[#B58B4D] shrink-0" />
                  <span className="font-semibold text-[#B58B4D]">[{closestEvent.year} M]</span>
                  <span className="truncate">{closestEvent.title}</span>
                </div>
              ) : isTimeSeriesActive && activeKingdoms.length > 0 ? (
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] text-[#F4F0E6]/60 shrink-0">Aktif:</span>
                  {activeKingdoms.slice(0, 4).map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => onSelectKingdom && onSelectKingdom(k)}
                      className="px-1.5 py-0.5 rounded bg-[#12222b] hover:bg-[#B58B4D] hover:text-[#172B36] text-[#F4F0E6] text-[10px] border border-[#B58B4D]/30 whitespace-nowrap transition-colors cursor-pointer"
                    >
                      {k.name.replace('Kesultanan ', '')}
                    </button>
                  ))}
                  {activeKingdoms.length > 4 && (
                    <span className="text-[10px] text-[#B58B4D]">
                      +{activeKingdoms.length - 4} lainnya
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-[10px] text-[#F4F0E6]/70 italic truncate">
                  Klik tombol <strong>Auto-Play Time Series</strong> untuk memutar kronologi persebaran kerajaan Islam di peta.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
