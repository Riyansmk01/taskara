import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-soft p-4 sm:p-6 selection:bg-primary-soft selection:text-primary">
      <div className="mb-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-text-primary">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Taskara
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-md">
        {children}
      </div>

      <div className="mt-8 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} Taskara Inc. Platform Micro-job Mahasiswa & UMKM.
      </div>
    </div>
  );
}
