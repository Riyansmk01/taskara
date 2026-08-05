import { formatRupiah } from "@/lib/utils";
import { Users, Briefcase, DollarSign, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Admin & Moderator Control Panel</h1>
        <p className="text-xs text-text-muted mt-1">Sistem pemantauan keamanan platform, verifikasi KTM mahasiswa, dan persetujuan penarikan bank.</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Total Pengguna</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-1">1,250 User</span>
          <span className="text-[11px] text-success font-semibold block mt-1">940 Mahasiswa</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Proyek Aktif</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-1">142 Proyek</span>
          <span className="text-[11px] text-primary font-semibold block mt-1">89 In Progress</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Dana Escrow Ditahan</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-1">{formatRupiah(42500000)}</span>
          <span className="text-[11px] text-text-muted block mt-1">Terlindungi Sistem</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Pendapatan Platform Fee</span>
          <span className="font-extrabold text-2xl text-primary block mt-1">{formatRupiah(8400000)}</span>
          <span className="text-[11px] text-success font-semibold block mt-1">Bulan Ini</span>
        </div>

      </div>

      {/* Pending Verifications Table */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-text-primary">Verifikasi Kartu Tanda Mahasiswa (KTM) Pending</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[10px]">
                <th className="py-2.5">Nama Mahasiswa</th>
                <th className="py-2.5">Kampus / Institusi</th>
                <th className="py-2.5">Jurusan</th>
                <th className="py-2.5">Tanggal Pengajuan</th>
                <th className="py-2.5 text-right">Aksi Moderasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              <tr>
                <td className="py-3 font-bold text-text-primary">Budi Pratama</td>
                <td className="py-3">Universitas Indonesia</td>
                <td className="py-3">Teknik Informatika</td>
                <td className="py-3 text-text-muted">05 Agt 2026</td>
                <td className="py-3 text-right">
                  <button className="rounded-xl bg-success px-3 py-1 text-[11px] font-bold text-white hover:opacity-90 mr-2">
                    Setujui
                  </button>
                  <button className="rounded-xl bg-danger-soft text-danger px-3 py-1 text-[11px] font-bold hover:bg-danger hover:text-white">
                    Tolak
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-text-primary">Siti Rahmawati</td>
                <td className="py-3">Institut Teknologi Bandung</td>
                <td className="py-3">Desain Komunikasi Visual</td>
                <td className="py-3 text-text-muted">04 Agt 2026</td>
                <td className="py-3 text-right">
                  <button className="rounded-xl bg-success px-3 py-1 text-[11px] font-bold text-white hover:opacity-90 mr-2">
                    Setujui
                  </button>
                  <button className="rounded-xl bg-danger-soft text-danger px-3 py-1 text-[11px] font-bold hover:bg-danger hover:text-white">
                    Tolak
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
