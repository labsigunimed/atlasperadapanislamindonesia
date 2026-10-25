import React from 'react';
import {
  X,
  MapPin,
  Landmark,
  Calendar,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Camera,
} from 'lucide-react';
import { HeritageSite, Kingdom, HistoricalSource } from '../types/atlas';
import { SITE_TYPE_LABELS } from '../utils/historyLogic';

interface SiteDetailModalProps {
  site: HeritageSite | null;
  onClose: () => void;
  kingdoms: Kingdom[];
  sources: HistoricalSource[];
  onViewOnMap: (site: HeritageSite) => void;
  onSelectKingdom: (kingdom: Kingdom) => void;
}

const SITE_TYPE_EMOJIS: Record<string, string> = {
  mosque: '🕌',
  palace: '🏛️',
  tomb: '⚱️',
  fortress: '🏰',
  complex: '🏛️',
};

export const SiteDetailModal: React.FC<SiteDetailModalProps> = ({
  site,
  onClose,
  kingdoms,
  sources,
  onViewOnMap,
  onSelectKingdom,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!site) return null;

  const associatedKingdoms = kingdoms.filter((k) => site.kingdom_ids.includes(k.id));
  const associatedSources = sources.filter((s) => site.source_ids.includes(s.id));

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${site.latitude}, ${site.longitude}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-site-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-[#F4F0E6] text-[#172B36] w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-[#426B60] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Archival Architectural Header (No Fake Stock Photos) */}
        <div className="relative bg-gradient-to-br from-[#172B36] via-[#1d3846] to-[#426B60] p-6 sm:p-8 border-b-2 border-[#B58B4D]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B58B4D_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F4F0E6]/80 hover:text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors z-10"
            aria-label="Tutup rincian situs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-[#B58B4D]/20 border border-[#B58B4D]/50 flex items-center justify-center text-lg">
                {SITE_TYPE_EMOJIS[site.type] || '🕌'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#426B60] text-white border border-emerald-400/40">
                {SITE_TYPE_LABELS[site.type] || site.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B58B4D] text-[#172B36]">
                Status Verifikasi: {site.verificationStatus}
              </span>
            </div>

            <h2
              id="modal-site-title"
              className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F0E6] leading-tight"
            >
              {site.name}
            </h2>

            <p className="text-xs text-[#B58B4D] font-medium">
              {site.condition_status}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(92vh-250px)] text-xs sm:text-sm">
          {/* Verified Documentary / Archival Photograph (if available) */}
          {site.imageUrl && (
            <figure className="bg-[#172B36] rounded-xl overflow-hidden border-2 border-[#B58B4D]/50 shadow-md">
              <div className="relative h-56 sm:h-64 w-full bg-[#0f1e26] overflow-hidden">
                <img
                  src={site.imageUrl}
                  alt={site.imageCaption || site.name}
                  className="w-full h-full object-cover object-center"
                />
                {site.imageLicense && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 text-[#F4F0E6] text-[10px] font-semibold backdrop-blur-xs border border-[#B58B4D]/40">
                    Lisensi: {site.imageLicense}
                  </span>
                )}
              </div>
              <figcaption className="p-3.5 bg-[#172B36] text-[#F4F0E6] border-t border-[#B58B4D]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  {site.imageCaption && (
                    <p className="font-medium text-[#F4F0E6] leading-snug">{site.imageCaption}</p>
                  )}
                  <p className="text-[11px] text-[#B58B4D] flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 shrink-0" />
                    <span>{site.imageAttribution}</span>
                  </p>
                </div>
                {site.imageSourceUrl && (
                  <a
                    href={site.imageSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#B58B4D]/20 hover:bg-[#B58B4D]/30 text-[#B58B4D] border border-[#B58B4D]/40 text-[11px] font-semibold flex items-center gap-1.5 shrink-0 self-start sm:self-center transition-colors"
                  >
                    <span>Sumber Wikimedia Commons</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </figcaption>
            </figure>
          )}

          {/* Location & Period Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-[#B58B4D]/30">
            <div className="space-y-1">
              <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#426B60]" /> Lokasi Administratif & Koordinat
              </div>
              <div className="font-semibold text-[#172B36] text-xs">{site.modern_location}</div>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <span>
                  GPS: {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                </span>
                <button
                  onClick={copyCoordinates}
                  className="p-1 hover:text-[#172B36] transition-colors"
                  title="Salin koordinat GPS"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-3 pt-2 sm:pt-0">
              <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#B58B4D]" /> Periode Sejarah / Pendirian
              </div>
              <div className="font-semibold text-[#172B36] text-xs">{site.built_year_display}</div>
              <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Wilayah: {site.region}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-[#172B36]">
              Peran Sejarah & Nilai Cagar Budaya
            </h4>
            <p className="text-gray-800 leading-relaxed text-xs sm:text-sm bg-white/80 p-4 rounded-xl border border-[#B58B4D]/20">
              {site.description}
            </p>
          </div>

          {/* Architectural Features */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-[#172B36] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B58B4D]" />
              <span>Karakteristik Arsitektur & Epigrafi</span>
            </h4>
            <p className="text-gray-800 leading-relaxed text-xs sm:text-sm bg-[#eae3d2] p-3.5 rounded-xl border border-[#B58B4D]/30">
              {site.architectural_features}
            </p>
          </div>

          {/* Associated Kingdoms */}
          {associatedKingdoms.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-base text-[#172B36] flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-[#B58B4D]" />
                <span>Terkait dengan Kerajaan / Kesultanan</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {associatedKingdoms.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => {
                      onClose();
                      onSelectKingdom(k);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#172B36] hover:text-[#F4F0E6] text-[#172B36] border border-[#B58B4D]/40 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{k.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#B58B4D]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {associatedSources.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-base text-[#172B36] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#426B60]" />
                <span>Sumber Referensi</span>
              </h4>
              <div className="space-y-1.5">
                {associatedSources.map((source) => (
                  <div
                    key={source.id}
                    className="text-xs text-gray-700 bg-white p-3 rounded-lg border border-[#B58B4D]/30 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-[#172B36]">{source.title}</span> —{' '}
                      {source.authorOrInstitution} ({source.publicationYear})
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#426B60] font-semibold hover:underline shrink-0 flex items-center gap-1"
                      >
                        <span>Buka</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#eae3d2] border-t border-[#426B60]/30 flex justify-between items-center text-xs shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium border border-gray-300"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              onClose();
              onViewOnMap(site);
            }}
            className="px-5 py-2 rounded-lg bg-[#426B60] hover:bg-[#325249] text-white font-semibold flex items-center gap-1.5 shadow"
          >
            <MapPin className="w-4 h-4" />
            <span>Fokuskan ke Peta Interaktif</span>
          </button>
        </div>
      </div>
    </div>
  );
};
