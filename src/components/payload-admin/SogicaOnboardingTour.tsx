'use client'

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Button } from '@payloadcms/ui'
import { ONBOARDING_STORAGE_KEY, tourSteps, type TourStep } from './admin-content'

type SpotlightRect = {
  top: number
  left: number
  width: number
  height: number
}

function findTarget(step: TourStep): HTMLElement | null {
  if (!step.target) return null
  return document.querySelector<HTMLElement>(step.target)
}

function measureTarget(element: HTMLElement, padding = 8): SpotlightRect {
  const rect = element.getBoundingClientRect()
  return {
    top: Math.max(8, rect.top - padding),
    left: Math.max(8, rect.left - padding),
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
  }
}

export default function SogicaOnboardingTour() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null)
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({})

  const current = tourSteps[step]
  const isLast = step === tourSteps.length - 1

  const close = useCallback((persist = true) => {
    if (persist) {
      try {
        window.localStorage.setItem(ONBOARDING_STORAGE_KEY, '1')
      } catch {
        // private browsing
      }
    }
    setOpen(false)
    setSpotlight(null)
  }, [])

  const updateSpotlight = useCallback((index: number) => {
    const config = tourSteps[index]
    if (!config.target) {
      setSpotlight(null)
      setPanelStyle({})
      return
    }

    const element = findTarget(config)
    if (!element) {
      setSpotlight(null)
      setPanelStyle({})
      return
    }

    element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    const rect = measureTarget(element, config.padding ?? 10)
    setSpotlight(rect)

    const viewportHeight = window.innerHeight
    const panelTop =
      rect.top + rect.height + 16 + 280 > viewportHeight
        ? Math.max(16, rect.top - 280)
        : rect.top + rect.height + 16

    setPanelStyle({
      top: panelTop,
      left: Math.min(Math.max(16, rect.left), window.innerWidth - 420),
      right: 'auto',
      bottom: 'auto',
      transform: 'none',
    })
  }, [])

  useEffect(() => {
    try {
      const done = window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
      if (!done) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    const onReplay = () => {
      setStep(0)
      setOpen(true)
    }
    window.addEventListener('sogica:replay-onboarding', onReplay)
    return () => window.removeEventListener('sogica:replay-onboarding', onReplay)
  }, [])

  useLayoutEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => updateSpotlight(step))
    const onResize = () => updateSpotlight(step)
    window.addEventListener('resize', onResize)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [open, step, updateSpotlight])

  if (!open) return null

  return (
    <div className="sogica-admin-tour" role="dialog" aria-modal="true" aria-labelledby="sogica-tour-title">
      <div
        className="sogica-admin-tour__backdrop"
        style={
          spotlight
            ? {
                clipPath: `polygon(0% 0%, 0% 100%, ${spotlight.left}px 100%, ${spotlight.left}px ${spotlight.top}px, ${spotlight.left + spotlight.width}px ${spotlight.top}px, ${spotlight.left + spotlight.width}px ${spotlight.top + spotlight.height}px, ${spotlight.left}px ${spotlight.top + spotlight.height}px, ${spotlight.left}px 100%, 100% 100%, 100% 0%)`,
              }
            : undefined
        }
        onClick={() => close(true)}
      />

      {spotlight ? (
        <div
          className="sogica-admin-tour__highlight"
          style={{
            top: spotlight.top,
            left: spotlight.left,
            width: spotlight.width,
            height: spotlight.height,
          }}
        />
      ) : null}

      <div
        className={`sogica-admin-tour__panel${spotlight ? ' sogica-admin-tour__panel--anchored' : ''}`}
        style={spotlight ? panelStyle : undefined}
      >
        <div className="sogica-admin-tour__progress" aria-hidden>
          {tourSteps.map((_, index) => (
            <span
              key={index}
              className={`sogica-admin-tour__dot${index <= step ? ' is-active' : ''}`}
            />
          ))}
        </div>

        <p className="sogica-admin-tour__step">
          Étape {step + 1} sur {tourSteps.length}
        </p>
        <h2 id="sogica-tour-title" className="sogica-admin-tour__title">
          {current.title}
        </h2>
        <p className="sogica-admin-tour__body">{current.body}</p>

        <div className="sogica-admin-tour__actions">
          <Button buttonStyle="secondary" onClick={() => close(true)}>
            Passer le guide
          </Button>
          <div className="sogica-admin-tour__actions-main">
            {step > 0 ? (
              <Button buttonStyle="secondary" onClick={() => setStep((s) => s - 1)}>
                Précédent
              </Button>
            ) : null}
            <Button
              onClick={() => {
                if (isLast) close(true)
                else setStep((s) => s + 1)
              }}
            >
              {isLast ? 'Commencer' : 'Suivant'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
