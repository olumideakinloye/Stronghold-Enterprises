"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import type { ModuleSlug } from "@/lib/supabase/types";
import { Loader2, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number").optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a bit more (min. 10 characters)"),
  // Honeypot: real users never fill this in
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LeadForm({
  module,
  extraFields,
  title = "Send us your request",
}: {
  module: ModuleSlug;
  extraFields?: { label: string; name: string }[];
  title?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [meta, setMeta] = useState<Record<string, string>>({});

  const onSubmit = async (values: FormValues) => {
    if (values.website) return; // honeypot triggered — silently drop
    setStatus("idle");
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
      module,
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      message: values.message,
      meta,
      status: "new",
    });

    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    reset();
    setMeta({});
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl2 bg-brand-green-mist p-8 text-center">
        <CheckCircle2 className="text-brand-green" size={36} />
        <p className="font-semibold text-brand-green-dark">Request received</p>
        <p className="max-w-sm text-sm text-brand-muted">
          Thanks — a member of our team will reach out shortly to follow up on your request.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-brand-green-dark underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-lg font-semibold">{title}</p>

      {/* honeypot field, visually hidden */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input
            className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-green"
            placeholder="Ada Lovelace"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input
            className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-green"
            placeholder="0803 000 0000"
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-green"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {extraFields?.map((f) => (
        <div key={f.name}>
          <label className="mb-1 block text-sm font-medium">{f.label}</label>
          <input
            className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-green"
            onChange={(e) => setMeta((m) => ({ ...m, [f.name]: e.target.value }))}
          />
        </div>
      ))}

      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-green"
          placeholder="Tell us what you need..."
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your request. Please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-dark disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        Submit Request
      </button>
    </form>
  );
}
