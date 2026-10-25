import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isKingdomActiveInYear,
  isKingdomInYearRange,
  isSiteActiveInYear,
  isTerritoryActiveInYear,
  getActiveRulersInYear,
  filterKingdoms,
  filterSites,
  filterTerritories,
  formatReignYear,
  getAtlasStats,
} from './historyLogic';
import { kingdomsData } from '../data/kingdomsData';
import { sitesData } from '../data/sitesData';
import { rulersData } from '../data/rulersData';
import { sourcesData } from '../data/sourcesData';
import { territoriesData } from '../data/territoriesData';
import { eventsData } from '../data/eventsData';
import { FilterState } from '../types/atlas';

test('isKingdomActiveInYear correctly computes active kingdom in year 1300', () => {
  const pasai = kingdomsData.find((k) => k.id === 'kgd_samudera_pasai')!;
  const demak = kingdomsData.find((k) => k.id === 'kgd_demak')!;

  assert.equal(isKingdomActiveInYear(pasai, 1300), true);
  assert.equal(isKingdomActiveInYear(demak, 1300), false);
});

test('isKingdomInYearRange correctly filters overlapping reigns', () => {
  const banten = kingdomsData.find((k) => k.id === 'kgd_banten')!; // 1526 - 1813
  assert.equal(isKingdomInYearRange(banten, 1600, 1700), true);
  assert.equal(isKingdomInYearRange(banten, 1200, 1400), false);
  assert.equal(isKingdomInYearRange(banten, 1850, 1900), false);
});

test('filterKingdoms works for region and kingdom name query', () => {
  const initialFilter: FilterState = {
    regions: ['Sumatera'],
    yearRange: [1200, 1950],
    siteTypes: [],
    certaintyLevels: [],
    searchQuery: 'Pasai',
    activeKingdomId: null,
    entityType: 'all',
  };

  const results = filterKingdoms(kingdomsData, initialFilter);
  assert.ok(results.some((r) => r.id === 'kgd_samudera_pasai'));

  const exactPasaiFilter: FilterState = {
    ...initialFilter,
    searchQuery: 'Nahrasyiyah',
  };
  const exactResults = filterKingdoms(kingdomsData, exactPasaiFilter);
  assert.equal(exactResults.length, 1);
  assert.equal(exactResults[0].id, 'kgd_samudera_pasai');
});

test('filterKingdoms supports searching by Sultan / Ruler name and Heritage Site name', () => {
  const rulerSearchFilter: FilterState = {
    regions: [],
    yearRange: [800, 1950],
    siteTypes: [],
    certaintyLevels: [],
    searchQuery: 'Sultan Baabullah',
    activeKingdomId: null,
    entityType: 'all',
  };

  const byRuler = filterKingdoms(kingdomsData, rulerSearchFilter);
  assert.equal(byRuler.length, 1);
  assert.equal(byRuler[0].id, 'kgd_ternate');

  const siteSearchFilter: FilterState = {
    ...rulerSearchFilter,
    searchQuery: 'Benteng Wolio',
  };
  const bySite = filterKingdoms(kingdomsData, siteSearchFilter);
  assert.equal(bySite.length, 1);
  assert.equal(bySite[0].id, 'kgd_buton');
});

test('filterKingdoms supports all 3 verification statuses (verified, estimated, unverified)', () => {
  const baseFilter: FilterState = {
    regions: [],
    yearRange: [800, 1950],
    siteTypes: [],
    certaintyLevels: ['unverified'],
    searchQuery: '',
    activeKingdomId: null,
    entityType: 'all',
  };

  const unverifiedKingdoms = filterKingdoms(kingdomsData, baseFilter);
  assert.ok(unverifiedKingdoms.some((k) => k.id === 'kgd_perlak'));

  const estimatedKingdoms = filterKingdoms(kingdomsData, {
    ...baseFilter,
    certaintyLevels: ['estimated'],
  });
  assert.ok(estimatedKingdoms.some((k) => k.id === 'kgd_demak'));

  const verifiedKingdoms = filterKingdoms(kingdomsData, {
    ...baseFilter,
    certaintyLevels: ['verified'],
  });
  assert.ok(verifiedKingdoms.some((k) => k.id === 'kgd_aceh'));
});

