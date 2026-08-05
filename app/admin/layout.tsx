import Link from "next/link";
import { ShieldCheck, Users, Briefcase, DollarSign, AlertTriangle, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border bg-surface p-6 hidden md:block">
        <div className="flex items-center gap-2 font-bold text-lg text-text-primary mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span>Taskara Admin</span>
        </div>

        <nav className="space-y-1 text-xs font-semibold text-text-secondary">
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-surface-purple text-primary">
            <ShieldCheck className="h-4 w-4" /> Panel Overview
          </Link>
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-surface-soft">
            <Users className="h-4 w-4" /> Pengguna & Verifikasi Kampus
          </Link>
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-surface-soft">
            <Briefcase className="h-4 w-4" /> Moderasi Proyek
          </Link>
          <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-surface-soft">
            <DollarSign className="h-4 w-4" /> Transaksi & Penarikan Saldo
          </Link>
          
          <hr className="my-4 border-border" />
          
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-text-muted hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Marketplace
          </Link>
        </nav>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>

    </div>
  );
}
