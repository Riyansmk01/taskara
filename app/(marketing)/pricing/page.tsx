import Link from "next/link";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-3xl text-text-primary">Struktur Biaya & Layanan Platform</h1>
        <p className="text-xs text-text-muted mt-2 max-w-xl mx-auto">
          Tidak ada biaya pendaftaran awal. Taskara hanya mengenakan komisi layanan dinamis dari setiap proyek yang berhasil diselesaikan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
        
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs text-center space-y-4">
          <span className="inline-block rounded-pill bg-surface-purple px-3 py-1 text-xs font-semibold text-primary">
            Mikro Job (&lt; Rp500.000)
          </span>
          <div className="font-extrabold text-3xl text-text-primary">10%</div>
          <p className="text-xs text-text-muted">Biaya Layanan Platform</p>
          <p className="text-xs text-text-secondary leading-relaxed border-t border-border pt-4">
            Cocok untuk tugas cepat seperti entry data, desain poster sederhana, dan copywriting.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-primary bg-surface p-6 shadow-md text-center space-y-4 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-primary px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
            Paling Populer
          </span>
          <span className="inline-block rounded-pill bg-surface-purple px-3 py-1 text-xs font-semibold text-primary">
            Menengah (Rp500rb - Rp2jt)
          </span>
          <div className="font-extrabold text-3xl text-primary">8%</div>
          <p className="text-xs text-text-muted">Biaya Layanan Platform</p>
          <p className="text-xs text-text-secondary leading-relaxed border-t border-border pt-4">
            Ideal untuk proyek pembuatan landing page, editing video reels, dan UI/UX mobile design.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs text-center space-y-4">
          <span className="inline-block rounded-pill bg-surface-purple px-3 py-1 text-xs font-semibold text-primary">
            Proyek Besar (&gt; Rp2.000.000)
          </span>
          <div className="font-extrabold text-3xl text-text-primary">6%</div>
          <p className="text-xs text-text-muted">Biaya Layanan Platform</p>
          <p className="text-xs text-text-secondary leading-relaxed border-t border-border pt-4">
            Hemat lebih banyak komisi untuk proyek pengembangan aplikasi penuh dan sistem website kompleks.
          </p>
        </div>

      </div>
    </div>
  );
}
