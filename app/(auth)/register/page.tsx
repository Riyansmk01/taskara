"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, Building2, Mail, Lock, UserCheck, ArrowRight } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const initialRole = searchParams.get("role") === "client" ? "client" : "freelancer";

  const [role, setRole] = useState<"freelancer" | "client">(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "client") {
        router.push("/client");
      } else {
        router.push("/dashboard");
      }
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      router.push(role === "client" ? "/client" : "/dashboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-extrabold text-2xl text-text-primary">Buat Akun Taskara</h1>
        <p className="text-xs text-text-muted mt-1">Pilih tipe pengguna dan mulai dalam 1 menit</p>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-surface-soft p-1.5 rounded-2xl border border-border">
        <button
          type="button"
          onClick={() => setRole("freelancer")}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition ${
            role === "freelancer"
              ? "bg-surface text-primary shadow-xs border border-border/60"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <User className="h-4 w-4" /> Freelancer Mahasiswa
        </button>

        <button
          type="button"
          onClick={() => setRole("client")}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition ${
            role === "client"
              ? "bg-surface text-primary shadow-xs border border-border/60"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <Building2 className="h-4 w-4" /> Klien UMKM / Bisnis
        </button>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface py-2.5 px-4 text-xs font-bold text-text-primary shadow-xs transition hover:border-primary/40 hover:bg-surface-soft active:scale-95"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Daftar dengan Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <hr className="w-full border-border" />
        <span className="absolute bg-surface px-3 text-[10px] uppercase font-bold text-text-muted">
          atau isi formulir
        </span>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Nama Lengkap</label>
          <div className="relative">
            <UserCheck className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Contoh: Budi Pratama"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Email Aktif</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
            <input
              type="email"
              placeholder="budi@student.ui.ac.id / bisnis@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
            <input
              type="password"
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-white shadow-xs transition hover:bg-primary-hover active:scale-95 disabled:opacity-70"
        >
          {isLoading ? "Mendaftarkan..." : "Daftar Akun Gratis"} <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="text-center text-xs text-text-muted pt-2 border-t border-border">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="font-bold text-primary hover:underline">
          Masuk Sekarang
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-xs text-text-muted">Memuat...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
