# Mango Store / Prototype Fashion Store - Technical Handoff Report

Generated on: 2026-05-27

This report summarizes the current website implementation so another AI assistant, developer, or planning chat can quickly understand what exists, what technologies are used, what has already been built, and what should be planned next.

## 1. Project Overview

This is a Next.js ecommerce storefront prototype for a French-language women's fashion brand currently named `Prototype` in the UI. The local project folder is named `mango-store`.

The website is currently a frontend-only shopping experience. It has:

- A homepage with a full-screen fashion hero section.
- A shop page with category pills, product grid, filtering, and search support through URL query parameters.
- A global cart drawer with quantity controls and a simulated payment modal.
- A mobile sidebar menu.
- A search overlay with live product suggestions.
- Static product data stored locally in TypeScript.
- Local image assets stored in `public/`.

There is currently no backend, no database, no real authentication, no real checkout provider, and no persistent cart storage.

## 2. Technology Stack

Core runtime and framework:

- Next.js `16.2.6`
- React `19.2.4`
- React DOM `19.2.4`
- TypeScript `^5`

Styling and UI:

- Tailwind CSS `^4`
- `@tailwindcss/postcss` `^4`
- Global CSS in `app/globals.css`
- Google Fonts loaded manually in `app/layout.tsx`
  - Inter
  - Playfair Display
- `lucide-react` `^1.14.0` for UI icons

Tooling:

- ESLint `^9`
- `eslint-config-next` `16.2.6`
- TypeScript strict mode enabled
- Next.js App Router

Package scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Important local instruction:

- `AGENTS.md` says this project uses a Next.js version with breaking changes and that future coding agents should read relevant guides in `node_modules/next/dist/docs/` before changing Next.js code.

## 3. Current File Structure

Important files and folders:

```text
app/
  components/
    BackToTop.tsx
    CartDrawer.tsx
    CategoryBanner.tsx
    FilterSheet.tsx
    Footer.tsx
    Header.tsx
    Hero.tsx
    ProductCard.tsx
    ProductGrid.tsx
    SearchOverlay.tsx
    Sidebar.tsx
  context/
    ShopContext.tsx
  data/
    products.ts
  globals.css
  layout.tsx
  page.tsx
  shop/
    page.tsx

public/
  hero.png
  p1.png through p8.png
  cat_vestes.png
  cat_robes.png
  cat_accessoires.png
  default Next.js SVG assets

package.json
next.config.ts
tsconfig.json
eslint.config.mjs
postcss.config.mjs
README.md
AGENTS.md
```

## 4. Application Routes

### `/`

Homepage route implemented in `app/page.tsx`.

It renders:

- `Header`
- `SearchOverlay`
- `CartDrawer`
- `Sidebar`
- `Hero`
- `CategoryBanner`
- `Footer`
- `BackToTop`

The route is wrapped in `Suspense` because several child components use `useSearchParams`.

### `/shop`

Shop route implemented in `app/shop/page.tsx`.

It renders:

- `Header`
- `SearchOverlay`
- `CartDrawer`
- `Sidebar`
- Category pill navigation
- `ProductGrid`
- `FilterSheet`
- `Footer`
- `BackToTop`

The shop page also uses `Suspense` because filtering/navigation uses `useSearchParams`.

## 5. State Management

Global UI and cart state are managed by React Context in `app/context/ShopContext.tsx`.

The `ShopProvider` wraps the full app in `app/layout.tsx`.

Current shared state:

- `cartItems`
- `isCartOpen`
- `isMenuOpen`
- `isSearchOpen`
- `isFilterOpen`

Current cart actions:

- `addToCart(product, size?, color?)`
- `removeFromCart(cartId)`
- `updateQuantity(cartId, delta)`
- `clearCart()`

Current UI actions:

- `openCart()`
- `closeCart()`
- `openMenu()`
- `closeMenu()`
- `openSearch()`
- `closeSearch()`
- `openFilter()`
- `closeFilter()`

Derived values:

- `cartCount`
- `cartTotal`

Important detail:

- Cart item identity is based on `product.id`, selected size, and selected color.
- Product prices are stored as formatted strings like `45 000 FCFA`, while `priceValue` stores the numeric value.
- `cartTotal` currently parses the formatted price string instead of using `priceValue`.

## 6. Product Data

Product data lives in `app/data/products.ts`.

Current data model:

```ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
  secondaryImages: string[];
  category: string;
  colors: string[];
  sizes: string[];
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  isNew?: boolean;
}
```

Current product catalog:

- 22 mock products.
- Categories include dresses, jackets, coats, pants, jeans, shirts, sweaters, skirts, tops, accessories, and sale.
- Product images reuse local files `p1.png` through `p8.png`.
- No real SKU system exists yet.
- No inventory quantity exists yet.
- No product detail page exists yet.

