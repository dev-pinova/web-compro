"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const LAYANAN_ITEMS = [
  { href: "/services/bangun-rumah", label: "Bangun Rumah", desc: "Konstruksi berkualitas & tepat waktu" },
  { href: "/services/renovasi-rumah", label: "Renovasi Rumah", desc: "Transformasi ruang jadi lebih bernilai" },
  { href: "/services/interior", label: "Interior & Design", desc: "Desain arsitektur & interior terpadu" },
];

const TENTANG_ITEMS = [
  { href: "/about/visi-misi", label: "Visi Misi", desc: "Arah & tujuan utama kami" },
  { href: "/about/kata-mereka", label: "Kata Mereka", desc: "Pengalaman & ulasan klien" },
  { href: "/contact", label: "Kontak", desc: "Mari diskusikan proyek Anda" },
];

function DropdownMenu({
  label,
  items,
  isActive,
}: {
  label: string;
  items: { href: string; label: string; desc?: string }[];
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative py-2" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 px-1 pt-1 text-sm font-medium transition-colors hover:text-accent-gold border-b-2",
          isActive ? "text-primary-gold border-primary-gold" : "text-gray-400 border-transparent"
        )}
      >
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {/* Wrapper pt-3 ensures no gap exists between button and dropdown, preventing hover glitches */}
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="w-72 bg-[#111215] border border-primary-gold/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Gold top line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
            <div className="p-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col px-4 py-3 rounded-xl hover:bg-primary-gold/10 group transition-colors"
                >
                  <span className="text-sm font-semibold text-white group-hover:text-primary-gold transition-colors">
                    {item.label}
                  </span>
                  {item.desc && (
                    <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors mt-0.5">
                      {item.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isLayananActive = pathname.startsWith("/services");
  const isTentangActive = pathname.startsWith("/about");

  return (
    <nav className="fixed w-full z-50 bg-surface/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-anugrah.png" 
              alt="Anugrah Jaya Desain" 
              width={180} 
              height={50} 
              className="h-12 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-7">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent-gold border-b-2 pb-0.5",
                pathname === "/" ? "text-primary-gold border-primary-gold" : "text-gray-400 border-transparent"
              )}
            >
              Beranda
            </Link>

            <DropdownMenu label="Layanan" items={LAYANAN_ITEMS} isActive={isLayananActive} />
            <DropdownMenu label="Tentang Kami" items={TENTANG_ITEMS} isActive={isTentangActive} />

            <Link
              href="/portfolio"
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent-gold border-b-2 pb-0.5",
                pathname === "/portfolio" ? "text-primary-gold border-primary-gold" : "text-gray-400 border-transparent"
              )}
            >
              Portofolio
            </Link>

            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent-gold border-b-2 pb-0.5",
                pathname === "/blog" ? "text-primary-gold border-primary-gold" : "text-gray-400 border-transparent"
              )}
            >
              Blog
            </Link>
          </div>

          {/* CTA Pill */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="border border-primary-gold text-primary-gold px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary-gold hover:text-surface transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Konsultasi Gratis
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-white/5">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2.5 text-sm font-medium text-gray-300 hover:text-primary-gold transition-colors">Beranda</Link>

            {/* Mobile Layanan dropdown */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "layanan" ? null : "layanan")}
                className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-gray-300 hover:text-primary-gold transition-colors"
              >
                Layanan <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === "layanan" && "rotate-180")} />
              </button>
              {mobileExpanded === "layanan" && (
                <div className="pl-4 space-y-1 border-l border-primary-gold/20 ml-2 mt-1">
                  {LAYANAN_ITEMS.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-400 hover:text-primary-gold transition-colors">{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Tentang dropdown */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "tentang" ? null : "tentang")}
                className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-gray-300 hover:text-primary-gold transition-colors"
              >
                Tentang Kami <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === "tentang" && "rotate-180")} />
              </button>
              {mobileExpanded === "tentang" && (
                <div className="pl-4 space-y-1 border-l border-primary-gold/20 ml-2 mt-1">
                  {TENTANG_ITEMS.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-400 hover:text-primary-gold transition-colors">{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/portfolio" onClick={() => setIsOpen(false)} className="block py-2.5 text-sm font-medium text-gray-300 hover:text-primary-gold transition-colors">Portofolio</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block py-2.5 text-sm font-medium text-gray-300 hover:text-primary-gold transition-colors">Blog</Link>

            <div className="pt-4">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-center border border-primary-gold text-primary-gold px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-gold hover:text-surface transition-all">
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
