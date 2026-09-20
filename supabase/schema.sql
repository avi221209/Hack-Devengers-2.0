-- Dukaan Ready: Supabase Database Schema
-- Copy and paste this entire script into your Supabase SQL Editor and click "Run".

create table if not exists businesses (
  id text primary key default gen_random_uuid()::text,
  slug text unique not null,
  name text not null,
  category text not null,
  services text not null,
  services_list jsonb default '[]'::jsonb,
  timings text not null,
  address text not null,
  whatsapp_number text not null,
  price_range text,
  raw_description text,
  generated_tagline text not null,
  generated_about text not null,
  highlight_chips jsonb default '[]'::jsonb,
  theme_color text default 'terracotta',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indices for fast lookups
create index if not exists idx_businesses_slug on businesses(slug);
create index if not exists idx_businesses_whatsapp on businesses(whatsapp_number);

-- Enable Row Level Security (RLS)
alter table businesses enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Allow public read access to businesses" on businesses;
drop policy if exists "Allow public insert to businesses" on businesses;
drop policy if exists "Allow public update to businesses" on businesses;

-- 1. Public can view all storefronts
create policy "Allow public read access to businesses"
  on businesses for select
  using (true);

-- 2. Anyone can create a new storefront (intake form)
create policy "Allow public insert to businesses"
  on businesses for insert
  with check (true);

-- 3. Allow updates for storefront management
create policy "Allow public update to businesses"
  on businesses for update
  using (true);
