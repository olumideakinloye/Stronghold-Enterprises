import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Check,
  Home as HomeIcon,
  Briefcase,
  Truck,
  Car,
} from "lucide-react";
import { Section, Eyebrow, Card, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";
import Hero from "@/components/Hero";
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
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 transition-all ease-in-out duration-700" />
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
        <ScrollFade delay={150} className="glass-panel backdrop-blur-xl rounded-xl2 p-6 sm:p-8">
          <LeadForm module="consultancy" title="General enquiry" />
        </ScrollFade>
      </Section >
    </>
  );
}
