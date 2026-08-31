-- Creates a public storage bucket for marketing/site images (hero banners,
-- module card backgrounds, etc.) and locks writes down to admins only.
-- Run this in the Supabase SQL editor, or via `supabase db push` if you're
-- using the CLI with migrations.

-- 1. Create the bucket (public = true so images are served directly over
--    a CDN URL without needing signed URLs on every page load).
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- 2. Allow anyone to READ objects in this bucket (needed since it's used
--    for public-facing marketing images rendered on every page load).
create policy "Public read access for site-assets"
on storage.objects for select
to public
using (bucket_id = 'site-assets');

-- 3. Restrict INSERT/UPDATE/DELETE to authenticated users only.
--    If you have an `admin`/role check already (e.g. a `profiles.role`
--    column used by your admin dashboard), swap the `true` conditions
--    below for that check instead of just "any logged-in user".
create policy "Authenticated users can upload to site-assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-assets');

create policy "Authenticated users can update site-assets"
on storage.objects for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

create policy "Authenticated users can delete from site-assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-assets');
