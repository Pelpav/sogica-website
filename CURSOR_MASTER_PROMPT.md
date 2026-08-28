# MASTER PROMPT — SOGICA SA WEBSITE

You are the lead product designer, senior Next.js engineer, Payload CMS architect, PostgreSQL/Neon engineer, media-platform engineer, accessibility specialist, and production reviewer for the SOGICA SA corporate website.

Your job is to build a complete, production-grade website and CMS, not a prototype and not a generic landing-page template.

Work autonomously. Do not ask questions unless a missing answer is genuinely blocking a safe implementation. When a choice is not specified, use the safest professional default described in this prompt, document it, and continue.

Before coding, inspect all files provided in the repository/workspace: corporate documents, logo files, photos, videos, PDFs, presentations, existing text, and any folder structure. These supplied files are the factual and visual source of truth.

Use installed Cursor skills when relevant, especially the SOGICA project skills plus the official React/Next.js/web-design skills.

---

## 1. Product goal

Build the official website of SOGICA SA — Société Générale d’Ingénieurs de Construction et d’Aménagement — as a modern, premium, industrial/engineering website.

The result must feel designed by a strong human design team for a serious BTP / civil-engineering company.

It must NOT look like:
- an AI-generated website;
- a generic SaaS template;
- a startup landing page;
- a shadcn demo;
- a portfolio theme purchased from a marketplace.

The website must make authentic SOGICA projects, photography, video, engineering expertise, equipment, and references the main visual material.

The two most important product requirements are:

1. **Everything meaningful must be editable from the CMS**, from page structure and content down to theme/design tokens and advanced settings, while preserving safe defaults and guardrails.
2. **The portfolio / réalisations section is a core feature**, including rich project pages and optional long-form editorial case studies with free narrative blocks.

---

## 2. Approved stack

Use current stable, mutually compatible versions. Do not use canary/nightly versions unless a documented blocker requires it.

Required:
- Next.js App Router
- React
- TypeScript in strict mode
- Payload CMS integrated with the Next.js application
- Neon PostgreSQL
- Payload PostgreSQL adapter
- Cloudflare R2 for binary media
- Payload S3 storage adapter for R2 when running in Vercel/Node
- Vercel for deployment
- pnpm
- Tailwind CSS is acceptable for utilities, but the visual system must be custom and based on CSS variables/design tokens
- MapLibre for project maps, with a configurable map tile/style provider
- Payload Lexical for rich text where appropriate

Use Server Components by default. Add Client Components only for actual interactivity.

Do not introduce another CMS, another database, Firebase, Supabase, Cloudinary, or another object-storage provider.

Do not use Cloudinary anywhere.

Do not store image/video binaries in Neon.

Do not commit the user's media library to Git.

Do not use `@payloadcms/storage-r2` for a Vercel/Node deployment. Use Payload's S3-compatible storage adapter pointed to the R2 S3 endpoint.

---

## 3. Source-of-truth business content

Treat supplied SOGICA documents and explicit user instructions as factual source material.

Do not invent facts to make the website feel fuller.

### Company

- Name: **SOGICA SA**
- Full name: **Société Générale d’Ingénieurs de Construction et d’Aménagement**
- The corporate presentation states that the company was established in **2016**.
- It describes SOGICA as a BTP company working on civil engineering infrastructure, renovation and road/traffic-lane development, supported by engineers and experienced technicians.

### Current principal areas of expertise from the concise expertise note

#### 1. Génie civil
The source describes:
- ouvrages en béton armé;
- ouvrages d’art;
- infrastructures routières;
- bâtiments;
- Voiries et Réseaux Divers (VRD);
- plateformes;
- aménagements connexes.

#### 2. Construction métallique
The source describes:
- fabrication, assemblage et montage de structures métalliques;
- charpentes et ossatures métalliques;
- auvents;
- couvertures;
- supports techniques;
- passerelles;
- ouvrages métalliques divers;
- ouvrages mixtes associant structures métalliques et génie civil.

