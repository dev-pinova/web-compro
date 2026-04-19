"use server";

import { db } from "./db";
import { inquiry, portfolio, post, siteSettings } from "./db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateSettings(data: any) {
  try {
    const values = {
      siteName: data.siteName || "Anugrah Jaya Desain",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      whatsapp: data.whatsapp || "",
      siteDescription: data.siteDescription || "",
      keywords: data.keywords || "",
      ogImage: data.ogImage || "",
      instagram: data.instagram || "",
      facebook: data.facebook || "",
      tiktok: data.tiktok || "",
      youtube: data.youtube || "",
      linkedin: data.linkedin || "",
      updatedAt: Date.now(),
    };

    await db
      .insert(siteSettings)
      .values({ id: "global", ...values })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: values,
      });

    revalidatePath("/admin/settings");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("Update Settings Error Details:", error);
    return { success: false, error: `Gagal memperbarui pengaturan: ${error.message || "Kesalahan Server"}` };
  }
}

// --- Inquiries ---
export async function deleteInquiry(id: string) {
  try {
    await db.delete(inquiry).where(eq(inquiry.id, id));
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete Inquiry Error:", error);
    return { success: false, error: "Gagal menghapus data." };
  }
}

// --- Portfolio ---
export async function deleteProject(id: string) {
  try {
    await db.delete(portfolio).where(eq(portfolio.id, id));
    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Delete Project Error:", error);
    return { success: false, error: "Gagal menghapus proyek." };
  }
}

// --- Blog ---
export async function deletePost(id: string) {
  try {
    await db.delete(post).where(eq(post.id, id));
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Delete Post Error:", error);
    return { success: false, error: "Gagal menghapus artikel." };
  }
}

export async function createPost(data: any) {
  try {
    await db.insert(post).values({
      ...data,
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, error: "Gagal membuat artikel." };
  }
}

export async function updatePost(id: string, data: any) {
  try {
    await db.update(post).set({
      ...data,
      updatedAt: Date.now(),
    }).where(eq(post.id, id));
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Update Post Error:", error);
    return { success: false, error: "Gagal memperbarui artikel." };
  }
}

export async function createProject(data: any) {
  try {
    await db.insert(portfolio).values(data);
    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { success: false, error: "Gagal menambah proyek." };
  }
}

export async function updateProject(id: string, data: any) {
  try {
    await db.update(portfolio).set({
      ...data,
      updatedAt: Date.now(),
    }).where(eq(portfolio.id, id));
    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Update Project Error:", error);
    return { success: false, error: "Gagal memperbarui proyek." };
  }
}
