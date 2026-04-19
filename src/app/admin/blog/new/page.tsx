"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/actions";
import { ImageUpload } from "@/components/admin/ImageUpload";

const categories = ["Tips Bangun Rumah", "Interior", "Tren Arsitektur", "Info Material"];

export default function NewPostPage() {
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
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      category: formData.get("category"),
      author: formData.get("author"),
      imageUrl: formData.get("imageUrl"),
      content: formData.get("content"),
    };

    const result = await createPost(data);

    if (result.success) {
      router.push("/admin/blog");
    } else {
      setError(result.error || "Gagal membuat artikel.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/admin/blog" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
        </Link>
        <h2 className="text-xl font-bold text-white">Tulis Artikel Baru</h2>
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
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Judul Artikel</label>
              <Input name="title" placeholder="Masukkan judul menarik..." required className="bg-surface border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">URL Slug (Unik)</label>
              <Input name="slug" placeholder="tips-bangun-rumah-modern" required className="bg-surface border-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kategori</label>
              <select name="category" required className="flex h-10 w-full rounded-md border border-white/10 bg-surface px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-primary-gold">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Penulis</label>
              <Input name="author" placeholder="Nama Penulis" defaultValue="Admin AJD" required className="bg-surface border-white/10" />
            </div>
          </div>

          <div className="space-y-4">
            <ImageUpload 
              label="Gambar Artikel"
              onUploadComplete={(url) => {
                const input = document.querySelector('input[name="imageUrl"]') as HTMLInputElement;
                if (input) input.value = url;
              }}
            />
            <input type="hidden" name="imageUrl" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ringkasan (Excerpt)</label>
            <Textarea name="excerpt" placeholder="Potongan teks untuk daftar blog..." required className="bg-surface border-white/10 min-h-[80px]" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Konten Artikel (Opsional)</label>
            <Textarea name="content" placeholder="Isi lengkap artikel..." className="bg-surface border-white/10 min-h-[250px]" />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/blog" className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-white transition-all">
            Batal
          </Link>
          <Button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-primary-gold text-surface rounded-xl font-bold flex items-center gap-2 hover:bg-accent-gold transition-all shadow-lg">
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Simpan & Publikasikan
          </Button>
        </div>
      </form>
    </div>
  );
}