#### 3. Équipements et systèmes de pesage et de contrôle routier
The source describes:
- fourniture, installation et mise en service;
- pont-bascule;
- pèse-essieux;
- systèmes de contrôle de gabarit et de surhauteur;
- barrières automatiques;
- équipements de signalisation;
- contrôle d’accès;
- capteurs;
- logiciels de contrôle et de gestion.

The concise note states that SOGICA can propose integrated solutions from civil infrastructure and metal structures through installation and commissioning of specialized technical equipment.

### Additional capabilities listed in the corporate presentation

The corporate presentation also lists:
- Réhabilitation
- Bâtiment & Ouvrage
- Construction Métallique
- Construction Bâtiment
- Aménagement de Voirie
- Ouvrage Hydraulique
- Import/Exports
- Travaux Spéciaux

These are source-backed. Keep them available as secondary services/capabilities in CMS, but do not silently treat them as more current or more important than the three principal domains above.

### Equipment listed in the corporate presentation

Seed as editable CMS data:
- 2 camions benne avec grue
- 5 camions bennes simples
- 3 véhicules de liaison
- 4 bétonnières
- 3 postes à soudure
- 2 groupes électrogènes
- 1 lot d’échafaudage
- 1 lot d’équipement de sécurité
- 1 lot de petits matériels

### References / organizations listed in the presentation

Seed as editable references, without downloading logos unless logos are explicitly supplied/approved:
- PNUD-MLI
- Fonds d’Entretien Routier (FER MALI)
- Expertise France – Groupe AFD
- SONATER-PUDTR – Burkina Faso
- Union Européenne – Mali

### Contact information in the supplied presentation

Seed it in CMS, but never hardcode it into components:
- Adresse: Faladiè SEMA, près de Mali Univers
- E-mail: sogicbtp@gmail.com
- Tél: (+223) 63 63 10 53 / 66 71 91 59
- Contact du Gérant: (+223) 62 56 85 12

### Legal/company information in the supplied presentation

Seed in editable legal settings:
- Registre du Commerce: MA BKO 2016.B.3180
- NIF: 086147272W
- Forme juridique: SA au capital de 100.000.000 francs CFA
- Agrément: N°2019-714/BTP/API-MALI-GU, modifié N°2024-276/BTP/API-MALI-GU

Never add unsupported awards, revenue, employee count, years of experience beyond what follows factually from 2016, contract values, certifications, clients, projects, project budgets, testimonials, or performance claims.

---

## 4. Content integrity rules

This is mandatory.

Never invent:
- a project;
- project location;
- project date;
- project duration;
- project amount;
- client;
- KPI;
- quote/testimonial;
- award;
- certification;
- staff number;
- office;
- phone/email;
- social profile;
- partner logo.

If project media is provided but the project name/client/date is not reliably known, import the media into the media library as unassigned media or a clearly editable draft group. Do not infer a client or project from visual appearance alone.

Do not use fake lorem ipsum on published frontend pages.

Do not retrieve random construction stock photos and present them as SOGICA work.

Do not retrieve logos of listed organizations from the web unless explicitly requested or approved. If no logo is supplied, show the organization name typographically.

Generated English translations may faithfully translate source-backed French copy, but they must not add claims.

---

## 5. Brand and visual direction

### First action

Inspect the highest-quality supplied SOGICA logo asset.

Derive the exact palette from the actual source logo if possible. The corporate documents visibly use a strong black + magenta/pink identity, with yellow/gold also present around the mark. Preserve that identity, but do not guess exact hex values when a proper logo file exists.

Create a CMS-overridable token system.

### Default design language

Aim for:
- premium industrial;
- civil engineering;
- construction;
- technical precision;
- editorial photography;
- strong grid;
- confident typography;
- restrained motion;
- generous but controlled whitespace;
- crisp alignment;
- authentic project documentation.

The media should make the site memorable.

### Explicit anti-AI design constraints

Do not use:
- purple/blue AI gradients;
- decorative aurora blobs;
- generic glowing cards;
- glassmorphism throughout the site;
- excessive rounded rectangles;
- endless centered “badge + title + subtitle + 3 cards” sections;
- random line icons beside every text item;
- fake 3D objects;
- generic geometric hero illustrations;
- huge empty hero headlines with weak substance;
- stock “construction worker smiling at camera” imagery when authentic SOGICA media exists;
- meaningless slogans such as “Building tomorrow, today” unless supplied by SOGICA.

