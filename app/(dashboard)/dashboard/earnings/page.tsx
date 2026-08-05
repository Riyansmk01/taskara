"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import { MOCK_WALLET } from "@/lib/mock-data";
import { Wallet, ArrowDownRight, ArrowUpRight, Building2, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function EarningsPage() {
  const [availableBalance, setAvailableBalance] = useState(MOCK_WALLET.available_balance);
  const [withdrawnTotal, setWithdrawnTotal] = useState(MOCK_WALLET.withdrawn_balance);
  
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(500000);
  const [bankName, setBankName] = useState("BCA");
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [accountHolder, setAccountHolder] = useState("BUDI PRATAMA");
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount > availableBalance) return;

    setAvailableBalance(prev => prev - withdrawAmount);
    setWithdrawnTotal(prev => prev + withdrawAmount);
    setWithdrawSuccess(true);

    setTimeout(() => {
      setIsWithdrawModalOpen(false);
      setWithdrawSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Wallet & Penarikan Saldo</h1>
        <p className="text-xs text-text-muted mt-1">Kelola pendapatan dari proyek yang telah selesai dan lakukan penarikan ke rekening bank Anda.</p>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        <div className="rounded-3xl border border-primary/30 bg-surface-purple/40 p-6 shadow-xs">
          <span className="text-xs font-bold text-primary block">Saldo Siap Ditarik</span>
          <span className="font-extrabold text-3xl text-text-primary block mt-2">
            {formatRupiah(availableBalance)}
          </span>
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary-hover active:scale-95 transition"
          >
            <ArrowUpRight className="h-4 w-4" /> Ajukan Penarikan Saldo
          </button>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
          <span className="text-xs font-bold text-text-muted block">Dalam Penampungan Escrow</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-2">
            {formatRupiah(MOCK_WALLET.pending_balance)}
          </span>
          <p className="text-[11px] text-text-muted mt-3">Akan otomatis dicairkan saat Klien menyetujui milestone proyek.</p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
          <span className="text-xs font-bold text-text-muted block">Total Berhasil Ditarik</span>
          <span className="font-extrabold text-2xl text-text-primary block mt-2">
            {formatRupiah(withdrawnTotal)}
          </span>
          <p className="text-[11px] text-text-muted mt-3">Akumulasi pendapatan bersih selama bergabung di Taskara.</p>
        </div>

      </div>

      {/* Withdrawal Request Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-surface p-6 shadow-xl border border-border animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-text-primary">Tarik Saldo Ke Rekening Bank</h3>
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="rounded-xl p-1 text-text-muted hover:bg-surface-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {withdrawSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                <h4 className="font-bold text-base text-text-primary">Penarikan Saldo Berhasil Diinginkan!</h4>
                <p className="text-xs text-text-muted">Dana sejumlah {formatRupiah(withdrawAmount)} akan masuk ke rekening dalam 1x24 jam.</p>
              </div>
            ) : (
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">Nominal Penarikan (Rp)</label>
                  <input
                    type="number"
                    max={availableBalance}
                    min={50000}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    required
                    className="w-full rounded-2xl border border-border bg-surface px-3.5 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
                  />
                  <span className="text-[10px] text-text-muted block mt-1">Maksimal: {formatRupiah(availableBalance)}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">Pilih Bank Tujuan</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-3 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
                  >
                    <option value="BCA">Bank BCA</option>
                    <option value="Mandiri">Bank Mandiri</option>
                    <option value="BRI">Bank BRI</option>
                    <option value="BNI">Bank BNI</option>
                    <option value="GoPay">GoPay / OVO E-Wallet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">Nomor Rekening / HP</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-border bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-border bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-xs font-bold text-white shadow-xs hover:bg-primary-hover mt-2"
                >
                  Konfirmasi Penarikan
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
