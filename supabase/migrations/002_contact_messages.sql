-- Inbox for contact form submissions (admin reads via service role only).

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  email_sent boolean not null default false,
  dev_mock boolean not null default false,
  error_detail text
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- No SELECT/INSERT policies: anon cannot read or write. Server uses service role.