Do not let an off-the-shelf UI kit determine the visual identity.

Accessible headless primitives are acceptable, but style them from SOGICA's design system.

### Motion

Use motion sparingly:
- subtle reveal;
- image transitions;
- project-gallery transitions;
- restrained parallax only when it remains performant;
- hover/focus interactions with purpose.

Always respect `prefers-reduced-motion`.
No scroll-jacking.
No custom cursor gimmick.
No animation that delays content access.

---

## 6. CMS must control the website

The CMS is not only a blog editor. It is the control system for the site.

Create a polished, understandable Payload admin experience.

### Roles

At minimum:
- Super Admin
- Admin
- Editor
- Portfolio Manager

Apply least privilege.

Only Super Admin can:
- manage users/roles;
- edit advanced custom CSS;
- change sensitive technical/global settings;
- perform high-risk destructive operations.

### Required collections

Implement at least:

#### Users
Auth + role access.

#### Pages
Fields:
- localized title
- localized slug
- status
- page builder blocks
- SEO
- navigation visibility if appropriate
- noindex option
- publication dates
- draft/version data

#### Expertises
Fields:
- localized name
- slug
- short description
- full content
- icon/graphic only if supplied or system-designed
- cover media
- gallery
- ordering
- featured flag
- related projects
- SEO

#### Realisations / Projects
Detailed in the portfolio section below.

#### Clients / Partners
Fields:
- name
- optional logo
- optional website
- type/category
- description
- ordering
- featured
- publication status

Logo is optional. Never require a logo.

#### Equipment
Fields:
- name
- category
- quantity
- description
- media
- ordering
- publication status

#### Media
Rich media metadata, detailed below.

#### Form submissions
Store contact/quote requests securely with status and internal notes.

### Required globals

#### Site Settings
- company names
- description
- address
- phone numbers
- emails
- social links
- default SEO
- default OpenGraph media
- locale options
- site notices
- business hours if later supplied

#### Theme Settings
Editable design tokens.

#### Header
- logo variants
- navigation
- CTA
- sticky behavior
- layout variant
- language switcher controls

#### Footer
- columns
- menus
- coordinates
- legal links
- social links
- copyright format
- CTA if enabled

#### Legal Settings
- registration number
- tax number
- legal form
- capital
- approval/agrément
- legal/company notices

---

## 7. Fully flexible page builder

The user must be able to change the order and composition of pages without a developer.

Use Payload Blocks as the structured page builder.

Every block should:
- have strong defaults;
- allow hide/show;
- allow localized text;
- allow appropriate alignment/layout variants;
- support optional theme/background variant;
- support media where relevant;
- avoid a giant arbitrary set of style fields;
- render consistently through shared components.

Required blocks:
- Hero
- Intro / section heading
- Rich text
- Text + media split
- Full-width image
- Full-width video
- Single media
- Gallery
- Masonry/editorial gallery
- Statistics / key figures
- Expertise grid
- Featured projects
- Project grid
- Clients/partners
- Equipment
- Map
- CTA
- Before/after
- Timeline
- Quote/callout
- Spacer/divider only when needed

Editors can:
- add blocks;
- delete;
- reorder;
- duplicate;
- hide;
- configure layout;
- preview.

Do not provide arbitrary JavaScript injection.

Super Admin may have an **advanced custom CSS** field.
No custom JS field.

---

## 8. Theme customizer

All public components must consume CSS variables/design tokens so CMS changes propagate consistently.

Theme settings should include at minimum:
- primary brand color
- secondary brand color
- accent color
- background
- foreground
- muted background
- muted foreground
- border
- destructive/status colors where needed
- heading font family
- body font family
- type scale
- display scale
- container max widths
- section spacing
- density
- border radius scale
- button radius/style
- card treatment
- image/media treatment
- header style
- navigation style
- motion intensity
- optional light/dark modes if implemented

Do not allow the editor to create inaccessible color combinations silently. Add contrast guidance/validation where practical.

The default theme must look finished even before any settings are changed.

---

