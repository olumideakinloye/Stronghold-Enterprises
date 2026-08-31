import Link from "next/link";
import { Car, RefreshCw, Wrench, Gauge } from "lucide-react";
import ModuleHero from "@/components/ModuleHero";
import { AutomobilesScene } from "@/components/three/lazy";
import { Section, Eyebrow, GlassCard, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const TXN_LABEL: Record<string, string> = { buy: "Buy", sell: "Sell", swap: "Swap" };

const SERVICES = [
  { icon: RefreshCw, name: "Buy, Sell, Swap", desc: "A straightforward desk for trading vehicles, with fair, transparent pricing." },
  { icon: Wrench, name: "Repair & Upgrade", desc: "Diagnostics, servicing and performance upgrades from vetted technicians." },
  { icon: Gauge, name: "Diagnose", desc: "Full diagnostic check-up before you buy, sell, or hit the road." },
];

export default async function AutomobilesPage() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicle_listings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(9);

  return (
    <>
      <ModuleHero
        eyebrow="Automobiles"
        title="Buy, sell, swap, and keep it running well."
        description="A full-service desk for vehicles — from listing your next car to diagnosing and repairing the one you already own."
        scene={<AutomobilesScene />}
        note="Interactive 3D model — drag to rotate, scroll to zoom the vehicle"
      />

      <Section id="contents">
        <ScrollFade>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">What we handle</h2>
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

      <Section id="listings">
        <ScrollFade>
          <Eyebrow>Vehicle listings</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Available vehicles</h2>
          <p className="mt-2 text-brand-muted">Updated directly by our team from the admin dashboard.</p>
        </ScrollFade>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles && vehicles.length > 0 ? (
            vehicles.map((v, i) => (
              <Link key={v.id} href={`/automobiles/${v.id}`} className="block">
                <GlassCard delay={i * 70} className="flex flex-col transition hover:-translate-y-0.5 hover:shadow-glass">
                  <div className="flex h-36 items-center justify-center rounded-lg bg-brand-green-mist">
                    <Car className="text-brand-green" size={36} />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <p className="font-bold">{v.make} {v.model}{v.year ? ` (${v.year})` : ""}</p>
                    <span className="shrink-0 rounded-full bg-brand-bg px-2.5 py-1 text-xs font-medium text-brand-muted">
                      {TXN_LABEL[v.transaction_type] ?? v.transaction_type}
                    </span>
                  </div>
                  {v.description && <p className="mt-1 text-sm text-brand-muted">{v.description}</p>}
                  {v.price && (
                    <p className="mt-4 font-extrabold text-brand-green-dark">
                      ₦{Number(v.price).toLocaleString()}
                    </p>
                  )}
                </GlassCard>
              </Link>
            ))
          ) : (
            <GlassCard className="sm:col-span-2 lg:col-span-3 text-center text-brand-muted">
              Vehicle listings will appear here once added from the admin dashboard.
            </GlassCard>
          )}
        </div>
      </Section>

      <Section id="inquire" className="grid gap-10 md:grid-cols-2">
        <ScrollFade>
          <Eyebrow>Talk to the desk</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tell us about your vehicle
          </h2>
          <p className="mt-4 max-w-md text-brand-muted">
            Whether you&apos;re buying, selling, or need a repair booked in, give us the details and
            we&apos;ll follow up.
          </p>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-6 sm:p-8">
          <LeadForm
            module="automobiles"
            title="Vehicle inquiry"
            extraFields={[{ label: "Make / model / year", name: "vehicle_details" }]}
          />
        </ScrollFade>
      </Section>
    </>
  );
}
