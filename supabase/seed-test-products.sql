-- SB LUXURY CASUAL - Small catalog seed for Supabase SQL Editor
-- Safe to re-run. Inserts or updates a few active products for frontend testing.

insert into public.categories (name, slug, description)
values
  ('Surchemises', 'surchemises', 'Surchemises elegantes et modernes'),
  ('Pantalons', 'pantalons', 'Pantalons premium pour homme'),
  ('Accessoires', 'accessoires', 'Accessoires de mode masculine')
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description;

insert into public.products (
  category_id,
  name,
  slug,
  description,
  price,
  compare_at_price,
  currency,
  is_featured,
  is_new,
  status
)
select
  c.id,
  seed.name,
  seed.slug,
  seed.description,
  seed.price,
  seed.compare_at_price,
  'FCFA',
  seed.is_featured,
  seed.is_new,
  'active'
from (
  values
    (
      'surchemises',
      'Surchemise beige premium',
      'surchemise-beige-premium',
      'Surchemise beige elegante, pensee pour une silhouette casual raffinee.',
      32000,
      null::integer,
      true,
      true
    ),
    (
      'pantalons',
      'Pantalon noir ajuste',
      'pantalon-noir-ajuste',
      'Pantalon noir structure avec une coupe moderne et confortable.',
      28000,
      null::integer,
      false,
      true
    ),
    (
      'accessoires',
      'Ceinture cuir noir',
      'ceinture-cuir-noir',
      'Ceinture en cuir noir, finition sobre pour completer une tenue premium.',
      15000,
      null::integer,
      false,
      false
    )
) as seed (
  category_slug,
  name,
  slug,
  description,
  price,
  compare_at_price,
  is_featured,
  is_new
)
join public.categories c on c.slug = seed.category_slug
on conflict (slug) do update
set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  compare_at_price = excluded.compare_at_price,
  currency = excluded.currency,
  is_featured = excluded.is_featured,
  is_new = excluded.is_new,
  status = excluded.status;

insert into public.product_images (product_id, url, alt_text, position)
select
  p.id,
  seed.url,
  seed.alt_text,
  seed.position
from (
  values
    ('surchemise-beige-premium', '/p7.png', 'Surchemise beige premium SB LUXURY CASUAL', 0),
    ('pantalon-noir-ajuste', '/p4.png', 'Pantalon noir ajuste SB LUXURY CASUAL', 0),
    ('ceinture-cuir-noir', '/p8.png', 'Ceinture cuir noir SB LUXURY CASUAL', 0)
) as seed (product_slug, url, alt_text, position)
join public.products p on p.slug = seed.product_slug
on conflict (product_id, position) do update
set
  url = excluded.url,
  alt_text = excluded.alt_text;

insert into public.product_variants (product_id, size, color, stock_quantity)
select
  p.id,
  seed.size,
  seed.color,
  seed.stock_quantity
from (
  values
    ('surchemise-beige-premium', 'M', 'Beige', 4),
    ('surchemise-beige-premium', 'L', 'Beige', 3),
    ('pantalon-noir-ajuste', 'M', 'Noir', 5),
    ('pantalon-noir-ajuste', 'L', 'Noir', 5),
    ('ceinture-cuir-noir', 'Unique', 'Noir', 8)
) as seed (product_slug, size, color, stock_quantity)
join public.products p on p.slug = seed.product_slug
on conflict (product_id, size, color) do update
set stock_quantity = excluded.stock_quantity;

select
  p.name,
  p.slug,
  p.price,
  p.currency,
  c.name as category_name
from public.products p
left join public.categories c on c.id = p.category_id
where p.slug in (
  'surchemise-beige-premium',
  'pantalon-noir-ajuste',
  'ceinture-cuir-noir'
)
order by p.created_at desc;
