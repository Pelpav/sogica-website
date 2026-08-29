'use client'

import { useId, useState } from 'react'

export type FaqItem = {
  question: string
  answer: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  if (!items.length) return null

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={index} className={`faq-accordion__item ${isOpen ? 'is-open' : ''}`}>
            <button
              id={buttonId}
              type="button"
              className="faq-accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className="faq-accordion__icon" aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={panelId}
              aria-labelledby={buttonId}
              className="faq-accordion__panel"
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
