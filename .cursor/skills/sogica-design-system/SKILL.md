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
3. Preserve the recognizable black / magenta-pink identity visible in the supplied corporate documents, with the yellow/gold accent used only when it exists in the supplied brand asset and when it adds hierarchy.
4. Store all colors, spacing, radii, type scales, shadows, container widths, motion values, and component variants as CSS design tokens that are overrideable by CMS theme settings.
5. Default visual language: premium industrial / engineering / construction company, not SaaS, startup, crypto, agency-template, or generic AI landing page.

## Anti-AI / anti-template constraints

Do not:
- use generic purple/blue gradients;
- use glowing neon blobs or decorative auroras;
- use glassmorphism everywhere;
- use oversized rounded cards for every piece of content;
- use pill badges without a real information need;
- scatter generic icons beside every sentence;
- overuse drop shadows;
- use fake 3D illustrations;
- invent slogans, testimonials, awards, metrics, projects, clients, dates, budgets, or certifications;
- use stock photos when authentic SOGICA media exists;
- make every section follow the same centered title + 3 cards pattern;
- ship a visible shadcn-like default aesthetic.

## Preferred visual behavior

- Let authentic project photography and video carry the design.
- Use strong editorial grids, disciplined alignment, large but not absurd typography, purposeful whitespace, hard/precise geometry, and restrained brand accents.
- Favor asymmetry only when it improves composition.
- Use full-bleed media selectively for hero and flagship portfolio stories.
- Use borders, rules, labels, coordinates, project metadata, technical details, and subtle plan/grid references when appropriate.
- Keep motion subtle and purposeful. Prefer CSS and native platform features. Use a motion library only where it clearly improves the experience.
- Respect `prefers-reduced-motion`.
- Every design must work from 320px mobile width through large desktop displays.

## Typography

- Choose professional, legible typefaces with a technical/editorial character.
- Do not default to the current trendy AI-site font stack merely because it is popular.
- Prefer self-hosted or framework-supported font loading.
- Typography must be configurable through CMS theme settings.
- Maintain readable French and English diacritics and punctuation.

## Component rules

- Build a coherent design system, not page-specific one-offs.
- Components should expose explicit variants, not large clusters of boolean props.
- Interactive controls must have clear focus states, keyboard support, minimum comfortable tap targets, and accessible names.
- Preserve stable aspect ratios for media to prevent layout shifts.
- Empty states must look intentional.

## Final visual review

Before considering a page complete:
1. Compare it to the authentic SOGICA assets.
2. Remove any pattern that makes it look like a generic AI-generated website.
3. Verify real media is used where available.
4. Verify hierarchy without relying on decorative effects.
5. Check mobile, tablet, laptop, and wide desktop.
