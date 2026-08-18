# Own-Kind — private staging clone

A front-end-only, static clone of the public own-kind.com site, built for testing
changes privately before they go live. Plain HTML/CSS/JS — no build step, no
dependencies to install.

## Run it

```
cd own-kind-staging
python3 -m http.server 8000
```

Then open http://localhost:8000/

## How it's organized

- `index.html`, `demo-request/`, `log-in/`, `sign-up/`, `testimonials/`,
  `blog/` (+ 6 post folders), `privacy-policy/`, `terms-of-service/`,
  `complaint-policy/`, `copyright-policy/`, `data-processing/`, `book/`,
  `public/survey-demo/` — one folder per page, matching the live site's URLs.
- `js/components.js` — the shared header nav, footer, and cookie-consent
  banner markup, extracted verbatim from the live site. Edit this file to
  change the nav or footer everywhere at once.
- `js/site.js` — wires up the hamburger menu, nav clicks, and cookie banner.
- `js/mock-forms.js` — front-end-only mock handlers for the demo-request,
  log-in and sign-up forms (see "What's mocked" below).
- `js/analytics-stub.js` — no-op replacements for Google Analytics / Hotjar
  / Microsoft Clarity so nothing is ever sent to Own-Kind's real accounts.
- `assets/css/styles.css` — the real compiled stylesheet, downloaded as-is
  from the live site.
- `assets/css/app-inline.css` — the live site inlines a lot of its
  component-level CSS directly into each page's `<head>` rather than the
  main stylesheet; this file is every one of those inlined blocks, combined
  and de-duplicated, so nothing is missing colours/spacing/fonts.
- `assets/` — every image, logo, icon, video and font file the site
  actually uses, downloaded from own-kind.com.

## What's mocked (and why)

The live www.own-kind.com is the public marketing/legal front-end for the
same Angular application that also runs Own-Kind's real logged-in product
(CRM, wardrobe, appointments, etc.) — they share one codebase. This clone
only reproduces the **public, unauthenticated** pages, as requested. Forms
that would normally hit Own-Kind's real backend are intercepted client-side
so they show a plausible success state without ever sending a request:

- **Demo request** — shows a "request received" message.
- **Log in** — shows a "staging mock, log-in disabled" message (there's no
  safe way to mock real authentication against a backend we don't control).
- **Sign up** — the real 2-step flow (choose option → fill details) works,
  then shows an "account request received" message.
- **/book** and **/public/survey-demo** — these are already showing their
  real empty states on the live site right now ("No stores available",
  "No survey responses yet"), so nothing needed to be mocked here.

No analytics/tracking scripts (Google Analytics, Google Tag Manager,
Hotjar, Microsoft Clarity) are loaded at all.

## Making changes

Ask for one change at a time. Because the header/footer/buttons/typography
all come from shared files (`js/components.js`, `assets/css/*.css`) rather
than being copy-pasted into every page, most visual changes only need to be
made in one place.
