---
name: sogica-design-system
description: Enforce SOGICA's premium industrial visual identity and anti-template/anti-AI design rules when building or reviewing any public-facing UI, layout, component, animation, theme, or responsive behavior.
paths:
  - "src/**/*.tsx"
  - "src/**/*.ts"
  - "src/**/*.css"
  - "app/**/*.tsx"
  - "app/**/*.css"
---
# SOGICA Design System

Use this skill for every public-facing UI decision.

## Identity source of truth

1. Inspect the actual SOGICA logo and brand assets supplied in the repository before choosing colors.
2. Extract the exact brand colors from the best-quality logo asset. Never guess a hex value from a scanned document if a source logo is available.
3. Preserve the recognizable black / magenta-pink identity (`#F00080`) visible in the supplied corporate documents, with gold accent (`#D4AF37`) only when it adds hierarchy.
4. Store all colors, spacing, radii, type scales, shadows, container widths, motion values, and component variants as CSS design tokens overrideable by CMS theme settings.
5. Default visual language: **premium construction / engineering** — luminous, confident, photo-led. Not SaaS, startup, crypto, agency-template, or generic AI landing page.

## Reference direction (BTP moderne)

The homepage and key pages should feel closer to high-end construction templates (Constro / Constra style) while keeping SOGICA magenta:

- **Hero immersif** : photo plein écran, overlay sombre, titre blanc massif, CTA magenta, header transparent au-dessus.
- **Rythme de page** : alterner sections claires, bande stats, section sombre (« pourquoi nous »), bande marquee, footer sombre.
- **Variété de layouts** : ne pas répéter la même grille de cartes partout — overlay projets, showcase expertises interactif, intro avec filigrane.
- **Profondeur** : motifs blueprint discrets, texte filigrane décoratif, chevauchements légers, halos magenta derrière visuels.
- **Preuve** : chiffres attestés uniquement, références clients, équipements — jamais de métriques inventées.

## Anti-AI / anti-template constraints

Do not:
- use generic purple/blue gradients;
- use glowing neon blobs or decorative auroras as primary decoration;
- use glassmorphism everywhere;
- use the same rounded card grid for every section;
- use pill badges without a real information need;
- scatter generic emoji or cheap icons beside every sentence;
- overuse identical drop shadows on all blocks;
- use fake 3D illustrations;
- invent slogans, testimonials, awards, metrics, projects, clients, dates, budgets, or certifications;
- use stock photos when authentic SOGICA media exists;
- make every section follow the same centered title + 3 cards pattern;
- ship a visible shadcn-like default aesthetic.

## Preferred visual behavior

- Let authentic project photography and video carry the design.
- Use strong editorial grids, disciplined alignment, large typography, purposeful whitespace, rounded corners (`--radius-lg` ~20px), and restrained magenta accents.
- Use full-bleed media for hero and flagship portfolio stories.
- Use borders, stats bands, blueprint/grid backgrounds, watermark text, and technical metadata when appropriate.
- CTAs use pill buttons with optional arrow-circle icon (`BtnArrowIcon`).
- Header: transparent over immersive hero, solid white on scroll.
- Page transitions: CSS `@view-transition { navigation: auto; }` only — avoid React `<ViewTransition>` (fragile when tab hidden).
- Keep motion subtle. Respect `prefers-reduced-motion`.
- Every design must work from 320px mobile through large desktop.

## Component patterns (implemented)

| Pattern | Usage |
|---------|--------|
| `.hero-immersive` | Hero full-bleed with `[data-hero-overlay]` |
| `.stats-band` | Bande horizontale de chiffres sous le hero |
| `.section-watermark` | Texte filigrane via `data-watermark` |
| `.section-blueprint` | Fond motif grille technique |
| `.project-card-overlay` | Projets avec titre sur image |
| `.expertise-showcase` | Liste interactive + panneau image |
| `.why-choose` | Section sombre checklist + photo |
| `.marquee-strip` | Bande défilante magenta |
| `.testimonial-card` | Citation sur fond sombre (contenu CMS réel uniquement) |
| `.btn-arrow-icon` | Flèche dans cercle sur CTAs |

## Typography

- Headings: Barlow Condensed (`--font-heading`), body: Source Sans 3 (`--font-body`).
- Display titles: `clamp(2.5rem, 6.5vw, 4.75rem)` — last word may use `.display-title__accent` in magenta.
- Section titles: clear hierarchy with eyebrows (uppercase, magenta, rule before).
- Maintain readable French and English diacritics.

## Component rules

- Build a coherent design system via shared CSS classes and explicit block components.
- Interactive controls: focus states, keyboard support, 44px tap targets, accessible names.
- Stable aspect ratios for media to prevent layout shifts.
- Empty states must look intentional.

## Final visual review

Before considering a page complete:
1. Compare to authentic SOGICA assets and reference examples (`public/example1–4.png`).
2. Remove any pattern that makes it look like a generic AI-generated website.
3. Verify real media is used where available.
4. Verify visual rhythm: not all sections look identical.
5. Check mobile, tablet, laptop, and wide desktop.
