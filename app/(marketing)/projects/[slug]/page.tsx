"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { formatRupiah, formatDate } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowLeft,
  X
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = (params?.slug as string) || "proj-1";
  
  const project = MOCK_PROJECTS.find((p) => p.id === projectId) || MOCK_PROJECTS[0];

  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [proposedAmount, setProposedAmount] = useState(project.budget_max || project.budget_min || 500000);
  const [estimatedDays, setEstimatedDays] = useState(3);
  const [coverLetter, setCoverLetter] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setIsProposalModalOpen(false);
      setSubmittedSuccess(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      
      {/* Back Link */}
      <Link href="/projects" className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-primary mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Daftar Proyek
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        {/* Main Content (Left 2 cols) */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
            <span className="inline-block rounded-pill bg-surface-purple px-3 py-1 text-xs font-semibold text-primary mb-3">
              {project.category?.name}
            </span>

            <h1 className="font-extrabold text-2xl text-text-primary mb-4 leading-snug">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted border-y border-border/60 py-3 mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Diposting: {formatDate(project.published_at)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Deadline: {formatDate(project.deadline)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {project.work_mode === 'remote' ? 'Remote (Jarak Jauh)' : project.location}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-sm text-text-primary mb-2">Deskripsi Pekerjaan</h3>
                <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {project.deliverables && (
                <div>
                  <h3 className="font-bold text-sm text-text-primary mb-2">Output yang Diharapkan (Deliverables)</h3>
                  <div className="rounded-2xl bg-surface-soft p-4 text-xs text-text-secondary leading-relaxed whitespace-pre-line border border-border">
                    {project.deliverables}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-sm text-text-primary mb-2">Keahlian yang Dibutuhkan</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills?.map((s) => (
                    <span key={s.id} className="rounded-xl bg-surface-purple px-3 py-1 text-xs font-semibold text-primary">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Info & Action (Right 1 col) */}
        <div className="space-y-6">
          
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-6">
            <div>
              <span className="text-xs text-text-muted font-medium block">Anggaran Pekerjaan</span>
              <span className="font-extrabold text-2xl text-primary block mt-1">
                {formatRupiah(project.budget_max || project.budget_min)}
              </span>
              <span className="text-[11px] text-text-muted capitalize">
                Tipe: {project.budget_type} price
              </span>
            </div>

            <button
              onClick={() => setIsProposalModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-md hover:bg-primary-hover active:scale-95 transition"
            >
              <Send className="h-4 w-4" /> Kirim Penawaran / Proposal
            </button>

            <div className="border-t border-border pt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Total Proposal</span>
                <span className="font-bold text-text-primary">{project.proposal_count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Tingkat Pengalaman</span>
                <span className="font-bold text-text-primary capitalize">{project.experience_level}</span>
              </div>
            </div>
          </div>

          {/* Client Profile Card */}
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-text-muted mb-4">Informasi Klien</h4>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-purple text-primary font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-text-primary">{project.client?.full_name}</h5>
                <p className="text-xs text-text-muted">{project.client?.client_profile?.business_name}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Proposal Submission Modal */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-surface p-6 shadow-xl border border-border animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-text-primary">Kirim Proposal Penawaran</h3>
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="rounded-xl p-1 text-text-muted hover:bg-surface-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                <h4 className="font-bold text-base text-text-primary">Proposal Berhasil Terkirim!</h4>
                <p className="text-xs text-text-muted">Klien akan meninjau penawaran Anda dalam waktu 24 jam.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">
                    Harga Penawaran Anda (Rp)
                  </label>
                  <input
                    type="number"
                    value={proposedAmount}
                    onChange={(e) => setProposedAmount(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">
                    Estimasi Waktu Pengerjaan (Hari)
                  </label>
                  <input
                    type="number"
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-primary mb-1">
                    Pesan Pengantar / Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Jelaskan alasan mengapa Anda cocok mengerjakan proyek ini dan sertakan link portofolio relevan..."
                    required
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsProposalModalOpen(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-text-muted hover:bg-surface-soft"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-hover"
                  >
                    Kirim Sekarang
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
