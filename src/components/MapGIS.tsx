import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, RotateCcw, AlertCircle, Crown } from 'lucide-react';
import { Kingdom, HeritageSite, TerritoryFeature } from '../types/atlas';
import { SITE_TYPE_LABELS, getActiveRulersInYear } from '../utils/historyLogic';
import { CompassRose } from './CompassRose';

interface MapGISProps {
  kingdoms: Kingdom[];
  sites: HeritageSite[];
  territories: TerritoryFeature[];
  selectedKingdom: Kingdom | null;
  onSelectKingdom: (kingdom: Kingdom) => void;
  onSelectSite: (site: HeritageSite) => void;
  focusLocation: { lat: number; lng: number; zoom?: number } | null;
  onResetFocus: () => void;
  activeTimeSeriesYear?: number | null;
}

type BasemapType = 'carto-sepia' | 'osm-standard' | 'satellite';

const SITE_TYPE_ICONS: Record<string, string> = {
  mosque: '🕌',
  palace: '🏛️',
  tomb: '⚱️',
  fortress: '🏰',
  complex: '🏛️',
};

export const MapGIS: React.FC<MapGISProps> = ({
  kingdoms,
  sites,
  territories,
  selectedKingdom,
  onSelectKingdom,
  onSelectSite,
  focusLocation,
  onResetFocus,
  activeTimeSeriesYear = null,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const kingdomLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const siteLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const territoryLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Layer visibility state
  const [showKingdoms, setShowKingdoms] = useState(true);
  const [showSites, setShowSites] = useState(true);
  const [showTerritories, setShowTerritories] = useState(true);
  const [basemap, setBasemap] = useState<BasemapType>('carto-sepia');
  const [showLegend, setShowLegend] = useState(true);
  const [showMobileLayers, setShowMobileLayers] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center of Indonesia archipelago
    const initialCenter: [number, number] = [-2.2, 117.5];
    const initialZoom = 5;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
    });

    // Add scale bar
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Zoom control at bottom left
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    // Layer groups (territories at bottom, then sites, then kingdoms on top)
    const territoryGroup = L.layerGroup().addTo(map);
    const siteGroup = L.layerGroup().addTo(map);
    const kingdomGroup = L.layerGroup().addTo(map);

    territoryLayerGroupRef.current = territoryGroup;
    siteLayerGroupRef.current = siteGroup;
    kingdomLayerGroupRef.current = kingdomGroup;
    mapInstanceRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 120);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Basemap Switch
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';
    let className = '';

    if (basemap === 'satellite') {
      url =
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri, Maxar, Earthstar Geographics | &copy; OpenStreetMap';
    } else if (basemap === 'osm-standard') {
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
    } else {
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors | Tema Kertas Arsip Nusantara';
      className = 'archival-sepia-tiles';
    }

    const newTile = L.tileLayer(url, {
      attribution,
      maxZoom: 19,
      className,
    }).addTo(map);

    tileLayerRef.current = newTile;
  }, [basemap]);

  // Update Territories Layer (GeoJSON Polygon -> Leaflet LatLngs)
  useEffect(() => {
    const group = territoryLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!showTerritories) return;

    territories.forEach((feat) => {
      const props = feat.properties;
      const isRelatedToSelected = selectedKingdom?.id === props.kingdom_id;

      // Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
      const latLngRings: L.LatLngExpression[][] = feat.geometry.coordinates.map((ring) =>
        ring.map(([lng, lat]) => [lat, lng] as [number, number])
      );

      const polygon = L.polygon(latLngRings, {
        color: isRelatedToSelected ? '#B58B4D' : '#426B60',
        weight: isRelatedToSelected ? 3 : 2,
        dashArray: isRelatedToSelected ? undefined : '6, 6',
        fillColor: isRelatedToSelected ? '#B58B4D' : '#426B60',
        fillOpacity: isRelatedToSelected ? 0.32 : 0.16,
      });

      polygon.bindTooltip(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px; max-width:260px; white-space:normal;">
          <div style="font-weight:700; color:#172B36; font-size:12px;">${props.period_label}</div>
          <div style="font-size:10px; color:#555; margin-top:2px;">Periode: ${props.year_start}–${props.year_end} M</div>
          <div style="font-size:10px; color:#8e6d38; font-weight:600; margin-top:2px;">Status: ${props.verificationStatus || 'Perkiraan'} (${props.cartographer || 'Rekonstruksi Akademik'})</div>
        </div>`,
        { sticky: true, opacity: 0.96 }
      );

      polygon.on('click', () => {
        const matchedKingdom = kingdoms.find((k) => k.id === props.kingdom_id);
        if (matchedKingdom) {
          onSelectKingdom(matchedKingdom);
        }
      });

      polygon.addTo(group);
    });
  }, [territories, showTerritories, selectedKingdom, kingdoms, onSelectKingdom]);

  // Update Kingdom Markers Layer (Prioritized on top with zIndexOffset: 1000)
  useEffect(() => {
    const group = kingdomLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!showKingdoms) return;

    kingdoms.forEach((kd) => {
      const isSelected = selectedKingdom?.id === kd.id;
      const isGoldenAge =
        activeTimeSeriesYear !== null &&
        activeTimeSeriesYear >= kd.golden_age_start &&
        activeTimeSeriesYear <= kd.golden_age_end;

      const borderBadgeColor =
        kd.founded_certainty === 'verified'
          ? '#B58B4D'
          : kd.founded_certainty === 'estimated'
          ? '#d97706'
          : '#94a3b8';

      const sizePx = isSelected ? 40 : isGoldenAge ? 36 : 32;
      const halfPx = sizePx / 2;

      const boxShadow = isSelected
        ? '0 0 0 6px rgba(181,139,77,0.55), 0 6px 16px rgba(23,43,54,0.6)'
        : isGoldenAge
        ? '0 0 0 5px rgba(181,139,77,0.45), 0 4px 12px rgba(23,43,54,0.5)'
        : '0 4px 10px rgba(23,43,54,0.45)';

      const shortLabel = kd.name
        .replace('Kesultanan ', '')
        .replace(' (Peureulak)', '')
        .replace(' (Makassar)', '')
        .replace(' (Wolio)', '')
        .replace(' ing Martadipura', '');

      const markerHtml = `
        <div class="custom-kingdom-marker" style="position: relative; width: ${sizePx}px; height: ${sizePx}px;">
          <div style="
            width: ${sizePx}px;
            height: ${sizePx}px;
            background: ${isSelected ? '#B58B4D' : isGoldenAge ? '#223d4c' : '#172B36'};
            border: 2.5px solid ${isSelected || isGoldenAge ? '#fbbf24' : borderBadgeColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: ${boxShadow};
            cursor: pointer;
          ">
            <span style="font-size: ${isSelected ? '17px' : '14px'}; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.6));">
              👑
            </span>
          </div>
          <div style="
            position: absolute;
            top: ${sizePx + 2}px;
            left: 50%;
            transform: translateX(-50%);
            background: ${isSelected || isGoldenAge ? '#172B36' : 'rgba(23,43,54,0.88)'};
            color: ${isGoldenAge ? '#fbbf24' : '#F4F0E6'};
            border: 1px solid ${isGoldenAge ? '#B58B4D' : 'rgba(181,139,77,0.45)'};
            padding: 1px 5px;
            border-radius: 4px;
            font-size: 9.5px;
            font-weight: 700;
            white-space: nowrap;
            pointer-events: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.25);
          ">
            ${shortLabel}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'kingdom-marker-div',
        html: markerHtml,
        iconSize: [sizePx, sizePx],
        iconAnchor: [halfPx, halfPx],
      });

      const marker = L.marker([kd.latitude, kd.longitude], {
        icon,
        zIndexOffset: isSelected ? 2000 : 1000,
      });

      const activeRulers =
        activeTimeSeriesYear !== null
          ? getActiveRulersInYear(kd.rulers || [], kd.id, activeTimeSeriesYear)
          : [];

      marker.bindTooltip(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif; text-align:center; padding:3px 6px;">
          <strong style="color:#172B36; font-size:12px;">${kd.name}</strong>
          <div style="font-size:10px; color:#8e6d38; font-weight:600;">${kd.capital} &bull; Aktif: ${kd.founded_year}–${kd.ended_year || 'kini'} M</div>
          ${
            activeRulers.length > 0
              ? `<div style="font-size:9.5px; color:#172B36; font-weight:700;">👑 Sultan (${activeTimeSeriesYear} M): ${activeRulers[0].name}</div>`
              : ''
          }
          ${
            isGoldenAge
              ? '<div style="font-size:9.5px; color:#b45309; font-weight:700;">★ Sedang dalam Masa Kejayaan (' +
                kd.golden_age_start +
                '–' +
                kd.golden_age_end +
                ' M)</div>'
              : `<div style="font-size:9px; color:#426B60; font-weight:600;">Status: ${kd.verificationStatus}</div>`
          }
        </div>`,
        { direction: 'top', offset: [0, -18], opacity: 0.97 }
      );

      marker.on('click', () => {
        onSelectKingdom(kd);
      });

      marker.addTo(group);
    });
  }, [kingdoms, showKingdoms, selectedKingdom, onSelectKingdom, activeTimeSeriesYear]);

  // Update Site Markers Layer (Offset slightly to the top-right shoulder when sharing city coords with a kingdom)
  useEffect(() => {
    const group = siteLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!showSites) return;

    sites.forEach((site) => {
      const iconEmoji = SITE_TYPE_ICONS[site.type] || '🕌';
      const typeLabel = SITE_TYPE_LABELS[site.type] || site.type;

      // Check if this site shares exact coordinates with any visible kingdom
      const overlapsKingdom = kingdoms.some(
        (k) =>
          Math.abs(k.latitude - site.latitude) < 0.01 &&
          Math.abs(k.longitude - site.longitude) < 0.01
      );

      const markerHtml = `
        <div class="custom-site-marker" style="
          width: 24px;
          height: 24px;
          background: #426B60;
          border: 1.5px solid #FFFFFF;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          transform: rotate(45deg);
          cursor: pointer;
        ">
          <div style="transform: rotate(-45deg); font-size: 11px; color: white;">
            ${iconEmoji}
          </div>
        </div>
      `;

      // If co-located with a kingdom marker, offset anchor so the site diamond sits clearly to the upper-right of the crown
      const icon = L.divIcon({
        className: 'site-marker-div',
        html: markerHtml,
        iconSize: [24, 24],
        iconAnchor: overlapsKingdom ? [-8, 26] : [12, 12],
      });

      const marker = L.marker([site.latitude, site.longitude], {
        icon,
        zIndexOffset: 500,
      });

      marker.bindTooltip(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif; padding:2px 4px;">
          <strong style="color:#172B36; font-size:11px;">${site.name}</strong>
          <div style="font-size:10px; color:#8e6d38; font-weight:700;">Didirikan: ${site.built_year} M</div>
          <div style="font-size:10px; color:#426B60; font-weight:600;">${typeLabel} &bull; ${site.verificationStatus}</div>
          <div style="font-size:9px; color:#666;">${site.modern_location}</div>
        </div>`,
        { direction: 'top', offset: overlapsKingdom ? [20, -24] : [0, -12], opacity: 0.96 }
      );

      marker.on('click', () => {
        onSelectSite(site);
      });

      marker.addTo(group);
    });
  }, [sites, showSites, kingdoms, onSelectSite]);

  // Respond to focus changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !focusLocation) return;

    map.flyTo([focusLocation.lat, focusLocation.lng], focusLocation.zoom || 9, {
      duration: 1.2,
    });
  }, [focusLocation]);

  const handleResetToIndonesia = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    onResetFocus();
    map.flyTo([-2.2, 117.5], 5, { duration: 1.0 });
  };

  return (
    <div className="relative flex-1 w-full h-full min-h-0 bg-[#eae3d2] overflow-hidden">
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full z-0"
        tabIndex={0}
        aria-label="Peta Interaktif Sejarah Islam Nusantara"
      />

      {/* Active Time-Series Floating Year Watermark Badge (Top Center of Map) */}
      {activeTimeSeriesYear !== null && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:flex items-center gap-2.5 bg-[#172B36]/92 backdrop-blur-md text-[#F4F0E6] px-4 py-1.5 rounded-full shadow-xl border border-[#B58B4D]/60">
          <Crown className="w-4 h-4 text-[#B58B4D]" />
          <span className="font-serif font-bold text-base text-[#B58B4D]">
            Tahun {activeTimeSeriesYear} M
          </span>
          <span className="text-gray-400">&bull;</span>
          <span className="text-xs font-medium text-emerald-300">
            {kingdoms.length} Kesultanan
          </span>
          <span className="text-gray-400">&bull;</span>
          <span className="text-xs font-medium text-amber-200">
            {sites.length} Situs
          </span>
          {territories.length > 0 && (
            <>
              <span className="text-gray-400">&bull;</span>
              <span className="text-xs font-medium text-[#B58B4D]">
                {territories.length} Zona Wilayah
              </span>
            </>
          )}
        </div>
      )}

      {/* COMPASS ROSE (ORIENTASI MATA ANGIN) - Bottom Left above Zoom/Scale controls */}
      <div className="absolute bottom-24 left-3 sm:left-4 z-10">
        <CompassRose onResetNorth={handleResetToIndonesia} />
      </div>

      {/* Top Right Map Control Bar */}
      <div className="absolute top-3 right-3 sm:right-4 z-10 flex flex-col items-end gap-2">
        {/* Mobile controls toggle button */}
        <button
          onClick={() => setShowMobileLayers((prev) => !prev)}
          className="sm:hidden px-3 py-1.5 bg-[#172B36] text-[#F4F0E6] rounded-md shadow-lg border border-[#B58B4D]/40 text-xs flex items-center gap-1.5"
          title="Tampilkan Lapisan & Kontrol Peta"
        >
          <Layers className="w-3.5 h-3.5 text-[#B58B4D]" />
          <span>Layer & Peta Dasar</span>
        </button>

        {/* Basemap Switcher & Layer Toggles Panel */}
        <div
          className={`${
            showMobileLayers ? 'block' : 'hidden'
          } sm:block bg-[#172B36]/95 backdrop-blur text-[#F4F0E6] p-2.5 rounded-lg shadow-xl border border-[#B58B4D]/40 text-xs space-y-2`}
        >
          {/* Basemap buttons */}
          <div className="flex items-center gap-1 bg-[#12222b] p-1 rounded">
            <button
              onClick={() => setBasemap('carto-sepia')}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                basemap === 'carto-sepia'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/70 hover:text-white'
              }`}
              title="Tampilan Arsip Kertas Kartografi"
            >
              Arsip Kartografi
            </button>
            <button
              onClick={() => setBasemap('osm-standard')}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                basemap === 'osm-standard'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/70 hover:text-white'
              }`}
              title="OpenStreetMap Standar"
            >
              Topografi
            </button>
            <button
              onClick={() => setBasemap('satellite')}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                basemap === 'satellite'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/70 hover:text-white'
              }`}
              title="Citra Satelit Geografis"
            >
              Satelit
            </button>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="space-y-1 pt-1 border-t border-[#B58B4D]/20 text-[11px]">
            <label className="flex items-center justify-between gap-3 cursor-pointer hover:text-white p-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B58B4D] inline-block"></span>
                Pusat Kerajaan ({kingdoms.length})
              </span>
              <input
                type="checkbox"
                checked={showKingdoms}
                onChange={(e) => setShowKingdoms(e.target.checked)}
                className="accent-[#B58B4D]"
              />
            </label>

            <label className="flex items-center justify-between gap-3 cursor-pointer hover:text-white p-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rotate-45 bg-[#426B60] inline-block border border-white"></span>
                Situs Peninggalan ({sites.length})
              </span>
              <input
                type="checkbox"
                checked={showSites}
                onChange={(e) => setShowSites(e.target.checked)}
                className="accent-[#426B60]"
              />
            </label>

            <label className="flex items-center justify-between gap-3 cursor-pointer hover:text-white p-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1.5 border border-dashed border-[#B58B4D] bg-[#B58B4D]/30 inline-block"></span>
                Zona Pengaruh Historis ({territories.length})
              </span>
              <input
                type="checkbox"
                checked={showTerritories}
                onChange={(e) => setShowTerritories(e.target.checked)}
                className="accent-[#B58B4D]"
              />
            </label>
          </div>
        </div>

        {/* Reset View Button */}
        <button
          onClick={handleResetToIndonesia}
          className="px-2.5 py-1.5 bg-[#172B36]/90 hover:bg-[#172B36] text-[#F4F0E6] rounded-md shadow-lg border border-[#B58B4D]/40 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Kembalikan pandangan ke seluruh Indonesia"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#B58B4D]" />
          <span className="hidden sm:inline">Reset Pandangan</span>
        </button>
      </div>

      {/* Floating Dynamic Legend at Bottom Right */}
      {showLegend ? (
        <div className="absolute bottom-6 right-3 sm:right-4 z-10 bg-[#F4F0E6]/95 backdrop-blur text-[#172B36] p-2.5 rounded-lg shadow-xl border border-[#B58B4D]/60 max-w-[260px] text-xs">
          <div className="flex items-center justify-between font-serif font-bold text-xs pb-1 mb-1.5 border-b border-[#B58B4D]/30">
            <span>Legenda Peta Sejarah</span>
            <button
              onClick={() => setShowLegend(false)}
              className="text-gray-500 hover:text-black text-[10px] cursor-pointer"
            >
              Sembunyikan
            </button>
          </div>
          <div className="space-y-1.5 text-[10.5px]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#172B36] border border-[#B58B4D] flex items-center justify-center text-[10px] text-white shrink-0">
                👑
              </div>
              <span>Pusat Kedaulatan Kerajaan / Kesultanan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm rotate-45 bg-[#426B60] border border-white flex items-center justify-center text-[8px] text-white shrink-0 ml-0.5">
                <span className="-rotate-45">🕌</span>
              </div>
              <span>Situs Warisan (Masjid, Makam, Keraton, Benteng)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 bg-[#426B60]/25 border border-dashed border-[#426B60] rounded-sm shrink-0"></div>
              <span>Perkiraan Zona Pengaruh Maritim/Mandala</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowLegend(true)}
          className="absolute bottom-6 right-3 sm:right-4 z-10 bg-[#F4F0E6] text-[#172B36] px-2.5 py-1 rounded shadow-md border border-[#B58B4D]/60 text-[11px] font-medium cursor-pointer"
        >
          Buka Legenda
        </button>
      )}

      {/* Empty State Banner if 0 items match filter */}
      {kingdoms.length === 0 && sites.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#172B36]/95 text-[#F4F0E6] p-6 rounded-2xl shadow-2xl border-2 border-[#B58B4D] max-w-md text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-[#B58B4D] mx-auto" />
          <h4 className="font-serif text-lg font-bold">Tidak Ada Kerajaan Aktif pada Kriteria Ini</h4>
          <p className="text-xs text-[#F4F0E6]/80 leading-relaxed">
            Tidak ditemukan kerajaan atau situs yang sesuai dengan tahun atau filter terpilih. Geser garis waktu di bawah atau klik tombol reset.
          </p>
          <button
            onClick={handleResetToIndonesia}
            className="px-4 py-2 bg-[#B58B4D] text-[#172B36] font-bold rounded-lg text-xs hover:bg-[#8e6d38] transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};
