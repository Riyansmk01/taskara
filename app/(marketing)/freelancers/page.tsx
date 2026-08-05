"use client";

import { useState } from "react";
import { FreelancerCard } from "@/components/shared/FreelancerCard";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { Search, UserCheck } from "lucide-react";

export default function FreelancersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFreelancers = MOCK_FREELANCERS.filter((f) => {
    return (
      f.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.freelancer_profile.institution_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-extrabold text-3xl text-text-primary">Direktori Talenta Kampus</h1>
        <p className="text-xs text-text-muted mt-1">
          Temukan mahasiswa dan freelancer berbakat untuk mengerjakan proyek digital bisnis Anda.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
        <input
          type="text"
          placeholder="Cari nama freelancer, kampus, jurusan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none shadow-xs"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {filteredFreelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>

    </div>
  );
}
