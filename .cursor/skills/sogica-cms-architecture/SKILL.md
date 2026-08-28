---
name: sogica-cms-architecture
description: Apply the approved SOGICA Payload CMS + Neon architecture whenever creating or changing collections, globals, page builder blocks, localization, permissions, drafts, previews, migrations, forms, theme controls, or admin UX.
paths:
  - "src/collections/**/*.ts"
  - "src/globals/**/*.ts"
  - "src/blocks/**/*.ts"
  - "src/payload.config.*"
  - "payload.config.*"
  - "src/access/**/*.ts"
  - "src/hooks/**/*.ts"
  - "src/migrations/**/*"
---
# SOGICA CMS Architecture

## Core architecture

- Next.js App Router + TypeScript strict mode.
- Payload CMS integrated into the same Next.js application.
- Neon PostgreSQL via Payload's Postgres adapter.
- Cloudflare R2 via Payload's S3-compatible adapter when running on Vercel/Node.
- Use generated Payload types. Avoid `any`.
- Use migrations for shared/staging/production databases. Do not rely on development push in production.

## Required collections

Create and maintain at least:
- `users`
- `pages`
- `expertises`
- `projects` / `realisations`
- `clients-partners`
- `equipment`
- `media`
- `form-submissions`

Optional supporting collections are acceptable when they reduce duplication, e.g. locations or reusable navigation items.

## Required globals

Create and maintain:
- `site-settings`
- `theme-settings`
- `header`
- `footer`
- `legal-settings`

## Localization

- French is the default business language.
- English is supported from the start.
- Localize content fields, SEO fields, navigation labels, CTA labels, page-builder text, expertise content, and project narratives.
- The admin UI should support French and English.
- Do not duplicate whole documents merely to translate them when Payload field localization is appropriate.

## Page builder

Editors must be able to create, remove, reorder, hide, duplicate, and configure page sections without a developer.

Maintain a curated library including:
- Hero
- Intro / Section heading
- Rich text
- Text + media split
- Full-width media
- Image
- Video
- Gallery / masonry gallery
- Statistics / key figures
- Expertise grid
- Featured projects
- Projects grid
- Clients / partners
- Equipment
- Map / locations
- CTA
- Before / after
- Timeline / milestones
- Quote / callout
- Divider / spacing only where semantically useful

Do not allow arbitrary JavaScript injection.

## Theme customization

`theme-settings` must expose safe design tokens for:
- brand and semantic colors;
- backgrounds and foregrounds;
- border colors;
- typography families and scales;
- radius scale;
- container widths;
- spacing density;
- button variants;
- navigation variants;
- card/media treatments;
- motion intensity;
- light/dark behavior if enabled.

Super Admin may additionally edit advanced custom CSS. Custom JS is forbidden.

All frontend theme values must have robust defaults so the site remains complete before any customization.

## Roles

At minimum:
- `super-admin`
- `admin`
- `editor`
- `portfolio-manager`

Apply least-privilege access.
- Only Super Admin can manage users, advanced theme CSS, sensitive technical settings, and destructive global operations.
- Portfolio Manager can manage project/media content but not system settings.
- Editor can manage editorial content within granted areas.
- Public APIs return published public content only.

## Editorial workflow

Enable:
- versions;
- drafts;
- autosave where appropriate;
- preview/draft preview;
- live preview for major pages if stable;
- restore previous versions;
- publish/unpublish.

## Forms

Store contact and quote submissions in Payload with:
- status;
- internal notes;
- created timestamp;
- locale;
- source page;
- consent fields if applicable.

Email delivery must be provider-abstracted/configurable. Do not hardcode a proprietary provider into business logic.

## Safety and correctness

- Validate slugs and uniqueness.
- Sanitize user-editable rich content.
- Keep secret keys server-only.
- Never expose database or R2 credentials to the client.
- Ensure destructive media deletion checks references or clearly warns the admin.
- Validate custom CSS and restrict it to Super Admin.
