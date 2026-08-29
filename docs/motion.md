# Système d'animation SOGICA

## Objectif

Donner au site une présence **vivante et premium** sans sacrifier les performances ni l'accessibilité. Les animations sont **industrielles et sobres** : reveals au scroll, entrées de page légères, cascades sur les grilles — jamais d'effets « template SaaS ».

## Stack

| Couche | Technologie |
|--------|-------------|
| Animations scroll | Framer Motion 13 (`whileInView`) |
| Entrée de page | `MotionPage` + View Transitions API |
| Config | `src/lib/motion-config.ts` |
| Overrides CSS | `src/styles/motion.css` |
| Provider | `MotionProvider` dans le layout locale |

## Composants

| Composant | Rôle |
|-----------|------|
| `MotionProvider` | Active/désactive les animations selon la route et l'hydratation |
| `Reveal` | Reveal unitaire (`up`, `fade`, `left`, `right`, `scale`, `hero`) |
| `RevealStagger` | Cascade des enfants directs quand le conteneur entre en vue |
| `RevealEach` | **Chaque enfant** s'anime individuellement au scroll (grilles, listes) |
| `PageHeroReveal` | Hero de pages internes (hors homepage) |
| `MotionPage` | Fade + translateY à l'entrée de page |
| `MotionSection` | Enveloppe section sans animation globale |
| `MotionScrollEnhancer` | Complément DOM pour sélecteurs CMS legacy |

## Routes exclues

Les pages légales n'ont **aucune animation** :

- `/fr/mentions-legales`, `/fr/confidentialite`
- `/en/legal-notice`, `/en/privacy`

Détection via `isLegalRoute()` dans `motion-config.ts`.

## Accessibilité

1. **`prefers-reduced-motion`** — Framer Motion `useReducedMotion()` + fallback CSS dans `motion.css`
2. **CMS `motionIntensity`** — token thème (`none` | `subtle` | `moderate`) via `data-motion` sur `<html>`
3. **Hydratation** — animations désactivées jusqu'au montage client (`useMotionActive()`) pour éviter les mismatch SSR

## Performance

### Règles LCP

- L'image hero est **hors** de tout wrapper `Reveal` (layout `construktion`)
- `priority` + `loading="eager"` + `fetchPriority="high"` sur toutes les images hero
- Seules les images hero reçoivent la priorité — pas les grilles ni galeries

### Bonnes pratiques

- Animer uniquement `opacity` et `transform` (GPU)
- `viewport.once: true` — pas de re-animation au scroll inverse
- Server Components par défaut ; composants motion en `'use client'` minimaux
- Carte MapLibre lazy-loadée via `MapBlockClient`

## Utilisation

### Reveal simple

```tsx
import { Reveal } from '@/components/motion/Reveal'

<Reveal variant="up">
  <h2>Titre de section</h2>
</Reveal>
```

### Grille avec animation individuelle

```tsx
import { RevealEach } from '@/components/motion/RevealEach'

<RevealEach className="grid gap-6 md:grid-cols-3">
  {items.map((item) => (
    <article key={item.id}>…</article>
  ))}
</RevealEach>
```

### Cascade texte

```tsx
import { RevealStagger } from '@/components/motion/RevealStagger'

<RevealStagger stagger={0.12}>
  <p className="eyebrow">SOGICA</p>
  <h1>Titre</h1>
  <p className="lead-text">Sous-titre</p>
</RevealStagger>
```

## Intégration page builder

Les blocs CMS dans `content-blocks.tsx` et `data-blocks.tsx` utilisent `RevealEach` / `RevealStagger` sur les grilles, stats, galeries et sections contact. Le hero homepage (`construktion`) anime le texte en stagger mais **pas** l'image LCP.

## Checklist review

1. Pas d'animation sur pages légales
2. Reduced motion : contenu visible immédiatement
3. Hero LCP : `priority` + `loading="eager"`, image hors `Reveal`
4. Pas de jank mobile (320px)
5. Navigation + transitions de page restent fluides
