import { TerritoryFeature } from '../types/atlas';

export const territoriesData: TerritoryFeature[] = [
  {
    type: 'Feature',
    properties: {
      id: 'ter_aceh_1636',
      kingdom_id: 'kgd_aceh',
      period_label: 'Perkiraan Zona Pengaruh Maritim Puncak Sultan Iskandar Muda (c. 1607–1636 M)',
      year_start: 1600,
      year_end: 1641,
      certainty: 'estimated',
      verificationStatus: 'Perkiraan',
      historicalMapSource: 'Historical Atlas of Indonesia (Peta "Aceh\'s Sphere of Influence in the Early 17th Century") & Kerajaan Aceh: Zaman Sultan Iskandar Muda',
      cartographer: 'Robert Cribb (2000) & Denys Lombard (1967/2006)',
      mapYear: '2000 / 2006',
      reconstruction_method: 'Rekonstruksi skematis berbasis peta akademik Robert Cribb (2000, hlm. 93) dan Denys Lombard (2006) mengenai bandar lada pesisir Aceh, Pidie, Pasai, Deli, Aru, hingga Barus dan Tiku.',
      uncertaintyNote: 'Batas wilayah kesultanan maritim bersifat mandala (kendali atas pelabuhan pesisir dan muara sungai), bukan batas daratan linear modern.',
      source_ids: ['src_cribb_2000', 'src_lombard_2006', 'src_ricklefs_2008']
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [95.05, 5.85],
        [97.50, 5.25],
        [98.95, 3.80],
        [99.90, 2.95],
        [99.10, 1.40],
        [97.90, 2.00],
        [96.10, 4.10],
        [95.05, 5.85]
      ]]
    }
  },
  {
    type: 'Feature',
    properties: {
      id: 'ter_demak_1540',
      kingdom_id: 'kgd_demak',
      period_label: 'Perkiraan Lingkup Pengaruh Pesisir Utara Jawa Masa Sultan Trenggana (c. 1521–1546 M)',
      year_start: 1500,
      year_end: 1550,
      certainty: 'estimated',
      verificationStatus: 'Perkiraan',
      historicalMapSource: 'Islamic States in Java 1500–1700 & Historical Atlas of Indonesia (Peta "The Rise of Islamic States in Java")',
      cartographer: 'Th.G.Th. Pigeaud & H.J. de Graaf (1976); Robert Cribb (2000)',
      mapYear: '1976 / 2000',
      reconstruction_method: 'Rekonstruksi koridor pesisir utara Jawa (Pasisir) dari Cirebon-Brebes, Pekalongan, Demak-Jepara, Tuban, Gresik-Surabaya berdasarkan Pigeaud & De Graaf (1976) dan Cribb (2000, hlm. 88).',
      uncertaintyNote: 'Poligon merepresentasikan jaringan kota pelabuhan Pasisir dan kadipaten pedalaman yang mengakui hegemoni Demak, bukan garis perbatasan administratif modern.',
      source_ids: ['src_cribb_2000', 'src_pigeaud_1976', 'src_suma_oriental_1515']
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [108.45, -6.60],
        [110.40, -6.85],
        [110.75, -6.45],
        [111.50, -6.65],
        [112.75, -7.15],
        [112.90, -7.65],
        [111.60, -7.60],
        [110.50, -7.55],
        [109.10, -7.15],
        [108.45, -6.60]
      ]]
    }
  },
  {
    type: 'Feature',
    properties: {
      id: 'ter_banten_1670',
      kingdom_id: 'kgd_banten',
      period_label: 'Perkiraan Wilayah Kedaulatan Banten & Niaga Lada Lampung (c. 1570–1682 M)',
      year_start: 1552,
      year_end: 1684,
      certainty: 'estimated',
      verificationStatus: 'Perkiraan',
      historicalMapSource: 'The Sultanate of Banten (EFEO) & Historical Atlas of Indonesia',
      cartographer: 'Claude Guillot et al. (1990) & Robert Cribb (2000)',
      mapYear: '1990 / 2000',
      reconstruction_method: 'Rekonstruksi wilayah ujung barat Pulau Jawa (Banten, Serang, Pandeglang, Tangerang barat Sungai Cisadane) dan pesisir Lampung penghasil lada berdasarkan Guillot (1990) dan Piagam Dalem Banten.',
      uncertaintyNote: 'Kendali di Lampung berpusat pada pelabuhan pengumpul lada dan marga pesisir Selat Sunda.',
      source_ids: ['src_cribb_2000', 'src_guillot_1990', 'src_ricklefs_2008']
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [104.60, -5.35],
        [105.85, -5.30],
        [106.55, -6.00],
        [106.60, -6.80],
        [105.20, -6.85],
        [104.60, -5.35]
      ]]
    }
  },
  {
    type: 'Feature',
    properties: {
      id: 'ter_mataram_1640',
      kingdom_id: 'kgd_mataram',
      period_label: 'Perkiraan Mandala Kekuasaan Mataram Islam Masa Sultan Agung (c. 1613–1645 M)',
      year_start: 1586,
      year_end: 1755,
      certainty: 'estimated',
      verificationStatus: 'Perkiraan',
      historicalMapSource: 'Historical Atlas of Indonesia (Peta "Mataram under Sultan Agung") & Islamic States in Java 1500–1700',
      cartographer: 'Robert Cribb (2000) & H.J. de Graaf (1958/1976)',
      mapYear: '1976 / 2000',
      reconstruction_method: 'Rekonstruksi mandala Mataram Islam yang mencakup Kutagara (Yogyakarta-Surakarta), Negara Agung, Mancanegara Wetan & Kilen, serta Pasisir berdasarkan konsep konsentris Jawa dalam Pigeaud & De Graaf (1976) dan Cribb (2000, hlm. 90).',
      uncertaintyNote: 'Kekuasaan Mataram disusun dalam lingkaran konsentris (Kutagara, Negara Agung, Mancanegara, Pasisir) dengan tingkat integrasi politik yang bergradasi.',
      source_ids: ['src_cribb_2000', 'src_pigeaud_1976', 'src_ricklefs_2008']
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [107.60, -6.90],
        [108.60, -6.70],
        [110.75, -6.50],
        [112.80, -7.10],
        [114.10, -7.80],
        [113.80, -8.35],
        [111.00, -8.20],
        [108.50, -7.75],
        [107.60, -6.90]
      ]]
    }
  },
  {
    type: 'Feature',
    properties: {
      id: 'ter_gowa_1660',
      kingdom_id: 'kgd_gowa_tallo',
      period_label: 'Perkiraan Wilayah Inti & Pengaruh Maritim Gowa-Tallo Pra-Bongaya (c. 1605–1667 M)',
      year_start: 1605,
      year_end: 1669,
      certainty: 'estimated',
      verificationStatus: 'Perkiraan',
      historicalMapSource: 'The Heritage of Arung Palakka & Historical Atlas of Indonesia',
      cartographer: 'Leonard Y. Andaya (1981) & Robert Cribb (2000)',
      mapYear: '1981 / 2000',
      reconstruction_method: 'Rekonstruksi wilayah inti semenanjung barat daya Sulawesi Selatan (Makassar, Gowa, Maros, Takalar, Jeneponto, Bulukumba) berdasarkan Andaya (1981) dan Cribb (2000, hlm. 96).',
      uncertaintyNote: 'Di luar daratan inti Sulawesi Selatan, pengaruh Gowa-Tallo berwujud jaringan kemitraan maritim dan upeti pelabuhan di Sumbawa (Bima), Flores, hingga Selayar.',
      source_ids: ['src_cribb_2000', 'src_andaya_1981', 'src_reid_1993']
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [119.25, -4.65],
        [120.15, -4.90],
        [120.50, -5.65],
        [119.65, -5.75],
        [119.25, -5.15],
        [119.25, -4.65]
      ]]
    }
  },
  {
    type: 'Feature',
    properties: {
      id: 'ter_maluku_utara_1580',
      kingdom_id: 'kgd_ternate',
      period_label: 'Perkiraan Poros Inti Kepulauan Rempah Moloku Kie Raha (Abad ke-16–17 M)',
      year_start: 1486,
      year_end: 1700,
      certainty: 'estimated',
      verificationStatus: 'Perkiraan',
      historicalMapSource: 'The World of Maluku: Eastern Indonesia in the Early Modern Period & Historical Atlas of Indonesia',
      cartographer: 'Leonard Y. Andaya (1993) & Robert Cribb (2000)',
      mapYear: '1993 / 2000',
      reconstruction_method: 'Rekonstruksi gugus pulau pusat penghasil cengkih (Ternate, Tidore, Moti, Makian, Bacan, dan pesisir barat Halmahera) berdasarkan Andaya (1993) dan Cribb (2000, hlm. 98).',
      uncertaintyNote: 'Pengaruh Ternate (Uli Lima) dan Tidore (Uli Siwa) membentang melalui jaringan kepulauan, bukan batas teritorial blok tunggal.',
      source_ids: ['src_cribb_2000', 'src_andaya_1993']
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [127.10, 1.30],
        [128.05, 1.30],
        [128.10, -0.80],
        [127.10, -0.80],
        [127.10, 1.30]
      ]]
    }
  }
];
