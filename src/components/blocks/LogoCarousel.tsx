'use client'

import Image from 'next/image'

export type LogoCarouselItem = {
  id: string
  name: string
  src: string
  href?: string | null
}

export function LogoCarousel({ items }: { items: LogoCarouselItem[] }) {
  if (!items.length) return null

  const loop = [...items, ...items]

  return (
    <section className="logo-carousel" aria-label="Partenaires et références">
      <div className="logo-carousel__track">
        {loop.map((item, index) => {
          const image = (
            <Image
              src={item.src}
              alt={item.name}
              width={200}
              height={80}
              sizes="(max-width: 768px) 40vw, 200px"
              quality={70}
              className="logo-carousel__img"
              unoptimized={item.src.endsWith('.svg')}
            />
          )

          return (
            <div key={`${item.id}-${index}`} className="logo-carousel__item">
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" title={item.name}>
                  {image}
                </a>
              ) : (
                image
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
