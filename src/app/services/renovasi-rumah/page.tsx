"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

const features = [
  { title: "Transformasi Fasad Modern", desc: "Ubah tampilan luar bangunan Anda menjadi lebih kontemporer dan menarik secara visual." },
  { title: "Penambahan Lantai & Ruang", desc: "Solusi penambahan kapasitas hunian melalui pengembangan vertikal atau horizontal yang aman." },
  { title: "Perbaikan Struktur Menyeluruh", desc: "Identifikasi dan perbaikan kerusakan struktural seperti retak rambut, penurunan pondasi, atau kerusakan atap." },
  { title: "Optimalisasi Fungsi Ruang", desc: "Penataan ulang layout interior untuk memaksimalkan sirkulasi dan kegunaan setiap ruangan yang ada." },
  { title: "Pembaruan Instalasi ME", desc: "Modernisasi sistem kelistrikan dan plumbing untuk efisiensi energi dan keamanan hunian yang lebih baik." },
  { title: "Renovasi Estetis (Face-lift)", desc: "Pembaruan material finishing seperti lantai, cat, dan plafon untuk suasana rumah yang segar kembali." },
];

const faqs = [
  { q: "Apakah saya perlu pindah rumah saat renovasi?", a: "Tergantung skala proyeknya. Untuk renovasi sebagian, kami dapat mengatur area kerja agar Anda tetap bisa tinggal dengan gangguan minimal." },
  { q: "Bagaimana cara menghitung biaya renovasi?", a: "Tim kami akan melakukan survei lapangan terlebih dahulu untuk menilai kondisi existing sebelum mengeluarkan penawaran harga yang akurat." },
  { q: "Apakah renovasi kecil juga dilayani?", a: "Ya, kami melayani berbagai skala renovasi mulai dari pembaruan satu ruangan hingga renovasi total satu bangunan." },
];

export default function RenovasiRumahPage() {
  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Renovasi Rumah"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-gold transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Layanan
          </Link>
          <div className="inline-flex items-center gap-3 bg-secondary-dark border border-primary-gold/30 px-4 py-2 rounded-full mb-5">
            <Building2 className="w-5 h-5 text-primary-gold" />
            <span className="text-primary-gold text-sm font-semibold tracking-wider uppercase">Layanan Kami</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Renovasi Rumah</h1>
          <p className="text-lg text-gray-300 max-w-2xl">Memberikan kehidupan baru pada properti Anda melalui perubahan yang cerdas, estetis, dan meningkatkan nilai investasi.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4">Tentang Layanan Ini</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Rumah lama memiliki memori, namun terkadang tidak lagi memenuhi kebutuhan gaya hidup modern. Renovasi adalah solusi tepat untuk mendapatkan nuansa rumah baru tanpa harus berpindah lokasi.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Di Anugrah Jaya Desain, kami memperlakukan renovasi dengan ketelitian yang sama seperti membangun baru. Kami menganalisa struktur yang ada dengan cermat untuk memastikan setiap perubahan yang dilakukan tetap aman dan tahan lama.
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
                <h3 className="text-xl font-bold text-white mb-3">Siap Merenovasi Rumah?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Jadwalkan survei ke lokasi Anda untuk mendapatkan estimasi pengerjaan renovasi.</p>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-primary-gold text-surface font-bold px-6 py-3 rounded-lg hover:bg-accent-gold transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-3">
                  Hubungi Kami
                </Link>
                <a
                  href="https://wa.me/6285100930009?text=Halo%20Anugrah Jaya Desain%2C%20saya%20ingin%20konsultasi%20layanan%20Renovasi%20Rumah"
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
                  <li><Link href="/services/interior" className="text-gray-300 hover:text-primary-gold transition-colors">→ Interior Desain</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
