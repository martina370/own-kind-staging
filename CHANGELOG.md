# Own-Kind Staging — Changelog (Original Clone → Current)

This documents every change made to this site since the initial "Phase 1: exact
replication" clone of own-kind.com (commit `9cbe6db`). It is a **reference /
audit trail**, not a from-scratch build script — the actual pixel-perfect
replica is the repository itself (see "How to migrate this to a new repo"
below). Use this file to understand *what* changed and *why*; use the real
files for the exact HTML/CSS.

---

## How to migrate this to a new GitHub repo

1. **Simplest — download the ZIP.** On the current repo's GitHub page, click
   **Code → Download ZIP**. This is the exact file tree, byte-for-byte.
   Upload/push those files into the new repo.
2. **Preserves history — git push to a new remote.** Create an empty repo on
   GitHub (no README/license), then from this local clone:
   ```
   git remote add new-origin https://github.com/<you>/<new-repo-name>.git
   git push new-origin main
   ```
3. **Critical:** every page's `<head>` contains
   `<base href="/own-kind-staging/">`. GitHub Pages project sites are served
   at `github.io/<repo-name>/`, so this must be changed to
   `/<new-repo-name>/` **site-wide** or every asset, link and button will
   break. Do a find-and-replace across all `index.html` files for this
   before publishing under a different repo name.

---

## Site-wide / shared components

**`js/components.js`** — shared nav, footer, cookie banner injected into every page:
- Added a **visible desktop + mobile top navigation** (previously: logo,
  hamburger, and sign-up/demo buttons only, no links to any other page).
  Nav links (`NAV_LINKS` array): **Product** → `/features`, **Pricing** →
  `/pricing`, **Case Studies** → `/case-studies`, **Integrations** →
  `/integrations`, **About** → `/about`, **Contact** → `/contact`. Careers
  and Partnerships are intentionally *not* top-level tabs — reachable from
  `/contact` instead.
- Added a **LinkedIn icon** to the footer social row (previously: Twitter,
  Instagram, Facebook, Phone, Email only).
- Footer **ISO/IEC 27001 badge** is now a clickable link to `/security`
  (previously a static image with no link).

**Typography/CSS conventions used throughout** (defined in
`assets/css/app-inline.css` unless noted as page-scoped):
- `.pricing-eyebrow` — small uppercase label above a page's H1 (14px,
  letter-spacing 3px, color `#6b7280`).
- `.text-container-headers` — main headings, 45px/60px line-height, weight 600.
- `.text-container-subheaders` — subheadings, 27px/36px, weight 400.
- `.text-container-subheaders-small` — body copy, 20px/35px, weight 400.
- `.blue-text` — accent color `#4c6c91` (used for single hero words like
  "Exceptional").
- Link/hover accent color used everywhere: **`#4b6cb7`** (link hovers,
  bullet markers, evidence-card links). This is "the site's light blue."
