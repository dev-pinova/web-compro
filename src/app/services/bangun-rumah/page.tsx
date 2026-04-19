"use client";

import { motion } from "framer-motion";
import { HardHat, CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

const features = [
  { title: "Manajemen Proyek Terpadu", desc: "Pengawasan ketat dari awal hingga akhir untuk memastikan kualitas dan jadwal yang tepat." },
  { title: "Transparansi Anggaran (RAB)", desc: "Rincian biaya yang jelas dan jujur sejak awal — tidak ada biaya siluman atau tersembunyi." },
  { title: "Material Standar SNI", desc: "Penggunaan material konstruksi pilihan yang memenuhi standar nasional untuk kekuatan jangka panjang." },
  { title: "Garansi Struktur & Kebocoran", desc: "Kami memberikan jaminan pasca-pembangunan untuk memastikan ketenangan pikiran bagi Anda." },
  { title: "Tenaga Ahli Bersertifikat", desc: "Dikerjakan oleh tim kontraktor dan tukang berpengalaman di bawah pengawasan arsitek & engineer." },
  { title: "Legalitas & Perizinan (IMB)", desc: "Pendampingan penuh dalam pengurusan administrasi dan legalitas bangunan Anda." },
];

const faqs = [
  { q: "Apakah saya bisa membangun dengan anggaran terbatas?", a: "Tentu. Kami akan membantu menyesuaikan spesifikasi material dan desain agar tetap masuk dalam budget tanpa mengorbankan kekuatan struktur." },
  { q: "Berapa lama rata-rata waktu pembangunan satu rumah?", a: "Untuk rumah tinggal standar 1-2 lantai, proses pembangunan biasanya memakan waktu 6 hingga 10 bulan tergantung kompleksitas." },
  { q: "Bagaimana sistem pembayarannya?", a: "Sistem pembayaran dilakukan secara bertahap (termin) sesuai dengan progres fisik pembangunan yang telah dicapai di lapangan." },
];

export default function BangunRumahPage() {
  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Bangun Rumah"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-gold transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Layanan
          </Link>
          <div className="inline-flex items-center gap-3 bg-secondary-dark border border-primary-gold/30 px-4 py-2 rounded-full mb-5">
            <HardHat className="w-5 h-5 text-primary-gold" />
            <span className="text-primary-gold text-sm font-semibold tracking-wider uppercase">Layanan Kami</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Bangun Rumah</h1>
          <p className="text-lg text-gray-300 max-w-2xl">Mewujudkan rumah impian Anda dengan standar konstruksi terbaik dan transparansi penuh sejak peletakan batu pertama.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4">Tentang Layanan Ini</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Membangun rumah adalah investasi seumur hidup. Di Anugrah Jaya Desain, kami memahami bahwa setiap bata yang disusun adalah bagian dari mimpi Anda. Kami hadir untuk meniadakan kekhawatiran Anda akan kontraktor yang tidak bertanggung jawab.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Dengan sistem manajemen proyek yang terintegrasi, kami memastikan setiap tahapan pembangunan berjalan sesuai spesifikasi teknis dan jadwal yang telah disepakati. Kepuasan Anda adalah prioritas tertinggi kami.
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
                <h3 className="text-xl font-bold text-white mb-3">Siap Bangun Rumah Impian?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Mulai konsultasi konstruksi Anda secara gratis sekarang juga.</p>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-primary-gold text-surface font-bold px-6 py-3 rounded-lg hover:bg-accent-gold transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-3">
                  Konsultasi Gratis
                </Link>
                <a
                  href="https://wa.me/6285100930009?text=Halo%20Anugrah Jaya Desain%2C%20saya%20ingin%20konsultasi%20layanan%20Bangun%20Rumah"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat via WhatsApp
                </a>
              </div>

              <div className="rounded-2xl border border-secondary-dark bg-secondary-dark p-7">
                <h3 className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-4">Layanan Lainnya</h3>
                <ul className="space-y-3">
                  <li><Link href="/services/desain-rumah" className="text-gray-300 hover:text-primary-gold transition-colors">→ Desain Rumah</Link></li>
                  <li><Link href="/services/renovasi-rumah" className="text-gray-300 hover:text-primary-gold transition-colors">→ Renovasi Rumah</Link></li>
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
