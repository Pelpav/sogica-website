/**
 * Réalisations de démonstration — supprimables via `pnpm seed:sample-projects:clean`
 * Slugs préfixés par `essai-` pour identification.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { filterPhotoMedia } from '../lib/cms-media'

const SAMPLE_SLUG_PREFIX = 'essai-'

type SampleProject = {
  slug: string
  year: number
  country: string
  city: string
  lat: number
  lng: number
  featured: boolean
  sortOrder: number
  expertiseSlugs: string[]
  fr: { title: string; short: string; location: string }
  en: { title: string; short: string; location: string }
}

const SAMPLE_PROJECTS: SampleProject[] = [
  {
    slug: 'essai-voirie-axe-bamako',
    year: 2023,
    country: 'Mali',
    city: 'Bamako',
    lat: 12.6392,
    lng: -8.0029,
    featured: true,
    sortOrder: 1,
    expertiseSlugs: ['genie-civil'],
    fr: {
      title: '[Essai] Voirie et assainissement — axe Faladiè',
      short: 'Réfection de voirie, drainage pluvial et aménagement de trottoirs sur un axe structurant de Bamako.',
      location: 'Faladiè, Bamako',
    },
    en: {
      title: '[Sample] Urban road and drainage — Faladiè corridor',
      short: 'Road resurfacing, storm drainage and sidewalk upgrades on a key Bamako corridor.',
      location: 'Faladiè, Bamako',
    },
  },
  {
    slug: 'essai-hangar-metallique-senou',
    year: 2022,
    country: 'Mali',
    city: 'Sénou',
    lat: 12.5342,
    lng: -7.9499,
    featured: true,
    sortOrder: 2,
    expertiseSlugs: ['construction-metallique'],
    fr: {
      title: '[Essai] Hangar logistique métallique',
      short: 'Charpente métallique, couverture et bardage pour une plateforme logistique de 1 200 m².',
      location: 'Zone aéroportuaire, Sénou',
    },
    en: {
      title: '[Sample] Steel logistics warehouse',
      short: 'Steel frame, roofing and cladding for a 1,200 m² logistics platform.',
      location: 'Airport zone, Sénou',
    },
  },
  {
    slug: 'essai-pont-bascule-station-pesage',
    year: 2024,
    country: 'Mali',
    city: 'Kati',
    lat: 12.7444,
    lng: -8.0722,
    featured: true,
    sortOrder: 3,
    expertiseSlugs: ['equipements-pesage-controle-routier'],
    fr: {
      title: '[Essai] Pont-bascule et station de pesage',
      short: 'Fourniture et installation d’un pont-bascule 60 t avec cabine de contrôle et logiciel de pesée.',
      location: 'Kati',
    },
    en: {
      title: '[Sample] Weighbridge and weighing station',
      short: 'Supply and installation of a 60 t weighbridge with control booth and weighing software.',
      location: 'Kati',
    },
  },
  {
    slug: 'essai-ouvrage-art-route-kayes',
    year: 2021,
    country: 'Mali',
    city: 'Kayes',
    lat: 14.4469,
    lng: -11.4345,
    featured: true,
    sortOrder: 4,
    expertiseSlugs: ['genie-civil'],
    fr: {
      title: '[Essai] Ouvrage d’art sur route interurbaine',
      short: 'Dalot en béton armé et ouvrages de tête pour le franchissement d’un cours d’eau saisonnier.',
      location: 'Région de Kayes',
    },
    en: {
      title: '[Sample] Road culvert structure',
      short: 'Reinforced concrete culvert and headworks for a seasonal watercourse crossing.',
      location: 'Kayes region',
    },
  },
  {
    slug: 'essai-plateforme-industrielle-bagadadji',
    year: 2020,
    country: 'Mali',
    city: 'Bamako',
    lat: 12.6103,
    lng: -7.9862,
    featured: false,
    sortOrder: 5,
    expertiseSlugs: ['genie-civil'],
    fr: {
      title: '[Essai] Plateforme industrielle et VRD',
      short: 'Terrassement, dallage industriel, réseaux EU/EP et clôture pour un site de production.',
      location: 'Bagadadji, Bamako',
    },
    en: {
      title: '[Sample] Industrial platform and utilities',
      short: 'Earthworks, industrial paving, water networks and perimeter fencing for a production site.',
      location: 'Bagadadji, Bamako',
    },
  },
  {
    slug: 'essai-charpente-auvent-station',
    year: 2023,
    country: 'Mali',
    city: 'Bamako',
    lat: 12.65,
    lng: -8.01,
    featured: false,
    sortOrder: 6,
    expertiseSlugs: ['construction-metallique'],
    fr: {
      title: '[Essai] Auvents métalliques — station-service',
      short: 'Conception, fabrication et pose d’auvents pour quatre pistes de distribution.',
      location: 'Bamako',
    },
    en: {
      title: '[Sample] Steel canopies — fuel station',
      short: 'Design, fabrication and installation of canopies for four dispensing lanes.',
      location: 'Bamako',
    },
  },
  {
    slug: 'essai-pese-essieux-controle-gabarit',
    year: 2024,
    country: 'Mali',
    city: 'Ségou',
    lat: 13.4317,
    lng: -6.2633,
    featured: false,
    sortOrder: 7,
    expertiseSlugs: ['equipements-pesage-controle-routier'],
    fr: {
      title: '[Essai] Pèse-essieux et contrôle de gabarit',
      short: 'Ligne de pesage dynamique, capteurs et signalisation pour le contrôle des charges lourdes.',
      location: 'Ségou',
    },
    en: {
      title: '[Sample] Axle weighing and gauge control',
      short: 'Dynamic weighing line, sensors and signage for heavy vehicle load control.',
      location: 'Ségou',
    },
  },
  {
    slug: 'essai-rehabilitation-batiment-sikasso',
    year: 2019,
    country: 'Mali',
    city: 'Sikasso',
    lat: 11.3175,
    lng: -5.6667,
    featured: false,
    sortOrder: 8,
    expertiseSlugs: ['genie-civil'],
    fr: {
      title: '[Essai] Réhabilitation de bâtiment administratif',
      short: 'Renforcement structurel, reprise de fissures et mise aux normes d’un bâtiment R+2.',
      location: 'Sikasso',
    },
    en: {
      title: '[Sample] Administrative building rehabilitation',
      short: 'Structural strengthening, crack repair and compliance upgrades for a two-storey building.',
      location: 'Sikasso',
    },
  },
  {
    slug: 'essai-passerelle-pietonne-metal',
    year: 2022,
    country: 'Mali',
    city: 'Bamako',
    lat: 12.628,
    lng: -7.995,
    featured: false,
    sortOrder: 9,
    expertiseSlugs: ['construction-metallique', 'genie-civil'],
    fr: {
      title: '[Essai] Passerelle piétonne métallique',
      short: 'Passerelle mixte acier/béton avec garde-corps et accès PMR sur carrefour à fort trafic.',
      location: 'Hippodrome, Bamako',
    },
    en: {
      title: '[Sample] Pedestrian steel footbridge',
      short: 'Steel/concrete footbridge with guardrails and accessible ramps at a busy intersection.',
      location: 'Hippodrome, Bamako',
    },
  },
  {
    slug: 'essai-barrieres-acces-perimetre',
    year: 2023,
    country: 'Mali',
    city: 'Bamako',
    lat: 12.602,
    lng: -8.025,
    featured: false,
    sortOrder: 10,
    expertiseSlugs: ['equipements-pesage-controle-routier'],
    fr: {
      title: '[Essai] Barrières automatiques et contrôle d’accès',
      short: 'Installation de barrières, lecteurs et supervision pour un site sécurisé.',
      location: 'Bamako',
    },
    en: {
      title: '[Sample] Automatic barriers and access control',
      short: 'Barrier gates, readers and supervision system for a secured facility.',
      location: 'Bamako',
    },
  },
]

async function getExpertiseIdMap(payload: Awaited<ReturnType<typeof getPayload>>) {
  const { docs } = await payload.find({ collection: 'expertises', limit: 20 })
  const map = new Map<string, number | string>()
  for (const doc of docs) {
    if (doc.slug) map.set(doc.slug, doc.id)
  }
  return map
}

async function getCoverMediaIds(payload: Awaited<ReturnType<typeof getPayload>>, count: number) {
  const { docs } = await payload.find({
    collection: 'media',
    where: { mediaType: { equals: 'image' } },
    limit: 80,
    sort: 'filename',
  })
  const photos = filterPhotoMedia(docs)
  if (!photos.length) return []
  return Array.from({ length: count }, (_, index) => photos[index % photos.length]!.id)
}

function buildGalleryEntries(mediaIds: (number | string)[]) {
  return mediaIds
    .filter((id): id is number => typeof id === 'number')
    .map((media) => ({ media }))
}

async function getGalleryMediaIds(
  payload: Awaited<ReturnType<typeof getPayload>>,
  projectIndex: number,
  count = 3,
) {
  const { docs } = await payload.find({
    collection: 'media',
    where: { mediaType: { equals: 'image' } },
    limit: 80,
    sort: 'filename',
  })
  const photos = filterPhotoMedia(docs)
  if (!photos.length) return []

  const start = (projectIndex * count) % photos.length
  return Array.from({ length: count }, (_, offset) => photos[(start + offset) % photos.length]!.id)
}

async function seedSampleProjects() {
  const payload = await getPayload({ config })
  const expertiseIds = await getExpertiseIdMap(payload)
  const coverIds = await getCoverMediaIds(payload, SAMPLE_PROJECTS.length)

  let created = 0
  let skipped = 0
  let galleriesUpdated = 0

  for (const [index, sample] of SAMPLE_PROJECTS.entries()) {
    const existing = await payload.find({
      collection: 'projects',
      locale: 'fr',
      where: { slug: { equals: sample.slug } },
      limit: 1,
      depth: 0,
    })
    const galleryIds = await getGalleryMediaIds(payload, index, 3)
    const gallery = buildGalleryEntries(galleryIds)

    if (existing.docs[0]) {
      if (!existing.docs[0].gallery?.length && gallery.length) {
        await payload.update({
          collection: 'projects',
          id: existing.docs[0].id,
          locale: 'fr',
          data: { gallery },
        })
        galleriesUpdated++
        console.log(`  ~ ${sample.slug} (galerie ajoutée)`)
      }
      skipped++
      continue
    }

    const expertiseLinks = sample.expertiseSlugs
      .map((slug) => expertiseIds.get(slug))
      .filter((id): id is number => typeof id === 'number')

    const coverImage = coverIds[index]

    const doc = await payload.create({
      collection: 'projects',
      locale: 'fr',
      data: {
        title: sample.fr.title,
        slug: sample.slug,
        shortDescription: sample.fr.short,
        locationText: sample.fr.location,
        country: sample.country,
        city: sample.city,
        year: sample.year,
        projectStatus: 'completed',
        featured: sample.featured,
        sortOrder: sample.sortOrder,
        expertises: expertiseLinks,
        coordinates: { lat: sample.lat, lng: sample.lng },
        ...(coverImage ? { coverImage } : {}),
        ...(gallery.length ? { gallery } : {}),
        _status: 'published',
      },
    })

    await payload.update({
      collection: 'projects',
      id: doc.id,
      locale: 'en',
      data: {
        title: sample.en.title,
        slug: sample.slug,
        shortDescription: sample.en.short,
        locationText: sample.en.location,
      },
    })

    created++
    console.log(`  + ${sample.slug}`)
  }

  console.log(
    `\n${created} réalisation(s) d'essai créée(s), ${skipped} déjà présente(s), ${galleriesUpdated} galerie(s) complétée(s).`,
  )
  console.log('Suppression : pnpm seed:sample-projects:clean')
}

async function cleanSampleProjects() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    locale: 'fr',
    limit: 100,
    pagination: false,
  })

  const samples = docs.filter((doc) => doc.slug?.startsWith(SAMPLE_SLUG_PREFIX))
  for (const doc of samples) {
    await payload.delete({ collection: 'projects', id: doc.id })
    console.log(`  - ${doc.slug}`)
  }

  console.log(`\n${samples.length} réalisation(s) d'essai supprimée(s).`)
}

const clean = process.argv.includes('--clean')

;(clean ? cleanSampleProjects() : seedSampleProjects())
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
