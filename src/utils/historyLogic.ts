import {
  Kingdom,
  HeritageSite,
  FilterState,
  TerritoryFeature,
  SiteType,
  Ruler,
} from '../types/atlas';
import { rulersData } from '../data/rulersData';
import { sitesData } from '../data/sitesData';

export const SITE_TYPE_LABELS: Record<SiteType, string> = {
  mosque: 'Masjid Kuno',
  palace: 'Keraton & Istana',
  tomb: 'Kompleks Makam',
  fortress: 'Benteng Pertahanan',
  complex: 'Kompleks Situs',
};

/**
 * Exact chronological founding years (Tahun Hadirnya Kerajaan) across the 17 Islamic Kingdoms in Nusantara.
 */
export const KINGDOM_FOUNDING_YEARS: readonly number[] = [
  840, 1267, 1478, 1479, 1486, 1495, 1496, 1526, 1542, 1575, 1584, 1605, 1611, 1621, 1659, 1723,
  1771,
];

export interface FoundingPhaseInfo {
  id: 'phase_1' | 'phase_2' | 'phase_3' | 'phase_4';
  label: string;
  shortLabel: string;
  rangeLabel: string;
  bgColor: string;
  borderColor: string;
  badgeTextColor: string;
}

/**
 * Returns cartographic visual styling based on the kingdom's founding year (Tahun Hadirnya Kerajaan).
 */
export function getKingdomFoundingPhase(foundedYear: number): FoundingPhaseInfo {
  if (foundedYear <= 1300) {
    return {
      id: 'phase_1',
      label: 'Fase I: Awal Islamisasi Pesisir',
      shortLabel: 'Abad 9–13 M',
      rangeLabel: '840–1300 M',
      bgColor: '#b45309',
      borderColor: '#fbbf24',
      badgeTextColor: '#fde68a',
    };
  }
  if (foundedYear <= 1500) {
    return {
      id: 'phase_2',
      label: 'Fase II: Bandar Pasisir & Rempah',
      shortLabel: 'Abad 15 M',
      rangeLabel: '1475–1500 M',
      bgColor: '#047857',
      borderColor: '#34d399',
      badgeTextColor: '#a7f3d0',
    };
  }
  if (foundedYear <= 1600) {
    return {
      id: 'phase_3',
      label: 'Fase III: Ekspansi Kesultanan Maritim',
      shortLabel: 'Abad 16 M',
      rangeLabel: '1501–1600 M',
      bgColor: '#0369a1',
      borderColor: '#38bdf8',
      badgeTextColor: '#bae6fd',
    };
  }
  return {
    id: 'phase_4',
    label: 'Fase IV: Konsolidasi Kesultanan Nusantara',
    shortLabel: 'Abad 17–18 M',
    rangeLabel: '1601–1771 M',
    bgColor: '#6d28d9',
    borderColor: '#c084fc',
    badgeTextColor: '#ddd6fe',
  };
}

/**
 * Checks if a kingdom has already appeared / been founded by the specified year (year >= founded_year).
 */
export function isKingdomPresentByYear(kingdom: Kingdom, year: number): boolean {
  const start = kingdom.founded ?? kingdom.founded_year;
  if (start === null || start === undefined) return false;
  return year >= start;
}

/**
 * Checks if a kingdom was founded in the exact specified year (founded_year === year).
 */
export function isKingdomFoundedInYear(kingdom: Kingdom, year: number): boolean {
  const start = kingdom.founded ?? kingdom.founded_year;
  return start === year;
}

/**
 * Checks if a kingdom was politically or historically active during the specified year.
 * An empty ended year is treated as ongoing cultural/swapraja continuity up to 1960/2026.
 */
export function isKingdomActiveInYear(kingdom: Kingdom, year: number): boolean {
  const start = kingdom.founded ?? kingdom.founded_year;
  if (start === null || start === undefined) return false;
  const end = kingdom.ended ?? kingdom.ended_year ?? 2026;
  return year >= start && year <= end;
}

/**
 * Checks if a heritage site had been built by the specified year.
 */
export function isSiteActiveInYear(site: HeritageSite, year: number): boolean {
  return year >= site.built_year;
}

