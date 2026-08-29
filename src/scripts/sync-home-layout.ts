import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

import { assignExpertiseCovers, pickGalleryMediaIds, pickHeroMediaId } from '../lib/cms-media'

export function buildHomeLayout(heroMediaId: unknown, galleryIds: unknown[]) {
  const img = (i: number) => galleryIds[i] ?? heroMediaId ?? null

  return [
    {
      blockType: 'hero',
      layout: 'construktion',
      title: 'Des infrastructures qui inspirent confiance',
      subtitle:
        'Génie civil, construction métallique et équipements de contrôle routier, de l\'étude à la mise en service au Mali et en Afrique de l\'Ouest.',
      eyebrow: 'SOGICA · BTP · Mali',
      media: heroMediaId,
      mediaType: 'image',
      cta: { label: 'Demande de devis', url: '/fr/demande-de-devis' },
      secondaryCta: { label: 'En savoir plus', url: '/fr/a-propos' },
    },
    { blockType: 'clients', title: 'Ils nous font confiance', featuredOnly: true },
    {
      blockType: 'stats',
      variant: 'featured',
      items: [
        { value: '2016', label: 'Année de création' },
        { value: '3', label: "Pôles d'expertise" },
        { value: 'BTP', label: 'Infrastructures & ouvrages' },
      ],
    },
    {
      blockType: 'intro',
      variant: 'simple',
      eyebrow: 'À propos',
      title: 'Modernité et rigueur au service de vos ouvrages',
      description:
        "SOGICA réunit génie civil, construction métallique et équipements spécialisés pour livrer des infrastructures fiables, adaptées aux contraintes du terrain.",
      alignment: 'left',
      media: img(1),
    },
    {
      blockType: 'expertiseGrid',
      title: 'Un ensemble complet de services',
      showPrimaryOnly: true,
      layout: 'showcase',
    },
    {
      blockType: 'featuredProjects',
      title: 'Nos récentes réalisations',
      limit: 4,
      layout: 'showcase',
    },
    {
      blockType: 'map',
      title: 'Nos chantiers sur le terrain',
      height: 520,
    },
    {
      blockType: 'timeline',
      variant: 'process',
      eyebrow: 'Processus',
      title: 'Comment nous menons vos chantiers',
      description: 'Une méthode structurée, de la prise de brief à la mise en service.',
      media: img(2),
      items: [
        {
          year: 'Étape 01',
          title: 'Étude & planification',
          description:
            'Analyse du besoin, faisabilité technique et cadrage des livrables avec vos équipes.',
        },
        {
          year: 'Étape 02',
          title: 'Exécution & coordination',
          description:
            'Mobilisation des équipes et du matériel, suivi de chantier et contrôle qualité.',
        },
        {
          year: 'Étape 03',
          title: 'Livraison & mise en service',
          description:
            'Réception des ouvrages, essais, formation et accompagnement opérationnel.',
        },
      ],
    },
    {
      blockType: 'contactSection',
      eyebrow: 'Contact',
      title: 'Construisons ensemble',
      description: 'Décrivez votre projet, nous vous répondons dans les meilleurs délais.',
      formType: 'contact',
    },
  ]
}

export function buildHomeLayoutEn(heroMediaId: unknown, galleryIds: unknown[]) {
  const img = (i: number) => galleryIds[i] ?? heroMediaId ?? null

  return [
    {
      blockType: 'hero',
      layout: 'construktion',
      title: 'Infrastructure you can rely on',
      subtitle:
        'Civil engineering, steel construction and road weighing & control equipment — from design to commissioning in Mali and West Africa.',
      eyebrow: 'SOGICA · Construction · Mali',
      media: heroMediaId,
      mediaType: 'image',
      cta: { label: 'Request a quote', url: '/en/request-quote' },
      secondaryCta: { label: 'Learn more', url: '/en/about' },
    },
    { blockType: 'clients', title: 'They trust us', featuredOnly: true },
    {
      blockType: 'stats',
      variant: 'featured',
      items: [
        { value: '2016', label: 'Year founded' },
        { value: '3', label: 'Core expertise areas' },
        { value: 'BTP', label: 'Infrastructure & structures' },
      ],
    },
    {
      blockType: 'intro',
      variant: 'simple',
      eyebrow: 'About',
      title: 'Modern engineering rigour for your projects',
      description:
        'SOGICA combines civil engineering, steel construction and specialised equipment to deliver reliable infrastructure built for real site conditions.',
      alignment: 'left',
      media: img(1),
    },
    {
      blockType: 'expertiseGrid',
      title: 'A complete range of services',
      showPrimaryOnly: true,
      layout: 'showcase',
    },
    {
      blockType: 'featuredProjects',
      title: 'Our recent projects',
      limit: 4,
      layout: 'showcase',
    },
    {
      blockType: 'map',
      title: 'Our project sites',
      height: 520,
    },
    {
      blockType: 'timeline',
      variant: 'process',
      eyebrow: 'Process',
      title: 'How we deliver your projects',
      description: 'A structured approach from briefing through to commissioning.',
      media: img(2),
      items: [
        {
          year: 'Step 01',
          title: 'Study & planning',
          description: 'Needs analysis, technical feasibility and scoped deliverables with your teams.',
        },
        {
          year: 'Step 02',
          title: 'Execution & coordination',
          description: 'Mobilising crews and equipment, site supervision and quality control.',
        },
        {
          year: 'Step 03',
          title: 'Handover & commissioning',
          description: 'Project acceptance, testing, training and operational support.',
        },
      ],
    },
    {
      blockType: 'contactSection',
      eyebrow: 'Contact',
      title: 'Let’s build together',
      description: 'Tell us about your project — we will get back to you promptly.',
      formType: 'contact',
    },
  ]
}