- `.black-button` — primary pill CTA (dark `#111827` background, white
  text, `border-radius:9999px`, `padding:1.25rem 2.5rem`, font-size varies
  38–20px by page scope). Used as both `<button>` (internal routes via
  `data-nav` + JS) and `<a>` (external links / `mailto:` — see "Nav & CTA
  bug fixes" below for why the tag type matters).
- `.feature-row` / `.feature-row__text` / `.feature-row__visual` — the
  two-column layout (bullet list + image) used on every `/features/*` and
  `/integrations/*` subpage. Fixed site-wide: `max-width:1120px;
  margin-left:auto;margin-right:auto` so text no longer got cut off on the
  left on wide viewports (see below).
- `.prose` — long-form article styling (h2/p/lede/links) used on the
  buyer's-guide-style content pages and `/alternatives`.
- `.integration-card`, `.stat-card`, `.evidence-card`, `.brand-card`,
  `.link-card` — bordered white card components, each with its own
  `__title`/`__body`/`__link` sub-classes, used respectively on
  `/integrations`, `/case-studies`, `/why-fashion-brands-choose-own-kind`,
  `/brands-using-own-kind`, and `/contact`'s "Other ways to work with us."

**Nav & CTA bug fixes:**
- Multiple "Get in touch" controls were `<button data-nav="mailto:...">`.
  The custom nav JS (`js/site.js`) does `e.preventDefault()` then
  `window.location.href = dest`, which does not reliably hand off to a mail
  client for `mailto:` links the way a real anchor does. **Fixed
  everywhere** by converting these to real `<a href="mailto:...">` links
  (contact, careers ×2, partners ×2). Regular internal-route buttons
  (`data-nav="demo-request"`, etc.) were left as `<button>` since those
  work fine through the JS router.
- Partners page's two "Get in touch" buttons were wired to
  `data-nav="demo-request"` (wrong destination) — fixed to
  `mailto:rg@own-kind.com` (the email already used in that page's own
  contact section).
- Careers page "Get in touch" button was going to demo — fixed to
  `mailto:info@own-kind.com`.

---

## Page-by-page changes

### Homepage (`index.html`)
- **Meta tags**: title changed from "Own-Kind | Social Commerce for Luxury
  Fashion" to **"Own-Kind | CRM & Clienteling Platform for Fashion
  Brands"**; description and keywords rewritten around
  clienteling/CRM/fashion terms (was leftover "digital wardrobe" consumer-app
  copy); added OG tags + `robots` tag.
- **Hero subtitle** shortened from "Own-Kind is the CRM and clienteling
  platform built for fashion and retail sales teams — bringing social
  commerce, clienteling and sales attribution together in one place." to
  just **"Own-Kind brings social commerce, clienteling and sales attribution
  into one place."**
- **FAQ answers** (Klaviyo / Salesforce-HubSpot objections) rewritten to
  remove em-dash-heavy sentence structure.
- **Testimonial fix**: Stella McCartney's quote was showing Jimmy Choo's
  contact photo/name (Judi Graham) — corrected.
- **"Clients include"** label is now a clickable link to
  `/brands-using-own-kind`.
- Added **"See the evidence behind these results →"** link (to
  `/why-fashion-brands-choose-own-kind`) near the testimonials/"Discover
  Customer Stories" button.
- Added an **ISO 27001 trust bar** (badge image + text) linking to
  `/security`, placed right after the testimonials section.
- Added a **"We take security seriously"** section (heading + one line +
  link to `/security`) right before the final "Get started" CTA.

### `/pricing` (built from scratch — previously rendered the homepage)
- Subtitle split to two lines: "Our pricing is tailored to your store
  count, associates and the modules you need." / "Book a free demo and
  we'll build a plan around you." (was one long em-dash sentence).
- "Includes a free 30-day trial" note made bigger/bolder
  (`.pricing-trial-note`: 20px, weight 600).
- "Every plan includes full access to:" feature grid: fixed so the bottom
  row centers under the top row instead of looking like a piece was
  missing (`.pricing-included`: `flex-wrap:wrap;justify-content:center`).
- Removed the "Up to 36x growth some Own-Kind clients have experienced"
  stat (out of place/context on this page).
- Added a link to `/alternatives`: "Weighing this against other options?
  See how to compare clienteling platforms →"

### `/features` (hub — built from scratch)
- Title split to two lines: "Everything your sales team needs" /
  "in one platform."
- Subtitle rewritten and split to two lines, avoiding em-dashes.
- Fixed CRM/Content/Sales Attribution copy blocks that were rendering cut
  off on the left (feature-row width/centering fix, see shared CSS above).
- Removed "no manual data entry required" (CRM copy) and "not something
  that only happens when an associate remembers to follow up" (clienteling
  copy).
- Added a "Works with the tools you already use" → `/integrations` link
  section, and a "We take security seriously" → `/security` section, both
  before the final CTA.

### `/features/crm`, `/features/clienteling`, `/features/content`,
`/features/events`, `/features/sales-attribution` (5 dedicated product
pages — built from scratch, previously one shared homepage scroll)
- Each is a `feature-row` layout (bullet list + visual) plus a `prose`
  long-form section.
- **All five**: fixed the same left-cut-off text bug as the hub page.
- **Content**: swapped a placeholder for the real lookbook screenshot
  (`assets/img/features/lookbook.png`).
- **Clienteling**: removed "not something that only happens when an
  associate remembers to follow up."
- **Events**: copy changed from "Each event tracks who was invited, who's
  attending, who hasn't responded, and — because every invite is linked to
  a client profile — what that client went on to buy." to "Each event
  tracks who was invited, who's attending, who hasn't responded. Every
  invite is linked to a client profile."

### `/integrations` (built from scratch — was a 3-logo strip on the homepage)
- Expanded from 3 integration cards to **10**: Shopify, Shopify POS,
  Klaviyo, WhatsApp, Teamwork Commerce (original 5, 3 with real logos) plus
  Magento, Salesforce Commerce Cloud, WooCommerce, BigCommerce, Centra
  (added, name-only cards — no verified logo files for these).
