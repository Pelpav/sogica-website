# Inventaire médias SOGICA — Phase 0

> **Règle d'intégrité :** `projet: inconnu` partout sauf preuve documentaire explicite dans `_source/documents/`. Les indices visuels (tampons, overlays) sont des notes provisoires, pas des faits métier.

**Date d'inventaire :** 2026-08-28  
**Total fichiers :** 63  
**Photos JPEG :** 58  
**Vidéos MP4 :** 1  
**Logos :** 2  
**Documents :** 2  

## Couleurs extraites du logo (`_source/brand/logo_transparent.png`)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary (magenta) | `#F00080` | Marque principale |
| Primary alt | `#F00090` | Variante logo |
| Accent (or) | `#F0D070` | Accent hiérarchie |
| Foreground | `#111111` | Texte / structure |
| Background | `#FAFAFA` | Fond clair |

## Documents source (vérité métier)

| Fichier | Taille | Contenu attesté |
|---------|--------|-----------------|
| `_source/documents/b- DOMAINE D'EXPERTISE.pdf` | 941 KB | 3 domaines d'expertise principaux |
| `_source/documents/Prsentation SOGICA  03.pptx` | 1.26 MB | Présentation corporate, équipements, références, contacts, infos légales |

## Brand

| Fichier | Taille | Dimensions | Projet |
|---------|--------|------------|--------|
| `_source/brand/logo.png` | 759 KB | — | inconnu |
| `_source/brand/logo_transparent.png` | 425 KB | — | inconnu |

## Photos — dossier `_source/photos/` (non classé)

Organisation technique agent (non publique) : `non-classe/` — **58 fichiers WhatsApp du 2026-08-26**.

Tous les champs métier ci-dessous restent **inconnus** :

| # | Fichier | Taille | Dimensions | Projet | Client | Date contractuelle | Notes |
|---|---------|--------|------------|--------|--------|-------------------|-------|
| 1 | WhatsApp Image 2026-08-26 at 19.02.42.jpeg | 174 KB | 720×1280 | inconnu | inconnu | inconnue | — |
| 2 | WhatsApp Image 2026-08-26 at 19.05.19.jpeg | 129 KB | 589×1280 | inconnu | inconnu | inconnue | — |
| 3 | WhatsApp Image 2026-08-26 at 19.08.39.jpeg | 138 KB | 810×1080 | inconnu | inconnu | inconnue | — |
| 4 | WhatsApp Image 2026-08-26 at 19.08.40.jpeg | 108 KB | 810×1080 | inconnu | inconnu | inconnue | — |
| 5 | WhatsApp Image 2026-08-26 at 19.10.35.jpeg | 94 KB | 446×1053 | inconnu | inconnu | inconnue | — |
| 6–58 | *(53 autres JPEG WhatsApp 2026-08-26)* | 49–269 KB | portrait majoritaire | inconnu | inconnu | inconnue | Voir JSON `docs/media-inventory.json` |

> Inventaire machine-readable complet : `docs/media-inventory.json`

## Vidéo

| Fichier | Taille | Dimensions | Durée | Projet |
|---------|--------|------------|-------|--------|
| WhatsApp Video 2026-08-26 at 19.14.18.mp4 | 15.6 MB | 640×360 | 87.5 s | inconnu |

## Doublons

Aucun doublon MD5 détecté parmi les 58 photos.

## Données manquantes (non inventées)

- Aucune fiche projet documentée dans les sources fournies
- Aucun client de chantier identifié par document
- Aucune date contractuelle par photo
- Aucun budget / KPI / témoignage
- Aucun logo partenaire fourni (références textuelles uniquement dans PPTX)
- Coordonnées GPS projets : absentes
- Pages légales rédigées : à compléter via CMS (structure prête, contenu minimal seed)

## Usage prévu

| Contexte | Usage autorisé |
|----------|----------------|
| Site public | Hero, expertises, galeries ambiance, blocs média — **sans légende projet/client inventée** |
| CMS | Import en médias **non assignés** / brouillon |
| Réalisations | Collection **vide** jusqu'à saisie éditoriale attestée |
