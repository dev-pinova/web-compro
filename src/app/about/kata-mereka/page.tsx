import { Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { testimonial, type Testimonial } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    id: "static-1",
    name: "Drs. H. Mulyadi",
    role: "Pemilik Rumah Pribadi",
    comment: "Pengerjaan sangat profesional dan tepat waktu. Hasil renovasi rumah saya di Solo melampaui ekspektasi. Tim sangat kooperatif dalam mendengarkan setiap detail keinginan keluarga kami.",
    stars: 5,
    avatarUrl: null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: "static-2",
    name: "Ibu Ratna Sari",
    role: "Dosen & Ibu Rumah Tangga",
    comment: "Desain interior yang dikerjakan Anugrah Jaya Desain sangat elegan dan fungsional. Sirkulasi udara dan pencahayaan alami dioptimalkan dengan sangat baik sehingga rumah terasa jauh lebih nyaman.",
    stars: 5,
    avatarUrl: null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: "static-3",
    name: "Bpk. Tan Wijaya",
    role: "Pengusaha Properti",
    comment: "Sudah beberapa kali bekerja sama untuk proyek ruko dan rumah tinggal. Konsistensi kualitas dan transparansi biaya menjadi alasan utama saya selalu kembali menggunakan jasa tim ini.",
    stars: 5,
    avatarUrl: null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const dynamic = "force-dynamic";

export default async function KataMerekaPage() {
  let dbTestimonials: Testimonial[] = [];
  try {
    dbTestimonials = await db.select().from(testimonial).orderBy(desc(testimonial.createdAt));
  } catch (error) {
    console.warn("Testimonial table not found or error fetching. Skipping for build.");
  }
  const displayData = dbTestimonials.length > 0 ? dbTestimonials : STATIC_TESTIMONIALS;

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Kata Mereka"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full text-center">
          <p className="text-primary-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 inline-block animate-in fade-in slide-in-from-bottom-2 duration-700">Testimonial</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">Kata Mereka</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Kebanggaan terbesar kami adalah kepuasan klien. Berikut adalah cerita dan pengalaman mereka yang telah mempercayakan propertinya kepada kami.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayData.map((testi, idx) => (
            <div
              key={testi.id}
              className="bg-secondary-dark border border-white/5 rounded-3xl p-8 relative hover:border-primary-gold/30 transition-colors group animate-in fade-in zoom-in-95 duration-500 flex flex-col"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "both" }}
            >
              <div className="absolute top-8 right-8 text-primary-gold/10 group-hover:text-primary-gold/20 transition-colors">
                <Quote className="w-12 h-12" />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(testi.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary-gold text-primary-gold" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-8 relative z-10 italic">
                "{testi.comment}"
              </p>
              <div className="border-t border-white/5 pt-6 mt-auto">
                <h4 className="text-white font-bold">{testi.name}</h4>
                <p className="text-primary-gold text-sm mt-1">{testi.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-br from-secondary-dark to-surface border border-primary-gold/20 p-12 rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.05)]">
          <h2 className="text-3xl font-bold text-white mb-4">Jadilah Bagian dari Lingkaran Klien Kami yang Puas</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Mulai langkah pertama untuk mewujudkan properti impian Anda. Diskusikan ide Anda bersama tim profesional kami tanpa biaya (Gratis Konsultasi).
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary-gold text-surface px-8 py-3.5 rounded-full font-bold hover:bg-accent-gold transition-colors shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group">
            Mulai Proyek Anda Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
