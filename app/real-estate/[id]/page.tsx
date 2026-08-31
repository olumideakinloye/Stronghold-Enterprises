import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home as HomeIcon, MapPin, BedDouble, Bath } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Section, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";

export const revalidate = 60;

const STATUS_LABEL: Record<string, string> = {
  for_sale: "For Sale",
  for_rent: "For Rent",
  managed: "Managed",
};

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
  const { data: property } = await supabase
    .from("property_listings")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!property) notFound();

  return (
    <Section className="max-w-4xl">
      <ScrollFade>
        <Link href="/real-estate#listings" className="flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-green-dark">
          <ArrowLeft size={15} /> Back to listings
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{property.title}</h1>
            {property.location && (
              <p className="mt-2 flex items-center gap-1.5 text-brand-muted">
                <MapPin size={16} /> {property.location}
              </p>
            )}
          </div>
          <span className="rounded-full bg-brand-green-mist px-3 py-1.5 text-sm font-semibold text-brand-green-dark">
            {STATUS_LABEL[property.status] ?? property.status}
          </span>
        </div>

        <div className="mt-6 flex h-64 items-center justify-center rounded-xl2 bg-brand-green-mist sm:h-80">
          <HomeIcon className="text-brand-green" size={56} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6">
          {property.price && (
            <p className="text-2xl font-extrabold text-brand-green-dark">
              ₦{Number(property.price).toLocaleString()}
            </p>
          )}
          {property.bedrooms != null && (
            <span className="flex items-center gap-1.5 text-sm text-brand-muted"><BedDouble size={16} /> {property.bedrooms} bed</span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1.5 text-sm text-brand-muted"><Bath size={16} /> {property.bathrooms} bath</span>
          )}
        </div>

        {property.description && <p className="mt-6 max-w-2xl text-brand-muted">{property.description}</p>}
      </ScrollFade>

      <ScrollFade delay={150} className="glass-panel mt-10 rounded-xl2 p-6 sm:p-8">
        <LeadForm
          module="real-estate"
          title={`Inquire about "${property.title}"`}
          extraFields={[{ label: "Preferred viewing date", name: "viewing_date" }]}
        />
      </ScrollFade>
    </Section>
  );
}
