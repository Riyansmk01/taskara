import Link from "next/link";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { FreelancerCard } from "@/components/shared/FreelancerCard";
import { MOCK_CATEGORIES, MOCK_PROJECTS, MOCK_FREELANCERS } from "@/lib/mock-data";
import {
  Briefcase,
  Search,
  PlusCircle,
  ShieldCheck,
  Zap,
  Users,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_20%,#F3EFFF_0%,transparent_100%)]" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          
          {/* Main Headline */}
          <h1 className="mx-auto max-w-4xl font-extrabold text-4xl text-text-primary sm:text-5xl md:text-6xl tracking-tight leading-[1.15]">
            Temukan proyek. Bangun portofolio.{" "}
            <span className="bg-gradient-to-r from-primary via-primary-hover to-secondary bg-clip-text text-transparent">
              Dapatkan penghasilan.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-text-secondary md:text-lg leading-relaxed">
            Taskara menghubungkan mahasiswa dan freelancer muda dengan UMKM serta bisnis lokal yang membutuhkan bantuan cepat untuk proyek digital dan operasional nyata.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-primary-hover active:scale-95 sm:w-auto"
            >
              <Search className="h-5 w-5" /> Cari Proyek Pekerjaan
            </Link>

            <Link
              href="/client/projects/new"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-7 py-3.5 text-base font-bold text-text-primary shadow-xs transition hover:border-primary/40 hover:bg-surface-soft active:scale-95 sm:w-auto"
            >
              <PlusCircle className="h-5 w-5 text-primary" /> Posting Pekerjaan Baru
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-success" /> Garansi Pembayaran Escrow
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-primary" /> Talenta Terverifikasi Kampus
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-warning" /> Proses Instan & Transparan
            </span>
          </div>

        </div>
      </section>

      {/* TRUST METRICS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-surface p-6 shadow-xs sm:grid-cols-4 md:p-8">
          <div className="text-center border-r border-border/60 last:border-r-0">
            <span className="font-extrabold text-2xl text-primary md:text-3xl">1,250+</span>
            <span className="block text-xs font-medium text-text-muted mt-1">Mahasiswa & Freelancer</span>
          </div>
          <div className="text-center border-r border-border/60 last:border-r-0">
            <span className="font-extrabold text-2xl text-primary md:text-3xl">3,400+</span>
            <span className="block text-xs font-medium text-text-muted mt-1">Proyek Selesai</span>
          </div>
          <div className="text-center border-r border-border/60 last:border-r-0">
            <span className="font-extrabold text-2xl text-primary md:text-3xl">Rp 2.4M+</span>
            <span className="block text-xs font-medium text-text-muted mt-1">Total Saldo Dicairkan</span>
          </div>
          <div className="text-center">
            <span className="font-extrabold text-2xl text-primary md:text-3xl">4.9 / 5.0</span>
            <span className="block text-xs font-medium text-text-muted mt-1">Kepuasan Mitra UMKM</span>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-extrabold text-2xl text-text-primary">Kategori Proyek Populer</h2>
            <p className="text-xs text-text-muted mt-1">Pilih keahlian atau jenis pekerjaan yang Anda butuhkan</p>
          </div>
          <Link href="/categories" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/projects?category=${cat.slug}`}
              className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-4 text-center transition hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-purple/30 hover:shadow-sm"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary font-bold">
                {cat.name.charAt(0)}
              </div>
              <span className="font-bold text-xs text-text-primary line-clamp-1">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-extrabold text-2xl text-text-primary">Proyek Terbaru Siap Dikerjakan</h2>
            <p className="text-xs text-text-muted mt-1">Kirim penawaran sekarang dan dapatkan komisi pertama Anda</p>
          </div>
          <Link href="/projects" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Jelajahi Proyek <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOCK_PROJECTS.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface-soft py-16 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-extrabold text-3xl text-text-primary">Cara Kerja Taskara</h2>
            <p className="text-xs text-text-muted mt-2">Transparan, cepat, dan 100% terlindungi escrow</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            
            <div className="rounded-2xl bg-surface p-6 border border-border">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-text-primary">Posting Proyek</h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Klien membuat deskripsi pekerjaan, anggaran, dan memilih spesifikasi skill.
              </p>
            </div>

            <div className="rounded-2xl bg-surface p-6 border border-border">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-text-primary">Terima Proposal</h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Freelancer mahasiswa mengirimkan tawaran harga, estimasi durasi, dan portofolio.
              </p>
            </div>

            <div className="rounded-2xl bg-surface p-6 border border-border">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-text-primary">Pembayaran Escrow</h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Dana disimpan secara aman di rekening bersama Taskara sebelum pekerjaan dimulai.
              </p>
            </div>

            <div className="rounded-2xl bg-surface p-6 border border-border">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">
                4
              </div>
              <h3 className="font-bold text-sm text-text-primary">Penyelesaian & Pencairan</h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Setelah hasil disetujui, saldo otomatis ditambahkan ke wallet freelancer untuk ditarik.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED FREELANCERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-extrabold text-2xl text-text-primary">Talenta Mahasiswa Unggulan</h2>
            <p className="text-xs text-text-muted mt-1">Siap membantu bisnis Anda dengan hasil berkualitas</p>
          </div>
          <Link href="/freelancers" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Lihat Semua Talenta <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOCK_FREELANCERS.map((fl) => (
            <FreelancerCard key={fl.id} freelancer={fl} />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary-hover to-secondary p-8 md:p-12 text-white shadow-lg text-center">
          <h2 className="font-extrabold text-3xl md:text-4xl">
            Mulai dari proyek kecil. Bangun peluang yang lebih besar.
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl mx-auto">
            Gabung bersama ribuan mahasiswa & UMKM yang telah bertransaksi secara aman di Taskara.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register?role=freelancer"
              className="w-full sm:w-auto rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-sm hover:bg-surface-soft"
            >
              Mulai Sebagai Freelancer
            </Link>
            <Link
              href="/auth/register?role=client"
              className="w-full sm:w-auto rounded-2xl border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20"
            >
              Mulai Sebagai Klien UMKM
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
