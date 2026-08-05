import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import {
  LayoutDashboard,
  Briefcase,
  Send,
  FileCheck,
  Wallet,
  User,
  Settings,
  Bell,
  LogOut,
  PlusCircle
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 gap-8">
        
        {/* Dashboard Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <div className="sticky top-20 rounded-3xl border border-border bg-surface p-4 shadow-xs space-y-6">
            
            {/* User Short Info */}
            <div className="flex items-center gap-3 p-2 bg-surface-soft rounded-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">
                BP
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-text-primary truncate">Budi Pratama</h4>
                <span className="text-[10px] text-primary font-semibold block">Freelancer Mahasiswa</span>
              </div>
            </div>

            {/* Navigation Section: Main */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted">Menu Utama</span>
              
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-text-primary hover:bg-surface-purple hover:text-primary transition"
              >
                <LayoutDashboard className="h-4 w-4" /> Ringkasan (Overview)
              </Link>

              <Link
                href="/dashboard/proposals"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-purple hover:text-primary transition"
              >
                <Send className="h-4 w-4" /> Proposal Saya
              </Link>

              <Link
                href="/dashboard/contracts"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-purple hover:text-primary transition"
              >
                <FileCheck className="h-4 w-4" /> Kontrak & Workspace
              </Link>

              <Link
                href="/dashboard/earnings"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-purple hover:text-primary transition"
              >
                <Wallet className="h-4 w-4" /> Wallet & Penarikan
              </Link>
            </div>

            {/* Navigation Section: Client View Link */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted">Klien UMKM</span>
              
              <Link
                href="/client"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-purple hover:text-primary transition"
              >
                <Briefcase className="h-4 w-4 text-warning" /> Switch ke Client Panel
              </Link>

              <Link
                href="/client/projects/new"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-primary bg-surface-purple border border-primary/20 hover:bg-primary-soft transition"
              >
                <PlusCircle className="h-4 w-4" /> Post Proyek Baru
              </Link>
            </div>

            {/* Navigation Section: Settings */}
            <div className="space-y-1 border-t border-border pt-4">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-soft hover:text-text-primary transition"
              >
                <User className="h-4 w-4" /> Profil & Portofolio
              </Link>

              <Link
                href="/auth/login"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-danger hover:bg-danger-soft transition"
              >
                <LogOut className="h-4 w-4" /> Keluar (Logout)
              </Link>
            </div>

          </div>
        </aside>

        {/* Dashboard Main Viewport */}
        <main className="flex-1 min-w-0">{children}</main>

      </div>
    </div>
  );
}
