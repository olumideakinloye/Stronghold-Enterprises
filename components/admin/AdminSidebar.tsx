"use client";

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

  const signOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-brand-line bg-white p-5 sm:flex">
      <div className="flex items-center gap-2 font-extrabold">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-white">
          <ShieldCheck size={16} />
        </span>
        Stronghold Admin
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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
    </aside>
  );
}
