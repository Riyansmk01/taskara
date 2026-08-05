import { NextResponse } from "next/server";
import { MOCK_WALLET } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_WALLET,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, bankName, accountNumber, accountHolder } = body;

    if (!amount || amount < 50000) {
      return NextResponse.json(
        { success: false, error: { code: "MIN_WITHDRAWAL", message: "Minimal penarikan saldo adalah Rp 50.000." } },
        { status: 400 }
      );
    }

    const withdrawal = {
      id: `wdr-${Date.now()}`,
      user_id: "f-1",
      amount,
      fee: 0,
      net_amount: amount,
      bank_name: bankName,
      account_number_encrypted: accountNumber,
      account_holder: accountHolder,
      status: "processing",
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: withdrawal,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Gagal memproses penarikan." } },
      { status: 500 }
    );
  }
}
