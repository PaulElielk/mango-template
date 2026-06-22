-- SB LUXURY CASUAL - Public order request insert policies
-- Run this in the Supabase SQL Editor.
-- This keeps customers/orders/order_items private: public users can INSERT only, not SELECT.

alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.customers to anon, authenticated;
grant insert on table public.orders to anon, authenticated;
grant insert on table public.order_items to anon, authenticated;

drop policy if exists "Public can create customers" on public.customers;
drop policy if exists "Public can create orders" on public.orders;
drop policy if exists "Public can create order items" on public.order_items;

create policy "Public can create customers"
on public.customers
for insert
to anon, authenticated
with check (true);

create policy "Public can create orders"
on public.orders
for insert
to anon, authenticated
with check (true);

create policy "Public can create order items"
on public.order_items
for insert
to anon, authenticated
with check (true);

-- Optional verification query after running the script:
-- select
--   schemaname,
--   tablename,
--   policyname,
--   roles,
--   cmd,
--   qual,
--   with_check
-- from pg_policies
-- where schemaname = 'public'
--   and tablename in ('customers', 'orders', 'order_items')
-- order by tablename, policyname;