Helper exports:

- `mockProducts`
- `categories`
- `allSizes`
- `allColors`
- `formatFCFA(value)`

## 7. Main Components

### `Header.tsx`

Purpose:

- Top navigation.
- Promotional banner.
- Brand logo.
- Desktop category navigation.
- Mobile menu button.
- Search button.
- Account icon button.
- Cart button with item count.

Behavior:

- Changes header style after scroll.
- Pulses cart badge when cart count changes.
- Category clicks navigate to `/shop` with query parameters.

Notes:

- Account button is visual only right now.
- Logo uses a plain `<a href="/">`, which ESLint currently flags.

### `Hero.tsx`

Purpose:

- Full-screen landing hero.
- Uses `/hero.png` as the background image.
- CTA links to `/shop`.

Notes:

- Uses plain `<img>` instead of `next/image`.
- The comment says this bypasses Next.js image cache.

### `CategoryBanner.tsx`

Purpose:

- Three visual category tiles:
  - Vestes & Manteaux
  - Robes
  - Accessoires

Uses local images:

- `/cat_vestes.png`
- `/cat_robes.png`
- `/cat_accessoires.png`

Links:

- `/shop?search=Vestes`
- `/shop?category=Robes`
- `/shop?category=Accessoires`

### `ProductGrid.tsx`

Purpose:

- Displays filtered products.
- Reads filters from URL query parameters.

Supported query parameters:

- `category`
- `size`
- `color`
- `search`

Current filtering:

- Category exact match.
- Special category `Nouveautes` / "new arrivals" logic via `isNew`.
- Size exact match.
- Color partial match.
- Search across product name and category.

Notes:

- `clearFilter()` currently routes to `/?...`, which sends users to the homepage instead of staying on `/shop`.
- Empty-state "Voir tout" also routes to `/`.
- This may be intentional if products are meant on the homepage, but currently `ProductGrid` is only used on `/shop`.

### `ProductCard.tsx`

Purpose:

- Displays product image, category, name, price, badges, colors, and quick add button.

Behavior:

- Adds product to cart with default first size/color.
- Shows badges for new, low stock, and out of stock.
- Hides quick add for out-of-stock products.

Missing:

- Product detail navigation.
- Size/color selection before adding.
- Wishlist.
- Secondary image hover.

### `FilterSheet.tsx`

Purpose:

- Bottom-sheet filter UI.
- Lets users filter by category, size, and color.

Behavior:

- Opens/closes using global context state.
- Locks body scroll when open.
- Closes with Escape key.
- Writes filters into URL query parameters.

Notes:

- `setParam()` currently routes to `/?...`, likely a bug because filters should probably stay on `/shop`.
- `clearFilters()` routes to `/`, also likely inconsistent on the shop page.

### `CartDrawer.tsx`

Purpose:

- Slide-out shopping cart panel.
- Shows cart items, quantity controls, remove button, subtotal, and payment button.

Behavior:

- Opens/closes using global context.
- Locks body scroll when open.
- Closes with Escape key.
- Quantity can increase or decrease.
- Quantity reaching zero removes the item.
- Payment button opens a simulated payment modal.

Payment modal:

- Supports visual choices:
  - Carte Bancaire
  - Orange Money
  - Moov Money
  - Wave
- Confirmation shows a success state for 2 seconds.
- Then clears the cart and closes the cart drawer.

Missing:

- Real payment integration.
- Customer information form.
- Shipping address form.
- Order creation.
- Error handling.
- Transaction security.

### `SearchOverlay.tsx`

Purpose:

- Full-screen search UI.
- Live product suggestions.
- Popular search shortcuts.

Behavior:

- Opens/closes using global context.
- Autofocuses input when opened.
- Closes with Escape key.
- Locks body scroll.
- Submitting search navigates to `/shop?search=...`.
- Clicking a live result navigates to the result's category.

Notes:

- Live results are local-only.
- Search only checks product name and category.

### `Sidebar.tsx`

Purpose:

- Mobile side menu.
- Lists categories and collection links.

Behavior:

- Opens/closes using global context.
- Locks body scroll.
- Closes with Escape key.
- Category clicks navigate to `/shop?...`.

Missing:

- Collection links do not navigate to real collection pages.
- Account/help links are placeholders.

### `Footer.tsx`

Purpose:

- Footer links.
- Newsletter input.
- Brand summary.
- Legal/social/help sections.

Missing:

- Newsletter form submission.
- Real footer pages.
- Legal/cookie/privacy pages.

### `BackToTop.tsx`

Purpose:

