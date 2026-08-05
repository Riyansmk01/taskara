export type UserRole = 'freelancer' | 'client' | 'organization' | 'moderator' | 'admin';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type BudgetType = 'fixed' | 'hourly' | 'milestone' | 'negotiable';

export type ProjectStatus = 
  | 'draft' 
  | 'published' 
  | 'reviewing' 
  | 'assigned' 
  | 'in_progress' 
  | 'submitted' 
  | 'revision' 
  | 'completed' 
  | 'cancelled' 
  | 'disputed' 
  | 'archived';

export type ProposalStatus = 
  | 'sent' 
  | 'viewed' 
  | 'shortlisted' 
  | 'accepted' 
  | 'rejected' 
  | 'withdrawn' 
  | 'expired';

export type ContractStatus = 
  | 'pending_payment' 
  | 'active' 
  | 'submitted' 
  | 'completed' 
  | 'cancelled' 
  | 'disputed';

export type MilestoneStatus = 
  | 'pending' 
  | 'funded' 
  | 'in_progress' 
  | 'submitted' 
  | 'revision_requested' 
  | 'approved' 
  | 'released' 
  | 'cancelled';

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  role: UserRole;
  phone?: string;
  city?: string;
  province?: string;
  country?: string;
  timezone?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface FreelancerProfile {
  user_id: string;
  institution_name?: string;
  major?: string;
  graduation_year?: number;
  experience_level?: ExperienceLevel;
  hourly_rate?: number;
  availability_status: 'available' | 'busy' | 'unavailable';
  completion_rate: number;
  total_earned: number;
  total_completed_projects: number;
  rating_average: number;
  rating_count: number;
}

export interface ClientProfile {
  user_id: string;
  business_name?: string;
  business_type?: string;
  website_url?: string;
  description?: string;
  total_spent: number;
  total_projects: number;
  rating_average: number;
  rating_count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category_id?: string;
}

export interface Project {
  id: string;
  client_id: string;
  client?: Profile & { client_profile?: ClientProfile };
  category_id?: string;
  category?: Category;
  title: string;
  slug: string;
  description: string;
  deliverables?: string;
  budget_type: BudgetType;
  budget_min?: number;
  budget_max?: number;
  currency: string;
  experience_level?: ExperienceLevel;
  deadline?: string;
  work_mode?: 'remote' | 'onsite' | 'hybrid';
  location?: string;
  status: ProjectStatus;
  proposal_count: number;
  is_featured: boolean;
  published_at?: string;
  created_at: string;
  skills?: Skill[];
}

export interface Proposal {
  id: string;
  project_id: string;
  freelancer_id: string;
  freelancer?: Profile & { freelancer_profile?: FreelancerProfile };
  cover_letter: string;
  proposed_amount: number;
  estimated_days?: number;
  status: ProposalStatus;
  created_at: string;
}

export interface Contract {
  id: string;
  project_id: string;
  project?: Project;
  client_id: string;
  client?: Profile;
  freelancer_id: string;
  freelancer?: Profile;
  total_amount: number;
  platform_fee: number;
  freelancer_amount: number;
  status: ContractStatus;
  start_date?: string;
  end_date?: string;
  created_at: string;
}

export interface Milestone {
  id: string;
  contract_id: string;
  title: string;
  description?: string;
  amount: number;
  due_at?: string;
  status: MilestoneStatus;
  order_index: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender?: Profile;
  message_type: 'text' | 'file' | 'system';
  content: string;
  created_at: string;
}

export interface Wallet {
  user_id: string;
  available_balance: number;
  pending_balance: number;
  withdrawn_balance: number;
  currency: string;
}
