import Link from "next/link";
import { Briefcase, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface text-text-secondary text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-text-primary">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent font-extrabold">
                Taskara
              </span>
            </Link>
            <p className="text-text-muted text-xs leading-relaxed max-w-sm">
              Platform marketplace micro-job khusus mahasiswa, fresh graduate, UMKM, organisasi kampus, dan bisnis lokal di Indonesia. Dari kemampuan menjadi penghasilan.
            </p>
            <div className="flex items-center gap-2 text-xs text-success bg-success-soft px-3.5 py-1.5 rounded-pill w-fit font-bold">
              <ShieldCheck className="h-4 w-4" /> Transaksi Dilindungi Sistem Escrow Aman
            </div>
          </div>

          {/* Links Column 1: Produk */}
          <div className="space-y-3">
            <h4 className="font-bold text-text-primary text-xs uppercase tracking-wider">Produk & Layanan</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/projects" className="hover:text-primary transition">Cari Proyek Digital</Link></li>
              <li><Link href="/freelancers" className="hover:text-primary transition">Direktori Talenta Kampus</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition">Model Biaya & Escrow</Link></li>
              <li><Link href="/client/projects/new" className="hover:text-primary transition">Posting Proyek Prioritas</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Perusahaan */}
          <div className="space-y-3">
            <h4 className="font-bold text-text-primary text-xs uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/how-it-works" className="hover:text-primary transition">Cara Kerja Platform</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition">Portal Admin System</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Dukungan */}
          <div className="space-y-3">
            <h4 className="font-bold text-text-primary text-xs uppercase tracking-wider">Legal & Bantuan</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/pricing" className="hover:text-primary transition">Kebijakan Biaya</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition">Pusat Keamanan Escrow</Link></li>
            </ul>
          </div>

        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-text-muted font-medium">
          <p>© {new Date().getFullYear()} Taskara Inc. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="h-3.5 w-3.5 text-danger fill-danger" />
            <span>untuk Mahasiswa & UMKM Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
