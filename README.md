# Vertex AI — Solutions & Automations

**Intelligence in Motion.** Official website for Vertex AI — 24/7 WhatsApp & voice AI
automations for any business (chatbot, appointment booking, lead capture, and more).

Live business handle: `@vertex-ai-solutions-automations`

---

## Project Structure

```
.
├── index.html                # Main landing page (home)
├── privacy-policy.html       # Legal page
├── terms-and-conditions.html # Legal page
├── 404.html                  # Custom error page
├── styles.css                # All styles (Authority Dark theme + legal + responsive)
├── script.js                 # Animation engine (preloader, scroll progress, reveals,
│                              #   typewriter, tilt, marquee, counters, nav, FAQ, year)
├── robots.txt                # SEO crawler rules
├── sitemap.xml               # SEO site map
├── assets/
│   ├── logo.svg              # Brand logo mark
│   ├── favicon.svg           # Browser favicon
│   └── images/               # Self-hosted professional photos
└── README.md
```

## Run locally

Any static server works. From this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## ⚠️ GO-LIVE CHECKLIST (must update before launching)

The site is production-ready in structure and styling, but you **must** replace
these placeholders with your real details before going live:

1. **Domain** — the canonical URL used in `<link rel="canonical">`, Open Graph,
   and JSON-LD tags is `https://vertex-ai-solutions-automations.com`. Confirm it
   matches the domain you actually own/use.
   - Replace `https://example.com` in **`sitemap.xml`** and **`robots.txt`** with
     your real domain.

2. **Business email** — legal pages reference
   `support@vertex-ai-solutions-automations.com`. Replace with your real inbox.

3. **Legal entity & jurisdiction** — the Privacy Policy and Terms &amp; Conditions
   are accurate templates but treat "Vertex AI Solutions &amp; Automations" as the
   company name. Confirm your legal entity name, registered address, and governing
   law/state before publishing. Consider having a lawyer review them.

4. **Phone / WhatsApp** — phone `+1 443-483-1714` and `wa.me/14434831714` are
   wired throughout. Confirm they are correct for your business.

5. **Google Form** — the "Book a Demo" buttons point to your Google Form URL.
   Keep the same ID or replace with your current form/webhook.

6. **Socials / handle** — the handle `@vertex-ai-solutions-automations` is shown
   in the hero badges, footer, and Open Graph tags. Point "sameAs" in the
   JSON-LD to your real social profiles.

7. **Testimonials** — samples are placeholders. Replace with real client quotes.

8. **Pricing** — Starter/Professional/Enterprise fees reflect the current model;
   confirm amounts and fees match what you actually charge.

9. **Repository name** — the folder is still `DentalFlow-AI` (git origin). The
   site itself is fully rebranded. You may rename/recreate the remote repo to
   match Vertex AI if desired.

## SEO notes

- Meta title/description, canonical URLs, Open Graph, Twitter Card, JSON-LD
  (Organization / WebSite) are included on the landing page.
- Legal pages include their own canonical + meta.
- `robots.txt` and `sitemap.xml` are wired; just set your real domain.

## Stack

Plain HTML + CSS + JS (no build step, no framework).

- **Theme:** "Authority Dark" — charcoal base with a gold ↔ cyan signature gradient;
  WhatsApp-green reserved for WhatsApp CTAs only.
- **Fonts (Google Fonts CDN):** Space Grotesk (display) + Inter (body) +
  JetBrains Mono (micro-labels).
- **Animations:** custom vanilla JS engine (preloader, scroll progress bar, aurora
  mesh, gradient headline shimmer, hero typewriter, industry marquee,
  IntersectionObserver scroll reveals, pointer-tracked 3D tilt, animated counters,
  back-to-top) with full `prefers-reduced-motion` support — no AOS dependency.
- **Images:** 8 free-license professional photos, self-hosted in `assets/images/`.