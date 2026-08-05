import { Project, Profile, FreelancerProfile, ClientProfile, Proposal, Contract, Milestone, Category, Wallet } from "@/types";

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Web Development", slug: "web-development", description: "Landing page, portal UMKM, website profil", icon: "Globe", sort_order: 1 },
  { id: "cat-2", name: "UI/UX Design", slug: "ui-ux-design", description: "Design Figma, wireframe, mobile app design", icon: "Figma", sort_order: 2 },
  { id: "cat-3", name: "Graphic Design", slug: "graphic-design", description: "Logo, poster promo, brand identity", icon: "Palette", sort_order: 3 },
  { id: "cat-4", name: "Video Editing", slug: "video-editing", description: "Editing video TikTok, Reels, YouTube recap", icon: "Video", sort_order: 4 },
  { id: "cat-5", name: "Social Media", slug: "social-media", description: "Content planner, Instagram feed, admin sosmed", icon: "Share2", sort_order: 5 },
  { id: "cat-6", name: "Copywriting", slug: "copywriting", description: "Artikel SEO, naskah promosi, caption sosmed", icon: "FileText", sort_order: 6 },
  { id: "cat-7", name: "Data Entry", slug: "data-entry", description: "Rekap data Excel, inventaris toko, dokumen", icon: "Database", sort_order: 7 },
];

