import type { Locale } from '@/lib/i18n'

export type LegalSection = {
  title: string
  paragraphs: string[]
}

const CONTACT_EMAIL = 'sogicbtp@gmail.com'
const SITE_URL = 'www.sogica.ml'

function legalNoticeFr(): LegalSection[] {
  return [
    {
      title: 'Éditeur du site',
      paragraphs: [
        `Le présent site internet est édité par SOGICA SA (Société Générale d'Ingénieurs de Construction et d'Aménagement), société anonyme de droit malien, spécialisée en génie civil, construction métallique et équipements de pesage et de contrôle routier.`,
        `Site : https://${SITE_URL}`,
      ],
    },
    {
      title: 'Siège social et contact',
      paragraphs: [
        'Siège social : Faladiè SEMA, près de Mali Univers — Bamako, République du Mali.',
        `Téléphones : (+223) 63 63 10 53 · (+223) 66 71 91 59 · (+223) 62 56 85 12`,
        `E-mail : ${CONTACT_EMAIL}`,
      ],
    },
    {
      title: 'Identification de la société',
      paragraphs: [
        'SOGICA SA est une société anonyme de droit malien. Les informations d\'immatriculation et d\'agrément sont communiquées sur demande aux interlocuteurs autorisés.',
      ],
    },
    {
      title: 'Directeur de publication',
      paragraphs: [
        'Le directeur de la publication est le gérant de SOGICA SA, agissant en cette qualité au nom de la société.',
      ],
    },
    {
      title: 'Hébergement',
      paragraphs: [
        'Le site est hébergé par un prestataire technique professionnel assurant la disponibilité et la sécurité de l\'infrastructure.',
        `Pour toute information complémentaire relative à l'hébergement, vous pouvez contacter SOGICA à l'adresse ${CONTACT_EMAIL}.`,
      ],
    },
    {
      title: 'Propriété intellectuelle',
      paragraphs: [
        'L\'ensemble des éléments composant le site (textes, visuels, graphismes, logo, marques, vidéos, structure, bases de données) est protégé par le droit de la propriété intellectuelle.',
        'Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable de SOGICA SA est interdite.',
      ],
    },
    {
      title: 'Limitation de responsabilité',
      paragraphs: [
        'SOGICA SA s\'efforce d\'assurer l\'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, la société ne saurait garantir l\'absence d\'erreur, d\'omission ou d\'indisponibilité temporaire.',
        'Les informations présentées ont un caractère informatif et ne constituent pas une offre contractuelle. SOGICA SA ne pourra être tenue responsable des dommages directs ou indirects résultant de l\'accès ou de l\'utilisation du site.',
      ],
    },
    {
      title: 'Liens hypertextes',
      paragraphs: [
        'Le site peut contenir des liens vers des sites tiers. SOGICA SA n\'exerce aucun contrôle sur ces contenus et décline toute responsabilité quant à leur disponibilité ou à leur politique de confidentialité.',
        'La création de liens vers le présent site est autorisée sous réserve qu\'ils ne portent pas atteinte à l\'image de SOGICA SA et qu\'ils ouvrent le site dans une nouvelle fenêtre.',
      ],
    },
    {
      title: 'Droit applicable',
      paragraphs: [
        'Les présentes mentions légales sont régies par le droit malien. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents de Bamako seront seuls compétents.',
        'Dernière mise à jour : août 2026.',
      ],
    },
  ]
}

