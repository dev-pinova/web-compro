import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settings] = await db.select().from(siteSettings).limit(1);

  // Default values if no settings found
  const initialData = settings || {
    siteName: "Anugrah Jaya Desain",
    email: "tonygroup8111@gmail.com",
    phone: "+62 851-0093-0009",
    address: "Jl. Adi Sucipto No.154, Surakarta",
    whatsapp: "6285100930009",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pengaturan Website</h2>
        <p className="text-gray-500 text-sm">Kelola informasi global, identitas, dan kontak resmi perusahaan.</p>
      </div>

      <SettingsForm initialData={initialData} />
    </div>
  );
}
