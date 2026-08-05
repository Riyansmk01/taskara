import { NextResponse } from "next/server";
import { MOCK_PROJECTS } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let projects = MOCK_PROJECTS;
  if (category && category !== "all") {
    projects = projects.filter((p) => p.category?.slug === category);
  }

  return NextResponse.json({
    success: true,
    data: projects,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Judul dan deskripsi wajib diisi." } },
        { status: 400 }
      );
    }

    const newProject = {
      id: `proj-${Date.now()}`,
      client_id: "client-1",
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: body.description,
      deliverables: body.deliverables || "",
      budget_type: body.budget_type || "fixed",
      budget_min: Number(body.budget_min) || 500000,
      budget_max: Number(body.budget_max) || 1000000,
      currency: "IDR",
      experience_level: body.experience_level || "intermediate",
      deadline: body.deadline || new Date().toISOString(),
      work_mode: body.work_mode || "remote",
      status: "published",
      proposal_count: 0,
      is_featured: false,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Gagal membuat proyek." } },
      { status: 500 }
    );
  }
}
