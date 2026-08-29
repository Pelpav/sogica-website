---
name: sogica-portfolio
description: Enforce the SOGICA portfolio and case-study model whenever building project collections, portfolio listings, filters, project pages, project maps, galleries, or narrative case studies.
paths:
  - "src/**/*project*"
  - "src/**/*realisation*"
  - "src/**/*portfolio*"
  - "app/**/*realisation*"
  - "app/**/*portfolio*"
---
# SOGICA Portfolio

The portfolio is a primary product feature, not a generic gallery.

## Project model

A project should support, where source data exists:
- title;
- localized slug;
- short summary;
- full structured narrative;
- client relationship;
- expertise relationship;
- service/type tags;
- country / city / textual location;
- optional latitude/longitude;
- year or date range;
- project status;
- cover image/video;
- gallery;
- key figures;
- work/services performed;
- challenges and solutions;
- before/after media;
- featured status;
- manual sort priority;
- related projects;
- SEO;
- publication status.

No field should force editors to invent data. Optional information stays optional.

## Two project storytelling modes

Support both:
1. Standard project page: structured metadata + gallery + content.
2. Editorial case study: free narrative sequence built from blocks.

Case-study narrative blocks should include:
- chapter heading;
- rich text;
- large image;
- full-bleed image;
- image pair;
- gallery;
- video;
- metric/stat block;
- quote/callout;
- before/after;
- text-media split;
- map/location;
- technical facts.

Projects may mix these blocks in any order.

## Portfolio index

Must support:
- editorial featured projects;
- responsive visual grid/list;
- filters by expertise, year, location/country, and project type when those fields exist;
- URL-synchronized filters when practical;
- clear empty state;
- keyboard-accessible filters;
- performant media loading.

Do not manufacture filter values.

## Map

Use MapLibre with a configurable tile/style provider.
- Do not hardcode Google Maps.
- Do not rely on production use of a public tile endpoint that forbids the expected traffic.
- Projects without coordinates still render normally in listings.
- Map popups/cards must link to the project page.
- Clustering is allowed when the dataset becomes large.

## Visual storytelling

- Use authentic supplied project media.
- Prefer **overlay cards** (`.project-card-overlay`) for listings: image full-bleed, gradient sombre, titre et année en overlay — not text below image in a separate card body.
- Featured project layouts: first project spans 2 columns with wide aspect ratio.
- Avoid turning every project into the same uniform card grid.
- Flagship projects may use immersive editorial layouts on detail pages.
- Video must not autoplay with sound.
- Use posters, lazy loading, captions when available, and reduced-motion-friendly behavior.
