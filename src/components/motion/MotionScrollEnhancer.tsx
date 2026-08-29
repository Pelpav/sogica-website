'use client'

import {
  getMotionIntensity,
  isLegalRoute,
  MOTION_EASE,
  motionDistance,
} from '@/lib/motion-config'
import { animate, inView } from 'framer-motion/dom'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Sections entières — fade léger à l'entrée. */
const SECTION_SELECTORS = [
  'main .section-block',
  'main .sogica-section',
  'main .trusted-by-section',
  'main .stats-band',
  'main .contact-section',
  'main .hero-construktion',
  'main .about-page__intro',
  'main .about-page__section',
  'main .stats-featured',
  'main .project-detail-page__section',
  'main .project-detail-page__facts',
  'main .project-detail-page__cta',
  'main .expertise-page__section',
  'main .expertise-page__body',
  'main .contact-page__section',
  'main .clients-page__section',
  'main .realisations-page__section',
  'main .quote-page__section',
]

/** Grilles / listes — chaque enfant direct s'anime au scroll. */
const STAGGER_CONTAINER_SELECTORS = [
  'main .realisations-page__grid',
  'main .about-page__expertises',
  'main .about-page__steps',
  'main .about-page__values',
  'main .stats-featured__grid',
  'main .expertise-page__pole-list',
  'main .expertise-page__steps',
  'main .clients-page__grid',
  'main .project-detail-page__gallery',
  'main .project-detail-page__related-grid',
  'main .project-detail-page__facts-grid',
  'main .project-detail-page__before-after-list',
  'main .why-choose__features',
  'main .why-choose__list',
  'main .stats-band__inner',
  'main .service-cards',
  'main .services-list',
  'main .testimonial-section__grid',
  'main .faq-section__grid',
  'main .intro-composed__grid',
  'main .intro-about__grid',
  'main .expertise-showcase__list',
  'main .process-steps',
  'main .projects-editorial',
  'main .projects-map-block',
  'main .contact-section__grid',
  'main .contact-section__details',
  'main .cta-banner__inner',
  'main .sogica-shell__footer',
  'main .contact-page__grid',
  'main .quote-page__grid',
  'main .cms-page__content',
  'main .grid.gap-6',
  'main .grid.gap-4',
]

/** En-têtes de section — chaque ligne de texte apparaît en cascade. */
const TEXT_HEADER_SELECTORS = [
  'main .about-page__section-header',
  'main .about-page__intro-copy',
  'main .expertise-page__section-header',
  'main .clients-page__section-header',
  'main .contact-page__hero-copy',
  'main .quote-page__hero-copy',
  'main .clients-page__hero-copy',
  'main .realisations-page__hero-copy',
  'main .intro-composed__content',
  'main .process-section__intro',
  'main .trusted-by__label',
  'main .contact-section__aside',
  'main .contact-section__form-panel',
]

export function MotionScrollEnhancer() {
  const pathname = usePathname()

  useEffect(() => {
    if (isLegalRoute(pathname)) return
    if (document.documentElement.dataset.motion === 'none') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const intensity = getMotionIntensity()
    if (intensity === 0) return

    const cleanups: Array<() => void> = []

    const shouldSkip = (element: HTMLElement) =>
      element.dataset.motionBound === 'true' || element.hasAttribute('data-motion-reveal')

    const bind = (element: HTMLElement, delay = 0, distance = 48) => {
      if (shouldSkip(element)) return

      element.dataset.motionBound = 'true'
      const offset = motionDistance(distance, intensity)
      element.style.opacity = '0'
      element.style.transform = `translate3d(0, ${offset}px, 0)`

      const stop = inView(
        element,
        () => {
          animate(
            element,
            { opacity: 1, y: 0 },
            { duration: 0.72, delay, ease: MOTION_EASE },
          )
          stop()
        },
        { amount: 0.12 },
      )

      if (typeof stop === 'function') cleanups.push(stop)
    }

    const bindContainerChildren = (selector: string, childDelay = 0.06) => {
      document.querySelectorAll(selector).forEach((container) => {
        if (!(container instanceof HTMLElement)) return
        if (container.hasAttribute('data-motion-reveal')) return

        Array.from(container.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return
          bind(child, Math.min(index * childDelay, 0.36))
        })
      })
    }

    const bindTextChildren = (selector: string) => {
      document.querySelectorAll(selector).forEach((container) => {
        if (!(container instanceof HTMLElement)) return
        if (container.hasAttribute('data-motion-reveal')) return

        const textNodes = container.querySelectorAll(':scope > p, :scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > div')
        textNodes.forEach((node, index) => {
          if (!(node instanceof HTMLElement)) return
          bind(node, Math.min(index * 0.08, 0.4), 32)
        })
      })
    }

    const scan = () => {
      for (const selector of SECTION_SELECTORS) {
        document.querySelectorAll(selector).forEach((node) => {
          if (node instanceof HTMLElement) bind(node, 0, 36)
        })
      }

      for (const selector of STAGGER_CONTAINER_SELECTORS) {
        bindContainerChildren(selector)
      }

      for (const selector of TEXT_HEADER_SELECTORS) {
        bindTextChildren(selector)
      }
    }

    scan()
    const raf = window.requestAnimationFrame(scan)
    const timer = window.setTimeout(scan, 220)
    const lateTimer = window.setTimeout(scan, 600)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      window.clearTimeout(lateTimer)
      cleanups.forEach((cleanup) => cleanup())
      document.querySelectorAll('[data-motion-bound="true"]').forEach((node) => {
        if (node instanceof HTMLElement) {
          delete node.dataset.motionBound
          node.style.opacity = ''
          node.style.transform = ''
        }
      })
    }
  }, [pathname])

  return null
}
