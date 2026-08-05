import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskara — Platform Micro-job Mahasiswa & UMKM",
  description: "Dari kemampuan menjadi penghasilan. Platform marketplace micro-job terpercaya untuk mahasiswa, fresh graduate, UMKM, dan bisnis lokal di Indonesia.",
  keywords: ["micro-job", "freelancer mahasiswa", "tugas UMKM", "jasadokumentasi", "web development", "design figma"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-background text-text-primary antialiased selection:bg-primary-soft selection:text-primary">
        {children}
      </body>
    </html>
  );
}
