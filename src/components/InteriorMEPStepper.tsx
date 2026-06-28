import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  Settings,
  Flame,
  Hammer,
  DoorOpen,
  Zap,
  Info
} from 'lucide-react';
import { MEPRABState } from '../types';

interface InteriorMEPStepperProps {
  onOpenConsultation: () => void;
}

export default function InteriorMEPStepper({ onOpenConsultation }: InteriorMEPStepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Core state for the entire multi-step calculator
  const [state, setState] = useState<MEPRABState>({
    // Step 1: Dimensions
    panjang: 4.0,
    lebar: 3.0,
    tinggiPlafond: 2.8,

    // Step 2: Architecture & Walls
    plesterChecked: true,
    plesterPrice: 65000,
    catChecked: true,
    catPrice: 35000,
    keramikChecked: true,
    keramikPrice: 150000,

    // Step 3: Demolition & Doors
    pintuCount: 1,
    pintuLebar: 0.8,
    pintuTinggi: 2.1,
    pintuCatType: 'Melamik',
    bongkarChecked: false,
    bongkarPrice: 45000,
    catKusenChecked: true,
    catKusenPrice: 55000,

    // Step 4: MEP
    lampuChecked: true,
    lampuCount: 4,
    lampuSize: '4 Inch',
    lampuPrice: 35000,
    saklarChecked: true,
    saklarCount: 2,
    saklarPrice: 25000,
    exhaustChecked: false,
    exhaustCount: 1,
    exhaustPrice: 350000,
    instalasiChecked: true,
    instalasiCount: 4,
    instalasiPrice: 225000,
  });

  const handleStateChange = (fields: Partial<MEPRABState>) => {
    setState((prev) => ({ ...prev, ...fields }));
  };

  // Helper validation to prevent negative values or empty fields
  const handleNumberInput = (field: keyof MEPRABState, value: string, defVal = 0) => {
    const num = parseFloat(value);
    handleStateChange({ [field]: isNaN(num) ? defVal : num });
  };

  // 1. CALCULATIONS
  const areaLantai = state.panjang * state.lebar;
  const kelilingRuang = (state.panjang * 2) + (state.lebar * 2);
  const volumeDindingKotor = kelilingRuang * state.tinggiPlafond;

  // Step 2: Architecture Items
  const plesterVolume = volumeDindingKotor;
  const plesterTotal = state.plesterChecked ? plesterVolume * state.plesterPrice : 0;

  const catVolume = volumeDindingKotor;
  const catTotal = state.catChecked ? catVolume * state.catPrice : 0;

  const keramikVolume = areaLantai;
  const keramikTotal = state.keramikChecked ? keramikVolume * state.keramikPrice : 0;

  // Step 3: Demolition & Doors
  const bongkarVolume = areaLantai;
  const bongkarTotal = state.bongkarChecked ? bongkarVolume * state.bongkarPrice : 0;

  // Cat Kusen Volume = ((Tinggi Pintu * 2) + Lebar Pintu) * Jumlah Pintu
  const catKusenVolume = ((state.pintuTinggi * 2) + state.pintuLebar) * state.pintuCount;
  // If Duco paint is selected, add Rp 200,000 per door extra to the unit cost
  const baseKusenPrice = state.catKusenPrice;
  const extraDucoCost = state.pintuCatType === 'Duco' ? 200000 : 0;
  const catKusenTotal = state.catKusenChecked
    ? (catKusenVolume * baseKusenPrice) + (state.pintuCount * extraDucoCost)
    : 0;

  // Step 4: MEP Items
  const lampuTotal = state.lampuChecked ? state.lampuCount * state.lampuPrice : 0;
  const saklarTotal = state.saklarChecked ? state.saklarCount * state.saklarPrice : 0;
  const exhaustTotal = state.exhaustChecked ? state.exhaustCount * state.exhaustPrice : 0;
  const instalasiTotal = state.instalasiChecked ? state.instalasiCount * state.instalasiPrice : 0;

  // Summary list for checked items
  const summaryItems = [
    {
      id: 'plester',
      name: 'Plester & Aci Dinding',
      checked: state.plesterChecked,
      volume: plesterVolume,
      satuan: 'm²',
      hargaSatuan: state.plesterPrice,
      total: plesterTotal,
    },
    {
      id: 'cat',
      name: 'Pengecatan Dinding Premium',
      checked: state.catChecked,
      volume: catVolume,
      satuan: 'm²',
      hargaSatuan: state.catPrice,
      total: catTotal,
    },
    {
      id: 'keramik',
      name: 'Pemasangan Keramik Lantai',
      checked: state.keramikChecked,
      volume: keramikVolume,
      satuan: 'm²',
      hargaSatuan: state.keramikPrice,
      total: keramikTotal,
    },
    {
      id: 'bongkar',
      name: 'Bongkar Lantai Lama',
      checked: state.bongkarChecked,
      volume: bongkarVolume,
      satuan: 'm²',
      hargaSatuan: state.bongkarPrice,
      total: bongkarTotal,
    },
    {
      id: 'catKusen',
      name: `Cat Kusen Pintu (${state.pintuCatType === 'Duco' ? 'Duco + Rp200k/pintu' : 'Melamik'})`,
      checked: state.catKusenChecked,
      volume: catKusenVolume,
      satuan: "m'",
      hargaSatuan: baseKusenPrice + (state.pintuCount > 0 ? (state.pintuCount * extraDucoCost) / catKusenVolume : 0),
      total: catKusenTotal,
    },
    {
      id: 'lampu',
      name: `Pasang Lampu Baru (${state.lampuSize})`,
      checked: state.lampuChecked,
      volume: state.lampuCount,
      satuan: 'Unit',
      hargaSatuan: state.lampuPrice,
      total: lampuTotal,
    },
    {
      id: 'saklar',
      name: 'Saklar & Stop Kontak',
      checked: state.saklarChecked,
      volume: state.saklarCount,
      satuan: 'Unit',
      hargaSatuan: state.saklarPrice,
      total: saklarTotal,
    },
    {
      id: 'exhaust',
      name: 'Exhaust Fan',
      checked: state.exhaustChecked,
      volume: state.exhaustCount,
      satuan: 'Unit',
      hargaSatuan: state.exhaustPrice,
      total: exhaustTotal,
    },
    {
      id: 'instalasi',
      name: 'Instalasi Listrik (Kabel & Pipa)',
      checked: state.instalasiChecked,
      volume: state.instalasiCount,
      satuan: 'ttk',
      hargaSatuan: state.instalasiPrice,
      total: instalasiTotal,
    },
  ];

  const grandTotal = summaryItems.reduce((acc, item) => acc + item.total, 0);

  const steps = [
    { id: 1, label: 'Dimensi', desc: 'Ukuran Ruangan' },
    { id: 2, label: 'Dinding & Lantai', desc: 'Pekerjaan Arsitektur' },
    { id: 3, label: 'Pintu & Bongkaran', desc: 'Kondisional Kusen' },
    { id: 4, label: 'MEP & Listrik', desc: 'Mekanikal Elektrikal' },
    { id: 5, label: 'Hasil Akhir', desc: 'Rekapitulasi RAB' },
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-xl" id="interior-mep-stepper-section">
      {/* Header */}
      <div className="mb-8 border-b border-gray-100 pb-4 text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
            <Sparkles className="h-4 w-4" />
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal">
            Kalkulator RAB Interior & MEP Syariah
          </h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Kalkulasi real-time, multi-step stepper, modular, and transparan sesuai Syariah Islam.
        </p>
      </div>

      {/* STEPPER INDICATOR */}
      <div className="mb-10 block">
        <div className="relative flex items-center justify-between">
          {/* Progress bar background */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-100" />
          {/* Active progress bar */}
          <div
            className="absolute left-0 top-1/2 h-0.5 bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />

          {steps.map((s) => {
            const isActive = currentStep === s.id;
            const isCompleted = currentStep > s.id;

            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => s.id <= 5 && setCurrentStep(s.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                    isCompleted
                      ? 'border-amber-500 bg-amber-500 text-white'
                      : isActive
                      ? 'border-amber-500 bg-white text-amber-600 shadow-md ring-4 ring-amber-50'
                      : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : s.id}
                </button>
                <div className="absolute top-12 hidden w-32 text-center md:block">
                  <p className={`text-[11px] font-bold ${isActive ? 'text-charcoal' : 'text-gray-400'}`}>
                    {s.label}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-8 md:hidden" /> {/* Spacer for mobile stepper layout */}
      </div>

      {/* STEP CONTENT PANEL */}
      <div className="min-h-[340px] rounded-2xl bg-amber-50/10 border border-amber-100/50 p-6 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="text-left"
          >
            {/* STEP 1: DIMENSI RUANGAN */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="border-b border-amber-100 pb-2 flex items-center gap-2">
                  <Settings className="h-4.5 w-4.5 text-amber-500" />
                  <h3 className="font-display text-lg font-bold text-charcoal">Tahap 1: Dimensi Utama Ruangan</h3>
                </div>
                <p className="text-xs text-gray-500">
                  Masukkan ukuran panjang, lebar, dan tinggi ruangan. Dimensi ini akan menjadi faktor pengali utama volume pekerjaan arsitektur & interior di langkah berikutnya.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* Panjang */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Panjang Ruangan (m)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={state.panjang || ''}
                        onChange={(e) => handleNumberInput('panjang', e.target.value, 4.0)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono font-bold outline-none focus:border-amber-500 focus:bg-white"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-medium">Meter</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Contoh: Sisi depan ke belakang</p>
                  </div>

                  {/* Lebar */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Lebar Ruangan (m)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={state.lebar || ''}
                        onChange={(e) => handleNumberInput('lebar', e.target.value, 3.0)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono font-bold outline-none focus:border-amber-500 focus:bg-white"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-medium">Meter</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Contoh: Sisi kiri ke kanan</p>
                  </div>

                  {/* Tinggi Plafond */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Tinggi Plafond (m)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={state.tinggiPlafond || ''}
                        onChange={(e) => handleNumberInput('tinggiPlafond', e.target.value, 2.8)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono font-bold outline-none focus:border-amber-500 focus:bg-white"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-medium">Meter</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Contoh: Lantai ke atap langit-langit</p>
                  </div>
                </div>

                {/* Live Area Recap */}
                <div className="bg-amber-50/40 rounded-xl border border-amber-100 p-4 flex flex-col justify-between sm:flex-row gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-900">Rekap Luas & Keliling Ruang</h4>
                    <p className="text-xs text-amber-700">Perhitungan real-time dari dimensi di atas untuk referensi volume.</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] text-amber-600 font-medium">Luas Lantai</p>
                      <p className="text-base font-mono font-bold text-amber-950">{areaLantai.toFixed(2)} m²</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600 font-medium">Keliling Ruangan</p>
                      <p className="text-base font-mono font-bold text-amber-950">{kelilingRuang.toFixed(2)} m'</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600 font-medium">Luas Dinding Kotor</p>
                      <p className="text-base font-mono font-bold text-amber-950">{volumeDindingKotor.toFixed(2)} m²</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PEKERJAAN ARSITEKTUR & DINDING */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-amber-100 pb-2 flex items-center gap-2">
                  <Hammer className="h-4.5 w-4.5 text-amber-500" />
                  <h3 className="font-display text-lg font-bold text-charcoal">Tahap 2: Pekerjaan Arsitektur & Dinding</h3>
                </div>
                <p className="text-xs text-gray-500">
                  Pilih item pekerjaan dinding & lantai yang akan dihitung. Atur harga satuan material per m² menggunakan slider untuk menyesuaikan dengan budget proyek Anda.
                </p>

                <div className="space-y-4">
                  {/* Plester & Aci */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={state.plesterChecked}
                        onChange={(e) => handleStateChange({ plesterChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-plester"
                      />
                      <div>
                        <label htmlFor="check-plester" className="text-xs font-bold text-charcoal cursor-pointer">
                          Plester & Aci Dinding (Volume: {plesterVolume.toFixed(2)} m²)
                        </label>
                        <p className="text-[10px] text-gray-400">Pekerjaan meratakan bata sebelum pengecatan.</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-sm">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Harga Material/Jasa:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.plesterPrice.toLocaleString('id-ID')}/m²
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50000"
                        max="150000"
                        step="5000"
                        disabled={!state.plesterChecked}
                        value={state.plesterPrice}
                        onChange={(e) => handleStateChange({ plesterPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>Rp 50rb</span>
                        <span>Rp 150rb</span>
                      </div>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <p className="text-[10px] text-gray-400 font-medium">Total Item</p>
                      <p className="text-sm font-mono font-bold text-charcoal">
                        Rp {plesterTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Pengecatan */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={state.catChecked}
                        onChange={(e) => handleStateChange({ catChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-cat"
                      />
                      <div>
                        <label htmlFor="check-cat" className="text-xs font-bold text-charcoal cursor-pointer">
                          Pengecatan Dinding Premium (Volume: {catVolume.toFixed(2)} m²)
                        </label>
                        <p className="text-[10px] text-gray-400">3 lapis cat interior premium anti noda.</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-sm">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Harga Cat/m²:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.catPrice.toLocaleString('id-ID')}/m²
                        </span>
                      </div>
                      <input
                        type="range"
                        min="25000"
                        max="80000"
                        step="2500"
                        disabled={!state.catChecked}
                        value={state.catPrice}
                        onChange={(e) => handleStateChange({ catPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>Rp 25rb</span>
                        <span>Rp 80rb</span>
                      </div>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <p className="text-[10px] text-gray-400 font-medium">Total Item</p>
                      <p className="text-sm font-mono font-bold text-charcoal">
                        Rp {catTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Keramik Lantai */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={state.keramikChecked}
                        onChange={(e) => handleStateChange({ keramikChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-keramik"
                      />
                      <div>
                        <label htmlFor="check-keramik" className="text-xs font-bold text-charcoal cursor-pointer">
                          Pasang Keramik Lantai (Volume: {keramikVolume.toFixed(2)} m²)
                        </label>
                        <p className="text-[10px] text-gray-400">Pemasangan homogeneous tile ukuran 60x60 cm.</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-sm">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Harga Pasang/m²:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.keramikPrice.toLocaleString('id-ID')}/m²
                        </span>
                      </div>
                      <input
                        type="range"
                        min="100000"
                        max="350000"
                        step="5000"
                        disabled={!state.keramikChecked}
                        value={state.keramikPrice}
                        onChange={(e) => handleStateChange({ keramikPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>Rp 100rb</span>
                        <span>Rp 350rb</span>
                      </div>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <p className="text-[10px] text-gray-400 font-medium">Total Item</p>
                      <p className="text-sm font-mono font-bold text-charcoal">
                        Rp {keramikTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: BONGKARAN & PINTU */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-b border-amber-100 pb-2 flex items-center gap-2">
                  <DoorOpen className="h-4.5 w-4.5 text-amber-500" />
                  <h3 className="font-display text-lg font-bold text-charcoal">Tahap 3: Bongkaran & Spesifikasi Pintu</h3>
                </div>
                <p className="text-xs text-gray-500">
                  Konfigurasikan jumlah pintu serta spesifikasi cat penutup (Melamik atau Duco). Pekerjaan bongkaran lantai lama juga bisa dihitung secara kondisional di bawah ini.
                </p>

                {/* Pintu Spec Box */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <h4 className="text-xs font-bold text-charcoal mb-4 uppercase tracking-wider">Input Dimensi & Spesifikasi Pintu</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Jumlah Pintu (Unit)</label>
                      <input
                        type="number"
                        value={state.pintuCount || 0}
                        onChange={(e) => handleNumberInput('pintuCount', e.target.value, 1)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Lebar Pintu (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={state.pintuLebar || 0}
                        onChange={(e) => handleNumberInput('pintuLebar', e.target.value, 0.8)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Tinggi Pintu (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={state.pintuTinggi || 0}
                        onChange={(e) => handleNumberInput('pintuTinggi', e.target.value, 2.1)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Pilihan Cat Pintu</label>
                      <select
                        value={state.pintuCatType}
                        onChange={(e) => handleStateChange({ pintuCatType: e.target.value as 'Melamik' | 'Duco' })}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold"
                      >
                        <option value="Melamik">Melamik (Standard)</option>
                        <option value="Duco">Duco (+Rp 200rb/Pintu)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-100">
                    <Info className="h-3.5 w-3.5" />
                    <span>Cat Duco membutuhkan teknik semprot bertahap dengan pelapisan epoxy halus, menambah biaya <strong>Rp 200.000</strong> per daun pintu.</span>
                  </div>
                </div>

                {/* Items check */}
                <div className="space-y-4">
                  {/* Bongkar Lantai */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={state.bongkarChecked}
                        onChange={(e) => handleStateChange({ bongkarChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-bongkar"
                      />
                      <div>
                        <label htmlFor="check-bongkar" className="text-xs font-bold text-charcoal cursor-pointer">
                          Bongkar Lantai Lama (Volume: {bongkarVolume.toFixed(2)} m²)
                        </label>
                        <p className="text-[10px] text-gray-400">Pekerjaan meruntuhkan keramik lama sebelum diletakkan yang baru.</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-sm">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Biaya Bongkar/m²:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.bongkarPrice.toLocaleString('id-ID')}/m²
                        </span>
                      </div>
                      <input
                        type="range"
                        min="30000"
                        max="100000"
                        step="5000"
                        disabled={!state.bongkarChecked}
                        value={state.bongkarPrice}
                        onChange={(e) => handleStateChange({ bongkarPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>Rp 30rb</span>
                        <span>Rp 100rb</span>
                      </div>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <p className="text-[10px] text-gray-400 font-medium">Total Item</p>
                      <p className="text-sm font-mono font-bold text-charcoal">
                        Rp {bongkarTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Cat Kusen */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={state.catKusenChecked}
                        onChange={(e) => handleStateChange({ catKusenChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-kusen"
                      />
                      <div>
                        <label htmlFor="check-kusen" className="text-xs font-bold text-charcoal cursor-pointer">
                          Cat Kusen Pintu (Volume: {catKusenVolume.toFixed(2)} m')
                        </label>
                        <p className="text-[10px] text-gray-400">Pengecatan atau pelapisan kusen meter lari.</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-sm">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Harga Cat/m':</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.catKusenPrice.toLocaleString('id-ID')}/m'
                        </span>
                      </div>
                      <input
                        type="range"
                        min="40000"
                        max="90000"
                        step="2500"
                        disabled={!state.catKusenChecked}
                        value={state.catKusenPrice}
                        onChange={(e) => handleStateChange({ catKusenPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>Rp 40rb</span>
                        <span>Rp 90rb</span>
                      </div>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <p className="text-[10px] text-gray-400 font-medium">Total Item</p>
                      <p className="text-sm font-mono font-bold text-charcoal">
                        Rp {catKusenTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: MEKANIKAL, ELEKTRIKAL, PLUMBING (MEP) */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-amber-100 pb-2 flex items-center gap-2">
                  <Zap className="h-4.5 w-4.5 text-amber-500" />
                  <h3 className="font-display text-lg font-bold text-charcoal">Tahap 4: Mekanikal, Elektrikal, Plumbing (MEP)</h3>
                </div>
                <p className="text-xs text-gray-500">
                  Tambahkan detail instalasi lampu downlight, saklar kelistrikan, exhaust fan, serta pemipaan kabel secara modular.
                </p>

                <div className="space-y-4">
                  {/* Pasang Lampu Baru */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-[240px]">
                      <input
                        type="checkbox"
                        checked={state.lampuChecked}
                        onChange={(e) => handleStateChange({ lampuChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-lampu"
                      />
                      <div>
                        <label htmlFor="check-lampu" className="text-xs font-bold text-charcoal cursor-pointer">
                          Pasang Lampu Downlight
                        </label>
                        <p className="text-[10px] text-gray-400">Pemasangan lampu LED hemat energi.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div>
                        <label className="block text-[8px] font-bold text-gray-400 uppercase">Jumlah</label>
                        <input
                          type="number"
                          disabled={!state.lampuChecked}
                          value={state.lampuCount}
                          onChange={(e) => handleNumberInput('lampuCount', e.target.value, 4)}
                          className="w-16 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-mono font-bold text-center disabled:opacity-40"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-gray-400 uppercase">Ukuran</label>
                        <select
                          disabled={!state.lampuChecked}
                          value={state.lampuSize}
                          onChange={(e) => handleStateChange({ lampuSize: e.target.value as any })}
                          className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-bold disabled:opacity-40"
                        >
                          <option value="3 Inch">3 Inch</option>
                          <option value="4 Inch">4 Inch</option>
                          <option value="5 Inch">5 Inch</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Harga Lampu/Unit:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.lampuPrice.toLocaleString('id-ID')}/unit
                        </span>
                      </div>
                      <input
                        type="range"
                        min="15000"
                        max="100000"
                        step="5000"
                        disabled={!state.lampuChecked}
                        value={state.lampuPrice}
                        onChange={(e) => handleStateChange({ lampuPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-[10px] text-gray-400 font-medium">Subtotal</p>
                      <p className="text-xs font-mono font-bold text-charcoal">
                        Rp {lampuTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Saklar & Stop Kontak */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-[240px]">
                      <input
                        type="checkbox"
                        checked={state.saklarChecked}
                        onChange={(e) => handleStateChange({ saklarChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-saklar"
                      />
                      <div>
                        <label htmlFor="check-saklar" className="text-xs font-bold text-charcoal cursor-pointer">
                          Saklar & Stop Kontak (Unit)
                        </label>
                        <p className="text-[10px] text-gray-400">Pemasangan saklar ganda/tunggal premium.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-bold text-gray-400 uppercase">Jumlah Unit</label>
                      <input
                        type="number"
                        disabled={!state.saklarChecked}
                        value={state.saklarCount}
                        onChange={(e) => handleNumberInput('saklarCount', e.target.value, 2)}
                        className="w-16 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-mono font-bold text-center disabled:opacity-40"
                      />
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Harga Saklar:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.saklarPrice.toLocaleString('id-ID')}/unit
                        </span>
                      </div>
                      <input
                        type="range"
                        min="15000"
                        max="50000"
                        step="1000"
                        disabled={!state.saklarChecked}
                        value={state.saklarPrice}
                        onChange={(e) => handleStateChange({ saklarPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-[10px] text-gray-400 font-medium">Subtotal</p>
                      <p className="text-xs font-mono font-bold text-charcoal">
                        Rp {saklarTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Exhaust Fan */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-[240px]">
                      <input
                        type="checkbox"
                        checked={state.exhaustChecked}
                        onChange={(e) => handleStateChange({ exhaustChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-exhaust"
                      />
                      <div>
                        <label htmlFor="check-exhaust" className="text-xs font-bold text-charcoal cursor-pointer">
                          Exhaust Fan (Peredam & Sirkulasi)
                        </label>
                        <p className="text-[10px] text-gray-400">Pemasangan ceiling exhaust fan merek ternama.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-bold text-gray-400 uppercase">Jumlah Unit</label>
                      <input
                        type="number"
                        disabled={!state.exhaustChecked}
                        value={state.exhaustCount}
                        onChange={(e) => handleNumberInput('exhaustCount', e.target.value, 1)}
                        className="w-16 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-mono font-bold text-center disabled:opacity-40"
                      />
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Harga Exhaust:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.exhaustPrice.toLocaleString('id-ID')}/unit
                        </span>
                      </div>
                      <input
                        type="range"
                        min="200000"
                        max="1500000"
                        step="50000"
                        disabled={!state.exhaustChecked}
                        value={state.exhaustPrice}
                        onChange={(e) => handleStateChange({ exhaustPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-[10px] text-gray-400 font-medium">Subtotal</p>
                      <p className="text-xs font-mono font-bold text-charcoal">
                        Rp {exhaustTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Instalasi Kabel */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-[240px]">
                      <input
                        type="checkbox"
                        checked={state.instalasiChecked}
                        onChange={(e) => handleStateChange({ instalasiChecked: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        id="check-instalasi"
                      />
                      <div>
                        <label htmlFor="check-instalasi" className="text-xs font-bold text-charcoal cursor-pointer">
                          Instalasi Listrik (Kabel & Pipa conduit)
                        </label>
                        <p className="text-[10px] text-gray-400">Jasa pemasangan titik kabel di atas plafon.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-bold text-gray-400 uppercase">Jumlah Titik</label>
                      <input
                        type="number"
                        disabled={!state.instalasiChecked}
                        value={state.instalasiCount}
                        onChange={(e) => handleNumberInput('instalasiCount', e.target.value, 4)}
                        className="w-16 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-mono font-bold text-center disabled:opacity-40"
                      />
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                        <span>Biaya/Titik Jasa+Material:</span>
                        <span className="font-mono font-bold text-amber-600">
                          Rp {state.instalasiPrice.toLocaleString('id-ID')}/ttk
                        </span>
                      </div>
                      <input
                        type="range"
                        min="150000"
                        max="350000"
                        step="10000"
                        disabled={!state.instalasiChecked}
                        value={state.instalasiPrice}
                        onChange={(e) => handleStateChange({ instalasiPrice: parseInt(e.target.value) })}
                        className="w-full accent-amber-500 disabled:opacity-30 cursor-pointer"
                      />
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-[10px] text-gray-400 font-medium">Subtotal</p>
                      <p className="text-xs font-mono font-bold text-charcoal">
                        Rp {instalasiTotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: HALAMAN HASIL (REKAPITULASI) */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="border-b border-amber-100 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4.5 w-4.5 text-amber-500" />
                    <h3 className="font-display text-lg font-bold text-charcoal">Tahap 5: Rekapitulasi RAB Keseluruhan</h3>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 bg-amber-500 text-white rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-amber-600 transition-colors"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Cetak / Simpan PDF
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm" id="print-area">
                  <table className="w-full border-collapse text-left text-xs text-gray-500">
                    <thead className="bg-gray-50 text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 border-b border-gray-100">Nama Item Pekerjaan</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-center">Volume</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-center">Satuan</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-right">Harga Satuan (Slider)</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-right">Total Biaya</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {summaryItems.map((item) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-amber-50/50 transition-colors ${
                            !item.checked ? 'opacity-30 line-through bg-gray-50/20' : ''
                          }`}
                        >
                          <td className="px-6 py-4 font-semibold text-charcoal">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-center font-mono font-bold">
                            {item.checked ? item.volume.toFixed(2) : '-'}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-400">
                            {item.checked ? item.satuan : '-'}
                          </td>
                          <td className="px-6 py-4 text-right font-mono text-gray-600">
                            {item.checked ? `Rp ${item.hargaSatuan.toLocaleString('id-ID')}` : '-'}
                          </td>
                          <td className="px-6 py-4 text-right font-mono font-bold text-charcoal">
                            Rp {item.total.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}

                      {/* Summary Grand Total */}
                      <tr className="bg-amber-500/5 text-charcoal text-sm font-bold">
                        <td colSpan={4} className="px-6 py-5 text-right font-display text-xs font-bold text-gray-700">
                          Grand Total Estimasi RAB Syariah:
                        </td>
                        <td className="px-6 py-5 text-right font-mono font-bold text-lg text-amber-600 border-l border-amber-100">
                          Rp {grandTotal.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Sharia Principles Disclaimer */}
                <div className="bg-amber-50/40 rounded-xl border border-amber-200/50 p-4 flex gap-3 text-xs text-amber-900">
                  <div className="text-base">🕋</div>
                  <div>
                    <h4 className="font-bold">Prinsip Keterbukaan Akad Syariah (Transparansi RAB)</h4>
                    <p className="mt-1 text-amber-800 leading-relaxed">
                      Estimasi di atas menggunakan hitungan murni yang terbuka tanpa ada mark-up tersembunyi. Madina Build menggunakan sistem <strong>Akad Istishna'</strong> atau <strong>Ijarah</strong> yang disepakati di awal secara rigid tanpa adanya denda keterlambatan (riba) maupun biaya siluman tambahan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={onOpenConsultation}
                    className="flex-1 rounded-xl bg-gold hover:bg-gold-hover text-white text-xs font-bold py-3 px-6 text-center shadow-lg shadow-gold/20 transition-all text-ellipsis overflow-hidden"
                  >
                    Konsultasikan Hasil RAB Ini ke Ahlinya (Gratis)
                  </button>
                  <button
                    onClick={handlePrint}
                    className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold py-3 px-6 flex items-center gap-1.5 transition-all"
                  >
                    <Printer className="h-4 w-4" />
                    Cetak RAB
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER BUTTONS ON STEPPER */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-5">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          id="stepper-prev-btn"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Kembali</span>
        </button>

        {currentStep < 5 ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/15 transition-all"
            id="stepper-next-btn"
          >
            <span>Berikutnya</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-1.5 rounded-lg bg-gold hover:bg-gold-hover px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-gold/15 transition-all animate-pulse"
            id="stepper-finish-btn"
          >
            <span>Lihat Hasil Akhir & Ajukan</span>
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