## 9. Portfolio / réalisations — critical feature

This is the centerpiece of the site.

### Portfolio index

Create `/[locale]/realisations` for French and an appropriate localized English route strategy.

Support:
- strong featured-project presentation;
- visual project grid;
- optional list view if useful;
- filters by expertise;
- filters by year;
- filters by country/location;
- filters by project type;
- URL-synchronized filters when practical;
- clear filter reset;
- accessible filter controls;
- empty states;
- pagination or progressive loading if dataset becomes large.

Do not show a filter when no valid data exists for it.

### Project fields

Support:
- title
- localized slug
- short description
- full summary
- client relationship
- expertise relationship(s)
- service/type tags
- country
- city/area
- text location
- optional coordinates
- date/year or date range
- status
- cover image
- optional cover video
- gallery
- video gallery
- services/work performed
- key facts / figures
- challenges
- solutions
- before/after
- featured
- manual display order
- related projects
- SEO
- draft/published workflow

All potentially unknown fields must remain optional.

### Two project page modes

#### Mode A — Standard project
A clean structured case page:
- hero;
- factual metadata;
- description;
- gallery;
- related expertise;
- related projects.

#### Mode B — Editorial case study
A project can contain a free narrative block sequence.

Narrative blocks:
- chapter heading
- rich text
- large image
- full-bleed image
- image pair
- editorial gallery
- video
- metric/stat
- technical facts
- quote/callout
- before/after
- text/media split
- map
- spacer/divider when genuinely useful

Editors can freely arrange those blocks.

Flagship case studies should feel like premium editorial architecture/engineering stories, not blog posts.

### Project map

Use MapLibre.
- Coordinates are optional.
- Projects with coordinates appear on the map.
- Projects without coordinates still work everywhere else.
- Use clustering if necessary.
- Marker cards link to project pages.
- Tile/style provider must be configurable via environment/configuration.
- Do not hardcode Google Maps.
- Do not depend on a public community tile server in production if its usage policy would not support the traffic.

---

## 10. Media architecture — Cloudflare R2

There will be many photos and videos. Design for scale from day one.

### Public media

Use Cloudflare R2 as object storage through its S3-compatible endpoint.

Use Payload's `@payloadcms/storage-s3` integration for normal media in the Vercel/Node environment.

