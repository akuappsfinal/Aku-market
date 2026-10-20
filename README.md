# AKU MARKET 🛍️

Curated cross-border marketplace — AliExpress-style shopping, **$0/month to run**.

Live site is deployed automatically from the `main` branch via **GitHub Pages**.

> First-time setup (one minute, free):
> 1. Repo **Settings → Pages**
> 2. **Source:** pick **Deploy from a branch** → branch `main`, folder `/ (root)` → Save
> 3. Done — every push to `main` redeploys in ~1 minute at
>    `https://akuappsfinal.github.io/AKU-market/`
>
> (Optional alternative: add `.github/workflows/deploy.yml` and choose **GitHub Actions**
> as the source instead — same result.)

## Pages

| Page | What it does |
|---|---|
| `index.html` | Storefront: search, category filters, product grid |
| `product.html?id=…` | Product detail: variants, quantity, shipping estimate |
| `cart.html` | Cart (browser-local) + checkout → order request |
| `admin.html` | Password-protected seller dashboard: orders, tracking numbers, fulfillment |
| `404.html` | Friendly fallback → redirects to shop |

## How orders work (v1, zero budget)

1. Buyer checks out → order is saved locally **and** emailed to **aku.apps.final@gmail.com** (prefilled mail).
2. You (the seller) confirm stock, email the buyer a payment link (Stripe Payment Link = free, pay per sale only).
3. After payment, you order the item on AliExpress to the buyer's address (manual dropshipping).
4. Paste the tracking number in `admin.html` and mark the order fulfilled.

## Admin access

- URL: `/admin.html` — password gate, session-locked (locks again when tab closes).
- **Default password:** `aku-admin-2026` — **change it**: generate a new SHA-256 hash
  (`echo -n "newpassword" | sha256sum`) and replace the `HASH` constant in `admin.html`.
- Note: a static site can't fully hide client-side code; this gate keeps casual users out.
  Real server-side protection arrives with the Supabase/Workers backend (see `AKU_MARKET_MVP_PLAN.md`).

## Roadmap (from the MVP plan)

- **Phase 1 ✅** Static storefront, cart, order requests, admin dashboard — live on GitHub Pages.
- **Phase 2** Supabase (free tier) for real accounts + orders DB, Stripe Checkout, AliExpress API catalog with 24h cache, move to Cloudflare Pages/Workers.
- **Phase 3** Auto-order placement after AliExpress partner approval, 1688 price layer.

## Files

```
index.html / product.html / cart.html / admin.html / 404.html
assets/styles.css      shared mobile-first styles
assets/products.js     catalog data (swap for API later)
assets/app.js          cart, orders, header/footer helpers
```
