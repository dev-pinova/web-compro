"use client";

import { motion } from "framer-motion";
import { PaintBucket, CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

const features = [
  { title: "Perencanaan Ruang (Space Planning)", desc: "Optimalkan fungsionalitas setiap meter persegi untuk kenyamanan dan alur aktivitas yang efisien." },
  { title: "Desain Furnitur Kustom (Bespoke)", desc: "Ciptakan furnitur unik yang dirancang khusus sesuai dimensi ruangan dan karakter personal Anda." },
  { title: "Kurasi Material & Tekstur", desc: "Pemilihan material premium yang harmonis — mulai dari lantai hingga finishing dinding yang tahan lama." },
  { title: "Tata Cahaya (Lighting Design)", desc: "Sistem pencahayaan yang dramatis dan fungsional untuk menciptakan suasana yang tepat di setiap momen." },
  { title: "Fit-out & Interior Construction", desc: "Eksekusi fisik dengan standar presisi tinggi oleh pengrajin ahli untuk hasil akhir yang mewah." },
  { title: "Integrasi Rumah Pintar", desc: "Opsi integrasi teknologi smart home untuk kemudahan kontrol pencahayaan, suhu, dan keamanan." },
];

const faqs = [
  { q: "Apakah layanan ini mencakup pengerjaan fisiknya?", a: "Ya, layanan kami bersifat build-to-design, mencakup proses perencanaan hingga eksekusi fisik (fit-out) secara menyeluruh." },
  { q: "Berapa lama proses desain dan pengerjaan?", a: "Proses desain biasanya memakan waktu 2–4 minggu, sementara pengerjaan fisik berkisar antara 4–10 minggu tergantung luas dan detailnya." },
  { q: "Bisa saya memilih gaya desain tertentu?", a: "Tentu. Tim kami berpengalaman menangani berbagai gaya mulai dari Modern Minimalis, Klasik Kontemporer, hingga Industrial dan Japandi." },
];

export default function InteriorPage() {
  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Desain Interior"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-gold transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Layanan
          </Link>
          <div className="inline-flex items-center gap-3 bg-secondary-dark border border-primary-gold/30 px-4 py-2 rounded-full mb-5">
            <PaintBucket className="w-5 h-5 text-primary-gold" />
            <span className="text-primary-gold text-sm font-semibold tracking-wider uppercase">Layanan Kami</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Interior Desain</h1>
          <p className="text-lg text-gray-300 max-w-2xl">Ciptakan ruang dalam yang memanjakan indra — di mana setiap detail dipilih untuk menyampaikan karakter unik Anda.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4">Tentang Layanan Ini</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Desain interior yang baik lebih dari sekadar estetika — ini tentang menciptakan ruang yang bekerja dengan sempurna untuk kehidupan sehari-hari Anda. Tim desainer kami mendengarkan setiap cerita, kebutuhan, dan impian sebelum menuangkannya ke dalam konsep yang utuh.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Dari konsep awal hingga pengerjaan akhir, kami mengelola seluruh proses interior Anda — memastikan setiap sudut ruangan memancarkan kenyamanan dan keindahan yang konsisten.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-white mb-6">Yang Kami Tawarkan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-xl bg-secondary-dark border border-secondary-dark hover:border-primary-gold/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">{f.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-white mb-6">Pertanyaan Umum</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-xl bg-secondary-dark border border-secondary-dark">
                    <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-primary-gold/20 bg-secondary-dark p-7">
                <h3 className="text-xl font-bold text-white mb-3">Tertarik dengan Layanan Ini?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Ceritakan visi interior impian Anda kepada kami — konsultasi pertama gratis.</p>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-primary-gold text-surface font-bold px-6 py-3 rounded-lg hover:bg-accent-gold transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-3">
                  Konsultasi Sekarang
                </Link>
                <a
                  href="https://wa.me/6285100930009?text=Halo%20Anugrah Jaya Desain%2C%20saya%20ingin%20konsultasi%20layanan%20Desain%20Interior"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat via WhatsApp
                </a>
              </div>

              <div className="rounded-2xl border border-secondary-dark bg-secondary-dark p-7">
                <h3 className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-4">Layanan Lainnya</h3>
                <ul className="space-y-3">
                  <li><Link href="/services/bangun-rumah" className="text-gray-300 hover:text-primary-gold transition-colors">→ Bangun Rumah</Link></li>
                  <li><Link href="/services/desain-rumah" className="text-gray-300 hover:text-primary-gold transition-colors">→ Desain Rumah</Link></li>
                  <li><Link href="/services/renovasi-rumah" className="text-gray-300 hover:text-primary-gold transition-colors">→ Renovasi Rumah</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
