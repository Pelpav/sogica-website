# SOGICA SA — Site officiel

Site corporate production-ready pour **SOGICA SA** : Next.js 15 App Router, Payload CMS 3, Neon PostgreSQL, Cloudflare R2.

## Prérequis

- Node.js 25.x (25.8.1 recommandé — voir `.nvmrc`)
- pnpm ≥ 9
- PostgreSQL (Neon en production)
- Cloudflare R2 (production media)

## Démarrage local

```bash
cp .env.example .env
# Configurer DATABASE_URL et PAYLOAD_SECRET

pnpm install
pnpm dev
```

Site : http://localhost:3000/fr  
Admin : http://localhost:3000/admin

### Base de données locale (exemple)

```bash
# PostgreSQL local
DATABASE_URL=postgresql://sogica:sogica@localhost:5432/sogica
USE_LOCAL_MEDIA=true
```

### Seed

```bash
pnpm seed
```

Crée : admin, expertises, équipements, références, pages, médias non assignés depuis `_source/`. **Aucun projet inventé.**

Identifiants seed : `admin@sogica.ml` / `ChangeMe-Sogica-2026!`

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Dev server |
| `pnpm build` | Build production |
| `pnpm seed` | Seed idempotent |
| `pnpm migrate` | Migrations Postgres |
| `pnpm generate:types` | Types Payload |
| `pnpm test` | Tests Vitest |
| `pnpm quality-gate` | typecheck + lint + test + build |

## Neon (production)

1. Créer un projet Neon
2. Copier `DATABASE_URL` (pooler) et `DATABASE_URL_UNPOOLED` (migrations)
3. `pnpm migrate` avant deploy

## Cloudflare R2

1. Créer bucket public + bucket privé (`R2_PRIVATE_BUCKET`)
2. Configurer CORS pour uploads directs :

```json
[
  {
    "AllowedOrigins": ["https://votredomaine.com"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

3. Variables : voir `.env.example`
4. Désactiver `USE_LOCAL_MEDIA` en production

## Déploiement Vercel

- Framework : Next.js
- Build : `pnpm build`
- Variables d'environnement : toutes celles de `.env.example`
- `DATABASE_URL`, `PAYLOAD_SECRET`, R2 requis

Voir `docs/deployment.md`.

## Intégrité contenu

- Photos WhatsApp = médias **non assignés**, pas de projets inventés
- Réalisations vides jusqu'à saisie éditoriale attestée
- Pas de lorem ipsum publié

## Documentation

- `docs/architecture.md`
- `docs/cms-guide.md`
- `docs/content-model.md`
- `docs/media-pipeline.md`
- `docs/media-inventory.md`
- `docs/deployment.md`