export const MOCK_FREELANCERS: (Profile & { freelancer_profile: FreelancerProfile })[] = [
  {
    id: "f-1",
    username: "budi_dev",
    full_name: "Budi Pratama",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    bio: "Frontend Developer mahasiswa Teknik Informatika UI semester 6. Berpengalaman 2 tahun membuat web responsive dengan Next.js & Tailwind CSS.",
    role: "freelancer",
    city: "Depok",
    province: "Jawa Barat",
    is_verified: true,
    is_active: true,
    created_at: "2025-09-01T00:00:00Z",
    freelancer_profile: {
      user_id: "f-1",
      institution_name: "Universitas Indonesia",
      major: "Teknik Informatika",
      graduation_year: 2026,
      experience_level: "intermediate",
      hourly_rate: 75000,
      availability_status: "available",
      completion_rate: 98,
      total_earned: 8400000,
      total_completed_projects: 14,
      rating_average: 4.9,
      rating_count: 14
    }
  },
  {
    id: "f-2",
    username: "siti_design",
    full_name: "Siti Rahmawati",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    bio: "UI/UX Designer & Graphic Artist dari ITB. Spesialisasi dalam desain aplikasi seluler dan branding UMKM kuliner.",
    role: "freelancer",
    city: "Bandung",
    province: "Jawa Barat",
    is_verified: true,
    is_active: true,
    created_at: "2025-10-15T00:00:00Z",
    freelancer_profile: {
      user_id: "f-2",
      institution_name: "Institut Teknologi Bandung",
      major: "Desain Komunikasi Visual",
      graduation_year: 2025,
      experience_level: "advanced",
      hourly_rate: 90000,
      availability_status: "available",
      completion_rate: 100,
      total_earned: 12500000,
      total_completed_projects: 21,
      rating_average: 5.0,
      rating_count: 21
    }
  },
  {
    id: "f-3",
    username: "rizky_video",
    full_name: "Rizky Ramadhan",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    bio: "Editor Video TikTok & Instagram Reels. Siap membantu UMKM membuat video jualan yang efisien dan estetik.",
    role: "freelancer",
    city: "Sleman",
    province: "DI Yogyakarta",
    is_verified: true,
    is_active: true,
    created_at: "2025-11-20T00:00:00Z",
    freelancer_profile: {
      user_id: "f-3",
      institution_name: "Universitas Gadjah Mada",
      major: "Ilmu Komunikasi",
      graduation_year: 2026,
      experience_level: "intermediate",
      hourly_rate: 60000,
      availability_status: "available",
      completion_rate: 95,
      total_earned: 5600000,
      total_completed_projects: 9,
      rating_average: 4.8,
      rating_count: 9
    }
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    client_id: "client-1",
    client: {
      id: "client-1",
      username: "kopi_kenangan_lokal",
      full_name: "Hendro Wijaya (Warung Kopi Senja)",
      role: "client",
      city: "Bandung",
      is_verified: true,
      is_active: true,
      created_at: "2025-08-10T00:00:00Z",
      client_profile: {
        user_id: "client-1",
        business_name: "Warung Kopi Senja UMKM",
        business_type: "Kuliner & Resto",
        total_spent: 4500000,
        total_projects: 3,
        rating_average: 5.0,
        rating_count: 3
      }
    },
    category_id: "cat-1",
    category: MOCK_CATEGORIES[0],
    title: "Pembuatan Web Profiles Landing Page untuk Warkop UMKM Bandung",
    slug: "pembuatan-web-landing-page-warkop-umkm",
    description: "Kami membutuhkan website landing page yang estetik dan cepat untuk mempromosikan menu baru, lokasi cabang, dan pemesanan WhatsApp online. Harus responsive di HP.",
    deliverables: "1. Landing page Next.js/React responsive\n2. Integrasi tombol pemesanan WhatsApp\n3. Source code GitHub & bantuan hosting gratis di Vercel",
    budget_type: "fixed",
    budget_min: 750000,
    budget_max: 1200000,
    currency: "IDR",
    experience_level: "intermediate",
    deadline: "2026-08-20T00:00:00Z",
    work_mode: "remote",
    location: "Bandung",
    status: "published",
    proposal_count: 5,
    is_featured: true,
    published_at: "2026-08-01T10:00:00Z",
    created_at: "2026-08-01T09:30:00Z",
    skills: [
      { id: "s-1", name: "Next.js", slug: "nextjs" },
      { id: "s-2", name: "Tailwind CSS", slug: "tailwindcss" }
    ]
  },
  {
    id: "proj-2",
    client_id: "client-2",
    client: {
      id: "client-2",
      username: "bem_ui_official",
      full_name: "Panitia Campus Fest UI 2026",
      role: "organization",
      city: "Depok",
      is_verified: true,
      is_active: true,
      created_at: "2025-05-12T00:00:00Z",
      client_profile: {
        user_id: "client-2",
        business_name: "Organisasi Mahasiswa UI",
        business_type: "Kampus / Event",
        total_spent: 8000000,
        total_projects: 6,
        rating_average: 4.9,
        rating_count: 6
      }
    },
    category_id: "cat-3",
    category: MOCK_CATEGORIES[2],
    title: "Desain Poster & Feeds Instagram Festival Kampus 2026",
    slug: "desain-poster-feeds-instagram-festival-kampus",
    description: "Dibutuhkan desainer grafis untuk membuat 10 aset feed Instagram, 1 poster utama print A2, dan 5 story template untuk acara tahunan mahasiswa.",
    deliverables: "10 Aset Feeds IG, 1 Poster A2 Hi-Res PDF, File Mentahan Figma/Illustrator.",
    budget_type: "fixed",
    budget_min: 500000,
    budget_max: 850000,
    currency: "IDR",
    experience_level: "beginner",
    deadline: "2026-08-15T00:00:00Z",
    work_mode: "remote",
    status: "published",
    proposal_count: 8,
    is_featured: false,
    published_at: "2026-08-02T14:00:00Z",
    created_at: "2026-08-02T13:00:00Z",
    skills: [
      { id: "s-4", name: "Figma", slug: "figma" },
      { id: "s-5", name: "Adobe Illustrator", slug: "illustrator" }
    ]
  },
  {
    id: "proj-3",
    client_id: "client-3",
    client: {
      id: "client-3",
      username: "distro_bandung",
      full_name: "Agus Setiawan (Owner Distro Lokal)",
      role: "client",
      city: "Bandung",
      is_verified: true,
      is_active: true,
      created_at: "2025-07-20T00:00:00Z",
      client_profile: {
        user_id: "client-3",
        business_name: "Distro Creative Clothing",
        business_type: "Fashion UMKM",
        total_spent: 3200000,
        total_projects: 2,
        rating_average: 4.8,
        rating_count: 2
      }
    },
    category_id: "cat-4",
    category: MOCK_CATEGORIES[3],
    title: "Editing 5 Video Short/Reels Promosi Produk Fashion Distro",
    slug: "editing-5-video-reels-promosi-fashion",
    description: "Kami menyediakan footage video mentah. Butuh editor untuk menambahkan subtitle dinamis, sound effect viral, dan color grading ciamik.",
    deliverables: "5 File Video MP4 (1080x1920) durasi 30-45 detik.",
    budget_type: "fixed",
    budget_min: 400000,
    budget_max: 600000,
    currency: "IDR",
    experience_level: "intermediate",
    deadline: "2026-08-12T00:00:00Z",
    work_mode: "remote",
    status: "in_progress",
    proposal_count: 6,
    is_featured: false,
    published_at: "2026-08-03T08:00:00Z",
    created_at: "2026-08-03T07:30:00Z",
    skills: [
      { id: "s-6", name: "CapCut / Premiere", slug: "video-editing" }
    ]
  }
];

export const MOCK_WALLET: Wallet = {
  user_id: "f-1",
  available_balance: 1450000,
  pending_balance: 750000,
  withdrawn_balance: 6200000,
  currency: "IDR"
};
