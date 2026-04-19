import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Syarat & Ketentuan | Anugrah Jaya Desain",
  description: "Syarat dan ketentuan penggunaan layanan jasa arsitek dan kontraktor Anugrah Jaya Desain.",
};

export default function TermsPage() {
  return (
    <div className="bg-surface min-h-screen py-24 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-gold text-sm font-semibold mb-12 hover:gap-3 transition-all group">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-gold/10 flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-primary-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Syarat & Ketentuan</h1>
            <p className="text-gray-500 italic">Terakhir diperbarui: 19 April 2024</p>
          </div>

          <div className="prose prose-invert prose-gold max-w-none space-y-8 text-lg leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. Penerimaan Ketentuan</h2>
              <p>
                Dengan mengakses dan menggunakan jasa Anugrah Jaya Desain, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui bagian apa pun dari ketentuan ini, Anda tidak diperkenankan menggunakan layanan kami.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Ruang Lingkup Layanan</h2>
              <p>
                Anugrah Jaya Desain menyediakan jasa konsultasi arsitektur, desain interior, dan jasa konstruksi bangunan. Detail spesifik mengenai setiap proyek akan diatur dalam kontrak kerja terpisah yang ditandatangani oleh kedua belah pihak.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Kewajiban Klien</h2>
              <p>
                Klien berkewajiban memberikan informasi yang akurat dan lengkap terkait kebutuhan proyek, termasuk namun tidak terbatas pada dokumen kepemilikan lahan, izin lingkungan, dan anggaran dana yang tersedia.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. Hak Kekayaan Intelektual</h2>
              <p>
                Semua desain, gambar teknis, dan model 3D yang dihasilkan oleh Anugrah Jaya Desain tetap merupakan hak intelektual kami, kecuali jika disepakati lain secara tertulis dalam kontrak. Klien diberikan lisensi penggunaan desain tersebut khusus untuk lokasi proyek yang disepakati.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">5. Pembayaran & Pembatalan</h2>
              <p>
                Sistem pembayaran dilakukan secara bertahap (termin) sesuai dengan progres pekerjaan yang disepakati. Pembatalan sepihak oleh klien akan dikenakan biaya administrasi dan penggantian biaya pekerjaan yang telah berjalan sesuai dengan klausul kesepakatan.
              </p>
            </section>

            <div className="p-8 bg-secondary-dark rounded-3xl border border-white/5 mt-12">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-gold" /> Perlu Pertanyaan Lebih Lanjut?
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan kami, silakan hubungi tim legal kami melalui email resmi.
              </p>
              <Link href="/contact" className="text-primary-gold font-bold hover:underline">
                Hubungi Kami &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
