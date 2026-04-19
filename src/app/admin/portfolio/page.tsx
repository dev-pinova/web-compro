import { db } from "@/lib/db";
import { portfolio } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Plus, Trash2, Edit2, Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProject } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const projects = await db.select().from(portfolio).orderBy(desc(portfolio.createdAt));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Portfolio</h2>
          <p className="text-sm text-gray-500">Kelola karya dan proyek yang muncul di halaman depan.</p>
        </div>
        <Link href="/admin/portfolio/new" className="flex items-center justify-center gap-2 bg-primary-gold text-surface px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent-gold transition-all shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
          <Plus className="w-4 h-4" /> Tambah Proyek Baru
        </Link>
      </div>

      <div className="bg-secondary-dark/30 border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-white/5">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
             <input 
               type="text" 
               placeholder="Cari proyek..." 
               className="w-full bg-surface/50 border border-white/10 rounded-full py-2 px-11 text-xs text-white focus:outline-none focus:border-primary-gold/50"
             />
           </div>
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-surface/50 border border-white/10 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-surface/80">
                 <Filter className="w-3.5 h-3.5" /> Filter Kategori
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                <th className="px-6 py-4">Proyek</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-surface relative">
                        <Image src={project.imageUrl} alt="" fill className="object-cover" />
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white">{project.title}</p>
                         <p className="text-[11px] text-gray-500">ID: {project.id.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-primary-gold/10 text-primary-gold px-3 py-1 rounded-full border border-primary-gold/20">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/portfolio/edit/${project.id}`}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <DeleteButton id={project.id} onDelete={deleteProject} />
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500 text-sm italic">
                    Belum ada data proyek.
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
