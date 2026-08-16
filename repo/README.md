# CraftVilla

Mobile-first static storefront for Janvi Agrawal's CraftVilla handmade-goods brand.

## Features
- Home, category browsing, product-detail modal, cart, and WhatsApp checkout.
- Editable catalog in `src/products.js` — 30 products across Gift Hampers and Handmade Accessories, with real photos and real prices from Janvi.
- Real product photos live in `assets/products/`.
- WhatsApp order handoff to `+91 9307676833` with customer details, items, quantities, and subtotal.

## Editing prices or descriptions
Open `src/products.js` — each product is one line with `price:`, `name:`, and `description:` fields. Change the number after `price:` and save. No build step needed.

## A few prices are best-guess and worth double-checking with Janvi
- **Bhai's Last-Minute Rescue Hamper** — ₹500 (matched from a WhatsApp price note, but not 100% certain which hamper it referred to)
- **Rakhi Mini Hamper Tote** — ₹349 (no explicit price given yet, estimated from similar hampers)
- **Purple & White Flower Garland** — ₹99 (no explicit price given yet, estimated)

## Check the site locally
```bash
npm run dev
```
Then open `http://localhost:5173/` or the forwarded preview URL for port `5173`.

## Build check
```bash
npm run build
```
