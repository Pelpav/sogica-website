'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BRAND_LOGO_PATH, SITE_PRELOADER_PATH } from '@/lib/media-filenames'

const STORAGE_KEY = 'sogica-preloader-v3'
const MIN_MS = 1800
const MAX_MS = 9000

export function SitePreloader() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const [entered, setEntered] = useState(false)
  const [progress, setProgress] = useState(6)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const startedAt = useRef(0)
  const finished = useRef(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || sessionStorage.getItem(STORAGE_KEY) === '1') {
      setDone(true)
      return
    }

    startedAt.current = Date.now()
    setVisible(true)
    document.documentElement.classList.add('preloader-active')

    const enterTimer = window.setTimeout(() => setEntered(true), 40)
    return () => window.clearTimeout(enterTimer)
  }, [])

  useEffect(() => {
    if (!visible) return

    const tick = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 92) return value
        const step = value < 35 ? 8 : value < 70 ? 4 : 1.5
        return Math.min(92, value + step)
      })
    }, 240)

    return () => window.clearInterval(tick)
  }, [visible])

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true

    const elapsed = Date.now() - startedAt.current
    const wait = Math.max(0, MIN_MS - elapsed)

    window.setTimeout(() => {
      setProgress(100)
      setExiting(true)
      sessionStorage.setItem(STORAGE_KEY, '1')
      document.documentElement.classList.remove('preloader-active')

      window.setTimeout(() => {
        setVisible(false)
        setDone(true)
      }, 700)
    }, wait)
  }, [])

  useEffect(() => {
    if (!visible || videoFailed) return

    const video = videoRef.current
    const maxTimer = window.setTimeout(finish, MAX_MS)

    const onVideoProgress = () => {
      if (!video?.duration) return
      const ratio = video.currentTime / video.duration
      setProgress((value) => Math.max(value, 18 + ratio * 72))
    }

    const onPlaying = () => {
      setVideoPlaying(true)
    }

    const tryPlay = () => {
      if (!video) return
      video.muted = true
      void video.play().catch(() => {
        setVideoFailed(true)
        window.setTimeout(finish, MIN_MS)
      })
    }

    if (!video) {
      window.setTimeout(finish, MIN_MS)
      return () => window.clearTimeout(maxTimer)
    }

    if (video.readyState >= 2) tryPlay()
    else {
      video.addEventListener('loadeddata', tryPlay, { once: true })
      video.addEventListener('canplay', tryPlay, { once: true })
    }

    video.addEventListener('timeupdate', onVideoProgress)
    video.addEventListener('playing', onPlaying)

    return () => {
      window.clearTimeout(maxTimer)
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('timeupdate', onVideoProgress)
      video.removeEventListener('playing', onPlaying)
    }
  }, [visible, finish, videoFailed])

  if (done || !visible) return null

  return (
    <div
      className={`site-preloader ${entered ? 'site-preloader--enter' : ''} ${exiting ? 'site-preloader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Chargement"
    >
      <div className="site-preloader__top-bar" aria-hidden>
        <span className="site-preloader__top-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <div className="site-preloader__backdrop" aria-hidden />
      <div className="site-preloader__glow site-preloader__glow--left" aria-hidden />
      <div className="site-preloader__glow site-preloader__glow--right" aria-hidden />

      <div className="site-preloader__frame">
        {videoFailed ? (
          <img
            className="site-preloader__video site-preloader__fallback"
            src={BRAND_LOGO_PATH}
            alt="SOGICA"
          />
        ) : (
          <>
            {!videoPlaying ? (
              <img
                className="site-preloader__video site-preloader__fallback"
                src={BRAND_LOGO_PATH}
                alt=""
                aria-hidden
              />
            ) : null}
            <video
              ref={videoRef}
              className={`site-preloader__video ${videoPlaying ? 'site-preloader__video--playing' : 'site-preloader__video--loading'}`}
              src={SITE_PRELOADER_PATH}
              muted
              autoPlay
              playsInline
              preload="auto"
              disablePictureInPicture
              onEnded={finish}
              onError={() => {
                setVideoFailed(true)
                window.setTimeout(finish, MIN_MS)
              }}
            />
          </>
        )}
        <div className="site-preloader__vignette" aria-hidden />
        <div className="site-preloader__scanline" aria-hidden />
      </div>

      <p className="site-preloader__brand">
        <span className="site-preloader__brand-name">SOGICA</span>
        <span className="site-preloader__brand-tag">
          Génie civil · Métallique · Équipements
        </span>
      </p>
    </div>
  )
}
