"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ArrowDown, 
  ShieldCheck, 
  Clock4, 
  Handshake, 
  Award, 
  HardHat, 
  Building2, 
  PaintBucket,
  Star,
  Quote
} from "lucide-react";
import { useRef } from "react";

const servicesOverview = [
  {
    title: "Bangun Rumah",
    desc: "Konstruksi hunian dari nol dengan standar kualitas premium dan manajemen proyek transparan.",
    icon: <HardHat className="w-10 h-10 text-primary-gold" />,
    href: "/services/bangun-rumah",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Renovasi Rumah",
    desc: "Transformasi hunian lama menjadi baru dengan pengerjaan rapi untuk meningkatkan nilai properti.",
    icon: <Building2 className="w-10 h-10 text-primary-gold" />,
    href: "/services/renovasi-rumah",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Interior & Design",
    desc: "Perancangan arsitektur dan interior estetis yang mengedepankan fungsionalitas dan kenyamanan.",
    icon: <PaintBucket className="w-10 h-10 text-primary-gold" />,
    href: "/services/interior",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const promises = [
  { icon: <ShieldCheck className="w-7 h-7 text-primary-gold" />, title: "Kualitas Bergaransi", desc: "Struktur bangunan bergaransi 10 tahun dengan material pilihan SNI." },
  { icon: <Clock4 className="w-7 h-7 text-primary-gold" />, title: "Tepat Waktu", desc: "Komitmen penyelesaian proyek sesuai jadwal yang telah disepakati bersama." },
  { icon: <Handshake className="w-7 h-7 text-primary-gold" />, title: "Harga Transparan", desc: "RAB terinci dari awal — tidak ada biaya tersembunyi dalam proses." },
  { icon: <Award className="w-7 h-7 text-primary-gold" />, title: "Tenaga Ahli", desc: "Dikerjakan oleh tim profesional berpengalaman di bidang arsitektur & konstruksi." },
];

const testimonials = [
  {
    name: "Bapak Setiawan",
    role: "Pemilik Rumah di Solo",
    text: "Sangat puas dengan hasil renovasi rumah saya. Komunikasi tim sangat lancar dan pengerjaannya sangat rapi sesuai dengan desain yang disepakati.",
    stars: 5
  },
  {
    name: "Ibu Maya",
    role: "Pemilik Restoran",
    text: "Interior design yang dikerjakan benar-benar mewujudkan konsep yang saya inginkan. Detailnya sangat diperhatikan, dari lighting hingga pilihan furniture.",
    stars: 5
  },
  {
    name: "Bapak Andi",
    role: "Pengusaha",
    text: "Membangun rumah dari nol terasa jauh lebih mudah dengan tim Anugrah Jaya Desain. Laporan progres diberikan secara berkala dan sangat transparan.",
    stars: 5
  }
];

const partners = [
  { name: "Premium Stonework", logo: "/partners/partner2.svg" },
  { name: "Luxury Ceramics", logo: "/partners/partner3.svg" },
  { name: "Modern Lighting", logo: "/partners/partner4.svg" },
  { name: "Sanitary Solutions", logo: "/partners/partner1.svg" },
  { name: "Concrete Masters", logo: "/partners/partner6.svg" },
  { name: "Smart Home Tech", logo: "/partners/partner5.svg" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="relative flex flex-col w-full">

      {/* ═══════════════════════════════════════
          1. HERO — Fullscreen Cinematic
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85"
            alt="Hero Architecture"
            fill
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-surface/65" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-gold text-sm font-bold tracking-[0.3em] uppercase mb-6"
          >
            Anugrah Jaya Desain
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8"
          >
            Wujudkan Hunian<br />
            <span className="text-primary-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">Penuh Anugrah.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Arsitek & Kontraktor berpengalaman yang mendedikasikan keahlian kami untuk membangun properti impian Anda dengan kualitas tanpa kompromi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/portfolio" className="bg-primary-gold text-surface font-bold px-10 py-4 rounded-full hover:bg-accent-gold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 group">
              Eksplorasi Proyek <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="border border-white/20 text-white px-10 py-4 rounded-full hover:bg-white/10 transition-all text-center font-medium">
              Konsultasi Gratis
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-primary-gold" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          2. SEKILAS TENTANG KAMI
      ══════════════════════════════════════ */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Placeholder Studio" 
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
              </div>
              {/* Badge Overlay */}
              <div className="absolute -bottom-6 -right-6 bg-primary-gold p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-surface font-bold text-4xl mb-1">10+</p>
                <p className="text-surface font-medium text-xs tracking-wider uppercase">Tahun Pengalaman</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Sekilas Tentang Kami</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Membangun dengan<br />
                <span className="text-primary-gold">Integritas & Estetika.</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Anugrah Jaya Desain adalah biro arsitektur dan kontraktor yang berpusat di Surakarta, berkomitmen untuk menghadirkan solusi pembangunan yang komprehensif.
                </p>
                <p>
                  Kami memadukan visi artistik dengan presisi teknis. Setiap struktur yang kami bangun bukan sekadar tumpukan material, melainkan sebuah masterpiece yang dirancang untuk bertahan lama dan memberikan kenyamanan bagi penghuninya.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/about" className="inline-flex items-center gap-2 text-primary-gold font-bold hover:gap-3 transition-all group">
                  Kenali Kami Lebih Dekat <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. LAYANAN OVERVIEW
      ══════════════════════════════════════ */}
      <section className="py-24 bg-secondary-dark/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Layanan Utama</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Solusi Terpadu.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesOverview.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/5"
              >
                <Image src={item.image} alt={item.title} fill className="group-hover:scale-110 transition-transform duration-700 brightness-[0.4] object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                  <div className="mb-4 inline-block">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-gold transition-colors">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    {item.desc}
                  </p>
                  <Link href={item.href} className="inline-flex items-center gap-2 text-primary-gold text-sm font-bold uppercase tracking-widest border-b border-primary-gold/0 hover:border-primary-gold transition-all">
                    Lihat Selengkapnya <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. KELEBIHAN (WHY US?)
      ══════════════════════════════════════ */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="max-w-2xl">
              <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Kelebihan Kami</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Mengapa Memilih Anugrah Jaya Desain?</h2>
            </div>
            <p className="text-gray-500 max-w-sm text-lg md:text-right italic">
              "Kami tidak hanya membangun gedung, kami membangun kepercayaan."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promises.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-3xl bg-secondary-dark/50 border border-white/5 hover:border-primary-gold/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-6 group-hover:bg-primary-gold/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. TESTIMONI
      ══════════════════════════════════════ */}
      <section className="py-24 bg-secondary-dark relative overflow-hidden">
        {/* Decorative Quote Mark */}
        <Quote className="absolute top-20 right-20 w-64 h-64 text-white/[0.03] rotate-12" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Apa Kata Mereka</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Kepuasan Klien.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-surface/50 backdrop-blur-sm p-10 rounded-3xl border border-white/5 relative"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary-gold fill-primary-gold" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg italic mb-10 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-primary-gold text-xs font-medium mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. PARTNER
      ══════════════════════════════════════ */}
      <section className="py-20 bg-surface border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-xs font-bold tracking-[0.4em] uppercase mb-12">Building with Professional Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
             {partners.map((p, i) => (
               <img 
                 key={i} 
                 src={p.logo} 
                 alt={p.name} 
                 className="h-10 md:h-14 w-auto object-contain cursor-pointer opacity-30 hover:opacity-100 transition-all duration-500 hover:scale-110 brightness-150" 
               />
             ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. CTA
      ══════════════════════════════════════ */}
      <section className="py-32 bg-secondary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="" fill className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            Siap Mewujudkan<br />
            <span className="text-primary-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">Hunian Impian?</span>
          </motion.h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Konsultasikan ide Anda bersama tim ahli kami. Kami siap memberikan solusi pembangunan terbaik sesuai budget dan keinginan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="bg-primary-gold text-surface font-bold px-12 py-5 rounded-full hover:bg-accent-gold transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] text-base">
              Hubungi Kami Sekarang
            </Link>
            <Link href="/portfolio" className="border border-white/20 text-white px-12 py-5 rounded-full hover:bg-white/10 transition-all text-base font-medium">
              Lihat Hasil Karya
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
