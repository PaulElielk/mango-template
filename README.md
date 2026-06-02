# Mango Store

Prototype frontend de boutique e-commerce mode, construit avec Next.js, React, TypeScript et Tailwind CSS.

## Current Prototype Status

- Prototype frontend-only en français.
- Catalogue produit local dans `app/data/products.ts`.
- Panier global avec persistance `localStorage`.
- Pages boutique, détail produit, contact, FAQ, livraison/retours, confidentialité et conditions générales.
- Demande de commande simulée côté client, sans envoi réel.
- Aucun backend, aucune authentification, aucun paiement réel et aucun envoi e-mail réel pour le moment.

## Commandes

Sur Windows PowerShell, utiliser les commandes `.cmd`:

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

Avant une mise en production, prévoir la configuration de `NEXT_PUBLIC_SITE_URL`, l’intégration des services réels retenus et la validation des textes légaux par le client ou un conseil compétent.
