-- TASKARA SUPABASE INITIAL MIGRATION
-- Migration Version: 20260805_init_taskara

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 12.1 profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
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
  last_seen_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12.4 institutions
create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  type text check (type in ('school', 'university', 'polytechnic', 'academy', 'other')),
  city text,
  province text,
  logo_url text,
  is_verified boolean default false,
  created_at timestamptz default now()
);

-- 12.2 freelancer_profiles
create table if not exists public.freelancer_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  institution_id uuid references public.institutions(id) on delete set null,
  major text,
  graduation_year integer,
  experience_level text check (experience_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  hourly_rate numeric(14,2),
  availability_status text default 'available' check (availability_status in ('available', 'busy', 'unavailable')),
  response_time_minutes integer default 30,
  completion_rate numeric(5,2) default 100.0,
  total_earned numeric(16,2) default 0,
  total_completed_projects integer default 0,
  rating_average numeric(3,2) default 5.00,
  rating_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12.3 client_profiles
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

-- 12.5 categories
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

-- 12.6 skills
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  category_id uuid references public.categories(id) on delete set null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 12.7 user_skills
create table if not exists public.user_skills (
  user_id uuid references public.profiles(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  level text check (level in ('beginner', 'intermediate', 'advanced', 'expert')),
  years_experience numeric(4,1),
  is_primary boolean default false,
  primary key (user_id, skill_id)
);

-- 12.8 projects
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
  status text not null default 'draft' check (status in ('draft', 'published', 'reviewing', 'assigned', 'in_progress', 'submitted', 'revision', 'completed', 'cancelled', 'disputed', 'archived')),
  visibility text default 'public',
  max_freelancers integer default 1,
  proposal_count integer default 0,
  is_featured boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12.9 project_skills
create table if not exists public.project_skills (
  project_id uuid references public.projects(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  is_required boolean default true,
  primary key (project_id, skill_id)
);

-- 12.10 proposals
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  freelancer_id uuid not null references public.profiles(id) on delete cascade,
  cover_letter text not null,
  proposed_amount numeric(14,2) not null,
  estimated_days integer,
  status text default 'sent' check (status in ('sent', 'viewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn', 'expired')),
  viewed_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(project_id, freelancer_id)
);

-- 12.11 contracts
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
  status text default 'pending_payment' check (status in ('pending_payment', 'active', 'submitted', 'completed', 'cancelled', 'disputed')),
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12.12 milestones
create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts(id) on delete cascade,
  title text not null,
  description text,
  amount numeric(14,2) not null,
  due_at timestamptz,
  status text default 'pending' check (status in ('pending', 'funded', 'in_progress', 'submitted', 'revision_requested', 'approved', 'released', 'cancelled')),
  order_index integer default 0,
  submitted_at timestamptz,
  approved_at timestamptz,
  released_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12.13 conversations
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid references public.contracts(id),
  project_id uuid references public.projects(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12.14 conversation_members
create table if not exists public.conversation_members (
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  last_read_at timestamptz,
  primary key (conversation_id, user_id)
);

-- 12.15 messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  message_type text default 'text' check (message_type in ('text', 'file', 'system')),
  content text,
  reply_to_id uuid references public.messages(id),
  is_edited boolean default false,
  edited_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz default now()
);

-- 12.16 attachments
create table if not exists public.attachments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id),
  entity_type text not null,
  entity_id uuid not null,
  file_name text not null,
  file_path text not null,
  mime_type text,
  file_size bigint,
  checksum text,
  created_at timestamptz default now()
);

-- 12.17 transactions
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  contract_id uuid references public.contracts(id),
  milestone_id uuid references public.milestones(id),
  type text not null check (type in ('escrow_deposit', 'milestone_release', 'platform_fee', 'withdrawal', 'refund')),
  provider text default 'midtrans',
  provider_reference text,
  amount numeric(14,2) not null,
  fee numeric(14,2) default 0,
  currency text default 'IDR',
  status text default 'pending' check (status in ('pending', 'paid', 'held', 'released', 'refunded', 'failed')),
  metadata jsonb default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12.18 wallets
