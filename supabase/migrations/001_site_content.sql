-- Run in Supabase SQL editor or via CLI. Then create a public storage bucket named "cms"
-- (Storage → New bucket → name: cms → public).
--
-- Do NOT paste content/site-content.json here — JSON is not valid SQL. To load CMS data
-- into `payload`, use: npx tsx scripts/seed-supabase-site-content.ts (with service role in .env.local)
-- or save once from the site admin UI.

create table if not exists public.site_content (
  id smallint primary key default 1,
  constraint site_content_single_row check (id = 1),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Allow public read site_content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

-- Writes use SUPABASE_SERVICE_ROLE_KEY on the server (bypasses RLS).

insert into public.site_content (id, payload)
values (1, '{}'::jsonb)
on conflict (id) do nothing;
