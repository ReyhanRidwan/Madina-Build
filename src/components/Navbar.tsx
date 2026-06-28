import React, { useState } from 'react';
import { Menu, X, Home, Wrench, FolderOpen, Calculator, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'layanan' | 'portofolio' | 'kalkulator-rab';
  setActiveTab: (tab: 'home' | 'layanan' | 'portofolio' | 'kalkulator-rab') => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenConsultation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { id: 'layanan', label: 'Layanan', icon: <Wrench className="h-4 w-4" /> },
    { id: 'portofolio', label: 'Portofolio', icon: <FolderOpen className="h-4 w-4" /> },
    { id: 'kalkulator-rab', label: 'Kalkulator RAB', icon: <Calculator className="h-4 w-4" /> },
  ] as const;

  const handleTabClick = (tabId: 'home' | 'layanan' | 'portofolio' | 'kalkulator-rab') => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm" id="main-navigation">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleTabClick('home')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-charcoal text-gold font-display font-extrabold text-lg shadow-md">
              M
            </div>
            <div className="text-left">
              <span className="font-display text-base font-extrabold tracking-tight text-charcoal block leading-none">
                MADINA <span className="text-gold">BUILD</span>
              </span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">
                Konstruksi Syariah Premium
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gold/10 text-gold shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-charcoal'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-1.5 rounded-lg bg-charcoal hover:bg-charcoal/90 px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
              id="nav-cta-btn"
            >
              <PhoneCall className="h-3.5 w-3.5 text-gold" />
              <span>Konsultasi Syariah</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-charcoal focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 text-left" id="mobile-drawer">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                onOpenConsultation();
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold hover:bg-gold-hover py-3 text-sm font-bold text-white shadow-md shadow-gold/15"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Konsultasi Syariah (Gratis)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
