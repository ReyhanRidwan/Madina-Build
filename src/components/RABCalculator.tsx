import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, MessageSquare, RefreshCw, Layout, ArrowRight } from 'lucide-react';
import { RoomRABState } from '../types';

interface RABCalculatorProps {
  onOpenConsultation: () => void;
}

export default function RABCalculator({ onOpenConsultation }: RABCalculatorProps) {
  const [dimensions, setDimensions] = useState<RoomRABState>({
    wallA: 1.45,
    wallB: 6.00,
    wallC: 1.45,
    wallD: 6.00,
    plafondHeight: 2.8,
  });

  const [errors, setErrors] = useState({
    wallA: '',
    wallB: '',
    wallC: '',
    wallD: '',
    plafondHeight: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    setDimensions((prev) => ({
      ...prev,
      [name]: isNaN(numValue) ? 0 : numValue,
    }));

    // Validation range
    let min = 0.95;
    let max = 6.00;
    if (name === 'plafondHeight') {
      min = 2.50;
      max = 3.30;
    }

    if (isNaN(numValue)) {
      setErrors((prev) => ({ ...prev, [name]: 'Harus angka' }));
    } else if (numValue < min || numValue > max) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Rentang: ${min.toFixed(2)} - ${max.toFixed(2)}m`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name: keyof RoomRABState) => {
    let val = dimensions[name];
    let min = 0.95;
    let max = 6.00;

    if (name === 'plafondHeight') {
      min = 2.50;
      max = 3.30;
    }

    if (val < min) {
      val = min;
    } else if (val > max) {
      val = max;
    }

    setDimensions((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const resetToDefault = () => {
    setDimensions({
      wallA: 1.45,
      wallB: 6.00,
      wallC: 1.45,
      wallD: 6.00,
      plafondHeight: 2.8,
    });
    setErrors({
      wallA: '',
      wallB: '',
      wallC: '',
      wallD: '',
      plafondHeight: '',
    });
  };

  // Calculate dynamic display coordinates for SVG Floor Plan
  const avgWidth = (dimensions.wallA + dimensions.wallC) / 2;
  const avgHeight = (dimensions.wallB + dimensions.wallD) / 2;

  // Map dimensions to container boundaries (max 240px, min 80px)
  const maxDim = Math.max(avgWidth, avgHeight);
  const scale = maxDim > 0 ? 150 / maxDim : 30;

  const rectWidth = Math.max(80, Math.min(240, avgWidth * scale));
  const rectHeight = Math.max(80, Math.min(180, avgHeight * scale));

  const svgCenterX = 150;
  const svgCenterY = 110;

  const rectX = svgCenterX - rectWidth / 2;
  const rectY = svgCenterY - rectHeight / 2;

  // Real-time Rough Cost estimation based on floor area
  const area = avgWidth * avgHeight;
  const perimeter = dimensions.wallA + dimensions.wallB + dimensions.wallC + dimensions.wallD;
  const wallArea = perimeter * dimensions.plafondHeight;

  // Syariah rate estimates
  const buildRate = 4250000; // Rp 4.25M per m² standard
  const interiorRate = 1850000; // Rp 1.85M per m² interior
  const totalBuildEst = area * buildRate;
  const totalInteriorEst = area * interiorRate;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl relative" id="rab-calculator-section">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal flex items-center gap-2">
            <Layout className="h-6 w-6 text-gold" />
            Kalkulator RAB Ruang & Fasad Syariah
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Visualisasi dua kolom responsif untuk menghitung dimensi dan estimasi biaya konstruksi.
          </p>
        </div>
        <button
          onClick={resetToDefault}
          className="flex items-center gap-1.5 self-start rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset Default
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* PANEL KIRI - VISUALISASI DIAGRAM (Responsive 5-cols on large screen) */}
        <div className="flex flex-col justify-between rounded-xl bg-gray-50 border border-gray-200 p-6 lg:col-span-5">
          <div className="w-full text-center">
            <span className="inline-block bg-charcoal text-gold text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-4">
              Visualisasi Denah & Ketinggian (Reaktif)
            </span>
          </div>

          {/* SVG Denah Ruangan */}
          <div className="flex flex-col items-center justify-center min-h-[240px] relative bg-white rounded-xl border border-gray-200/60 shadow-inner p-4 mb-6">
            <svg width="300" height="220" className="overflow-visible">
              {/* Outer boundary guides */}
              <g className="text-gray-400">
                <line x1="10" y1="10" x2="290" y2="10" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="10" y1="210" x2="290" y2="210" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              </g>

              {/* Main Floor Plan Rect - THICK BLACK LINE */}
              <rect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                fill="rgba(200, 164, 90, 0.04)"
                stroke="#2B2B2B"
                strokeWidth="3.5"
                rx="4"
                className="transition-all duration-300 ease-out"
              />

              {/* Wall Labels inside the rect */}
              <text x={svgCenterX} y={rectY + 25} textAnchor="middle" className="text-[11px] font-bold text-gray-700 font-sans">
                DINDING A
              </text>
              <text x={rectX + rectWidth - 25} y={svgCenterY} textAnchor="end" alignmentBaseline="middle" className="text-[11px] font-bold text-gray-700 font-sans">
                DINDING B
              </text>
              <text x={svgCenterX} y={rectY + rectHeight - 15} textAnchor="middle" className="text-[11px] font-bold text-gray-700 font-sans">
                DINDING C
              </text>
              <text x={rectX + 25} y={svgCenterY} textAnchor="start" alignmentBaseline="middle" className="text-[11px] font-bold text-gray-700 font-sans">
                DINDING D
              </text>

              {/* Dynamic Dimensions Outside Borders - Monospace Numbers */}
              {/* Dinding A (Atas) */}
              <text x={svgCenterX} y={rectY - 12} textAnchor="middle" className="text-xs font-mono font-bold text-gold bg-white">
                {dimensions.wallA.toFixed(2)}m
              </text>
              <line x1={rectX} y1={rectY - 6} x2={rectX + rectWidth} y2={rectY - 6} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX} y1={rectY - 10} x2={rectX} y2={rectY - 2} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX + rectWidth} y1={rectY - 10} x2={rectX + rectWidth} y2={rectY - 2} stroke="#C8A45A" strokeWidth="1.5" />

              {/* Dinding B (Kanan) */}
              <text x={rectX + rectWidth + 12} y={svgCenterY} textAnchor="start" alignmentBaseline="middle" className="text-xs font-mono font-bold text-gold">
                {dimensions.wallB.toFixed(2)}m
              </text>
              <line x1={rectX + rectWidth + 6} y1={rectY} x2={rectX + rectWidth + 6} y2={rectY + rectHeight} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX + rectWidth + 2} y1={rectY} x2={rectX + rectWidth + 10} y2={rectY} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX + rectWidth + 2} y1={rectY + rectHeight} x2={rectX + rectWidth + 10} y2={rectY + rectHeight} stroke="#C8A45A" strokeWidth="1.5" />

              {/* Dinding C (Bawah) */}
              <text x={svgCenterX} y={rectY + rectHeight + 22} textAnchor="middle" className="text-xs font-mono font-bold text-gold">
                {dimensions.wallC.toFixed(2)}m
              </text>
              <line x1={rectX} y1={rectY + rectHeight + 6} x2={rectX + rectWidth} y2={rectY + rectHeight + 6} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX} y1={rectY + rectHeight + 2} x2={rectX} y2={rectY + rectHeight + 10} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX + rectWidth} y1={rectY + rectHeight + 2} x2={rectX + rectWidth} y2={rectY + rectHeight + 10} stroke="#C8A45A" strokeWidth="1.5" />

              {/* Dinding D (Kiri) */}
              <text x={rectX - 12} y={svgCenterY} textAnchor="end" alignmentBaseline="middle" className="text-xs font-mono font-bold text-gold">
                {dimensions.wallD.toFixed(2)}m
              </text>
              <line x1={rectX - 6} y1={rectY} x2={rectX - 6} y2={rectY + rectHeight} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX - 10} y1={rectY} x2={rectX - 2} y2={rectY} stroke="#C8A45A" strokeWidth="1.5" />
              <line x1={rectX - 10} y1={rectY + rectHeight} x2={rectX - 2} y2={rectY + rectHeight} stroke="#C8A45A" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Diagram Potongan Vertikal */}
          <div className="rounded-xl bg-white border border-gray-200/60 p-4">
            <h4 className="text-xs font-bold text-charcoal mb-3 uppercase tracking-wider text-left border-b border-gray-100 pb-1">
              Potongan Vertikal Ruang
            </h4>
            <div className="relative h-20 border-l-2 border-charcoal ml-8 flex flex-col justify-between">
              {/* Ceiling Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-600 flex justify-between items-center pr-2">
                <span className="text-[10px] font-semibold text-gray-500 -ml-7 bg-white px-1">Plafond</span>
                <span className="text-[10px] font-mono font-bold text-gold bg-white px-1">
                  +{dimensions.plafondHeight.toFixed(2)}m
                </span>
              </div>

              {/* Floor Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-charcoal flex justify-between items-center pr-2">
                <span className="text-[10px] font-semibold text-gray-700 -ml-6 bg-white px-1">Lantai</span>
                <span className="text-[10px] font-mono font-bold text-gray-500 bg-white px-1">±0.00m</span>
              </div>

              {/* Height Indicator arrow */}
              <div className="absolute top-0 bottom-0 right-8 flex flex-col justify-between items-center text-gold">
                <div className="h-full w-[1.5px] bg-gold relative">
                  <div className="absolute top-0 left-[-3px] border-solid border-b-gold border-b-4 border-x-transparent border-x-4 border-t-0" />
                  <div className="absolute bottom-0 left-[-3px] border-solid border-t-gold border-t-4 border-x-transparent border-x-4 border-b-0" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 py-0.5 text-[10px] font-mono font-bold">
                    {dimensions.plafondHeight.toFixed(2)}m
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL KANAN - FORM INPUT (Responsive 7-cols on large screen) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/20 p-5 mb-6">
            <h3 className="font-display text-base font-semibold text-indigo-950 mb-1">
              Masukkan ukuran dalam-dalam ruang!
            </h3>
            <p className="text-xs text-indigo-700">
              Ubah dimensi di bawah untuk menyesuaikan gambar denah dan melihat kalkulasi real-time.
            </p>

            <div className="mt-5 space-y-4">
              {/* Dinding A */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                    A
                  </span>
                  <label className="text-xs font-semibold text-charcoal">Panjang Dinding A (Atas)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    name="wallA"
                    value={dimensions.wallA || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('wallA')}
                    className="w-24 rounded border border-indigo-200 bg-indigo-50/30 px-2 py-1 text-right text-xs font-mono font-bold text-indigo-950 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                  <span className="text-xs text-gray-500 w-10">meter</span>
                  <span className="text-[10px] text-gray-400 font-mono w-20 text-right">(0.95-6.00)</span>
                </div>
              </div>
              {errors.wallA && <p className="text-[10px] text-red-500 text-right mr-32 -mt-3">{errors.wallA}</p>}

              {/* Dinding B */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                    B
                  </span>
                  <label className="text-xs font-semibold text-charcoal">Lebar Dinding B (Kanan)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    name="wallB"
                    value={dimensions.wallB || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('wallB')}
                    className="w-24 rounded border border-indigo-200 bg-indigo-50/30 px-2 py-1 text-right text-xs font-mono font-bold text-indigo-950 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                  <span className="text-xs text-gray-500 w-10">meter</span>
                  <span className="text-[10px] text-gray-400 font-mono w-20 text-right">(0.95-6.00)</span>
                </div>
              </div>
              {errors.wallB && <p className="text-[10px] text-red-500 text-right mr-32 -mt-3">{errors.wallB}</p>}

              {/* Dinding C */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                    C
                  </span>
                  <label className="text-xs font-semibold text-charcoal">Panjang Dinding C (Bawah)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    name="wallC"
                    value={dimensions.wallC || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('wallC')}
                    className="w-24 rounded border border-indigo-200 bg-indigo-50/30 px-2 py-1 text-right text-xs font-mono font-bold text-indigo-950 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                  <span className="text-xs text-gray-500 w-10">meter</span>
                  <span className="text-[10px] text-gray-400 font-mono w-20 text-right">(0.95-6.00)</span>
                </div>
              </div>
              {errors.wallC && <p className="text-[10px] text-red-500 text-right mr-32 -mt-3">{errors.wallC}</p>}

              {/* Dinding D */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                    D
                  </span>
                  <label className="text-xs font-semibold text-charcoal">Lebar Dinding D (Kiri)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    name="wallD"
                    value={dimensions.wallD || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('wallD')}
                    className="w-24 rounded border border-indigo-200 bg-indigo-50/30 px-2 py-1 text-right text-xs font-mono font-bold text-indigo-950 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                  <span className="text-xs text-gray-500 w-10">meter</span>
                  <span className="text-[10px] text-gray-400 font-mono w-20 text-right">(0.95-6.00)</span>
                </div>
              </div>
              {errors.wallD && <p className="text-[10px] text-red-500 text-right mr-32 -mt-3">{errors.wallD}</p>}

              {/* Tinggi Plafond */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-5 w-5 text-indigo-500" />
                  <label className="text-xs font-semibold text-charcoal">Tinggi Plafond (Vertical)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    name="plafondHeight"
                    value={dimensions.plafondHeight || ''}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('plafondHeight')}
                    className="w-24 rounded border border-indigo-200 bg-indigo-50/30 px-2 py-1 text-right text-xs font-mono font-bold text-indigo-950 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-200"
                  />
                  <span className="text-xs text-gray-500 w-10">meter</span>
                  <span className="text-[10px] text-gray-400 font-mono w-20 text-right">(2.50-3.30)</span>
                </div>
              </div>
              {errors.plafondHeight && <p className="text-[10px] text-red-500 text-right mr-32 -mt-3">{errors.plafondHeight}</p>}
            </div>
          </div>

          {/* Quick Estimations Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">
              Estimasi Ringkasan Ruangan Syariah
            </h4>
            <div className="grid grid-cols-2 gap-4 text-left sm:grid-cols-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Luas Lantai</p>
                <p className="text-sm font-mono font-bold text-charcoal">{area.toFixed(2)} m²</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Keliling Ruang</p>
                <p className="text-sm font-mono font-bold text-charcoal">{perimeter.toFixed(2)} m'</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Luas Dinding Kotor</p>
                <p className="text-sm font-mono font-bold text-charcoal">{wallArea.toFixed(2)} m²</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Tinggi Plafond</p>
                <p className="text-sm font-mono font-bold text-charcoal">{dimensions.plafondHeight.toFixed(1)} m</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Estimasi Pekerjaan Konstruksi (Kasar)</span>
                <span className="font-mono font-bold text-charcoal">
                  Rp {totalBuildEst.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Estimasi Pekerjaan Interior Premium (Kasar)</span>
                <span className="font-mono font-bold text-gold">
                  Rp {totalInteriorEst.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gold hover:bg-gold-hover px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-gold/10 transition-all"
            >
              <span>Ajukan RAB Resmi & Desain 3D</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