function attachBlockIds(layout: unknown[], blockIds: string[]) {
  return (layout as Array<Record<string, unknown>>).map((block, index) => {
    const id = blockIds[index]
    return id ? { ...block, id } : block
  })
}

/** Conserve les IDs des entrées de tableaux (timeline, FAQ, etc.) pour ne pas écraser les locales FR. */
function attachNestedItemIds(
  frLayout: Array<Record<string, unknown>>,
  targetLayout: Array<Record<string, unknown>>,
) {
  return targetLayout.map((targetBlock, index) => {
    const frBlock = frLayout[index]
    if (!frBlock || frBlock.blockType !== targetBlock.blockType) return targetBlock

    const frItems = frBlock.items
    const targetItems = targetBlock.items
    if (!Array.isArray(frItems) || !Array.isArray(targetItems)) return targetBlock

    return {
      ...targetBlock,
      items: targetItems.map((targetItem, itemIndex) => {
        const frItem = frItems[itemIndex] as { id?: string } | undefined
        return frItem?.id ? { ...(targetItem as Record<string, unknown>), id: frItem.id } : targetItem
      }),
    }
  })
}

function extractBlockIds(layout: unknown): string[] {
  if (!Array.isArray(layout)) return []
  return layout
    .map((block) => (block && typeof block === 'object' ? String((block as { id?: string }).id ?? '') : ''))
    .filter(Boolean)
}

async function syncHomeLocale(
  payload: Awaited<ReturnType<typeof getPayload>>,
  homeId: number | string,
  locale: 'fr' | 'en',
  layout: unknown[],
  blockIds?: string[],
) {
  const layoutWithIds = blockIds?.length ? attachBlockIds(layout, blockIds) : layout

  return payload.update({
    collection: 'pages',
    id: homeId,
    locale,
    draft: false,
    data: {
      title: locale === 'fr' ? 'Accueil' : 'Home',
      slug: 'home',
      pageType: 'home',
      layout: layoutWithIds as never,
      _status: 'published',
    },
  })
}

async function syncHome() {
  const payload = await getPayload({ config })

  const heroMediaId = await pickHeroMediaId(payload)
  const galleryIds = await pickGalleryMediaIds(payload, 12)
  const coversAssigned = await assignExpertiseCovers(payload)

  const frLayout = buildHomeLayout(heroMediaId, galleryIds)
  const enLayout = buildHomeLayoutEn(heroMediaId, galleryIds)

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: 'fr',
    limit: 1,
  })

  if (!existing.docs[0]) {
    console.log('Page home introuvable : lancez pnpm seed d’abord.')
    process.exit(1)
  }

  const homeId = existing.docs[0].id

  // Les blocs partagent une structure commune : FR d'abord, puis EN avec les mêmes IDs.
  const updatedFr = await syncHomeLocale(payload, homeId, 'fr', frLayout)
  const frBlocksLayout = (updatedFr.layout ?? []) as Array<Record<string, unknown>>
  const blockIds = extractBlockIds(updatedFr.layout)
  const enLayoutWithItemIds = attachNestedItemIds(frBlocksLayout, enLayout as Array<Record<string, unknown>>)
  const updatedEn = await syncHomeLocale(payload, homeId, 'en', enLayoutWithItemIds, blockIds)

  const frBlocks = Array.isArray(updatedFr.layout) ? updatedFr.layout.length : 0
  const enBlocks = Array.isArray(updatedEn.layout) ? updatedEn.layout.length : 0

  if (!frBlocks || !enBlocks) {
    console.error('Échec : le layout publié est vide après synchronisation.')
    process.exit(1)
  }

  console.log(
    `Homepage synchronisée (FR: ${frBlocks} blocs, EN: ${enBlocks} blocs, ${coversAssigned} couvertures expertises).`,
  )
  process.exit(0)
}

syncHome().catch((err) => {
  console.error(err)
  process.exit(1)
})
