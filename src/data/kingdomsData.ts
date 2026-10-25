import { Kingdom, CertaintyLevel, VerificationStatusLabel, HistoricalContext, DisputedClaim } from '../types/atlas';
import { rulersData } from './rulersData';
import { sitesData } from './sitesData';
import { territoriesData } from './territoriesData';

interface RawKingdom {
  id: string;
  name: string;
  alternate_names: string[];
  polity_type: 'Kesultanan' | 'Kerajaan Islam' | 'Kerajaan Kembar';
  region: 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Maluku & Nusa Tenggara';
  modern_province: string;
  capital: string;
  latitude: number;
  longitude: number;
  coord_certainty: CertaintyLevel;
  founded_year: number;
  founded_display: string;
  founded_certainty: CertaintyLevel;
  golden_age_start: number;
  golden_age_end: number;
  golden_age_display: string;
  ended_year: number | null;
  ended_display: string;
  ended_certainty: CertaintyLevel;
  status_summary: string;
  summary: string;
  political_history: string;
  economic_network: string;
  cultural_legacy: string;
  decline_factors: string;
  historicalContext: HistoricalContext;
  territory_notes: string;
  disputedClaims: DisputedClaim[];
  source_ids: string[];
}

const certaintyToLabel = (c: CertaintyLevel): VerificationStatusLabel => {
  if (c === 'verified') return 'Terverifikasi';
  if (c === 'estimated') return 'Perkiraan';
  return 'Belum terverifikasi';
};

