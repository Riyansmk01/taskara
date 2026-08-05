import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { FileCheck, ShieldCheck, ArrowRight } from "lucide-react";

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Kontrak Pekerjaan & Workspace</h1>
        <p className="text-xs text-text-muted mt-1">Daftar kontrak kerja sama aktif yang terlindungi dana escrow.</p>
      </div>

      <div className="rounded-3xl border border-primary/30 bg-surface-purple/30 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="rounded-pill bg-primary px-3 py-1 text-xs font-bold text-white uppercase">
            Kontrak Berjalan
          </span>
          <span className="font-extrabold text-base text-primary">{formatRupiah(750000)}</span>
        </div>

        <h3 className="font-bold text-base text-text-primary">
          Editing 5 Video Short/Reels Promosi Produk Fashion Distro
        </h3>
        <p className="text-xs text-text-muted">Klien: Agus Setiawan (Owner Distro Lokal)</p>

        <div className="flex items-center justify-between border-t border-border/60 pt-4">
          <span className="text-xs text-success font-semibold flex items-center gap-1">
            <ShieldCheck className="h-4 w-4" /> Escrow Terisi & Dilindungi
          </span>
          <Link
            href="/workspace/contract-demo"
            className="rounded-2xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary-hover transition"
          >
            Masuk Workspace & Chat Realtime →
          </Link>
        </div>
      </div>
    </div>
  );
}
