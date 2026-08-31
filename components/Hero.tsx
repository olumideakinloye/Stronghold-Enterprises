"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Eyebrow, ScrollFade } from "@/components/ui";
import ScrollCue from "@/components/ScrollCue";
import HeroSlideshow, { type HeroSlide } from "@/components/HeroSlideshow";
import { getPublicAssetUrl } from "@/lib/supabase/storage";
import {
  ShieldCheck,
  Home as HomeIcon,
  Briefcase,
  Truck,
  Car,
} from "lucide-react";

export const MODULES = [
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

const HERO_SLIDES: (HeroSlide & {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
})[] = [
    {
      src: getPublicAssetUrl("hero/security_banner.webp"),
      alt: "Security operations",
      eyebrow: "Security",
      title: (
        <>
          Protects what <span className="text-brand-green-light">matters</span>.
        </>
      ),
      description:
        "Professional protection, surveillance, and security solutions.",
    },
    {
      src: getPublicAssetUrl("hero/realestate_banner.webp"),
      alt: "Real estate & property",
      eyebrow: "Real Estate",
      title: (
        <>
          Find <span className="text-brand-green-light">value</span>. Build{" "}
          <span className="text-brand-green-light">opportunity</span>.
        </>
      ),
      description: "Property sales, rentals, management, and development.",
    },
    {
      src: getPublicAssetUrl("hero/consultancy_banner.webp"),
      alt: "Business consultancy",
      eyebrow: "Consultancy",
      title: (
        <>
          Think <span className="text-brand-green-light">clearly</span>. Move{" "}
          <span className="text-brand-green-light">strategically</span>.
        </>
      ),
      description: "Practical guidance for businesses and organizations.",
    },
    {
      src: getPublicAssetUrl("hero/logistics_banner.webp"),
      alt: "Logistics & transport",
      eyebrow: "Logistics",
      title: (
        <>
          Move <span className="text-brand-green-light">without limits</span>.
        </>
      ),
      description:
        "From airport transfers to interstate travel and event transportation, we get you where you need to be.",
    },
    {
      src: getPublicAssetUrl("hero/automobile_banner.webp"),
      alt: "Automobiles",
      eyebrow: "Automobiles",
      title: (
        <>
          The right <span className="text-brand-green-light">vehicle</span>. The
          right <span className="text-brand-green-light">journey</span>.
        </>
      ),
      description:
        "Buy, sell, swap, upgrade, diagnose and repair — a full-service desk for your car.",
    },
  ];

export default function Hero() {
  const [active, setActive] = useState(0);
  const slide = HERO_SLIDES[active];

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <HeroSlideshow
        slides={HERO_SLIDES}
        active={active}
        onActiveChange={setActive}
        showIndicators={false}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-16 text-center sm:pt-24">
        <div key={active} className="flex flex-col items-center">
          <h1
            className="animate-heroTextIn mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {slide.title}
          </h1>

          <p
            className="animate-heroTextIn mt-5 max-w-xl text-base text-white/80 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {slide.description}
          </p>
        </div>

        <ScrollFade
          delay={300}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#modules"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-ink shadow-card transition hover:bg-white/90"
          >
            Explore our services
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/20"
          >
            Request a quote
          </Link>
        </ScrollFade>

        {/* Slide dots double as manual navigation */}
        <div className="mt-20 flex items-center gap-2 justify-self-end">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${s.eyebrow}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active
                ? "w-6 bg-white/90"
                : "w-1.5 bg-white/35 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
      {/* Scroll cue — sits fixed to the bottom of the hero regardless of
          content height, hints that there's more below. */}
      <ScrollCue href="#modules" />
    </section>
  );
}
