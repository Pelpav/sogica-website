---
name: sogica-quality-gate
description: Run the mandatory production-readiness checklist after substantial changes and before declaring any SOGICA feature, page, CMS workflow, or release complete.
disable-model-invocation: false
---
# SOGICA Quality Gate

Do not say a feature is finished until the relevant checks pass.

## Required automated checks

Use the scripts defined by the repository. At minimum maintain commands equivalent to:
- lint;
- typecheck;
- unit/integration tests where present;
- production build;
- end-to-end smoke tests for critical public flows.

Prefer `pnpm`.

## Public-site checks

Verify:
- no console errors;
- no hydration warnings;
- no broken links in key navigation;
- no obvious layout shift from media;
- responsive behavior at 320px, mobile, tablet, laptop, and wide desktop;
- keyboard navigation;
- visible focus states;
- semantic headings;
- form labels and error states;
- reduced-motion behavior;
- contrast appropriate for WCAG 2.2 AA target;
- correct French/English routing;
- correct metadata/canonical/hreflang;
- sitemap/robots behavior;
- structured data validity where used;
- graceful missing-content/media states.

## Performance checks

- Server Components by default.
- Client Components only when interactivity requires them.
- No avoidable data waterfalls.
- No oversized client bundle caused by galleries, maps, or animation libraries.
- Map code should be lazy-loaded when not immediately needed.
- Video should not block LCP.
- Only the true hero/LCP image is prioritized.
- Large media never passes through Vercel server functions.
- Database queries are bounded and indexed where filters demand it.

## CMS checks

Verify:
- role permissions;
- draft vs published visibility;
- preview behavior;
- localization;
- version restore;
- page-builder block rendering;
- theme settings fallback defaults;
- destructive media behavior;
- bulk upload progress/failure paths;
- no secrets exposed to client bundles.

## Content integrity

Run a final scan for:
- invented stats;
- invented clients;
- invented projects;
- placeholder testimonial copy;
- lorem ipsum;
- stock assets presented as SOGICA work;
- stale hard-coded contact/legal data that should be CMS-driven.

## Delivery note

If a check cannot be run because a required external credential/service is missing, state exactly:
1. what was not tested;
2. why;
3. the exact command or action the developer should run after credentials are configured.
Do not pretend it passed.
