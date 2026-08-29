# SOGICA SA — Présentation technique & commerciale

## Présentation

**SOGICA SA** est une entreprise malienne de BTP spécialisée en génie civil, construction métallique et équipements de contrôle routier. Ce dépôt contient le **site corporate officiel** : vitrine institutionnelle, portfolio de réalisations, demande de devis et back-office éditorial.

| Élément | Détail |
|---------|--------|
| URL cible | https://www.sogica.ml |
| Langues | Français (défaut) + Anglais |
| Public | Donneurs d'ordre, partenaires, candidats, presse |
| Objectif business | Crédibilité, génération de leads (contact/devis), valorisation du savoir-faire |

## Proposition de valeur digitale

Le site traduit l'identité SOGICA en expérience web :

1. **Crédibilité institutionnelle** — design industriel premium, contenu attesté, pas de données inventées
2. **Portfolio structuré** — réalisations avec filtres, carte géographique, mode éditorial narratif
3. **Conversion** — formulaires contact/devis, CTA contextuels, parcours bilingue
4. **Autonomie éditoriale** — équipe marketing modifie pages, expertises et médias sans développeur
5. **Performance** — Partial Prerendering, cache CMS, images optimisées, LCP maîtrisé

## Fonctionnalités livrées

### Site public

| Fonctionnalité | Description |
|----------------|-------------|
| Homepage CMS | Page builder : hero, clients, stats, intro, expertises, réalisations, carte, timeline, contact |
| Expertises | 3 pôles + pages détail avec galerie et contenu riche |
| Réalisations | Grille filtrable, fiche projet (standard ou éditorial), carte, avant/après |
| Clients & partenaires | Logos et références |
| Contact & devis | Formulaires avec validation, envoi email, stockage CMS |
| Pages légales | Mentions légales, confidentialité (FR/EN) |
| SEO | Metadata, canonical, hreflang, sitemap, robots, JSON-LD Organisation |
| OG images | Génération dynamique `/api/og` |
| Animations | Reveals au scroll (Framer Motion), transitions de page, reduced-motion |
| Accessibilité | Skip link, focus visible, sémantique, contraste AA visé |

### Back-office Payload CMS

| Fonctionnalité | Description |
|----------------|-------------|
| Page builder | 20+ blocs réordonnables, masquables, duplicables |
| Rôles | super-admin, admin, editor, portfolio-manager |
| Médias | Upload bulk, R2 en prod, alt localisé, statut d'assignation |
| Preview live | Brouillon avec `?livePreview=1` |
| Thème | Couleurs, typo, espacement, intensité motion |
| Formulaires | Workflow statut sur soumissions contact/devis |
| Onboarding | Tour guidé admin, panneau d'accueil |

## Stack technique

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel (hébergement)                  │
├─────────────────────────────────────────────────────────┤
│  Next.js 16 App Router  │  Payload CMS 3  │  React 19  │
├─────────────────────────────────────────────────────────┤
│  Neon PostgreSQL (métadonnées)  │  Cloudflare R2 (médias) │
├─────────────────────────────────────────────────────────┤
│  Framer Motion │ MapLibre GL │ Tailwind 4 │ Sharp       │
└─────────────────────────────────────────────────────────┘
```

| Couche | Choix | Justification |
|--------|-------|---------------|
| Framework | Next.js 16 + PPR | Performance, SEO, streaming, cache composants |
| CMS | Payload 3 intégré | Type-safe, self-hosted, page builder flexible |
| Base | Neon Postgres | Serverless, branches, pooler |
| Médias | Cloudflare R2 | Coût, CDN, pas de binaire en DB |
| Animations | Framer Motion | Reveals déclaratifs, reduced-motion natif |
| Carte | MapLibre GL | Open source, tuiles configurables |
| Tests | Vitest + Playwright | Unitaires + smoke E2E |

## Architecture des routes

```
/fr                          → Homepage (CMS slug: home)
/fr/expertises               → Liste expertises
/fr/expertises/[slug]        → Détail expertise
/fr/realisations             → Portfolio
/fr/realisations/[slug]      → Fiche projet
/fr/contact                  → Contact
/fr/demande-de-devis         → Devis
/fr/a-propos                 → À propos
/fr/clients-partenaires      → Références
/admin                       → Back-office Payload
/api/*                       → REST Payload + formulaires + OG + presign
```

Équivalents EN : `/en/about`, `/en/expertise`, `/en/projects`, etc.

## Performance & cache

- **Partial Prerendering** — shell statique + contenu CMS streamé
- **`use cache`** — globals, médias, requêtes CMS avec `cacheTag` / `cacheLife`
- **Suspense par bloc** — homepage charge bloc par bloc (skeletons)
- **Images** — `next/image`, hero `priority` + `loading="eager"`, patterns locaux `/api/media/file/**`
- **Revalidation** — hooks Payload `revalidateTag` sur publish/save

## Intégrité du contenu

Règles non négociables :

- Aucun projet inventé au seed
- Médias WhatsApp importés en statut **non assigné**
- Pas de lorem ipsum publié
- Stats et clients issus du contenu réel ou du CMS
- Coordonnées et mentions légales pilotées par globals CMS

## Déploiement

| Étape | Commande / action |
|-------|-------------------|
| Install | `pnpm install` |
| Migrations | `DATABASE_URL_UNPOOLED=… pnpm migrate` |
| Seed (base vide) | `pnpm seed` |
| Build | `pnpm build` |
| Quality gate | `pnpm quality-gate` |
| Deploy | Vercel (auto depuis `main`) |

Variables requises : voir `.env.example` et `docs/deployment.md`.

## Documentation associée

| Document | Contenu |
|----------|---------|
| `docs/architecture.md` | Structure code, rôles, décisions techniques |
| `docs/cms-guide.md` | Guide éditorial back-office |
| `docs/content-model.md` | Collections, globals, localisation |
| `docs/media-pipeline.md` | Import, R2, nommage fichiers |
| `docs/motion.md` | Système d'animation |
| `docs/deployment.md` | Vercel, Neon, post-deploy |

## Maintenance

| Tâche | Fréquence |
|-------|-----------|
| Mises à jour dépendances | Trimestriel (Next, Payload, sécurité) |
| Review contenu CMS | Continu (équipe marketing) |
| Backup Neon | Automatique (snapshots) |
| Versioning R2 | Recommandé |
| Quality gate avant release | À chaque livraison significative |

## Contact technique

Site développé pour SOGICA SA. Crédits et auteur : voir `src/lib/site-credits.ts` et footer du site.
