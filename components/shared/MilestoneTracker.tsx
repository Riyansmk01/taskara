"use client";

import { Milestone } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { CheckCircle2, Clock, ShieldAlert, ArrowRight, Upload, Lock } from "lucide-react";

interface MilestoneTrackerProps {
  milestones: Milestone[];
  userRole?: 'freelancer' | 'client' | 'admin';
  onAction?: (milestoneId: string, action: string) => void;
}

export function MilestoneTracker({ milestones, userRole = 'freelancer', onAction }: MilestoneTrackerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-text-primary">Tahapan Pekerjaan (Milestones)</h4>
        <span className="text-xs text-text-muted">
          {milestones.filter(m => m.status === 'released' || m.status === 'approved').length} dari {milestones.length} Selesai
        </span>
      </div>

      <div className="space-y-3">
        {milestones.map((m, index) => {
          const isCompleted = m.status === 'released' || m.status === 'approved';
          const isSubmitted = m.status === 'submitted';
          const isFunded = m.status === 'funded' || m.status === 'in_progress';

          return (
            <div
              key={m.id}
              className={`rounded-2xl border p-4 transition-all ${
                isCompleted
                  ? "border-success/30 bg-success-soft/40"
                  : isSubmitted
                  ? "border-warning/30 bg-warning-soft/40"
                  : isFunded
                  ? "border-primary/30 bg-surface-purple/30"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${
                      isCompleted
                        ? "bg-success text-white"
                        : isSubmitted
                        ? "bg-warning text-white"
                        : isFunded
                        ? "bg-primary text-white"
                        : "bg-surface-soft text-text-muted border border-border"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                  </div>

                  <div>
                    <h5 className="font-bold text-sm text-text-primary">{m.title}</h5>
                    {m.description && (
                      <p className="text-xs text-text-secondary mt-0.5">{m.description}</p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-bold text-primary">
                        {formatRupiah(m.amount)}
                      </span>

                      <span
                        className={`rounded-pill px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          isCompleted
                            ? "bg-success-soft text-success"
                            : isSubmitted
                            ? "bg-warning-soft text-warning"
                            : isFunded
                            ? "bg-primary-soft text-primary"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions per role */}
                <div className="flex items-center gap-2">
                  {userRole === 'freelancer' && isFunded && (
                    <button
                      onClick={() => onAction && onAction(m.id, 'submit')}
                      className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover"
                    >
                      <Upload className="h-3.5 w-3.5" /> Kirim Hasil
                    </button>
                  )}

                  {userRole === 'client' && isSubmitted && (
                    <button
                      onClick={() => onAction && onAction(m.id, 'approve')}
                      className="flex items-center gap-1.5 rounded-xl bg-success px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Setujui & Cairkan
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
