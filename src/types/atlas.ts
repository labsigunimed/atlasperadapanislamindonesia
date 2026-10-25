export type Region =
  | 'Sumatera'
  | 'Jawa'
  | 'Kalimantan'
  | 'Sulawesi'
  | 'Maluku & Nusa Tenggara';

export type CertaintyLevel = 'verified' | 'estimated' | 'unverified';

export type VerificationStatusLabel =
  | 'Terverifikasi'
  | 'Perkiraan'
  | 'Belum terverifikasi';

export type SiteType = 'mosque' | 'palace' | 'tomb' | 'fortress' | 'complex';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HistoricalContext {
  politics: string;
  economy: string;
  maritime: string;
  cultureAndReligion: string;
}

export interface DisputedClaim {
  claimTopic: string;
  versionA: string;
  versionB: string;
  sourceIds: string[];
}

export interface GeoJSONPolygonGeometry {
  type: 'Polygon';
  coordinates: number[][][];
}

export interface HistoricalSource {
  id: string;
  title: string;
  author: string;
  authorOrInstitution: string;
  year: string;
  publicationYear: string;
  type:
    | 'academic_book'
    | 'journal_article'
    | 'chronicle'
    | 'epigraphy'
    | 'official_heritage_registry';
  sourceType: string;
  url?: string;
  accessDate: string;
  supports: string[];
  notes: string;
  reliabilityNotes: string;
}

export interface Ruler {
  id: string;
  kingdom_id: string;
  kingdomId: string;
  name: string;
  title: string;
  reign_start: number | null;
  startYear: number | null;
  reign_end: number | null;
  endYear: number | null;
  reign_display: string;
  certainty: CertaintyLevel;
  verificationStatus: VerificationStatusLabel;
  order_index: number;
  highlight_achievement: string;
  notes: string;
  source_ids: string[];
  sourceIds: string[];
}

export interface HeritageSite {
  id: string;
  name: string;
  type: SiteType;
  siteType: SiteType;
  kingdom_ids: string[];
  relatedKingdomIds: string[];
  region: string;
  modern_location: string;
  locationDescription: string;
  latitude: number;
  longitude: number;
  coordinates: Coordinates;
  built_year: number;
  built_year_display: string;
  historicalPeriod: string;
  condition_status: string;
  description: string;
  architectural_features: string;
  certainty: CertaintyLevel;
  verificationStatus: VerificationStatusLabel;
  source_ids: string[];
  sourceIds: string[];
  imageUrl?: string;
  imageCaption?: string;
  imageAttribution?: string;
  imageLicense?: string;
  imageSourceUrl?: string;
}

export interface TerritoryFeature {
  type: 'Feature';
  properties: {
    id: string;
    kingdom_id: string;
    period_label: string;
    year_start: number;
    year_end: number;
    certainty: CertaintyLevel;
    verificationStatus?: VerificationStatusLabel;
    historicalMapSource: string;
    cartographer: string;
    mapYear: string;
    reconstruction_method: string;
    uncertaintyNote?: string;
    source_ids: string[];
  };
  geometry: GeoJSONPolygonGeometry;
}

export interface TimelineEvent {
  id: string;
  year: number;
  year_display: string;
  title: string;
  description: string;
  kingdom_ids: string[];
  category:
    | 'founding'
    | 'golden_age'
    | 'treaty_conflict'
    | 'cultural_milestone'
    | 'decline';
  certainty: CertaintyLevel;
  verificationStatus: VerificationStatusLabel;
  isEstimatedYear?: boolean;
  source_ids: string[];
}

export interface Kingdom {
  id: string;
  name: string;
  alternate_names: string[];
  alternateNames: string[];
  polity_type: 'Kesultanan' | 'Kerajaan Islam' | 'Kerajaan Kembar';
  region: Region;
  modern_province: string;
  capital: string;
  centerLocation: string;
  latitude: number;
  longitude: number;
  coordinates: Coordinates;
  coord_certainty: CertaintyLevel;
  founded_year: number;
  founded: number | null;
  founded_display: string;
  foundedDisplay: string;
  founded_certainty: CertaintyLevel;
  golden_age_start: number;
  golden_age_end: number;
  golden_age_display: string;
  goldenAge: string;
  ended_year: number | null;
  ended: number | null;
  ended_display: string;
  endedDisplay: string;
  ended_certainty: CertaintyLevel;
  status_summary: string;
  summary: string;
  historySummary: string;
  political_history: string;
  economic_network: string;
  cultural_legacy: string;
  decline_factors: string;
  historicalContext: HistoricalContext;
  territory_notes: string;
  territoryDescription: string;
  territoryGeometry: GeoJSONPolygonGeometry | null;
  rulers: Ruler[];
  heritageSiteIds: string[];
  source_ids: string[];
  sourceIds: string[];
  disputedClaims: DisputedClaim[];
  verificationStatus: VerificationStatusLabel;
  imageUrl?: string;
  imageCaption?: string;
  imageAttribution?: string;
  imageLicense?: string;
  imageSourceUrl?: string;
}

export interface FilterState {
  regions: Region[];
  yearRange: [number, number];
  siteTypes: SiteType[];
  certaintyLevels: CertaintyLevel[];
  searchQuery: string;
  activeKingdomId: string | null;
  entityType?: 'all' | 'kingdom' | 'site';
}
