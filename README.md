# SB LUXURY CASUAL Storefront

Version frontend de boutique e-commerce mode, construite avec Next.js, React, TypeScript et Tailwind CSS.

## Statut actuel

- Client actuel : `SB LUXURY CASUAL`.
- Version frontend-only en français.
- Identité de marque, contact, livraison, paiement, FAQ et contenus d’aide intégrés.
- Catalogue produit local dans `app/data/products.ts`, encore en attente du catalogue réel définitif.
- Panier global avec persistance `localStorage`.
- Demande de commande simulée côté client, sans envoi réel.
- Aucun backend, aucune authentification, aucun paiement réel et aucun envoi e-mail réel pour le moment.

## Commandes

Sur Windows PowerShell, utiliser les commandes `.cmd`:

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

Avant une mise en production, prévoir la configuration de `NEXT_PUBLIC_SITE_URL`, l’intégration des services réels retenus, le catalogue produit final et la validation des textes légaux par le client ou un conseil compétent.
