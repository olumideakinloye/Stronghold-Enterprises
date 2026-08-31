"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, ChevronDown, ArrowRight } from "lucide-react";

const MODULES = [
  { href: "/security", label: "Security" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/consultancy", label: "Consultancy" },
  { href: "/logistics", label: "Logistics" },
  { href: "/automobiles", label: "Automobiles" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const modules = [
    {
      id: "security",
      slug: "security",
      index: "01",
      name: "Security",
      shortName: "Security",
      tagline: "The business we were built on.",
      description:
        "Trained guards, CCTV, and solar-backed surveillance for homes, estates and businesses across Ibadan — our flagship service.",
      color: "#1C9A52",
      colorSoft: "#1C9A521a",
      image: "stronghold-security",
      flagship: true,
      services: [
        "Manned guarding & security experts",
        "CCTV supply & installation",
        "Solar-powered surveillance systems",
        "Security kit sales",
      ],
      cta: "Request a security assessment",
    },
    {
      id: "real-estate",
      slug: "real-estate",
      index: "02",
      name: "Real Estate",
      shortName: "Real Estate",
      tagline: "Property, properly managed.",
      description:
        "Property management and agency — listing, letting, and day-to-day portfolio management.",
      color: "#0E7C8C",
      colorSoft: "#0E7C8C1a",
      image: "stronghold-realestate",
      flagship: false,
      services: [
        "Property management",
        "Sales & letting agency",
        "Portfolio & tenant administration",
        "Site inspections",
      ],
      cta: "Browse managed properties",
    },
    {
      id: "consultancy",
      slug: "consultancy",
      index: "03",
      name: "Consultancy",
      shortName: "Consultancy",
      tagline: "Judgement you can lean on.",
      description:
        "Independent business and security consultancy for organisations that want a second set of experienced eyes.",
      color: "#6A55C2",
      colorSoft: "#6A55C21a",
      image: "stronghold-consultancy",
      flagship: false,
      services: [
        "Business advisory",
        "Security consultancy & audits",
        "Risk assessment",
        "Operational planning",
      ],
      cta: "Book a consultation",
    },
    {
      id: "logistics",
      slug: "logistics",
      index: "04",
      name: "Logistics",
      shortName: "Logistics",
      tagline: "Every journey, handled.",
      description:
        "Airport transfers, event transport, and inter/intra-state travel — booked in minutes.",
      color: "#2F6FB0",
      colorSoft: "#2F6FB01a",
      image: "stronghold-logistics",
      flagship: false,
      services: [
        "Airport transfers",
        "Corporate & private event transport",
        "Inter-state travel",
        "Intra-state travel",
      ],
      cta: "Request a booking",
    },
    {
      id: "automobiles",
      slug: "automobiles",
      index: "05",
      name: "Automobiles",
      shortName: "Automobiles",
      tagline: "Buy, sell, keep moving.",
      description:
        "Buy, sell, swap or upgrade your vehicle, plus diagnostics and repair.",
      color: "#D9722F",
      colorSoft: "#D9722F1a",
      image: "stronghold-automobiles",
      flagship: false,
      services: [
        "Buy & sell vehicles",
        "Vehicle swap & upgrade",
        "Diagnostics",
        "Repair & maintenance",
      ],
      cta: "See vehicle listings",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setExpand(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  }

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className={`fixed z-50 mx-auto flex w-screen justify-center ${expand ? "px-0 top-0" : "px-10 sm:px-20 top-3"} transition-all ease-in-out duration-500`}>
      <nav className={`glass-pill backdrop-blur-xl bg-white/10 flex w-full items-center justify-between py-1 shadow-glass  sm:px-6 px-4 sm:py-2.5 ${expand ? "rounded-none" : "rounded-full"} transition-all ease-in-out duration-300`}>
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-white">
            <ShieldCheck size={16} />
          </span>
          <span className="hidden sm:inline">Stronghold</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>

          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm text-ink-muted hover:text-ink transition-colors"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[560px]">
                <div className="rounded-2xl border border-line bg-white shadow-xl shadow-black/5 p-3 grid grid-cols-2 gap-1">
                  {modules.map((m) => (
                    <Link
                      key={m.id}
                      href={`/${m.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="group flex items-start gap-3 rounded-xl p-3 hover:bg-brand-green-mist transition-colors"
                    >
                      <span>
                        <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
                          {m.name}
                          {m.flagship && (
                            <span
                              className="mono-label px-1.5 py-0.5 rounded-full"
                              style={{
                                color: m.color,
                                backgroundColor: m.colorSoft,
                                fontSize: "0.6rem",
                              }}
                            >
                              Flagship
                            </span>
                          )}
                        </span>
                        <span className="block text-xs text-ink-muted mt-0.5 leading-snug">
                          {m.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setServicesOpen(false)}
                    className="group flex items-center bg-black/5 justify-between rounded-xl p-3 hover:bg-black/15 transition"
                  >
                    <span className="text-sm font-medium text-brand">
                      Not sure which one?
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <NavLink href="/contact">Contact</NavLink>
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
        <div className="bg-white absolute left-4 right-4 top-16 z-40 rounded-2xl p-4 md:hidden">
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm text-ink-muted hover:text-ink transition-colors"
    >
      {children}
    </Link>
  );
}