- Added a final **"+ more"** card: "Using something else? Get in touch and
  we'll check compatibility with your current system" → links to
  `/contact`.
- Added **individual pages** for the 5 original integrations (see below),
  linked via a "Learn more →" on each of their cards.
- Added a "We take security seriously" → `/security` section before the
  final CTA.

### `/integrations/shopify`, `/shopify-pos`, `/klaviyo`, `/whatsapp`,
`/teamwork-commerce` (new — item 30 of the audit)
- Each: "What syncs" (bullet list) + "What your associates see" (prose) +
  a "Get a demo" CTA + a link back to `/integrations`.
- Deliberately **no** invented sync-speed or implementation-time claims
  (e.g. "real-time," "goes live in 3 days") since those weren't verified.

### `/about` (built from scratch — previously rendered the homepage)
- Title changed from "Own-Kind started with a wardrobe problem. It became
  the platform serious fashion brands run their clienteling on." to just
  **"Our story."**
- Subtitle shortened: "Founded in 2018, Own-Kind is now the clienteling
  platform trusted by some of the biggest names in luxury fashion." (was a
  longer sentence naming the old "consumer app" history).
- Added the **founder photo** (`assets/img/team/ruaraidh-grubb.png`,
  Ruaraidh Grubb) alongside the existing founding story text.
- **Mission section redesigned**: "Our mission" is now its own centered,
  bold, larger line, followed by one shortened line: "Help fashion and
  retail sales teams build stronger relationships with their customers,
  making every touchpoint personal." (removed the second half about
  "turning data into personal, timely outreach... not a mass marketing
  blast").
- **Removed the milestones section entirely.**
- "Own-Kind is built by a small, dedicated team..." changed to "Own-Kind is
  built by a dedicated team working directly with fashion and retail
  houses across the UK and beyond," and made bigger/bolder
  (`.impact-line`: 28px, weight 600).
- "Clients include" label made a clickable link to `/brands-using-own-kind`.

### `/contact` (built from scratch — previously rendered blank)
- Section order changed to: **Let's talk → Other ways to work with us →
  Contact details → Get started/Get a demo** (was: Let's talk → Contact
  details → Get started → Other ways to work with us).
- "Get in touch" primary CTA is a real `mailto:info@own-kind.com` link
  (see bug fix note above).
- "Other ways to work with us" link-cards (Careers, Partner with us) made
  bigger/more prominent (`.link-card__title`: 28px; `.link-card__body`:
  19px; card padding 44px).

### `/careers` (built from scratch)
- Subtitle split to two lines: "Own-Kind is a small team building the CRM
  and clienteling platform fashion and retail sales teams rely on" / "we're
  always glad to hear from people who'd be a great fit."
- Both "Get in touch" buttons fixed to real `mailto:` links (were routing
  to demo-request).

