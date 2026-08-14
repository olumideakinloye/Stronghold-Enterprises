-- Stronghold Enterprises Ltd — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

-- ========== ENUMS ==========
do $$ begin
  create type module_slug as enum ('security', 'real-estate', 'consultancy', 'logistics', 'automobiles');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_status as enum ('new', 'in_progress', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type property_status as enum ('for_sale', 'for_rent', 'managed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type vehicle_transaction as enum ('buy', 'sell', 'swap');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_role as enum ('super_admin', 'editor');
exception when duplicate_object then null; end $$;

-- ========== TABLES ==========

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  role admin_role not null default 'editor',
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists catalogue_items (
  id uuid primary key default gen_random_uuid(),
  module module_slug not null default 'security',
  title text not null,
  description text,
  price numeric(12,2),
  category text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists property_listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric(14,2),
  location text,
  status property_status not null default 'for_rent',
  bedrooms int,
  bathrooms int,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists vehicle_listings (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  year int,
  price numeric(14,2),
  transaction_type vehicle_transaction not null default 'sell',
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  module module_slug not null,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  meta jsonb default '{}'::jsonb,
  status lead_status not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references admin_users(id) on delete set null,
  action text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ========== INDEXES ==========
create index if not exists idx_catalogue_module on catalogue_items(module);
create index if not exists idx_property_status on property_listings(status);
create index if not exists idx_vehicle_txn on vehicle_listings(transaction_type);
create index if not exists idx_leads_module on leads(module);
create index if not exists idx_leads_status on leads(status);

-- ========== ROW LEVEL SECURITY ==========
alter table admin_users enable row level security;
alter table catalogue_items enable row level security;
alter table property_listings enable row level security;
alter table vehicle_listings enable row level security;
alter table leads enable row level security;
alter table activity_log enable row level security;

-- Helper: is the current auth.uid() a registered admin?
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from admin_users where user_id = auth.uid());
$$ language sql stable security definer;

-- Public read access to listings/catalogue (site visitors browse without login)
create policy "public read catalogue" on catalogue_items for select using (true);
create policy "public read properties" on property_listings for select using (true);
create policy "public read vehicles" on vehicle_listings for select using (true);

-- Only admins can write listings/catalogue
create policy "admin write catalogue" on catalogue_items for all
  using (is_admin()) with check (is_admin());
create policy "admin write properties" on property_listings for all
  using (is_admin()) with check (is_admin());
create policy "admin write vehicles" on vehicle_listings for all
  using (is_admin()) with check (is_admin());

-- Anyone (including anonymous visitors) can submit a lead/inquiry
create policy "public insert leads" on leads for insert with check (true);
-- Only admins can read/update/delete leads
create policy "admin read leads" on leads for select using (is_admin());
create policy "admin update leads" on leads for update using (is_admin());
create policy "admin delete leads" on leads for delete using (is_admin());

-- admin_users: admins can see the roster; only super_admins manage it
create policy "admin read roster" on admin_users for select using (is_admin());
create policy "super admin manage roster" on admin_users for all
  using (exists (select 1 from admin_users a where a.user_id = auth.uid() and a.role = 'super_admin'))
  with check (exists (select 1 from admin_users a where a.user_id = auth.uid() and a.role = 'super_admin'));

-- activity_log: admins can read all, and insert their own entries
create policy "admin read activity" on activity_log for select using (is_admin());
create policy "admin insert activity" on activity_log for insert with check (is_admin());

-- ========== STORAGE ==========
-- Create a public bucket for listing/catalogue images.
insert into storage.buckets (id, name, public)
values ('stronghold-media', 'stronghold-media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select
  using (bucket_id = 'stronghold-media');

create policy "admin upload media" on storage.objects for insert
  with check (bucket_id = 'stronghold-media' and is_admin());

create policy "admin update media" on storage.objects for update
  using (bucket_id = 'stronghold-media' and is_admin());

create policy "admin delete media" on storage.objects for delete
  using (bucket_id = 'stronghold-media' and is_admin());

-- ========== SEED (optional — remove/edit before going live) ==========
insert into catalogue_items (module, title, description, price, category) values
  ('security', 'HD CCTV Camera Kit (4-Channel)', 'Complete 4-camera surveillance kit with NVR and 1TB storage.', 185000, 'CCTV'),
  ('security', '3.5kVA Solar Backup System', 'Solar inverter + battery bank for homes and small offices.', 950000, 'Solar'),
  ('security', 'Armed Escort — Per Trip', 'Licensed armed security personnel for cash-in-transit or VIP moves.', 45000, 'Personnel')
on conflict do nothing;