const rawKingdoms: RawKingdom[] = [
  {
    id: 'kgd_perlak',
    name: 'Kesultanan Perlak (Peureulak)',
    alternate_names: ['Negeri Ferlec', 'Bandar Khalifah Perlak', 'Peureulak'],
    polity_type: 'Kesultanan',
    region: 'Sumatera',
    modern_province: 'Aceh (Kabupaten Aceh Timur)',
    capital: 'Bandar Perlak (Peureulak)',
    latitude: 4.8075,
    longitude: 97.8781,
    coord_certainty: 'estimated',
    founded_year: 840,
    founded_display: 'Klaim Tradisi 840 M / Terkonfirmasi Historis 1292 M',
    founded_certainty: 'unverified',
    golden_age_start: 1200,
    golden_age_end: 1292,
    golden_age_display: 'Abad ke-13 M (Era Kunjungan Marco Polo 1292 M)',
    ended_year: 1292,
    ended_display: 'Akhir Abad ke-13 M (Berintegrasi dengan Samudera Pasai)',
    ended_certainty: 'estimated',
    status_summary: 'Berintegrasi ke dalam Kesultanan Samudera Pasai melalui pernikahan politik pada akhir abad ke-13 M.',
    summary: 'Pelabuhan Islam awal di pesisir timur Aceh yang tercatat secara historis oleh Marco Polo pada tahun 1292 M sebagai negeri "Ferlec" yang penduduk kotanya telah memeluk agama Islam. Tradisi naskah lokal mengklaim pendiriannya pada 840 M, namun klaim abad ke-9 tersebut masih berstatus belum terverifikasi secara arkeologis/epigrafis.',
    political_history: 'Dalam historiografi Indonesia, Perlak sering dibahas melalui dua lapisan bukti yang berbeda. Lapisan pertama adalah tradisi naskah lokal (Idharul Haq fi Mamlakatil Ferlah wal Fasi karya Abu Ishak Makarani) yang mengklaim Sultan Alaidin Syed Maulana Abdul Aziz Shah mendirikan kesultanan pada 1 Muharram 225 H (840 M). Lapisan kedua yang diakui sejarawan akademik adalah kesaksian langsung musafir Venesia Marco Polo (1292 M) yang singgah di Ferlec (Perlak) dan melaporkan bahwa penduduk kota pelabuhan telah memeluk Islam, sebelum wilayah ini menyatu dengan Samudera Pasai.',
    economic_network: 'Pengekspor kayu perlak (kayu berkualitas tinggi untuk pembuatan kapal), lada, kapur barus, dan hasil hutan di jalur pelayaran Selat Malaka.',
    cultural_legacy: 'Menjadi salah satu titik kontak paling awal antara pedagang Muslim dari Arab, Persia, dan Gujarat dengan masyarakat pesisir Sumatera bagian utara.',
    decline_factors: 'Penyatuan dinasti dengan Kesultanan Samudera Pasai setelah pernikahan Putri Ganggang Sari (putri Sultan Perlak) dengan Sultan Malik as-Saleh.',
    historicalContext: {
      politics: 'Transisi dari bandar niaga pesisir timur Aceh menuju penyatuan dinasti dengan Samudera Pasai pada akhir abad ke-13 M.',
      economy: 'Perdagangan kayu perlak (bahan baku lambung kapal), kamper, damar, dan lada di Selat Malaka.',
      maritime: 'Tempat persinggahan armada dagang dari Samudra Hindia dan Tiongkok (seperti rombongan pelayaran Marco Polo tahun 1292 M).',
      cultureAndReligion: 'Islamisasi awal masyarakat pelabuhan melalui interaksi niaga dengan saudagar Muslim mancanegara.'
    },
    territory_notes: 'Mencakup kawasan pesisir dan muara Sungai Peureulak di Kabupaten Aceh Timur saat ini; tidak terdapat peta batas wilayah historis yang terverifikasi.',
    disputedClaims: [
      {
        claimTopic: 'Tahun Berdirinya Kesultanan Perlak (840 M vs Abad ke-13 M)',
        versionA: 'Naskah lokal Idharul Haq dan seminar sejarah di Langsa (1963) menyebutkan Perlak berdiri pada 1 Muharram 225 H (840 M) di bawah Sultan Alaidin Syed Maulana Abdul Aziz Shah.',
        versionB: 'Kajian epigrafi dan akademik modern (M.C. Ricklefs, Claude Guillot, Ludvik Kalus, Azyumardi Azra) menyatakan belum ada bukti prasasti, koin, atau nisan abad ke-9 M; bukti sezaman paling awal yang dapat diverifikasi adalah laporan Marco Polo tahun 1292 M.',
        sourceIds: ['src_ricklefs_2008', 'src_bachtiar_pasai_epigraphy']
      }
    ],
    source_ids: ['src_ricklefs_2008', 'src_bachtiar_pasai_epigraphy']
  },
  {
    id: 'kgd_samudera_pasai',
    name: 'Kesultanan Samudera Pasai',
    alternate_names: ['Samudra Darussalam', 'Pase', 'Sumatra'],
    polity_type: 'Kesultanan',
    region: 'Sumatera',
    modern_province: 'Aceh (Kabupaten Aceh Utara)',
    capital: 'Pasai (sekitar Lhokseumawe / Geudong, Aceh Utara)',
    latitude: 5.1408,
    longitude: 97.2114,
    coord_certainty: 'verified',
    founded_year: 1267,
    founded_display: 'Akhir Abad ke-13 M (c. 1267 M)',
    founded_certainty: 'verified',
    golden_age_start: 1297,
    golden_age_end: 1428,
    golden_age_display: '1297–1428 M (Era Malik az-Zahir hingga Sultanah Nahrasyiyah)',
    ended_year: 1524,
    ended_display: '1524 M (Diintegrasikan ke Kesultanan Aceh Darussalam)',
    ended_certainty: 'verified',
    status_summary: 'Diintegrasikan ke dalam Kesultanan Aceh Darussalam pada tahun 1524 setelah pendudukan singkat Portugis (1521).',
    summary: 'Kesultanan Islam pertama di Nusantara yang memiliki bukti epigrafi dan numismatik terverifikasi. Berdiri di pesisir utara Sumatera dan menjadi bandar niaga internasional serta pusat keilmuan fikih Syafi\'i pada abad ke-13 hingga ke-16.',
    political_history: 'Didirikan oleh Meurah Silu yang bergelar Sultan Malik as-Saleh (wafat Ramadhan 696 H / 1297 M menurut inskripsi batu nisannya di Aceh Utara). Kesultanan ini dikunjungi oleh Marco Polo (1292), musafir Maroko Ibn Battuta (1345–1346), serta armada Laksamana Cheng Ho pada awal abad ke-15. Pada tahun 1521 Portugis menduduki Pasai, sebelum akhirnya Sultan Ali Mughayat Syah menyatukan Pasai ke dalam Kesultanan Aceh Darussalam pada 1524.',
    economic_network: 'Pusat ekspor lada, kapur barus (kamper), emas, dan sutra yang menghubungkan pedagang Gujarat, Arab, Persia, dan Dinasti Yuan/Ming Tiongkok. Mencetak mata uang emas murni bernama Dirham (Deureuham).',
    cultural_legacy: 'Melahirkan karya historiografi Melayu tertua (Hikayat Raja-Raja Pasai), menjadi rujukan hukum Islam bagi Malaka dan Jawa, serta meninggalkan nisan-nisan kaligrafi batu Aceh dan marmer Cambay.',
    decline_factors: 'Konflik suksesi internal di istana Pasai pada awal abad ke-16, intervensi militer Portugis dari Malaka (1521), dan penyatuan wilayah oleh Kesultanan Aceh Darussalam (1524).',
    historicalContext: {
      politics: 'Monarki Islam kosmopolitan di pesisir Aceh Utara yang menjalin hubungan diplomatik dengan Kesultanan Delhi, Kekhalifahan Mamluk, dan Dinasti Ming Tiongkok.',
      economy: 'Mencetak koin emas Deureuham bertuliskan nama sultan dalam aksara Arab dan mengekspor lada, kapur barus, serta benzoin.',
      maritime: 'Pelabuhan transhipment utama di pintu masuk utara Selat Malaka yang ramai disinggahi kapal jung Tiongkok dan dhow Arab-India.',
      cultureAndReligion: 'Pusat kajian fikih mazhab Syafi\'i (sebagaimana dicatat Ibn Battuta tahun 1345 M) dan awal mula tradisi penulisan bahasa Melayu aksara Jawi.'
    },
    territory_notes: 'Berpusat di lembah Sungai Krueng Pase dan Krueng Geukueh (Aceh Utara) dengan pengaruh niaga di sepanjang pesisir timur laut Aceh; batas wilayah daratan tidak dipetakan sebagai poligon karena ketiadaan peta batas primer abad ke-14.',
    disputedClaims: [
      {
        claimTopic: 'Tahun Awal Pemerintahan Meurah Silu (Sultan Malik as-Saleh)',
        versionA: 'Sebagian literatur populer mencantumkan tahun 1267 M sebagai awal berdirinya pemerintahan Meurah Silu.',
        versionB: 'Bukti epigrafi primer yang paling pasti adalah batu nisan Sultan Malik as-Saleh yang mencatat tahun wafatnya pada bulan Ramadhan 696 H (1297 M), serta laporan Marco Polo (1292 M).',
        sourceIds: ['src_bachtiar_pasai_epigraphy', 'src_ricklefs_2008']
      }
    ],
    source_ids: ['src_bachtiar_pasai_epigraphy', 'src_ricklefs_2008', 'src_reid_1993', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_aceh',
    name: 'Kesultanan Aceh Darussalam',
    alternate_names: ['Kerajaan Aceh', 'Bandar Aceh Darussalam', 'Asyi'],
    polity_type: 'Kesultanan',
    region: 'Sumatera',
    modern_province: 'Aceh (Kota Banda Aceh)',
    capital: 'Kutaraja (Banda Aceh)',
    latitude: 5.5536,
    longitude: 95.3172,
    coord_certainty: 'verified',
    founded_year: 1496,
    founded_display: 'Akhir Abad ke-15 / Awal Abad ke-16 M (c. 1496–1514 M)',
    founded_certainty: 'verified',
    golden_age_start: 1607,
    golden_age_end: 1675,
    golden_age_display: '1607–1675 M (Era Sultan Iskandar Muda hingga Sultanah Safiatuddin)',
    ended_year: 1903,
    ended_display: '1903 M (Penyerahan kedaulatan militer Sultan Muhammad Daud Syah)',
    ended_certainty: 'verified',
    status_summary: 'Berakhir secara politik-militer pada 1903 pasca Perang Aceh (1873–1904), namun perlawanan ulama dan rakyat berlanjut hingga abad ke-20.',
    summary: 'Kekuatan maritim, militer, dan intelektual Islam terbesar di ujung barat Nusantara. Tumbuh pesat setelah jatuhnya Malaka ke tangan Portugis (1511) dan mencapai puncak kejayaan pada masa Sultan Iskandar Muda (1607–1636).',
    political_history: 'Sultan Ali Mughayat Syah menyatukan Bandar Aceh, Daya, Pidie, dan Pasai pada dekade 1520-an. Pada abad ke-16, Sultan Alauddin al-Kahar menjalin aliansi militer dan artileri dengan Kesultanan Utsmaniyah (Turki Ottoman). Di bawah Sultan Iskandar Muda, Aceh menguasai pelabuhan-pelabuhan lada di pesisir barat dan timur Sumatera serta Semenanjung Malaya (Pahang, Kedah, Perak). Setelah 1641, Aceh dipimpin oleh empat Sultanah (ratu) berturut-turut selama hampir enam dekade.',
    economic_network: 'Pengendali utama jalur perdagangan lada, timah, emas, dan gajah di Samudra Hindia dan Selat Malaka, berdagang langsung dengan saudagar Arab, Gujarat, Inggris, Prancis, dan Belanda.',
    cultural_legacy: 'Dijuluki "Serambi Mekkah", menjadi pusat kesusastraan Melayu dan tasawuf dengan tokoh ulama besar seperti Hamzah Fansuri, Syamsuddin as-Sumatrani, Nuruddin ar-Raniri, dan Abdurrauf as-Singkili.',
    decline_factors: 'Menguatnya monopoli VOC dan Inggris di Selat Malaka (Perjanjian Painan 1663, Traktat London 1824, Traktat Sumatera 1871) yang berujung pada agresi militer kolonial Belanda dalam Perang Aceh (1873–1904).',
    historicalContext: {
      politics: 'Kekuatan geopolitik utama di Selat Malaka yang memiliki hubungan diplomatik resmi dengan Kesultanan Utsmaniyah di Istanbul, Kerajaan Inggris (Ratu Elizabeth I & Raja James I), dan Belanda.',
      economy: 'Produsen dan eksportir lada terbesar di Samudra Hindia pada abad ke-16 dan ke-17 serta pusat perdagangan emas Sumatera.',
      maritime: 'Memiliki armada kapal perang galai besar (seperti kapal Cakra Donya) yang mengawasi jalur niaga pesisir Sumatera dan Semenanjung Malaya.',
      cultureAndReligion: 'Pusat intelektual Islam Asia Tenggara yang melahirkan karya sastra dan kitab keagamaan Melayu-Jawi (Bustanus Salatin, Mir\'atuth Thullab, syair tasawuf Hamzah Fansuri).'
    },
    territory_notes: 'Pada masa Sultan Iskandar Muda, pengaruh politik dan niaga Aceh membentang dari ujung utara Sumatera hingga pesisir barat (Barus, Tiku, Pariaman, Indrapura) dan pesisir timur (Deli, Asahan) serta sebagian Semenanjung Malaya.',
    disputedClaims: [
      {
        claimTopic: 'Tahun Awal Konsolidasi Kesultanan Aceh (1496 M vs 1514 M)',
        versionA: 'Kronik lokal Bustanus Salatin dan tradisi Aceh menempatkan awal pemerintahan Sultan Ali Mughayat Syah pada akhir abad ke-15 (c. 1496 M).',
        versionB: 'Sejarawan seperti Denys Lombard dan M.C. Ricklefs mencatat bahwa kebangkitan politik Aceh sebagai kekuatan penyatu pesisir utara Sumatera terkonfirmasi kuat antara 1514 hingga 1530 M (tahun wafat Ali Mughayat Syah pada batu nisannya: 936 H / 1530 M).',
        sourceIds: ['src_lombard_2006', 'src_ricklefs_2008']
      }
    ],
    source_ids: ['src_lombard_2006', 'src_ricklefs_2008', 'src_reid_1993', 'src_cribb_2000', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_siak',
    name: 'Kesultanan Siak Sri Indrapura',
    alternate_names: ['Kerajaan Siak', 'Asserayah Hasyimiah'],
    polity_type: 'Kesultanan',
    region: 'Sumatera',
    modern_province: 'Riau (Kabupaten Siak)',
    capital: 'Buantan / Mempura / Siak Sri Indrapura',
    latitude: 0.7950,
    longitude: 102.0489,
    coord_certainty: 'verified',
    founded_year: 1723,
    founded_display: '1723 M',
    founded_certainty: 'verified',
    golden_age_start: 1784,
    golden_age_end: 1908,
    golden_age_display: 'Abad ke-18–Awal Abad ke-20 M (Era Sultan Yahya hingga Sultan Syarif Hasyim)',
    ended_year: 1945,
    ended_display: '1945 M (Menyatakan bergabung ke Negara Kesatuan Republik Indonesia)',
    ended_certainty: 'verified',
    status_summary: 'Sultan Syarif Kasim II secara sukarela mengintegrasikan kedaulatan Kesultanan Siak ke dalam Republik Indonesia pada tahun 1945.',
    summary: 'Kesultanan Melayu-Islam terbesar di pesisir timur Sumatera yang mengendalikan jalur perdagangan Sungai Siak dan Selat Malaka sejak abad ke-18 hingga kemerdekaan Indonesia.',
    political_history: 'Didirikan pada tahun 1723 oleh Raja Kecil (Sultan Abdul Jalil Rahmat Syah) setelah dinamika politik di Kesultanan Johor. Pada akhir abad ke-18, tampuk kepemimpinan beralih ke dinasti keturunan Arab-Melayu (keluarga Syahabuddin) yang memperkuat pengaruh Siak di sepanjang pesisir timur Sumatera hingga Deli dan Asahan. Pada 1945, Sultan Syarif Kasim II menyerahkan mahkota dan kekayaan kesultanan senilai 13 juta gulden untuk mendukung Republik Indonesia.',
    economic_network: 'Menguasai jalur pelayaran pedalaman Sungai Siak yang menghubungkan hasil hutan, kamper, timah, dan emas dari dataran tinggi Minangkabau ke pasar internasional Selat Malaka.',
    cultural_legacy: 'Peninggalan Istana Asserayah Hasyimiah (1889), kitab konstitusi hukum Babul Qawaid, tradisi tenun songket Siak, dan kesenian Zapin Melayu.',
    decline_factors: 'Traktat Siak 1858 dengan Hindia Belanda yang mengurangi otonomi luar negeri kesultanan, hingga akhirnya memilih berintegrasi penuh ke dalam NKRI pada 1945.',
    historicalContext: {
      politics: 'Monarki Melayu-Islam yang mengombinasikan sistem Dewan Menteri (Datuk Empat Suku) dengan kodifikasi hukum modern Babul Qawaid.',
      economy: 'Jalur niaga sungai strategis yang menyalurkan hasil bumi pedalaman Sumatera Tengah (emas, gambir, rotan, kayu) menuju Selat Malaka.',
      maritime: 'Mengendalikan armada perahu niaga dan kapal penjaga di muara Sungai Siak, Bengkalis, hingga pesisir Sumatera Timur.',
      cultureAndReligion: 'Pusat kebudayaan Melayu pesisir, pendidikan madrasah (Madrasah Taufiqiah dan Madrasah An-Nisa), serta arsitektur istana Melayu-Arab-Eropa.'
    },
    territory_notes: 'Berpusat di sepanjang daerah aliran Sungai Siak, Bengkalis, dan Pekanbaru dengan pengaruh historis di pesisir timur Sumatera; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_ricklefs_2008', 'src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  },
  {
    id: 'kgd_palembang',
    name: 'Kesultanan Palembang Darussalam',
    alternate_names: ['Kerajaan Palembang', 'Kesultanan Palembang'],
    polity_type: 'Kesultanan',
    region: 'Sumatera',
    modern_province: 'Sumatera Selatan (Kota Palembang)',
    capital: 'Palembang (Kuto Gawang / Beringin Janggut / Kuto Besak)',
    latitude: -2.9914,
    longitude: 104.7594,
    coord_certainty: 'verified',
    founded_year: 1659,
    founded_display: '1659 M (Proklamasi Kesultanan oleh Sultan Abdurrahman)',
    founded_certainty: 'verified',
    golden_age_start: 1724,
    golden_age_end: 1803,
    golden_age_display: '1724–1803 M (Era Sultan Mahmud Badaruddin I & Sultan Muhammad Bahauddin)',
    ended_year: 1823,
    ended_display: '1823 M (Penghapusan institusi kesultanan oleh Hindia Belanda)',
    ended_certainty: 'verified',
    status_summary: 'Institusi kesultanan dihapuskan secara sepihak oleh pemerintah kolonial Hindia Belanda pada tahun 1823 setelah pengasingan Sultan Mahmud Badaruddin II ke Ternate (1821).',
    summary: 'Kesultanan maritim dan sungai yang makmur di Sumatera bagian selatan, terkenal karena kekayaan tambang timah Pulau Bangka-Belitung, komoditas lada, serta pusat keilmuan Islam Melayu-Palembang.',
    political_history: 'Cikal bakal pemerintahan Islam di Palembang dirintis oleh tokoh-tokoh pelarian dari Demak dan Pajang pada abad ke-16. Setelah serangan VOC yang menghancurkan Keraton Kuto Gawang pada 1659, Ki Mas Endi memproklamasikan berdirinya Kesultanan Palembang Darussalam dengan gelar Sultan Abdurrahman dan melepaskan diri dari ketergantungan pada Mataram. Pada awal abad ke-19, Sultan Mahmud Badaruddin II memimpin perlawanan sengit melawan ekspedisi Inggris dan Belanda (Perang Menteng 1819) sebelum diasingkan ke Ternate pada 1821.',
    economic_network: 'Pemasok utama lada dari pedalaman Uluan Musi dan penghasil timah terbesar di Asia Tenggara dari Pulau Bangka pada abad ke-18.',
    cultural_legacy: 'Benteng Kuto Besak, Masjid Agung Palembang, songket lepus emas, serta karya ulama besar Syekh Abdus Samad al-Palimbani (pengarang kitab Siyar as-Salikin dan Hidayatus Salikin).',
    decline_factors: 'Perebutan monopoli tambang timah Pulau Bangka oleh Inggris dan Belanda serta ekspedisi militer besar-besaran Hindia Belanda tahun 1819 dan 1821.',
    historicalContext: {
      politics: 'Sistem pemerintahan sungai yang menghubungkan ibu kota keraton (Iliran) dengan wilayah penghasil komoditas di hulu Sungai Musi (Uluan) melalui institusi Sindang Merdeka.',
      economy: 'Kemakmuran luar biasa pada abad ke-18 berkat penemuan dan penambangan timah skala besar di Pulau Bangka serta ekspor lada.',
      maritime: 'Pengendali jaringan sungai Batanghari Sembilan (Sungai Musi dan anak-anak sungainya) serta jalur pelayaran Selat Bangka.',
      cultureAndReligion: 'Pusat penerjemahan dan penulisan kitab tasawuf serta fikih berbahasa Melayu-Jawi yang dipelopori ulama Syekh Abdus Samad al-Palimbani dan Kemas Fakhruddin.'
    },
    territory_notes: 'Meliputi daerah aliran Sungai Musi (Sumatera Selatan) serta kepulauan Bangka dan Belitung; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_ricklefs_2008', 'src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  },
  {
    id: 'kgd_demak',
    name: 'Kesultanan Demak',
    alternate_names: ['Demak Bintoro', 'Glagahwangi', 'Kasultanan Demak'],
    polity_type: 'Kesultanan',
    region: 'Jawa',
    modern_province: 'Jawa Tengah (Kabupaten Demak)',
    capital: 'Demak Bintoro',
    latitude: -6.8946,
    longitude: 110.6375,
    coord_certainty: 'verified',
    founded_year: 1478,
    founded_display: 'Akhir Abad ke-15 M (c. 1475–1478 M)',
    founded_certainty: 'estimated',
    golden_age_start: 1518,
    golden_age_end: 1546,
    golden_age_display: '1518–1546 M (Era Pati Unus & Sultan Trenggana)',
    ended_year: 1554,
    ended_display: 'Pertengahan Abad ke-16 M (c. 1549–1568 M, peralihan ke Pajang)',
    ended_certainty: 'estimated',
    status_summary: 'Pusat hegemoni politik berpindah ke pedalaman (Kesultanan Pajang di bawah Sultan Hadiwijaya / Jaka Tingkir) setelah konflik suksesi pasca wafatnya Sultan Trenggana (1546).',
    summary: 'Kesultanan Islam pertama di Pulau Jawa yang menjadi pelopor penyebaran Islam bersama Wali Songo dan menyatukan bandar-bandar niaga pesisir utara Jawa (Pasisir) pasca kemunduran Majapahit.',
    political_history: 'Didirikan oleh Raden Patah (yang dalam catatan Portugis Suma Oriental karya Tomé Pires diidentifikasi berkaitan dengan tokoh Pate Rodim / Jin Bun) di Glagahwangi/Bintoro pada akhir abad ke-15. Di bawah Pati Unus, Demak mengirimkan ekspedisi laut ke Malaka (1512–1513). Puncak perluasan wilayah terjadi pada masa Sultan Trenggana (1521–1546) yang mendukung berdirinya Cirebon dan Banten di barat serta menaklukkan wilayah Jawa Timur hingga Pasuruan. Gugurnya Sultan Trenggana saat ekspedisi ke Panarukan (1546) memicu perang suksesi antara Sunan Prawoto dan Arya Penangsang.',
    economic_network: 'Pengekspor utama beras dan bahan pangan dari dataran aluvial Jawa Tengah ke Malaka dan Maluku, ditukar dengan rempah-rempah cengkih dan pala.',
    cultural_legacy: 'Masjid Agung Demak dengan konstruksi Saka Guru dan atap tajug tumpang tiga, seni wayang kulit dan gamelan dakwah Wali Songo, serta tradisi Grebeg Besar.',
    decline_factors: 'Konflik suksesi berdarah pasca wafatnya Sultan Trenggana (1546) dan pendangkalan selat Muria yang memisahkan Demak dari Pulau Muria.',
    historicalContext: {
      politics: 'Kekuatan politik Islam pertama di Jawa yang memadukan legitimasi dinasti Majapahit dengan otoritas keagamaan dewan ulama Wali Songo.',
      economy: 'Lumbung beras utama Nusantara yang memasok pangan bagi kapal-kapal dagang dan bandar rempah di Malaka serta Maluku.',
      maritime: 'Memiliki pangkalan armada laut kuat di Jepara dan Demak yang mampu menyeberangi Laut Jawa hingga ke Selat Malaka.',
      cultureAndReligion: 'Pelopor akulturasi arsitektur masjid beratap tajug (tanpa kubah) serta pemanfaatan seni pertunjukan wayang dan tembang Jawa sebagai media dakwah.'
    },
    territory_notes: 'Pada masa Sultan Trenggana, pengaruh Demak mencakup koridor pesisir utara Jawa (Jepara, Semarang, Tuban, Gresik, Surabaya), pedalaman Jawa Tengah (Pajang, Mataram), serta aliansi erat dengan Cirebon dan Banten.',
    disputedClaims: [
      {
        claimTopic: 'Tahun Pasti Berdirinya Kesultanan Demak (1478 M vs Awal Abad ke-16 M)',
        versionA: 'Tradisi Babad Tanah Jawi mengaitkan berdirinya Demak dan runtuhnya Majapahit dengan candrasengkala "Sirna Ilang Kertaning Bumi" (1400 Saka / 1478 M).',
        versionB: 'Kajian epigrafi (Prasasti Trailokyapuri 1486 M) dan catatan Portugis Suma Oriental (1515 M) menunjukkan bahwa kerajaan Hindu-Buddha di pedalaman masih bertahan hingga dekade 1510–1527 M, sehingga konsolidasi Demak berlangsung bertahap antara c. 1475 hingga awal abad ke-16 M.',
        sourceIds: ['src_pigeaud_1976', 'src_suma_oriental_1515', 'src_ricklefs_2008']
      }
    ],
    source_ids: ['src_pigeaud_1976', 'src_suma_oriental_1515', 'src_ricklefs_2008', 'src_cribb_2000', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_cirebon',
    name: 'Kesultanan Cirebon',
    alternate_names: ['Caruban Nagari', 'Pakungwati'],
    polity_type: 'Kesultanan',
    region: 'Jawa',
    modern_province: 'Jawa Barat (Kota Cirebon)',
    capital: 'Caruban / Pakungwati (Kota Cirebon)',
    latitude: -6.7258,
    longitude: 108.5706,
    coord_certainty: 'verified',
    founded_year: 1479,
    founded_display: 'Abad ke-15 M (Kedaulatan penuh c. 1479 M)',
    founded_certainty: 'estimated',
    golden_age_start: 1479,
    golden_age_end: 1568,
    golden_age_display: '1479–1568 M (Masa pemerintahan Sunan Gunung Jati)',
    ended_year: 1677,
    ended_display: '1677 M (Terbagi menjadi Keraton Kasepuhan & Kanoman; tetap eksis sebagai keraton budaya)',
    ended_certainty: 'verified',
    status_summary: 'Pada tahun 1677 kesultanan terbagi menjadi Kasepuhan dan Kanoman (kemudian Kacirebonan); keraton-keraton Cirebon tetap lestari sebagai pemangku adat dan budaya hingga kini.',
    summary: 'Kesultanan jembatan budaya antara tanah Sunda dan Jawa di pesisir utara Jawa Barat, yang menjadi pusat dakwah Islam di bawah kepemimpinan Syarif Hidayatullah (Sunan Gunung Jati).',
    political_history: 'Dirintis oleh Pangeran Walangsungsang (Cakrabuana) di pedukuhan pesisir Caruban, lalu dikukuhkan sebagai kesultanan berdaulat oleh keponakannya, Syarif Hidayatullah (Sunan Gunung Jati) sekitar tahun 1479 dengan melepaskan kewajiban upeti ke Pakuan Pajajaran. Bersama Demak, Cirebon mengamankan pelabuhan Banten dan Sunda Kelapa (1526–1527). Pada tahun 1677, pasca wafatnya Panembahan Girilaya di Mataram, kesultanan dibagi untuk kedua putranya menjadi Kasepuhan dan Kanoman.',
    economic_network: 'Pelabuhan transito strategis yang mengekspor beras, garam, terasi, dan kayu jati serta mengimpor porselen Tiongkok dan tekstil India.',
    cultural_legacy: 'Keraton Kasepuhan, Kanoman, dan Kacirebonan, Masjid Agung Sang Cipta Rasa, motif batik Mega Mendung, lukisan kaca Cirebon, dan Tari Topeng Cirebon.',
    decline_factors: 'Posisi geopolitik yang terjepit di antara ekspansi Mataram Islam dari timur dan VOC di Batavia dari barat, serta pembagian takhta pada 1677 dan kontrak protektorat VOC tahun 1681.',
    historicalContext: {
      politics: 'Negara penyangga (buffer state) dan pusat spiritual yang dihormati baik oleh Kesultanan Banten maupun Kesultanan Mataram Islam.',
      economy: 'Pelabuhan niaga pesisir yang menghubungkan hasil pertanian Priangan Timur dengan jalur pelayaran Laut Jawa.',
      maritime: 'Bandar pelabuhan Muara Jati yang ramai disinggahi kapal dagang Nusantara dan mancanegara sejak abad ke-15.',
      cultureAndReligion: 'Sintesis unik budaya Sunda, Jawa, Arab, dan Tionghoa yang tampak pada arsitektur bata merah keraton dan ragam hias Mega Mendung.'
    },
    territory_notes: 'Mencakup wilayah pesisir Cirebon, Indramayu, Majalengka, Kuningan, hingga Galuh/Ciamis; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_pigeaud_1976', 'src_suma_oriental_1515', 'src_ricklefs_2008', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_banten',
    name: 'Kesultanan Banten',
    alternate_names: ['Banten Girang / Surosowan', 'Bantam'],
    polity_type: 'Kesultanan',
    region: 'Jawa',
    modern_province: 'Banten (Kota Serang)',
    capital: 'Surosowan (Banten Lama, Kota Serang)',
    latitude: -6.0361,
    longitude: 106.1540,
    coord_certainty: 'verified',
    founded_year: 1526,
    founded_display: '1526 M (Penguasaan pelabuhan) / 1552 M (Kedaulatan Maulana Hasanuddin)',
    founded_certainty: 'verified',
    golden_age_start: 1651,
    golden_age_end: 1682,
    golden_age_display: '1651–1682 M (Era Sultan Ageng Tirtayasa)',
    ended_year: 1813,
    ended_display: '1813 M (Dihapuskan secara politik oleh pemerintah kolonial Raffles / Daendels)',
    ended_certainty: 'verified',
    status_summary: 'Kedaulatan politik dihapuskan oleh pemerintah kolonial Eropa pada 1808–1813 setelah penghancuran Keraton Surosowan oleh Daendels.',
    summary: 'Kesultanan maritim kosmopolitan di ujung barat Pulau Jawa yang menguasai jalur strategis Selat Sunda dan menjadi salah satu pusat perdagangan lada terbesar di Asia pada abad ke-16 hingga ke-17.',
    political_history: 'Dirintis oleh Sunan Gunung Jati dan putranya, Maulana Hasanuddin, yang menguasai Banten Girang dan pelabuhan Banten pada 1526, lalu menjadi kesultanan mandiri pada 1552. Putranya, Maulana Yusuf, menaklukkan Pakuan Pajajaran pada 1579. Puncak kejayaan tercapai di bawah Sultan Ageng Tirtayasa (1651–1683) yang memodernisasi armada kapal, membuka saluran irigasi Pontang-Tanara, dan menentang monopoli VOC di Batavia.',
    economic_network: 'Emporium perdagangan bebas internasional untuk komoditas lada dari Banten dan Lampung, tempat bertemunya pedagang Inggris, Denmark, Prancis, Tiongkok, India, Arab, dan Persia.',
    cultural_legacy: 'Masjid Agung Banten dengan menara uniknya, reruntuhan Keraton Surosowan dan Keraton Kaibon, kesenian Debus, serta naskah keagamaan Syekh Nawawi al-Bantani pada abad ke-19.',
    decline_factors: 'Konflik internal antara Sultan Ageng Tirtayasa dan putranya Sultan Haji yang dimanfaatkan oleh VOC pada 1682–1684, disusul pembubaran kesultanan pada era Daendels-Raffles (1808–1813).',
    historicalContext: {
      politics: 'Kesultanan pelabuhan yang memiliki jaringan diplomasi luas hingga mengirimkan duta besar (Kyai Ngabehi Naya Wipraya) ke istana Raja Charles II di London, Inggris pada tahun 1682.',
      economy: 'Pusat perdagangan lada hitam bebas pajak tinggi yang menjadi pesaing utama kompeni dagang VOC di Batavia.',
      maritime: 'Menguasai lalu lintas pelayaran internasional di Selat Sunda yang menghubungkan Samudra Hindia dan Laut Jawa.',
      cultureAndReligion: 'Kota pelabuhan multi-etnis dengan perkampungan pedagang mancanegara (Pekojan, Pecinan, loji Eropa) dan pusat pendidikan ulama Nusantara.'
    },
    territory_notes: 'Wilayah kedaulatan mencakup seluruh Banten (Serang, Pandeglang, Lebak, Tangerang barat Cisadane) serta wilayah penghasil lada di Lampung dan Bengkulu selatan.',
    disputedClaims: [],
    source_ids: ['src_guillot_1990', 'src_pigeaud_1976', 'src_ricklefs_2008', 'src_reid_1993', 'src_cribb_2000', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_mataram',
    name: 'Kesultanan Mataram Islam',
    alternate_names: ['Nagari Mataram', 'Mataram Kotagede / Plered / Kartasura'],
    polity_type: 'Kesultanan',
    region: 'Jawa',
    modern_province: 'DI Yogyakarta & Jawa Tengah',
    capital: 'Kotagede → Karta → Plered → Kartasura → Surakarta/Yogyakarta',
    latitude: -7.8294,
    longitude: 110.3980,
    coord_certainty: 'verified',
    founded_year: 1584,
    founded_display: 'Akhir Abad ke-16 M (c. 1584–1586 M)',
    founded_certainty: 'verified',
    golden_age_start: 1613,
    golden_age_end: 1645,
    golden_age_display: '1613–1645 M (Masa pemerintahan Sultan Agung Hanyakrakusuma)',
    ended_year: 1755,
    ended_display: '1755 M (Perjanjian Giyanti: terbagi menjadi Kasunanan Surakarta & Kasultanan Yogyakarta)',
    ended_certainty: 'verified',
    status_summary: 'Melalui Perjanjian Giyanti (13 Februari 1755) dan Perjanjian Salatiga (1757), Mataram bertransformasi menjadi Catur Sagotra (Kasunanan Surakarta, Kasultanan Yogyakarta, Mangkunegaran, dan kemudian Pakualaman) yang masih berdiri hingga kini.',
    summary: 'Kerajaan agraris-militer Islam terbesar di Pulau Jawa yang menyatukan pedalaman dan pesisir Jawa serta menciptakan sintesis agung kebudayaan Jawa-Islam.',
    political_history: 'Dibuka dari Hutan Mentaok oleh Ki Ageng Pemanahan dan ditegakkan sebagai kerajaan berdaulat oleh putranya, Panembahan Senopati (memerintah c. 1584–1601). Puncak kejayaan dicapai pada masa cucunya, Sultan Agung Hanyakrakusuma (1613–1645), yang menaklukkan Surabaya (1625), menyatukan hampir seluruh Jawa dan Madura, serta melancarkan dua ekspedisi besar mengepung markas VOC di Batavia (1628 dan 1629). Pada abad ke-18, serangkaian perang suksesi Jawa berakhir dengan Perjanjian Giyanti (1755) yang membagi wilayah Mataram menjadi Surakarta dan Yogyakarta.',
    economic_network: 'Berbasis pertanian padi sawah yang sangat produktif di lembah vulkanik Jawa Tengah dan Jawa Timur (Negara Agung dan Mancanegara), didukung penguasaan bandar-bandar Pasisir.',
    cultural_legacy: 'Penanggalan Kalender Jawa-Islam (1633 M), sastra suluk dan babad (Sastra Gending, Babad Tanah Jawi), arsitektur Masjid Gedhe Kotagede, Makam Imogiri, upacara Sekaten, dan tata krama bahasa Jawa.',
    decline_factors: 'Pemberontakan Trunajaya (1674–1677), tiga Perang Suksesi Jawa (1704–1755), dan intervensi militer-finansial VOC yang menuntut konsesi wilayah pesisir utara Jawa.',
    historicalContext: {
      politics: 'Monarki agraris konsentris yang membagi wilayah ke dalam Kutagara (ibu kota), Negara Agung, Mancanegara (timur dan barat), serta Pasisir.',
      economy: 'Kekuatan agraris berbasis surplus produksi beras di dataran subur Gunung Merapi, Bengawan Solo, dan Sungai Brantas.',
      maritime: 'Menguasai bandar-bandar pesisir utara Jawa (Jepara, Semarang, Tegal, Surabaya) meskipun orientasi utamanya berpindah ke pedalaman agraris.',
      cultureAndReligion: 'Sintesis harmonis Islam dan kebudayaan Jawa melalui penciptaan Kalender Jawa Sultan Agung (perpaduan tahun Saka dan Hijriah) serta karya filsafat Sastra Gending.'
    },
    territory_notes: 'Pada masa Sultan Agung, mandala kekuasaan Mataram mencakup seluruh Jawa Tengah, DI Yogyakarta, Jawa Timur, Madura, dan Priangan (Jawa Barat kecuali Banten dan Batavia).',
    disputedClaims: [
      {
        claimTopic: 'Tahun Awal Kedaulatan Panembahan Senopati (1575/1584 M vs 1586/1587 M)',
        versionA: 'Kronik Babad Tanah Jawi mengisahkan transisi cepat dari Pajang ke Mataram pada dekade 1570–1580-an.',
        versionB: 'Kajian H.J. de Graaf dan M.C. Ricklefs menempatkan pengukuhan kedaulatan penuh Panembahan Senopati setelah runtuhnya otoritas Pajang sekitar tahun 1584–1587 M.',
        sourceIds: ['src_pigeaud_1976', 'src_ricklefs_2008']
      }
    ],
    source_ids: ['src_pigeaud_1976', 'src_ricklefs_2008', 'src_cribb_2000', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_banjar',
    name: 'Kesultanan Banjar',
    alternate_names: ['Kesultanan Banjarmasin', 'Kayu Tangi / Martapura'],
    polity_type: 'Kesultanan',
    region: 'Kalimantan',
    modern_province: 'Kalimantan Selatan (Banjarmasin & Banjarbaru/Martapura)',
    capital: 'Banjarmasin (Kuin) → Martapura (Kayu Tangi)',
    latitude: -3.2942,
    longitude: 114.5736,
    coord_certainty: 'verified',
    founded_year: 1526,
    founded_display: '24 September 1526 M',
    founded_certainty: 'verified',
    golden_age_start: 1600,
    golden_age_end: 1787,
    golden_age_display: 'Abad ke-17–18 M (Era perdagangan lada & ulama Syekh Muhammad Arsyad al-Banjari)',
    ended_year: 1860,
    ended_display: '1860 M (Dihapuskan Belanda; Perang Banjar berlanjut hingga 1905)',
    ended_certainty: 'verified',
    status_summary: 'Dihapuskan secara sepihak oleh pemerintah kolonial Belanda pada 11 Juni 1860, namun pemerintahan perjuangan di bawah Pangeran Antasari dan Sultan Muhammad Seman bertahan di pedalaman Barito hingga 1905.',
    summary: 'Kesultanan Islam terbesar di Kalimantan bagian selatan yang tumbuh dari jaringan sungai Barito dan Martapura serta menjadi pusat perdagangan lada dan keilmuan Islam di Kalimantan.',
    political_history: 'Berdiri ketika Pangeran Samudera memperoleh bantuan militer dari Sultan Trenggana (Kesultanan Demak) untuk mengalahkan pamannya di Kerajaan Negara Daha, dan memeluk Islam dengan gelar Sultan Suriansyah pada 24 September 1526. Setelah serangan VOC ke Banjarmasin pada 1612, pusat keraton dipindahkan ke pedalaman di Martapura (Kayu Tangi). Intervensi Belanda dalam suksesi takhta memicu Perang Banjar (1859–1905) yang dipimpin oleh Pangeran Antasari.',
    economic_network: 'Penghasil lada hitam, intan Martapura, emas, rotan, dan batu bara yang diperdagangkan dengan jung Tiongkok, pedagang Bugis, Jawa, Inggris, dan Belanda.',
    cultural_legacy: 'Masjid Sultan Suriansyah di tepi Sungai Kuin, Undang-Undang Sultan Adam (1835), serta kitab fikih masyhur Sabilal Muhtadin karya Syekh Muhammad Arsyad al-Banjari.',
    decline_factors: 'Intervensi politik Belanda dalam pengangkatan Sultan Tamjidillah yang memicu Perang Banjar (1859) dan pengumuman penghapusan kesultanan oleh Belanda pada 1860.',
    historicalContext: {
      politics: 'Monarki maritim-sungai yang mengukuhkan konstitusi tertulis Undang-Undang Sultan Adam (1835 M) untuk mengatur hukum Islam dan adat masyarakat Banjar.',
      economy: 'Pemasok utama lada hitam Kalimantan dan intan Martapura di pasar perdagangan Laut Jawa dan Laut Tiongkok Selatan.',
      maritime: 'Mengendalikan jaringan pelayaran sungai Barito, Sungai Martapura, dan Sungai Negara hingga ke Laut Jawa.',
      cultureAndReligion: 'Pusat keilmuan fikih Syafi\'i di Kalimantan yang melahirkan ulama besar Syekh Muhammad Arsyad al-Banjari (pengarang kitab Sabilal Muhtadin).'
    },
    territory_notes: 'Meliputi Kalimantan Selatan dan pengaruh historis di sepanjang pesisir Kalimantan Tengah dan Kalimantan Tenggara; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_ricklefs_2008', 'src_reid_1993', 'src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  },
  {
    id: 'kgd_pontianak',
    name: 'Kesultanan Pontianak',
    alternate_names: ['Kesultanan Kadriah Pontianak'],
    polity_type: 'Kesultanan',
    region: 'Kalimantan',
    modern_province: 'Kalimantan Barat (Kota Pontianak)',
    capital: 'Pontianak (Pertemuan Sungai Kapuas dan Sungai Landak)',
    latitude: -0.0258,
    longitude: 109.3497,
    coord_certainty: 'verified',
    founded_year: 1771,
    founded_display: '23 Oktober 1771 M (14 Rajab 1185 H)',
    founded_certainty: 'verified',
    golden_age_start: 1771,
    golden_age_end: 1855,
    golden_age_display: 'Akhir Abad ke-18–Abad ke-19 M (Era Syarif Abdurrahman & Syarif Kasim)',
    ended_year: 1950,
    ended_display: '1950 M (Berintegrasi penuh ke dalam NKRI)',
    ended_certainty: 'verified',
    status_summary: 'Berintegrasi ke dalam Negara Kesatuan Republik Indonesia pada tahun 1950; Keraton Kadriah tetap berfungsi sebagai pusat pelestarian adat dan sejarah.',
    summary: 'Kesultanan maritim-sungai di garis khatulistiwa Kalimantan Barat yang didirikan di persimpangan Sungai Kapuas dan Sungai Landak sebagai bandar perdagangan strategis.',
    political_history: 'Didirikan pada 23 Oktober 1771 oleh Syarif Abdurrahman Alkadrie, putra ulama besar Habib Husein Alkadrie dari Mempawah. Dengan membuka hutan di pertemuan Sungai Kapuas dan Sungai Landak, ia membangun Masjid Jami dan Keraton Kadriah, lalu dinobatkan sebagai Sultan Pontianak pada 1778 oleh delegasi raja-raja Melayu dan Bugis (Raja Haji Fisabilillah). Pada masa revolusi kemerdekaan, Sultan Syarif Hamid II merancang lambang negara Garuda Pancasila.',
    economic_network: 'Pintu gerbang ekspor-impor utama Sungai Kapuas yang memperdagangkan emas, berlian Landak, karet, kopra, lada, dan hasil hutan Kalimantan Barat dengan Singapura, Riau, dan Jawa.',
    cultural_legacy: 'Keraton Kadriah dan Masjid Jami Sultan Syarif Abdurrahman berbahan kayu ulin, kain corak insang Pontianak, serta tradisi meriam karbit di tepi Sungai Kapuas.',
    decline_factors: 'Traktat kolonial abad ke-19 dengan Hindia Belanda, tragedi pendudukan Jepang di Mandor (1943–1944) yang menggugurkan Sultan Syarif Muhammad Alkadrie beserta para bangsawan, dan integrasi ke NKRI (1950).',
    historicalContext: {
      politics: 'Kesultanan pesisir yang lahir dari jaringan kosmopolitan ulama Arab Hadhrami, bangsawan Melayu, dan Bugis di Kalimantan Barat.',
      economy: 'Bandar niaga bebas di muara Sungai Kapuas (sungai terpanjang di Indonesia) yang mengontrol perdagangan hasil bumi pedalaman Kalimantan.',
      maritime: 'Menghubungkan pelayaran Laut Natuna Utara, Kepulauan Riau, Singapura, dan pesisir barat Kalimantan.',
      cultureAndReligion: 'Perpaduan arsitektur rumah panggung Melayu kayu belian (ulin) dengan tradisi keilmuan Islam di tepian Sungai Kapuas.'
    },
    territory_notes: 'Berpusat di muara dan hilir Sungai Kapuas serta Sungai Landak di Kalimantan Barat; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_ricklefs_2008', 'src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  },
  {
    id: 'kgd_kutai',
    name: 'Kesultanan Kutai Kartanegara ing Martadipura',
    alternate_names: ['Kesultanan Kutai', 'Kutai Kartanegara'],
    polity_type: 'Kesultanan',
    region: 'Kalimantan',
    modern_province: 'Kalimantan Timur (Kabupaten Kutai Kartanegara)',
    capital: 'Kutai Lama → Pemarangan → Tenggarong',
    latitude: -0.4135,
    longitude: 116.9906,
    coord_certainty: 'verified',
    founded_year: 1575,
    founded_display: 'Abad ke-14 M (Kerajaan) / c. 1575 M (Transformasi Islam)',
    founded_certainty: 'estimated',
    golden_age_start: 1732,
    golden_age_end: 1910,
    golden_age_display: 'Abad ke-18–Awal Abad ke-20 M (Era Tenggarong & kemakmuran ekonomi)',
    ended_year: 1960,
    ended_display: '1960 M (Penghapusan Daerah Swapraja Kutai dalam administrasi RI)',
    ended_certainty: 'verified',
    status_summary: 'Pemerintahan swapraja berakhir secara resmi pada 21 Januari 1960 dan beralih menjadi Kabupaten Kutai Kartanegara; kesultanan dihidupkan kembali sebagai lembaga adat budaya pada tahun 2001.',
    summary: 'Kesultanan di tepi Sungai Mahakam, Kalimantan Timur, yang awalnya berdiri pada abad ke-14 di Kutai Lama, menaklukkan Kerajaan Kutai Martadipura pada abad ke-16, dan bertransformasi menjadi kesultanan Islam sekitar tahun 1575.',
    political_history: 'Kerajaan Kutai Kartanegara didirikan oleh Aji Batara Agung Dewa Sakti di Tepian Batu (Kutai Lama) pada awal abad ke-14. Sekitar tahun 1575, pada masa pemerintahan Raja Makota (Aji Raja Mahkota Mulia Alam), Islam diterima sebagai agama kerajaan melalui dakwah ulama Tuan Tunggang Parangan dan Datuk Ri Bandang. Pada tahun 1782, Sultan Aji Muhammad Muslihuddin memindahkan ibu kota ke Tepian Pandan (Tenggarong).',
    economic_network: 'Perdagangan hasil hutan (sarang burung walet, rotan, damar, lilin lebah) melalui Sungai Mahakam dan Selat Makassar, serta eksploitasi batu bara dan minyak bumi sejak akhir abad ke-19.',
    cultural_legacy: 'Naskah kronik Salasilah Kutai, upacara adat Erau di Tenggarong, komplek makam raja-raja Kutai, dan Museum Mulawarman.',
    decline_factors: 'Perjanjian protektorat dengan Hindia Belanda pasca perang tahun 1844, dan peleburan status Daerah Istimewa/Swapraja Kutai ke dalam pemerintahan daerah Republik Indonesia pada tahun 1960.',
    historicalContext: {
      politics: 'Monarki di pesisir timur Kalimantan yang menjalin aliansi erat serta hubungan kekerabatan dengan bangsawan Bugis Wajo di Sulawesi Selatan.',
      economy: 'Mengendalikan perdagangan hasil hutan pedalaman Sungai Mahakam dan menjadi salah satu kesultanan terkaya pada akhir abad ke-19 melalui royalti minyak bumi dan batu bara.',
      maritime: 'Menguasai jalur pelayaran muara Sungai Mahakam dan perdagangan lintas Selat Makassar.',
      cultureAndReligion: 'Pelestarian tradisi adat Erau dan naskah Salasilah Kutai yang dipadukan dengan syiar Islam yang dibawa ulama Tuan Tunggang Parangan.'
    },
    territory_notes: 'Mencakup cekungan Sungai Mahakam dan pesisir Kalimantan Timur (Tenggarong, Samarinda, Balikpapan, Bontang, hingga hulu Mahakam); batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [
      {
        claimTopic: 'Perbedaan antara Kerajaan Kutai Martadipura (Abad ke-4 M) dan Kesultanan Kutai Kartanegara',
        versionA: 'Sering terjadi pencampuran di masyarakat umum antara Kerajaan Kutai Martadipura (kerajaan Hindu tertua berbukti Prasasti Yupa abad ke-4 M di Muara Kaman) dengan Kesultanan Kutai Kartanegara.',
        versionB: 'Secara historis keduanya berawal dari dua entitas berbeda: Kutai Kartanegara berdiri di Kutai Lama (hilir Mahakam) pada abad ke-14 M, memeluk Islam sekitar c. 1575 M di bawah Raja Makota, lalu menaklukkan dan menyatukan Kutai Martadipura pada masa Aji Pangeran Sinum Panji Mendapa (abad ke-17 M) sehingga bernama Kesultanan Kutai Kartanegara ing Martadipura.',
        sourceIds: ['src_ricklefs_2008', 'src_anri_perpusnas']
      }
    ],
    source_ids: ['src_ricklefs_2008', 'src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  },
  {
    id: 'kgd_gowa_tallo',
    name: 'Kesultanan Gowa-Tallo (Makassar)',
    alternate_names: ['Kerajaan Kembar Gowa-Tallo', 'Kesultanan Makassar'],
    polity_type: 'Kerajaan Kembar',
    region: 'Sulawesi',
    modern_province: 'Sulawesi Selatan (Kota Makassar & Kabupaten Gowa)',
    capital: 'Somba Opu / Sungguminasa (Makassar-Gowa)',
    latitude: -5.1903,
    longitude: 119.4067,
    coord_certainty: 'verified',
    founded_year: 1605,
    founded_display: 'Abad ke-14 M (Kerajaan) / 22 September 1605 M (Resmi Kesultanan Islam)',
    founded_certainty: 'verified',
    golden_age_start: 1605,
    golden_age_end: 1667,
    golden_age_display: '1605–1667 M (Era Karaeng Matoaya, Sultan Alauddin, hingga Sultan Hasanuddin)',
    ended_year: 1945,
    ended_display: '1667 M (Perjanjianaya) / 1906 M (Ekspedisi Belanda) / 1945 M (Integrasi NKRI)',
    ended_certainty: 'verified',
    status_summary: 'Hegemoni maritim berakhir melalui Perjanjianaya (1667), perlawanan bersenjata terjadi kembali pada 1905–1906, dan Sultan Muhammad Abdul Kadir Aiduddin menyatakan integrasi Gowa ke dalam NKRI pada 1945.',
    summary: 'Persekutuan kerajaan kembar ("Rua Karaeng se\'re ata" — dua raja satu rakyat) di Sulawesi Selatan yang menjadi kekuatan maritim dan pelindung perdagangan bebas terbesar di kawasan timur Nusantara pada abad ke-17.',
    political_history: 'Kerajaan Gowa dan Tallo bersatu di bawah prinsip kerja sama di mana Raja Gowa menjadi Sombaya (penguasa tertinggi) dan Raja Tallo menjadi Tuma\'bicara-butta (mangkubumi). Pada 22 September 1605 (9 Jumadil Awal 1014 H), Raja Tallo Karaeng Matoaya dan Raja Gowa I Mangnga\'rangi (Sultan Alauddin) resmi memeluk Islam melalui dakwah Datuk Ri Bandang. Antara 1608–1611, Gowa-Tallo menyebarkan Islam ke seluruh kerajaan Bugis di Sulawesi Selatan. Penolakan Sultan Hasanuddin terhadap monopoli rempah VOC memicu Perang Makassar (1666–1669) dan Perjanjianaya (1667).',
    economic_network: 'Bandar transito bebas internasional yang menghubungkan cengkih dan pala dari Maluku serta kayu cendana dari Nusa Tenggara dengan pedagang Portugis, Inggris, Denmark, India, Melayu, dan Tiongkok.',
    cultural_legacy: 'Tradisi penulisan catatan harian berangka tahun yang sangat presisi (Lontara Bilang Gowa-Tallo), hukum pelayaran Amanna Gappa, Benteng Somba Opu, Benteng Rotterdam (Ujung Pandang), dan Masjid Tua Katangka.',
    decline_factors: 'Aliansi militer VOC di bawah Cornelis Speelman dengan pasukan Bugis Bone pimpinan Arung Palakka yang berhasil menghancurkan Benteng Somba Opu pada Juni 1669.',
    historicalContext: {
      politics: 'Sistem pemerintahan dwitunggal (Raja Gowa sebagai kepala negara dan Raja Tallo sebagai perdana menteri/mangkubumi) yang sangat efektif dan melek ilmu pengetahuan modern abad ke-17.',
      economy: 'Pelabuhan bebas yang menjunjung prinsip Mare Liberum ("Tuhan menciptakan daratan dan lautan; lautan telah dibagi-Nya di antara semua manusia" — doktrin Sultan Alauddin tahun 1615).',
      maritime: 'Armada perahu padewakang dan galai perang yang menghubungkan Sulawesi, Kalimantan Timur, Sumbawa (Bima), Timor, hingga Maluku.',
      cultureAndReligion: 'Tradisi historiografi Lontara Bilang yang mencatat peristiwa sejarah dengan penanggalan Masehi dan Hijriah secara sangat akurat.'
    },
    territory_notes: 'Sebelum Perjanjianaya 1667, lingkup pengaruh Gowa-Tallo mencakup Sulawesi Selatan, pesisir Sulawesi Barat dan Tengah, Kalimantan Timur, hingga Sumbawa (Bima) dan Flores.',
    disputedClaims: [],
    source_ids: ['src_andaya_1981', 'src_reid_1993', 'src_ricklefs_2008', 'src_cribb_2000', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_bone',
    name: 'Kesultanan Bone',
    alternate_names: ['Kerajaan Bone', 'Akkarungeng Bone'],
    polity_type: 'Kesultanan',
    region: 'Sulawesi',
    modern_province: 'Sulawesi Selatan (Kabupaten Bone)',
    capital: 'Watampone (Bone)',
    latitude: -4.5386,
    longitude: 120.3278,
    coord_certainty: 'verified',
    founded_year: 1611,
    founded_display: 'Abad ke-14 M (Kerajaan) / 1611 M (Resmi memeluk Islam)',
    founded_certainty: 'verified',
    golden_age_start: 1672,
    golden_age_end: 1714,
    golden_age_display: '1672–1714 M (Era Arung Palakka Sultan Saaduddin & La Patau Matanna Tikka)',
    ended_year: 1946,
    ended_display: '1905 M (Rumpa\'na Bone) / 1945–1950 M (Integrasi penuh ke dalam NKRI)',
    ended_certainty: 'verified',
    status_summary: 'Setelah perlawanan bersenjata melawan Belanda pada 1905 (Rumpa\'na Bone), takhta Bone dipulihkan pada 1931 di bawah La Mappanyukki yang kemudian mendukung penuh kemerdekaan Republik Indonesia (1945).',
    summary: 'Kerajaan Bugis terbesar di Sulawesi Selatan (anggota utama aliansi Tellumpoccoe bersama Wajo dan Soppeng) yang menerima Islam pada tahun 1611 dan menjadi kekuatan politik paling dominan di Sulawesi Selatan pasca 1667.',
    political_history: 'Berdiri sejak abad ke-14 di bawah Manurunge ri Matajang. Pada tahun 1611, Bone menerima Islam sebagai agama resmi pada masa pemerintahan La Tenripale (Sultan Adam). Pada paruh kedua abad ke-17, bangsawan Bone La Tenritatta Arung Palakka memimpin pembebasan rakyat Bugis dan bersekutu dengan VOC dalam Perang Makassar, menjadikan Bone sebagai pemegang hegemoni utama di Sulawesi Selatan sejak 1672.',
    economic_network: 'Pusat produksi beras di Teluk Bone serta jaringan pelayaran dan perantau Bugis yang tersebar di seluruh bandar Nusantara (Riau, Johor, Kalimantan, Jawa).',
    cultural_legacy: 'Sistem ketatanegaraan adat Ade\' Pitue (Dewan Tujuh Menteri), naskah Lontara Bugis, pusaka kerajaan di Museum ArajangE, dan istana Bola Soba.',
    decline_factors: 'Ekspedisi militer Hindia Belanda terhadap Bone pada 1824–1825, 1859–1860, dan 1905, sebelum berintegrasi ke dalam Republik Indonesia.',
    historicalContext: {
      politics: 'Monarki konstitusional adat Bugis di mana kekuasaan Arumpone (Raja) diimbangi oleh dewan perwakilan tujuh wilayah adat (Ade\' Pitue).',
      economy: 'Pertanian padi subur di dataran Bone serta perdagangan maritim di Teluk Bone dan jaringan diaspora perantau Bugis.',
      maritime: 'Pelabuhan Bajoe di Teluk Bone menjadi simpul pelayaran antara Sulawesi Selatan, Sulawesi Tenggara (Buton), dan Maluku.',
      cultureAndReligion: 'Perpaduan konsep Pangadereng (tata nilai adat Bugis) dengan Sara\' (syariat Islam) sebagai sendi utama kehidupan bermasyarakat.'
    },
    territory_notes: 'Meliputi wilayah Kabupaten Bone dan pesisir barat Teluk Bone, dengan pengaruh politik dominan atas kerajaan-kerajaan di Sulawesi Selatan pada akhir abad ke-17 hingga ke-18; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_andaya_1981', 'src_ricklefs_2008', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_buton',
    name: 'Kesultanan Buton (Wolio)',
    alternate_names: ['Kesultanan Butuni', 'Kerajaan Wolio'],
    polity_type: 'Kesultanan',
    region: 'Sulawesi',
    modern_province: 'Sulawesi Tenggara (Kota Baubau & Kepulauan Buton)',
    capital: 'Wolio (Baubau, Pulau Buton)',
    latitude: -5.4744,
    longitude: 122.6011,
    coord_certainty: 'verified',
    founded_year: 1542,
    founded_display: 'Abad ke-14 M (Kerajaan) / 948 H (1542 M — Transformasi Kesultanan)',
    founded_certainty: 'verified',
    golden_age_start: 1597,
    golden_age_end: 1697,
    golden_age_display: 'Abad ke-17 M (Era Sultan La Elangi Dayanu Ikhsanuddin)',
    ended_year: 1960,
    ended_display: '1960 M (Wafatnya Sultan Muhammad Falihi & integrasi administratif ke RI)',
    ended_certainty: 'verified',
    status_summary: 'Tetap memiliki otonomi pemerintahan adat hingga wafatnya Sultan Buton ke-38, La Ode Muhammad Falihi Kaimuddin pada tahun 1960, dan berintegrasi penuh ke dalam Provinsi Sulawesi Tenggara.',
    summary: 'Kesultanan kepulauan strategis di jalur pelayaran antara Sulawesi dan Maluku yang terkenal karena sistem konstitusi demokrasi-sufistik "Martabat Tujuh" dan Benteng Keraton Wolio yang megah.',
    political_history: 'Berawal dari Kerajaan Wolio pada abad ke-14. Pada tahun 948 H (1542 M), Raja ke-6 Lakilaponto memeluk Islam melalui dakwah Syekh Abdul Wahid bin Syarif Sulaiman al-Fathani dan dilantik menjadi Sultan Buton I dengan gelar Sultan Murhum Kaimuddin. Sultan ke-4, La Elangi (Dayanu Ikhsanuddin), merumuskan undang-undang dasar kesultanan "Murtabat Tujuh" dan membangun Benteng Keraton Buton untuk melindungi kedaulatan Buton di antara ekspansi Gowa-Tallo, Ternate, dan VOC.',
    economic_network: 'Pelabuhan transit wajib bagi kapal-kapal pengangkut rempah antara Jawa/Makassar dan Kepulauan Maluku, penghasil mutiara, teripang, kain tenun Buton, dan mata uang kain Kampua.',
    cultural_legacy: 'Benteng Keraton Buton (benteng terluas di dunia seluas 23,375 hektare), Masjid Agung Keraton Buton, konstitusi tertulis Martabat Tujuh, dan ratusan naskah kuno beraksara Arab, Wolio (Buri Wolio), dan Melayu.',
    decline_factors: 'Korte Verklaring (Plakat Pendek) dengan Hindia Belanda pada 1906 dan peralihan damai menuju sistem pemerintahan daerah Republik Indonesia pada 1951–1960.',
    historicalContext: {
      politics: 'Menerapkan sistem pemilihan Sultan oleh dewan legislatif Siolimbona (Sembilan Menteri Besar) berdasarkan kualifikasi moral dan konstitusi Martabat Tujuh (bukan semata warisan turun-temurun otomatis).',
      economy: 'Memiliki mata uang unik berupa tenunan kain katun bernama Kampua (Bida) serta menjadi pos pelabuhan pemasok logistik pelayaran timur-barat Nusantara.',
      maritime: 'Mengawasi Selat Buton dan Kepulauan Tukangbesi (Wakatobi) yang menjadi jalur pelayaran paling aman menuju Kepulauan Rempah Maluku.',
      cultureAndReligion: 'Integrasi falsafah tasawuf Martabat Tujuh ke dalam struktur tata negara dan hukum publik.'
    },
    territory_notes: 'Mencakup Pulau Buton, Muna, Kabaena, Kepulauan Tukangbesi (Wakatobi), serta Poleang dan Rumbia di daratan tenggara Sulawesi; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_kemendikbud_cagarbudaya', 'src_anri_perpusnas', 'src_ricklefs_2008']
  },
  {
    id: 'kgd_ternate',
    name: 'Kesultanan Ternate',
    alternate_names: ['Kerajaan Gapi', 'Moloku Kie Raha (Uli Lima)'],
    polity_type: 'Kesultanan',
    region: 'Maluku & Nusa Tenggara',
    modern_province: 'Maluku Utara (Kota Ternate)',
    capital: 'Sampalu → Gamalama → Soa Sio (Pulau Ternate)',
    latitude: 0.8011,
    longitude: 127.3844,
    coord_certainty: 'verified',
    founded_year: 1486,
    founded_display: '1257 M (Kerajaan Gapi) / 1486 M (Resmi Kesultanan Islam)',
    founded_certainty: 'verified',
    golden_age_start: 1570,
    golden_age_end: 1606,
    golden_age_display: '1570–1606 M (Era Sultan Baabullah & Sultan Said Barakat Syah)',
    ended_year: 1945,
    ended_display: '1914 M (Pengasingan Sultan Usman Syah) / 1945–1950 M (Integrasi NKRI; Kedaton tetap lestari)',
    ended_certainty: 'verified',
    status_summary: 'Berintegrasi ke dalam Republik Indonesia pasca kemerdekaan; Institusi adat Kesultanan Ternate tetap aktif menjaga tradisi Moloku Kie Raha.',
    summary: 'Salah satu dari empat pilar Moloku Kie Raha di Maluku Utara dan pemimpin persekutuan Uli Lima yang menjadi pusat perdagangan cengkih dunia serta kekuatan maritim utama di Indonesia Timur.',
    political_history: 'Berdiri sebagai Kerajaan Gapi pada tahun 1257 di bawah Baab Mashur Malamo. Pada tahun 1486, Raja Marhum / Zainal Abidin memperdalam ajaran Islam di Giri (Gresik, Jawa Timur) dan resmi mengganti gelar penguasa dari "Kolano" menjadi "Sultan". Setelah Portugis membunuh Sultan Hairun pada 1570, putranya Sultan Baabullah mengepung Benteng Sao Paulo selama lima tahun hingga mengusir Portugis pada 1575 dan memperluas pengaruh Ternate ke menjadi "Penguasa 72 Pulau".',
    economic_network: 'Produsen dan eksportir asli cengkih (Syzygium aromaticum) dunia yang menarik kedatangan pedagang Melayu, Jawa, Arab, Tiongkok, Portugis, Spanyol, Inggris, dan Belanda.',
    cultural_legacy: 'Kedaton Sultan Ternate (Kadato Kie), Masjid Sultan Ternate (Sigi Lamo), Benteng Oranje, Benteng Kastela, Benteng Kalamata, serta hukum adat Kie Se Kolano.',
    decline_factors: 'Kebijakan monopoli dan pemusnahan pohon cengkih (Hongi Tochten / Ekstirpasi) oleh VOC sejak abad ke-17 serta intervensi kolonial Belanda hingga awal abad ke-20.',
    historicalContext: {
      politics: 'Pemimpin konfederasi Uli Lima (Persekutuan Lima) dalam sistem dualisme kosmologis Moloku Kie Raha bersama Tidore, Bacan, dan Jailolo.',
      economy: 'Penghasil komoditas cengkih paling berharga di pasar global abad ke-15 hingga ke-17.',
      maritime: 'Armada perahu kora-kora perang yang menjangkau Halmahera, Sulawesi Utara/Tengah, Buru, Seram, Ambon, hingga Nusa Tenggara.',
      cultureAndReligion: 'Mempertahankan tradisi keislaman adat Bobato Akhirat dan hubungan keilmuan historis dengan pesantren Giri di Jawa Timur.'
    },
    territory_notes: 'Pada masa Sultan Baabullah, pengaruh maritim Ternate (Uli Lima) membentang dari Maluku Utara, pesisir utara dan timur Sulawesi, Pulau Buru, Seram, Ambon, hingga pulau-pulau di selatan.',
    disputedClaims: [],
    source_ids: ['src_andaya_1993', 'src_ricklefs_2008', 'src_reid_1993', 'src_cribb_2000', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_tidore',
    name: 'Kesultanan Tidore',
    alternate_names: ['Kie Duko', 'Moloku Kie Raha (Uli Siwa)'],
    polity_type: 'Kesultanan',
    region: 'Maluku & Nusa Tenggara',
    modern_province: 'Maluku Utara (Kota Tidore Kepulauan)',
    capital: 'Soasio (Pulau Tidore)',
    latitude: 0.6594,
    longitude: 127.4481,
    coord_certainty: 'verified',
    founded_year: 1495,
    founded_display: 'Abad ke-11/14 M (Kerajaan) / Akhir Abad ke-15 M (c. 1495 M — Kesultanan Islam)',
    founded_certainty: 'estimated',
    golden_age_start: 1657,
    golden_age_end: 1805,
    golden_age_display: 'Era Sultan Saifuddin (1657–1687) & Era Perjuangan Sultan Nuku (1780–1805)',
    ended_year: 1945,
    ended_display: '1945–1967 M (Integrasi NKRI; Sultan Zainal Abidin Syah menjadi Gubernur Irian Barat I)',
    ended_certainty: 'verified',
    status_summary: 'Berintegrasi penuh ke dalam NKRI; Sultan Tidore Zainal Abidin Syah diangkat oleh Presiden Soekarno menjadi Gubernur Irian Barat (Papua) pertama (1956–1961) karena ikatan historis Tidore-Papua.',
    summary: 'Kesultanan kembar-saingan Ternate dalam tatanan Moloku Kie Raha dan pemimpin persekutuan Uli Siwa, yang memiliki ikatan historis, politik, dan maritim sangat erat dengan Kepulauan Raja Ampat dan pesisir Papua.',
    political_history: 'Kolano Ciri Leliatu memeluk Islam pada akhir abad ke-15 dan bergelar Sultan Jamaluddin. Putranya, Sultan Mansur, menerima kedatangan kapal ekspedisi Spanyol (sisa armada Magellan-Elcano) pada tahun 1521 untuk mengimbangi aliansi Ternate-Portugis. Pada akhir abad ke-18, Pangeran Nuku (Sultan Muhammad Amiruddin) memimpin perlawanan maritim besar selama 25 tahun bersama rakyat Halmahera, Seram, dan Raja Ampat hingga berhasil membebaskan Tidore dari cengkeraman VOC pada 1797.',
    economic_network: 'Perdagangan cengkih, pala, kulit kayu masoi, burung cenderawasih, dan hasil laut yang menghubungkan Maluku Utara dengan Halmahera Timur dan Papua.',
    cultural_legacy: 'Kedaton Kie Tidore, Masjid Sultan Tidore, Benteng Tahula, Benteng Torre, serta catatan sejarah integrasi Nusantara dengan wilayah Papua.',
    decline_factors: 'Serbuan militer kolonial Belanda pasca wafatnya Sultan Nuku (1805) dan penghapusan sementara takhta oleh Belanda pada awal abad ke-20 sebelum dipulihkan kembali.',
    historicalContext: {
      politics: 'Pemimpin konfederasi Uli Siwa (Persekutuan Sembilan) yang menjalin kemitraan pemerintahan tradisional dengan empat raja di Kepulauan Raja Ampat (Waigeo, Salawati, Misool, Batanta/Kofiau).',
      economy: 'Perdagangan cengkih dan komoditas eksotis Indonesia Timur (pala, damar, kulit penyu, dan bulu cenderawasih).',
      maritime: 'Jaringan pelayaran kora-kora yang menghubungkan Pulau Tidore, Halmahera Tengah/Timur, Pulau Seram, hingga pesisir barat Papua.',
      cultureAndReligion: 'Menjaga keseimbangan kosmologis Moloku Kie Raha (Empat Gunung Maluku) bersama Ternate, Bacan, dan Jailolo.'
    },
    territory_notes: 'Wilayah pengaruh Uli Siwa meliputi Pulau Tidore, sebagian besar Halmahera Tengah dan Timur, kepulauan Raja Ampat, serta pesisir barat Papua (Tanah Papua).',
    disputedClaims: [],
    source_ids: ['src_andaya_1993', 'src_ricklefs_2008', 'src_kemendikbud_cagarbudaya']
  },
  {
    id: 'kgd_bima',
    name: 'Kesultanan Bima',
    alternate_names: ['Mbojo', 'Kesultanan Bima (Dana Mbojo)'],
    polity_type: 'Kesultanan',
    region: 'Maluku & Nusa Tenggara',
    modern_province: 'Nusa Tenggara Barat (Kota Bima & Kabupaten Bima)',
    capital: 'Bima (Raba / Rasanae, Pulau Sumbawa bagian timur)',
    latitude: -8.4547,
    longitude: 118.7239,
    coord_certainty: 'verified',
    founded_year: 1621,
    founded_display: 'Abad ke-14 M (Kerajaan) / 7 Februari 1621 M (15 Rabiul Awal 1030 H — Kesultanan)',
    founded_certainty: 'verified',
    golden_age_start: 1640,
    golden_age_end: 1731,
    golden_age_display: '1640–1731 M (Era Sultan Abdul Khair Sirajuddin & Sultan Nuruddin)',
    ended_year: 1951,
    ended_display: '1945–1951 M (Sultan Muhammad Salahuddin menyatakan bergabung ke NKRI)',
    ended_certainty: 'verified',
    status_summary: 'Pada 22 November 1945 Sultan Muhammad Salahuddin mengeluarkan maklumat resmi bahwa Kesultanan Bima berdiri di belakang Republik Indonesia; pemerintahan swapraja berakhir ketika Sultan wafat pada 1951.',
    summary: 'Pusat kekuasaan dan peradaban Islam utama di Kepulauan Nusa Tenggara (Pulau Sumbawa bagian timur) yang menjadi penghubung strategis antara jalur pelayaran Jawa, Sulawesi Selatan, dan Maluku.',
    political_history: 'Bertransformasi dari Kerajaan Mbojo menjadi Kesultanan Islam ketika La Kai mengucapkan syahadat di Sape pada 15 Rabiul Awal 1030 H (7 Februari 1621 M) di hadapan para mubalig utusan Kesultanan Gowa-Tallo (Datuk di Banda dan Datuk di Tiro) serta bergelar Sultan Abdul Kahir. Bima menjalin aliansi pernikahan dan politik yang sangat erat dengan Makassar (Gowa-Tallo). Pada abad ke-20, Sultan Muhammad Salahuddin memajukan pendidikan Islam modern dan mendukung penuh kemerdekaan Indonesia.',
    economic_network: 'Pengekspor kayu sappan (secang) untuk bahan pewarna tekstil, kuda Bima yang tangguh, beras, lilin lebah, dan kain tenun tembe nggoli.',
    cultural_legacy: 'Istana Asi Mbojo, korpus arsip naskah istana Bo\' Sangaji Kai (terdaftar dalam Memory of the World), budaya Rimpu, dan hukum adat Maja Labo Dahu ("Malu dan Takut kepada Allah serta sesama").',
    decline_factors: 'Dampak letusan dahsyat Gunung Tambora (1815) terhadap demografi dan ekonomi Pulau Sumbawa, intervensi kolonial Belanda abad ke-19–20, serta integrasi sukarela ke dalam NKRI (1945–1951).',
    historicalContext: {
      politics: 'Pemerintahan Hadat Bima yang memadukan kepemimpinan Sultan dengan Majelis Hadat dan lembaga keagamaan Mahkamah Syar\'iyah.',
      economy: 'Penghasil kayu secang (sappanwood) berkualitas tinggi dan kuda Bima dalam jaringan perdagangan Samudra Hindia dan Laut Flores.',
      maritime: 'Teluk Bima yang terlindung menjadi pelabuhan persinggahan penting antara Jawa/Bali, Makassar, Flores (Manggarai), dan Timor.',
      cultureAndReligion: 'Memiliki tradisi literasi istana yang sangat kaya melalui penulisan naskah Bo\' Sangaji Kai dalam aksara Arab-Melayu (Jawi) sejak abad ke-17.'
    },
    territory_notes: 'Meliputi bagian timur Pulau Sumbawa (Bima dan sekitarnya), Pulau Sangeang, serta hubungan historis dengan Manggarai (Flores Barat) dan Pulau Sumba; batas wilayah tidak digambar sebagai poligon karena ketiadaan peta batas primer yang terverifikasi.',
    disputedClaims: [],
    source_ids: ['src_ricklefs_2008', 'src_andaya_1981', 'src_kemendikbud_cagarbudaya', 'src_anri_perpusnas']
  }
];

const kingdomImageMetadata: Record<
  string,
  {
    imageUrl: string;
    imageCaption: string;
    imageAttribution: string;
    imageLicense: string;
    imageSourceUrl: string;
  }
> = {
  // kgd_perlak: sengaja tidak disertakan karena tidak adanya dokumentasi foto epigrafis/arsip abad ke-9/13 M yang terverifikasi.
  kgd_samudera_pasai: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Makam_Sultan_Malik_As-Shalih_%28Malikussaleh%29.jpg/960px-Makam_Sultan_Malik_As-Shalih_%28Malikussaleh%29.jpg',
    imageCaption:
      'Batu nisan berkaligrafi Arab pada makam pendiri Kesultanan Samudera Pasai, Sultan Malik as-Saleh (wafat Ramadhan 696 H / 1297 M) di Aceh Utara.',
    imageAttribution: 'Foto oleh Iqbalhafidh — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Makam_Sultan_Malik_As-Shalih_(Malikussaleh).jpg',
  },
  kgd_aceh: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/96/COLLECTIE_TROPENMUSEUM_De_kraton_van_de_Sultan_van_Atjeh_in_Kota-Pecut_met_de_Gunungan_TMnr_60001940.jpg',
    imageCaption:
      'Dokumentasi arsip abad ke-19 kawasan Keraton Kesultanan Aceh Darussalam dan Taman Sari Gunongan di Kutaraja (Banda Aceh).',
    imageAttribution: 'Woodbury & Page — Koleksi Tropenmuseum (TMnr 60001940)',
    imageLicense: 'CC BY-SA 3.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_De_kraton_van_de_Sultan_van_Atjeh_in_Kota-Pecut_met_de_Gunungan_TMnr_60001940.jpg',
  },
  kgd_siak: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Istana_Siak_malam.jpg/960px-Istana_Siak_malam.jpg',
    imageCaption:
      'Istana Asserayah Hasyimiah (1889 M), kediaman resmi Sultan Siak Sri Indrapura di tepi Sungai Siak, Riau.',
    imageAttribution: 'Foto oleh Hazen Lel — Wikimedia Commons',
    imageLicense: 'CC0 1.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Istana_Siak_malam.jpg',
  },
  kgd_palembang: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Great_Mosque_of_Palembang_20230808_174444.jpg/960px-Great_Mosque_of_Palembang_20230808_174444.jpg',
    imageCaption:
      'Masjid Agung Sultan Mahmud Badaruddin I Jayo Wikramo (1738–1748 M), pusat keagamaan Kesultanan Palembang Darussalam.',
    imageAttribution: 'Foto oleh Swarabakti — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Great_Mosque_of_Palembang_20230808_174444.jpg',
  },
  kgd_demak: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg/960px-Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg',
    imageCaption:
      'Serambi Majapahit dan atap tumpang tiga Masjid Agung Demak, pusat pemerintahan dan dakwah Wali Songo di Kesultanan Demak.',
    imageAttribution: 'Foto oleh DARMAS BS 9 — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg',
  },
  kgd_cirebon: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Animal_statue_at_Keraton_Kasepuhan_of_Cirebon%3B_2017.jpg/960px-Animal_statue_at_Keraton_Kasepuhan_of_Cirebon%3B_2017.jpg',
    imageCaption:
      'Gerbang bata merah dan patung Macan Putih di kompleks Keraton Kasepuhan, pusat Kesultanan Cirebon.',
    imageAttribution: 'Foto oleh Rachmat04 — Wikimedia Commons',
    imageLicense: 'CC BY-SA 3.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Animal_statue_at_Keraton_Kasepuhan_of_Cirebon;_2017.jpg',
  },
  kgd_banten: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tampilan_Pintu_Utara_Benteng_Keraton_Surosowan_dari_Arah_Atas.jpg/960px-Tampilan_Pintu_Utara_Benteng_Keraton_Surosowan_dari_Arah_Atas.jpg',
    imageCaption:
      'Benteng dan pintu gerbang utara Keraton Surosowan, pusat kedaulatan maritim Kesultanan Banten di Banten Lama.',
    imageAttribution: 'Foto oleh Arif Permana Putra — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Tampilan_Pintu_Utara_Benteng_Keraton_Surosowan_dari_Arah_Atas.jpg',
  },
  kgd_mataram: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pelataran_Depan_Masjid_Gedhe_Mataram_Kotagede.jpg/960px-Pelataran_Depan_Masjid_Gedhe_Mataram_Kotagede.jpg',
    imageCaption:
      'Pelataran dan pagar bata merah berornamen Hindu-Jawa pada kompleks Masjid Gedhe Mataram di ibu kota awal Kotagede.',
    imageAttribution: 'Foto oleh Dyahartiyana — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Pelataran_Depan_Masjid_Gedhe_Mataram_Kotagede.jpg',
  },
  kgd_banjar: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/97/Masjid_Sultan_Suriansyah_1900.png',
    imageCaption:
      'Arsip fotografi tahun 1900 Masjid Sultan Suriansyah di Kuin Utara, Banjarmasin — peninggalan raja Islam pertama Kesultanan Banjar.',
    imageAttribution: 'Arsip Rob Hennemann (c. 1900) — Wikimedia Commons',
    imageLicense: 'Public Domain',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Masjid_Sultan_Suriansyah_1900.png',
  },
  kgd_pontianak: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Masjid_Kesultanan_Syarif_Abdurrahman.jpg/960px-Masjid_Kesultanan_Syarif_Abdurrahman.jpg',
    imageCaption:
      'Masjid Jami Sultan Syarif Abdurrahman di tepian Sungai Kapuas, tonggak awal pendirian Kesultanan Kadriah Pontianak (1771 M).',
    imageAttribution: 'Foto oleh Aliff12 — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Masjid_Kesultanan_Syarif_Abdurrahman.jpg',
  },
  kgd_kutai: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Museum_Mulawarman_02.jpg/960px-Museum_Mulawarman_02.jpg',
    imageCaption:
      'Kompleks Kedaton Kesultanan Kutai Kartanegara ing Martadipura (kini Museum Mulawarman) di tepi Sungai Mahakam, Tenggarong.',
    imageAttribution: 'Risyhal Ramadhani Simanjuntak & Muhammad Firza Akbar — Wikimedia Commons',
    imageLicense: 'Public Domain',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Museum_Mulawarman_02.jpg',
  },
  kgd_gowa_tallo: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Makam_Sultan_Hasanuddin.jpg/960px-Makam_Sultan_Hasanuddin.jpg',
    imageCaption:
      'Kompleks Makam Sultan Hasanuddin ("Ayam Jantan dari Timur") di Katangka, Kabupaten Gowa, Sulawesi Selatan.',
    imageAttribution: 'Foto oleh Si Gam — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Makam_Sultan_Hasanuddin.jpg',
  },
  kgd_bone: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/85/COLLECTIE_TROPENMUSEUM_Paleis_van_de_vorstin_van_Bone_op_Celebes_TMnr_60015648.jpg',
    imageCaption:
      'Dokumentasi arsip historis Istana Raja/Ratu Bone (Saoraja Bone) dengan atap timpa laja di Sulawesi Selatan.',
    imageAttribution: 'Koleksi Tropenmuseum (TMnr 60015648) — Wikimedia Commons',
    imageLicense: 'CC BY-SA 3.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Paleis_van_de_vorstin_van_Bone_op_Celebes_TMnr_60015648.jpg',
  },
  kgd_buton: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Masjid_Agung_Keraton_Buton.jpg/960px-Masjid_Agung_Keraton_Buton.jpg',
    imageCaption:
      'Masjid Agung Keraton Buton (Masigi Ogena) di dalam kawasan Benteng Wolio, pusat spiritual Kesultanan Buton.',
    imageAttribution: 'Foto oleh Marwan Mohamad — Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Masjid_Agung_Keraton_Buton.jpg',
  },
  kgd_ternate: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b0/COLLECTIE_TROPENMUSEUM_Het_Museum_Kedaton_voormalige_paleis_van_de_sultan_van_Ternate_TMnr_10016840.jpg',
    imageCaption:
      'Arsip historis Kedaton Sultan Ternate (Kadato Kie) berlatar Gunung Gamalama, pusat konfederasi Uli Lima di Maluku Utara.',
    imageAttribution: 'Koleksi Tropenmuseum (TMnr 10016840) — Wikimedia Commons',
    imageLicense: 'CC BY-SA 3.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Het_Museum_Kedaton_voormalige_paleis_van_de_sultan_van_Ternate_TMnr_10016840.jpg',
  },
  kgd_tidore: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Benteng_Tahula_di_Tidore_9.jpg/960px-Benteng_Tahula_di_Tidore_9.jpg',
    imageCaption:
      'Benteng Tahula dan pesisir Soasio di Pulau Tidore, pusat kedaulatan maritim Kesultanan Tidore (Uli Siwa).',
    imageAttribution: 'Foto oleh Ana Ainina — Wikimedia Commons',
    imageLicense: 'CC BY 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Benteng_Tahula_di_Tidore_9.jpg',
  },
  kgd_bima: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/0d/Sultan_Muhammad_Salahuddin_bersama_Tentara_BKR_Bima_depan_Istana_ASI_Mbojo.jpg',
    imageCaption:
      'Arsip sejarah Sultan Muhammad Salahuddin bersama pejuang BKR Bima di depan Istana Asi Mbojo (1945).',
    imageAttribution: 'Koleksi Museum Samparaja Bima — Wikimedia Commons',
    imageLicense: 'CC0 1.0',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Sultan_Muhammad_Salahuddin_bersama_Tentara_BKR_Bima_depan_Istana_ASI_Mbojo.jpg',
  },
};