test('filterSites finds mosques associated with visible kingdoms', () => {
  const filter: FilterState = {
    regions: [],
    yearRange: [1200, 1950],
    siteTypes: ['mosque'],
    certaintyLevels: [],
    searchQuery: '',
    activeKingdomId: 'kgd_demak',
    entityType: 'all',
  };

  const results = filterSites(sitesData, filter);
  assert.equal(results.length, 1);
  assert.ok(results[0].name.includes('Masjid Agung Demak'));
});

test('dataset integrity: valid coordinates, unique IDs, and valid foreign key references', () => {
  const kingdomIds = new Set(kingdomsData.map((k) => k.id));
  const siteIds = new Set(sitesData.map((s) => s.id));
  const sourceIds = new Set(sourcesData.map((s) => s.id));
  const rulerIds = new Set(rulersData.map((r) => r.id));

  assert.equal(kingdomIds.size, kingdomsData.length, 'Kingdom IDs must be unique');
  assert.equal(siteIds.size, sitesData.length, 'Site IDs must be unique');
  assert.equal(sourceIds.size, sourcesData.length, 'Source IDs must be unique');
  assert.equal(rulerIds.size, rulersData.length, 'Ruler IDs must be unique');

  // Check coordinates in Indonesia archipelago bounds
  for (const kd of kingdomsData) {
    assert.ok(kd.coordinates.lat >= -11 && kd.coordinates.lat <= 7, `Invalid lat for ${kd.id}`);
    assert.ok(kd.coordinates.lng >= 94 && kd.coordinates.lng <= 142, `Invalid lng for ${kd.id}`);
    assert.ok(kd.sourceIds.length > 0, `Kingdom ${kd.id} must have at least 1 source`);
    for (const srcId of kd.sourceIds) {
      assert.ok(sourceIds.has(srcId), `Missing source ${srcId} in ${kd.id}`);
    }
    for (const stId of kd.heritageSiteIds) {
      assert.ok(siteIds.has(stId), `Missing site ${stId} in ${kd.id}`);
    }
  }

  for (const st of sitesData) {
    assert.ok(st.coordinates.lat >= -11 && st.coordinates.lat <= 7, `Invalid lat for ${st.id}`);
    assert.ok(st.coordinates.lng >= 94 && st.coordinates.lng <= 142, `Invalid lng for ${st.id}`);
    for (const kId of st.relatedKingdomIds) {
      assert.ok(kingdomIds.has(kId), `Missing kingdom ${kId} in site ${st.id}`);
    }
    for (const srcId of st.sourceIds) {
      assert.ok(sourceIds.has(srcId), `Missing source ${srcId} in site ${st.id}`);
    }
  }

  for (const rl of rulersData) {
    assert.ok(kingdomIds.has(rl.kingdomId), `Missing kingdom ${rl.kingdomId} in ruler ${rl.id}`);
    for (const srcId of rl.sourceIds) {
      assert.ok(sourceIds.has(srcId), `Missing source ${srcId} in ruler ${rl.id}`);
    }
  }

  for (const ter of territoriesData) {
    assert.equal(ter.type, 'Feature');
    assert.equal(ter.geometry.type, 'Polygon');
    assert.ok(kingdomIds.has(ter.properties.kingdom_id));
    assert.ok(ter.properties.historicalMapSource.length > 0, 'Territory must cite historical map source');
    assert.ok(ter.properties.reconstruction_method.length > 0, 'Territory must explain reconstruction method');
  }

  for (const evt of eventsData) {
    for (const kId of evt.kingdom_ids) {
      assert.ok(kingdomIds.has(kId), `Missing kingdom ${kId} in event ${evt.id}`);
    }
  }

  const stats = getAtlasStats(kingdomsData, sitesData, territoriesData);
  assert.equal(stats.totalKingdoms, kingdomsData.length);
  assert.equal(stats.totalSites, sitesData.length);
});

