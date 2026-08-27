"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, Trash2, ImagePlus } from "lucide-react";

type Item = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  category: string | null;
  image_url: string | null;
};

const emptyForm = { title: "", description: "", price: "", category: "", imageFile: null as File | null };

export default function CataloguePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("catalogue_items")
      .select("*")
      .eq("module", "security")
      .order("created_at", { ascending: false });
    setItems((data as Item[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

   

    let image_url: string | null = null;
    if (form.imageFile) {
      const path = `security/${Date.now()}-${form.imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("stronghold-media")
        .upload(path, form.imageFile);
      if (!uploadError) {
        image_url = supabase.storage.from("stronghold-media").getPublicUrl(path).data.publicUrl;
      }
    }

    await supabase.from("catalogue_items").insert({
      module: "security",
      title: form.title,
      description: form.description || null,
      price: form.price ? Number(form.price) : null,
      category: form.category || null,
      image_url,
    });

    setForm(emptyForm);
    setSaving(false);
    load();
  };

  const remove = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    await supabase.from("catalogue_items").delete().eq("id", id);
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Security Catalogue</h1>
      <p className="mt-1 text-sm text-brand-muted">Kits, cameras, solar systems and personnel offerings.</p>

      <form onSubmit={addItem} className="mt-6 grid gap-3 rounded-xl2 border border-brand-line bg-white p-5 shadow-card sm:grid-cols-2">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white"
        />
        <input
          placeholder="Category (e.g. CCTV)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white"
        />
        <input
          type="number"
          placeholder="Price (₦)"
          value={form.price}
          min={1000}
          max={500000000}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-lg border border-brand-line px-3 py-2 text-sm bg-white"
        />
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-brand-line px-3 py-2 text-sm text-brand-muted">
          <ImagePlus size={16} />
          {form.imageFile ? form.imageFile.name : "Upload image (optional)"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] ?? null })}
          />
        </label>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="sm:col-span-2 rounded-lg border border-brand-line px-3 py-2 text-sm bg-white"
          rows={2}
        />
        <button
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60 sm:col-span-2 sm:w-fit sm:justify-self-start"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
          Add item
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
                <button onClick={() => {
                  if (window.confirm("Are you sure you want to remove this item?")) {
                    remove(item.id);
                  }
                }} className="text-red-500 hover:text-red-700">
                  <Trash2 size={15} />
                </button>
              </div>
              {item.description && <p className="mt-1 text-xs text-brand-muted">{item.description}</p>}
              <div className="mt-2 flex items-center justify-between text-sm">
                {item.price && <span className="font-bold text-brand-green-dark">₦{Number(item.price).toLocaleString()}</span>}
                {item.category && <span className="text-xs text-brand-muted">{item.category}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
