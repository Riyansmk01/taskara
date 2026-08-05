import Link from "next/link";
import { ShieldCheck, Lock, CheckCircle2, DollarSign } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-3xl text-text-primary">Cara Kerja & Keamanan Escrow Taskara</h1>
        <p className="text-xs text-text-muted mt-2 max-w-xl mx-auto">
          Taskara menjamin keamanan finansial bagi klien dan freelancer dengan sistem penampungan dana transparan (Escrow).
        </p>
      </div>

      <div className="space-y-8">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-lg text-primary flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" /> 1. Alur Pembayaran Escrow
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Sebelum pekerjaan dimulai, Klien menyetujui penawaran dan mentransfer anggaran ke rekening Escrow bersama Taskara. Dana TIDAK langsung dicairkan ke freelancer, melainkan ditahan hingga output pekerjaan disetujui.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-lg text-primary flex items-center gap-2">
            <Lock className="h-5 w-5" /> 2. Penyerahan Hasil & Revisi
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Freelancer mengunggah hasil pekerjaan di Project Workspace. Klien dapat memeriksa hasil, meminta revisi sesuai kesepakatan awal, atau menyetujui penyelesaian proyek.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-lg text-primary flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" /> 3. Pencairan Dana Instan (Release Fund)
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Setelah Klien menekan tombol &apos;Setujui Pekerjaan&apos;, dana Escrow dipotong komisi platform secara transparan dan langsung ditambahkan ke Saldo Wallet Freelancer yang dapat ditarik ke bank lokal manapun.
          </p>
        </div>
      </div>
    </div>
  );
}
