import { NextResponse } from "next/server";
import { getProjects, createProjectInDb } from "@/lib/supabase/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const q = searchParams.get("q") || undefined;

  const projects = await getProjects(category, q);

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

    const newProject = await createProjectInDb({
      title: body.title,
      description: body.description,
      deliverables: body.deliverables,
      budget_type: body.budget_type,
      budget_min: Number(body.budget_min),
      budget_max: Number(body.budget_max),
      category_id: body.category_id,
      deadline: body.deadline,
    });

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