function legalNoticeEn(): LegalSection[] {
  return [
    {
      title: 'Website publisher',
      paragraphs: [
        'This website is published by SOGICA SA (Société Générale d\'Ingénieurs de Construction et d\'Aménagement), a Malian public limited company specializing in civil engineering, metal construction, and road weighing and control systems.',
        `Website: https://${SITE_URL}`,
      ],
    },
    {
      title: 'Registered office and contact',
      paragraphs: [
        'Registered office: Faladiè SEMA, near Mali Univers — Bamako, Republic of Mali.',
        'Phone: (+223) 63 63 10 53 · (+223) 66 71 91 59 · (+223) 62 56 85 12',
        `Email: ${CONTACT_EMAIL}`,
      ],
    },
    {
      title: 'Company identification',
      paragraphs: [
        'SOGICA SA is a Malian public limited company. Registration and accreditation details are provided on request to authorized parties.',
      ],
    },
    {
      title: 'Publishing director',
      paragraphs: [
        'The publishing director is the managing director of SOGICA SA, acting in that capacity on behalf of the company.',
      ],
    },
    {
      title: 'Hosting',
      paragraphs: [
        'The website is hosted by a professional technical provider responsible for infrastructure availability and security.',
        `For further information about hosting, please contact SOGICA at ${CONTACT_EMAIL}.`,
      ],
    },
    {
      title: 'Intellectual property',
      paragraphs: [
        'All elements of this website (text, visuals, graphics, logo, trademarks, videos, structure, databases) are protected by intellectual property law.',
        'Any reproduction, representation, modification, or exploitation, in whole or in part, without prior written authorization from SOGICA SA is prohibited.',
      ],
    },
    {
      title: 'Limitation of liability',
      paragraphs: [
        'SOGICA SA endeavours to ensure that the information published on this website is accurate and up to date. However, the company cannot guarantee the absence of errors, omissions, or temporary unavailability.',
        'The information provided is for general purposes only and does not constitute a contractual offer. SOGICA SA shall not be liable for direct or indirect damage resulting from access to or use of the website.',
      ],
    },
    {
      title: 'Hyperlinks',
      paragraphs: [
        'This website may contain links to third-party sites. SOGICA SA has no control over such content and accepts no liability for their availability or privacy practices.',
        'Links to this website are permitted provided they do not harm SOGICA SA\'s reputation and open the site in a new window.',
      ],
    },
    {
      title: 'Applicable law',
      paragraphs: [
        'These legal notices are governed by Malian law. In the event of a dispute, and failing an amicable settlement, the courts of Bamako shall have exclusive jurisdiction.',
        'Last updated: August 2026.',
      ],
    },
  ]
}

function privacyFr(): LegalSection[] {
  return [
    {
      title: 'Introduction',
      paragraphs: [
        'SOGICA SA accorde une importance particulière à la protection des données personnelles communiquées par les visiteurs du site et les utilisateurs de ses formulaires en ligne.',
        'La présente politique décrit les données collectées, les finalités de leur traitement, leur durée de conservation et vos droits.',
      ],
    },
    {
      title: 'Responsable du traitement',
      paragraphs: [
        'Le responsable du traitement est SOGICA SA, Faladiè SEMA, près de Mali Univers — Bamako, Mali.',
        `Contact : ${CONTACT_EMAIL}`,
      ],
    },
    {
      title: 'Données collectées',
      paragraphs: [
        'Via les formulaires de contact et de demande de devis : nom, prénom ou raison sociale, fonction, adresse e-mail, numéro de téléphone, objet et contenu du message, informations relatives au projet (localisation, type de travaux, délais, budget indicatif le cas échéant).',
        'Données techniques : adresse IP, logs de connexion, type de navigateur et données de navigation strictement nécessaires au fonctionnement et à la sécurité du site.',
      ],
    },
    {
      title: 'Finalités du traitement',
      paragraphs: [
        'Répondre à vos demandes d\'information, de contact ou de devis.',
        'Assurer le suivi commercial et technique des projets qui nous sont confiés.',
        'Améliorer la qualité du site et prévenir les usages frauduleux.',
        'Respecter nos obligations légales et réglementaires.',
      ],
    },
    {
      title: 'Base légale',
      paragraphs: [
        'Le traitement repose principalement sur l\'exécution de mesures précontractuelles à votre demande, sur l\'intérêt légitime de SOGICA SA à développer son activité et à sécuriser son site, ainsi que, le cas échéant, sur le respect d\'obligations légales.',
      ],
    },
    {
      title: 'Durée de conservation',
      paragraphs: [
        'Les données issues des formulaires sont conservées pendant la durée nécessaire au traitement de la demande, puis archivées conformément aux délais légaux applicables ou supprimées lorsqu\'elles ne sont plus utiles.',
        'Les logs techniques sont conservés pour une durée limitée, proportionnée aux besoins de sécurité.',
      ],
    },
    {
      title: 'Destinataires des données',
      paragraphs: [
        'Les données sont accessibles aux services internes habilités de SOGICA SA (commercial, technique, administratif).',
        'Elles peuvent être transmises à des sous-traitants techniques (hébergement, messagerie) strictement dans la limite nécessaire à leurs missions et soumis à des obligations de confidentialité.',
        'SOGICA SA ne vend pas vos données personnelles à des tiers.',
      ],
    },
    {
      title: 'Sécurité',
      paragraphs: [
        'SOGICA SA met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données contre la perte, l\'accès non autorisé, la divulgation ou l\'altération.',
      ],
    },
    {
      title: 'Vos droits',
      paragraphs: [
        'Conformément à la réglementation applicable, vous disposez d\'un droit d\'accès, de rectification, d\'effacement, de limitation, d\'opposition et, le cas échéant, de portabilité de vos données.',
        `Pour exercer vos droits, adressez votre demande à ${CONTACT_EMAIL}, en précisant votre identité et l\'objet de votre requête. SOGICA SA pourra vous demander tout justificatif utile.`,
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'Le site peut utiliser des cookies strictement nécessaires à son fonctionnement et à la mémorisation de vos préférences. Aucun cookie publicitaire tiers n\'est déployé sans votre consentement.',
        'Vous pouvez configurer votre navigateur pour refuser les cookies ; certaines fonctionnalités du site pourraient alors être limitées.',
      ],
    },
    {
      title: 'Modifications',
      paragraphs: [
        'SOGICA SA se réserve le droit de modifier la présente politique afin de refléter l\'évolution du site ou du cadre légal. La date de mise à jour figure en bas de page.',
        'Dernière mise à jour : août 2026.',
      ],
    },
  ]
}

