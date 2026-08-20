import { Section, Eyebrow, ScrollFade } from "@/components/ui";

export default function AboutPage() {
  return (
    <Section>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[0%] h-[380px] w-[380px] rounded-full bg-brand-green-light/20 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[0%] h-[380px] w-[380px] rounded-full bg-brand-green-light/20 blur-3xl" />
      </div>
      <div className="grid gap-10 md:grid-cols-2 md:items-center ">
        {/* ---------------- ABOUT ---------------- */}
        <ScrollFade>
          <Eyebrow>About Stronghold</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Built in Ibadan. Trusted across every line of business.
          </h2>
          <p className="mt-4 text-brand-muted">
            Stronghold Enterprises was built on a simple premise: the
            fundamental services people and organizations depend on most—safety,
            shelter, sound advice, smooth movement, and reliable
            transport—should not require managing five disconnected vendors. We
            bring these essential services together under one name, one
            standard, and one promise. Across our five divisions, we serve
            individuals, families, and businesses seeking an end-to-end partner.
            Whether it is a developer needing both site security and
            construction oversight, or a relocating business requiring fleet
            management and strategic consultation, we manage the full picture.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              "Licensed & Registered",
              "Local, On-the-ground Team",
              "Same-day Response",
              "Transparent Pricing",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                {f}
              </div>
            ))}
          </div>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-8">
          <p className="text-sm font-semibold text-brand-green uppercase">
            Mission
          </p>
          <p className="font-medium">
            To protect, house, guide, move, and empower our clients through
            every stage of their personal and business journey.
          </p>
          <div className="mt-6 h-px bg-brand-line" />
          <p className="mt-6 text-sm font-semibold text-brand-green uppercase">
            Vision
          </p>
          <p className="mt-1 font-medium">
            To become the region’s most trusted multi-service group—proof that
            convenience and quality can seamlessly coexist.
          </p>
        </ScrollFade>
      </div>
    </Section>
  );
}
