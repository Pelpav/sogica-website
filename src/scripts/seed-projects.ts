/**
 * Projets réels (EXP SOGICA.docx) — supprime les essais `essai-*` puis seed.
 *
 *   pnpm seed:projects              seed / mise à jour
 *   pnpm seed:projects:clean-sample supprime uniquement les essais
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { filterPhotoMedia } from '../lib/cms-media'
import { isRejectedPhotoFilename } from '../lib/media-curation'
import { resolveProjectPhotoIds } from '../lib/project-photo-map'
import type { Media } from '@/payload-types'
import {
  CLIENT_NAMES,
  SOURCE_PROJECTS,
  formatFcfa,
  type SourceProject,
} from '../lib/projects-source'

const SAMPLE_SLUG_PREFIX = 'essai-'
const BRAND_IMAGE_PATTERN = /hero-reference|sogica-logo|preloader|favicon/i

function toMediaId(id: number | string | undefined): number | undefined {
  if (typeof id === 'number') return id
  if (typeof id === 'string' && /^\d+$/.test(id)) return Number(id)
  return undefined
}

function filterProjectPhotoMedia(docs: Media[]): Media[] {
  const photos = filterPhotoMedia(docs).filter(
    (doc) =>
      !BRAND_IMAGE_PATTERN.test(doc.filename || '') &&
      !isRejectedPhotoFilename(doc.filename),
  )
  return photos.length ? photos : filterPhotoMedia(docs).filter((doc) => !isRejectedPhotoFilename(doc.filename))
}

async function getPhotoFilenameToIdMap(payload: Awaited<ReturnType<typeof getPayload>>) {
  const { docs } = await payload.find({
    collection: 'media',
    where: { mediaType: { equals: 'image' } },
    limit: 200,
    sort: 'filename',
  })

  const map = new Map<string, number>()
  for (const doc of filterProjectPhotoMedia(docs as Media[])) {
    const id = toMediaId(doc.id)
    if (id && doc.filename) map.set(doc.filename, id)
  }
  return map
}

function pickProjectImages(
  slug: string,
  filenameToId: Map<string, number>,
): { cover?: number | null; gallery: { media: number }[] } {
  const mapped = resolveProjectPhotoIds(slug, filenameToId)
  if (mapped.cover || mapped.gallery.length) return mapped
  return { cover: null, gallery: [] }
}

async function getExpertiseIdMap(payload: Awaited<ReturnType<typeof getPayload>>) {
  const { docs } = await payload.find({ collection: 'expertises', limit: 20 })
  const map = new Map<string, number | string>()
  for (const doc of docs) {
    if (doc.slug) map.set(doc.slug, doc.id)
  }
  return map
}

async function getClientIdMap(payload: Awaited<ReturnType<typeof getPayload>>) {
  const { docs } = await payload.find({ collection: 'clients-partners', limit: 30 })
  const map = new Map<string, number | string>()
  for (const doc of docs) {
    if (doc.name) map.set(doc.name, doc.id)
  }
  return map
}

function buildProjectPayload(
  project: SourceProject,
  expertiseIds: Map<string, number | string>,
  clientIds: Map<string, number | string>,
  images: { cover?: number | null; gallery: { media: number }[] },
) {
  const expertiseLinks = project.expertiseSlugs
    .map((slug) => expertiseIds.get(slug))
    .filter((id): id is number => typeof id === 'number')

  const clientId = toMediaId(clientIds.get(CLIENT_NAMES[project.clientKey]))

  return {
    title: project.fr.title,
    slug: project.slug,
    shortDescription: project.fr.short,
    locationText: project.fr.location,
    country: project.country,
    city: project.city,
    year: project.year,
    projectStatus: project.projectStatus,
    featured: project.featured,
    sortOrder: project.sortOrder,
    expertises: expertiseLinks,
    ...(clientId ? { client: clientId } : {}),
    coordinates: { lat: project.lat, lng: project.lng },
    dateRange: {
      start: project.dateStart,
      ...(project.dateEnd ? { end: project.dateEnd } : {}),
    },
    serviceTags: [{ tag: project.workType }],
    keyFacts: buildKeyFacts(project),
    coverImage: images.cover ?? null,
    gallery: images.gallery,
    _status: 'published' as const,
  }
}

function buildKeyFacts(project: SourceProject) {
  const clientName = CLIENT_NAMES[project.clientKey]
  return [
    { label: 'Montant du marché', value: formatFcfa(project.contractAmountFcfa) },
    { label: 'Maître d’ouvrage', value: clientName },
    { label: 'Rôle', value: project.role },
  ]
}

async function cleanSampleProjects(payload: Awaited<ReturnType<typeof getPayload>>) {
  const { docs } = await payload.find({
    collection: 'projects',
    locale: 'fr',
    limit: 100,
    pagination: false,
  })

  const samples = docs.filter((doc) => doc.slug?.startsWith(SAMPLE_SLUG_PREFIX))
  for (const doc of samples) {
    await payload.delete({ collection: 'projects', id: doc.id })
    console.log(`  - essai supprimé : ${doc.slug}`)
  }

  return samples.length
}

async function seedRealProjects() {
  const payload = await getPayload({ config })
  const expertiseIds = await getExpertiseIdMap(payload)
  const clientIds = await getClientIdMap(payload)
  const filenameToId = await getPhotoFilenameToIdMap(payload)

  if (!filenameToId.size) {
    console.warn('Aucune photo dans le CMS — projets créés sans couverture.')
  } else {
    console.log(`${filenameToId.size} photo(s) approuvée(s) disponible(s) pour assignation thématique.`)
  }

  let created = 0
  let updated = 0

  for (const project of SOURCE_PROJECTS) {
    const images = pickProjectImages(project.slug, filenameToId)
    const data = buildProjectPayload(project, expertiseIds, clientIds, images)

    const existing = await payload.find({
      collection: 'projects',
      locale: 'fr',
      where: { slug: { equals: project.slug } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'projects',
        id: existing.docs[0].id,
        locale: 'fr',
        data,
      })
      await payload.update({
        collection: 'projects',
        id: existing.docs[0].id,
        locale: 'en',
        data: {
          title: project.en.title,
          slug: project.slug,
          shortDescription: project.en.short,
          locationText: project.en.location,
          serviceTags: [{ tag: project.workType }],
          keyFacts: buildKeyFacts(project).map((fact) => ({
            label:
              fact.label === 'Montant du marché'
                ? 'Contract value'
                : fact.label === 'Maître d’ouvrage'
                  ? 'Contracting authority'
                  : 'Role',
            value: fact.value,
          })),
        },
      })
      updated++
      console.log(`  ~ ${project.slug}`)
      continue
    }

    const doc = await payload.create({
      collection: 'projects',
      locale: 'fr',
      data,
    })

    await payload.update({
      collection: 'projects',
      id: doc.id,
      locale: 'en',
      data: {
        title: project.en.title,
        slug: project.slug,
        shortDescription: project.en.short,
        locationText: project.en.location,
        serviceTags: [{ tag: project.workType }],
        keyFacts: buildKeyFacts(project).map((fact) => ({
          label:
            fact.label === 'Montant du marché'
              ? 'Contract value'
              : fact.label === 'Maître d’ouvrage'
                ? 'Contracting authority'
                : 'Role',
          value: fact.value,
        })),
      },
    })

    created++
    console.log(`  + ${project.slug}`)
  }

  console.log(`\n${created} créé(s), ${updated} mis à jour — ${SOURCE_PROJECTS.length} projets EXP SOGICA.`)
}

async function main() {
  const payload = await getPayload({ config })
  const cleanSampleOnly = process.argv.includes('--clean-sample')
  const skipClean = process.argv.includes('--skip-clean-sample')

  if (cleanSampleOnly) {
    const removed = await cleanSampleProjects(payload)
    console.log(`\n${removed} réalisation(s) d'essai supprimée(s).`)
    return
  }

  if (!skipClean) {
    const removed = await cleanSampleProjects(payload)
    if (removed) console.log(`\n${removed} réalisation(s) d'essai supprimée(s).\n`)
  }

  await seedRealProjects()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
