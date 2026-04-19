import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [settings] = await db.select().from(siteSettings).limit(1);
    return {
      title: settings?.siteName || "Anugrah Jaya Desain | Contractor & Architecture",
      description: settings?.siteDescription || "Biro Arsitektur & Kontraktor Bangunan Profesional.",
      keywords: settings?.keywords || "Arsitek, Kontraktor, Desain Rumah",
    };
  } catch (e) {
    return {
      title: "Anugrah Jaya Desain",
      description: "Biro Arsitektur & Kontraktor Bangunan Profesional.",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings;
  try {
    const [data] = await db.select().from(siteSettings).limit(1);
    settings = data;
  } catch (e) {
    settings = null;
  }

  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-surface text-gray-200 relative`}>
        <ConditionalLayout settings={settings}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
