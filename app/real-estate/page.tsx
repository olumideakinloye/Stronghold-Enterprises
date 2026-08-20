import Link from "next/link";
import { Home as HomeIcon, MapPin, BedDouble, Bath } from "lucide-react";
import ModuleHero from "@/components/ModuleHero";
import RealEstateScene from "@/components/three/RealEstateScene";
import { Section, Eyebrow, GlassCard, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const STATUS_LABEL: Record<string, string> = {
  for_sale: "For Sale",
  for_rent: "For Rent",
  managed: "Managed",
};

export default async function RealEstatePage() {
  const supabase = await createClient();
  const { data: listings } = await supabase
    .from("property_listings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(9);

  return (
    <>
      <ModuleHero
        eyebrow="Real Estate"
        title="Property management and agency, handled properly."
        description="Whether you're buying, renting, or need your property managed while you're away, our agency team keeps every listing current and every tenant relationship sound."
        icon={HomeIcon}
        scene={<RealEstateScene />}
        note="Interactive 3D model — drag to explore the building"
      />

      <Section id="listings">
        <ScrollFade>
          <Eyebrow>Listings</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Available properties</h2>
          <p className="mt-2 text-brand-muted">Updated directly by our team from the admin dashboard.</p>
        </ScrollFade>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings && listings.length > 0 ? (
            listings.map((p, i) => (
              <Link key={p.id} href={`/real-estate/${p.id}`} className="block">
              <GlassCard delay={i * 70} className="flex flex-col transition hover:-translate-y-0.5 hover:shadow-glass">
                <div className="flex h-36 items-center justify-center rounded-lg bg-brand-green-mist">
                  <HomeIcon className="text-brand-green" size={36} />
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <p className="font-bold">{p.title}</p>
                  <span className="shrink-0 rounded-full bg-brand-bg px-2.5 py-1 text-xs font-medium text-brand-muted">
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </div>
                {p.location && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-brand-muted">
                    <MapPin size={14} /> {p.location}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-4 text-sm text-brand-muted">
                  {p.bedrooms != null && (
                    <span className="flex items-center gap-1"><BedDouble size={14} /> {p.bedrooms}</span>
                  )}
                  {p.bathrooms != null && (
                    <span className="flex items-center gap-1"><Bath size={14} /> {p.bathrooms}</span>
                  )}
                </div>
                {p.price && (
                  <p className="mt-4 font-extrabold text-brand-green-dark">
                    ₦{Number(p.price).toLocaleString()}
                  </p>
                )}
              </GlassCard>
              </Link>
            ))
          ) : (
            <GlassCard className="sm:col-span-2 lg:col-span-3 text-center text-brand-muted">
              Property listings will appear here once added from the admin dashboard.
            </GlassCard>
          )}
        </div>
      </Section>

      <Section id="inquire" className="grid gap-10 md:grid-cols-2">
        <ScrollFade>
          <Eyebrow>Speak with an agent</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Buying, renting, or listing a property?
          </h2>
          <p className="mt-4 max-w-md text-brand-muted">
            Tell us what you&apos;re looking for, or the property you&apos;d like managed, and an agent
            will get back to you.
          </p>
        </ScrollFade>
        <ScrollFade delay={150} className="glass-panel rounded-xl2 p-6 sm:p-8">
          <LeadForm
            module="real-estate"
            title="Property inquiry"
            extraFields={[{ label: "Preferred location / budget", name: "location_budget" }]}
          />
        </ScrollFade>
      </Section>
    </>
  );
}
