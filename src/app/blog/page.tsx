import { BlogContent } from "./BlogContent";
import Image from "next/image";
import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export default async function BlogPage() {
  const posts = await db.select().from(post).orderBy(desc(post.createdAt));

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Header */}
      <section className="relative h-[45vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Blog Anugrah Jaya Desain"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">Inspirasi & Wawasan</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">Blog & Artikel</h1>
        </div>
      </section>

      <BlogContent posts={posts} />

      {/* Newsletter / CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-br from-secondary-dark to-[#111215] border border-white/5 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-gold/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-gold/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Dapatkan Update Mingguan</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Berlangganan newsletter kami untuk mendapatkan tips renovasi, tren arsitektur terbaru, dan promo layanan langsung di email Anda.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" action="#">
              <input 
                id="newsletter-email"
                name="email"
                type="email" 
                autoComplete="email"
                aria-label="Email untuk berlangganan"
                placeholder="Email Anda" 
                className="flex-1 bg-surface border border-white/10 rounded-full py-3.5 px-6 text-sm text-white focus:outline-none focus:border-primary-gold/50 transition-all font-medium"
                required
              />
              <button type="submit" className="bg-primary-gold text-surface font-bold px-8 py-3.5 rounded-full hover:bg-accent-gold transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                Berlangganan
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