Use environment variables, for example:
- `R2_ACCOUNT_ID`
- `R2_BUCKET`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ENDPOINT`
- `R2_PUBLIC_URL`

Use `region: "auto"` for R2 where required by the adapter.
Use the configured R2 endpoint for S3 API operations.
Serve public files from `R2_PUBLIC_URL`, ideally a custom media domain.

Enable direct client uploads where supported so media does not pass through Vercel's server upload path.

### Private form attachments

Quote/contact attachments may contain private project documents.

Use a separate private R2 bucket/collection or an equivalently secure separate storage configuration:
- `R2_PRIVATE_BUCKET`
- private objects are never exposed through the public media domain;
- use short-lived signed access only for authorized admin users.

### Large upload workflow

For large files, especially video:
- browser -> R2 directly;
- use multipart S3-compatible upload for roughly >100 MB or when resumability is required;
- show upload progress;
- allow cancellation;
- retry failed parts;
- bounded concurrency;
- never buffer a huge file in Next.js memory;
- never proxy a large media payload through a Vercel function.

Authorization endpoints may create/sign the upload, but file bytes must go directly to R2.

### Media library UX

Support:
- grid and list view
- search
- filtering by media type
- filtering by project/expertise
- tags
- virtual folders/groups
- bulk selection
- bulk delete with warnings
- bulk assignment to project
- bulk tags
- bulk captions/metadata where practical
- localized alt text
- caption
- credit/copyright
- capture date
- location
- dimensions/orientation
- focal point
- video poster
- publication status

### Bulk import

Support hundreds of files:
- multi-select drag and drop;
- browser folder selection when available;
- bounded parallel uploads;
- overall and per-file progress;
- failure retry;
- post-upload batch metadata assignment.

If media arrives in folders, preserve folder/group hints as metadata where useful, but do not assume the folder name is a verified project/client unless the user explicitly organized it that way.

### Rendering media

Images:
- use `next/image` or a justified current equivalent;
- use stable dimensions/aspect ratios;
- responsive `sizes`;
- lazy load below fold;
- prioritize only actual LCP media;
- avoid loading originals when not needed.

Video:
- use poster frames;
- avoid autoplay with sound;
- `preload="metadata"` or `none` by default;
- lazy mount below the fold when useful;
- keep the content model compatible with a future streaming provider without requiring it in V1.

Do not add Cloudinary.

---

## 11. Multilingual

Architecture is bilingual from the start.

Locales:
- `fr`
- `en`

French is primary/default.

Use Payload field localization for translatable data.

Implement localized frontend routes consistently, preferably under a locale segment, with correct:
- canonical URLs;
- hreflang;
- sitemap entries;
- metadata;
- language switcher.

The Payload admin interface should support French and English.

Do not silently use machine translation as a permanent source of truth. It is acceptable to seed faithful English translations of source-backed French copy, but editors must be able to modify them.

---

## 12. Required public pages

Create at least:

- Home / Accueil
- About / SOGICA / À propos
- Expertise index
- Expertise detail
- Portfolio / Réalisations
- Project detail
- Equipment / Moyens matériels
- Clients & Partners / Clients & partenaires
- Contact
- Request a quote / Demande de devis
- Legal notice / Mentions légales
- Privacy / Confidentialité
- 404
- error/empty states

All page structure/content should be CMS-driven where reasonable.

### Suggested default homepage composition

Use authentic media and source-backed content:
1. Hero using a real SOGICA photo or short video when supplied.
2. Company introduction.
3. Three principal expertise domains.
4. Featured projects — only once real project entries exist.
5. Selected real key figures — only facts available in CMS; do not fabricate metrics.
6. Project/realisation map when coordinates exist.
7. References/clients.
8. CTA to contact/request quote.

If no real projects have been entered yet, do not fabricate portfolio cards. Use an intentional empty/admin-ready state or omit that section until populated.

---

## 13. Contact and quote request

Implement:

### General contact
- name
- email
- phone
- company/organization optional
- subject
- message
- consent checkbox if required by configured privacy policy

### Quote/project request
- name
- organization
- phone
- email
- project type/expertise
- project location
- budget optional
- desired timing optional
- description
- attachments
- consent if applicable

Store submissions in Payload.

Implement admin workflow:
- new
- contacted
- qualified
- closed / archived

Add internal notes.

Email notification must use a provider abstraction/configurable SMTP-style setup. Do not make the application dependent on one email SaaS provider.

Protect forms using sensible server validation, honeypot/time-based anti-spam, and rate-control architecture. If a third-party anti-bot provider is later configured, keep the integration optional.

Private attachments must not be public R2 URLs.

---

## 14. SEO

Implement production SEO:
- Next.js metadata API
- editable per-page SEO title/description
- OpenGraph/Twitter metadata
- default OG image
- dynamic sitemap
- robots
- canonical URL
- hreflang
- clean slugs
- breadcrumbs where useful
- structured data using only verified facts

Use appropriate Schema.org types such as Organization and a relevant construction/local-business subtype only where the available data justifies it.

For projects, use generic CreativeWork/Project-like structured data only if semantically appropriate and valid. Do not invent schema fields.

Prevent draft/private content from indexing.

---

## 15. Accessibility

Target WCAG 2.2 AA.

At minimum:
- semantic HTML;
- logical heading structure;
- keyboard navigation;
- visible focus;
- skip link;
- accessible menus;
- accessible dialogs;
- form labels and inline errors;
- error summary where useful;
- meaningful alt text;
- empty alt for decorative images;
- reduced motion;
- sufficient contrast;
- accessible galleries;
- captions/transcript support for informative video;
- no essential information conveyed only by color.

Use the installed web-design guidelines skill for review.

---

## 16. Performance

This is a media-heavy site, so performance is a core requirement.

Use:
- Server Components by default;
- streaming/Suspense where beneficial;
- parallel data fetching;
- bounded queries;
- indexes for common project filters;
- lazy-loaded MapLibre;
- lazy video;
- responsive images;
- stable aspect ratios;
- route-level code splitting;
- minimal client JS;
- no huge animation library globally;
- no media uploads through serverless request bodies.

Avoid:
- data-fetching waterfalls;
- repeated database queries for the same data;
- rendering all portfolio assets at once;
- loading the map bundle on pages that do not need it.

Create reasonable cache/revalidation behavior compatible with CMS updates and preview mode.

---

## 17. Database and migrations

Use Neon PostgreSQL with Payload's Postgres adapter.

Provide:
- `.env.example`;
- `DATABASE_URL`;
- optional direct/unpooled migration URL if useful;
- migration scripts;
- seed script;
- documented production migration procedure.

Do not run destructive schema push behavior in production.

Use explicit migrations for production.

Create indexes for:
- published status/date;
- localized or normalized slugs as supported;
- expertise relationships/filtering;
- year/date filtering;
- featured/order;
- commonly queried project location/type fields.

Use database transactions where a multi-step write must remain atomic.

---

## 18. Seed data

Create an idempotent seed system.

Seed:
- company/site settings from the supplied documents;
- legal info from the supplied documents;
- the three principal expertise domains;
- secondary source-backed capabilities;
- equipment inventory;
- listed reference organizations;
- default theme tokens derived from the supplied logo;
- default header/footer;
- default page structures.

Do NOT seed fake projects.

Do NOT seed fake testimonials.

Do NOT seed fake numbers.

If a seed value comes from a supplied document, keep it editable in the CMS.

If the codebase can record provenance in internal-only metadata without complicating editors, store a simple source note such as `corporate-presentation` or `expertise-note`.

---

## 19. Media ingestion from user-supplied files

Before building the public media layouts:
1. Recursively inventory the supplied image/video files.
2. Identify:
   - file name;
   - path/folder;
   - type;
   - size;
   - dimensions/duration when available;
   - likely duplicate/hash if practical.
3. Create `docs/media-inventory.md` or machine-readable equivalent.
4. Do not infer factual project metadata from visual content.
5. Use the best authentic media in layouts once safely associated.
6. Preserve originals outside Git; only references/metadata belong in the CMS/database.

If the user has supplied many images/videos, actually use them. Do not build a beautiful shell and leave the real media unused.

---

## 20. Admin UX

The CMS should feel usable by a non-developer.

Customize Payload admin where it adds real value:
- clear French labels;
- logical navigation groups;
- helpful descriptions;
- thumbnails;
- project/media relationship fields;
- bulk actions;
- status indicators;
- previews;
- theme controls;
- warnings for destructive operations.

Do not expose raw technical fields when a friendly control can be provided.

Provide meaningful defaults and help text.

---

## 21. Security

Implement:
- server-only secrets;
- strict access control;
- protected preview endpoints;
- secure admin auth;
- safe password requirements;
- CSRF/origin protections provided by framework/CMS plus correct config;
- input validation;
- upload MIME/extension/size validation;
- signed short-lived private-media access;
- no arbitrary user JS;
- sanitized rich text output;
- safe custom CSS limited to Super Admin;
- reasonable CSP/security headers;
- no secrets in logs;
- no credentials in client bundles.

Do not expose direct R2 write credentials to the browser. Only use scoped/short-lived upload authorization.

---

## 22. Testing and quality

Set up and maintain:
- lint
- TypeScript typecheck
- production build
- unit/integration tests for important utilities/access rules
- Playwright or a current equivalent for critical public smoke tests

Test at least:
- homepage FR
- homepage EN
- expertise
- portfolio empty/populated behavior
- project page
- locale switch
- contact validation
- quote validation
- 404
- basic navigation
- draft content not visible publicly

Where practical, test Payload access-control functions directly.

Before completion, run the `sogica-quality-gate` skill.

Never claim a test passed if it was not actually executed.

---

## 23. Project organization

Prefer a clear structure along these lines, adapting to Payload's current official project conventions:

- `src/app/`
- `src/components/`
- `src/blocks/`
- `src/collections/`
- `src/globals/`
- `src/access/`
- `src/lib/`
- `src/hooks/`
- `src/styles/`
- `src/types/`
- `src/migrations/`
- `src/scripts/`
- `docs/`
- `.cursor/skills/` or `.agents/skills/`

Keep block schema and block renderer architecture easy to trace.

Do not create giant page components.

Do not create a generic `utils.ts` dumping ground.

---

## 24. Documentation

Create:
- `README.md`
- `docs/architecture.md`
- `docs/cms-guide.md`
- `docs/content-model.md`
- `docs/media-pipeline.md`
- `docs/deployment.md`
- `docs/media-inventory.md` when media exists

README must include:
- local setup;
- pnpm commands;
- Neon setup;
- R2 setup;
- required CORS rules for direct uploads;
- environment variables;
- migrations;
- seed;
- admin creation;
- local development;
- production deployment;
- media import;
- backup considerations.

---

## 25. Environment template

Create `.env.example` with clear comments and no real secrets.

Expect variables similar to:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

DATABASE_URL=
DATABASE_URL_UNPOOLED=

PAYLOAD_SECRET=
PREVIEW_SECRET=
CRON_SECRET=

R2_ACCOUNT_ID=
R2_BUCKET=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_ENDPOINT=
R2_PUBLIC_URL=

R2_PRIVATE_BUCKET=
R2_PRIVATE_ACCESS_KEY_ID=
R2_PRIVATE_SECRET_ACCESS_KEY=

MAP_STYLE_URL=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

NEXT_PUBLIC_DEFAULT_LOCALE=fr
```

