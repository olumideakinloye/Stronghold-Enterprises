"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client. Not parameterized with the Database generic —
 * lib/supabase/types.ts is kept as a hand-maintained reference/DTO source;
 * once you run `supabase gen types typescript` against your live project,
 * swap that file in and re-add `<Database>` here for full type inference.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