export const kingdomsData: Kingdom[] = rawKingdoms.map((k) => {
  const kingdomRulers = rulersData.filter((r) => r.kingdom_id === k.id);
  const kingdomSites = sitesData.filter((s) => s.kingdom_ids.includes(k.id));
  const territoryFeat = territoriesData.find((t) => t.properties.kingdom_id === k.id);
  const imgMeta = kingdomImageMetadata[k.id];

  return {
    ...k,
    ...(imgMeta
      ? {
          ...imgMeta,
          imageUrl: `./images/atlas/${k.id}.${
            imgMeta.imageUrl.toLowerCase().endsWith('.png') ? 'png' : 'jpg'
          }`,
        }
      : {}),
    alternateNames: k.alternate_names,
    centerLocation: `${k.capital} (${k.modern_province})`,
    coordinates: {
      lat: k.latitude,
      lng: k.longitude
    },
    founded: k.founded_year,
    foundedDisplay: k.founded_display,
    goldenAge: k.golden_age_display,
    ended: k.ended_year,
    endedDisplay: k.ended_display,
    rulers: kingdomRulers,
    historySummary: k.summary,
    territoryDescription: k.territory_notes,
    territoryGeometry: territoryFeat ? territoryFeat.geometry : null,
    heritageSiteIds: kingdomSites.map((s) => s.id),
    sourceIds: k.source_ids,
    verificationStatus: certaintyToLabel(k.founded_certainty)
  };
});
