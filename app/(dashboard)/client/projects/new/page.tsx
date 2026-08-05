"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_CATEGORIES } from "@/lib/mock-data";
import { PlusCircle, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(MOCK_CATEGORIES[0].id);
  const [description, setDescription] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [budgetType, setBudgetType] = useState<"fixed" | "hourly">("fixed");
  const [budgetMin, setBudgetMin] = useState(500000);
  const [budgetMax, setBudgetMax] = useState(1000000);
  const [deadline, setDeadline] = useState("2026-08-25");
  const [workMode, setWorkMode] = useState<"remote" | "onsite">("remote");
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      router.push("/client");
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      
      <Link href="/client" className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Client Panel
      </Link>

      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Posting Proyek Pekerjaan Baru</h1>
        <p className="text-xs text-text-muted mt-1">
          Lengkapi rincian brief untuk mendapatkan penawaran terbaik dari mahasiswa & freelancer berbakat.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Judul Pekerjaan / Proyek</label>
          <input
            type="text"
            placeholder="Contoh: Pembuatan Website Profil Usaha Kuliner Landing Page"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Kategori Utama</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
          >
            {MOCK_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Deskripsi & Rincian Tugas</label>
          <textarea
            rows={5}
            placeholder="Jelaskan kebutuhan usaha Anda, gaya visual, acuan referensi, dan ekspektasi hasil secara mendalam..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
          />
        </div>

        {/* Deliverables */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Output yang Diharapkan (Deliverables)</label>
          <textarea
            rows={3}
            placeholder="Contoh: 1. File Source Code React/Next.js, 2. Aset Gambar Figma, 3. Bantuan Deploy Vercel Gratis..."
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
          />
        </div>

        {/* Budget & Deadline */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">Anggaran Maksimal (Rp)</label>
            <input
              type="number"
              step={50000}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              required
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">Target Tenggat Waktu (Deadline)</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-xs text-text-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isPublishing}
            className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-primary-hover active:scale-95 disabled:opacity-70"
          >
            {isPublishing ? "Dipublikasikan..." : "Publikasikan Proyek Sekarang"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
