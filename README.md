# DHQ Limited

**Intelligence in Motion.** Official website for DHQ Limited — websites, AI automation, chatbots,
voice assistants, MCP servers, enterprise systems, SEO and lead-generation workflows for any
business, worldwide.

- 📧 Email: `qureshidabeer92@gmail.com`
- 💬 WhatsApp: `+92 314 4781120` (all "Schedule a meeting" buttons open WhatsApp with a prefilled message)
- 📍 Based in Pakistan · serving international clients · payments via **PayPal**
- ⏰ Available 24/7

---

## Project Structure

```
.
├── index.html                       # Home — overview of ALL services + demo video showcase
├── website-development.html         # Service: websites (front-end, back-end, maintenance)
├── seo-services.html                # Service: SEO + Google Business Profile / Maps
├── chatbot-development.html         # Service: AI chatbots + website integration
├── enterprise-systems.html          # Service: CRMs, dashboards, internal tools
├── mcp-server-development.html      # Service: Model Context Protocol servers
├── whatsapp-automation.html         # Service: WhatsApp automation & booking
├── voice-assistant-automation.html  # Service: AI voice agents
├── ai-automation-workflows.html     # Service: custom automations & lead-gen workflows
├── deployment-maintenance.html      # Service: secure deployment, testing, maintenance
├── privacy-policy.html              # Legal
├── terms-and-conditions.html        # Legal
├── 404.html                         # Custom error page
├── styles.css                       # "Authority Dark" theme + V2 additions
├── script.js                        # Animations + demo-video lightbox + DEMO_VIDEOS config
├── robots.txt                       # SEO crawler rules
├── sitemap.xml                      # All 12 pages
└── assets/                          # logo, favicon, images/
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## ➕ Adding your demo videos

Open `script.js` and paste your video URLs into the `DEMO_VIDEOS` object at the top:

```js
var DEMO_VIDEOS = {
    'whatsapp-booking': 'https://www.youtube.com/watch?v=YOUR_ID',
    'voice-agent': '',
    // ...
};
```

YouTube (including Shorts), Vimeo and Google Drive links are supported — videos play right on the site in a pop-up player. Cards left as `''` show a
"Demo coming soon" badge and scroll to the contact section when clicked.

## SEO checklist (already done)

- Unique title, meta description, keywords, canonical, Open Graph + Twitter card per page
- JSON-LD: Organization/ProfessionalService (24/7, Pakistan, worldwide), WebSite, Service,
  BreadcrumbList and FAQPage on every service page
- Semantic HTML5, breadcrumbs, internal linking between all services
- `sitemap.xml` lists all 12 pages; `robots.txt` allows all crawlers
- Lazy-loaded images/iframes, preconnected fonts, reduced-motion support

## Notes

- Canonical URLs, sitemap and JSON-LD still use the `vertex-ai-solutions-automations.com` domain — replace it with your final domain (e.g. `dhqlimited.com`) across `*.html`, `sitemap.xml` and `robots.txt` when ready.

The repo folder is still named `DentalFlow-AI` (git origin). Renaming the remote repo to
match DHQ Limited is optional.
