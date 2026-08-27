"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, Trash2 } from "lucide-react";

type Listing = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  location: string | null;
  status: "for_sale" | "for_rent" | "managed";
  bedrooms: number | null;
  bathrooms: number | null;
};

const emptyForm = {
  title: "",
  description: "",
  price: "",
  location: "",
  status: "for_rent" as Listing["status"],
  bedrooms: "",
  bathrooms: "",
};

export default function PropertiesPage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("property_listings").select("*").order("created_at", { ascending: false });
    setItems((data as Listing[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("property_listings").insert({
      title: form.title,
      description: form.description || null,
      price: form.price ? Number(form.price) : null,
      location: form.location || null,
      status: form.status,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
    });
    setForm(emptyForm);
    setSaving(false);
    load();
  };

  const remove = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    await supabase.from("property_listings").delete().eq("id", id);
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Property Listings</h1>
      <p className="mt-1 text-sm text-brand-muted">Sale, rental and managed properties.</p>

      <form onSubmit={addItem} className="mt-6 grid gap-3 rounded-xl2 border border-brand-line bg-white p-5 shadow-card sm:grid-cols-3">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm sm:col-span-2 bg-white"/>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Listing["status"] })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white">
          <option value="for_rent">For Rent</option>
          <option value="for_sale">For Sale</option>
          <option value="managed">Managed</option>
        </select>
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white"/>
        <input type="number" placeholder="Price (₦)" value={form.price} min={1000} max={500000000} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" />
        <div className="flex gap-2">
          <input type="number" placeholder="Beds" value={form.bedrooms} min={1} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" />
          <input type="number" placeholder="Baths" value={form.bathrooms} min={1} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="sm:col-span-3 rounded-lg border border-brand-line px-3 py-2 text-sm bg-white" rows={2} />
        <button disabled={saving} className="flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60 sm:col-span-3 sm:w-fit sm:justify-self-start">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
          Add listing
        </button>
      </form>

      {loading ? (
        <div className="mt-10 flex justify-center text-brand-muted"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl2 border border-brand-line bg-white p-4 shadow-card">
              <div className="flex items-start justify-between">
                <p className="font-semibold">{item.title}</p>
                <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
              </div>
              <p className="mt-1 text-xs capitalize text-brand-muted">{item.status.replace("_", " ")} · {item.location}</p>
              {item.price && <p className="mt-2 font-bold text-brand-green-dark">₦{Number(item.price).toLocaleString()}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
