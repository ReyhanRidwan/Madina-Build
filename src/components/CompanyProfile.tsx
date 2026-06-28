import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FileCheck,
  Eye,
  Award,
  Clock,
  Compass,
  ArrowRight,
  Users,
  Paintbrush,
  Home,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  MapPin,
  Star,
  Quote
} from 'lucide-react';
import { images } from '../assets';
import RABCalculator from './RABCalculator';
import InteriorMEPStepper from './InteriorMEPStepper';

interface CompanyProfileProps {
  onOpenConsultation: (initialType?: string) => void;
}

export default function CompanyProfile({ onOpenConsultation }: CompanyProfileProps) {
  const [activeCalc, setActiveCalc] = useState<'ruang' | 'mep'>('ruang');
  // Hero Slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Bangun Rumah Impian Anda dengan Akad Syariah yang Amanah',
      desc: 'Mulai dari desain hingga pembangunan, seluruh proses dilakukan secara transparan, profesional, dan sesuai prinsip syariah tanpa denda dan biaya tersembunyi.',
      image: images.heroShariaHouse,
      cta: 'Konsultasi Gratis',
    },
    {
      title: 'Kontraktor Syariah yang Mengutamakan Amanah & Transparansi',
      desc: 'Keterbukaan Rencana Anggaran Biaya (RAB) secara rigid, laporan kemajuan mingguan secara real-time, dan material bersertifikat standar nasional.',
      image: images.luxuryHouse3story,
      cta: 'Hitung RAB Anda Sekarang',
    },
    {
      title: 'Desain Premium • Bangun Berkualitas • Interior Elegan',
      desc: 'Hadirkan nuansa hunian modern contemporary berpadu Neo Klasik yang menenangkan hati bersama tim arsitek, sipil, dan interior desainer berpengalaman.',
      image: images.interiorPremium,
      cta: 'Lihat Portfolio Kami',
    },
  ];

  // Auto-play hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Portfolio filtration
  const [activeFilter, setActiveFilter] = useState('Semua');
  const filters = [
    'Semua',
    'Rumah Premium',
    'Rumah Modern',
    'Rumah Neo Classic',
    'Interior',
    'Renovasi',
    'Villa',
    'Rumah 2 Lantai',
    'Rumah 3 Lantai',
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Villa Neo-Classic Kemang',
      category: 'Rumah Neo Classic',
      image: images.heroShariaHouse,
      location: 'Jakarta Selatan',
      specs: 'Luas 450m² • 3 Lantai • Kolam Renang',
    },
    {
      id: 2,
      title: 'Arsitektur Modern Contemporary',
      category: 'Rumah Modern',
      image: images.luxuryHouse3story,
      location: 'BSD City, Tangerang',
      specs: 'Luas 320m² • 2 Lantai • High Ceiling',
    },
    {
      id: 3,
      title: 'Grand Living Room Classic Modern',
      category: 'Interior',
      image: images.interiorPremium,
      location: 'Alam Sutera, Tangerang',
      specs: 'Full Furnished • Marble Flooring',
    },
    {
      id: 4,
      title: 'Premium Sharia Residence Surabaya',
      category: 'Rumah Premium',
      image: images.ctaBackground,
      location: 'Waru, Sidoarjo',
      specs: 'Luas 500m² • 3 Lantai • Tropis Modern',
    },
    {
      id: 5,
      title: 'Modern Tropis Graha Famili',
      category: 'Rumah 3 Lantai',
      image: images.luxuryHouse3story,
      location: 'Surabaya Barat',
      specs: 'Luas 400m² • Fasad Travertine',
    },
    {
      id: 6,
      title: 'Interior Executive Master Bedroom',
      category: 'Interior',
      image: images.interiorPremium,
      location: 'Menteng, Jakarta Pusat',
      specs: 'Luxury Lighting • Custom Wallpanel',
    },
    {
      id: 7,
      title: 'Renovasi Fasad Minimalis',
      category: 'Renovasi',
      image: images.heroShariaHouse,
      location: 'Kelapa Gading, Jakarta Utara',
      specs: 'Renovasi Eksterior & Struktur',
    },
    {
      id: 8,
      title: 'Luxury Villa Uluwatu Breeze',
      category: 'Villa',
      image: images.ctaBackground,
      location: 'Bali (Luar Kota)',
      specs: 'Luas 600m² • Cliffside Villa',
    },
  ];

  const filteredPortfolio =
    activeFilter === 'Semua'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  // Lightbox State
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Services list
  const services = [
    {
      title: 'Bangun Rumah Baru',
      desc: 'Pembangunan total dari nol dengan pengawasan ahli sipil dan arsitek profesional, menggunakan material bersertifikasi standar tinggi.',
      icon: <Home className="h-5 w-5 text-gold" />,
    },
    {
      title: 'Renovasi Rumah',
      desc: 'Peremajaan ruangan, perluasan lantai, hingga perombakan total fasad rumah lama menjadi bernuansa mewah modern.',
      icon: <CheckCircle className="h-5 w-5 text-gold" />,
    },
    {
      title: 'Arsitek Rumah',
      desc: 'Pembuatan gambar kerja (DED), visualisasi 3D eksterior ultra-realistic, layouting denah, serta struktur sipil presisi.',
      icon: <Compass className="h-5 w-5 text-gold" />,
    },
    {
      title: 'Desain Interior',
      desc: 'Desain interior bento-style, kitchen set premium, bedroom, walk-in closet, lengkap dengan perabot berkualitas buatan pabrik sendiri.',
      icon: <Paintbrush className="h-5 w-5 text-gold" />,
    },
    {
      title: 'Villa & Resort',
      desc: 'Perancangan dan pembangunan resort peristirahatan atau villa privat bernuansa alam tropis dengan sirkulasi udara optimal.',
      icon: <Star className="h-5 w-5 text-gold" />,
    },
    {
      title: 'Design & Build',
      desc: 'Layanan terintegrasi satu pintu dari tahap core design, perencanaan anggaran RAB, hingga serah terima kunci bangunan fisik.',
      icon: <Award className="h-5 w-5 text-gold" />,
    },
  ];

  // Workflow Timeline (10 Steps)
  const workflowSteps = [
    { step: '01', title: 'Hubungi Kami', desc: 'Melalui tombol WhatsApp atau form survey di website.' },
    { step: '02', title: 'Konsultasi Gratis', desc: 'Diskusi awal mengenai konsep denah, kebutuhan ruang, dan akad syariah.' },
    { step: '03', title: 'Survey & Pengukuran', desc: 'Tim arsitek melakukan pengukuran lahan langsung (Sidoarjo & Jakarta).' },
    { step: '04', title: 'Finalisasi Desain', desc: 'Arsitek merancang fasad 3D realistic dan blueprint denah detail.' },
    { step: '05', title: 'Persetujuan RAB', desc: 'Keterbukaan harga material, upah tukang, dan spesifikasi tanpa biaya siluman.' },
    { step: '06', title: 'Akad Syariah', desc: 'Penandatanganan akad Istishna / Ijarah yang amanah, bebas riba, & tanpa denda.' },
    { step: '07', title: 'Pelaksanaan', desc: 'Tim kontraktor profesional mulai melakukan penggalian dan pembangunan struktur.' },
    { step: '08', title: 'Interior & Finishing', desc: 'Pengerjaan ornamen interior, pengecatan, keramik, dan uji coba kelistrikan.' },
    { step: '09', title: 'Serah Terima', desc: 'Penyerahan kunci bangunan selesai 100% didampingi dokumen checklist lengkap.' },
    { step: '10', title: 'Masa Pemeliharaan', desc: 'Garansi pemeliharaan struktur dan bocor gratis selama 3 bulan penuh.' },
  ];

  // Testimonials (Min 6)
  const testimonials = [
    {
      name: 'Bpk. Reyhan Ridwan',
      role: 'Owner Rumah Neo Klasik, BSD',
      text: 'Sangat puas dengan konsep transparan dari Madina Build. Di kontraktor lain biasanya RAB membingungkan, tapi di sini dijelaskan sampai detail merek semen dan kabel. Hasil bangunannya megah sekali!',
      rating: 5,
    },
    {
      name: 'Ibu Fatimah Az-Zahra',
      role: 'Klien Renovasi, Jakarta Selatan',
      text: 'Sistem pembayarannya benar-benar syariah, tidak ada denda keterlambatan jika kami ada keterlambatan transfer, dan pengerjaannya selesai tepat waktu. Tim arsiteknya sabar menemani revisi.',
      rating: 5,
    },
    {
      name: 'Bpk. Ahmad Fauzi',
      role: 'Owner Villa Tropis, Sidoarjo',
      text: 'Arsitek dan desainer interior Madina Build sangat solutif. Layout ruang keluarga dibuat high ceiling jadi sangat sejuk meski tanpa AC. Akadnya juga tenang di hati.',
      rating: 5,
    },
    {
      name: 'Ibu Shanti Puspita',
      role: 'Owner Rumah Minimalis, Surabaya',
      text: 'Desain interior kitchen set dan kamar tidur utama rapi sekali, dikerjakan langsung oleh workshop furniture mereka sendiri. Hasil akhirnya persis seperti render 3D-nya!',
      rating: 5,
    },
    {
      name: 'Bpk. Dr. H. Maryono',
      role: 'Klien Rumah 3 Lantai, Alam Sutera',
      text: 'Laporan progress mingguan dikirim berkala lewat grup WA dengan foto dan video drone. Kami yang sibuk di luar kota tidak perlu khawatir, karena semua terdokumentasi amanah.',
      rating: 5,
    },
    {
      name: 'Ibu Nabila Siregar',
      role: 'Owner Rumah Premium Modern, Kelapa Gading',
      text: 'Rekomendasi bagi yang ingin punya rumah premium bebas dari transaksi syubhat. Garansi pemeliharaan benar-benar dicover tanpa berbelit-belit saat ada kebocoran kecil kemarin.',
      rating: 5,
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ Accordion State
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const faqs = [
    {
      q: 'Apa itu akad syariah pada jasa kontraktor?',
      a: 'Akad syariah yang kami gunakan umumnya adalah Akad Istishna (jual beli pesanan berjangka) atau Akad Ijarah (sewa jasa profesional). Transaksi dilakukan secara rigid di awal, harga tidak berubah di tengah jalan, tidak menerapkan sistem denda keterlambatan (yang merupakan unsur riba), dan tidak ada sita paksa.',
    },
    {
      q: 'Bagaimana sistem pembayaran di Madina Build?',
      a: 'Pembayaran dilakukan secara bertahap (termin) sesuai dengan progress fisik riil di lapangan yang divalidasi oleh tim pengawas. Kami juga membuka peluang pembayaran cicilan bertahap langsung ke pihak kami tanpa perantara bank pihak ketiga demi menjaga kesucian akad.',
    },
    {
      q: 'Apakah ada garansi setelah serah terima kunci?',
      a: 'Ya, tentu saja. Setiap proyek pembangunan baru atau renovasi di Madina Build mendapatkan garansi pemeliharaan resmi selama 3 bulan untuk kebocoran, instalasi MEP, dan kekuatan struktur semen.',
    },
    {
      q: 'Apakah Madina Build melayani proyek di luar Jakarta & Sidoarjo?',
      a: 'Kami melayani survey fisik langsung di area Jabodetabek dan Jawa Timur (Surabaya, Sidoarjo, Gresik, Malang). Untuk kota lain di seluruh Indonesia dan luar negeri, kami melayani jasa Desain Arsitek & Perencanaan RAB secara online dengan koordinasi intensif.',
    },
    {
      q: 'Apakah saya bisa menggunakan jasa desain arsitek saja tanpa pembangunan?',
      a: 'Bisa sekali. Anda akan mendapatkan paket cetak lengkap berisi gambar 3D visual eksterior, gambar kerja arsitektur lengkap (DED), perhitungan pembersihan struktur sipil, serta RAB acuan jika ingin ditenderkan kembali.',
    },
    {
      q: 'Apakah Madina Build melayani renovasi rumah skala kecil?',
      a: 'Kami mengutamakan renovasi rumah skala menengah hingga besar (seperti renovasi fasad, tambah lantai, interior full-furnished, atau perbaikan struktur masif) untuk menjaga kualitas efisiensi tim konstruksi di lapangan.',
    },
  ];

  return (
    <div className="space-y-24 bg-[#FFFFFF]" id="company-profile-section">
      {/* 1. HERO SLIDER SECTION (Fullscreen luxury) */}
      <section className="relative h-[85vh] min-h-[550px] w-full overflow-hidden bg-charcoal scroll-mt-20" id="home">
        {/* Slides */}
        <div className="relative h-full w-full">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Image Background */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="mx-auto w-full max-w-7xl px-6 md:px-8 text-left">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <span className="inline-block rounded-full bg-gold/25 border border-gold/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-gold uppercase mb-5">
                          🕋 Kontraktor & Arsitek Syariah Premium
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-6 text-base text-gray-200 sm:text-lg max-w-2xl leading-relaxed"
                      >
                        {slide.desc}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-10 flex flex-wrap gap-4"
                      >
                        <button
                          onClick={() => onOpenConsultation()}
                          className="flex items-center gap-2 rounded-lg bg-gold hover:bg-gold-hover px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-gold/25 transition-all active:scale-95"
                          id="hero-cta-btn"
                        >
                          <span>{slide.cta}</span>
                          <ArrowRight className="h-4.5 w-4.5" />
                        </button>
                        <a
                          href="#portfolio"
                          className="rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-all"
                        >
                          Lihat Proyek Realisasi
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
          id="hero-prev-btn"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
          id="hero-next-btn"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'bg-gold w-8' : 'bg-white/30 w-2.5'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. NILAI UTAMA (Sharia features) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-md">
            PONDASI PRINSIP KAMI
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl mt-3">
            Sistem Pembangunan Rumah yang Menenangkan Dunia & Akhirat
          </h2>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Menghindari praktik transaksi ribawi dan tidak transparan demi mewujudkan baiti jannati (rumahku surgaku) yang penuh berkah.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Nilai 1 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-50/50 hover:shadow-lg transition-all border-t-4 border-t-gold text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-5">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal">100% Akad Syariah</h3>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Menggunakan akad Istishna' dan Ijarah tanpa bunga, denda keterlambatan pembayaran, ataupun sita paksa yang melanggar hukum Islam.
            </p>
          </div>

          {/* Nilai 2 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-50/50 hover:shadow-lg transition-all border-t-4 border-t-gold text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-5">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal">Transparansi RAB Rigid</h3>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Rincian Biaya Anggaran sangat detail, mencantumkan tipe merek material, volume riil, dan upah tukang tanpa ada mark-up sepihak.
            </p>
          </div>

          {/* Nilai 3 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-50/50 hover:shadow-lg transition-all border-t-4 border-t-gold text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-5">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal">Progress Proyek Terbuka</h3>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Dapatkan laporan berkala berisi dokumentasi foto, video drone, dan timbal-balik progress mingguan via grup chat khusus.
            </p>
          </div>

          {/* Nilai 4 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-50/50 hover:shadow-lg transition-all border-t-4 border-t-gold text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-5">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal">Material Berkualitas Tinggi</h3>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Kami menyortir material SNI berkelas premium seperti semen mortar berkualitas, struktur pembesian berdiameter pas, dan keramik grade-A.
            </p>
          </div>

          {/* Nilai 5 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-50/50 hover:shadow-lg transition-all border-t-4 border-t-gold text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-5">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal">Garansi Pemeliharaan</h3>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Jaminan masa pemeliharaan struktur dinding, atap bocor, dan perpipaan air selama 3 bulan penuh demi kenyamanan ibadah keluarga.
            </p>
          </div>

          {/* Nilai 6 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md shadow-gray-50/50 hover:shadow-lg transition-all border-t-4 border-t-gold text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-5">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal">Konsultasi Gratis</h3>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Diskusikan impian rumah Anda, konsep fasad modern, kalkulasi anggaran ruang, langsung bersama tim arsitek kami tanpa dipungut biaya.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TENTANG KAMI (About Us with luxury photo) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 bg-gray-50 rounded-3xl py-12 border border-gray-100" id="about">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Photo Panel */}
          <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl aspect-video lg:aspect-auto lg:h-[450px]">
            <img
              src={images.architectDesain}
              alt="Tim Arsitek Madina Build"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 bg-charcoal/95 backdrop-blur-md rounded-xl p-4 text-white text-left shadow-lg border border-gold/20">
              <p className="text-xl font-bold text-gold font-display">Madina Build</p>
              <p className="text-[10px] text-gray-300">Jakarta & Sidoarjo • Melayani Seluruh Indonesia</p>
            </div>
          </div>

          {/* Text Panel */}
          <div className="text-left space-y-6">
            <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 ml-0.5 rounded-md inline-block">
              TENTANG MADINA BUILD
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              Solusi Konstruksi Syariah yang Profesional & Estetis
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Madina Build lahir dari komitmen kuat untuk menyediakan jasa arsitektur, kontraktor bangunan, dan tata ruang interior premium dengan fondasi syariat Islam yang luhur. Kami percaya bahwa hunian yang berkah bermula dari kesepakatan akad yang adil dan terbuka.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-charcoal">
                <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                <span>Akad Transparan</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-charcoal">
                <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                <span>Tim Sipil Profesional</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-charcoal">
                <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                <span>Arsitek Berpengalaman</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-charcoal">
                <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                <span>Interior Designer</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-charcoal">
                <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                <span>Kontraktor Premium</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-charcoal">
                <CheckCircle className="h-4.5 w-4.5 text-gold flex-shrink-0" />
                <span>Laporan Progress Berkala</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gold hover:bg-gold-hover px-5 py-3 text-xs font-bold text-white shadow-md shadow-gold/10 transition-all active:scale-95"
              >
                <span>Mulai Konsultasi Dengan Arsitek</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYANAN KAMI (Checkable cards grid) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8" id="layanan">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-md">
            LAYANAN PROFESIONAL
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl mt-3">
            Layanan Satu Pintu Desain & Konstruksi
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Dari sketsa awal di atas kertas hingga serah terima kunci fisik bangunan yang megah dan bergaransi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between hover:border-gold/30"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-colors">
                  {svc.icon}
                </div>
                <h3 className="font-display text-base font-bold text-charcoal group-hover:text-gold transition-colors">
                  {svc.title}
                </h3>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
              <button
                onClick={() => onOpenConsultation(svc.title)}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-hover"
              >
                <span>Pilih & Konsultasi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ALUR KERJA (Timeline 10 steps) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-md">
            ALUR KERJA AMANAH
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl mt-3">
            10 Tahapan Pelaksanaan Proyek
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Sistematis dan runut untuk menjamin ketepatan waktu pengerjaan dan kehalalan akad setiap prosesnya.
          </p>
        </div>

        {/* Timeline Grid (Process) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 relative">
          {workflowSteps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-gray-100 bg-white p-5 text-left hover:border-gold/25 transition-colors shadow-sm shadow-gray-50/50"
            >
              {/* Connector dots for visual layout */}
              <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 font-mono text-xs font-bold text-gold">
                {item.step}
              </div>
              <h4 className="font-display text-xs font-bold text-charcoal pr-6 mt-1">
                {item.title}
              </h4>
              <p className="mt-2 text-[10px] text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. KEUNGGULAN (Sharia vs Conventional table comparison) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 bg-[#2B2B2B] rounded-3xl py-12 text-white border border-charcoal relative overflow-hidden">
        {/* Background visual details */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/25 px-3 py-1 rounded-md inline-block">
            MENGAPA HARUS SYARIAH?
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl mt-3">
            Perbandingan Madina Build vs Kontraktor Konvensional
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-left">
          {/* Madina Build Sharia */}
          <div className="rounded-2xl border border-gold/30 bg-white/5 p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-gold flex items-center gap-1.5 border-b border-white/10 pb-2">
              <span>🕋 Madina Build (Jasa Syariah)</span>
            </h3>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Akad Istishna:</strong> Harga disepakati di awal secara rigid tanpa kenaikan tak terduga.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Tanpa Denda Riba:</strong> Jika terjadi keterlambatan pembayaran dari klien karena musibah, tidak dikenakan denda persenan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Keterbukaan Supplier:</strong> Merek, spesifikasi, dan harga bahan material dibuka 100% transparan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Pengawas Syariah:</strong> Memastikan kesejahteraan dan kenyamanan ibadah para pekerja bangunan di lapangan.</span>
              </li>
            </ul>
          </div>

          {/* Konvensional */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-gray-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
              <span>✗ Kontraktor Konvensional</span>
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Sering Mark-Up:</strong> Sering muncul biaya tambahan ("biaya siluman") tak terduga di tengah proyek.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Denda Berlipat:</strong> Keterlambatan pembayaran termin dikenakan denda berbunga yang memberatkan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Spesifikasi Ditutupi:</strong> Merek material sering kali diubah secara sepihak untuk keuntungan kontraktor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span><strong>Sengketa Paksa:</strong> Sering kali terjadi sengketa pengambilalihan paksa aset jika terjadi kendala dana.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO MASONRY SECTION */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-16" id="portofolio">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-md">
            PORTFOLIO TERKINI
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl mt-3">
            Karya Realisasi Madina Build
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Berikut adalah beberapa dokumentasi fisik asli dari proyek hunian mewah milik klien kami di Jakarta, Surabaya, & Sidoarjo.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all border ${
                activeFilter === f
                  ? 'bg-gold border-gold text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid Masonry */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {filteredPortfolio.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm cursor-pointer hover:border-gold/30 text-left"
                onClick={() => setSelectedImage(item)}
              >
                {/* Image panel */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-[10px] font-bold text-gold tracking-widest uppercase bg-charcoal/80 px-2 py-1 rounded">
                      Klik Untuk Lightbox
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gold uppercase">{item.category}</span>
                    <span className="flex items-center gap-0.5 text-[9px] text-gray-400">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {item.location}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-charcoal truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {item.specs}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* LIGHTBOX MODAL */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-6 top-6 rounded-full p-2 text-white bg-white/10 hover:bg-white/20 transition-all"
              id="close-lightbox"
            >
              <ChevronLeft className="h-5 w-5 rotate-90" />
            </button>

            <div className="max-w-4xl w-full text-center space-y-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] mx-auto rounded-xl object-contain shadow-2xl border-2 border-white/10"
              />
              <div className="text-left text-white max-w-xl mx-auto px-4">
                <span className="text-xs font-bold text-gold uppercase">{selectedImage.category}</span>
                <h3 className="font-display text-xl font-bold mt-1">{selectedImage.title}</h3>
                <p className="text-xs text-gray-400 mt-1">Spesifikasi: {selectedImage.specs}</p>
                <p className="text-xs text-gray-400">Lokasi: {selectedImage.location}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7.5 DYNAMIC INTEGRATED CALCULATORS */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-20" id="kalkulator-rab">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/20 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-wider mb-2">
            🧮 Kalkulator RAB Syariah Mandiri
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl mt-1">
            Simulasi Rencana Anggaran Biaya (RAB) Anda
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Hitung sendiri estimasi biaya bangun ruang, instalasi kelistrikan (MEP), maupun interior ruangan secara akurat dan transparan sesuai syariah.
          </p>

          {/* Segment Switcher Control */}
          <div className="mt-8 inline-flex p-1.5 bg-gray-100 rounded-xl border border-gray-200">
            <button
              onClick={() => setActiveCalc('ruang')}
              className={`rounded-lg px-6 py-2.5 text-xs font-extrabold transition-all duration-200 flex items-center gap-2 ${
                activeCalc === 'ruang'
                  ? 'bg-charcoal text-white shadow-md'
                  : 'text-gray-500 hover:text-charcoal hover:bg-gray-200/50'
              }`}
            >
              <span>Kalkulator Dimensi Ruang</span>
            </button>
            <button
              onClick={() => setActiveCalc('mep')}
              className={`rounded-lg px-6 py-2.5 text-xs font-extrabold transition-all duration-200 flex items-center gap-2 ${
                activeCalc === 'mep'
                  ? 'bg-charcoal text-white shadow-md'
                  : 'text-gray-500 hover:text-charcoal hover:bg-gray-200/50'
              }`}
            >
              <span>Kalkulator Interior & MEP Stepper</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-6">
          <AnimatePresence mode="wait">
            {activeCalc === 'ruang' ? (
              <motion.div
                key="ruang-calc"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <RABCalculator onOpenConsultation={() => onOpenConsultation('RAB Dimensi Ruang')} />
              </motion.div>
            ) : (
              <motion.div
                key="mep-calc"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <InteriorMEPStepper onOpenConsultation={() => onOpenConsultation('Kalkulator Interior & MEP')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 8. TESTIMONIALS SLIDER SECTION */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 bg-gray-50 rounded-3xl py-12 border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-md">
            TESTIMONIAL KLIEN
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl mt-3">
            Apa Kata Mereka?
          </h2>
        </div>

        {/* Large Slider representation */}
        <div className="relative max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-left">
          <Quote className="absolute right-8 top-8 h-12 w-12 text-gold/10" />

          <div className="flex space-x-1.5 mb-4 text-gold">
            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>

          <p className="text-sm md:text-base text-gray-600 italic leading-relaxed">
            "{testimonials[activeTestimonial].text}"
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <h5 className="font-display text-sm font-bold text-charcoal">
                {testimonials[activeTestimonial].name}
              </h5>
              <p className="text-[10px] text-gray-400 font-medium">
                {testimonials[activeTestimonial].role}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-charcoal"
                id="testimonial-prev"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-charcoal"
                id="testimonial-next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Small avatar navigators */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === activeTestimonial ? 'bg-gold w-6' : 'bg-gray-200 w-2.5'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="mx-auto max-w-4xl px-6" id="faq">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-md">
            FAQ • PERTANYAAN UMUM
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal mt-3">
            Masih Ragu? Pelajari Lebih Lanjut
          </h2>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((f, idx) => {
            const isOpen = openFAQ === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-charcoal flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-gold" />
                    {f.q}
                  </span>
                  <span className="text-gold">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs text-gray-500 leading-relaxed border-t border-gray-50">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CTA SECTION WITH BG */}
      <section className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-charcoal h-[350px] flex items-center text-left border border-charcoal shadow-xl">
          {/* Cover background */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={images.ctaBackground}
            alt="Penyelesaian Konstruksi Madina Build"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="relative z-20 px-8 md:px-12 max-w-2xl">
            <span className="text-xs font-bold text-gold uppercase tracking-wider mb-2 block">
              MADINA BUILD • JASA KONTRAKTOR SYARIAH
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Bangun Rumah yang Menenangkan Hati Bersama Madina Build
            </h2>
            <p className="mt-4 text-xs text-gray-200 leading-relaxed">
              Mulai perencanaan dari nol dengan rasa tenang dan aman, dibimbing langsung oleh tim profesional yang berdedikasi menjaga akad kesepakatan Islam yang amanah.
            </p>
            <div className="mt-8">
              <button
                onClick={() => onOpenConsultation()}
                className="rounded-lg bg-gold hover:bg-gold-hover px-6 py-3 text-xs font-bold text-white shadow-lg shadow-gold/25 transition-all"
                id="cta-bottom-btn"
              >
                Konsultasi Syariah Gratis Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
