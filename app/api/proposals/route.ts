import { NextResponse } from "next/server";
import { createProposalInDb } from "@/lib/supabase/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.projectId || !body.proposedAmount || !body.coverLetter) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Kelengkapan data proposal wajib diisi." } },
        { status: 400 }
      );
    }

    const proposal = await createProposalInDb({
      projectId: body.projectId,
      freelancerId: body.freelancerId || "f-1",
      proposedAmount: Number(body.proposedAmount),
      estimatedDays: Number(body.estimatedDays) || 3,
      coverLetter: body.coverLetter,
    });

    return NextResponse.json({
      success: true,
      data: proposal,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Gagal mengirim proposal." } },
      { status: 500 }
    );
  }
}
