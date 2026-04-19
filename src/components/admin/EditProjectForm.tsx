"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateProject } from "@/lib/actions";
import { Portfolio } from "@/lib/db/schema";
import { ImageUpload } from "./ImageUpload";
import { MultiImageUpload } from "./MultiImageUpload";

const categories = ["Bangun Rumah", "Desain Rumah", "Renovasi Rumah", "Interior Desain"];

export function EditProjectForm({ project }: { project: Portfolio }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      location: formData.get("location"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      gallery: formData.get("gallery"),
    };

    const result = await updateProject(project.id, data);

    if (result.success) {
      router.push("/admin/portfolio");
      router.refresh();
    } else {
      setError(result.error || "Gagal memperbarui proyek.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/admin/portfolio" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
        </Link>
        <h2 className="text-xl font-bold text-white">Edit Proyek</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <div className="bg-secondary-dark/50 border border-white/5 rounded-3xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Judul Proyek</label>
                <Input 
                  name="title" 
                  defaultValue={project.title} 
                  placeholder="Villa Modern Tropical..." 
                  required 
                  className="bg-surface border-white/10" 
                />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kategori</label>
                <select 
                  name="category" 
                  defaultValue={project.category} 
                  required 
                  className="flex h-10 w-full rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-primary-gold"
                >
                   {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lokasi</label>
                <div className="relative">
                   <Input 
                    name="location" 
                    defaultValue={project.location || ""} 
                    placeholder="Solo, Jawa Tengah" 
                    required 
                    className="bg-surface border-white/10 pl-11" 
                   />
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
             </div>
             <div className="space-y-4">
                <ImageUpload 
                  label="Gambar Utama Proyek"
                  defaultValue={project.imageUrl}
                  onUploadComplete={(url) => {
                    const input = document.querySelector('input[name="imageUrl"]') as HTMLInputElement;
                    if (input) input.value = url;
                  }}
                />
                <input type="hidden" name="imageUrl" defaultValue={project.imageUrl} required />
             </div>
          </div>

          <div className="space-y-4">
            <MultiImageUpload 
              label="Galeri Proyek (Opsional)"
              defaultValue={project.gallery ? JSON.parse(project.gallery) : []}
              onUploadComplete={(urls) => {
                const input = document.querySelector('input[name="gallery"]') as HTMLInputElement;
                if (input) input.value = JSON.stringify(urls);
              }}
            />
            <input type="hidden" name="gallery" defaultValue={project.gallery || "[]"} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Deskripsi Singkat</label>
            <Textarea 
              name="description" 
              defaultValue={project.description || ""} 
              placeholder="Ceritakan detail pengerjaan proyek ini..." 
              className="bg-surface border-white/10 min-h-[150px]" 
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/portfolio" className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-white transition-all">
            Batal
          </Link>
          <Button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-primary-gold text-surface rounded-xl font-bold flex items-center gap-2 hover:bg-accent-gold transition-all shadow-lg">
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
