import { Kingdom, HeritageSite, FilterState, TerritoryFeature, SiteType } from '../types/atlas';
import { rulersData } from '../data/rulersData';
import { sitesData } from '../data/sitesData';

export const SITE_TYPE_LABELS: Record<SiteType, string> = {
  mosque: 'Masjid Kuno',
  palace: 'Keraton & Istana',
  tomb: 'Kompleks Makam',
  fortress: 'Benteng Pertahanan',
  complex: 'Kompleks Situs'
};

/**
 * Checks if a kingdom was politically or historically active during the specified year.
 * An empty ended year is treated as ongoing cultural/swapraja continuity up to 1950/2026.
 */
export function isKingdomActiveInYear(kingdom: Kingdom, year: number): boolean {
  const start = kingdom.founded ?? kingdom.founded_year;
  if (start === null || start === undefined) return false;
  const end = kingdom.ended ?? kingdom.ended_year ?? 2026;
  return year >= start && year <= end;
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
    if (filter.certaintyLevels.length > 0 && !filter.certaintyLevels.includes(kd.founded_certainty)) {
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
 * Filters heritage sites based on entityType, site types, region, certainty, active kingdom, and search query.
 */
export function filterSites(
  sites: HeritageSite[],
  filter: FilterState,
  visibleKingdomIds?: Set<string>
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

    // 4. Specific Kingdom filter or visible kingdoms
    if (filter.activeKingdomId) {
      if (!site.kingdom_ids.includes(filter.activeKingdomId)) {
        return false;
      }
    } else if (visibleKingdomIds && visibleKingdomIds.size > 0 && filter.searchQuery.trim().length === 0) {
      const matchesVisibleKingdom = site.kingdom_ids.some((id) => visibleKingdomIds.has(id));
      if (!matchesVisibleKingdom) {
        return false;
      }
    }

    // 5. Search query (nama situs, lokasi, deskripsi, atau nama kerajaan/sultan terkait)
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
