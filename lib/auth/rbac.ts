import { Profile, UserRole } from "@/types";

export const ADMIN_EMAILS = ["perdhanariyan@gmail.com"];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

export function checkPermission(
  user: { email?: string; role?: UserRole } | null,
  requiredRole: UserRole
): boolean {
  if (!user) return false;
  if (user.email && isAdminEmail(user.email)) return true;
  return user.role === requiredRole || user.role === "admin";
}
