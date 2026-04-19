"use client";

import { motion } from "framer-motion";
import { Compass, PaintBucket, HardHat, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "bangun-rumah",
    href: "/services/bangun-rumah",
    title: "Bangun Rumah",
    icon: <HardHat className="w-12 h-12 text-primary-gold" />,
    description: "Wujudkan hunian ideal Anda dari nol dengan konstruksi berkualitas tinggi. Kami menangani seluruh proses mulai dari pengurusan IMB, manajemen proyek, hingga penyerahan kunci (turnkey project) dengan transparansi anggaran yang jelas.",
    features: ["Konstruksi Kualitas Premium", "Manajemen Proyek Terpadu", "Transparansi Rencana Anggaran (RAB)", "Garansi Struktur & Kebocoran"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "renovasi-rumah",
    href: "/services/renovasi-rumah",
    title: "Renovasi Rumah",
    icon: <Building2 className="w-12 h-12 text-primary-gold" />,
    description: "Berikan nafas baru pada hunian lama Anda. Kami melayani renovasi skala kecil hingga besar, mulai dari pembaruan fasad, penambahan lantai, hingga tata ulang fungsi ruang untuk meningkatkan nilai properti Anda.",
    features: ["Modernisasi Fasad Bangunan", "Penambahan Ruang & Lantai", "Perbaikan Struktur Menyeluruh", "Pengerjaan Rapi & Terencana"],
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "interior-design",
    href: "/services/interior",
    title: "Interior & Design",
    icon: <PaintBucket className="w-12 h-12 text-primary-gold" />,
    description: "Layanan desain arsitektur dan interior terpadu yang menggabungkan estetika modern dengan fungsionalitas optimal. Kami merancang ruang yang beradaptasi dengan gaya hidup Anda, mulai dari denah arsitektur hingga furnitur kustom.",
    features: ["Konsep Arsitektur & Interior", "Visualisasi 3D Photorealistic", "Desain Furnitur Kustom (Bespoke)", "Kurasi Material & Lighting"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-[#0A0B0C] py-20 px-4 sm:px-6 lg:px-8 border-b border-secondary-dark">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Layanan <span className="text-primary-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Terpadu</span> Kami.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Solusi inovatif dari awal perancangan hingga penyelesaian pembangunan fisik. Satu perusahaan untuk semua kebutuhan properti Anda.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={service.id} className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              
              {/* Image half */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl border border-secondary-dark/50 group"
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#0F1113]/20 mix-blend-multiply" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-gold/30 rounded-3xl transition-colors duration-500" />
              </motion.div>

              {/* Content half */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <div className="mb-6 p-4 bg-secondary-dark rounded-2xl inline-block border border-secondary-dark shadow-[0_4px_15px_rgba(0,0,0,0.5)] shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{service.title}</h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {service.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-gold mr-3 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-gold text-surface font-bold hover:bg-accent-gold transition-colors shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                  >
                    Konsultasikan Proyek {service.title}
                  </Link>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-gold/40 text-primary-gold font-medium hover:bg-primary-gold/10 transition-colors"
                  >
                    Pelajari Selengkapnya →
                  </Link>
                </div>
              </motion.div>
            </div>
          )
        })}
      </section>
    </div>
  );
}
