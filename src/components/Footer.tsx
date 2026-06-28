import React from 'react';
import { Landmark, MapPin, Mail, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'layanan' | 'portofolio' | 'kalkulator-rab') => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t border-white/5" id="main-footer">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 text-left">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-charcoal font-display font-extrabold text-lg">
                M
              </div>
              <span className="font-display text-lg font-extrabold tracking-tight text-white block">
                MADINA <span className="text-gold">BUILD</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Jasa Arsitek, Kontraktor & Desain Interior Berbasis Syariah yang amanah, transparan, profesional, dan bergaransi penuh di Indonesia.
            </p>
            <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-gold font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Akad Istishna' & Ijarah Syariah</span>
            </div>
          </div>

          {/* Column 2: Regional Offices */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-wider text-gold uppercase border-b border-white/10 pb-2">
              Kantor Regional
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Jakarta Office</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Sudirman Central Business District, Jakarta Selatan</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Sidoarjo Office</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Ruko Istana Mentari, Jl. Raya Sidoarjo, Sidoarjo, Jatim</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-wider text-gold uppercase border-b border-white/10 pb-2">
              Kalkulator RAB
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Profil & Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('kalkulator-rab')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kalkulator Dimensi Ruang
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('kalkulator-rab')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kalkulator Interior & MEP
                </button>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacts */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-wider text-gold uppercase border-b border-white/10 pb-2">
              Kontak Konsultan
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gold flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400">WhatsApp (24 Jam)</p>
                  <a href="https://wa.me/628113330232" className="font-bold text-white hover:text-gold transition-colors">
                    +62 811-3330-232
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400">Email Utama</p>
                  <a href="mailto:madinabuildconsultant@gmail.com" className="font-bold text-white hover:text-gold transition-colors block truncate max-w-[200px]">
                    madinabuildconsultant@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Madina Build. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1">
            <span>Dibuat penuh amanah & cinta</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>untuk hunian keluarga berkah Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
