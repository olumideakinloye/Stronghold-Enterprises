import { createClient } from "@/lib/supabase/server";
import { Inbox, ShieldCheck, Home, Car } from "lucide-react";

export default async function AdminOverviewPage() {
  const supabase = createClient();

  const [{ count: leadsCount }, { count: newLeadsCount }, { count: catalogueCount }, { count: propertyCount }, { count: vehicleCount }] =
    await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("catalogue_items").select("*", { count: "exact", head: true }),
      supabase.from("property_listings").select("*", { count: "exact", head: true }),
      supabase.from("vehicle_listings").select("*", { count: "exact", head: true }),
    ]);

  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const cards = [
    { label: "Total Leads", value: leadsCount ?? 0, sub: `${newLeadsCount ?? 0} new`, icon: Inbox },
    { label: "Catalogue Items", value: catalogueCount ?? 0, sub: "Security module", icon: ShieldCheck },
    { label: "Property Listings", value: propertyCount ?? 0, sub: "Real Estate module", icon: Home },
    { label: "Vehicle Listings", value: vehicleCount ?? 0, sub: "Automobiles module", icon: Car },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-brand-muted">A snapshot across every business module.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl2 border border-brand-line bg-white p-5 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-mist text-brand-green-dark">
              <c.icon size={16} />
            </span>
            <p className="mt-3 text-2xl font-extrabold">{c.value}</p>
            <p className="text-xs text-brand-muted">{c.label} · {c.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl2 border border-brand-line bg-white p-6 shadow-card">
        <p className="font-bold">Recent leads</p>
        <div className="mt-4 divide-y divide-brand-line">
          {recentLeads && recentLeads.length > 0 ? (
            recentLeads.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-xs text-brand-muted">{l.email} · {l.module}</p>
                </div>
                <span className="rounded-full bg-brand-bg px-2.5 py-1 text-xs font-medium capitalize text-brand-muted">
                  {l.status.replace("_", " ")}
                </span>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-brand-muted">No leads yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
