"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const projectTypes = ["Rumah Tinggal Baru", "Renovasi Rumah", "Desain Interior", "Properti Komersial", "Developer / Kavling", "Lainnya"];
const budgetRanges = ["< Rp 500 Juta", "Rp 500 Juta – 1 Miliar", "Rp 1 – 2 Miliar", "Rp 2 – 5 Miliar", "> Rp 5 Miliar", "Belum ditentukan"];
const designStyles = ["Modern Minimalis", "Skandinavia", "Industrial", "Japandi", "Tropis Kontemporer", "Klasik / Neo-Klasik"];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Anti-Spam (Captcha)
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, result: 0 });
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ a, b, result: a + b });
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Address Data States
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Initial Fetch Provinces
  useEffect(() => {
    const controller = new AbortController();
    const fetchProvinces = async () => {
      try {
        const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json", { signal: controller.signal });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProvinces(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch provinces", err);
          setError("Gagal mengambil data wilayah. Silakan periksa koneksi internet Anda.");
        }
      }
    };
    fetchProvinces();
    return () => controller.abort();
  }, []);

  // Fetch Cities
  useEffect(() => {
    if (!selectedProvince) {
      setCities([]);
      return;
    }
    const controller = new AbortController();
    const fetchCities = async () => {
      try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`, { signal: controller.signal });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setCities(data);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Failed to fetch cities", err);
      }
    };
    fetchCities();
    return () => controller.abort();
  }, [selectedProvince]);

  // Fetch Districts
  useEffect(() => {
    if (!selectedCity) {
      setDistricts([]);
      return;
    }
    const controller = new AbortController();
    const fetchDistricts = async () => {
      try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCity}.json`, { signal: controller.signal });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setDistricts(data);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Failed to fetch districts", err);
      }
    };
    fetchDistricts();
    return () => controller.abort();
  }, [selectedCity]);

  // Fetch Villages
  useEffect(() => {
    if (!selectedDistrict) {
      setVillages([]);
      return;
    }
    const controller = new AbortController();
    const fetchVillages = async () => {
      try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`, { signal: controller.signal });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setVillages(data);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Failed to fetch villages", err);
      }
    };
    fetchVillages();
    return () => controller.abort();
  }, [selectedDistrict]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    // 1. Honeypot check (hidden field)
    if (formData.get("website_url")) {
      console.warn("Spam detected via honeypot");
      return; 
    }

    // 2. Captcha check
    if (parseInt(captchaInput) !== captcha.result) {
      setError("Jawaban keamanan salah. Silakan coba lagi.");
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);
    
    // Get labels instead of IDs for the location
    const getLabel = (list: any[], id: any) => list.find(item => item.id === id)?.name || "";
    const provinceName = getLabel(provinces, formData.get("province"));
    const cityName = getLabel(cities, formData.get("city"));
    const districtName = getLabel(districts, formData.get("district"));
    const villageName = getLabel(villages, formData.get("village"));
    
    const fullLocation = [villageName, districtName, cityName, provinceName].filter(Boolean).join(", ");

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      serviceType: formData.get("serviceType"),
      budget: formData.get("budget"),
      location: fullLocation,
      designStyle: formData.getAll("designStyle"),
      message: formData.get("message"),
      website_url: formData.get("website_url"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(result.details ? `${result.error} (${result.details})` : (result.error || "Terjadi kesalahan saat mengirim pesan."));
      }
    } catch (err) {
      setError("Koneksi gagal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Header */}
      <section className="bg-secondary-dark py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
            Hubungi Kami
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl font-bold text-white mb-5">
            Mari Berbicara
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-xl mx-auto">
            Konsultasi pertama gratis. Ceritakan rencana proyek Anda dan tim kami akan menghubungi dalam 1×24 jam.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* LEFT — Info & Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-white/10">Informasi Kontak</h2>
              <div className="space-y-6">
                {[
                  { icon: <MapPin className="w-5 h-5 text-primary-gold" />, label: "Kantor Pusat", value: "Jl. Adi Sucipto No.154\nKelurahan Jajar, Kecamatan Laweyan, Surakarta 57144" },
                  { icon: <Phone className="w-5 h-5 text-primary-gold" />, label: "Telepon & WhatsApp", value: "+62 851-0093-0009" },
                  { icon: <Mail className="w-5 h-5 text-primary-gold" />, label: "Email", value: "tonygroup8111@gmail.com" },
                  { icon: <Clock className="w-5 h-5 text-primary-gold" />, label: "Jam Kerja", value: "Senin–Jumat: 08.00–17.00 WIB\nSabtu: 09.00–14.00 WIB" },
                ].map((c, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-0.5 p-2.5 bg-secondary-dark border border-white/5 rounded-xl shrink-0">{c.icon}</div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{c.label}</p>
                      <p className="text-gray-300 text-sm whitespace-pre-line">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WA quick action */}
            <a href="https://wa.me/6285100930009?text=Halo%20Anugrah Jaya Desain%2C%20saya%20ingin%20konsultasi%20proyek" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-700/20 border border-green-600/30 text-green-400 px-5 py-4 rounded-2xl hover:bg-green-700/30 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <div>
                <p className="font-semibold text-sm">Chat Langsung via WhatsApp</p>
                <p className="text-xs text-green-600">Respons biasanya &lt; 30 menit di jam kerja</p>
              </div>
            </a>

            {/* Maps */}
            <div className="rounded-2xl overflow-hidden border border-white/5 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15816.143242702213!2d110.7850821!3d-7.5562143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16709bb38b97%3A0xc3af811acb5deded!2sJajar%2C%20Laweyan%2C%20Surakarta%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.1)" }}
                allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi Anugrah Jaya Desain"
              />
            </div>
          </motion.div>

          {/* RIGHT — Inquiry Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-3">
            <div className="bg-secondary-dark rounded-3xl border border-white/5 p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <h2 className="text-2xl font-bold text-white mb-1">Formulir Inquiry</h2>
              <p className="text-gray-500 text-sm mb-8">Isi detail proyek Anda agar kami dapat memberikan respons yang lebih relevan.</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {success && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
                    Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.
                  </div>
                )}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama Lengkap *</label>
                    <Input id="name" name="name" autoComplete="name" placeholder="John Doe" className="h-11 bg-surface border-white/10 focus-visible:ring-primary-gold text-white placeholder:text-gray-700" required />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email *</label>
                    <Input id="email" name="email" type="email" autoComplete="email" placeholder="john@email.com" className="h-11 bg-surface border-white/10 focus-visible:ring-primary-gold text-white placeholder:text-gray-700" required />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nomor Telepon / WhatsApp *</label>
                  <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+62 812..." className="h-11 bg-surface border-white/10 focus-visible:ring-primary-gold text-white placeholder:text-gray-700" required />
                </div>

                {/* Project Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Jenis Proyek *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypes.map((t, i) => (
                      <label key={t} htmlFor={`project-${i}`} className="flex items-center gap-2 cursor-pointer group">
                        <input id={`project-${i}`} type="radio" name="projectType" value={t} className="accent-[#D4AF37] w-4 h-4" required />
                        <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Lingkup Layanan *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Desain Arsitektur Saja", 
                      "Bangun Baru (Design & Build)", 
                      "Renovasi Total / Parsial", 
                      "Interior & Furniture", 
                      "Layanan Lengkap (Arsitektur + Sipil + Interior)"
                    ].map((s, i) => (
                      <label key={s} htmlFor={`service-${i}`} className="flex items-center gap-2 cursor-pointer group p-3 bg-surface/50 border border-white/5 rounded-xl hover:border-primary-gold/30 transition-all">
                        <input id={`service-${i}`} type="radio" name="serviceType" value={s} className="accent-[#D4AF37] w-4 h-4" required />
                        <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget + Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Estimasi Anggaran</label>
                    <select id="budget" name="budget" className="flex h-11 w-full rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-primary-gold">
                      <option value="">Pilih range anggaran...</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="province" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Provinsi *</label>
                    <select
                      id="province"
                      name="province"
                      required
                      className="flex h-11 w-full rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-primary-gold"
                      onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setSelectedCity("");
                        setSelectedDistrict("");
                        setCities([]);
                        setDistricts([]);
                        setVillages([]);
                      }}
                    >
                      <option value="">{provinces.length === 0 ? "Memuat Provinsi..." : "Pilih Provinsi..."}</option>
                      {provinces.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="city" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kota / Kabupaten *</label>
                    <select
                      id="city"
                      name="city"
                      required
                      className="flex h-11 w-full rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-primary-gold disabled:opacity-50"
                      disabled={!selectedProvince}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        setSelectedDistrict("");
                        setDistricts([]);
                        setVillages([]);
                      }}
                    >
                      <option value="">{selectedProvince && cities.length === 0 ? "Memuat Kota..." : "Pilih Kota..."}</option>
                      {cities.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="district" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kecamatan *</label>
                    <select
                      id="district"
                      name="district"
                      required
                      className="flex h-11 w-full rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-primary-gold disabled:opacity-50"
                      disabled={!selectedCity}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setVillages([]);
                      }}
                    >
                      <option value="">{selectedCity && districts.length === 0 ? "Memuat Kecamatan..." : "Pilih Kecamatan..."}</option>
                      {districts.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="village" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kelurahan / Desa *</label>
                  <select
                    id="village"
                    name="village"
                    required
                    className="flex h-11 w-full rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-primary-gold disabled:opacity-50"
                    disabled={!selectedDistrict}
                  >
                    <option value="">{selectedDistrict && villages.length === 0 ? "Memuat Kelurahan..." : "Pilih Kelurahan..."}</option>
                    {villages.map((v: any) => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </div>

                {/* Design Style */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gaya Desain Favorit (bisa pilih lebih dari satu)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {designStyles.map((s, i) => (
                      <label key={s} htmlFor={`style-${i}`} className="flex items-center gap-2 cursor-pointer group">
                        <input id={`style-${i}`} type="checkbox" name="designStyle" value={s} className="accent-[#D4AF37] w-4 h-4 rounded" />
                        <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ceritakan Proyek Anda</label>
                  <Textarea id="message" name="message" placeholder="Deskripsikan visi, kondisi lahan, kebutuhan khusus, atau pertanyaan Anda..." className="min-h-[130px] bg-surface border-white/10 focus-visible:ring-primary-gold text-white placeholder:text-gray-700 resize-y" />
                </div>

                {/* Security / Captcha */}
                <div className="bg-surface/50 p-6 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <label htmlFor="captcha" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verifikasi Keamanan *</label>
                      <p className="text-sm text-gray-300 font-medium">Berapakah {captcha.a} + {captcha.b} ?</p>
                    </div>
                    <Input 
                      id="captcha"
                      name="captcha_input"
                      type="number" 
                      placeholder="Jawaban" 
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-full sm:w-32 bg-surface border-white/10 focus-visible:ring-primary-gold"
                      required 
                    />
                  </div>
                </div>

                {/* Honeypot (Spam Protection) - Do not remove or style to be visible */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="website_url">Website URL</label>
                  <input id="website_url" type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base font-bold bg-primary-gold hover:bg-accent-gold text-surface rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all disabled:opacity-50">
                  <Send className="w-4 h-4" /> {isSubmitting ? "Mengirim..." : "Kirim Inquiry Sekarang"}
                </Button>
                <p className="text-xs text-center text-gray-600">Data Anda aman dan tidak akan disebarluaskan kepada pihak ketiga.</p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
