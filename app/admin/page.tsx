import { formatRupiah } from "@/lib/utils";
import { Users, Briefcase, DollarSign, ShieldCheck, CheckCircle2, XCircle, UserCheck } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-2xl text-text-primary">Super Admin Dashboard</h1>
            <span className="rounded-pill bg-primary px-3 py-0.5 text-[10px] font-bold text-white uppercase">
              RBAC Active
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Sistem kontrol khusus pengguna: <strong className="text-primary">perdhanariyan@gmail.com</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-success-soft px-3.5 py-1.5 rounded-pill text-xs font-bold text-success border border-success/30">
          <ShieldCheck className="h-4 w-4" /> Hak Akses Super Admin Terverifikasi
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Total Pengguna Aktif</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-1">1,250 User</span>
          <span className="text-[11px] text-success font-semibold block mt-1">940 Mahasiswa • 310 UMKM</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Proyek Aktif Marketplace</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-1">142 Proyek</span>
          <span className="text-[11px] text-primary font-semibold block mt-1">89 In Progress</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Total Saldo Escrow</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-1">{formatRupiah(42500000)}</span>
          <span className="text-[11px] text-text-muted block mt-1">Ditahan di Rekening Bersama</span>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-xs">
          <span className="text-xs text-text-muted font-medium">Komisi Platform Fee</span>
          <span className="font-extrabold text-2xl text-primary block mt-1">{formatRupiah(8400000)}</span>
          <span className="text-[11px] text-success font-semibold block mt-1">Bulan Ini (6% - 10%)</span>
        </div>

      </div>

      {/* RBAC Role Allocation Overview */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-text-primary">Struktur Hak Akses Pengguna (RBAC Management)</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border p-4 bg-surface-soft space-y-1">
            <span className="text-xs font-bold text-text-primary block">Super Admin</span>
            <span className="text-[11px] text-primary font-bold block">perdhanariyan@gmail.com</span>
            <p className="text-[11px] text-text-muted pt-1">Akses Penuh: Moderasi, Transaksi, Keamanan, RBAC Settings.</p>
          </div>

          <div className="rounded-2xl border border-border p-4 bg-surface-soft space-y-1">
            <span className="text-xs font-bold text-text-primary block">Role Klien / Organization</span>
            <span className="text-[11px] text-text-secondary font-bold block">310 Akun Terdaftar</span>
            <p className="text-[11px] text-text-muted pt-1">Akses: Post Proyek, Review Candidate, Deposit Escrow.</p>
          </div>

          <div className="rounded-2xl border border-border p-4 bg-surface-soft space-y-1">
            <span className="text-xs font-bold text-text-primary block">Role Freelancer Mahasiswa</span>
            <span className="text-[11px] text-text-secondary font-bold block">940 Akun Terdaftar</span>
            <p className="text-[11px] text-text-muted pt-1">Akses: Send Proposals, Submit Deliverables, Withdraw Saldo.</p>
          </div>
        </div>
      </div>

      {/* Verification Table */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-text-primary">Verifikasi KTM Mahasiswa Pending</h3>

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
                    Setujui Verification
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
