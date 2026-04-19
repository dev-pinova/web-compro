"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWA } from "./FloatingWA";

export function ConditionalLayout({ 
  children, 
  settings 
}: { 
  children: React.ReactNode, 
  settings: any 
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer settings={settings} />
      <FloatingWA phoneNumber={settings?.whatsapp} />
    </>
  );
}