function privacyEn(): LegalSection[] {
  return [
    {
      title: 'Introduction',
      paragraphs: [
        'SOGICA SA is committed to protecting the personal data submitted by visitors to this website and users of its online forms.',
        'This policy describes the data we collect, why we process it, how long we keep it, and your rights.',
      ],
    },
    {
      title: 'Data controller',
      paragraphs: [
        'The data controller is SOGICA SA, Faladiè SEMA, near Mali Univers — Bamako, Mali.',
        `Contact: ${CONTACT_EMAIL}`,
      ],
    },
    {
      title: 'Data we collect',
      paragraphs: [
        'Through contact and quote request forms: name, company name, job title, email address, phone number, subject and message content, and project-related information (location, type of works, timeline, indicative budget where provided).',
        'Technical data: IP address, connection logs, browser type, and navigation data strictly required for the operation and security of the website.',
      ],
    },
    {
      title: 'Purposes of processing',
      paragraphs: [
        'To respond to your information, contact, or quote requests.',
        'To manage the commercial and technical follow-up of projects entrusted to us.',
        'To improve the quality of the website and prevent fraudulent use.',
        'To comply with legal and regulatory obligations.',
      ],
    },
    {
      title: 'Legal basis',
      paragraphs: [
        'Processing is mainly based on pre-contractual steps taken at your request, on SOGICA SA\'s legitimate interest in developing its business and securing its website, and, where applicable, on compliance with legal obligations.',
      ],
    },
    {
      title: 'Retention period',
      paragraphs: [
        'Data submitted through forms is kept for as long as necessary to handle the request, then archived in accordance with applicable legal periods or deleted when no longer needed.',
        'Technical logs are retained for a limited period proportionate to security requirements.',
      ],
    },
    {
      title: 'Data recipients',
      paragraphs: [
        'Data is accessible to authorized internal teams at SOGICA SA (sales, technical, administrative).',
        'It may be shared with technical subcontractors (hosting, email) strictly to the extent required for their services and subject to confidentiality obligations.',
        'SOGICA SA does not sell your personal data to third parties.',
      ],
    },
    {
      title: 'Security',
      paragraphs: [
        'SOGICA SA implements appropriate technical and organizational measures to protect data against loss, unauthorized access, disclosure, or alteration.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        'Under applicable regulations, you have the right to access, rectify, erase, restrict, object to, and, where applicable, port your personal data.',
        `To exercise your rights, send your request to ${CONTACT_EMAIL}, stating your identity and the purpose of your request. SOGICA SA may ask for supporting documents.`,
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'The website may use cookies that are strictly necessary for its operation and to remember your preferences. No third-party advertising cookies are deployed without your consent.',
        'You can configure your browser to refuse cookies; some website features may then be limited.',
      ],
    },
    {
      title: 'Changes',
      paragraphs: [
        'SOGICA SA reserves the right to update this policy to reflect changes to the website or the legal framework. The update date is shown at the bottom of this page.',
        'Last updated: August 2026.',
      ],
    },
  ]
}

export function getLegalNoticeSections(locale: Locale): LegalSection[] {
  return locale === 'fr' ? legalNoticeFr() : legalNoticeEn()
}

export function getPrivacySections(locale: Locale): LegalSection[] {
  return locale === 'fr' ? privacyFr() : privacyEn()
}

export function sectionsToLexical(sections: LegalSection[]) {
  return {
    root: {
      type: 'root',
      children: sections.flatMap((section) => [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: section.title }],
        },
        ...section.paragraphs.map((text) => ({
          type: 'paragraph',
          children: [{ type: 'text', text }],
        })),
      ]),
      direction: 'ltr' as const,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export function hasLexicalContent(content: unknown): boolean {
  if (!content || typeof content !== 'object') return false
  const root = (content as { root?: { children?: unknown[] } }).root
  // Ignore placeholder CMS stubs (single short paragraph).
  return Array.isArray(root?.children) && root.children.length >= 5
}
