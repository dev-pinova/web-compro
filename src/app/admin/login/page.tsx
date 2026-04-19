"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || "Email atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0C] flex items-center justify-center p-4">
      <div className="max-w-md w-full relative z-10 transition-all duration-500">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-gold rounded-2xl flex items-center justify-center text-surface font-bold text-2xl mx-auto mb-6 shadow-2xl">
            AJ
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Login</h1>
          <p className="text-gray-500">Silakan masuk untuk mengelola dashboard Anugrah Jaya Desain.</p>
        </div>

        <div className="bg-secondary-dark border border-white/5 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  type="email" 
                  placeholder="admin@ajd.id" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-12 bg-surface/50 border-white/10 focus:ring-primary-gold" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-12 bg-surface/50 border-white/10 focus:ring-primary-gold" 
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-primary-gold hover:bg-accent-gold text-surface font-bold rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Logging in..." : "Masuk Sekarang"}
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-600 text-sm italic">
          &copy; {new Date().getFullYear()} Anugrah Jaya Desain Team
        </p>
      </div>
    </div>
  );
}
