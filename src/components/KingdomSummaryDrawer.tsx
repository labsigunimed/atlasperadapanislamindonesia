import React from 'react';
import {
  X,
  Calendar,
  MapPin,
  Crown,
  Landmark,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { Kingdom, Ruler, HeritageSite } from '../types/atlas';
import { SITE_TYPE_LABELS } from '../utils/historyLogic';

interface KingdomSummaryDrawerProps {
  kingdom: Kingdom | null;
  onClose: () => void;
  onOpenFullDetail: (kingdom: Kingdom) => void;
  onFocusSites: (kingdom: Kingdom) => void;
  rulers: Ruler[];
  sites: HeritageSite[];
  activeTimeSeriesYear?: number | null;
}

export const KingdomSummaryDrawer: React.FC<KingdomSummaryDrawerProps> = ({
  kingdom,
  onClose,
  onOpenFullDetail,
  onFocusSites,
  rulers,
  sites,
  activeTimeSeriesYear = null,
}) => {
  if (!kingdom) return null;

  const kingdomRulers = rulers.filter((r) => r.kingdom_id === kingdom.id);
  const kingdomSites = sites.filter((s) => s.kingdom_ids.includes(kingdom.id));

  const badgeClass =
    kingdom.founded_certainty === 'verified'
      ? 'bg-emerald-950 text-emerald-300 border-emerald-700/40'
      : kingdom.founded_certainty === 'estimated'
      ? 'bg-amber-950 text-amber-300 border-amber-700/40'
      : 'bg-slate-800 text-slate-200 border-slate-600/40';

  return (
    <aside
      aria-label={`Ringkasan ${kingdom.name}`}
      className="absolute top-4 right-4 z-20 w-[calc(100vw-32px)] sm:w-96 max-h-[84vh] bg-[#F4F0E6] text-[#172B36] rounded-xl shadow-2xl border-2 border-[#B58B4D]/60 flex flex-col overflow-hidden backdrop-blur-sm animate-in slide-in-from-right duration-300"
    >
      {/* Drawer Header */}
      <div className="relative bg-[#172B36] text-[#F4F0E6] p-4 border-b border-[#B58B4D]/40 shrink-0">
        <div className="flex items-start justify-between">
          <div className="pr-6">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-lg">👑</span>
              <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#B58B4D]/20 text-[#B58B4D] font-bold border border-[#B58B4D]/30">
                {kingdom.region}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 border ${badgeClass}`}
              >
                {kingdom.founded_certainty === 'unverified' ? (
                  <AlertTriangle className="w-3 h-3" />
                ) : (
                  <ShieldCheck className="w-3 h-3" />
                )}
                {kingdom.verificationStatus}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F4F0E6] leading-tight">
              {kingdom.name}
            </h2>
            {kingdom.alternate_names.length > 0 && (
              <p className="text-xs text-[#B58B4D] italic mt-0.5">
                Nama lain: {kingdom.alternate_names.join(', ')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#F4F0E6]/60 hover:text-[#F4F0E6] p-1.5 rounded-lg hover:bg-[#12222b] transition-colors"
            aria-label="Tutup ringkasan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
        {/* Verified Historical / Documentary Photo (only if verified image exists) */}
        {kingdom.imageUrl && (
          <figure className="rounded-xl overflow-hidden border border-[#B58B4D]/40 bg-[#172B36] shadow-sm">
            <div className="relative h-40 w-full overflow-hidden bg-[#12222b]">
              <img
                src={kingdom.imageUrl}
                alt={kingdom.imageCaption || kingdom.name}
                loading="lazy"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              {kingdom.imageLicense && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[#F4F0E6] text-[9px] font-medium backdrop-blur-xs border border-white/15">
                  {kingdom.imageLicense}
                </span>
              )}
            </div>
            <figcaption className="p-2.5 bg-[#172B36] text-[#F4F0E6]/90 text-[10px] space-y-1">
              {kingdom.imageCaption && (
                <p className="leading-snug text-[#F4F0E6] font-medium">{kingdom.imageCaption}</p>
              )}
              <div className="flex items-center justify-between gap-2 text-[9px] text-[#B58B4D]">
                <span className="flex items-center gap-1 truncate">
                  <Camera className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{kingdom.imageAttribution}</span>
                </span>
                {kingdom.imageSourceUrl && (
                  <a
                    href={kingdom.imageSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-0.5 shrink-0 text-emerald-300"
                  >
                    <span>Arsip</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </figcaption>
          </figure>
        )}

        {/* Core Quick Facts Grid */}
        <div className="grid grid-cols-2 gap-2.5 bg-white/80 p-3 rounded-lg border border-[#B58B4D]/30">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#426B60]" /> Pusat Pemerintahan
            </div>
            <div className="font-semibold text-xs text-[#172B36] mt-0.5">{kingdom.capital}</div>
            <div className="text-[10px] text-gray-500">{kingdom.modern_province}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#B58B4D]" /> Tahun Berdiri
            </div>
            <div className="font-semibold text-xs text-[#172B36] mt-0.5">
              {kingdom.founded_display}
            </div>
          </div>
          <div className="pt-1 border-t border-gray-100">
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Masa Kejayaan</div>
            <div className="font-medium text-[11px] text-[#172B36] mt-0.5">
              {kingdom.golden_age_display}
            </div>
          </div>
          <div className="pt-1 border-t border-gray-100">
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">
              Akhir / Perubahan
            </div>
            <div className="font-medium text-[11px] text-[#172B36] mt-0.5">
              {kingdom.ended_display}
            </div>
          </div>
        </div>

        {/* Current Heritage Status */}
        <div className="p-2.5 rounded-md bg-[#eae3d2] border border-[#B58B4D]/30 text-[11px]">
          <span className="font-semibold text-[#172B36]">Status Kedaulatan & Integrasi: </span>
          <span className="text-[#172B36]/85">{kingdom.status_summary}</span>
        </div>

        {/* Brief Historical Summary */}
        <div>
          <h4 className="font-serif font-bold text-sm text-[#172B36] mb-1">Ikhtisar Sejarah</h4>
          <p className="text-xs text-[#172B36]/85 leading-relaxed">{kingdom.summary}</p>
        </div>

        {/* Key Sultans Preview */}
        {kingdomRulers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-serif font-bold text-sm text-[#172B36] flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#B58B4D]" />
                <span>Daftar Sultan & Penguasa</span>
              </h4>
              <span className="text-[10px] text-gray-500">{kingdomRulers.length} Tokoh</span>
            </div>
            <div className="space-y-1.5">
              {kingdomRulers.map((r) => {
                const isReigningNow =
                  activeTimeSeriesYear !== null &&
                  r.reign_start !== null &&
                  activeTimeSeriesYear >= r.reign_start &&
                  (r.reign_end === null || activeTimeSeriesYear <= r.reign_end);
                return (
                  <div
                    key={r.id}
                    className={`p-2 rounded border ${
                      isReigningNow
                        ? 'bg-amber-50 border-[#B58B4D] ring-1 ring-[#B58B4D]'
                        : 'bg-white/70 border-[#B58B4D]/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-[11px] text-[#172B36]">{r.name}</span>
                      {isReigningNow ? (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#B58B4D] text-[#172B36] font-bold shrink-0">
                          Aktif {activeTimeSeriesYear} M
                        </span>
                      ) : (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#eae3d2] text-[#172B36] font-medium shrink-0">
                          {r.verificationStatus}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#8e6d38] font-medium">
                      {r.reign_display} &bull; {r.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Heritage Sites Associated */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-serif font-bold text-sm text-[#172B36] flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#426B60]" />
              <span>Situs Peninggalan Terkait</span>
            </h4>
            <span className="text-[10px] font-semibold text-[#426B60] bg-emerald-100 px-1.5 py-0.5 rounded">
              {kingdomSites.length} Situs
            </span>
          </div>
          {kingdomSites.length > 0 ? (
            <div className="space-y-1.5">
              {kingdomSites.map((site) => (
                <div
                  key={site.id}
                  className="p-2 bg-white/70 rounded-lg border border-[#426B60]/25 flex items-center justify-between gap-2.5"
                >
                  {site.imageUrl && (
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-md object-cover border border-[#B58B4D]/30 shrink-0 bg-[#172B36]"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[11px] text-[#172B36] truncate">
                      {site.name}
                    </div>
                    <div className="text-[10px] text-[#8e6d38] font-semibold">
                      Didirikan: {site.built_year} M
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">{site.modern_location}</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-medium shrink-0">
                    {SITE_TYPE_LABELS[site.type] || site.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-gray-500 italic">
              Belum ada situs fisik terdata untuk kerajaan ini.
            </p>
          )}
        </div>
      </div>

      {/* Drawer Action Buttons */}
      <div className="p-3 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex flex-col gap-2 shrink-0">
        <button
          onClick={() => onOpenFullDetail(kingdom)}
          className="w-full py-2 px-3 bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] rounded-md font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Jelajahi Detail Sejarah & Sumber</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B58B4D]" />
        </button>

        {kingdomSites.length > 0 && (
          <button
            onClick={() => onFocusSites(kingdom)}
            className="w-full py-1.5 px-3 bg-white/80 hover:bg-white text-[#426B60] border border-[#426B60]/40 rounded-md font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Fokuskan Peta ke Situs Terkait</span>
          </button>
        )}
      </div>
    </aside>
  );
};
