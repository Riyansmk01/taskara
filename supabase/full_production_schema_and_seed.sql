-- =====================================================================
-- TASKARA FULL PRODUCTION SCHEMA & SEED DATA (BULLETPROOF SUPABASE SQL)
-- =====================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Remove restrictive Foreign Key constraint on profiles if it exists from previous migration
alter table if exists public.profiles drop constraint if exists profiles_id_fkey;

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  full_name text not null,
  avatar_url text,
  bio text,
  role text not null check (role in ('freelancer', 'client', 'organization', 'moderator', 'admin')),
  phone text,
  city text,
  province text,
  country text default 'Indonesia',
  timezone text default 'Asia/Jakarta',
  is_verified boolean default false,
  is_active boolean default true,
  last_seen_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. INSTITUTIONS TABLE
create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  type text check (type in ('school', 'university', 'polytechnic', 'academy', 'other')),
  city text,
  province text,
  logo_url text,
  is_verified boolean default true,
  created_at timestamptz default now()
);

-- 3. FREELANCER PROFILES TABLE
create table if not exists public.freelancer_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  institution_id uuid references public.institutions(id) on delete set null,
  major text,
  graduation_year integer,
  experience_level text check (experience_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  hourly_rate numeric(14,2),
  availability_status text default 'available' check (availability_status in ('available', 'busy', 'unavailable')),
  response_time_minutes integer default 30,
  completion_rate numeric(5,2) default 98.50,
  total_earned numeric(16,2) default 0,
  total_completed_projects integer default 0,
  rating_average numeric(3,2) default 4.90,
  rating_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. CLIENT PROFILES TABLE
create table if not exists public.client_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  business_name text,
  business_type text,
  website_url text,
  description text,
  total_spent numeric(16,2) default 0,
  total_projects integer default 0,
  rating_average numeric(3,2) default 5.00,
  rating_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. CATEGORIES TABLE
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id),
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- 6. SKILLS TABLE
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  category_id uuid references public.categories(id) on delete set null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 7. PROJECTS TABLE
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  description text not null,
  deliverables text,
  budget_type text not null check (budget_type in ('fixed', 'hourly', 'milestone', 'negotiable')),
  budget_min numeric(14,2),
  budget_max numeric(14,2),
  currency text default 'IDR',
  experience_level text check (experience_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  deadline timestamptz,
  work_mode text check (work_mode in ('remote', 'onsite', 'hybrid')),
  location text,
  status text not null default 'published' check (status in ('draft', 'published', 'reviewing', 'assigned', 'in_progress', 'submitted', 'revision', 'completed', 'cancelled', 'disputed', 'archived')),
  proposal_count integer default 0,
  is_featured boolean default false,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. PROPOSALS TABLE
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  freelancer_id uuid not null references public.profiles(id) on delete cascade,
  cover_letter text not null,
  proposed_amount numeric(14,2) not null,
  estimated_days integer,
  status text default 'sent' check (status in ('sent', 'viewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn', 'expired')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 9. CONTRACTS TABLE
create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id),
  client_id uuid not null references public.profiles(id),
  freelancer_id uuid not null references public.profiles(id),
  proposal_id uuid references public.proposals(id),
  total_amount numeric(14,2) not null,
  platform_fee numeric(14,2) not null,
  freelancer_amount numeric(14,2) not null,
  currency text default 'IDR',
  start_date timestamptz default now(),
  end_date timestamptz,
  status text default 'active' check (status in ('pending_payment', 'active', 'submitted', 'completed', 'cancelled', 'disputed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. MILESTONES TABLE
create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts(id) on delete cascade,
  title text not null,
  description text,
  amount numeric(14,2) not null,
  due_at timestamptz,
  status text default 'pending' check (status in ('pending', 'funded', 'in_progress', 'submitted', 'revision_requested', 'approved', 'released', 'cancelled')),
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 11. WALLETS TABLE
create table if not exists public.wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  available_balance numeric(16,2) default 0,
  pending_balance numeric(16,2) default 0,
  withdrawn_balance numeric(16,2) default 0,
  currency text default 'IDR',
  updated_at timestamptz default now()
);

-- 12. WITHDRAWALS TABLE
create table if not exists public.withdrawals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  amount numeric(14,2) not null,
  fee numeric(14,2) default 0,
  net_amount numeric(14,2) not null,
  bank_name text not null,
  account_number_encrypted text not null,
  account_holder text not null,
  status text default 'completed' check (status in ('pending', 'processing', 'completed', 'rejected')),
  processed_at timestamptz default now(),
  created_at timestamptz default now()
);

-- RLS ENABLE
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.proposals enable row level security;
alter table public.contracts enable row level security;
alter table public.wallets enable row level security;

drop policy if exists "Public profiles read" on public.profiles;
drop policy if exists "Public projects read" on public.projects;

create policy "Public profiles read" on public.profiles for select using (true);
create policy "Public projects read" on public.projects for select using (true);

-- =====================================================================
-- REAL PRODUCTION SEED DATA
-- =====================================================================

-- SEED INSTITUTIONS
insert into public.institutions (id, name, slug, type, city, province, logo_url) values
  ('11111111-1111-1111-1111-111111111111', 'Universitas Indonesia', 'ui', 'university', 'Depok', 'Jawa Barat', 'https://api.dicebear.com/7.x/identicon/svg?seed=ui'),
  ('22222222-2222-2222-2222-222222222222', 'Institut Teknologi Bandung', 'itb', 'university', 'Bandung', 'Jawa Barat', 'https://api.dicebear.com/7.x/identicon/svg?seed=itb'),
  ('33333333-3333-3333-3333-333333333333', 'Universitas Gadjah Mada', 'ugm', 'university', 'Sleman', 'DI Yogyakarta', 'https://api.dicebear.com/7.x/identicon/svg?seed=ugm'),
  ('44444444-4444-4444-4444-444444444444', 'Institut Teknologi Sepuluh Nopember', 'its', 'polytechnic', 'Surabaya', 'Jawa Timur', 'https://api.dicebear.com/7.x/identicon/svg?seed=its')
on conflict (slug) do nothing;

-- SEED CATEGORIES
insert into public.categories (id, name, slug, description, icon, sort_order) values
  ('a1111111-1111-1111-1111-111111111111', 'Web Development', 'web-development', 'Pembuatan website, landing page, dan portal UMKM', 'Globe', 1),
  ('a2222222-2222-2222-2222-222222222222', 'UI/UX Design', 'ui-ux-design', 'Desain tampilan antarmuka, wireframe, dan prototype Figma', 'Figma', 2),
  ('a3333333-3333-3333-3333-333333333333', 'Graphic Design', 'graphic-design', 'Logo, branding kit, poster promo, dan feed Instagram', 'Palette', 3),
  ('a4444444-4444-4444-4444-444444444444', 'Video Editing', 'video-editing', 'Editing video TikTok, Reels, YouTube, dan event recap', 'Video', 4)
on conflict (slug) do nothing;

-- SEED SKILLS
insert into public.skills (id, name, slug, category_id) values
  ('b1111111-1111-1111-1111-111111111111', 'Next.js', 'nextjs', 'a1111111-1111-1111-1111-111111111111'),
  ('b2222222-2222-2222-2222-222222222222', 'Tailwind CSS', 'tailwindcss', 'a1111111-1111-1111-1111-111111111111'),
  ('b3333333-3333-3333-3333-333333333333', 'Figma Design', 'figma', 'a2222222-2222-2222-2222-222222222222'),
  ('b4444444-4444-4444-4444-444444444444', 'CapCut Pro / Premiere', 'video-editing', 'a4444444-4444-4444-4444-444444444444')
on conflict (slug) do nothing;

-- SEED PROFILES
insert into public.profiles (id, username, full_name, avatar_url, bio, role, city, province, is_verified) values
  ('c1111111-1111-1111-1111-111111111111', 'budi_dev', 'Budi Pratama', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250', 'Frontend Developer Next.js & Tailwind CSS UI semester 6. Berpengalaman mengerjakan 14+ proyek web UMKM.', 'freelancer', 'Depok', 'Jawa Barat', true),
  ('c2222222-2222-2222-2222-222222222222', 'siti_design', 'Siti Rahmawati', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250', 'UI/UX Designer ITB DKV. Spesialisasi dalam desain landing page dan aplikasi mobile kuliner.', 'freelancer', 'Bandung', 'Jawa Barat', true),
  ('c3333333-3333-3333-3333-333333333333', 'kopi_senja_bandung', 'Hendro Wijaya', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250', 'Pemilik Warung Kopi Senja UMKM Bandung.', 'client', 'Bandung', 'Jawa Barat', true)
on conflict (username) do nothing;

-- SEED FREELANCER DETAILS
insert into public.freelancer_profiles (user_id, institution_id, major, graduation_year, experience_level, hourly_rate, total_earned, total_completed_projects, rating_average, rating_count) values
  ('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Teknik Informatika', 2026, 'intermediate', 75000, 8400000, 14, 4.90, 14),
  ('c2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Desain Komunikasi Visual', 2025, 'advanced', 90000, 12500000, 21, 5.00, 21)
on conflict (user_id) do nothing;

-- SEED CLIENT DETAILS
insert into public.client_profiles (user_id, business_name, business_type, total_spent, total_projects, rating_average) values
  ('c3333333-3333-3333-3333-333333333333', 'Warung Kopi Senja Bandung', 'Kuliner & F&B', 4500000, 3, 5.00)
on conflict (user_id) do nothing;

-- SEED REAL PROJECTS
insert into public.projects (id, client_id, category_id, title, slug, description, deliverables, budget_type, budget_min, budget_max, work_mode, status, proposal_count, is_featured) values
  ('e1111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333', 'a1111111-1111-1111-1111-111111111111', 'Pembuatan Website Landing Page Profil Warkop UMKM Bandung', 'pembuatan-website-landing-page-profil-warkop-umkm-bandung', 'Dibutuhkan pembuatan website landing page responsive dan estetik untuk mempromosikan daftar menu kopi, lokasi cabang, dan fitur pemesanan WhatsApp online.', '1. Source code Next.js + Tailwind CSS, 2. Bantuan Deploy Vercel Gratis, 3. Integrasi tombol WA Order', 'fixed', 750000, 1200000, 'remote', 'published', 5, true),
  ('e2222222-2222-2222-2222-222222222222', 'c3333333-3333-3333-3333-333333333333', 'a4444444-4444-4444-4444-444444444444', 'Editing 5 Video Short / Reels Promosi Produk Distro Fashion', 'editing-5-video-reels-promosi-distro-fashion', 'Dibutuhkan editor video kreatif untuk memotong footage mentah, memberikan subtitle animasi dinamis, serta sound effect viral.', '5 File Video MP4 (1080x1920) Siap Upload IG Reels & TikTok', 'fixed', 500000, 750000, 'remote', 'in_progress', 6, false)
on conflict (slug) do nothing;

-- SEED WALLETS
insert into public.wallets (user_id, available_balance, pending_balance, withdrawn_balance) values
  ('c1111111-1111-1111-1111-111111111111', 1450000, 750000, 6200000),
  ('c2222222-2222-2222-2222-222222222222', 3200000, 1200000, 11300000)
on conflict (user_id) do nothing;

-- SEED WITHDRAWALS
insert into public.withdrawals (user_id, amount, fee, net_amount, bank_name, account_number_encrypted, account_holder, status) values
  ('c1111111-1111-1111-1111-111111111111', 1000000, 0, 1000000, 'Bank BCA', '1234567890', 'BUDI PRATAMA', 'completed'),
  ('c1111111-1111-1111-1111-111111111111', 500000, 0, 500000, 'GoPay E-Wallet', '081234567890', 'BUDI PRATAMA', 'completed')
on conflict do nothing;

-- =====================================================================
-- END OF FIXED SCHEMA & SEED
-- =====================================================================
