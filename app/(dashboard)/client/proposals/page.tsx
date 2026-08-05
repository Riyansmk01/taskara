"use client";

import { useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { CheckCircle2, XCircle, Star, GraduationCap } from "lucide-react";

export default function ClientProposalsReviewPage() {
  const [acceptedId, setAcceptedId] = useState<string | null>(null);

  const candidates = [
    {
      id: "candidate-1",
      freelancer: MOCK_FREELANCERS[0],
      proposedAmount: 850000,
      estimatedDays: 3,
      coverLetter: "Halo Pak! Saya mahasiswa Teknik Informatika UI semester 6. Sudah berpengalaman membuat 14+ landing page UMKM responsive."
    },
    {
      id: "candidate-2",
      freelancer: MOCK_FREELANCERS[1],
      proposedAmount: 950000,
      estimatedDays: 2,
      coverLetter: "Halo! Saya UI/UX & Web Designer dari ITB DKV. Siap mendesain dan mendeploy landing page warkop hingga siap order WA."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Review Proposal Kandidat Mahasiswa</h1>
        <p className="text-xs text-text-muted mt-1">Pilih freelancer terbaik untuk mengerjakan proyek bisnis Anda.</p>
      </div>

      <div className="space-y-4">
        {candidates.map((c) => {
          const isAccepted = acceptedId === c.id;
          const fl = c.freelancer;
          const fp = fl.freelancer_profile;

          return (
            <div key={c.id} className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">
                    {fl.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-primary">{fl.full_name}</h3>
                    <p className="text-xs text-text-muted flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 text-primary" /> {fp.institution_name} • Rating {fp.rating_average.toFixed(1)}
                    </p>
                  </div>
                </div>

                <span className="font-extrabold text-base text-primary">
                  {formatRupiah(c.proposedAmount)}
                </span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed bg-surface-soft p-4 rounded-2xl border border-border">
                &ldquo;{c.coverLetter}&rdquo;
              </p>

              <div className="flex items-center justify-between border-t border-border/60 pt-4">
                <span className="text-xs text-text-muted">Estimasi: {c.estimatedDays} Hari Kerja</span>

                {isAccepted ? (
                  <span className="rounded-xl bg-success-soft text-success px-4 py-2 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Proposal Diterima! Membuka Escrow...
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAcceptedId(c.id)}
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-hover"
                    >
                      Terima & Kerjakan
                    </button>
                    <Link
                      href={`/workspace/contract-demo`}
                      className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-text-primary hover:bg-surface-soft"
                    >
                      Chat Kandidat
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