Only add variables that the implementation actually uses.

---

## 26. Delivery phases

Work in phases and keep the project runnable.

### Phase 0 — Inspect and document
- inspect supplied docs/logo/media;
- inventory media;
- confirm current dependency compatibility using official docs when needed;
- create architecture/content/design notes;
- identify unsupported/missing data without inventing it.

### Phase 1 — Foundation
- scaffold Next.js + Payload;
- TypeScript strict;
- Neon Postgres;
- migrations;
- auth/roles;
- localization;
- R2 storage;
- environment validation;
- base design tokens.

### Phase 2 — CMS
- collections/globals;
- page builder;
- drafts/versions/preview;
- theme editor;
- media library;
- seed.

### Phase 3 — Public site
- navigation/footer;
- home;
- about;
- expertise;
- equipment;
- clients;
- contact/quote;
- legal pages.

### Phase 4 — Portfolio
- projects;
- filters;
- project templates;
- editorial case-study builder;
- galleries/video;
- MapLibre project map;
- related projects.

### Phase 5 — Media scale
- bulk uploads;
- direct uploads;
- multipart/resumable large uploads;
- batch metadata;
- private attachments.

### Phase 6 — Hardening
- SEO;
- accessibility;
- security;
- performance;
- tests;
- responsive polish;
- final content-integrity scan.

