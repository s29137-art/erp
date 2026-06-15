-- Таблица заявок клиентов (лидов).
-- Выполните этот SQL в Supabase: проект → SQL Editor → New query → Run.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  niche       text,
  turnover    text,
  reason      text
);

-- Включаем Row Level Security
alter table public.leads enable row level security;

-- Разрешаем добавлять заявки (insert) анонимным И вошедшим пользователям,
-- но не читать чужие. Читать заявки сможете вы через дашборд Supabase
-- (там действует service_role, который обходит RLS).
drop policy if exists "anon can insert leads" on public.leads;
create policy "anyone can insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
