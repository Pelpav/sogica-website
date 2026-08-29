'use client'

import { scheduleIdleWork } from '@/lib/idle'
import { isLegalRoute } from '@/lib/motion-config'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type MotionContextValue = {
  enabled: boolean
  mounted: boolean
}

const MotionContext = createContext<MotionContextValue>({ enabled: true, mounted: false })

export function useMotionEnabled() {
  return useContext(MotionContext).enabled
}

/** True après hydratation — évite les mismatch SSR/client sur les composants motion. */
export function useMotionMounted() {
  return useContext(MotionContext).mounted
}

export function useMotionActive() {
  const { enabled, mounted } = useContext(MotionContext)
  return enabled && mounted
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const enabled = !isLegalRoute(pathname)

  useEffect(() => {
    return scheduleIdleWork(() => setMounted(true), { timeout: 1800, fallbackMs: 400 })
  }, [])

  return <MotionContext.Provider value={{ enabled, mounted }}>{children}</MotionContext.Provider>
}
