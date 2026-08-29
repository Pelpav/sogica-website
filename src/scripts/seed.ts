import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'
import { assignExpertiseCovers, filterPhotoMedia, pickHeroMediaId } from '../lib/cms-media'
import {
  getLegalNoticeSections,
  getPrivacySections,
  sectionsToLexical,
} from '../lib/legal-content'
import { buildHomeLayout, buildHomeLayoutEn } from './sync-home-layout'
import {
  BRAND_LOGO_FILENAME,
  BRAND_LOGO_WHITE_FILENAME,
} from '../lib/media-filenames'

const SOURCE_PHOTOS = path.resolve('_source/photos')
const SOURCE_BRAND = path.resolve('_source/brand')

async function seed() {
  const payload = await getPayload({ config })

  // Super admin
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (!users.docs.length) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@sogica.ml',
        password: 'ChangeMe-Sogica-2026!',
        role: 'super-admin',
        firstName: 'Admin',
        lastName: 'SOGICA',
      },
    })
    console.log('Created super-admin: admin@sogica.ml')
  }

  // Theme
  await payload.updateGlobal({
    slug: 'theme-settings',
    data: {
      colorPrimary: '#F00080',
      colorSecondary: '#111111',
      colorAccent: '#D4AF37',
      colorBackground: '#FAFAFA',
      colorForeground: '#111111',
      motionIntensity: 'subtle',
      radiusScale: 'sharp',
    },
  })

  // Site settings FR + EN
  const siteData = {
    companyName: 'SOGICA SA',
    companyFullName: 'Société Générale d\'Ingénieurs de Construction et d\'Aménagement',
    tagline:
      'Entreprise de BTP spécialisée en génie civil, construction métallique et équipements de pesage et contrôle routier.',
    foundedYear: 2016,
    address: 'Faladiè SEMA, près de Mali Univers',
    phones: [
      { label: 'Standard', number: '(+223) 63 63 10 53' },
      { label: 'Standard', number: '(+223) 66 71 91 59' },
      { label: 'Gérant', number: '(+223) 62 56 85 12' },
    ],
    emails: [{ address: 'sogicbtp@gmail.com' }],
    defaultSeo: {
      title: 'SOGICA SA · Ingénierie & BTP',
      description:
        'SOGICA SA : génie civil, construction métallique, équipements de pesage et contrôle routier au Mali.',
    },
  }

  await payload.updateGlobal({ slug: 'site-settings', locale: 'fr', data: siteData })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      ...siteData,
      tagline:
        'Construction company specializing in civil engineering, metal construction, and road weighing and control systems.',
      defaultSeo: {
        title: 'SOGICA SA · Engineering & Construction',
        description:
          'SOGICA SA: civil engineering, metal construction, road weighing and control systems in Mali.',
      },
    },
  })

  // Legal (sans identifiants non publiables)
  await payload.updateGlobal({
    slug: 'legal-settings',
    locale: 'fr',
    data: {
      legalNoticeContent: sectionsToLexical(getLegalNoticeSections('fr')) as never,
      privacyContent: sectionsToLexical(getPrivacySections('fr')) as never,
    },
  })
  await payload.updateGlobal({
    slug: 'legal-settings',
    locale: 'en',
    data: {
      legalNoticeContent: sectionsToLexical(getLegalNoticeSections('en')) as never,
      privacyContent: sectionsToLexical(getPrivacySections('en')) as never,
    },
  })

  // Header / Footer
  await payload.updateGlobal({
    slug: 'header',
    locale: 'fr',
    data: {
      sticky: true,
      cta: { label: 'Demande de devis', url: '/fr/demande-de-devis' },
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    locale: 'en',
    data: {
      sticky: true,
      cta: { label: 'Request a quote', url: '/en/request-quote' },
    },
  })

  // Expertises
  const expertises = [
    {
      slug: 'genie-civil',
      name: { fr: 'Génie civil', en: 'Civil engineering' },
      short: {
        fr: 'Ouvrages en béton armé, ouvrages d\'art, infrastructures routières, bâtiments, VRD, plateformes et aménagements connexes.',
        en: 'Reinforced concrete works, art structures, road infrastructure, buildings, utilities (VRD), platforms and related developments.',
      },
      isPrimary: true,
      sortOrder: 1,
      sourceNote: 'expertise-note',
    },
    {
      slug: 'construction-metallique',
      name: { fr: 'Construction métallique', en: 'Metal construction' },
      short: {
        fr: 'Fabrication, assemblage et montage de structures métalliques, charpentes, auvents, couvertures, passerelles et ouvrages mixtes.',
        en: 'Fabrication, assembly and erection of metal structures, frames, canopies, roofing, walkways and mixed civil/metal works.',
      },
      isPrimary: true,
      sortOrder: 2,
      sourceNote: 'expertise-note',
    },
    {
      slug: 'equipements-pesage-controle-routier',
      name: {
        fr: 'Équipements et systèmes de pesage et de contrôle routier',
        en: 'Weighing and road control systems',
      },
      short: {
        fr: 'Ponts-bascule, pèse-essieux, contrôle de gabarit et surhauteur, barrières automatiques, signalisation, accès, capteurs et logiciels.',
        en: 'Weighbridges, axle weighers, gauge/height control, automatic barriers, signage, access control, sensors and management software.',
      },
      isPrimary: true,
      sortOrder: 3,
      sourceNote: 'expertise-note',
    },
  ]

  const expertiseIds: Record<string, number | string> = {}
  for (const exp of expertises) {
    const existing = await payload.find({
      collection: 'expertises',
      where: { slug: { equals: exp.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      expertiseIds[exp.slug] = existing.docs[0].id
      continue
    }
    const created = await payload.create({
      collection: 'expertises',
      locale: 'fr',
      data: {
        name: exp.name.fr,
        slug: exp.slug,
        shortDescription: exp.short.fr,
        isPrimary: exp.isPrimary,
        sortOrder: exp.sortOrder,
        sourceNote: exp.sourceNote,
        _status: 'published',
      },
    })
    await payload.update({
      collection: 'expertises',
      id: created.id,
      locale: 'en',
      data: {
        name: exp.name.en,
        shortDescription: exp.short.en,
      },
    })
    expertiseIds[exp.slug] = created.id
  }

  // References partenaires (logos dans public/partners)
  const refs = [
    'PNUD-MLI',
    'Fonds d\'Entretien Routier (FER MALI)',
    'Expertise France – Groupe AFD',
    'SONATER-PUDTR – Burkina Faso',
    'Union Européenne – Mali',
  ]
  for (const [i, name] of refs.entries()) {
    const ex = await payload.find({
      collection: 'clients-partners',
      where: { name: { equals: name } },
      limit: 1,
    })
    if (ex.docs.length) continue
    await payload.create({
      collection: 'clients-partners',
      data: {
        name,
        type: 'reference',
        featured: true,
        sortOrder: i,
        sourceNote: 'corporate-presentation',
        _status: 'published',
      },
    })
  }

  // Import brand logos
  let heroMediaId: number | string | null = null

  for (const file of [BRAND_LOGO_WHITE_FILENAME, BRAND_LOGO_FILENAME]) {
    const filePath = path.join(SOURCE_BRAND, file)
    if (!fs.existsSync(filePath)) continue
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: file } },
      limit: 1,
    })
    if (existing.docs[0]) {
      continue
    }
    const created = await payload.create({
      collection: 'media',
      data: { alt: 'SOGICA SA' },
      filePath,
    })
    void created
  }

  // Import photos as unassigned media
  if (fs.existsSync(SOURCE_PHOTOS)) {
    const photos = fs.readdirSync(SOURCE_PHOTOS).filter((f) => /\.(jpe?g|mp4)$/i.test(f))
    let imported = 0
    for (const file of photos) {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: file } },
        limit: 1,
      })
      if (existing.docs.length) continue
      const isVideo = file.endsWith('.mp4')
      await payload.create({
        collection: 'media',
        data: {
          alt: '',
          assignmentStatus: 'unassigned',
          virtualFolder: 'non-classe',
          mediaType: isVideo ? 'video' : 'image',
          published: true,
        },
        filePath: path.join(SOURCE_PHOTOS, file),
      })
      imported++
    }
    console.log(`Imported ${imported} media files (unassigned)`)
  }

  heroMediaId = await pickHeroMediaId(payload)
  const coversAssigned = await assignExpertiseCovers(payload)
  if (coversAssigned) console.log(`Assigned ${coversAssigned} expertise cover images`)

  const galleryMedia = await payload.find({
    collection: 'media',
    where: { mediaType: { equals: 'image' } },
    limit: 50,
    sort: 'createdAt',
  })
  const galleryIds = filterPhotoMedia(galleryMedia.docs as import('@/payload-types').Media[]).map((m) => m.id)

  const homeLayout = buildHomeLayout(heroMediaId, galleryIds)

  const pages = [
    { slug: 'home', title: 'Accueil', pageType: 'home', layout: homeLayout },
    { slug: 'a-propos', title: 'À propos', pageType: 'about', layout: [] },
    { slug: 'clients-partenaires', title: 'Clients & partenaires', pageType: 'standard', layout: [{ blockType: 'clients', title: 'Ils nous font confiance', featuredOnly: false }] },
    { slug: 'contact', title: 'Contact', pageType: 'contact', layout: [] },
    { slug: 'demande-de-devis', title: 'Demande de devis', pageType: 'quote', layout: [] },
    { slug: 'mentions-legales', title: 'Mentions légales', pageType: 'legal', layout: [
      { blockType: 'richText', content: { root: { children: [{ type: 'paragraph', children: [{ text: 'Contenu éditable via Paramètres légaux dans le CMS.' }] }] } } },
    ]},
    { slug: 'confidentialite', title: 'Confidentialité', pageType: 'legal', layout: [] },
  ]

  const enPages = [
    { slug: 'about', title: 'About', pageType: 'about' as const },
    { slug: 'clients-partners', title: 'Clients & partners', pageType: 'standard' as const },
    { slug: 'legal-notice', title: 'Legal notice', pageType: 'legal' as const },
    { slug: 'privacy', title: 'Privacy', pageType: 'legal' as const },
  ]

  for (const page of pages) {
    const ex = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      locale: 'fr',
      limit: 1,
    })
    if (ex.docs.length) continue
    await payload.create({
      collection: 'pages',
      locale: 'fr',
      data: {
        title: page.title,
        slug: page.slug,
        pageType: page.pageType as 'home' | 'about' | 'contact' | 'quote' | 'legal' | 'standard',
        layout: page.layout as never,
        showInNav: page.slug !== 'home',
        _status: 'published',
      },
    })
  }

  for (const page of enPages) {
    const ex = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      locale: 'en',
      limit: 1,
    })
    if (ex.docs.length) continue
    const created = await payload.create({
      collection: 'pages',
      locale: 'en',
      data: {
        title: page.title,
        slug: page.slug,
        pageType: page.pageType,
        layout: [],
        showInNav: false,
        _status: 'published',
      },
    })
    void created
  }

  const frHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: 'fr',
    limit: 1,
  })

  if (frHome.docs[0]) {
    const homeLayoutEn = buildHomeLayoutEn(heroMediaId, galleryIds)
    const updatedFr = await payload.update({
      collection: 'pages',
      id: frHome.docs[0].id,
      locale: 'fr',
      data: {
        title: 'Accueil',
        slug: 'home',
        pageType: 'home',
        layout: homeLayout as never,
        showInNav: false,
        _status: 'published',
      },
    })
    const blockIds = Array.isArray(updatedFr.layout)
      ? updatedFr.layout.map((block) => String((block as { id?: string }).id ?? '')).filter(Boolean)
      : []
    const enLayoutWithIds = (homeLayoutEn as Array<Record<string, unknown>>).map((block, index) => {
      const id = blockIds[index]
      return id ? { ...block, id } : block
    })
    await payload.update({
      collection: 'pages',
      id: frHome.docs[0].id,
      locale: 'en',
      data: {
        title: 'Home',
        slug: 'home',
        pageType: 'home',
        layout: enLayoutWithIds as never,
        showInNav: false,
        _status: 'published',
      },
    })
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
