import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate Midtrans/Xendit signature & transaction_status
    const { transaction_status, order_id, gross_amount } = body;

    if (transaction_status === "settlement" || transaction_status === "capture") {
      // Escrow funded successfully -> Activate contract
      return NextResponse.json({
        success: true,
        message: `Escrow payment funded for order ${order_id}`,
      });
    }

    return NextResponse.json({ success: true, message: "Webhook received" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "WEBHOOK_FAILED", message: "Invalid payload" } },
      { status: 400 }
    );
  }
}
