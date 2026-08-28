---
name: sogica-media-pipeline
description: Apply SOGICA's Cloudflare R2 media architecture whenever implementing uploads, media library behavior, image/video rendering, batch import, storage security, presigned URLs, multipart uploads, or media metadata.
paths:
  - "src/**/*media*"
  - "src/**/*upload*"
  - "src/**/*storage*"
  - "src/payload.config.*"
  - "payload.config.*"
---
# SOGICA Media Pipeline

SOGICA is expected to have a large volume of authentic photos and videos. Media architecture is a first-class concern.

## Storage

- Store binary media in Cloudflare R2, never in Neon/Postgres.
- On Vercel/Node, integrate R2 through the S3-compatible API and Payload's S3 storage adapter.
- Keep R2 credentials server-only.
- Serve published media from a configurable public/custom domain.
- Keep storage configuration provider-neutral enough that AWS S3 can replace R2 later with minimal business-logic changes.
- Do not commit customer media to Git.

## Upload strategy

- Normal media: direct client uploads to R2 using secure short-lived authorization/presigned mechanisms.
- Never proxy large uploads through a Vercel function.
- For large files (roughly >100 MB) or any upload needing resumability, use S3-compatible multipart upload directly to R2.
- Support progress, cancellation, retry, and clear errors.
- For a multipart flow, the server may create/authorize upload parts but the bytes must go browser -> R2.
- Validate MIME type, extension, size, and permissions before granting upload authorization.
- Generate collision-safe object keys. Preserve human-readable metadata separately from storage keys.

## Media library

Support:
- grid/list views;
- search;
- type filters;
- project/expertise filters;
- tags;
- virtual folders/collections;
- bulk selection;
- bulk metadata editing;
- bulk assignment to a project;
- bulk delete with reference warnings;
- captions;
- localized alt text;
- copyright/credit;
- location;
- capture date when known;
- orientation/dimensions;
- poster image for video;
- focal point;
- published/unpublished status.

## Bulk import

Design for hundreds of assets in one operation:
- drag and drop multiple files;
- accept folder selection when browser support permits;
- concurrent uploads with a bounded concurrency limit;
- resumability for large files;
- per-file and overall progress;
- failed-file retry;
- batch metadata assignment after upload.

## Rendering

Images:
- use Next.js image optimization or another configured optimization layer;
- provide width/height or stable aspect ratio;
- lazy-load below the fold;
- prioritize only real LCP media;
- use responsive `sizes`;
- never render huge originals when a smaller representation is sufficient.

Videos:
- short decorative MP4 may be served from R2;
- use poster images;
- default to `preload="metadata"` or `none` where appropriate;
- no autoplay with sound;
- pause/offload videos outside the viewport when useful;
- architecture should allow a future streaming provider without changing the project content model.

## Accessibility

- Decorative images use empty alt text.
- Informational images require meaningful alt text.
- Captions/transcripts should be supported for content-heavy videos.
- Respect reduced motion.
