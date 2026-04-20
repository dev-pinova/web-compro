import { Calendar, User, ArrowLeft, Share2, Link as LinkIcon, Mail, MessageSquare, Clock, Send } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await db.query.post.findFirst({
    where: eq(post.slug, slug),
  });

  if (!postData) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${postData.title} | Blog Anugrah Jaya Desain`,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      images: [postData.imageUrl],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt,
      images: [postData.imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const blogPost = await db.query.post.findFirst({
    where: eq(post.slug, slug),
  });

  if (!blogPost) {
    notFound();
  }

  const authorInitials = blogPost.author.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="bg-surface min-h-screen pb-24 text-gray-300">
      {/* Hero / Header Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={blogPost.imageUrl} 
            alt={blogPost.title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary-gold text-sm font-semibold mb-8 hover:gap-3 transition-all group">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
          </Link>
          
          <div className="flex gap-3 mb-6">
            <span className="bg-primary-gold/10 text-primary-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary-gold/20">
              {blogPost.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary-dark border border-white/10 flex items-center justify-center text-primary-gold font-bold">
                {authorInitials}
              </div>
              <span>Oleh <span className="text-white font-medium">{blogPost.author}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-gold" />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-gold" />
              <span>5 Menit Baca</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-secondary-dark/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="prose prose-invert prose-gold max-w-none">
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary-gold transition-colors">
                <MessageSquare className="w-4 h-4" /> 0 Komentar
              </button>
              <div className="h-4 w-px bg-white/10" />
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary-gold transition-colors">
                <Share2 className="w-4 h-4" /> Bagikan Artikel
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-gray-300 font-medium mb-10">
                {blogPost.excerpt}
              </p>
              
              <h2 className="text-3xl font-bold text-white mb-6">Pentingnya Perencanaan Arsitektural</h2>
              <p className="mb-8 leading-relaxed">
                Banyak orang berpikir bahwa arsitek hanya bertugas membuat rumah terlihat bagus. Padahal, peran arsitek jauh melampaui itu. Seorang arsitek profesional akan memastikan sirkulasi udara (cross ventilation) berjalan optimal, pencahayaan alami terjaga, dan pemanfaatan lahan dilakukan seefisien mungkin.
              </p>

              <blockquote className="border-l-4 border-primary-gold pl-8 my-10 bg-secondary-dark/50 py-8 pr-8 rounded-r-2xl italic text-lg text-white">
                "Arsitektur yang baik adalah tentang bagaimana ruang tersebut berinteraksi dengan manusia yang menghuninya, menciptakan harmoni antara struktur dan emosi."
              </blockquote>

              <h2 className="text-3xl font-bold text-white mb-6">Pemilihan Material di Iklim Tropis</h2>
              <p className="mb-8 leading-relaxed">
                Di Indonesia, kelembaban tinggi dan paparan sinar matahari yang intens adalah tantangan utama. Penggunaan cat yang tepat, pemilihan kayu yang sudah melalui proses treatment, serta penggunaan kaca film penolak panas adalah beberapa investasi cerdas yang akan menghemat biaya perawatan Anda di masa depan.
              </p>

              <div className="my-12 rounded-3xl overflow-hidden border border-white/5">
                <img 
                  src={blogPost.imageUrl} 
                  alt="Interior Detail" 
                  className="w-full h-auto"
                />
                <div className="p-4 bg-secondary-dark text-xs text-center text-gray-500 italic">
                  Ilustrasi pengerjaan finishing interior dengan detail material berkualitas.
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">Kesimpulan & Langkah Selanjutnya</h2>
              <p className="mb-8 leading-relaxed">
                Jangan ragu untuk memulai diskusi kecil dengan ahli sebelum melangkah ke tahap konstruksi. Kesalahan kecil di tahap desain bisa berakibat pada pembengkakan biaya yang besar saat pembangunan fisik sudah berjalan.
              </p>
            </div>

            {/* Tags & Share */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8">
              <div className="flex flex-wrap gap-2">
                {["Arsitektur", "Konstruksi", "Tips Rumah"].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase tracking-widest hover:border-primary-gold hover:text-primary-gold transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Bagikan:</span>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center hover:bg-primary-gold hover:text-surface transition-all">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center hover:bg-primary-gold hover:text-surface transition-all">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center hover:bg-primary-gold hover:text-surface transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
