"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Dengarkan & Pahami",
    desc: "Setiap proyek dimulai dengan sesi konsultasi mendalam untuk memahami visi, kebutuhan fungsional, preferensi estetika, dan anggaran klien secara menyeluruh.",
  },
  {
    num: "02",
    title: "Riset & Analisis Tapak",
    desc: "Kami mempelajari konteks lingkungan, orientasi matahari, angin, view, dan regulasi setempat sebelum membuat satu garis pun di atas kertas.",
  },
  {
    num: "03",
    title: "Desain Konsep & Iterasi",
    desc: "Menghadirkan beberapa alternatif konsep yang kemudian direfinasi bersama klien dalam proses kolaboratif hingga tercapai desain yang paling resonan.",
  },
  {
    num: "04",
    title: "Pengembangan & Dokumentasi",
    desc: "Konsep terpilih dikembangkan menjadi gambar teknis lengkap (DED), termasuk struktur, MEP, dan material finishing yang terperinci.",
  },
  {
    num: "05",
    title: "Eksekusi & Pengawasan",
    desc: "Tim arsitek dan insinyur kami terlibat langsung di lapangan selama proses konstruksi untuk memastikan kesesuaian antara gambar kerja dan realisasi fisik.",
  },
  {
    num: "06",
    title: "Serah Terima & After-Care",
    desc: "Proyek diserahterimakan dengan dokumentasi lengkap, panduan perawatan, dan jaminan garansi struktur serta layanan purna jual yang responsif.",
  },
];

const principles = [
  "Desain berakar dari konteks & identitas pengguna",
  "Fungsi dan estetika berjalan beriringan — tidak ada kompromi",
  "Keberlanjutan (sustainability) diintegrasikan dari tahap awal",
  "Material lokal berkualitas diprioritaskan",
  "Proses transparan dengan dokumentasi yang sistematis",
  "Hubungan jangka panjang — bukan sekedar satu transaksi",
];

export default function ApproachPage() {
  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Header */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Pendekatan Desain"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Metode Kami</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">Pendekatan Desain</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-gray-400 text-xl leading-relaxed">
          Di Anugrah Jaya Desain, desain bukan sekadar membuat sesuatu terlihat indah. Desain adalah proses terstruktur untuk memecahkan masalah nyata, memenuhi kebutuhan hidup, dan menciptakan ruang yang bermakna bagi penghuninya.
        </motion.p>
      </section>

      {/* 6-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-3 text-center">Proses Kami</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">6 Tahap Perjalanan Proyek</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-8 rounded-2xl bg-secondary-dark border border-white/5 hover:border-primary-gold/20 transition-colors group"
            >
              <p className="text-6xl font-bold text-primary-gold/15 group-hover:text-primary-gold/25 transition-colors mb-4 leading-none">{step.num}</p>
              <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section className="bg-secondary-dark py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-3 text-center">Nilai Kami</p>
          <h2 className="text-3xl font-bold text-white mb-14 text-center">Prinsip Desain</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-5 rounded-xl bg-surface border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-primary-gold shrink-0" />
                <p className="text-gray-300 text-sm">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