/**
 * Checks if a historical territory polygon was active in the specified year.
 */
export function isTerritoryActiveInYear(territory: TerritoryFeature, year: number): boolean {
  return year >= territory.properties.year_start && year <= territory.properties.year_end;
}

/**
 * Returns the ruler(s) / sultan(s) reigning in a given kingdom during the specified year.
 */
export function getActiveRulersInYear(
  rulers: Ruler[],
  kingdomId: string,
  year: number
): Ruler[] {
  return rulers.filter(
    (r) =>
      r.kingdom_id === kingdomId &&
      r.reign_start !== null &&
      year >= r.reign_start &&
      (r.reign_end === null || year <= r.reign_end)
  );
}

/**
 * Checks if a kingdom overlaps with a given year range [minYear, maxYear].
 */
export function isKingdomInYearRange(kingdom: Kingdom, minYear: number, maxYear: number): boolean {
  const start = kingdom.founded ?? kingdom.founded_year;
  if (start === null || start === undefined) return true;
  const end = kingdom.ended ?? kingdom.ended_year ?? 2026;
  return start <= maxYear && end >= minYear;
}

/**
 * Filters kingdoms based on user criteria:
 * entityType, region, yearRange, certainty (verified, estimated, unverified),
 * and search query (matches kingdom name, alternate names, ruler/sultan name, related site name, region, or historical keywords).
 */