test('formatReignYear formats historical dates accurately', () => {
  assert.equal(formatReignYear(1267, 1297), '1267 — 1297 M');
  assert.equal(formatReignYear(1915, null), '1915 M — masa kini');
  assert.equal(formatReignYear(null, null), 'Tarikh tidak tercatat');
});

test('time-series synchronization: kingdoms, sites, territories, and rulers appear on their exact historical years', () => {
  const baseFilter: FilterState = {
    regions: [],
    yearRange: [840, 1960],
    siteTypes: [],
    certaintyLevels: [],
    searchQuery: '',
    activeKingdomId: null,
    entityType: 'all',
  };

  // 1. Every kingdom appears on its exact founded_year and not on founded_year - 1
  for (const k of kingdomsData) {
    assert.equal(
      isKingdomActiveInYear(k, k.founded_year - 1),
      false,
      `${k.id} should not be active before ${k.founded_year}`
    );
    assert.equal(
      isKingdomActiveInYear(k, k.founded_year),
      true,
      `${k.id} must be active on its founded_year ${k.founded_year}`
    );
    if (k.ended_year !== null) {
      assert.equal(
        isKingdomActiveInYear(k, k.ended_year),
        true,
        `${k.id} must be active on its ended_year ${k.ended_year}`
      );
      assert.equal(
        isKingdomActiveInYear(k, k.ended_year + 1),
        false,
        `${k.id} must not be active after ${k.ended_year}`
      );
    }
  }

  // 2. Every site appears on its exact built_year and not on built_year - 1
  for (const s of sitesData) {
    assert.equal(
      isSiteActiveInYear(s, s.built_year - 1),
      false,
      `Site ${s.id} should not appear before ${s.built_year}`
    );
    assert.equal(
      isSiteActiveInYear(s, s.built_year),
      true,
      `Site ${s.id} must appear on its built_year ${s.built_year}`
    );

    const activeKdsAtBuiltYear = new Set(
      kingdomsData.filter((k) => isKingdomActiveInYear(k, s.built_year)).map((k) => k.id)
    );
    const visibleAtBuiltYear = filterSites(sitesData, baseFilter, activeKdsAtBuiltYear, s.built_year);
    assert.ok(
      visibleAtBuiltYear.some((v) => v.id === s.id),
      `Site ${s.id} must be visible in filterSites at its built_year ${s.built_year}`
    );

    const activeKdsBeforeBuiltYear = new Set(
      kingdomsData.filter((k) => isKingdomActiveInYear(k, s.built_year - 1)).map((k) => k.id)
    );
    const visibleBeforeBuiltYear = filterSites(
      sitesData,
      baseFilter,
      activeKdsBeforeBuiltYear,
      s.built_year - 1
    );
    assert.equal(
      visibleBeforeBuiltYear.some((v) => v.id === s.id),
      false,
      `Site ${s.id} must not be visible in filterSites at year ${s.built_year - 1}`
    );
  }

  // 3. Every territory polygon appears only within [year_start, year_end]
  for (const t of territoriesData) {
    const { year_start, year_end, id } = t.properties;
    assert.equal(isTerritoryActiveInYear(t, year_start - 1), false, `${id} inactive before ${year_start}`);
    assert.equal(isTerritoryActiveInYear(t, year_start), true, `${id} active at ${year_start}`);
    assert.equal(isTerritoryActiveInYear(t, year_end), true, `${id} active at ${year_end}`);
    assert.equal(isTerritoryActiveInYear(t, year_end + 1), false, `${id} inactive after ${year_end}`);

    const activeKdsAtStart = new Set(
      kingdomsData.filter((k) => isKingdomActiveInYear(k, year_start)).map((k) => k.id)
    );
    const visibleTerr = filterTerritories(territoriesData, activeKdsAtStart, baseFilter, year_start);
    assert.ok(visibleTerr.some((v) => v.properties.id === id));
  }

  // 4. Rulers synchronization check (e.g., Sultan Iskandar Muda in 1620)
  const acehRulers1620 = getActiveRulersInYear(rulersData, 'kgd_aceh', 1620);
  assert.ok(acehRulers1620.some((r) => r.name.includes('Iskandar Muda')));
});
