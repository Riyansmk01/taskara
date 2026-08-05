"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { MOCK_PROJECTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { Search, Filter, SlidersHorizontal, Briefcase } from "lucide-react";

export default function ProjectsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category?.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      
      {/* Page Title Header */}
      <div className="mb-8">
        <h1 className="font-extrabold text-3xl text-text-primary">Eksplorasi Proyek & Pekerjaan</h1>
        <p className="text-xs text-text-muted mt-1">
          Temukan mikro-proyek yang sesuai dengan keahlian Anda dan mulai hasilkan pendapatan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Cari judul proyek, skill, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-pill px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface border border-border text-text-secondary hover:border-primary/40"
            }`}
          >
            Semua Proyek
          </button>
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-pill px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.slug
                  ? "bg-primary text-white shadow-xs"
                  : "bg-surface border border-border text-text-secondary hover:border-primary/40"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-surface p-12 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-text-muted mb-3" />
          <h3 className="font-bold text-base text-text-primary">Tidak Ada Proyek Ditemukan</h3>
          <p className="text-xs text-text-muted mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian Anda atau pilih kategori lain.
          </p>
        </div>
      )}

    </div>
  );
}
