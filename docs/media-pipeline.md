# Pipeline médias

## Production (R2)

- Adapter : `@payloadcms/storage-s3` → endpoint S3 R2
- Upload direct : `POST /api/media/presign` → URL signée → browser → R2
- Multipart : à activer côté client pour fichiers > 100 MB (architecture prête)
- Jamais de binaires dans Neon
- Jamais Cloudinary

## Développement

`USE_LOCAL_MEDIA=true` → fichiers dans `public/media/uploads/`

## Privé

Collection `private-media` → bucket `R2_PRIVATE_BUCKET`  
Accès admin uniquement, jamais URL publique.

## Import initial

```bash
pnpm seed
```

Importe `_source/brand/` + `_source/photos/` en médias non assignés.

## Synchronisation locale → R2 (prod)

Si les médias ont été importés en local (`USE_LOCAL_MEDIA=true`) mais la base Neon est partagée avec la prod :

```bash
pnpm import:media
```

- Envoie `public/media/uploads/`, `_source/photos/` et `_source/brand/` vers le bucket R2
- Crée les entrées CMS manquantes pour `_source/`
- Met à jour les URLs Payload vers `R2_PUBLIC_URL`

Options : `--dry-run`, `--force`, `--skip-cms`, `--no-create-missing`

## CORS R2

Origines autorisées = domaine site + localhost en dev.

Voir `README.md`.
