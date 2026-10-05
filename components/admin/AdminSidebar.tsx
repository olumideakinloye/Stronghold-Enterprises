"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Inbox,
  ShieldCheck,
  Home,
  Car,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads Inbox", icon: Inbox },
  { href: "/admin/catalogue", label: "Security Catalogue", icon: ShieldCheck },
  { href: "/admin/properties", label: "Property Listings", icon: Home },
  { href: "/admin/vehicles", label: "Vehicle Listings", icon: Car },
  { href: "/admin/activity", label: "Activity Log", icon: History },
];

export default function AdminSidebar({
  role,
  fullName,
  email,
}: {
  role: string;
  fullName: string | null;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const signOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const close = () => setIsOpen(false);

  const sidebarContent = (
    <>
      {/* Logo / brand */}
      <div className="flex items-center gap-2 font-extrabold">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-white">
          <ShieldCheck size={16} />
        </span>
        Stronghold Admin
      </div>

      {/* Navigation links */}
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className={clsx(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-ink/75 transition hover:bg-brand-bg",
              pathname === item.href && "bg-brand-green-mist text-brand-green-dark"
            )}
          >
            <item.icon size={17} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User info + sign out */}
      <div className="mt-4 rounded-lg bg-brand-bg p-3">
        <p className="truncate text-sm font-semibold">{fullName || email}</p>
        <p className="text-xs capitalize text-brand-muted">{role.replace("_", " ")}</p>
        <button
          onClick={signOut}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Mobile top menu bar ───────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-brand-line bg-white px-4 sm:hidden">
        <div className="flex items-center gap-2 font-extrabold">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-ink text-white">
            <ShieldCheck size={14} />
          </span>
          Stronghold Admin
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-ink hover:bg-brand-bg transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Mobile slide-in drawer ────────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={close}
        className={clsx(
          "fixed inset-0 z-40 bg-brand-ink/40 backdrop-blur-sm transition-opacity sm:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-brand-line bg-white p-5 transition-transform duration-300 sm:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button inside drawer */}
        <button
          onClick={close}
          aria-label="Close navigation"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-brand-ink hover:bg-brand-bg transition"
        >
          <X size={18} />
        </button>

        {sidebarContent}
      </aside>

      {/* ── Desktop static sidebar ────────────────────────────────── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-brand-line bg-white p-5 sm:flex">
        {sidebarContent}
      </aside>
    </>
  );
}
