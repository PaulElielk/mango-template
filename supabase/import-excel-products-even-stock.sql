-- SB LUXURY CASUAL - Excel product import
-- Source folder: product excel/
-- Stock policy: split total product stock evenly across listed sizes.
-- If stock does not divide evenly, earlier sizes receive the extra unit.
-- Example: 10 over S,M,L,XL becomes 3,3,2,2.

insert into public.categories (name, slug, description)
values
  ('Chemises', 'chemises', 'Chemises premium pour homme'),
  ('Surchemises', 'surchemises', 'Surchemises elegantes et modernes')
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
  null::integer,
  'FCFA',
  false,
  true,
  'active'
from (
  values
    ('chemises', 'Chemise Akeikoi A Bloc Couleur', 'chemise-akeikoi-a-bloc-couleur', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Alepe Blanc', 'chemise-alepe-blanc', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Alepe Noire', 'chemise-alepe-noire', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Charmeur A Bloc Couleur', 'chemise-charmeur-a-bloc-couleur', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Elephant CIV2026 Blanche', 'chemise-elephant-civ2026-blanche', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Elephant CIV2026 Noire', 'chemise-elephant-civ2026-noire', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Gribouillage Blanc', 'chemise-gribouillage-blanc', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Gribouillage Bleu Nuit', 'chemise-gribouillage-bleu-nuit', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Mamie Adjoua Blanche', 'chemise-mamie-adjoua-blanche', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Mamie Adjoua Noire', 'chemise-mamie-adjoua-noire', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Mirage A Bloc Couleur', 'chemise-mirage-a-bloc-couleur', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('chemises', 'Chemise Romance A Bloc Couleur', 'chemise-romance-a-bloc-couleur', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('surchemises', 'Surchemise Adingra Vert Kaki', 'surchemise-adingra-vert-kaki', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('surchemises', 'Surchemise Adingra Noire', 'surchemise-adingra-noire', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000),
    ('surchemises', 'Surchemise Adingra Terracota', 'surchemise-adingra-terracota', 'Produit SB LUXURY CASUAL importe depuis le catalogue Excel.', 35000)
) as seed (category_slug, name, slug, description, price)
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

delete from public.product_images pi
using public.products p
where pi.product_id = p.id
  and p.slug in (
    'chemise-akeikoi-a-bloc-couleur',
    'chemise-alepe-blanc',
    'chemise-alepe-noire',
    'chemise-charmeur-a-bloc-couleur',
    'chemise-elephant-civ2026-blanche',
    'chemise-elephant-civ2026-noire',
    'chemise-gribouillage-blanc',
    'chemise-gribouillage-bleu-nuit',
    'chemise-mamie-adjoua-blanche',
    'chemise-mamie-adjoua-noire',
    'chemise-mirage-a-bloc-couleur',
    'chemise-romance-a-bloc-couleur',
    'surchemise-adingra-vert-kaki',
    'surchemise-adingra-noire',
    'surchemise-adingra-terracota'
  );

insert into public.product_images (product_id, url, alt_text, position)
select
  p.id,
  seed.url,
  seed.alt_text,
  seed.position
from (
  values
    ('chemise-akeikoi-a-bloc-couleur', '/products/chemise-akeikoi-a-bloc-couleur-1.jpeg', 'Chemise Akeikoi A Bloc Couleur image 1', 0),
    ('chemise-akeikoi-a-bloc-couleur', '/products/chemise-akeikoi-a-bloc-couleur-2.jpeg', 'Chemise Akeikoi A Bloc Couleur image 2', 1),
    ('chemise-alepe-blanc', '/products/chemise-alepe-blanc-1.png', 'Chemise Alepe Blanc image 1', 0),
    ('chemise-alepe-blanc', '/products/chemise-alepe-blanc-2.png', 'Chemise Alepe Blanc image 2', 1),
    ('chemise-alepe-noire', '/products/chemise-alepe-noire-1.jpeg', 'Chemise Alepe Noire image 1', 0),
    ('chemise-alepe-noire', '/products/chemise-alepe-noire-2.jpeg', 'Chemise Alepe Noire image 2', 1),
    ('chemise-alepe-noire', '/products/chemise-alepe-noire-3.jpeg', 'Chemise Alepe Noire image 3', 2),
    ('chemise-charmeur-a-bloc-couleur', '/products/chemise-charmeur-a-bloc-couleur-1.jpeg', 'Chemise Charmeur A Bloc Couleur image 1', 0),
    ('chemise-charmeur-a-bloc-couleur', '/products/chemise-charmeur-a-bloc-couleur-2.jpeg', 'Chemise Charmeur A Bloc Couleur image 2', 1),
    ('chemise-elephant-civ2026-blanche', '/products/chemise-elephant-civ2026-blanche-1.jpeg', 'Chemise Elephant Civ2026 Blanche image 1', 0),
    ('chemise-elephant-civ2026-blanche', '/products/chemise-elephant-civ2026-blanche-2.jpeg', 'Chemise Elephant Civ2026 Blanche image 2', 1),
    ('chemise-elephant-civ2026-blanche', '/products/chemise-elephant-civ2026-blanche-3.jpeg', 'Chemise Elephant Civ2026 Blanche image 3', 2),
    ('chemise-elephant-civ2026-noire', '/products/chemise-elephant-civ2026-noire-1.jpeg', 'Chemise Elephant Civ2026 Noire image 1', 0),
    ('chemise-elephant-civ2026-noire', '/products/chemise-elephant-civ2026-noire-2.jpeg', 'Chemise Elephant Civ2026 Noire image 2', 1),
    ('chemise-gribouillage-blanc', '/products/chemise-gribouillage-blanc-1.jpeg', 'Chemise Gribouillage Blanc image 1', 0),
    ('chemise-gribouillage-blanc', '/products/chemise-gribouillage-blanc-2.jpeg', 'Chemise Gribouillage Blanc image 2', 1),
    ('chemise-gribouillage-bleu-nuit', '/products/chemise-gribouillage-bleu-nuit-1.jpeg', 'Chemise Gribouillage Bleu Nuit image 1', 0),
    ('chemise-gribouillage-bleu-nuit', '/products/chemise-gribouillage-bleu-nuit-2.jpeg', 'Chemise Gribouillage Bleu Nuit image 2', 1),
    ('chemise-gribouillage-bleu-nuit', '/products/chemise-gribouillage-bleu-nuit-3.jpeg', 'Chemise Gribouillage Bleu Nuit image 3', 2),
    ('chemise-mamie-adjoua-blanche', '/products/chemise-mamie-adjoua-blanche-1.png', 'Chemise Mamie Adjoua Blanche image 1', 0),
    ('chemise-mamie-adjoua-blanche', '/products/chemise-mamie-adjoua-blanche-2.png', 'Chemise Mamie Adjoua Blanche image 2', 1),
    ('chemise-mamie-adjoua-noire', '/products/chemise-mamie-adjoua-noire-1.png', 'Chemise Mamie Adjoua Noire image 1', 0),
    ('chemise-mamie-adjoua-noire', '/products/chemise-mamie-adjoua-noire-2.png', 'Chemise Mamie Adjoua Noire image 2', 1),
    ('chemise-mirage-a-bloc-couleur', '/products/chemise-mirage-a-bloc-couleur-1.jpeg', 'Chemise Mirage A Bloc Couleur image 1', 0),
    ('chemise-mirage-a-bloc-couleur', '/products/chemise-mirage-a-bloc-couleur-2.jpeg', 'Chemise Mirage A Bloc Couleur image 2', 1),
    ('chemise-mirage-a-bloc-couleur', '/products/chemise-mirage-a-bloc-couleur-3.jpeg', 'Chemise Mirage A Bloc Couleur image 3', 2),
    ('chemise-romance-a-bloc-couleur', '/products/chemise-romance-a-bloc-couleur-1.png', 'Chemise Romance A Bloc Couleur image 1', 0),
    ('chemise-romance-a-bloc-couleur', '/products/chemise-romance-a-bloc-couleur-2.png', 'Chemise Romance A Bloc Couleur image 2', 1),
    ('surchemise-adingra-vert-kaki', '/products/surchemise-adingra-vert-kaki-1.png', 'Surchemise Adingra Vert Kaki image 1', 0),
    ('surchemise-adingra-vert-kaki', '/products/surchemise-adingra-vert-kaki-2.png', 'Surchemise Adingra Vert Kaki image 2', 1),
    ('surchemise-adingra-vert-kaki', '/products/surchemise-adingra-vert-kaki-3.png', 'Surchemise Adingra Vert Kaki image 3', 2),
    ('surchemise-adingra-noire', '/products/surchemise-adingra-noire-1.jpeg', 'Surchemise Adingra Noire image 1', 0),
    ('surchemise-adingra-noire', '/products/surchemise-adingra-noire-2.png', 'Surchemise Adingra Noire image 2', 1),
    ('surchemise-adingra-terracota', '/products/surchemise-adingra-terracota-1.png', 'Surchemise Adingra Terracota image 1', 0)
) as seed (product_slug, url, alt_text, position)
join public.products p on p.slug = seed.product_slug
on conflict (product_id, position) do update
set
  url = excluded.url,
  alt_text = excluded.alt_text;

delete from public.product_variants pv
using public.products p
where pv.product_id = p.id
  and p.slug in (
    'chemise-akeikoi-a-bloc-couleur',
    'chemise-alepe-blanc',
    'chemise-alepe-noire',
    'chemise-charmeur-a-bloc-couleur',
    'chemise-elephant-civ2026-blanche',
    'chemise-elephant-civ2026-noire',
    'chemise-gribouillage-blanc',
    'chemise-gribouillage-bleu-nuit',
    'chemise-mamie-adjoua-blanche',
    'chemise-mamie-adjoua-noire',
    'chemise-mirage-a-bloc-couleur',
    'chemise-romance-a-bloc-couleur',
    'surchemise-adingra-vert-kaki',
    'surchemise-adingra-noire',
    'surchemise-adingra-terracota'
  );

insert into public.product_variants (product_id, size, color, stock_quantity)
select
  p.id,
  seed.size,
  seed.color,
  seed.stock_quantity
from (
  values
    ('chemise-akeikoi-a-bloc-couleur', 'M', 'Bloc couleur', 2),
    ('chemise-akeikoi-a-bloc-couleur', 'L', 'Bloc couleur', 1),
    ('chemise-alepe-blanc', 'S', 'Blanche', 3),
    ('chemise-alepe-blanc', 'M', 'Blanche', 3),
    ('chemise-alepe-blanc', 'L', 'Blanche', 2),
    ('chemise-alepe-blanc', 'XL', 'Blanche', 2),
    ('chemise-alepe-noire', 'S', 'Noire', 3),
    ('chemise-alepe-noire', 'M', 'Noire', 3),
    ('chemise-alepe-noire', 'L', 'Noire', 2),
    ('chemise-alepe-noire', 'XL', 'Noire', 2),
    ('chemise-charmeur-a-bloc-couleur', 'M', 'Bloc couleur', 2),
    ('chemise-charmeur-a-bloc-couleur', 'L', 'Bloc couleur', 2),
    ('chemise-charmeur-a-bloc-couleur', 'XL', 'Bloc couleur', 1),
    ('chemise-elephant-civ2026-blanche', 'S', 'Blanche', 3),
    ('chemise-elephant-civ2026-blanche', 'M', 'Blanche', 3),
    ('chemise-elephant-civ2026-blanche', 'L', 'Blanche', 2),
    ('chemise-elephant-civ2026-blanche', 'XL', 'Blanche', 2),
    ('chemise-elephant-civ2026-noire', 'S', 'Noire', 3),
    ('chemise-elephant-civ2026-noire', 'M', 'Noire', 3),
    ('chemise-elephant-civ2026-noire', 'L', 'Noire', 2),
    ('chemise-elephant-civ2026-noire', 'XL', 'Noire', 2),
    ('chemise-gribouillage-blanc', 'S', 'Blanche', 3),
    ('chemise-gribouillage-blanc', 'M', 'Blanche', 3),
    ('chemise-gribouillage-blanc', 'L', 'Blanche', 2),
    ('chemise-gribouillage-blanc', 'XL', 'Blanche', 2),
    ('chemise-gribouillage-bleu-nuit', 'S', 'Bleu nuit', 3),
    ('chemise-gribouillage-bleu-nuit', 'M', 'Bleu nuit', 3),
    ('chemise-gribouillage-bleu-nuit', 'L', 'Bleu nuit', 2),
    ('chemise-gribouillage-bleu-nuit', 'XL', 'Bleu nuit', 2),
    ('chemise-mamie-adjoua-blanche', 'M', 'Blanche', 2),
    ('chemise-mamie-adjoua-blanche', 'L', 'Blanche', 2),
    ('chemise-mamie-adjoua-blanche', 'XL', 'Blanche', 1),
    ('chemise-mamie-adjoua-noire', 'M', 'Noire', 2),
    ('chemise-mamie-adjoua-noire', 'L', 'Noire', 2),
    ('chemise-mamie-adjoua-noire', 'XL', 'Noire', 1),
    ('chemise-mirage-a-bloc-couleur', 'S', 'Bloc couleur', 3),
    ('chemise-mirage-a-bloc-couleur', 'M', 'Bloc couleur', 3),
    ('chemise-mirage-a-bloc-couleur', 'L', 'Bloc couleur', 2),
    ('chemise-mirage-a-bloc-couleur', 'XL', 'Bloc couleur', 2),
    ('chemise-romance-a-bloc-couleur', 'M', 'Bloc couleur', 2),
    ('chemise-romance-a-bloc-couleur', 'L', 'Bloc couleur', 2),
    ('chemise-romance-a-bloc-couleur', 'XL', 'Bloc couleur', 1),
    ('surchemise-adingra-vert-kaki', 'M', 'Vert kaki', 2),
    ('surchemise-adingra-vert-kaki', 'L', 'Vert kaki', 2),
    ('surchemise-adingra-vert-kaki', 'XL', 'Vert kaki', 1),
    ('surchemise-adingra-noire', 'M', 'Noire', 2),
    ('surchemise-adingra-noire', 'L', 'Noire', 2),
    ('surchemise-adingra-noire', 'XL', 'Noire', 1),
    ('surchemise-adingra-terracota', 'M', 'Terracota', 1),
    ('surchemise-adingra-terracota', 'L', 'Terracota', 1)
) as seed (product_slug, size, color, stock_quantity)
join public.products p on p.slug = seed.product_slug
on conflict (product_id, size, color) do update
set stock_quantity = excluded.stock_quantity;

select
  p.name,
  p.slug,
  c.name as category_name,
  p.price,
  p.currency,
  coalesce(sum(pv.stock_quantity), 0) as total_stock,
  count(pv.id) as variant_count
from public.products p
left join public.categories c on c.id = p.category_id
left join public.product_variants pv on pv.product_id = p.id
where p.slug in (
  'chemise-akeikoi-a-bloc-couleur',
  'chemise-alepe-blanc',
  'chemise-alepe-noire',
  'chemise-charmeur-a-bloc-couleur',
  'chemise-elephant-civ2026-blanche',
  'chemise-elephant-civ2026-noire',
  'chemise-gribouillage-blanc',
  'chemise-gribouillage-bleu-nuit',
  'chemise-mamie-adjoua-blanche',
  'chemise-mamie-adjoua-noire',
  'chemise-mirage-a-bloc-couleur',
  'chemise-romance-a-bloc-couleur',
  'surchemise-adingra-vert-kaki',
  'surchemise-adingra-noire',
  'surchemise-adingra-terracota'
)
group by p.id, c.name
order by c.name, p.name;
