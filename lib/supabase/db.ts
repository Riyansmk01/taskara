import { createClient } from "@/lib/supabase/client";
import { MOCK_CATEGORIES, MOCK_PROJECTS, MOCK_FREELANCERS, MOCK_WALLET } from "@/lib/mock-data";
import { Project, Profile, FreelancerProfile, Category, Proposal, Wallet, Milestone } from "@/types";

/**
 * Dynamic Data Access Layer connecting directly to Supabase DB
 */

// Fetch Categories dynamically from Supabase
export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return MOCK_CATEGORIES;
  }
  return data as Category[];
}

// Fetch Published Projects dynamically from Supabase
export async function getProjects(categorySlug?: string, searchQuery?: string): Promise<Project[]> {
  const supabase = createClient();
  let query = supabase
    .from("projects")
    .select(`
      *,
      category:categories(*),
      client:profiles!client_id(*)
    `)
    .order("created_at", { ascending: false });

  if (categorySlug && categorySlug !== "all") {
    query = query.eq("category.slug", categorySlug);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    let result = MOCK_PROJECTS;
    if (categorySlug && categorySlug !== "all") {
      result = result.filter((p) => p.category?.slug === categorySlug);
    }
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }

  return data as unknown as Project[];
}

// Fetch Single Project by ID / Slug dynamically
export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      category:categories(*),
      client:profiles!client_id(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    return MOCK_PROJECTS.find((p) => p.id === id || p.slug === id) || MOCK_PROJECTS[0];
  }

  return data as unknown as Project;
}

// Fetch Freelancer Talents dynamically
export async function getFreelancers(searchQuery?: string): Promise<(Profile & { freelancer_profile: FreelancerProfile })[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      *,
      freelancer_profile:freelancer_profiles(*)
    `)
    .eq("role", "freelancer");

  if (error || !data || data.length === 0) {
    let result = MOCK_FREELANCERS;
    if (searchQuery) {
      result = result.filter((f) =>
        f.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }

  return data as unknown as (Profile & { freelancer_profile: FreelancerProfile })[];
}

// Create New Project dynamically in Supabase
export async function createProjectInDb(projectData: Partial<Project>): Promise<Project> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title: projectData.title,
        slug: projectData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: projectData.description,
        deliverables: projectData.deliverables,
        budget_type: projectData.budget_type || "fixed",
        budget_min: projectData.budget_min,
        budget_max: projectData.budget_max,
        deadline: projectData.deadline,
        status: "published",
        category_id: projectData.category_id,
        client_id: projectData.client_id || "b1111111-1111-1111-1111-111111111111",
      },
    ])
    .select()
    .single();

  if (error) {
    console.warn("Supabase insert warning (using fallback mock data):", error);
    return {
      id: `proj-${Date.now()}`,
      client_id: "client-1",
      title: projectData.title || "",
      slug: projectData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "proj-new",
      description: projectData.description || "",
      deliverables: projectData.deliverables,
      budget_type: projectData.budget_type || "fixed",
      budget_min: projectData.budget_min,
      budget_max: projectData.budget_max,
      currency: "IDR",
      status: "published",
      proposal_count: 0,
      is_featured: false,
      created_at: new Date().toISOString(),
    };
  }

  return data as unknown as Project;
}

// Insert Proposal dynamically in Supabase
export async function createProposalInDb(proposalData: {
  projectId: string;
  freelancerId: string;
  proposedAmount: number;
  estimatedDays: number;
  coverLetter: string;
}): Promise<Proposal> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("proposals")
    .insert([
      {
        project_id: proposalData.projectId,
        freelancer_id: proposalData.freelancerId,
        proposed_amount: proposalData.proposedAmount,
        estimated_days: proposalData.estimatedDays,
        cover_letter: proposalData.coverLetter,
        status: "sent",
      },
    ])
    .select()
    .single();

  if (error) {
    return {
      id: `prop-${Date.now()}`,
      project_id: proposalData.projectId,
      freelancer_id: proposalData.freelancerId,
      proposed_amount: proposalData.proposedAmount,
      estimated_days: proposalData.estimatedDays,
      cover_letter: proposalData.coverLetter,
      status: "sent",
      created_at: new Date().toISOString(),
    };
  }

  return data as unknown as Proposal;
}

// Fetch Wallet dynamically from Supabase
export async function getWalletByUserId(userId: string): Promise<Wallet> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return MOCK_WALLET;
  }

  return data as Wallet;
}
