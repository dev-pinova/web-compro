"use client";

import { useState } from "react";
import { 
  Save, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Link as LinkIcon, 
  Globe, 
  Share2, 
  ShieldCheck,
  Type
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { SiteSettings } from "@/lib/db/schema";

const tabs = [
  { id: "identity", label: "Identitas", icon: ShieldCheck },
  { id: "contact", label: "Kontak & Sosmed", icon: MessageCircle },
  { id: "seo", label: "SEO & Metadata", icon: Globe },
];

export function SettingsForm({ initialData }: { initialData: SiteSettings }) {
  const [activeTab, setActiveTab] = useState("identity");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form State to persist across tab unmounts
  const [formData, setFormData] = useState<Partial<SiteSettings>>({ ...initialData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError("");

    const result = await updateSettings(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Gagal menyimpan.");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-secondary-dark/50 border border-white/5 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
              activeTab === tab.id
                ? "bg-primary-gold text-surface shadow-lg"
                : "text-gray-500 hover:text-white hover:bg-white/5"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-secondary-dark/50 border border-white/5 rounded-[2rem] p-8 md:p-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "identity" && (
            <motion.div
              key="identity"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Identitas Website</h3>
                <p className="text-sm text-gray-500">Informasi dasar brand dan nama situs Anda.</p>
              </div>
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2 text-surface">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Type className="w-3 h-3" /> Nama Perusahaan
                  </label>
                  <Input name="siteName" value={formData.siteName || ""} onChange={handleInputChange} required className="bg-surface border-white/10 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Kontak & Media Sosial</h3>
                <p className="text-sm text-gray-500">Kelola bagaimana pelanggan menghubungi dan mengikuti Anda.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-surface">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 font-white">
                    <Mail className="w-3 h-3" /> Email Resmi
                  </label>
                  <Input name="email" type="email" value={formData.email || ""} onChange={handleInputChange} required className="bg-surface border-white/10 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Telepon Kantor
                  </label>
                  <Input name="phone" value={formData.phone || ""} onChange={handleInputChange} required className="bg-surface border-white/10 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <MessageCircle className="w-3 h-3" /> WhatsApp Admin
                  </label>
                  <Input name="whatsapp" value={formData.whatsapp || ""} onChange={handleInputChange} required className="bg-surface border-white/10 h-12 text-white" placeholder="Format 62..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Alamat Kantor
                  </label>
                  <Input name="address" value={formData.address || ""} onChange={handleInputChange} required className="bg-surface border-white/10 h-12 text-white" />
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 text-surface">
                {[
                  { name: "instagram", icon: LinkIcon, label: "Instagram" },
                  { name: "facebook", icon: LinkIcon, label: "Facebook" },
                  { name: "youtube", icon: LinkIcon, label: "YouTube" },
                  { name: "linkedin", icon: LinkIcon, label: "LinkedIn" },
                ].map((social) => (
                  <div key={social.name} className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                      <social.icon className="w-3 h-3" /> {social.label} URL
                    </label>
                    <Input name={social.name} value={(formData[social.name as keyof SiteSettings] as string) || ""} onChange={handleInputChange} placeholder="https://..." className="bg-surface border-white/10 h-12 text-white" />
                  </div>
                ))}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">TikTok (Username)</label>
                  <Input name="tiktok" value={formData.tiktok || ""} onChange={handleInputChange} placeholder="@..." className="bg-surface border-white/10 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "seo" && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">SEO & Metadata</h3>
                <p className="text-sm text-gray-500">Kelola kata kunci dan profil situs di mesin pencari.</p>
              </div>

              <div className="space-y-6 max-w-3xl text-surface">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Meta Description</label>
                  <Textarea 
                    name="siteDescription" 
                    value={formData.siteDescription || ""} 
                    onChange={handleInputChange}
                    className="bg-surface border-white/10 min-h-[120px] text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Primary Keywords</label>
                  <Input name="keywords" value={formData.keywords || ""} onChange={handleInputChange} className="bg-surface border-white/10 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Social Share Image URL
                  </label>
                  <Input name="ogImage" value={formData.ogImage || ""} onChange={handleInputChange} className="bg-surface border-white/10 h-12 text-white" />
                  <p className="text-[10px] text-gray-600 italic">Gambar default (1200x630) yang muncul saat link website dibagikan.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          {success && <span className="text-green-400 font-bold animate-pulse">✓ Perubahan berhasil disimpan!</span>}
          {error && <span className="text-red-400 font-bold">⚠ {error}</span>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="px-10 py-6 bg-primary-gold text-surface rounded-2xl font-bold flex items-center gap-2 hover:bg-accent-gold transition-all shadow-xl">
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Simpan Semua
        </Button>
      </div>
    </form>
  );
}

