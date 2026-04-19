import { ArrowLeft, Lock, Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Kebijakan Privasi | Anugrah Jaya Desain",
  description: "Kebijakan privasi bagaimana kami menjaga dan mengelola data pengguna Anugrah Jaya Desain.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-surface min-h-screen py-24 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-gold text-sm font-semibold mb-12 hover:gap-3 transition-all group">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-gold/10 flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-primary-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Kebijakan Privasi</h1>
            <p className="text-gray-500 italic">Terakhir diperbarui: 19 April 2024</p>
          </div>

          <div className="prose prose-invert prose-gold max-w-none space-y-8 text-lg leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. Informasi yang Kami Kumpulkan</h2>
              <p>
                Kami mengumpulkan informasi yang Anda berikan secara sukarela saat mengisi formulir kontak, termasuk nama, alamat email, nomor telepon, dan detail proyek. Kami juga dapat mengumpulkan data penggunaan secara otomatis seperti alamat IP dan jenis perangkat untuk meningkatkan kualitas website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Penggunaan Informasi</h2>
              <p>
                Informasi yang dikumpulkan digunakan semata-mata untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menghubungi Anda kembali terkait permintaan konsultasi.</li>
                <li>Memberikan informasi atau penawaran proyek yang Anda minta.</li>
                <li>Menganalisis penggunaan website untuk perbaikan pengalaman pengguna.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Keamanan Data</h2>
              <p>
                Anugrah Jaya Desain berkomitmen untuk menjaga keamanan data pribadi Anda. Kami menerapkan standar teknis dan organisasi yang wajar untuk mencegah akses tidak sah atau penyalahgunaan data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. Penyingkapan kepada Pihak Ketiga</h2>
              <p>
                Kami tidak akan menjual, menyewakan, atau memberikan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran tanpa persetujuan eksplisit dari Anda. Data hanya dapat diberikan kepada otoritas hukum jika diwajibkan oleh undang-undang yang berlaku.
              </p>
            </section>

            <div className="p-8 bg-secondary-dark rounded-3xl border border-white/5 mt-12 flex gap-6 items-start">
              <Info className="w-6 h-6 text-primary-gold shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold mb-2">Pembaruan Kebijakan</h3>
                <p className="text-sm text-gray-500">
                  Kebijakan ini dapat berubah sewaktu-waktu sesuai dengan perkembangan teknologi dan hukum di Indonesia. Kami menyarankan Anda untuk memeriksa halaman ini secara berkala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