export function filterKingdoms(kingdoms: Kingdom[], filter: FilterState): Kingdom[] {
  if (filter.entityType === 'site') {
    return [];
  }

  return kingdoms.filter((kd) => {
    // 1. Region filter
    if (filter.regions.length > 0 && !filter.regions.includes(kd.region)) {
      return false;
    }

    // 2. Year Range filter
    if (!isKingdomInYearRange(kd, filter.yearRange[0], filter.yearRange[1])) {
      return false;
    }

    // 3. Certainty filter (Terverifikasi / Perkiraan / Belum terverifikasi)
    if (
      filter.certaintyLevels.length > 0 &&
      !filter.certaintyLevels.includes(kd.founded_certainty)
    ) {
      return false;
    }

    // 4. Search query (nama kerajaan, nama sultan, nama situs, nama wilayah, kata kunci sejarah)
    if (filter.searchQuery.trim().length > 0) {
      const q = filter.searchQuery.toLowerCase().trim();
      const matchName = kd.name.toLowerCase().includes(q);
      const matchAlt = kd.alternate_names.some((alt) => alt.toLowerCase().includes(q));
      const matchCapital = kd.capital.toLowerCase().includes(q);
      const matchProvince = kd.modern_province.toLowerCase().includes(q);
      const matchRegion = kd.region.toLowerCase().includes(q);
      const matchSummary =
        kd.summary.toLowerCase().includes(q) ||
        kd.political_history.toLowerCase().includes(q) ||
        kd.economic_network.toLowerCase().includes(q) ||
        kd.cultural_legacy.toLowerCase().includes(q);

      // Match ruler / sultan names belonging to this kingdom
      const kingdomRulers = kd.rulers?.length
        ? kd.rulers
        : rulersData.filter((r) => r.kingdom_id === kd.id);
      const matchRuler = kingdomRulers.some(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.highlight_achievement.toLowerCase().includes(q)
      );

      // Match heritage site names linked to this kingdom
      const kingdomSites = sitesData.filter((s) => s.kingdom_ids.includes(kd.id));
      const matchSite = kingdomSites.some(
        (s) => s.name.toLowerCase().includes(q) || s.modern_location.toLowerCase().includes(q)
      );

      if (
        !matchName &&
        !matchAlt &&
        !matchCapital &&
        !matchProvince &&
        !matchRegion &&
        !matchSummary &&
        !matchRuler &&
        !matchSite
      ) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Filters heritage sites based on entityType, site types, region, certainty, active kingdom,
 * chronological construction year (built_year), and search query.
 */
export function filterSites(
  sites: HeritageSite[],
  filter: FilterState,
  visibleKingdomIds?: Set<string>,
  activeTimeSeriesYear?: number | null
): HeritageSite[] {
  if (filter.entityType === 'kingdom') {
    return [];
  }

  return sites.filter((site) => {
    // 1. Region filter
    if (filter.regions.length > 0 && !filter.regions.includes(site.region as any)) {
      return false;
    }

    // 2. Site Type filter
    if (filter.siteTypes.length > 0 && !filter.siteTypes.includes(site.type)) {
      return false;
    }

    // 3. Certainty filter
    if (filter.certaintyLevels.length > 0 && !filter.certaintyLevels.includes(site.certainty)) {
      return false;
    }

    // 4. Chronological & Time-Series synchronization:
    // A site only appears on or after its historical construction year (built_year).
    if (activeTimeSeriesYear !== undefined && activeTimeSeriesYear !== null) {
      if (!isSiteActiveInYear(site, activeTimeSeriesYear)) {
        return false;
      }
    } else {
      // In era range mode [minYear, maxYear], site must have been built by maxYear
      if (site.built_year > filter.yearRange[1]) {
        return false;
      }
    }

    // 5. Specific Kingdom filter or visible kingdoms synchronization
    if (filter.activeKingdomId) {
      if (!site.kingdom_ids.includes(filter.activeKingdomId)) {
        return false;
      }
      if (
        visibleKingdomIds !== undefined &&
        filter.entityType !== 'site' &&
        !site.kingdom_ids.some((id) => visibleKingdomIds.has(id))
      ) {
        return false;
      }
    } else if (
      visibleKingdomIds !== undefined &&
      filter.entityType !== 'site' &&
      filter.searchQuery.trim().length === 0
    ) {
      const matchesVisibleKingdom = site.kingdom_ids.some((id) => visibleKingdomIds.has(id));
      if (!matchesVisibleKingdom) {
        return false;
      }
    }

    // 6. Search query (nama situs, lokasi, deskripsi, atau nama kerajaan/sultan terkait)
    if (filter.searchQuery.trim().length > 0) {
      const q = filter.searchQuery.toLowerCase().trim();
      const matchName = site.name.toLowerCase().includes(q);
      const matchDesc = site.description.toLowerCase().includes(q);
      const matchLoc = site.modern_location.toLowerCase().includes(q);
      const matchRegion = site.region.toLowerCase().includes(q);
      const matchArch = site.architectural_features.toLowerCase().includes(q);
      const matchKingdom =
        visibleKingdomIds !== undefined && site.kingdom_ids.some((id) => visibleKingdomIds.has(id));

      if (!matchName && !matchDesc && !matchLoc && !matchRegion && !matchArch && !matchKingdom) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Filters territory polygons so they only appear when their parent kingdom is visible
 * AND the active year (or year range) matches the territory's historical period [year_start, year_end].
 */
export function filterTerritories(
  territories: TerritoryFeature[],
  visibleKingdomIds: Set<string>,
  filter: FilterState,
  activeTimeSeriesYear?: number | null
): TerritoryFeature[] {
  return territories.filter((t) => {
    if (!visibleKingdomIds.has(t.properties.kingdom_id)) {
      return false;
    }
    if (activeTimeSeriesYear !== undefined && activeTimeSeriesYear !== null) {
      return isTerritoryActiveInYear(t, activeTimeSeriesYear);
    }
    return (
      t.properties.year_start <= filter.yearRange[1] &&
      t.properties.year_end >= filter.yearRange[0]
    );
  });
}

/**
 * Calculate authentic stats for current view.
 */
export function getAtlasStats(
  kingdoms: Kingdom[],
  sites: HeritageSite[],
  territories: TerritoryFeature[]
) {
  const uniqueRegions = new Set(kingdoms.map((k) => k.region)).size;
  return {
    totalKingdoms: kingdoms.length,
    totalSites: sites.length,
    totalRegions: uniqueRegions,
    totalTerritories: territories.length,
  };
}

/**
 * Format year representation with historical precision.
 */
export function formatReignYear(start: number | null, end: number | null): string {
  if (start === null && end === null) return 'Tarikh tidak tercatat';
  if (start !== null && end === null) return `${start} M — masa kini`;
  if (start === null && end !== null) return `hingga ${end} M`;
  return `${start} — ${end} M`;
}