- Floating button shown after scrolling past 500px.
- Scrolls smoothly to top.

## 8. Styling System

Tailwind CSS v4 is used through:

- `@import "tailwindcss";` in `app/globals.css`
- `@tailwindcss/postcss` in `postcss.config.mjs`

Global CSS provides:

- Font CSS variables
- Smooth scrolling
- Custom scrollbar
- Product image hover zoom
- Navigation underline animation
- Hero fade-in animation
- Cart badge pulse animation
- Promo marquee animation
- Payment success scale-in animation
- Custom `.duration-400`
- Custom `.line-clamp-2`

Visual direction:

- Minimal black/white luxury fashion ecommerce look.
- Serif headings with Playfair Display.
- Small uppercase navigation labels.
- Full-bleed hero image.
- Local product/category images.

## 9. Assets

Local assets in `public/`:

- `hero.png`
- `p1.png`
- `p2.png`
- `p3.png`
- `p4.png`
- `p5.png`
- `p6.png`
- `p7.png`
- `p8.png`
- `cat_vestes.png`
- `cat_robes.png`
- `cat_accessoires.png`
- Default SVGs from Create Next App:
  - `file.svg`
  - `globe.svg`
  - `next.svg`
  - `vercel.svg`
  - `window.svg`

Image usage:

- Product cards use `next/image`.
- Hero and category banners use plain `<img>`.

## 10. Configuration

### `next.config.ts`

Current config only sets image config:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
};
```

No remote images are currently configured.

### `tsconfig.json`

Important settings:

- `strict: true`
- `jsx: "react-jsx"`
- `moduleResolution: "bundler"`
- `paths: { "@/*": ["./*"] }`
- Next.js TypeScript plugin enabled.

### `eslint.config.mjs`

Uses:

- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`

Ignored:

- `.next/**`
- `out/**`
- `build/**`
- `next-env.d.ts`

## 11. Current Verification Status

Commands tested on 2026-05-27:

```bash
npm.cmd run build
```

Result:

- Passed.
- Next.js built the project successfully.
- Static routes generated:
  - `/`
  - `/_not-found`
  - `/shop`

```bash
npm.cmd run lint
```

Result:

- Failed with 4 errors and 4 warnings.

Current lint errors:

1. `app/components/Footer.tsx`
   - `react/no-unescaped-entities`
   - The apostrophe in `S'inscrire` should be escaped or moved into a string expression.

2. `app/components/Header.tsx`
   - `react-hooks/set-state-in-effect`
   - `setCartPulse(true)` is called synchronously inside an effect.

3. `app/components/Header.tsx`
   - `@next/next/no-html-link-for-pages`
   - Plain `<a href="/">` should become Next.js `<Link href="/">`.

4. `app/components/SearchOverlay.tsx`
   - `react-hooks/set-state-in-effect`
   - `setQuery("")` is called synchronously inside an effect.

Current lint warnings:

1. `app/layout.tsx`
   - `@next/next/no-page-custom-font`
   - Fonts are manually added in `<head>`. A Next.js font approach may be preferred.

2. `app/shop/page.tsx`
   - `useState` imported but unused.

3. `app/shop/page.tsx`
   - `useEffect` imported but unused.

4. `app/shop/page.tsx`
   - `categories` imported but unused.

Important Windows note:

- Running `npm run ...` directly in PowerShell failed because `npm.ps1` is blocked by the system execution policy.
- Use `npm.cmd run ...` instead.

## 12. Known Technical Issues

### Text encoding / mojibake

Many French strings appear corrupted in source output. Examples include accented words and punctuation being rendered incorrectly. This likely came from an encoding mismatch during editing or file creation.

This should be cleaned up before launch because it affects brand quality, readability, SEO, and accessibility.

### Query routing inconsistency

Some filter actions in `ProductGrid.tsx` and `FilterSheet.tsx` navigate to `/` while the product grid lives on `/shop`.

Likely fixes:

- Change filter clear/apply navigation to `/shop?...`.
- Keep users on `/shop` while filtering.
- Decide whether product grid should also exist on the homepage.

### No persistence

Cart state is only in React memory. Refreshing the page clears the cart.

Possible next steps:

- Save cart to `localStorage`.
- Later move cart/session/order state to a backend.

### No real checkout

The payment modal is a frontend simulation only.

Possible next steps:

- Stripe Checkout.
- Mobile money provider integration depending on target country.
- Order confirmation flow.
- Backend route for payment intent/order creation.

### No backend/database

All products are hardcoded in `products.ts`.

Possible next steps:

- Add a database.
- Add an admin product management interface.
- Add a CMS.
- Add product inventory.

### No product detail pages

Products are displayed as cards only.

Possible next steps:

