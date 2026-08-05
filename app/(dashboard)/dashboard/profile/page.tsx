"use client";

import { useState } from "react";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";
import { User, GraduationCap, MapPin, Plus, Trash2, CheckCircle2, ShieldCheck } from "lucide-react";

export default function FreelancerProfileManagerPage() {
  const [fullName, setFullName] = useState("Budi Pratama");
  const [bio, setBio] = useState(
    "Frontend Developer mahasiswa Teknik Informatika UI semester 6. Berpengalaman 2 tahun membuat web responsive dengan Next.js & Tailwind CSS."
  );
  const [hourlyRate, setHourlyRate] = useState(75000);
  const [institution, setInstitution] = useState("Universitas Indonesia");
  const [major, setMajor] = useState("Teknik Informatika");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h1 className="font-extrabold text-2xl text-text-primary">Profil & Portofolio Freelancer</h1>
        <p className="text-xs text-text-muted mt-1">Perbarui keahlian, tarif, dan informasi akademis Anda untuk menarik minat Klien UMKM.</p>
      </div>

      {savedSuccess && (
        <div className="rounded-2xl bg-success-soft p-4 text-xs font-bold text-success border border-success/30 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Perubahan profil berhasil disimpan di Supabase!
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text-primary">{fullName}</h4>
            <span className="text-xs text-success font-semibold flex items-center gap-1 mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Terverifikasi Kampus UI
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">Tarif Estimasi per Jam (Rp)</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              required
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">Perguruan Tinggi / Kampus</label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">Program Studi / Jurusan</label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-primary mb-1">Biografi & Pengalaman Singkat</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="w-full rounded-2xl border border-border bg-surface px-4 py-2 text-xs text-text-primary focus:border-primary focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary-hover transition"
        >
          Simpan Perubahan Profil
        </button>

      </form>

    </div>
  );
}
