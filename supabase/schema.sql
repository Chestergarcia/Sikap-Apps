-- SIKAP backend foundation for Supabase.
-- Run this migration in Supabase SQL Editor before enabling production data.

create extension if not exists "pgcrypto";

create type public.account_status as enum ('active', 'warned', 'suspended');
create type public.post_status as enum ('pending', 'approved', 'rejected');
create type public.notification_type as enum ('moderation', 'report', 'member', 'security', 'reward');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  avatar_url text,
  status public.account_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  body text not null check (char_length(body) between 1 and 5000),
  category text not null default 'Learning',
  status public.post_status not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.post_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (char_length(reason) between 1 and 500),
  resolved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.moderation_reviews (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  moderator_id uuid not null references public.profiles(id) on delete restrict,
  decision public.post_status not null check (decision in ('approved', 'rejected')),
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.rewards_ledger (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete set null,
  points integer not null check (points <> 0),
  status text not null default 'simulated' check (status in ('simulated', 'issued', 'reversed')),
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  type public.notification_type not null,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.profiles(id) on delete restrict,
  action text not null,
  target_type text not null check (target_type in ('member', 'post', 'reward', 'setting')),
  target_id uuid,
  status text not null default 'completed',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index posts_status_created_at_idx on public.posts(status, created_at desc);
create index notifications_recipient_read_idx on public.notifications(recipient_id, read_at, created_at desc);
create index audit_logs_created_at_idx on public.admin_audit_logs(created_at desc);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.post_reports enable row level security;
alter table public.moderation_reviews enable row level security;
alter table public.rewards_ledger enable row level security;
alter table public.notifications enable row level security;
alter table public.admin_audit_logs enable row level security;

create policy "Members can view active profiles" on public.profiles for select to authenticated using (status = 'active' or id = auth.uid());
create policy "Members can update their own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "Members can view approved posts" on public.posts for select to authenticated using (status = 'approved' or author_id = auth.uid());
create policy "Members can create their own posts" on public.posts for insert to authenticated with check (author_id = auth.uid());
create policy "Members can view their notifications" on public.notifications for select to authenticated using (recipient_id = auth.uid());
create policy "Members can mark their notifications read" on public.notifications for update to authenticated using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());
create policy "Members can view their reward history" on public.rewards_ledger for select to authenticated using (member_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(coalesce(new.email, 'Member'), '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
