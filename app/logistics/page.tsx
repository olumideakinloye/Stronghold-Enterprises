import { Truck, Plane, CalendarClock, Map } from "lucide-react";
import ModuleHero from "@/components/ModuleHero";
import LogisticsScene from "@/components/three/LogisticsScene";
import { Section, Eyebrow, GlassCard, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";

const SERVICES = [
  { icon: Plane, name: "Airport Transfers", desc: "Punctual pickups and drop-offs, tracked from booking to arrival." },
  { icon: CalendarClock, name: "Event Transport", desc: "Corporate and private event logistics, planned around your schedule." },
  { icon: Map, name: "Inter/Intra-state Travel", desc: "Reliable long and short-distance travel across Nigeria." },
];

export default function LogisticsPage() {
  return (
    <>
      <ModuleHero
        eyebrow="Logistics"
        title="Movement you can set your watch to."
        description="From airport runs to full event transport and cross-state travel, our logistics desk plans the route so you don't have to."
        scene={<LogisticsScene />}
        note="Interactive 3D model — drag to explore the vehicle"
      />

      <Section id="contents">
        <ScrollFade>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">What we move</h2>
        </ScrollFade>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {SERVICES.map((s, i) => (
            <GlassCard key={s.name} delay={i * 90}>
              <s.icon className="text-brand-green" size={22} />
              <p className="mt-3 font-bold">{s.name}</p>
              <p className="mt-1 text-sm text-brand-muted">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section id="book" className="grid gap-10 md:grid-cols-2">
        <ScrollFade>
          <Eyebrow>Book transport</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tell us the date and the destination
          </h2>
          <p className="mt-4 max-w-md text-brand-muted">
            Give us the details of your trip or event and we&apos;ll confirm availability and pricing.
          </p>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-6 sm:p-8">
          <LeadForm
            module="logistics"
            title="Transport booking request"
            extraFields={[
              { label: "Pickup date", name: "pickup_date" },
              { label: "Route / destination", name: "route" },
            ]}
          />
        </ScrollFade>
      </Section>
    </>
  );
}
