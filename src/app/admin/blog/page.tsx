import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Plus, Trash2, Edit2, Search, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePost } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const articles = await db.select().from(post).orderBy(desc(post.createdAt));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Kelola Blog</h2>
          <p className="text-sm text-gray-500">Edit, hapus, atau buat artikel baru untuk edukasi klien.</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center justify-center gap-2 bg-primary-gold text-surface px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent-gold transition-all shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
          <Plus className="w-4 h-4" /> Tulis Artikel Baru
        </Link>
      </div>

      <div className="bg-secondary-dark/30 border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-white/5">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
             <input 
               type="text" 
               placeholder="Cari artikel..." 
               className="w-full bg-surface/50 border border-white/10 rounded-full py-2 px-11 text-xs text-white focus:outline-none focus:border-primary-gold/50"
             />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                <th className="px-6 py-4">Artikel</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {articles.map((item: any) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/10 bg-surface shrink-0 relative">
                        <Image src={item.imageUrl} alt="" fill className="object-cover" />
                      </div>
                      <div className="max-w-xs truncate">
                         <p className="text-sm font-bold text-white truncate">{item.title}</p>
                         <p className="text-[10px] text-gray-500 italic">/{item.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] bg-secondary-dark text-gray-400 px-2.5 py-1 rounded-lg border border-white/10">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                        <Calendar className="w-3 h-3 text-primary-gold" /> {item.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                        <User className="w-3 h-3 text-primary-gold" /> {item.author}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/blog/edit/${item.id}`}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all" 
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <DeleteButton id={item.id} onDelete={deletePost} />
                    </div>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm italic">
                    Belum ada artikel yang dipublikasikan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
