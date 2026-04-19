"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, FileText, MessageSquare, LogOut, Settings, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries" },
  { icon: ImageIcon, label: "Portfolio", href: "/admin/portfolio" },
  { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const { data: session, isPending } = authClient.useSession();
  const isLoginPage = pathname === "/admin/login";

  // 1. Initial Mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Auth Guard Redirect
  useEffect(() => {
    if (mounted && !isPending && !session && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [mounted, isPending, session, isLoginPage, router]);

  // Handle Hydration
  if (!mounted) return null;

  // Case: Login Page (Render directly without sidebar)
  if (isLoginPage) {
    return <div className="min-h-screen bg-[#0A0B0C]">{children}</div>;
  }

  // Case: Loading or Unauthorized
  if (isPending) {
    return (
      <div className="h-screen bg-[#0A0B0C] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-gold/20 border-t-primary-gold rounded-full animate-spin" />
      </div>
    );
  }

  // Only render dashboard if session exists
  if (!session) return null;

  return (
    <div className="flex h-screen bg-[#0A0B0C] text-gray-300 overflow-hidden relative">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-secondary-dark/50 flex flex-col shrink-0 z-50">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-gold rounded-lg flex items-center justify-center text-surface font-bold">AJ</div>
          <span className="font-bold text-white tracking-tight">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-primary-gold text-surface shadow-lg shadow-primary-gold/10" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
           <button 
             onClick={async () => {
               await authClient.signOut();
               router.replace("/admin/login");
             }} 
             className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
           >
              <LogOut className="w-4 h-4" /> 
              Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-0 bg-[#0A0B0C]">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-surface/50 backdrop-blur-xl sticky top-0 z-40">
           <h1 className="text-sm font-bold text-white uppercase tracking-widest">
              {menuItems.find(i => i.href === pathname)?.label || "Dashboard"}
           </h1>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-gold/10 border border-primary-gold/20 flex items-center justify-center text-primary-gold text-[10px] font-bold">
                AD
              </div>
           </div>
        </header>
        <div className="p-8 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
}