- Add `/product/[slug]` or `/shop/[slug]`.
- Support image gallery, descriptions, sizes, colors, recommendations, and related products.

### Placeholder links

Several links are placeholders:

- Account
- Footer links
- Service client
- FAQ
- Legal pages
- Collection links
- Newsletter

### Accessibility and UX improvements needed

The app has many labels and keyboard-close behavior, which is good, but should still be reviewed for:

- Focus trapping in modals/drawers.
- Returning focus to triggering buttons.
- Keyboard navigation inside overlays.
- Screen reader behavior.
- Color contrast on image overlays.

### Font loading warning

Fonts are loaded through raw Google Fonts links in `app/layout.tsx`.

Possible next step:

- Use Next.js font APIs if supported/recommended for this Next.js version.
- Because this is Next.js 16, future coding agents should read the local Next.js docs first, per `AGENTS.md`.

## 13. What Has Been Built So Far

Based on the current repository and Git history, the work so far appears to include:

1. Project scaffolded from Create Next App.
2. Next.js App Router structure created under `app/`.
3. Fashion ecommerce homepage built.
4. Shop page created.
5. Local product catalog added with 22 mock products.
6. Local product and category images added.
7. Global shop context added for cart and overlay state.
8. Header/navigation created.
9. Hero section created.
10. Category banner tiles created.
11. Product grid and product cards created.
12. URL-based product filtering added.
13. Bottom filter sheet added.
14. Search overlay added.
15. Cart drawer added.
16. Simulated payment modal added.
17. Mobile sidebar menu added.
18. Footer/newsletter UI added.
19. Back-to-top button added.
20. Basic responsive styling and animations added.
21. Build currently passes.
22. Lint currently fails and needs cleanup.

Recent Git history:

```text
69c595d small fixes
c345eff first commit
287a80e Initial commit from Create Next App
```

## 14. Recommended Next Work

High priority:

1. Fix text encoding across all French UI strings.
2. Fix lint errors and warnings.
3. Fix `/shop` filter navigation so filtering does not accidentally return users to `/`.
4. Add product detail pages.
5. Add size/color selection before adding to cart.
6. Persist cart in `localStorage`.
7. Replace placeholder links with real pages or remove them until ready.

Medium priority:

1. Add real newsletter handling.
2. Add auth/account page.
3. Add checkout/customer information flow.
4. Add order confirmation page.
5. Add empty/loading/error states where needed.
6. Add accessibility focus management for drawers and modals.
7. Improve search to include descriptions, colors, and fuzzy matching.
8. Add sorting by price/newest/category.
9. Add product slug generation.

Larger future work:

1. Choose backend/database/CMS strategy.
2. Move products out of hardcoded TypeScript data.
3. Add admin dashboard for product management.
4. Add inventory tracking.
5. Add real payment integration.
6. Add shipping zones/rates.
7. Add order emails/SMS.
8. Add analytics.
9. Add SEO metadata per page/product.
10. Deploy to Vercel or another host.

## 15. Suggested Prompt for Another AI Chat

Paste this prompt into another AI assistant along with this report:

```text
I am building a Next.js 16.2.6 / React 19 ecommerce fashion storefront called mango-store, with the brand name currently shown as Prototype. It is a frontend-only App Router project using TypeScript, Tailwind CSS v4, lucide-react icons, local product data, and local images in public/.

Please read the technical report I provide and create a very detailed next-step implementation roadmap. I want you to identify what should be fixed first, what features should be built next, what architecture should be used for products/cart/orders/payments, and what risks exist.

Important constraints:
- This project uses Next.js 16.2.6, so do not assume older Next.js APIs or patterns.
- The repo has an AGENTS.md note saying future coding agents should read relevant docs in node_modules/next/dist/docs/ before changing code.
- The build currently passes.
- Lint currently fails with several errors.
- There is likely text encoding corruption in French UI strings.
- The app currently has no backend, database, auth, persistent cart, real checkout, or product detail pages.

Please give me:
1. A prioritized technical roadmap.
2. A recommended architecture.
3. A database/product schema proposal.
4. A checkout/payment strategy.
5. A list of bugs to fix immediately.
6. A step-by-step implementation plan for the next coding session.
7. Suggested prompts I can give to a coding AI to implement each step safely.
```

## 16. Best Immediate Coding Prompt

If the next AI will directly edit the code, a good first task is:

```text
First, inspect the Next.js 16 local docs in node_modules/next/dist/docs/ as required by AGENTS.md. Then fix the current lint errors and warnings without changing the website design. Also fix the filter navigation bug so all shop filters remain on /shop instead of navigating to /. Finally, verify with npm.cmd run lint and npm.cmd run build.
```

