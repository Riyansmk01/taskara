# Taskara — Fullstack Micro-Job Marketplace Platform

> **Dari kemampuan menjadi penghasilan.**  
> Platform micro-job khusus mahasiswa, fresh graduate, UMKM, organisasi kampus, dan bisnis lokal di Indonesia.

---

## 🚀 Stack Teknologi

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Storage, Realtime, RLS Policies)
- **Deployment**: Vercel (Frontend & BFF API), Cloudflare (DNS, WAF & CDN Security)
- **Integrasi**: Midtrans / Xendit Gateway (Escrow Payment Workflow Mock), Google OAuth

---

## 🛠️ Fitur Utama

1. **Sistem Marketplace Micro-Job**:
   - Pencarian & Filter Proyek (`/projects`) berdasarkan kategori, anggaran, deadline, dan spesifikasi skill.
   - Direktori Talenta Kampus (`/freelancers`) dengan verifikasi Kartu Tanda Mahasiswa (KTM).
2. **Sistem Pembayaran Escrow & Wallet**:
   - Penampungan dana otomatis sebelum proyek dimulai.
   - Pelepasan dana per milestone ke wallet freelancer & pengajuan penarikan saldo ke bank lokal (BCA, Mandiri, BRI, BNI, E-Wallet).
3. **Collaborative Project Workspace (`/workspace/[contractId]`)**:
   - Room Chat Realtime antara Klien dan Freelancer.
   - Milestone tracking interaktif dengan pengajuan output deliverables & persetujuan hasil.
4. **Admin & Moderasi Panel (`/admin`)**:
   - Pantau statistik pendapatan komisi platform (10%, 8%, 6%), moderasi proyek, dan verifikasi akun mahasiswa.

---

## 🗄️ Database Setup (Supabase)

Jalankan skrip migrasi dan seed yang tersedia pada direktori `/supabase`:

```bash
# Skrip DDL Tabel, RLS, & Trigger
supabase/migrations/20260805_init_taskara.sql

# Seed data Kampus & Kategori
supabase/seed.sql
```

---

## ⚡ Cara Menjalankan Lokal

```bash
# 1. Clone repository
git clone https://github.com/Riyansmk01/taskara.git
cd taskara

# 2. Install dependencies
npm install

# 3. Konfigurasi Environment Variables
cp .env.example .env.local

# 4. Jalankan Dev Server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.
