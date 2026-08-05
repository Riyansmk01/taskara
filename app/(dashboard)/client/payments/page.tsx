import { formatRupiah } from "@/lib/utils";
import { ShieldCheck, Receipt, Download } from "lucide-react";

export default function ClientPaymentsPage() {
  const transactions = [
    {
      id: "trx-101",
      projectTitle: "Editing 5 Video Short/Reels Promosi Produk Fashion Distro",
      amount: 750000,
      fee: 60000,
      status: "held_in_escrow",
      date: "03 Agt 2026",
      provider: "Midtrans VA BCA"
    },
    {
      id: "trx-100",
      projectTitle: "Desain Banner Promosi Menu Baru Kuliner",
      amount: 450000,
      fee: 45000,
      status: "released",
      date: "28 Jul 2026",
      provider: "QRIS / GoPay"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Riwayat Pembayaran & Escrow</h1>
        <p className="text-xs text-text-muted mt-1">Daftar invoice dan bukti penampungan dana proyek Anda.</p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-text-primary">Transaksi Terakhir</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-text-muted uppercase text-[10px]">
                <th className="py-2.5">ID Transaksi</th>
                <th className="py-2.5">Proyek</th>
                <th className="py-2.5">Metode</th>
                <th className="py-2.5">Total Nominal</th>
                <th className="py-2.5">Status Dana</th>
                <th className="py-2.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="py-3 font-bold text-text-primary">{t.id}</td>
                  <td className="py-3 line-clamp-1">{t.projectTitle}</td>
                  <td className="py-3 text-text-muted">{t.provider}</td>
                  <td className="py-3 font-bold text-primary">{formatRupiah(t.amount)}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-pill px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        t.status === "held_in_escrow"
                          ? "bg-warning-soft text-warning"
                          : "bg-success-soft text-success"
                      }`}
                    >
                      {t.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="rounded-xl border border-border px-3 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-soft inline-flex items-center gap-1">
                      <Download className="h-3 w-3" /> Unduh PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
