import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { PlusCircle, Briefcase, Users, FileCheck, DollarSign, ArrowRight } from "lucide-react";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="font-extrabold text-2xl text-text-primary">Dashboard Klien UMKM</h1>
          <p className="text-xs text-text-muted mt-1">Kelola proyek yang diposting dan pilih kandidat mahasiswa terbaik.</p>
        </div>

        <Link
          href="/client/projects/new"
          className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-primary-hover active:scale-95 transition"
        >
          <PlusCircle className="h-4 w-4" /> Posting Pekerjaan Baru
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs font-semibold text-text-muted">Total Proyek Diposting</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-2">3 Proyek</span>
          <span className="text-[11px] text-primary font-semibold block mt-1">1 Menunggu Proposal</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs font-semibold text-text-muted">Proposal Diterima</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-2">19 Proposal</span>
          <span className="text-[11px] text-success font-semibold block mt-1">Siap Ditinjau</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs font-semibold text-text-muted">Total Pengeluaran Proyek</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-2">{formatRupiah(4500000)}</span>
          <span className="text-[11px] text-text-muted block mt-1">Terlindungi Escrow</span>
        </div>

      </div>

      {/* Posted Projects List */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-text-primary">Daftar Proyek Anda</h3>

        <div className="space-y-4">
          {MOCK_PROJECTS.map((p) => (
            <div key={p.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-border p-4 hover:border-primary/40 transition">
              <div>
                <span className="rounded-pill bg-surface-purple px-2.5 py-0.5 text-[10px] font-bold text-primary">
                  {p.category?.name}
                </span>
                <h4 className="font-bold text-sm text-text-primary mt-1">{p.title}</h4>
                <p className="text-xs text-text-muted mt-0.5">
                  Anggaran: {formatRupiah(p.budget_max || p.budget_min)} • Proposal: {p.proposal_count} orang
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/projects/${p.id}`}
                  className="rounded-xl border border-border px-3.5 py-1.5 text-xs font-semibold text-text-primary hover:bg-surface-soft"
                >
                  Lihat Detail
                </Link>
                <Link
                  href={`/workspace/contract-demo`}
                  className="rounded-xl bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                >
                  Tinjau Candidates ({p.proposal_count})
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
