"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-24 border-t border-brand-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-white">
              <ShieldCheck size={16} />
            </span>
            Stronghold
          </div>
          <p className="mt-3 text-sm text-brand-muted">
            RC: 7639871. Security, Real Estate, Consultancy, Logistics and Automobiles — under one roof.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Business Lines</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            <li><Link href="/security" className="hover:text-brand-green">Security</Link></li>
            <li><Link href="/real-estate" className="hover:text-brand-green">Real Estate</Link></li>
            <li><Link href="/consultancy" className="hover:text-brand-green">Consultancy</Link></li>
            <li><Link href="/logistics" className="hover:text-brand-green">Logistics</Link></li>
            <li><Link href="/automobiles" className="hover:text-brand-green">Automobiles</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            <li><Link href="/#about" className="hover:text-brand-green">About Us</Link></li>
            <li><Link href="/#contact" className="hover:text-brand-green">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Visit Us</p>
          <ul className="mt-3 space-y-2.5 text-sm text-brand-muted">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-green" />
               H12 Heritage Mall, Cocoa House, Dugbe, Ibadan
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-brand-green" /> +234 800 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-brand-green" /> hello@strongholdenterprises.ng
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-line py-5 text-center text-xs text-brand-muted">
        © {new Date().getFullYear()} Stronghold Enterprises Ltd. All rights reserved.
      </div>
    </footer>
  );
}
