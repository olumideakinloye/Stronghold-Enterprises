"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { LeadStatus, ModuleSlug } from "@/lib/supabase/types";
import { Loader2, Mail, Phone } from "lucide-react";
import clsx from "clsx";

type Lead = {
  id: string;
  module: ModuleSlug;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  meta: Record<string, unknown> | null;
  status: LeadStatus;
  created_at: string;
};

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-brand-green-mist text-brand-green-dark",
  in_progress: "bg-amber-100 text-amber-700",
  closed: "bg-brand-bg text-brand-muted",
};

export default function LeadsInboxPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ModuleSlug | "all">("all");
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  const visible = filter === "all" ? leads : leads.filter((l) => l.module === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Leads Inbox</h1>
          <p className="mt-1 text-sm text-brand-muted">Every inquiry submitted across all five modules.</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as ModuleSlug | "all")}
          className="rounded-lg border border-brand-line bg-white px-3 py-2 text-sm"
        >
          <option value="all">All modules</option>
          <option value="security">Security</option>
          <option value="real-estate">Real Estate</option>
          <option value="consultancy">Consultancy</option>
          <option value="logistics">Logistics</option>
          <option value="automobiles">Automobiles</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center text-brand-muted">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {visible.length === 0 && (
            <p className="rounded-xl2 border border-brand-line bg-white p-8 text-center text-sm text-brand-muted">
              No leads for this filter yet.
            </p>
          )}
          {visible.map((lead) => (
            <div key={lead.id} className="rounded-xl2 border border-brand-line bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{lead.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-brand-muted">
                    <span className="flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
                    {lead.phone && <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>}
                    <span className="rounded-full bg-brand-bg px-2 py-0.5 capitalize">{lead.module}</span>
                    <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {(["new", "in_progress", "closed"] as LeadStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(lead.id, s)}
                      className={clsx(
                        "rounded-full px-2.5 py-1 text-xs font-semibold capitalize transition",
                        lead.status === s ? STATUS_STYLES[s] : "bg-brand-bg text-brand-muted hover:bg-brand-line"
                      )}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-brand-ink/85">{lead.message}</p>
              {lead.meta && Object.keys(lead.meta).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(lead.meta).map(([k, v]) => (
                    <span key={k} className="rounded-full bg-brand-bg px-2.5 py-1 text-xs text-brand-muted">
                      {k.replace(/_/g, " ")}: {String(v)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
