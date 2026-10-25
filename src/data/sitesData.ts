import { HeritageSite, CertaintyLevel, VerificationStatusLabel, SiteType } from '../types/atlas';

interface RawSite {
  id: string;
  name: string;
  type: SiteType;
  kingdom_ids: string[];
  region: string;
  modern_location: string;
  latitude: number;
  longitude: number;
  built_year_display: string;
  condition_status: string;
  description: string;
  architectural_features: string;
  certainty: CertaintyLevel;
  source_ids: string[];
}

const certaintyToLabel = (c: CertaintyLevel): VerificationStatusLabel => {
  if (c === 'verified') return 'Terverifikasi';
  if (c === 'estimated') return 'Perkiraan';
  return 'Belum terverifikasi';
};

const rawSites: RawSite[] = [
  {
    id: 'site_makam_malik_assaleh',
    name: 'Kompleks Makam Sultan Malik as-Saleh & Sultanah Nahrasyiyah',
    type: 'tomb',
    kingdom_ids: ['kgd_samudera_pasai'],
    region: 'Sumatera',
    modern_location: 'Gampong Beuringen, Kec. Samudera, Kab. Aceh Utara, Aceh',
    latitude: 5.1408,
    longitude: 97.2114,
    built_year_display: '696 H / 1297 M (Nisan Malik as-Saleh)',
    condition_status: 'Terawat — Kawasan Cagar Budaya Nasional Samudera Pasai',
    description: 'Kompleks pemakaman raja-raja Kesultanan Samudera Pasai yang memuat bukti epigrafi Islam tertua dari suatu kesultanan di Sumatera. Di lokasi yang berdekatan juga terdapat makam marmer Sultanah Nahrasyiyah (wafat 1428 M) yang diimpor dari Cambay, Gujarat.',
    architectural_features: 'Batu nisan tipe Aceh awal dan pualam putih berukir kaligrafi Arab petikan Surah Al-Hasyr, Surah Ali Imran, dan Ayat Kursi.',
    certainty: 'verified',
    source_ids: ['src_bachtiar_pasai_epigraphy', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_makam_sultan_perlak',
    name: 'Situs Makam Sultan Alaidin Syed Maulana Abdul Aziz Shah (Bandar Khalifah)',
    type: 'tomb',
    kingdom_ids: ['kgd_perlak'],
    region: 'Sumatera',
    modern_location: 'Desa Bandrong, Kec. Peureulak, Kab. Aceh Timur, Aceh',
    latitude: 4.8075,
    longitude: 97.8781,
    built_year_display: 'Klaim Tradisi 864 M (Epigrafi Abad ke-9 Belum Terverifikasi)',
    condition_status: 'Situs Ziarah Sejarah Daerah — Perlu Kajian Arkeologi Lanjutan',
    description: 'Situs makam yang secara tradisional diyakini masyarakat setempat dan naskah Idharul Haq sebagai makam Sultan pertama Kesultanan Perlak. Situs fisik makam ada di Peureulak, namun klaim kronologi abad ke-9 M (840–864 M) berstatus belum terverifikasi secara epigrafis modern.',
    architectural_features: 'Kompleks makam yang telah mengalami pemugaran modern di kawasan pesisir timur Aceh (Peureulak).',
    certainty: 'unverified',
    source_ids: ['src_bachtiar_pasai_epigraphy', 'src_ricklefs_2008']
  },
  {
    id: 'site_masjid_baiturrahman',
    name: 'Masjid Raya Baiturrahman & Kawasan Taman Sari Gunongan',
    type: 'mosque',
    kingdom_ids: ['kgd_aceh'],
    region: 'Sumatera',
    modern_location: 'Kec. Baiturrahman, Kota Banda Aceh, Aceh',
    latitude: 5.5536,
    longitude: 95.3172,
    built_year_display: 'Abad ke-17 M (Rekonstruksi 1879–1881 M)',
    condition_status: 'Sangat Terawat — Cagar Budaya Provinsi/Nasional',
    description: 'Pusat keagamaan dan simbol ketahanan spiritual Kesultanan Aceh Darussalam. Bangunan kayu aslinya terbakar saat agresi kolonial Belanda tahun 1873 dan dibangun kembali pada 1879. Tak jauh di selatannya berdiri Gunongan dan Kandang XII (makam Sultan Iskandar Muda).',
    architectural_features: 'Masjid berkubah hitam dengan kolam refleksi bergaya Mughal-Kolonial, berdampingan dengan struktur taman keraton Gunongan berbentuk bunga segi delapan dari masa Sultan Iskandar Muda.',
    certainty: 'verified',
    source_ids: ['src_lombard_2006', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_istana_siak',
    name: 'Istana Siak Sri Indrapura (Istana Asserayah Hasyimiah)',
    type: 'palace',
    kingdom_ids: ['kgd_siak'],
    region: 'Sumatera',
    modern_location: 'Kp. Dalam, Kec. Siak, Kab. Siak, Riau',
    latitude: 0.7950,
    longitude: 102.0489,
    built_year_display: '1889 M (Masa Sultan Syarif Hasyim)',
    condition_status: 'Sangat Terawat — Museum & Cagar Budaya Nasional',
    description: 'Kediaman resmi Sultan Siak yang dibangun pada tahun 1889 oleh Sultan Syarif Hasyim. Dijuluki "Istana Matahari Timur", bangunan ini menyimpan koleksi artefak kerajaan termasuk alat musik mekanik Komet dan singgasana bersepuh emas.',
    architectural_features: 'Perpaduan harmonis arsitektur Melayu, Arab (lengkungan Moorish), dan Eropa klasik berlantai dua di tepi Sungai Siak.',
    certainty: 'verified',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_ricklefs_2008']
  },
  {
    id: 'site_kuto_besak_palembang',
    name: 'Benteng Kuto Besak & Masjid Agung Sultan Mahmud Badaruddin I',
    type: 'fortress',
    kingdom_ids: ['kgd_palembang'],
    region: 'Sumatera',
    modern_location: 'Tepi Sungai Musi, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan',
    latitude: -2.9914,
    longitude: 104.7594,
    built_year_display: '1738–1748 M (Masjid Agung) & 1780–1797 M (Benteng Kuto Besak)',
    condition_status: 'Terawat — Cagar Budaya Nasional',
    description: 'Pusat pertahanan dan spiritual Kesultanan Palembang Darussalam di tepi Sungai Musi. Benteng Kuto Besak merupakan satu-satunya benteng batu kapur besar di Nusantara yang dibangun oleh kesultanan pribumi dengan biaya sendiri.',
    architectural_features: 'Masjid beratap tumpang tiga berornamen limas Palembang-Tionghoa-Eropa, serta benteng batu berdinding tebal 1,99 meter yang menghadap langsung ke Sungai Musi.',
    certainty: 'verified',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_ricklefs_2008']
  },
  {
    id: 'site_masjid_agung_demak',
    name: 'Masjid Agung Demak & Makam Raja-Raja Demak',
    type: 'mosque',
    kingdom_ids: ['kgd_demak'],
    region: 'Jawa',
    modern_location: 'Kauman, Bintoro, Kec. Demak, Kab. Demak, Jawa Tengah',
    latitude: -6.8946,
    longitude: 110.6375,
    built_year_display: 'c. 1479 M (Abad ke-15 M)',
    condition_status: 'Sangat Terawat — Cagar Budaya Nasional (SK No. 243/M/2015)',
    description: 'Masjid kuno yang didirikan oleh Raden Patah bersama para Wali Songo sebagai pusat dakwah dan pemerintahan Kesultanan Demak. Di sisi barat masjid terdapat kompleks makam Raden Patah, Pati Unus, dan Sultan Trenggana.',
    architectural_features: 'Atap tumpang tiga (tajug) kayu jati tanpa kubah yang melambangkan Iman, Islam, dan Ihsan, ditopang empat tiang utama Saka Guru serta dihiasi piring porselen Campa/Vietnam dan Majapahit.',
    certainty: 'verified',
    source_ids: ['src_pigeaud_1976', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_keraton_kasepuhan',
    name: 'Keraton Kasepuhan Cirebon & Masjid Agung Sang Cipta Rasa',
    type: 'palace',
    kingdom_ids: ['kgd_cirebon'],
    region: 'Jawa',
    modern_location: 'Kel. Kasepuhan, Kec. Lemahwungkuk, Kota Cirebon, Jawa Barat',
    latitude: -6.7258,
    longitude: 108.5706,
    built_year_display: '1430 M (Dalem Agung Pakungwati) & 1480 M (Masjid Sang Cipta Rasa)',
    condition_status: 'Sangat Terawat — Cagar Budaya & Keraton Aktif',
    description: 'Kompleks keraton pusat Kesultanan Cirebon yang berkembang dari Dalem Agung Pakungwati. Di sisi barat alun-alun Sangkala Buana berdiri Masjid Agung Sang Cipta Rasa yang dibangun masa Sunan Gunung Jati.',
    architectural_features: 'Gapura Candi Bentar dan Paduraksa bata merah bergaya Majapahit-Pesisir, Siti Inggil berhiaskan keramik porselen Tiongkok dan Delft Belanda, serta Kereta Singa Barong.',
    certainty: 'verified',
    source_ids: ['src_pigeaud_1976', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_banten_lama',
    name: 'Kawasan Banten Lama: Masjid Agung Banten & Keraton Surosowan',
    type: 'mosque',
    kingdom_ids: ['kgd_banten'],
    region: 'Jawa',
    modern_location: 'Desa Banten, Kec. Kasemen, Kota Serang, Banten',
    latitude: -6.0361,
    longitude: 106.1540,
    built_year_display: '1552–1570 M (Masa Sultan Maulana Hasanuddin)',
    condition_status: 'Terawat — Kawasan Cagar Budaya Nasional Banten Lama',
    description: 'Jantung ibu kota maritim Kesultanan Banten. Mencakup Masjid Agung Banten yang masih utuh, menara mercusuar segi delapan karya Hendrick Lucasz Cardeel, bangunan Tiyamah, serta reruntuhan benteng dan kolam pemandian Keraton Surosowan.',
    architectural_features: 'Atap tajug bertumpuk lima khas Jawa-Banten, menara bata putih setinggi 24 meter menyerupai mercusuar, dan fondasi benteng bastion karang/bata di Surosowan.',
    certainty: 'verified',
    source_ids: ['src_guillot_1990', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_kotagede_imogiri',
    name: 'Masjid Gedhe Mataram Kotagede & Kompleks Makam Raja-Raja',
    type: 'mosque',
    kingdom_ids: ['kgd_mataram'],
    region: 'Jawa',
    modern_location: 'Sayangan, Jagalan, Kec. Banguntapan / Kotagede, DI Yogyakarta',
    latitude: -7.8294,
    longitude: 110.3980,
    built_year_display: 'c. 1587 M (Masa Panembahan Senopati)',
    condition_status: 'Sangat Terawat — Cagar Budaya Nasional',
    description: 'Masjid tertua di Yogyakarta yang menjadi saksi berdirinya Kesultanan Mataram Islam di ibu kota pertama Kotagede. Di belakang mihrab terdapat makam pendiri Mataram, Panembahan Senopati, dan Ki Ageng Pemanahan.',
    architectural_features: 'Akulturasi kental Jawa-Hindu dan Islam: pagar keliling bata merah berornamen kala, gapura Paduraksa, parit keliling (jagang), dan bangunan utama limasan/tajug Jawa.',
    certainty: 'verified',
    source_ids: ['src_pigeaud_1976', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_masjid_suriansyah',
    name: 'Masjid Sultan Suriansyah & Makam Sultan Suriansyah',
    type: 'mosque',
    kingdom_ids: ['kgd_banjar'],
    region: 'Kalimantan',
    modern_location: 'Kel. Kuin Utara, Kec. Banjarmasin Utara, Kota Banjarmasin, Kalimantan Selatan',
    latitude: -3.2942,
    longitude: 114.5736,
    built_year_display: 'c. 1526 M (Masa Sultan Suriansyah)',
    condition_status: 'Sangat Terawat — Cagar Budaya Nasional (SK No. PM.27/PW.007/MKP/2008)',
    description: 'Masjid tertua di Kalimantan Selatan yang dibangun di tepi Sungai Kuin pada masa raja Islam pertama Banjar, Sultan Suriansyah. Tidak jauh dari masjid terdapat kompleks makam Sultan Suriansyah.',
    architectural_features: 'Konstruksi panggung berbahan kayu ulin (kayu besi) dengan atap tumpang tiga khas Banjar-Demak dan ukiran kaligrafi serta sulur flora pada mimbar kayu ulin.',
    certainty: 'verified',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_ricklefs_2008']
  },
  {
    id: 'site_keraton_kadriah',
    name: 'Keraton Kadriah & Masjid Jami Sultan Syarif Abdurrahman',
    type: 'palace',
    kingdom_ids: ['kgd_pontianak'],
    region: 'Kalimantan',
    modern_location: 'Kel. Dalam Bugis, Kec. Pontianak Timur, Kota Pontianak, Kalimantan Barat',
    latitude: -0.0258,
    longitude: 109.3497,
    built_year_display: '1771 M (Masa Sultan Syarif Abdurrahman Alkadrie)',
    condition_status: 'Sangat Terawat — Cagar Budaya Nasional',
    description: 'Pusat pemerintahan Kesultanan Pontianak yang didirikan tepat di persimpangan tiga sungai (Kapuas Kecil, Kapuas Besar, dan Sungai Landak). Masjid Jami berdiri sekitar 200 meter di sebelah barat keraton.',
    architectural_features: 'Seluruh struktur utama dibangun dari kayu belian (ulin) Kalimantan dengan dominasi warna kuning keemasan Melayu, anjungan menghadap sungai, dan meriam kuno di halaman depan.',
    certainty: 'verified',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_ricklefs_2008']
  },
  {
    id: 'site_kedaton_kutai',
    name: 'Museum Mulawarman (Eks Keraton Kesultanan Kutai) & Makam Raja-Raja',
    type: 'palace',
    kingdom_ids: ['kgd_kutai'],
    region: 'Kalimantan',
    modern_location: 'Jl. Diponegoro, Tenggarong, Kab. Kutai Kartanegara, Kalimantan Timur',
    latitude: -0.4135,
    longitude: 116.9906,
    built_year_display: '1936 M (Bangunan Istana Beton menggantikan Istana Kayu Ulin)',
    condition_status: 'Sangat Terawat — Museum Provinsi & Cagar Budaya',
    description: 'Kompleks istana Kesultanan Kutai Kartanegara ing Martadipura di tepi Sungai Mahakam dan kompleks pemakaman raja-raja serta ulama penyebar Islam di Kutai.',
    architectural_features: 'Bangunan istana bergaya arsitektur kolonial Belanda (Art Deco/Indische Empire) yang di halaman sampingnya terdapat nisan-nisan kayu ulin berukir indah khas bangsawan Kutai.',
    certainty: 'verified',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_ricklefs_2008']
  },
  {
    id: 'site_somba_opu_katangka',
    name: 'Benteng Somba Opu, Masjid Tua Katangka & Makam Sultan Hasanuddin',
    type: 'fortress',
    kingdom_ids: ['kgd_gowa_tallo'],
    region: 'Sulawesi',
    modern_location: 'Kec. Somba Opu & Kec. Barombong, Kab. Gowa, Sulawesi Selatan',
    latitude: -5.1903,
    longitude: 119.4067,
    built_year_display: 'Abad ke-16 M (Benteng Somba Opu) & 1603 M (Masjid Katangka)',
    condition_status: 'Terawat — Kawasan Cagar Budaya Nasional',
    description: 'Benteng Somba Opu adalah jantung pertahanan dan perdagangan maritim Kesultanan Gowa sebelum dihancurkan VOC pada 1669. Di dekatnya terdapat Masjid Tua Al-Hilal Katangka dan Kompleks Makam Sultan Hasanuddin.',
    architectural_features: 'Dinding benteng bata merah tebal di delta Sungai Jeneberang, serta kompleks makam bangsawan Gowa dengan konstruksi batu cadas berundak menyerupai punden megalitik yang berakulturasi dengan nisan Islam.',
    certainty: 'verified',
    source_ids: ['src_andaya_1981', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_bola_soba_bone',
    name: 'Kompleks Saoraja / Bola Soba & Museum ArajangE Bone',
    type: 'palace',
    kingdom_ids: ['kgd_bone'],
    region: 'Sulawesi',
    modern_location: 'Kec. Tanete Riattang, Watampone, Kab. Bone, Sulawesi Selatan',
    latitude: -4.5386,
    longitude: 120.3278,
    built_year_display: '1890 M (Bola Soba)',
    condition_status: 'Direkonstruksi Pasca Kebakaran — Cagar Budaya',
    description: 'Kompleks istana panggung tradisional Bugis tempat kediaman para Arumpone (Raja Bone) serta penyimpanan benda pusaka kerajaan (Arajang) Kesultanan Bone.',
    architectural_features: 'Rumah panggung kayu besar khas bangsawan tertinggi Bugis dengan timpa laja (susunan atap bertingkat lima) yang menandakan strata kebangsawanan raja.',
    certainty: 'verified',
    source_ids: ['src_andaya_1981', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_benteng_wolio',
    name: 'Benteng Keraton Buton (Benteng Wolio) & Masjid Agung Keraton',
    type: 'fortress',
    kingdom_ids: ['kgd_buton'],
    region: 'Sulawesi',
    modern_location: 'Kel. Melai, Kec. Murhum, Kota Baubau, Sulawesi Tenggara',
    latitude: -5.4744,
    longitude: 122.6011,
    built_year_display: 'Akhir Abad ke-16 – Awal Abad ke-17 M (Masa Sultan La Elangi)',
    condition_status: 'Sangat Terawat — Cagar Budaya Nasional',
    description: 'Benteng keraton terluas di dunia dengan keliling tembok batu sepanjang 2.740 meter dan luas sekitar 23,375 hektare. Di dalamnya terdapat Masjid Agung Keraton Buton, Makam Sultan Murhum, dan Kamali Baadia.',
    architectural_features: 'Susunan batu gunung/karang yang direkatkan dengan campuran kapur dan putih telur/rumput laut, dilengkapi 12 pintu gerbang (Lawa) dan 16 bastion meriam (Baluara) di puncak bukit menghadap Selat Buton.',
    certainty: 'verified',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  },
  {
    id: 'site_kadato_kie_ternate',
    name: 'Kedaton Kesultanan Ternate (Kadato Kie) & Masjid Sultan Ternate (Sigi Lamo)',
    type: 'palace',
    kingdom_ids: ['kgd_ternate'],
    region: 'Maluku & Nusa Tenggara',
    modern_location: 'Kel. Soa Sio, Kec. Ternate Utara, Kota Ternate, Maluku Utara',
    latitude: 0.8011,
    longitude: 127.3844,
    built_year_display: '1813 M (Bangunan Kedaton saat ini) & Abad ke-17 M (Sigi Lamo)',
    condition_status: 'Sangat Terawat — Cagar Budaya Nasional',
    description: 'Kediaman resmi Sultan Ternate yang terletak di kaki Gunung Gamalama menghadap ke laut dan Pulau Halmahera. Di dekatnya berdiri Masjid Sultan Ternate (Sigi Lamo) yang masih menjalankan ritual adat Kolano Uci Sabea.',
    architectural_features: 'Kedaton berbentuk segi delapan (oktagonal) berlantai dua di atas bukit, dipadukan dengan Masjid Sigi Lamo beratap tumpang limas dari daun sagu/rumbia.',
    certainty: 'verified',
    source_ids: ['src_andaya_1993', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_kadato_kie_tidore',
    name: 'Kedaton Kie Kesultanan Tidore & Benteng Tahula',
    type: 'palace',
    kingdom_ids: ['kgd_tidore'],
    region: 'Maluku & Nusa Tenggara',
    modern_location: 'Kel. Soasio, Kec. Tidore, Kota Tidore Kepulauan, Maluku Utara',
    latitude: 0.6594,
    longitude: 127.4481,
    built_year_display: 'Abad ke-17 M (Benteng Tahula) & Rekonstruksi Kedaton Kie (1997–2010)',
    condition_status: 'Terawat — Cagar Budaya',
    description: 'Pusat pemerintahan Kesultanan Tidore di Kelurahan Soasio serta Benteng Tahula di atas tebing batu karang yang menjadi saksi diplomasi dan perlawanan Sultan Nuku.',
    architectural_features: 'Kedaton megah dengan tangga kembar menghadap pesisir timur Pulau Tidore dan benteng batu berarsitektur Iberia di puncak bukit Soasio.',
    certainty: 'verified',
    source_ids: ['src_andaya_1993', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'site_masjid_wapauwe',
    name: 'Masjid Tua Wapauwe (Kaitetu)',
    type: 'mosque',
    kingdom_ids: ['kgd_ternate'],
    region: 'Maluku & Nusa Tenggara',
    modern_location: 'Desa Kaitetu, Kec. Leihitu, Kab. Maluku Tengah, Pulau Ambon, Maluku',
    latitude: -3.5829,
    longitude: 128.0842,
    built_year_display: 'c. 1414 M (Tradisi Lokal / Abad ke-15 M)',
    condition_status: 'Sangat Terawat — Cagar Budaya Nasional',
    description: 'Salah satu masjid tertua di Indonesia timur yang berdiri di pesisir utara Pulau Ambon (Jazirah Leihitu), wilayah yang secara historis berada dalam jaringan dakwah dan aliansi maritim Kesultanan Ternate. Menyimpan mushaf Al-Qur\'an tulis tangan kuno Imam Muhammad Arikulapessy (1550 M).',
    architectural_features: 'Konstruksi kayu tradisional Maluku berukuran 10x10 meter tanpa paku besi (menggunakan pasak kayu), beratap tumpang dari pelepah sagu (gaba-gaba) dan daun rumbia.',
    certainty: 'estimated',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_andaya_1993']
  },
  {
    id: 'site_asi_mbojo_bima',
    name: 'Istana Bima (Museum Asi Mbojo) & Masjid Sultan Muhammad Salahuddin',
    type: 'palace',
    kingdom_ids: ['kgd_bima'],
    region: 'Maluku & Nusa Tenggara',
    modern_location: 'Kel. Paruga, Kec. Rasanae Barat, Kota Bima, Nusa Tenggara Barat',
    latitude: -8.4547,
    longitude: 118.7239,
    built_year_display: '1927–1929 M (Asi Mbojo Permanen) & 1737 M (Kompleks Masjid Kesultanan)',
    condition_status: 'Sangat Terawat — Museum & Cagar Budaya',
    description: 'Kediaman resmi Sultan Bima yang menyimpan mahkota kerajaan, senjata pusaka, dan naskah kuno Bo\' Sangaji Kai (catatan harian istana Bima beraksara Arab-Melayu/Jawi).',
    architectural_features: 'Bangunan istana bergaya gabungan Eropa-Tropis dan arsitektur tradisional Mbojo dengan gerbang Lare-lare yang ikonik.',
    certainty: 'verified',
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  }
];

export const sitesData: HeritageSite[] = rawSites.map((s) => ({
  ...s,
  siteType: s.type,
  coordinates: {
    lat: s.latitude,
    lng: s.longitude
  },
  locationDescription: `${s.modern_location} (${s.condition_status})`,
  historicalPeriod: s.built_year_display,
  relatedKingdomIds: s.kingdom_ids,
  sourceIds: s.source_ids,
  verificationStatus: certaintyToLabel(s.certainty),
  imageAttribution: 'Dokumentasi Arkeologi & Registrasi Cagar Budaya Kemendikbudristek RI'
}));
