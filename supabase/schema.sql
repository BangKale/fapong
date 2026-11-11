-- Jalankan sekali di Supabase SQL Editor.

create table if not exists public.costumes (
  id uuid primary key default gen_random_uuid(),
  sort int not null,
  label text not null,
  name text not null default '',
  note text not null default '',
  image_url text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  sort int not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null
);

alter table public.costumes enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "public read costumes" on public.costumes;
create policy "public read costumes" on public.costumes for select using (true);
drop policy if exists "auth write costumes" on public.costumes;
create policy "auth write costumes" on public.costumes for all to authenticated using (true) with check (true);

drop policy if exists "public read gallery" on public.gallery_photos;
create policy "public read gallery" on public.gallery_photos for select using (true);
drop policy if exists "auth write gallery" on public.gallery_photos;
create policy "auth write gallery" on public.gallery_photos for all to authenticated using (true) with check (true);

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);
drop policy if exists "auth write settings" on public.site_settings;
create policy "auth write settings" on public.site_settings for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "auth write media" on storage.objects;
create policy "auth write media" on storage.objects for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
