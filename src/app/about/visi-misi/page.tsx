"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, ShieldCheck, HeartHandshake, Eye, Flag, Award, Clock4, Users, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const values = [
  { icon: <ShieldCheck className="w-8 h-8 text-primary-gold" />, title: "Integritas & Kualitas", desc: "Berkomitmen pada standar tertinggi dengan transparansi mutlak kepada klien." },
  { icon: <Lightbulb className="w-8 h-8 text-primary-gold" />, title: "Inovasi Desain", desc: "Menciptakan nilai tambah melalui estetika modern tanpa melupakan fungsionalitas." },
  { icon: <Target className="w-8 h-8 text-primary-gold" />, title: "Tepat Waktu", desc: "Manajemen proyek yang disiplin untuk memastikan ketepatan waktu penyelesaian." },
  { icon: <HeartHandshake className="w-8 h-8 text-primary-gold" />, title: "Berpusat pada Klien", desc: "Mendengarkan dan menerjemahkan impian Anda menjadi kenyataan yang presisi." }
];

const milestones = [
  { year: "2011", event: "Anugrah Jaya Desain didirikan di Surakarta oleh Toni Anugrah dengan misi menghadirkan arsitektur berkualitas untuk klien individu." },
  { year: "2015", event: "Ekspansi layanan ke Desain Interior, mengerjakan proyek perdana di kawasan premium Solo Baru." },
  { year: "2018", event: "Membuka divisi Konstruksi Sipil dan Renovasi, merampungkan berbagai proyek residensial di Surakarta dan Solo Raya." },
  { year: "2023", event: "Melewati tonggak 150 proyek selesai, dengan kepercayaan klien dari berbagai wilayah di Indonesia." },
];

export default function VisiMisiPage() {
  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Visi & Misi"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Tentang Kami</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Visi & Misi</h1>
          <p className="text-lg text-gray-300 max-w-2xl">Membangun fondasi kepercayaan melalui arah dan tujuan perusahaan yang jelas untuk masa depan yang lebih baik.</p>
        </div>
      </section>

      {/* Visi & Misi Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="bg-secondary-dark border border-white/5 p-10 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:transform group-hover:scale-110 transition-transform duration-500">
              <Eye className="w-48 h-48 text-white" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface mb-8 border border-primary-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <Eye className="w-8 h-8 text-primary-gold" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Visi Kami</h2>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                "Menjadi perusahaan arsitektur dan konstruksi terdepan di Indonesia yang dikenal karena keunggulan desain kreatif, inovasi berkelanjutan, serta komitmen tak tergoyahkan terhadap kualitas."
              </p>
            </div>
          </motion.div>

          {/* Misi */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="bg-secondary-dark border border-white/5 p-10 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:transform group-hover:scale-110 transition-transform duration-500">
              <Flag className="w-48 h-48 text-white" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface mb-8 border border-primary-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <Flag className="w-8 h-8 text-primary-gold" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Misi Kami</h2>
              <ul className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary-gold font-bold">•</span>
                  Memberikan solusi desain yang memadukan keindahan, fungsionalitas, dan efisiensi ruang.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-gold font-bold">•</span>
                  Mengeksekusi setiap proyek dengan standar konstruksi tertinggi dan manajemen teliti.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-gold font-bold">•</span>
                  Membangun kemitraan jangka panjang dengan klien melalui transparansi serta integritas.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats & Brief Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Membangun dengan Integritas Sejak 2011</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Anugrah Jaya Desain hadir untuk menjembatani kesenjangan antara kualitas desain arsitektur premium dan keterjangkauan — memastikan setiap klien bisa memiliki hunian yang dirancang dengan serius dan dibangun dengan tanggung jawab penuh.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "150+", l: "Proyek Selesai", icon: <Award /> },
                { v: "13+", l: "Tahun Pengalaman", icon: <Clock4 /> },
                { v: "98%", l: "Kepuasan Klien", icon: <CheckCircle2 /> },
                { v: "40+", l: "Tim Profesional", icon: <Users /> },
              ].map((s, i) => (
                <div key={i} className="bg-secondary-dark rounded-2xl p-6 border border-white/5 text-center transition-transform hover:scale-105">
                  <p className="text-3xl font-bold text-primary-gold mb-1">{s.v}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square"
          >
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Studio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Nilai-nilai Inti */}
      <section className="bg-secondary-dark py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Core Values</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Nilai Pegangan Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary-gold/25 hover:shadow-[0_8px_30px_rgba(212,175,55,0.06)] transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary-dark mb-6">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Journey */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 text-center">Dari Kota Surakarta</p>
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Milestones Perjalanan</h2>
          <div className="relative border-l border-primary-gold/20 ml-4 md:ml-0">
            {milestones.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mb-12 ml-8 relative"
              >
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] border-4 border-surface" />
                <span className="text-primary-gold font-bold text-sm bg-primary-gold/10 px-3 py-1 rounded-full mb-3 inline-block">{m.year}</span>
                <p className="text-gray-300 text-lg leading-relaxed">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
