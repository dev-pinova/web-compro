"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { X, MapPin, Maximize2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  location?: string | null;
  imageUrl: string;
  gallery?: string | null;
  size?: string;
  description?: string | null;
}

const categories = ["Semua", "Bangun Rumah", "Renovasi Rumah", "Interior & Design"];

export function PortfolioContent({ allProjects }: { allProjects: Project[] }) {
  const [active, setActive] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const filtered = active === "Semua" 
    ? allProjects 
    : allProjects.filter((p) => p.category === active);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleImageLoad = (id: string, index?: number) => {
    const key = index !== undefined ? `${id}-${index}` : id;
    setLoadingImages(prev => ({ ...prev, [key]: false }));
  };

  const projectGallery = selectedProject?.gallery ? JSON.parse(selectedProject.gallery) as string[] : [];
  const displayImage = activeImage || selectedProject?.imageUrl;

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-surface/90 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === cat
                    ? "bg-primary-gold text-surface shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "bg-secondary-dark text-gray-400 hover:text-white border border-white/5 hover:border-primary-gold/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[320px]"
        >
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onClick={() => setSelectedProject(item)}
              className={`group relative rounded-2xl overflow-hidden border border-white/5 hover:border-primary-gold/40 transition-colors cursor-pointer ${
                item.size === "large" ? "md:col-span-2" : ""
              }`}
            >
              {loadingImages[item.id] !== false && (
                <Skeleton className="absolute inset-0 z-10 w-full h-full" />
              )}
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill 
                className={`object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-90 ${
                  loadingImages[item.id] === false ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(item.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-primary-gold/90 text-surface text-[10px] font-bold uppercase tracking-wider rounded-full mb-2 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-accent-gold transition-colors">{item.title}</h3>
                {item.location && <p className="text-gray-400 text-sm flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {item.location}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-500">Belum ada proyek di kategori ini.</div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={() => {
              setSelectedProject(null);
              setActiveImage(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-6xl w-full bg-secondary-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setActiveImage(null);
                }}
                className="absolute top-6 right-6 z-30 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-2/3 relative bg-surface flex flex-col">
                <div className="relative grow aspect-video md:aspect-auto">
                  {displayImage && (
                    <Image 
                      src={displayImage} 
                      alt={selectedProject.title} 
                      fill 
                      className="object-contain" 
                    />
                  )}
                </div>
                
                {projectGallery.length > 0 && (
                  <div className="p-4 bg-black/20 backdrop-blur-md border-t border-white/5 overflow-x-auto no-scrollbar">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setActiveImage(null)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          !activeImage ? 'border-primary-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        <Image src={selectedProject.imageUrl} alt="" fill className="object-cover" />
                      </button>
                      {projectGallery.map((url, i) => (
                        <button 
                          key={i}
                          onClick={() => setActiveImage(url)}
                          className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                            activeImage === url ? 'border-primary-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                        >
                          <Image src={url} alt="" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary-gold/10 text-primary-gold text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 border border-primary-gold/20">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {selectedProject.title}
                </h2>
                
                <div className="space-y-6">
                  {selectedProject.location && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Lokasi Proyek</p>
                        <p className="text-gray-300">{selectedProject.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-gray-400 leading-relaxed italic">
                      {selectedProject.description || "Detail pengerjaan proyek arsitektur premium dengan fokus pada estetika dan fungsi bangunan."}
                    </p>
                  </div>
                </div>

                <div className="mt-12 grow flex items-end">
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      setActiveImage(null);
                    }}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/10"
                  >
                    Tutup Detail
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

