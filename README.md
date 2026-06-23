# SB LUXURY CASUAL Storefront

Boutique e-commerce mode pour `SB LUXURY CASUAL`, construite avec Next.js, React, TypeScript, Tailwind CSS et Supabase.

## Statut V1

- Interface publique en français pour `SB LUXURY CASUAL`.
- Catalogue connecté à Supabase avec fallback local dans `app/data/products.ts`.
- Images produits servies depuis `public/products` pour la V1 locale/déploiement.
- Panier global avec persistance `localStorage`.
- Demande de commande envoyée à l’API Next.js `app/api/orders/route.ts`, puis enregistrée dans Supabase si les politiques RLS l’autorisent.
- Pas d’admin dashboard, pas de Supabase Auth, pas de paiement réel, pas d’envoi e-mail, pas d’API WhatsApp et pas d’upload Supabase Storage pour cette V1.

## Variables d’environnement

Créer les variables suivantes en local et sur Vercel :

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Commandes

Sur Windows PowerShell, utiliser les commandes `.cmd`:

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

Avant une mise en production, prévoir la configuration de `NEXT_PUBLIC_SITE_URL`, l’intégration des services réels retenus, le catalogue produit final et la validation des textes légaux par le client ou un conseil compétent.

## Notes de déploiement

Avant de connecter `sbluxurycasual.com`, valider une Preview Vercel avec les variables Supabase configurées, tester `/shop`, une page produit, le panier et une demande de commande complète, puis confirmer la création des lignes dans Supabase.

Pour cette V1 gratuite, le site utilise Supabase directement sans Prisma. Les produits sont lus depuis Supabase, les demandes de commande sont enregistrées dans Supabase, et les images produits sont servies depuis `public/products/`. Il n’y a pas encore d’admin dashboard, de paiement en ligne, d’authentification client, d’envoi e-mail, d’API WhatsApp ni de Supabase Storage.
