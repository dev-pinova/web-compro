"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MultiImageUploadProps {
  defaultValue?: string[]; // Array of URLs
  onUploadComplete: (urls: string[]) => void;
  label?: string;
}

export function MultiImageUpload({ defaultValue = [], onUploadComplete, label }: MultiImageUploadProps) {
  const [images, setImages] = useState<string[]>(defaultValue);
  const [uploadingIndices, setUploadingIndices] = useState<number[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError("");
    const newImages = [...images];
    const newUploadingIndices: number[] = [];

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        setError("Beberapa file terlalu besar (maks 5MB)");
        continue;
      }

      const tempIdx = newImages.length;
      newImages.push(""); // Placeholder
      newUploadingIndices.push(tempIdx);
      setImages([...newImages]);
      setUploadingIndices(prev => [...prev, tempIdx]);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await response.json();

        if (data.secure_url) {
          newImages[tempIdx] = data.secure_url;
          setImages([...newImages]);
          onUploadComplete(newImages.filter(url => url !== ""));
        }
      } catch (err) {
        console.error("Upload Error:", err);
        setError("Gagal mengunggah beberapa gambar.");
      } finally {
        setUploadingIndices(prev => prev.filter(idx => idx !== tempIdx));
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUploadComplete(newImages);
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-surface group">
            {url ? (
              <>
                <Image src={url} alt={`Gallery ${index}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeImage(index)}
                    className="rounded-full h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface/80">
                <Loader2 className="w-6 h-6 text-primary-gold animate-spin" />
                <span className="text-[10px] text-gray-500 font-bold uppercase">Uploading</span>
              </div>
            )}
          </div>
        ))}
        
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-white/10 bg-surface/30 hover:bg-surface hover:border-primary-gold/50 transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-gold/10 transition-colors">
            <Plus className="w-5 h-5 text-gray-500 group-hover:text-primary-gold" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-400 uppercase tracking-widest">Tambah Foto</span>
        </button>
      </div>

      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        multiple
        className="hidden" 
      />
    </div>
  );
}
