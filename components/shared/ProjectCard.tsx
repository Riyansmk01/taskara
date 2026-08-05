import Link from "next/link";
import { Project } from "@/types";
import { formatRupiah, formatDate } from "@/lib/utils";
import { Clock, MapPin, Sparkles, Send, Award } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded-pill bg-surface-purple px-2.5 py-1 text-xs font-semibold text-primary">
            {project.category?.name || "Mikro Proyek"}
          </span>

          {project.is_featured && (
            <span className="inline-flex items-center gap-1 rounded-pill bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
              <Sparkles className="h-3 w-3 fill-amber-500 text-amber-500" /> Prioritas
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/projects/${project.id}`}>
          <h3 className="font-bold text-base text-text-primary group-hover:text-primary transition line-clamp-2 mb-2">
            {project.title}
          </h3>
        </Link>

        {/* Description preview */}
        <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Required Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.map((skill) => (
              <span
                key={skill.id || skill.name}
                className="rounded-lg bg-surface-soft border border-border/60 px-2 py-0.5 text-[11px] font-medium text-text-secondary"
              >
                {skill.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Budget */}
      <div className="border-t border-border/60 pt-3 mt-2 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-text-muted block">Anggaran Proyek</span>
          <span className="font-bold text-sm text-primary">
            {formatRupiah(project.budget_max || project.budget_min)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-text-muted flex items-center gap-1">
            <Send className="h-3 w-3" /> {project.proposal_count} proposal
          </span>
          <Link
            href={`/projects/${project.id}`}
            className="rounded-xl bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
