"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck } from "lucide-react";
import clsx from "clsx";

const MODULES = [
  { href: "/security", label: "Security" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/consultancy", label: "Consultancy" },
  { href: "/logistics", label: "Logistics" },
  { href: "/automobiles", label: "Automobiles" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-4 z-50 mx-auto flex w-full max-w-6xl justify-center px-4">
      <nav className="glass-pill flex w-full items-center justify-between rounded-full px-4 py-2.5 shadow-glass sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-white">
            <ShieldCheck size={16} />
          </span>
          <span className="hidden sm:inline">Stronghold</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {MODULES.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={clsx(
                "rounded-full px-3.5 py-2 text-sm font-medium text-brand-ink/80 transition hover:bg-white/70 hover:text-brand-ink",
                pathname === m.href && "bg-white text-brand-ink shadow-sm"
              )}
            >
              {m.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-green-dark sm:inline-block"
          >
            Get a Quote
          </Link>
          <button
            className="rounded-full p-2 hover:bg-white/60 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-panel absolute left-4 right-4 top-16 z-40 rounded-2xl p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {MODULES.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-white/70"
              >
                {m.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-brand-green px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
