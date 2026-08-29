---
name: sogica-motion
description: SOGICA scroll reveal and page motion — Framer Motion, respects motionIntensity CMS token and prefers-reduced-motion. Use when adding animations, scroll effects, page entrances, or making UI feel less static.
paths:
  - "src/components/motion/**"
  - "src/styles/motion.css"
  - "src/lib/motion-config.ts"
---

# SOGICA Motion

## Philosophy

- **Subtle, premium, industrial** — never flashy SaaS / AI-template motion.
- **GPU-only** — animate `opacity` and `transform` only.
- **Respect user choice** — `prefers-reduced-motion`, CMS `motionIntensity` (`none` | `subtle` | `moderate`).
- **Zero layout shift** — hidden state uses transforms, not `display:none`.
- **Performance first** — Framer Motion `whileInView` with `once: true`. No GSAP for simple reveals.

## System overview

| Piece | Role |
|-------|------|
| `MotionProvider` | Disables motion on legal routes; waits for hydration |
| `Reveal` | Single element reveal (`up`, `fade`, `left`, `right`, `scale`, `hero`) |
| `RevealStagger` | Stagger children when container enters viewport |
| `RevealEach` | Each child animates individually on scroll (grids, lists) |
| `PageHeroReveal` | Internal page heroes |
| `MotionPage` | Page entrance fade + translateY |
| `motion-config.ts` | Legal routes, viewport thresholds, intensity |
| `motion.css` | Reduced-motion + `data-motion=none` overrides |

## Adding a reveal

```tsx
import { Reveal } from '@/components/motion/Reveal'
import { RevealEach } from '@/components/motion/RevealEach'
import { RevealStagger } from '@/components/motion/RevealStagger'

// Single element
<Reveal variant="up"><h2>Title</h2></Reveal>

// Grid — each item reveals on its own scroll
<RevealEach className="grid gap-6 md:grid-cols-3">
  {items.map((item) => <article key={item.id}>…</article>)}
</RevealEach>

// Text cascade
<RevealStagger stagger={0.12}>
  <p className="eyebrow">SOGICA</p>
  <h1>Title</h1>
</RevealStagger>
```

`MotionProvider` + `MotionScrollEnhancer` run in locale layout.

## LCP rules

- Hero images must NOT be wrapped in `Reveal`
- Use `priority` + `loading="eager"` on hero/LCP images only
- `HeroBlock` defaults `priority = true`

## Do

- ✅ Use `RevealEach` on grids (projects, expertises, stats, clients).
- ✅ Use `RevealStagger` on hero copy and section headers.
- ✅ Keep durations 0.45–0.7s, easing `[0.22, 1, 0.36, 1]`.
- ✅ Test with `motionIntensity: none` in CMS and OS reduced-motion.
- ✅ Use `useMotionActive()` in client motion components.

## Do not

- ❌ Animate hero LCP images inside `Reveal`.
- ❌ Add motion on legal pages (`isLegalRoute`).
- ❌ Animate on every scroll tick (no scrub).
- ❌ Add GSAP for simple fade/slide reveals.
- ❌ Render Framer Motion before hydration (use `useMotionActive()`).

## When to upgrade to GSAP

Use GSAP + ScrollTrigger only for scrubbed parallax, pinned sections, horizontal scroll. Follow `gsap-react` and `gsap-scrolltrigger` skills.

## Review checklist

1. Motion feels intentional, not decorative noise.
2. No jank on mobile — test 320px viewport.
3. Reduced motion shows content immediately.
4. Hero LCP: priority + eager loading, image outside Reveal.
5. Navigation + page transitions still feel smooth together.
