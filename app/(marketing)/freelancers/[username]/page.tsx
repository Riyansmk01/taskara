import Image from "next/image";
import Link from "next/link";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";
import { Star, ShieldCheck, GraduationCap, MapPin, CheckCircle2, MessageSquare, Award, ExternalLink } from "lucide-react";

export default function FreelancerProfilePage({ params }: { params: { username: string } }) {
  const freelancer = MOCK_FREELANCERS.find((f) => f.username === params.username) || MOCK_FREELANCERS[0];
  const fp = freelancer.freelancer_profile;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      
      {/* Header Banner Card */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs mb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-border">
              <Image
                src={freelancer.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
                alt={freelancer.full_name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xl text-text-primary">{freelancer.full_name}</h1>
                {freelancer.is_verified && (
                  <span className="inline-flex items-center gap-1 rounded-pill bg-success-soft px-2.5 py-0.5 text-[11px] font-bold text-success">
                    <ShieldCheck className="h-3.5 w-3.5" /> Terverifikasi Kampus
                  </span>
                )}
              </div>

              <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                <GraduationCap className="h-4 w-4 text-primary" /> {fp.institution_name} • {fp.major} ({fp.graduation_year})
              </p>

              <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5" /> {freelancer.city}, {freelancer.province}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={`/workspace/contract-demo`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary-hover"
            >
              <MessageSquare className="h-4 w-4" /> Pekerjakan / Hubungi
            </Link>
            <span className="text-center text-[11px] text-text-muted">
              Tarif: {fp.hourly_rate ? `${formatRupiah(fp.hourly_rate)} / jam` : "Sesuai Proyek"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        {/* Left Column: Bio & Portfolio */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
            <h3 className="font-bold text-sm text-text-primary mb-3">Tentang Saya</h3>
            <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">
              {freelancer.bio}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs">
            <h3 className="font-bold text-sm text-text-primary mb-4">Portofolio Pekerjaan</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border p-4 bg-surface-soft">
                <h4 className="font-bold text-xs text-text-primary">Landing Page Toko Kuliner</h4>
                <p className="text-[11px] text-text-muted mt-1">Dibuat menggunakan Next.js & Tailwind CSS.</p>
              </div>
              <div className="rounded-2xl border border-border p-4 bg-surface-soft">
                <h4 className="font-bold text-xs text-text-primary">Aplikasi Kasir UMKM Figma UI</h4>
                <p className="text-[11px] text-text-muted mt-1">UI/UX Design prototype interaktif.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-text-muted mb-2">Statistik Reputasi</h3>
            
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-text-muted">Rating Rata-rata</span>
              <span className="font-bold text-text-primary flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {fp.rating_average.toFixed(1)} ({fp.rating_count})
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-text-muted">Proyek Selesai</span>
              <span className="font-bold text-text-primary">{fp.total_completed_projects} Proyek</span>
            </div>

            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-text-muted">Tingkat Penyelesaian</span>
              <span className="font-bold text-success">{fp.completion_rate}%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
