"use client";

import Link from "next/link";
import { useState } from "react";
import { Briefcase, Search, User, Menu, X, PlusCircle, LayoutDashboard, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface shadow-xs transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-text-primary tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent font-extrabold">
            Taskara
          </span>
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">
            PROD
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex text-xs font-bold text-text-secondary">
          <Link href="/projects" className="flex items-center gap-1.5 transition hover:text-primary">
            <Search className="h-4 w-4" /> Cari Proyek
          </Link>
          <Link href="/freelancers" className="flex items-center gap-1.5 transition hover:text-primary">
            <User className="h-4 w-4" /> Temukan Talenta
          </Link>
          <Link href="/how-it-works" className="transition hover:text-primary">
            Cara Kerja
          </Link>
          <Link href="/pricing" className="transition hover:text-primary">
            Harga & Komisi
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="rounded-xl px-4 py-2 text-xs font-bold text-text-primary transition hover:bg-surface-soft"
          >
            Masuk
          </Link>
          <Link
            href="/client/projects/new"
            className="flex items-center gap-1.5 rounded-xl bg-surface-purple border border-primary/20 px-3.5 py-2 text-xs font-bold text-primary transition hover:bg-primary-soft"
          >
            <PlusCircle className="h-4 w-4" /> Post Proyek
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover active:bg-primary-active"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-primary md:hidden"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 font-semibold text-text-secondary text-xs">
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-surface-soft hover:text-primary"
            >
              <Search className="h-4 w-4" /> Cari Proyek
            </Link>
            <Link
              href="/freelancers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-surface-soft hover:text-primary"
            >
              <User className="h-4 w-4" /> Temukan Talenta
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-surface-soft hover:text-primary"
            >
              Cara Kerja
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-surface-soft hover:text-primary"
            >
              Harga & Komisi
            </Link>

            <hr className="my-1 border-border" />

            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/client/projects/new"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-surface-purple border border-primary/20 py-2.5 text-xs font-bold text-primary"
              >
                <PlusCircle className="h-4 w-4" /> Posting Pekerjaan Baru
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-white shadow-xs"
              >
                <LayoutDashboard className="h-4 w-4" /> Masuk ke Dashboard
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted hover:text-primary py-1"
              >
                <ShieldCheck className="h-3.5 w-3.5" /> Portal Admin System
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
