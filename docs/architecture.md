# Architecture SOGICA — Phase 0

## Vue d'ensemble

Application monolithique **Next.js 15 App Router + Payload CMS 3** avec :

- **Neon PostgreSQL** — métadonnées, contenu, formulaires (jamais de binaires)
- **Cloudflare R2** — médias publics + pièces jointes privées (adapter S3)
- **Vercel** — déploiement frontend + API Payload
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
├── components/              # UI publique
├── lib/                     # Payload client, i18n, env, media
├── hooks/                   # Hooks Payload
├── migrations/              # Migrations Postgres production
├── scripts/                 # Seed, import médias
└── styles/                  # Tokens CSS + Tailwind
```

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
| Next.js version | 15.2.4 (compatible Payload 3.88) |
| Dev sans R2 | `USE_LOCAL_MEDIA=true` — stockage local |
| Map tiles dev | MapLibre demo tiles (configurable prod) |
| Fonts | Barlow Condensed + Source Sans 3 (self-hosted via next/font) |
| Email | Nodemailer SMTP configurable |

## Manques credentials

- Neon `DATABASE_URL` — requis pour prod ; voir `docs/deployment.md`
- R2 — requis pour prod media ; CORS à configurer
- SMTP — optionnel pour notifications formulaires
