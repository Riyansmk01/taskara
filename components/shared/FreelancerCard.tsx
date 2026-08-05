import Link from "next/link";
import Image from "next/image";
import { Profile, FreelancerProfile } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Star, ShieldCheck, GraduationCap, MapPin, CheckCircle2 } from "lucide-react";

interface FreelancerCardProps {
  freelancer: Profile & { freelancer_profile: FreelancerProfile };
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const fp = freelancer.freelancer_profile;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md">
      <div>
        {/* Avatar & Header */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl border border-border">
            <Image
              src={freelancer.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
              alt={freelancer.full_name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-text-primary group-hover:text-primary transition truncate">
                {freelancer.full_name}
              </h3>
              {freelancer.is_verified && (
                <ShieldCheck className="h-4 w-4 text-primary fill-primary-soft flex-shrink-0" />
              )}
            </div>

            <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5 truncate">
              <GraduationCap className="h-3.5 w-3.5 text-text-muted" />
              {fp.institution_name || "Mahasiswa"}
            </p>
          </div>
        </div>

        {/* Rating & Stats */}
        <div className="flex items-center gap-3 mb-3 bg-surface-soft p-2.5 rounded-xl text-xs">
          <div className="flex items-center gap-1 font-bold text-text-primary">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{fp.rating_average.toFixed(1)}</span>
            <span className="font-normal text-text-muted">({fp.rating_count})</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1 text-text-secondary">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span>{fp.total_completed_projects} Proyek Selesai</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed mb-4">
          {freelancer.bio}
        </p>
      </div>

      {/* Hourly Rate & CTA */}
      <div className="border-t border-border/60 pt-3 mt-1 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-text-muted block">Tarif Estimasi</span>
          <span className="font-bold text-xs text-text-primary">
            {fp.hourly_rate ? `${formatRupiah(fp.hourly_rate)} / jam` : "Sesuai Proyek"}
          </span>
        </div>

        <Link
          href={`/freelancers/${freelancer.username}`}
          className="rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-primary-hover"
        >
          Lihat Profil
        </Link>
      </div>
    </div>
  );
}
