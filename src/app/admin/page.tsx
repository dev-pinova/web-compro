import { db } from "@/lib/db";
import { inquiry, portfolio, post } from "@/lib/db/schema";
import { count, desc } from "drizzle-orm";
import { LayoutDashboard, MessageSquare, ImageIcon, FileText, ArrowUpRight, Clock, User } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [inquiryCount] = await db.select({ value: count() }).from(inquiry);
  const [portfolioCount] = await db.select({ value: count() }).from(portfolio);
  const [postCount] = await db.select({ value: count() }).from(post);

  const recentInquiries = await db.select().from(inquiry).orderBy(desc(inquiry.createdAt)).limit(5);

  const stats = [
    { label: "Total Inquiries", value: inquiryCount.value, icon: MessageSquare, color: "text-blue-400", href: "/admin/inquiries" },
    { label: "Projects", value: portfolioCount.value, icon: ImageIcon, color: "text-primary-gold", href: "/admin/portfolio" },
    { label: "Articles", value: postCount.value, icon: FileText, color: "text-green-400", href: "/admin/blog" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-gray-500">Ringkasan performa Anugrah Jaya Desain.</p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Status Server</p>
           <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">Online & Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-secondary-dark border border-white/5 p-8 rounded-[2rem] hover:border-primary-gold/30 transition-all group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-primary-gold/[0.05] transition-all" />
            <div className="flex justify-between items-start mb-6">
               <div className={`p-4 bg-white/5 rounded-2xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-primary-gold transition-colors" />
            </div>
            <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recent Inquiries */}
         <div className="lg:col-span-2 bg-secondary-dark/50 border border-white/5 rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary-gold" />
                  Inquiry Terbaru
               </h3>
               <Link href="/admin/inquiries" className="text-xs font-bold text-primary-gold hover:underline uppercase tracking-widest">
                  Lihat Semua
               </Link>
            </div>

            <div className="space-y-4">
               {recentInquiries.length > 0 ? (
                 recentInquiries.map((iq) => (
                   <div key={iq.id} className="group p-5 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl border border-white/5 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-primary-gold/10 flex items-center justify-center text-primary-gold font-bold">
                            {iq.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-white group-hover:text-primary-gold transition-colors">{iq.name}</p>
                            <p className="text-xs text-gray-500">{iq.projectType || "Proyek Umum"}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-medium text-gray-400 flex items-center gap-1.5 justify-end">
                            <Clock className="w-3 h-3" />
                            {new Date(iq.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                         </p>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-10 text-gray-500 text-sm">Belum ada inquiry masuk.</div>
               )}
            </div>
         </div>

         {/* Quick Actions & Tips */}
         <div className="flex flex-col gap-6">
            <div className="bg-secondary-dark border border-white/5 rounded-[2rem] p-8 grow">
               <h3 className="text-lg font-bold text-white mb-6">Tips Kelola Konten</h3>
               <ul className="space-y-5">
                  {[
                    "Kualitas foto portofolio sangat menentukan minat klien.",
                    "Gunakan keyword arsitektur di setiap artikel blog.",
                    "Inquiry yang dibalas cepat memiliki konversi 2x lebih tinggi."
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-4 text-sm text-gray-400 leading-relaxed">
                       <span className="w-6 h-6 rounded-lg bg-primary-gold/10 text-primary-gold flex items-center justify-center font-bold text-[10px] shrink-0">{i+1}</span>
                       {tip}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="bg-gradient-to-br from-primary-gold to-accent-gold rounded-[2rem] p-8 text-black group overflow-hidden relative">
               <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
               <h3 className="text-xl font-bold mb-3 relative z-10">Bantuan Teknis</h3>
               <p className="text-sm font-medium opacity-80 leading-relaxed mb-8 relative z-10">
                  Butuh fitur khusus atau kustomasi desain? Tim developer kami siap membantu pengembangan website Anda.
               </p>
               <Link href="mailto:support@example.com" className="bg-black text-white text-xs font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:bg-gray-900 transition-all shadow-xl relative z-10">
                  Chat via Email <ArrowUpRight className="w-4 h-4" />
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}