create table if not exists public.wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  available_balance numeric(16,2) default 0,
  pending_balance numeric(16,2) default 0,
  withdrawn_balance numeric(16,2) default 0,
  currency text default 'IDR',
  updated_at timestamptz default now()
);

-- 12.19 wallet_ledger
create table if not exists public.wallet_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  transaction_id uuid references public.transactions(id),
  entry_type text not null check (entry_type in ('credit', 'debit')),
  amount numeric(14,2) not null,
  balance_after numeric(16,2) not null,
  description text,
  created_at timestamptz default now()
);

-- 12.20 withdrawals
create table if not exists public.withdrawals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  amount numeric(14,2) not null,
  fee numeric(14,2) default 0,
  net_amount numeric(14,2) not null,
  bank_name text not null,
  account_number_encrypted text not null,
  account_holder text not null,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'rejected')),
  processed_at timestamptz,
  created_at timestamptz default now()
);

-- 12.21 reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts(id),
  reviewer_id uuid not null references public.profiles(id),
  reviewee_id uuid not null references public.profiles(id),
  rating smallint not null check (rating between 1 and 5),
  quality_rating smallint check (quality_rating between 1 and 5),
  communication_rating smallint check (communication_rating between 1 and 5),
  timeliness_rating smallint check (timeliness_rating between 1 and 5),
  professionalism_rating smallint check (professionalism_rating between 1 and 5),
  comment text,
  is_public boolean default true,
  created_at timestamptz default now(),
  unique(contract_id, reviewer_id)
);

-- 12.22 notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  action_url text,
  data jsonb default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- 12.23 disputes
create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts(id),
  opened_by uuid not null references public.profiles(id),
  reason text not null,
  description text not null,
  status text default 'open' check (status in ('open', 'under_review', 'resolved', 'dismissed')),
  resolution text,
  resolved_by uuid references public.profiles(id),
  resolved_at timestamptz,
  created_at timestamptz default now()
);

-- 12.24 audit_logs
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz default now()
);

-- INDEXES FOR PERFORMANCE
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_category on public.projects(category_id);
create index if not exists idx_projects_published_at on public.projects(published_at desc);
create index if not exists idx_proposals_project on public.proposals(project_id);
create index if not exists idx_proposals_freelancer on public.proposals(freelancer_id);
create index if not exists idx_contracts_client on public.contracts(client_id);
create index if not exists idx_contracts_freelancer on public.contracts(freelancer_id);
create index if not exists idx_messages_conversation on public.messages(conversation_id);
create index if not exists idx_notifications_user on public.notifications(user_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.freelancer_profiles enable row level security;
alter table public.client_profiles enable row level security;
alter table public.projects enable row level security;
alter table public.proposals enable row level security;
alter table public.contracts enable row level security;
alter table public.milestones enable row level security;
alter table public.wallets enable row level security;
alter table public.messages enable row level security;

-- Profiles: Public can read active profiles, users can update own profile
create policy "Profiles readable by public" on public.profiles for select using (is_active = true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Projects: Public can read published projects, Clients can manage their own
create policy "Projects readable by public" on public.projects for select using (status != 'draft' or client_id = auth.uid());
create policy "Clients can insert projects" on public.projects for insert with check (auth.uid() = client_id);
create policy "Clients can update own projects" on public.projects for update using (auth.uid() = client_id);

-- Proposals: Freelancers see own proposals, Clients see proposals on their projects
create policy "Freelancers view own proposals" on public.proposals for select using (auth.uid() = freelancer_id);
create policy "Freelancers insert proposals" on public.proposals for insert with check (auth.uid() = freelancer_id);

-- Wallets: Only owner can view wallet
create policy "Users view own wallet" on public.wallets for select using (auth.uid() = user_id);

-- Trigger to create profile and wallet on auth signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, role, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'full_name', 'User Taskara'),
    coalesce(new.raw_user_meta_data->>'role', 'freelancer'),
    new.raw_user_meta_data->>'avatar_url'
  );

  insert into public.wallets (user_id, available_balance, pending_balance, withdrawn_balance)
  values (new.id, 0, 0, 0);

  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
