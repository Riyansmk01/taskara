import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { MOCK_WALLET, MOCK_PROJECTS } from "@/lib/mock-data";
import { Wallet, Send, FileCheck, Star, ArrowUpRight, Clock, PlusCircle } from "lucide-react";

export default function FreelancerDashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Dashboard Freelancer</h1>
        <p className="text-xs text-text-muted mt-1">Pantau penawaran, proyek aktif, dan pencairan saldo Anda.</p>
      </div>

      {/* Key Metric Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Saldo Tersedia</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-success-soft text-success">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <span className="font-extrabold text-xl text-text-primary block mt-2">
            {formatRupiah(MOCK_WALLET.available_balance)}
          </span>
          <Link href="/dashboard/earnings" className="text-[11px] font-bold text-primary hover:underline mt-2 inline-flex items-center gap-0.5">
            Tarik Saldo <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Dalam Escrow</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-warning-soft text-warning">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <span className="font-extrabold text-xl text-text-primary block mt-2">
            {formatRupiah(MOCK_WALLET.pending_balance)}
          </span>
          <span className="text-[11px] text-text-muted block mt-2">Proyek Berjalan</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Proposal Terkirim</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Send className="h-4 w-4" />
            </div>
          </div>
          <span className="font-extrabold text-xl text-text-primary block mt-2">4 Proposal</span>
          <span className="text-[11px] text-success block mt-2 font-medium">1 Menunggu Respon</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Rating Performa</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Star className="h-4 w-4 fill-amber-500" />
            </div>
          </div>
          <span className="font-extrabold text-xl text-text-primary block mt-2">4.9 / 5.0</span>
          <span className="text-[11px] text-text-muted block mt-2">14 Review Positif</span>
        </div>

      </div>

      {/* Active Workspaces & Recent Proposals */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* Active Contract Workspace */}
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-text-primary">Kontrak Aktif Saat Ini</h3>
            <Link href="/workspace/contract-demo" className="text-xs font-bold text-primary hover:underline">
              Buka Workspace
            </Link>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-surface-purple/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-pill bg-primary px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                Proyek Berjalan
              </span>
              <span className="text-xs font-bold text-primary">{formatRupiah(750000)}</span>
            </div>

            <h4 className="font-bold text-sm text-text-primary">
              Editing 5 Video Short/Reels Promosi Produk Fashion Distro
            </h4>

            <p className="text-xs text-text-muted">Klien: Agus Setiawan (Owner Distro Lokal)</p>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-text-muted">Deadline: 12 Agt 2026</span>
              <Link
                href="/workspace/contract-demo"
                className="rounded-xl bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-primary-hover"
              >
                Masuk Room Chat
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Proyek */}
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-text-primary">Rekomendasi Proyek Relevan</h3>
            <Link href="/projects" className="text-xs font-bold text-primary hover:underline">
              Cari Lainnya
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_PROJECTS.slice(0, 2).map((p) => (
              <div key={p.id} className="rounded-2xl border border-border p-3.5 hover:border-primary/40 transition">
                <h4 className="font-bold text-xs text-text-primary line-clamp-1">{p.title}</h4>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="font-bold text-primary">{formatRupiah(p.budget_max || p.budget_min)}</span>
                  <Link href={`/projects/${p.id}`} className="text-[11px] font-semibold text-text-secondary hover:text-primary">
                    Kirim Proposal →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
