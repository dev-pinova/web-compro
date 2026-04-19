"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  defaultValue?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export function ImageUpload({ defaultValue, onUploadComplete, label }: ImageUploadProps) {
  const [preview, setPreview] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cloudinary Configuration (Should ideally be in .env)
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo"; // default to demo for initial test
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar (maks 5MB)");
      return;
    }

    setIsUploading(true);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        onUploadComplete(data.secure_url);
        setIsUploading(false);
      } else {
        throw new Error(data.error?.message || "Upload gagal");
      }
    } catch (err: any) {
      console.error("Upload Error:", err);
      setError("Gagal mengunggah gambar. Pastikan Cloudinary sudah dikonfigurasi.");
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    onUploadComplete("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>}
      
      <div className="relative group">
        {preview ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-surface">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button 
                type="button" 
                variant="destructive" 
                size="sm" 
                onClick={removeImage}
                className="rounded-full h-9 w-9 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button 
                type="button" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary-gold text-surface hover:bg-accent-gold rounded-full h-9 px-4 font-bold text-xs"
              >
                Ganti Foto
              </Button>
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-8 h-8 text-primary-gold animate-spin" />
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Mengunggah...</p>
              </div>
            )}
            {!isUploading && preview === defaultValue && (
              <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-surface/50 hover:bg-surface hover:border-primary-gold/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-gold/10 transition-colors">
              <Upload className="w-6 h-6 text-gray-500 group-hover:text-primary-gold" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-white">Klik untuk upload foto</p>
              <p className="text-[10px] text-gray-500 mt-1">PNG, JPG atau WEBP (Maks 5MB)</p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}
