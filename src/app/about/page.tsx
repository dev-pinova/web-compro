"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {

  const milestones = [
    { year: "2011", event: "Anugrah Jaya Desain didirikan di Surakarta oleh Toni Anugrah dengan misi menghadirkan arsitektur berkualitas untuk klien individu." },
    { year: "2015", event: "Ekspansi layanan ke Desain Interior, mengerjakan proyek perdana di kawasan premium Pondok Indah." },
    { year: "2018", event: "Membuka divisi Konstruksi Sipil dan Developer, merampungkan proyek cluster perdana di Serpong." },
    { year: "2023", event: "Melewati tonggak 150 proyek selesai, dengan kepercayaan klien dari Sabang hingga Papua." },
  ];

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Header */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Studio Anugrah Jaya Desain"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Anugrah Jaya Desain Studio</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">Profil Studio</h1>
        </div>
      </section>

      {/* About Text */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tentang Anugrah Jaya Desain</h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              Anugrah Jaya Desain adalah biro arsitek dan kontraktor bangunan yang berbasis di Jakarta. Didirikan pada 2011, kami hadir untuk menjembatani kesenjangan antara kualitas desain arsitektur premium dan keterjangkauan — memastikan setiap klien perorangan bisa memiliki hunian yang dirancang dengan serius dan dibangun dengan integritas.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Kami menjalankan pendekatan <strong className="text-white">One Service</strong> — satu tim untuk satu proyek, dari awal hingga akhir. Klien tidak perlu berkoordinasi dengan berbagai pihak yang berbeda: arsitek, kontraktor, dan desainer interior kami bekerja dalam satu ekosistem yang sinergis.
            </p>
            <Link href="/about/approach" className="inline-flex items-center gap-2 text-primary-gold text-sm font-semibold border-b border-primary-gold/30 pb-0.5 hover:border-primary-gold transition-colors group">
              Pendekatan Desain Kami <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {[
              { v: "150+", l: "Proyek Selesai" },
              { v: "13+", l: "Tahun Berpengalaman" },
              { v: "98%", l: "Kepuasan Klien" },
              { v: "40+", l: "Tim Profesional" },
            ].map((s, i) => (
              <div key={i} className="bg-secondary-dark rounded-2xl p-7 border border-white/5 hover:border-primary-gold/20 transition-colors text-center">
                <p className="text-4xl font-bold text-primary-gold mb-1">{s.v}</p>
                <p className="text-gray-400 text-sm">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary-dark py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-3 text-center">Perjalanan Kami</p>
          <h2 className="text-3xl font-bold text-white mb-14 text-center">Sejarah Singkat</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary-gold/20" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-8 items-start">
                  <div className="relative flex-shrink-0 w-16">
                    <div className="w-4 h-4 rounded-full bg-primary-gold shadow-[0_0_12px_rgba(212,175,55,0.5)] mt-1 ml-6" />
                  </div>
                  <div className="pb-4">
                    <span className="text-primary-gold font-bold text-sm">{m.year}</span>
                    <p className="text-gray-400 leading-relaxed mt-1">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
