"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { isAdminEmail } from "@/lib/auth/rbac";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldCheck,
  Users,
  Briefcase,
  DollarSign,
  Lock,
  Mail,
  ArrowLeft,
  LogOut,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check active session email
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      const email = data.session?.user?.email;
      if (email && isAdminEmail(email)) {
        setIsAuthenticated(true);
      }
    }
    checkSession();
  }, [supabase]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsLoading(false);
      if (isAdminEmail(adminEmail)) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage("Akses Ditolak: Hanya perdhanariyan@gmail.com yang berhak mengakses Admin Panel ini.");
      }
    }, 800);
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setAdminEmail("");
    setAdminPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-soft p-4 selection:bg-primary-soft selection:text-primary">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="font-extrabold text-2xl text-text-primary">Portal Autentikasi Admin</h1>
            <p className="text-xs text-text-muted mt-1">Sistem Proteksi Khusus Super Admin (RBAC)</p>
          </div>

          {errorMessage && (
            <div className="rounded-2xl bg-danger-soft p-4 text-xs font-bold text-danger border border-danger/30 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">Email Super Admin</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
                <input
                  type="email"
                  placeholder="perdhanariyan@gmail.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">Password Admin</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-xs font-bold text-white shadow-xs hover:bg-primary-hover active:scale-95 disabled:opacity-70"
            >
              {isLoading ? "Verifikasi Hak Akses..." : "Masuk ke Control Panel"}
            </button>
          </form>

          <div className="text-center border-t border-border pt-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-primary">
              <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border bg-surface p-6 hidden md:block">
        <div className="flex items-center gap-2 font-bold text-base text-text-primary mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-sm block">Taskara Admin</span>
            <span className="text-[10px] font-semibold text-primary block truncate">perdhanariyan@gmail.com</span>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-semibold text-text-secondary">
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 bg-surface-purple text-primary">
            <ShieldCheck className="h-4 w-4" /> Overview Dashboard
          </Link>
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 hover:bg-surface-soft">
            <Users className="h-4 w-4" /> Pengguna & Kampus (RBAC)
          </Link>
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 hover:bg-surface-soft">
            <Briefcase className="h-4 w-4" /> Moderasi Proyek
          </Link>
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 hover:bg-surface-soft">
            <DollarSign className="h-4 w-4" /> Escrow & Penarikan Bank
          </Link>
          
          <hr className="my-4 border-border" />
          
          <button
            onClick={handleAdminLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-danger hover:bg-danger-soft text-xs font-semibold transition"
          >
            <LogOut className="h-4 w-4" /> Keluar dari Admin
          </button>
        </nav>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>

    </div>
  );
}
