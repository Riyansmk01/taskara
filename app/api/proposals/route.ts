import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.projectId || !body.proposedAmount || !body.coverLetter) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Kelengkapan data proposal wajib diisi." } },
        { status: 400 }
      );
    }

    const proposal = {
      id: `prop-${Date.now()}`,
      project_id: body.projectId,
      freelancer_id: "f-1",
      cover_letter: body.coverLetter,
      proposed_amount: body.proposedAmount,
      estimated_days: body.estimatedDays || 3,
      status: "sent",
      created_at: new Date().toISOString(),
    };

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