### Phase 7 — Production readiness
- migration procedure;
- Vercel config;
- Neon/R2 setup documentation;
- final build;
- quality gate;
- concise handoff report listing:
  - implemented features;
  - remaining credential-dependent tasks;
  - anything intentionally left optional;
  - exact commands to deploy.

Do not stop after generating a homepage mockup. Complete the architecture and production implementation.

---

## 27. Definition of done

The project is not done until:

- the site builds successfully;
- TypeScript passes without `any` shortcuts introduced to silence errors;
- lint passes;
- critical tests pass;
- CMS can modify page structure;
- CMS can modify theme tokens;
- Super Admin can use advanced custom CSS;
- French and English work;
- drafts/preview work;
- R2 media works;
- large media does not pass through Vercel server functions;
- portfolio filters work with real data;
- project case-study narrative blocks work;
- project map works when coordinates exist;
- contact/quote submissions are stored;
- private quote attachments are not public;
- SEO metadata/sitemap/canonical/hreflang are implemented;
- keyboard/reduced-motion/mobile checks are complete;
- no fake project/client/stat/testimonial exists;
- no Cloudinary integration exists;
- real supplied SOGICA media is incorporated when available;
- the final visual result does not resemble a generic AI-generated website.

Begin with Phase 0, then proceed through the phases without waiting for approval unless a genuinely blocking credential or destructive decision requires it.
