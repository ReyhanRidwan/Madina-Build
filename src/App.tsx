import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompanyProfile from './components/CompanyProfile';
import SurveyModal from './components/SurveyModal';
import { MessageSquare, ShieldAlert, HeartHandshake } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'layanan' | 'portofolio' | 'kalkulator-rab'>('home');
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openSurveyWithService = (serviceName?: string) => {
    setSelectedService(serviceName || '');
    setIsSurveyOpen(true);
  };

  const handleSetActiveTab = (tab: 'home' | 'layanan' | 'portofolio' | 'kalkulator-rab') => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync scroll position with active tab in Navbar
  useEffect(() => {
    const sections = ['home', 'layanan', 'portofolio', 'kalkulator-rab'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as any);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-charcoal">
      {/* 1. MASTER HEADER */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        onOpenConsultation={() => openSurveyWithService()}
      />

      {/* 2. DYNAMIC CONTENT PORTAL */}
      <main className="flex-grow">
        <CompanyProfile onOpenConsultation={openSurveyWithService} />
      </main>

      {/* 3. SHARIA COMMITMENT BAR */}
      <section className="bg-charcoal text-white py-4 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <HeartHandshake className="h-4.5 w-4.5 text-gold flex-shrink-0" />
            <span>Madina Build berkomitmen menghadirkan transaksi konstruksi halal bebas Riba, Gharar, & Dzalim.</span>
          </div>
          <span className="text-[10px] text-gold font-bold tracking-widest uppercase border border-gold/20 rounded px-2 py-0.5">
            Lolos Sertifikasi Syariah Mandiri
          </span>
        </div>
      </section>

      {/* 4. MASTER FOOTER */}
      <Footer setActiveTab={setActiveTab} />

      {/* 5. FLOATING CUSTOMER SERVICE BUTTON */}
      <button
        onClick={() => openSurveyWithService('Customer Service Support')}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-charcoal hover:bg-black text-white px-5 py-3 shadow-2xl transition-all border border-gold/40 hover:border-gold group active:scale-95"
        id="floating-cs-button"
        title="Hubungi Customer Service Madina Build"
      >
        <div className="relative">
          <MessageSquare className="h-4.5 w-4.5 text-gold group-hover:animate-bounce" />
          <span className="absolute top-[-3px] right-[-3px] flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </span>
        </div>
        <span className="text-xs font-bold tracking-wide">Customer Service</span>
      </button>

      {/* 6. SURVEY & REDIRECTION MODAL */}
      <SurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        initialType={selectedService}
      />
    </div>
  );
}
