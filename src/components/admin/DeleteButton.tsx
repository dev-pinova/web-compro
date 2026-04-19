"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  className?: string;
}

export function DeleteButton({ id, onDelete, className }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClick = async () => {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000); // Reset confirm after 3s
      return;
    }

    setIsDeleting(true);
    try {
      const result = await onDelete(id);
      if (!result.success) {
        alert(result.error);
        setConfirm(false);
      }
    } catch (err) {
      alert("Error occurred during deletion.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDeleting}
      className={cn(
        "p-2 rounded-lg transition-all flex items-center justify-center gap-2",
        confirm 
          ? "bg-red-500 text-white px-3 text-xs font-bold" 
          : "text-gray-500 hover:text-red-500 hover:bg-red-500/10",
        className
      )}
      title={confirm ? "Click again to confirm" : "Delete"}
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <Trash2 className="w-4 h-4" />
          {confirm && "Confirm?"}
        </>
      )}
    </button>
  );
}
