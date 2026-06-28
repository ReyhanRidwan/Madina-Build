import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { SurveyData } from '../types';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string; // e.g. "Rumah Premium" if preset from service click
}

export default function SurveyModal({ isOpen, onClose, initialType = '' }: SurveyModalProps) {
  const [formData, setFormData] = useState<SurveyData>({
    nama: '',
    whatsapp: '',
    kota: '',
    jenisBangunan: initialType || 'Rumah Baru',
    luasBangunan: '',
    budget: '',
    targetPembangunan: '',
    fotoLahan: null,
    fotoLahanName: '',
    catatan: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        fotoLahan: file,
        fotoLahanName: file.name,
      }));
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.nama || !formData.whatsapp || !formData.kota || !formData.luasBangunan || !formData.budget || !formData.targetPembangunan) {
      alert('Harap isi semua kolom wajib (ditandai dengan *).');
      return;
    }

    setIsSubmitted(true);

    // Format WhatsApp Message
    const waNumber = '628113330232';
    const message = `Halo Madina Build, saya ingin mengajukan Konsultasi & Survey Konstruksi/Interior Syariah:

*IDENTITAS CLIENT*
• Nama: ${formData.nama}
• No. WhatsApp: ${formData.whatsapp}
• Domisili/Kota: ${formData.kota}

*SPESIFIKASI PROYEK*
• Jenis Proyek: ${formData.jenisBangunan}
• Luas Bangunan: ${formData.luasBangunan} m²
• Rencana Budget: ${formData.budget}
• Target Mulai Pembangunan: ${formData.targetPembangunan}
• Lampiran Foto Lahan: ${formData.fotoLahanName ? formData.fotoLahanName : 'Tidak dilampirkan'}

*CATATAN KHUSUS / KEBUTUHAN*
"${formData.catatan || 'Tidak ada catatan khusus.'}"

Mohon info untuk jadwal survey dan konsultasi akad syariah berikutnya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      onClose();
      setIsSubmitted(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          id="survey-modal"
        >
          {/* Header */}
          <div className="relative bg-charcoal px-6 py-5 text-white">
            <h3 className="font-display text-xl font-semibold tracking-tight text-gold">
              Formulir Survey & Konsultasi Proyek
            </h3>
            <p className="mt-1 text-xs text-gray-300">
              Lengkapi data berikut untuk mendapatkan RAB awal dan jadwal tatap muka/survey langsung.
            </p>
            <button
              onClick={onClose}
              className="absolute right-4 top-5 rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              id="close-modal-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="max-h-[75vh] overflow-y-auto p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold mb-4">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h4 className="font-display text-lg font-semibold text-charcoal">
                  Formulir Berhasil Disimpan!
                </h4>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  Menghubungkan ke WhatsApp Konsultan Syariah Madina Build. Mohon tunggu sebentar...
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Nama */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama"
                      required
                      placeholder="Masukkan nama Anda"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* No WhatsApp */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Kota */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Domisili / Kota <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="kota"
                      required
                      placeholder="Contoh: Jakarta Selatan, Sidoarjo"
                      value={formData.kota}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Jenis Bangunan */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Jenis Bangunan <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="jenisBangunan"
                      value={formData.jenisBangunan}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
                    >
                      <option value="Rumah Baru">Rumah Baru (Premium)</option>
                      <option value="Renovasi Rumah">Renovasi Rumah</option>
                      <option value="Arsitek Rumah Only">Desain Arsitek</option>
                      <option value="Desain Interior Only">Desain Interior</option>
                      <option value="Villa">Villa / Resort</option>
                      <option value="Rumah 2 Lantai">Rumah 2 Lantai</option>
                      <option value="Rumah 3 Lantai">Rumah 3 Lantai</option>
                      <option value="Ruko / Komersial">Ruko / Komersial</option>
                    </select>
                  </div>

                  {/* Luas Bangunan */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Estimasi Luas Bangunan (m²) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="luasBangunan"
                      required
                      placeholder="Contoh: 150"
                      value={formData.luasBangunan}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Rencana Budget */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Rencana Budget Pembangunan <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
                    >
                      <option value="">-- Pilih Rentang Budget --</option>
                      <option value="Di bawah Rp 100 Juta">Di bawah Rp 100 Juta</option>
                      <option value="Rp 100 Juta - Rp 500 Juta">Rp 100 Juta - Rp 500 Juta</option>
                      <option value="Rp 500 Juta - Rp 1 Miliar">Rp 500 Juta - Rp 1 Miliar</option>
                      <option value="Rp 1 Miliar - Rp 3 Miliar">Rp 1 Miliar - Rp 3 Miliar</option>
                      <option value="Di atas Rp 3 Miliar">Di atas Rp 3 Miliar</option>
                    </select>
                  </div>

                  {/* Target Pembangunan */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Target Pembangunan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="targetPembangunan"
                      required
                      placeholder="Contoh: Secepatnya / Kuartal 3 2026 / Tahun Depan"
                      value={formData.targetPembangunan}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                {/* Upload Foto Lahan - Drag & Drop */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Upload Foto Lahan / Lokasi (Opsional)
                  </label>
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={handleButtonClick}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all ${
                      dragActive
                        ? 'border-gold bg-gold/5'
                        : 'border-gray-200 bg-gray-50 hover:border-gold hover:bg-gold/5'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      className="hidden"
                      accept="image/*"
                    />
                    {formData.fotoLahanName ? (
                      <div className="flex items-center space-x-2 text-gold">
                        <FileText className="h-8 w-8" />
                        <div className="text-left">
                          <p className="text-sm font-semibold truncate max-w-xs">
                            {formData.fotoLahanName}
                          </p>
                          <p className="text-xs text-gray-400">File siap dikirimkan</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-xs font-medium text-gray-700">
                          Klik untuk pilih atau seret gambar lahan Anda di sini
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          PNG, JPG, JPEG (Maks. 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Catatan */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Catatan Khusus / Kebutuhan Tambahan (Opsional)
                  </label>
                  <textarea
                    name="catatan"
                    rows={3}
                    placeholder="Contoh: Ingin konsep fasad Neo Klasik dengan kolam renang tropis di bagian belakang..."
                    value={formData.catatan}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end space-x-3 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 rounded-lg bg-gold hover:bg-gold-hover px-5 py-2.5 text-xs font-medium text-white shadow-md shadow-gold/20 transition-all active:scale-[0.98]"
                    id="submit-survey-btn"
                  >
                    <span>Lanjut ke WhatsApp</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
