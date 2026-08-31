import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Car } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Section, ScrollFade } from "@/components/ui";
import LeadForm from "@/components/LeadForm";

export const revalidate = 60;

const TXN_LABEL: Record<string, string> = { buy: "Buy", sell: "Sell", swap: "Swap" };

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
  const { data: vehicle } = await supabase
    .from("vehicle_listings")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!vehicle) notFound();

  const name = `${vehicle.make} ${vehicle.model}${vehicle.year ? ` (${vehicle.year})` : ""}`;

  return (
    <Section className="max-w-4xl">
      <ScrollFade>
        <Link href="/automobiles#listings" className="flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-green-dark">
          <ArrowLeft size={15} /> Back to listings
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{name}</h1>
          <span className="rounded-full bg-brand-green-mist px-3 py-1.5 text-sm font-semibold text-brand-green-dark">
            {TXN_LABEL[vehicle.transaction_type] ?? vehicle.transaction_type}
          </span>
        </div>

        <div className="mt-6 flex h-64 items-center justify-center rounded-xl2 bg-brand-green-mist sm:h-80">
          <Car className="text-brand-green" size={56} />
        </div>

        {vehicle.price && (
          <p className="mt-6 text-2xl font-extrabold text-brand-green-dark">
            ₦{Number(vehicle.price).toLocaleString()}
          </p>
        )}

        {vehicle.description && <p className="mt-6 max-w-2xl text-brand-muted">{vehicle.description}</p>}
      </ScrollFade>

      <ScrollFade delay={150} className="glass-panel mt-10 rounded-xl2 p-6 sm:p-8">
        <LeadForm
          module="automobiles"
          title={`Inquire about the ${name}`}
          extraFields={[{ label: "Preferred inspection date", name: "inspection_date" }]}
        />
      </ScrollFade>
    </Section>
  );
}
