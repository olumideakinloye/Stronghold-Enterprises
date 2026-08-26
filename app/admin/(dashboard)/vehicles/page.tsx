"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, Trash2 } from "lucide-react";

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number | null;
  price: number | null;
  transaction_type: "buy" | "sell" | "swap";
  description: string | null;
};

const emptyForm = { make: "", model: "", year: "", price: "", transaction_type: "sell" as Vehicle["transaction_type"], description: "" };

export default function VehiclesPage() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("vehicle_listings").select("*").order("created_at", { ascending: false });
    setItems((data as Vehicle[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("vehicle_listings").insert({
      make: form.make,
      model: form.model,
      year: form.year ? Number(form.year) : null,
      price: form.price ? Number(form.price) : null,
      transaction_type: form.transaction_type,
      description: form.description || null,
    });
    setForm(emptyForm);
    setSaving(false);
    load();
  };

  const remove = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    await supabase.from("vehicle_listings").delete().eq("id", id);
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Vehicle Listings</h1>
      <p className="mt-1 text-sm text-brand-muted">Buy, sell and swap listings.</p>

      <form onSubmit={addItem} className="mt-6 grid gap-3 rounded-xl2 border border-brand-line bg-white p-5 shadow-card sm:grid-cols-3">
        <input required placeholder="Make" value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" />
        <input required placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" />
        <input type="number" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" />
        <input type="number" placeholder="Price (₦)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" />
        <select value={form.transaction_type} onChange={(e) => setForm({ ...form, transaction_type: e.target.value as Vehicle["transaction_type"] })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white">
          <option value="sell">Sell</option>
          <option value="buy">Buy</option>
          <option value="swap">Swap</option>
        </select>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm sm:col-span-3 bg-white" rows={2} />
        <button disabled={saving} className="flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60 sm:col-span-3 sm:w-fit sm:justify-self-start">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
          Add vehicle
        </button>
      </form>

      {loading ? (
        <div className="mt-10 flex justify-center text-brand-muted"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl2 border border-brand-line bg-white p-4 shadow-card">
              <div className="flex items-start justify-between">
                <p className="font-semibold">{item.make} {item.model} {item.year ? `(${item.year})` : ""}</p>
                <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
              </div>
              <p className="mt-1 text-xs capitalize text-brand-muted">{item.transaction_type}</p>
              {item.price && <p className="mt-2 font-bold text-brand-green-dark">₦{Number(item.price).toLocaleString()}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
