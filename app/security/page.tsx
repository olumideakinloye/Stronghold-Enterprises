import { ShieldCheck, Camera, Sun, Users } from "lucide-react";
import ModuleHero from "@/components/ModuleHero";
import SecurityScene from "@/components/three/SecurityScene";
import { Section, Eyebrow, GlassCard, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const CATEGORIES = [
  { icon: Users, name: "Security Experts", desc: "Vetted, trained personnel for residential, corporate and event security." },
  { icon: Camera, name: "CCTV Systems", desc: "HD camera kits with remote monitoring and cloud or local storage." },
  { icon: Sun, name: "Solar Backup", desc: "Solar inverter and battery systems sized for homes and small offices." },
  { icon: ShieldCheck, name: "Site Assessment", desc: "On-site risk assessment with a written security recommendation." },
];

export default async function SecurityPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("catalogue_items")
    .select("*")
    .eq("module", "security")
    .order("created_at", { ascending: false })
    .limit(9);

  return (
    <>
      <ModuleHero
        eyebrow="Security"
        title="Protection you can see, and systems that never sleep."
        description="From armed personnel to CCTV kits and solar-backed power, we cover the full spectrum of physical security for homes, offices and estates."
        icon={ShieldCheck}
        scene={<SecurityScene />}
        note="Interactive 3D model — drag to inspect the camera unit"
      />

      <Section>
        <ScrollFade>
          <Eyebrow>Core offerings</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">What we provide</h2>
        </ScrollFade>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <GlassCard key={c.name} delay={i * 80}>
              <c.icon className="text-brand-green" size={22} />
              <p className="mt-3 font-bold">{c.name}</p>
              <p className="mt-1 text-sm text-brand-muted">{c.desc}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section id="catalogue">
        <ScrollFade>
          <Eyebrow>Product catalogue</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Kits &amp; equipment</h2>
          <p className="mt-2 text-brand-muted">Managed live from our admin dashboard.</p>
        </ScrollFade>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items && items.length > 0 ? (
            items.map((item, i) => (
              <GlassCard key={item.id} delay={i * 70} className="flex flex-col">
                <div className="flex h-36 items-center justify-center rounded-lg bg-brand-green-mist">
                  <ShieldCheck className="text-brand-green" size={36} />
                </div>
                <p className="mt-4 font-bold">{item.title}</p>
                {item.description && <p className="mt-1 text-sm text-brand-muted">{item.description}</p>}
                <div className="mt-4 flex items-center justify-between">
                  {item.price && (
                    <span className="font-extrabold text-brand-green-dark">
                      ₦{Number(item.price).toLocaleString()}
                    </span>
                  )}
                  {item.category && (
                    <span className="rounded-full bg-brand-bg px-2.5 py-1 text-xs font-medium text-brand-muted">
                      {item.category}
                    </span>
                  )}
                </div>
              </GlassCard>
            ))
          ) : (
            <GlassCard className="sm:col-span-2 lg:col-span-3 text-center text-brand-muted">
              Catalogue items will appear here once added from the admin dashboard.
            </GlassCard>
          )}
        </div>
      </Section>

      <Section id="quote" className="grid gap-10 md:grid-cols-2">
        <ScrollFade>
          <Eyebrow>Request a quote</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tell us what you need protected
          </h2>
          <p className="mt-4 max-w-md text-brand-muted">
            Share a few details and our security team will follow up with a tailored quote,
            usually within one working day.
          </p>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-6 sm:p-8">
          <LeadForm
            module="security"
            title="Security quote request"
            extraFields={[{ label: "Property / site type", name: "site_type" }]}
          />
        </ScrollFade>
      </Section>
    </>
  );
}
