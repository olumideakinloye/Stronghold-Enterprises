import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Home as HomeIcon, Briefcase, Truck, Car, MapPin, Check } from "lucide-react";

import { Section, Eyebrow, Card, ScrollFade } from "@/components/ui";
// 
import LeadForm from "@/components/LeadForm";
import HeroScene from "@/components/three/HeroScene";


const MODULES = [
  {
    slug: "security",
    icon: ShieldCheck,
    image: '/modules/security_card_bg.jpg',
    name: "Security",
    blurb: "Protection you don't have to think twice about.",
    highlights: ["Guard Services", "Surveillance Systems"],
  },
  {
    slug: "real-estate",
    icon: HomeIcon,
    image: '/modules/real-estate_card_bg.jpg',
    name: "Real Estate",
    blurb: "Every address starts here.",
    highlights: ["Property Sales", "Rentals"]
  },
  {
    slug: "consultancy",
    icon: Briefcase,
    image: '/modules/consult_card_bg.png',
    name: "Consultancy",
    blurb: "Strong foundations. Smarter decisions.",
    highlights: ["Business Structuring", "Financial Consultancy"]
  },
  {
    slug: "logistics",
    icon: Truck,
    image: '/modules/logistics_card_bg.jpeg',
    name: "Logistics",
    blurb: "Wherever it needs to go, however it needs to get there.",
    highlights: ["Airport Transfers", "Delivery Services"]
  },
  {
    slug: "automobiles",
    icon: Car,
    image: '/modules/automobiles_card_bg.jpeg',
    name: "Automobiles",
    blurb: "Get moving, on your terms.",
    highlights: ["Car Rentals", "Car Sales"]
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative min-h-[720px] overflow-hidden sm:min-h-[820px]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="absolute right-[-10%] top-[30%] h-[380px] w-[380px] rounded-full bg-brand-green-light/20 blur-3xl" />
        </div>

        {/* Scroll-reactive 3D emblem — five orbiting nodes for the five
            business lines, turning to face you as you scroll past. */}
        <HeroScene />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-16 text-center sm:pt-24">
          <ScrollFade className="animate-fadeUp">
            <Eyebrow>RC: 7639871 · Ibadan, Nigeria</Eyebrow>
          </ScrollFade>

          <ScrollFade delay={100} className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
              Five businesses. <span className="text-gradient-green">One trusted</span> address.
            </h1>
          </ScrollFade>

          <ScrollFade delay={200} className="mt-5 max-w-xl">
            <p className="text-base text-brand-muted sm:text-lg">
              Stronghold Enterprises brings Security, Real Estate, Consultancy, Logistics and
              Automobiles together under one platform — so you can browse, request and book
              without ever leaving your seat.
            </p>
          </ScrollFade>

          <ScrollFade delay={300} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#modules"
              className="rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-black"
            >
              Explore our services
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-brand-line bg-white px-6 py-3 text-sm font-semibold transition hover:border-brand-green hover:text-brand-green-dark"
            >
              Request a quote
            </Link>
          </ScrollFade>

          <ScrollFade delay={350} className="mt-3">
            <p className="text-xs font-medium text-brand-muted/80">
              Scroll, or move your cursor — the emblem behind this page responds
            </p>
          </ScrollFade>

          {/* Hero glass dashboard mock, echoing the reference image's card layout */}
          <ScrollFade delay={400} className="relative mt-16 w-full max-w-4xl">
            <div className="glass-panel relative overflow-hidden rounded-xl2 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {MODULES.slice(0, 3).map((m) => (
                  <div key={m.slug} className="rounded-xl bg-white/70 p-4 text-left shadow-card">
                    <m.icon className="text-brand-green" size={20} />
                    <p className="mt-3 text-sm font-semibold">{m.name}</p>
                    <p className="mt-1 text-xs text-brand-muted">Live requests handled by our team</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/70 p-4 shadow-card">
                <div className="flex items-center gap-2 text-left">
                  <MapPin size={16} className="text-brand-green" />
                  <div>
                    <p className="text-xs font-semibold">H12 Heritage Mall</p>
                    <p className="text-[11px] text-brand-muted">Cocoa House, Dugbe, Ibadan</p>
                  </div>
                </div>
                <span className="rounded-full bg-brand-green-mist px-3 py-1 text-[11px] font-semibold text-brand-green-dark">
                  Open Today
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-xl2 bg-brand-green/10 blur-2xl" />
          </ScrollFade>
        </div>
      </section>

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
              <p className="text-3xl font-extrabold text-brand-green-dark sm:text-4xl">{stat}</p>
              <p className="mt-1 text-xs font-medium text-brand-muted sm:text-sm">{label}</p>
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
            Each business line gets a full landing page with its own catalogue, listings, and an
            interactive 3D model you can explore before you reach out.
          </p>
        </ScrollFade>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-6">
          {MODULES.map((mod, i) => {
            let modStyle;

            switch (i) {
              case 0:
                modStyle = "md:col-span-4";
                break;

              case 1:
                modStyle = "md:col-span-2";
                break;

              case 2:
                modStyle = "md:col-span-2";
                break;

              case 3:
                modStyle = "md:col-span-3";
                break;

              case 4:
                modStyle = "md:col-span-3";
                break;

              default:
                modStyle = "md:col-span-2";
            }

            return (
              <Link key={mod.slug} href={`/${mod.slug}`} className={`${modStyle} group relative overflow-hidden`}>
                <Card
                  delay={i * 80}
                  bg={mod.image}
                  tilt={false}
                >
                  <div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full text-white place-self-end ">
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 transition-all ease-in-out" />
                    </span>

                    <p className="mt-20 text-xl font-bold text-white">{mod.name}</p>
                    <p className="mt-2 text-sm text-white/90 mb-3">{mod.blurb}</p>
                    {mod.highlights.length > 0 && mod.highlights.map((highlight, i) => (
                      <p key={i} className="flex text-xs text-white/90"><Check className="text-brand-green pr-1" size={18} />{highlight}</p>
                    ))}
                  </div>

                </Card>
              </Link>

            )
          })}
        </div >
      </Section >

      {/* ---------------- ABOUT ---------------- */}
      <Section id="about" className="grid gap-10 md:grid-cols-2 md:items-center">
        <ScrollFade>
          <Eyebrow>About Stronghold</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Built in Ibadan. Trusted across every line of business.
          </h2>
          <p className="mt-4 text-brand-muted">
            Stronghold Enterprises Ltd has operated from H12 Heritage Mall, Cocoa House,
            Dugbe, Ibadan — serving clients across security, property, consultancy, logistics and
            automobiles. This platform is our first digital home: the same trusted service you know,
            now reachable from anywhere.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {["Licensed & Registered", "Local, On-the-ground Team", "Same-day Response", "Transparent Pricing"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                {f}
              </div>
            ))}
          </div>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-8">
          <p className="text-sm font-semibold text-brand-muted">RC Number</p>
          <p className="text-2xl font-extrabold">7639871</p>
          <div className="mt-6 h-px bg-brand-line" />
          <p className="mt-6 text-sm font-semibold text-brand-muted">Registered Office</p>
          <p className="mt-1 font-medium">H12 Heritage Mall, Cocoa House, Dugbe, Ibadan, Nigeria</p>
        </ScrollFade>
      </Section >

      {/* ---------------- CONTACT ---------------- */}
      <Section id="contact" className="grid gap-10 md:grid-cols-2">
        <ScrollFade>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tell us what you need — we&apos;ll take it from there
          </h2>
          <p className="mt-4 max-w-md text-brand-muted">
            General enquiries land with our front desk team, who route your request to the right
            business line within one working day.
          </p>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel backdrop-blur-xl rounded-xl2 p-6 sm:p-8">
          <LeadForm module="consultancy" title="General enquiry" />
        </ScrollFade>
      </Section >
    </>
  );
}
