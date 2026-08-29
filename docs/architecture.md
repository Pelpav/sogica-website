# Architecture SOGICA

## Vue d'ensemble

Application monolithique **Next.js 16 App Router + Payload CMS 3** avec :

- **Neon PostgreSQL** — métadonnées, contenu, formulaires (jamais de binaires)
- **Cloudflare R2** — médias publics + pièces jointes privées (adapter S3)
- **Vercel** — déploiement frontend + API Payload
- **Framer Motion** — reveals au scroll, transitions de page
- **pnpm** — gestionnaire de paquets

## Structure

```
src/
├── app/
│   ├── (payload)/          # Admin + API REST/GraphQL Payload
│   └── (frontend)/[locale]/ # Site public FR/EN
├── access/                  # Contrôle d'accès par rôle
├── blocks/                  # Page builder + blocs narratifs projets
├── collections/             # Users, Pages, Expertises, Projects, etc.
├── globals/                 # Site, Theme, Header, Footer, Legal
├── components/
│   ├── motion/              # Reveal, RevealEach, MotionProvider…
│   ├── blocks/              # BlockRenderer + blocs CMS
│   ├── pages/               # Pages typées (about, contact, etc.)
│   └── theme/               # Navigation, preloader, transitions
├── lib/                     # Payload client, i18n, env, media, motion-config
├── hooks/                   # Hooks Payload + revalidateTag
├── migrations/              # Migrations Postgres production
├── scripts/                 # Seed, import médias, sync homepage
└── styles/                  # Tokens CSS + motion.css + Tailwind
```

## Rendu & performance

| Mécanisme | Usage |
|-----------|-------|
| Partial Prerendering | Shell layout statique, contenu CMS streamé |
| `use cache` + `cacheTag` | Globals, médias, requêtes CMS |
| Suspense par bloc | Homepage : skeleton → bloc par bloc |
| `revalidateTag` | Invalidation cache à la publication Payload |
| Hero `priority` | Image LCP hors Reveal, `loading="eager"` |

## Animations

Système Framer Motion documenté dans `docs/motion.md` :

- `MotionProvider` — layout locale, exclut pages légales
- `Reveal` / `RevealEach` / `RevealStagger` — scroll reveals
- `useMotionActive()` — pas d'animation avant hydratation
- `motion.css` — overrides reduced-motion et `data-motion=none`

## Rôles CMS

| Rôle | Permissions |
|------|-------------|
| super-admin | Tout + CSS avancé + users |
| admin | Contenu + settings (sauf CSS avancé) |
| editor | Pages, expertises, équipements, clients |
| portfolio-manager | Projets + médias assignés |

## Intégrité contenu

- Réalisations : collection vide au seed (aucun projet documenté)
- Médias WhatsApp : import non assignés, usage décoratif autorisé
- Pas de lorem ipsum publié

## Décisions par défaut

| Sujet | Décision |
|-------|----------|
| Next.js version | 16.3.x (PPR + cache composants) |
| Dev sans R2 | `USE_LOCAL_MEDIA=true` — stockage local |
| Map tiles dev | MapLibre demo tiles (configurable prod) |
| Fonts | Barlow Condensed + Source Sans 3 (next/font) |
| Email | Nodemailer SMTP configurable |
| Animations | Framer Motion 13, pas de GSAP pour reveals simples |

## Manques credentials

- Neon `DATABASE_URL` — requis pour prod ; voir `docs/deployment.md`
- R2 — requis pour prod media ; CORS à configurer
- SMTP — optionnel pour notifications formulaires
