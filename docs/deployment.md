# Déploiement

## Vercel

1. Connecter repo GitHub
2. Variables d'environnement (production) :

```
NEXT_PUBLIC_SITE_URL=https://www.sogica.ml
DATABASE_URL=postgresql://...neon...?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://...neon...?sslmode=require
PAYLOAD_SECRET=<32+ chars random>
R2_* (voir .env.example)
MAP_STYLE_URL=<tile provider production>
SMTP_* (optionnel)
```

3. `USE_LOCAL_MEDIA` absent ou `false`
4. Build command : `pnpm build`

## Migrations

```bash
DATABASE_URL=$DATABASE_URL_UNPOOLED pnpm migrate
```

Exécuter avant premier deploy et à chaque changement schema.

## Post-deploy

```bash
pnpm seed   # une fois, si base vide
```

Créer admin si seed non exécuté : `/admin` → first user.

## Credentials manquants au build CI

Sans Neon/R2, le build local utilise Postgres + `USE_LOCAL_MEDIA=true`.

Production requiert credentials réels.

## Backup

- Neon : snapshots automatiques
- R2 : versioning bucket recommandé
- Médias hors Git
