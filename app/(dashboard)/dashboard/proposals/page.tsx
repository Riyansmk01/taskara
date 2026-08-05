import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { Send, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function ProposalsPage() {
  const proposals = [
    {
      id: "prop-1",
      projectTitle: "Pembuatan Website Landing Page Profil Warkop UMKM Bandung",
      clientName: "Hendro Wijaya (Warung Kopi Senja)",
      amount: 850000,
      days: 3,
      status: "shortlisted",
      date: "04 Agt 2026"
    },
    {
      id: "prop-2",
      projectTitle: "Desain Poster & Feeds Instagram Festival Kampus 2026",
      clientName: "Panitia Campus Fest UI 2026",
      amount: 600000,
      days: 2,
      status: "accepted",
      date: "02 Agt 2026"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Daftar Proposal Penawaran Anda</h1>
        <p className="text-xs text-text-muted mt-1">Pantau status penawaran yang telah Anda kirimkan ke Klien.</p>
      </div>

      <div className="space-y-4">
        {proposals.map((p) => (
          <div key={p.id} className="rounded-3xl border border-border bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={`rounded-pill px-3 py-0.5 text-[10px] font-bold uppercase ${
                  p.status === "accepted"
                    ? "bg-success-soft text-success"
                    : p.status === "shortlisted"
                    ? "bg-primary-soft text-primary"
                    : "bg-surface-soft text-text-muted"
                }`}
              >
                Status: {p.status}
              </span>
              <span className="text-xs text-text-muted">{p.date}</span>
            </div>

            <h3 className="font-bold text-sm text-text-primary">{p.projectTitle}</h3>
            <p className="text-xs text-text-muted">Klien: {p.clientName}</p>

            <div className="flex items-center justify-between border-t border-border/60 pt-3">
              <span className="font-extrabold text-sm text-primary">{formatRupiah(p.amount)}</span>
              <Link
                href="/workspace/contract-demo"
                className="rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover"
              >
                Lihat Workspace Proyek →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
