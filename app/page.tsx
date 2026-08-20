import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Home as HomeIcon,
  Briefcase,
  Truck,
  Car,
} from "lucide-react";
import { Section, Eyebrow, GlassCard, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";
import Hero from "@/components/Hero";
const MODULES = [
  {
    slug: "security",
    icon: ShieldCheck,
    name: "Security",
    blurb:
      "Trained personnel, CCTV kits and solar backup systems that keep homes and businesses protected.",
  },
  {
    slug: "real-estate",
    icon: HomeIcon,
    name: "Real Estate",
    blurb:
      "Property management and agency services — buy, rent, or let us manage your asset end-to-end.",
  },
  {
    slug: "consultancy",
    icon: Briefcase,
    name: "Consultancy",
    blurb:
      "Business and security consultancy for organisations that want a clear, structured way forward.",
  },
  {
    slug: "logistics",
    icon: Truck,
    name: "Logistics",
    blurb:
      "Airport transfers, event transport and inter-state travel — reliable movement, on schedule.",
  },
  {
    slug: "automobiles",
    icon: Car,
    name: "Automobiles",
    blurb:
      "Buy, sell, swap, upgrade, diagnose and repair — a full-service desk for every vehicle need.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 bottom-0 m-auto h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute left-[-10%] top-[90%] h-[380px] w-[380px] rounded-full bg-brand-green-light/20 blur-3xl" />
      </div>
      {/* ---------------- HERO ---------------- */}
      <Hero />
      {/* ---------------- STATS STRIP ---------------- */}
      <Section className="py-10 sm:py-14">
        <ScrollFade className="glass-panel grid grid-cols-2 gap-6 rounded-xl2 p-8 sm:grid-cols-4">
          {[
            ["5", "Business Lines"],
            ["1", "Unified Platform"],
            ["24/7", "Security Response"],
            ["100%", "Locally Rooted"],
          ].map(([stat, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-brand-green-dark sm:text-4xl">
                {stat}
              </p>
              <p className="mt-1 text-xs font-medium text-brand-muted sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </ScrollFade>
      </Section>

      {/* ---------------- MODULES ---------------- */}
      <Section id="modules">
        <ScrollFade>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Every module has its own dedicated space
          </h2>
          <p className="mt-3 max-w-xl text-brand-muted">
            Each business line gets a full landing page with its own catalogue,
            listings, and an interactive 3D model you can explore before you
            reach out.
          </p>
        </ScrollFade>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <GlassCard
              key={m.slug}
              delay={i * 80}
              className="group flex flex-col justify-between"
            >
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-mist text-brand-green-dark">
                  <m.icon size={20} />
                </span>
                <p className="mt-4 text-lg font-bold">{m.name}</p>
                <p className="mt-2 text-sm text-brand-muted">{m.blurb}</p>
              </div>
              <Link
                href={`/${m.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-dark"
              >
                Visit {m.name}
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* ---------------- CONTACT ---------------- */}
      <Section id="contact" className="grid gap-10 md:grid-cols-2">
        <ScrollFade>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tell us what you need — we&apos;ll take it from there
          </h2>
          <p className="mt-4 max-w-md text-brand-muted">
            General enquiries land with our front desk team, who route your
            request to the right business line within one working day.
          </p>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-6 sm:p-8">
          <LeadForm module="consultancy" title="General enquiry" />
        </ScrollFade>
      </Section>
    </>
  );
}
