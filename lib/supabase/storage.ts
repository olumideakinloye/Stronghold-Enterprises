/**
 * Builds a public URL for an object in Supabase Storage.
 *
 * Since the `site-assets` bucket is public, the URL is fully deterministic —
 * no network call or Supabase client instance needed, so this is safe to
 * call at module scope in both server and client components.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SITE_ASSETS_BUCKET = "site-assets";

export function getPublicAssetUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${SITE_ASSETS_BUCKET}/${path}`;
}
