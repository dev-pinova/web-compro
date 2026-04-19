import Link from "next/link";
import { MapPin, Mail, Phone, ArrowRight, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Footer({ settings }: { settings?: any }) {
  const data = settings || {
    siteName: "Anugrah Jaya Desain",
    email: "tonygroup8111@gmail.com",
    phone: "+62 851-0093-0009",
    address: "Jl. Adi Sucipto No.154, Kelurahan Jajar, Kecamatan Laweyan, Surakarta 57144",
  };

  const socialLinks = [
    { icon: "/icons/instagram.svg", href: settings?.instagram, label: "Instagram" },
    { icon: "/icons/facebook.svg", href: settings?.facebook, label: "Facebook" },
    { icon: "/icons/youtube.svg", href: settings?.youtube, label: "YouTube" },
    { icon: "/icons/linkedin.svg", href: settings?.linkedin, label: "LinkedIn" },
    { icon: "/icons/tiktok.svg", href: settings?.tiktok, label: "TikTok" },
  ].filter(link => link.href);

  return (
    <footer className="bg-[#0A0B0C] text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/logo-anugrah.png" 
                alt="Anugrah Jaya Desain" 
                width={160} 
                height={45} 
                className="h-10 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 mb-6">
              Biro arsitektur & kontraktor bangunan profesional. Mewujudkan properti impian dengan desain cermat dan konstruksi bergaransi.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary-dark border border-white/5 flex items-center justify-center transition-all duration-300 opacity-40 hover:opacity-100 hover:border-white/20 hover:scale-110 group"
                  title={social.label}
                >
                  <img src={social.icon} alt={social.label} className="w-5 h-5 object-contain brightness-125" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-5">Layanan</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/services/bangun-rumah" className="hover:text-primary-gold transition-colors flex items-center gap-1 group">Bangun Rumah</Link></li>
                <li><Link href="/services/renovasi-rumah" className="hover:text-primary-gold transition-colors flex items-center gap-1 group">Renovasi Rumah</Link></li>
                <li><Link href="/services/interior" className="hover:text-primary-gold transition-colors flex items-center gap-1 group">Interior & Design</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-5">Tentang Kami</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about/visi-misi" className="hover:text-primary-gold transition-colors">Visi Misi</Link></li>
                <li><Link href="/about/kata-mereka" className="hover:text-primary-gold transition-colors">Kata Mereka</Link></li>
                <li><Link href="/contact" className="hover:text-primary-gold transition-colors">Kontak</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3 — Contact Info + CTA */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-5">Kontak</h3>
            <ul className="space-y-4 text-sm mb-7">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-primary-gold shrink-0 mt-0.5" />
                <span className="text-gray-500 leading-relaxed">{data.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-primary-gold shrink-0" />
                <span>{data.phone}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-primary-gold shrink-0" />
                <span>{data.email}</span>
              </li>
            </ul>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-primary-gold/40 text-primary-gold px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-gold hover:text-surface transition-all group">
              Konsultasi Gratis <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {data.siteName}. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Syarat & Ketentuan</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
