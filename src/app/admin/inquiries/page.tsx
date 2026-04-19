import { db, rawSqlite } from "@/lib/db";
import { inquiry } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { Mail, Phone, MapPin, Calendar, Trash2, MessageSquare } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteInquiry } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  let messages = [];
  try {
    messages = await db.select().from(inquiry).orderBy(desc(inquiry.createdAt));
  } catch (err: any) {
    const errorMsg = err.message || "";
    if (errorMsg.includes('service_type')) {
      try {
        console.log("Admin Tool: Fixing database column using raw driver...");
        if (rawSqlite) {
          rawSqlite.prepare('ALTER TABLE inquiry ADD COLUMN service_type TEXT').run();
        } else {
          // Fallback for cloud/turso if applicable
          await db.run(sql`ALTER TABLE inquiry ADD COLUMN service_type TEXT`);
        }
        messages = await db.select().from(inquiry).orderBy(desc(inquiry.createdAt));
      } catch (migrationError) {
        console.error("Migration failed:", migrationError);
        throw err;
      }
    } else {
      throw err;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Inquiry Masuk</h2>
          <p className="text-sm text-gray-500">Daftar semua pesan dan permintaan konsultasi dari website.</p>
        </div>
        <div className="px-4 py-2 bg-primary-gold/10 border border-primary-gold/20 rounded-xl">
           <p className="text-xs text-primary-gold font-bold">Total Request: <span className="text-white ml-1">{messages.length}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.length === 0 ? (
          <div className="bg-secondary-dark/50 border border-dashed border-white/10 rounded-3xl py-24 text-center">
            <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Belum ada inquiry yang masuk.</p>
          </div>
        ) : (
          messages.map((msg: any) => (
            <div key={msg.id} className="bg-secondary-dark/40 border border-white/5 rounded-3xl p-6 hover:bg-secondary-dark/60 transition-all group">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{msg.name}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                         <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {msg.email}</span>
                         {msg.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {msg.phone}</span>}
                         <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(msg.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-white/5">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Jenis Proyek</p>
                      <p className="text-sm text-gray-300 font-medium">{msg.projectType || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Layanan</p>
                      <p className="text-sm text-gray-300 font-medium text-primary-gold">{msg.serviceType || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Anggaran</p>
                      <p className="text-sm text-gray-300 font-medium">{msg.budget || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Lokasi</p>
                      <p className="text-sm text-gray-300 font-medium">{msg.location || "-"}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Pesan / Visi</p>
                    <div className="bg-surface/50 rounded-2xl p-4 border border-white/5">
                      <p className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
                        {msg.message || "(Tanpa pesan)"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                   <a 
                    href={`mailto:${msg.email}`}
                    className="flex-1 lg:flex-none h-10 px-4 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-all"
                   >
                      <Mail className="w-3.5 h-3.5" /> Email
                   </a>
                   {msg.phone && (
                     <a 
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '').replace(/^0/, '62').startsWith('62') ? msg.phone.replace(/[^0-9]/g, '').replace(/^0/, '62') : '62' + msg.phone.replace(/[^0-9]/g, '').replace(/^0/, '62') }?text=Halo%20${encodeURIComponent(msg.name)}%2C%20kami%20dari%20Anugrah%20Jaya%20Desain.%20Terima%20kasih%20atas%20ketertarikan%20Anda!%20Kami%20sangat%20antusias%20ingin%20membahas%20rencana%20proyek%20${encodeURIComponent(msg.projectType || 'Anda')}%20lebih%20detail.%20Boleh%20kita%20diskusi%20sebentar%20di%20sini%3F`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-none h-10 px-4 flex items-center justify-center gap-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-all shadow-[0_4px_15px_rgba(22,163,74,0.15)]"
                     >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                     </a>
                   )}
                   <DeleteButton id={msg.id} onDelete={deleteInquiry} className="h-10 w-10 lg:w-full" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
