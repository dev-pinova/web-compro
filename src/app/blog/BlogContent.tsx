"use client";

import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
}

const categories = ["Semua", "Tips Bangun Rumah", "Interior", "Tren Arsitektur", "Info Material"];

export function BlogContent({ posts }: { posts: Post[] }) {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeTab === "Semua" || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleImageLoad = (id: string) => {
    setLoadingImages(prev => ({ ...prev, [id]: false }));
  };

  return (
    <>
      {/* Categories & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
                activeTab === cat 
                  ? "bg-primary-gold text-surface shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
                  : "bg-secondary-dark text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-xs">
          <input 
            type="text" 
            placeholder="Cari artikel..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary-dark border border-white/10 rounded-full py-2.5 px-5 pr-10 text-sm text-white focus:outline-none focus:border-primary-gold/50 transition-all font-medium"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-secondary-dark rounded-3xl overflow-hidden border border-white/5 hover:border-primary-gold/20 transition-all"
            >
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                {loadingImages[post.id] !== false && (
                  <Skeleton className="absolute inset-0 z-10 w-full h-full" />
                )}
                <Image 
                  src={post.imageUrl} 
                  alt={post.title} 
                  fill
                  className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                    loadingImages[post.id] === false ? "opacity-100" : "opacity-0"
                  }`} 
                  onLoad={() => handleImageLoad(post.id)}
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-surface/80 backdrop-blur-md text-primary-gold text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5 border border-primary-gold/20">
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary-gold" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary-gold" /> {post.author}</span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-primary-gold transition-colors leading-tight">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center gap-2 text-primary-gold text-sm font-semibold hover:gap-3 transition-all"
                >
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24 text-gray-500">Tidak ada artikel yang ditemukan.</div>
        )}
      </section>
    </>
  );
}

