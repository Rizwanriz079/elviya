# Elvia Herbals — Pending Content & Placeholders

This file tracks all real business content waiting for client confirmation. Per brand guidelines, no unconfirmed facts, ratings, reviews, or charges are shown to customers.

---

### 1. Customer Reviews / Testimonials
- **Current Status**: Section hidden (`SHOW_TESTIMONIALS = false` in `src/lib/constants.ts`).
- **Input Needed**: Genuine reviews from real WhatsApp customers (Customer name, location, exact review quote, product purchased).
- **Activation**: Provide reviews and set `SHOW_TESTIMONIALS = true`.

---

### 2. Rest of India Delivery Charge
- **Current Status**: Unconfirmed (`SHIPPING.restOfIndiaConfirmed = false` in `src/lib/constants.ts`).
- **Customer UI**: Displays "Charge confirmed on WhatsApp" and total as "Rs.269 + delivery". WhatsApp message asks: `Delivery area: Rest of India (please confirm charge)`.
- **Input Needed**: Exact flat courier rate across India (or regional courier rules).
- **Activation**: Update rate in `src/lib/constants.ts` and set `restOfIndiaConfirmed = true`.

---

### 3. Founder Story, Photo & Quote
- **Current Status**: Founder section hidden (`SHOW_FOUNDER = false` in `src/lib/constants.ts`). About page contains only confirmed brand facts (handmade in Kerala in small batches with virgin coconut oil and fresh neem).
- **Input Needed**: Real maker/founder photo, founder name, and personal signature quote.
- **Activation**: Add founder asset to `/images/` and set `SHOW_FOUNDER = true`.

---

### 4. Instagram Feed / Real Square Photos
- **Current Status**: Grid hidden (`SHOW_INSTAGRAM = false` in `src/lib/constants.ts`). Shows clean direct link banner to `@elviaherbals`.
- **Input Needed**: 4–6 real square Instagram photos of fresh neem, oil preparation, and packaging.
- **Activation**: Place images in `/public/images/instagram/` and enable `SHOW_INSTAGRAM = true`.

---

### 5. Product Ratings
- **Current Status**: Hidden (`SHOW_RATINGS = false` in `src/lib/constants.ts`). No invented 5.0 stars or review count are displayed anywhere on the site.
- **Input Needed**: Actual verified review metrics once customer feedback is collected.

---

### 6. Almond Oil Pricing & Restock
- **Current Status**: Out of stock. No price is displayed. Customers see "Restocking soon" and a "Notify Me on WhatsApp" button.
- **Input Needed**: Price and stock quantity once the next batch is ready.