### `/partners` (built from scratch, then substantially rewritten)
- Original build was presentation-deck-style (case studies, "our
  solution," task breakdowns). **Rewritten entirely** to a generalist
  structure matching `/careers`'s tone: hero → "Our clients, your clients"
  → brand logos → "Who we partner with" (Shopify developers / marketing
  agencies / retail consultants) → "How it works" + contact (
  `rg@own-kind.com`) → closing CTA.
- Both "Get in touch" buttons fixed from `data-nav="demo-request"` to
  `mailto:rg@own-kind.com`.

### `/case-studies` (built from scratch)
- 4 real stat cards (Kirna Zabête 50X ROI, Cabana 31X return, Aje 36X ROI,
  Bella Freud 25X ROI), each marked "Full write-up coming soon."
- Added links to the two new evidence pages: "See the full evidence behind
  these numbers →" (`/why-fashion-brands-choose-own-kind`) and "the list of
  brands using Own-Kind →" (`/brands-using-own-kind`).

### `/own-kind-vs-endear-vs-bspk` (new)
- Named, factual comparison table (pricing, focus, security, named
  clients) plus "Where Endear wins / Where BSPK wins / Where Own-Kind
  wins / The honest take" prose. Sourced from Endear's and BSPK's public
  sites, dated 20 Aug 2026 in a source note.

### `/alternatives` (new — added, then revised twice per feedback)
- A **generalist** "what sets Own-Kind apart" page that never names a
  specific competitor in the visible content — uses "other clienteling
  platforms," "some general-purpose retail CRMs," etc. The `<title>` tag
  and `<meta name="description">` **do** name Endear explicitly, so the
  page is still discoverable for "Own-Kind vs Endear"-type search/LLM
  queries without putting the name in front of visitors (title/meta are
  read by crawlers and shown in search snippets, not rendered on-page).
- Content is four first-person sections ("We built Own-Kind specifically
  for...", "We hold ISO/IEC 27001 certification...", "We publish named
  clients...", "We connect to the ecommerce and POS systems..."), each
  linking to the relevant proof page (`/features`, `/security`,
  `/why-fashion-brands-choose-own-kind`, `/integrations`).
- A comparison table and a closing "honest take" section were added in an
  earlier revision, then **removed** per feedback — current version has no
  table, ends after the fourth section.
- Linked from `/pricing`: "Weighing this against other options? See how to
  compare clienteling platforms →"

### `/security` (new)
- ISO/IEC 27001:2022 certification detail (Cert No. 12034) with the real
  badge image, linked from the homepage trust bar and the footer badge.
- Links to the real `/data-processing` (DPA) and `/privacy-policy` pages
  for GDPR detail.
- "Enterprise access controls" grid: SSO, Role-based permissions, Audit
  logs, Data export & API access — confirmed as real, existing product
  capabilities (not aspirational). SOC 2 / uptime SLA are **intentionally
  not mentioned** (not accurate to claim yet).
- Grid styling fixed: column titles are a consistent single-line size
  (20px) instead of the raw 45px heading class (which wrapped
  inconsistently); description text is smaller (15px) and colored with the
  site's blue accent (`#4b6cb7`) instead of matching the title's dark
  color.

### `/why-fashion-brands-choose-own-kind` (new)
- Aggregates only already-verified, already-published proof: the 4 ROI
  stats from `/case-studies`, the three named testimonials (Stella
  McCartney, Valentino, Jimmy Choo), the real Shopify App Store reviews
  link, and the ISO 27001 cert — each with a "View evidence →" link to its
  actual source. No new numbers were invented.

### `/brands-using-own-kind` (new)
- Brand-by-brand cards (industry, region, linked evidence where it
  exists) for the 8 brands already asserted as clients elsewhere on the
  site (Stella McCartney, Valentino, Jimmy Choo, Kirna Zabête, Bella
  Freud, Aje, Cabana, Amiri). Deliberately excludes 4 unused orphan logo
  files (Annoushka, Citizens of Humanity, Luca Faloni, ME+EM) that aren't
  tied to any existing claim on the site.

### SEO / category content pages (new — Phase 2 buildout)
Built as part of the broader category-positioning push; each is a
long-form `prose`-styled article targeting a specific buyer search intent:
- `/clienteling-software-for-shopify-fashion-brands` — cornerstone
  buyer's-guide page.
- `/what-is-clienteling`, `/clienteling-software`, `/clienteling`,
  `/clienteling-in-fashion` — "what is clienteling" authority ladder
  (definitions → workflows → category fit).
- `/best-clienteling-platforms-for-shopify` — comparison/listicle-style
  buyer's guide.
- `/fashion-crm`, `/luxury-retail-crm`, `/shopify-clienteling` — category
  landing pages mapping the product to specific buyer queries.

### Sign-up flow (`sign-up/`, `js/mock-forms.js`)
- Added an alternative path for prospects without a referral code: "I'm
  new (no referral code)" now leads to a real sign-up form
  (`SIGNUP_STEP2_HTML`), instead of both options funneling through a
  referral-code-only dead end.

---

## New image/logo assets added
- `assets/img/team/ruaraidh-grubb.png` — founder photo (used on `/about`).
- `assets/img/features/lookbook.png` — real content-page screenshot
  (replaced a placeholder).
- `assets/logo/Bella-Freud-logo.png`, `Kirna-Zabete-logo.png` — used on
  `/case-studies` (replaced plain-text brand name marks) and
  `/brands-using-own-kind`.
- `assets/logo/Annoushka-logo.png`, `Citizens-of-Humanity-logo.png`,
  `Luca-Faloni-logo.png`, `ME-EM-logo.png` — present in the repo but **not
  currently referenced anywhere** (no page claims these as clients yet).

## Known remaining item
- The literal typo **"oufits"** (meant "outfits") was fixed in the
  homepage meta description but still exists in the shared legal-page
  meta description boilerplate on ~17 other pages (sign-up, log-in,
  testimonials, blog index + all 6 posts, privacy/terms/complaint/
  copyright/data-processing policies, demo-request, book, survey-demo).
