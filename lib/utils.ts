import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function calculatePlatformFee(amount: number): { fee: number; ratePercentage: number; net: number } {
  let ratePercentage = 10;
  if (amount >= 2000000) {
    ratePercentage = 6;
  } else if (amount >= 500000) {
    ratePercentage = 8;
  }
  const fee = (amount * ratePercentage) / 100;
  const net = amount - fee;
  return { fee, ratePercentage, net };
}
